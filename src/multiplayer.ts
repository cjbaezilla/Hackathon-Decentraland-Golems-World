import { engine, PlayerIdentityData } from '@dcl/sdk/ecs'
import { MessageBus } from '@dcl/sdk/message-bus'
import { getPlayer } from '@dcl/sdk/src/players'
import { GolemConfig, generateRandomSquad } from './config/golems'
import { getLocalActiveSquad } from './state'
import { PlayerSquadAnnouncementDto, GolemSquadMemberDto } from './components/follower'
import { GolemAttackMessageDto, GolemDefeatMessageDto } from './components/combat'

/**
 * ============================================================================
 * INFRAESTRUCTURA MULTIJUGADOR Y SINCRONIZACIÓN DE ESCUADRONES Y COMBATE
 * ============================================================================
 * Maneja la comunicación P2P mediante MessageBus para difundir y recibir
 * los escuadrones de golems con sus estadísticas completas y los eventos
 * de combate en tiempo real (ataques, daño, derrotas y EXP).
 */

export const sceneMessageBus = new MessageBus()

/** Nombres canónicos de eventos para MessageBus */
export const SQUAD_MESSAGE_TYPES = {
  ANNOUNCE: 'golem_squad_announce',
  REQUEST: 'golem_squad_request',
  ATTACK: 'golem_combat_attack',
  DEFEAT: 'golem_combat_defeat'
} as const

export const ITEM_MESSAGE_TYPES = {
  PICKUP: 'golem_item_pickup',
  SYNC_REQ: 'golem_item_sync_req',
  SYNC_RES: 'golem_item_sync_res'
} as const

export interface ItemPickupMessageDto {
  instanceId: string
  collectorAddress: string
  itemId: string
  timestamp: number
}

export interface ItemSyncResponseDto {
  senderAddress: string
  collectedInstanceIds: string[]
  timestamp: number
}

/** Registro local en memoria de escuadrones de jugadores remotos [address -> golems] */
const remoteSquadRegistry = new Map<string, GolemSquadMemberDto[]>()

/** Callbacks registrados para notificar a los sistemas ECS */
let onSquadReceivedCallback: ((ownerAddress: string, squad: GolemSquadMemberDto[]) => void) | null = null
let onAttackReceivedCallback: ((attack: GolemAttackMessageDto) => void) | null = null
let onDefeatReceivedCallback: ((defeat: GolemDefeatMessageDto) => void) | null = null
let onItemPickedUpCallback: ((pickup: ItemPickupMessageDto) => void) | null = null
let onItemSyncReceivedCallback: ((collectedIds: string[]) => void) | null = null

let cachedLocalId: string | null = null

/**
 * Obtiene el identificador o dirección de wallet del jugador local de forma consistente.
 */
export function getLocalPlayerId(): string {
  if (cachedLocalId && cachedLocalId !== 'local_player') {
    return cachedLocalId
  }

  const localPlayer = getPlayer()
  if (localPlayer && localPlayer.userId) {
    cachedLocalId = localPlayer.userId.toLowerCase()
    return cachedLocalId
  }

  // Fallback si getPlayer() aún no cargó
  for (const [entity] of engine.getEntitiesWith(PlayerIdentityData)) {
    const data = PlayerIdentityData.get(entity)
    if (data && data.address) {
      cachedLocalId = data.address.toLowerCase()
      return cachedLocalId
    }
  }

  return 'local_player'
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
 * Obtiene la configuración de escuadrón registrada para un jugador remoto.
 */
export function getRemoteSquad(ownerAddress: string): GolemSquadMemberDto[] | undefined {
  return remoteSquadRegistry.get(ownerAddress.toLowerCase())
}

/**
 * Anuncia el escuadrón actual del jugador local con sus estadísticas completas.
 */
export function announceLocalSquad(customSquad?: GolemConfig[]) {
  const localId = getLocalPlayerId()
  const squadToAnnounce = customSquad || getLocalActiveSquad() || generateRandomSquad(localId)

  const payload: PlayerSquadAnnouncementDto = {
    ownerAddress: localId,
    timestamp: Date.now(),
    golems: squadToAnnounce.map((g) => ({
      id: g.id,
      name: g.name,
      affinity: g.affinity,
      modelSrc: g.modelSrc,
      scale: g.scale,
      followDistance: g.followDistance,
      moveSpeed: g.moveSpeed,
      rotationSpeed: g.rotationSpeed,
      attack: g.attack,
      defense: g.defense,
      maxHp: g.maxHp,
      currentHp: g.currentHp,
      speed: g.speed,
      expReward: g.expReward,
      currentExp: g.currentExp,
      level: g.level
    }))
  }

  sceneMessageBus.emit(SQUAD_MESSAGE_TYPES.ANNOUNCE, payload)
}

/**
 * Solicita a todos los demás jugadores en la escena que anuncien sus escuadrones.
 */
export function requestAllSquads() {
  const localId = getLocalPlayerId()
  sceneMessageBus.emit(SQUAD_MESSAGE_TYPES.REQUEST, { requester: localId, timestamp: Date.now() })
}

/**
 * Difunde un ataque asestado por un golem a todos los peers.
 */
export function broadcastGolemAttack(attack: GolemAttackMessageDto) {
  sceneMessageBus.emit(SQUAD_MESSAGE_TYPES.ATTACK, attack)
}

/**
 * Difunde la derrota de un golem y la recompensa de experiencia.
 */
export function broadcastGolemDefeat(defeat: GolemDefeatMessageDto) {
  sceneMessageBus.emit(SQUAD_MESSAGE_TYPES.DEFEAT, defeat)
}

/**
 * Configura los escuchadores de combate multijugador.
 */
export function setupCombatSyncListeners(
  onAttack?: (attack: GolemAttackMessageDto) => void,
  onDefeat?: (defeat: GolemDefeatMessageDto) => void
) {
  if (onAttack) onAttackReceivedCallback = onAttack
  if (onDefeat) onDefeatReceivedCallback = onDefeat
}

/**
 * Inicializa los escuchadores de MessageBus para sincronización total de escuadrones y combate.
 */
export function setupSquadSyncListeners(
  onSquadReceived?: (ownerAddress: string, squad: GolemSquadMemberDto[]) => void
) {
  if (onSquadReceived) {
    onSquadReceivedCallback = onSquadReceived
  }

  // 1. Escuchar anuncios de escuadrones de otros jugadores
  sceneMessageBus.on(
    SQUAD_MESSAGE_TYPES.ANNOUNCE,
    (payload: PlayerSquadAnnouncementDto) => {
      if (!payload || !payload.ownerAddress || !Array.isArray(payload.golems)) {
        return
      }

      const senderAddress = payload.ownerAddress.toLowerCase()
      const localId = getLocalPlayerId()

      // Ignorar nuestros propios ecos
      if (senderAddress === localId) {
        return
      }

      // Guardar en el registro en memoria
      remoteSquadRegistry.set(senderAddress, payload.golems)

      // Notificar al suscriptor (Fábrica / Sistema de seguimiento)
      if (onSquadReceivedCallback) {
        onSquadReceivedCallback(senderAddress, payload.golems)
      }
    }
  )

  // 2. Escuchar solicitudes de escuadrones de jugadores recién ingresados
  sceneMessageBus.on(
    SQUAD_MESSAGE_TYPES.REQUEST,
    (payload: { requester: string; timestamp: number }) => {
      if (!payload || !payload.requester) return

      const requester = payload.requester.toLowerCase()
      const localId = getLocalPlayerId()

      // Si otro jugador nos pide nuestro escuadrón, responder anunciando el nuestro
      if (requester !== localId) {
        announceLocalSquad()
      }
    }
  )

  // 3. Escuchar ataques de combate entre golems
  sceneMessageBus.on(
    SQUAD_MESSAGE_TYPES.ATTACK,
    (payload: GolemAttackMessageDto) => {
      if (!payload || !payload.attackerId || !payload.targetId) return

      const localId = getLocalPlayerId()
      // Si el evento provino de nosotros mismos, ya lo procesamos localmente
      if (payload.attackerOwner.toLowerCase() === localId) return

      if (onAttackReceivedCallback) {
        onAttackReceivedCallback(payload)
      }
    }
  )

  // 4. Escuchar derrotas de golems y recompensas de EXP
  sceneMessageBus.on(
    SQUAD_MESSAGE_TYPES.DEFEAT,
    (payload: GolemDefeatMessageDto) => {
      if (!payload || !payload.defeatedId) return

      const localId = getLocalPlayerId()
      if (payload.killerOwner.toLowerCase() === localId) return

      if (onDefeatReceivedCallback) {
        onDefeatReceivedCallback(payload)
      }
    }
  )
}

/**
 * Difunde la recogida de un ítem a todos los peers de la escena.
 */
export function broadcastItemPickup(instanceId: string, itemId: string) {
  const localId = getLocalPlayerId()
  const payload: ItemPickupMessageDto = {
    instanceId,
    collectorAddress: localId,
    itemId,
    timestamp: Date.now()
  }
  sceneMessageBus.emit(ITEM_MESSAGE_TYPES.PICKUP, payload)
}

/**
 * Solicita el estado de recolección de ítems a otros jugadores en la escena.
 */
export function requestItemSync() {
  const localId = getLocalPlayerId()
  sceneMessageBus.emit(ITEM_MESSAGE_TYPES.SYNC_REQ, { requester: localId, timestamp: Date.now() })
}

/**
 * Responde con los IDs de ítems actualmente recolectados.
 */
export function broadcastItemSyncResponse(collectedInstanceIds: string[]) {
  const localId = getLocalPlayerId()
  const payload: ItemSyncResponseDto = {
    senderAddress: localId,
    collectedInstanceIds,
    timestamp: Date.now()
  }
  sceneMessageBus.emit(ITEM_MESSAGE_TYPES.SYNC_RES, payload)
}

/**
 * Inicializa los escuchadores de MessageBus para sincronización multijugador de ítems coleccionables.
 */
export function setupItemSyncListeners(
  onItemPickedUp?: (pickup: ItemPickupMessageDto) => void,
  onItemSyncReceived?: (collectedIds: string[]) => void,
  getCollectedIdsProvider?: () => string[]
) {
  if (onItemPickedUp) onItemPickedUpCallback = onItemPickedUp
  if (onItemSyncReceived) onItemSyncReceivedCallback = onItemSyncReceived

  // Escuchar recogidas de ítems de peers
  sceneMessageBus.on(ITEM_MESSAGE_TYPES.PICKUP, (payload: ItemPickupMessageDto) => {
    if (!payload || !payload.instanceId) return
    const localId = getLocalPlayerId()
    if (payload.collectorAddress.toLowerCase() === localId) return

    if (onItemPickedUpCallback) {
      onItemPickedUpCallback(payload)
    }
  })

  // Escuchar solicitudes de sincronización de ítems
  sceneMessageBus.on(ITEM_MESSAGE_TYPES.SYNC_REQ, (payload: { requester: string }) => {
    if (!payload || !payload.requester) return
    const localId = getLocalPlayerId()
    if (payload.requester.toLowerCase() === localId) return

    if (getCollectedIdsProvider) {
      const activeCollected = getCollectedIdsProvider()
      if (activeCollected.length > 0) {
        broadcastItemSyncResponse(activeCollected)
      }
    }
  })

  // Escuchar respuestas de sincronización de ítems
  sceneMessageBus.on(ITEM_MESSAGE_TYPES.SYNC_RES, (payload: ItemSyncResponseDto) => {
    if (!payload || !Array.isArray(payload.collectedInstanceIds)) return
    const localId = getLocalPlayerId()
    if (payload.senderAddress.toLowerCase() === localId) return

    if (onItemSyncReceivedCallback) {
      onItemSyncReceivedCallback(payload.collectedInstanceIds)
    }
  })
}


