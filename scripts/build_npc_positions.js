const fs = require('fs');
const path = require('path');

// Cargar npcCatalog.ts
const catalogPath = path.join(__dirname, '../src/data/npcCatalog.ts');
const catalogCode = fs.readFileSync(catalogPath, 'utf-8');

const matches = [...catalogCode.matchAll(/id:\s*'(NPC-\d{3})',\s*name:\s*'([^']+)',\s*title:\s*'([^']+)',\s*zone:\s*'([^']+)'/g)];

// Definir límites de spawn seguros para cada zona excluyendo Initial Town (0..140, 0..140) y Central Arena (200, 200 r=42)
const isExcluded = (x, z) => {
  // Exclusión 1: Initial Town (Distrito de la Forja Hub)
  if (x <= 140 && z <= 140) return true;
  // Exclusión 2: Gran Arena Central Interior
  const distArena = Math.sqrt((x - 200) ** 2 + (z - 200) ** 2);
  if (distArena < 42) return true;
  // Exclusión 3: Fuera de los bordes del mapa (400x400)
  if (x < 10 || x > 390 || z < 10 || z > 390) return true;
  return false;
};

// Mapa de generadores por zona
const zoneSpawners = {
  'Desierto de Chatarra': (idx, total) => {
    // NW: X: 20..130, Z: 265..385
    const cols = 4;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 25 + col * 32 + (row % 2) * 10;
    const z = 275 + row * 32;
    return { x, z, rot: (idx * 37) % 360 };
  },
  'Reserva de Minería': (idx, total) => {
    // NE: X: 270..380, Z: 270..380
    const cols = 4;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 275 + col * 32;
    const z = 275 + row * 32;
    return { x, z, rot: (idx * 43) % 360 };
  },
  'Calderas de Fundición': (idx, total) => {
    // SE: X: 270..380, Z: 20..130
    const cols = 4;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 275 + col * 32;
    const z = 25 + row * 32;
    return { x, z, rot: (idx * 51) % 360 };
  },
  'Subestación Eléctrica': (idx, total) => {
    // Norte: X: 155..245, Z: 285..385
    const cols = 3;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 160 + col * 38;
    const z = 290 + row * 30;
    return { x, z, rot: (idx * 29) % 360 };
  },
  'Torre de Radio': (idx, total) => {
    // Este: X: 285..385, Z: 155..245
    const cols = 3;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 290 + row * 30;
    const z = 160 + col * 38;
    return { x, z, rot: (idx * 67) % 360 };
  },
  'Los Chatarrales': (idx, total) => {
    // Oeste: X: 20..130, Z: 155..250
    const cols = 3;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 25 + col * 40;
    const z = 160 + row * 26;
    return { x, z, rot: (idx * 73) % 360 };
  },
  'Fábrica Abandonada': (idx, total) => {
    // Anillos Intermedios (NW y NE de la Arena)
    const points = [
      { x: 150, z: 255 }, { x: 180, z: 260 }, { x: 220, z: 260 }, { x: 250, z: 255 },
      { x: 135, z: 220 }, { x: 265, z: 220 }, { x: 135, z: 180 }, { x: 265, z: 180 },
      { x: 150, z: 145 }
    ];
    const pt = points[idx % points.length];
    return { x: pt.x, z: pt.y || pt.z, rot: (idx * 83) % 360 };
  },
  'Gran Arena Steampunk': (idx, total) => {
    // Anillo exterior de la Arena (Radio 48m alrededor de 200, 200)
    const angleRad = (idx / total) * 2 * Math.PI;
    const radius = 48;
    const x = 200 + radius * Math.cos(angleRad);
    const z = 200 + radius * Math.sin(angleRad);
    // Mirando hacia el centro de la arena o hacia afuera
    const rot = (angleRad * 180 / Math.PI + 90) % 360;
    return { x: Math.round(x * 10) / 10, z: Math.round(z * 10) / 10, rot: Math.round(rot) };
  },
  'Corredores y Vías Sur': (idx, total) => {
    // Bulevar Sur: X: 150..250, Z: 25..125
    const cols = 2;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 165 + col * 70;
    const z = 25 + row * 26;
    return { x, z, rot: (idx * 97) % 360 };
  },
  'Distrito de la Forja': (idx, total) => {
    // Bulevares Exteriores / Transición (Fuera de Initial Town 0..140, 0..140)
    const points = [
      { x: 148, z: 25 }, { x: 148, z: 50 }, { x: 148, z: 75 }, { x: 148, z: 100 }, { x: 148, z: 125 },
      { x: 25, z: 148 }, { x: 50, z: 148 }, { x: 75, z: 148 }, { x: 100, z: 148 }, { x: 125, z: 148 },
      { x: 170, z: 145 }, { x: 145, z: 170 }, { x: 230, z: 145 }
    ];
    const pt = points[idx % points.length];
    return { x: pt.x, z: pt.z, rot: (idx * 103) % 360 };
  }
};

// Asignar posiciones y validar
const npcPositions = {};
const zoneIndices = {};

let excludedCount = 0;

matches.forEach(m => {
  const id = m[1];
  const name = m[2];
  const zone = m[4];

  zoneIndices[zone] = (zoneIndices[zone] || 0);
  const idx = zoneIndices[zone];
  zoneIndices[zone]++;

  const spawner = zoneSpawners[zone] || zoneSpawners['Los Chatarrales'];
  const pos = spawner(idx, 12);

  if (isExcluded(pos.x, pos.z)) {
    console.error(`⚠️ ALERTA: ${id} (${name}) en ${zone} cayó en zona excluida: (${pos.x}, ${pos.z})`);
    excludedCount++;
  }

  npcPositions[id] = {
    x: Math.round(pos.x * 10) / 10,
    y: 0,
    z: Math.round(pos.z * 10) / 10,
    rot: Math.round(pos.rot)
  };
});

console.log(`✅ 100 NPCs procesados. Violaciones de exclusión: ${excludedCount}`);

// Generar módulo TypeScript src/data/npcPositions.ts
const tsContent = `/**
 * ============================================================================
 * MATRIZ DE POSICIONAMIENTO ESPACIAL DE NPCS (NPC SPATIAL POSITIONS)
 * ============================================================================
 * Coordenadas deterministas distribuidas proporcionalmente por todo el terreno
 * de 400m x 400m, excluyendo estrictamente la Forja Inicial (0..140m, 0..140m)
 * y el interior de la Gran Arena Central (r < 42m).
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
