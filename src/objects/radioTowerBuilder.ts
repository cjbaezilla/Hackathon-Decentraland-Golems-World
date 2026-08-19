import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { RADIO_TOWER_CONFIG } from '../config/radioTowerConfig'

const ASSETS = RADIO_TOWER_CONFIG.assets

export function createRadioTower(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  buildMainAntennaMast(root)
  buildLedSignalsStation(root)
  buildListeningOutpost(root)
  buildRoadNetwork(root)
  buildRadioWreckages(root)

  console.log('📻 [Torre de Radio] Sector Este instanciado con éxito.')
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

function buildMainAntennaMast(parent: Entity) {
  const center = RADIO_TOWER_CONFIG.mainAntennaMast.center

  const offsets = [-4, 0, 4]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })

  // Torre vertical de transmisión a 8m de altura
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x, 0.02, center.z), Quaternion.Identity(), Vector3.create(1.8, 2.4, 1.8))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x, 4.8, center.z), Quaternion.Identity(), Vector3.create(1.4, 2.0, 1.4))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x, 8.8, center.z))

  // Mástil de engranajes y relés
  spawnProp(parent, ASSETS.gearShaft, Vector3.create(center.x + 2.5, 0.05, center.z), Quaternion.Identity(), Vector3.create(1.8, 2.0, 1.8))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(center.x + 2.5, 3.6, center.z), Quaternion.fromEulerDegrees(60, 0, 0), Vector3.create(1.5, 1.5, 1.5))
  spawnProp(parent, ASSETS.gearBig, Vector3.create(center.x - 2.5, 0.5, center.z), Quaternion.fromEulerDegrees(90, 45, 0), Vector3.create(2.2, 2.2, 2.2))

  // Cajas de condensadores y farolas de señal
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x + 3.5, 0.05, center.z + 4))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x - 3.5, 0.05, center.z + 4))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x + 1.5, 0.05, center.z + 4))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x - 1.5, 0.05, center.z + 4))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z - 6.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z + 6.5))
}

function buildLedSignalsStation(parent: Entity) {
  const center = RADIO_TOWER_CONFIG.ledSignalsStation.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z))

  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x - 2, 0.02, center.z + 1.5))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x + 2, 0.02, center.z + 1.5))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x, 0.02, center.z - 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(center.x - 2.5, 0.3, center.z - 1.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2.5, 0.02, center.z - 1.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z + 3.5))
}

function buildListeningOutpost(parent: Entity) {
  const center = RADIO_TOWER_CONFIG.listeningOutpost.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 2.5, 0.02, center.z + 2), Quaternion.Identity(), Vector3.create(1.2, 1.5, 1.2))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x - 2.5, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x, 0.02, center.z + 1.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 2, 0.02, center.z - 2))
}

function buildRoadNetwork(parent: Entity) {
  // Troncal este-oeste desde X=244 Z=200 hasta X=390
  for (let x = 244; x <= 390; x += 6) {
    if (x >= 334 && x <= 346) continue
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 200), Quaternion.fromEulerDegrees(0, 90, 0))
    if (x % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 203.5))
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 196.5))
    }
  }

  // Ramal hacia Estación LED (320, 200) -> (320, 226)
  for (let z = 204; z <= 226; z += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(320, 0.02, z), Quaternion.Identity())
  }

  // Ramal hacia Puesto de Escucha (360, 200) -> (360, 174)
  for (let z = 174; z <= 196; z += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(360, 0.02, z), Quaternion.Identity())
  }
}

function buildRadioWreckages(parent: Entity) {
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(350, 0.02, 215), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(352, 0.3, 217), Quaternion.fromEulerDegrees(40, 15, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(348, 0.02, 213))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(330, 0.02, 185), Quaternion.fromEulerDegrees(0, 110, 0))
  spawnProp(parent, ASSETS.tank, Vector3.create(332, 0.02, 183), Quaternion.fromEulerDegrees(15, 30, 10), Vector3.create(1.2, 1.2, 1.2))
}
