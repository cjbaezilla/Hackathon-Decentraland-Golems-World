const fs = require('fs')
const path = require('path')

/**
 * ============================================================================
 * GENERADOR PROCEDURAL DE MODELOS 3D GLB (.glb) DE ÍTEMS COLECCIONABLES (46 ÍTEMS)
 * ============================================================================
 * Genera los 46 materiales coleccionables del GDD de Golems en formato glTF 2.0
 * binario autocompreso (.glb) sin dependencias externas.
 *
 * Organiza los modelos en subcarpetas según su nivel de rareza:
 *   - assets/items/common/     (14 ítems)
 *   - assets/items/uncommon/   (11 ítems)
 *   - assets/items/rare/       (10 ítems)
 *   - assets/items/epic/       (7 ítems)
 *   - assets/items/legendary/  (4 ítems)
 *
 * Aplica colores PBR y canales emisivos característicos por rareza:
 *   - Común: Gris Metálico / Latón Industrial (#A0A0A0)
 *   - Poco Común: Verde Neón (#00FF44)
 *   - Raro: Azul Galvánico / Eléctrico (#00D4FF)
 *   - Épico: Violeta Éter (#C038FF)
 *   - Legendario: Dorado Incandescente (#FFAA00)
 */

class GlbBuilder {
  constructor() {
    this.json = {
      asset: { version: '2.0', generator: 'GolemsItemsProceduralGlbGenerator_v2' },
      scenes: [{ nodes: [0] }],
      scene: 0,
      nodes: [{ name: 'Root', children: [] }],
      materials: [],
      meshes: [],
      accessors: [],
      bufferViews: [],
      buffers: [{ byteLength: 0 }]
    }
    this.bufferChunks = []
    this.totalBufferLength = 0
  }

  addBufferData(buffer, target = undefined) {
    const padLength = (4 - (buffer.length % 4)) % 4
    let alignedBuffer = buffer
    if (padLength > 0) {
      alignedBuffer = Buffer.concat([buffer, Buffer.alloc(padLength)])
    }

    const byteOffset = this.totalBufferLength
    const byteLength = buffer.length

    this.bufferChunks.push(alignedBuffer)
    this.totalBufferLength += alignedBuffer.length
    this.json.buffers[0].byteLength = this.totalBufferLength

    const bufferViewIndex = this.json.bufferViews.length
    const bufferView = {
      buffer: 0,
      byteOffset,
      byteLength
    }
    if (target) {
      bufferView.target = target
    }
    this.json.bufferViews.push(bufferView)
    return bufferViewIndex
  }

  addMaterial({ name, baseColor = [0.8, 0.8, 0.8, 1.0], roughness = 0.5, metallic = 0.5, emissive = [0, 0, 0] }) {
    const matIndex = this.json.materials.length
    this.json.materials.push({
      name,
      pbrMetallicRoughness: {
        baseColorFactor: baseColor,
        roughnessFactor: roughness,
        metallicFactor: metallic
      },
      emissiveFactor: emissive
    })
    return matIndex
  }

  createBoxMesh(width, height, depth, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const hw = width / 2
    const hh = height / 2
    const hd = depth / 2

    const positions = []
    const normals = []
    const indices = []

    const faces = [
      { norm: [0, 0, 1], v: [[-hw, -hh, hd], [hw, -hh, hd], [hw, hh, hd], [-hw, hh, hd]] },
      { norm: [0, 0, -1], v: [[hw, -hh, -hd], [-hw, -hh, -hd], [-hw, hh, -hd], [hw, hh, -hd]] },
      { norm: [0, 1, 0], v: [[-hw, hh, hd], [hw, hh, hd], [hw, hh, -hd], [-hw, hh, -hd]] },
      { norm: [0, -1, 0], v: [[-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd]] },
      { norm: [1, 0, 0], v: [[hw, -hh, hd], [hw, -hh, -hd], [hw, hh, -hd], [hw, hh, hd]] },
      { norm: [-1, 0, 0], v: [[-hw, -hh, -hd], [-hw, -hh, hd], [-hw, hh, hd], [-hw, -hh, -hd]] }
    ]

    let vOffset = 0
    for (const f of faces) {
      for (const p of f.v) {
        positions.push(p[0] + offsetX, p[1] + offsetY, p[2] + offsetZ)
        normals.push(...f.norm)
      }
      indices.push(vOffset, vOffset + 1, vOffset + 2, vOffset, vOffset + 2, vOffset + 3)
      vOffset += 4
    }

    return { positions, normals, indices }
  }

  createCylinderMesh(radius, height, segments = 12, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const hh = height / 2
    const positions = []
    const normals = []
    const indices = []

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const nx = Math.cos(angle)
      const nz = Math.sin(angle)

      positions.push(x + offsetX, hh + offsetY, z + offsetZ)
      normals.push(nx, 0, nz)

      positions.push(x + offsetX, -hh + offsetY, z + offsetZ)
      normals.push(nx, 0, nz)
    }

    for (let i = 0; i < segments; i++) {
      const i1 = i * 2
      const i2 = i * 2 + 1
      const i3 = (i + 1) * 2
      const i4 = (i + 1) * 2 + 1

      indices.push(i1, i3, i2)
      indices.push(i2, i3, i4)
    }

    return { positions, normals, indices }
  }

  createOctahedronMesh(size, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const hs = size / 2
    const positions = [
      0 + offsetX, hs + offsetY, 0 + offsetZ,     // 0 Top
      -hs + offsetX, 0 + offsetY, 0 + offsetZ,    // 1 Left
      0 + offsetX, 0 + offsetY, hs + offsetZ,     // 2 Front
      hs + offsetX, 0 + offsetY, 0 + offsetZ,     // 3 Right
      0 + offsetX, 0 + offsetY, -hs + offsetZ,    // 4 Back
      0 + offsetX, -hs + offsetY, 0 + offsetZ     // 5 Bottom
    ]

    const normals = [
      0, 1, 0,
      -1, 0, 0,
      0, 0, 1,
      1, 0, 0,
      0, 0, -1,
      0, -1, 0
    ]

    const indices = [
      0, 1, 2,  0, 2, 3,  0, 3, 4,  0, 4, 1,
      5, 2, 1,  5, 3, 2,  5, 4, 3,  5, 1, 4
    ]

    return { positions, normals, indices }
  }

  combineGeometries(geomList) {
    const positions = []
    const normals = []
    const indices = []
    let vertexCount = 0

    for (const g of geomList) {
      if (!g || !g.positions) continue
      positions.push(...g.positions)
      normals.push(...g.normals)
      for (const idx of g.indices) {
        indices.push(idx + vertexCount)
      }
      vertexCount += g.positions.length / 3
    }

    return { positions, normals, indices }
  }

  addMeshNode(name, combinedGeom, materialIndex) {
    if (!combinedGeom || combinedGeom.positions.length === 0) return -1

    const posBuffer = Buffer.alloc(combinedGeom.positions.length * 4)
    let minX = Infinity, minY = Infinity, minZ = Infinity
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

    for (let i = 0; i < combinedGeom.positions.length; i += 3) {
      const x = combinedGeom.positions[i]
      const y = combinedGeom.positions[i + 1]
      const z = combinedGeom.positions[i + 2]

      if (x < minX) minX = x
      if (y < minY) minY = y
      if (z < minZ) minZ = z
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
      if (z > maxZ) maxZ = z

      posBuffer.writeFloatLE(x, i * 4)
      posBuffer.writeFloatLE(y, (i + 1) * 4)
      posBuffer.writeFloatLE(z, (i + 2) * 4)
    }

    const normBuffer = Buffer.alloc(combinedGeom.normals.length * 4)
    for (let i = 0; i < combinedGeom.normals.length; i++) {
      normBuffer.writeFloatLE(combinedGeom.normals[i], i * 4)
    }

    const indBuffer = Buffer.alloc(combinedGeom.indices.length * 2)
    for (let i = 0; i < combinedGeom.indices.length; i++) {
      indBuffer.writeUInt16LE(combinedGeom.indices[i], i * 2)
    }

    const posView = this.addBufferData(posBuffer, 34962)
    const normView = this.addBufferData(normBuffer, 34962)
    const indView = this.addBufferData(indBuffer, 34963)

    const posAcc = this.json.accessors.length
    this.json.accessors.push({
      bufferView: posView,
      byteOffset: 0,
      componentType: 5126,
      count: combinedGeom.positions.length / 3,
      type: 'VEC3',
      max: [maxX, maxY, maxZ],
      min: [minX, minY, minZ]
    })

    const normAcc = this.json.accessors.length
    this.json.accessors.push({
      bufferView: normView,
      byteOffset: 0,
      componentType: 5126,
      count: combinedGeom.normals.length / 3,
      type: 'VEC3'
    })

    const indAcc = this.json.accessors.length
    this.json.accessors.push({
      bufferView: indView,
      byteOffset: 0,
      componentType: 5123,
      count: combinedGeom.indices.length,
      type: 'SCALAR'
    })

    const meshIndex = this.json.meshes.length
    this.json.meshes.push({
      name: `${name}_Mesh`,
      primitives: [{
        attributes: {
          POSITION: posAcc,
          NORMAL: normAcc
        },
        indices: indAcc,
        material: materialIndex,
        mode: 4
      }]
    })

    const nodeIndex = this.json.nodes.length
    this.json.nodes.push({
      name,
      mesh: meshIndex
    })
    this.json.nodes[0].children.push(nodeIndex)

    return nodeIndex
  }

  buildGlbBuffer() {
    const jsonString = JSON.stringify(this.json)
    const jsonBuffer = Buffer.from(jsonString, 'utf8')
    const jsonPad = (4 - (jsonBuffer.length % 4)) % 4
    const paddedJsonBuffer = jsonPad > 0 ? Buffer.concat([jsonBuffer, Buffer.alloc(jsonPad, 0x20)]) : jsonBuffer

    const binBuffer = Buffer.concat(this.bufferChunks)
    const binPad = (4 - (binBuffer.length % 4)) % 4
    const paddedBinBuffer = binPad > 0 ? Buffer.concat([binBuffer, Buffer.alloc(binPad, 0x00)]) : binBuffer

    const totalLength = 12 + 8 + paddedJsonBuffer.length + 8 + paddedBinBuffer.length

    const header = Buffer.alloc(12)
    header.writeUInt32LE(0x46546C67, 0)
    header.writeUInt32LE(2, 4)
    header.writeUInt32LE(totalLength, 8)

    const jsonChunkHeader = Buffer.alloc(8)
    jsonChunkHeader.writeUInt32LE(paddedJsonBuffer.length, 0)
    jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4)

    const binChunkHeader = Buffer.alloc(8)
    binChunkHeader.writeUInt32LE(paddedBinBuffer.length, 0)
    binChunkHeader.writeUInt32LE(0x004E4942, 4)

    return Buffer.concat([
      header,
      jsonChunkHeader,
      paddedJsonBuffer,
      binChunkHeader,
      paddedBinBuffer
    ])
  }
}

// ============================================================================
// PALETA DE COLORES Y PROPIEDADES PBR POR RAREZA
// ============================================================================

const RARITY_COLORS = {
  common: {
    base: [0.65, 0.65, 0.70, 1.0],
    accent: [0.72, 0.45, 0.20, 1.0],
    emissive: [0.15, 0.15, 0.15],
    roughness: 0.6,
    metallic: 0.7
  },
  uncommon: {
    base: [0.25, 0.35, 0.28, 1.0],
    accent: [0.0, 0.9, 0.3, 1.0],
    emissive: [0.0, 1.0, 0.27],
    roughness: 0.3,
    metallic: 0.5
  },
  rare: {
    base: [0.2, 0.3, 0.45, 1.0],
    accent: [0.0, 0.75, 1.0, 1.0],
    emissive: [0.0, 0.83, 1.0],
    roughness: 0.2,
    metallic: 0.8
  },
  epic: {
    base: [0.35, 0.2, 0.45, 1.0],
    accent: [0.75, 0.25, 1.0, 1.0],
    emissive: [0.75, 0.22, 1.0],
    roughness: 0.15,
    metallic: 0.6
  },
  legendary: {
    base: [0.55, 0.4, 0.15, 1.0],
    accent: [1.0, 0.75, 0.0, 1.0],
    emissive: [1.0, 0.67, 0.0],
    roughness: 0.1,
    metallic: 0.9
  }
}

// ============================================================================
// GENERADORES ESPECÍFICOS DE LOS 46 MODELOS DE ÍTEMS
// ============================================================================

function createItemGlb(itemId, rarity) {
  const glb = new GlbBuilder()
  const rColor = RARITY_COLORS[rarity] || RARITY_COLORS.common

  const matBase = glb.addMaterial({
    name: `${itemId}_BaseMat`,
    baseColor: rColor.base,
    roughness: rColor.roughness,
    metallic: rColor.metallic
  })

  const matAccent = glb.addMaterial({
    name: `${itemId}_AccentMat`,
    baseColor: rColor.accent,
    roughness: 0.3,
    metallic: 0.8
  })

  const matGlow = glb.addMaterial({
    name: `${itemId}_EmissiveMat`,
    baseColor: rColor.accent,
    roughness: 0.1,
    metallic: 0.0,
    emissive: rColor.emissive
  })

  const baseGeoms = []
  const accentGeoms = []
  const glowGeoms = []

  switch (itemId) {
    // ------------------------------------------------------------------------
    // COMUNES (14 Ítems)
    // ------------------------------------------------------------------------
    case 'alambre_cobre':
      baseGeoms.push(
        glb.createCylinderMesh(0.18, 0.08, 12, 0, 0.1, 0),
        glb.createCylinderMesh(0.14, 0.12, 12, 0, 0.1, 0)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.02, 0.3, 8, 0.1, 0.2, 0.1),
        glb.createCylinderMesh(0.02, 0.25, 8, -0.1, 0.2, -0.1)
      )
      glowGeoms.push(glb.createBoxMesh(0.04, 0.04, 0.04, 0, 0.22, 0))
      break

    case 'tornillos_pernos':
      baseGeoms.push(
        glb.createCylinderMesh(0.08, 0.05, 6, -0.06, 0.05, 0),
        glb.createCylinderMesh(0.08, 0.05, 6, 0.06, 0.05, 0.04),
        glb.createCylinderMesh(0.08, 0.05, 6, 0, 0.05, -0.06)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.03, 0.25, 8, -0.06, 0.15, 0),
        glb.createCylinderMesh(0.03, 0.25, 8, 0.06, 0.15, 0.04),
        glb.createCylinderMesh(0.03, 0.25, 8, 0, 0.15, -0.06)
      )
      glowGeoms.push(glb.createBoxMesh(0.03, 0.03, 0.03, 0, 0.26, 0))
      break

    case 'engranajes_desgastados':
      baseGeoms.push(glb.createCylinderMesh(0.25, 0.06, 12, 0, 0.1, 0))
      for (let i = 0; i < 8; i++) {
        if (i % 3 === 0) continue
        const angle = (i / 8) * Math.PI * 2
        accentGeoms.push(glb.createBoxMesh(0.06, 0.06, 0.06, Math.cos(angle) * 0.26, 0.1, Math.sin(angle) * 0.26))
      }
      glowGeoms.push(glb.createCylinderMesh(0.08, 0.07, 8, 0, 0.1, 0))
      break

    case 'tubos_cobre':
      baseGeoms.push(
        glb.createCylinderMesh(0.05, 0.45, 10, -0.08, 0.22, 0),
        glb.createCylinderMesh(0.05, 0.45, 10, 0.08, 0.22, 0)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.07, 0.04, 10, -0.08, 0.35, 0),
        glb.createCylinderMesh(0.07, 0.04, 10, 0.08, 0.35, 0),
        glb.createBoxMesh(0.22, 0.04, 0.08, 0, 0.22, 0)
      )
      glowGeoms.push(glb.createBoxMesh(0.06, 0.06, 0.06, 0, 0.22, 0))
      break

    case 'sartenes':
      baseGeoms.push(glb.createCylinderMesh(0.22, 0.06, 14, 0, 0.05, 0))
      accentGeoms.push(glb.createBoxMesh(0.06, 0.03, 0.3, 0, 0.07, 0.25))
      glowGeoms.push(glb.createCylinderMesh(0.18, 0.02, 10, 0, 0.06, 0))
      break

    case 'ollas_cocinar':
      baseGeoms.push(glb.createCylinderMesh(0.2, 0.22, 12, 0, 0.12, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.22, 0.03, 12, 0, 0.2, 0),
        glb.createBoxMesh(0.08, 0.04, 0.04, -0.22, 0.15, 0),
        glb.createBoxMesh(0.08, 0.04, 0.04, 0.22, 0.15, 0)
      )
      glowGeoms.push(glb.createCylinderMesh(0.19, 0.02, 10, 0, 0.22, 0))
      break

    case 'placas_laton':
      baseGeoms.push(
        glb.createBoxMesh(0.3, 0.04, 0.3, 0, 0.05, 0),
        glb.createBoxMesh(0.26, 0.04, 0.26, 0, 0.08, 0)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.02, 0.06, 6, -0.12, 0.07, -0.12),
        glb.createCylinderMesh(0.02, 0.06, 6, 0.12, 0.07, -0.12),
        glb.createCylinderMesh(0.02, 0.06, 6, -0.12, 0.07, 0.12),
        glb.createCylinderMesh(0.02, 0.06, 6, 0.12, 0.07, 0.12)
      )
      glowGeoms.push(glb.createBoxMesh(0.08, 0.02, 0.08, 0, 0.1, 0))
      break

    case 'clavos_oxidados':
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 0.05
        baseGeoms.push(glb.createCylinderMesh(0.015, 0.2, 6, offset, 0.1, 0))
        accentGeoms.push(glb.createCylinderMesh(0.035, 0.02, 6, offset, 0.19, 0))
      }
      glowGeoms.push(glb.createBoxMesh(0.04, 0.04, 0.04, 0, 0.22, 0))
      break

    case 'latas_conserva':
      baseGeoms.push(
        glb.createCylinderMesh(0.1, 0.18, 10, -0.06, 0.09, 0),
        glb.createCylinderMesh(0.09, 0.16, 10, 0.06, 0.08, 0.04)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.105, 0.02, 10, -0.06, 0.17, 0),
        glb.createCylinderMesh(0.095, 0.02, 10, 0.06, 0.15, 0.04)
      )
      glowGeoms.push(glb.createOctahedronMesh(0.05, 0, 0.2, 0))
      break

    case 'cadenas_hierro':
      for (let i = 0; i < 4; i++) {
        const y = i * 0.08 + 0.05
        baseGeoms.push(glb.createCylinderMesh(0.06, 0.07, 8, 0, y, 0))
        accentGeoms.push(glb.createCylinderMesh(0.04, 0.08, 8, 0, y, 0))
      }
      glowGeoms.push(glb.createBoxMesh(0.05, 0.05, 0.05, 0, 0.32, 0))
      break

    case 'tuercas_gigantes':
      baseGeoms.push(
        glb.createCylinderMesh(0.18, 0.08, 6, 0, 0.05, 0),
        glb.createCylinderMesh(0.14, 0.1, 6, 0, 0.13, 0)
      )
      accentGeoms.push(glb.createCylinderMesh(0.1, 0.12, 12, 0, 0.09, 0))
      glowGeoms.push(glb.createOctahedronMesh(0.07, 0, 0.2, 0))
      break

    case 'tapas_alcantarilla':
      baseGeoms.push(glb.createCylinderMesh(0.3, 0.04, 16, 0, 0.03, 0))
      accentGeoms.push(
        glb.createBoxMesh(0.55, 0.02, 0.04, 0, 0.05, 0),
        glb.createBoxMesh(0.04, 0.02, 0.55, 0, 0.05, 0)
      )
      glowGeoms.push(glb.createOctahedronMesh(0.08, 0, 0.07, 0))
      break

    case 'cables_deshilachados':
      baseGeoms.push(glb.createCylinderMesh(0.04, 0.4, 8, 0, 0.2, 0))
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2
        accentGeoms.push(glb.createCylinderMesh(0.015, 0.15, 6, Math.cos(angle) * 0.04, 0.38, Math.sin(angle) * 0.04))
      }
      glowGeoms.push(glb.createBoxMesh(0.05, 0.05, 0.05, 0, 0.44, 0))
      break

    case 'residuos_carbon':
      baseGeoms.push(
        glb.createOctahedronMesh(0.18, -0.06, 0.08, 0),
        glb.createOctahedronMesh(0.14, 0.06, 0.07, 0.04),
        glb.createOctahedronMesh(0.12, 0, 0.12, -0.05)
      )
      accentGeoms.push(glb.createBoxMesh(0.05, 0.05, 0.05, 0, 0.15, 0))
      glowGeoms.push(glb.createOctahedronMesh(0.06, 0, 0.18, 0))
      break

    // ------------------------------------------------------------------------
    // POCO COMUNES (11 Ítems - Verde)
    // ------------------------------------------------------------------------
    case 'transistores':
      baseGeoms.push(glb.createBoxMesh(0.28, 0.06, 0.18, 0, 0.05, 0))
      for (let i = -2; i <= 2; i++) {
        accentGeoms.push(
          glb.createCylinderMesh(0.03, 0.16, 8, i * 0.05, 0.14, 0),
          glb.createCylinderMesh(0.01, 0.08, 6, i * 0.05, 0.01, 0.1)
        )
      }
      glowGeoms.push(glb.createBoxMesh(0.24, 0.04, 0.06, 0, 0.07, 0))
      break

    case 'bombillas_filamento':
      baseGeoms.push(glb.createCylinderMesh(0.08, 0.1, 10, 0, 0.06, 0))
      accentGeoms.push(glb.createCylinderMesh(0.14, 0.18, 12, 0, 0.2, 0))
      glowGeoms.push(
        glb.createCylinderMesh(0.02, 0.1, 6, 0, 0.2, 0),
        glb.createOctahedronMesh(0.06, 0, 0.2, 0)
      )
      break

    case 'resortes_reloj':
      baseGeoms.push(glb.createCylinderMesh(0.2, 0.04, 12, 0, 0.05, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.15, 0.05, 12, 0, 0.09, 0),
        glb.createCylinderMesh(0.1, 0.06, 12, 0, 0.13, 0)
      )
      glowGeoms.push(glb.createOctahedronMesh(0.08, 0, 0.16, 0))
      break

    case 'manometros':
      baseGeoms.push(
        glb.createCylinderMesh(0.2, 0.08, 12, 0, 0.15, 0),
        glb.createCylinderMesh(0.04, 0.12, 8, 0, 0.06, 0)
      )
      accentGeoms.push(glb.createCylinderMesh(0.22, 0.02, 12, 0, 0.18, 0))
      glowGeoms.push(
        glb.createCylinderMesh(0.16, 0.01, 10, 0, 0.19, 0),
        glb.createBoxMesh(0.14, 0.02, 0.02, 0.04, 0.2, 0)
      )
      break

    case 'valvulas_vapor':
      baseGeoms.push(
        glb.createCylinderMesh(0.06, 0.35, 10, 0, 0.18, 0),
        glb.createCylinderMesh(0.06, 0.2, 10, 0, 0.18, 0)
      )
      accentGeoms.push(glb.createCylinderMesh(0.18, 0.04, 10, 0, 0.36, 0))
      glowGeoms.push(glb.createCylinderMesh(0.08, 0.05, 8, 0, 0.18, 0))
      break

    case 'lentes_tv_viejo':
      baseGeoms.push(glb.createBoxMesh(0.3, 0.22, 0.06, 0, 0.15, 0))
      accentGeoms.push(glb.createCylinderMesh(0.12, 0.08, 12, 0, 0.15, 0))
      glowGeoms.push(glb.createCylinderMesh(0.1, 0.09, 12, 0, 0.15, 0.01))
      break

    case 'fusibles_fundidos':
      baseGeoms.push(glb.createCylinderMesh(0.06, 0.25, 10, 0, 0.14, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.07, 0.04, 10, 0, 0.26, 0),
        glb.createCylinderMesh(0.07, 0.04, 10, 0, 0.02, 0)
      )
      glowGeoms.push(glb.createOctahedronMesh(0.08, 0, 0.14, 0))
      break

    case 'relojes_bolsillo':
      baseGeoms.push(glb.createCylinderMesh(0.16, 0.04, 12, 0, 0.05, 0))
      accentGeoms.push(glb.createCylinderMesh(0.03, 0.04, 8, 0, 0.05, 0.18))
      glowGeoms.push(
        glb.createCylinderMesh(0.13, 0.01, 10, 0, 0.07, 0),
        glb.createBoxMesh(0.1, 0.01, 0.01, 0.02, 0.08, 0)
      )
      break

    case 'brujulas_magneticas':
      baseGeoms.push(glb.createCylinderMesh(0.18, 0.05, 12, 0, 0.05, 0))
      accentGeoms.push(glb.createCylinderMesh(0.2, 0.02, 12, 0, 0.07, 0))
      glowGeoms.push(
        glb.createOctahedronMesh(0.1, 0, 0.08, 0),
        glb.createBoxMesh(0.14, 0.01, 0.02, 0, 0.08, 0)
      )
      break

    case 'tubos_vacio':
      baseGeoms.push(glb.createCylinderMesh(0.08, 0.06, 10, 0, 0.04, 0))
      accentGeoms.push(glb.createCylinderMesh(0.07, 0.25, 10, 0, 0.18, 0))
      glowGeoms.push(
        glb.createCylinderMesh(0.03, 0.18, 8, 0, 0.18, 0),
        glb.createOctahedronMesh(0.06, 0, 0.32, 0)
      )
      break

    case 'palancas_interruptor':
      baseGeoms.push(glb.createBoxMesh(0.2, 0.08, 0.14, 0, 0.04, 0))
      accentGeoms.push(glb.createCylinderMesh(0.02, 0.24, 8, 0.04, 0.18, 0))
      glowGeoms.push(glb.createOctahedronMesh(0.07, 0.04, 0.3, 0))
      break

    // ------------------------------------------------------------------------
    // RAROS (10 Ítems - Azul Galvánico)
    // ------------------------------------------------------------------------
    case 'motor_vapor':
      baseGeoms.push(glb.createBoxMesh(0.32, 0.2, 0.24, 0, 0.12, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.1, 0.25, 10, -0.08, 0.22, 0),
        glb.createCylinderMesh(0.06, 0.2, 8, 0.08, 0.22, 0)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.12, 0.12, 0.26, 0, 0.12, 0),
        glb.createOctahedronMesh(0.08, -0.08, 0.32, 0)
      )
      break

    case 'bobinas_tesla':
      baseGeoms.push(glb.createCylinderMesh(0.16, 0.1, 10, 0, 0.06, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.06, 0.35, 8, 0, 0.22, 0),
        glb.createCylinderMesh(0.14, 0.06, 10, 0, 0.38, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.12, 0, 0.42, 0),
        glb.createCylinderMesh(0.16, 0.02, 10, 0, 0.25, 0)
      )
      break

    case 'antenas_radio':
      baseGeoms.push(glb.createBoxMesh(0.2, 0.08, 0.16, 0, 0.05, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.02, 0.45, 6, -0.05, 0.28, 0),
        glb.createCylinderMesh(0.02, 0.45, 6, 0.05, 0.28, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.08, -0.05, 0.5, 0),
        glb.createOctahedronMesh(0.08, 0.05, 0.5, 0)
      )
      break

    case 'diodos_led':
      baseGeoms.push(glb.createBoxMesh(0.26, 0.04, 0.18, 0, 0.04, 0))
      for (let x = -0.08; x <= 0.08; x += 0.08) {
        for (let z = -0.04; z <= 0.04; z += 0.08) {
          accentGeoms.push(glb.createCylinderMesh(0.03, 0.08, 8, x, 0.08, z))
          glowGeoms.push(glb.createOctahedronMesh(0.05, x, 0.14, z))
        }
      }
      break

    case 'baterias_alquimicas':
      baseGeoms.push(glb.createCylinderMesh(0.14, 0.32, 10, 0, 0.18, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.16, 0.04, 10, 0, 0.34, 0),
        glb.createCylinderMesh(0.16, 0.04, 10, 0, 0.02, 0)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.11, 0.26, 8, 0, 0.18, 0),
        glb.createOctahedronMesh(0.08, 0, 0.38, 0)
      )
      break

    case 'engranajes_bronce':
      baseGeoms.push(
        glb.createCylinderMesh(0.26, 0.05, 14, 0, 0.08, 0),
        glb.createCylinderMesh(0.16, 0.06, 12, 0, 0.14, 0)
      )
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        accentGeoms.push(glb.createBoxMesh(0.05, 0.05, 0.05, Math.cos(angle) * 0.27, 0.08, Math.sin(angle) * 0.27))
      }
      glowGeoms.push(glb.createOctahedronMesh(0.1, 0, 0.15, 0))
      break

    case 'dinamo_galvanica':
      baseGeoms.push(glb.createCylinderMesh(0.18, 0.26, 12, 0, 0.15, 0))
      accentGeoms.push(
        glb.createBoxMesh(0.4, 0.1, 0.1, 0, 0.15, 0),
        glb.createCylinderMesh(0.2, 0.04, 12, 0, 0.28, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.12, 0, 0.32, 0),
        glb.createCylinderMesh(0.12, 0.18, 10, 0, 0.15, 0)
      )
      break

    case 'cristal_fuerza':
      baseGeoms.push(glb.createCylinderMesh(0.16, 0.08, 8, 0, 0.05, 0))
      accentGeoms.push(glb.createOctahedronMesh(0.16, 0, 0.2, 0))
      glowGeoms.push(
        glb.createOctahedronMesh(0.22, 0, 0.22, 0),
        glb.createOctahedronMesh(0.08, 0, 0.38, 0)
      )
      break

    case 'giroscopio_precision':
      baseGeoms.push(glb.createCylinderMesh(0.25, 0.02, 14, 0, 0.15, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.2, 0.02, 12, 0, 0.15, 0),
        glb.createCylinderMesh(0.14, 0.02, 10, 0, 0.15, 0)
      )
      glowGeoms.push(glb.createOctahedronMesh(0.12, 0, 0.15, 0))
      break

    case 'condensador_presion':
      baseGeoms.push(glb.createCylinderMesh(0.18, 0.35, 12, 0, 0.18, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.2, 0.04, 12, 0, 0.34, 0),
        glb.createCylinderMesh(0.2, 0.04, 12, 0, 0.02, 0)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.14, 0.26, 10, 0, 0.18, 0),
        glb.createOctahedronMesh(0.1, 0, 0.38, 0)
      )
      break

    // ------------------------------------------------------------------------
    // ÉPICOS (7 Ítems - Violeta Éter)
    // ------------------------------------------------------------------------
    case 'nucleo_mana':
      baseGeoms.push(
        glb.createOctahedronMesh(0.14, 0, 0.25, 0),
        glb.createCylinderMesh(0.22, 0.03, 12, 0, 0.05, 0)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.28, 0.02, 12, 0, 0.25, 0),
        glb.createCylinderMesh(0.24, 0.02, 12, 0, 0.18, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.22, 0, 0.25, 0),
        glb.createOctahedronMesh(0.08, 0, 0.42, 0)
      )
      break

    case 'cerebro_automata':
      baseGeoms.push(glb.createBoxMesh(0.26, 0.18, 0.22, 0, 0.14, 0))
      accentGeoms.push(
        glb.createBoxMesh(0.28, 0.04, 0.24, 0, 0.05, 0),
        glb.createCylinderMesh(0.04, 0.24, 8, -0.08, 0.14, 0.12),
        glb.createCylinderMesh(0.04, 0.24, 8, 0.08, 0.14, 0.12)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.12, -0.07, 0.14, 0),
        glb.createOctahedronMesh(0.12, 0.07, 0.14, 0),
        glb.createOctahedronMesh(0.08, 0, 0.26, 0)
      )
      break

    case 'reactor_eter':
      baseGeoms.push(glb.createCylinderMesh(0.18, 0.36, 12, 0, 0.2, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.22, 0.05, 12, 0, 0.36, 0),
        glb.createCylinderMesh(0.22, 0.05, 12, 0, 0.04, 0),
        glb.createBoxMesh(0.04, 0.36, 0.22, 0, 0.2, 0)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.14, 0.28, 10, 0, 0.2, 0),
        glb.createOctahedronMesh(0.12, 0, 0.42, 0)
      )
      break

    case 'corazon_caldera':
      baseGeoms.push(glb.createCylinderMesh(0.22, 0.26, 12, 0, 0.16, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.06, 0.2, 8, -0.12, 0.28, 0),
        glb.createCylinderMesh(0.06, 0.2, 8, 0.12, 0.28, 0)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.16, 0.16, 0.24, 0, 0.16, 0),
        glb.createOctahedronMesh(0.14, 0, 0.32, 0)
      )
      break

    case 'bateria_plasma':
      baseGeoms.push(glb.createCylinderMesh(0.2, 0.34, 12, 0, 0.2, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.24, 0.06, 12, 0, 0.36, 0),
        glb.createCylinderMesh(0.24, 0.06, 12, 0, 0.04, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.18, 0, 0.2, 0),
        glb.createOctahedronMesh(0.1, 0, 0.44, 0)
      )
      break

    case 'matriz_optica_solar':
      baseGeoms.push(glb.createBoxMesh(0.3, 0.3, 0.08, 0, 0.2, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.14, 0.1, 12, 0, 0.2, 0.04),
        glb.createCylinderMesh(0.08, 0.12, 10, 0, 0.2, 0.06)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.14, 0, 0.2, 0.08),
        glb.createOctahedronMesh(0.08, 0, 0.38, 0)
      )
      break

    case 'embolo_titanio':
      baseGeoms.push(
        glb.createCylinderMesh(0.22, 0.18, 12, 0, 0.12, 0),
        glb.createCylinderMesh(0.1, 0.3, 10, 0, 0.25, 0)
      )
      accentGeoms.push(glb.createCylinderMesh(0.24, 0.04, 12, 0, 0.18, 0))
      glowGeoms.push(
        glb.createOctahedronMesh(0.14, 0, 0.42, 0),
        glb.createBoxMesh(0.12, 0.12, 0.12, 0, 0.12, 0)
      )
      break

    // ------------------------------------------------------------------------
    // LEGENDARIOS (4 Ítems - Dorado Incandescente)
    // ------------------------------------------------------------------------
    case 'ojo_dragon':
      baseGeoms.push(glb.createCylinderMesh(0.22, 0.12, 12, 0, 0.16, 0))
      accentGeoms.push(
        glb.createOctahedronMesh(0.28, 0, 0.16, 0),
        glb.createBoxMesh(0.36, 0.04, 0.06, 0, 0.16, 0),
        glb.createBoxMesh(0.06, 0.04, 0.36, 0, 0.16, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.18, 0, 0.16, 0),
        glb.createBoxMesh(0.04, 0.18, 0.18, 0, 0.16, 0.02)
      )
      break

    case 'corazon_primigenio':
      baseGeoms.push(
        glb.createOctahedronMesh(0.2, 0, 0.24, 0),
        glb.createCylinderMesh(0.3, 0.03, 14, 0, 0.1, 0)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.36, 0.03, 14, 0, 0.24, 0),
        glb.createCylinderMesh(0.26, 0.03, 12, 0, 0.38, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.28, 0, 0.24, 0),
        glb.createOctahedronMesh(0.12, 0, 0.44, 0),
        glb.createOctahedronMesh(0.12, 0, 0.04, 0)
      )
      break

    case 'singularidad_eterica':
      baseGeoms.push(
        glb.createOctahedronMesh(0.22, 0, 0.25, 0),
        glb.createCylinderMesh(0.32, 0.02, 16, 0, 0.25, 0)
      )
      accentGeoms.push(
        glb.createCylinderMesh(0.38, 0.02, 16, 0, 0.18, 0),
        glb.createCylinderMesh(0.28, 0.02, 14, 0, 0.32, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.3, 0, 0.25, 0),
        glb.createOctahedronMesh(0.14, 0, 0.46, 0),
        glb.createOctahedronMesh(0.14, 0, 0.04, 0)
      )
      break

    case 'relicario_astral':
      baseGeoms.push(glb.createBoxMesh(0.32, 0.32, 0.32, 0, 0.2, 0))
      accentGeoms.push(
        glb.createCylinderMesh(0.34, 0.04, 14, 0, 0.2, 0),
        glb.createCylinderMesh(0.24, 0.34, 12, 0, 0.2, 0)
      )
      glowGeoms.push(
        glb.createOctahedronMesh(0.26, 0, 0.2, 0),
        glb.createOctahedronMesh(0.12, 0, 0.44, 0)
      )
      break

    default:
      baseGeoms.push(glb.createBoxMesh(0.2, 0.2, 0.2, 0, 0.1, 0))
      glowGeoms.push(glb.createOctahedronMesh(0.1, 0, 0.2, 0))
      break
  }

  // Ensamblar la geometría en nodos del GLB
  glb.addMeshNode('Base', glb.combineGeometries(baseGeoms), matBase)
  glb.addMeshNode('Accent', glb.combineGeometries(accentGeoms), matAccent)
  glb.addMeshNode('Glow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

// ============================================================================
// CATÁLOGO MAESTRO DE LOS 46 ÍTEMS
// ============================================================================

const ITEMS_CATALOG = [
  // COMUNES (14)
  { id: 'alambre_cobre', rarity: 'common' },
  { id: 'tornillos_pernos', rarity: 'common' },
  { id: 'engranajes_desgastados', rarity: 'common' },
  { id: 'tubos_cobre', rarity: 'common' },
  { id: 'sartenes', rarity: 'common' },
  { id: 'ollas_cocinar', rarity: 'common' },
  { id: 'placas_laton', rarity: 'common' },
  { id: 'clavos_oxidados', rarity: 'common' },
  { id: 'latas_conserva', rarity: 'common' },
  { id: 'cadenas_hierro', rarity: 'common' },
  { id: 'tuercas_gigantes', rarity: 'common' },
  { id: 'tapas_alcantarilla', rarity: 'common' },
  { id: 'cables_deshilachados', rarity: 'common' },
  { id: 'residuos_carbon', rarity: 'common' },

  // POCO COMUNES (11)
  { id: 'transistores', rarity: 'uncommon' },
  { id: 'bombillas_filamento', rarity: 'uncommon' },
  { id: 'resortes_reloj', rarity: 'uncommon' },
  { id: 'manometros', rarity: 'uncommon' },
  { id: 'valvulas_vapor', rarity: 'uncommon' },
  { id: 'lentes_tv_viejo', rarity: 'uncommon' },
  { id: 'fusibles_fundidos', rarity: 'uncommon' },
  { id: 'relojes_bolsillo', rarity: 'uncommon' },
  { id: 'brujulas_magneticas', rarity: 'uncommon' },
  { id: 'tubos_vacio', rarity: 'uncommon' },
  { id: 'palancas_interruptor', rarity: 'uncommon' },

  // RAROS (10)
  { id: 'motor_vapor', rarity: 'rare' },
  { id: 'bobinas_tesla', rarity: 'rare' },
  { id: 'antenas_radio', rarity: 'rare' },
  { id: 'diodos_led', rarity: 'rare' },
  { id: 'baterias_alquimicas', rarity: 'rare' },
  { id: 'engranajes_bronce', rarity: 'rare' },
  { id: 'dinamo_galvanica', rarity: 'rare' },
  { id: 'cristal_fuerza', rarity: 'rare' },
  { id: 'giroscopio_precision', rarity: 'rare' },
  { id: 'condensador_presion', rarity: 'rare' },

  // ÉPICOS (7)
  { id: 'nucleo_mana', rarity: 'epic' },
  { id: 'cerebro_automata', rarity: 'epic' },
  { id: 'reactor_eter', rarity: 'epic' },
  { id: 'corazon_caldera', rarity: 'epic' },
  { id: 'bateria_plasma', rarity: 'epic' },
  { id: 'matriz_optica_solar', rarity: 'epic' },
  { id: 'embolo_titanio', rarity: 'epic' },

  // LEGENDARIOS (4)
  { id: 'ojo_dragon', rarity: 'legendary' },
  { id: 'corazon_primigenio', rarity: 'legendary' },
  { id: 'singularidad_eterica', rarity: 'legendary' },
  { id: 'relicario_astral', rarity: 'legendary' }
]

// ============================================================================
// FUNCIÓN PRINCIPAL Y EJECUCIÓN CLI
// ============================================================================

function main() {
  const rootDir = path.resolve(__dirname, '..')
  const baseOutputDir = path.join(rootDir, 'assets', 'items')

  console.log('🚀 Iniciando Generación Procedural de Ítems Coleccionables (46 Ítems, glTF 2.0 Binary)...')
  console.log(`📁 Directorio Base: ${baseOutputDir}\n`)

  const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary']
  for (const r of rarities) {
    const dir = path.join(baseOutputDir, r)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  let generatedCount = 0
  for (const item of ITEMS_CATALOG) {
    const filePath = path.join(baseOutputDir, item.rarity, `${item.id}.glb`)
    const glbBuffer = createItemGlb(item.id, item.rarity)
    fs.writeFileSync(filePath, glbBuffer)

    const stats = fs.statSync(filePath)
    console.log(`  ✅ [${item.rarity.toUpperCase()}] ${item.id}.glb -> ${filePath} (${(stats.size / 1024).toFixed(2)} KB)`)
    generatedCount++
  }

  console.log(`\n🎉 Generación completada con éxito. Se crearon ${generatedCount} modelos .glb de ítems coleccionables en 'assets/items/'.`)
}

main()
