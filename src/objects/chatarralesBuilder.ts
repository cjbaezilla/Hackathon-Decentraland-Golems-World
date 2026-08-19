import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { CHATARRALES_CONFIG } from '../config/chatarralesConfig'

const ASSETS = CHATARRALES_CONFIG.assets

export function createChatarrales(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  buildScavengerCamp(root)
  buildBrassDepot(root)
  buildMinorFoundryWorkshop(root)
  buildRoadNetwork(root)
  buildChatarralesWreckages(root)

  console.log('🔩 [Los Chatarrales] Sector Oeste instanciado con éxito.')
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

function buildScavengerCamp(parent: Entity) {
  const center = CHATARRALES_CONFIG.scavengerCamp.center

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

  // Bancos de clasificación y suministros
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 2.5, 0.02, center.z + 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x + 2.5, 0.02, center.z + 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 2.2, 0.02, center.z - 2.8))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(center.x + 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z - 4.5))
}

function buildBrassDepot(parent: Entity) {
  const center = CHATARRALES_CONFIG.brassDepot.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 2.5, 0.02, center.z + 2), Quaternion.Identity(), Vector3.create(1.3, 1.6, 1.3))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(center.x - 2, 0.3, center.z + 1.5))
  spawnProp(parent, ASSETS.gear5Teeth, Vector3.create(center.x - 2, 0.3, center.z - 1.5))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 3.5, 0.02, center.z))
}

function buildMinorFoundryWorkshop(parent: Entity) {
  const center = CHATARRALES_CONFIG.minorFoundryWorkshop.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x + 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x - 2, 0.02, center.z + 2), Quaternion.Identity())
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z - 3.5))
}

function buildRoadNetwork(parent: Entity) {
  // Troncal norte-sur en X=70 desde Z=144 hasta Z=256 (une Forja con Desierto)
  for (let z = 144; z <= 256; z += 6) {
    if (z >= 194 && z <= 206) continue
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(70, 0.02, z), Quaternion.Identity())
    if (z % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(73.5, 0.02, z))
      spawnProp(parent, ASSETS.lamp, Vector3.create(66.5, 0.02, z))
    }
  }

  // Ramal hacia Depósito de Latón (70, 170) -> (44, 170)
  for (let x = 44; x <= 66; x += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 170), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // Ramal hacia Fundición Menor (70, 230) -> (96, 230)
  for (let x = 74; x <= 96; x += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 230), Quaternion.fromEulerDegrees(0, 90, 0))
  }
}

function buildChatarralesWreckages(parent: Entity) {
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(55, 0.02, 215), Quaternion.fromEulerDegrees(0, 35, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(57, 0.3, 217), Quaternion.fromEulerDegrees(45, 20, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(53, 0.02, 213))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(85, 0.02, 185), Quaternion.fromEulerDegrees(0, 120, 0))
  spawnProp(parent, ASSETS.tank, Vector3.create(87, 0.02, 183), Quaternion.fromEulerDegrees(20, 40, 10), Vector3.create(1.2, 1.2, 1.2))
}
