import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { FORGE_DISTRICT_CONFIG } from '../config/forgeDistrictConfig'

/**
 * ============================================================================
 * CONSTRUCTOR DEL DISTRITO DE LA FORJA (ZONA INICIAL 0,0 - 80m x 80m)
 * ============================================================================
 * Genera de forma limpia, modular y optimizada (Mobile-First):
 * 1. Plaza de Aparición (Spawn Square) en (16, 5).
 * 2. Red vial principal adoquinada (Road Network).
 * 3. Plaza Central de la Forja en (40, 40) con maquinaria monumental.
 * 4. Talleres periféricos de artesanos y calderería.
 * 5. Delimitación perimetral y Puertas monumentales (Norte y Este).
 * 6. Cúmulos de escombros y chatarra de transición (Wreckages).
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

  // 4. Talleres y Puestos Industriales
  buildWorkshops(root)

  // 5. Muros Perimetrales y Puertas de Acceso
  buildPerimeterBarricadesAndGates(root)

  // 6. Cúmulos de Escombros y Chatarra (Wreckages de Transición)
  buildTransitionWreckages(root)

  console.log('🏛️ [Distrito de la Forja] Arquitectura y delimitación perimetral instanciadas con éxito.')
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
 * 2. Red Vial Principal (Caminos adoquinados conectando Spawn, Plaza Central y Puertas)
 */
function buildRoadNetwork(parent: Entity) {
  // A. Conector desde Spawn (16, 6) hacia el Norte (16, 40)
  for (let z = 10; z <= 38; z += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(16, 0.02, z), Quaternion.Identity())
  }

  // B. Giro en (16, 40) conectando hacia el Este hacia la Plaza Central (40, 40)
  spawnProp(parent, ASSETS.roadAngle, Vector3.create(16, 0.02, 40), Quaternion.fromEulerDegrees(0, 0, 0))

  for (let x = 20; x <= 36; x += 4) {
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 40), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // C. Eje Troncal Norte-Sur (X = 40): Desde Z = 4 hasta Z = 78
  for (let z = 4; z <= 78; z += 4) {
    if (z >= 36 && z <= 44) continue // El centro de la Plaza de la Forja usa cruce
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(40, 0.02, z), Quaternion.Identity())
  }

  // D. Eje Troncal Este-Oeste (Z = 40): Desde X = 4 hasta X = 78
  for (let x = 4; x <= 78; x += 4) {
    if (x >= 36 && x <= 44) continue // El centro de la Plaza de la Forja usa cruce
    spawnProp(parent, ASSETS.roadCobbleStraight, Vector3.create(x, 0.02, 40), Quaternion.fromEulerDegrees(0, 90, 0))
  }

  // E. Cruce Central Monumental en (40, 40)
  spawnProp(parent, ASSETS.roadCross, Vector3.create(40, 0.02, 40), Quaternion.Identity())

  // F. Farolas a lo largo de las avenidas principales (cada 16m)
  const lampPositions = [
    Vector3.create(43.5, 0.02, 20),
    Vector3.create(36.5, 0.02, 20),
    Vector3.create(43.5, 0.02, 60),
    Vector3.create(36.5, 0.02, 60),
    Vector3.create(20, 0.02, 43.5),
    Vector3.create(20, 0.02, 36.5),
    Vector3.create(60, 0.02, 43.5),
    Vector3.create(60, 0.02, 36.5)
  ]

  lampPositions.forEach((pos) => {
    spawnProp(parent, ASSETS.lamp, pos)
  })
}

/**
 * 3. Plaza Central de la Gran Forja (Hito en 40, 40)
 */
function buildCentralForgeSquare(parent: Entity) {
  const center = FORGE_DISTRICT_CONFIG.centralForgeSquare.center

  // Plataforma perimetral de la forja (4 losas circundantes de 4x4m)
  const platformOffsets = [
    Vector3.create(-4, 0.03, -4),
    Vector3.create(4, 0.03, -4),
    Vector3.create(-4, 0.03, 4),
    Vector3.create(4, 0.03, 4)
  ]

  platformOffsets.forEach((off) => {
    spawnProp(parent, ASSETS.floorWood4x4, Vector3.add(center, off))
  })

  // Maquinaria central de la Forja: Gran Engranaje sobre eje de transmisión
  spawnProp(
    parent,
    ASSETS.gearShaft,
    Vector3.create(center.x, 0.05, center.z),
    Quaternion.Identity(),
    Vector3.create(1.5, 1.5, 1.5)
  )
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(center.x, 0.3, center.z),
    Quaternion.fromEulerDegrees(90, 0, 0),
    Vector3.create(1.8, 1.8, 1.8)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(center.x + 1.8, 0.25, center.z),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(center.x - 1.8, 0.25, center.z),
    Quaternion.fromEulerDegrees(45, 0, 0),
    Vector3.create(1.2, 1.2, 1.2)
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
    Vector3.create(center.x + 6, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(center.x - 6, 0.02, center.z),
    Quaternion.fromEulerDegrees(0, 270, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )

  // Cofre de forja y mecanismos de control
  spawnProp(parent, ASSETS.chestGear, Vector3.create(center.x, 0.05, center.z + 4), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.lever, Vector3.create(center.x + 2, 0.05, center.z + 4))
  spawnProp(parent, ASSETS.switch, Vector3.create(center.x - 2, 0.05, center.z + 4))
}

/**
 * 4. Talleres y Pabellones de Artesanos Periféricos
 */
function buildWorkshops(parent: Entity) {
  // A. Taller Mecánico del Noroeste (22, 60)
  const mechCenter = Vector3.create(22, 0.02, 60)

  // Piso del taller (2x2 losas de 4x4m = 8x8m)
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x - 2, 0.02, mechCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x + 2, 0.02, mechCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x - 2, 0.02, mechCenter.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(mechCenter.x + 2, 0.02, mechCenter.z + 2))

  // Techo industrial elevado sostenido
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x - 2, 4.0, mechCenter.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x + 2, 4.0, mechCenter.z - 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x - 2, 4.0, mechCenter.z + 2))
  spawnProp(parent, ASSETS.ceiling4x4, Vector3.create(mechCenter.x + 2, 4.0, mechCenter.z + 2))

  // Equipamiento de banco de trabajo y engranajes
  spawnProp(parent, ASSETS.chestTube, Vector3.create(mechCenter.x - 3, 0.02, mechCenter.z + 3))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(mechCenter.x + 3, 0.5, mechCenter.z + 3), Quaternion.fromEulerDegrees(0, 30, 0))
  spawnProp(parent, ASSETS.gear5Teeth, Vector3.create(mechCenter.x + 3, 0.3, mechCenter.z - 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(mechCenter.x - 3.5, 0.02, mechCenter.z - 2))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(mechCenter.x, 0.02, mechCenter.z + 3.5))

  // B. Taller de Vapor y Calderería del Sureste (60, 22)
  const steamCenter = Vector3.create(60, 0.02, 22)

  // Piso del taller
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x - 2, 0.02, steamCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x + 2, 0.02, steamCenter.z - 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x - 2, 0.02, steamCenter.z + 2))
  spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(steamCenter.x + 2, 0.02, steamCenter.z + 2))

  // Calderas y tanques de presión
  spawnProp(parent, ASSETS.tank, Vector3.create(steamCenter.x + 3, 0.02, steamCenter.z + 2), Quaternion.Identity())
  spawnProp(parent, ASSETS.smoker, Vector3.create(steamCenter.x - 3, 0.02, steamCenter.z + 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(steamCenter.x - 3, 0.02, steamCenter.z - 3))
  spawnProp(parent, ASSETS.barrel, Vector3.create(steamCenter.x - 2, 0.02, steamCenter.z - 3.2))
  spawnProp(parent, ASSETS.chestPlates, Vector3.create(steamCenter.x + 3, 0.02, steamCenter.z - 2), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.lamp, Vector3.create(steamCenter.x - 4.5, 0.02, steamCenter.z))
}

/**
 * 5. Delimitación Perimetral y Puertas Monumentales de Acceso
 */
function buildPerimeterBarricadesAndGates(parent: Entity) {
  // A. PUERTA NORTE ("Puerta de la Chatarra" en 40, 80)
  const northGate = FORGE_DISTRICT_CONFIG.gates.northGate.position

  // Bastiones colosales a ambos lados del portal norte
  spawnProp(parent, ASSETS.tank, Vector3.create(northGate.x - 6, 0.02, northGate.z), Quaternion.Identity(), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.smoker, Vector3.create(northGate.x - 6, 3.6, northGate.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(northGate.x - 4.5, 0.02, northGate.z - 1))

  spawnProp(parent, ASSETS.tank, Vector3.create(northGate.x + 6, 0.02, northGate.z), Quaternion.Identity(), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.smoker, Vector3.create(northGate.x + 6, 3.6, northGate.z))
  spawnProp(parent, ASSETS.lamp, Vector3.create(northGate.x + 4.5, 0.02, northGate.z - 1))

  // Indicador de Anillo 1 (Hacia Los Chatarrales)
  spawnProp(parent, ASSETS.number01, Vector3.create(northGate.x - 3.8, 2.0, northGate.z), Quaternion.Identity(), Vector3.create(1.2, 1.2, 1.2))

  // Muro perimetral Norte (Z = 80): Tramo Oeste (X: 0 a 32) y Tramo Este (X: 48 a 80)
  for (let x = 2; x <= 32; x += 6) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 80), Quaternion.Identity(), Vector3.create(1.5, 1.5, 1.5))
    if (x % 12 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 78.8))
    }
  }

  for (let x = 48; x <= 78; x += 6) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 80), Quaternion.Identity(), Vector3.create(1.5, 1.5, 1.5))
    if (x % 12 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 78.8))
    }
  }

  // B. PUERTA ESTE ("Puerta de las Calderas" en 80, 40)
  const eastGate = FORGE_DISTRICT_CONFIG.gates.eastGate.position

  // Bastiones colosales a ambos lados del portal este
  spawnProp(parent, ASSETS.tank, Vector3.create(eastGate.x, 0.02, eastGate.z - 6), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.smoker, Vector3.create(eastGate.x, 3.6, eastGate.z - 6))
  spawnProp(parent, ASSETS.lamp, Vector3.create(eastGate.x - 1, 0.02, eastGate.z - 4.5))

  spawnProp(parent, ASSETS.tank, Vector3.create(eastGate.x, 0.02, eastGate.z + 6), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.5, 1.8, 1.5))
  spawnProp(parent, ASSETS.smoker, Vector3.create(eastGate.x, 3.6, eastGate.z + 6))
  spawnProp(parent, ASSETS.lamp, Vector3.create(eastGate.x - 1, 0.02, eastGate.z + 4.5))

  // Indicador de Anillo 1 / Ruta Este
  spawnProp(parent, ASSETS.number02, Vector3.create(eastGate.x, 2.0, eastGate.z - 3.8), Quaternion.fromEulerDegrees(0, 270, 0), Vector3.create(1.2, 1.2, 1.2))

  // Muro perimetral Este (X = 80): Tramo Sur (Z: 0 a 32) y Tramo Norte (Z: 48 a 80)
  for (let z = 2; z <= 32; z += 6) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(80, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.5, 1.5, 1.5))
    if (z % 12 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(78.8, 0.02, z))
    }
  }

  for (let z = 48; z <= 78; z += 6) {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(80, 0.02, z), Quaternion.fromEulerDegrees(0, 90, 0), Vector3.create(1.5, 1.5, 1.5))
    if (z % 12 === 0) {
      spawnProp(parent, ASSETS.barrel, Vector3.create(78.8, 0.02, z))
    }
  }

  // C. Delimitación de Bordes de Mundo Sur (Z = 0) y Oeste (X = 0)
  for (let x = 4; x <= 76; x += 12) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(x, 0.02, 1.2))
  }
  for (let z = 4; z <= 76; z += 12) {
    spawnProp(parent, ASSETS.barrel, Vector3.create(1.2, 0.02, z))
  }
}

/**
 * 6. Cúmulos de Escombros y Chatarra de Transición (Wreckages)
 * Ubicados en los exteriores de las puertas y esquinas limítrofes hacia Los Chatarrales.
 */
function buildTransitionWreckages(parent: Entity) {
  // A. Cúmulo de Escombros Exterior Puerta Norte (X: 34 a 46, Z: 84 a 90)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(36, 0.02, 86), Quaternion.fromEulerDegrees(0, 15, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(44, 0.02, 87), Quaternion.fromEulerDegrees(0, -25, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(35, 0.4, 88),
    Quaternion.fromEulerDegrees(65, 30, 20),
    Vector3.create(1.6, 1.6, 1.6)
  )
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(45, 0.2, 85),
    Quaternion.fromEulerDegrees(40, 110, 0),
    Vector3.create(1.3, 1.3, 1.3)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(43, 0.02, 89))
  spawnProp(parent, ASSETS.gearSmall01, Vector3.create(37, 0.1, 84))

  // B. Cúmulo de Escombros Exterior Puerta Este (X: 84 a 90, Z: 34 a 46)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(86, 0.02, 36), Quaternion.fromEulerDegrees(0, 75, 0))
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(87, 0.02, 44), Quaternion.fromEulerDegrees(0, 115, 0))
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(88, 0.02, 35),
    Quaternion.fromEulerDegrees(15, 45, 20),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(85, 0.3, 45),
    Quaternion.fromEulerDegrees(50, 0, 30),
    Vector3.create(1.4, 1.4, 1.4)
  )
  spawnProp(parent, ASSETS.smoker, Vector3.create(89, 0.02, 43))
  spawnProp(parent, ASSETS.chestGear, Vector3.create(86, 0.02, 42), Quaternion.fromEulerDegrees(0, 210, 0))

  // C. Bastión de Chatarra en Vértice Noreste Exterior (78..84, 78..84)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(82, 0.02, 82), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(83, 0.5, 83),
    Quaternion.fromEulerDegrees(75, 45, 10),
    Vector3.create(2.0, 2.0, 2.0)
  )
  spawnProp(parent, ASSETS.barrel, Vector3.create(80.5, 0.02, 82))
  spawnProp(parent, ASSETS.barrel, Vector3.create(82, 0.02, 80.5))
  spawnProp(parent, ASSETS.smoker, Vector3.create(84, 0.02, 84))

  // D. Pequeño desguace en patio trasero del Taller Mecánico (8, 72)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(8, 0.02, 72))
  spawnProp(parent, ASSETS.gearSmall02, Vector3.create(9, 0.1, 73))
  spawnProp(parent, ASSETS.gearSmall03, Vector3.create(7.5, 0.1, 71.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(9.5, 0.02, 71))

  // E. Pequeño desguace en patio trasero del Taller de Vapor (72, 8)
  spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(72, 0.02, 8), Quaternion.fromEulerDegrees(0, 90, 0))
  spawnProp(parent, ASSETS.gear8Teeth, Vector3.create(73, 0.2, 9), Quaternion.fromEulerDegrees(45, 30, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(71, 0.02, 7.5))
}
