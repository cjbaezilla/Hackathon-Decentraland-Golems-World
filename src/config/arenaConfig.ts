import { Vector3 } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN DE LA ARENA CIRCULAR DE TORNEO STEAMPUNK (ESTILO CELL GAMES)
 * ============================================================================
 * Define las coordenadas, dimensiones, radios de combate y rutas de modelos 3D
 * para la gran arena central en el mapa de 400m x 400m de Decentraland.
 */

export const ARENA_CONFIG = {
  // Centro exacto del mapa de 25x25 parcelas (400m x 400m)
  center: Vector3.create(200, 0, 200),

  // Radio exterior de la plataforma circular colosal (diámetro 72m)
  radius: 36,

  // Altura del suelo elevado de la arena sobre el terreno base
  platformHeight: 0.6,

  // Altura de los 4 grandes pilares monumentales de esquina (12 metros)
  pillarHeight: 12.0,

  // Velocidad de rotación del engranaje central (radianes por segundo)
  centerGearRotationSpeed: 0.20,

  // Velocidad de rotación de los engranajes de los pilares
  pillarGearRotationSpeed: 0.45,

  // Rutas canónicas a los modelos 3D locales (Asset Packs DCL)
  models: {
    // Pisos y losas
    woodFloor4x4: 'assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb',
    woodFloor2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
    woodBroken4x4: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb',
    ceilingTile4x4: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',
    roadStraight: 'assets/asset-packs/road_cobble_straight/Road Cobble Straight.glb',
    roadAngled: 'assets/asset-packs/road_cobble_angled/Road Cobble Angled.glb',
    roadAngle: 'assets/asset-packs/road_angle/Road Angle.glb',
    roadCross: 'assets/asset-packs/road_cross/Road Cross.glb',

    // Pilares y estructuras
    tank: 'assets/asset-packs/tank/Tank.glb',
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    gearShaft: 'assets/asset-packs/gear_shaft/Gear Shaft.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    lamp: 'assets/asset-packs/lamp/Lamp.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',

    // Engranajes
    gearBig: 'assets/asset-packs/gear_big/Gear Big.glb',
    gear10Teeth: 'assets/asset-packs/gear_10_teeth/Gear 10 Teeth.glb',
    gear8Teeth: 'assets/asset-packs/gear_8_teeth/Gear 8 Teeth.glb',
    gear5Teeth: 'assets/asset-packs/gear_5_teeth/Gear 5 Teeth.glb',
    gearAngled10Teeth: 'assets/asset-packs/gear_angled_10_teeth/Gear Angled 10 Teeth.glb',
    gearSmall01: 'assets/asset-packs/gear_small_01/Gear Small_01.glb',
    gearSmall02: 'assets/asset-packs/gear_small_02/Gear Small_02.glb',
    gearSmall03: 'assets/asset-packs/gear_small_03/Gear Small_03.glb',

    // Números e indicadores perimetrales
    numbers: [
      'assets/asset-packs/steampunk_number_00/SteamPunk_Number_00.glb',
      'assets/asset-packs/steampunk_number_01/SteamPunk_Number_01.glb',
      'assets/asset-packs/steampunk_number_02/SteamPunk_Number_02.glb',
      'assets/asset-packs/steampunk_number_03/SteamPunk_Number_03.glb',
      'assets/asset-packs/steampunk_number_04/SteamPunk_Number_04.glb',
      'assets/asset-packs/steampunk_number_05/SteamPunk_Number_05.glb',
      'assets/asset-packs/steampunk_number_06/SteamPunk_Number_06.glb',
      'assets/asset-packs/steampunk_number_07/SteamPunk_Number_07.glb',
      'assets/asset-packs/steampunk_number_08/SteamPunk_Number_08.glb'
    ],

    // Vallas y accesorios
    treeFence: 'assets/asset-packs/tree_fence/Tree Fence.glb',
    hidrant: 'assets/asset-packs/hidrant/Hidrant.glb',
    switch: 'assets/asset-packs/switch/Switch.glb',
    chestGear: 'assets/asset-packs/chest_gear/Chest Gear.glb',
    chestPlates: 'assets/asset-packs/chest_plates/Chest Plates.glb',
    chestTube: 'assets/asset-packs/chest_tube/Chest Tube.glb',
    sword: 'assets/asset-packs/arthur_sword/Arthur Sword.glb'
  }
}
