import { Vector3 } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN Y CONSTANTES DE LAS CALDERAS DE LA FUNDICIÓN (ESQUINA SURESTE)
 * ============================================================================
 * Define las coordenadas espaciales, centros térmicos de fundición y catálogo
 * de assets para la zona de materiales épicos (260m a 400m X, 0m a 140m Z).
 * Superficie: 140m x 140m = 19.600 m².
 */

export const FOUNDRY_BOILERS_CONFIG = {
  // Límites espaciales en el mundo (400x400m)
  bounds: {
    minX: 260,
    maxX: 400,
    minZ: 0,
    maxZ: 140
  },

  // Portal de Entrada Noroeste (Acceso a las Calderas)
  gate: {
    position: Vector3.create(270, 0.05, 130),
    name: 'Portal de las Calderas de Fundición',
    width: 12
  },

  // Centros Térmicos e Hitos de Fundición
  centralFurnace: {
    center: Vector3.create(330, 0.05, 70),
    name: 'El Gran Horno / Caldera Central'
  },
  aetherReactorTower: {
    center: Vector3.create(370, 0.05, 100),
    name: 'Complejo del Reactor de Éter y Fusión'
  },
  coolingPlatesPavilion: {
    center: Vector3.create(295, 0.05, 40),
    name: 'Pabellón de Enfriamiento y Vaciado de Placas'
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
    number07: 'assets/asset-packs/steampunk_number_07/SteamPunk_Number_07.glb',

    // Engranajes y maquinaria de fundición
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

    // Escombros y escoria de fundición
    woodPlanksBroken: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb'
  }
}
