import { Vector3 } from '@dcl/sdk/math'

/**
 * ============================================================================
 * CONFIGURACIÓN Y CONSTANTES DE LOS CHATARRALES (SECTOR OESTE / ANILLO 1)
 * ============================================================================
 * Coordenadas espaciales y catálogo de assets para la zona de materiales comunes (0..140m X, 140..260m Z).
 */

export const CHATARRALES_CONFIG = {
  bounds: {
    minX: 0,
    maxX: 140,
    minZ: 140,
    maxZ: 260
  },

  scavengerCamp: {
    center: Vector3.create(70, 0.05, 200),
    name: 'Campamento de Chatarreros'
  },
  brassDepot: {
    center: Vector3.create(40, 0.05, 170),
    name: 'Depósito de Chatarra de Latón'
  },
  minorFoundryWorkshop: {
    center: Vector3.create(100, 0.05, 230),
    name: 'Taller de Fundición Menor'
  },

  assets: {
    floorWood4x4: 'assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb',
    ceiling4x4: 'assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb',
    roadCobbleStraight: 'assets/asset-packs/road_cobble_straight/Road Cobble Straight.glb',
    roadCross: 'assets/asset-packs/road_cross/Road Cross.glb',
    treeFence: 'assets/asset-packs/tree_fence/Tree Fence.glb',
    tank: 'assets/asset-packs/tank/Tank.glb',
    barrel: 'assets/asset-packs/barrel/Barrel.glb',
    smoker: 'assets/asset-packs/smoker/Smoker.glb',
    hidrant: 'assets/asset-packs/hidrant/Hidrant.glb',
    lamp: 'assets/asset-packs/lamp/Lamp.glb',
    tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
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
    woodPlanksBroken: 'assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb'
  }
}
