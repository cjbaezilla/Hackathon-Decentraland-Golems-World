const fs = require('fs')
const path = require('path')
const { GlbBuilder } = require('./lib/glbBuilder')

/**
 * ============================================================================
 * GENERADOR PROCEDURAL DE MODELOS 3D GLB DE ACCESORIOS Y VESTIMENTA STEAMPUNK
 * ============================================================================
 * Genera 18 modelos binarios .glb autocontenidos PBR en `assets/wearables/`
 * para equipar en NPCs y jugadores mediante AvatarAttach en Decentraland SDK7.
 *
 * Consideraciones oficiales de wearables de Decentraland aplicadas:
 *  - Presupuesto de triángulos por categoría (≤500 accesorios pequeños,
 *    ≤1000 accesorios de mano, ≤1500 piezas grandes).
 *  - Dimensiones máximas: alto/ancho ≤ 2.42 m, profundidad ≤ 1.40 m.
 *  - Materiales PBR con emisión en un material separado (sin luces dinámicas).
 *  - Mallas cerradas (renderizado de una sola cara en el cliente).
 *  - Sin texturas externas: geometría + color plano (mobile-first).
 *
 * Reutiliza la librería compartida `scripts/lib/glbBuilder.js` (esferas, toros,
 * engranajes, octaedros, conos y extrusión 2D) para obtener siluetas ricas.
 */

const outputDir = path.join(__dirname, '../assets/wearables')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// ---------------------------------------------------------------------------
// Paleta de materiales PBR Steampunk / Mad Max (afinidades elementales)
// ---------------------------------------------------------------------------
function createPalette(b) {
  return {
    brass: b.addMaterial({ name: 'Brass', baseColor: [0.85, 0.63, 0.25, 1.0], metallic: 0.9, roughness: 0.2 }),
    copper: b.addMaterial({ name: 'Copper', baseColor: [0.76, 0.36, 0.16, 1.0], metallic: 0.85, roughness: 0.3 }),
    darkIron: b.addMaterial({ name: 'DarkIron', baseColor: [0.2, 0.2, 0.22, 1.0], metallic: 0.8, roughness: 0.4 }),
    steel: b.addMaterial({ name: 'Steel', baseColor: [0.55, 0.56, 0.62, 1.0], metallic: 0.9, roughness: 0.28 }),
    leather: b.addMaterial({ name: 'Leather', baseColor: [0.34, 0.2, 0.1, 1.0], metallic: 0.1, roughness: 0.8 }),
    glowCyan: b.addMaterial({ name: 'GlowCyan', baseColor: [0.0, 0.85, 1.0, 1.0], emissive: [0.0, 0.85, 1.0], metallic: 0.2, roughness: 0.1 }),
    glowOrange: b.addMaterial({ name: 'GlowOrange', baseColor: [1.0, 0.5, 0.0, 1.0], emissive: [1.0, 0.5, 0.0], metallic: 0.2, roughness: 0.1 }),
    glowAmber: b.addMaterial({ name: 'GlowAmber', baseColor: [1.0, 0.75, 0.0, 1.0], emissive: [1.0, 0.75, 0.0], metallic: 0.2, roughness: 0.1 }),
    glowYellow: b.addMaterial({ name: 'GlowYellow', baseColor: [1.0, 1.0, 0.2, 1.0], emissive: [1.0, 1.0, 0.2], metallic: 0.2, roughness: 0.1 }),
    glowViolet: b.addMaterial({ name: 'GlowViolet', baseColor: [0.75, 0.2, 1.0, 1.0], emissive: [0.75, 0.2, 1.0], metallic: 0.2, roughness: 0.1 })
  }
}

// Agrupa una lista de primitivas y las añade como nodo de malla con un material
function addMesh(b, name, materialIndex, primitives) {
  const geom = b.combineGeometries(primitives)
  b.addMeshNode(name, geom, materialIndex)
}

// Cuenta los triángulos totales generados por el builder (accesores SCALAR de índices)
function countTriangles(b) {
  let tris = 0
  for (const accessor of b.json.accessors) {
    if (accessor.type === 'SCALAR') tris += accessor.count / 3
  }
  return tris
}

// ---------------------------------------------------------------------------
// CONSTRUCTORES DE 18 ACCESORIOS EQUIPABLES
// ---------------------------------------------------------------------------

// 1. Gafas Steampunk de Aviador (Cabeza - AAPT_HEAD)
function buildGoggles(b, m) {
  addMesh(b, 'strap', m.leather, [
    b.createCylinderMesh(0.15, 0.15, 0.05, 20, 0, 0.02, 0, 'y', false, false)
  ])
  addMesh(b, 'frames', m.brass, [
    b.createCylinderMesh(0.045, 0.05, 0.06, 16, -0.055, 0.02, 0.12, 'z'),
    b.createCylinderMesh(0.045, 0.05, 0.06, 16, 0.055, 0.02, 0.12, 'z'),
    b.createBoxMesh(0.05, 0.02, 0.03, 0, 0.02, 0.13),
    b.createTorusMesh(0.045, 0.006, 12, 6, -0.055, 0.02, 0.155, 'z'),
    b.createTorusMesh(0.045, 0.006, 12, 6, 0.055, 0.02, 0.155, 'z')
  ])
  addMesh(b, 'lenses', m.glowCyan, [
    b.createCylinderMesh(0.038, 0.038, 0.012, 16, -0.055, 0.02, 0.155, 'z'),
    b.createCylinderMesh(0.038, 0.038, 0.012, 16, 0.055, 0.02, 0.155, 'z')
  ])
  addMesh(b, 'rivets', m.copper, [
    b.createSphereMesh(0.012, 6, 8, -0.15, 0.02, 0),
    b.createSphereMesh(0.012, 6, 8, 0.15, 0.02, 0)
  ])
}

// 2. Máscara de Soldar Mad Max (Cabeza - AAPT_HEAD)
function buildWeldingMask(b, m) {
  addMesh(b, 'plate', m.darkIron, [
    b.createBoxMesh(0.24, 0.26, 0.04, 0, 0, 0.13),
    b.createCylinderMesh(0.13, 0.13, 0.04, 18, 0, -0.06, 0.13, 'z')
  ])
  addMesh(b, 'trim', m.brass, [
    b.createBoxMesh(0.17, 0.05, 0.05, 0, 0.05, 0.135),
    b.createTorusMesh(0.13, 0.006, 16, 6, 0, -0.06, 0.15, 'z')
  ])
  addMesh(b, 'visor', m.glowOrange, [
    b.createBoxMesh(0.14, 0.035, 0.02, 0, 0.05, 0.16)
  ])
  addMesh(b, 'rivets', m.brass, [
    b.createSphereMesh(0.015, 6, 8, -0.11, 0.11, 0.15),
    b.createSphereMesh(0.015, 6, 8, 0.11, 0.11, 0.15),
    b.createSphereMesh(0.015, 6, 8, -0.11, -0.11, 0.15),
    b.createSphereMesh(0.015, 6, 8, 0.11, -0.11, 0.15)
  ])
}

// 3. Mochila de Caldera de Vapor (Espalda - AAPT_SPINE2)
function buildSteamBackpack(b, m) {
  addMesh(b, 'tanks', m.brass, [
    b.createCylinderMesh(0.095, 0.095, 0.5, 16, -0.11, 0, -0.18, 'y'),
    b.createCylinderMesh(0.095, 0.095, 0.5, 16, 0.11, 0, -0.18, 'y'),
    b.createCylinderMesh(0.075, 0.095, 0.04, 16, -0.11, 0.27, -0.18, 'y'),
    b.createCylinderMesh(0.075, 0.095, 0.04, 16, 0.11, 0.27, -0.18, 'y')
  ])
  addMesh(b, 'frame', m.darkIron, [
    b.createBoxMesh(0.34, 0.05, 0.05, 0, 0.13, -0.18),
    b.createBoxMesh(0.34, 0.05, 0.05, 0, -0.13, -0.18),
    b.createBoxMesh(0.05, 0.05, 0.16, 0, 0, -0.1)
  ])
  addMesh(b, 'chimney', m.copper, [
    b.createCylinderMesh(0.035, 0.035, 0.18, 10, 0, 0.25, -0.18, 'y')
  ])
  addMesh(b, 'valve', m.brass, [
    b.createCylinderMesh(0.05, 0.05, 0.03, 14, 0, 0.05, -0.23, 'z'),
    b.createTorusMesh(0.05, 0.008, 12, 6, 0, 0.05, -0.24, 'z')
  ])
  addMesh(b, 'gear', m.steel, [
    b.createGearMesh(0.06, 0.045, 0.02, 8, 0, 0, -0.1, 'z')
  ])
  addMesh(b, 'glow', m.glowOrange, [
    b.createSphereMesh(0.025, 8, 10, 0, 0.05, -0.245),
    b.createCylinderMesh(0.012, 0.012, 0.1, 8, 0.14, 0.25, -0.18, 'y'),
    b.createCylinderMesh(0.012, 0.012, 0.1, 8, -0.14, 0.25, -0.18, 'y')
  ])
}

// 4. Mochila Galvánica Tesla (Espalda - AAPT_SPINE2)
function buildTeslaBackpack(b, m) {
  addMesh(b, 'case', m.darkIron, [
    b.createBoxMesh(0.26, 0.4, 0.18, 0, 0, -0.17),
    b.createBoxMesh(0.28, 0.03, 0.2, 0, 0.21, -0.17),
    b.createBoxMesh(0.28, 0.03, 0.2, 0, -0.21, -0.17)
  ])
  addMesh(b, 'coils', m.brass, [
    b.createCylinderMesh(0.07, 0.07, 0.5, 14, -0.095, 0.05, -0.17, 'y'),
    b.createCylinderMesh(0.07, 0.07, 0.5, 14, 0.095, 0.05, -0.17, 'y')
  ])
  addMesh(b, 'coil_glow', m.glowCyan, [
    b.createCylinderMesh(0.045, 0.045, 0.48, 10, -0.095, 0.05, -0.17, 'y'),
    b.createCylinderMesh(0.045, 0.045, 0.48, 10, 0.095, 0.05, -0.17, 'y')
  ])
  addMesh(b, 'rings', m.copper, [
    b.createTorusMesh(0.07, 0.006, 12, 6, -0.095, 0.15, -0.17, 'y'),
    b.createTorusMesh(0.07, 0.006, 12, 6, -0.095, -0.05, -0.17, 'y'),
    b.createTorusMesh(0.07, 0.006, 12, 6, 0.095, 0.15, -0.17, 'y'),
    b.createTorusMesh(0.07, 0.006, 12, 6, 0.095, -0.05, -0.17, 'y')
  ])
  addMesh(b, 'arc', m.glowCyan, [
    b.createTorusMesh(0.11, 0.006, 16, 6, 0, 0.28, -0.17, 'z')
  ])
}

// 5. Llave Mecatrónica Gigante (Mano Derecha - AAPT_RIGHT_HAND)
function buildHeavyWrench(b, m) {
  addMesh(b, 'handle', m.darkIron, [
    b.createCylinderMesh(0.024, 0.024, 0.7, 12, 0, 0.15, 0, 'y'),
    b.createCylinderMesh(0.032, 0.024, 0.12, 12, 0, -0.2, 0, 'y')
  ])
  addMesh(b, 'head', m.brass, [
    b.createBoxMesh(0.13, 0.16, 0.07, 0, 0.5, 0),
    b.createBoxMesh(0.06, 0.2, 0.06, 0.045, 0.52, 0),
    b.createBoxMesh(0.06, 0.2, 0.06, -0.045, 0.52, 0)
  ])
  addMesh(b, 'grip', m.leather, [
    b.createCylinderMesh(0.03, 0.03, 0.2, 12, 0, -0.05, 0, 'y')
  ])
  addMesh(b, 'core', m.glowOrange, [
    b.createSphereMesh(0.02, 8, 10, 0, 0.5, 0),
    b.createCylinderMesh(0.014, 0.014, 0.16, 8, 0, 0.32, 0, 'y')
  ])
}

// 6. Antorcha / Lanzallamas de Vapor Industrial (Mano Derecha - AAPT_RIGHT_HAND)
function buildFlamethrower(b, m) {
  addMesh(b, 'barrel', m.brass, [
    b.createCylinderMesh(0.04, 0.05, 0.7, 14, 0, 0.3, 0, 'y'),
    b.createCylinderMesh(0.07, 0.05, 0.14, 14, 0, 0.68, 0, 'y'),
    b.createCylinderMesh(0.05, 0.07, 0.06, 14, 0, 0.76, 0, 'y')
  ])
  addMesh(b, 'grip', m.leather, [
    b.createCylinderMesh(0.032, 0.032, 0.22, 12, 0, -0.02, 0, 'y'),
    b.createTorusMesh(0.045, 0.006, 12, 6, 0, -0.02, 0, 'y')
  ])
  addMesh(b, 'tank', m.darkIron, [
    b.createCylinderMesh(0.05, 0.05, 0.18, 12, 0, -0.22, 0, 'y')
  ])
  addMesh(b, 'flame', m.glowOrange, [
    b.createConeMesh(0.05, 0.16, 12, 0, 0.85, 0, 'y'),
    b.createSphereMesh(0.025, 8, 10, 0, 0.82, 0)
  ])
}

// 7. Hombrera Blindada Mad Max con Púas (Hombro Izquierdo - AAPT_LEFT_SHOULDER)
function buildSpikedShoulder(b, m) {
  addMesh(b, 'cup', m.darkIron, [
    b.createCylinderMesh(0.13, 0.15, 0.2, 16, 0, 0.05, 0, 'y', true, false),
    b.createTorusMesh(0.14, 0.008, 16, 6, 0, 0.05, 0, 'y')
  ])
  addMesh(b, 'rim', m.brass, [
    b.createBoxMesh(0.22, 0.03, 0.22, 0, 0.14, 0)
  ])
  addMesh(b, 'spikes', m.darkIron, [
    b.createConeMesh(0.02, 0.1, 8, -0.06, 0.2, 0, 'y'),
    b.createConeMesh(0.02, 0.1, 8, 0.06, 0.2, 0, 'y'),
    b.createConeMesh(0.02, 0.08, 8, 0, 0.2, -0.05, 'y')
  ])
  addMesh(b, 'glow', m.glowOrange, [
    b.createSphereMesh(0.018, 8, 10, -0.06, 0.25, 0),
    b.createSphereMesh(0.018, 8, 10, 0.06, 0.25, 0)
  ])
}

// 8. Corona / Diadema de Cristal de Éter (Cabeza - AAPT_HEAD)
function buildAetherCrown(b, m) {
  addMesh(b, 'band', m.brass, [
    b.createCylinderMesh(0.15, 0.15, 0.035, 20, 0, 0.1, 0, 'y', false, false)
  ])
  addMesh(b, 'crystals', m.glowViolet, [
    b.createOctahedronMesh(0.06, 0, 0.16, 0.13),
    b.createOctahedronMesh(0.045, -0.08, 0.14, 0.11),
    b.createOctahedronMesh(0.045, 0.08, 0.14, 0.11),
    b.createOctahedronMesh(0.035, -0.13, 0.13, 0.06),
    b.createOctahedronMesh(0.035, 0.13, 0.13, 0.06)
  ])
  addMesh(b, 'mounts', m.brass, [
    b.createCylinderMesh(0.015, 0.015, 0.05, 8, 0, 0.13, 0.13, 'y'),
    b.createCylinderMesh(0.015, 0.015, 0.05, 8, -0.08, 0.13, 0.11, 'y'),
    b.createCylinderMesh(0.015, 0.015, 0.05, 8, 0.08, 0.13, 0.11, 'y')
  ])
}

// 9. Monóculo de Latón (Cabeza - AAPT_HEAD)
function buildMonocle(b, m) {
  addMesh(b, 'rim', m.brass, [
    b.createTorusMesh(0.045, 0.007, 18, 8, 0.03, 0.02, 0.13, 'z'),
    b.createCylinderMesh(0.01, 0.01, 0.05, 8, 0.03, 0.02, 0.16, 'y')
  ])
  addMesh(b, 'lens', m.glowCyan, [
    b.createCylinderMesh(0.04, 0.04, 0.012, 18, 0.03, 0.02, 0.13, 'z')
  ])
  addMesh(b, 'chain', m.brass, [
    b.createTorusMesh(0.008, 0.003, 8, 6, 0.0, 0.0, 0.13, 'y'),
    b.createTorusMesh(0.008, 0.003, 8, 6, 0.0, -0.03, 0.13, 'y'),
    b.createTorusMesh(0.008, 0.003, 8, 6, 0.0, -0.06, 0.13, 'y')
  ])
}

// 10. Sombrero de Copa a Vapor (Cabeza - AAPT_HEAD)
function buildTopHat(b, m) {
  addMesh(b, 'crown', m.leather, [
    b.createCylinderMesh(0.13, 0.13, 0.22, 18, 0, 0.18, 0, 'y'),
    b.createCylinderMesh(0.13, 0.13, 0.02, 18, 0, 0.3, 0, 'y', true, false)
  ])
  addMesh(b, 'brim', m.brass, [
    b.createCylinderMesh(0.22, 0.22, 0.03, 22, 0, 0.06, 0, 'y'),
    b.createTorusMesh(0.22, 0.006, 20, 6, 0, 0.06, 0, 'y')
  ])
  addMesh(b, 'band', m.copper, [
    b.createCylinderMesh(0.135, 0.135, 0.05, 18, 0, 0.09, 0, 'y', false, false)
  ])
  addMesh(b, 'gear', m.steel, [
    b.createGearMesh(0.05, 0.038, 0.015, 8, 0.13, 0.09, 0, 'z')
  ])
  addMesh(b, 'pipe', m.brass, [
    b.createCylinderMesh(0.018, 0.018, 0.12, 10, 0.09, 0.12, 0.05, 'y'),
    b.createTorusMesh(0.02, 0.006, 10, 6, 0.09, 0.19, 0.05, 'y')
  ])
  addMesh(b, 'glow', m.glowAmber, [
    b.createSphereMesh(0.016, 8, 10, 0.09, 0.2, 0.05)
  ])
}

// 11. Collarín de Engranajes (Cuello - AAPT_NECK)
function buildNeckCollar(b, m) {
  addMesh(b, 'collar', m.darkIron, [
    b.createTorusMesh(0.12, 0.025, 20, 10, 0, 0, 0, 'y')
  ])
  addMesh(b, 'ring', m.brass, [
    b.createTorusMesh(0.12, 0.01, 20, 8, 0, 0.02, 0, 'y')
  ])
  addMesh(b, 'gears', m.steel, [
    b.createGearMesh(0.028, 0.02, 0.012, 8, 0.09, 0.01, 0.08, 'y'),
    b.createGearMesh(0.02, 0.014, 0.01, 6, -0.09, 0.01, -0.05, 'y'),
    b.createGearMesh(0.02, 0.014, 0.01, 6, 0.03, 0.01, -0.11, 'y')
  ])
  addMesh(b, 'core', m.glowCyan, [
    b.createSphereMesh(0.012, 8, 10, 0.09, 0.01, 0.08)
  ])
}

// 12. Peto Blindado Remachado (Pecho - AAPT_SPINE1)
function buildChestArmor(b, m) {
  addMesh(b, 'plate', m.darkIron, [
    b.createBoxMesh(0.34, 0.44, 0.06, 0, 0.02, 0.1),
    b.createBoxMesh(0.2, 0.5, 0.08, 0, 0.02, 0.08)
  ])
  addMesh(b, 'chest_trim', m.brass, [
    b.createCylinderMesh(0.07, 0.07, 0.03, 16, 0, 0.16, 0.14, 'z'),
    b.createTorusMesh(0.07, 0.006, 16, 6, 0, 0.16, 0.155, 'z')
  ])
  addMesh(b, 'rivets', m.copper, [
    b.createSphereMesh(0.016, 6, 8, -0.14, 0.18, 0.13),
    b.createSphereMesh(0.016, 6, 8, 0.14, 0.18, 0.13),
    b.createSphereMesh(0.016, 6, 8, -0.14, -0.14, 0.13),
    b.createSphereMesh(0.016, 6, 8, 0.14, -0.14, 0.13),
    b.createSphereMesh(0.016, 6, 8, -0.05, 0.02, 0.14),
    b.createSphereMesh(0.016, 6, 8, 0.05, 0.02, 0.14)
  ])
  addMesh(b, 'straps', m.leather, [
    b.createBoxMesh(0.05, 0.3, 0.03, -0.2, 0.0, 0.06),
    b.createBoxMesh(0.05, 0.3, 0.03, 0.2, 0.0, 0.06)
  ])
  addMesh(b, 'core', m.glowViolet, [
    b.createSphereMesh(0.045, 8, 10, 0, 0.16, 0.16)
  ])
}

// 13. Cinturón de Herramientas (Cadera - AAPT_HIP)
function buildBeltPouch(b, m) {
  addMesh(b, 'belt', m.leather, [
    b.createTorusMesh(0.16, 0.025, 20, 10, 0, 0, 0, 'y')
  ])
  addMesh(b, 'buckle', m.brass, [
    b.createBoxMesh(0.05, 0.06, 0.03, 0, 0.02, 0.16),
    b.createGearMesh(0.022, 0.016, 0.012, 8, 0, 0.02, 0.18, 'z')
  ])
  addMesh(b, 'pouch_l', m.darkIron, [
    b.createBoxMesh(0.06, 0.09, 0.05, -0.17, -0.08, 0.02),
    b.createBoxMesh(0.07, 0.03, 0.06, -0.17, -0.05, 0.02)
  ])
  addMesh(b, 'pouch_r', m.darkIron, [
    b.createBoxMesh(0.06, 0.09, 0.05, 0.17, -0.08, 0.02),
    b.createBoxMesh(0.07, 0.03, 0.06, 0.17, -0.05, 0.02)
  ])
  addMesh(b, 'holster', m.copper, [
    b.createCylinderMesh(0.035, 0.035, 0.1, 12, -0.17, -0.02, 0.02, 'y')
  ])
  addMesh(b, 'glow', m.glowAmber, [
    b.createSphereMesh(0.012, 8, 10, -0.17, -0.08, 0.06),
    b.createSphereMesh(0.012, 8, 10, 0.17, -0.08, 0.06)
  ])
}

// 14/15. Guantelete Blindado (Antebrazo - AAPT_LEFT_FOREARM / AAPT_RIGHT_FOREARM)
function buildGauntlet(b, m, side) {
  addMesh(b, 'cuff', m.darkIron, [
    b.createCylinderMesh(0.06, 0.07, 0.14, 16, 0, 0, 0, 'y', false, false),
    b.createCylinderMesh(0.075, 0.06, 0.05, 16, 0, -0.09, 0, 'y', false, false)
  ])
  addMesh(b, 'plates', m.brass, [
    b.createBoxMesh(0.05, 0.1, 0.03, 0.04 * side, 0.06, 0.06),
    b.createBoxMesh(0.05, 0.1, 0.03, -0.04 * side, 0.06, 0.06),
    b.createTorusMesh(0.06, 0.006, 14, 6, 0, -0.05, 0, 'y')
  ])
  addMesh(b, 'knuckles', m.darkIron, [
    b.createSphereMesh(0.02, 8, 10, 0.02 * side, 0.12, 0.05),
    b.createSphereMesh(0.02, 8, 10, -0.02 * side, 0.12, 0.05),
    b.createSphereMesh(0.02, 8, 10, 0.0, 0.14, 0.04)
  ])
  addMesh(b, 'glow', m.glowCyan, [
    b.createCylinderMesh(0.015, 0.015, 0.08, 8, 0.04 * side, 0.02, 0.07, 'y')
  ])
}

// 16. Brazo Mecánico con Pistón (Brazo Izquierdo - AAPT_LEFT_ARM)
function buildMechanicalArm(b, m) {
  addMesh(b, 'upper', m.darkIron, [
    b.createCylinderMesh(0.07, 0.08, 0.3, 16, 0, 0.1, 0, 'y'),
    b.createCylinderMesh(0.09, 0.07, 0.05, 16, 0, 0.26, 0, 'y')
  ])
  addMesh(b, 'shoulder', m.brass, [
    b.createSphereMesh(0.08, 8, 12, 0, 0.28, 0),
    b.createTorusMesh(0.09, 0.008, 16, 6, 0, 0.28, 0, 'y')
  ])
  addMesh(b, 'elbow', m.brass, [
    b.createGearMesh(0.06, 0.045, 0.03, 8, 0, -0.08, 0, 'z'),
    b.createCylinderMesh(0.03, 0.03, 0.06, 12, 0, -0.08, 0, 'z')
  ])
  addMesh(b, 'piston', m.copper, [
    b.createCylinderMesh(0.02, 0.02, 0.18, 10, 0.06, 0.02, 0.03, 'y'),
    b.createCylinderMesh(0.026, 0.02, 0.06, 10, 0.06, -0.06, 0.03, 'y')
  ])
  addMesh(b, 'tubes', m.leather, [
    b.createCylinderMesh(0.014, 0.014, 0.2, 8, 0.04, 0.0, 0.05, 'y')
  ])
  addMesh(b, 'glow', m.glowOrange, [
    b.createCylinderMesh(0.012, 0.012, 0.16, 8, -0.04, 0.02, 0.05, 'y'),
    b.createSphereMesh(0.02, 8, 10, 0, -0.08, 0.04)
  ])
}

// 17. Cañón de Vapor al Hombro (Hombro Derecho - AAPT_RIGHT_SHOULDER)
function buildShoulderCannon(b, m) {
  addMesh(b, 'base', m.darkIron, [
    b.createCylinderMesh(0.09, 0.11, 0.12, 16, 0, 0.04, 0, 'y'),
    b.createTorusMesh(0.1, 0.008, 16, 6, 0, 0.04, 0, 'y')
  ])
  addMesh(b, 'pivot', m.brass, [
    b.createCylinderMesh(0.04, 0.04, 0.08, 12, 0, 0.12, 0, 'z')
  ])
  addMesh(b, 'barrel', m.brass, [
    b.createCylinderMesh(0.05, 0.06, 0.5, 14, 0, 0.14, 0.2, 'z'),
    b.createCylinderMesh(0.07, 0.05, 0.12, 14, 0, 0.14, 0.48, 'z'),
    b.createTorusMesh(0.055, 0.006, 14, 6, 0, 0.14, 0.35, 'z')
  ])
  addMesh(b, 'tank', m.copper, [
    b.createCylinderMesh(0.045, 0.045, 0.14, 12, 0, 0.0, -0.05, 'y')
  ])
  addMesh(b, 'muzzle', m.glowOrange, [
    b.createCylinderMesh(0.04, 0.04, 0.03, 12, 0, 0.14, 0.56, 'z'),
    b.createSphereMesh(0.035, 8, 10, 0, 0.14, 0.56)
  ])
}

// 18. Bota Blindada con Grebas (Pie Derecho - AAPT_RIGHT_FOOT)
function buildBootPlated(b, m) {
  addMesh(b, 'sole', m.darkIron, [
    b.createBoxMesh(0.1, 0.03, 0.24, 0, -0.13, 0.05),
    b.createBoxMesh(0.11, 0.02, 0.05, 0, -0.12, -0.09)
  ])
  addMesh(b, 'shin', m.darkIron, [
    b.createBoxMesh(0.09, 0.24, 0.04, 0, 0.0, 0.06)
  ])
  addMesh(b, 'toe', m.brass, [
    b.createBoxMesh(0.1, 0.06, 0.07, 0, -0.1, 0.18),
    b.createSphereMesh(0.03, 8, 10, 0, -0.11, 0.2)
  ])
  addMesh(b, 'straps', m.leather, [
    b.createBoxMesh(0.05, 0.04, 0.2, 0, 0.14, 0.03),
    b.createBoxMesh(0.05, 0.04, 0.2, 0, 0.0, 0.03)
  ])
  addMesh(b, 'rivets', m.copper, [
    b.createSphereMesh(0.013, 6, 8, -0.03, 0.18, 0.08),
    b.createSphereMesh(0.013, 6, 8, 0.03, 0.18, 0.08),
    b.createSphereMesh(0.013, 6, 8, -0.03, -0.02, 0.08),
    b.createSphereMesh(0.013, 6, 8, 0.03, -0.02, 0.08)
  ])
  addMesh(b, 'glow', m.glowAmber, [
    b.createCylinderMesh(0.012, 0.012, 0.12, 8, 0, 0.04, 0.1, 'y')
  ])
}

// ---------------------------------------------------------------------------
// CATÁLOGO MAESTRO DE LOS 18 WEARABLES
// ---------------------------------------------------------------------------
const wearablesList = [
  { id: 'goggles_steampunk', name: 'Gafas de Aviador Steampunk', anchor: 'AAPT_HEAD', category: 'eyewear', build: (b, m) => buildGoggles(b, m) },
  { id: 'welding_mask', name: 'Máscara de Soldar Mad Max', anchor: 'AAPT_HEAD', category: 'mask', build: (b, m) => buildWeldingMask(b, m) },
  { id: 'steam_backpack', name: 'Mochila de Caldera de Vapor', anchor: 'AAPT_SPINE2', category: 'back', build: (b, m) => buildSteamBackpack(b, m) },
  { id: 'tesla_backpack', name: 'Generador Galvánico Tesla', anchor: 'AAPT_SPINE2', category: 'back', build: (b, m) => buildTeslaBackpack(b, m) },
  { id: 'wrench_heavy', name: 'Llave Mecatrónica Gigante', anchor: 'AAPT_RIGHT_HAND', category: 'hand', build: (b, m) => buildHeavyWrench(b, m) },
  { id: 'flamethrower_pipe', name: 'Antorcha de Vapor Industrial', anchor: 'AAPT_RIGHT_HAND', category: 'hand', build: (b, m) => buildFlamethrower(b, m) },
  { id: 'shoulder_pad_spiked', name: 'Hombrera Blindada con Púas', anchor: 'AAPT_LEFT_SHOULDER', category: 'shoulder', build: (b, m) => buildSpikedShoulder(b, m) },
  { id: 'aether_crown', name: 'Corona de Cristal de Éter', anchor: 'AAPT_HEAD', category: 'tiara', build: (b, m) => buildAetherCrown(b, m) },
  { id: 'monocle_brass', name: 'Monóculo de Latón', anchor: 'AAPT_HEAD', category: 'eyewear', build: (b, m) => buildMonocle(b, m) },
  { id: 'top_hat_steam', name: 'Sombrero de Copa a Vapor', anchor: 'AAPT_HEAD', category: 'hat', build: (b, m) => buildTopHat(b, m) },
  { id: 'neck_cog_collar', name: 'Collarín de Engranajes', anchor: 'AAPT_NECK', category: 'neck', build: (b, m) => buildNeckCollar(b, m) },
  { id: 'chest_armor_plate', name: 'Peto Blindado Remachado', anchor: 'AAPT_SPINE1', category: 'chest', build: (b, m) => buildChestArmor(b, m) },
  { id: 'belt_utility_pouch', name: 'Cinturón de Herramientas', anchor: 'AAPT_HIP', category: 'hip', build: (b, m) => buildBeltPouch(b, m) },
  { id: 'gauntlet_left', name: 'Guantelete Blindado Izquierdo', anchor: 'AAPT_LEFT_FOREARM', category: 'handwear', build: (b, m) => buildGauntlet(b, m, 1) },
  { id: 'gauntlet_right', name: 'Guantelete Blindado Derecho', anchor: 'AAPT_RIGHT_FOREARM', category: 'handwear', build: (b, m) => buildGauntlet(b, m, -1) },
  { id: 'mechanical_arm_left', name: 'Brazo Mecánico con Pistón', anchor: 'AAPT_LEFT_ARM', category: 'arm', build: (b, m) => buildMechanicalArm(b, m) },
  { id: 'shoulder_cannon', name: 'Cañón de Vapor al Hombro', anchor: 'AAPT_RIGHT_SHOULDER', category: 'shoulder', build: (b, m) => buildShoulderCannon(b, m) },
  { id: 'boot_plated_right', name: 'Bota Blindada con Grebas', anchor: 'AAPT_RIGHT_FOOT', category: 'feet', build: (b, m) => buildBootPlated(b, m) }
]

console.log(`🔨 Generando ${wearablesList.length} accesorios 3D GLB equipables en assets/wearables/...`)
console.log('   (librería compartida scripts/lib/glbBuilder.js · mallas cerradas · sin luces dinámicas)\n')

const summary = []

wearablesList.forEach(item => {
  const b = new GlbBuilder()
  const m = createPalette(b)
  item.build(b, m)
  const tris = countTriangles(b)
  const buffer = b.buildGlbBuffer()

  const filePath = path.join(outputDir, `${item.id}.glb`)
  fs.writeFileSync(filePath, buffer)

  summary.push({ id: item.id, tris, kb: (buffer.length / 1024).toFixed(1), anchor: item.anchor })
  console.log(`  ✓ ${item.id}.glb  ·  ${tris} tris  ·  ${(buffer.length / 1024).toFixed(1)} KB  ·  ${item.anchor}`)
})

console.log('\n📊 Resumen de presupuesto de triángulos (límites oficiales: ≤500 accesorios, ≤1000 mano, ≤1500 piezas):')
const overBudget = summary.filter(s => s.tris > 1500)
if (overBudget.length === 0) {
  console.log('  ✅ Todos los wearables dentro del presupuesto máximo (≤1500 tris).')
} else {
  overBudget.forEach(s => console.log(`  ⚠️  ${s.id}: ${s.tris} tris (excede 1500)`))
}

console.log(`\n🎉 ¡Se generaron ${wearablesList.length} accesorios 3D exitosamente en assets/wearables/!`)
