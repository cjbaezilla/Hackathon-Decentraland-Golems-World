import { Vector3, Quaternion } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN DE LOS PUESTOS DE COMERCIO (TRADING POSTS - DISTRITO DE LA FORJA)
 * ============================================================================
 * Define las coordenadas equidistantes (8.29m entre sí), orientación y modelos 3D
 * steampunk para los 5 quioscos de intercambio y venta de bienes.
 */

export interface TradingPostData {
  id: number
  name: string
  position: Vector3
  rotation: Quaternion
  numberAsset: string
  counterAsset: string
}

export const TRADING_POSTS_CONFIG = {
  // Catálogo de assets steampunk (.glb) utilizados para la estructura
  assets: {
    floorWood2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
    floorWood4x4: 'assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb',
    ceiling4x4: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',
    gearShaft: 'assets/asset-packs/gear_shaft/Gear Shaft.glb',
    gearSmall01: 'assets/asset-packs/gear_small_01/Gear Small_01.glb',
    gearSmall02: 'assets/asset-packs/gear_small_02/Gear Small_02.glb',
    chestPlates: 'assets/asset-packs/chest_plates/Chest Plates.glb',
    chestGear: 'assets/asset-packs/chest_gear/Chest Gear.glb',
    chestTube: 'assets/asset-packs/chest_tube/Chest Tube.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
    lamp: 'assets/asset-packs/lamp/Lamp.glb',
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    switch: 'assets/asset-packs/switch/Switch.glb',
    lever: 'assets/asset-packs/lever/Lever.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    numbers: [
      'assets/asset-packs/steampunk_number_01/SteamPunk_Number_01.glb',
      'assets/asset-packs/steampunk_number_02/SteamPunk_Number_02.glb',
      'assets/asset-packs/steampunk_number_03/SteamPunk_Number_03.glb',
      'assets/asset-packs/steampunk_number_04/SteamPunk_Number_04.glb',
      'assets/asset-packs/steampunk_number_05/SteamPunk_Number_05.glb'
    ]
  },

  // 5 Puestos equidistantes en la zona intermedia centrada (X: 30.0m a 63.0m)
  posts: [
    {
      id: 1,
      name: 'Puesto de Comercio #01',
      position: Vector3.create(30.00, 0.02, 7.00),
      rotation: Quaternion.fromEulerDegrees(0, 7.3, 0),
      numberAsset: 'assets/asset-packs/steampunk_number_01/SteamPunk_Number_01.glb',
      counterAsset: 'assets/asset-packs/chest_plates/Chest Plates.glb'
    },
    {
      id: 2,
      name: 'Puesto de Comercio #02',
      position: Vector3.create(38.25, 0.02, 7.90),
      rotation: Quaternion.fromEulerDegrees(0, 7.3, 0),
      numberAsset: 'assets/asset-packs/steampunk_number_02/SteamPunk_Number_02.glb',
      counterAsset: 'assets/asset-packs/chest_gear/Chest Gear.glb'
    },
    {
      id: 3,
      name: 'Puesto de Comercio #03',
      position: Vector3.create(46.50, 0.02, 8.80),
      rotation: Quaternion.fromEulerDegrees(0, 7.3, 0),
      numberAsset: 'assets/asset-packs/steampunk_number_03/SteamPunk_Number_03.glb',
      counterAsset: 'assets/asset-packs/chest_plates/Chest Plates.glb'
    },
    {
      id: 4,
      name: 'Puesto de Comercio #04',
      position: Vector3.create(54.75, 0.02, 9.70),
      rotation: Quaternion.fromEulerDegrees(0, 7.3, 0),
      numberAsset: 'assets/asset-packs/steampunk_number_04/SteamPunk_Number_04.glb',
      counterAsset: 'assets/asset-packs/chest_tube/Chest Tube.glb'
    },
    {
      id: 5,
      name: 'Puesto de Comercio #05',
      position: Vector3.create(63.00, 0.02, 10.60),
      rotation: Quaternion.fromEulerDegrees(0, 7.3, 0),
      numberAsset: 'assets/asset-packs/steampunk_number_05/SteamPunk_Number_05.glb',
      counterAsset: 'assets/asset-packs/chest_gear/Chest Gear.glb'
    }
  ] as TradingPostData[]
}
