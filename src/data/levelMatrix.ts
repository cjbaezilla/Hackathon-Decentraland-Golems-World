import { Vector3 } from '@dcl/sdk/math'
import { GolemAffinity } from '../config/golems'

/**
 * ============================================================================
 * MATRIZ DE NIVELES, EXPERIENCIA, MONEDA Y FÓRMULAS RPG (LEVEL MATRIX)
 * ============================================================================
 * Define exhaustivamente todas las fórmulas matemáticas, curvas de experiencia,
 * matrices de escalado por distancia para golems salvajes, recompensas de la
 * moneda "Engranajes de Latón" (Brass Gears) y el algoritmo determinista de
 * la forja con variabilidad aleatoria de atributos en Nivel 1.
 */

// Punto de origen del mapa para el gradiente de distancia: Distrito de la Forja (X: 20m, Z: 20m)
export const ORIGIN_FORGE_POS = Vector3.create(20, 0, 20)

// ----------------------------------------------------------------------------
// 1. MATRIZ Y CURVA DE EXPERIENCIA DEL JUGADOR (PLAYER LEVEL CURVE)
// ----------------------------------------------------------------------------
export const PLAYER_MAX_LEVEL = 50

/**
 * Calcula la experiencia necesaria para pasar del nivel L al nivel L+1.
 * FÓRMULA: XP_req(L) = floor(100 * L^1.45)
 */
export function getPlayerExpForNextLevel(level: number): number {
  if (level >= PLAYER_MAX_LEVEL) return Infinity
  return Math.floor(100 * Math.pow(level, 1.45))
}

/**
 * Calcula el nivel acumulado del jugador a partir de su experiencia total.
 */
export function getPlayerLevelFromTotalExp(totalExp: number): { level: number; currentLevelExp: number; expForNext: number } {
  let level = 1
  let expAccumulated = 0

  while (level < PLAYER_MAX_LEVEL) {
    const required = getPlayerExpForNextLevel(level)
    if (totalExp < expAccumulated + required) {
      return {
        level,
        currentLevelExp: totalExp - expAccumulated,
        expForNext: required
      }
    }
    expAccumulated += required
    level++
  }

  return {
    level: PLAYER_MAX_LEVEL,
    currentLevelExp: totalExp - expAccumulated,
    expForNext: Infinity
  }
}

/**
 * Retorna el multiplicador de bonificación de experiencia global del jugador según su nivel.
 * FÓRMULA: BonusExpMult = 1.0 + (Level - 1) * 0.01 (+1% por nivel)
 */
export function getPlayerExpMultiplier(playerLevel: number): number {
  return 1.0 + (playerLevel - 1) * 0.01
}

// ----------------------------------------------------------------------------
// 2. MATRIZ DE ESCALADO DE GOLEMS SALVAJES POR DISTANCIA (MAP ROAMING GOLEMS)
// ----------------------------------------------------------------------------
export interface WildGolemStatsMatrix {
  level: number
  maxHp: number
  attack: number
  defense: number
  speed: number
  expReward: number
  minBrassGears: number
  maxBrassGears: number
  zoneTier: 1 | 2 | 3 | 4
}

/**
 * Calcula la distancia euclidiana en el plano horizontal XZ desde el origen de la Forja (20, 20).
 * FÓRMULA: D = sqrt((X - 20)^2 + (Z - 20)^2)
 */
export function getDistanceFromForge(pos: Vector3): number {
  const dx = pos.x - ORIGIN_FORGE_POS.x
  const dz = pos.z - ORIGIN_FORGE_POS.z
  return Math.sqrt(dx * dx + dz * dz)
}

/**
 * Deriva las estadísticas, nivel y recompensas completas de un Golem salvaje en el mapa
 * basándose en la distancia euclidiana a la Forja y su Tier de zona.
 *
 * FÓRMULAS EXHAUSTIVAS:
 * - Distance D = sqrt((X-20)^2 + (Z-20)^2)
 * - BaseLevel = clamp(1 + floor(D / 11), 1, 35)
 * - HP(L) = floor(110 * (1.11)^(L - 1) + tier * 15)
 * - Atk(L) = floor(15 * (1.09)^(L - 1) + tier * 3)
 * - Def(L) = floor(9 * (1.08)^(L - 1) + tier * 2)
 * - Spd(L) = clamp(floor(10 + L * 0.5), 10, 32)
 * - ExpReward(L) = floor(35 * (1.12)^(L - 1))
 * - BrassGears(L):
 *     minGears = floor(5 * (1.13)^(L - 1))
 *     maxGears = floor(12 * (1.14)^(L - 1))
 */
export function calculateWildGolemMatrix(position: Vector3, tier: 1 | 2 | 3 | 4, zoneName?: string): WildGolemStatsMatrix {
  const dist = getDistanceFromForge(position)

  // La ciudad inicial (Distrito de la Forja) contiene ÚNICAMENTE golems de Nivel 1
  let level = 1
  if (zoneName === 'Distrito de la Forja' || (position.x <= 140 && position.z <= 140)) {
    level = 1
  } else {
    const rawLevel = 1 + Math.floor(dist / 11.5) + (tier - 1) * 2
    level = Math.min(38, Math.max(1, rawLevel))
  }

  // Fórmulas exponenciales de escalado de atributos por Nivel (L)
  const maxHp = Math.floor(110 * Math.pow(1.11, level - 1) + tier * 15)
  const attack = Math.floor(15 * Math.pow(1.09, level - 1) + tier * 3)
  const defense = Math.floor(9 * Math.pow(1.08, level - 1) + tier * 2)
  const speed = Math.min(32, Math.floor(10 + level * 0.55))

  // Experiencia otorgada al ser derrotado
  const expReward = Math.floor(35 * Math.pow(1.12, level - 1))

  // Recompensa de la Moneda del Juego: Engranajes de Latón (Brass Gears)
  const minBrassGears = Math.floor(5 * Math.pow(1.125, level - 1))
  const maxBrassGears = Math.floor(12 * Math.pow(1.135, level - 1))

  return {
    level,
    maxHp,
    attack,
    defense,
    speed,
    expReward,
    minBrassGears,
    maxBrassGears,
    zoneTier: tier
  }
}

// ----------------------------------------------------------------------------
// 3. APORTE DE MATERIALES Y ALGORITMO DE FORJA EN NIVEL 1 (PLAYER GOLEMS)
// ----------------------------------------------------------------------------

export interface MaterialAttributeContribution {
  hp: number
  attack: number
  defense: number
  speed: number
  affinityBonus?: GolemAffinity
}

/**
 * Tabla exhaustiva de aportes de atributos individuales por los 46 materiales de chatarra.
 */
export const MATERIAL_ATTRIBUTE_MATRIX: Record<string, MaterialAttributeContribution> = {
  // --- COMUNES (14 materiales) ---
  alambre_cobre: { hp: 4, attack: 1, defense: 0, speed: 3 },
  tornillos_pernos: { hp: 5, attack: 0, defense: 3, speed: 0 },
  engranajes_desgastados: { hp: 5, attack: 1, defense: 2, speed: 1 },
  tubos_cobre: { hp: 12, attack: 0, defense: 1, speed: 0 },
  sartenes: { hp: 8, attack: 0, defense: 4, speed: 0 },
  ollas_cocinar: { hp: 10, attack: 0, defense: 3, speed: 0 },
  placas_laton: { hp: 8, attack: 0, defense: 4, speed: 0 },
  clavos_oxidados: { hp: 4, attack: 2, defense: 1, speed: 0 },
  latas_conserva: { hp: 9, attack: 0, defense: 2, speed: 0 },
  cadenas_hierro: { hp: 10, attack: 1, defense: 3, speed: 0 },
  tuercas_gigantes: { hp: 8, attack: 0, defense: 3, speed: 0 },
  tapas_alcantarilla: { hp: 15, attack: 0, defense: 5, speed: -1 },
  cables_deshilachados: { hp: 5, attack: 1, defense: 0, speed: 3 },
  residuos_carbon: { hp: 8, attack: 2, defense: 1, speed: 0, affinityBonus: GolemAffinity.STEAM },

  // --- POCO COMUNES (11 materiales) ---
  transistores: { hp: 8, attack: 4, defense: 1, speed: 2 },
  bombillas_filamento: { hp: 14, attack: 2, defense: 1, speed: 2, affinityBonus: GolemAffinity.LUMINOUS },
  resortes_reloj: { hp: 8, attack: 2, defense: 1, speed: 5 },
  manometros: { hp: 16, attack: 3, defense: 2, speed: 0 },
  valvulas_vapor: { hp: 14, attack: 4, defense: 2, speed: 1, affinityBonus: GolemAffinity.STEAM },
  lentes_tv_viejo: { hp: 8, attack: 2, defense: 1, speed: 4 },
  fusibles_fundidos: { hp: 10, attack: 4, defense: 1, speed: 2, affinityBonus: GolemAffinity.GALVANIC },
  relojes_bolsillo: { hp: 8, attack: 2, defense: 2, speed: 4 },
  brujulas_magneticas: { hp: 10, attack: 3, defense: 2, speed: 4, affinityBonus: GolemAffinity.MECHANICAL },
  tubos_vacio: { hp: 12, attack: 5, defense: 1, speed: 2, affinityBonus: GolemAffinity.LUMINOUS },
  palancas_interruptor: { hp: 10, attack: 3, defense: 3, speed: 1 },

  // --- RAROS (9 materiales) ---
  motor_vapor: { hp: 25, attack: 8, defense: 4, speed: 2, affinityBonus: GolemAffinity.STEAM },
  bobinas_tesla: { hp: 18, attack: 10, defense: 2, speed: 5, affinityBonus: GolemAffinity.GALVANIC },
  antenas_radio: { hp: 15, attack: 6, defense: 2, speed: 8, affinityBonus: GolemAffinity.LUMINOUS },
  diodos_led: { hp: 16, attack: 7, defense: 3, speed: 6, affinityBonus: GolemAffinity.LUMINOUS },
  baterias_alquimicas: { hp: 35, attack: 6, defense: 5, speed: 2, affinityBonus: GolemAffinity.GALVANIC },
  engranajes_bronce: { hp: 25, attack: 6, defense: 8, speed: 2, affinityBonus: GolemAffinity.MECHANICAL },
  dinamo_galvanica: { hp: 20, attack: 9, defense: 3, speed: 4, affinityBonus: GolemAffinity.GALVANIC },
  cristal_fuerza: { hp: 22, attack: 8, defense: 4, speed: 7, affinityBonus: GolemAffinity.LUMINOUS },
  giroscopio_precision: { hp: 20, attack: 6, defense: 7, speed: 6, affinityBonus: GolemAffinity.MECHANICAL },

  // --- ÉPICOS Y LEGENDARIOS (12 materiales) ---
  corazon_caldera: { hp: 45, attack: 14, defense: 8, speed: 3, affinityBonus: GolemAffinity.STEAM },
  reactor_eter: { hp: 40, attack: 16, defense: 6, speed: 5, affinityBonus: GolemAffinity.AETHER },
  nucleo_mana: { hp: 50, attack: 15, defense: 8, speed: 4, affinityBonus: GolemAffinity.AETHER },
  cerebro_automata: { hp: 35, attack: 12, defense: 10, speed: 8, affinityBonus: GolemAffinity.MECHANICAL },
  matriz_energectica: { hp: 40, attack: 15, defense: 7, speed: 6, affinityBonus: GolemAffinity.GALVANIC },
  espejo_espectral: { hp: 35, attack: 13, defense: 8, speed: 9, affinityBonus: GolemAffinity.LUMINOUS },
  orbe_cronos: { hp: 38, attack: 14, defense: 9, speed: 10, affinityBonus: GolemAffinity.AETHER },
  cristal_primordial: { hp: 42, attack: 16, defense: 9, speed: 6, affinityBonus: GolemAffinity.AETHER },
  lente_hiperboreal: { hp: 35, attack: 14, defense: 7, speed: 11, affinityBonus: GolemAffinity.LUMINOUS },
  transformador_singularidad: { hp: 45, attack: 18, defense: 10, speed: 5, affinityBonus: GolemAffinity.GALVANIC },
  ojo_dragon: { hp: 60, attack: 22, defense: 12, speed: 8, affinityBonus: GolemAffinity.AETHER },
  corazon_primigenio: { hp: 75, attack: 25, defense: 15, speed: 6, affinityBonus: GolemAffinity.AETHER }
}

/**
 * Calcula el multiplicador de la receta según el número total de materiales usados.
 * FÓRMULA DE COMPLEJIDAD:
 * - 5 piezas: 1.00x
 * - 6-7 piezas: 1.20x
 * - 8-9 piezas: 1.40x
 * - 10-11 piezas: 1.65x
 * - 12 piezas (Titan Tier): 1.90x
 */
export function getRecipeComplexityMultiplier(totalItemsCount: number): number {
  if (totalItemsCount >= 12) return 1.9
  if (totalItemsCount >= 10) return 1.65
  if (totalItemsCount >= 8) return 1.4
  if (totalItemsCount >= 6) return 1.2
  return 1.0
}

export interface CalculatedLevel1Stats {
  level: 1
  maxHp: number
  currentHp: number
  attack: number
  defense: number
  speed: number
  expReward: number
  currentExp: 0
  varianceRoll: number
}

/**
 * Genera estadísticas iniciales en NIVEL 1 para un Golem creado en la Forja.
 * Incorpora:
 * 1. Aportes base de la afinidad elemental.
 * 2. Suma de aportes individuales de cada material de chatarra usado.
 * 3. Multiplicador por complejidad de receta (5 a 12 ítems).
 * 4. Roll de variabilidad aleatoria individual en el rango [0.90, 1.15] (+/- 15%).
 */
export function calculateForgeLevel1Stats(
  affinity: GolemAffinity,
  materialsUsed: Record<string, number>
): CalculatedLevel1Stats {
  // 1. Estadísticas base por afinidad
  let baseHp = 90
  let baseAtk = 15
  let baseDef = 8
  let baseSpd = 10

  switch (affinity) {
    case GolemAffinity.STEAM:
      baseHp = 110
      baseAtk = 16
      baseDef = 10
      baseSpd = 9
      break
    case GolemAffinity.GALVANIC:
      baseHp = 85
      baseAtk = 20
      baseDef = 7
      baseSpd = 16
      break
    case GolemAffinity.MECHANICAL:
      baseHp = 120
      baseAtk = 14
      baseDef = 14
      baseSpd = 8
      break
    case GolemAffinity.LUMINOUS:
      baseHp = 90
      baseAtk = 18
      baseDef = 8
      baseSpd = 15
      break
    case GolemAffinity.AETHER:
      baseHp = 95
      baseAtk = 21
      baseDef = 7
      baseSpd = 11
      break
  }

  // 2. Acumulación de aportes de materiales
  let sumHp = 0
  let sumAtk = 0
  let sumDef = 0
  let sumSpd = 0
  let totalItemsCount = 0

  for (const [matId, count] of Object.entries(materialsUsed)) {
    totalItemsCount += count
    const contrib = MATERIAL_ATTRIBUTE_MATRIX[matId]
    if (contrib) {
      sumHp += contrib.hp * count
      sumAtk += contrib.attack * count
      sumDef += contrib.defense * count
      sumSpd += contrib.speed * count
    } else {
      // Fallback para materiales genéricos
      sumHp += 5 * count
      sumAtk += 1 * count
      sumDef += 1 * count
    }
  }

  // 3. Multiplicador por complejidad de la receta
  const complexityMult = getRecipeComplexityMultiplier(totalItemsCount)

  const rawHp = (baseHp + sumHp) * complexityMult
  const rawAtk = (baseAtk + sumAtk) * complexityMult
  const rawDef = (baseDef + sumDef) * complexityMult
  const rawSpd = Math.min(35, (baseSpd + sumSpd) * (1.0 + (complexityMult - 1.0) * 0.3))

  // 4. Varianza Aleatoria Individual Roll (0.90 a 1.15)
  const rollHp = 0.9 + Math.random() * 0.25
  const rollAtk = 0.9 + Math.random() * 0.25
  const rollDef = 0.9 + Math.random() * 0.25
  const rollSpd = 0.95 + Math.random() * 0.15

  const finalMaxHp = Math.max(80, Math.round(rawHp * rollHp))
  const finalAttack = Math.max(12, Math.round(rawAtk * rollAtk))
  const finalDefense = Math.max(5, Math.round(rawDef * rollDef))
  const finalSpeed = Math.max(6, Math.min(38, Math.round(rawSpd * rollSpd)))

  return {
    level: 1,
    maxHp: finalMaxHp,
    currentHp: finalMaxHp,
    attack: finalAttack,
    defense: finalDefense,
    speed: finalSpeed,
    expReward: 40 + Math.round(totalItemsCount * 5),
    currentExp: 0,
    varianceRoll: Math.round(((rollHp + rollAtk + rollDef) / 3) * 100)
  }
}
