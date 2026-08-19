import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { ABANDONED_FACTORY_CONFIG } from '../config/abandonedFactoryConfig'

const ASSETS = ABANDONED_FACTORY_CONFIG.assets

export function createAbandonedFactory(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  buildSouthAssemblyHall(root)
  buildWestBoilersPavilion(root)
  buildEastValvesWarehouse(root)
  buildFactoryPerimeterRoads(root)
  buildFactoryWreckages(root)

  console.log('🏭 [Fábrica Abandonada] Anillo Intermedio instanciado con éxito.')
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

function buildSouthAssemblyHall(parent: Entity) {
  const center = ABANDONED_FACTORY_CONFIG.southAssemblyHall.center

  const offsets = [-2, 2]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z + 2))

  // Línea de montaje colapsada
  spawnProp(parent, ASSETS.gearShaft, Vector3.create(center.x, 0.05, center.z), Quaternion.Identity(), Vector3.create(1.8, 1.8, 1.8))
  spawnProp(parent, ASSETS.gearBig, Vector3.create(center.x, 0.4, center.z), Quaternion.fromEulerDegrees(90, 20, 0), Vector3.create(2.2, 2.2, 2.2))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 3.5, 0.02, center.z), Quaternion.Identity(), Vector3.create(1.3, 1.6, 1.3))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x - 3.5, 0.02, center.z))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x, 0.02, center.z - 2.5))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z + 2.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 4.5, 0.02, center.z - 3))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 4.5, 0.02, center.z - 3))
}

function buildWestBoilersPavilion(parent: Entity) {
  const center = ABANDONED_FACTORY_CONFIG.westBoilersPavilion.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x, 0.02, center.z + 2), Quaternion.Identity(), Vector3.create(1.4, 1.8, 1.4))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 2, 0.02, center.z))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2, 0.02, center.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 3.5, 0.02, center.z))
}

function buildEastValvesWarehouse(parent: Entity) {
  const center = ABANDONED_FACTORY_CONFIG.eastValvesWarehouse.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x + 2, 0.02, center.z))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(center.x - 2, 0.3, center.z + 1.5))
  spawnProp(parent, ASSETS.gear5Teeth, Vector3.create(center.x - 2, 0.3, center.z - 1.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 3.5, 0.02, center.z))
}

function buildFactoryPerimeterRoads(parent: Entity) {
  // Troncal Sur que conecta con la Rampa Sur de la Arena (200, 154) -> (200, 164)
  for (let z = 154; z <= 164; z += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(200, 0.02, z), Quaternion.Identity())
  }

  // Troncal Oeste que conecta con la Rampa Oeste de la Arena (154, 200) -> (164, 200)
  for (let x = 154; x <= 164; x += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 200), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // Troncal Este que conecta con la Rampa Este de la Arena (236, 200) -> (246, 200)
  for (let x = 236; x <= 246; x += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 200), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // Troncal Norte que conecta con la Rampa Norte de la Arena (200, 236) -> (200, 246)
  for (let z = 236; z <= 246; z += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(200, 0.02, z), Quaternion.Identity())
  }
}

function buildFactoryWreckages(parent: Entity) {
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(185, 0.02, 160), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(187, 0.3, 162), Quaternion.fromEulerDegrees(35, 10, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(183, 0.02, 158))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(215, 0.02, 160), Quaternion.fromEulerDegrees(0, 115, 0))
  spawnProp(parent, ASSETS.tank, Vector3.create(217, 0.02, 158), Quaternion.fromEulerDegrees(15, 30, 20), Vector3.create(1.2, 1.2, 1.2))
}
