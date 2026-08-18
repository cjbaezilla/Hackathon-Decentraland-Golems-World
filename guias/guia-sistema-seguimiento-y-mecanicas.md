# 🤖 Guía Técnica Integral: Sistema de Seguimiento en Fila para Golems y Mecánicas SDK7

Esta guía documenta en profundidad la arquitectura, algoritmos matemáticos, modelos 3D y patrones de desarrollo en **Decentraland SDK7 ECS** utilizados para implementar el **Sistema de Seguimiento en Fila (*Breadcrumb Trail System*)** para los 3 golems acompañantes del avatar, respetando estrictamente las restricciones de rendimiento y compatibilidad **Mobile-First**.

---

## 📑 Tabla de Contenidos

1. [Visión General y Objetivos del Sistema](#1-visión-general-y-objetivos-del-sistema)
2. [Análisis Comparativo de Enfoques en Decentraland SDK7](#2-análisis-comparativo-de-enfoques-en-decentraland-sdk7)
   - [2.1 Enfoque A: Emparentado Directo (`parent: engine.PlayerEntity`)](#21-enfoque-a-emparentado-directo-parent-engineplayerentity)
   - [2.2 Enfoque B: Persecución Vectorial Directa (LERP Directo)](#22-enfoque-b-persecución-vectorial-directa-lerp-directo)
   - [2.3 Enfoque C: Buffer FIFO de Historial de Trayectoria (Breadcrumb Trail - Implementado)](#23-enfoque-c-buffer-fifo-de-historial-de-trayectoria-breadcrumb-trail---implementado)
3. [Algoritmo Matemático y Funcionamiento del Breadcrumb Trail](#3-algoritmo-matemático-y-funcionamiento-del-breadcrumb-trail)
   - [3.1 Muestreo Espacial de Migajas ($\Delta d \ge 0.25\text{m}$)](#31-muestreo-espacial-de-migajas-delta-d-ge-025textm)
   - [3.2 Proyección Interpolada a lo Largo de la Polilínea](#32-proyección-interpolada-a-lo-largo-de-la-polilínea)
   - [3.3 Suavizado de Movimiento (LERP) y Orientación (SLERP)](#33-suavizado-de-movimiento-lerp-y-orientación-slerp)
   - [3.4 Zona Muerta Anti-Jitter y Optimización CRDT](#34-zona-muerta-anti-jitter-y-optimización-crdt)
   - [3.5 Recuperación Automática por Teletransporte](#35-recuperación-automática-por-teletransporte)
4. [Modelos 3D Procedurales glTF 2.0 (.glb)](#4-modelos-3d-procedurales-gltf-20-glb)
   - [4.1 Arquitectura del Generador Binario (`generate_models.js`)](#41-arquitectura-del-generador-binario-generate_modelsjs)
   - [4.2 Especificaciones de los 3 Golems de Prueba](#42-especificaciones-de-los-3-golems-de-prueba)
   - [4.3 Optimización Mobile-First y Canales Emisivos](#43-optimización-mobile-first-y-canales-emisivos)
5. [Estructura del Código y Modularidad en `src/`](#5-estructura-del-código-y-modularidad-en-src)
   - [5.1 `src/config/golems.ts`](#51-srcconfiggolemsts)
   - [5.2 `src/components/follower.ts`](#52-srccomponentsfollowerts)
   - [5.3 `src/objects/golemFactory.ts`](#53-srcobjectsgolemfactoryts)
   - [5.4 `src/systems/followerSystem.ts`](#54-srcsystemsfollowersystemts)
   - [5.5 `src/index.ts`](#55-srcindexts)
6. [Guía de Pruebas, Depuración y Extensión Futura](#6-guía-de-pruebas-depuración-y-extensión-futura)

---

## 1. Visión General y Objetivos del Sistema

En el universo de **Golems** ([GDD-Golems.md](file:///d:/DECENTRALAND/Scenes/Hackathon/GOLEMS/GDD-Golems.md), Sección 8), cada jugador puede mantener hasta **3 golems activos simultáneos** que actúan como su escuadrón personal. 

```
                                [Avatar del Jugador]
                                         │
                                   1.8m  │  (Curva real del camino)
                                         ▼
                                  🤖 Golem 1 (Vapor)
                                         │
                                   1.8m  │  (3.6m total)
                                         ▼
                                  🤖 Golem 2 (Galvánico)
                                         │
                                   1.8m  │  (5.4m total)
                                         ▼
                                  🤖 Golem 3 (Mecánico)
```

### Objetivos Clave de Diseño:
1. **Formación Orgánica en Fila (*Conga / Snake Line*)**: Los seguidores deben marchar uno detrás del otro siguiendo exactamente la trayectoria curva que trazó el avatar, en lugar de cortar esquinas en línea recta.
2. **Cero Vibración en Reposo (*Anti-Jitter*)**: Al detenerse el avatar, los 3 golems deben desacelerar suavemente y quedar completamente inmóviles sin temblores en pantalla.
3. **Eficiencia Máxima en Dispositivos Móviles**: Cero raycasting continuo, lectura segura de `Transform.get(engine.PlayerEntity)` y mutación de `Transform.getMutable` únicamente durante desplazamiento activo.
4. **Independencia Visual y Modularidad**: Modelos `.glb` autocontenidos con materiales PBR emisivos que no dependan de luces dinámicas (característica no soportada en el cliente móvil).

---

## 2. Análisis Comparativo de Enfoques en Decentraland SDK7

A continuación se detallan las distintas alternativas evaluadas para implementar el comportamiento de seguimiento:

### 2.1 Enfoque A: Emparentado Directo (`parent: engine.PlayerEntity`)
- **Mecánica**: Se crean las entidades de los golems con `Transform.create(golem, { parent: engine.PlayerEntity, position: Vector3.create(0, 0, -distance) })`.
- **Ventajas**:
  - Cero consumo de CPU por fotograma (el motor gráfico gestiona la jerarquía de matrices).
  - No requiere sistemas `engine.addSystem`.
- **Desventajas Críticas**:
  - ❌ **Rotación rígida artificial**: Si el avatar rota 180° sobre su propio eje, los golems giran instantáneamente como una vara sólida a gran velocidad.
  - ❌ **Atravesamiento de obstáculos en giros**: Al doblar una esquina, el segundo y tercer golem barren en arco abierto, atravesando paredes o elementos del escenario.
  - ❌ **Sin estado de locomoción**: No permite transiciones orgánicas entre estados de caminar y reposo.
- **Veredicto**: Descartado para el escuadrón de golems.

### 2.2 Enfoque B: Persecución Vectorial Directa (LERP Directo)
- **Mecánica**: En cada fotograma, cada golem calcula el vector directo hacia el objetivo que tiene delante (Golem 1 $\rightarrow$ Jugador, Golem 2 $\rightarrow$ Golem 1, Golem 3 $\rightarrow$ Golem 2) y avanza si la distancia es mayor a un umbral.
- **Ventajas**:
  - Dinámico y sencillo de implementar.
- **Desventajas**:
  - ⚠️ **Corte de esquinas**: Al girar en $90^\circ$ o rodear un muro, el segundo y tercer golem toman la línea recta diagonal más corta, perdiendo la formación en fila y perdiéndose en el entorno.
  - ⚠️ **Colisiones entre seguidores**: Si el jugador retrocede bruscamente, los seguidores se amontonan entre sí.
- **Veredicto**: Insuficiente para una formación ordenada en fila.

### 2.3 Enfoque C: Buffer FIFO de Historial de Trayectoria (Breadcrumb Trail - Implementado)
- **Mecánica**: Un buffer en memoria registra las coordenadas por las que efectivamente pasó el jugador. Cada golem busca un punto específico a lo largo de esa polilínea histórica ($1.8\text{m}$, $3.6\text{m}$, $5.4\text{m}$).
- **Ventajas**:
  - ✅ **Comportamiento impecable en curvas**: Todos los golems pisan exactamente por donde caminó el maestro.
  - ✅ **Desaceleración y frenado natural**: Al frenar el jugador, los golems continúan su marcha hasta ocupar su slot asignado.
  - ✅ **Ultra eficiente**: Un arreglo de 30–50 puntos consume menos de 2 KB de memoria y la interpolación toma $< 0.05\text{ ms}$ por tick.
- **Veredicto**: **Enfoque adoptado como estándar oficial de la experiencia.**

---

## 3. Algoritmo Matemático y Funcionamiento del Breadcrumb Trail Multi-Usuario

El sistema opera dentro de `src/systems/followerSystem.ts` a través de un flujo unificado que gestiona las trayectorias tanto del avatar local como de los avatares remotos conectados:

```
[Inicio Tick: golemFollowerSystem(dt)]
  │
  ├─► 1. Procesar Jugador Local (engine.PlayerEntity)
  │        ├─► updatePlayerTrail(localTrail, localPos, localRot)
  │        └─► Registrar localId en activeOwners
  │
  ├─► 2. Procesar Jugadores Remotos (PlayerIdentityData + Transform)
  │        ├─► Si es nuevo avatar ──► resetTrailBehind() + spawnPlayerSquad(remoteAddress, squad)
  │        └─► Si ya existe      ──► updatePlayerTrail(trailState, remotePos, remoteRot)
  │
  ├─► 3. Limpieza de Desconectados
  │        └─► Si un trackedOwner no está en activeOwners ──► removePlayerSquad() + delete trail
  │
  └─► 4. Para cada Golem Activo en Escena (GolemFollowerComponent):
           ├─► Buscar PlayerTrailState según follower.ownerAddress
           ├─► getPositionAlongTrail(trail, targetDistance, headPos)
           ├─► Evaluar distToTarget < 0.12m
           │      ├─► SÍ ──► Reposo (isMoving = false, no mutar Transform)
           │      └─► NO ──► LERP de posición + SLERP de rotación
```

### 3.1 Muestreo Espacial de Migajas ($\Delta d \ge 0.25\text{m}$)
Para evitar saturar la memoria con muestras redundantes cuando un avatar está quieto o moviéndose mínimamente, solo se registra una nueva muestra si la distancia euclidiana entre la posición actual y la última muestra guardada supera el umbral:

$$\Delta d = \sqrt{(x_{\text{jugador}} - x_{\text{último}})^2 + (z_{\text{jugador}} - z_{\text{último}})^2} \ge 0.25\text{ m}$$

Cuando se cumple, se agrega la muestra al inicio de la cola del jugador correspondiente (`trailState.trail.unshift`) y, si se supera el tamaño máximo (`MAX_BREADCRUMBS = 60`), se elimina la más antigua (`trail.pop()`).

### 3.2 Proyección Interpolada a lo Largo de la Polilínea
Dado un objetivo de distancia $D$ (ej. $3.6\text{m}$ para el segundo golem), la función `getPositionAlongTrail` recorre los segmentos de la polilínea formada por $P_0 (\text{posición actual}), P_1 (\text{trail}[0]), P_2 (\text{trail}[1]), \dots, P_n$:

1. Se calcula la longitud de cada segmento: $L_i = \|P_{i+1} - P_i\|$.
2. Se acumula la distancia: $S_k = \sum_{i=0}^{k-1} L_i$.
3. Cuando $S_k + L_k \ge D$, el punto exacto se encuentra en el segmento $k$ con factor de interpolación:
   $$t = \frac{D - S_k}{L_k} \quad (0 \le t \le 1)$$
4. La posición objetivo resulta de:
   $$\vec{P}_{\text{target}} = \text{lerp}(P_k, P_{k+1}, t) = P_k + t \cdot (P_{k+1} - P_k)$$

### 3.3 Suavizado de Movimiento (LERP) y Orientación (SLERP)
En lugar de teletransportar al golem instantáneamente al punto objetivo $\vec{P}_{\text{target}}$, se aplica interpolación lineal ponderada por el delta time ($dt$):

$$\vec{P}_{\text{nueva}} = \text{lerp}(\vec{P}_{\text{actual}}, \vec{P}_{\text{target}}, \min(1.0, dt \times \text{moveSpeed}))$$

Para la orientación, se calcula el vector de dirección sobre el plano horizontal ($Y = 0$):

$$\vec{v}_{\text{dir}} = \text{normalize}\left(\begin{bmatrix} x_{\text{target}} - x_{\text{actual}} \\ 0 \\ z_{\text{target}} - z_{\text{actual}} \end{bmatrix}\right)$$

$$Q_{\text{deseada}} = \text{Quaternion.lookRotation}(\vec{v}_{\text{dir}})$$

$$Q_{\text{nueva}} = \text{Quaternion.slerp}(Q_{\text{actual}}, Q_{\text{deseada}}, \min(1.0, dt \times \text{rotationSpeed}))$$

### 3.4 Zona Muerta Anti-Jitter y Optimización CRDT
Una de las reglas fundamentales de rendimiento en Decentraland SDK7 ([`mutable-data.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/docs/dcl-docs-main/creator/sdk7/programming-patterns/mutable-data.md)) es evitar invocar `Transform.getMutable()` si los valores no cambian significativamente.

El sistema evalúa primero la distancia al objetivo en modo solo lectura (`Transform.get`):
- Si $\|\vec{P}_{\text{actual}} - \vec{P}_{\text{target}}\| < 0.12\text{m}$: El golem se considera en reposo. No se llama a `Transform.getMutable()`, lo que ahorra ciclos de cómputo y no envía actualizaciones redundantes al bus CRDT.

### 3.5 Recuperación Automática por Teletransporte
Si cualquier jugador (local o remoto) utiliza `movePlayerTo` o cambia de zona en el mapa de $400\text{m} \times 400\text{m}$, la distancia al último punto del historial excederá instantáneamente el umbral de seguridad:

$$\Delta d > \text{TELEPORT\_DISTANCE\_THRESHOLD} \ (25.0\text{ m})$$

El sistema detecta esta anomalía y reinicializa inmediatamente el buffer de migajas alineado detrás de la nueva posición del avatar, evitando que los golems crucen todo el mapa volando en línea recta.

---

## 4. Modelos 3D Procedurales glTF 2.0 (.glb)

Para validar la experiencia visual sin depender de descargas externas ni assets de terceros, se desarrolló un generador de archivos binarios GLB en Node.js ([scripts/generate_models.js](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js)).

### 4.1 Arquitectura del Generador Binario (`generate_models.js`)
El script implementa la especificación **glTF 2.0 Binary Format (GLB)** estructurando los buffers de memoria directamente:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CABECERA GLB (12 Bytes)                         │
│   - Magic: 0x46546C67 ('glTF')  | Version: 2 | TotalByteLength         │
├────────────────────────────────────────────────────────────────────────┤
│                        CHUNK 0: JSON METADATA                          │
│   - Scene, Nodes, Meshes, Accessors, BufferViews, Materials PBR        │
├────────────────────────────────────────────────────────────────────────┤
│                        CHUNK 1: BINARY BUFFER                          │
│   - Vértices (VEC3 Float32), Normales (VEC3 Float32), Índices (UInt16) │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Especificaciones de los 3 Golems de Prueba

| Golem | Archivo | Peso | Estilo Geométrico | Materiales PBR y Emisión |
| :--- | :--- | :--- | :--- | :--- |
| **Calderón de Vapor** | `golem_steam.glb` | 12.2 KB | Caldera redondeada de cobre, cúpula superior, chimenea de escape y brazos con pistones. | Cobre/Latón metálico (`#B87333`), hierro fundido y horno central con emisión naranja intenso (`#FF7300`). |
| **Chispazo Galvánico** | `golem_galvanic.glb` | 11.4 KB | Chasis angular aerodinámico, doble bobina de Tesla en hombros y brazos articulados ligeros. | Aleación azulada (`#59738C`), alambre de cobre en bobinas y núcleo eléctrico con emisión cian brillante (`#00E5FF`). |
| **Acorazado Mecánico** | `golem_mechanical.glb` | 13.3 KB | Blindaje de placas de chatarra remachadas, hombreras dentadas de engranaje y base reforzada. | Placas de hierro desgastado (`#736B61`), engranajes de bronce y visor óptico con emisión ámbar/dorado (`#FFBF00`). |

### 4.3 Optimización Mobile-First y Canales Emisivos
Cumpliendo con las reglas de compatibilidad de la aplicación móvil de Decentraland ([`missing-features.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/docs/dcl-docs-main/creator/build-for-mobile/mobile-client/missing-features.md)):
- **Sin Luces Dinámicas**: No se emplean componentes de luz (`PBPointLight`), los cuales fallan en móvil. El brillo visual de los núcleos de los golems proviene exclusivamente de canales `emissiveFactor` en el material PBR, soportados nativamente en el renderizador Godot de la app móvil.
- **Bajo Conteo Poligonal**: Menos de 400 polígonos por modelo, garantizando 60 FPS estables incluso en dispositivos móviles de gama media/baja.

---

## 5. Estructura del Código y Modularidad en `src/`

El proyecto sigue el patrón de diseño por capas y objetos de juego recomendado por Decentraland:

```
src/
├── config/
│   └── golems.ts           # Parámetros de golems, afinidades, distancias y velocidades
├── components/
│   └── follower.ts         # Componente ECS GolemFollowerComponent (con ownerAddress y DTOs)
├── objects/
│   └── golemFactory.ts     # Factory para instanciación, etiquetado y limpieza de escuadrones
├── systems/
│   └── followerSystem.ts   # Sistema de seguimiento multi-usuario LERP/SLERP en tiempo real
├── index.ts                # Punto de entrada, inicio de red y orquestador
├── multiplayer.ts          # Infraestructura P2P (MessageBus handshake y registro de pares)
├── state.ts                # Estado global reactivo
└── ui.tsx                  # Interfaz 2D React-ECS con HUD multijugador superior
```

### 5.1 `src/components/follower.ts`
Define el componente ECS personalizado con asociación de dueño (`ownerAddress`):
```typescript
export const GolemFollowerComponent = engine.defineComponent('golems::GolemFollowerComponent', {
  golemId: Schemas.String,
  ownerAddress: Schemas.String, // 'local' o wallet 0x...
  orderIndex: Schemas.Int,
  targetDistance: Schemas.Float,
  moveSpeed: Schemas.Float,
  rotationSpeed: Schemas.Float,
  isMoving: Schemas.Boolean
})
```

### 5.2 `src/multiplayer.ts`
Gestiona la difusión y escucha de escuadrones P2P con `MessageBus`:
```typescript
export function announceLocalSquad(customSquad?: GolemConfig[]) { ... }
export function requestAllSquads() { ... }
export function setupSquadSyncListeners(onSquadReceived?: (address: string, squad: GolemSquadMemberDto[]) => void) { ... }
```

### 5.3 `src/objects/golemFactory.ts`
Ensambla entidades individuales o escuadrones completos con etiquetas Billboard:
```typescript
export function spawnPlayerSquad(ownerAddress: string, squadConfig: GolemConfig[], basePos: Vector3): Entity[] { ... }
export function removePlayerSquad(ownerAddress: string): void { ... }
```

### 5.4 `src/systems/followerSystem.ts`
Ejecuta la interpolación y resolución de trayectorias simultáneas para todos los jugadores en la escena mediante `golemFollowerSystem(dt)`.

### 5.5 `src/index.ts`
Punto de entrada modular que orquesta controles móviles, suelo, escuadrón local, handshake multijugador y el sistema de seguimiento:
```typescript
export function main() {
  setupUi()
  setupTouchControls()
  setupBaseFloor()
  setupLocalFollowerGolems()
  setupSquadSyncListeners(onRemoteSquadUpdated)
  announceLocalSquad()
  requestAllSquads()
  engine.addSystem(golemFollowerSystem)
}
```

---

## 6. Guía de Pruebas y Validación Multijugador

### 6.1 Cómo Probar Localmente con Múltiples Jugadores
1. Compilar el proyecto para verificar cero errores de TypeScript:
   ```powershell
   npm run build
   ```
2. Iniciar el servidor local de previsualización:
   ```powershell
   npm start
   ```
3. Abrir **Pestaña 1 (Jugador 1)** en `http://localhost:8000` con emulación móvil (`F12` $\rightarrow$ `Ctrl + Shift + M`).
4. Abrir **Pestaña 2 (Jugador 2)** en modo incógnito con emulación móvil.
5. Observar en la Pestaña 1 cómo aparece el avatar del Jugador 2 con sus **3 golems detrás** etiquetados con su dirección de wallet.
6. Mover al Jugador 2 y comprobar que los golems marchan en fila india con curvas suaves a 60 FPS.
7. Verificar que el HUD superior muestra `👥 Jugadores: 2 | ⚡ Golems en escena: 6`.

