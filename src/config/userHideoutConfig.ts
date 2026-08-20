import { Vector3, Quaternion } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN DEL ESCONDITE Y BÓVEDA DEL JUGADOR (USER'S HIDEOUT & VAULT)
 * ============================================================================
 * Ubicación: Punto medio exacto entre el Trampolín de Vapor (X: 5.1m, Z: 7.1m)
 * y el Puesto de Mercado #06 (X: 6.4m, Z: 28.3m).
 *
 * Coordenadas de simetría y alineación:
 * - Centro en Z: 17.70m (Punto medio equidistante: deja 7.7m al Trampolín y 7.7m al Mercado).
 * - Alineación en X: Separado del borde del mapa (X: 3.8m a 8.2m), alineado con la línea
 *   de los puestos de mercado (Puesto #06 en X: 6.4m).
 *
 * Disposición:
 * - Pila de chatarra, refugio y silla (Fondo y laterales): X: 3.8m a 5.8m | Z: 15.0m a 20.4m
 * - Los 3 Cofres Cerrados (Frente despejado y separados entre sí y de la pila):
 *   - Cofre Sur (Izquierda): (X: 7.6m, Z: 15.4m)
 *   - Cofre Centro: (X: 8.0m, Z: 17.7m)
 *   - Cofre Norte (Derecha): (X: 7.6m, Z: 20.0m)
 *   - Separación entre cofres: 2.3m de distancia limpia entre sí.
 *   - Separación de la pila: Más de 2m adelantados en X respecto al refugio.
 */

export const USER_HIDEOUT_CONFIG = {
  bounds: {
    minX: 3.8,
    maxX: 8.2,
    minZ: 14.8,
    maxZ: 20.6
  },

  assets: {
    // Mobiliario principal (Silla y mesa de descanso bajo el tejadillo)
    steampunkChair: 'assets/asset-packs/steampunk_chair/Steampunk Chair.glb',
    drummChair: 'assets/asset-packs/drumm_chair/Drumm Chair.glb',
    gearTable: 'assets/asset-packs/gear_table/Gear Table.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
    lamp: 'assets/asset-packs/lamp/Lamp.glb',

    // Los 3 Cofres Cerrados al Frente (Separados de la pila y entre sí)
    closedChestLeft: 'assets/asset-packs/treasure_chest/chest_pirates.glb',
    closedChestCenter: 'assets/asset-packs/chest_plates/Chest Plates.glb',
    closedChestRight: 'assets/asset-packs/chest_gear/Chest Gear.glb',

    // Escombros, chatarra y montones de basura (Wreckages exclusivamente en fondo y laterales)
    trashGroup: 'assets/asset-packs/trash_group/Trash_Group.glb',
    trashCan: 'assets/asset-packs/trash_can/Trash_Can.glb',
    mineCart: 'assets/asset-packs/mines_cart_empty/Mines Cart Empty.glb',
    brokenMineFence: 'assets/asset-packs/mines_wood_fence_broken/Mines Wood Fence Broken.glb',
    treeFence: 'assets/asset-packs/tree_fence/Tree Fence.glb',
    woodPlanksBroken: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb',
    floorWood2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
    ceilingCanopy: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',
    woodLoose1: 'assets/asset-packs/wood_1/Wood 1.glb',
    woodLoose2: 'assets/asset-packs/wood_2/Wood 2.glb',

    // Engranajes monumentales y dispersos (agrupados en el fondo)
    gearBig: 'assets/asset-packs/gear_big/Gear Big.glb',
    gear10Teeth: 'assets/asset-packs/gear_10_teeth/Gear 10 Teeth.glb',
    gear8Teeth: 'assets/asset-packs/gear_8_teeth/Gear 8 Teeth.glb',
    gear5Teeth: 'assets/asset-packs/gear_5_teeth/Gear 5 Teeth.glb',
    gearAngled10: 'assets/asset-packs/gear_angled_10_teeth/Gear Angled 10 Teeth.glb',
    gearShaft: 'assets/asset-packs/gear_shaft/Gear Shaft.glb',
    gearSmall01: 'assets/asset-packs/gear_small_01/Gear Small_01.glb',
    gearSmall02: 'assets/asset-packs/gear_small_02/Gear Small_02.glb',

    // Elementos industriales y recipientes
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    tank: 'assets/asset-packs/tank/Tank.glb',
    hidrant: 'assets/asset-packs/hidrant/Hidrant.glb',
    lever: 'assets/asset-packs/lever/Lever.glb',
    switch: 'assets/asset-packs/switch/Switch.glb'
  }
}
