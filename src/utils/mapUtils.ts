import { engine, Transform } from '@dcl/sdk/ecs'

/**
 * ============================================================================
 * UTILIDADES DE PROYECCIÓN CARTOGRÁFICA Y ORIENTACIÓN 2D (SDK7)
 * ============================================================================
 * Maneja la conversión de coordenadas 3D del mundo (400m x 400m - Grid 25x25)
 * a posiciones relativas en el canvas 2D del minimapa y mapa grande, junto con
 * el cálculo trigonométrico del ángulo de visión (Sight Cone) de la cámara.
 */

export interface PlayerMapState {
  x: number
  y: number
  z: number
  parcelX: number
  parcelZ: number
  percentX: number // 0% a 100% de izquierda a derecha
  percentY: number // 0% a 100% de arriba a abajo (Norte es 0%, Sur es 100%)
  headingAngleRad: number
  headingAngleDeg: number
  dirX: number
  dirY: number
}

export interface DistrictMarker {
  id: string
  nameKey: string
  icon: string
  x: number
  z: number
  riskType: 'SAFE' | 'PK' | 'ARENA' | 'HAZARD'
  color: string
}

/**
 * Catálogo de marcadores de distritos y zonas clave según la Guía Maestra del Mapa.
 */
export const DISTRICT_MARKERS: DistrictMarker[] = [
  {
    id: 'forge_district',
    nameKey: 'zones.forgeDistrict',
    icon: '🔥',
    x: 70,
    z: 70,
    riskType: 'SAFE',
    color: '#00E676'
  },
  {
    id: 'scrap_desert',
    nameKey: 'zones.scrapDesert',
    icon: '🏜️',
    x: 70,
    z: 330,
    riskType: 'PK',
    color: '#FF5252'
  },
  {
    id: 'mining_reserve',
    nameKey: 'zones.miningReserve',
    icon: '💎',
    x: 330,
    z: 330,
    riskType: 'SAFE',
    color: '#00E676'
  },
  {
    id: 'foundry_boilers',
    nameKey: 'zones.foundryBoilers',
    icon: '🌋',
    x: 330,
    z: 70,
    riskType: 'PK',
    color: '#FF5252'
  },
  {
    id: 'grand_arena',
    nameKey: 'zones.arena',
    icon: '🏆',
    x: 200,
    z: 200,
    riskType: 'ARENA',
    color: '#FFD700'
  },
  {
    id: 'substation',
    nameKey: 'zones.substation',
    icon: '⚡',
    x: 200,
    z: 340,
    riskType: 'HAZARD',
    color: '#FFAB00'
  },
  {
    id: 'radio_tower',
    nameKey: 'zones.radioTower',
    icon: '📡',
    x: 340,
    z: 200,
    riskType: 'HAZARD',
    color: '#FFAB00'
  },
  {
    id: 'chatarrales',
    nameKey: 'zones.chatarrales',
    icon: '⚙️',
    x: 70,
    z: 200,
    riskType: 'SAFE',
    color: '#00E676'
  },
  {
    id: 'south_corridor',
    nameKey: 'zones.southCorridor',
    icon: '🛣️',
    x: 200,
    z: 70,
    riskType: 'SAFE',
    color: '#00E676'
  },
  {
    id: 'abandoned_factory',
    nameKey: 'zones.abandonedFactory',
    icon: '🏭',
    x: 180,
    z: 180,
    riskType: 'HAZARD',
    color: '#40C4FF'
  }
]

/**
 * Obtiene la posición normalizada y orientación del jugador en el plano del mapa.
 */
export function getPlayerMapState(): PlayerMapState {
  let x = 16
  let y = 0
  let z = 5
  let rotX = 0
  let rotY = 0
  let rotZ = 0
  let rotW = 1

  // 1. Obtener coordenadas del avatar
  if (Transform.has(engine.PlayerEntity)) {
    const pos = Transform.get(engine.PlayerEntity).position
    x = pos.x
    y = pos.y
    z = pos.z
  }

  // 2. Obtener orientación de la cámara (preferida) o del avatar
  if (Transform.has(engine.CameraEntity)) {
    const rot = Transform.get(engine.CameraEntity).rotation
    rotX = rot.x
    rotY = rot.y
    rotZ = rot.z
    rotW = rot.w
  } else if (Transform.has(engine.PlayerEntity)) {
    const rot = Transform.get(engine.PlayerEntity).rotation
    rotX = rot.x
    rotY = rot.y
    rotZ = rot.z
    rotW = rot.w
  }

  // 3. Cuadrícula de 25x25 (0 a 400m)
  const clampedX = Math.max(0, Math.min(400, x))
  const clampedZ = Math.max(0, Math.min(400, z))

  const parcelX = Math.max(0, Math.min(24, Math.floor(clampedX / 16)))
  const parcelZ = Math.max(0, Math.min(24, Math.floor(clampedZ / 16)))

  // 4. Proyección 2D: X -> horizontal [0..100%], Z -> vertical invertida [0..100%] (Z=400m es Norte / Top 0%)
  const percentX = (clampedX / 400) * 100
  const percentY = ((400 - clampedZ) / 400) * 100

  // 5. Cálculo del vector director en el plano 2D
  // Vector forward en 3D: forwardX = 2*(x*z + w*y), forwardZ = 1 - 2*(x*x + y*y)
  const forwardX = 2 * (rotX * rotZ + rotW * rotY)
  const forwardZ = 1 - 2 * (rotX * rotX + rotY * rotY)

  // En mapa 2D: dirX = forwardX (Este +X), dirY = -forwardZ (Norte +Z es -Y en pantalla)
  const len = Math.sqrt(forwardX * forwardX + forwardZ * forwardZ) || 1
  const dirX = forwardX / len
  const dirY = -forwardZ / len

  const headingAngleRad = Math.atan2(dirY, dirX)
  const headingAngleDeg = (headingAngleRad * 180) / Math.PI

  return {
    x: clampedX,
    y,
    z: clampedZ,
    parcelX,
    parcelZ,
    percentX,
    percentY,
    headingAngleRad,
    headingAngleDeg,
    dirX,
    dirY
  }
}

/**
 * Proyecta puntos de haz de visión para dibujar un cono visual radiante en React-ECS.
 */
export function getConeOffsets(
  radius: number,
  angleRad: number,
  coneSpreadRad: number = 0.45
): { offsetX: number; offsetY: number; size: number; opacity: number }[] {
  const leftAngle = angleRad - coneSpreadRad
  const rightAngle = angleRad + coneSpreadRad
  const midLeftAngle = angleRad - coneSpreadRad * 0.5
  const midRightAngle = angleRad + coneSpreadRad * 0.5

  return [
    // Vértice frontal principal (punta de mira)
    {
      offsetX: Math.cos(angleRad) * radius,
      offsetY: Math.sin(angleRad) * radius,
      size: 7,
      opacity: 0.95
    },
    // Haz frontal medio
    {
      offsetX: Math.cos(angleRad) * (radius * 0.6),
      offsetY: Math.sin(angleRad) * (radius * 0.6),
      size: 6,
      opacity: 0.8
    },
    // Haz izquierdo exterior
    {
      offsetX: Math.cos(leftAngle) * (radius * 0.85),
      offsetY: Math.sin(leftAngle) * (radius * 0.85),
      size: 5,
      opacity: 0.65
    },
    // Haz derecho exterior
    {
      offsetX: Math.cos(rightAngle) * (radius * 0.85),
      offsetY: Math.sin(rightAngle) * (radius * 0.85),
      size: 5,
      opacity: 0.65
    },
    // Haz izquierdo intermedio
    {
      offsetX: Math.cos(midLeftAngle) * (radius * 0.75),
      offsetY: Math.sin(midLeftAngle) * (radius * 0.75),
      size: 5,
      opacity: 0.75
    },
    // Haz derecho intermedio
    {
      offsetX: Math.cos(midRightAngle) * (radius * 0.75),
      offsetY: Math.sin(midRightAngle) * (radius * 0.75),
      size: 5,
      opacity: 0.75
    }
  ]
}
