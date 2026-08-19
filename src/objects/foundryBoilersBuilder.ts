import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { FOUNDRY_BOILERS_CONFIG } from '../config/foundryBoilersConfig'

/**
 * ============================================================================
 * CONSTRUCTOR DE LAS CALDERAS DE LA FUNDICIÓN (ESQUINA SURESTE: 260m - 400m X, 0m - 140m Z)
 * ============================================================================
 * Genera el complejo térmico de fundición y materiales épicos (140m x 140m = 19.600 m²):
 * 1. Portal de las Calderas en (270, 130).
 * 2. Red vial adoquinada de acarreo térmico.
 * 3. El Gran Horno / Caldera Central en (330, 70).
 * 4. Complejo del Reactor de Éter y Fusión en (370, 100).
 * 5. Pabellón de Enfriamiento y Vaciado de Placas en (295, 40).
 * 6. Delimitación perimetral defensiva (fronteras Z=140 y X=260).
 * 7. Cúmulos de relaves de fundición y escoria de metal (Wreckages).
 */

const ASSETS = FOUNDRY_BOILERS_CONFIG.assets

/**
 * Función constructora principal que genera toda la zona de las Calderas de la Fundición.
 */
export function createFoundryBoilers(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Portal de Entrada Noroeste
  buildFoundryGate(root)

  // 2. Red Vial de Acarreo Térmico
  buildRoadNetwork(root)

  // 3. El Gran Horno / Caldera Central
  buildCentralFurnace(root)

  // 4. Complejo del Reactor de Éter y Fusión
  buildAetherReactorTower(root)

  // 5. Pabellón de Enfriamiento y Vaciado de Placas
  buildCoolingPlatesPavilion(root)

  // 6. Delimitación Perimetral
  buildPerimeterBarricades(root)

  // 7. Relaves de Fundición y Escoria de Metal
  buildFoundrySlagWreckages(root)

  console.log('🔥 [Calderas de la Fundición] Zona de materiales épicos (140x140m) instanciada con éxito.')
  return root
}

/**
 * Helper utilitario para instanciar elementos vinculados al nodo raíz.
 */
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
 * 1. Portal de las Calderas (270, 130)
 */
function buildFoundryGate(parent: Entity) {
  const gatePos = FOUNDRY_BOILERS_CONFIG.gate.position

  spawnProp(parent, ASSETS.roadCross, Vector3.create(gatePos.x, 0.02, gatePos.z))

  // Bastiones colosales de compresión a ambos lados
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(gatePos.x - 5.5, 0.02, gatePos.z + 5.5),
    Quaternion.fromEulerDegrees(0, 135, 0),
    Vector3.create(1.6, 2.0, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(gatePos.x - 5.5, 4.0, gatePos.z + 5.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(gatePos.x - 3.5, 0.02, gatePos.z + 3.5))

  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(gatePos.x + 5.5, 0.02, gatePos.z - 5.5),
    Quaternion.fromEulerDegrees(0, 315, 0),
    Vector3.create(1.6, 2.0, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(gatePos.x + 5.5, 4.0, gatePos.z - 5.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(gatePos.x + 3.5, 0.02, gatePos.z - 3.5))

  // Marcador monumental Steampunk 07
  spawnProp(
    parent,
    ASSETS.number07,
    Vector3.create(gatePos.x - 3.2, 2.0, gatePos.z - 3.2),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )

  spawnProp(parent, ASSETS.chestPlates, Vector3.create(gatePos.x - 4.5, 0.02, gatePos.z - 2))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(gatePos.x + 2, 0.02, gatePos.z + 4.5))
}

/**
 * 2. Red Vial de Acarreo Térmico
 */
function buildRoadNetwork(parent: Entity) {
  // Troncal desde el Portal (270, 130) hacia la Caldera Central (330, 70)
  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    const px = 274 + t * 50
    const pz = 126 - t * 50
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(px, 0.02, pz), Quaternion.fromEulerDegrees(0, 135, 0))
    if (i % 3 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(px + 3.5, 0.02, pz + 3.5))
    }
  }

  // Ramal hacia el Reactor de Éter (330, 70) -> (368, 96)
  for (let i = 0; i <= 5; i++) {
    const t = i / 5
    const px = 334 + t * 32
    const pz = 74 + t * 22
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(px, 0.02, pz), Quaternion.fromEulerDegrees(0, 55, 0))
  }

  // Ramal hacia el Pabellón de Enfriamiento (330, 70) -> (298, 44)
  for (let i = 0; i <= 4; i++) {
    const t = i / 4
    const px = 326 - t * 24
    const pz = 66 - t * 20
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(px, 0.02, pz), Quaternion.fromEulerDegrees(0, 140, 0))
  }
}

/**
 * 3. El Gran Horno / Caldera Central (330, 70)
 */
function buildCentralFurnace(parent: Entity) {
  const center = FOUNDRY_BOILERS_CONFIG.centralFurnace.center

  // Plataforma colosal de fundición (12x12m)
  const offsets = [-4, 0, 4]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })

  // Eje de transmisión y bombeo de presión de caldera
  spawnProp(
    parent,
    ASSETS.gearShaft,
    Vector3.create(center.x, 0.05, center.z),
    Quaternion.Identity(),
    Vector3.create(2.2, 2.2, 2.2)
  )
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(center.x, 0.5, center.z),
    Quaternion.fromEulerDegrees(90, 0, 0),
    Vector3.create(2.6, 2.6, 2.6)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(center.x + 2.8, 0.35, center.z),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.6, 1.6, 1.6)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(center.x - 2.8, 0.35, center.z),
    Quaternion.fromEulerDegrees(45, 0, 0),
    Vector3.create(1.6, 1.6, 1.6)
  )

  // 4 Chimeneas industriales de vapor masivo
  const smokerOffsets = [
    Vector3.create(-6.5, 0.02, -6.5),
    Vector3.create(6.5, 0.02, -6.5),
    Vector3.create(-6.5, 0.02, 6.5),
    Vector3.create(6.5, 0.02, 6.5)
  ]
  smokerOffsets.forEach((off) => {
    spawnProp(parent, ASSETS.smoker, Vector3.add(center, off))
  })

  // Tanques de caldera de fundición a ambos lados
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x + 6.5, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(1.6, 1.6, 1.6)
  )
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x - 6.5, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 270, 0),
    Vector3.create(1.6, 1.6, 1.6)
  )

  // Mesas de control térmico del Corazón de Caldera
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x + 3.5, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x - 3.5, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 1.8, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x - 1.8, 0.05, center.z + 4.5))

  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 7.5, 0.02, center.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 7.5, 0.02, center.z))
}

/**
 * 4. Complejo del Reactor de Éter y Fusión (370, 100)
 */
function buildAetherReactorTower(parent: Entity) {
  const center = FOUNDRY_BOILERS_CONFIG.aetherReactorTower.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  // Torre vertical de compresión
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x, 0.02, center.z),
    Quaternion.Identity(),
    Vector3.create(1.6, 2.2, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x, 4.4, center.z))
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(center.x + 2.2, 0.8, center.z),
    Quaternion.fromEulerDegrees(60, 0, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )

  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x - 2.8, 0.02, center.z + 2.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2.8, 0.02, center.z - 2.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 4.0, 0.02, center.z))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 1.5, 0.02, center.z + 2.5))
}

/**
 * 5. Pabellón de Enfriamiento y Vaciado de Placas (295, 40)
 */
function buildCoolingPlatesPavilion(parent: Entity) {
  const center = FOUNDRY_BOILERS_CONFIG.coolingPlatesPavilion.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z + 2))

  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 2.5, 0.02, center.z + 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x + 2.5, 0.02, center.z + 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(center.x + 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 2.2, 0.02, center.z - 2.8))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z))
}

/**
 * 6. Delimitación Perimetral (Fronteras Z=140 y X=260)
 */
function buildPerimeterBarricades(parent: Entity) {
  // A. Frontera Norte (Z = 140m, X: 260 a 400)
  for (let x = 264; x <= 396; x += 10) {
    if (x >= 264 && x <= 276) continue // Libre en el portal
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 140), Quaternion.Identity(), Vector3.create(1.8, 1.5, 1.5))
    if (x % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 138.5))
    }
  }

  // B. Frontera Oeste (X = 260m, Z: 0 a 140)
  for (let z = 4; z <= 136; z += 10) {
    if (z >= 124 && z <= 136) continue // Libre en el portal
    spawnProp(parent, ASSETS.treeFence, Vector3.create(260, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.8, 1.5, 1.5))
    if (z % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(261.5, 0.02, z))
    }
  }

  // C. Bordes de Mundo Sur (Z = 0m) y Este (X = 400m)
  for (let x = 264; x <= 396; x += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 1.5))
  }
  for (let z = 4; z <= 136; z += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(398.5, 0.02, z))
  }
}

/**
 * 7. Relaves de Fundición y Escoria de Metal (Wreckages)
 */
function buildFoundrySlagWreckages(parent: Entity) {
  // A. Escoria en el Horno Central (320..340, 56..64)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(322, 0.02, 58), Quaternion.fromEulerDegrees(0, 25, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(338, 0.02, 60), Quaternion.fromEulerDegrees(0, -35, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(320, 0.4, 56),
    Quaternion.fromEulerDegrees(65, 30, 10),
    Vector3.create(1.8, 1.8, 1.8)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(340, 0.2, 57),
    Quaternion.fromEulerDegrees(40, 90, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(324, 0.02, 55))

  // B. Relaves exterior al Portal (266..274, 134..142)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(266, 0.02, 138), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(264, 0.02, 140),
    Quaternion.fromEulerDegrees(15, 30, 20),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(268, 0.02, 142))
  spawnProp(parent, ASSETS.barrel, Vector3.create(274, 0.02, 138))

  // C. Escoria en el Reactor de Éter (385, 110)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(385, 0.02, 110), Quaternion.fromEulerDegrees(0, 60, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(387, 0.2, 112), Quaternion.fromEulerDegrees(45, 10, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(383, 0.02, 108))
}
