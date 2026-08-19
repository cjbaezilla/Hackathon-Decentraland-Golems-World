import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { WRECKAGE_LAB_CONFIG } from '../config/wreckageLabConfig'

const ASSETS = WRECKAGE_LAB_CONFIG.assets

/**
 * ============================================================================
 * CONSTRUCTOR DEL LABORATORIO DE GOLEMS STEAMPUNK (WRECKAGE LAB BUILDER)
 * ============================================================================
 * Estructura original completa y monumental restaurada:
 * - 5 Columnas de suelo modular (20m ancho x 8.5m fondo) con cimentación de desguace.
 * - 8 Columnas mecánicas de transmisión a 2.2x de escala.
 * - Cubierta completa de 6 paneles industriales a 4.1m con chimeneas pasantes.
 * - Ala Oeste: Tolvas de desguace escalonadas, cinta con engranajes en cascada, barriles y panel 01.
 * - Núcleo Central: Caldera masiva, dos chimeneas smokers, gran engranaje de transmisión horizontal, engranajes interconectados y consola maestra.
 * - Ala Este: Podio de activación elevado, golem de vapor en exhibición, hidrante, barriles refrigerantes, herramientas e identificador 02.
 * - Anclado en el frontis en Parcela [1, 2] • X: 24.9m | Z: 38.3m.
 */

/**
 * Helper utilitario para instanciar elementos estáticos vinculados a una entidad padre.
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
 * Función principal que instancia y orquesta toda la escena del Laboratorio de Golems.
 */
export function createWreckageLab(): Entity {
  const labRoot = engine.addEntity()
  Transform.create(labRoot, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Cimentación, Suelos Mixtos, 8 Columnas y Techos Industriales
  buildArchitecture(labRoot)

  // 2. Ala Oeste: Tolvas y Sistema de Admisión de Ingredientes
  buildIngredientInputWing(labRoot)

  // 3. Núcleo Central: Calderas de Fusión, Chimeneas y Tren de Engranajes
  buildCoreFusionMechanisms(labRoot)

  // 4. Ala Este: Bahía de Salida, Podio de Activación y Golem Prototipo
  buildGolemOutputBay(labRoot)

  // 5. Señalética, Iluminación de Acceso y Detalles Perimetrales de Desguace
  buildPerimeterDecorations(labRoot)

  console.log('🏭 [Wreckage Lab] Diseño original completo del Laboratorio Steampunk restaurado con éxito en X: 25.0m..45.0m, Z: 30.0m..38.5m.')
  return labRoot
}

/**
 * 1. Estructura Arquitectónica: Suelos, Columnas de Ejes Mecánicos y Techos Industriales
 */
function buildArchitecture(parent: Entity) {
  // Grid de 5 columnas en X: [27, 31, 35, 39, 43] x 2 filas en Z: [32, 36]
  // Cubre exactamente X: 25.0m a 45.0m (20m) y Z: 30.0m a 38.0m (8m)
  const xCoords = [27, 31, 35, 39, 43]
  const zCoords = [32, 36]

  xCoords.forEach((x) => {
    zCoords.forEach((z) => {
      // Alternancia con placas rotas de desguace en esquinas
      if ((x === 27 && z === 32) || (x === 43 && z === 36)) {
        spawnProp(parent, ASSETS.woodPlanksBroken, Vector3.create(x, 0.02, z), Quaternion.Identity())
      } else {
        spawnProp(parent, ASSETS.floorWood4x4, Vector3.create(x, 0.02, z), Quaternion.Identity())
      }
    })
  })

  // Relleno frontal de acceso en Z=38.3m
  const frontWalkways = [27, 31, 35, 39, 43]
  frontWalkways.forEach((x) => {
    spawnProp(parent, ASSETS.floorWood2x2, Vector3.create(x - 1, 0.02, 38.3), Quaternion.Identity())
    spawnProp(parent, ASSETS.floorWood2x2, Vector3.create(x + 1, 0.02, 38.3), Quaternion.Identity())
  })

  // 8 Columnas estructurales perimetrales (Ejes mecánicos gigantes a 2.2x de altura)
  const pillarPositions = [
    Vector3.create(25.2, 0, 30.2), // Esquina SO
    Vector3.create(33.0, 0, 30.2), // Trasera Centro-Oeste
    Vector3.create(37.0, 0, 30.2), // Trasera Centro-Este
    Vector3.create(44.8, 0, 30.2), // Esquina SE
    Vector3.create(25.2, 0, 37.8), // Esquina NO (Anclaje frontal 24.9m, 38.3m)
    Vector3.create(33.0, 0, 37.8), // Frontal Centro-Oeste
    Vector3.create(37.0, 0, 37.8), // Frontal Centro-Este
    Vector3.create(44.8, 0, 37.8)  // Esquina NE
  ]

  pillarPositions.forEach((pos) => {
    spawnProp(parent, ASSETS.gearShaft, pos, Quaternion.Identity(), Vector3.create(1.3, 2.2, 1.3))
  })

  // Techos industriales (Canopy) modulares a 4.1m de altura con aperturas para chimeneas
  const ceilingPositions = [
    Vector3.create(27, 4.1, 32),
    Vector3.create(27, 4.1, 36),
    Vector3.create(31, 4.1, 32),
    Vector3.create(39, 4.1, 32),
    Vector3.create(43, 4.1, 32),
    Vector3.create(43, 4.1, 36)
  ]

  ceilingPositions.forEach((pos) => {
    spawnProp(parent, ASSETS.ceiling4x4, pos, Quaternion.Identity())
  })

  // Paredes y vallas traseras de contención (Z = 30.1)
  const backWallX = [27, 31, 39, 43]
  backWallX.forEach((x) => {
    spawnProp(parent, ASSETS.treeFence, Vector3.create(x, 0.02, 30.1), Quaternion.Identity())
  })

  // Vallas laterales de contención (X = 25.2 y X = 44.8)
  spawnProp(parent, ASSETS.treeFence, Vector3.create(25.2, 0.02, 34), Quaternion.fromEulerDegrees(0, 90, 0))
  spawnProp(parent, ASSETS.treeFence, Vector3.create(44.8, 0.02, 34), Quaternion.fromEulerDegrees(0, 90, 0))
}

/**
 * 2. Ala Oeste: Sector de Tolvas, Clasificación y Alimentación de Ingredientes
 */
function buildIngredientInputWing(parent: Entity) {
  // Tolvas escalonadas de inserción de chatarra
  spawnProp(
    parent,
    ASSETS.chestPlates,
    Vector3.create(27.5, 0.05, 33.0),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(
    parent,
    ASSETS.chestTube,
    Vector3.create(27.0, 0.05, 35.0),
    Quaternion.fromEulerDegrees(0, 15, 0),
    Vector3.create(1.1, 1.1, 1.1)
  )
  spawnProp(
    parent,
    ASSETS.chestGear,
    Vector3.create(28.8, 0.05, 32.5),
    Quaternion.fromEulerDegrees(0, 300, 0)
  )

  // Batería de barriles de solvente y combustible en el lateral oeste
  spawnProp(parent, ASSETS.barrel, Vector3.create(26.2, 0.05, 32.2), Quaternion.Identity())
  spawnProp(parent, ASSETS.barrel, Vector3.create(26.0, 0.05, 33.5), Quaternion.fromEulerDegrees(0, 45, 0))
  spawnProp(parent, ASSETS.barrel, Vector3.create(26.3, 0.85, 32.8), Quaternion.fromEulerDegrees(90, 0, 0)) // Barril apilado

  // Hidrante regulador de fluidos catalizadores
  spawnProp(parent, ASSETS.hidrant, Vector3.create(26.2, 0.05, 36.0))

  // Cinta transportadora simulada con engranajes en cascada hacia el centro
  spawnProp(parent, ASSETS.gearSmall01, Vector3.create(29.5, 0.25, 34.2), Quaternion.fromEulerDegrees(90, 0, 0))
  spawnProp(parent, ASSETS.gearSmall02, Vector3.create(30.5, 0.35, 34.2), Quaternion.fromEulerDegrees(90, 30, 0))
  spawnProp(parent, ASSETS.gearSmall03, Vector3.create(31.5, 0.45, 34.2), Quaternion.fromEulerDegrees(90, 60, 0))
  spawnProp(parent, ASSETS.gearShaft, Vector3.create(30.5, 0.02, 34.2), Quaternion.fromEulerDegrees(0, 0, 90), Vector3.create(0.6, 1.5, 0.6))

  // Panel de control y dosificación de materiales para el operador
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(28.5, 0.05, 36.8))
  spawnProp(parent, ASSETS.lever, Vector3.create(29.2, 0.05, 36.8), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.switch, Vector3.create(29.9, 0.05, 36.8), Quaternion.fromEulerDegrees(0, 180, 0))

  // Cartel indicador numérico Steampunk 01 (Entrada de Materiales)
  spawnProp(
    parent,
    ASSETS.number01,
    Vector3.create(27.5, 3.2, 37.8),
    Quaternion.Identity(),
    Vector3.create(1.0, 1.0, 1.0)
  )
}

/**
 * 3. Núcleo Central: Gran Crisol de Fusión, Chimeneas de Vapor y Tren de Engranajes
 * Centrado en X: 35.0m, Z: 34.0m
 */
function buildCoreFusionMechanisms(parent: Entity) {
  const centerPos = Vector3.create(35.0, 0.05, 34.0)

  // Gran tanque caldera principal de alta temperatura
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(centerPos.x, 0.05, centerPos.z - 2.0),
    Quaternion.fromEulerDegrees(0, 180, 0),
    Vector3.create(1.8, 2.0, 1.8)
  )

  // Tanque secundario lateral de presurización
  spawnProp(
    parent,
    ASSETS.tank,
    Vector3.create(centerPos.x - 2.5, 0.05, centerPos.z - 1.5),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(1.2, 1.4, 1.2)
  )

  // Chimeneas de escape de vapor (Smokers) que atraviesan la cubierta
  spawnProp(
    parent,
    ASSETS.smoker,
    Vector3.create(centerPos.x - 1.8, 0.05, centerPos.z - 2.5),
    Quaternion.Identity(),
    Vector3.create(1.3, 1.5, 1.3)
  )
  spawnProp(
    parent,
    ASSETS.smoker,
    Vector3.create(centerPos.x + 1.8, 0.05, centerPos.z - 2.5),
    Quaternion.Identity(),
    Vector3.create(1.3, 1.5, 1.3)
  )

  // Tren de transmisión mecánica principal: Gran engranaje horizontal sobre eje
  spawnProp(
    parent,
    ASSETS.gearShaft,
    Vector3.create(centerPos.x, 0.05, centerPos.z + 0.2),
    Quaternion.Identity(),
    Vector3.create(1.6, 1.8, 1.6)
  )
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(centerPos.x, 0.8, centerPos.z + 0.2),
    Quaternion.fromEulerDegrees(90, 0, 0),
    Vector3.create(2.2, 2.2, 2.2)
  )

  // Engranajes interconectados laterales y en ángulo
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(centerPos.x - 2.2, 0.6, centerPos.z + 0.2),
    Quaternion.fromEulerDegrees(0, 45, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10Teeth,
    Vector3.create(centerPos.x + 2.2, 0.6, centerPos.z + 0.2),
    Quaternion.fromEulerDegrees(45, 0, 0),
    Vector3.create(1.4, 1.4, 1.4)
  )
  spawnProp(
    parent,
    ASSETS.gear8Teeth,
    Vector3.create(centerPos.x, 1.8, centerPos.z - 0.8),
    Quaternion.fromEulerDegrees(0, 0, 90),
    Vector3.create(1.2, 1.2, 1.2)
  )
  spawnProp(
    parent,
    ASSETS.gear5Teeth,
    Vector3.create(centerPos.x + 1.5, 1.4, centerPos.z - 0.8),
    Quaternion.fromEulerDegrees(30, 30, 0)
  )

  // Consola frontal de comando maestro de la forja
  spawnProp(
    parent,
    ASSETS.chestGear,
    Vector3.create(centerPos.x, 0.05, centerPos.z + 2.5),
    Quaternion.fromEulerDegrees(0, 180, 0)
  )
  spawnProp(parent, ASSETS.lever, Vector3.create(centerPos.x - 1.2, 0.05, centerPos.z + 2.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.lever, Vector3.create(centerPos.x + 1.2, 0.05, centerPos.z + 2.5), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.switch, Vector3.create(centerPos.x - 0.6, 0.05, centerPos.z + 2.7), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.switch, Vector3.create(centerPos.x + 0.6, 0.05, centerPos.z + 2.7), Quaternion.fromEulerDegrees(0, 180, 0))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(centerPos.x, 0.85, centerPos.z + 2.5))
}

/**
 * 4. Ala Este: Bahía de Salida, Podio de Activación y Golem Prototipo en Exhibición
 */
function buildGolemOutputBay(parent: Entity) {
  const bayCenter = Vector3.create(41.0, 0.05, 34.0)

  // Podio / Plataforma elevada de salida del golem (4x4m reforzada con placa metálica)
  spawnProp(
    parent,
    ASSETS.floorWood4x4,
    Vector3.create(bayCenter.x, 0.25, bayCenter.z),
    Quaternion.Identity(),
    Vector3.create(1.05, 1.2, 1.05)
  )

  // Golem de Vapor Prototipo en exhibición estática en el centro del podio
  spawnProp(
    parent,
    ASSETS.prototypeGolem,
    Vector3.create(bayCenter.x, 0.45, bayCenter.z),
    Quaternion.fromEulerDegrees(0, 165, 0), // Ligeramente orientado hacia el acceso del jugador
    Vector3.create(1.35, 1.35, 1.35)
  )

  // Rampa / Engranajes de guía perimetrales en la bahía de salida
  spawnProp(
    parent,
    ASSETS.gearSmall01,
    Vector3.create(bayCenter.x - 1.8, 0.25, bayCenter.z + 1.5),
    Quaternion.fromEulerDegrees(90, 0, 0)
  )
  spawnProp(
    parent,
    ASSETS.gearSmall02,
    Vector3.create(bayCenter.x + 1.8, 0.25, bayCenter.z + 1.5),
    Quaternion.fromEulerDegrees(90, 45, 0)
  )

  // Estación de enfriamiento por vapor, hidrante y purga
  spawnProp(parent, ASSETS.hidrant, Vector3.create(bayCenter.x + 2.6, 0.05, bayCenter.z - 1.5))
  spawnProp(parent, ASSETS.barrel, Vector3.create(bayCenter.x + 2.6, 0.05, bayCenter.z + 0.2))
  spawnProp(parent, ASSETS.barrel, Vector3.create(bayCenter.x + 2.4, 0.05, bayCenter.z + 1.2), Quaternion.fromEulerDegrees(0, 30, 0))

  // Cofre de herramientas y piezas terminadas
  spawnProp(
    parent,
    ASSETS.chestPlates,
    Vector3.create(bayCenter.x - 2.5, 0.05, bayCenter.z - 1.5),
    Quaternion.fromEulerDegrees(0, 120, 0)
  )

  // Lámpara de inspección técnica sobre la bahía
  spawnProp(parent, ASSETS.lamp, Vector3.create(bayCenter.x + 2.5, 0.05, bayCenter.z + 2.8))
  spawnProp(parent, ASSETS.tableLamp, Vector3.create(bayCenter.x - 2.4, 0.05, bayCenter.z + 2.8))

  // Cartel indicador numérico Steampunk 02 (Salida y Despliegue de Golem)
  spawnProp(
    parent,
    ASSETS.number02,
    Vector3.create(bayCenter.x, 3.2, 37.8),
    Quaternion.Identity(),
    Vector3.create(1.0, 1.0, 1.0)
  )
}

/**
 * 5. Señalética, Iluminación de Acceso y Detalles Perimetrales de Desguace
 */
function buildPerimeterDecorations(parent: Entity) {
  // Farolas de acceso en el frente conectando con la calzada en Z=38.3
  spawnProp(parent, ASSETS.lamp, Vector3.create(25.5, 0.02, 38.3))
  spawnProp(parent, ASSETS.lamp, Vector3.create(32.5, 0.02, 38.3))
  spawnProp(parent, ASSETS.lamp, Vector3.create(37.5, 0.02, 38.3))
  spawnProp(parent, ASSETS.lamp, Vector3.create(44.5, 0.02, 38.3))

  // Pilas de chatarra y tablones rotos en los laterales exteriores (Wreckage ambiance)
  spawnProp(
    parent,
    ASSETS.woodPlanksBroken,
    Vector3.create(24.0, 0.02, 34.0),
    Quaternion.fromEulerDegrees(0, 25, 0),
    Vector3.create(0.8, 1.0, 0.8)
  )
  spawnProp(
    parent,
    ASSETS.woodPlanksBroken,
    Vector3.create(45.5, 0.02, 33.0),
    Quaternion.fromEulerDegrees(0, 315, 0),
    Vector3.create(0.8, 1.0, 0.8)
  )

  // Barriles de descarte en el perímetro exterior
  spawnProp(parent, ASSETS.barrel, Vector3.create(24.2, 0.02, 36.2), Quaternion.Identity())
  spawnProp(parent, ASSETS.barrel, Vector3.create(45.8, 0.02, 35.5), Quaternion.fromEulerDegrees(0, 60, 0))
}
