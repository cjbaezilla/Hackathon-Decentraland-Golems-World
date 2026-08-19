import { Vector3 } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN Y CONSTANTES DE LA RESERVA DE MINERÍA (ZONA SEGURA NORESTE)
 * ============================================================================
 * Define las coordenadas espaciales, centros neurálgicos, sectores de extracción
 * y catálogo de assets para la zona segura más lejana del mapa (260m a 400m en X y Z).
 * Superficie: 140m x 140m = 19.600 m² (~3x el tamaño del Distrito de la Forja).
 */

export const MINING_RESERVE_CONFIG = {
  // Límites espaciales en el mundo (25x25 parcelas / 400x400m)
  bounds: {
    minX: 260,
    maxX: 400,
    minZ: 260,
    maxZ: 400
  },

  // Portal de Entrada Sudoeste (Acceso a la Reserva)
  gate: {
    position: Vector3.create(270, 0.05, 270),
    name: 'Portal de la Reserva Minera',
    width: 12
  },

  // Centros de Excavación y Pabellones
  centralQuarry: {
    center: Vector3.create(340, 0.05, 340),
    name: 'Cantera Central de Éter y Maná'
  },
  clockworkWorkshop: {
    center: Vector3.create(360, 0.05, 375),
    name: 'Taller de Relojería y Engranajes de Bronce'
  },
  deepProspectingRig: {
    center: Vector3.create(375, 0.05, 295),
    name: 'Pozo de Prospección Profunda de Éter'
  },
  explorersShelter: {
    center: Vector3.create(290, 0.05, 340),
    name: 'Refugio de los Exploradores'
  },

  // Catálogo de modelos 3D steampunk oficiales
  assets: {
    // Suelos, plataformas y techos
    floorWood4x4: 'assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb',
    floorWood2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
    ceiling4x4: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',
    roadCobbleStraight: 'assets/asset-packs/road_cobble_straight/Road Cobble Straight.glb',
    roadCobbleAngled: 'assets/asset-packs/road_cobble_angled/Road Cobble Angled.glb',
    roadCross: 'assets/asset-packs/road_cross/Road Cross.glb',
    roadAngle: 'assets/asset-packs/road_angle/Road Angle.glb',

    // Delimitación, vallas y estructuras
    treeFence: 'assets/asset-packs/tree_fence/Tree Fence.glb',
    tank: 'assets/asset-packs/tank/Tank.glb',
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    hidrant: 'assets/asset-packs/hidrant/Hidrant.glb',

    // Iluminación y señalética
    lamp: 'assets/asset-packs/lamp/Lamp.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
    number03: 'assets/asset-packs/steampunk_number_03/SteamPunk_Number_03.glb',
    number04: 'assets/asset-packs/steampunk_number_04/SteamPunk_Number_04.glb',
    number05: 'assets/asset-packs/steampunk_number_05/SteamPunk_Number_05.glb',

    // Maquinaria de extracción y herramientas
    gearBig: 'assets/asset-packs/gear_big/Gear Big.glb',
    gear10Teeth: 'assets/asset-packs/gear_10_teeth/Gear 10 Teeth.glb',
    gear8Teeth: 'assets/asset-packs/gear_8_teeth/Gear 8 Teeth.glb',
    gear5Teeth: 'assets/asset-packs/gear_5_teeth/Gear 5 Teeth.glb',
    gearAngled10Teeth: 'assets/asset-packs/gear_angled_10_teeth/Gear Angled 10 Teeth.glb',
    gearShaft: 'assets/asset-packs/gear_shaft/Gear Shaft.glb',
    gearSmall01: 'assets/asset-packs/gear_small_01/Gear Small_01.glb',
    gearSmall02: 'assets/asset-packs/gear_small_02/Gear Small_02.glb',
    gearSmall03: 'assets/asset-packs/gear_small_03/Gear Small_03.glb',
    chestGear: 'assets/asset-packs/chest_gear/Chest Gear.glb',
    chestPlates: 'assets/asset-packs/chest_plates/Chest Plates.glb',
    chestTube: 'assets/asset-packs/chest_tube/Chest Tube.glb',
    switch: 'assets/asset-packs/switch/Switch.glb',
    lever: 'assets/asset-packs/lever/Lever.glb',
    arthurSword: 'assets/asset-packs/arthur_sword/Arthur Sword.glb',

    // Escombros y relaves mineros (Wreckages & Tailings)
    woodPlanksBroken: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb'
  }
}
