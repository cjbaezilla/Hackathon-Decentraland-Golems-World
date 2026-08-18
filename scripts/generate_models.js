const fs = require('fs')
const path = require('path')

/**
 * ============================================================================
 * GENERADOR PROCEDURAL DE MODELOS 3D GLB (glTF 2.0) PARA GOLEMS
 * ============================================================================
 * Genera archivos binarios GLB optimizados para Decentraland SDK7 y Mobile First,
 * con materiales PBR metálicos y canales emisivos puros sin luces dinámicas.
 *
 * Soporta parámetros en línea por CLI para generar variantes por tipo, cantidad,
 * variantes individuales y directorios personalizados.
 */

class GlbBuilder {
  constructor() {
    this.json = {
      asset: { version: '2.0', generator: 'GolemsProceduralGlbGenerator_v2' },
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
      // Frente (+Z)
      { norm: [0, 0, 1], v: [[-hw, -hh, hd], [hw, -hh, hd], [hw, hh, hd], [-hw, hh, hd]] },
      // Atrás (-Z)
      { norm: [0, 0, -1], v: [[hw, -hh, -hd], [-hw, -hh, -hd], [-hw, hh, -hd], [hw, hh, -hd]] },
      // Arriba (+Y)
      { norm: [0, 1, 0], v: [[-hw, hh, hd], [hw, hh, hd], [hw, hh, -hd], [-hw, hh, -hd]] },
      // Abajo (-Y)
      { norm: [0, -1, 0], v: [[-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd]] },
      // Derecha (+X)
      { norm: [1, 0, 0], v: [[hw, -hh, hd], [hw, -hh, -hd], [hw, hh, -hd], [hw, hh, hd]] },
      // Izquierda (-X)
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
// GENERADORES POR TIPO Y VARIANTE (1 a 5)
// ============================================================================

/**
 * 1. TIPO VAPOR (STEAM) - Cobre, calderas, chimeneas y fuego naranja
 */
function generateSteamGolem(variant = 1) {
  const glb = new GlbBuilder()

  const matBody = glb.addMaterial({
    name: 'Steam_Copper_Alloy',
    baseColor: [0.72 + variant * 0.02, 0.44 - variant * 0.01, 0.20, 1.0],
    roughness: 0.4,
    metallic: 0.75
  })

  const matIron = glb.addMaterial({
    name: 'Steam_Cast_Iron',
    baseColor: [0.2 + variant * 0.01, 0.2 + variant * 0.01, 0.22, 1.0],
    roughness: 0.7,
    metallic: 0.8
  })

  const matGlow = glb.addMaterial({
    name: 'Steam_Furnace_Glow',
    baseColor: [1.0, 0.4 + (variant % 2) * 0.1, 0.05, 1.0],
    roughness: 0.1,
    metallic: 0.0,
    emissive: [1.0, 0.45, 0.0]
  })

  const bodyGeoms = []
  const ironGeoms = []
  const glowGeoms = []

  switch (variant) {
    case 1: // 01 - Calderón Estándar (Equilibrado)
      bodyGeoms.push(
        glb.createBoxMesh(0.7, 0.6, 0.55, 0, 0.65, 0),
        glb.createBoxMesh(0.45, 0.35, 0.4, 0, 1.05, 0),
        glb.createBoxMesh(0.2, 0.2, 0.25, -0.42, 0.85, 0),
        glb.createBoxMesh(0.2, 0.2, 0.25, 0.42, 0.85, 0)
      )
      ironGeoms.push(
        glb.createCylinderMesh(0.08, 0.4, 8, 0.2, 1.25, -0.1),
        glb.createBoxMesh(0.18, 0.5, 0.18, -0.48, 0.55, 0),
        glb.createBoxMesh(0.18, 0.5, 0.18, 0.48, 0.55, 0),
        glb.createBoxMesh(0.14, 0.15, 0.2, -0.48, 0.25, 0.05),
        glb.createBoxMesh(0.14, 0.15, 0.2, 0.48, 0.25, 0.05),
        glb.createBoxMesh(0.22, 0.4, 0.24, -0.22, 0.2, 0),
        glb.createBoxMesh(0.22, 0.4, 0.24, 0.22, 0.2, 0),
        glb.createBoxMesh(0.24, 0.1, 0.35, -0.22, 0.05, 0.05),
        glb.createBoxMesh(0.24, 0.1, 0.35, 0.22, 0.05, 0.05)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.35, 0.25, 0.08, 0, 0.65, 0.26),
        glb.createBoxMesh(0.25, 0.1, 0.06, 0, 1.05, 0.19)
      )
      break

    case 2: // 02 - Caldera Pesada Blindada (Tanque)
      bodyGeoms.push(
        glb.createBoxMesh(0.85, 0.7, 0.65, 0, 0.7, 0),
        glb.createBoxMesh(0.5, 0.35, 0.45, 0, 1.15, 0),
        glb.createBoxMesh(0.32, 0.28, 0.35, -0.55, 0.95, 0),
        glb.createBoxMesh(0.32, 0.28, 0.35, 0.55, 0.95, 0)
      )
      ironGeoms.push(
        glb.createCylinderMesh(0.1, 0.45, 8, -0.2, 1.35, -0.15),
        glb.createCylinderMesh(0.1, 0.45, 8, 0.2, 1.35, -0.15),
        glb.createBoxMesh(0.24, 0.55, 0.24, -0.55, 0.55, 0),
        glb.createBoxMesh(0.24, 0.55, 0.24, 0.55, 0.55, 0),
        glb.createBoxMesh(0.28, 0.38, 0.3, -0.26, 0.2, 0),
        glb.createBoxMesh(0.28, 0.38, 0.3, 0.26, 0.2, 0),
        glb.createBoxMesh(0.32, 0.12, 0.42, -0.26, 0.06, 0.05),
        glb.createBoxMesh(0.32, 0.12, 0.42, 0.26, 0.06, 0.05)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.45, 0.35, 0.1, 0, 0.68, 0.31),
        glb.createCylinderMesh(0.08, 0.08, 8, -0.12, 1.15, 0.22),
        glb.createCylinderMesh(0.08, 0.08, 8, 0.12, 1.15, 0.22)
      )
      break

    case 3: // 03 - Vástago a Presión (Ágil / Velocidad)
      bodyGeoms.push(
        glb.createBoxMesh(0.55, 0.65, 0.45, 0, 0.75, 0),
        glb.createBoxMesh(0.35, 0.4, 0.35, 0, 1.2, 0),
        glb.createCylinderMesh(0.07, 0.5, 8, 0, 1.55, -0.1) // Chimenea alta
      )
      ironGeoms.push(
        glb.createBoxMesh(0.14, 0.6, 0.14, -0.38, 0.65, 0),
        glb.createBoxMesh(0.14, 0.6, 0.14, 0.38, 0.65, 0),
        glb.createBoxMesh(0.16, 0.5, 0.16, -0.16, 0.25, 0),
        glb.createBoxMesh(0.16, 0.5, 0.16, 0.16, 0.25, 0),
        glb.createBoxMesh(0.18, 0.08, 0.3, -0.16, 0.04, 0.05),
        glb.createBoxMesh(0.18, 0.08, 0.3, 0.16, 0.04, 0.05)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.1, 0.1, 8, 0, 0.8, 0.22),
        glb.createBoxMesh(0.22, 0.06, 0.06, 0, 1.22, 0.18)
      )
      break

    case 4: // 04 - Mortero de Vapor (Artillero / Cañones)
      bodyGeoms.push(
        glb.createBoxMesh(0.75, 0.6, 0.6, 0, 0.68, 0),
        glb.createBoxMesh(0.45, 0.3, 0.4, 0, 1.05, 0)
      )
      ironGeoms.push(
        glb.createCylinderMesh(0.14, 0.65, 8, -0.5, 0.65, 0.15), // Cañón vapor izq
        glb.createCylinderMesh(0.14, 0.65, 8, 0.5, 0.65, 0.15),  // Cañón vapor der
        glb.createBoxMesh(0.22, 0.4, 0.24, -0.22, 0.2, 0),
        glb.createBoxMesh(0.22, 0.4, 0.24, 0.22, 0.2, 0),
        glb.createBoxMesh(0.25, 0.1, 0.35, -0.22, 0.05, 0.05),
        glb.createBoxMesh(0.25, 0.1, 0.35, 0.22, 0.05, 0.05),
        glb.createCylinderMesh(0.12, 0.4, 8, 0, 1.25, -0.2) // Doble escape trasero
      )
      glowGeoms.push(
        glb.createBoxMesh(0.35, 0.25, 0.08, 0, 0.65, 0.28),
        glb.createCylinderMesh(0.08, 0.08, 8, -0.5, 0.65, 0.48),
        glb.createCylinderMesh(0.08, 0.08, 8, 0.5, 0.65, 0.48)
      )
      break

    case 5: // 05 - Coloso de Fundición Suprema (Élite)
      bodyGeoms.push(
        glb.createBoxMesh(0.85, 0.75, 0.65, 0, 0.75, 0),
        glb.createBoxMesh(0.5, 0.4, 0.45, 0, 1.25, 0),
        glb.createBoxMesh(0.3, 0.3, 0.3, -0.58, 1.05, 0),
        glb.createBoxMesh(0.3, 0.3, 0.3, 0.58, 1.05, 0)
      )
      ironGeoms.push(
        glb.createCylinderMesh(0.09, 0.5, 8, -0.25, 1.5, -0.15),
        glb.createCylinderMesh(0.12, 0.6, 8, 0, 1.55, -0.2),
        glb.createCylinderMesh(0.09, 0.5, 8, 0.25, 1.5, -0.15),
        glb.createBoxMesh(0.25, 0.6, 0.25, -0.58, 0.6, 0),
        glb.createBoxMesh(0.25, 0.6, 0.25, 0.58, 0.6, 0),
        glb.createBoxMesh(0.26, 0.45, 0.28, -0.25, 0.22, 0),
        glb.createBoxMesh(0.26, 0.45, 0.28, 0.25, 0.22, 0),
        glb.createBoxMesh(0.3, 0.12, 0.4, -0.25, 0.06, 0.05),
        glb.createBoxMesh(0.3, 0.12, 0.4, 0.25, 0.06, 0.05)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.48, 0.38, 0.1, 0, 0.75, 0.31),
        glb.createBoxMesh(0.3, 0.12, 0.06, 0, 1.25, 0.21),
        glb.createBoxMesh(0.1, 0.1, 0.1, -0.58, 1.22, 0),
        glb.createBoxMesh(0.1, 0.1, 0.1, 0.58, 1.22, 0)
      )
      break
  }

  glb.addMeshNode('SteamBody', glb.combineGeometries(bodyGeoms), matBody)
  glb.addMeshNode('SteamIron', glb.combineGeometries(ironGeoms), matIron)
  glb.addMeshNode('SteamGlow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

/**
 * 2. TIPO GALVÁNICO (GALVANIC) - Acero azulado, bobinas Tesla y cian eléctrico
 */
function generateGalvanicGolem(variant = 1) {
  const glb = new GlbBuilder()

  const matBody = glb.addMaterial({
    name: 'Galvanic_Alloy',
    baseColor: [0.32 + variant * 0.02, 0.42 + variant * 0.01, 0.55, 1.0],
    roughness: 0.3,
    metallic: 0.85
  })

  const matCoil = glb.addMaterial({
    name: 'Tesla_Copper_Coil',
    baseColor: [0.85, 0.55, 0.25, 1.0],
    roughness: 0.5,
    metallic: 0.6
  })

  const matGlow = glb.addMaterial({
    name: 'Galvanic_Electric_Glow',
    baseColor: [0.1, 0.9, 1.0, 1.0],
    roughness: 0.1,
    metallic: 0.0,
    emissive: [0.0, 0.9, 1.0]
  })

  const bodyGeoms = []
  const coilGeoms = []
  const glowGeoms = []

  switch (variant) {
    case 1: // 01 - Chispazo Clásico
      bodyGeoms.push(
        glb.createBoxMesh(0.65, 0.45, 0.45, 0, 0.8, 0),
        glb.createBoxMesh(0.4, 0.3, 0.35, 0, 0.48, 0),
        glb.createBoxMesh(0.35, 0.3, 0.35, 0, 1.15, 0),
        glb.createBoxMesh(0.14, 0.55, 0.14, -0.42, 0.65, 0),
        glb.createBoxMesh(0.14, 0.55, 0.14, 0.42, 0.65, 0),
        glb.createBoxMesh(0.16, 0.45, 0.18, -0.18, 0.22, 0),
        glb.createBoxMesh(0.16, 0.45, 0.18, 0.18, 0.22, 0)
      )
      coilGeoms.push(
        glb.createCylinderMesh(0.09, 0.35, 8, -0.38, 1.1, 0),
        glb.createCylinderMesh(0.09, 0.35, 8, 0.38, 1.1, 0),
        glb.createBoxMesh(0.15, 0.3, 0.15, 0, 0.85, -0.26)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.12, 0.1, 8, 0, 0.8, 0.22),
        glb.createBoxMesh(0.24, 0.08, 0.06, 0, 1.18, 0.18),
        glb.createBoxMesh(0.06, 0.06, 0.06, -0.38, 1.3, 0),
        glb.createBoxMesh(0.06, 0.06, 0.06, 0.38, 1.3, 0)
      )
      break

    case 2: // 02 - Acorazado Dinamo (Tanque de Alta Tensión)
      bodyGeoms.push(
        glb.createBoxMesh(0.8, 0.6, 0.55, 0, 0.75, 0),
        glb.createBoxMesh(0.45, 0.35, 0.4, 0, 1.2, 0),
        glb.createBoxMesh(0.22, 0.5, 0.22, -0.52, 0.6, 0),
        glb.createBoxMesh(0.22, 0.5, 0.22, 0.52, 0.6, 0),
        glb.createBoxMesh(0.24, 0.42, 0.24, -0.22, 0.21, 0),
        glb.createBoxMesh(0.24, 0.42, 0.24, 0.22, 0.21, 0)
      )
      coilGeoms.push(
        glb.createCylinderMesh(0.12, 0.4, 8, -0.45, 1.15, 0),
        glb.createCylinderMesh(0.12, 0.4, 8, 0.45, 1.15, 0),
        glb.createCylinderMesh(0.15, 0.4, 8, 0, 0.8, -0.3)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.35, 0.35, 0.1, 0, 0.75, 0.26),
        glb.createBoxMesh(0.3, 0.1, 0.06, 0, 1.22, 0.19)
      )
      break

    case 3: // 03 - Relámpago Veloz (Ágil / Dípolo)
      bodyGeoms.push(
        glb.createBoxMesh(0.5, 0.55, 0.4, 0, 0.8, 0),
        glb.createBoxMesh(0.3, 0.35, 0.3, 0, 1.22, 0),
        glb.createBoxMesh(0.12, 0.6, 0.12, -0.35, 0.7, 0),
        glb.createBoxMesh(0.12, 0.6, 0.12, 0.35, 0.7, 0),
        glb.createBoxMesh(0.14, 0.5, 0.14, -0.16, 0.25, 0),
        glb.createBoxMesh(0.14, 0.5, 0.14, 0.16, 0.25, 0)
      )
      coilGeoms.push(
        glb.createCylinderMesh(0.06, 0.5, 8, -0.2, 1.45, 0),
        glb.createCylinderMesh(0.06, 0.5, 8, 0.2, 1.45, 0)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.1, 0.08, 8, 0, 0.8, 0.2),
        glb.createBoxMesh(0.2, 0.06, 0.06, 0, 1.24, 0.15),
        glb.createBoxMesh(0.08, 0.08, 0.08, -0.2, 1.72, 0),
        glb.createBoxMesh(0.08, 0.08, 0.08, 0.2, 1.72, 0)
      )
      break

    case 4: // 04 - Conductor de Rayos (Artillero / Bobina de Arco)
      bodyGeoms.push(
        glb.createBoxMesh(0.7, 0.5, 0.5, 0, 0.75, 0),
        glb.createBoxMesh(0.4, 0.3, 0.4, 0, 1.12, 0),
        glb.createBoxMesh(0.18, 0.5, 0.18, -0.45, 0.62, 0),
        glb.createBoxMesh(0.18, 0.5, 0.18, 0.45, 0.62, 0)
      )
      coilGeoms.push(
        glb.createCylinderMesh(0.1, 0.6, 8, -0.45, 0.75, 0.3), // Bobina arma izq
        glb.createCylinderMesh(0.1, 0.6, 8, 0.45, 0.75, 0.3),  // Bobina arma der
        glb.createCylinderMesh(0.14, 0.4, 8, 0, 0.85, -0.28)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.14, 0.08, 8, 0, 0.75, 0.24),
        glb.createBoxMesh(0.08, 0.08, 0.08, -0.45, 0.75, 0.62),
        glb.createBoxMesh(0.08, 0.08, 0.08, 0.45, 0.75, 0.62)
      )
      break

    case 5: // 05 - Titán Galvánico de Tesla (Élite)
      bodyGeoms.push(
        glb.createBoxMesh(0.8, 0.65, 0.6, 0, 0.8, 0),
        glb.createBoxMesh(0.46, 0.36, 0.42, 0, 1.28, 0),
        glb.createBoxMesh(0.28, 0.28, 0.28, -0.55, 1.02, 0),
        glb.createBoxMesh(0.28, 0.28, 0.28, 0.55, 1.02, 0)
      )
      coilGeoms.push(
        glb.createCylinderMesh(0.1, 0.45, 8, -0.55, 1.35, 0),
        glb.createCylinderMesh(0.1, 0.45, 8, 0.55, 1.35, 0),
        glb.createCylinderMesh(0.08, 0.4, 8, 0, 1.55, -0.1),
        glb.createBoxMesh(0.2, 0.4, 0.2, 0, 0.8, -0.32)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.18, 0.1, 8, 0, 0.8, 0.29),
        glb.createBoxMesh(0.32, 0.1, 0.06, 0, 1.28, 0.2),
        glb.createBoxMesh(0.1, 0.1, 0.1, -0.55, 1.6, 0),
        glb.createBoxMesh(0.1, 0.1, 0.1, 0.55, 1.6, 0)
      )
      break
  }

  glb.addMeshNode('GalvanicBody', glb.combineGeometries(bodyGeoms), matBody)
  glb.addMeshNode('GalvanicCoils', glb.combineGeometries(coilGeoms), matCoil)
  glb.addMeshNode('GalvanicGlow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

/**
 * 3. TIPO MECÁNICO (MECHANICAL) - Chatarra remachada, latón/bronce y ámbar dorado
 */
function generateMechanicalGolem(variant = 1) {
  const glb = new GlbBuilder()

  const matArmor = glb.addMaterial({
    name: 'Scrap_Iron_Armor',
    baseColor: [0.44 + variant * 0.02, 0.40, 0.36, 1.0],
    roughness: 0.65,
    metallic: 0.75
  })

  const matBronze = glb.addMaterial({
    name: 'Brass_Gears',
    baseColor: [0.75, 0.62, 0.28, 1.0],
    roughness: 0.45,
    metallic: 0.7
  })

  const matGlow = glb.addMaterial({
    name: 'Mechanical_Optic_Glow',
    baseColor: [1.0, 0.8, 0.1, 1.0],
    roughness: 0.2,
    metallic: 0.1,
    emissive: [1.0, 0.75, 0.0]
  })

  const armorGeoms = []
  const gearGeoms = []
  const glowGeoms = []

  switch (variant) {
    case 1: // 01 - Acorazado Clásico
      armorGeoms.push(
        glb.createBoxMesh(0.75, 0.55, 0.6, 0, 0.65, 0),
        glb.createBoxMesh(0.4, 0.3, 0.4, 0, 1.02, 0),
        glb.createBoxMesh(0.24, 0.48, 0.24, -0.48, 0.55, 0),
        glb.createBoxMesh(0.24, 0.48, 0.24, 0.48, 0.55, 0),
        glb.createBoxMesh(0.22, 0.22, 0.25, -0.48, 0.22, 0.05),
        glb.createBoxMesh(0.22, 0.22, 0.25, 0.48, 0.22, 0.05),
        glb.createBoxMesh(0.25, 0.38, 0.28, -0.22, 0.2, 0),
        glb.createBoxMesh(0.25, 0.38, 0.28, 0.22, 0.2, 0),
        glb.createBoxMesh(0.28, 0.12, 0.38, -0.22, 0.06, 0.05),
        glb.createBoxMesh(0.28, 0.12, 0.38, 0.22, 0.06, 0.05)
      )
      gearGeoms.push(
        glb.createBoxMesh(0.28, 0.25, 0.32, -0.46, 0.88, 0),
        glb.createBoxMesh(0.28, 0.25, 0.32, 0.46, 0.88, 0),
        glb.createBoxMesh(0.5, 0.35, 0.08, 0, 0.65, 0.31),
        glb.createCylinderMesh(0.18, 0.08, 10, 0, 0.75, -0.32)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.09, 0.08, 8, 0, 1.05, 0.22),
        glb.createCylinderMesh(0.06, 0.06, 8, -0.15, 0.72, 0.33),
        glb.createCylinderMesh(0.06, 0.06, 8, 0.15, 0.72, 0.33)
      )
      break

    case 2: // 02 - Bastión de Chatarra (Tanque Pesado)
      armorGeoms.push(
        glb.createBoxMesh(0.9, 0.65, 0.7, 0, 0.7, 0),
        glb.createBoxMesh(0.48, 0.32, 0.45, 0, 1.12, 0),
        glb.createBoxMesh(0.3, 0.5, 0.3, -0.58, 0.55, 0),
        glb.createBoxMesh(0.3, 0.5, 0.3, 0.58, 0.55, 0),
        glb.createBoxMesh(0.3, 0.4, 0.32, -0.25, 0.2, 0),
        glb.createBoxMesh(0.3, 0.4, 0.32, 0.25, 0.2, 0)
      )
      gearGeoms.push(
        glb.createBoxMesh(0.36, 0.32, 0.4, -0.58, 0.95, 0),
        glb.createBoxMesh(0.36, 0.32, 0.4, 0.58, 0.95, 0),
        glb.createBoxMesh(0.65, 0.45, 0.12, 0, 0.7, 0.36)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.28, 0.1, 0.08, 0, 1.12, 0.24),
        glb.createCylinderMesh(0.12, 0.08, 8, 0, 0.7, 0.38)
      )
      break

    case 3: // 03 - Engranaje Relojero (Ágil / Alta Precisión)
      armorGeoms.push(
        glb.createBoxMesh(0.55, 0.6, 0.45, 0, 0.75, 0),
        glb.createBoxMesh(0.35, 0.32, 0.35, 0, 1.18, 0),
        glb.createBoxMesh(0.15, 0.55, 0.15, -0.38, 0.65, 0),
        glb.createBoxMesh(0.15, 0.55, 0.15, 0.38, 0.65, 0),
        glb.createBoxMesh(0.16, 0.48, 0.16, -0.16, 0.24, 0),
        glb.createBoxMesh(0.16, 0.48, 0.16, 0.16, 0.24, 0)
      )
      gearGeoms.push(
        glb.createCylinderMesh(0.14, 0.06, 10, -0.38, 0.98, 0),
        glb.createCylinderMesh(0.14, 0.06, 10, 0.38, 0.98, 0),
        glb.createCylinderMesh(0.16, 0.06, 10, 0, 0.8, -0.24)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.08, 0.06, 8, 0, 1.18, 0.18),
        glb.createCylinderMesh(0.06, 0.06, 8, 0, 0.8, 0.24)
      )
      break

    case 4: // 04 - Martillo Neumático Mecánico (Artillero / Demoledor)
      armorGeoms.push(
        glb.createBoxMesh(0.8, 0.6, 0.55, 0, 0.68, 0),
        glb.createBoxMesh(0.42, 0.3, 0.4, 0, 1.05, 0),
        glb.createBoxMesh(0.28, 0.35, 0.35, -0.52, 0.3, 0.1), // Maza de impacto izq
        glb.createBoxMesh(0.28, 0.35, 0.35, 0.52, 0.3, 0.1)   // Maza de impacto der
      )
      gearGeoms.push(
        glb.createBoxMesh(0.32, 0.28, 0.35, -0.5, 0.9, 0),
        glb.createBoxMesh(0.32, 0.28, 0.35, 0.5, 0.9, 0),
        glb.createBoxMesh(0.55, 0.3, 0.1, 0, 0.68, 0.3)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.1, 0.08, 8, 0, 1.05, 0.22),
        glb.createBoxMesh(0.1, 0.1, 0.1, -0.52, 0.3, 0.3),
        glb.createBoxMesh(0.1, 0.1, 0.1, 0.52, 0.3, 0.3)
      )
      break

    case 5: // 05 - Gran Autómata de Relojería (Élite)
      armorGeoms.push(
        glb.createBoxMesh(0.85, 0.7, 0.65, 0, 0.78, 0),
        glb.createBoxMesh(0.48, 0.38, 0.42, 0, 1.26, 0),
        glb.createBoxMesh(0.26, 0.55, 0.26, -0.55, 0.65, 0),
        glb.createBoxMesh(0.26, 0.55, 0.26, 0.55, 0.65, 0)
      )
      gearGeoms.push(
        glb.createCylinderMesh(0.2, 0.08, 12, -0.55, 1.05, 0),
        glb.createCylinderMesh(0.2, 0.08, 12, 0.55, 1.05, 0),
        glb.createCylinderMesh(0.24, 0.08, 12, 0, 0.8, -0.34),
        glb.createBoxMesh(0.6, 0.4, 0.12, 0, 0.78, 0.34)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.12, 0.08, 8, 0, 1.26, 0.22),
        glb.createCylinderMesh(0.08, 0.08, 8, -0.15, 0.78, 0.4),
        glb.createCylinderMesh(0.08, 0.08, 8, 0.15, 0.78, 0.4)
      )
      break
  }

  glb.addMeshNode('MechanicalArmor', glb.combineGeometries(armorGeoms), matArmor)
  glb.addMeshNode('MechanicalGears', glb.combineGeometries(gearGeoms), matBronze)
  glb.addMeshNode('MechanicalGlow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

/**
 * 4. TIPO LUMINOSO (LUMINOUS) - Cromo plateado, diodos y luz solar amarilla
 */
function generateLuminousGolem(variant = 1) {
  const glb = new GlbBuilder()

  const matChrome = glb.addMaterial({
    name: 'Polished_Chrome',
    baseColor: [0.85, 0.88 + variant * 0.02, 0.92, 1.0],
    roughness: 0.15,
    metallic: 0.95
  })

  const matGoldTrim = glb.addMaterial({
    name: 'Beacon_Gold_Trim',
    baseColor: [0.92, 0.8, 0.35, 1.0],
    roughness: 0.3,
    metallic: 0.8
  })

  const matGlow = glb.addMaterial({
    name: 'Solar_Luminous_Glow',
    baseColor: [1.0, 1.0, 0.25, 1.0],
    roughness: 0.05,
    metallic: 0.0,
    emissive: [1.0, 1.0, 0.15]
  })

  const chromeGeoms = []
  const goldGeoms = []
  const glowGeoms = []

  switch (variant) {
    case 1: // 01 - Faro Solar Estándar
      chromeGeoms.push(
        glb.createBoxMesh(0.6, 0.5, 0.45, 0, 0.75, 0),
        glb.createBoxMesh(0.35, 0.22, 0.3, 0, 0.44, 0),
        glb.createCylinderMesh(0.09, 0.5, 8, -0.4, 0.65, 0),
        glb.createCylinderMesh(0.09, 0.5, 8, 0.4, 0.65, 0),
        glb.createBoxMesh(0.12, 0.14, 0.14, -0.4, 0.32, 0.02),
        glb.createBoxMesh(0.12, 0.14, 0.14, 0.4, 0.32, 0.02),
        glb.createBoxMesh(0.18, 0.44, 0.18, -0.18, 0.22, 0),
        glb.createBoxMesh(0.18, 0.44, 0.18, 0.18, 0.22, 0),
        glb.createBoxMesh(0.2, 0.08, 0.3, -0.18, 0.04, 0.04),
        glb.createBoxMesh(0.2, 0.08, 0.3, 0.18, 0.04, 0.04)
      )
      goldGeoms.push(
        glb.createCylinderMesh(0.22, 0.2, 8, 0, 1.18, 0),
        glb.createBoxMesh(0.22, 0.18, 0.24, -0.42, 0.92, 0),
        glb.createBoxMesh(0.22, 0.18, 0.24, 0.42, 0.92, 0),
        glb.createBoxMesh(0.32, 0.3, 0.06, 0, 0.75, -0.24)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.16, 0.18, 8, 0, 1.18, 0.08),
        glb.createCylinderMesh(0.14, 0.08, 8, 0, 0.78, 0.22),
        glb.createBoxMesh(0.08, 0.08, 0.08, -0.42, 1.02, 0),
        glb.createBoxMesh(0.08, 0.08, 0.08, 0.42, 1.02, 0)
      )
      break

    case 2: // 02 - Reflector Acorazado (Tanque Prisma)
      chromeGeoms.push(
        glb.createBoxMesh(0.75, 0.6, 0.55, 0, 0.75, 0),
        glb.createBoxMesh(0.2, 0.5, 0.2, -0.48, 0.6, 0),
        glb.createBoxMesh(0.2, 0.5, 0.2, 0.48, 0.6, 0),
        glb.createBoxMesh(0.22, 0.45, 0.22, -0.2, 0.22, 0),
        glb.createBoxMesh(0.22, 0.45, 0.22, 0.2, 0.22, 0)
      )
      goldGeoms.push(
        glb.createBoxMesh(0.48, 0.35, 0.4, 0, 1.2, 0),
        glb.createBoxMesh(0.3, 0.25, 0.3, -0.5, 0.95, 0),
        glb.createBoxMesh(0.3, 0.25, 0.3, 0.5, 0.95, 0)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.32, 0.32, 0.1, 0, 0.75, 0.28),
        glb.createBoxMesh(0.36, 0.15, 0.08, 0, 1.2, 0.21)
      )
      break

    case 3: // 03 - Centella Fotónica (Ágil / Prisma)
      chromeGeoms.push(
        glb.createBoxMesh(0.48, 0.55, 0.38, 0, 0.8, 0),
        glb.createCylinderMesh(0.08, 0.55, 8, -0.34, 0.7, 0),
        glb.createCylinderMesh(0.08, 0.55, 8, 0.34, 0.7, 0),
        glb.createBoxMesh(0.14, 0.5, 0.14, -0.15, 0.25, 0),
        glb.createBoxMesh(0.14, 0.5, 0.14, 0.15, 0.25, 0)
      )
      goldGeoms.push(
        glb.createCylinderMesh(0.18, 0.3, 8, 0, 1.25, 0),
        glb.createBoxMesh(0.1, 0.3, 0.08, -0.2, 1.48, -0.05),
        glb.createBoxMesh(0.1, 0.3, 0.08, 0.2, 1.48, -0.05)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.12, 0.08, 8, 0, 0.8, 0.2),
        glb.createBoxMesh(0.24, 0.06, 0.06, 0, 1.25, 0.12),
        glb.createBoxMesh(0.08, 0.08, 0.08, 0, 1.5, 0)
      )
      break

    case 4: // 04 - Proyector de Plasma Solar (Artillero / Láser)
      chromeGeoms.push(
        glb.createBoxMesh(0.68, 0.52, 0.48, 0, 0.75, 0),
        glb.createBoxMesh(0.16, 0.5, 0.16, -0.42, 0.65, 0),
        glb.createBoxMesh(0.16, 0.5, 0.16, 0.42, 0.65, 0)
      )
      goldGeoms.push(
        glb.createCylinderMesh(0.2, 0.25, 8, 0, 1.15, 0),
        glb.createCylinderMesh(0.12, 0.65, 8, -0.42, 0.7, 0.25), // Cañón láser izq
        glb.createCylinderMesh(0.12, 0.65, 8, 0.42, 0.7, 0.25)   // Cañón láser der
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.16, 0.08, 8, 0, 0.75, 0.25),
        glb.createCylinderMesh(0.08, 0.08, 8, -0.42, 0.7, 0.6),
        glb.createCylinderMesh(0.08, 0.08, 8, 0.42, 0.7, 0.6)
      )
      break

    case 5: // 05 - Corona de Helios Suprema (Élite)
      chromeGeoms.push(
        glb.createBoxMesh(0.75, 0.65, 0.55, 0, 0.8, 0),
        glb.createBoxMesh(0.22, 0.55, 0.22, -0.5, 0.65, 0),
        glb.createBoxMesh(0.22, 0.55, 0.22, 0.5, 0.65, 0)
      )
      goldGeoms.push(
        glb.createCylinderMesh(0.26, 0.25, 8, 0, 1.28, 0),
        glb.createBoxMesh(0.28, 0.28, 0.28, -0.5, 1.02, 0),
        glb.createBoxMesh(0.28, 0.28, 0.28, 0.5, 1.02, 0),
        glb.createBoxMesh(0.08, 0.35, 0.08, -0.22, 1.55, 0),
        glb.createBoxMesh(0.08, 0.45, 0.08, 0, 1.62, 0),
        glb.createBoxMesh(0.08, 0.35, 0.08, 0.22, 1.55, 0)
      )
      glowGeoms.push(
        glb.createCylinderMesh(0.2, 0.1, 8, 0, 0.8, 0.28),
        glb.createBoxMesh(0.3, 0.1, 0.08, 0, 1.28, 0.18),
        glb.createBoxMesh(0.1, 0.1, 0.1, -0.5, 1.22, 0),
        glb.createBoxMesh(0.1, 0.1, 0.1, 0.5, 1.22, 0)
      )
      break
  }

  glb.addMeshNode('LuminousChrome', glb.combineGeometries(chromeGeoms), matChrome)
  glb.addMeshNode('LuminousGold', glb.combineGeometries(goldGeoms), matGoldTrim)
  glb.addMeshNode('LuminousGlow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

/**
 * 5. TIPO ÉTER (AETHER) - Obsidiana mística, resonadores flotantes y amatista violeta
 */
function generateAetherGolem(variant = 1) {
  const glb = new GlbBuilder()

  const matObsidian = glb.addMaterial({
    name: 'Obsidian_Aether_Alloy',
    baseColor: [0.18 + variant * 0.01, 0.14, 0.26 + variant * 0.02, 1.0],
    roughness: 0.25,
    metallic: 0.85
  })

  const matRunic = glb.addMaterial({
    name: 'Runic_Aether_Engravings',
    baseColor: [0.65, 0.45, 0.78, 1.0],
    roughness: 0.4,
    metallic: 0.65
  })

  const matGlow = glb.addMaterial({
    name: 'Aether_Arcane_Glow',
    baseColor: [0.85, 0.25, 1.0, 1.0],
    roughness: 0.1,
    metallic: 0.0,
    emissive: [0.8, 0.15, 1.0]
  })

  const obsidianGeoms = []
  const runicGeoms = []
  const glowGeoms = []

  switch (variant) {
    case 1: // 01 - Autómata de Éter Estándar
      obsidianGeoms.push(
        glb.createBoxMesh(0.62, 0.55, 0.48, 0, 0.72, 0),
        glb.createBoxMesh(0.2, 0.12, 0.2, 0, 1.02, 0),
        glb.createBoxMesh(0.36, 0.32, 0.36, 0, 1.2, 0),
        glb.createBoxMesh(0.15, 0.52, 0.15, -0.45, 0.62, 0),
        glb.createBoxMesh(0.15, 0.52, 0.15, 0.45, 0.62, 0),
        glb.createBoxMesh(0.12, 0.18, 0.14, -0.45, 0.28, 0.02),
        glb.createBoxMesh(0.12, 0.18, 0.14, 0.45, 0.28, 0.02),
        glb.createBoxMesh(0.18, 0.46, 0.2, -0.2, 0.23, 0),
        glb.createBoxMesh(0.18, 0.46, 0.2, 0.2, 0.23, 0),
        glb.createBoxMesh(0.22, 0.08, 0.32, -0.2, 0.04, 0.04),
        glb.createBoxMesh(0.22, 0.08, 0.32, 0.2, 0.04, 0.04)
      )
      runicGeoms.push(
        glb.createBoxMesh(0.18, 0.3, 0.18, -0.46, 0.98, 0),
        glb.createBoxMesh(0.18, 0.3, 0.18, 0.46, 0.98, 0),
        glb.createBoxMesh(0.08, 0.22, 0.08, -0.16, 1.42, -0.05),
        glb.createBoxMesh(0.08, 0.22, 0.08, 0.16, 1.42, -0.05),
        glb.createCylinderMesh(0.2, 0.06, 10, 0, 0.75, -0.26)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.22, 0.22, 0.12, 0, 0.72, 0.22),
        glb.createBoxMesh(0.26, 0.07, 0.06, 0, 1.22, 0.19),
        glb.createBoxMesh(0.08, 0.08, 0.08, -0.46, 1.15, 0),
        glb.createBoxMesh(0.08, 0.08, 0.08, 0.46, 1.15, 0),
        glb.createCylinderMesh(0.08, 0.08, 8, 0, 0.75, -0.28)
      )
      break

    case 2: // 02 - Monolito de Vacío (Tanque de Éter)
      obsidianGeoms.push(
        glb.createBoxMesh(0.8, 0.65, 0.6, 0, 0.75, 0),
        glb.createBoxMesh(0.45, 0.35, 0.4, 0, 1.22, 0),
        glb.createBoxMesh(0.22, 0.5, 0.22, -0.52, 0.6, 0),
        glb.createBoxMesh(0.22, 0.5, 0.22, 0.52, 0.6, 0)
      )
      runicGeoms.push(
        glb.createBoxMesh(0.3, 0.35, 0.3, -0.52, 1.0, 0),
        glb.createBoxMesh(0.3, 0.35, 0.3, 0.52, 1.0, 0),
        glb.createBoxMesh(0.5, 0.4, 0.1, 0, 0.75, 0.32)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.3, 0.3, 0.12, 0, 0.75, 0.34),
        glb.createBoxMesh(0.32, 0.1, 0.06, 0, 1.22, 0.21)
      )
      break

    case 3: // 03 - Aparición Astral (Ágil / Cristal)
      obsidianGeoms.push(
        glb.createBoxMesh(0.48, 0.55, 0.4, 0, 0.8, 0),
        glb.createBoxMesh(0.3, 0.35, 0.3, 0, 1.25, 0),
        glb.createBoxMesh(0.12, 0.55, 0.12, -0.36, 0.68, 0),
        glb.createBoxMesh(0.12, 0.55, 0.12, 0.36, 0.68, 0)
      )
      runicGeoms.push(
        glb.createBoxMesh(0.12, 0.35, 0.12, -0.38, 1.1, 0),
        glb.createBoxMesh(0.12, 0.35, 0.12, 0.38, 1.1, 0),
        glb.createBoxMesh(0.06, 0.35, 0.06, 0, 1.55, -0.05)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.16, 0.16, 0.1, 0, 0.8, 0.22),
        glb.createBoxMesh(0.2, 0.06, 0.06, 0, 1.26, 0.16),
        glb.createBoxMesh(0.08, 0.08, 0.08, -0.38, 1.3, 0),
        glb.createBoxMesh(0.08, 0.08, 0.08, 0.38, 1.3, 0)
      )
      break

    case 4: // 04 - Resonador de Fractura (Artillero / Cañón Arcano)
      obsidianGeoms.push(
        glb.createBoxMesh(0.7, 0.52, 0.5, 0, 0.75, 0),
        glb.createBoxMesh(0.38, 0.3, 0.38, 0, 1.15, 0)
      )
      runicGeoms.push(
        glb.createBoxMesh(0.18, 0.22, 0.65, -0.45, 0.65, 0.2), // Prisma cañón izq
        glb.createBoxMesh(0.18, 0.22, 0.65, 0.45, 0.65, 0.2),  // Prisma cañón der
        glb.createCylinderMesh(0.16, 0.08, 8, 0, 0.8, -0.28)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.2, 0.2, 0.1, 0, 0.75, 0.26),
        glb.createBoxMesh(0.1, 0.1, 0.1, -0.45, 0.65, 0.55),
        glb.createBoxMesh(0.1, 0.1, 0.1, 0.45, 0.65, 0.55)
      )
      break

    case 5: // 05 - Señor del Éter Primigenio (Élite)
      obsidianGeoms.push(
        glb.createBoxMesh(0.75, 0.68, 0.58, 0, 0.8, 0),
        glb.createBoxMesh(0.44, 0.38, 0.42, 0, 1.3, 0),
        glb.createBoxMesh(0.2, 0.55, 0.2, -0.5, 0.65, 0),
        glb.createBoxMesh(0.2, 0.55, 0.2, 0.5, 0.65, 0)
      )
      runicGeoms.push(
        glb.createBoxMesh(0.22, 0.38, 0.22, -0.5, 1.1, 0),
        glb.createBoxMesh(0.22, 0.38, 0.22, 0.5, 1.1, 0),
        glb.createBoxMesh(0.08, 0.3, 0.08, -0.2, 1.6, -0.05),
        glb.createBoxMesh(0.08, 0.3, 0.08, 0.2, 1.6, -0.05),
        glb.createCylinderMesh(0.25, 0.08, 12, 0, 0.8, -0.32)
      )
      glowGeoms.push(
        glb.createBoxMesh(0.28, 0.28, 0.14, 0, 0.8, 0.3),
        glb.createBoxMesh(0.3, 0.1, 0.08, 0, 1.3, 0.22),
        glb.createBoxMesh(0.1, 0.1, 0.1, -0.5, 1.32, 0),
        glb.createBoxMesh(0.1, 0.1, 0.1, 0.5, 1.32, 0)
      )
      break
  }

  glb.addMeshNode('AetherObsidian', glb.combineGeometries(obsidianGeoms), matObsidian)
  glb.addMeshNode('AetherRunic', glb.combineGeometries(runicGeoms), matRunic)
  glb.addMeshNode('AetherGlow', glb.combineGeometries(glowGeoms), matGlow)

  return glb.buildGlbBuffer()
}

// ============================================================================
// CONFIGURACIÓN DE TIPOS Y MANEJO DE CLI
// ============================================================================

const GOLEM_TYPE_REGISTRY = {
  steam: {
    type: 'steam',
    name: 'Vapor (Steam)',
    generator: generateSteamGolem,
    palette: 'Cobre, hierro fundido y fuego naranja emisivo (#FF7000)'
  },
  galvanic: {
    type: 'galvanic',
    name: 'Galvánico (Galvanic)',
    generator: generateGalvanicGolem,
    palette: 'Aleación azulada, bobinas de cobre y cian eléctrico (#00E5FF)'
  },
  mechanical: {
    type: 'mechanical',
    name: 'Mecánico (Mechanical)',
    generator: generateMechanicalGolem,
    palette: 'Hierro de chatarra, latón/bronce y ámbar dorado (#FFBF00)'
  },
  luminous: {
    type: 'luminous',
    name: 'Luminoso (Luminous)',
    generator: generateLuminousGolem,
    palette: 'Cromo pulido, reflectores dorados y luz solar amarilla (#FFFF33)'
  },
  aether: {
    type: 'aether',
    name: 'Éter (Aether)',
    generator: generateAetherGolem,
    palette: 'Obsidiana mística, grabados rúnicos y violeta amatista (#B833FF)'
  }
}

/**
 * Muestra el manual de ayuda de la línea de comandos.
 */
function showHelp() {
  console.log(`
================================================================================
  GENERADOR DE MODELOS 3D GLB PARA GOLEMS (Decentraland SDK7 Mobile-First)
================================================================================

USO:
  node scripts/generate_models.js [opciones]
  node scripts/generate_models.js [tipo] [cantidad]

OPCIONES:
  -t, --type <tipo>         Tipo o afinidad a generar:
                           [steam | galvanic | mechanical | luminous | aether | all]
                           (Por defecto: 'all')
  -c, --count <num>         Cantidad de variantes a generar por tipo (1 a 5).
                           (Por defecto: 5)
  -v, --variant <num>       Genera únicamente la variante específica (1 a 5).
  -o, --output-dir <path>   Directorio base de salida para los modelos.
                           (Por defecto: assets/models)
  -h, --help                Muestra este mensaje de ayuda.

EJEMPLOS:
  # Generar todas las 5 variantes de los 5 tipos (25 modelos en total):
  node scripts/generate_models.js

  # Generar las 5 variantes únicamente del tipo Vapor:
  node scripts/generate_models.js --type steam

  # Generar 3 variantes de tipo Galvánico:
  node scripts/generate_models.js -t galvanic -c 3

  # Generar solo la variante 5 (Suprema) de tipo Éter:
  node scripts/generate_models.js --type aether --variant 5

  # Sintaxis posicional rápida (tipo y cantidad):
  node scripts/generate_models.js mechanical 4
================================================================================
`)
}

/**
 * Parsea los argumentos de la línea de comandos (flags y posicionales).
 */
function parseCliArgs() {
  const args = process.argv.slice(2)
  const options = {
    type: 'all',
    count: 5,
    variant: null,
    outputDir: path.join(__dirname, '..', 'assets', 'models'),
    help: false
  }

  const positional = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === '-h' || arg === '--help') {
      options.help = true
      return options
    } else if (arg === '-t' || arg === '--type') {
      options.type = (args[++i] || 'all').toLowerCase()
    } else if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1].toLowerCase()
    } else if (arg === '-c' || arg === '--count') {
      options.count = Math.min(5, Math.max(1, parseInt(args[++i], 10) || 5))
    } else if (arg.startsWith('--count=')) {
      options.count = Math.min(5, Math.max(1, parseInt(arg.split('=')[1], 10) || 5))
    } else if (arg === '-v' || arg === '--variant') {
      options.variant = Math.min(5, Math.max(1, parseInt(args[++i], 10) || 1))
    } else if (arg.startsWith('--variant=')) {
      options.variant = Math.min(5, Math.max(1, parseInt(arg.split('=')[1], 10) || 1))
    } else if (arg === '-o' || arg === '--output-dir') {
      options.outputDir = path.resolve(args[++i])
    } else if (arg.startsWith('--output-dir=')) {
      options.outputDir = path.resolve(arg.split('=')[1])
    } else if (!arg.startsWith('-')) {
      positional.push(arg)
    }
  }

  // Parseo posicional si no se pasaron flags
  if (positional.length > 0) {
    const first = positional[0].toLowerCase()
    if (GOLEM_TYPE_REGISTRY[first] || first === 'all') {
      options.type = first
    }
  }
  if (positional.length > 1) {
    const countNum = parseInt(positional[1], 10)
    if (!isNaN(countNum)) {
      options.count = Math.min(5, Math.max(1, countNum))
    }
  }

  return options
}

/**
 * Función principal de ejecución.
 */
function main() {
  const options = parseCliArgs()

  if (options.help) {
    showHelp()
    process.exit(0)
  }

  const typesToProcess =
    options.type === 'all'
      ? Object.keys(GOLEM_TYPE_REGISTRY)
      : [options.type]

  // Validar tipos
  for (const t of typesToProcess) {
    if (!GOLEM_TYPE_REGISTRY[t]) {
      console.error(`❌ Error: Tipo desconocido '${t}'. Tipos válidos: steam, galvanic, mechanical, luminous, aether, all`)
      process.exit(1)
    }
  }

  console.log('================================================================================')
  console.log('🚀 GENERANDO MODELOS 3D GLB PROCEDURALES PARA GOLEMS')
  console.log(`📁 Directorio Base: ${options.outputDir}`)
  console.log(`🏷️  Tipos: ${typesToProcess.join(', ')}`)
  console.log(`🔢 Variantes: ${options.variant ? `Solo Variante ${options.variant}` : `1 a ${options.count}`}`)
  console.log('================================================================================')

  let totalGenerated = 0
  let totalBytes = 0

  for (const typeKey of typesToProcess) {
    const typeInfo = GOLEM_TYPE_REGISTRY[typeKey]
    const typeDir = path.join(options.outputDir, typeInfo.type)

    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir, { recursive: true })
    }

    console.log(`\n📌 Generando tipo: [${typeInfo.name.toUpperCase()}]`)
    console.log(`🎨 Paleta: ${typeInfo.palette}`)

    const variantsToGenerate = options.variant ? [options.variant] : Array.from({ length: options.count }, (_, i) => i + 1)

    for (const v of variantsToGenerate) {
      const glbBuffer = typeInfo.generator(v)
      const numPad = String(v).padStart(2, '0')
      const fileName = `golem_${typeInfo.type}_${numPad}.glb`
      const filePath = path.join(typeDir, fileName)

      fs.writeFileSync(filePath, glbBuffer)
      totalGenerated++
      totalBytes += glbBuffer.length

      console.log(`   ✅ Variante ${numPad}: assets/models/${typeInfo.type}/${fileName} (${glbBuffer.length} bytes)`)

      // Si es la variante 1, guardar también como nombre base canónico golem_<type>.glb para retrocompatibilidad
      if (v === 1) {
        const canonicalName = `golem_${typeInfo.type}.glb`
        const canonicalPath = path.join(typeDir, canonicalName)
        fs.writeFileSync(canonicalPath, glbBuffer)
        console.log(`   🔗 Alias Canónico: assets/models/${typeInfo.type}/${canonicalName}`)
      }
    }
  }

  console.log('\n================================================================================')
  console.log(`🎉 GENERACIÓN COMPLETADA CON ÉXITO: ${totalGenerated} modelos creados (${(totalBytes / 1024).toFixed(1)} KB total).`)
  console.log('================================================================================\n')
}

main()
