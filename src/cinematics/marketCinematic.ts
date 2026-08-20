import {
  engine,
  Transform,
  VirtualCamera,
  MainCamera,
  Entity,
  timers
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { setIsCinematicActive, getIsCinematicActive } from '../state'
import { getSilasAvatarEntity } from '../objects/welcomeNpc'

/**
 * ============================================================================
 * CÁMARAS ORBITALES Y CINEMÁTICAS DEL MERCADO Y TOUR GUIADO (SDK7 ECS)
 * ============================================================================
 * 1. Entidades de enfoque dedicadas para Paseo Comercial Oeste y Bulevar Sur.
 * 2. Cámara orbital panorámica del Paseo Comercial Oeste (Quioscos 06 al 10).
 * 3. Cámara orbital panorámica del Bulevar Comercial Sur (Quioscos 01 al 05).
 * 4. Cámara de seguimiento en tercera persona para acompañar a Silas en el tour.
 */

let orbitalCamEntity: Entity | null = null
let tourFollowCamEntity: Entity | null = null
let westMarketFocusEntity: Entity | null = null
let southMarketFocusEntity: Entity | null = null

let isOrbitalRunning: boolean = false
let orbitalMode: 'west' | 'south' | null = null
let orbitalElapsedTime: number = 0
let orbitalTimeoutId: number | null = null
let onOrbitalCompleteCallback: (() => void) | null = null

const ORBITAL_DURATION = 4.8 // Duración del barrido orbital en segundos

/**
 * Inicializa las entidades de enfoque visual para los puestos de mercado.
 */
function initMarketFocusEntities() {
  if (!westMarketFocusEntity) {
    westMarketFocusEntity = engine.addEntity()
    Transform.create(westMarketFocusEntity, {
      position: Vector3.create(6.4, 1.6, 45.6), // Centro del Paseo Oeste (Puestos 06 al 10)
      rotation: Quaternion.Identity()
    })
  }

  if (!southMarketFocusEntity) {
    southMarketFocusEntity = engine.addEntity()
    Transform.create(southMarketFocusEntity, {
      position: Vector3.create(46.5, 1.6, 8.8), // Centro del Bulevar Sur (Puestos 01 al 05)
      rotation: Quaternion.Identity()
    })
  }
}

/**
 * Inicializa la cámara virtual orbital compartida.
 */
export function initMarketOrbitalCamera(): Entity {
  if (orbitalCamEntity) return orbitalCamEntity

  initMarketFocusEntities()

  orbitalCamEntity = engine.addEntity()
  Transform.create(orbitalCamEntity, {
    position: Vector3.create(12.0, 3.5, 26.0),
    rotation: Quaternion.Identity()
  })

  VirtualCamera.create(orbitalCamEntity, {
    fov: 52,
    defaultTransition: {
      transitionMode: VirtualCamera.Transition.Time(1.0)
    }
  })

  engine.addSystem(marketOrbitalSystem)
  return orbitalCamEntity
}

/**
 * Inicializa la cámara virtual de seguimiento continuo de Silas.
 */
export function initTourFollowCamera(): Entity {
  if (tourFollowCamEntity) return tourFollowCamEntity

  tourFollowCamEntity = engine.addEntity()
  Transform.create(tourFollowCamEntity, {
    position: Vector3.create(15.8, 2.6, 2.5),
    rotation: Quaternion.Identity()
  })

  const silasAvatar = getSilasAvatarEntity()

  VirtualCamera.create(tourFollowCamEntity, {
    lookAtEntity: silasAvatar ?? undefined,
    fov: 55,
    defaultTransition: {
      transitionMode: VirtualCamera.Transition.Time(0.8)
    }
  })

  return tourFollowCamEntity
}

/**
 * Activa la cámara de seguimiento de Silas como cámara activa principal.
 */
export function activateTourFollowCamera() {
  const cam = initTourFollowCamera()
  const silasAvatar = getSilasAvatarEntity()

  if (silasAvatar && VirtualCamera.has(cam)) {
    VirtualCamera.getMutable(cam).lookAtEntity = silasAvatar
  }

  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })
}

/**
 * Actualiza la posición de la cámara de seguimiento continuo de Silas.
 */
export function updateTourFollowCamera(silasPos: Vector3) {
  if (!tourFollowCamEntity || isOrbitalRunning) return

  // Posiciona la cámara detrás y ligeramente elevada respecto a Silas
  const targetCamPos = Vector3.create(
    silasPos.x,
    silasPos.y + 2.5,
    silasPos.z - 3.8
  )

  if (Transform.has(tourFollowCamEntity)) {
    const camTransform = Transform.getMutable(tourFollowCamEntity)
    // Interpolación suave hacia la posición deseada
    camTransform.position = Vector3.lerp(camTransform.position, targetCamPos, 0.15)
  }
}

/**
 * Desactiva la cámara de seguimiento y restaura la cámara natural del jugador.
 */
export function deactivateTourFollowCamera() {
  if (MainCamera.has(engine.CameraEntity)) {
    MainCamera.getMutable(engine.CameraEntity).virtualCameraEntity = undefined
  }
}

/**
 * Dispara la cinemática orbital del Paseo Comercial Oeste (Quioscos 06 al 10).
 */
export function playMarketWestCinematic(onFinish?: () => void) {
  if (isOrbitalRunning) return

  const cam = initMarketOrbitalCamera()
  initMarketFocusEntities()

  isOrbitalRunning = true
  orbitalMode = 'west'
  orbitalElapsedTime = 0
  onOrbitalCompleteCallback = onFinish ?? null
  setIsCinematicActive(true)

  // Enfocar explícitamente hacia el centro de los quioscos del Oeste (X: 6.4m, Z: 45.6m)
  if (VirtualCamera.has(cam) && westMarketFocusEntity) {
    VirtualCamera.getMutable(cam).lookAtEntity = westMarketFocusEntity
  }

  // Posición de arranque en el extremo sur del Paseo Oeste mirando al norte
  Transform.getMutable(cam).position = Vector3.create(13.5, 3.8, 25.0)

  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  if (orbitalTimeoutId !== null) {
    timers.clearTimeout(orbitalTimeoutId)
  }
  orbitalTimeoutId = timers.setTimeout(() => {
    stopMarketOrbital()
  }, ORBITAL_DURATION * 1000)

  console.log('🎬 [Cinemática Mercado Oeste] Barrido orbital enfocado hacia los quioscos 06-10.')
}

/**
 * Dispara la cinemática orbital del Bulevar Comercial Sur (Quioscos 01 al 05).
 */
export function playMarketSouthCinematic(onFinish?: () => void) {
  if (isOrbitalRunning) return

  const cam = initMarketOrbitalCamera()
  initMarketFocusEntities()

  isOrbitalRunning = true
  orbitalMode = 'south'
  orbitalElapsedTime = 0
  onOrbitalCompleteCallback = onFinish ?? null
  setIsCinematicActive(true)

  // Enfocar explícitamente hacia el centro del bulevar sur (X: 46.5m, Z: 8.8m)
  if (VirtualCamera.has(cam) && southMarketFocusEntity) {
    VirtualCamera.getMutable(cam).lookAtEntity = southMarketFocusEntity
  }

  // Posición de arranque al oeste mirando hacia el sur
  Transform.getMutable(cam).position = Vector3.create(26.0, 3.8, 15.5)

  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  if (orbitalTimeoutId !== null) {
    timers.clearTimeout(orbitalTimeoutId)
  }
  orbitalTimeoutId = timers.setTimeout(() => {
    stopMarketOrbital()
  }, ORBITAL_DURATION * 1000)

  console.log('🎬 [Cinemática Mercado Sur] Barrido orbital enfocado hacia los quioscos 01-05 (Bulevar Sur).')
}

/**
 * Detiene cualquier cinemática orbital de mercado y restaura la cámara adecuada.
 */
export function stopMarketOrbital() {
  if (!isOrbitalRunning) return

  isOrbitalRunning = false
  orbitalMode = null
  orbitalElapsedTime = 0
  setIsCinematicActive(false)

  if (orbitalTimeoutId !== null) {
    timers.clearTimeout(orbitalTimeoutId)
    orbitalTimeoutId = null
  }

  // Restaurar lookAtEntity de la cámara de seguimiento hacia Silas
  const silasAvatar = getSilasAvatarEntity()
  if (tourFollowCamEntity && silasAvatar && VirtualCamera.has(tourFollowCamEntity)) {
    VirtualCamera.getMutable(tourFollowCamEntity).lookAtEntity = silasAvatar
  }

  activateTourFollowCamera()

  const callback = onOrbitalCompleteCallback
  onOrbitalCompleteCallback = null
  if (callback) {
    callback()
  }

  console.log('🎬 [Cinemática Mercado] Barrido finalizado. Restaurada cámara de seguimiento hacia Silas.')
}

/**
 * Sistema ECS para mover la cámara orbital de mercado suavemente a lo largo del tiempo.
 */
export function marketOrbitalSystem(dt: number) {
  if (!isOrbitalRunning || !orbitalCamEntity || !Transform.has(orbitalCamEntity)) return

  orbitalElapsedTime += dt
  const progress = Math.min(1.0, orbitalElapsedTime / ORBITAL_DURATION)
  const ease = 0.5 * (1 - Math.cos(Math.PI * progress))

  const camTransform = Transform.getMutable(orbitalCamEntity)

  if (orbitalMode === 'west') {
    // Barrido de sur a norte a lo largo del Paseo Oeste (Z: 25m -> 58m) mirando al oeste hacia los quioscos (X: 6.4m)
    const currentZ = 25.0 + (58.0 - 25.0) * ease
    const currentX = 13.0 + Math.sin(Math.PI * progress) * 2.0
    const currentY = 3.6 + Math.sin(Math.PI * progress) * 0.8
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  } else if (orbitalMode === 'south') {
    // Barrido de oeste a este a lo largo del Bulevar Sur (X: 26m -> 65m) mirando al sur hacia los quioscos (Z: 8.8m)
    const currentX = 26.0 + (65.0 - 26.0) * ease
    const currentZ = 15.5 + Math.sin(Math.PI * progress) * 1.8 // Situado al norte de los quioscos mirando hacia el sur
    const currentY = 3.6 + Math.sin(Math.PI * progress) * 0.8
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  }
}
