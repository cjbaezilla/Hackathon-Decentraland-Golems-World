import { engine, Transform } from '@dcl/sdk/ecs'
import { t } from '../i18n'

/**
 * ============================================================================
 * UTILIDADES DE GEOLOCALIZACIÓN Y DETECCIÓN DE TILEMAP (SDK7)
 * ============================================================================
 * Proporciona cálculo en tiempo real de:
 * - Parcela actual del grid 25x25 (de [0,0] a [24,24]).
 * - Coordenadas métricas locales (X, Y, Z) en el mundo de 400x400m.
 * - Identificación del distrito o zona actual con soporte multilingüe (i18n).
 */

export interface PlayerLocationInfo {
  x: number
  y: number
  z: number
  parcelX: number
  parcelZ: number
  zoneKey: string
  zoneName: string
  zoneIcon: string
  zoneTag: string
}

/**
 * Obtiene la información completa de ubicación en tiempo real del avatar local.
 */
export function getPlayerLocationInfo(): PlayerLocationInfo {
  let x = 16
  let y = 0
  let z = 5

  if (Transform.has(engine.PlayerEntity)) {
    const pos = Transform.get(engine.PlayerEntity).position
    x = pos.x
    y = pos.y
    z = pos.z
  }

  // Cuadrícula 25x25 (cada parcela mide 16m x 16m, de 0 a 400m)
  const parcelX = Math.max(0, Math.min(24, Math.floor(x / 16)))
  const parcelZ = Math.max(0, Math.min(24, Math.floor(z / 16)))

  const zone = getZoneInfoAtPosition(x, z)

  return {
    x,
    y,
    z,
    parcelX,
    parcelZ,
    zoneKey: zone.key,
    zoneName: t(zone.key),
    zoneIcon: zone.icon,
    zoneTag: zone.tag
  }
}

/**
 * Determina el distrito / zona según las coordenadas métricas (X, Z) en el mapa de 400x400m.
 */
export function getZoneInfoAtPosition(x: number, z: number): { key: string; icon: string; tag: string } {
  // 1. Gran Arena Steampunk (Centro: 200m, 200m - Diámetro 72m, Radio 36m)
  const distArena = Math.sqrt((x - 200) ** 2 + (z - 200) ** 2)
  if (distArena <= 36) {
    return { key: 'zones.arena', icon: '🏆', tag: 'ARENA' }
  }

  // 2. Las 4 Esquinas Simétricas (140x140m cada una)
  // Suroeste: Distrito de la Forja (0..140m X, 0..140m Z)
  if (x <= 140 && z <= 140) {
    return { key: 'zones.forgeDistrict', icon: '🔥', tag: 'FORJA' }
  }

  // Sureste: Calderas de la Fundición (260..400m X, 0..140m Z) - PK
  if (x >= 260 && z <= 140) {
    return { key: 'zones.foundryBoilers', icon: '🌋', tag: 'CALDERAS' }
  }

  // Noroeste: Desierto de Chatarra (0..140m X, 260..400m Z) - PK Legendario
  if (x <= 140 && z >= 260) {
    return { key: 'zones.scrapDesert', icon: '🏜️', tag: 'DESIERTO' }
  }

  // Noreste: Reserva de Minería Segura (260..400m X, 260..400m Z)
  if (x >= 260 && z >= 260) {
    return { key: 'zones.miningReserve', icon: '💎', tag: 'MINERÍA' }
  }

  // 3. Corredores y Zonas Intermedias
  // Norte: Subestación Eléctrica (140..260m X, 260..400m Z)
  if (x > 140 && x < 260 && z >= 260) {
    return { key: 'zones.substation', icon: '⚡', tag: 'SUBESTACIÓN' }
  }

  // Este: Torre de Radio (260..400m X, 140..260m Z)
  if (x >= 260 && z > 140 && z < 260) {
    return { key: 'zones.radioTower', icon: '📡', tag: 'RADIO' }
  }

  // Oeste: Los Chatarrales (0..140m X, 140..260m Z)
  if (x <= 140 && z > 140 && z < 260) {
    return { key: 'zones.chatarrales', icon: '⚙️', tag: 'CHATARRALES' }
  }

  // Sur: Corredor y Gran Vía del Sur (140..260m X, 0..140m Z)
  if (x > 140 && x < 260 && z <= 140) {
    return { key: 'zones.southCorridor', icon: '🛣️', tag: 'VÍA SUR' }
  }

  // Centro / Anillo 2: Fábrica Abandonada (140..260m X, 140..260m Z)
  return { key: 'zones.abandonedFactory', icon: '🏭', tag: 'FÁBRICA' }
}
