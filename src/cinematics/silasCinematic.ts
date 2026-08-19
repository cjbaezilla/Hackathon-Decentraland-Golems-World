import {
  engine,
  Transform,
  VirtualCamera,
  MainCamera,
  InputModifier,
  Entity,
  inputSystem,
  InputAction,
  PointerEventType,
  timers
} from '@dcl/sdk/ecs'
import { getPlatform, isMobile } from '@dcl/sdk/platform'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import {
  setIsCinematicActive,
  getIsCinematicActive,
  setHasPlayedSilasIntro,
  getHasPlayedSilasIntro
} from '../state'
import {
  getSilasAvatarEntity,
  triggerSilasWaveEmote
} from '../objects/welcomeNpc'

/**
 * ============================================================================
 * CINEMÁTICA DE PRESENTACIÓN: SILAS EL SOBREVIVIENTE (SDK7 ECS)
 * ============================================================================
 * Cámara orbital cinematográfica que presenta a Silas y su campamento al jugador:
 * 1. Congela la entrada del avatar con InputModifier para evitar desplazamientos a ciegas.
 * 2. Activa una VirtualCamera con transición suave (Time 1.2s) y lookAtEntity centrado en Silas.
 * 3. Anima la posición de la cámara en un arco panorámico frente a Silas, el fogón y Pistón.
 * 4. Despliega franjas y banner cinematográfico en la UI con botón táctil «Saltar / Skip».
 * 5. Silas realiza un saludo con la mano (wave emote).
 * 6. Concluye a los 5.0s restaurando la cámara del jugador y devolviendo los controles.
 */

let cinematicCamEntity: Entity | null = null
let isRunning: boolean = false
let cinematicElapsedTime: number = 0
let cinematicTimeoutId: number | null = null
let waveTimeoutId: number | null = null
const CINEMATIC_DURATION = 5.0 // Duración total en segundos

// Coordenadas base del campamento de Silas en Parcela [0,0]
const SILAS_WORLD_POS = Vector3.create(15.8, 0.25, 5.9)
const ORBIT_RADIUS = 4.2
const START_ANGLE_RAD = -0.65 // ~ -37 grados (frente-izquierda)
const END_ANGLE_RAD = 0.65    // ~ +37 grados (frente-derecha)

/**
 * Calcula la posición 3D de la cámara orbital en función del progreso normalizado [0.0, 1.0].
 * Aplica interpolación suave tipo Cosine Ease In-Out y elevación en el cenit del arco.
 */
export function getOrbitCameraPosition(normalizedProgress: number): Vector3 {
  const clampedProgress = Math.max(0, Math.min(1.0, normalizedProgress))

  // Curva de interpolación suave (SmoothStep / Cosine Ease In-Out)
  const easeProgress = 0.5 * (1 - Math.cos(Math.PI * clampedProgress))

  // Ángulo actual del arco orbital
  const currentAngle = START_ANGLE_RAD + (END_ANGLE_RAD - START_ANGLE_RAD) * easeProgress

  // Radio y altura dinámicos (ligera elevación hacia el centro del encuadre)
  const heightBoost = Math.sin(Math.PI * clampedProgress) * 0.45
  const currentY = SILAS_WORLD_POS.y + 1.85 + heightBoost

  const currentX = SILAS_WORLD_POS.x + ORBIT_RADIUS * Math.sin(currentAngle)
  const currentZ = SILAS_WORLD_POS.z - ORBIT_RADIUS * Math.cos(currentAngle)

  return Vector3.create(currentX, currentY, currentZ)
}

/**
 * Inicializa la entidad de la cámara virtual en la escena (llamado en el arranque o demanda).
 */
export function initSilasCinematicCamera(): Entity {
  if (cinematicCamEntity) return cinematicCamEntity

  cinematicCamEntity = engine.addEntity()

  // Posición inicial del arco calculada de forma unificada
  Transform.create(cinematicCamEntity, {
    position: getOrbitCameraPosition(0),
    rotation: Quaternion.Identity()
  })

  // Obtener la entidad de Silas si ya está creada
  const silasAvatar = getSilasAvatarEntity()

  VirtualCamera.create(cinematicCamEntity, {
    lookAtEntity: silasAvatar ?? undefined,
    fov: 50,
    defaultTransition: {
      transitionMode: VirtualCamera.Transition.Time(1.2)
    }
  })

  // Registrar el sistema de actualización orbital de la cámara
  engine.addSystem(silasCinematicOrbitSystem)

  return cinematicCamEntity
}

/**
 * Programa el disparo de la cinemática inicial de Silas:
 * - Arranca INMEDIATAMENTE en el primer instante que el usuario interactúa (toca la pantalla o pulsa cualquier tecla/botón).
 * - Cuenta con un temporizador de seguridad de respaldo (fallback) si el usuario permanece inactivo.
 * - Limpia automáticamente el sistema ECS y los temporizadores al activarse.
 */
export function scheduleSilasIntroCinematic() {
  if (getHasPlayedSilasIntro() || isRunning) return

  let resolved = false
  let safetyTimerId: number | null = null

  const isMobilePlatform = isMobile() || getPlatform() === 'mobile'
  // Tiempo de respaldo amplio en móvil para evitar disparos prematuros durante la carga de assets
  const SAFETY_TIMEOUT_MS = isMobilePlatform ? 20000 : 8000

  const cleanupDetection = () => {
    resolved = true
    if (safetyTimerId !== null) {
      timers.clearTimeout(safetyTimerId)
      safetyTimerId = null
    }
    engine.removeSystem(playerInputDetectionSystem)
  }

  const triggerImmediately = (source: string) => {
    if (resolved) return
    cleanupDetection()
    console.log(`🎬 [Cinemática Silas] Disparo inmediato confirmado (${source}). Iniciando cinemática.`)
    playSilasCinematic()
  }

  // 1. Sistema ECS para detectar la primera interacción del usuario en tiempo real
  const playerInputDetectionSystem = () => {
    if (resolved) return

    // Detectar cualquier interacción de entrada (tap, clic, WASD, salto, puntero, etc.)
    const anyInput = inputSystem.getInputCommand(InputAction.IA_ANY, PointerEventType.PET_DOWN)
    if (anyInput) {
      triggerImmediately('Interacción del jugador')
    }
  }

  engine.addSystem(playerInputDetectionSystem)

  // 2. Temporizador de seguridad (fallback) si el usuario no interactúa
  safetyTimerId = timers.setTimeout(() => {
    if (!resolved && !getHasPlayedSilasIntro() && !isRunning) {
      triggerImmediately(`Fallback por tiempo de espera (${SAFETY_TIMEOUT_MS}ms)`)
    }
  }, SAFETY_TIMEOUT_MS)
}

/**
 * Inicia la reproducción de la cinemática de presentación de Silas.
 */
export function playSilasCinematic() {
  if (isRunning) return

  // Asegurar que la cámara virtual existe
  const cam = initSilasCinematicCamera()

  // Actualizar el objetivo de seguimiento a Silas
  const silasAvatar = getSilasAvatarEntity()
  if (silasAvatar && VirtualCamera.has(cam)) {
    VirtualCamera.getMutable(cam).lookAtEntity = silasAvatar
  }

  isRunning = true
  cinematicElapsedTime = 0
  setIsCinematicActive(true)
  setHasPlayedSilasIntro(true)

  // 1. Posicionar la cámara al inicio del arco de forma unificada
  Transform.getMutable(cam).position = getOrbitCameraPosition(0)

  // 2. Activar la cámara virtual como cámara principal
  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  // 3. Congelar controles del avatar durante la cinemática
  InputModifier.createOrReplace(engine.PlayerEntity, {
    mode: InputModifier.Mode.Standard({ disableAll: true })
  })

  // 4. Saludo de Silas a los 0.6s con control de timeout
  if (waveTimeoutId !== null) {
    timers.clearTimeout(waveTimeoutId)
  }
  waveTimeoutId = timers.setTimeout(() => {
    if (isRunning) {
      triggerSilasWaveEmote()
    }
    waveTimeoutId = null
  }, 600)

  // 5. Programar el fin automático de la cinemática
  if (cinematicTimeoutId !== null) {
    timers.clearTimeout(cinematicTimeoutId)
  }
  cinematicTimeoutId = timers.setTimeout(() => {
    stopSilasCinematic()
  }, CINEMATIC_DURATION * 1000)

  console.log('🎬 [Cinemática] Presentación de Silas iniciada con cámara orbital.')
}

/**
 * Detiene inmediatamente la cinemática y restaura la vista y controles del jugador.
 */
export function stopSilasCinematic() {
  if (!isRunning && !getIsCinematicActive()) return

  isRunning = false
  cinematicElapsedTime = 0
  setIsCinematicActive(false)

  if (cinematicTimeoutId !== null) {
    timers.clearTimeout(cinematicTimeoutId)
    cinematicTimeoutId = null
  }

  if (waveTimeoutId !== null) {
    timers.clearTimeout(waveTimeoutId)
    waveTimeoutId = null
  }

  // 1. Restaurar cámara natural del jugador
  if (MainCamera.has(engine.CameraEntity)) {
    MainCamera.getMutable(engine.CameraEntity).virtualCameraEntity = undefined
  }

  // 2. Devolver los controles de movimiento al avatar
  InputModifier.createOrReplace(engine.PlayerEntity, {
    mode: InputModifier.Mode.Standard({ disableAll: false })
  })

  console.log('🎬 [Cinemática] Presentación finalizada. Control y cámara devueltos al jugador.')
}

/**
 * Sistema ECS para desplazar suavemente la cámara a lo largo del arco orbital.
 */
export function silasCinematicOrbitSystem(dt: number) {
  if (!isRunning || !cinematicCamEntity || !Transform.has(cinematicCamEntity)) return

  cinematicElapsedTime += dt
  const normalizedProgress = Math.min(1.0, cinematicElapsedTime / CINEMATIC_DURATION)

  // Aplicar posición calculada a la cámara virtual
  const camTransform = Transform.getMutable(cinematicCamEntity)
  camTransform.position = getOrbitCameraPosition(normalizedProgress)
}
