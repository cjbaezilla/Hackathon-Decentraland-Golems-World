/**
 * ============================================================================
 * CONFIGURACIÓN DE GOLEMS Y SISTEMA DE SEGUIMIENTO
 * ============================================================================
 * Constantes y parámetros para la formación en fila, distancias de seguimiento,
 * velocidades de interpolación (LERP/SLERP) y metadatos de los 3 golems de prueba.
 */

export enum GolemAffinity {
  STEAM = 'Vapor',
  GALVANIC = 'Galvánico',
  MECHANICAL = 'Mecánico',
  LUMINOUS = 'Luminoso',
  AETHER = 'Éter'
}

export interface GolemConfig {
  id: string
  name: string
  affinity: GolemAffinity
  modelSrc: string
  scale: number
  /** Distancia objetivo en metros detrás del avatar (o del golem precedente) */
  followDistance: number
  /** Velocidad de desplazamiento (factor LERP) */
  moveSpeed: number
  /** Velocidad de giro/orientación (factor SLERP) */
  rotationSpeed: number
}

export const INITIAL_GOLEMS_CONFIG: GolemConfig[] = [
  {
    id: 'golem_steam_01',
    name: 'Calderón de Vapor',
    affinity: GolemAffinity.STEAM,
    modelSrc: 'assets/models/golem_steam.glb',
    scale: 1.1,
    followDistance: 1.8,
    moveSpeed: 4.5,
    rotationSpeed: 6.0
  },
  {
    id: 'golem_galvanic_01',
    name: 'Chispazo Galvánico',
    affinity: GolemAffinity.GALVANIC,
    modelSrc: 'assets/models/golem_galvanic.glb',
    scale: 0.95,
    followDistance: 3.6,
    moveSpeed: 4.8,
    rotationSpeed: 6.5
  },
  {
    id: 'golem_mechanical_01',
    name: 'Acorazado Mecánico',
    affinity: GolemAffinity.MECHANICAL,
    modelSrc: 'assets/models/golem_mechanical.glb',
    scale: 1.2,
    followDistance: 5.4,
    moveSpeed: 4.2,
    rotationSpeed: 5.5
  }
]

export const FOLLOW_SYSTEM_SETTINGS = {
  /** Distancia mínima recorrida por el jugador para registrar un nuevo punto de migaja (m) */
  BREADCRUMB_MIN_DISTANCE: 0.25,
  /** Cantidad máxima de puntos guardados en el historial de trayectoria */
  MAX_BREADCRUMBS: 60,
  /** Umbral de reposo: si la distancia es menor a este valor, el golem no se mueve (evita jitter) */
  IDLE_DISTANCE_THRESHOLD: 0.12,
  /** Umbral de distancia máxima: si el jugador se teletransporta o se aleja más de este valor, resetea la posición */
  TELEPORT_DISTANCE_THRESHOLD: 25.0
}
