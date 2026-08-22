import {
  engine,
  Transform,
  VirtualCamera,
  MainCamera,
  InputModifier,
  Entity,
  timers,
  GltfContainer
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { setIsCinematicActive, setActiveCinematicType } from '../state'
import { setFactoryForgingAnimation } from '../systems/factoryAnimationSystem'
import { GolemConfig } from '../config/golems'

/**
 * ============================================================================
 * CINEMÁTICA DE CÁMARA EN 3 PERSPECTIVAS: FORJA DE GOLEMS (SDK7 ECS)
 * ============================================================================
 * Reproduce una secuencia panorámica de 3 fases que muestra el funcionamiento
 * de la fábrica desde diferentes ángulos:
 * 1. Perspectiva 1 (Ala Oeste / Tolvas): Enfoque en la carga de componentes (0.0s - 2.0s).
 * 2. Perspectiva 2 (Núcleo Central): Barrido orbital alrededor de la gran caldera y tren de engranajes (2.0s - 4.5s).
 * 3. Perspectiva 3 (Ala Este / Podio): Encuadre frontal dramático en el podio donde el nuevo golem emerge y cobra vida (4.5s - 7.0s).
 */

let forgeCamEntity: Entity | null = null
let westWingFocusEntity: Entity | null = null
let coreFocusEntity: Entity | null = null
let eastWingFocusEntity: Entity | null = null
let prototypeGolemDisplayEntity: Entity | null = null

let isRunning: boolean = false
let cinematicElapsedTime: number = 0
let currentStage: 1 | 2 | 3 = 1
let stageTimeoutId: number | null = null
let totalTimeoutId: number | null = null
let onCompleteCallback: (() => void) | null = null

const TOTAL_CINEMATIC_DURATION = 7.0 // Duración total en segundos

/**
 * Registra la entidad del golem en exhibición en el podio este para actualizar su modelo durante la forja.
 */
export function registerPrototypeGolemDisplay(entity: Entity) {
  prototypeGolemDisplayEntity = entity
}

/**
 * Inicializa las entidades de enfoque visual para las 3 perspectivas.
 */
function initForgeFocusEntities() {
  if (!westWingFocusEntity) {
    westWingFocusEntity = engine.addEntity()
    Transform.create(westWingFocusEntity, {
      position: Vector3.create(28.5, 1.2, 34.5), // Tolvas y cinta de admisión Ala Oeste
      rotation: Quaternion.Identity()
    })
  }

  if (!coreFocusEntity) {
    coreFocusEntity = engine.addEntity()
    Transform.create(coreFocusEntity, {
      position: Vector3.create(35.0, 1.8, 34.0), // Núcleo Caldera y Engranajes
      rotation: Quaternion.Identity()
    })
  }

  if (!eastWingFocusEntity) {
    eastWingFocusEntity = engine.addEntity()
    Transform.create(eastWingFocusEntity, {
      position: Vector3.create(41.0, 1.4, 34.0), // Podio de Activación Ala Este
      rotation: Quaternion.Identity()
    })
  }
}

/**
 * Inicializa la entidad de la cámara virtual dedicada para la forja.
 */
export function initForgeCinematicCamera(): Entity {
  if (forgeCamEntity) return forgeCamEntity

  initForgeFocusEntities()

  forgeCamEntity = engine.addEntity()
  Transform.create(forgeCamEntity, {
    position: Vector3.create(27.0, 2.8, 38.0),
    rotation: Quaternion.Identity()
  })

  VirtualCamera.create(forgeCamEntity, {
    lookAtEntity: westWingFocusEntity ?? undefined,
    fov: 52,
    defaultTransition: {
      transitionMode: VirtualCamera.Transition.Time(0.8)
    }
  })

  engine.addSystem(forgeCinematicOrbitSystem)
  return forgeCamEntity
}

/**
 * Inicia la reproducción de la cinemática de forja de 3 fases.
 */
export function playFactoryForgingCinematic(golemConfig: GolemConfig, onFinish?: () => void) {
  if (isRunning) return

  const cam = initForgeCinematicCamera()
  initForgeFocusEntities()

  isRunning = true
  currentStage = 1
  cinematicElapsedTime = 0
  onCompleteCallback = onFinish ?? null

  setActiveCinematicType('factory')
  setIsCinematicActive(true)
  setFactoryForgingAnimation(true)

  // 1. Congelar controles del avatar del jugador
  InputModifier.createOrReplace(engine.PlayerEntity, {
    mode: InputModifier.Mode.Standard({ disableAll: true })
  })

  // 2. Activar la cámara virtual
  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  // FASE 1: Enfoque Tolva Ala Oeste (0s - 2s)
  if (VirtualCamera.has(cam) && westWingFocusEntity) {
    VirtualCamera.getMutable(cam).lookAtEntity = westWingFocusEntity
  }
  Transform.getMutable(cam).position = Vector3.create(26.2, 2.6, 38.2)

  // Programar FASE 2: Enfoque Núcleo Caldera a los 2.0s
  timers.setTimeout(() => {
    if (!isRunning) return
    currentStage = 2
    if (VirtualCamera.has(cam) && coreFocusEntity) {
      VirtualCamera.getMutable(cam).lookAtEntity = coreFocusEntity
    }
    Transform.getMutable(cam).position = Vector3.create(35.0, 3.8, 40.5)
  }, 2000)

  // Programar FASE 3: Enfoque Podio Ala Este a los 4.5s (Revelar Golem recién forjado)
  timers.setTimeout(() => {
    if (!isRunning) return
    currentStage = 3

    // Si la entidad del podio existe, actualizar su modelo GLTF al nuevo golem forjado
    if (prototypeGolemDisplayEntity) {
      GltfContainer.createOrReplace(prototypeGolemDisplayEntity, {
        src: golemConfig.modelSrc
      })
      Transform.getMutable(prototypeGolemDisplayEntity).scale = Vector3.create(
        golemConfig.scale * 1.2,
        golemConfig.scale * 1.2,
        golemConfig.scale * 1.2
      )
    }

    if (VirtualCamera.has(cam) && eastWingFocusEntity) {
      VirtualCamera.getMutable(cam).lookAtEntity = eastWingFocusEntity
    }
    Transform.getMutable(cam).position = Vector3.create(41.0, 2.2, 38.5)
  }, 4500)

  // Programar fin de la cinemática a los 7.0s
  totalTimeoutId = timers.setTimeout(() => {
    stopFactoryForgingCinematic()
  }, TOTAL_CINEMATIC_DURATION * 1000)

  console.log('🎬 [Cinemática Forja] Secuencia de 3 fases iniciada para el golem:', golemConfig.name)
}

/**
 * Detiene la cinemática de forja y devuelve el control al jugador.
 */
export function stopFactoryForgingCinematic() {
  if (!isRunning) return

  isRunning = false
  cinematicElapsedTime = 0
  setActiveCinematicType(null)
  setIsCinematicActive(false)
  setFactoryForgingAnimation(false)

  if (totalTimeoutId !== null) {
    timers.clearTimeout(totalTimeoutId)
    totalTimeoutId = null
  }

  // 1. Restaurar la cámara natural del jugador
  if (MainCamera.has(engine.CameraEntity)) {
    MainCamera.getMutable(engine.CameraEntity).virtualCameraEntity = undefined
  }

  // 2. Restaurar controles de movimiento al avatar
  InputModifier.createOrReplace(engine.PlayerEntity, {
    mode: InputModifier.Mode.Standard({ disableAll: false })
  })

  // Exposición del callback de finalización
  const cb = onCompleteCallback
  onCompleteCallback = null
  if (cb) {
    cb()
  }

  console.log('🎬 [Cinemática Forja] Cinemática finalizada. Controles devueltos al jugador.')
}

/**
 * Sistema ECS para mover suavemente la cámara a lo largo de las 3 fases.
 */
export function forgeCinematicOrbitSystem(dt: number) {
  if (!isRunning || !forgeCamEntity || !Transform.has(forgeCamEntity)) return

  cinematicElapsedTime += dt
  const camTransform = Transform.getMutable(forgeCamEntity)

  if (currentStage === 1) {
    // Fase 1: Barrido de oeste a este en la zona de tolvas (X: 26.2m -> 29.5m)
    const t = Math.min(1.0, cinematicElapsedTime / 2.0)
    const currentX = 26.2 + (29.5 - 26.2) * t
    const currentY = 2.6 + Math.sin(Math.PI * t) * 0.4
    camTransform.position = Vector3.create(currentX, currentY, 38.2)
  } else if (currentStage === 2) {
    // Fase 2: Arco panorámico elevado frente al Núcleo Caldera
    const t = Math.min(1.0, (cinematicElapsedTime - 2.0) / 2.5)
    const angle = -0.5 + t * 1.0
    const currentX = 35.0 + Math.sin(angle) * 5.5
    const currentZ = 34.0 + Math.cos(angle) * 5.5
    const currentY = 3.8 + Math.sin(Math.PI * t) * 0.5
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  } else if (currentStage === 3) {
    // Fase 3: Zoom suave de revelación hacia el podio del nuevo golem (Z: 38.5m -> 36.8m)
    const t = Math.min(1.0, (cinematicElapsedTime - 4.5) / 2.5)
    const currentZ = 38.5 - (38.5 - 36.8) * t
    const currentY = 2.2 - (2.2 - 1.8) * t
    camTransform.position = Vector3.create(41.0, currentY, currentZ)
  }
}
