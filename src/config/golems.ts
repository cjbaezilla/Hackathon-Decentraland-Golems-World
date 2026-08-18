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
    modelSrc: 'assets/models/steam/golem_steam.glb',
    scale: 1.1,
    followDistance: 1.8,
    moveSpeed: 4.5,
    rotationSpeed: 6.0
  },
  {
    id: 'golem_galvanic_01',
    name: 'Chispazo Galvánico',
    affinity: GolemAffinity.GALVANIC,
    modelSrc: 'assets/models/galvanic/golem_galvanic.glb',
    scale: 0.95,
    followDistance: 3.6,
    moveSpeed: 4.8,
    rotationSpeed: 6.5
  },
  {
    id: 'golem_mechanical_01',
    name: 'Acorazado Mecánico',
    affinity: GolemAffinity.MECHANICAL,
    modelSrc: 'assets/models/mechanical/golem_mechanical.glb',
    scale: 1.2,
    followDistance: 5.4,
    moveSpeed: 4.2,
    rotationSpeed: 5.5
  }
]

/**
 * Catálogo maestro de los 5 arquetipos de golems disponibles por tipo.
 */
export const ALL_GOLEM_TYPES_CATALOG: Record<GolemAffinity, GolemConfig> = {
  [GolemAffinity.STEAM]: {
    id: 'golem_steam_base',
    name: 'Calderón de Vapor',
    affinity: GolemAffinity.STEAM,
    modelSrc: 'assets/models/steam/golem_steam.glb',
    scale: 1.1,
    followDistance: 1.8,
    moveSpeed: 4.5,
    rotationSpeed: 6.0
  },
  [GolemAffinity.GALVANIC]: {
    id: 'golem_galvanic_base',
    name: 'Chispazo Galvánico',
    affinity: GolemAffinity.GALVANIC,
    modelSrc: 'assets/models/galvanic/golem_galvanic.glb',
    scale: 0.95,
    followDistance: 3.6,
    moveSpeed: 4.8,
    rotationSpeed: 6.5
  },
  [GolemAffinity.MECHANICAL]: {
    id: 'golem_mechanical_base',
    name: 'Acorazado Mecánico',
    affinity: GolemAffinity.MECHANICAL,
    modelSrc: 'assets/models/mechanical/golem_mechanical.glb',
    scale: 1.2,
    followDistance: 5.4,
    moveSpeed: 4.2,
    rotationSpeed: 5.5
  },
  [GolemAffinity.LUMINOUS]: {
    id: 'golem_luminous_base',
    name: 'Faro Solar Luminoso',
    affinity: GolemAffinity.LUMINOUS,
    modelSrc: 'assets/models/luminous/golem_luminous.glb',
    scale: 1.0,
    followDistance: 3.0,
    moveSpeed: 5.0,
    rotationSpeed: 6.5
  },
  [GolemAffinity.AETHER]: {
    id: 'golem_aether_base',
    name: 'Autómata de Éter',
    affinity: GolemAffinity.AETHER,
    modelSrc: 'assets/models/aether/golem_aether.glb',
    scale: 1.05,
    followDistance: 4.0,
    moveSpeed: 4.6,
    rotationSpeed: 5.8
  }
}

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
