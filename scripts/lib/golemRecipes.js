/**
 * ============================================================================
 * golemRecipes — Parser del catálogo de 150 recetas deterministas
 * ============================================================================
 * Lee `GOLEMS/Golems-Recetas-150_eng.md` y extrae, para cada golem, su número,
 * nombre, tier, afinidad elemental, escala y lista de componentes (itemId + qty).
 * Estructura del documento 100 % regular → parsing por regex.
 */

const fs = require('fs')
const path = require('path')

const AFFINITY_KEY_MAP = {
  STEAM: 'steam',
  GALVANIC: 'galvanic',
  MECHANICAL: 'mechanical',
  LUMINOUS: 'luminous',
  AETHER: 'aether'
}

/**
 * Extrae una sola receta a partir del bloque de texto entre dos "### Golem #...".
 */
function parseRecipeBlock(block) {
  const numberMatch = /### Golem #(\d{3})\s*[—-]\s*(.+)/.exec(block)
  if (!numberMatch) return null

  const number = parseInt(numberMatch[1], 10)
  const name = numberMatch[2].trim()

  const tierMatch = /\*\*Classification\*\*:\s*Tier\s*(\d)/.exec(block)
  const tier = tierMatch ? parseInt(tierMatch[1], 10) : 1

  const affinityMatch = /\*\*Elemental Affinity\*\*:\s*\*\*(\w+)\*\*\s*\(`(\w+)`\)/.exec(block)
  const affinityCode = affinityMatch ? affinityMatch[2] : 'STEAM'
  const affinity = AFFINITY_KEY_MAP[affinityCode] || 'steam'

  const heightMatch = /\*\*Height Scale\*\*:\s*`([\d.]+)m`/.exec(block)
  const height = heightMatch ? parseFloat(heightMatch[1]) : 1.0

  const components = []
  const componentRegex = /^\s*-\s*\*\*(\d+)x\*\*\s+.*?\(`([a-z_]+)`\)/gm
  let m
  while ((m = componentRegex.exec(block)) !== null) {
    components.push({ id: m[2], qty: parseInt(m[1], 10) })
  }

  if (components.length === 0) return null

  return {
    number,
    numberStr: String(number).padStart(3, '0'),
    name,
    tier,
    affinity,
    height,
    components
  }
}

/**
 * Parsea el documento completo y devuelve la lista de 150 recetas.
 * @param {string} [filePath] Ruta al .md de recetas (por defecto el oficial).
 */
function parseRecipes(filePath) {
  const target = filePath || path.join(__dirname, '..', '..', 'GOLEMS', 'Golems-Recetas-150_eng.md')
  const raw = fs.readFileSync(target, 'utf8')

  const blockRegex = /### Golem #\d{3}[\s\S]*?(?=### Golem #\d{3}|$)/g
  const blocks = raw.match(blockRegex) || []
  const recipes = []

  for (const block of blocks) {
    const recipe = parseRecipeBlock(block)
    if (recipe) recipes.push(recipe)
  }

  recipes.sort((a, b) => a.number - b.number)
  return recipes
}

/**
 * Agrupa los números de receta por afinidad (útil para la escena).
 */
function getRecipesByAffinity(recipes) {
  const map = { steam: [], galvanic: [], mechanical: [], luminous: [], aether: [] }
  for (const r of recipes) {
    if (map[r.affinity]) map[r.affinity].push(r.number)
  }
  return map
}

module.exports = { parseRecipes, getRecipesByAffinity, AFFINITY_KEY_MAP }
