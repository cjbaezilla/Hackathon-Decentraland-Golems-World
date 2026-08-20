const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer-core');

/**
 * ============================================================================
 * GENERADOR AUTOMÁTICO DE IMÁGENES PNG PARA ÍTEMS (46 MATERIALES)
 * ============================================================================
 * Escanea la carpeta assets/items/<rareza>/*.glb, renderiza cada modelo 3D
 * en WebGL con un fondo temático acorde a la rareza del ítem y guarda las
 * imágenes resultantes en formato PNG dentro del directorio showcase/.
 */

// Configuración de Paletas de Fondo por Rareza (Hex, Gradiante Radial y Glow)
const RARITY_THEMES = {
  common: {
    label: 'Común',
    bg: 'radial-gradient(circle at center, #2e3440 0%, #1a1d24 70%, #0f1115 100%)',
    glow: 'rgba(160, 160, 160, 0.35)',
    accent: '#A0A0A0'
  },
  uncommon: {
    label: 'Poco Común',
    bg: 'radial-gradient(circle at center, #1b3a27 0%, #0f2317 70%, #07120c 100%)',
    glow: 'rgba(0, 255, 68, 0.4)',
    accent: '#00FF44'
  },
  rare: {
    label: 'Raro',
    bg: 'radial-gradient(circle at center, #13344b 0%, #0b1e2c 70%, #050e15 100%)',
    glow: 'rgba(0, 212, 255, 0.4)',
    accent: '#00D4FF'
  },
  epic: {
    label: 'Épico',
    bg: 'radial-gradient(circle at center, #351c4e 0%, #1f102e 70%, #0e0716 100%)',
    glow: 'rgba(192, 56, 255, 0.4)',
    accent: '#C038FF'
  },
  legendary: {
    label: 'Legendario',
    bg: 'radial-gradient(circle at center, #4a3515 0%, #2b1e0a 70%, #140d04 100%)',
    glow: 'rgba(255, 170, 0, 0.5)',
    accent: '#FFAA00'
  }
};

const PROJECT_ROOT = path.resolve(__dirname, '..');
const ITEMS_DIR = path.join(PROJECT_ROOT, 'assets', 'items');
const SHOWCASE_DIR = path.join(PROJECT_ROOT, 'showcase');
const PORT = 8989;

// 1. Servidor HTTP local estático simple para servir los GLB y scripts
function startLocalServer() {
  return new Promise((resolve) => {
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

    server.listen(PORT, () => {
      console.log(`📡 Servidor HTTP local iniciado en http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// 2. Función Principal
async function generateAllPNGs() {
  console.log('\n🎨 ========================================================');
  console.log('   GENERADOR DE IMÁGENES PNG DE ÍTEMS CON COLOR POR RAREZA');
  console.log('========================================================\n');

  if (!fs.existsSync(SHOWCASE_DIR)) {
    fs.mkdirSync(SHOWCASE_DIR, { recursive: true });
  }

  // Iniciar Servidor
  const server = await startLocalServer();

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

  const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
  let totalProcessed = 0;

  for (const rarity of rarities) {
    const rarityDir = path.join(ITEMS_DIR, rarity);
    if (!fs.existsSync(rarityDir)) continue;

    const showcaseRarityDir = path.join(SHOWCASE_DIR, rarity);
    if (!fs.existsSync(showcaseRarityDir)) {
      fs.mkdirSync(showcaseRarityDir, { recursive: true });
    }

    const files = fs.readdirSync(rarityDir).filter(f => f.endsWith('.glb'));
    const theme = RARITY_THEMES[rarity];

    console.log(`\n📦 Procesando categoría [${rarity.toUpperCase()}] (${files.length} ítems)...`);

    for (const file of files) {
      const itemId = path.basename(file, '.glb');
      const glbUrl = `http://localhost:${PORT}/assets/items/${rarity}/${file}`;
      
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
            width: 340px;
            height: 340px;
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
          alt="${itemId}"
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

        // Guardar exclusivamente en showcase/<rareza>/<item_id>.png
        const rarityOutputPath = path.join(showcaseRarityDir, `${itemId}.png`);
        await page.screenshot({ path: rarityOutputPath, type: 'png' });

        totalProcessed++;
        console.log(`  ✅ [${totalProcessed.toString().padStart(2, '0')}/46] ${rarity}/${itemId}.png`);
      } catch (err) {
        console.error(`  ❌ Error al renderizar ${rarity}/${itemId}:`, err.message);
      }
    }
  }

  console.log('\n========================================================');
  console.log(`🎉 ¡PROCESO COMPLETADO! Se generaron ${totalProcessed} imágenes PNG.`);
  console.log(`📁 Guardadas en: ${SHOWCASE_DIR}`);
  console.log('========================================================\n');

  await browser.close();
  server.close();
}

generateAllPNGs().catch((err) => {
  console.error('❌ Error fatal en la generación de imágenes:', err);
  process.exit(1);
});
