import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { ARENA_CONFIG } from '../config/arenaConfig'
import { ArenaRotatorComponent } from '../components/arena'

/**
 * ============================================================================
 * CONSTRUCTOR DE LA GRAN ARENA DE TORNEO STEAMPUNK (ESTILO CELL GAMES)
 * ============================================================================
 * Genera procedimentalmente una colosal arena circular de 72m de diámetro (R: 36m)
 * en el centro del mundo (200m, 200m) utilizando exclusivamente assets
 * oficiales de Decentraland.
 */

/**
 * Construye e inicializa todos los componentes de la arena de torneo.
 */
export function createTournamentArena(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: ARENA_CONFIG.center,
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Construir la plataforma colosal elevada radial (72m de diámetro)
  buildElevatedPlatform(root)

  // 2. Construir los 4 gigantescos pilares monumentales de esquina (Corner Pillars de Cell - 12m de altura)
  buildMonumentalCornerPillars(root)

  // 3. Construir las 16 balizas perimetrales y marcadores numéricos
  buildPerimeterMarkersAndLamps(root)

  // 4. Construir el sigilo monumental y sistema planetario de engranajes centrales
  buildCenterSigil(root)

  // 5. Construir las 4 grandes rampas cardinales de acceso (Norte, Sur, Este, Oeste)
  buildAccessRamps(root)

  // 6. Construir vallas perimetrales y detalles de ring-out
  buildPerimeterFences(root)

  return root
}

/**
 * Genera la cuadrícula circular de losas de madera y metal elevadas 0.6m sobre el terreno.
 */
function buildElevatedPlatform(parent: Entity) {
  const radius = ARENA_CONFIG.radius
  const step = 4
  const height = ARENA_CONFIG.platformHeight

  // Llenar el interior circular con baldosas de 4x4m
  for (let x = -radius; x <= radius; x += step) {
    for (let z = -radius; z <= radius; z += step) {
      const dist = Math.sqrt(x * x + z * z)
      if (dist > radius - 1) continue

      const tileEntity = engine.addEntity()
      // Alternar estética de baldosas según la distancia al centro
      const isOuter = dist > radius * 0.65
      const isBroken = (Math.abs(x * 7 + z * 13) % 5 === 0)

      let modelSrc = ARENA_CONFIG.models.woodFloor4x4
      if (isBroken) {
        modelSrc = ARENA_CONFIG.models.woodBroken4x4
      } else if (isOuter && (Math.abs(x + z) % 2 === 0)) {
        modelSrc = ARENA_CONFIG.models.ceilingTile4x4
      }

      Transform.create(tileEntity, {
        parent,
        position: Vector3.create(x, height, z),
        rotation: Quaternion.fromEulerDegrees(0, ((Math.abs(x + z)) % 4) * 90, 0),
        scale: Vector3.One()
      })
      GltfContainer.create(tileEntity, { src: modelSrc })
    }
  }

  // Borde perimetral circular continuo con adoquines angulados (56 segmentos)
  const segments = 56
  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments
    const angleDeg = (angle * 180) / Math.PI

    // Dejar abiertas las 4 entradas cardinales (N, S, E, O)
    const isCardinal =
      Math.abs(angleDeg - 0) < 7 ||
      Math.abs(angleDeg - 90) < 7 ||
      Math.abs(angleDeg - 180) < 7 ||
      Math.abs(angleDeg - 270) < 7 ||
      Math.abs(angleDeg - 360) < 7

    if (isCardinal) continue

    const posX = (radius + 0.3) * Math.cos(angle)
    const posZ = (radius + 0.3) * Math.sin(angle)

    const curbEntity = engine.addEntity()
    Transform.create(curbEntity, {
      parent,
      position: Vector3.create(posX, height - 0.1, posZ),
      // Rotar tangente al círculo
      rotation: Quaternion.fromEulerDegrees(0, -angleDeg + 90, 0),
      scale: Vector3.create(1.2, 1.0, 1.2)
    })
    GltfContainer.create(curbEntity, {
      src: (i % 2 === 0) ? ARENA_CONFIG.models.roadAngled : ARENA_CONFIG.models.roadStraight
    })
  }
}

/**
 * Construye los 4 pilares monumentales en las 4 esquinas/diagonales del ring (NW, NE, SE, SW).
 * Ahora a escala colosal (12m de altura, fuste triple y chimenea monumental).
 */
function buildMonumentalCornerPillars(parent: Entity) {
  // Ángulos de 45°, 135°, 225°, 315°
  const diagonalAngles = [
    Math.PI / 4,
    (3 * Math.PI) / 4,
    (5 * Math.PI) / 4,
    (7 * Math.PI) / 4
  ]
  const pillarRadius = ARENA_CONFIG.radius + 1.8
  const platformHeight = ARENA_CONFIG.platformHeight

  diagonalAngles.forEach((angle, idx) => {
    const posX = pillarRadius * Math.cos(angle)
    const posZ = pillarRadius * Math.sin(angle)
    const angleDeg = (angle * 180) / Math.PI

    // Entidad raíz del pilar monumental
    const pillarRoot = engine.addEntity()
    Transform.create(pillarRoot, {
      parent,
      position: Vector3.create(posX, platformHeight, posZ),
      rotation: Quaternion.fromEulerDegrees(0, -angleDeg - 90, 0),
      scale: Vector3.One()
    })

    // 1. Base colosal del pilar: Caldera pesada principal (Tank.glb, scale 1.8)
    const baseTank = engine.addEntity()
    Transform.create(baseTank, {
      parent: pillarRoot,
      position: Vector3.create(0, 0.5, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.8, 1.8, 1.8)
    })
    GltfContainer.create(baseTank, { src: ARENA_CONFIG.models.tank })

    // Tanques auxiliares laterales a la base
    const subTankLeft = engine.addEntity()
    Transform.create(subTankLeft, {
      parent: pillarRoot,
      position: Vector3.create(-1.8, 0.4, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.1, 1.1, 1.1)
    })
    GltfContainer.create(subTankLeft, { src: ARENA_CONFIG.models.barrel })

    const subTankRight = engine.addEntity()
    Transform.create(subTankRight, {
      parent: pillarRoot,
      position: Vector3.create(1.8, 0.4, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.1, 1.1, 1.1)
    })
    GltfContainer.create(subTankRight, { src: ARENA_CONFIG.models.barrel })

    // 2. Anillo de refuerzo de tuberías en la base (Chest Tube)
    const baseRing = engine.addEntity()
    Transform.create(baseRing, {
      parent: pillarRoot,
      position: Vector3.create(0, 2.2, 0),
      rotation: Quaternion.fromEulerDegrees(90, 0, 0),
      scale: Vector3.create(1.6, 1.6, 1.6)
    })
    GltfContainer.create(baseRing, { src: ARENA_CONFIG.models.chestTube })

    // 3. Fuste central: Ejes de engranajes triple (Gear Shaft a 12m de altura)
    const shaft1 = engine.addEntity()
    Transform.create(shaft1, {
      parent: pillarRoot,
      position: Vector3.create(0, 3.2, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.6, 1.6, 1.6)
    })
    GltfContainer.create(shaft1, { src: ARENA_CONFIG.models.gearShaft })

    const shaft2 = engine.addEntity()
    Transform.create(shaft2, {
      parent: pillarRoot,
      position: Vector3.create(0, 6.2, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.6, 1.6, 1.6)
    })
    GltfContainer.create(shaft2, { src: ARENA_CONFIG.models.gearShaft })

    const shaft3 = engine.addEntity()
    Transform.create(shaft3, {
      parent: pillarRoot,
      position: Vector3.create(0, 9.2, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.6, 1.6, 1.6)
    })
    GltfContainer.create(shaft3, { src: ARENA_CONFIG.models.gearShaft })

    // 4. Anillo rotatorio inferior: Engranaje ornamental de 10 dientes
    const midGear1 = engine.addEntity()
    Transform.create(midGear1, {
      parent: pillarRoot,
      position: Vector3.create(0, 5.0, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(2.2, 1.2, 2.2)
    })
    GltfContainer.create(midGear1, {
      src: (idx % 2 === 0) ? ARENA_CONFIG.models.gear10Teeth : ARENA_CONFIG.models.gearAngled10Teeth
    })
    ArenaRotatorComponent.create(midGear1, {
      speedY: (idx % 2 === 0 ? 1 : -1) * ARENA_CONFIG.pillarGearRotationSpeed,
      speedX: 0,
      speedZ: 0
    })

    // 5. Anillo rotatorio superior: Engranaje ornamental de 8 dientes
    const midGear2 = engine.addEntity()
    Transform.create(midGear2, {
      parent: pillarRoot,
      position: Vector3.create(0, 8.2, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.8, 1.0, 1.8)
    })
    GltfContainer.create(midGear2, { src: ARENA_CONFIG.models.gear8Teeth })
    ArenaRotatorComponent.create(midGear2, {
      speedY: (idx % 2 === 0 ? -1 : 1) * ARENA_CONFIG.pillarGearRotationSpeed * 1.3,
      speedX: 0,
      speedZ: 0
    })

    // 6. Cúspide colosal: Chimenea / Caldera de escape monumental (Smoker.glb a 11.5m)
    const crownSmoker = engine.addEntity()
    Transform.create(crownSmoker, {
      parent: pillarRoot,
      position: Vector3.create(0, 11.2, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(2.0, 2.0, 2.0)
    })
    GltfContainer.create(crownSmoker, { src: ARENA_CONFIG.models.smoker })

    // 7. Focos dobles apuntando hacia el cuadrilátero central
    const lowerLamp = engine.addEntity()
    Transform.create(lowerLamp, {
      parent: pillarRoot,
      position: Vector3.create(0, 5.8, -1.3),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(1.3, 1.3, 1.3)
    })
    GltfContainer.create(lowerLamp, { src: ARENA_CONFIG.models.lamp })

    const upperLamp = engine.addEntity()
    Transform.create(upperLamp, {
      parent: pillarRoot,
      position: Vector3.create(0, 9.0, -1.3),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(1.3, 1.3, 1.3)
    })
    GltfContainer.create(upperLamp, { src: ARENA_CONFIG.models.lamp })
  })
}

/**
 * Construye 16 balizas perimetrales con pedestales de barril, farolas y números Steampunk (00 a 08).
 */
function buildPerimeterMarkersAndLamps(parent: Entity) {
  const markerCount = 16
  const radius = ARENA_CONFIG.radius - 1.0
  const height = ARENA_CONFIG.platformHeight

  for (let i = 0; i < markerCount; i++) {
    const angle = (i * 2 * Math.PI) / markerCount
    const angleDeg = (angle * 180) / Math.PI
    const posX = radius * Math.cos(angle)
    const posZ = radius * Math.sin(angle)

    const markerRoot = engine.addEntity()
    Transform.create(markerRoot, {
      parent,
      position: Vector3.create(posX, height, posZ),
      // Orientado hacia el centro del ring
      rotation: Quaternion.fromEulerDegrees(0, -angleDeg - 90, 0),
      scale: Vector3.One()
    })

    // 1. Pedestal de barril
    const barrel = engine.addEntity()
    Transform.create(barrel, {
      parent: markerRoot,
      position: Vector3.create(0, 0.4, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.0, 0.9, 1.0)
    })
    GltfContainer.create(barrel, { src: ARENA_CONFIG.models.barrel })

    // 2. Farol sobre el pedestal
    const lamp = engine.addEntity()
    Transform.create(lamp, {
      parent: markerRoot,
      position: Vector3.create(0, 0.9, 0),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.1, 1.1, 1.1)
    })
    GltfContainer.create(lamp, { src: ARENA_CONFIG.models.tableLamp })

    // 3. Placa con número Steampunk
    const numIdx = i % ARENA_CONFIG.models.numbers.length
    const numberEntity = engine.addEntity()
    Transform.create(numberEntity, {
      parent: markerRoot,
      position: Vector3.create(0, 0.5, -0.55),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(1.3, 1.3, 1.3)
    })
    GltfContainer.create(numberEntity, { src: ARENA_CONFIG.models.numbers[numIdx] })
  }
}

/**
 * Construye el gran engranaje giratorio central colosal, sistema planetario de engranajes satélites y la espada relicario.
 */
function buildCenterSigil(parent: Entity) {
  const height = ARENA_CONFIG.platformHeight + 0.05

  // 1. Gran engranaje central rotatorio colosal (Gear Big - Escala 4.8x, ~12m de diámetro)
  const bigGear = engine.addEntity()
  Transform.create(bigGear, {
    parent,
    position: Vector3.create(0, height, 0),
    rotation: Quaternion.Identity(),
    scale: Vector3.create(4.8, 1.2, 4.8)
  })
  GltfContainer.create(bigGear, { src: ARENA_CONFIG.models.gearBig })
  ArenaRotatorComponent.create(bigGear, {
    speedY: ARENA_CONFIG.centerGearRotationSpeed,
    speedX: 0,
    speedZ: 0
  })

  // 2. Cuatro engranajes satélites planetarios en formación orbital (Radio 7.5m)
  const satConfigs = [
    { offset: Vector3.create(7.5, height + 0.02, 0), model: ARENA_CONFIG.models.gear8Teeth, scale: 2.4, speedMult: -1.6 },
    { offset: Vector3.create(-7.5, height + 0.02, 0), model: ARENA_CONFIG.models.gear8Teeth, scale: 2.4, speedMult: -1.6 },
    { offset: Vector3.create(0, height + 0.02, 7.5), model: ARENA_CONFIG.models.gear5Teeth, scale: 2.2, speedMult: -1.8 },
    { offset: Vector3.create(0, height + 0.02, -7.5), model: ARENA_CONFIG.models.gear5Teeth, scale: 2.2, speedMult: -1.8 },
    // Diagonales con engranajes de 10 dientes
    { offset: Vector3.create(5.3, height + 0.02, 5.3), model: ARENA_CONFIG.models.gear10Teeth, scale: 2.0, speedMult: 1.4 },
    { offset: Vector3.create(-5.3, height + 0.02, -5.3), model: ARENA_CONFIG.models.gear10Teeth, scale: 2.0, speedMult: 1.4 },
    { offset: Vector3.create(-5.3, height + 0.02, 5.3), model: ARENA_CONFIG.models.gearAngled10Teeth, scale: 2.0, speedMult: 1.4 },
    { offset: Vector3.create(5.3, height + 0.02, -5.3), model: ARENA_CONFIG.models.gearAngled10Teeth, scale: 2.0, speedMult: 1.4 }
  ]

  satConfigs.forEach(cfg => {
    const sat = engine.addEntity()
    Transform.create(sat, {
      parent,
      position: cfg.offset,
      rotation: Quaternion.Identity(),
      scale: Vector3.create(cfg.scale, 1.0, cfg.scale)
    })
    GltfContainer.create(sat, { src: cfg.model })
    ArenaRotatorComponent.create(sat, {
      speedY: ARENA_CONFIG.centerGearRotationSpeed * cfg.speedMult,
      speedX: 0,
      speedZ: 0
    })
  })

  // 3. Pequeños engranajes decorativos periféricos en el suelo
  const outerOffsets = [
    Vector3.create(11.0, height + 0.01, 4.0),
    Vector3.create(-11.0, height + 0.01, -4.0),
    Vector3.create(4.0, height + 0.01, 11.0),
    Vector3.create(-4.0, height + 0.01, -11.0)
  ]
  outerOffsets.forEach((pos, i) => {
    const smallGear = engine.addEntity()
    Transform.create(smallGear, {
      parent,
      position: pos,
      rotation: Quaternion.fromEulerDegrees(0, i * 45, 0),
      scale: Vector3.create(1.5, 1.0, 1.5)
    })
    GltfContainer.create(smallGear, {
      src: (i % 2 === 0) ? ARENA_CONFIG.models.gearSmall01 : ARENA_CONFIG.models.gearSmall02
    })
  })

  // 4. Pedestal relicario y espada monumental en el centro
  const altarChest = engine.addEntity()
  Transform.create(altarChest, {
    parent,
    position: Vector3.create(0, height + 0.1, 0),
    rotation: Quaternion.Identity(),
    scale: Vector3.create(1.4, 0.6, 1.4)
  })
  GltfContainer.create(altarChest, { src: ARENA_CONFIG.models.chestGear })

  const sword = engine.addEntity()
  Transform.create(sword, {
    parent,
    position: Vector3.create(0, height + 0.5, 0),
    rotation: Quaternion.fromEulerDegrees(0, 45, 0),
    scale: Vector3.create(2.2, 2.2, 2.2)
  })
  GltfContainer.create(sword, { src: ARENA_CONFIG.models.sword })
}

/**
 * Construye las 4 grandes rampas cardinales de acceso ceremonial (Norte, Sur, Este, Oeste).
 */
function buildAccessRamps(parent: Entity) {
  const radius = ARENA_CONFIG.radius
  const height = ARENA_CONFIG.platformHeight

  // Orientaciones cardinales: [Nombre, ÁnguloDeg, Offset]
  const cardinals = [
    { name: 'Norte', angleDeg: 0, offset: Vector3.create(0, 0, radius) },
    { name: 'Este', angleDeg: 90, offset: Vector3.create(radius, 0, 0) },
    { name: 'Sur', angleDeg: 180, offset: Vector3.create(0, 0, -radius) },
    { name: 'Oeste', angleDeg: 270, offset: Vector3.create(-radius, 0, 0) }
  ]

  cardinals.forEach(({ angleDeg, offset }) => {
    const rampRoot = engine.addEntity()
    Transform.create(rampRoot, {
      parent,
      position: offset,
      rotation: Quaternion.fromEulerDegrees(0, angleDeg, 0),
      scale: Vector3.One()
    })

    // Tramo 1 de la rampa: Inclinación superior conectada a la plataforma
    const rampTile1 = engine.addEntity()
    Transform.create(rampTile1, {
      parent: rampRoot,
      position: Vector3.create(0, height * 0.75, 2.0),
      rotation: Quaternion.fromEulerDegrees(6, 0, 0),
      scale: Vector3.create(1.5, 1.0, 1.2)
    })
    GltfContainer.create(rampTile1, { src: ARENA_CONFIG.models.roadStraight })

    // Tramo 2 de la rampa: Inclinación inferior llegando al suelo
    const rampTile2 = engine.addEntity()
    Transform.create(rampTile2, {
      parent: rampRoot,
      position: Vector3.create(0, height * 0.25, 5.5),
      rotation: Quaternion.fromEulerDegrees(5, 0, 0),
      scale: Vector3.create(1.5, 1.0, 1.2)
    })
    GltfContainer.create(rampTile2, { src: ARENA_CONFIG.models.roadStraight })

    // Barandillas laterales dobles a lo largo de toda la rampa
    const fencePositions = [
      { x: -2.4, z: 2.0 },
      { x: 2.4, z: 2.0 },
      { x: -2.4, z: 5.5 },
      { x: 2.4, z: 5.5 }
    ]
    fencePositions.forEach(fp => {
      const fence = engine.addEntity()
      Transform.create(fence, {
        parent: rampRoot,
        position: Vector3.create(fp.x, height * 0.5, fp.z),
        rotation: Quaternion.fromEulerDegrees(0, fp.x > 0 ? 180 : 0, 0),
        scale: Vector3.create(1.1, 1.1, 1.1)
      })
      GltfContainer.create(fence, { src: ARENA_CONFIG.models.treeFence })
    })

    // Hidrante y consola con interruptor en la entrada de la rampa
    const hydrant = engine.addEntity()
    Transform.create(hydrant, {
      parent: rampRoot,
      position: Vector3.create(-3.2, 0.1, 7.5),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.2, 1.2, 1.2)
    })
    GltfContainer.create(hydrant, { src: ARENA_CONFIG.models.hidrant })

    const leverSwitch = engine.addEntity()
    Transform.create(leverSwitch, {
      parent: rampRoot,
      position: Vector3.create(3.2, 0.1, 7.5),
      rotation: Quaternion.Identity(),
      scale: Vector3.create(1.3, 1.3, 1.3)
    })
    GltfContainer.create(leverSwitch, { src: ARENA_CONFIG.models.switch })
  })
}

/**
 * Coloca vallas de chatarra ornamentales y cofres mecánicos a lo largo del perímetro colosal.
 */
function buildPerimeterFences(parent: Entity) {
  const fenceCount = 32
  const radius = ARENA_CONFIG.radius + 0.3
  const height = ARENA_CONFIG.platformHeight

  for (let i = 0; i < fenceCount; i++) {
    const angle = (i * 2 * Math.PI) / fenceCount
    const angleDeg = (angle * 180) / Math.PI

    // No colocar vallas en las 4 entradas cardinales
    const isCardinal =
      Math.abs(angleDeg - 0) < 10 ||
      Math.abs(angleDeg - 90) < 10 ||
      Math.abs(angleDeg - 180) < 10 ||
      Math.abs(angleDeg - 270) < 10 ||
      Math.abs(angleDeg - 360) < 10

    // Tampoco en las posiciones de los 4 grandes pilares diagonales
    const isDiagonal =
      Math.abs(angleDeg - 45) < 7 ||
      Math.abs(angleDeg - 135) < 7 ||
      Math.abs(angleDeg - 225) < 7 ||
      Math.abs(angleDeg - 315) < 7

    if (isCardinal || isDiagonal) continue

    const posX = radius * Math.cos(angle)
    const posZ = radius * Math.sin(angle)

    const fenceEntity = engine.addEntity()
    Transform.create(fenceEntity, {
      parent,
      position: Vector3.create(posX, height, posZ),
      rotation: Quaternion.fromEulerDegrees(0, -angleDeg + 90, 0),
      scale: Vector3.create(1.1, 1.0, 1.1)
    })
    GltfContainer.create(fenceEntity, { src: ARENA_CONFIG.models.treeFence })

    // En algunas vallas colocar cofres y placas de engranaje
    if (i % 4 === 0) {
      const chest = engine.addEntity()
      Transform.create(chest, {
        parent,
        position: Vector3.create(posX * 0.94, height + 0.1, posZ * 0.94),
        rotation: Quaternion.fromEulerDegrees(0, -angleDeg - 90, 0),
        scale: Vector3.create(1.0, 1.0, 1.0)
      })
      GltfContainer.create(chest, { src: ARENA_CONFIG.models.chestGear })
    }
  }
}
