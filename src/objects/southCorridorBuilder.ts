import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { SOUTH_CORRIDOR_CONFIG } from '../config/southCorridorConfig'

const ASSETS = SOUTH_CORRIDOR_CONFIG.assets

export function createSouthCorridor(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Puesto de Control y Baliza en la Parcela [13, 1] (X: 212, Z: 24)
  buildSouthOutpost(root)

  // 2. Gran Red Vial del Sur (Eje X=200 Norte-Sur y Eje Z=70 Este-Oeste)
  buildSouthHighway(root)

  // 3. Estación de Reabastecimiento de Vapor Sur (170, 40)
  buildFuelDepot(root)

  // 4. Cúmulos de Chatarra y Escombros del Sur
  buildSouthWreckages(root)

  console.log('🛣️ [Corredor Sur] Gran Vía y Puesto de Control (Parcela 13,1 en 212, 24) instanciados con éxito.')
  return root
}

function spawnProp(
  parent: Entity,
  modelSrc: string,
  pos: Vector3,
  rot: Quaternion = Quaternion.Identity(),
  scale: Vector3 = Vector3.One()
): Entity {
  const entity = engine.addEntity()
  Transform.create(entity, {
    parent,
    position: pos,
    rotation: rot,
    scale
  })
  GltfContainer.create(entity, {
    src: modelSrc
  })
  return entity
}

/**
 * 1. Puesto de Control y Baliza en la Parcela [13, 1] (X: 208..224m, Z: 16..32m)
 */
function buildSouthOutpost(parent: Entity) {
  const center = SOUTH_CORRIDOR_CONFIG.southOutpost.center // (212, 0.05, 24)

  // Plataforma techada de 8x8m
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  // Techo industrial elevado
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z + 2))

  // Baliza de engranajes y transmisión
  spawnProp(parent, ASSETS.gearShaft, Vector3.create(center.x, 0.05, center.z), Quaternion.Identity(), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.gearBig, Vector3.create(center.x, 0.35, center.z), Quaternion.fromEulerDegrees(90, 0, 0), Vector3.create(1.8, 1.8, 1.8))
  spawnProp(parent, ASSETS.gear10Teeth, Vector3.create(center.x + 2.0, 0.3, center.z), Quaternion.fromEulerDegrees(0, 45, 0), Vector3.create(1.2, 1.2, 1.2))

  // Tanque de vapor y chimenea
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 3.5, 0.02, center.z + 2.5), Quaternion.Identity(), Vector3.create(1.3, 1.6, 1.3))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x - 3.5, 0.02, center.z + 2.5))

  // Suministros, farolas e hidrante
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 2.5, 0.02, center.z - 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x + 2.5, 0.02, center.z - 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(center.x - 4.2, 0.02, center.z))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 4.2, 0.02, center.z))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 4.2, 0.02, center.z - 1.0))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z - 2.5))

  // Farolas de acceso
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 5.0, 0.02, center.z - 4.0))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 5.0, 0.02, center.z - 4.0))
}

/**
 * 2. Gran Red Vial del Sur (Eje X=200 Norte-Sur y Eje Z=70 Este-Oeste)
 */
function buildSouthHighway(parent: Entity) {
  // A. Eje Troncal Norte-Sur en X = 200 (Desde Z = 4 hasta Z = 150)
  for (let z = 4; z <= 150; z += 6) {
    if (z >= 64 && z <= 76) continue // Cruce transversal en (200, 70)
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(200, 0.02, z), Quaternion.Identity())
    if (z % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(203.5, 0.02, z))
      spawnProp(parent, ASSETS.lamp, Vector3.create(196.5, 0.02, z))
    }
  }

  // B. Eje Troncal Este-Oeste en Z = 70 (Une Forja X=140 con Calderas X=260)
  for (let x = 142; x <= 258; x += 6) {
    if (x >= 194 && x <= 206) continue // Cruce central
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 70), Quaternion.fromEulerDegrees(0, 90, 0))
    if (x % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 73.5))
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 66.5))
    }
  }

  // C. Cruce Monumental en (200, 70)
  spawnProp(parent, ASSETS.roadCross, Vector3.create(200, 0.02, 70), Quaternion.Identity())

  // D. Ramal de Acceso hacia el Puesto de Parcela 13,1 en (212, 24)
  for (let x = 202; x <= 212; x += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 24), Quaternion.fromEulerDegrees(0, 90, 0))
  }
}

/**
 * 3. Estación de Reabastecimiento de Vapor Sur (170, 40)
 */
function buildFuelDepot(parent: Entity) {
  const center = SOUTH_CORRIDOR_CONFIG.fuelDepot.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 2.5, 0.02, center.z + 2), Quaternion.Identity(), Vector3.create(1.4, 1.8, 1.4))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x - 2.5, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x, 0.02, center.z + 1.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 3.5, 0.02, center.z))

  // Conector al cruce Z=70
  for (let z = 44; z <= 66; z += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(center.x, 0.02, z), Quaternion.Identity())
  }
}

/**
 * 4. Cúmulos de Chatarra y Escombros del Sur
 */
function buildSouthWreckages(parent: Entity) {
  // Cúmulo cerca de la parcela 13,1 (222, 20)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(224, 0.02, 20), Quaternion.fromEulerDegrees(0, 25, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(226, 0.3, 22), Quaternion.fromEulerDegrees(45, 10, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(222, 0.02, 18))

  // Cúmulo al oeste del cruce (185, 80)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(185, 0.02, 80), Quaternion.fromEulerDegrees(0, 110, 0))
  spawnProp(parent, ASSETS.tank, Vector3.create(187, 0.02, 78), Quaternion.fromEulerDegrees(15, 30, 10), Vector3.create(1.2, 1.2, 1.2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(183, 0.02, 82))
}
