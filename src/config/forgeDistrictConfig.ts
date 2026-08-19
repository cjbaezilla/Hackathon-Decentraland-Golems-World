import { Vector3 } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN Y CONSTANTES DEL DISTRITO DE LA FORJA (ZONA INICIAL 0,0 - 80m x 80m)
 * ============================================================================
 * Define las coordenadas clave, dimensiones, trazados de caminos y catálogo
 * de assets steampunk oficiales para la ambientación de la ciudad inicial.
 */

export const FORGE_DISTRICT_CONFIG = {
  // Límites espaciales (metros en el mundo de 400x400m)
  bounds: {
    minX: 0,
    maxX: 80,
    minZ: 0,
    maxZ: 80
  },

  // Centros neurálgicos
  spawnPlaza: {
    center: Vector3.create(16, 0.05, 6),
    size: 16
  },
  centralForgeSquare: {
    center: Vector3.create(40, 0.05, 40),
    radius: 12
  },

  // Puertas de delimitación perimetral hacia Los Chatarrales
  gates: {
    northGate: {
      position: Vector3.create(40, 0.05, 80),
      name: 'Puerta Norte (Los Chatarrales)',
      width: 10
    },
    eastGate: {
      position: Vector3.create(80, 0.05, 40),
      name: 'Puerta Este (Rumbo a Calderas)',
      width: 10
    }
  },

  // Catálogo de modelos 3D steampunk (.glb)
  assets: {
    // Caminos y suelos
    roadCobbleStraight: 'assets/asset-packs/road_cobble_straight/Road Cobble Straight.glb',
    roadCobbleAngled: 'assets/asset-packs/road_cobble_angled/Road Cobble Angled.glb',
    roadCross: 'assets/asset-packs/road_cross/Road Cross.glb',
    roadAngle: 'assets/asset-packs/road_angle/Road Angle.glb',
    floorWood4x4: 'assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb',
    floorWood2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
    ceiling4x4: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',

    // Delimitación, vallas y estructuras
    treeFence: 'assets/asset-packs/tree_fence/Tree Fence.glb',
    tank: 'assets/asset-packs/tank/Tank.glb',
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    hidrant: 'assets/asset-packs/hidrant/Hidrant.glb',

    // Iluminación y señalética
    lamp: 'assets/asset-packs/lamp/Lamp.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
    number00: 'assets/asset-packs/steampunk_number_00/SteamPunk_Number_00.glb',
    number01: 'assets/asset-packs/steampunk_number_01/SteamPunk_Number_01.glb',
    number02: 'assets/asset-packs/steampunk_number_02/SteamPunk_Number_02.glb',
    number03: 'assets/asset-packs/steampunk_number_03/SteamPunk_Number_03.glb',

    // Engranajes y maquinaria
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

    // Escombros y chatarra de transición (Wreckages)
    woodPlanksBroken: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb'
  }
}
