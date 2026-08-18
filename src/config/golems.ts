/**
 * ============================================================================
 * CONFIGURACIÓN DE GOLEMS Y SISTEMA DE SEGUIMIENTO
 * ============================================================================
 * Constantes y parámetros para la formación en fila, distancias de seguimiento,
 * velocidades de interpolación (LERP/SLERP) y catálogo de las 5 afinidades.
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

/**
 * Nombres y metadatos temáticos por afinidad y variante (01 a 05).
 */
const GOLEM_AFFINITY_VARIANTS: Record<
  GolemAffinity,
  {
    folder: string
    baseScale: number
    baseSpeed: number
    baseRotSpeed: number
    names: string[]
  }
> = {
  [GolemAffinity.STEAM]: {
    folder: 'steam',
    baseScale: 1.1,
    baseSpeed: 4.5,
    baseRotSpeed: 6.0,
    names: [
      'Calderón de Vapor',
      'Fogonero Cobrizo',
      'Vaporizador Blindado',
      'Termotanque Autómata',
      'Titán de Presión'
    ]
  },
  [GolemAffinity.GALVANIC]: {
    folder: 'galvanic',
    baseScale: 0.95,
    baseSpeed: 4.8,
    baseRotSpeed: 6.5,
    names: [
      'Chispazo Galvánico',
      'Voltamperio Centella',
      'Bobina Electrificada',
      'Arco Galvanoide',
      'Centella de Inducción'
    ]
  },
  [GolemAffinity.MECHANICAL]: {
    folder: 'mechanical',
    baseScale: 1.2,
    baseSpeed: 4.2,
    baseRotSpeed: 5.5,
    names: [
      'Acorazado Mecánico',
      'Engranaje Férreo',
      'Brazo de Chatarra',
      'Autómata Remachado',
      'Bastión de Bielas'
    ]
  },
  [GolemAffinity.LUMINOUS]: {
    folder: 'luminous',
    baseScale: 1.0,
    baseSpeed: 5.0,
    baseRotSpeed: 6.5,
    names: [
      'Faro Solar Luminoso',
      'Prisma Refractor',
      'Centinela de Filamento',
      'Baliza de Cuarzo',
      'Destello Espectral'
    ]
  },
  [GolemAffinity.AETHER]: {
    folder: 'aether',
    baseScale: 1.05,
    baseSpeed: 4.6,
    baseRotSpeed: 5.8,
    names: [
      'Autómata de Éter',
      'Resonador Místico',
      'Espectro de Vacío',
      'Orbe de Maná Fósil',
      'Vórtice Alquímico'
    ]
  }
}

/** Distancias escalonadas para la formación en fila india de 3 unidades */
export const SQUAD_FOLLOW_DISTANCES = [1.8, 3.6, 5.4]

/**
 * Genera un escuadrón aleatorio de 3 golems garantizando 3 TIPOS COMPLETAMENTE DISTINTOS.
 * Selecciona al azar 3 de las 5 afinidades y una variante de modelo 3D (01 a 05) para cada una.
 */
export function generateRandomSquad(ownerSeed?: string): GolemConfig[] {
  const allAffinities = [
    GolemAffinity.STEAM,
    GolemAffinity.GALVANIC,
    GolemAffinity.MECHANICAL,
    GolemAffinity.LUMINOUS,
    GolemAffinity.AETHER
  ]

  // Barajado Fisher-Yates para selección aleatoria sin repetición
  const shuffledAffinities = [...allAffinities]
  for (let i = shuffledAffinities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledAffinities[i]
    shuffledAffinities[i] = shuffledAffinities[j]
    shuffledAffinities[j] = temp
  }

  // Tomar exactamente 3 tipos distintos
  const selectedAffinities = shuffledAffinities.slice(0, 3)

  return selectedAffinities.map((affinity, index) => {
    const variantData = GOLEM_AFFINITY_VARIANTS[affinity]
    const variantNumber = Math.floor(Math.random() * 5) + 1 // 1 a 5
    const variantPad = variantNumber.toString().padStart(2, '0')
    const modelSrc = `assets/models/${variantData.folder}/golem_${variantData.folder}_${variantPad}.glb`
    const name = variantData.names[variantNumber - 1] || `${affinity} #${variantNumber}`
    const followDistance = SQUAD_FOLLOW_DISTANCES[index] || (index + 1) * 1.8

    return {
      id: `golem_${variantData.folder}_${variantPad}_${Date.now()}_${index}`,
      name,
      affinity,
      modelSrc,
      scale: variantData.baseScale,
      followDistance,
      moveSpeed: variantData.baseSpeed,
      rotationSpeed: variantData.baseRotSpeed
    }
  })
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

