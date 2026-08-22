import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  pointerEventsSystem,
  InputAction,
  MeshRenderer,
  MeshCollider,
  Material,
  MaterialTransparencyMode
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4, Color3 } from '@dcl/sdk/math'
import { COLLECTABLE_ITEMS, ItemConfig, ItemRarity } from '../config/items'
import { CollectableItemComponent } from '../components/item'
import { addMaterialToInventory, addCombatLog } from '../state'
import { t, getLanguage, getLocalizedRarity, onLanguageChange, Language } from '../i18n'
import {
  broadcastItemPickup,
  setupItemSyncListeners,
  requestItemSync,
  ItemPickupMessageDto
} from '../multiplayer'

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
    weight: 0.140 // 14.0% (21 ítems)
  },
  'Fábrica Abandonada': {
    name: 'Fábrica Abandonada',
    minX: 144,
    maxX: 256,
    minZ: 144,
    maxZ: 256,
    weight: 0.140 // 14.0% (21 ítems)
  },
  'Corredor y Gran Vía Sur': {
    name: 'Corredor y Gran Vía Sur',
    minX: 144,
    maxX: 256,
    minZ: 4,
    maxZ: 136,
    weight: 0.100 // 10.0% (15 ítems)
  },
  'Subestación Eléctrica': {
    name: 'Subestación Eléctrica',
    minX: 144,
    maxX: 256,
    minZ: 264,
    maxZ: 396,
    weight: 0.1267 // 12.67% (19 ítems)
  },
  'Torre de Radio': {
    name: 'Torre de Radio',
    minX: 264,
    maxX: 396,
    minZ: 144,
    maxZ: 256,
    weight: 0.1267 // 12.67% (19 ítems)
  },
  'Reserva de Minería': {
    name: 'Reserva de Minería',
    minX: 264,
    maxX: 396,
    minZ: 264,
    maxZ: 396,
    weight: 0.1267 // 12.67% (19 ítems)
  },
  'Calderas de la Fundición (PK)': {
    name: 'Calderas de la Fundición (PK)',
    minX: 264,
    maxX: 396,
    minZ: 4,
    maxZ: 136,
    weight: 0.120 // 12.0% (18 ítems) - PK
  },
  'Desierto de Chatarra (PK)': {
    name: 'Desierto de Chatarra (PK)',
    minX: 4,
    maxX: 136,
    minZ: 264,
    maxZ: 396,
    weight: 0.120 // 12.0% (18 ítems) - PK
  }
}

/** Registro global de IDs de instancias recolectadas en el mapa */
const collectedInstanceIds = new Set<string>()

export interface ItemEntityRecord {
  entity: Entity
  beamEntity: Entity
}

/** Registro global de entidades de ítems activos [instanceId -> ItemEntityRecord] */
const activeItemEntities = new Map<string, ItemEntityRecord>()

/** Generador Pseudoaleatorio Determinista con Semilla (Mulberry32) */
let currentSeed = 0x428913

export function resetDeterministicSeed(seed: number = 0x428913) {
  currentSeed = seed
}

export function deterministicRandom(): number {
  let t = (currentSeed += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export function getCollectedItemInstanceIds(): string[] {
  return Array.from(collectedInstanceIds)
}

/**
 * Obtiene la etiqueta de interacción del puntero para un ítem en el idioma activo o especificado.
 */
export function getItemHoverLabel(itemConfig: ItemConfig, lang?: Language): string {
  const action = t('common.collect', undefined, lang)
  const currentLang = lang || getLanguage()
  const itemName = currentLang === 'en' ? itemConfig.nameEn : itemConfig.nameEs
  const rarity = getLocalizedRarity(itemConfig.rarity, lang)
  return `${action} ${itemName} (${rarity.toUpperCase()})`
}

/**
 * Actualiza dinámicamente los rótulos hoverText de todos los ítems activos en el mapa al cambiar de idioma.
 */
export function updateAllGroundItemHoverTexts() {
  for (const [instanceId, record] of activeItemEntities) {
    if (!CollectableItemComponent.has(record.entity)) continue
    const itemData = CollectableItemComponent.get(record.entity)
    if (itemData.isCollected) continue
    const itemConfig = COLLECTABLE_ITEMS[itemData.itemId]
    if (!itemConfig) continue

    const hoverLabel = getItemHoverLabel(itemConfig)

    pointerEventsSystem.onPointerDown(
      {
        entity: record.entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: hoverLabel,
          maxDistance: 6.5
        }
      },
      () => {
        collectItem(record.entity, false)
      }
    )

    if (record.beamEntity) {
      pointerEventsSystem.onPointerDown(
        {
          entity: record.beamEntity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: hoverLabel,
            maxDistance: 6.5
          }
        },
        () => {
          collectItem(record.entity, false)
        }
      )
    }
  }
}

// Suscripción global para actualización reactiva en tiempo real al cambiar el idioma
onLanguageChange(() => {
  updateAllGroundItemHoverTexts()
})

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
 */
export function getRandomPositionInZone(zoneName: string, useDeterministic: boolean = false): Vector3 {
  const bounds = ITEM_ZONE_BOUNDS[zoneName] || ITEM_ZONE_BOUNDS['Los Chatarrales']
  const randFunc = useDeterministic ? deterministicRandom : Math.random

  const minDistances = [7.5, 6.0, 4.5, 3.0]

  for (const minDist of minDistances) {
    for (let attempts = 0; attempts < 60; attempts++) {
      const x = bounds.minX + randFunc() * (bounds.maxX - bounds.minX)
      const z = bounds.minZ + randFunc() * (bounds.maxZ - bounds.minZ)

      if (isPositionValidAndSeparated(x, z, minDist)) {
        return Vector3.create(x, -0.5, z)
      }
    }
  }

  const fallbackX = bounds.minX + randFunc() * (bounds.maxX - bounds.minX)
  const fallbackZ = bounds.minZ + randFunc() * (bounds.maxZ - bounds.minZ)
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
export function pickRandomItemConfigForZone(zoneName: string, useDeterministic: boolean = false): ItemConfig {
  const allItems = Object.values(COLLECTABLE_ITEMS)
  const candidatePool = getThematicCandidatePool(zoneName, allItems)
  const randFunc = useDeterministic ? deterministicRandom : Math.random

  const availablePool = candidatePool.filter((item) => {
    if (item.isUniqueInstance) {
      return !isUniqueItemActive(item.id)
    }
    return true
  })

  const nonUniqueZoneItems = candidatePool.filter((item) => !item.isUniqueInstance)
  const finalPool = availablePool.length > 0 
    ? availablePool 
    : (nonUniqueZoneItems.length > 0 ? nonUniqueZoneItems : candidatePool)

  const totalWeight = finalPool.reduce((sum, item) => sum + item.spawnWeight, 0)
  let randomRoll = randFunc() * totalWeight

  for (const item of finalPool) {
    if (randomRoll <= item.spawnWeight) {
      return item
    }
    randomRoll -= item.spawnWeight
  }

  return finalPool[0]
}

/**
 * Instancia una entidad SDK7 de ítem coleccionable en el mundo con instanceId síncrono.
 */
export function spawnItemEntity(itemConfig: ItemConfig, position: Vector3, instanceId?: string): Entity {
  const entity = engine.addEntity()
  const finalInstanceId = instanceId || `item_inst_${Date.now()}_${Math.floor(Math.random() * 10000)}`

  const originalY = 0.25
  Transform.create(entity, {
    position: Vector3.create(position.x, position.y, position.z),
    scale: Vector3.create(0.8, 0.8, 0.8),
    rotation: Quaternion.fromEulerDegrees(0, Math.random() * 360, 0)
  })

  GltfContainer.create(entity, {
    src: itemConfig.modelSrc
  })

  CollectableItemComponent.create(entity, {
    instanceId: finalInstanceId,
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

  // Hitbox de colisión explícita para la interacción del puntero de ratón en PC
  MeshCollider.setBox(entity)

  const hoverLabel = getItemHoverLabel(itemConfig)

  // Interacción de recolección táctil (Mobile First) y ratón (PC)
  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverLabel,
        maxDistance: 6.5
      }
    },
    () => {
      collectItem(entity, false)
    }
  )

  // Haz de luz de rareza
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

  // Permite interactuar y ver el texto hoverText también al apuntar al haz de luz vertical
  pointerEventsSystem.onPointerDown(
    {
      entity: beamEntity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverLabel,
        maxDistance: 6.5
      }
    },
    () => {
      collectItem(entity, false)
    }
  )

  // Registrar en el mapa de entidades activas
  activeItemEntities.set(finalInstanceId, { entity, beamEntity })

  return entity
}

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
 * Lógica síncrona de recolección cuando un jugador (local o remoto) recoge un material.
 */
export function collectItem(entity: Entity, fromRemote: boolean = false) {
  if (!CollectableItemComponent.has(entity)) return

  const itemData = CollectableItemComponent.get(entity)
  if (itemData.isCollected || collectedInstanceIds.has(itemData.instanceId)) {
    // Si ya estaba recolectado, remover entidad local si aún existe
    if (activeItemEntities.has(itemData.instanceId)) {
      const record = activeItemEntities.get(itemData.instanceId)
      activeItemEntities.delete(itemData.instanceId)
      if (record) {
        engine.removeEntity(record.entity)
      }
    }
    return
  }

  const config = COLLECTABLE_ITEMS[itemData.itemId]
  const currentLang = getLanguage()
  const itemName = config
    ? (currentLang === 'en' ? config.nameEn : config.nameEs)
    : itemData.itemId
  const localizedRarity = getLocalizedRarity(itemData.rarity)

  // Marcar como recolectado globalmente
  collectedInstanceIds.add(itemData.instanceId)

  const mutItem = CollectableItemComponent.getMutable(entity)
  mutItem.isCollected = true

  if (!fromRemote) {
    // Recolección por el jugador local
    addMaterialToInventory(itemData.itemId, 1)
    addCombatLog(`+1 ${itemName} (${localizedRarity.toUpperCase()})`, itemConfigColorHex(itemData.rarity))
    console.log(`🔨 [Material Recolectado Local]: ${itemName} (${itemData.instanceId}) en zona ${itemData.zone}`)

    // Difundir recolección a todos los peers conectados en la escena
    broadcastItemPickup(itemData.instanceId, itemData.itemId)
  } else {
    // Recolección por otro jugador remoto
    const remoteLog = currentLang === 'en'
      ? `🌐 [Multiplayer] A player collected ${itemName}`
      : `🌐 [Multijugador] Un jugador recolectó ${itemName}`
    addCombatLog(remoteLog, '#A0A0A0')
    console.log(`🔨 [Material Recolectado Remoto]: ${itemName} (${itemData.instanceId}) por peer.`)
  }

  // Ocultar y eliminar la entidad del mundo de forma inmediata
  const record = activeItemEntities.get(itemData.instanceId)
  activeItemEntities.delete(itemData.instanceId)
  if (record) {
    engine.removeEntity(record.entity)
  } else {
    engine.removeEntity(entity)
  }
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
 * Procesa la notificación de recolección enviada por un peer remoto.
 */
export function handleRemoteItemPickup(pickup: ItemPickupMessageDto) {
  if (!pickup || !pickup.instanceId) return

  collectedInstanceIds.add(pickup.instanceId)

  const record = activeItemEntities.get(pickup.instanceId)
  if (record) {
    collectItem(record.entity, true)
    return
  }

  // Si no está en el mapa directo, buscar en las entidades registradas
  for (const [entity] of engine.getEntitiesWith(CollectableItemComponent)) {
    const itemData = CollectableItemComponent.get(entity)
    if (itemData.instanceId === pickup.instanceId) {
      collectItem(entity, true)
      break
    }
  }
}

/**
 * Procesa la lista de ítems recolectados recibida al sincronizar con peers.
 */
export function handleRemoteItemSync(collectedIds: string[]) {
  if (!Array.isArray(collectedIds)) return

  for (const id of collectedIds) {
    collectedInstanceIds.add(id)
    const record = activeItemEntities.get(id)
    if (record) {
      activeItemEntities.delete(id)
      engine.removeEntity(record.entity)
    }
  }
}

/**
 * Inicializa exactamente 150 ítems compartidos de forma síncrona en el mapa.
 */
export function spawnInitialMapItems(targetTotalCount: number = 150) {
  let spawnedCount = 0
  resetDeterministicSeed(0x428913)

  for (const [zoneName, zoneBounds] of Object.entries(ITEM_ZONE_BOUNDS)) {
    const zoneTarget = Math.max(1, Math.round(targetTotalCount * zoneBounds.weight))

    for (let i = 0; i < zoneTarget; i++) {
      const instanceId = `item_slot_${spawnedCount}`
      const itemConfig = pickRandomItemConfigForZone(zoneName, true)
      const position = getRandomPositionInZone(zoneName, true)
      spawnItemEntity(itemConfig, position, instanceId)
      spawnedCount++
    }
  }

  while (spawnedCount < targetTotalCount) {
    const instanceId = `item_slot_${spawnedCount}`
    const itemConfig = pickRandomItemConfigForZone('Los Chatarrales', true)
    const position = getRandomPositionInZone('Los Chatarrales', true)
    spawnItemEntity(itemConfig, position, instanceId)
    spawnedCount++
  }

  // Configurar escuchadores de MessageBus para sincronización multijugador
  setupItemSyncListeners(
    handleRemoteItemPickup,
    handleRemoteItemSync,
    getCollectedItemInstanceIds
  )

  // Solicitar sincronización de estado de ítems a otros jugadores en la escena
  requestItemSync()

  // Instanciar materiales de prueba para Golem #001 en X: 40.0m, Z: 21.1m (Parcela [2, 1])
  spawnGolem1TestMaterials()

  console.log(`📦 [Material Spawner Multijugador] Inicializados exactamente ${spawnedCount} materiales síncronos compartidos (Target: ${targetTotalCount}).`)
}

/**
 * Instancia en las coordenadas exactas X: 40.0m | Z: 21.1m (Parcela [2, 1]) los 10 materiales necesarios
 * para forjar el Golem #001 (Baluarte Eléctrico):
 * 2x palancas_interruptor, 2x tuercas_gigantes, 2x cadenas_hierro, 2x manometros, 2x tornillos_pernos
 */
export function spawnGolem1TestMaterials(centerPos: Vector3 = Vector3.create(40.0, 0.25, 21.1)) {
  const recipeMaterials = [
    { id: 'palancas_interruptor', offset: Vector3.create(-0.6, 0, -0.6) },
    { id: 'palancas_interruptor', offset: Vector3.create(-0.3, 0, -0.4) },
    { id: 'tuercas_gigantes', offset: Vector3.create(0.4, 0, -0.6) },
    { id: 'tuercas_gigantes', offset: Vector3.create(0.6, 0, -0.4) },
    { id: 'cadenas_hierro', offset: Vector3.create(-0.6, 0, 0.4) },
    { id: 'cadenas_hierro', offset: Vector3.create(-0.4, 0, 0.6) },
    { id: 'manometros', offset: Vector3.create(0.4, 0, 0.4) },
    { id: 'manometros', offset: Vector3.create(0.6, 0, 0.6) },
    { id: 'tornillos_pernos', offset: Vector3.create(0.0, 0, -0.8) },
    { id: 'tornillos_pernos', offset: Vector3.create(0.0, 0, 0.8) }
  ]

  recipeMaterials.forEach((mat, idx) => {
    const itemConfig = COLLECTABLE_ITEMS[mat.id]
    if (!itemConfig) return

    const pos = Vector3.add(centerPos, mat.offset)
    pos.y = 0.25
    const instanceId = `test_golem1_item_${idx}_${Date.now()}`
    const entity = spawnItemEntity(itemConfig, pos, instanceId)

    // Revelar inmediatamente para visibilidad instantánea
    if (CollectableItemComponent.has(entity)) {
      const data = CollectableItemComponent.getMutable(entity)
      data.isRevealed = true
      data.originalY = 0.25
    }
  })

  console.log('🧪 [Test Materials] Instanciados 10 materiales para el Golem #001 en Parcela [2, 1] (X: 40.0m, Z: 21.1m).')
}

