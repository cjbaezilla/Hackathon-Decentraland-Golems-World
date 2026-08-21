import {
  engine,
  Entity,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { CollectableItemComponent } from '../components/item'
import {
  spawnItemEntity,
  pickRandomItemConfigForZone,
  getRandomPositionInZone
} from '../objects/itemGenerator'
import { updateHeatRadarState } from '../state'

export interface RespawnTask {
  zone: string
  respawnTimeMs: number
}

// Cola global de tareas de respawn
const respawnQueue: RespawnTask[] = []

// Target fijo de ítems activos en el mapa (90 ítems)
const TARGET_MAP_ITEMS_COUNT = 90

// Timeout de rotación de ítems no recolectados (30 minutos en ms)
const ITEM_ROTATION_TIMEOUT_MS = 30 * 60 * 1000

let timeAccumulator = 0

/**
 * ============================================================================
 * SISTEMA ECS SDK7: CONTROL DE RESPAWN, TIMEOUTS Y RADAR DE CALOR DE MATERIALES
 * ============================================================================
 * Maneja el ciclo de vida continuo de los 90 ítems del mapa:
 * 1. Procesamiento de respawns programados tras recolección.
 * 2. Timeout de rotación para ítems olvidados (>30 min).
 * 3. Cálculo de proximidad del Radar de Calor para el avatar local.
 * 4. Revelación e iluminación dinámica de piezas cuando el jugador se acerca (<4m).
 */
export function itemSpawnSystem(dt: number) {
  timeAccumulator += dt

  const now = Date.now()

  // --------------------------------------------------------------------------
  // 1. PROCESAR COLA DE RESPAWN
  // --------------------------------------------------------------------------
  for (let i = respawnQueue.length - 1; i >= 0; i--) {
    const task = respawnQueue[i]
    if (now >= task.respawnTimeMs) {
      // Remover de la cola y generar nuevo ítem en la zona
      respawnQueue.splice(i, 1)

      const config = pickRandomItemConfigForZone(task.zone)
      const pos = getRandomPositionInZone(task.zone)
      spawnItemEntity(config, pos)
    }
  }

  // --------------------------------------------------------------------------
  // 2. VERIFICAR TIMEOUT DE ROTACIÓN (30 MIN) Y CONTAR ACTIVOS
  // --------------------------------------------------------------------------
  let activeCount = 0
  let nearestDistance = 9999
  let nearestRarity = 'common'
  let nearestItemId = ''

  let playerPos = Vector3.Zero()
  if (Transform.has(engine.PlayerEntity)) {
    playerPos = Transform.get(engine.PlayerEntity).position
  }

  for (const [entity] of engine.getEntitiesWith(CollectableItemComponent, Transform)) {
    const itemData = CollectableItemComponent.get(entity)

    if (itemData.isCollected) {
      continue
    }

    activeCount++

    // Timeout de rotación para ítems olvidados
    if (now - itemData.spawnTimestamp > ITEM_ROTATION_TIMEOUT_MS) {
      scheduleRespawn(itemData.zone, itemData.respawnMinMinutes, itemData.respawnMaxMinutes)
      engine.removeEntity(entity)
      continue
    }

    const transform = Transform.get(entity)
    const dist = Math.sqrt(
      (playerPos.x - transform.position.x) ** 2 +
      (playerPos.z - transform.position.z) ** 2
    )

    // Actualizar menor distancia para el Radar de Calor
    if (dist < nearestDistance) {
      nearestDistance = dist
      nearestRarity = itemData.rarity
      nearestItemId = itemData.itemId
    }

    // Emerger de la tierra (Y = -0.5 -> Y = originalY) al estar a menos de 4m
    if (dist <= 4.0 && !itemData.isRevealed) {
      const mutItem = CollectableItemComponent.getMutable(entity)
      mutItem.isRevealed = true

      const mutTrans = Transform.getMutable(entity)
      mutTrans.position.y = itemData.originalY
    } else if (dist > 15.0 && itemData.isRevealed) {
      const mutItem = CollectableItemComponent.getMutable(entity)
      mutItem.isRevealed = false

      const mutTrans = Transform.getMutable(entity)
      mutTrans.position.y = -0.5
    }
  }

  // Si la cantidad de ítems cae por debajo de 90, reponer automáticamente
  if (activeCount + respawnQueue.length < TARGET_MAP_ITEMS_COUNT) {
    const missing = TARGET_MAP_ITEMS_COUNT - (activeCount + respawnQueue.length)
    for (let k = 0; k < missing; k++) {
      const config = pickRandomItemConfigForZone('Los Chatarrales')
      const pos = getRandomPositionInZone('Los Chatarrales')
      spawnItemEntity(config, pos)
    }
  }

  // Actualizar estado global del radar de calor
  updateHeatRadarState(nearestDistance, nearestRarity, nearestItemId)
}

/**
 * Programa el respawn de un ítem en la zona tras un intervalo aleatorio entre min y max minutos.
 */
export function scheduleRespawn(zone: string, minMinutes: number, maxMinutes: number) {
  const minMs = minMinutes * 60 * 1000
  const maxMs = maxMinutes * 60 * 1000
  const delay = minMs + Math.random() * (maxMs - minMs)

  respawnQueue.push({
    zone,
    respawnTimeMs: Date.now() + delay
  })
}
