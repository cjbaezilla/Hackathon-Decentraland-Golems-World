import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  pointerEventsSystem,
  InputAction,
  MeshRenderer,
  Material,
  MaterialTransparencyMode
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4, Color3 } from '@dcl/sdk/math'
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
  weight: number // Peso proporcional de zona para la distribución de 130 ítems
}

export const ITEM_ZONE_BOUNDS: Record<string, ZoneBounds> = {
  'Los Chatarrales': {
    name: 'Los Chatarrales',
    minX: 4,
    maxX: 136,
    minZ: 144,
    maxZ: 256,
    weight: 0.138 // 13.8% (18 ítems)
  },
  'Fábrica Abandonada': {
    name: 'Fábrica Abandonada',
    minX: 144,
    maxX: 256,
    minZ: 144,
    maxZ: 256,
    weight: 0.138 // 13.8% (18 ítems)
  },
  'Corredor y Gran Vía Sur': {
    name: 'Corredor y Gran Vía Sur',
    minX: 144,
    maxX: 256,
    minZ: 4,
    maxZ: 136,
    weight: 0.092 // 9.2% (12 ítems)
  },
  'Subestación Eléctrica': {
    name: 'Subestación Eléctrica',
    minX: 144,
    maxX: 256,
    minZ: 264,
    maxZ: 396,
    weight: 0.123 // 12.3% (16 ítems)
  },
  'Torre de Radio': {
    name: 'Torre de Radio',
    minX: 264,
    maxX: 396,
    minZ: 144,
    maxZ: 256,
    weight: 0.123 // 12.3% (16 ítems)
  },
  'Reserva de Minería': {
    name: 'Reserva de Minería',
    minX: 264,
    maxX: 396,
    minZ: 264,
    maxZ: 396,
    weight: 0.123 // 12.3% (16 ítems)
  },
  'Calderas de la Fundición (PK)': {
    name: 'Calderas de la Fundición (PK)',
    minX: 264,
    maxX: 396,
    minZ: 4,
    maxZ: 136,
    weight: 0.138 // 13.8% (18 ítems) - PK
  },
  'Desierto de Chatarra (PK)': {
    name: 'Desierto de Chatarra (PK)',
    minX: 4,
    maxX: 136,
    minZ: 264,
    maxZ: 396,
    weight: 0.123 // 12.3% (16 ítems) - PK
  }
}

/**
 * Mapeo de zona canónica para emparejar con el campo `zone` de ItemConfig.
 */
function normalizeZoneName(configZone: string): string {
  if (configZone.includes('Corredor') || configZone.includes('Gran Vía')) return 'Corredor y Gran Vía Sur'
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
 * Obtiene una piscina temática ampliada de materiales compatibles con cada zona del mapa.
 */
export function getThematicCandidatePool(zoneName: string, allItems: ItemConfig[]): ItemConfig[] {
  const normalizedZone = normalizeZoneName(zoneName)

  switch (normalizedZone) {
    case 'Corredor y Gran Vía Sur':
      return allItems.filter(
        (item) =>
          item.rarity === ItemRarity.COMMON ||
          item.rarity === ItemRarity.UNCOMMON ||
          ['alambre_cobre', 'tornillos_pernos', 'engranajes_desgastados', 'tubos_cobre', 'sartenes', 'ollas_cocinar', 'placas_laton', 'clavos_oxidados', 'latas_conserva', 'cadenas_hierro', 'tuercas_gigantes', 'transistores', 'resortes_reloj', 'manometros', 'valvulas_vapor'].includes(item.id)
      )
    case 'Subestación Eléctrica':
      return allItems.filter(
        (item) =>
          item.zone.includes('Subestación') ||
          item.statsContribution.affinityFocus === 'GALVANIC' ||
          ['transistores', 'fusibles_fundidos', 'cables_deshilachados', 'alambre_cobre', 'bateria_plasma', 'motor_vapor', 'bobinas_tesla', 'baterias_alquimicas', 'dinamo_galvanica', 'condensador_presion'].includes(item.id)
      )
    case 'Torre de Radio':
      return allItems.filter(
        (item) =>
          item.zone.includes('Torre') ||
          item.statsContribution.affinityFocus === 'LUMINOUS' ||
          ['antenas_radio', 'diodos_led', 'cristal_fuerza', 'matriz_optica_solar', 'bombillas_filamento', 'tubos_vacio', 'lentes_tv_viejo'].includes(item.id)
      )
    case 'Reserva de Minería':
      return allItems.filter(
        (item) =>
          item.zone.includes('Minería') ||
          item.statsContribution.affinityFocus === 'MECHANICAL' ||
          ['engranajes_bronce', 'giroscopio_precision', 'nucleo_mana', 'cerebro_automata', 'brujulas_magneticas', 'resortes_reloj', 'engranajes_desgastados', 'tuercas_gigantes'].includes(item.id)
      )
    case 'Calderas de la Fundición (PK)':
      return allItems.filter(
        (item) =>
          item.zone.includes('Calderas') ||
          item.zone.includes('Fundición') ||
          item.statsContribution.affinityFocus === 'STEAM' ||
          ['reactor_eter', 'corazon_caldera', 'embolo_titanio', 'motor_vapor', 'valvulas_vapor', 'manometros', 'residuos_carbon', 'sartenes', 'ollas_cocinar', 'tuercas_gigantes', 'cadenas_hierro'].includes(item.id)
      )
    case 'Desierto de Chatarra (PK)':
      return allItems.filter(
        (item) =>
          item.zone.includes('Desierto') ||
          item.rarity === ItemRarity.LEGENDARY ||
          item.statsContribution.affinityFocus === 'AETHER' ||
          ['ojo_dragon', 'corazon_primigenio', 'singularidad_eterica', 'relicario_astral', 'nucleo_mana', 'reactor_eter', 'cristal_fuerza', 'bateria_plasma', 'bobinas_tesla', 'dinamo_galvanica'].includes(item.id)
      )
    case 'Fábrica Abandonada':
      return allItems.filter((item) => item.rarity === ItemRarity.UNCOMMON || item.zone.includes('Fábrica'))
    case 'Los Chatarrales':
    default:
      return allItems.filter((item) => item.rarity === ItemRarity.COMMON || item.zone.includes('Chatarrales'))
  }
}

/**
 * Verifica si una coordenada (x, z) cumple con las exclusiones del mapa
 * y mantiene una distancia mínima de separación respecto a otros ítems activos.
 */
export function isPositionValidAndSeparated(x: number, z: number, minDistance: number = 7.0): boolean {
  // 1. Excluir el poblado inicial / Distrito de la Forja (0..140m X, 0..140m Z)
  if (x <= 140 && z <= 140) {
    return false
  }

  // 2. Excluir la Gran Arena Central (Centro 200,200 con radio de 38m / 162..238m)
  const distToArenaCenter = Math.sqrt((x - 200) ** 2 + (z - 200) ** 2)
  if (distToArenaCenter <= 39) {
    return false
  }

  // 3. Verificar separación mínima con todos los ítems activos existentes en el mapa
  for (const [entity] of engine.getEntitiesWith(CollectableItemComponent, Transform)) {
    const itemData = CollectableItemComponent.get(entity)
    if (itemData.isCollected) continue

    const otherPos = Transform.get(entity).position
    const itemDist = Math.sqrt((x - otherPos.x) ** 2 + (z - otherPos.z) ** 2)

    if (itemDist < minDistance) {
      return false
    }
  }

  return true
}

/**
 * Genera una posición aleatoria optimizada dentro de la zona especificada.
 * Abarca los bordes del mapa (0..400m), garantiza una separación mínima entre ítems
 * y omite strictly la ciudad inicial de la Forja y la Gran Arena Central.
 */
export function getRandomPositionInZone(zoneName: string): Vector3 {
  const bounds = ITEM_ZONE_BOUNDS[zoneName] || ITEM_ZONE_BOUNDS['Los Chatarrales']

  // Probar separación de 7.5m, reduciendo progresivamente si la zona es muy densa
  const minDistances = [7.5, 6.0, 4.5, 3.0]

  for (const minDist of minDistances) {
    for (let attempts = 0; attempts < 60; attempts++) {
      const x = bounds.minX + Math.random() * (bounds.maxX - bounds.minX)
      const z = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ)

      if (isPositionValidAndSeparated(x, z, minDist)) {
        return Vector3.create(x, -0.5, z)
      }
    }
  }

  // Fallback seguro con coordenadas aleatorias en los bordes de la zona
  const fallbackX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX)
  const fallbackZ = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ)
  return Vector3.create(fallbackX, -0.5, fallbackZ)
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
 * Selecciona una pieza de material ponderada por spawnWeight dentro de la piscina temática de su zona.
 */
export function pickRandomItemConfigForZone(zoneName: string): ItemConfig {
  const allItems = Object.values(COLLECTABLE_ITEMS)
  const candidatePool = getThematicCandidatePool(zoneName, allItems)

  // Filtrar ítems únicos que ya estén activos en el mapa
  const availablePool = candidatePool.filter((item) => {
    if (item.isUniqueInstance) {
      return !isUniqueItemActive(item.id)
    }
    return true
  })

  // Si todos los ítems únicos de la zona están activos, utilizar los no únicos de esa piscina temática
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

  // --------------------------------------------------------------------------
  // HAZ DE LUZ VERTICAL DE PRUEBA (TEST BEAM OF LIGHT / VERTICAL BEACON RAY 30m)
  // --------------------------------------------------------------------------
  const beamEntity = engine.addEntity()
  const beamColors = getItemBeamColor(itemConfig.rarity)

  Transform.create(beamEntity, {
    parent: entity,
    position: Vector3.create(0, 15, 0),
    scale: Vector3.create(0.18, 30, 0.18)
  })

  MeshRenderer.setCylinder(beamEntity)

  Material.setPbrMaterial(beamEntity, {
    albedoColor: beamColors.albedo,
    emissiveColor: beamColors.emissive,
    emissiveIntensity: 4.5,
    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND
  })

  return entity
}

/**
 * Auxiliar para obtener el esquema de colores del haz de luz según la rareza del ítem.
 */
function getItemBeamColor(rarity: string): { albedo: Color4; emissive: Color3 } {
  switch (rarity) {
    case ItemRarity.COMMON:
      return {
        albedo: Color4.create(0.8, 0.8, 0.8, 0.45),
        emissive: Color3.create(0.7, 0.7, 0.7)
      }
    case ItemRarity.UNCOMMON:
      return {
        albedo: Color4.create(0.0, 1.0, 0.3, 0.6),
        emissive: Color3.create(0.0, 1.0, 0.3)
      }
    case ItemRarity.RARE:
      return {
        albedo: Color4.create(0.0, 0.83, 1.0, 0.7),
        emissive: Color3.create(0.0, 0.83, 1.0)
      }
    case ItemRarity.EPIC:
      return {
        albedo: Color4.create(0.75, 0.22, 1.0, 0.8),
        emissive: Color3.create(0.75, 0.22, 1.0)
      }
    case ItemRarity.LEGENDARY:
      return {
        albedo: Color4.create(1.0, 0.67, 0.0, 0.9),
        emissive: Color3.create(1.0, 0.67, 0.0)
      }
    default:
      return {
        albedo: Color4.create(1.0, 1.0, 1.0, 0.5),
        emissive: Color3.create(1.0, 1.0, 1.0)
      }
  }
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
 * Inicializa exactamente 130 ítems distribuidos por todo el mapa.
 */
export function spawnInitialMapItems(targetTotalCount: number = 130) {
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
