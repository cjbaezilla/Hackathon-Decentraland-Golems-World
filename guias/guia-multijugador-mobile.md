# 🌐 Guía Integral: Multijugador y Diseño Mobile-First en Decentraland SDK7

Esta guía proporciona una explicación paso a paso sobre cómo funciona la arquitectura multijugador P2P en Decentraland SDK7, cómo sincronizar estados persistentes con `syncEntity`, cómo difundir eventos efímeros y configuraciones en tiempo real con `MessageBus`, la **arquitectura de sincronización y visualización de escuadrones de golems entre múltiples usuarios**, y las mejores prácticas para diseñar y probar experiencias optimizadas para **dispositivos móviles y pantallas táctiles (Mobile First)**.

---

## 📑 Tabla de Contenidos
1. [Arquitectura Multijugador en Decentraland](#1-arquitectura-multijugador-en-decentraland)
2. [Sincronización de Estado con `syncEntity`](#2-sincronización-de-estado-con-syncentity)
   - [2.1 Entidades Predefinidas y Enum de SyncIds](#21-entidades-predefinidas-y-enum-de-syncids)
   - [2.2 Creación de Componentes Personalizados con Schemas](#22-creación-de-componentes-personalizados-con-schemas)
   - [2.3 Resolución de Conflictos (CRDT Last-Write-Wins)](#23-resolución-de-conflictos-crdt-last-write-wins)
3. [Eventos y Handshakes en Tiempo Real con `MessageBus`](#3-eventos-y-handshakes-en-tiempo-real-con-messagebus)
   - [3.1 ¿Cuándo usar syncEntity vs MessageBus?](#31-cuándo-usar-syncentity-vs-messagebus)
   - [3.2 Protocolo de Sincronización de Escuadrones de Golems](#32-protocolo-de-sincronización-de-escuadrones-de-golems)
   - [3.3 Simulación Local Distribuida (Multi-Trail System)](#33-simulación-local-distribuida-multi-trail-system)
4. [Estrategia y Optimización Mobile-First](#4-estrategia-y-optimización-mobile-first)
   - [4.1 Configuración de Controles con `TouchScreenControls`](#41-configuración-de-controles-con-touchscreencontrols)
   - [4.2 Interfaz 2D (React-ECS) Adaptada a Móviles (Safe Areas)](#42-interfaz-2d-react-ecs-adaptada-a-móviles-safe-areas)
   - [4.3 Ergonomía de Interacciones Táctiles 3D](#43-ergonomía-de-interacciones-táctiles-3d)
5. [Paso a Paso: Cómo Probar el Multijugador en Local](#5-paso-a-paso-cómo-probar-el-multijugador-en-local)
6. [Referencias y Enlaces a la Documentación Oficial](#6-referencias-y-enlaces-a-la-documentación-oficial)

---

## 1. Arquitectura Multijugador en Decentraland

Por defecto, cada cliente de Decentraland ejecuta el código de la escena de forma local e independiente en su propio entorno de ejecución (QuickJS). Cuando varios jugadores coinciden en una misma parcela o World, el cliente de Decentraland los conecta a través de una red peer-to-peer (**P2P Comms / Catalyst Transport**).

En el SDK7 disponemos de dos canales troncales de comunicación multijugador nativos sin necesidad de servidores externos:
1. **CRDT (`@dcl/sdk/network`)**: Replicación continua de componentes basada en tipos de datos replicados sin conflictos (LWW - Last Write Wins).
2. **`MessageBus` (`@dcl/sdk/message-bus`)**: Emisión y escucha de eventos JSON efímeros estilo *pub/sub* en tiempo real.

---

## 2. Sincronización de Estado con `syncEntity`

La función `syncEntity` le indica al motor de Decentraland qué componentes de una entidad deben replicarse en la red hacia los demás clientes.

```typescript
import { syncEntity, isStateSyncronized } from '@dcl/sdk/network'
import { Transform, Material } from '@dcl/sdk/ecs'
```

### 2.1 Entidades Predefinidas y Enum de SyncIds

Toda entidad estática o predefinida que exista en la escena debe tener un **ID numérico único y determinista** asignado mediante un `enum`. Esto garantiza que todos los clientes vinculen las actualizaciones al mismo objeto.

```typescript
export enum SyncIds {
  BEACON = 1,
  PAD_RED = 2,
  PAD_GREEN = 3,
  PAD_BLUE = 4,
  PAD_PURPLE = 5
}

// Ejemplo de uso en src/index.ts:
syncEntity(
  beacon,
  [Transform.componentId, Material.componentId, BeaconState.componentId],
  SyncIds.BEACON
)
```

> ⚠️ **Regla Crítica**: Nunca llames a `syncEntity` en el nivel superior del módulo (top-level scope). Debe invocarse siempre dentro de la función `main()` o funciones invocadas a partir de ella.

### 2.2 Creación de Componentes Personalizados con Schemas

Puedes definir datos estructurados personalizados para que viajen a través de la red usando `engine.defineComponent` y los tipos provistos por `Schemas`:

```typescript
import { engine, Schemas } from '@dcl/sdk/ecs'

export const BeaconState = engine.defineComponent('buidlhouse::BeaconState', {
  count: Schemas.Int,
  colorIndex: Schemas.Int,
  lastPlayer: Schemas.String,
  lastUpdated: Schemas.Int64 // Se utiliza Int64 para marcas de tiempo grandes como Date.now()
})
```

#### Tipos de Schemas Disponibles:
- `Schemas.Boolean`: Valores de verdadero/falso.
- `Schemas.Int` / `Schemas.Float`: Números enteros y decimales.
- `Schemas.Int64`: Números enteros de 64 bits (obligatorio para `Date.now()`, ya que `Schemas.Int` corrompe enteros superiores a 13 dígitos).
- `Schemas.String`: Cadenas de texto.
- `Schemas.Vector3` / `Schemas.Quaternion`: Coordenadas y rotaciones espaciales.
- `Schemas.Color4`: Colores RGBA.

### 2.3 Resolución de Conflictos (CRDT Last-Write-Wins)

Cuando dos jugadores interactúan con el mismo objeto al mismo tiempo, el protocolo CRDT resuelve el conflicto mediante la estrategia **Last-Write-Wins (LWW)**: el cambio con la marca de tiempo más reciente sobreescribe al anterior de manera transparente y consistente en todos los clientes.

---

## 3. Eventos y Handshakes en Tiempo Real con `MessageBus`

### 3.1 ¿Cuándo usar syncEntity vs MessageBus?

| Característica | `syncEntity` | `MessageBus` |
| :--- | :--- | :--- |
| **Tipo de Información** | Estado persistente del mundo (puertas, marcadores, forjas). | Eventos efímeros, handshakes de escuadrones, chat y efectos. |
| **Jugadores que se conectan tarde** | ✅ Reciben el estado actual al ingresar. | ❌ No reciben eventos previos (requiere handshake explícito). |
| **Consumo de Red** | Continuo si cambian componentes frecuentemente. | Puntual (solo cuando se dispara el evento). |

---

### 3.2 Protocolo de Sincronización de Escuadrones de Golems

En `src/multiplayer.ts`, se implementa un handshake P2P bidireccional mediante `MessageBus` para que cada usuario difunda los 3 golems que tiene equipados:

```
[Jugador Nuevo Ingresa]
         │
         ├─► 1. Emite: SQUAD_MESSAGE_TYPES.ANNOUNCE (Su propio escuadrón)
         │
         └─► 2. Emite: SQUAD_MESSAGE_TYPES.REQUEST (Pide escuadrones existentes)
                 │
                 ▼
[Jugadores Ya Conectados]
         │
         └─► Responden emitiendo: SQUAD_MESSAGE_TYPES.ANNOUNCE
```

#### Estructura de Mensajes DTO:
```typescript
export interface GolemSquadMemberDto {
  id: string
  name: string
  affinity: string
  modelSrc: string
  scale: number
  followDistance: number
  moveSpeed: number
  rotationSpeed: number
}

export interface PlayerSquadAnnouncementDto {
  ownerAddress: string
  timestamp: number
  golems: GolemSquadMemberDto[]
}
```

---

### 3.3 Simulación Local Distribuida (Multi-Trail System)

Para evitar saturar la red sincronizando 60 veces por segundo la posición de cada golem mediante CRDT, se adoptó la **Simulación Local Distribuida**:

1. Decentraland ya replica la posición suave de cada avatar (`PlayerIdentityData` + `Transform`).
2. Cada cliente almacena una cola FIFO de migajas de trayectoria (*Breadcrumb Trail*) para cada jugador conectado en un mapa `Map<string, PlayerTrailState>()`.
3. Cada cliente calcula el movimiento suave (LERP/SLERP) de los golems de cada jugador de forma **100% local a 60 FPS**.
4. Al salir un jugador (`PlayerIdentityData` eliminado), el cliente limpia y destruye sus entidades de golems mediante `removeEntityWithChildren()`.

---

## 4. Estrategia y Optimización Mobile-First

El cliente móvil de Decentraland posee características y limitaciones particulares que requieren un enfoque de diseño dedicado:

### 4.1 Configuración de Controles con `TouchScreenControls`

En dispositivos móviles, Decentraland muestra un joystick virtual en la esquina inferior izquierda y botones de acción en la esquina inferior derecha.

El SDK7 incluye el componente `TouchScreenControls` para limpiar la interfaz en pantalla táctil:

```typescript
import { engine, TouchScreenControls, InputAction } from '@dcl/sdk/ecs'

// Ocultar botones de acción secundarios (3, 4, 5, 6) para eliminar el botón "+" de menú
TouchScreenControls.createOrReplace(engine.RootEntity, {
  hideJoystick: false,
  hideCrosshair: false,
  touchInputs: [
    { inputAction: InputAction.IA_ACTION_3, hide: true },
    { inputAction: InputAction.IA_ACTION_4, hide: true },
    { inputAction: InputAction.IA_ACTION_5, hide: true },
    { inputAction: InputAction.IA_ACTION_6, hide: true }
  ]
})
```

### 4.2 Interfaz 2D (React-ECS) Adaptada a Móviles (Safe Areas)

1. **Zonas Seguras (Safe Areas)**:
   - **Evitar la esquina inferior izquierda**: Espacio ocupado por el joystick táctil.
   - **Evitar la esquina inferior derecha**: Espacio ocupado por los botones táctiles de salto y acción.
   - **Colocar HUDs en la parte superior central o superior-derecha**: Permite al jugador visualizar estadísticas (`Jugadores conectados`, `Golems en escena`) sin interferir con sus dedos ni con los controles nativos.

2. **Panel HUD Implementado (`src/ui.tsx`)**:
   - Fondo translúcido oscuro con estilo *glassmorphism*.
   - Contadores reactivos en tiempo real con `getConnectedPlayersCount()` y conteo de entidades `GolemFollowerComponent`.

---

## 5. Paso a Paso: Cómo Probar el Multijugador en Local

Para verificar la sincronización entre varios jugadores sin necesidad de desplegar en producción:

1. **Iniciar el servidor local**:
   ```bash
   npm run start
   ```
2. **Abrir la primera instancia (Jugador 1)**:
   - El navegador abrirá una pestaña en `http://localhost:8000`.
   - Abre las Herramientas de Desarrollador (`F12`), activa el modo de emulación móvil (**Device Toolbar**, `Ctrl + Shift + M`).
   - Selecciona un perfil móvil (por ejemplo, *iPhone 14 Pro* o *Pixel 7*).
3. **Abrir una segunda pestaña en modo incógnito (Jugador 2)**:
   - Abre una ventana de incógnito o un navegador alternativo en `http://localhost:8000`.
   - Activa también el modo de dispositivo móvil.
4. **Verificar la Sincronización en Tiempo Real**:
   - Mira hacia la posición del Jugador 2: verás su avatar junto con sus **3 golems acompañantes detrás**, cada uno con su modelo 3D y etiqueta flotante `[0x...]`.
   - Mueve al Jugador 2: el Jugador 1 verá cómo los 3 golems siguen la trayectoria curva del Jugador 2 en perfecta fila india con LERP suave.
   - Observa el HUD superior: reflejará `👥 Jugadores: 2 | ⚡ Golems en escena: 6`.
   - Cierra la ventana del Jugador 2: sus golems desaparecerán de forma limpia y el HUD regresará a `👥 Jugadores: 1 | ⚡ Golems en escena: 3`.

---

## 6. Referencias y Enlaces a la Documentación Oficial

- **Portal Principal de Documentación de Decentraland**: [https://docs.decentraland.org](https://docs.decentraland.org)
- **Repositorio Oficial de Documentación (`decentraland/docs`)**: [https://github.com/decentraland/docs](https://github.com/decentraland/docs)
- **Sincronización Multijugador y Redes en SDK7**: [https://docs.decentraland.org/creator/development-guide/sdk7/network/](https://docs.decentraland.org/creator/development-guide/sdk7/network/)
- **Controles de Pantalla Táctil (`TouchScreenControls`)**: [https://github.com/decentraland/docs/blob/main/creator/sdk7/interactivity/touch-screen-controls.md](https://github.com/decentraland/docs/blob/main/creator/sdk7/interactivity/touch-screen-controls.md)
- **Interfaz 2D con React-ECS**: [https://docs.decentraland.org/creator/development-guide/sdk7/ui/](https://docs.decentraland.org/creator/development-guide/sdk7/ui/)
- **Repositorio de Habilidades y Patrones SDK (`decentraland/sdk-skills`)**: [https://github.com/decentraland/sdk-skills](https://github.com/decentraland/sdk-skills)
