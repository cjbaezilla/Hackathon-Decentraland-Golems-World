# 🎒 Guía Maestra: Recolección Síncrona Multijugador y Rediseño de Cuadrícula de Inventario UI

> **Ubicación de archivos clave en la escena**:
> - 📜 **Generación y Recolección de Ítems**: [`src/objects/itemGenerator.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/itemGenerator.ts)
> - ⚡ **Sistema ECS de Respawn y Radar**: [`src/systems/itemSpawnSystem.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/systems/itemSpawnSystem.ts)
> - 📡 **Infraestructura Multijugador MessageBus**: [`src/multiplayer.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/multiplayer.ts)
> - 🧩 **Componentes ECS de Ítem**: [`src/components/item.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/components/item.ts)
> - 🖼️ **Interfaz Modal de Inventario (React-ECS)**: [`src/ui/inventoryComponent.tsx`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/ui/inventoryComponent.tsx)
> - 🎨 **Texturas PNG de Previsualización 300x300**: `assets/items/<rareza>/<id_item>.png`

---

## 🎯 1. Visión General y Objetivos Arquitectónicos

Esta guía describe el sistema unificado de **Recolección Compartida de Materiales en Tiempo Real** y el **Rediseño Completo de la Interfaz de Usuario del Inventario de Chatarra**.

### Objetivos Logrados:
1. **Mundo Compartido Síncrono**: Todos los avatares en la escena visualizan exactamente los mismos 150 materiales de chatarra en las mismas coordenadas y con los mismos modelos/rarezas.
2. **Recolección P2P en Tiempo Real**: Cuando un jugador interactúa con una pieza de chatarra, esta desaparece instantáneamente en la pantalla de todos los demás avatares conectados en la escena.
3. **Optimización de Texturas PNG (300×300 px)**: Las 46 imágenes de materiales se redimensionaron a 300×300 píxeles con muestreo Lanczos, reduciendo la huella de memoria en un **83.2%** (de 16.99 MB a 2.85 MB) manteniendo máxima nitidez RGBA.
4. **Rediseño de la UI al 100% de Ancho**: Eliminación del panel derecho de inspección y de la barra inferior de recomendación (`forgeTip`). La cuadrícula ocupa la totalidad del área horizontal del modal.
5. **Celdas Cuadradas Grandes (98px × 98px)**: Cada casilla encaja la imagen PNG del material, su nombre, borde de color por rareza e insignia `xN` en la esquina inferior derecha.
6. **Tarjeta Emergente de Tooltip (`ItemTooltipCard`)**: Información accesible mediante clic o tap táctil (Mobile-First) mostrando detalles del objeto y bonos de la Forja.
7. **Resolución de Propagación de Eventos**: Corrección de filtros de puntero (`pointerFilter: 'none'` en hijos) y eliminación de handlers en contenedores wrapper para evitar cierres o bloqueos involuntarios de la interfaz.
8. **Replicación en Inventario de Golems (`golemInventoryComponent.tsx`)**: Replicación idéntica en el modal de reserva y escuadrón de golems, renderizando 150 imágenes PNG de 300x300px optimizadas en un **83.7%** desde `assets/models/<afinidad>/<golem_id>.png` con celdas cuadradas de `98px × 98px` y tarjeta Tooltip de estadísticas RPG.

---

## 🎲 2. Generación Determinista Síncrona (PRNG Mulberry32)

Para garantizar que todos los clientes generen exactamente los mismos 150 materiales en las mismas coordenadas sin requerir un servidor centralizado, se utiliza el algoritmo **Mulberry32** inicializado con la semilla global `0x428913`:

```typescript
let currentSeed = 0x428913

export function resetDeterministicSeed(seed: number = 0x428913) {
  currentSeed = seed
}

export function deterministicRandom(): number {
  let t = (currentSeed += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
```

Cada ranura del mapa recibe un `instanceId` determinista: `item_slot_0` hasta `item_slot_149`.

---

## 📡 3. Protocolo Multijugador de Recolección (`MessageBus`)

La comunicación P2P entre peers utiliza `sceneMessageBus` en `src/multiplayer.ts` con los siguientes canales y DTOs:

```typescript
export const ITEM_MESSAGE_TYPES = {
  PICKUP: 'golem_item_pickup',
  SYNC_REQ: 'golem_item_sync_req',
  SYNC_RES: 'golem_item_sync_res'
} as const

export interface ItemPickupMessageDto {
  instanceId: string
  collectorAddress: string
  itemId: string
  timestamp: number
}

export interface ItemSyncResponseDto {
  senderAddress: string
  collectedInstanceIds: string[]
  timestamp: number
}
```

### Flujo de Sincronización al Recoger:
1. El avatar local presiona o toca el ítem (`collectItem(entity, false)`).
2. Se añade `instanceId` al set `collectedInstanceIds`.
3. Se incrementa la cantidad en el inventario local y se añade una entrada al log.
4. Se emite `broadcastItemPickup(instanceId, itemId)` vía `sceneMessageBus`.
5. Todos los peers en la escena reciben el mensaje `golem_item_pickup` y ejecutan `collectItem(entity, true)`, eliminando la entidad 3D de su vista inmediatamente.
6. Al ingresar un jugador nuevo a la escena, emite `golem_item_sync_req` y los peers conectados responden con `golem_item_sync_res` para ocultar los materiales ya recogidos previamente.

---

## 🖐️ 4. Colisionador y Raycast Dual en PC y Móvil

Para asegurar que los jugadores en escritorio (PC) vean el rótulo de interacción (`hoverText`) al pasar el cursor sobre la pieza en el suelo o sobre el haz de luz vertical de 30m:

1. **Caja de Colisión Explícita**: Se añade `MeshCollider.setBox(entity)` a cada entidad de ítem.
2. **Apuntado Dual (Ítem + Haz de Luz)**: Se registra `pointerEventsSystem.onPointerDown` tanto en la entidad del material como en la entidad del haz de luz `beamEntity`.
3. **Distancia Máxima de 6.5m**: Permite ver el texto `Recolectar [Nombre] ([RAREZA])` con soltura.

---

## 🖼️ 5. Rediseño Completo del Modal de Inventario (React-ECS)

La interfaz en `src/ui/inventoryComponent.tsx` se rediseñó bajo estética Steampunk:

### Dimensiones y Disposición:
- **Tarjeta Central**: `920px × 540px` centrada horizontal y verticalmente.
- **Cuadrícula**: Ocupa el 100% del ancho del cuerpo (`420px` de altura) con `flexWrap: 'wrap'` y dirección `row`.
- **Casilleros Cuadrados (98px × 98px)**:
  - Marco con color de rareza (Común: `#A0A0A0`, Poco común: `#00FF44`, Raro: `#00D4FF`, Épico: `#C038FF`, Legendario: `#FFAA00`).
  - Textura de imagen PNG de 300x300px cargada desde `assets/items/<rareza>/<id_item>.png`.
  - Etiqueta con el nombre traducido del objeto (`fontSize: 10`).
  - Insignia de cantidad `xN` en la esquina inferior derecha.

### Tarjeta Emergente de Tooltip (`ItemTooltipCard`):
- Al hacer clic o tap sobre cualquier casilla, se despliega una superposición emergente a la derecha con:
  - Imagen PNG de 56x56px + Nombre + Tag con color de rareza.
  - 📍 Zona de Origen en el mapa.
  - 📦 Cantidad en posesión local.
  - 📊 Frecuencia de aparición (`spawnWeight`).
  - 🔨 Bonos detallados para la Forja (Ataque, Defensa, Vitalidad, Velocidad y Afinidad Elemental).

---

## ⚡ 6. Reglas de Eventos y Manejo de Puntero (Anti-Burbujeo)

En React-ECS no existe `event.stopPropagation()`. Para evitar que hacer clic en un casillero o en la `✖` de cierre cierre la interfaz de forma involuntaria por burbujeo:

1. **Sin `onMouseDown` en el Contenedor Wrapper**: El contenedor raíz de la pantalla tiene `pointerFilter: 'none'` y **no posee handler `onMouseDown`**.
2. **`pointerFilter: 'none'` en Hijos Internos**: Todas las imágenes, etiquetas de texto `uiText`, barras superiores e insignias dentro de botones o casilleros tienen `pointerFilter: 'none'`.
3. **Manejo Aislado en Botones**: Solamente el contenedor contenedor del casillero o del botón `✖` captura el evento `onMouseDown`, garantizando que la acción se ejecute **una sola vez**.

---

## 🧪 7. Guía de Verificación

1. **Compilación de Código**:
   ```powershell
   npx tsc --noEmit
   ```
   *(Debe retornar código de salida 0 sin errores)*.

2. **Prueba Multijugador**:
   - Abrir 2 instancias de la escena.
   - Verificar que los materiales en el suelo coincidan en ambas pantallas.
   - Recoger un ítem en la ventana 1 y comprobar que desaparece al instante en la ventana 2.

3. **Prueba de Interfaz**:
   - Presionar `F` o tocar el icono de mochila.
   - Comprobar que la cuadrícula abarca el 100% de la tarjeta de 920px.
   - Pulsar sobre una casilla y verificar la apertura limpia del Tooltip emergente.
   - Hacer clic en la `✖` superior para cerrar la ventana sin problemas.
