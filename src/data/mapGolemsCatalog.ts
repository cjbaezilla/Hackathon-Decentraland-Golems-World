import { Vector3 } from '@dcl/sdk/math'
import { GolemAffinity, GOLEM_RECIPES_BY_AFFINITY } from '../config/golems'
import { getLocalizedGolemName } from '../i18n'
import { calculateWildGolemMatrix } from './levelMatrix'

/**
 * ============================================================================
 * CATÁLOGO Y GENERADOR PROCEDURAL DE GOLEMS EN EL MAPA (MAP GOLEMS CATALOG)
 * ============================================================================
 * Genera dinámicamente 150 golems distribuidos aleatoriamente en el mapa de 400m x 400m.
 * Implementa dos gradientes concéntricos principales desde el Distrito de la Forja (20m, 20m):
 *   1. Gradiente de Densidad: Anillo 1 (40%), Anillo 2 (30%), Anillo 3 (20%), Anillo 4 (10%).
 *   2. Gradiente de Rareza: Tier 1 (Común), Tier 2 (Poco Común), Tier 3 (Raro), Tier 4 (Épico/Legendario).
 * Generación procedural: las posiciones y las recetas varían en cada sesión sin fijar puntos estáticos.
 */

export interface MapGolemDefinition {
  id: string
  index: number
  recipeNumber: number
  name: string
  affinity: GolemAffinity
  rarity: 'Común' | 'Poco Común' | 'Raro' | 'Épico' | 'Legendario'
  tier: 1 | 2 | 3 | 4
  modelSrc: string
  scale: number
  position: Vector3
  rotationY: number
  zoneName: string
  level: number
  maxHp: number
  currentHp: number
  attack: number
  defense: number
  speed: number
  expReward: number
  minBrassGears: number
  maxBrassGears: number
}

/** Mapeo inverso rápido: Número de receta (1..150) -> Afinidad elemental */
const RECIPE_AFFINITY_MAP: Map<number, GolemAffinity> = new Map()
for (const [affinityStr, recipes] of Object.entries(GOLEM_RECIPES_BY_AFFINITY)) {
  const aff = affinityStr as GolemAffinity
  for (const recipeNum of recipes) {
    RECIPE_AFFINITY_MAP.set(recipeNum, aff)
  }
}

/** Obtiene la carpeta de assets según la afinidad */
function getAffinityFolder(affinity: GolemAffinity): string {
  switch (affinity) {
    case GolemAffinity.STEAM:
      return 'steam'
    case GolemAffinity.GALVANIC:
      return 'galvanic'
    case GolemAffinity.MECHANICAL:
      return 'mechanical'
    case GolemAffinity.LUMINOUS:
      return 'luminous'
    case GolemAffinity.AETHER:
      return 'aether'
    default:
      return 'mechanical'
  }
}

/** Pools de recetas por Tier (1 a 4) derivado del GDD de Golems */
const TIER_RECIPE_POOLS: Record<1 | 2 | 3 | 4, number[]> = {
  1: Array.from({ length: 40 }, (_, i) => i + 1), // Recetas #001 a #040 (Chatarreros Básicos - Comunes)
  2: Array.from({ length: 50 }, (_, i) => i + 41), // Recetas #041 a #090 (Mecatrónicos Medios - Poco Comunes)
  3: Array.from({ length: 35 }, (_, i) => i + 91), // Recetas #091 a #125 (Veteranos - Raros)
  4: Array.from({ length: 25 }, (_, i) => i + 126) // Recetas #126 a #150 (Titanes / Reactores - Épico/Legendario)
}

/** Determina la rareza cualitativa según el Tier y receta */
function getRarityLabel(tier: 1 | 2 | 3 | 4, recipeNum: number): 'Común' | 'Poco Común' | 'Raro' | 'Épico' | 'Legendario' {
  if (tier === 1) return 'Común'
  if (tier === 2) return 'Poco Común'
  if (tier === 3) return 'Raro'
  if (recipeNum >= 140) return 'Legendario'
  return 'Épico'
}

/** Escala visual base adecuada según la rareza y el tier del golem */
function getScaleForTier(tier: 1 | 2 | 3 | 4): number {
  switch (tier) {
    case 1:
      return 0.95 + Math.random() * 0.15
    case 2:
      return 1.05 + Math.random() * 0.15
    case 3:
      return 1.2 + Math.random() * 0.2
    case 4:
      return 1.35 + Math.random() * 0.25
  }
}

interface ZoneConfig {
  name: string
  tier: 1 | 2 | 3 | 4
  count: number
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

/** Configuración de las 10 zonas del mapa para instanciar exactamente 150 Golems con énfasis en los bordes exteriores */
const ZONES_CONFIG: ZoneConfig[] = [
  // Anillo 1 (50 Golems Comunes - Distrito Inicial y Bordes Cercanos)
  { name: 'Distrito de la Forja', tier: 1, count: 15, minX: 8, maxX: 132, minZ: 8, maxZ: 132 },
  { name: 'Los Chatarrales', tier: 1, count: 20, minX: 5, maxX: 132, minZ: 138, maxZ: 262 },
  { name: 'Corredor Sur', tier: 1, count: 15, minX: 138, maxX: 262, minZ: 5, maxZ: 132 },

  // Anillo 2 (30 Golems Poco Comunes - Zonas Intermedias)
  { name: 'Fábrica Abandonada', tier: 2, count: 20, minX: 142, maxX: 258, minZ: 142, maxZ: 258 },
  { name: 'Periferia de la Arena', tier: 2, count: 10, minX: 150, maxX: 250, minZ: 150, maxZ: 250 },

  // Anillo 3 (36 Golems Raros - Bordes Norte y Este del Mapa)
  { name: 'Subestación Eléctrica', tier: 3, count: 18, minX: 138, maxX: 262, minZ: 268, maxZ: 395 },
  { name: 'Torre de Radio', tier: 3, count: 18, minX: 268, maxX: 395, minZ: 138, maxZ: 262 },

  // Anillo 4 (34 Golems Épicos/Legendarios - Bordes Exteriores Lejanos y Zonas PK)
  { name: 'Desierto de Chatarra', tier: 4, count: 12, minX: 5, maxX: 132, minZ: 268, maxZ: 395 },
  { name: 'Calderas de la Fundición', tier: 4, count: 11, minX: 268, maxX: 395, minZ: 5, maxZ: 132 },
  { name: 'Reserva de Minería', tier: 4, count: 11, minX: 268, maxX: 395, minZ: 268, maxZ: 395 }
]

/** Comprueba si un punto cae dentro del radio del suelo de la Arena Central (r < 38m de (200, 200)) */
export function isInsideArenaGround(x: number, z: number): boolean {
  const dx = x - 200
  const dz = z - 200
  return Math.sqrt(dx * dx + dz * dz) < 38.0
}

/**
 * Genera una nueva coordenada procedural aleatoria (Vector3) dentro de la zona especificada.
 */
export function getRandomPositionInZone(zoneName: string): Vector3 {
  const zone = ZONES_CONFIG.find((z) => z.name === zoneName) || ZONES_CONFIG[0]
  let attempts = 0
  let spawnX = zone.minX
  let spawnZ = zone.minZ

  do {
    spawnX = zone.minX + Math.random() * (zone.maxX - zone.minX)
    spawnZ = zone.minZ + Math.random() * (zone.maxZ - zone.minZ)
    attempts++
  } while (isInsideArenaGround(spawnX, spawnZ) && attempts < 20)

  return Vector3.create(spawnX, 0, spawnZ)
}

/**
 * Genera aleatoriamente el catálogo de 100 golems en posiciones procedurales únicas por zona.
 */
export function generateRandomMapGolemsCatalog(): MapGolemDefinition[] {
  const mapGolems: MapGolemDefinition[] = []
  let globalIndex = 0

  for (const zone of ZONES_CONFIG) {
    const recipePool = [...TIER_RECIPE_POOLS[zone.tier]]

    for (let i = 0; i < zone.count; i++) {
      // 1. Selección aleatoria de receta dentro del pool del tier
      const poolIndex = Math.floor(Math.random() * recipePool.length)
      const recipeNum = recipePool[poolIndex] || zone.tier * 10
      // Opcional: remover si no queremos repetir la misma receta en la misma zona rápidamente
      if (recipePool.length > zone.count) {
        recipePool.splice(poolIndex, 1)
      }

      const affinity = RECIPE_AFFINITY_MAP.get(recipeNum) || GolemAffinity.STEAM
      const folder = getAffinityFolder(affinity)
      const modelSrc = `assets/models/${folder}/golem_${String(recipeNum).padStart(3, '0')}.glb`
      const rarity = getRarityLabel(zone.tier, recipeNum)

      // 2. Nombre del golem basado en afinidad y variante
      const variantIdx = (recipeNum - 1) % 5
      const localizedName = getLocalizedGolemName(affinity, variantIdx)
      const name = `${localizedName} #${String(recipeNum).padStart(3, '0')}`

      // 3. Generación de coordenadas procedurales dentro de la zona (reintentando si cae dentro de la arena)
      let spawnX = 0
      let spawnZ = 0
      let validPos = false
      let attempts = 0

      while (!validPos && attempts < 50) {
        attempts++
        spawnX = zone.minX + Math.random() * (zone.maxX - zone.minX)
        spawnZ = zone.minZ + Math.random() * (zone.maxZ - zone.minZ)

        if (!isInsideArenaGround(spawnX, spawnZ)) {
          validPos = true
        }
      }

      const rotationY = Math.random() * 360
      const scale = getScaleForTier(zone.tier)
      const spawnPos = Vector3.create(spawnX, 0, spawnZ)
      const matrix = calculateWildGolemMatrix(spawnPos, zone.tier, zone.name)
      globalIndex++

      mapGolems.push({
        id: `map_golem_${globalIndex}_rec${recipeNum}`,
        index: globalIndex - 1,
        recipeNumber: recipeNum,
        name,
        affinity,
        rarity,
        tier: zone.tier,
        modelSrc,
        scale,
        position: spawnPos,
        rotationY,
        zoneName: zone.name,
        level: matrix.level,
        maxHp: matrix.maxHp,
        currentHp: matrix.maxHp,
        attack: matrix.attack,
        defense: matrix.defense,
        speed: matrix.speed,
        expReward: matrix.expReward,
        minBrassGears: matrix.minBrassGears,
        maxBrassGears: matrix.maxBrassGears
      })
    }
  }

  return mapGolems
}
