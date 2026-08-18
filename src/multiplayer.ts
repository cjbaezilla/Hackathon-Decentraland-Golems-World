import { engine, Schemas, PlayerIdentityData, Entity } from '@dcl/sdk/ecs'
import { syncEntity, isStateSyncronized } from '@dcl/sdk/network'
import { MessageBus } from '@dcl/sdk/message-bus'

/**
 * ============================================================================
 * INFRAESTRUCTURA BASE MULTIJUGADOR (SDK7 ECS)
 * ============================================================================
 * Este módulo contiene toda la base técnica para sincronización multijugador P2P:
 * 1. MessageBus: Comunicación de eventos efímeros en tiempo real.
 * 2. SyncEntity: Helpers para sincronizar entidades y componentes CRDT.
 * 3. Detección y listado de jugadores en la escena.
 */

/**
 * Instancia de MessageBus compartida para emisión y escucha de mensajes efímeros
 * entre todos los clientes conectados a la misma sala/isla.
 *
 * Ejemplo de uso:
 * ```typescript
 * sceneMessageBus.emit('mi_evento', { data: 123 })
 * sceneMessageBus.on('mi_evento', (payload) => { ... })
 * ```
 */
export const sceneMessageBus = new MessageBus()

/**
 * Consulta si el estado de red CRDT local ya está sincronizado con los peers.
 */
export function isNetworkSynchronized(): boolean {
  return isStateSyncronized()
}

/**
 * Devuelve el número total de avatares/jugadores actualmente presentes en la escena.
 */
export function getConnectedPlayersCount(): number {
  let count = 0
  for (const [_entity] of engine.getEntitiesWith(PlayerIdentityData)) {
    count++
  }
  return Math.max(1, count)
}

/**
 * Obtiene la dirección (wallet) del jugador local si está disponible.
 */
export function getLocalPlayerAddress(): string | undefined {
  for (const [entity] of engine.getEntitiesWith(PlayerIdentityData)) {
    const data = PlayerIdentityData.get(entity)
    if (data && data.address) {
      return data.address
    }
  }
  return undefined
}

/**
 * Helper para registrar una entidad para sincronización en red CRDT.
 *
 * @param entity Entidad a sincronizar.
 * @param componentIds Array con los componentId de los componentes que deben sincronizarse.
 * @param syncId ID numérico único opcional (necesario para entidades preexistentes estáticas).
 *
 * Ejemplo:
 * ```typescript
 * syncNetworkEntity(miEntidad, [Transform.componentId, MiComponente.componentId], 100)
 * ```
 */
export function syncNetworkEntity(entity: Entity, componentIds: number[], syncId?: number) {
  if (syncId !== undefined) {
    syncEntity(entity, componentIds, syncId)
  } else {
    syncEntity(entity, componentIds)
  }
}

/**
 * Plantilla de ejemplo para crear componentes sincronizados:
 *
 * ```typescript
 * export const CustomSharedState = engine.defineComponent('hackathon::CustomSharedState', {
 *   score: Schemas.Int,
 *   stateText: Schemas.String,
 *   isActive: Schemas.Boolean,
 *   timestamp: Schemas.Int64
 * })
 * ```
 */
