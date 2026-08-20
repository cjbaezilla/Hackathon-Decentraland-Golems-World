const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer-core');

/**
 * ============================================================================
 * GENERADOR AUTOMÁTICO DE IMÁGENES PNG PARA ACCESORIOS Y WEARABLES 3D
 * ============================================================================
 * Escanea la carpeta `assets/wearables/*.glb`, renderiza cada accesorio 3D
 * en WebGL con un fondo temático steampunk PBR y guarda las imágenes resultantes
 * en formato PNG (1024x1024) dentro de `GOLEMS/wearables_imgs/`.
 */

// Temas visuales de fondo y resplandor por accesorio
const WEARABLE_THEMES = {
  goggles_steampunk: {
    label: 'Gafas de Aviador Steampunk',
    bg: 'radial-gradient(circle at center, #103c5c 0%, #061c2b 70%, #020c12 100%)',
    glow: 'rgba(0, 229, 255, 0.5)',
    accent: '#00E5FF'
  },
  welding_mask: {
    label: 'Máscara de Soldar Mad Max',
    bg: 'radial-gradient(circle at center, #5c2010 0%, #2b0e06 70%, #120502 100%)',
    glow: 'rgba(255, 102, 0, 0.5)',
    accent: '#FF6600'
  },
  steam_backpack: {
    label: 'Mochila de Caldera de Vapor',
    bg: 'radial-gradient(circle at center, #5c4710 0%, #2b2006 70%, #120e02 100%)',
    glow: 'rgba(255, 170, 0, 0.5)',
    accent: '#FFAA00'
  },
  tesla_backpack: {
    label: 'Generador Galvánico Tesla',
    bg: 'radial-gradient(circle at center, #0f485c 0%, #06232c 70%, #021014 100%)',
    glow: 'rgba(0, 229, 255, 0.5)',
    accent: '#00E5FF'
  },
  wrench_heavy: {
    label: 'Llave Mecatrónica Gigante',
    bg: 'radial-gradient(circle at center, #423b2c 0%, #211c14 70%, #0d0b07 100%)',
    glow: 'rgba(255, 170, 0, 0.45)',
    accent: '#FFAA00'
  },
  flamethrower_pipe: {
    label: 'Antorcha de Vapor Industrial',
    bg: 'radial-gradient(circle at center, #5c2010 0%, #2b0e06 70%, #120502 100%)',
    glow: 'rgba(255, 85, 34, 0.5)',
    accent: '#FF5522'
  },
  shoulder_pad_spiked: {
    label: 'Hombrera con Púas Mad Max',
    bg: 'radial-gradient(circle at center, #3a2e2a 0%, #1d1614 70%, #0a0706 100%)',
    glow: 'rgba(255, 102, 0, 0.45)',
    accent: '#FF6600'
  },
  aether_crown: {
    label: 'Corona de Cristal de Éter',
    bg: 'radial-gradient(circle at center, #48105c 0%, #21062b 70%, #0e0212 100%)',
    glow: 'rgba(187, 107, 255, 0.5)',
    accent: '#BB67FF'
  },
  monocle_brass: {
    label: 'Monóculo de Latón',
    bg: 'radial-gradient(circle at center, #103c5c 0%, #061c2b 70%, #020c12 100%)',
    glow: 'rgba(0, 229, 255, 0.5)',
    accent: '#00E5FF'
  },
  top_hat_steam: {
    label: 'Sombrero de Copa a Vapor',
    bg: 'radial-gradient(circle at center, #5c4710 0%, #2b2006 70%, #120e02 100%)',
    glow: 'rgba(255, 170, 0, 0.5)',
    accent: '#FFAA00'
  },
  neck_cog_collar: {
    label: 'Collarín de Engranajes',
    bg: 'radial-gradient(circle at center, #0f485c 0%, #06232c 70%, #021014 100%)',
    glow: 'rgba(0, 229, 255, 0.5)',
    accent: '#00E5FF'
  },
  chest_armor_plate: {
    label: 'Peto Blindado Remachado',
    bg: 'radial-gradient(circle at center, #48105c 0%, #21062b 70%, #0e0212 100%)',
    glow: 'rgba(187, 107, 255, 0.5)',
    accent: '#BB67FF'
  },
  belt_utility_pouch: {
    label: 'Cinturón de Herramientas',
    bg: 'radial-gradient(circle at center, #423b2c 0%, #211c14 70%, #0d0b07 100%)',
    glow: 'rgba(255, 170, 0, 0.45)',
    accent: '#FFAA00'
  },
  gauntlet_left: {
    label: 'Guantelete Blindado Izquierdo',
    bg: 'radial-gradient(circle at center, #0f485c 0%, #06232c 70%, #021014 100%)',
    glow: 'rgba(0, 229, 255, 0.5)',
    accent: '#00E5FF'
  },
  gauntlet_right: {
    label: 'Guantelete Blindado Derecho',
    bg: 'radial-gradient(circle at center, #0f485c 0%, #06232c 70%, #021014 100%)',
    glow: 'rgba(0, 229, 255, 0.5)',
    accent: '#00E5FF'
  },
  mechanical_arm_left: {
    label: 'Brazo Mecánico con Pistón',
    bg: 'radial-gradient(circle at center, #5c2010 0%, #2b0e06 70%, #120502 100%)',
    glow: 'rgba(255, 102, 0, 0.5)',
    accent: '#FF6600'
  },
  shoulder_cannon: {
    label: 'Cañón de Vapor al Hombro',
    bg: 'radial-gradient(circle at center, #5c2010 0%, #2b0e06 70%, #120502 100%)',
    glow: 'rgba(255, 85, 34, 0.5)',
    accent: '#FF5522'
  },
  boot_plated_right: {
    label: 'Bota Blindada con Grebas',
    bg: 'radial-gradient(circle at center, #423b2c 0%, #211c14 70%, #0d0b07 100%)',
    glow: 'rgba(255, 170, 0, 0.45)',
    accent: '#FFAA00'
  }
};

const PROJECT_ROOT = path.resolve(__dirname, '..');
const WEARABLES_DIR = path.join(PROJECT_ROOT, 'assets', 'wearables');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'GOLEMS', 'wearables_imgs');
const PORT = 8991;

// 1. Servidor HTTP local estático simple
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

// 2. Función Principal de Renderizado WebGL
async function generateAllWearablePNGs() {
  console.log('\n🎨 ========================================================');
  console.log('   GENERADOR AUTOMÁTICO DE RENDERS PNG PARA ACCESORIOS 3D');
  console.log('========================================================\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const server = await startLocalServer();

  // Buscar ejecutable de Microsoft Edge o Chrome en Windows
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgePathAlt = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  let executablePath = '';
  if (fs.existsSync(edgePath)) executablePath = edgePath;
  else if (fs.existsSync(edgePathAlt)) executablePath = edgePathAlt;
  else if (fs.existsSync(chromePath)) executablePath = chromePath;
  else {
    console.error('❌ No se encontró Microsoft Edge ni Chrome.');
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
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 2 });

  const files = fs.readdirSync(WEARABLES_DIR).filter(f => f.endsWith('.glb'));
  console.log(`\n📦 Procesando ${files.length} accesorios 3D GLB...\n`);

  for (const file of files) {
    const wearableId = path.basename(file, '.glb');
    const theme = WEARABLE_THEMES[wearableId] || {
      label: wearableId,
      bg: 'radial-gradient(circle at center, #2e3440 0%, #1a1d24 70%, #0f1115 100%)',
      glow: 'rgba(255, 170, 0, 0.4)',
      accent: '#FFAA00'
    };

    const glbUrl = `http://localhost:${PORT}/assets/wearables/${file}`;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
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
        canvas { width: 512px !important; height: 512px !important; display: block; }
      </style>
    </head>
    <body>
      <script>
        window.modelReady = false;
        try {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
          renderer.setSize(512, 512);
          renderer.setPixelRatio(2);
          renderer.setClearColor(0x000000, 0);
          document.body.appendChild(renderer.domElement);

          const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
          scene.add(ambientLight);

          const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
          dirLight1.position.set(5, 10, 7);
          scene.add(dirLight1);

          const dirLight2 = new THREE.DirectionalLight(0xffaa00, 0.9);
          dirLight2.position.set(-5, -5, -5);
          scene.add(dirLight2);

          const loader = new THREE.GLTFLoader();
          loader.load('${glbUrl}', (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.sub(center);
            scene.add(model);

            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            camera.position.set(maxDim * 1.4, maxDim * 1.1, maxDim * 1.8);
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(() => {
              renderer.render(scene, camera);
              window.modelReady = true;
            });
          }, undefined, () => {
            renderer.render(scene, camera);
            requestAnimationFrame(() => {
              renderer.render(scene, camera);
              window.modelReady = true;
            });
          });
        } catch (e) {
          window.modelReady = true;
        }

        setTimeout(() => { window.modelReady = true; }, 6000);
      </script>
    </body>
    </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    try {
      await page.waitForFunction('window.modelReady === true', { timeout: 8000 });
      await page.evaluate(() => new Promise(r => setTimeout(r, 400)));
    } catch (e) {
      // Continuar con captura
    }

    const outputPath = path.join(OUTPUT_DIR, `${wearableId}.png`);
    await page.screenshot({ path: outputPath, type: 'png', omitBackground: false });

    console.log(`  ✓ Render completado: GOLEMS/wearables_imgs/${wearableId}.png [${theme.label}]`);
  }

  console.log('\n🎉 ¡Todos los renders PNG de accesorios se guardaron exitosamente en GOLEMS/wearables_imgs/!');

  await browser.close();
  server.close();
  process.exit(0);
}

generateAllWearablePNGs().catch((err) => {
  console.error('❌ Error fatal durante la generación de PNGs:', err);
  process.exit(1);
});
