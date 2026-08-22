import { GolemAffinity, GolemConfig } from '../config/golems'
import { COLLECTABLE_ITEMS, ItemRarity } from '../config/items'
import { getLocalizedAffinity, getLanguage, Language, t } from '../i18n'


/**
 * ============================================================================
 * ALGORITMO DE FORJA DETERMINISTA Y HASH FNV-1a (32-BIT)
 * ============================================================================
 * Implementa la serialización canónica, el cálculo de hash FNV-1a, el balance
 * determinista de atributos RPG (HP, ATK, DEF, SPD), la selección de afinidad
 * dominante, la asignación del modelo 3D GLTF y la generación de nombres.
 */

export interface ForgedGolemResult {
  config: GolemConfig
  tier: number
  hash: number
  stats: {
    maxHp: number
    attack: number
    defense: number
    speed: number
  }
}

/**
 * Genera la cadena canónica alfabética a partir de un mapa de materiales seleccionados.
 * Ejemplo: { manometros: 2, cadenas_hierro: 2 } => "cadenas_hierro:2|manometros:2"
 */
export function buildCanonicalRecipe(materials: Record<string, number>): string {
  const sortedKeys = Object.keys(materials)
    .filter((id) => materials[id] > 0)
    .sort()

  return sortedKeys.map((id) => `${id.toLowerCase()}:${materials[id]}`).join('|')
}

/**
 * Calcula el hash FNV-1a de 32 bits para una cadena canónica de receta.
 */
export function calculateRecipeHash(canonicalRecipe: string): number {
  let hash = 0x811c9dc5 // FNV offset basis 32-bit (2166136261)
  for (let i = 0; i < canonicalRecipe.length; i++) {
    hash ^= canonicalRecipe.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) // FNV prime 32-bit (16777619)
  }
  return hash >>> 0 // Entero sin signo de 32 bits
}

/**
 * Determina el Tier (1 a 4) según la cantidad total de ítems y la rareza de los materiales.
 */
export function determineRecipeTier(materials: Record<string, number>): number {
  let totalCount = 0
  let maxRarityWeight = 1

  for (const [itemId, count] of Object.entries(materials)) {
    if (count <= 0) continue
    totalCount += count

    const item = COLLECTABLE_ITEMS[itemId]
    if (item) {
      if (item.rarity === ItemRarity.LEGENDARY) maxRarityWeight = Math.max(maxRarityWeight, 4)
      else if (item.rarity === ItemRarity.EPIC) maxRarityWeight = Math.max(maxRarityWeight, 3)
      else if (item.rarity === ItemRarity.RARE) maxRarityWeight = Math.max(maxRarityWeight, 2)
    }
  }

  if (maxRarityWeight >= 4 || totalCount >= 11) return 4
  if (maxRarityWeight >= 3 || totalCount >= 9) return 3
  if (maxRarityWeight >= 2 || totalCount >= 7) return 2
  return 1
}

/**
 * Calcula la afinidad dominante sumando la contribución de los materiales de la receta.
 */
export function calculateDominantAffinity(materials: Record<string, number>, hash: number): GolemAffinity {
  const affinityScores: Record<GolemAffinity, number> = {
    [GolemAffinity.STEAM]: 0,
    [GolemAffinity.GALVANIC]: 0,
    [GolemAffinity.MECHANICAL]: 0,
    [GolemAffinity.LUMINOUS]: 0,
    [GolemAffinity.AETHER]: 0
  }

  for (const [itemId, count] of Object.entries(materials)) {
    if (count <= 0) continue
    const item = COLLECTABLE_ITEMS[itemId]
    if (item && item.statsContribution.affinityFocus) {
      const focus = item.statsContribution.affinityFocus.toUpperCase()
      let mappedAffinity: GolemAffinity | null = null

      if (focus === 'STEAM') mappedAffinity = GolemAffinity.STEAM
      else if (focus === 'GALVANIC') mappedAffinity = GolemAffinity.GALVANIC
      else if (focus === 'MECHANICAL') mappedAffinity = GolemAffinity.MECHANICAL
      else if (focus === 'LUMINOUS') mappedAffinity = GolemAffinity.LUMINOUS
      else if (focus === 'AETHER') mappedAffinity = GolemAffinity.AETHER

      if (mappedAffinity) {
        let weight = 1
        if (item.rarity === ItemRarity.RARE) weight = 2
        if (item.rarity === ItemRarity.EPIC) weight = 3
        if (item.rarity === ItemRarity.LEGENDARY) weight = 4
        affinityScores[mappedAffinity] += weight * count
      }
    }
  }

  let highestAffinity: GolemAffinity = GolemAffinity.STEAM
  let highestScore = -1

  for (const aff of Object.values(GolemAffinity)) {
    if (affinityScores[aff] > highestScore) {
      highestScore = affinityScores[aff]
      highestAffinity = aff
    }
  }

  // Si no hay afinidad con puntuación dominante, usar fallback por hash
  if (highestScore <= 0) {
    const allAffinities = [
      GolemAffinity.STEAM,
      GolemAffinity.GALVANIC,
      GolemAffinity.MECHANICAL,
      GolemAffinity.LUMINOUS,
      GolemAffinity.AETHER
    ]
    highestAffinity = allAffinities[hash % 5]
  }

  return highestAffinity
}

/**
 * Genera un nombre procedural algorítmico determinista derivado del hash FNV-1a con soporte bilingüe (ES / EN).
 */
export function generateProceduralGolemName(affinity: GolemAffinity, hash: number, lang?: Language): string {
  const currentLang = lang || getLanguage()

  const nounsEs = ['Baluarte', 'Cazador', 'Artillero', 'Titán', 'Coloso', 'Guardián', 'Centinela', 'Vanguardia', 'Forjador', 'Autómata']
  const nounsEn = ['Bulwark', 'Hunter', 'Gunner', 'Titan', 'Colossus', 'Guardian', 'Sentinel', 'Vanguard', 'Forger', 'Automaton']

  const prefixesEs: Record<GolemAffinity, string[]> = {
    [GolemAffinity.STEAM]: ['Vaporoso', 'Calderero', 'Térmico', 'de Brasas', 'Presurizado'],
    [GolemAffinity.GALVANIC]: ['Eléctrico', 'Voltaico', 'Relámpago', 'Galvánico', 'de Plasma'],
    [GolemAffinity.MECHANICAL]: ['de Relojería', 'Engranado', 'Blindado', 'de Latón', 'Mecánico'],
    [GolemAffinity.LUMINOUS]: ['Solar', 'Fotónico', 'Brillante', 'Prismático', 'Luminoso'],
    [GolemAffinity.AETHER]: ['Primigenio', 'Astral', 'de Maná', 'Místico', 'Etérico']
  }

  const prefixesEn: Record<GolemAffinity, string[]> = {
    [GolemAffinity.STEAM]: ['Steam', 'Boiler', 'Thermal', 'Embers', 'Pressurized'],
    [GolemAffinity.GALVANIC]: ['Electric', 'Voltaic', 'Lightning', 'Galvanic', 'Plasma'],
    [GolemAffinity.MECHANICAL]: ['Clockwork', 'Geared', 'Armored', 'Brass', 'Mechanical'],
    [GolemAffinity.LUMINOUS]: ['Solar', 'Photonic', 'Bright', 'Prismatic', 'Luminous'],
    [GolemAffinity.AETHER]: ['Primeval', 'Astral', 'Mana', 'Mystic', 'Aetheric']
  }

  const nounIdx = (hash * 7) % nounsEs.length
  const noun = currentLang === 'en' ? nounsEn[nounIdx] : nounsEs[nounIdx]

  const prefixList = currentLang === 'en'
    ? (prefixesEn[affinity] || prefixesEn[GolemAffinity.STEAM])
    : (prefixesEs[affinity] || prefixesEs[GolemAffinity.STEAM])

  const prefix = prefixList[hash % prefixList.length]

  return currentLang === 'en' ? `${prefix} ${noun}` : `${noun} ${prefix}`
}


/**
 * Mapeo de carpetas de modelos por afinidad.
 */
const AFFINITY_MODEL_FOLDERS: Record<GolemAffinity, string> = {
  [GolemAffinity.STEAM]: 'steam',
  [GolemAffinity.GALVANIC]: 'galvanic',
  [GolemAffinity.MECHANICAL]: 'mechanical',
  [GolemAffinity.LUMINOUS]: 'luminous',
  [GolemAffinity.AETHER]: 'aether'
}

/**
 * Número de modelos disponibles por afinidad.
 */
const AFFINITY_MODEL_COUNTS: Record<GolemAffinity, number> = {
  [GolemAffinity.STEAM]: 46,
  [GolemAffinity.GALVANIC]: 29,
  [GolemAffinity.MECHANICAL]: 22,
  [GolemAffinity.LUMINOUS]: 21,
  [GolemAffinity.AETHER]: 32
}

/**
 * Selecciona el modelo 3D GLTF determinista para una afinidad y hash.
 */
export function selectGolemModelSrc(affinity: GolemAffinity, hash: number): string {
  const folder = AFFINITY_MODEL_FOLDERS[affinity] || 'steam'
  const count = AFFINITY_MODEL_COUNTS[affinity] || 20
  const modelIndex = (hash % count) + 1
  const formattedNum = String(modelIndex).padStart(3, '0')
  return `assets/models/${folder}/golem_${formattedNum}.glb`
}

/**
 * Deriva de forma completa el resultado de la forja determinista a partir de los materiales.
 */
import { findOfficialRecipe, OfficialRecipeData } from '../data/recipesCatalog'

export interface ForgedGolemResult {
  config: GolemConfig
  tier: number
  hash: number
  isValidRecipe: boolean
  officialRecipe?: OfficialRecipeData
  stats: {
    maxHp: number
    attack: number
    defense: number
    speed: number
  }
}

/**
 * Deriva de forma completa el resultado de la forja determinista a partir de los materiales.
 * Valida la existencia de la combinación dentro del catálogo oficial de 150 recetas.
 */
export function deriveForgedGolem(materials: Record<string, number>): ForgedGolemResult {
  const canonicalRecipe = buildCanonicalRecipe(materials)
  const hash = calculateRecipeHash(canonicalRecipe)
  const official = findOfficialRecipe(canonicalRecipe)

  const isValidRecipe = official !== undefined
  const tier = official ? official.tier : determineRecipeTier(materials)
  const affinity = official ? official.affinity : calculateDominantAffinity(materials, hash)

  // 1. Offsets base de Tier
  let baseAtk = 16
  let baseDef = 8
  let baseHp = 85
  let baseSpd = 4

  if (tier === 2) {
    baseAtk = 22
    baseDef = 12
    baseHp = 110
    baseSpd = 6
  } else if (tier === 3) {
    baseAtk = 28
    baseDef = 16
    baseHp = 140
    baseSpd = 9
  } else if (tier === 4) {
    baseAtk = 36
    baseDef = 22
    baseHp = 180
    baseSpd = 12
  }

  // 2. Acumular bonificaciones de materiales
  for (const [itemId, count] of Object.entries(materials)) {
    if (count <= 0) continue
    const item = COLLECTABLE_ITEMS[itemId]
    if (item && item.statsContribution) {
      const contrib = item.statsContribution
      if (contrib.attackBonus) baseAtk += contrib.attackBonus * count
      if (contrib.defenseBonus) baseDef += contrib.defenseBonus * count
      if (contrib.hpBonus) baseHp += contrib.hpBonus * count
      if (contrib.speedBonus) baseSpd += contrib.speedBonus * count
    }
  }

  // 3. Modificador determinista de varianza (-5% a +5%)
  const hashMod = ((hash % 11) - 5) / 100
  const finalAtk = Math.max(15, Math.round(baseAtk * (1 + hashMod)))
  const finalDef = Math.max(5, Math.round(baseDef * (1 + hashMod)))
  const finalHp = Math.max(80, Math.round(baseHp * (1 + hashMod)))
  const finalSpd = Math.max(2, Math.round(baseSpd * (1 + hashMod)))

  // 4. Escala física y nombres traducidos en ambos idiomas (ES y EN)
  const scale = official ? official.scale : (0.9 + (hash % 41) * 0.01)

  const nameEn = official
    ? `${official.nameEn} (#${official.numberStr})`
    : generateProceduralGolemName(affinity, hash, 'en')

  const nameEs = official
    ? `${official.nameEs} (#${official.numberStr})`
    : generateProceduralGolemName(affinity, hash, 'es')

  const name = getLanguage() === 'en' ? nameEn : nameEs
  const modelSrc = official ? official.modelSrc : selectGolemModelSrc(affinity, hash)
  const id = `golem_forged_${hash}_${Date.now()}`

  const config: GolemConfig = {
    id,
    name,
    nameEn,
    nameEs,
    affinity,
    modelSrc,
    scale,
    followDistance: 2.0,
    moveSpeed: 4.2 + finalSpd * 0.05,
    rotationSpeed: 6.0,
    maxHp: finalHp,
    currentHp: finalHp,
    attack: finalAtk,
    defense: finalDef,
    speed: finalSpd,
    level: 1,
    currentExp: 0,
    expReward: 50 + tier * 25
  }


  return {
    config,
    tier,
    hash,
    isValidRecipe,
    officialRecipe: official,
    stats: {
      maxHp: finalHp,
      attack: finalAtk,
      defense: finalDef,
      speed: finalSpd
    }
  }
}
