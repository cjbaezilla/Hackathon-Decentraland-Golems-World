import { Vector3, Quaternion } from '@dcl/sdk/math'
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
 * paradas explicativas en puntos de interés y control de cámaras cinemáticas.
 */

export interface TourWaypointNode {
  id: string
  targetPos: Vector3
  walkSpeed: number
  speechKey: string
  finalLookRotationDeg: number // Grados en Y para encarar la atracción al llegar
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
    finalLookRotationDeg: 0,
    stopAction: 'none'
  },
  // WP 1: Llegada al Escondite del Usuario y 3 Cofres de la Bóveda (Img 2)
  {
    id: 'wp2_user_hideout',
    targetPos: Vector3.create(9.7, 0.25, 15.5),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp2',
    finalLookRotationDeg: 270, // Mirando hacia el oeste (hacia los cofres y el refugio)
    stopAction: 'dialog_hideout'
  },
  // WP 2: Salida del escondite hacia la calle principal (Img 3)
  {
    id: 'wp3_street_north',
    targetPos: Vector3.create(15.7, 0.25, 21.9),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp3',
    finalLookRotationDeg: 0,
    stopAction: 'none'
  },
  // WP 3: Aproximación al bulevar comercial (Img 4)
  {
    id: 'wp4_market_approach',
    targetPos: Vector3.create(15.4, 0.25, 25.8),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp4',
    finalLookRotationDeg: 0,
    stopAction: 'none'
  },
  // WP 4: Llegada a los Puestos de Mercado Oeste (Img 5)
  {
    id: 'wp5_market_west',
    targetPos: Vector3.create(10.6, 0.25, 29.0),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp5',
    finalLookRotationDeg: 270, // Mirando hacia el puesto 06 del oeste
    stopAction: 'dialog_market_west',
    triggerOrbitalCamera: 'market_west'
  },
  // WP 5: Giro hacia el este por el corredor central (Img 6)
  {
    id: 'wp6_corridor_east_1',
    targetPos: Vector3.create(15.6, 0.25, 29.4),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp6',
    finalLookRotationDeg: 90,
    stopAction: 'none'
  },
  // WP 6: Cruce de la parcela central hacia la forja (Img 7)
  {
    id: 'wp7_corridor_east_2',
    targetPos: Vector3.create(23.6, 0.25, 25.8),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp7',
    finalLookRotationDeg: 90,
    stopAction: 'none'
  },
  // WP 7: Llegada a la Fábrica y Laboratorio de Golems (Img 8)
  {
    id: 'wp8_golem_factory',
    targetPos: Vector3.create(42.4, 0.25, 25.8),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp8',
    finalLookRotationDeg: 90, // Mirando hacia el laboratorio y el crisol
    stopAction: 'dialog_factory'
  },
  // WP 8: Descenso hacia los Puestos de Mercado Sur (Img 9)
  {
    id: 'wp9_market_south',
    targetPos: Vector3.create(30.0, 0.25, 11.5),
    walkSpeed: 2.5,
    speechKey: 'tour.subtitleWp9',
    finalLookRotationDeg: 180, // Mirando hacia los puestos del sur
    stopAction: 'dialog_market_south',
    triggerOrbitalCamera: 'market_south'
  },
  // WP 9: Retorno hacia el campamento base (Img 10)
  {
    id: 'wp10_camp_approach',
    targetPos: Vector3.create(16.0, 0.25, 9.8),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp10',
    finalLookRotationDeg: 180,
    stopAction: 'none'
  },
  // WP 10: Llegada y finalización en el campamento base
  {
    id: 'wp11_camp_return',
    targetPos: Vector3.create(15.8, 0.25, 5.9),
    walkSpeed: 2.4,
    speechKey: 'tour.subtitleWp11',
    finalLookRotationDeg: 180, // Mirando al sur recibiendo al jugador
    stopAction: 'dialog_finish'
  }
]

let isPausedForStopDialog: boolean = false

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
  if (isPausedForStopDialog) return

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
    // Fijar posición exacta y orientación final
    const finalRot = Quaternion.fromEulerDegrees(0, wp.finalLookRotationDeg, 0)
    setSilasPositionAndRotation(wp.targetPos, finalRot)

    // Manejar acciones de parada
    if (wp.stopAction && wp.stopAction !== 'none') {
      isPausedForStopDialog = true
      triggerSilasWaveEmote()

      // Si tiene cámara orbital asignada, dispararla
      if (wp.triggerOrbitalCamera === 'market_west') {
        playMarketWestCinematic(() => {
          openNpcDialog('tourMarketWest')
        })
      } else if (wp.triggerOrbitalCamera === 'market_south') {
        playMarketSouthCinematic(() => {
          openNpcDialog('tourMarketSouth')
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
