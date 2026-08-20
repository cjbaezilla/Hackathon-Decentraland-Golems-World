const fs = require('fs');
const path = require('path');

// Cargar npcCatalog.ts
const catalogPath = path.join(__dirname, '../src/data/npcCatalog.ts');
const catalogCode = fs.readFileSync(catalogPath, 'utf-8');

const matches = [...catalogCode.matchAll(/id:\s*'(NPC-\d{3})',\s*name:\s*'([^']+)',\s*title:\s*'([^']+)',\s*zone:\s*'([^']+)'/g)];

// Semilla pseudo-aleatoria determinista para reproducibilidad (LCG)
let seed = 987654321;
function pseudoRandom() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function randomRange(min, max) {
  return min + pseudoRandom() * (max - min);
}

// Definir límites de spawn seguros excluyendo Initial Town (0..138, 0..138) y Gran Arena Central Extendida (200, 200 r=65m)
const isExcluded = (x, z) => {
  // Exclusión 1: Initial Town (Distrito de la Forja Hub)
  if (x <= 138 && z <= 138) return true;
  // Exclusión 2: Gran Arena Central y sus alrededores inmediatos (r = 65m del centro 200, 200)
  const distArena = Math.hypot(x - 200, z - 200);
  if (distArena < 65) return true;
  // Exclusión 3: Fuera de los bordes del mapa (400x400)
  if (x < 15 || x > 385 || z < 15 || z > 385) return true;
  return false;
};

// Bounding boxes por zona para distribución orgánica desalineada lejos de la Arena Central
const zoneBounds = {
  'Desierto de Chatarra': { minX: 20, maxX: 135, minZ: 265, maxZ: 385 },
  'Reserva de Minería': { minX: 265, maxX: 385, minZ: 265, maxZ: 385 },
  'Calderas de Fundición': { minX: 265, maxX: 385, minZ: 20, maxZ: 135 },
  'Subestación Eléctrica': { minX: 145, maxX: 255, minZ: 275, maxZ: 385 },
  'Torre de Radio': { minX: 275, maxX: 385, minZ: 145, maxZ: 255 },
  'Los Chatarrales': { minX: 20, maxX: 135, minZ: 145, maxZ: 255 },
  'Fábrica Abandonada': { minX: 145, maxX: 255, minZ: 145, maxZ: 255 },
  'Gran Arena Steampunk': { isArenaRing: true },
  'Corredores y Vías Sur': { minX: 145, maxX: 255, minZ: 20, maxZ: 135 },
  'Distrito de la Forja': { minX: 140, maxX: 255, minZ: 20, maxZ: 135 }
};

const placedPositions = []; // [{x, z}]
const npcPositions = {};
let excludedCount = 0;

matches.forEach((m) => {
  const id = m[1];
  const name = m[2];
  const zone = m[4];

  const bounds = zoneBounds[zone] || zoneBounds['Los Chatarrales'];

  let bestX = null;
  let bestZ = null;
  let found = false;

  // Intentar encontrar una posición orgánica lejos de la arena con separación mínima
  let minDistanceThreshold = 18; // 18m de separación mínima ideal
  for (let attempt = 0; attempt < 800; attempt++) {
    let candidateX, candidateZ;

    if (attempt > 100) {
      // Si el bounding box de la zona es reducido por la exclusión de la arena, ampliar a todo el mapa válido
      candidateX = randomRange(20, 385);
      candidateZ = randomRange(20, 385);
    } else if (bounds.isArenaRing) {
      const angle = pseudoRandom() * Math.PI * 2;
      const radius = randomRange(70, 95); // Anillo exterior lejano (fuera del radio de exclusión de 65m)
      candidateX = 200 + Math.cos(angle) * radius;
      candidateZ = 200 + Math.sin(angle) * radius;
    } else {
      candidateX = randomRange(bounds.minX, bounds.maxX);
      candidateZ = randomRange(bounds.minZ, bounds.maxZ);
    }

    if (isExcluded(candidateX, candidateZ)) {
      continue;
    }

    // Verificar distancia mínima con todos los NPCs ya colocados
    let isTooClose = false;
    for (const pos of placedPositions) {
      const dist = Math.hypot(candidateX - pos.x, candidateZ - pos.z);
      if (dist < minDistanceThreshold) {
        isTooClose = true;
        break;
      }
    }

    if (!isTooClose) {
      bestX = candidateX;
      bestZ = candidateZ;
      found = true;
      break;
    }

    // Relajar umbrales de distancia progresivamente
    if (attempt === 300) minDistanceThreshold = 14;
    if (attempt === 500) minDistanceThreshold = 10;
    if (attempt === 700) minDistanceThreshold = 6;
  }

  if (!found || bestX === null) {
    // Buscar cualquier coordenada libre no excluida en el mapa
    for (let fallback = 0; fallback < 1000; fallback++) {
      const fx = randomRange(20, 385);
      const fz = randomRange(20, 385);
      if (!isExcluded(fx, fz)) {
        bestX = fx;
        bestZ = fz;
        found = true;
        break;
      }
    }
  }

  if (isExcluded(bestX, bestZ)) {
    console.error(`⚠️ ALERTA: ${id} (${name}) cayó en zona excluida: (${bestX}, ${bestZ})`);
    excludedCount++;
  }

  bestX = Math.round(bestX * 10) / 10;
  bestZ = Math.round(bestZ * 10) / 10;
  const bestRot = Math.round(pseudoRandom() * 360);

  placedPositions.push({ x: bestX, z: bestZ });

  npcPositions[id] = {
    x: bestX,
    y: 0,
    z: bestZ,
    rot: bestRot
  };
});

console.log(`✅ ${matches.length} NPCs procesados sin presencia cerca de la Gran Arena Central (r >= 65m). Violaciones: ${excludedCount}`);

// Generar módulo TypeScript src/data/npcPositions.ts
const tsContent = `/**
 * ============================================================================
 * MATRIZ DE POSICIONAMIENTO ESPACIAL DE NPCS (NPC SPATIAL POSITIONS)
 * ============================================================================
 * Coordenadas deterministas distribuidas orgánicamente por todo el terreno
 * de 400m x 400m, excluyendo estrictamente la Forja Inicial (0..140m, 0..140m)
 * y la Gran Arena Central con su perímetro circundante (r < 65m de 200, 200).
 */

export interface NpcTransformData {
  x: number
  y: number
  z: number
  rot: number
}

export const NPC_POSITIONS: Record<string, NpcTransformData> = ${JSON.stringify(npcPositions, null, 2)}
`;

fs.writeFileSync(path.join(__dirname, '../src/data/npcPositions.ts'), tsContent, 'utf-8');
console.log('✅ Archivo src/data/npcPositions.ts generado exitosamente!');
