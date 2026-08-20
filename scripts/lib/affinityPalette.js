/**
 * ============================================================================
 * affinityPalette — Esquema de color por afinidad elemental (5 clases)
 * ============================================================================
 * Coincide con AGENTS.md y con `getAffinityTextColor` en
 * `src/objects/golemFactory.ts`. Cada afinidad define 3 materiales:
 *   body   → color de clase metálico (dominante)
 *   detail → mismo tono oscurecido (×0.45), más rugoso
 *   glow   → color de clase emisivo (solo en acentos/núcleo, antisaturación)
 */

const AFFINITY_CLASS_COLORS = {
  steam: { hex: '#FF7000', rgb: [1.0, 0.44, 0.0] },        // Naranja fuego / vapor
  galvanic: { hex: '#00E5FF', rgb: [0.0, 0.9, 1.0] },      // Cian eléctrico
  mechanical: { hex: '#FFBF00', rgb: [1.0, 0.75, 0.0] },   // Ámbar dorado engranaje
  luminous: { hex: '#FFFF33', rgb: [1.0, 1.0, 0.2] },      // Luz solar amarilla
  aether: { hex: '#B833FF', rgb: [0.72, 0.2, 1.0] }        // Violeta amatista
}

/**
 * Devuelve la paleta de 3 materiales PBR para una afinidad.
 * @param {string} affinity Clave de afinidad ('steam', 'galvanic', ...)
 */
function getAffinityPalette(affinity) {
  const c = AFFINITY_CLASS_COLORS[affinity] || AFFINITY_CLASS_COLORS.steam
  const [r, g, b] = c.rgb

  return {
    key: affinity,
    hex: c.hex,
    materials: {
      body: {
        name: `${affinity}_Class_Body`,
        baseColor: [r, g, b, 1.0],
        roughness: 0.42,
        metallic: 0.8,
        emissive: [0, 0, 0]
      },
      detail: {
        name: `${affinity}_Class_Detail`,
        baseColor: [r * 0.45, g * 0.45, b * 0.45, 1.0],
        roughness: 0.6,
        metallic: 0.85,
        emissive: [0, 0, 0]
      },
      glow: {
        name: `${affinity}_Class_Glow`,
        baseColor: [r, g, b, 1.0],
        roughness: 0.2,
        metallic: 0.1,
        emissive: [r, g, b]
      }
    }
  }
}

const AFFINITY_KEYS = Object.keys(AFFINITY_CLASS_COLORS)

module.exports = { AFFINITY_CLASS_COLORS, AFFINITY_KEYS, getAffinityPalette }
