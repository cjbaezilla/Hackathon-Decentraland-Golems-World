import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  pointerEventsSystem,
  InputAction
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { COLLECTABLE_ITEMS, ItemConfig, ItemRarity } from '../config/items'
import { CollectableItemComponent } from '../components/item'
import { addMaterialToInventory, addCombatLog } from '../state'
import { t } from '../i18n'

/**
 * ============================================================================
 * BOUNDS ESPACIALES DE LAS 7 ZONAS DE APARICIÓN EN EL MAPA (400m x 400m)
 * ============================================================================
 */
export interface ZoneBounds {
  name: string
  minX: number
  maxX: number
  minZ: number
  maxZ: number
  weight: number // Peso proporcional de zona para la distribución de 90 ítems
}

export const ITEM_ZONE_BOUNDS: Record<string, ZoneBounds> = {
  'Los Chatarrales': {
    name: 'Los Chatarrales',
    minX: 5,
    maxX: 135,
    minZ: 145,
    maxZ: 255,
    weight: 0.50 // 50% de los ítems (45 ítems)
  },
  'Fábrica Abandonada': {
    name: 'Fábrica Abandonada',
    minX: 145,
    maxX: 255,
    minZ: 145,
    maxZ: 255,
    weight: 0.28 // 28% de los ítems (25 ítems)
  },
  'Subestación Eléctrica': {
    name: 'Subestación Eléctrica',
    minX: 145,
    maxX: 255,
    minZ: 285,
    maxZ: 395,
    weight: 0.07 // 7% de los ítems (6 ítems)
  },
  'Torre de Radio': {
    name: 'Torre de Radio',
    minX: 285,
    maxX: 395,
    minZ: 145,
    maxZ: 255,
    weight: 0.05 // 5% de los ítems (4 ítems)
  },
  'Reserva de Minería': {
    name: 'Reserva de Minería',
    minX: 265,
    maxX: 395,
    minZ: 265,
    maxZ: 395,
    weight: 0.05 // 5% de los ítems (4 ítems)
  },
  'Calderas de la Fundición (PK)': {
    name: 'Calderas de la Fundición (PK)',
    minX: 265,
    maxX: 395,
    minZ: 5,
    maxZ: 135,
    weight: 0.035 // 3.5% de los ítems (3 ítems)
  },
  'Desierto de Chatarra (PK)': {
    name: 'Desierto de Chatarra (PK)',
    minX: 5,
    maxX: 135,
    minZ: 265,
    maxZ: 395,
    weight: 0.015 // 1.5% de los ítems (3 ítems)
  }
}

/**
 * Mapeo de zona canónica para emparejar con el campo `zone` de ItemConfig.
 */
function normalizeZoneName(configZone: string): string {
  if (configZone.includes('Chatarrales')) return 'Los Chatarrales'
  if (configZone.includes('Fábrica')) return 'Fábrica Abandonada'
  if (configZone.includes('Subestación')) return 'Subestación Eléctrica'
  if (configZone.includes('Torre')) return 'Torre de Radio'
  if (configZone.includes('Minería')) return 'Reserva de Minería'
  if (configZone.includes('Calderas') || configZone.includes('Fundición')) return 'Calderas de la Fundición (PK)'
  if (configZone.includes('Desierto')) return 'Desierto de Chatarra (PK)'
  return 'Los Chatarrales'
}

/**
 * Genera una posición aleatoria segura dentro de la zona especificada.
 * Evita la Gran Arena Central (164..236 X, 164..236 Z).
 */
export function getRandomPositionInZone(zoneName: string): Vector3 {
  const bounds = ITEM_ZONE_BOUNDS[zoneName] || ITEM_ZONE_BOUNDS['Los Chatarrales']
  let attempts = 0
  let x = bounds.minX + Math.random() * (bounds.maxX - bounds.minX)
  let z = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ)

  // Evitar solapamiento con la Gran Arena Central (Centro: 200, 200 / radio 36m)
  while (attempts < 20) {
    const distToCenter = Math.sqrt((x - 200) ** 2 + (z - 200) ** 2)
    if (distToCenter > 38) {
      break
    }
    x = bounds.minX + Math.random() * (bounds.maxX - bounds.minX)
    z = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ)
    attempts++
  }

  // Altura base enterrada (-0.5m) que emerge a 0.25m al acercarse
  return Vector3.create(x, -0.5, z)
}

/**
 * Comprueba si ya existe un ítem único (Épico o Legendario) activo en la escena.
 */
export function isUniqueItemActive(itemId: string): boolean {
  for (const [entity] of engine.getEntitiesWith(CollectableItemComponent)) {
    const itemData = CollectableItemComponent.get(entity)
    if (itemData.itemId === itemId && !itemData.isCollected) {
      return true
    }
  }
  return false
}

/**
 * Selecciona una pieza de material ponderada por spawnWeight estrictamente dentro de su zona.
 * Garantiza que ítems de zonas PK (Desierto de Chatarra PK, Calderas PK) O de cualquier otra zona
 * NUNCA puedan aparecer fuera de las coordenadas de su zona.
 */
export function pickRandomItemConfigForZone(zoneName: string): ItemConfig {
  const allItems = Object.values(COLLECTABLE_ITEMS)
  const zoneItems = allItems.filter((item) => normalizeZoneName(item.zone) === zoneName)

  // Si por alguna razón la zona no tuviera ítems configurados, usar pool por defecto de esa zona
  const candidatePool = zoneItems.length > 0 ? zoneItems : allItems.filter((i) => normalizeZoneName(i.zone) === 'Los Chatarrales')

  // Filtrar ítems únicos que ya estén activos en el mapa
  const availablePool = candidatePool.filter((item) => {
    if (item.isUniqueInstance) {
      return !isUniqueItemActive(item.id)
    }
    return true
  })

  // Si todos los ítems únicos de la zona están activos, utilizar los no únicos de esa MISMA zona
  const nonUniqueZoneItems = candidatePool.filter((item) => !item.isUniqueInstance)
  const finalPool = availablePool.length > 0 
    ? availablePool 
    : (nonUniqueZoneItems.length > 0 ? nonUniqueZoneItems : candidatePool)

  // Calcular peso total de la piscina de esa zona específica
  const totalWeight = finalPool.reduce((sum, item) => sum + item.spawnWeight, 0)
  let randomRoll = Math.random() * totalWeight

  for (const item of finalPool) {
    if (randomRoll <= item.spawnWeight) {
      return item
    }
    randomRoll -= item.spawnWeight
  }

  return finalPool[0]
}

/**
 * Instancia una entidad SDK7 de ítem coleccionable en el mundo.
 */
export function spawnItemEntity(itemConfig: ItemConfig, position: Vector3): Entity {
  const entity = engine.addEntity()

  // Posición inicial enterrada
  const originalY = 0.25
  Transform.create(entity, {
    position: Vector3.create(position.x, position.y, position.z),
    scale: Vector3.create(0.8, 0.8, 0.8),
    rotation: Quaternion.fromEulerDegrees(0, Math.random() * 360, 0)
  })

  // Cargar modelo 3D GLB
  GltfContainer.create(entity, {
    src: itemConfig.modelSrc
  })

  // Asignar componente metadatos
  CollectableItemComponent.create(entity, {
    itemId: itemConfig.id,
    rarity: itemConfig.rarity,
    zone: normalizeZoneName(itemConfig.zone),
    spawnTimestamp: Date.now(),
    isRevealed: false,
    isCollected: false,
    originalY: originalY,
    respawnMinMinutes: itemConfig.respawnTimeMinMinutes,
    respawnMaxMinutes: itemConfig.respawnTimeMaxMinutes
  })

  // Interacción de recolección táctil (Mobile First)
  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: `Recolectar ${itemConfig.nameEs} (${itemConfig.rarity.toUpperCase()})`,
        maxDistance: 4.5
      }
    },
    () => {
      collectItem(entity)
    }
  )

  return entity
}

/**
 * Lógica de recolección cuando el jugador toca/presiona el material.
 */
export function collectItem(entity: Entity) {
  if (!CollectableItemComponent.has(entity)) return

  const itemData = CollectableItemComponent.get(entity)
  if (itemData.isCollected) return

  const config = COLLECTABLE_ITEMS[itemData.itemId]
  const itemName = config ? config.nameEs : itemData.itemId

  // Marcar como recolectado
  const mutItem = CollectableItemComponent.getMutable(entity)
  mutItem.isCollected = true

  // Añadir al inventario local
  addMaterialToInventory(itemData.itemId, 1)

  // Log de combate/recolección
  addCombatLog(`+1 ${itemName} (${itemData.rarity.toUpperCase()})`, itemConfigColorHex(itemData.rarity))

  console.log(`🔨 [Material Recolectado]: ${itemName} (${itemData.rarity}) en zona ${itemData.zone}`)

  // Ocultar y remover la entidad
  engine.removeEntity(entity)
}

function itemConfigColorHex(rarity: string): string {
  switch (rarity) {
    case ItemRarity.COMMON:
      return '#A0A0A0'
    case ItemRarity.UNCOMMON:
      return '#00FF44'
    case ItemRarity.RARE:
      return '#00D4FF'
    case ItemRarity.EPIC:
      return '#C038FF'
    case ItemRarity.LEGENDARY:
      return '#FFAA00'
    default:
      return '#FFFFFF'
  }
}

/**
 * Inicializa exactamente 90 ítems distribuidos por todo el mapa.
 */
export function spawnInitialMapItems(targetTotalCount: number = 90) {
  let spawnedCount = 0

  for (const [zoneName, zoneBounds] of Object.entries(ITEM_ZONE_BOUNDS)) {
    const zoneTarget = Math.max(1, Math.round(targetTotalCount * zoneBounds.weight))

    for (let i = 0; i < zoneTarget; i++) {
      const itemConfig = pickRandomItemConfigForZone(zoneName)
      const position = getRandomPositionInZone(zoneName)
      spawnItemEntity(itemConfig, position)
      spawnedCount++
    }
  }

  // Ajustar si falta o sobra para cumplir exactamente 90
  while (spawnedCount < targetTotalCount) {
    const itemConfig = pickRandomItemConfigForZone('Los Chatarrales')
    const position = getRandomPositionInZone('Los Chatarrales')
    spawnItemEntity(itemConfig, position)
    spawnedCount++
  }

  console.log(`📦 [Material Spawner] Inicializados exactamente ${spawnedCount} materiales coleccionables en el mapa (Target: ${targetTotalCount}).`)
}
