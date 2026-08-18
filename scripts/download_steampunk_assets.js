/**
 * Script para descargar modelos 3D (.glb) y texturas de los paquetes de Decentraland
 * desde la red de contenidos (IPFS / Peer Gateway / Builder API) a assets/asset-packs/
 */
const fs = require('fs')
const path = require('path')

const CATALOG_PATH = path.join(__dirname, '..', 'node_modules', '@dcl', 'asset-packs', 'catalog.json')
const OUTPUT_BASE_DIR = path.join(__dirname, '..', 'assets', 'asset-packs')

// Lista de nombres de assets de Decentraland para la Arena Steampunk estilo Torneo de Cell
const TARGET_ASSET_NAMES = [
  // Pisos y losas
  'Wood Plank Floor 4x4M',
  'Wood Plank Floor 2x2M',
  'Wood Planks Broken 4x4M',
  'Ceiling 4x4M',
  'Road Cobble Straight',
  'Road Cobble Angled',
  'Road Angle',
  'Road Cross',
  // Pilares y estructuras
  'Smoker',
  'Tank',
  'Barrel',
  'Gear Shaft',
  'Lamp',
  'Table Lamp',
  // Núcleos y engranajes
  'Gear Big',
  'Gear 10 Teeth',
  'Gear 8 Teeth',
  'Gear 5 Teeth',
  'Gear Angled 10 Teeth',
  'Gear Small 01',
  'Gear Small 02',
  'Gear Small 03',
  // Indicadores de combate y números
  'SteamPunk Number 00',
  'SteamPunk Number 01',
  'SteamPunk Number 02',
  'SteamPunk Number 03',
  'SteamPunk Number 04',
  'SteamPunk Number 05',
  'SteamPunk Number 06',
  'SteamPunk Number 07',
  'SteamPunk Number 08',
  // Vallas y detalles
  'Tree Fence',
  'Hidrant',
  'Lever',
  'Switch',
  'Chest Gear',
  'Chest Plates',
  'Chest Tube',
  'Arthur Sword',
  'Boulder Arthur'
]

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '_')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const GATEWAYS = [
  'https://builder-api.decentraland.org/v1/storage/contents/',
  'https://peer.decentraland.org/content/contents/',
  'https://dweb.link/ipfs/',
  'https://ipfs.io/ipfs/'
]

async function downloadFileWithFallback(ipfsHash, destPath) {
  for (const gw of GATEWAYS) {
    const url = `${gw}${ipfsHash}`
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) })
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer())
        fs.writeFileSync(destPath, buffer)
        return true
      }
    } catch (err) {
      // Intentar con el siguiente gateway
    }
  }
  throw new Error(`Ningún gateway pudo servir el hash ${ipfsHash}`)
}

async function main() {
  console.log('=== DESCARGANDO ASSETS STEAMPUNK DE DECENTRALAND ===')
  if (!fs.existsSync(CATALOG_PATH)) {
    console.error(`No se encontró catalog.json en ${CATALOG_PATH}`)
    process.exit(1)
  }

  const catalogRaw = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'))
  const packs = Array.isArray(catalogRaw) ? catalogRaw : (catalogRaw.assetPacks || Object.values(catalogRaw))

  // Mapear todos los assets disponibles por nombre normalizado
  const assetMap = new Map()
  packs.forEach(pack => {
    (pack.assets || []).forEach(asset => {
      assetMap.set(asset.name.toLowerCase().trim(), asset)
    })
  })

  console.log(`Catálogo cargado. Total de assets indexados: ${assetMap.size}`)

  let downloadedCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const assetName of TARGET_ASSET_NAMES) {
    const asset = assetMap.get(assetName.toLowerCase().trim())
    if (!asset) {
      console.warn(`[WARN] Asset no encontrado en catálogo: "${assetName}"`)
      continue
    }

    const slug = slugify(asset.name)
    const targetDir = path.join(OUTPUT_BASE_DIR, slug)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    const contents = asset.contents || {}
    for (const [filename, ipfsHash] of Object.entries(contents)) {
      // Descargamos únicamente archivos .glb y texturas (omitimos thumbnails y composite.json para rapidez)
      if (!filename.endsWith('.glb') && !filename.endsWith('.png') && !filename.endsWith('.jpg')) {
        continue
      }
      if (filename.includes('thumbnail')) continue

      const filePath = path.join(targetDir, filename)
      const fileDir = path.dirname(filePath)
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true })
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        skippedCount++
        continue
      }

      try {
        console.log(`Descargando [${asset.name}] -> ${filename}...`)
        await downloadFileWithFallback(ipfsHash, filePath)
        downloadedCount++
      } catch (err) {
        console.error(`[ERROR] Falló descarga de ${filename} (${ipfsHash}): ${err.message}`)
        errorCount++
      }
    }
  }

  console.log('==================================================')
  console.log(`Completado: ${downloadedCount} descargados, ${skippedCount} ya existían, ${errorCount} errores.`)
}

main().catch(err => {
  console.error('Error fatal en descarga de assets:', err)
  process.exit(1)
})
