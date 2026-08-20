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
 * FUENTE ÚNICA DE COLOR: los valores de clase provienen de
 * `src/config/items.ts` -> `RARITY_COLOR_MAP`:
 *   - Común:      #A0A0A0 (Gris Metálico)
 *   - Poco Común: #00FF44 (Verde Neón)
 *   - Raro:       #00D4FF (Azul Galvánico)
 *   - Épico:      #C038FF (Violeta Éter)
 *   - Legendario: #FFAA00 (Dorado Incandescente)
 *
 * POLÍTICA DE COLOR:
 *   - El cuerpo dominante usa el color EXACTO de su clase (metálico).
 *   - Un segundo material de detalle usa el mismo tono oscurecido.
 *   - El brillo emisivo (glow) solo se activa en RARO / ÉPICO / LEGENDARIO.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Utilidades de color (fuente única sincronizada con src/config/items.ts)
// ---------------------------------------------------------------------------

const RARITY_CLASS_COLORS = {
  common: '#A0A0A0',
  uncommon: '#00FF44',
  rare: '#00D4FF',
  epic: '#C038FF',
  legendary: '#FFAA00'
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ]
}

// Raro+ emiten luz; común y poco común no (optimización móvil + contraste).
const RARITY_HAS_GLOW = {
  common: false,
  uncommon: false,
  rare: true,
  epic: true,
  legendary: true
}

// ---------------------------------------------------------------------------
// Constructor GLB (glTF 2.0 binario puro)
// ---------------------------------------------------------------------------

class GlbBuilder {
  constructor() {
    this.json = {
      asset: { version: '2.0', generator: 'GolemsItemsProceduralGlbGenerator_v3' },
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
      emissiveFactor: emissive,
      doubleSided: true
    })
    return matIndex
  }

  // ==== Bases ortonormales por eje ========================================
  static axisBasis(axis) {
    if (axis === 'x') return { a: [0, 1, 0], b: [0, 0, 1], c: [1, 0, 0] }
    if (axis === 'z') return { a: [1, 0, 0], b: [0, 1, 0], c: [0, 0, 1] }
    return { a: [1, 0, 0], b: [0, 0, 1], c: [0, 1, 0] } // 'y'
  }

  // ==== Caja ==============================================================
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
      { norm: [-1, 0, 0], v: [[-hw, -hh, -hd], [-hw, -hh, hd], [-hw, hh, hd], [-hw, hh, -hd]] }
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

  // ==== Cilindro / Tronco de cono (con tapas y normales suavizadas) ========
  createCylinderMesh(rTop, rBottom, height, segments = 12, offsetX = 0, offsetY = 0, offsetZ = 0, axis = 'y', capTop = true, capBottom = true) {
    const { a, b, c } = GlbBuilder.axisBasis(axis)
    const ox = [offsetX, offsetY, offsetZ]
    const hh = height / 2
    const slope = (rBottom - rTop) / height
    const invLen = 1 / Math.sqrt(1 + slope * slope)
    const nnAxial = slope * invLen
    const nnRadial = invLen

    const positions = []
    const normals = []
    const indices = []

    // Pared lateral (anillo superior + inferior, normales radiales suavizadas)
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const ca = Math.cos(angle)
      const sa = Math.sin(angle)

      // vértice superior
      positions.push(
        ox[0] + a[0] * rTop * ca + b[0] * rTop * sa + c[0] * hh,
        ox[1] + a[1] * rTop * ca + b[1] * rTop * sa + c[1] * hh,
        ox[2] + a[2] * rTop * ca + b[2] * rTop * sa + c[2] * hh
      )
      normals.push(
        a[0] * ca * nnRadial + b[0] * sa * nnRadial + c[0] * nnAxial,
        a[1] * ca * nnRadial + b[1] * sa * nnRadial + c[1] * nnAxial,
        a[2] * ca * nnRadial + b[2] * sa * nnRadial + c[2] * nnAxial
      )

      // vértice inferior
      positions.push(
        ox[0] + a[0] * rBottom * ca + b[0] * rBottom * sa - c[0] * hh,
        ox[1] + a[1] * rBottom * ca + b[1] * rBottom * sa - c[1] * hh,
        ox[2] + a[2] * rBottom * ca + b[2] * rBottom * sa - c[2] * hh
      )
      normals.push(
        a[0] * ca * nnRadial + b[0] * sa * nnRadial + c[0] * nnAxial,
        a[1] * ca * nnRadial + b[1] * sa * nnRadial + c[1] * nnAxial,
        a[2] * ca * nnRadial + b[2] * sa * nnRadial + c[2] * nnAxial
      )
    }

    for (let i = 0; i < segments; i++) {
      const i1 = i * 2
      const i2 = i * 2 + 1
      const i3 = (i + 1) * 2
      const i4 = (i + 1) * 2 + 1
      indices.push(i1, i3, i2)
      indices.push(i2, i3, i4)
    }

    // Tapas (abanicos triangulares con centro)
    if (capTop) {
      const center = positions.length / 3
      positions.push(ox[0] + c[0] * hh, ox[1] + c[1] * hh, ox[2] + c[2] * hh)
      normals.push(c[0], c[1], c[2])
      const ringStart = positions.length / 3
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const ca = Math.cos(angle)
        const sa = Math.sin(angle)
        positions.push(
          ox[0] + a[0] * rTop * ca + b[0] * rTop * sa + c[0] * hh,
          ox[1] + a[1] * rTop * ca + b[1] * rTop * sa + c[1] * hh,
          ox[2] + a[2] * rTop * ca + b[2] * rTop * sa + c[2] * hh
        )
        normals.push(c[0], c[1], c[2])
      }
      for (let i = 0; i < segments; i++) {
        indices.push(center, ringStart + i + 1, ringStart + i)
      }
    }

    if (capBottom) {
      const center = positions.length / 3
      positions.push(ox[0] - c[0] * hh, ox[1] - c[1] * hh, ox[2] - c[2] * hh)
      normals.push(-c[0], -c[1], -c[2])
      const ringStart = positions.length / 3
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const ca = Math.cos(angle)
        const sa = Math.sin(angle)
        positions.push(
          ox[0] + a[0] * rBottom * ca + b[0] * rBottom * sa - c[0] * hh,
          ox[1] + a[1] * rBottom * ca + b[1] * rBottom * sa - c[1] * hh,
          ox[2] + a[2] * rBottom * ca + b[2] * rBottom * sa - c[2] * hh
        )
        normals.push(-c[0], -c[1], -c[2])
      }
      for (let i = 0; i < segments; i++) {
        indices.push(center, ringStart + i, ringStart + i + 1)
      }
    }

    return { positions, normals, indices }
  }

  createConeMesh(radius, height, segments = 12, offsetX = 0, offsetY = 0, offsetZ = 0, axis = 'y') {
    return this.createCylinderMesh(0, radius, height, segments, offsetX, offsetY, offsetZ, axis, false, true)
  }

  // ==== Esfera UV (low-poly, normales suavizadas) ==========================
  createSphereMesh(radius, segLat = 8, segLon = 12, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const positions = []
    const normals = []
    const indices = []

    for (let y = 0; y <= segLat; y++) {
      const phi = (y / segLat) * Math.PI
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi)
      for (let x = 0; x <= segLon; x++) {
        const theta = (x / segLon) * Math.PI * 2
        const nx = sinPhi * Math.cos(theta)
        const ny = cosPhi
        const nz = sinPhi * Math.sin(theta)
        positions.push(offsetX + nx * radius, offsetY + ny * radius, offsetZ + nz * radius)
        normals.push(nx, ny, nz)
      }
    }

    for (let y = 0; y < segLat; y++) {
      for (let x = 0; x < segLon; x++) {
        const i1 = y * (segLon + 1) + x
        const i2 = i1 + segLon + 1
        indices.push(i1, i2, i1 + 1)
        indices.push(i1 + 1, i2, i2 + 1)
      }
    }

    return { positions, normals, indices }
  }

  // ==== Toro (anillo/eslabón/bobina), eje configurable =====================
  createTorusMesh(majorRadius, minorRadius, segRing = 16, segTube = 10, offsetX = 0, offsetY = 0, offsetZ = 0, axis = 'y') {
    const { a, b, c } = GlbBuilder.axisBasis(axis)
    const ox = [offsetX, offsetY, offsetZ]
    const positions = []
    const normals = []
    const indices = []

    for (let i = 0; i <= segRing; i++) {
      const u = (i / segRing) * Math.PI * 2
      const cu = Math.cos(u)
      const su = Math.sin(u)
      // dirección radial del anillo
      const dir = [a[0] * cu + b[0] * su, a[1] * cu + b[1] * su, a[2] * cu + b[2] * su]
      const center = [ox[0] + dir[0] * majorRadius, ox[1] + dir[1] * majorRadius, ox[2] + dir[2] * majorRadius]

      for (let j = 0; j <= segTube; j++) {
        const v = (j / segTube) * Math.PI * 2
        const cv = Math.cos(v)
        const sv = Math.sin(v)
        const nx = dir[0] * cv + c[0] * sv
        const ny = dir[1] * cv + c[1] * sv
        const nz = dir[2] * cv + c[2] * sv
        positions.push(center[0] + nx * minorRadius, center[1] + ny * minorRadius, center[2] + nz * minorRadius)
        normals.push(nx, ny, nz)
      }
    }

    for (let i = 0; i < segRing; i++) {
      for (let j = 0; j < segTube; j++) {
        const i1 = i * (segTube + 1) + j
        const i2 = i1 + segTube + 1
        indices.push(i1, i2, i1 + 1)
        indices.push(i1 + 1, i2, i2 + 1)
      }
    }

    return { positions, normals, indices }
  }

  // ==== Extrusión de polígono 2D (prismas: engranajes, tuercas, placas) =====
  extrudePolygon(profile, height, offsetX = 0, offsetY = 0, offsetZ = 0, axis = 'y') {
    const { a, b, c } = GlbBuilder.axisBasis(axis)
    const ox = [offsetX, offsetY, offsetZ]
    const hh = height / 2
    const n = profile.length

    const positions = []
    const normals = []
    const indices = []

    const p3 = (p, sign) => [
      ox[0] + a[0] * p[0] + b[0] * p[1] + c[0] * sign * hh,
      ox[1] + a[1] * p[0] + b[1] * p[1] + c[1] * sign * hh,
      ox[2] + a[2] * p[0] + b[2] * p[1] + c[2] * sign * hh
    ]

    // Caras laterales (normales planas por arista)
    for (let i = 0; i < n; i++) {
      const p1 = profile[i]
      const p2 = profile[(i + 1) % n]
      const du = p2[0] - p1[0]
      const dv = p2[1] - p1[1]
      const len = Math.sqrt(du * du + dv * dv) || 1
      const nu = dv / len
      const nv = -du / len
      // normal 3D = a*nu + b*nv
      const nx = a[0] * nu + b[0] * nv
      const ny = a[1] * nu + b[1] * nv
      const nz = a[2] * nu + b[2] * nv

      const t1 = p3(p1, 1)
      const t2 = p3(p2, 1)
      const b2 = p3(p2, -1)
      const b1 = p3(p1, -1)
      const base = positions.length / 3
      positions.push(...t1, ...t2, ...b2, ...b1)
      for (let k = 0; k < 4; k++) normals.push(nx, ny, nz)
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3)
    }

    // Tapa superior e inferior (abanico)
    let cx = 0
    let cy = 0
    for (const p of profile) {
      cx += p[0]
      cy += p[1]
    }
    cx /= n
    cy /= n

    for (const sign of [1, -1]) {
      const center = positions.length / 3
      const cc = p3([cx, cy], sign)
      positions.push(...cc)
      normals.push(c[0] * sign, c[1] * sign, c[2] * sign)
      const ringStart = positions.length / 3
      for (let i = 0; i < n; i++) {
        const rp = p3(profile[i], sign)
        positions.push(...rp)
        normals.push(c[0] * sign, c[1] * sign, c[2] * sign)
      }
      for (let i = 0; i < n; i++) {
        const idx1 = ringStart + i
        const idx2 = ringStart + ((i + 1) % n)
        if (sign === 1) indices.push(center, idx2, idx1)
        else indices.push(center, idx1, idx2)
      }
    }

    return { positions, normals, indices }
  }

  // ==== Engranaje (disco dentado real) =====================================
  createGearMesh(outerRadius, rootRadius, height, teeth, offsetX = 0, offsetY = 0, offsetZ = 0, axis = 'z') {
    const profile = []
    const toothHalf = (Math.PI / teeth) * 0.4
    for (let t = 0; t < teeth; t++) {
      const center = (t / teeth) * Math.PI * 2
      const a0 = center - toothHalf
      const a1 = center + toothHalf
      profile.push(
        [rootRadius * Math.cos(a0), rootRadius * Math.sin(a0)],
        [outerRadius * Math.cos(a0), outerRadius * Math.sin(a0)],
        [outerRadius * Math.cos(a1), outerRadius * Math.sin(a1)],
        [rootRadius * Math.cos(a1), rootRadius * Math.sin(a1)]
      )
    }
    return this.extrudePolygon(profile, height, offsetX, offsetY, offsetZ, axis)
  }

  // ==== Prisma hexagonal ===================================================
  createHexPrismMesh(outerRadius, height, offsetX = 0, offsetY = 0, offsetZ = 0, axis = 'y') {
    const profile = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6
      profile.push([outerRadius * Math.cos(angle), outerRadius * Math.sin(angle)])
    }
    return this.extrudePolygon(profile, height, offsetX, offsetY, offsetZ, axis)
  }

  // ==== Octaedro (para cristales pequeños / acentos) =======================
  createOctahedronMesh(size, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const hs = size / 2
    const positions = [
      0 + offsetX, hs + offsetY, 0 + offsetZ,
      -hs + offsetX, 0 + offsetY, 0 + offsetZ,
      0 + offsetX, 0 + offsetY, hs + offsetZ,
      hs + offsetX, 0 + offsetY, 0 + offsetZ,
      0 + offsetX, 0 + offsetY, -hs + offsetZ,
      0 + offsetX, -hs + offsetY, 0 + offsetZ
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
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1,
      5, 2, 1, 5, 3, 2, 5, 4, 3, 5, 1, 4
    ]
    return { positions, normals, indices }
  }

  // ==== Combinar geometrías ================================================
  combineGeometries(geomList) {
    const positions = []
    const normals = []
    const indices = []
    let vertexCount = 0

    for (const g of geomList) {
      if (!g || !g.positions || g.positions.length === 0) continue
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
// GENERADOR PRINCIPAL DE ÍTEMS (recetas reconocibles y únicas)
// ============================================================================

function createItemGlb(itemId, rarity) {
  const glb = new GlbBuilder()
  const classRgb = hexToRgb(RARITY_CLASS_COLORS[rarity])
  const detailRgb = classRgb.map((ch) => ch * 0.45)
  const hasGlow = !!RARITY_HAS_GLOW[rarity]

  const matBody = glb.addMaterial({
    name: `${itemId}_Body`,
    baseColor: [...classRgb, 1.0],
    roughness: 0.42,
    metallic: 0.8
  })

  const matDetail = glb.addMaterial({
    name: `${itemId}_Detail`,
    baseColor: [...detailRgb, 1.0],
    roughness: 0.55,
    metallic: 0.9
  })

  const matGlow = glb.addMaterial({
    name: `${itemId}_Glow`,
    baseColor: [...classRgb, 1.0],
    roughness: 0.25,
    metallic: 0.15,
    emissive: hasGlow ? [...classRgb] : [0, 0, 0]
  })

  const baseGeoms = []
  const detailGeoms = []
  const glowGeoms = []

  switch (itemId) {
    // ========================================================================
    // COMUNES (14) — Gris #A0A0A0, sin glow
    // ========================================================================
    case 'alambre_cobre': {
      // Carrete de alambre: 2 discos + núcleo + bobina enrollada
      baseGeoms.push(
        glb.createCylinderMesh(0.14, 0.14, 0.02, 16, 0, 0.02, 0),
        glb.createCylinderMesh(0.14, 0.14, 0.02, 16, 0, 0.2, 0),
        glb.createCylinderMesh(0.05, 0.05, 0.16, 12, 0, 0.11, 0)
      )
      detailGeoms.push(
        glb.createTorusMesh(0.09, 0.012, 20, 8, 0, 0.11, 0, 'y'),
        glb.createCylinderMesh(0.008, 0.008, 0.1, 6, 0.1, 0.16, 0)
      )
      break
    }

    case 'tornillos_pernos': {
      // 3 pernos hexagonales con vástago roscado
      const offsets = [[-0.06, 0], [0.06, 0.03], [0, -0.05]]
      for (const [dx, dz] of offsets) {
        baseGeoms.push(
          glb.createCylinderMesh(0.018, 0.018, 0.16, 8, dx, 0.08, dz),
          glb.createHexPrismMesh(0.032, 0.03, dx, 0.18, dz, 'y')
        )
        detailGeoms.push(
          glb.createCylinderMesh(0.021, 0.021, 0.012, 8, dx, 0.14, dz),
          glb.createCylinderMesh(0.021, 0.021, 0.012, 8, dx, 0.115, dz)
        )
      }
      break
    }

    case 'engranajes_desgastados': {
      // Engranaje dentado + segundo engranaje menor + diente roto
      baseGeoms.push(glb.createGearMesh(0.2, 0.16, 0.05, 8, 0, 0.05, 0, 'z'))
      detailGeoms.push(
        glb.createGearMesh(0.12, 0.095, 0.05, 6, 0.16, 0.05, 0.02, 'z'),
        glb.createBoxMesh(0.06, 0.05, 0.05, 0.2, 0.05, 0)
      )
      break
    }

    case 'tubos_cobre': {
      // Dos tuberías verticales + codo conector horizontal
      baseGeoms.push(
        glb.createCylinderMesh(0.03, 0.03, 0.3, 10, -0.07, 0.15, 0),
        glb.createCylinderMesh(0.03, 0.03, 0.3, 10, 0.07, 0.15, 0)
      )
      detailGeoms.push(
        glb.createCylinderMesh(0.035, 0.035, 0.16, 10, 0, 0.12, 0, 'x'),
        glb.createCylinderMesh(0.04, 0.04, 0.02, 10, 0, 0.12, 0)
      )
      break
    }

    case 'sartenes': {
      // Sartén: cuerpo + mango + borde
      baseGeoms.push(glb.createCylinderMesh(0.15, 0.13, 0.05, 16, 0, 0.03, 0))
      detailGeoms.push(
        glb.createBoxMesh(0.03, 0.03, 0.22, 0.16, 0.04, 0),
        glb.createTorusMesh(0.15, 0.008, 20, 8, 0, 0.06, 0, 'y')
      )
      break
    }

    case 'ollas_cocinar': {
      // Olla: cuerpo + borde + tapa + asas
      baseGeoms.push(glb.createCylinderMesh(0.13, 0.12, 0.18, 16, 0, 0.09, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.14, 0.14, 0.02, 16, 0, 0.19, 0),
        glb.createTorusMesh(0.05, 0.011, 14, 8, -0.14, 0.11, 0, 'x'),
        glb.createTorusMesh(0.05, 0.011, 14, 8, 0.14, 0.11, 0, 'x'),
        glb.createCylinderMesh(0.04, 0.04, 0.02, 10, 0, 0.21, 0)
      )
      break
    }

    case 'placas_laton': {
      // Dos placas apiladas + remaches de esquina
      baseGeoms.push(
        glb.createBoxMesh(0.3, 0.03, 0.22, 0, 0.02, 0),
        glb.createBoxMesh(0.27, 0.03, 0.19, 0, 0.05, 0)
      )
      detailGeoms.push(
        glb.createCylinderMesh(0.014, 0.014, 0.02, 8, -0.11, 0.07, -0.07),
        glb.createCylinderMesh(0.014, 0.014, 0.02, 8, 0.11, 0.07, -0.07),
        glb.createCylinderMesh(0.014, 0.014, 0.02, 8, -0.11, 0.07, 0.07),
        glb.createCylinderMesh(0.014, 0.014, 0.02, 8, 0.11, 0.07, 0.07)
      )
      break
    }

    case 'clavos_oxidados': {
      // 5 clavos con punta cónica y cabeza
      for (let i = 0; i < 5; i++) {
        const dx = (i - 2) * 0.045
        const dz = (i % 2 === 0 ? 1 : -1) * 0.015
        baseGeoms.push(glb.createCylinderMesh(0.013, 0.013, 0.14, 8, dx, 0.08, dz))
        detailGeoms.push(
          glb.createConeMesh(0.013, 0.05, 8, dx, 0.175, dz),
          glb.createCylinderMesh(0.022, 0.022, 0.012, 8, dx, 0.155, dz)
        )
      }
      break
    }

    case 'latas_conserva': {
      // Dos latas con tapa y reborde
      baseGeoms.push(
        glb.createCylinderMesh(0.06, 0.06, 0.16, 12, -0.06, 0.08, 0),
        glb.createCylinderMesh(0.055, 0.055, 0.14, 12, 0.06, 0.07, 0.03)
      )
      detailGeoms.push(
        glb.createCylinderMesh(0.062, 0.062, 0.015, 12, -0.06, 0.15, 0),
        glb.createCylinderMesh(0.057, 0.057, 0.015, 12, 0.06, 0.13, 0.03)
      )
      break
    }

    case 'cadenas_hierro': {
      // Cadena de 3 eslabones entrelazados (orientaciones alternadas)
      baseGeoms.push(glb.createTorusMesh(0.05, 0.013, 14, 8, 0, 0.04, 0, 'y'))
      detailGeoms.push(
        glb.createTorusMesh(0.05, 0.013, 14, 8, 0, 0.11, 0, 'x'),
        glb.createTorusMesh(0.05, 0.013, 14, 8, 0, 0.18, 0, 'y')
      )
      break
    }

    case 'tuercas_gigantes': {
      // Tuerca hexagonal con agujero central
      baseGeoms.push(glb.createHexPrismMesh(0.12, 0.08, 0, 0.04, 0, 'y'))
      detailGeoms.push(
        glb.createCylinderMesh(0.05, 0.05, 0.09, 12, 0, 0.04, 0),
        glb.createHexPrismMesh(0.13, 0.015, 0, 0.09, 0, 'y')
      )
      break
    }

    case 'tapas_alcantarilla': {
      // Tapa de alcantarilla: disco + nervaduras en cruz + reborde
      baseGeoms.push(glb.createCylinderMesh(0.2, 0.2, 0.03, 20, 0, 0.02, 0))
      detailGeoms.push(
        glb.createBoxMesh(0.36, 0.02, 0.03, 0, 0.045, 0),
        glb.createBoxMesh(0.03, 0.02, 0.36, 0, 0.045, 0),
        glb.createTorusMesh(0.2, 0.01, 20, 8, 0, 0.02, 0, 'y')
      )
      break
    }

    case 'cables_deshilachados': {
      // Haz de cables con hilos sueltos en abanico
      baseGeoms.push(
        glb.createCylinderMesh(0.02, 0.02, 0.28, 8, 0, 0.16, 0),
        glb.createCylinderMesh(0.016, 0.016, 0.26, 8, -0.02, 0.16, 0.02),
        glb.createCylinderMesh(0.016, 0.016, 0.24, 8, 0.02, 0.16, -0.02)
      )
      detailGeoms.push(
        glb.createCylinderMesh(0.007, 0.007, 0.1, 6, -0.05, 0.32, 0.03),
        glb.createCylinderMesh(0.007, 0.007, 0.1, 6, 0.05, 0.32, -0.03),
        glb.createTorusMesh(0.035, 0.008, 12, 8, 0, 0.02, 0, 'y')
      )
      break
    }

    case 'residuos_carbon': {
      // Racimo de trozos de carbón (grumos facetados)
      baseGeoms.push(
        glb.createOctahedronMesh(0.18, -0.06, 0.08, 0),
        glb.createOctahedronMesh(0.14, 0.06, 0.08, 0.04),
        glb.createOctahedronMesh(0.12, 0, 0.12, -0.05),
        glb.createOctahedronMesh(0.1, 0.09, 0.05, -0.03)
      )
      detailGeoms.push(glb.createOctahedronMesh(0.08, -0.02, 0.03, 0.06))
      break
    }

    // ========================================================================
    // POCO COMUNES (11) — Verde #00FF44, sin glow
    // ========================================================================
    case 'transistores': {
      // Transistor: cuerpo plano + 3 patas
      baseGeoms.push(glb.createBoxMesh(0.1, 0.06, 0.08, 0, 0.1, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.006, 0.006, 0.1, 6, -0.02, 0.05, 0),
        glb.createCylinderMesh(0.006, 0.006, 0.1, 6, 0, 0.05, 0),
        glb.createCylinderMesh(0.006, 0.006, 0.1, 6, 0.02, 0.05, 0)
      )
      break
    }

    case 'bombillas_filamento': {
      // Bombilla: casquillo roscado + vidrio esférico + filamento
      baseGeoms.push(glb.createCylinderMesh(0.03, 0.03, 0.08, 12, 0, 0.04, 0))
      detailGeoms.push(
        glb.createSphereMesh(0.085, 10, 14, 0, 0.13, 0),
        glb.createCylinderMesh(0.008, 0.008, 0.05, 6, 0, 0.15, 0)
      )
      break
    }

    case 'resortes_reloj': {
      // Resorte de reloj: espiral plana (anillos concéntricos)
      baseGeoms.push(
        glb.createTorusMesh(0.1, 0.012, 22, 8, 0, 0.015, 0, 'y'),
        glb.createTorusMesh(0.068, 0.012, 18, 8, 0, 0.015, 0, 'y'),
        glb.createTorusMesh(0.038, 0.012, 14, 8, 0, 0.015, 0, 'y')
      )
      detailGeoms.push(glb.createBoxMesh(0.02, 0.012, 0.12, 0.1, 0.015, 0.05))
      break
    }

    case 'manometros': {
      // Manómetro: dial + bisel + aguja + tubo
      baseGeoms.push(
        glb.createCylinderMesh(0.09, 0.09, 0.04, 16, 0, 0.06, 0, 'z'),
        glb.createCylinderMesh(0.014, 0.014, 0.1, 8, 0, 0.01, -0.08, 'y')
      )
      detailGeoms.push(
        glb.createTorusMesh(0.09, 0.008, 16, 8, 0, 0.06, 0, 'z'),
        glb.createBoxMesh(0.012, 0.07, 0.012, 0, 0.06, 0.005),
        glb.createCylinderMesh(0.012, 0.012, 0.02, 8, 0, 0.06, 0.04, 'z')
      )
      break
    }

    case 'valvulas_vapor': {
      // Válvula: cuerpo + volante con radios
      baseGeoms.push(glb.createCylinderMesh(0.05, 0.06, 0.16, 12, 0, 0.08, 0))
      detailGeoms.push(
        glb.createTorusMesh(0.09, 0.011, 16, 8, 0, 0.18, 0, 'y'),
        glb.createBoxMesh(0.17, 0.015, 0.015, 0, 0.18, 0),
        glb.createBoxMesh(0.015, 0.015, 0.17, 0, 0.18, 0),
        glb.createCylinderMesh(0.02, 0.02, 0.04, 8, 0, 0.2, 0)
      )
      break
    }

    case 'lentes_tv_viejo': {
      // Lente convexa: disco grueso + cúpula + marco
      baseGeoms.push(glb.createCylinderMesh(0.09, 0.09, 0.05, 16, 0, 0.05, 0, 'z'))
      detailGeoms.push(
        glb.createSphereMesh(0.09, 6, 12, 0, 0.05, -0.04),
        glb.createTorusMesh(0.09, 0.008, 16, 8, 0, 0.05, 0, 'z')
      )
      break
    }

    case 'fusibles_fundidos': {
      // Fusible: tubo de vidrio + casquillos + filamento roto
      baseGeoms.push(glb.createCylinderMesh(0.02, 0.02, 0.16, 10, 0, 0.08, 0, 'x'))
      detailGeoms.push(
        glb.createCylinderMesh(0.024, 0.024, 0.03, 10, -0.09, 0.08, 0, 'x'),
        glb.createCylinderMesh(0.024, 0.024, 0.03, 10, 0.09, 0.08, 0, 'x'),
        glb.createBoxMesh(0.14, 0.004, 0.004, 0, 0.08, 0)
      )
      break
    }

    case 'relojes_bolsillo': {
      // Reloj de bolsillo: caja + corona + anilla
      baseGeoms.push(glb.createCylinderMesh(0.08, 0.08, 0.03, 16, 0, 0.04, 0, 'z'))
      detailGeoms.push(
        glb.createCylinderMesh(0.015, 0.015, 0.025, 8, 0, 0.065, 0, 'y'),
        glb.createTorusMesh(0.02, 0.005, 12, 8, 0, 0.09, 0, 'z')
      )
      break
    }

    case 'brujulas_magneticas': {
      // Brújula: base + aguja romboidal + pivote
      baseGeoms.push(glb.createCylinderMesh(0.09, 0.09, 0.03, 16, 0, 0.03, 0))
      detailGeoms.push(
        glb.createBoxMesh(0.12, 0.008, 0.02, 0, 0.05, 0),
        glb.createBoxMesh(0.02, 0.008, 0.12, 0, 0.05, 0),
        glb.createCylinderMesh(0.01, 0.01, 0.02, 8, 0, 0.06, 0)
      )
      break
    }

    case 'tubos_vacio': {
      // Tubo de vacío: vidrio + ánodo interno + patillas
      baseGeoms.push(glb.createCylinderMesh(0.045, 0.045, 0.18, 12, 0, 0.09, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.02, 0.02, 0.08, 8, 0, 0.1, 0),
        glb.createCylinderMesh(0.007, 0.007, 0.06, 6, -0.02, 0.005, 0),
        glb.createCylinderMesh(0.007, 0.007, 0.06, 6, 0, 0.005, 0),
        glb.createCylinderMesh(0.007, 0.007, 0.06, 6, 0.02, 0.005, 0)
      )
      break
    }

    case 'palancas_interruptor': {
      // Palanca: base + vástago inclinado + pomo esférico
      baseGeoms.push(glb.createBoxMesh(0.12, 0.04, 0.09, 0, 0.02, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.012, 0.012, 0.16, 8, 0.03, 0.09, 0),
        glb.createSphereMesh(0.025, 8, 10, 0.05, 0.17, 0)
      )
      break
    }

    // ========================================================================
    // RAROS (10) — Azul #00D4FF, glow
    // ========================================================================
    case 'motor_vapor': {
      // Motor de vapor: bloque + volante + pistones + chimenea
      baseGeoms.push(glb.createBoxMesh(0.2, 0.14, 0.16, 0, 0.09, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.09, 0.09, 0.04, 16, 0, 0.07, 0.11, 'z'),
        glb.createCylinderMesh(0.03, 0.03, 0.14, 8, -0.08, 0.12, -0.06),
        glb.createCylinderMesh(0.03, 0.03, 0.14, 8, 0.08, 0.12, -0.06),
        glb.createCylinderMesh(0.04, 0.04, 0.12, 10, 0, 0.16, 0)
      )
      glowGeoms.push(glb.createBoxMesh(0.08, 0.08, 0.04, 0, 0.09, 0.09))
      break
    }

    case 'bobinas_tesla': {
      // Bobina de Tesla: toroide superior + fuste + anillos + base
      baseGeoms.push(
        glb.createCylinderMesh(0.035, 0.045, 0.24, 12, 0, 0.12, 0),
        glb.createCylinderMesh(0.07, 0.07, 0.02, 14, 0, 0.01, 0)
      )
      detailGeoms.push(
        glb.createTorusMesh(0.035, 0.007, 12, 8, 0, 0.06, 0, 'y'),
        glb.createTorusMesh(0.04, 0.007, 12, 8, 0, 0.12, 0, 'y'),
        glb.createTorusMesh(0.045, 0.007, 12, 8, 0, 0.18, 0, 'y')
      )
      glowGeoms.push(
        glb.createTorusMesh(0.06, 0.012, 16, 8, 0, 0.24, 0, 'y'),
        glb.createSphereMesh(0.03, 8, 10, 0, 0.26, 0)
      )
      break
    }

    case 'antenas_radio': {
      // Antena: base + 2 mástiles + disco parabólico
      baseGeoms.push(glb.createBoxMesh(0.14, 0.03, 0.1, 0, 0.02, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.008, 0.008, 0.4, 8, -0.03, 0.22, 0),
        glb.createCylinderMesh(0.008, 0.008, 0.34, 8, 0.03, 0.19, 0),
        glb.createCylinderMesh(0.09, 0.07, 0.03, 16, -0.03, 0.42, 0, 'y')
      )
      glowGeoms.push(
        glb.createSphereMesh(0.018, 8, 10, -0.03, 0.42, 0),
        glb.createSphereMesh(0.018, 8, 10, 0.03, 0.36, 0)
      )
      break
    }

    case 'diodos_led': {
      // Diodo LED: cúpula luminosa + collar + 2 patas
      baseGeoms.push(glb.createCylinderMesh(0.05, 0.05, 0.03, 12, 0, 0.04, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.006, 0.006, 0.07, 6, -0.015, 0.005, 0),
        glb.createCylinderMesh(0.006, 0.006, 0.07, 6, 0.015, 0.005, 0)
      )
      glowGeoms.push(glb.createSphereMesh(0.045, 8, 12, 0, 0.08, 0))
      break
    }

    case 'baterias_alquimicas': {
      // Batería alquímica: celda + tapas + terminal + ventana
      baseGeoms.push(glb.createCylinderMesh(0.07, 0.07, 0.24, 12, 0, 0.12, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.075, 0.075, 0.03, 12, 0, 0.23, 0),
        glb.createCylinderMesh(0.075, 0.075, 0.03, 12, 0, 0.01, 0),
        glb.createSphereMesh(0.022, 8, 10, 0, 0.27, 0)
      )
      glowGeoms.push(glb.createTorusMesh(0.075, 0.012, 14, 8, 0, 0.12, 0, 'y'))
      break
    }

    case 'engranajes_bronce': {
      // Dos engranajes de bronce engranando
      baseGeoms.push(glb.createGearMesh(0.18, 0.14, 0.05, 9, 0, 0.05, 0, 'z'))
      detailGeoms.push(glb.createGearMesh(0.12, 0.09, 0.05, 6, 0.16, 0.05, 0.04, 'z'))
      glowGeoms.push(glb.createCylinderMesh(0.02, 0.02, 0.06, 8, 0, 0.05, 0, 'z'))
      break
    }

    case 'dinamo_galvanica': {
      // Dínamo: cuerpo + bobinado + eje + polea
      baseGeoms.push(glb.createCylinderMesh(0.08, 0.08, 0.18, 12, 0, 0.09, 0, 'x'))
      detailGeoms.push(
        glb.createTorusMesh(0.08, 0.014, 14, 8, -0.04, 0.09, 0, 'x'),
        glb.createTorusMesh(0.08, 0.014, 14, 8, 0.04, 0.09, 0, 'x'),
        glb.createCylinderMesh(0.02, 0.02, 0.12, 8, 0.12, 0.09, 0, 'x')
      )
      glowGeoms.push(glb.createCylinderMesh(0.085, 0.085, 0.02, 12, -0.1, 0.09, 0, 'x'))
      break
    }

    case 'cristal_fuerza': {
      // Cristal de cuarzo resonante: bipirámide luminosa + fragmentos + base
      baseGeoms.push(glb.createCylinderMesh(0.08, 0.08, 0.02, 12, 0, 0.01, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0, 0.03, 0.09, 8, -0.09, 0.08, 0.02),
        glb.createCylinderMesh(0, 0.025, 0.07, 8, 0.09, 0.07, -0.02)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0, 0.07, 0.14, 10, 0, 0.12, 0),
        glb.createCylinderMesh(0.07, 0, 0.08, 10, 0, 0.04, 0)
      )
      break
    }

    case 'giroscopio_precision': {
      // Giróscopo: 3 anillos perpendiculares + rotor central
      baseGeoms.push(
        glb.createTorusMesh(0.11, 0.012, 16, 8, 0, 0.1, 0, 'y'),
        glb.createTorusMesh(0.09, 0.012, 16, 8, 0, 0.1, 0, 'x'),
        glb.createTorusMesh(0.07, 0.012, 16, 8, 0, 0.1, 0, 'z')
      )
      glowGeoms.push(glb.createSphereMesh(0.04, 8, 10, 0, 0.1, 0))
      break
    }

    case 'condensador_presion': {
      // Condensador horizontal: cápsula + tapas abombadas + tubos
      baseGeoms.push(glb.createCylinderMesh(0.09, 0.09, 0.2, 12, 0, 0.1, 0, 'x'))
      detailGeoms.push(
        glb.createSphereMesh(0.09, 8, 12, -0.1, 0.1, 0),
        glb.createSphereMesh(0.09, 8, 12, 0.1, 0.1, 0),
        glb.createCylinderMesh(0.02, 0.02, 0.1, 8, 0, 0.16, 0)
      )
      glowGeoms.push(glb.createCylinderMesh(0.03, 0.03, 0.04, 8, 0, 0.22, 0))
      break
    }

    // ========================================================================
    // ÉPICOS (7) — Violeta #C038FF, glow
    // ========================================================================
    case 'nucleo_mana': {
      // Núcleo de maná: orbe luminoso + anillo orbital + soporte
      baseGeoms.push(glb.createCylinderMesh(0.09, 0.1, 0.03, 14, 0, 0.02, 0))
      detailGeoms.push(glb.createTorusMesh(0.13, 0.008, 20, 8, 0, 0.16, 0, 'x'))
      glowGeoms.push(
        glb.createSphereMesh(0.1, 10, 14, 0, 0.16, 0),
        glb.createTorusMesh(0.13, 0.006, 20, 8, 0, 0.16, 0, 'y')
      )
      break
    }

    case 'cerebro_automata': {
      // Cerebro de autómata: masa lobular + cables
      baseGeoms.push(
        glb.createSphereMesh(0.08, 8, 10, -0.05, 0.12, 0),
        glb.createSphereMesh(0.08, 8, 10, 0.05, 0.12, 0),
        glb.createSphereMesh(0.06, 8, 10, 0, 0.16, 0)
      )
      detailGeoms.push(
        glb.createCylinderMesh(0.012, 0.012, 0.1, 6, -0.1, 0.08, 0),
        glb.createCylinderMesh(0.012, 0.012, 0.1, 6, 0.1, 0.08, 0),
        glb.createCylinderMesh(0.012, 0.012, 0.08, 6, 0, 0.04, 0)
      )
      glowGeoms.push(
        glb.createTorusMesh(0.12, 0.006, 18, 8, 0, 0.14, 0, 'y'),
        glb.createSphereMesh(0.022, 8, 10, 0, 0.12, 0.085)
      )
      break
    }

    case 'reactor_eter': {
      // Reactor de éter: cámara vertical + núcleo luminoso superior + anillos
      baseGeoms.push(glb.createCylinderMesh(0.09, 0.09, 0.16, 14, 0, 0.08, 0))
      detailGeoms.push(
        glb.createTorusMesh(0.09, 0.012, 14, 8, 0, 0.03, 0, 'y'),
        glb.createTorusMesh(0.09, 0.012, 14, 8, 0, 0.13, 0, 'y')
      )
      glowGeoms.push(glb.createSphereMesh(0.07, 8, 12, 0, 0.18, 0))
      break
    }

    case 'corazon_caldera': {
      // Corazón de caldera: cámara esférica + 2 conductos
      baseGeoms.push(glb.createSphereMesh(0.1, 10, 14, 0, 0.14, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.04, 0.05, 0.14, 10, 0, 0.24, 0),
        glb.createCylinderMesh(0.035, 0.035, 0.12, 10, -0.08, 0.06, 0, 'x'),
        glb.createCylinderMesh(0.035, 0.035, 0.12, 10, 0.08, 0.06, 0, 'x')
      )
      glowGeoms.push(glb.createTorusMesh(0.12, 0.01, 16, 8, 0, 0.14, 0, 'y'))
      break
    }

    case 'bateria_plasma': {
      // Batería de plasma: celda + núcleo + electrodos
      baseGeoms.push(glb.createCylinderMesh(0.09, 0.09, 0.22, 14, 0, 0.12, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.1, 0.1, 0.03, 14, 0, 0.22, 0),
        glb.createCylinderMesh(0.1, 0.1, 0.03, 14, 0, 0.02, 0),
        glb.createCylinderMesh(0.015, 0.015, 0.06, 8, -0.04, 0.26, 0)
      )
      glowGeoms.push(
        glb.createTorusMesh(0.1, 0.012, 14, 8, 0, 0.12, 0, 'y'),
        glb.createSphereMesh(0.03, 8, 10, 0, 0.27, 0)
      )
      break
    }

    case 'matriz_optica_solar': {
      // Matriz óptica: panel + malla de lentes
      baseGeoms.push(glb.createBoxMesh(0.28, 0.24, 0.05, 0, 0.12, 0))
      for (let x = -0.09; x <= 0.09; x += 0.09) {
        for (let y = -0.07; y <= 0.07; y += 0.07) {
          detailGeoms.push(glb.createCylinderMesh(0.035, 0.035, 0.02, 12, x, y + 0.12, 0.03, 'z'))
        }
      }
      glowGeoms.push(
        glb.createSphereMesh(0.02, 8, 10, -0.09, 0.12, 0.05),
        glb.createSphereMesh(0.02, 8, 10, 0.09, 0.12, 0.05),
        glb.createSphereMesh(0.02, 8, 10, 0, 0.19, 0.05)
      )
      break
    }

    case 'embolo_titanio': {
      // Émbolo: pistón + biela + cabeza
      baseGeoms.push(
        glb.createCylinderMesh(0.07, 0.07, 0.14, 12, 0, 0.12, 0),
        glb.createCylinderMesh(0.03, 0.03, 0.16, 8, 0, 0.26, 0)
      )
      detailGeoms.push(
        glb.createCylinderMesh(0.075, 0.075, 0.02, 12, 0, 0.05, 0),
        glb.createCylinderMesh(0.05, 0.05, 0.03, 12, 0, 0.34, 0)
      )
      glowGeoms.push(glb.createCylinderMesh(0.04, 0.04, 0.02, 10, 0, 0.2, 0))
      break
    }

    // ========================================================================
    // LEGENDARIOS (4) — Dorado #FFAA00, glow
    // ========================================================================
    case 'ojo_dragon': {
      // Ojo de dragón: esfera + anillo + hendidura vertical
      baseGeoms.push(glb.createSphereMesh(0.1, 10, 14, 0, 0.12, 0))
      detailGeoms.push(
        glb.createTorusMesh(0.12, 0.012, 18, 8, 0, 0.12, 0, 'x'),
        glb.createTorusMesh(0.12, 0.012, 18, 8, 0, 0.12, 0, 'y')
      )
      glowGeoms.push(glb.createBoxMesh(0.03, 0.1, 0.05, 0, 0.12, 0.12))
      break
    }

    case 'corazon_primigenio': {
      // Corazón primigenio: esfera + aortas + anillos orbitales
      baseGeoms.push(glb.createSphereMesh(0.12, 10, 14, 0, 0.14, 0))
      detailGeoms.push(
        glb.createCylinderMesh(0.035, 0.035, 0.14, 8, 0, 0.26, 0),
        glb.createCylinderMesh(0.03, 0.03, 0.12, 8, -0.09, 0.2, 0, 'x'),
        glb.createCylinderMesh(0.03, 0.03, 0.12, 8, 0.09, 0.2, 0, 'x')
      )
      glowGeoms.push(
        glb.createTorusMesh(0.15, 0.006, 20, 8, 0, 0.14, 0, 'y'),
        glb.createTorusMesh(0.15, 0.006, 20, 8, 0, 0.14, 0, 'x')
      )
      break
    }

    case 'singularidad_eterica': {
      // Singularidad: núcleo luminoso + anillos orbitales triaxiales + soporte
      baseGeoms.push(glb.createCylinderMesh(0.08, 0.08, 0.02, 12, 0, 0.01, 0))
      detailGeoms.push(glb.createTorusMesh(0.11, 0.008, 16, 8, 0, 0.14, 0, 'y'))
      glowGeoms.push(
        glb.createSphereMesh(0.1, 10, 14, 0, 0.14, 0),
        glb.createTorusMesh(0.14, 0.006, 20, 8, 0, 0.14, 0, 'x'),
        glb.createTorusMesh(0.14, 0.006, 20, 8, 0, 0.14, 0, 'y'),
        glb.createTorusMesh(0.14, 0.006, 20, 8, 0, 0.14, 0, 'z')
      )
      break
    }

    case 'relicario_astral': {
      // Relicario: cofre + engranaje decorativo + cierre
      baseGeoms.push(
        glb.createBoxMesh(0.24, 0.16, 0.18, 0, 0.08, 0),
        glb.createBoxMesh(0.26, 0.06, 0.2, 0, 0.16, 0)
      )
      detailGeoms.push(
        glb.createGearMesh(0.08, 0.06, 0.03, 8, 0, 0.05, 0.11, 'z'),
        glb.createCylinderMesh(0.015, 0.015, 0.04, 8, 0, 0.1, 0.1, 'z')
      )
      glowGeoms.push(
        glb.createSphereMesh(0.03, 8, 10, 0, 0.05, 0.11),
        glb.createCylinderMesh(0.02, 0.02, 0.06, 8, 0, 0.12, 0.1, 'z')
      )
      break
    }

    default:
      baseGeoms.push(glb.createBoxMesh(0.2, 0.2, 0.2, 0, 0.1, 0))
      detailGeoms.push(glb.createOctahedronMesh(0.12, 0, 0.22, 0))
      break
  }

  glb.addMeshNode('Body', glb.combineGeometries(baseGeoms), matBody)
  glb.addMeshNode('Detail', glb.combineGeometries(detailGeoms), matDetail)
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
  let totalBytes = 0
  for (const item of ITEMS_CATALOG) {
    const filePath = path.join(baseOutputDir, item.rarity, `${item.id}.glb`)
    const glbBuffer = createItemGlb(item.id, item.rarity)
    fs.writeFileSync(filePath, glbBuffer)
    totalBytes += glbBuffer.length

    console.log(`  ✅ [${item.rarity.toUpperCase()}] ${item.id}.glb (${(glbBuffer.length / 1024).toFixed(2)} KB)`)
    generatedCount++
  }

  console.log(`\n🎉 Generación completada con éxito. ${generatedCount} modelos .glb (${(totalBytes / 1024).toFixed(1)} KB total) en 'assets/items/'.`)
}

main()
