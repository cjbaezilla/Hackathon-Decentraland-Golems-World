import { Vector3 } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN DEL LABORATORIO STEAMPUNK DE CREACIÓN DE GOLEMS (WRECKAGE LAB)
 * ============================================================================
 * Ubicación: Distrito de la Forja (Parcelas [1, 2] y [2, 2]).
 * Diseño Completo y Monumental Original con Anclaje Frontal en Parcela [1, 2] (X: 24.9m, Z: 38.3m).
 *
 * Dimensiones:
 * - Huella Total: 20m de ancho (X: 25.0m a 45.0m) x 8.5m de profundidad (Z: 30.0m a 38.5m)
 * - Centro Geométrico: (X: 35.0m, Y: 0.05m, Z: 34.0m)
 * - Anclaje Frontal: (X: 24.9m, Y: 0.05m, Z: 38.3m)
 */

export const WRECKAGE_LAB_CONFIG = {
  bounds: {
    minX: 25.0,
    maxX: 45.0,
    minZ: 30.0,
    maxZ: 38.5
  },
  center: Vector3.create(35.0, 0.05, 34.0),
  frontAnchor: Vector3.create(24.9, 0.05, 38.3),

  // Catálogo de modelos 3D steampunk oficiales (.glb)
  assets: {
    // Suelos, cubiertas y estructuras
    floorWood4x4: 'assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb',
    floorWood2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
    woodPlanksBroken: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb',
    ceiling4x4: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',
    treeFence: 'assets/asset-packs/tree_fence/Tree Fence.glb',

    // Maquinaria, engranajes y transmisión
    gearBig: 'assets/asset-packs/gear_big/Gear Big.glb',
    gear10Teeth: 'assets/asset-packs/gear_10_teeth/Gear 10 Teeth.glb',
    gear8Teeth: 'assets/asset-packs/gear_8_teeth/Gear 8 Teeth.glb',
    gear5Teeth: 'assets/asset-packs/gear_5_teeth/Gear 5 Teeth.glb',
    gearAngled10Teeth: 'assets/asset-packs/gear_angled_10_teeth/Gear Angled 10 Teeth.glb',
    gearShaft: 'assets/asset-packs/gear_shaft/Gear Shaft.glb',
    gearSmall01: 'assets/asset-packs/gear_small_01/Gear Small_01.glb',
    gearSmall02: 'assets/asset-packs/gear_small_02/Gear Small_02.glb',
    gearSmall03: 'assets/asset-packs/gear_small_03/Gear Small_03.glb',

    // Contenedores, tolvas y depósitos
    chestPlates: 'assets/asset-packs/chest_plates/Chest Plates.glb',
    chestGear: 'assets/asset-packs/chest_gear/Chest Gear.glb',
    chestTube: 'assets/asset-packs/chest_tube/Chest Tube.glb',
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    tank: 'assets/asset-packs/tank/Tank.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    hidrant: 'assets/asset-packs/hidrant/Hidrant.glb',

    // Controles, palancas e iluminación
    lever: 'assets/asset-packs/lever/Lever.glb',
    switch: 'assets/asset-packs/switch/Switch.glb',
    lamp: 'assets/asset-packs/lamp/Lamp.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
    number01: 'assets/asset-packs/steampunk_number_01/SteamPunk_Number_01.glb',
    number02: 'assets/asset-packs/steampunk_number_02/SteamPunk_Number_02.glb',

    // Prototipo de Golem de muestra para la bahía de salida
    prototypeGolem: 'assets/models/steam/golem_steam.glb'
  }
}
