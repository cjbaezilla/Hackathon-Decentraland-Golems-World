import {
  engine,
  Transform,
  VirtualCamera,
  MainCamera,
  Entity,
  timers
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { setIsCinematicActive, getIsCinematicActive, setActiveCinematicType } from '../state'
import { getSilasAvatarEntity } from '../objects/welcomeNpc'

/**
 * ============================================================================
 * CÁMARAS ORBITALES Y CINEMÁTICAS DEL MERCADO Y TOUR GUIADO (SDK7 ECS)
 * ============================================================================
 * 1. Entidades de enfoque dedicadas para:
 *    - Escondite y Bóveda del Jugador (Refugio y 3 Cofres Seguros).
 *    - Paseo Comercial Oeste (Quioscos 06 al 10).
 *    - Fábrica y Laboratorio de Golems (Crisol de Forja y Podio Prototipo).
 *    - Bulevar Comercial Sur (Quioscos 01 al 05).
 * 2. Cámaras orbitales panorámicas para cada punto de interés del tour.
 * 3. Cámara de seguimiento en tercera persona para acompañar a Silas en el tour.
 */

let orbitalCamEntity: Entity | null = null
let tourFollowCamEntity: Entity | null = null
let hideoutFocusEntity: Entity | null = null
let westMarketFocusEntity: Entity | null = null
let factoryFocusEntity: Entity | null = null
let southMarketFocusEntity: Entity | null = null

let isOrbitalRunning: boolean = false
let orbitalMode: 'west' | 'south' | 'hideout' | 'factory' | null = null
let orbitalElapsedTime: number = 0
let orbitalTimeoutId: number | null = null
let onOrbitalCompleteCallback: (() => void) | null = null

const ORBITAL_DURATION = 4.8 // Duración del barrido orbital en segundos

/**
 * Inicializa las entidades de enfoque visual para los puntos de interés del tour.
 */
function initMarketFocusEntities() {
  if (!hideoutFocusEntity) {
    hideoutFocusEntity = engine.addEntity()
    Transform.create(hideoutFocusEntity, {
      position: Vector3.create(6.0, 1.6, 17.7), // Centro del Escondite y 3 Cofres de Bóveda
      rotation: Quaternion.Identity()
    })
  }

  if (!westMarketFocusEntity) {
    westMarketFocusEntity = engine.addEntity()
    Transform.create(westMarketFocusEntity, {
      position: Vector3.create(6.4, 1.6, 45.6), // Centro del Paseo Oeste (Puestos 06 al 10)
      rotation: Quaternion.Identity()
    })
  }

  if (!factoryFocusEntity) {
    factoryFocusEntity = engine.addEntity()
    Transform.create(factoryFocusEntity, {
      position: Vector3.create(35.0, 2.0, 34.0), // Núcleo Central de la Fábrica y Laboratorio
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
 * Dispara la cinemática orbital del Escondite y Bóveda del Jugador.
 */
export function playHideoutCinematic(onFinish?: () => void) {
  if (isOrbitalRunning) return

  const cam = initMarketOrbitalCamera()
  initMarketFocusEntities()

  isOrbitalRunning = true
  orbitalMode = 'hideout'
  orbitalElapsedTime = 0
  onOrbitalCompleteCallback = onFinish ?? null
  setActiveCinematicType('hideout')

  // Enfocar explícitamente hacia el centro del escondite y los 3 cofres (X: 6.0m, Z: 17.7m)
  if (VirtualCamera.has(cam) && hideoutFocusEntity) {
    VirtualCamera.getMutable(cam).lookAtEntity = hideoutFocusEntity
  }

  // Posición de arranque en el extremo sur del refugio
  Transform.getMutable(cam).position = Vector3.create(12.2, 3.2, 12.8)

  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  if (orbitalTimeoutId !== null) {
    timers.clearTimeout(orbitalTimeoutId)
  }
  orbitalTimeoutId = timers.setTimeout(() => {
    stopMarketOrbital()
  }, ORBITAL_DURATION * 1000)

  console.log('🎬 [Cinemática Escondite] Barrido orbital enfocado hacia el refugio y los 3 cofres de bóveda.')
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
  setActiveCinematicType('market_west')

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
 * Dispara la cinemática orbital de la Fábrica y Laboratorio de Golems.
 */
export function playFactoryCinematic(onFinish?: () => void) {
  if (isOrbitalRunning) return

  const cam = initMarketOrbitalCamera()
  initMarketFocusEntities()

  isOrbitalRunning = true
  orbitalMode = 'factory'
  orbitalElapsedTime = 0
  onOrbitalCompleteCallback = onFinish ?? null
  setActiveCinematicType('factory')

  // Enfocar hacia el núcleo de la fábrica (caldera, chimeneas, podio con prototipo) (X: 35.0m, Z: 34.0m)
  if (VirtualCamera.has(cam) && factoryFocusEntity) {
    VirtualCamera.getMutable(cam).lookAtEntity = factoryFocusEntity
  }

  // Posición de arranque elevada en el frente este mirando hacia la fábrica
  Transform.getMutable(cam).position = Vector3.create(44.5, 4.2, 24.5)

  MainCamera.createOrReplace(engine.CameraEntity, {
    virtualCameraEntity: cam
  })

  if (orbitalTimeoutId !== null) {
    timers.clearTimeout(orbitalTimeoutId)
  }
  orbitalTimeoutId = timers.setTimeout(() => {
    stopMarketOrbital()
  }, ORBITAL_DURATION * 1000)

  console.log('🎬 [Cinemática Fábrica Golems] Barrido orbital enfocado hacia la forja alquímica y el podio prototipo.')
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
  setActiveCinematicType('market_south')

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
 * Detiene cualquier cinemática orbital de mercado/tour y restaura la cámara adecuada.
 */
export function stopMarketOrbital() {
  if (!isOrbitalRunning) return

  isOrbitalRunning = false
  orbitalMode = null
  orbitalElapsedTime = 0
  setActiveCinematicType(null)

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

  console.log('🎬 [Cinemática Tour] Barrido finalizado. Restaurada cámara de seguimiento hacia Silas.')
}

/**
 * Sistema ECS para mover la cámara orbital suavemente a lo largo del tiempo.
 */
export function marketOrbitalSystem(dt: number) {
  if (!isOrbitalRunning || !orbitalCamEntity || !Transform.has(orbitalCamEntity)) return

  orbitalElapsedTime += dt
  const progress = Math.min(1.0, orbitalElapsedTime / ORBITAL_DURATION)
  const ease = 0.5 * (1 - Math.cos(Math.PI * progress))

  const camTransform = Transform.getMutable(orbitalCamEntity)

  if (orbitalMode === 'hideout') {
    // Barrido de sur a norte frente al refugio y los 3 cofres (Z: 12.8m -> 22.6m) mirando a (X: 6.0m, Z: 17.7m)
    const currentZ = 12.8 + (22.6 - 12.8) * ease
    const currentX = 12.2 + Math.sin(Math.PI * progress) * 1.5
    const currentY = 3.2 + Math.sin(Math.PI * progress) * 0.6
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  } else if (orbitalMode === 'west') {
    // Barrido de sur a norte a lo largo del Paseo Oeste (Z: 25m -> 58m) mirando al oeste hacia los quioscos (X: 6.4m)
    const currentZ = 25.0 + (58.0 - 25.0) * ease
    const currentX = 13.0 + Math.sin(Math.PI * progress) * 2.0
    const currentY = 3.6 + Math.sin(Math.PI * progress) * 0.8
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  } else if (orbitalMode === 'factory') {
    // Barrido panorámico frontal de este a oeste frente a la Fábrica (X: 44.5m -> 26.0m) mirando a (X: 35.0m, Z: 34.0m)
    const currentX = 44.5 + (26.0 - 44.5) * ease
    const currentZ = 24.5 + Math.sin(Math.PI * progress) * 2.0
    const currentY = 4.2 + Math.sin(Math.PI * progress) * 0.8
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  } else if (orbitalMode === 'south') {
    // Barrido de oeste a este a lo largo del Bulevar Sur (X: 26m -> 65m) mirando al sur hacia los quioscos (Z: 8.8m)
    const currentX = 26.0 + (65.0 - 26.0) * ease
    const currentZ = 15.5 + Math.sin(Math.PI * progress) * 1.8 // Situado al norte de los quioscos mirando hacia el sur
    const currentY = 3.6 + Math.sin(Math.PI * progress) * 0.8
    camTransform.position = Vector3.create(currentX, currentY, currentZ)
  }
}

