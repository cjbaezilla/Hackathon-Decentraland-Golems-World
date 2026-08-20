/**
 * ============================================================================
 * GlbBuilder — Constructor glTF 2.0 binario (.glb) sin dependencias externas
 * ============================================================================
 * Librería compartida por los generadores procedurales de Golems e Ítems.
 * Construye mallas a partir de primitivas (caja, cilindro/cono con tapas,
 * esfera UV, toro, engranaje, prisma hexagonal, octaedro y extrusión 2D).
 */

// ---------------------------------------------------------------------------
// Bases ortonormales por eje (para orientar cilindros, toros, engranajes, etc.)
// ---------------------------------------------------------------------------
function axisBasis(axis) {
  if (axis === 'x') return { a: [0, 1, 0], b: [0, 0, 1], c: [1, 0, 0] }
  if (axis === 'z') return { a: [1, 0, 0], b: [0, 1, 0], c: [0, 0, 1] }
  return { a: [1, 0, 0], b: [0, 0, 1], c: [0, 1, 0] } // 'y'
}

class GlbBuilder {
  constructor() {
    this.json = {
      asset: { version: '2.0', generator: 'GolemsProceduralGlbGenerator_v3' },
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

  addMaterial({ name, baseColor = [0.8, 0.8, 0.8, 1.0], roughness = 0.5, metallic = 0.5, emissive = [0, 0, 0], doubleSided = false }) {
    const matIndex = this.json.materials.length
    const material = {
      name,
      pbrMetallicRoughness: {
        baseColorFactor: baseColor,
        roughnessFactor: roughness,
        metallicFactor: metallic
      },
      emissiveFactor: emissive
    }
    if (doubleSided) {
      material.doubleSided = true
    }
    this.json.materials.push(material)
    return matIndex
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
    const { a, b, c } = axisBasis(axis)
    const ox = [offsetX, offsetY, offsetZ]
    const hh = height / 2
    const slope = (rBottom - rTop) / height
    const invLen = 1 / Math.sqrt(1 + slope * slope)
    const nnAxial = slope * invLen
    const nnRadial = invLen

    const positions = []
    const normals = []
    const indices = []

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const ca = Math.cos(angle)
      const sa = Math.sin(angle)

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
    const { a, b, c } = axisBasis(axis)
    const ox = [offsetX, offsetY, offsetZ]
    const positions = []
    const normals = []
    const indices = []

    for (let i = 0; i <= segRing; i++) {
      const u = (i / segRing) * Math.PI * 2
      const cu = Math.cos(u)
      const su = Math.sin(u)
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
    const { a, b, c } = axisBasis(axis)
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

    for (let i = 0; i < n; i++) {
      const p1 = profile[i]
      const p2 = profile[(i + 1) % n]
      const du = p2[0] - p1[0]
      const dv = p2[1] - p1[1]
      const len = Math.sqrt(du * du + dv * dv) || 1
      const nu = dv / len
      const nv = -du / len
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

  // ==== Octaedro (cristales / acentos) =====================================
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

module.exports = { GlbBuilder, axisBasis }
