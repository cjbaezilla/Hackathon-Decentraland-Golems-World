const fs = require('fs')
const path = require('path')

/**
 * ============================================================================
 * GENERADOR PROCEDURAL DE GOLEMS (150 RECETAS DETERMINISTAS)
 * ============================================================================
 * Ensambla un golem por cada una de las 150 recetas del catálogo oficial
 * (`GOLEMS/Golems-Recetas-150_eng.md`), construyendo su silueta a partir de las
 * formas de los 46 materiales que lo componen y aplicando el esquema de color
 * de su afinidad elemental (Steam / Galvanic / Mechanical / Luminous / Aether).
 *
 * Salida: assets/golems/<afinidad>/golem_<NNN>.glb (glTF 2.0 binario, low-poly).
 */

const { GlbBuilder } = require('./lib/glbBuilder')
const { getItemShapes } = require('./lib/itemShapes')
const { getAffinityPalette } = require('./lib/affinityPalette')
const { parseRecipes, getRecipesByAffinity } = require('./lib/golemRecipes')

// ============================================================================
// TRANSFORMACIÓN Y MEDIDAS DE DESCRIPTORES DE PRIMITIVAS
// ============================================================================

const DIM_KEYS = {
  box: ['w', 'h', 'd'],
  cyl: ['rT', 'rB', 'h'],
  cone: ['r', 'h'],
  sphere: ['r'],
  torus: ['R', 'r'],
  gear: ['outer', 'root', 'h'],
  hex: ['r', 'h'],
  octa: ['size']
}

function transformShape(d, s, tx, ty, tz) {
  const nd = Object.assign({}, d)
  const keys = DIM_KEYS[d.t]
  if (keys) {
    for (const k of keys) nd[k] = d[k] * s
  }
  nd.x = d.x * s + tx
  nd.y = d.y * s + ty
  nd.z = d.z * s + tz
  return nd
}

function transformShapes(list, s, tx, ty, tz) {
  return list.map((d) => transformShape(d, s, tx, ty, tz))
}

function halfExtents(d) {
  switch (d.t) {
    case 'box':
      return [d.w / 2, d.h / 2, d.d / 2]
    case 'cyl':
    case 'cone': {
      const r = d.t === 'cyl' ? Math.max(d.rT, d.rB) : d.r
      if (d.axis === 'x') return [d.h / 2, r, r]
      if (d.axis === 'z') return [r, r, d.h / 2]
      return [r, d.h / 2, r]
    }
    case 'sphere':
      return [d.r, d.r, d.r]
    case 'torus': {
      const R = d.R + d.r
      if (d.axis === 'x') return [d.r, R, R]
      if (d.axis === 'z') return [R, R, d.r]
      return [R, d.r, R]
    }
    case 'gear':
    case 'hex': {
      const r = d.t === 'gear' ? d.outer : d.r
      if (d.axis === 'x') return [d.h / 2, r, r]
      if (d.axis === 'y') return [r, d.h / 2, r]
      return [r, r, d.h / 2]
    }
    case 'octa':
      return [d.size / 2, d.size / 2, d.size / 2]
    default:
      return [0.1, 0.1, 0.1]
  }
}

function computeBounds(list) {
  let minX = Infinity, minY = Infinity, minZ = Infinity
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity
  for (const d of list) {
    const he = halfExtents(d)
    minX = Math.min(minX, d.x - he[0]); maxX = Math.max(maxX, d.x + he[0])
    minY = Math.min(minY, d.y - he[1]); maxY = Math.max(maxY, d.y + he[1])
    minZ = Math.min(minZ, d.z - he[2]); maxZ = Math.max(maxZ, d.z + he[2])
  }
  const sx = maxX - minX
  const sy = maxY - minY
  const sz = maxZ - minZ
  return {
    minX, minY, minZ, maxX, maxY, maxZ,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    cz: (minZ + maxZ) / 2,
    maxDim: Math.max(sx, sy, sz, 0.001)
  }
}

// Reducción low-poly para golems (los ítems se ven de cerca, los golems no):
// se limitan los segmentos de cilindros, esferas y toros sin cambiar la silueta.
function renderDescriptor(glb, d) {
  switch (d.t) {
    case 'box': return glb.createBoxMesh(d.w, d.h, d.d, d.x, d.y, d.z)
    case 'cyl': return glb.createCylinderMesh(d.rT, d.rB, d.h, Math.min(d.seg, 10), d.x, d.y, d.z, d.axis, d.capTop, d.capBottom)
    case 'cone': return glb.createConeMesh(d.r, d.h, Math.min(d.seg, 8), d.x, d.y, d.z, d.axis)
    case 'sphere': return glb.createSphereMesh(d.r, Math.min(d.lat, 6), Math.min(d.lon, 8), d.x, d.y, d.z)
    case 'torus': return glb.createTorusMesh(d.R, d.r, Math.min(d.sR, 12), Math.min(d.sT, 6), d.x, d.y, d.z, d.axis)
    case 'gear': return glb.createGearMesh(d.outer, d.root, d.h, d.teeth, d.x, d.y, d.z, d.axis)
    case 'hex': return glb.createHexPrismMesh(d.r, d.h, d.x, d.y, d.z, d.axis)
    case 'octa': return glb.createOctahedronMesh(d.size, d.x, d.y, d.z)
    default: return null
  }
}

// ============================================================================
// MAPA DE SLOTS POR ÍTEM (dónde se monta cada material en el esqueleto)
// ============================================================================

const ITEM_SLOT_MAP = {
  // COMUNES
  alambre_cobre: 'arm',
  tornillos_pernos: 'leg',
  engranajes_desgastados: 'shoulder',
  tubos_cobre: 'leg',
  sartenes: 'torso',
  ollas_cocinar: 'head',
  placas_laton: 'torso',
  clavos_oxidados: 'leg',
  latas_conserva: 'torso',
  cadenas_hierro: 'leg',
  tuercas_gigantes: 'shoulder',
  tapas_alcantarilla: 'torso',
  cables_deshilachados: 'accent',
  residuos_carbon: 'foot',
  // POCO COMUNES
  transistores: 'accent',
  bombillas_filamento: 'eye',
  resortes_reloj: 'leg',
  manometros: 'torso',
  valvulas_vapor: 'shoulder',
  lentes_tv_viejo: 'eye',
  fusibles_fundidos: 'arm',
  relojes_bolsillo: 'eye',
  brujulas_magneticas: 'torso',
  tubos_vacio: 'eye',
  palancas_interruptor: 'arm',
  // RAROS
  motor_vapor: 'core',
  bobinas_tesla: 'shoulder',
  antenas_radio: 'back',
  diodos_led: 'accent',
  baterias_alquimicas: 'core',
  engranajes_bronce: 'shoulder',
  dinamo_galvanica: 'arm',
  cristal_fuerza: 'accent',
  giroscopio_precision: 'shoulder',
  condensador_presion: 'core',
  // ÉPICOS
  nucleo_mana: 'core',
  cerebro_automata: 'head',
  reactor_eter: 'core',
  corazon_caldera: 'core',
  bateria_plasma: 'core',
  matriz_optica_solar: 'back',
  embolo_titanio: 'leg',
  // LEGENDARIOS
  ojo_dragon: 'eye',
  corazon_primigenio: 'core',
  singularidad_eterica: 'core',
  relicario_astral: 'torso'
}

const SLOT_KEYS = ['head', 'eye', 'core', 'torso', 'shoulder', 'arm', 'leg', 'foot', 'back', 'accent']

function bucketize(components) {
  const buckets = {}
  for (const k of SLOT_KEYS) buckets[k] = []
  for (const c of components) {
    const slot = ITEM_SLOT_MAP[c.id] || 'accent'
    const times = Math.min(c.qty, 6)
    for (let i = 0; i < times; i++) buckets[slot].push(c.id)
  }
  return buckets
}

function resolveItem(buckets, chain, signatureId) {
  for (const key of chain) {
    if (buckets[key] && buckets[key].length) {
      return { id: buckets[key].shift(), fromBucket: key }
    }
  }
  return { id: signatureId, fromBucket: 'reuse' }
}

/**
 * Coloca un ítem (recoloreado) en una posición del esqueleto con un tamaño
 * objetivo, devolviendo sus descriptores transformados por grupo.
 */
function placeItem(itemId, x, y, z, targetSize) {
  const shapes = getItemShapes(itemId)
  const all = shapes.body.concat(shapes.detail, shapes.glow)
  const b = computeBounds(all)
  const s = targetSize / b.maxDim
  const tx = x - b.cx * s
  const ty = y - b.cy * s
  const tz = z - b.cz * s
  return {
    body: transformShapes(shapes.body, s, tx, ty, tz),
    detail: transformShapes(shapes.detail, s, tx, ty, tz),
    glow: transformShapes(shapes.glow, s, tx, ty, tz)
  }
}

// ============================================================================
// ENSAMBLAJE DEL GOLEM
// ============================================================================

function buildGolem(recipe) {
  const glb = new GlbBuilder()
  const palette = getAffinityPalette(recipe.affinity)
  const matBody = glb.addMaterial(palette.materials.body)
  const matDetail = glb.addMaterial(palette.materials.detail)
  const matGlow = glb.addMaterial(palette.materials.glow)

  const h = recipe.height
  const buckets = bucketize(recipe.components)
  const signatureId = recipe.components[0].id

  const bodyGeoms = []
  const detailGeoms = []
  const glowGeoms = []

  const addPart = (part) => {
    for (const d of part.body) bodyGeoms.push(renderDescriptor(glb, d))
    for (const d of part.detail) detailGeoms.push(renderDescriptor(glb, d))
    for (const d of part.glow) glowGeoms.push(renderDescriptor(glb, d))
  }

  // --- Slots estructurales (siempre presentes, con fallback a la firma) ---
  const head = resolveItem(buckets, ['head', 'torso', 'core', 'eye'], signatureId)
  const core = resolveItem(buckets, ['core', 'torso', 'head'], signatureId)
  const torso = resolveItem(buckets, ['torso', 'core', 'head'], signatureId)
  const shoulderL = resolveItem(buckets, ['shoulder', 'arm', 'torso'], signatureId)
  const shoulderR = resolveItem(buckets, ['shoulder', 'arm', 'torso'], signatureId)
  const legL = resolveItem(buckets, ['leg', 'arm', 'torso'], signatureId)
  const legR = resolveItem(buckets, ['leg', 'arm', 'torso'], signatureId)

  addPart(placeItem(head.id, 0, 0.95 * h, 0, 0.40 * h))
  addPart(placeItem(core.id, 0, 0.55 * h, 0, 0.44 * h))
  addPart(placeItem(torso.id, 0, 0.58 * h, 0, 0.48 * h))
  addPart(placeItem(shoulderL.id, -0.42 * h, 0.82 * h, 0, 0.34 * h))
  addPart(placeItem(shoulderR.id, 0.42 * h, 0.82 * h, 0, 0.34 * h))
  addPart(placeItem(legL.id, -0.2 * h, 0.28 * h, 0, 0.46 * h))
  addPart(placeItem(legR.id, 0.2 * h, 0.28 * h, 0, 0.46 * h))

  // --- Slots opcionales (solo si existen ítems de ese tipo) ---
  const armL = resolveItem(buckets, ['arm'], null)
  if (armL) addPart(placeItem(armL.id, -0.5 * h, 0.48 * h, 0, 0.34 * h))
  const armR = resolveItem(buckets, ['arm'], null)
  if (armR) addPart(placeItem(armR.id, 0.5 * h, 0.48 * h, 0, 0.34 * h))

  const eye = resolveItem(buckets, ['eye'], null)
  if (eye) addPart(placeItem(eye.id, 0, 0.95 * h, 0.18 * h, 0.14 * h))

  const footL = resolveItem(buckets, ['foot'], null)
  if (footL) addPart(placeItem(footL.id, -0.2 * h, 0.06 * h, 0.06 * h, 0.22 * h))
  const footR = resolveItem(buckets, ['foot'], null)
  if (footR) addPart(placeItem(footR.id, 0.2 * h, 0.06 * h, 0.06 * h, 0.22 * h))

  const back = resolveItem(buckets, ['back'], null)
  if (back) addPart(placeItem(back.id, 0, 0.85 * h, -0.35 * h, 0.36 * h))

  // --- Ojo emisivo de identidad (siempre presente, antisaturación) ---
  glowGeoms.push(glb.createSphereMesh(0.05 * h, 6, 8, 0, 0.95 * h, 0.18 * h))

  // --- Render final por material ---
  glb.addMeshNode('Body', glb.combineGeometries(bodyGeoms), matBody)
  glb.addMeshNode('Detail', glb.combineGeometries(detailGeoms), matDetail)
  glb.addMeshNode('Glow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

// ============================================================================
// CONFIGURACIÓN Y MANEJO DE CLI
// ============================================================================

const AFFINITY_NAMES = {
  steam: 'Vapor (Steam)',
  galvanic: 'Galvánico (Galvanic)',
  mechanical: 'Mecánico (Mechanical)',
  luminous: 'Luminoso (Luminous)',
  aether: 'Éter (Aether)'
}

function showHelp() {
  console.log(`
================================================================================
  GENERADOR DE GOLEMS POR RECETAS (150 MODELOS DETERMINISTAS)
================================================================================

USO:
  node scripts/generate_models.js [opciones]
  node scripts/generate_models.js [afinidad]

OPCIONES:
  -t, --type <afinidad>     Afinidad a generar:
                            [steam | galvanic | mechanical | luminous | aether | all]
                            (Por defecto: 'all')
  -r, --recipe <num>        Genera únicamente la receta específica (1 a 150).
  -o, --output-dir <path>   Directorio base de salida.
                            (Por defecto: assets/golems)
  -h, --help                Muestra este mensaje de ayuda.

EJEMPLOS:
  # Generar los 150 golems (uno por receta):
  node scripts/generate_models.js

  # Generar solo los golems de afinidad Vapor:
  node scripts/generate_models.js --type steam

  # Generar solo la receta #001:
  node scripts/generate_models.js --recipe 1
================================================================================
`)
}

function parseCliArgs() {
  const args = process.argv.slice(2)
  const options = {
    type: 'all',
    recipe: null,
    outputDir: path.join(__dirname, '..', 'assets', 'golems'),
    help: false
  }

  const positional = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '-h' || arg === '--help') {
      options.help = true
      return options
    } else if (arg === '-t' || arg === '--type') {
      options.type = (args[++i] || 'all').toLowerCase()
    } else if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1].toLowerCase()
    } else if (arg === '-r' || arg === '--recipe' || arg === '-v' || arg === '--variant') {
      options.recipe = parseInt(args[++i], 10)
    } else if (arg.startsWith('--recipe=')) {
      options.recipe = parseInt(arg.split('=')[1], 10)
    } else if (arg === '-o' || arg === '--output-dir') {
      options.outputDir = path.resolve(args[++i])
    } else if (arg.startsWith('--output-dir=')) {
      options.outputDir = path.resolve(arg.split('=')[1])
    } else if (!arg.startsWith('-')) {
      positional.push(arg)
    }
  }

  if (positional.length > 0) {
    const first = positional[0].toLowerCase()
    if (first === 'all' || AFFINITY_NAMES[first]) {
      options.type = first
    }
  }

  return options
}

function main() {
  const options = parseCliArgs()

  if (options.help) {
    showHelp()
    process.exit(0)
  }

  const recipes = parseRecipes()
  const byAffinity = getRecipesByAffinity(recipes)

  console.log('================================================================================')
  console.log('🚀 GENERANDO GOLEMS A PARTIR DE LAS 150 RECETAS DETERMINISTAS')
  console.log(`📁 Directorio Base: ${options.outputDir}`)
  console.log(`🏷️  Afinidad: ${options.type}`)
  if (options.recipe) console.log(`🎯 Receta: #${String(options.recipe).padStart(3, '0')}`)
  console.log('================================================================================')

  let totalGenerated = 0
  let totalBytes = 0
  const distribution = {}

  for (const recipe of recipes) {
    if (options.recipe && recipe.number !== options.recipe) continue
    if (options.type !== 'all' && recipe.affinity !== options.type) continue

    const affinityDir = path.join(options.outputDir, recipe.affinity)
    if (!fs.existsSync(affinityDir)) fs.mkdirSync(affinityDir, { recursive: true })

    const fileName = `golem_${recipe.numberStr}.glb`
    const filePath = path.join(affinityDir, fileName)

    const glbBuffer = buildGolem(recipe)
    fs.writeFileSync(filePath, glbBuffer)
    totalGenerated++
    totalBytes += glbBuffer.length
    distribution[recipe.affinity] = (distribution[recipe.affinity] || 0) + 1

    console.log(`   ✅ #${recipe.numberStr} [${recipe.affinity}] ${recipe.name} → ${fileName} (${glbBuffer.length} bytes)`)
  }

  console.log('\n================================================================================')
  console.log(`🎉 GENERACIÓN COMPLETADA: ${totalGenerated} modelos creados (${(totalBytes / 1024).toFixed(1)} KB total).`)
  console.log('📊 Distribución por afinidad:', JSON.stringify(distribution))
  console.log('================================================================================')

  // Resumen compacto para integrar en la escena (src/config/golems.ts)
  console.log('\n📌 NÚMEROS DE RECETA POR AFINIDAD (para golems.ts):')
  for (const k of Object.keys(AFFINITY_NAMES)) {
    console.log(`   ${k}: [${(byAffinity[k] || []).join(', ')}]`)
  }
  console.log('')
}

main()
