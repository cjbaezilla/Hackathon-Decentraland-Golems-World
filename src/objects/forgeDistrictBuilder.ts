import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { FORGE_DISTRICT_CONFIG } from '../config/forgeDistrictConfig'
import { createTeslaTower } from './teslaTower'

/**
 * ============================================================================
 * CONSTRUCTOR DEL DISTRITO DE LA FORJA (ZONA INICIAL 0,0 - 140m x 140m)
 * ============================================================================
 * Genera la ciudadela inicial expandida a 140m x 140m (19.600 m²):
 * 1. Plaza de Aparición (Spawn Square) en (16, 5).
 * 2. Red vial principal adoquinada (Ejes X=70 y Z=70 cruzando en 70,70).
 * 3. Plaza Central de la Gran Forja en (70, 70) con maquinaria monumental.
 * 4. 4 Talleres periféricos de artesanos, calderería y forja.
 * 5. Delimitación perimetral y Puertas monumentales (Norte 70,140 y Este 140,70).
 * 6. Cúmulos de escombros y chatarra de transición (Wreckages).
 * 7. Torre Tesla de Recarga Energética (52.8m, 34.2m).
 */

const ASSETS = FORGE_DISTRICT_CONFIG.assets

/**
 * Función constructora principal que genera toda la arquitectura del Distrito de la Forja.
 */
export function createForgeDistrict(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Plaza de Aparición (Spawn)
  buildSpawnPlaza(root)

  // 2. Red de Caminos y Calzadas Adoquinadas
  buildRoadNetwork(root)

  // 3. Plaza Central de la Gran Forja
  buildCentralForgeSquare(root)

  // 4. Talleres y Pabellones Industriales
  buildWorkshops(root)

  // 5. Muros Perimetrales y Puertas de Acceso
  buildPerimeterBarricadesAndGates(root)

  // 6. Cúmulos de Escombros y Chatarra (Wreckages de Transición)
  buildTransitionWreckages(root)

  // 7. Torre Tesla Galvánica de Recarga de HP (Coordenadas 52.8m, 34.2m)
  createTeslaTower(root)

  console.log('🏛️ [Distrito de la Forja] Ciudad inicial expandida a 140x140m e instanciada con éxito con Torre Tesla.')
  return root
}


/**
 * Helper utilitario para instanciar elementos estáticos vinculados al nodo raíz.
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
 * 1. Plaza de Aparición y Bienvenida (Spawn Square en 16, 5)
 */
function buildSpawnPlaza(parent: Entity) {
  const spawnCenter = FORGE_DISTRICT_CONFIG.spawnPlaza.center

  // Plataforma adoquinada de bienvenida (4x4m losas de madera/metal)
  const floorCoords = [
    Vector3.create(spawnCenter.x - 2, 0.02, spawnCenter.z - 2),
    Vector3.create(spawnCenter.x + 2, 0.02, spawnCenter.z - 2),
    Vector3.create(spawnCenter.x - 2, 0.02, spawnCenter.z + 2),
    Vector3.create(spawnCenter.x + 2, 0.02, spawnCenter.z + 2)
  ]

  floorCoords.forEach((pos) => {
    spawnProp(parent, ASSETS.floorWood4x4, pos)
  })

  // Farolas de bienvenida a ambos lados
  spawnProp(parent, ASSETS.lamp, Vector3.create(spawnCenter.x - 4.5, 0.02, spawnCenter.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(spawnCenter.x + 4.5, 0.02, spawnCenter.z - 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(spawnCenter.x - 4.5, 0.02, spawnCenter.z + 2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(spawnCenter.x + 4.5, 0.02, spawnCenter.z + 2))

  // Hidrante y cofres de suministros iniciales
  spawnProp(parent, ASSETS.hidrant, Vector3.create(spawnCenter.x - 4.2, 0.02, spawnCenter.z))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(spawnCenter.x + 4.2, 0.02, spawnCenter.z), Quaternion.fromEulerDegrees(0, 270, 0))

  // Indicador monumental Steampunk 00 (Punto Cero)
  spawnProp(
    parent,
    ASSETS.number00,
    Vector3.create(spawnCenter.x, 0.02, spawnCenter.z - 4),
    Quaternion.Identity(),
    Vector3.create(1.2, 1.2, 1.2)
  )
}

/**
 * 2. Red Vial Principal Adoquinada (Ejes X=70 y Z=70, conectando Spawn, Plaza Central y Puertas)
 */
function buildRoadNetwork(parent: Entity) {
  // A. Conector desde Spawn (16, 6) hacia el Norte (16, 40)
  for (let z = 10; z <= 38; z += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(16, 0.02, z), Quaternion.Identity())
  }
  spawnProp(parent, ASSETS.roadAngle, Vector3.create(16, 0.02, 40), Quaternion.fromEulerDegrees(0, 0, 0))

  // Conector de (16, 40) a (40, 40) y subida diagonal hacia (70, 70)
  for (let x = 20; x <= 36; x += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 40), Quaternion.fromEulerDegrees(0, 90, 0))
  }
  for (let c = 40; c <= 67; c += 3) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(c, 0.02, c), Quaternion.fromEulerDegrees(0, 45, 0))
    if (c === 46 || c === 58) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(c - 3.5, 0.02, c + 3.5))
    }
  }

  // B. Eje Troncal Norte-Sur (X = 70): Desde Z = 4 hasta Z = 136
  for (let z = 4; z <= 136; z += 6) {
    if (z >= 64 && z <= 76) continue // Cruce central
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(70, 0.02, z), Quaternion.Identity())
    if (z % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(73.5, 0.02, z))
      spawnProp(parent, ASSETS.lamp, Vector3.create(66.5, 0.02, z))
    }
  }

  // C. Eje Troncal Este-Oeste (Z = 70): Desde X = 4 hasta X = 136
  for (let x = 4; x <= 136; x += 6) {
    if (x >= 64 && x <= 76) continue // Cruce central
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 70), Quaternion.fromEulerDegrees(0, 90, 0))
    if (x % 24 === 0) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 73.5))
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 66.5))
    }
  }

  // D. Cruce Monumental en (70, 70)
  spawnProp(parent, ASSETS.roadCross, Vector3.create(70, 0.02, 70), Quaternion.Identity())

  // E. Calzada / Bulevar Sur-Central (Continuación de camino entre X: 19.1m [Parcela 1,1] y X: 66.5m [Parcela 4,1] en Z ≈ 25.5m)
  // Conecta la ruta de Spawn (X: 16m) con el Eje Troncal Central (X: 70m) atravesando las parcelas [1,1], [2,1], [3,1] y [4,1]
  for (let x = 19; x <= 67; x += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 25.5), Quaternion.fromEulerDegrees(0, 90, 0))
    if (x === 27 || x === 43 || x === 59) {
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 29.0))
      spawnProp(parent, ASSETS.lamp, Vector3.create(x, 0.02, 22.0))
    }
  }
}

/**
 * 3. Plaza Central de la Gran Forja (Hito Monumental en 70, 70)
 */
function buildCentralForgeSquare(parent: Entity) {
  const center = FORGE_DISTRICT_CONFIG.centralForgeSquare.center

  // Plataforma monumental de la forja (3x3 losas de 4x4m = 12x12m)
  const offsets = [-4, 0, 4]
  offsets.forEach((dx) => {
    offsets.forEach((dz) => {
      spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(center.x + dx, 0.02, center.z + dz))
    })
  })

  // Maquinaria central de la Forja: Gran Engranaje sobre eje de transmisión
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

  // 4 Chimeneas industriales de vapor en las esquinas de la plaza
  const smokerOffsets = [
    Vector3.create(-6.5, 0.02, -6.5),
    Vector3.create(6.5, 0.02, -6.5),
    Vector3.create(-6.5, 0.02, 6.5),
    Vector3.create(6.5, 0.02, 6.5)
  ]
  smokerOffsets.forEach((off) => {
    spawnProp(parent, ASSETS.smoker, Vector3.add(center, off))
  })

  // Tanques de caldera y almacenamiento de vapor
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

  // Cofre de forja y mecanismos de control
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x, 0.05, center.z + 4.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 2, 0.05, center.z + 4.5))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x - 2, 0.05, center.z + 4.5))

  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x - 7.5, 0.02, center.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(center.x + 7.5, 0.02, center.z))
}

/**
 * 4. Talleres y Pabellones de Artesanos Periféricos
 */
function buildWorkshops(parent: Entity) {
  // A. Taller Mecánico del Noroeste (40, 105)
  const mechCenter = FORGE_DISTRICT_CONFIG.mechanicWorkshop.center
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x - 2, 0.02, mechCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x + 2, 0.02, mechCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x - 2, 0.02, mechCenter.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x + 2, 0.02, mechCenter.z + 2))

  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x - 2, 4.0, mechCenter.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x + 2, 4.0, mechCenter.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x - 2, 4.0, mechCenter.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x + 2, 4.0, mechCenter.z + 2))

  spawnProp(parent, ASSETS.chestTube, Vector3.create(mechCenter.x - 3, 0.02, mechCenter.z + 3))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(mechCenter.x + 3, 0.5, mechCenter.z + 3), Quaternion.fromEulerDegrees(0, 30, 0))
  spawnProp(parent, ASSETS.gear5Teeth, Vector3.create(mechCenter.x + 3, 0.3, mechCenter.z - 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(mechCenter.x - 3.5, 0.02, mechCenter.z - 2))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(mechCenter.x, 0.02, mechCenter.z + 3.5))

  // B. Taller de Vapor y Calderería del Sureste (105, 40)
  const steamCenter = FORGE_DISTRICT_CONFIG.steamFoundryWorkshop.center
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x - 2, 0.02, steamCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x + 2, 0.02, steamCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x - 2, 0.02, steamCenter.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x + 2, 0.02, steamCenter.z + 2))

  spawnProp(parent, ASSETS.tank, Vector3.create(steamCenter.x + 3, 0.02, steamCenter.z + 2), Quaternion.Identity())
  spawnProp(parent, ASSETS.smoker, Vector3.create(steamCenter.x - 3, 0.02, steamCenter.z + 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(steamCenter.x - 3, 0.02, steamCenter.z - 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(steamCenter.x - 2, 0.02, steamCenter.z - 3.2))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(steamCenter.x + 3, 0.02, steamCenter.z - 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.lamp, Vector3.create(steamCenter.x - 4.5, 0.02, steamCenter.z))

  // C. Pabellón de Maestros Forjadores (35, 45)
  const mastersCenter = FORGE_DISTRICT_CONFIG.forgeMastersPavilion.center
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mastersCenter.x, 0.02, mastersCenter.z))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(mastersCenter.x - 1.5, 0.02, mastersCenter.z + 1.5))
  spawnProp(parent, ASSETS.gearSmall01, Vector3.create(mastersCenter.x + 1.5, 0.1, mastersCenter.z + 1.5))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(mastersCenter.x, 0.02, mastersCenter.z - 1.5))

  // D. Puesto de Guardia y Vigía (105, 105)
  const guardCenter = FORGE_DISTRICT_CONFIG.guardOutpost.center
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(guardCenter.x, 0.02, guardCenter.z))
  spawnProp(parent, ASSETS.tank, Vector3.create(guardCenter.x + 2, 0.02, guardCenter.z + 2), Quaternion.Identity(), Vector3.create(1.2, 1.5, 1.2))
  spawnProp(parent, ASSETS.lamp, Vector3.create(guardCenter.x - 2, 0.02, guardCenter.z - 2))
}

/**
 * 5. Delimitación Perimetral y Puertas Monumentales de Acceso (Fronteras Z=140 y X=140)
 */
function buildPerimeterBarricadesAndGates(parent: Entity) {
  // A. PUERTA NORTE ("Puerta de la Chatarra" en 70, 140)
  const northGate = FORGE_DISTRICT_CONFIG.gates.northGate.position

  spawnProp(parent, ASSETS.tank, Vector3.create(northGate.x - 6, 0.02, northGate.z), Quaternion.Identity(), Vector3.create(1.6, 2.0, 1.6))
  spawnProp(parent, ASSETS.smoker, Vector3.create(northGate.x - 6, 4.0, northGate.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(northGate.x - 4.5, 0.02, northGate.z - 1))

  spawnProp(parent, ASSETS.tank, Vector3.create(northGate.x + 6, 0.02, northGate.z), Quaternion.Identity(), Vector3.create(1.6, 2.0, 1.6))
  spawnProp(parent, ASSETS.smoker, Vector3.create(northGate.x + 6, 4.0, northGate.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(northGate.x + 4.5, 0.02, northGate.z - 1))

  // Indicador de Anillo 1 / Salida Norte
  spawnProp(parent, ASSETS.number01, Vector3.create(northGate.x - 3.8, 2.0, northGate.z), Quaternion.Identity(), Vector3.create(1.2, 1.2, 1.2))

  // Muro perimetral Norte (Z = 140m): Tramo Oeste (X: 0 a 62) y Tramo Este (X: 78 a 140)
  for (let x = 4; x <= 62; x += 10) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 140), Quaternion.Identity(), Vector3.create(1.8, 1.5, 1.5))
    if (x % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 138.5))
    }
  }
  for (let x = 78; x <= 136; x += 10) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 140), Quaternion.Identity(), Vector3.create(1.8, 1.5, 1.5))
    if (x % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 138.5))
    }
  }

  // B. PUERTA ESTE ("Puerta de las Calderas" en 140, 70)
  const eastGate = FORGE_DISTRICT_CONFIG.gates.eastGate.position

  spawnProp(parent, ASSETS.tank, Vector3.create(eastGate.x, 0.02, eastGate.z - 6), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.6, 2.0, 1.6))
  spawnProp(parent, ASSETS.smoker, Vector3.create(eastGate.x, 4.0, eastGate.z - 6))
  spawnProp(parent, ASSETS.lamp, Vector3.create(eastGate.x - 1, 0.02, eastGate.z - 4.5))

  spawnProp(parent, ASSETS.tank, Vector3.create(eastGate.x, 0.02, eastGate.z + 6), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.6, 2.0, 1.6))
  spawnProp(parent, ASSETS.smoker, Vector3.create(eastGate.x, 4.0, eastGate.z + 6))
  spawnProp(parent, ASSETS.lamp, Vector3.create(eastGate.x - 1, 0.02, eastGate.z + 4.5))

  // Indicador de Anillo 1 / Salida Este
  spawnProp(parent, ASSETS.number02, Vector3.create(eastGate.x, 2.0, eastGate.z - 3.8), Quaternion.fromEulerDegrees(0, 270, 0), Vector3.create(1.2, 1.2, 1.2))

  // Muro perimetral Este (X = 140m): Tramo Sur (Z: 0 a 62) y Tramo Norte (Z: 78 a 140)
  for (let z = 4; z <= 62; z += 10) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(140, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.8, 1.5, 1.5))
    if (z % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(138.5, 0.02, z))
    }
  }
  for (let z = 78; z <= 136; z += 10) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(140, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.8, 1.5, 1.5))
    if (z % 20 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(138.5, 0.02, z))
    }
  }

  // C. Delimitación de Bordes de Mundo Sur (Z = 0) y Oeste (X = 0)
  for (let x = 4; x <= 136; x += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 1.5))
  }
  for (let z = 4; z <= 136; z += 20) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(1.5, 0.02, z))
  }
}

/**
 * 6. Cúmulos de Escombros y Chatarra de Transición (Wreckages)
 */
function buildTransitionWreckages(parent: Entity) {
  // A. Cúmulo de Escombros Exterior Puerta Norte (X: 64 a 76, Z: 144 a 150)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(66, 0.02, 146), Quaternion.fromEulerDegrees(0, 15, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(74, 0.02, 147), Quaternion.fromEulerDegrees(0, -25, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(65, 0.4, 148),
    Quaternion.fromEulerDegrees(65, 30, 20),
    Vector3.create(1.6, 1.6, 1.6)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(75, 0.2, 145),
    Quaternion.fromEulerDegrees(40, 110, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(73, 0.02, 149))

  // B. Cúmulo de Escombros Exterior Puerta Este (X: 144 a 150, Z: 64 a 76)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(146, 0.02, 66), Quaternion.fromEulerDegrees(0, 75, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(147, 0.02, 74), Quaternion.fromEulerDegrees(0, 115, 0))
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(148, 0.02, 65),
    Quaternion.fromEulerDegrees(15, 45, 20),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(149, 0.02, 73))

  // C. Bastión de Chatarra en Vértice Noreste Exterior (142, 142)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(142, 0.02, 142), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(143, 0.5, 143),
    Quaternion.fromEulerDegrees(75, 45, 10),
    Vector3.create(2.0, 2.0, 2.0)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(140.5, 0.02, 142))
}
