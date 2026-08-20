import { Vector3, Quaternion } from '@dcl/sdk/math'
import { engine, Transform } from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import {
  getIsSilasTourActive,
  setIsSilasTourActive,
  getSilasTourCurrentWaypoint,
  setSilasTourCurrentWaypoint,
  setSilasTourSubtitle,
  openNpcDialog,
  closeNpcDialog,
  getIsNpcDialogOpen
} from '../state'
import { t } from '../i18n'
import {
  setSilasPositionAndRotation,
  getSilasPosition,
  triggerSilasWaveEmote,
  setSilasEmote
} from '../objects/welcomeNpc'
import {
  activateTourFollowCamera,
  updateTourFollowCamera,
  deactivateTourFollowCamera,
  playMarketWestCinematic,
  playMarketSouthCinematic
} from '../cinematics/marketCinematic'

/**
 * ============================================================================
 * SISTEMA DE TOUR GUIADO DE SILAS EL SOBREVIVIENTE (SDK7 ECS)
 * ============================================================================
 * Maneja la navegación autónoma por waypoints, narración en movimiento,
 * orientación continua hacia el jugador en paradas, acompañamiento automático
 * del usuario (auto-follow) y control de cámaras cinemáticas.
 */

export interface TourWaypointNode {
  id: string
  targetPos: Vector3
  walkSpeed: number
  speechKey: string
  stopAction?: 'none' | 'dialog_hideout' | 'dialog_market_west' | 'dialog_factory' | 'dialog_market_south' | 'dialog_finish'
  triggerOrbitalCamera?: 'none' | 'market_west' | 'market_south'
}

/**
 * Matriz canónica de los 11 Waypoints del circuito completo de Silas.
 */
export const SILAS_TOUR_WAYPOINTS: TourWaypointNode[] = [
  // WP 0: Salida del campamento base hacia el norte (Img 1)
  {
    id: 'wp1_north_step',
    targetPos: Vector3.create(15.8, 0.25, 10.3),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp1',
    stopAction: 'none'
  },
  // WP 1: Llegada al Escondite del Usuario y 3 Cofres de la Bóveda (Img 2)
  {
    id: 'wp2_user_hideout',
    targetPos: Vector3.create(9.7, 0.25, 15.5),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp2',
    stopAction: 'dialog_hideout'
  },
  // WP 2: Salida del escondite hacia la calle principal (Img 3)
  {
    id: 'wp3_street_north',
    targetPos: Vector3.create(15.7, 0.25, 21.9),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp3',
    stopAction: 'none'
  },
  // WP 3: Aproximación al bulevar comercial (Img 4)
  {
    id: 'wp4_market_approach',
    targetPos: Vector3.create(15.4, 0.25, 25.8),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp4',
    stopAction: 'none'
  },
  // WP 4: Llegada a los Puestos de Mercado Oeste (Img 5)
  {
    id: 'wp5_market_west',
    targetPos: Vector3.create(10.6, 0.25, 29.0),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp5',
    stopAction: 'dialog_market_west',
    triggerOrbitalCamera: 'market_west'
  },
  // WP 5: Giro hacia el este por el corredor central (Img 6)
  {
    id: 'wp6_corridor_east_1',
    targetPos: Vector3.create(15.6, 0.25, 29.4),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp6',
    stopAction: 'none'
  },
  // WP 6: Cruce de la parcela central hacia la forja (Img 7)
  {
    id: 'wp7_corridor_east_2',
    targetPos: Vector3.create(23.6, 0.25, 25.8),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp7',
    stopAction: 'none'
  },
  // WP 7: Llegada a la Fábrica y Laboratorio de Golems (Img 8)
  {
    id: 'wp8_golem_factory',
    targetPos: Vector3.create(42.4, 0.25, 25.8),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp8',
    stopAction: 'dialog_factory'
  },
  // WP 8: Descenso hacia los Puestos de Mercado Sur (Img 9)
  {
    id: 'wp9_market_south',
    targetPos: Vector3.create(30.0, 0.25, 11.5),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp9',
    stopAction: 'dialog_market_south',
    triggerOrbitalCamera: 'market_south'
  },
  // WP 9: Retorno hacia el campamento base (Img 10)
  {
    id: 'wp10_camp_approach',
    targetPos: Vector3.create(16.0, 0.25, 9.8),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp10',
    stopAction: 'none'
  },
  // WP 10: Llegada y finalización en el campamento base
  {
    id: 'wp11_camp_return',
    targetPos: Vector3.create(15.8, 0.25, 5.9),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp11',
    stopAction: 'dialog_finish'
  }
]

let isPausedForStopDialog: boolean = false

/**
 * Teletransporta al usuario exactamente frente a Silas al detenerse en un punto de interés.
 */
export function teleportPlayerInFrontOfSilas(stopAction?: string) {
  let playerTargetPos = { x: 15.8, y: 0.25, z: 4.2 }
  let cameraLookTarget = { x: 15.8, y: 1.5, z: 5.9 }

  if (stopAction === 'dialog_hideout') {
    // Silas en (9.7, 0.25, 15.5) en el refugio; usuario colocado a (11.5, 0.25, 15.5) mirándolo
    playerTargetPos = { x: 11.5, y: 0.25, z: 15.5 }
    cameraLookTarget = { x: 9.7, y: 1.5, z: 15.5 }
  } else if (stopAction === 'dialog_market_west') {
    // Silas en (10.6, 0.25, 29.0) en Mercado Oeste; usuario colocado a (12.4, 0.25, 29.0)
    playerTargetPos = { x: 12.4, y: 0.25, z: 29.0 }
    cameraLookTarget = { x: 10.6, y: 1.5, z: 29.0 }
  } else if (stopAction === 'dialog_factory') {
    // Silas en (42.4, 0.25, 25.8) en la Fábrica de Golems; usuario colocado a (40.6, 0.25, 25.8)
    playerTargetPos = { x: 40.6, y: 0.25, z: 25.8 }
    cameraLookTarget = { x: 42.4, y: 1.5, z: 25.8 }
  } else if (stopAction === 'dialog_market_south') {
    // Silas en (30.0, 0.25, 11.5) en Mercado Sur; usuario colocado a (30.0, 0.25, 13.3)
    playerTargetPos = { x: 30.0, y: 0.25, z: 13.3 }
    cameraLookTarget = { x: 30.0, y: 1.5, z: 11.5 }
  } else if (stopAction === 'dialog_finish') {
    // Silas en (15.8, 0.25, 5.9) en campamento; usuario colocado a (15.8, 0.25, 4.2)
    playerTargetPos = { x: 15.8, y: 0.25, z: 4.2 }
    cameraLookTarget = { x: 15.8, y: 1.5, z: 5.9 }
  }

  try {
    movePlayerTo({
      newRelativePosition: playerTargetPos,
      cameraTarget: cameraLookTarget
    })
  } catch (err) {
    // Manejo de entorno
  }
}

/**
 * Gira a Silas dinámicamente para encarar y mirar directamente al avatar del jugador.
 */
export function orientSilasTowardsPlayer() {
  if (!Transform.has(engine.PlayerEntity)) return

  const pPos = Transform.get(engine.PlayerEntity).position
  const sPos = getSilasPosition()

  const dx = pPos.x - sPos.x
  const dz = pPos.z - sPos.z

  if (dx * dx + dz * dz > 0.04) {
    const angleRad = Math.atan2(dx, dz)
    const angleDeg = angleRad * (180 / Math.PI)
    setSilasPositionAndRotation(sPos, Quaternion.fromEulerDegrees(0, angleDeg, 0))
  }
}

/**
 * Inicia la ejecución del Tour Guiado de Silas desde el principio.
 */
export function startSilasGuidedTour() {
  setIsSilasTourActive(true)
  setSilasTourCurrentWaypoint(0)
  isPausedForStopDialog = false

  // Cerrar cualquier diálogo abierto para dar paso a la marcha
  closeNpcDialog()

  // Activar la cámara de seguimiento continuo
  activateTourFollowCamera()

  // Cargar el subtítulo de marcha del primer waypoint
  const firstWp = SILAS_TOUR_WAYPOINTS[0]
  if (firstWp) {
    setSilasTourSubtitle(t(firstWp.speechKey as any))
  }

  setSilasEmote('raiseHand')
  console.log('🧭 [Silas Tour] Tour guiado iniciado exitosamente. Silas en marcha hacia Waypoint 1.')
}

/**
 * Reanuda la marcha hacia el siguiente waypoint tras completar una parada explicativa.
 */
export function advanceSilasTourToNextWaypoint() {
  const currentIndex = getSilasTourCurrentWaypoint()
  const nextIndex = currentIndex + 1

  if (nextIndex >= SILAS_TOUR_WAYPOINTS.length) {
    // Fin total del tour
    finishSilasGuidedTour()
    return
  }

  setSilasTourCurrentWaypoint(nextIndex)
  isPausedForStopDialog = false
  closeNpcDialog()

  const nextWp = SILAS_TOUR_WAYPOINTS[nextIndex]
  setSilasTourSubtitle(t(nextWp.speechKey as any))

  console.log(`🧭 [Silas Tour] Avanzando a Waypoint #${nextIndex + 1}: ${nextWp.id} (${nextWp.targetPos.x.toFixed(1)}m, ${nextWp.targetPos.z.toFixed(1)}m).`)
}

/**
 * Concluye el tour guiado y restablece a Silas en su campamento base con su configuración habitual.
 */
export function finishSilasGuidedTour() {
  setIsSilasTourActive(false)
  setSilasTourCurrentWaypoint(0)
  isPausedForStopDialog = false
  setSilasTourSubtitle('')

  // Posicionar a Silas exactamente en su campamento inicial
  setSilasPositionAndRotation(
    Vector3.create(15.8, 0.25, 5.9),
    Quaternion.fromEulerDegrees(0, 180, 0)
  )

  triggerSilasWaveEmote()
  deactivateTourFollowCamera()
  closeNpcDialog()

  console.log('🏆 [Silas Tour] Tour completado. Silas devuelto al campamento base.')
}

/**
 * Sistema principal ECS de actualización de movimiento y waypoints del tour.
 */
export function silasTourSystem(dt: number) {
  if (!getIsSilasTourActive()) return

  // Si Silas está en una parada explicativa, mantener su orientación encarando al jugador
  if (isPausedForStopDialog) {
    orientSilasTowardsPlayer()
    return
  }

  const currentIndex = getSilasTourCurrentWaypoint()
  if (currentIndex >= SILAS_TOUR_WAYPOINTS.length) {
    finishSilasGuidedTour()
    return
  }

  const wp = SILAS_TOUR_WAYPOINTS[currentIndex]
  const currentPos = getSilasPosition()

  const dx = wp.targetPos.x - currentPos.x
  const dz = wp.targetPos.z - currentPos.z
  const distance = Math.sqrt(dx * dx + dz * dz)

  // Actualizar la cámara de seguimiento en tiempo real
  updateTourFollowCamera(currentPos)

  // 1. Llegada al Waypoint actual (distancia <= 0.35m)
  if (distance <= 0.35) {
    // Fijar posición exacta en el objetivo
    setSilasPositionAndRotation(wp.targetPos, Quaternion.fromEulerDegrees(0, 180, 0))

    // Manejar acciones de parada
    if (wp.stopAction && wp.stopAction !== 'none') {
      isPausedForStopDialog = true
      triggerSilasWaveEmote()

      // Teletransportar al usuario automáticamente frente a Silas al detenerse en la parada
      teleportPlayerInFrontOfSilas(wp.stopAction)
      orientSilasTowardsPlayer()

      // Si tiene cámara orbital asignada, dispararla
      if (wp.triggerOrbitalCamera === 'market_west') {
        playMarketWestCinematic(() => {
          openNpcDialog('tourMarketWest')
          orientSilasTowardsPlayer()
        })
      } else if (wp.triggerOrbitalCamera === 'market_south') {
        playMarketSouthCinematic(() => {
          openNpcDialog('tourMarketSouth')
          orientSilasTowardsPlayer()
        })
      } else {
        // Abrir el diálogo correspondiente a la parada
        if (wp.stopAction === 'dialog_hideout') {
          openNpcDialog('tourHideout')
        } else if (wp.stopAction === 'dialog_factory') {
          openNpcDialog('tourFactory')
        } else if (wp.stopAction === 'dialog_finish') {
          openNpcDialog('tourFinish')
        }
      }
      return
    }

    // Si no tiene parada, avanzar de inmediato al siguiente waypoint
    const nextIndex = currentIndex + 1
    if (nextIndex < SILAS_TOUR_WAYPOINTS.length) {
      setSilasTourCurrentWaypoint(nextIndex)
      const nextWp = SILAS_TOUR_WAYPOINTS[nextIndex]
      setSilasTourSubtitle(t(nextWp.speechKey as any))
    } else {
      finishSilasGuidedTour()
    }
    return
  }

  // 2. Desplazamiento suave hacia el objetivo
  const step = Math.min(distance, wp.walkSpeed * dt)
  const dirX = dx / distance
  const dirZ = dz / distance

  const newX = currentPos.x + dirX * step
  const newZ = currentPos.z + dirZ * step

  // Cálculo de rotación mirando hacia la dirección de avance
  const angleRad = Math.atan2(dirX, dirZ)
  const angleDeg = angleRad * (180 / Math.PI)
  const walkingRot = Quaternion.fromEulerDegrees(0, angleDeg, 0)

  setSilasPositionAndRotation(
    Vector3.create(newX, wp.targetPos.y, newZ),
    walkingRot
  )
}
