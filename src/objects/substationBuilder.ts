import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { SUBSTATION_CONFIG } from '../config/substationConfig'

const ASSETS = SUBSTATION_CONFIG.assets

export function createSubstation(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  buildGalvanicCenter(root)
  buildAlchemicalBatteries(root)
  buildSteamEnginesStation(root)
  buildRoadNetwork(root)
  buildGalvanicWreckages(root)

  console.log('⚡ [Subestación Eléctrica] Sector Norte instanciado con éxito.')
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

function buildGalvanicCenter(parent: Entity) {
  const center = SUBSTATION_CONFIG.galvanicCenter.center

  const offsets = [-4, 0, 4]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })

  // Eje de transformador galvánico
  spawnProp(parent, ASSETS.gearShaft, Vector3.create(center.x, 0.05, center.z), Quaternion.Identity(), Vector3.create(2.2, 2.2, 2.2))
  spawnProp(parent, ASSETS.gearBig, Vector3.create(center.x, 0.5, center.z), Quaternion.fromEulerDegrees(90, 0, 0), Vector3.create(2.5, 2.5, 2.5))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(center.x + 2.5, 0.4, center.z), Quaternion.fromEulerDegrees(45, 0, 0), Vector3.create(1.5, 1.5, 1.5))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(center.x - 2.5, 0.4, center.z), Quaternion.fromEulerDegrees(-45, 0, 0), Vector3.create(1.5, 1.5, 1.5))

  // Condensadores y chimeneas
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 6, 0.02, center.z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x - 6, 0.02, center.z), Quaternion.fromEulerDegrees(0, 270, 0), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x, 0.02, center.z + 6))
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x, 0.02, center.z - 6))

  // Controles y farolas
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x + 3, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x - 3, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x + 1.5, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x - 1.5, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 7.5, 0.02, center.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 7.5, 0.02, center.z))
}

function buildAlchemicalBatteries(parent: Entity) {
  const center = SUBSTATION_CONFIG.alchemicalBatteries.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z))

  // Baterías galvánicas en hilera
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x - 3, 0.02, center.z + 2), Quaternion.Identity())
  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 3, 0.02, center.z + 2), Quaternion.Identity())
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 1.5, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 1.5, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x, 0.02, center.z - 2.5))
}

function buildSteamEnginesStation(parent: Entity) {
  const center = SUBSTATION_CONFIG.steamEnginesStation.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z))

  spawnProp(parent, ASSETS.tank, Vector3.create(center.x + 2.5, 0.02, center.z + 1.5), Quaternion.Identity())
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x - 2.5, 0.02, center.z + 1.5))
  spawnProp(parent, ASSETS.gear10Teeth, Vector3.create(center.x - 2.5, 0.4, center.z - 1.5), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(center.x + 2.5, 0.3, center.z - 1.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z - 3.5))
}

function buildRoadNetwork(parent: Entity) {
  // Troncal norte-sur desde X=200 Z=240 hasta Z=390
  for (let z = 244; z <= 390; z += 6) {
    if (z >= 334 && z <= 346) continue
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(200, 0.02, z), Quaternion.Identity())
    if (z % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(203.5, 0.02, z))
      spawnProp(parent, ASSETS.lamp, Vector3.create(196.5, 0.02, z))
    }
  }

  // Ramal hacia Baterías (200, 320) -> (174, 320)
  for (let x = 174; x <= 196; x += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 320), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // Ramal hacia Motores (200, 360) -> (226, 360)
  for (let x = 204; x <= 226; x += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 360), Quaternion.fromEulerDegrees(0, 90, 0))
  }
}

function buildGalvanicWreckages(parent: Entity) {
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(190, 0.02, 350), Quaternion.fromEulerDegrees(0, 30, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(192, 0.3, 352), Quaternion.fromEulerDegrees(50, 20, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(188, 0.02, 348))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(212, 0.02, 330), Quaternion.fromEulerDegrees(0, 75, 0))
  spawnProp(parent, ASSETS.tank, Vector3.create(214, 0.02, 328), Quaternion.fromEulerDegrees(20, 45, 10), Vector3.create(1.2, 1.2, 1.2))
}
