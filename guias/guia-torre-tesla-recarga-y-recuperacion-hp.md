# ⚡ Guía Maestra: Torre Tesla Galvánica, Recarga Energética de HP, UI React-ECS y Sincronización 3D

## 📖 1. Resumen Ejecutivo y Especificación Técnica

La **Torre Tesla Galvánica** es una estación de recarga de energía electromagnética y mantenimiento autómata ubicada en el **Distrito de la Forja** en las coordenadas exactas de la **Parcela `[3, 2]` • `X: 52.8m | Z: 34.2m`**.

Esta instalación permite a los jugadores restaurar la salud (HP) de sus golems (tanto del escuadrón activo de 3 acompañantes como de los autómatas almacenados en la reserva) a cambio de la moneda oficial del juego (**Engranajes de Latón** / `playerBrassGears`).

### ⚙️ Especificaciones Canónicas de Juego:
- **Ubicación Espacial**: Parcela `[3, 2]` (`X: 52.8m, Z: 34.2m`), en el cuadrante Suroeste del mapa 25x25 (Distrito de la Forja).
- **Tarifa Oficial de Recarga**: **1 Engranaje de Latón por cada 1 HP restaurado** ($\text{Costo} = \Delta HP \times 1$, donde $\Delta HP = \text{maxHp} - \text{currentHp}$).
- **Interacción**: Activación por clic táctil / raycast directo sobre la estructura 3D de la torre a una distancia máxima de **12m**.
- **Interfaz de Usuario**: Modal React-ECS SDK7 (`TeslaTowerModal`) con estética Steampunk Glassmorphism, miniaturas PNG reales de los golems, barras gráficas de salud y soporte bilingüe dual (ES/EN).
- **Sincronización Multicapa**: Regeneración instantánea tanto en el estado de sesión (`sceneState`), la modal UI, el componente ECS `GolemCombatComponent` de la entidad 3D y la etiqueta flotante ASCII sobre la cabeza del golem seguidor en el mapa (`syncGolem3DEntityHp`).

---

## 🏛️ 2. Arquitectura del Objeto 3D y Contorno de Selección (`src/objects/teslaTower.ts`)

La Torre Tesla está construida procedura y modularmente utilizando piezas de la librería oficial de assets (`asset-packs` / `.glb`):

```text
               ⚡ RÓTULO 3D FLOTANTE (8.4m) [ 1 🪙 / 1 HP ]
                         (Billboard + Stroke Color Cian)
                                   │
                           ┌───────┴───────┐
                           │ TABLE_LAMP    │  <- Corona Emisora Galvánica (7.2m)
                           └───────┬───────┘
                           ┌───────┴───────┐
                           │ GEAR_SHAFT #3 │  <- Eje Superior (5.4m)
                           └───────┬───────┘
                           ┌───────┴───────┐
                           │ GEAR_SHAFT #2 │  <- Anillos Concéntricos y Eje Medio (3.4m)
                           └───────┬───────┘
                           ┌───────┴───────┐
                           │ GEAR_SHAFT #1 │  <- Eje Inferior (1.4m)
                           └───────┬───────┘
                           ┌───────┴───────┐
                           │     TANK      │  <- Caldera / Tanque Base Estructural (0.0m)
                           └───────┬───────┘
                       ┌───────────┴───────────┐
                       │ WOOD_PLANK_FLOOR_2X2M │  <- Piso de Madera Adoquinado (Sin Raycast)
                       └───────────────────────┘
```

### 🎯 Solución del Contorno Verde de Selección (Hover Stroke Highlight):
En Decentraland SDK7, cuando el jugador pasa el cursor sobre una entidad con `pointerEventsSystem.onPointerDown`, el cliente dibuja un contorno verde de selección (**hover stroke outline**) alrededor de la geometría del colisionador `MeshCollider`.
- Para evitar que el contorno verde enmarque únicamente las losas cuadradas del piso de madera (`floorWood2x2`), la losa del suelo se instanció como un elemento visual estático **sin colisionador raycast**.
- Las colisiones físicas `MeshCollider.setBox` y los listeners de puntero `pointerEventsSystem.onPointerDown` se asignaron directamente al **cuerpo metálico de la torre** (`baseTank`, `shaft1`, `shaft2`, `shaft3`, `gearBig`, `crown`, `tube1`, `tube2`).
- De este modo, al apuntar a la Torre Tesla desde cualquier ángulo, el cliente de Decentraland dibuja el contorno verde de selección exactamente sobre el cuerpo metálico de la torre.

### 🎨 Rótulo Flotante 3D con Stroke Color:
Sobre la corona emisora a una altura de **8.4m**, se mantiene suspendida una etiqueta 3D interactiva mediante `Billboard`:
- **Texto**: `⚡ TORRE TESLA DE RECARGA ⚡\n[ 1 🪙 / 1 HP ]`
- **Color del Texto (`textColor`)**: Cian Galvánico Eléctrico `Color4.create(0.2, 0.9, 1.0, 1.0)`.
- **Color de Trazo (`outlineColor`)**: Azul Oscuro Galvánico `Color4.create(0.0, 0.25, 0.55, 1.0)`.
- **Ancho de Trazo (`outlineWidth`)**: `0.25` (estándar idéntico al de los rótulos de la Fábrica de Golems).

---

## 💾 3. Lógica de Estado y Sincronización 3D ECS (`src/state.ts` & `src/objects/golemFactory.ts`)

### A. Estado de la Ventana Modal (`src/state.ts`):
```ts
export function getIsTeslaTowerUIOpen(): boolean {
  return sceneState.isTeslaTowerUIOpen
}

export function setIsTeslaTowerUIOpen(open: boolean) {
  sceneState.isTeslaTowerUIOpen = open
}
```

### B. Algoritmo de Recarga Individual y Masiva (`src/state.ts`):
- **Recarga Individual**: `restoreGolemHpTesla(golemId)`
  1. Localiza el golem en `sceneState.localSquad` o `sceneState.golemReserve`.
  2. Calcula la salud faltante: $\Delta HP = \text{maxHp} - \text{currentHp}$.
  3. Determina el costo en Engranajes: $\text{costo} = \text{Math.max}(1, \text{Math.ceil}(\Delta HP \times 1))$.
  4. Valida que `sceneState.playerBrassGears >= costo`.
  5. Descuenta el saldo de Engranajes, establece `currentHp = maxHp`, emite una entrada al log de combate en color cian `#00E5FF` e invoca `syncGolem3DEntityHp(golemId, maxHp)`.

- **Recarga Masiva del Escuadrón y Reserva**: `restoreAllGolemsHpTesla()`
  1. Filtra todos los golems dañados ($\text{currentHp} < \text{maxHp}$).
  2. Suma el daño acumulado y calcula el costo total ($\text{totalCost} = \Delta HP_{\text{total}} \times 1$).
  3. Si el jugador dispone de Engranajes suficientes, realiza el descuento único y restaura la salud de todos los autómatas al 100%, invocando `syncGolem3DEntityHp` para cada entidad.

### C. Sincronización de Entidades 3D y Barras Flotantes en el Mapa (`src/objects/golemFactory.ts`):
```ts
export function syncGolem3DEntityHp(golemId: string, newHp: number) {
  for (const [entity] of engine.getEntitiesWith(GolemCombatComponent)) {
    const combat = GolemCombatComponent.get(entity)
    if (combat.golemId === golemId) {
      const mutCombat = GolemCombatComponent.getMutable(entity)
      mutCombat.currentHp = Math.max(0, Math.min(combat.maxHp, newHp))

      const config = spawnedFollowerGolemConfigMap.get(entity)
      const name = config ? getGolemDisplayName(config) : 'Golem'
      updateGolemFloatingLabel(
        entity,
        name,
        combat.affinity,
        combat.level,
        mutCombat.currentHp,
        combat.maxHp,
        combat.ownerAddress
      )
    }
  }
}
```
*Esta función garantiza que las barras ASCII (`[██████████] MaxHP/MaxHP`) que flotan sobre los golems seguidores en la escena 3D se llenen instantáneamente al recargar en la Torre Tesla.*

---

## 🎨 4. Interfaz de Usuario React-ECS (`src/ui/teslaTowerComponent.tsx`)

La interfaz modal `TeslaTowerModal` sigue las pautas de diseño Mobile-First y Glassmorphism Steampunk del proyecto:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚡ TORRE TESLA GALVÁNICA                                                  ✖ │
│ Estación de Recarga Energética (1 🪙 por 1 HP)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🪙 Saldo Disponible: 150 Engranajes      Tarifa: 1 Engranaje por 1 HP      │
├─────────────────────────────────────────────────────────────────────────────┤
│ █ [IMG] Autómata de Vapor (Lvl 12 • Vapor)      [████████░░] 80/100 HP      │
│ █                                                ⚡ Restaurar (20 🪙)       │
├─────────────────────────────────────────────────────────────────────────────┤
│ █ [IMG] Titan Galvánico (Lvl 15 • Galvánico)     [██████████] 150/150 HP    │
│ █                                                ✨ HP al Máximo            │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✖ CERRAR                                   ⚡ RESTAURAR TODOS LOS GOLEMS    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Elementos Clave de la UI:
1. **Contenedor Principal**: Tamaño $760\text{px} \times 660\text{px}$, fondo `Color4.create(0.06, 0.08, 0.12, 0.96)`.
2. **Miniaturas PNG Reales**: Cada golem muestra su render 3D de catálogo mediante `getGolemIconPath(golem)` (`assets/models/<folder>/golem_xxx.png`).
3. **Barra Lateral de Afinidad Elemental**: Tira vertical de 4px con el color representativo de la afinidad (`Vapor: Naranja`, `Galvánico: Cian`, `Mecánico: Dorado`, `Luminoso: Amarillo`, `Éter: Violeta`).
4. **Barra Gráfica de Vida**: Visualización progresiva con cambio dinámico de color:
   - Verde (`0.2, 0.85, 0.4`) para salud superior al 70%.
   - Ámbar (`0.9, 0.65, 0.15`) para salud entre 30% y 70%.
   - Rojo (`0.9, 0.2, 0.2`) para salud crítica menor al 30%.
5. **Botones Táctiles**: Estilo verde forja `Color4.create(0.18, 0.42, 0.22, 0.95)` con texto dorado/amarillo con evento `onMouseDown`.

---

## 🌐 5. Internacionalización y Soporte Bilingüe (i18n)

Todas las cadenas de la Torre Tesla se encuentran registradas en `src/i18n/types.ts`, `src/i18n/locales/es.ts` y `src/i18n/locales/en.ts`:

| Clave i18n | Español (`es.ts`) | Inglés (`en.ts`) |
| :--- | :--- | :--- |
| `tesla.title` | `⚡ TORRE TESLA GALVÁNICA` | `⚡ GALVANIC TESLA TOWER` |
| `tesla.subtitle` | `Estación de Recarga Energética (1 🪙 por 1 HP)` | `Energy Recharge Station (1 🪙 per 1 HP)` |
| `tesla.hoverText` | `⚡ Usar Torre Tesla para Recargar HP` | `⚡ Use Tesla Tower to Recharge HP` |
| `tesla.restore` | `Restaurar` | `Restore` |
| `tesla.restoreAll` | `RESTAURAR TODOS LOS GOLEMS` | `RESTORE ALL GOLEMS` |
| `tesla.fullHp` | `HP al Máximo` | `Full HP` |
| `tesla.notEnoughGears` | `Engranajes Insuficientes` | `Not Enough Gears` |
| `tesla.rechargeSuccess` | `⚡ ¡{name} ha sido recargado a {hp} HP por {cost} 🪙!` | `⚡ {name} has been recharged to {hp} HP for {cost} 🪙!` |
| `tesla.rechargeAllSuccess`| `⚡ ¡Todos los golems restaurados con éxito por {cost} 🪙!`| `⚡ All golems successfully restored for {cost} 🪙!` |
| `tesla.noGolemsNeedHp` | `✨ Todos tus golems están a su máxima salud.` | `✨ All your golems are at maximum health.` |
| `tesla.balanceLabel` | `Saldo Disponible` | `Available Balance` |
| `tesla.rateInfo` | `Tarifa: 1 Engranaje de Latón por cada 1 HP recargado` | `Rate: 1 Brass Gear per 1 HP restored` |
| `common.gears` | `Engranajes` | `Gears` |

---

## 🧪 6. Verificación de Compilación y Calidad

- **Comando de Build**: `npm run build`
- **Resultado de Compilación**: `Type checking completed without errors` (0 errores de TypeScript, binario empaquetado correctamente en `bin/index.js`).
