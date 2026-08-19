import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { SCRAP_DESERT_CONFIG } from '../config/scrapDesertConfig'

/**
 * ============================================================================
 * CONSTRUCTOR DEL DESIERTO DE CHATARRA (ESQUINA NOROESTE: 0m - 140m X, 260m - 400m Z)
 * ============================================================================
 * Genera la zona de extracción de materiales legendarios (140m x 140m = 19.600 m²):
 * 1. Portal del Desierto en (130, 270).
 * 2. Red vial diagonal de despiece mecánico.
 * 3. Cráter del Autómata Primigenio en (70, 330).
 * 4. Nido del Dragón Mecánico en (40, 370).
 * 5. Pabellón de Desguace Pesado en (100, 360).
 * 6. Delimitación perimetral defensiva (fronteras Z=260 y X=140).
 * 7. Cúmulos de chatarra titánica y restos colosales (Wreckages).
 */

const ASSETS = SCRAP_DESERT_CONFIG.assets

/**
 * Función constructora principal que genera toda la zona del Desierto de Chatarra.
 */
export function createScrapDesert(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Portal de Entrada Sureste
  buildDesertGate(root)

  // 2. Red Vial de Despiece Mecánico
  buildRoadNetwork(root)

  // 3. Cráter del Autómata Primigenio
  buildPrimeAutomaCrater(root)

  // 4. Nido del Dragón Mecánico
  buildDragonNestPlatform(root)

  // 5. Pabellón de Desguace Pesado
  buildHeavyScrapPavilion(root)

  // 6. Delimitación Perimetral
  buildPerimeterBarricades(root)

  // 7. Cúmulos de Chatarra Titánica
  buildTitanWreckages(root)

  console.log('💀 [Desierto de Chatarra] Zona de materiales legendarios (140x140m) instanciada con éxito.')
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
 * 1. Portal del Desierto (130, 270)
 */
function buildDesertGate(parent: Entity) {
  const gatePos = SCRAP_DESERT_CONFIG.gate.position

  spawnProp(parent, ASSETS.roadCross, Vector3.create(gatePos.x, 0.02, gatePos.z))

  // Bastiones colosales de chatarra a ambos lados del portal
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(gatePos.x + 5.5, 0.02, gatePos.z - 5.5),
    Quaternion.fromEulerDegrees(0, 315, 0),
    Vector3.create(1.6, 2.0, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(gatePos.x + 5.5, 4.0, gatePos.z - 5.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(gatePos.x + 3.5, 0.02, gatePos.z - 3.5))

  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(gatePos.x - 5.5, 0.02, gatePos.z + 5.5),
    Quaternion.fromEulerDegrees(0, 135, 0),
    Vector3.create(1.6, 2.0, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(gatePos.x - 5.5, 4.0, gatePos.z + 5.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(gatePos.x - 3.5, 0.02, gatePos.z + 3.5))

  // Marcador monumental Steampunk 06
  spawnProp(
    parent,
    ASSETS.number06,
    Vector3.create(gatePos.x + 3.2, 2.0, gatePos.z + 3.2),
    Quaternion.fromEulerDegrees(0, 225, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )

  spawnProp(parent, ASSETS.chestPlates, Vector3.create(gatePos.x + 4.5, 0.02, gatePos.z + 2))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(gatePos.x - 2, 0.02, gatePos.z - 4.5))
}

/**
 * 2. Red Vial de Despiece Mecánico
 */
function buildRoadNetwork(parent: Entity) {
  // Troncal desde el Portal (130, 270) hacia el Cráter (70, 330)
  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    const px = 126 - t * 50
    const pz = 274 + t * 50
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(px, 0.02, pz), Quaternion.fromEulerDegrees(0, 135, 0))
    if (i % 3 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(px + 3.5, 0.02, pz + 3.5))
    }
  }

  // Ramal hacia el Nido del Dragón (70, 330) -> (40, 370)
  for (let i = 0; i <= 5; i++) {
    const t = i / 5
    const px = 68 - t * 26
    const pz = 334 + t * 32
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(px, 0.02, pz), Quaternion.fromEulerDegrees(0, 140, 0))
  }

  // Ramal hacia el Pabellón de Desguace (70, 330) -> (98, 358)
  for (let i = 0; i <= 4; i++) {
    const t = i / 4
    const px = 74 + t * 22
    const pz = 334 + t * 22
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(px, 0.02, pz), Quaternion.fromEulerDegrees(0, 45, 0))
  }
}

/**
 * 3. Cráter del Autómata Primigenio (70, 330)
 */
function buildPrimeAutomaCrater(parent: Entity) {
  const center = SCRAP_DESERT_CONFIG.primeAutomaCrater.center

  // Plataforma de despiece de 12x12m
  const offsets = [-4, 0, 4]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })

  // Torno monumental de despiece del autómata colosal
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
    Quaternion.fromEulerDegrees(90, 30, 0),
    Vector3.create(2.6, 2.6, 2.6)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(center.x - 2.8, 0.35, center.z),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.6, 1.6, 1.6)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(center.x + 2.8, 0.35, center.z),
    Quaternion.fromEulerDegrees(45, 0, 0),
    Vector3.create(1.6, 1.6, 1.6)
  )

  // 4 Chimeneas de escape de gases residuales
  const smokerOffsets = [
    Vector3.create(-6.5, 0.02, -6.5),
    Vector3.create(6.5, 0.02, -6.5),
    Vector3.create(-6.5, 0.02, 6.5),
    Vector3.create(6.5, 0.02, 6.5)
  ]
  smokerOffsets.forEach((off) => {
    spawnProp(parent, ASSETS.smoker, Vector3.add(center, off))
  })

  // Tanques de enfriamiento
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x + 6.5, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(1.5, 1.5, 1.5)
  )
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x - 6.5, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 270, 0),
    Vector3.create(1.5, 1.5, 1.5)
  )

  // Mesas de catalogación del Corazón Primigenio
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x + 3.5, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 3.5, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 1.8, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x - 1.8, 0.05, center.z + 4.5))

  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 7.5, 0.02, center.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 7.5, 0.02, center.z))
}

/**
 * 4. Nido del Dragón Mecánico (40, 370)
 */
function buildDragonNestPlatform(parent: Entity) {
  const center = SCRAP_DESERT_CONFIG.dragonNestPlatform.center

  // Plataforma techada (8x8m)
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  // Techo industrial elevado
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z + 2))

  // Reliquia de la espada y banco de ópticas
  spawnProp(
    parent,
    ASSETS.arthurSword,
    Vector3.create(center.x, 0.05, center.z + 2),
    Quaternion.Identity(),
    Vector3.create(1.3, 1.3, 1.3)
  )
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(center.x - 2.5, 0.4, center.z + 2.5), Quaternion.fromEulerDegrees(0, 30, 0))
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x + 2.5, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z - 2.5))
}

/**
 * 5. Pabellón de Desguace Pesado (100, 360)
 */
function buildHeavyScrapPavilion(parent: Entity) {
  const center = SCRAP_DESERT_CONFIG.heavyScrapPavilion.center

  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x + 3.0, 0.02, center.z + 2.5),
    Quaternion.Identity(),
    Vector3.create(1.5, 1.8, 1.5)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(center.x - 3.0, 0.02, center.z + 3.0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.0, 0.02, center.z - 2.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 2.0, 0.02, center.z - 2.8))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x + 3.0, 0.02, center.z - 2.0), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 4.5, 0.02, center.z))
}

/**
 * 6. Delimitación Perimetral (Fronteras Z=260 y X=140)
 */
function buildPerimeterBarricades(parent: Entity) {
  // A. Frontera Sur (Z = 260m, X: 0 a 140)
  for (let x = 4; x <= 136; x += 10) {
    if (x >= 124 && x <= 136) continue // Libre en el portal
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 260), Quaternion.Identity(), Vector3.create(1.8, 1.5, 1.5))
    if (x % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 261.5))
    }
  }

  // B. Frontera Este (X = 140m, Z: 260 a 400)
  for (let z = 264; z <= 396; z += 10) {
    if (z >= 264 && z <= 276) continue // Libre en el portal
    spawnProp(parent, ASSETS.treeFence, Vector3.create(140, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.8, 1.5, 1.5))
    if (z % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(138.5, 0.02, z))
    }
  }

  // C. Bordes de Mundo Oeste (X = 0m) y Norte (Z = 400m)
  for (let z = 264; z <= 396; z += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(1.5, 0.02, z))
  }
  for (let x = 4; x <= 136; x += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 398.5))
  }
}

/**
 * 7. Cúmulos de Chatarra Titánica (Wreckages)
 */
function buildTitanWreckages(parent: Entity) {
  // A. Restos colosales en el Cráter Central (60..80, 316..324)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(62, 0.02, 320), Quaternion.fromEulerDegrees(0, 35, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(78, 0.02, 318), Quaternion.fromEulerDegrees(0, -45, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(60, 0.5, 316),
    Quaternion.fromEulerDegrees(75, 20, 15),
    Vector3.create(2.0, 2.0, 2.0)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(80, 0.2, 317),
    Quaternion.fromEulerDegrees(35, 120, 0),
    Vector3.create(1.5, 1.5, 1.5)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(64, 0.02, 315))

  // B. Chatarra exterior al Portal (134..142, 256..264)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(136, 0.02, 258), Quaternion.fromEulerDegrees(0, 60, 0))
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(138, 0.02, 256),
    Quaternion.fromEulerDegrees(25, 45, 10),
    Vector3.create(1.3, 1.3, 1.3)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(134, 0.02, 254))
  spawnProp(parent, ASSETS.barrel, Vector3.create(140, 0.02, 260))

  // C. Escombros en el Nido del Dragón (30, 385)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(30, 0.02, 385), Quaternion.fromEulerDegrees(0, 110, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(32, 0.3, 387), Quaternion.fromEulerDegrees(45, 30, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(28, 0.02, 384))
}
