import {
  engine,
  Transform,
  VirtualCamera,
  MainCamera,
  InputModifier,
  Entity,
  timers
} from '@dcl/sdk/ecs'
import { getPlatform, isMobile } from '@dcl/sdk/platform'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import {
  setIsCinematicActive,
  getIsCinematicActive,
  setHasPlayedSilasIntro
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
const CINEMATIC_DURATION = 5.0 // Duración total en segundos

// Coordenadas base del campamento de Silas en Parcela [0,0]
const SILAS_WORLD_POS = Vector3.create(15.8, 0.25, 5.9)
const ORBIT_RADIUS = 4.2
const START_ANGLE_RAD = -0.65 // ~ -37 grados (frente-izquierda)
const END_ANGLE_RAD = 0.65    // ~ +37 grados (frente-derecha)

/**
 * Inicializa la entidad de la cámara virtual en la escena (llamado en el arranque).
 */
export function initSilasCinematicCamera(): Entity {
  if (cinematicCamEntity) return cinematicCamEntity

  cinematicCamEntity = engine.addEntity()

  // Posición inicial del arco
  const startX = SILAS_WORLD_POS.x + ORBIT_RADIUS * Math.sin(START_ANGLE_RAD)
  const startZ = SILAS_WORLD_POS.z - ORBIT_RADIUS * Math.cos(START_ANGLE_RAD)
  const startY = SILAS_WORLD_POS.y + 1.85

  Transform.create(cinematicCamEntity, {
    position: Vector3.create(startX, startY, startZ),
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
 * Programa la cinemática inicial de Silas con detección de plataforma:
 * - En Móvil (Godot Explorer): Aplica un retardo extendido (4.5 segundos) para asegurar
 *   la carga de modelos 3D, texturas y controles táctiles antes de animar la cámara.
 * - En Desktop / Web: Aplica un retardo ágil (1.5 segundos).
 */
export function scheduleSilasIntroCinematic() {
  let elapsed = 0
  const pollInterval = 100 // ms
  const maxWait = 2000 // ms de espera máxima para resolver getPlatform()

  const intervalId = timers.setInterval(() => {
    elapsed += pollInterval
    const platform = getPlatform()

    // Si la plataforma ya se resolvió o se alcanzó el tiempo límite de espera
    if (platform !== null || elapsed >= maxWait) {
      timers.clearInterval(intervalId)

      const mobile = isMobile() || platform === 'mobile'
      const startDelayMs = mobile ? 4500 : 1500

      console.log(
        `📱 [Cinemática Silas] Plataforma detectada: "${platform ?? 'desconocida'}" (Móvil: ${mobile}). Animación programada con retardo adaptativo de ${startDelayMs}ms.`
      )

      timers.setTimeout(() => {
        playSilasCinematic()
      }, startDelayMs)
    }
  }, pollInterval)
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

  // 1. Posicionar la cámara al inicio del arco
  const startX = SILAS_WORLD_POS.x + ORBIT_RADIUS * Math.sin(START_ANGLE_RAD)
  const startZ = SILAS_WORLD_POS.z - ORBIT_RADIUS * Math.cos(START_ANGLE_RAD)
  const startY = SILAS_WORLD_POS.y + 1.85
  Transform.getMutable(cam).position = Vector3.create(startX, startY, startZ)

  // 2. Activar la cámara virtual como cámara principal
  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  // 3. Congelar controles del avatar durante la cinemática
  InputModifier.createOrReplace(engine.PlayerEntity, {
    mode: InputModifier.Mode.Standard({ disableAll: true })
  })

  // 4. Saludo de Silas a los 0.6s
  timers.setTimeout(() => {
    if (isRunning) {
      triggerSilasWaveEmote()
    }
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

  // Curva de interpolación suave (SmoothStep / Cosine Ease In-Out)
  const easeProgress = 0.5 * (1 - Math.cos(Math.PI * normalizedProgress))

  // Ángulo actual del arco orbital
  const currentAngle = START_ANGLE_RAD + (END_ANGLE_RAD - START_ANGLE_RAD) * easeProgress

  // Radio y altura dinámicos (ligera elevación hacia el centro del encuadre)
  const heightBoost = Math.sin(Math.PI * normalizedProgress) * 0.45
  const currentY = SILAS_WORLD_POS.y + 1.85 + heightBoost

  const currentX = SILAS_WORLD_POS.x + ORBIT_RADIUS * Math.sin(currentAngle)
  const currentZ = SILAS_WORLD_POS.z - ORBIT_RADIUS * Math.cos(currentAngle)

  // Aplicar posición a la cámara virtual
  const camTransform = Transform.getMutable(cinematicCamEntity)
  camTransform.position = Vector3.create(currentX, currentY, currentZ)
}
