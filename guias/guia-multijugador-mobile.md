# 🌐 Guía Integral: Multijugador y Diseño Mobile-First en Decentraland SDK7

Esta guía proporciona una explicación paso a paso sobre cómo funciona la arquitectura multijugador P2P en Decentraland SDK7, cómo sincronizar estados persistentes con `syncEntity`, cómo difundir eventos efímeros en tiempo real con `MessageBus`, y las mejores prácticas para diseñar y probar experiencias optimizadas para **dispositivos móviles y pantallas táctiles (Mobile First)**.

---

## 📑 Tabla de Contenidos
1. [Arquitectura Multijugador en Decentraland](#1-arquitectura-multijugador-en-decentraland)
2. [Sincronización de Estado con `syncEntity`](#2-sincronización-de-estado-con-syncentity)
   - [2.1 Entidades Predefinidas y Enum de SyncIds](#21-entidades-predefinidas-y-enum-de-syncids)
   - [2.2 Creación de Componentes Personalizados con Schemas](#22-creación-de-componentes-personalizados-con-schemas)
   - [2.3 Resolución de Conflictos (CRDT Last-Write-Wins)](#23-resolución-de-conflictos-crdt-last-write-wins)
3. [Eventos Efímeros en Tiempo Real con `MessageBus`](#3-eventos-efímeros-en-tiempo-real-con-messagebus)
   - [3.1 ¿Cuándo usar syncEntity vs MessageBus?](#31-cuándo-usar-syncentity-vs-messagebus)
   - [3.2 Implementación del MessageBus](#32-implementación-del-messagebus)
4. [Estrategia y Optimización Mobile-First](#4-estrategia-y-optimización-mobile-first)
   - [4.1 Configuración de Controles con `TouchScreenControls`](#41-configuración-de-controles-con-touchscreencontrols)
   - [4.2 Interfaz 2D (React-ECS) Adaptada a Móviles](#42-interfaz-2d-react-ecs-adaptada-a-móviles)
   - [4.3 Ergonomía de Interacciones Táctiles 3D](#43-ergonomía-de-interacciones-táctiles-3d)
5. [Paso a Paso: Cómo Probar el Multijugador en Local](#5-paso-a-paso-cómo-probar-el-multijugador-en-local)
6. [Referencias y Enlaces a la Documentación Oficial](#6-referencias-y-enlaces-a-la-documentación-oficial)

---

## 1. Arquitectura Multijugador en Decentraland

Por defecto, cada cliente de Decentraland ejecuta el código de la escena de forma local e independiente en su propio entorno de ejecución (QuickJS). Cuando varios jugadores coinciden en una misma parcela o World, el cliente de Decentraland los conecta a través de una red peer-to-peer (P2P Comms) o una sala de transporte LiveKit/Catalyst.

Para que las modificaciones en el entorno 3D (cambiar un color, mover un objeto, abrir una puerta, sumar puntos a un marcador) se reflejen en las pantallas de todos los usuarios conectados, el SDK7 utiliza **CRDT (Conflict-free Replicated Data Types)** a través del módulo `@dcl/sdk/network`.

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

El estado sincronizado sobrevive mientras al menos **un jugador** permanezca en la escena. Si todos los jugadores se retiran, la escena se reinicia a su estado inicial.

---

## 3. Eventos Efímeros en Tiempo Real con `MessageBus`

### 3.1 ¿Cuándo usar syncEntity vs MessageBus?

| Característica | `syncEntity` | `MessageBus` |
| :--- | :--- | :--- |
| **Tipo de Información** | Estado persistente del mundo (puertas, marcadores, palancas). | Eventos efímeros (reacciones, sonidos, fuegos artificiales, chat). |
| **Jugadores que se conectan tarde** | ✅ Reciben el estado actual al ingresar. | ❌ No reciben eventos que ocurrieron antes de conectarse. |
| **Consumo de Red** | Optimizado para estado que cambia periódicamente. | Disparo directo estilo *fire-and-forget*. |

### 3.2 Implementación del MessageBus

```typescript
import { MessageBus } from '@dcl/sdk/message-bus'

export const sceneMessageBus = new MessageBus()

// Enviar un mensaje
sceneMessageBus.emit('reaction', {
  sender: 'Móvil-102',
  emoji: '🎉',
  timestamp: Date.now()
})

// Escuchar un mensaje
sceneMessageBus.on('reaction', (data) => {
  console.log(`Reacción de ${data.sender}: ${data.emoji}`)
  // Disparar animación de onda, partícula o sonido local
})
```

---

## 4. Estrategia y Optimización Mobile-First

El cliente móvil de Decentraland posee características y limitaciones particulares que requieren un enfoque de diseño dedicado:

### 4.1 Configuración de Controles con `TouchScreenControls`

En dispositivos móviles, Decentraland muestra un joystick virtual en la esquina inferior izquierda y un conjunto de botones de acción en la esquina inferior derecha.

El SDK7 (a partir de la versión 7.26.0) incluye el componente `TouchScreenControls` para limpiar la interfaz en pantalla táctil:

```typescript
import { engine, TouchScreenControls, InputAction } from '@dcl/sdk/ecs'

// Ocultar los botones de acción secundarios (3, 4, 5, 6) para eliminar el botón "+" de menú
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

### 4.2 Interfaz 2D (React-ECS) Adaptada a Móviles

1. **Zonas Seguras (Safe Areas)**:
   - **Evitar la esquina inferior izquierda**: Es el área ocupada por el joystick táctil.
   - **Evitar la esquina inferior derecha**: Es el área ocupada por los botones de salto y puntero.
   - **Colocar HUDs en la parte superior o superior-derecha**: Permite al jugador ver la información sin tapar sus dedos ni los controles.
2. **Botones de Tamaño Generoso**:
   - En pantallas táctiles, los botones deben tener al menos `40px` a `48px` de altura y un tamaño de texto legible (`fontSize: 14` a `18`).
3. **Paneles Colapsables**:
   - Incluir botones para minimizar (`➖` / `➕`) los paneles de información, permitiendo a los usuarios con pantallas pequeñas maximizar su campo de visión.

### 4.3 Ergonomía de Interacciones Táctiles 3D

- **Distancia de Interacción (`maxDistance`)**:
  En pantallas táctiles no se cuenta con la precisión de un cursor de ratón. Al registrar eventos con `pointerEventsSystem.onPointerDown`, utiliza distancias de activación cómodas (`maxDistance: 8` a `12` metros):

```typescript
pointerEventsSystem.onPointerDown(
  {
    entity: beacon,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: '¡Tocar para sincronizar color y puntos!',
      maxDistance: 10
    }
  },
  () => {
    // Lógica de interacción
  }
)
```

---

## 5. Paso a Paso: Cómo Probar el Multijugador en Local

Para verificar la sincronización entre varios jugadores sin necesidad de desplegar en producción:

1. **Iniciar el servidor local**:
   Abre una terminal en el directorio del proyecto y ejecuta:
   ```bash
   npm run start
   ```
2. **Abrir la primera instancia (Jugador 1)**:
   - El navegador abrirá una pestaña en `http://localhost:8000`.
   - Abre las Herramientas de Desarrollador (`F12` en Chrome o Edge).
   - Activa el modo de emulación de dispositivos (**Device Toolbar**, `Ctrl + Shift + M`).
   - Selecciona un perfil móvil (por ejemplo, *iPhone 14 Pro* o *Pixel 7*).
3. **Abrir una segunda pestaña en modo incógnito (Jugador 2)**:
   - Abre una ventana de incógnito o un navegador alternativo con la misma URL `http://localhost:8000`.
   - Activa también el modo de dispositivo móvil.
4. **Verificar la Sincronización en Tiempo Real**:
   - Toca el orbe central o presiona el botón **🎉 ENVIAR REACCIÓN** en la ventana 1.
   - Observa cómo en la ventana 2 el color del orbe cambia instantáneamente, el contador global se actualiza y la onda expansiva se reproduce en ambas pantallas.

---

## 6. Referencias y Enlaces a la Documentación Oficial

Todos los recursos, especificaciones y guías de referencia de Decentraland están disponibles públicamente:

### 📚 Documentación Oficial en Web y Repositorio de GitHub
- **Portal Principal de Documentación de Decentraland**:  
  [https://docs.decentraland.org](https://docs.decentraland.org)
- **Repositorio Oficial de Documentación (`decentraland/docs`)**:  
  [https://github.com/decentraland/docs](https://github.com/decentraland/docs)
- **Sincronización Multijugador y Redes en SDK7**:  
  [https://docs.decentraland.org/creator/development-guide/sdk7/network/](https://docs.decentraland.org/creator/development-guide/sdk7/network/)
- **Controles de Pantalla Táctil (`TouchScreenControls`)**:  
  [https://github.com/decentraland/docs/blob/main/creator/sdk7/interactivity/touch-screen-controls.md](https://github.com/decentraland/docs/blob/main/creator/sdk7/interactivity/touch-screen-controls.md)
- **Interfaz 2D con React-ECS**:  
  [https://docs.decentraland.org/creator/development-guide/sdk7/ui/](https://docs.decentraland.org/creator/development-guide/sdk7/ui/)
- **Manejo de Eventos de Puntero e Interactividad**:  
  [https://docs.decentraland.org/creator/development-guide/sdk7/interactivity/](https://docs.decentraland.org/creator/development-guide/sdk7/interactivity/)
- **Decentraland Worlds (Configuración y Despliegue)**:  
  [https://docs.decentraland.org/creator/worlds/about/](https://docs.decentraland.org/creator/worlds/about/)
- **Repositorio de Habilidades y Patrones SDK (`decentraland/sdk-skills`)**:  
  [https://github.com/decentraland/sdk-skills](https://github.com/decentraland/sdk-skills)
