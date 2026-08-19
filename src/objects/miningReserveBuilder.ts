import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { MINING_RESERVE_CONFIG } from '../config/miningReserveConfig'

/**
 * ============================================================================
 * CONSTRUCTOR DE LA RESERVA DE MINERÍA (ZONA SEGURA NORESTE: 260m - 400m)
 * ============================================================================
 * Genera la zona segura más lejana del mapa (140m x 140m = 19.600 m²):
 * 1. Portal Monumental de Entrada Sudoeste en (270, 270).
 * 2. Red vial principal adoquinada de acarreo minero.
 * 3. Cantera Central de Extracción de Éter y Maná en (340, 340).
 * 4. Taller de Relojería y Engranajes de Bronce en (360, 375).
 * 5. Pozo de Prospección Profunda de Éter en (375, 295).
 * 6. Refugio de los Exploradores en (290, 340).
 * 7. Delimitación perimetral defensiva en las fronteras Z=260 y X=260.
 * 8. Cúmulos de relaves, excavación y escombros mineros (Wreckages).
 */

const ASSETS = MINING_RESERVE_CONFIG.assets

/**
 * Función constructora principal que genera toda la Reserva de Minería.
 */
export function createMiningReserve(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Portal Monumental de Entrada Sudoeste
  buildMiningGate(root)

  // 2. Red de Caminos de Acarreo Minero
  buildRoadNetwork(root)

  // 3. Cantera Central de Extracción de Éter
  buildCentralEtherQuarry(root)

  // 4. Taller de Relojería y Engranajes de Bronce
  buildClockworkWorkshop(root)

  // 5. Pozo de Prospección Profunda de Éter
  buildDeepProspectingRig(root)

  // 6. Refugio de los Exploradores
  buildExplorersShelter(root)

  // 7. Delimitación Perimetral de la Reserva
  buildPerimeterBarricades(root)

  // 8. Cúmulos de Relaves y Escombros de Perforación
  buildMiningTailingsAndWreckages(root)

  console.log('⛏️ [Reserva de Minería] Arquitectura monumental y zona segura (140x140m) instanciadas con éxito.')
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
 * 1. Portal Monumental de Entrada Sudoeste (270, 270)
 */
function buildMiningGate(parent: Entity) {
  const gatePos = MINING_RESERVE_CONFIG.gate.position

  // Plataforma de entrada adoquinada
  spawnProp(parent, ASSETS.roadCross, Vector3.create(gatePos.x, 0.02, gatePos.z))

  // Bastiones gemelos colosales flanqueando el acceso
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(gatePos.x - 5.5, 0.02, gatePos.z - 5.5),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.6, 2.0, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(gatePos.x - 5.5, 4.0, gatePos.z - 5.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(gatePos.x - 4.0, 0.02, gatePos.z - 3.5))

  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(gatePos.x + 5.5, 0.02, gatePos.z + 5.5),
    Quaternion.fromEulerDegrees(0, 225, 0),
    Vector3.create(1.6, 2.0, 1.6)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(gatePos.x + 5.5, 4.0, gatePos.z + 5.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(gatePos.x + 4.0, 0.02, gatePos.z + 3.5))

  // Marcador monumental Steampunk 03 (Identificador de Reserva Segura)
  spawnProp(
    parent,
    ASSETS.number03,
    Vector3.create(gatePos.x - 3.2, 2.0, gatePos.z - 3.2),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )

  // Cofre de bienvenida de minero e hidrante
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(gatePos.x - 4.5, 0.02, gatePos.z + 2))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(gatePos.x + 2, 0.02, gatePos.z - 4.5))
}

/**
 * 2. Red de Caminos de Acarreo Minero
 * Conecta el Portal (270, 270) con la Cantera Central (340, 340) y los talleres satélites.
 */
function buildRoadNetwork(parent: Entity) {
  // A. Troncal Diagonal desde el Portal (274, 274) hacia la Cantera Central (336, 336)
  for (let c = 276; c <= 332; c += 8) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(c, 0.02, c), Quaternion.fromEulerDegrees(0, 45, 0))
    // Farolas de calzada espaciadas
    if (c % 16 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(c - 3.5, 0.02, c + 3.5))
    }
  }

  // B. Ramal hacia el Refugio de Exploradores (X: 300..290, Z: 300..336)
  for (let z = 300; z <= 336; z += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(290, 0.02, z), Quaternion.Identity())
  }
  spawnProp(parent, ASSETS.roadAngle, Vector3.create(290, 0.02, 300), Quaternion.fromEulerDegrees(0, 90, 0))

  // C. Ramal Norte hacia el Taller de Relojería (340, 344) -> (360, 372)
  for (let z = 344; z <= 372; z += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(360, 0.02, z), Quaternion.Identity())
  }
  for (let x = 344; x <= 358; x += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 344), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // D. Ramal Este hacia el Pozo Profundo (344, 340) -> (372, 298)
  for (let x = 344; x <= 372; x += 6) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 298), Quaternion.fromEulerDegrees(0, 90, 0))
  }
}

/**
 * 3. Cantera Central de Extracción de Éter y Maná (340, 340)
 */
function buildCentralEtherQuarry(parent: Entity) {
  const center = MINING_RESERVE_CONFIG.centralQuarry.center

  // Plataforma monumental de excavación (3x3 losas de 4x4m = 12x12m)
  const offsets = [-4, 0, 4]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })

  // Eje vertical colosal de extracción con engranaje maestro
  spawnProp(
    parent,
    ASSETS.gearShaft,
    Vector3.create(center.x, 0.05, center.z),
    Quaternion.Identity(),
    Vector3.create(2.0, 2.0, 2.0)
  )
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(center.x, 0.4, center.z),
    Quaternion.fromEulerDegrees(90, 0, 0),
    Vector3.create(2.4, 2.4, 2.4)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(center.x + 2.5, 0.35, center.z),
    Quaternion.fromEulerDegrees(0, 60, 0),
    Vector3.create(1.5, 1.5, 1.5)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(center.x - 2.5, 0.35, center.z),
    Quaternion.fromEulerDegrees(45, 0, 0),
    Vector3.create(1.5, 1.5, 1.5)
  )

  // 4 Chimeneas de ventilación de los pozos profundos en las esquinas
  const smokerOffsets = [
    Vector3.create(-6.5, 0.02, -6.5),
    Vector3.create(6.5, 0.02, -6.5),
    Vector3.create(-6.5, 0.02, 6.5),
    Vector3.create(6.5, 0.02, 6.5)
  ]
  smokerOffsets.forEach((off) => {
    spawnProp(parent, ASSETS.smoker, Vector3.add(center, off))
  })

  // Tanques de compresión de vapor minero
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x + 6.5, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x - 6.5, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 270, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )

  // Mesas de clasificación de cristales y cerebros de autómata
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x + 3.5, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x - 3.5, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 1.8, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x - 1.8, 0.05, center.z + 4.5))

  // Farolas en las esquinas de la cantera
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 7.5, 0.02, center.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 7.5, 0.02, center.z))
}

/**
 * 4. Taller de Relojería y Engranajes de Bronce (360, 375)
 */
function buildClockworkWorkshop(parent: Entity) {
  const center = MINING_RESERVE_CONFIG.clockworkWorkshop.center

  // Plataforma techada (2x2 losas de 4x4m = 8x8m)
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  // Techo industrial elevado
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z + 2))

  // Bancos de engranajes de bronce y herramientas finas
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(center.x - 2.5, 0.6, center.z + 2.5), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(parent, ASSETS.gear5Teeth, Vector3.create(center.x + 2.5, 0.4, center.z + 2.5))
  spawnProp(parent, ASSETS.gearSmall01, Vector3.create(center.x - 1, 0.2, center.z + 3))
  spawnProp(parent, ASSETS.gearSmall02, Vector3.create(center.x + 1, 0.2, center.z + 3))

  // Almacén de aleaciones: Barriles y cofres reforzados
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.2, 0.02, center.z - 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 2.2, 0.02, center.z - 3))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x + 3.0, 0.02, center.z - 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z + 3.5))

  // Marcador de sector 04
  spawnProp(
    parent,
    ASSETS.number04,
    Vector3.create(center.x, 2.0, center.z - 4.2),
    Quaternion.Identity(),
    Vector3.create(1.2, 1.2, 1.2)
  )
}

/**
 * 5. Pozo de Prospección Profunda de Éter (375, 295)
 */
function buildDeepProspectingRig(parent: Entity) {
  const center = MINING_RESERVE_CONFIG.deepProspectingRig.center

  // Plataforma de prospección
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  // Torre vertical de perforación
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

  // Válvulas, cofres y depósitos
  spawnProp(parent, ASSETS.chestTube, Vector3.create(center.x - 2.8, 0.02, center.z + 2.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x + 2.8, 0.02, center.z - 2.5))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 4.0, 0.02, center.z))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 1.5, 0.02, center.z + 2.5))

  // Marcador de sector 05
  spawnProp(
    parent,
    ASSETS.number05,
    Vector3.create(center.x, 2.0, center.z - 4.0),
    Quaternion.Identity(),
    Vector3.create(1.2, 1.2, 1.2)
  )
}

/**
 * 6. Refugio de los Exploradores (290, 340)
 */
function buildExplorersShelter(parent: Entity) {
  const center = MINING_RESERVE_CONFIG.explorersShelter.center

  // Plataforma techada (8x8m)
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x - 2, 0.02, center.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + 2, 0.02, center.z + 2))

  // Techo elevado
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x - 2, 4.0, center.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(center.x + 2, 4.0, center.z + 2))

  // Zona de descanso: Lámpara de mesa, cofres de equipo, hidrante y barriles
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(center.x, 0.02, center.z))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(center.x - 2.5, 0.02, center.z + 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x + 2.5, 0.02, center.z + 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(center.x - 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.hidrant, Vector3.create(center.x + 3.2, 0.02, center.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x, 0.02, center.z - 4.5))

  // Reliquia de prospección: Espada ancestral en el pedestal
  spawnProp(
    parent,
    ASSETS.arthurSword,
    Vector3.create(center.x, 0.05, center.z + 3),
    Quaternion.Identity(),
    Vector3.create(1.2, 1.2, 1.2)
  )
}

/**
 * 7. Delimitación Perimetral de la Reserva (Fronteras Z=260 y X=260)
 */
function buildPerimeterBarricades(parent: Entity) {
  // A. Frontera Sur (Z = 260m, X: 260 a 400)
  // Dejamos libre el acceso del portal en X: 264 a 276
  for (let x = 278; x <= 396; x += 10) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 260), Quaternion.Identity(), Vector3.create(1.8, 1.5, 1.5))
    if (x % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 261.5))
    }
  }

  // B. Frontera Oeste (X = 260m, Z: 260 a 400)
  // Dejamos libre el acceso del portal en Z: 264 a 276
  for (let z = 278; z <= 396; z += 10) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(260, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.8, 1.5, 1.5))
    if (z % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(261.5, 0.02, z))
    }
  }

  // C. Bordes de Mundo Norte (Z = 400m) y Este (X = 400m)
  for (let x = 264; x <= 396; x += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 398.5))
  }
  for (let z = 264; z <= 396; z += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(398.5, 0.02, z))
  }
}

/**
 * 8. Cúmulos de Relaves, Excavación y Escombros Mineros (Wreckages)
 */
function buildMiningTailingsAndWreckages(parent: Entity) {
  // A. Relaves de la Cantera Central (330..350, 326..332)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(332, 0.02, 328), Quaternion.fromEulerDegrees(0, 25, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(348, 0.02, 329), Quaternion.fromEulerDegrees(0, -35, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(330, 0.4, 326),
    Quaternion.fromEulerDegrees(70, 45, 15),
    Vector3.create(1.8, 1.8, 1.8)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(350, 0.2, 327),
    Quaternion.fromEulerDegrees(30, 80, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(334, 0.02, 325))
  spawnProp(parent, ASSETS.gearSmall03, Vector3.create(346, 0.1, 326))

  // B. Cúmulo de Escombros Exterior al Portal de Entrada (266..274, 256..264)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(266, 0.02, 258), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(264, 0.02, 256),
    Quaternion.fromEulerDegrees(20, 30, 10),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(268, 0.02, 255))
  spawnProp(parent, ASSETS.barrel, Vector3.create(274, 0.02, 258))

  // C. Relaves en el Pozo Profundo Este (385, 290)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(385, 0.02, 290), Quaternion.fromEulerDegrees(0, 60, 0))
  spawnProp(parent, ASSETS.gearAngled10Teeth, Vector3.create(387, 0.2, 292), Quaternion.fromEulerDegrees(45, 10, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(383, 0.02, 288))

  // D. Desecho de aleaciones en el Taller de Relojería (370, 385)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(370, 0.02, 385), Quaternion.fromEulerDegrees(0, 120, 0))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(372, 0.3, 386), Quaternion.fromEulerDegrees(50, 40, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(368, 0.02, 387))
}
