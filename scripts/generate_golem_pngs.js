const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer-core');

/**
 * ============================================================================
 * GENERADOR AUTOMÁTICO DE IMÁGENES PNG PARA GOLEMS (150 MODELOS 3D)
 * ============================================================================
 * Escanea la carpeta assets/golems/<afinidad>/*.glb, renderiza cada modelo 3D
 * en WebGL con un fondo temático acorde a la afinidad elemental del golem
 * y guarda las imágenes resultantes en formato PNG dentro de GOLEMS/golems_imgs/.
 */

// Configuración de Paletas de Fondo por Afinidad Elemental (Hex, Gradiante Radial y Glow)
const AFFINITY_THEMES = {
  steam: {
    label: 'Vapor',
    bg: 'radial-gradient(circle at center, #5c2010 0%, #2b0e06 70%, #120502 100%)',
    glow: 'rgba(255, 85, 34, 0.45)',
    accent: '#FF5522'
  },
  galvanic: {
    label: 'Galvánico',
    bg: 'radial-gradient(circle at center, #103c5c 0%, #061c2b 70%, #020c12 100%)',
    glow: 'rgba(0, 229, 255, 0.45)',
    accent: '#00E5FF'
  },
  mechanical: {
    label: 'Mecánico',
    bg: 'radial-gradient(circle at center, #5c4710 0%, #2b2006 70%, #120e02 100%)',
    glow: 'rgba(255, 170, 0, 0.45)',
    accent: '#FFAA00'
  },
  luminous: {
    label: 'Luminoso',
    bg: 'radial-gradient(circle at center, #5c5810 0%, #2b2806 70%, #121102 100%)',
    glow: 'rgba(255, 235, 59, 0.45)',
    accent: '#FFEE55'
  },
  aether: {
    label: 'Éter',
    bg: 'radial-gradient(circle at center, #48105c 0%, #21062b 70%, #0e0212 100%)',
    glow: 'rgba(187, 107, 255, 0.45)',
    accent: '#BB67FF'
  }
};

const PROJECT_ROOT = path.resolve(__dirname, '..');
const GOLEMS_ASSETS_DIR = path.join(PROJECT_ROOT, 'assets', 'golems');
const DEFAULT_OUTPUT_DIR = path.join(PROJECT_ROOT, 'GOLEMS', 'golems_imgs');

// Parsear argumentos CLI
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    affinity: 'all',
    golemId: null,
    port: 8990,
    outputDir: DEFAULT_OUTPUT_DIR,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--affinity' || arg === '-a') {
      options.affinity = (args[++i] || 'all').toLowerCase();
    } else if (arg === '--golem' || arg === '-g') {
      let idStr = args[++i] || '';
      if (idStr) {
        if (!idStr.startsWith('golem_')) {
          idStr = `golem_${idStr.padStart(3, '0')}`;
        }
        options.golemId = idStr;
      }
    } else if (arg === '--port' || arg === '-p') {
      options.port = parseInt(args[++i], 10) || 8990;
    } else if (arg === '--output-dir' || arg === '-o') {
      options.outputDir = path.resolve(PROJECT_ROOT, args[++i]);
    }
  }

  return options;
}

function showHelp() {
  console.log(`
🛠️ GENERADOR AUTOMÁTICO DE IMÁGENES PNG PARA GOLEMS (150 MODELOS 3D)

Uso:
  node scripts/generate_golem_pngs.js [opciones]

Opciones:
  -a, --affinity <tipo>   Filtrar por afinidad elemental: steam, galvanic, mechanical, luminous, aether, all (defecto: all)
  -g, --golem <id>        Generar solo un golem específico (ej: 001 o golem_001)
  -p, --port <puerto>     Puerto para el servidor HTTP local estático (defecto: 8990)
  -o, --output-dir <ruta> Directorio de salida para las imágenes PNG (defecto: GOLEMS/golems_imgs)
  -h, --help              Muestra esta ayuda

Ejemplos:
  node scripts/generate_golem_pngs.js
  node scripts/generate_golem_pngs.js -a steam
  node scripts/generate_golem_pngs.js -g 015
`);
}

// 1. Servidor HTTP local estático simple para servir los GLB
function startLocalServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(PROJECT_ROOT, decodeURIComponent(req.url));
      
      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.statusCode = 404;
          res.end('Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = {
          '.glb': 'model/gltf-binary',
          '.gltf': 'model/gltf+json',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.html': 'text/html',
          '.png': 'image/png'
        }[ext] || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.on('error', (err) => {
      reject(err);
    });

    server.listen(port, () => {
      console.log(`📡 Servidor HTTP local iniciado en http://localhost:${port}`);
      resolve(server);
    });
  });
}

// 2. Función Principal
async function generateAllPNGs() {
  const options = parseArgs();
  if (options.help) {
    showHelp();
    return;
  }

  console.log('\n🤖 ========================================================');
  console.log('   GENERADOR DE IMÁGENES PNG DE GOLEMS POR AFINIDAD');
  console.log('========================================================\n');

  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir, { recursive: true });
  }

  // Iniciar Servidor
  const server = await startLocalServer(options.port);

  // Buscar ejecutable de Microsoft Edge o Chrome
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgePathAlt = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  let executablePath = '';
  if (fs.existsSync(edgePath)) executablePath = edgePath;
  else if (fs.existsSync(edgePathAlt)) executablePath = edgePathAlt;
  else if (fs.existsSync(chromePath)) executablePath = chromePath;
  else {
    console.error('❌ No se encontró Microsoft Edge ni Chrome en la ruta estándar.');
    server.close();
    process.exit(1);
  }

  console.log(`🌐 Navegador detectado: ${executablePath}`);
  console.log('🚀 Iniciando navegador headless con aceleración WebGL...');

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--use-gl=angle',
      '--enable-webgl',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--disable-web-security'
    ]
  });

  const page = await browser.newPage();
  // Configurar viewport cuadrado a alta resolución (512x512 con factor de escala 2x = 1024x1024 efectivos)
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 2 });

  const allAffinities = ['aether', 'galvanic', 'luminous', 'mechanical', 'steam'];
  const targetAffinities = options.affinity === 'all'
    ? allAffinities
    : allAffinities.filter(a => a === options.affinity);

  if (targetAffinities.length === 0) {
    console.error(`❌ Afinidad invalida: "${options.affinity}". Valores aceptados: ${allAffinities.join(', ')}`);
    await browser.close();
    server.close();
    process.exit(1);
  }

  let totalProcessed = 0;
  let totalErrors = 0;

  for (const affinity of targetAffinities) {
    const affinityDir = path.join(GOLEMS_ASSETS_DIR, affinity);
    if (!fs.existsSync(affinityDir)) continue;

    const subOutputDir = path.join(options.outputDir, affinity);
    if (!fs.existsSync(subOutputDir)) {
      fs.mkdirSync(subOutputDir, { recursive: true });
    }

    let files = fs.readdirSync(affinityDir).filter(f => f.endsWith('.glb'));

    if (options.golemId) {
      files = files.filter(f => path.basename(f, '.glb') === options.golemId);
    }

    if (files.length === 0) continue;

    const theme = AFFINITY_THEMES[affinity] || AFFINITY_THEMES.steam;

    console.log(`\n📦 Procesando afinidad [${theme.label.toUpperCase()}] (${files.length} golems)...`);

    for (const file of files) {
      const golemId = path.basename(file, '.glb');
      const glbUrl = `http://localhost:${options.port}/assets/golems/${affinity}/${file}`;
      
      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 512px;
            height: 512px;
            overflow: hidden;
            background: ${theme.bg};
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .glow-ring {
            position: absolute;
            width: 360px;
            height: 360px;
            border-radius: 50%;
            background: radial-gradient(circle, ${theme.glow} 0%, transparent 70%);
            pointer-events: none;
          }
          model-viewer {
            width: 100%;
            height: 100%;
            --poster-color: transparent;
          }
        </style>
      </head>
      <body>
        <div class="glow-ring"></div>
        <model-viewer
          src="${glbUrl}"
          alt="${golemId}"
          auto-rotate
          camera-controls
          shadow-intensity="1.6"
          shadow-softness="0.8"
          exposure="1.25"
          bounds="tight"
          camera-orbit="45deg 65deg 105%"
        ></model-viewer>
      </body>
      </html>
      `;

      try {
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded', timeout: 15000 });

        // Esperar a que model-viewer cargue el GLB
        await page.waitForFunction(() => {
          const mv = document.querySelector('model-viewer');
          return mv && mv.loaded;
        }, { timeout: 15000 });

        // Tiempo adicional para estabilización de renderizado y sombras
        await new Promise(r => setTimeout(r, 700));

        // Guardar tanto en la raíz de golems_imgs/<golem_id>.png como en subcarpeta por afinidad golems_imgs/<afinidad>/<golem_id>.png
        const rootOutputPath = path.join(options.outputDir, `${golemId}.png`);
        const subFolderOutputPath = path.join(subOutputDir, `${golemId}.png`);

        await page.screenshot({ path: rootOutputPath, type: 'png' });
        fs.copyFileSync(rootOutputPath, subFolderOutputPath);

        totalProcessed++;
        console.log(`  ✅ [${totalProcessed.toString().padStart(3, '0')}] ${affinity}/${golemId}.png`);
      } catch (err) {
        totalErrors++;
        console.error(`  ❌ Error al renderizar ${affinity}/${golemId}:`, err.message);
      }
    }
  }

  console.log('\n========================================================');
  console.log(`🎉 ¡PROCESO COMPLETADO! Se generaron ${totalProcessed} imágenes PNG (${totalErrors} errores).`);
  console.log(`📁 Guardadas en: ${options.outputDir}`);
  console.log('========================================================\n');

  await browser.close();
  server.close();
}

generateAllPNGs().catch((err) => {
  console.error('❌ Error fatal en la generación de imágenes:', err);
  process.exit(1);
});
