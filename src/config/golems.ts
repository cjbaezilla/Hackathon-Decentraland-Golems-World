/**
 * ============================================================================
 * CONFIGURACIÓN DE GOLEMS Y SISTEMA DE SEGUIMIENTO
 * ============================================================================
 * Constantes y parámetros para la formación en fila, distancias de seguimiento,
 * velocidades de interpolación (LERP/SLERP) y catálogo de las 5 afinidades.
 */

import { getLocalizedGolemName, getLocalizedAffinity, Language } from '../i18n'

export enum GolemAffinity {
  STEAM = 'Vapor',
  GALVANIC = 'Galvánico',
  MECHANICAL = 'Mecánico',
  LUMINOUS = 'Luminoso',
  AETHER = 'Éter'
}

export interface GolemStats {
  attack: number
  defense: number
  maxHp: number
  currentHp: number
  speed: number
  expReward: number
  currentExp: number
  level: number
}

export interface GolemConfig extends GolemStats {
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
  /** Índice de variante visual (0 a 4) para traducciones dinámicas */
  variantIndex?: number
}

/**
 * Nombres y metadatos temáticos por afinidad y variante (01 a 05),
 * con arquetipos base de estadísticas para equilibrar el juego.
 */
const GOLEM_AFFINITY_VARIANTS: Record<
  GolemAffinity,
  {
    folder: string
    baseScale: number
    baseSpeed: number
    baseRotSpeed: number
    minHp: number
    maxHp: number
    minAtk: number
    maxAtk: number
    minDef: number
    maxDef: number
    minSpd: number
    maxSpd: number
    minExp: number
    maxExp: number
    names: string[]
  }
> = {
  [GolemAffinity.STEAM]: {
    folder: 'steam',
    baseScale: 1.1,
    baseSpeed: 4.5,
    baseRotSpeed: 6.0,
    minHp: 130,
    maxHp: 170,
    minAtk: 20,
    maxAtk: 28,
    minDef: 12,
    maxDef: 18,
    minSpd: 10,
    maxSpd: 16,
    minExp: 45,
    maxExp: 80,
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
    minHp: 90,
    maxHp: 125,
    minAtk: 26,
    maxAtk: 36,
    minDef: 7,
    maxDef: 13,
    minSpd: 20,
    maxSpd: 30,
    minExp: 50,
    maxExp: 90,
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
    minHp: 140,
    maxHp: 185,
    minAtk: 18,
    maxAtk: 26,
    minDef: 18,
    maxDef: 28,
    minSpd: 8,
    maxSpd: 14,
    minExp: 45,
    maxExp: 85,
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
    minHp: 100,
    maxHp: 135,
    minAtk: 22,
    maxAtk: 30,
    minDef: 10,
    maxDef: 16,
    minSpd: 22,
    maxSpd: 32,
    minExp: 40,
    maxExp: 80,
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
    minHp: 105,
    maxHp: 145,
    minAtk: 28,
    maxAtk: 38,
    minDef: 9,
    maxDef: 15,
    minSpd: 12,
    maxSpd: 20,
    minExp: 55,
    maxExp: 95,
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
 * Devuelve la afinidad contra la cual el atacante tiene ventaja elemental directa (x1.40).
 * Pentágono: Vapor > Mecánico > Galvánico > Luminoso > Éter > Vapor
 */
export function getVulnerableAffinity(attackerAffinity: string): GolemAffinity {
  switch (attackerAffinity) {
    case GolemAffinity.STEAM:
      return GolemAffinity.MECHANICAL
    case GolemAffinity.MECHANICAL:
      return GolemAffinity.GALVANIC
    case GolemAffinity.GALVANIC:
      return GolemAffinity.LUMINOUS
    case GolemAffinity.LUMINOUS:
      return GolemAffinity.AETHER
    case GolemAffinity.AETHER:
      return GolemAffinity.STEAM
    default:
      return GolemAffinity.MECHANICAL
  }
}

/**
 * Devuelve la afinidad ante la cual el defensor tiene desventaja (x0.75).
 */
export function getDisadvantageAffinity(attackerAffinity: string): GolemAffinity {
  switch (attackerAffinity) {
    case GolemAffinity.STEAM:
      return GolemAffinity.AETHER
    case GolemAffinity.MECHANICAL:
      return GolemAffinity.STEAM
    case GolemAffinity.GALVANIC:
      return GolemAffinity.MECHANICAL
    case GolemAffinity.LUMINOUS:
      return GolemAffinity.GALVANIC
    case GolemAffinity.AETHER:
      return GolemAffinity.LUMINOUS
    default:
      return GolemAffinity.AETHER
  }
}

/**
 * Calcula el multiplicador de daño según el Pentágono de Afinidades oficial del GDD:
 * - Ventaja: x1.40
 * - Desventaja: x0.75
 * - Neutral o Misma Afinidad: x1.00
 */
export function getAffinityMultiplier(attackerAffinity: string, defenderAffinity: string): number {
  if (attackerAffinity === defenderAffinity) return 1.0

  const targetVulnerable = getVulnerableAffinity(attackerAffinity)
  if (targetVulnerable === defenderAffinity) {
    return 1.4
  }

  const targetDisadvantage = getDisadvantageAffinity(attackerAffinity)
  if (targetDisadvantage === defenderAffinity) {
    return 0.75
  }

  return 1.0
}

/**
 * Genera un valor entero aleatorio dentro del rango inclusivo [min, max].
 */
function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Genera estadísticas aleatorias balanceadas para un golem según su afinidad elemental.
 */
export function generateRandomStats(affinity: GolemAffinity): GolemStats {
  const v = GOLEM_AFFINITY_VARIANTS[affinity]
  const maxHp = randomRange(v.minHp, v.maxHp)
  const attack = randomRange(v.minAtk, v.maxAtk)
  const defense = randomRange(v.minDef, v.maxDef)
  const speed = randomRange(v.minSpd, v.maxSpd)
  const expReward = randomRange(v.minExp, v.maxExp)

  return {
    maxHp,
    currentHp: maxHp,
    attack,
    defense,
    speed,
    expReward,
    currentExp: 0,
    level: 1
  }
}

/**
 * Genera un escuadrón aleatorio de 3 golems garantizando 3 TIPOS COMPLETAMENTE DISTINTOS
 * y asignándoles estadísticas RPG aleatorias balanceadas con recompensa de experiencia.
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
    const variantIndex = variantNumber - 1
    const variantPad = variantNumber.toString().padStart(2, '0')
    const modelSrc = `assets/models/${variantData.folder}/golem_${variantData.folder}_${variantPad}.glb`
    const name = getLocalizedGolemName(affinity, variantIndex)
    const followDistance = SQUAD_FOLLOW_DISTANCES[index] || (index + 1) * 1.8
    const stats = generateRandomStats(affinity)

    return {
      id: `golem_${variantData.folder}_${variantPad}_${Date.now()}_${index}`,
      name,
      affinity,
      modelSrc,
      scale: variantData.baseScale,
      followDistance,
      moveSpeed: variantData.baseSpeed,
      rotationSpeed: variantData.baseRotSpeed,
      variantIndex,
      ...stats
    }
  })
}

/**
 * Obtiene el nombre y afinidad traducidos de un golem para mostrar en la interfaz o etiquetas.
 */
export function getGolemDisplayName(golem: { name?: string; affinity: string; variantIndex?: number }, lang?: Language): string {
  if (golem.variantIndex !== undefined) {
    return getLocalizedGolemName(golem.affinity, golem.variantIndex, lang)
  }
  return golem.name || getLocalizedAffinity(golem.affinity, lang)
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

