import { engine, PlayerIdentityData } from '@dcl/sdk/ecs'
import { MessageBus } from '@dcl/sdk/message-bus'
import { getPlayer } from '@dcl/sdk/src/players'
import { GolemConfig, generateRandomSquad } from './config/golems'
import { getLocalActiveSquad } from './state'
import { PlayerSquadAnnouncementDto, GolemSquadMemberDto } from './components/follower'

/**
 * ============================================================================
 * INFRAESTRUCTURA MULTIJUGADOR Y SINCRONIZACIÓN DE ESCUADRONES (SDK7 ECS)
 * ============================================================================
 * Maneja la comunicación P2P mediante MessageBus para difundir y recibir
 * los escuadrones de golems de cada jugador presente en la escena sin requerir
 * servidores externos.
 */

export const sceneMessageBus = new MessageBus()

/** Nombres canónicos de eventos para MessageBus */
export const SQUAD_MESSAGE_TYPES = {
  ANNOUNCE: 'golem_squad_announce',
  REQUEST: 'golem_squad_request'
} as const

/** Registro local en memoria de escuadrones de jugadores remotos [address -> golems] */
const remoteSquadRegistry = new Map<string, GolemSquadMemberDto[]>()

/** Callback registrado para notificar al sistema de seguimiento cuando llega un escuadrón nuevo */
let onSquadReceivedCallback: ((ownerAddress: string, squad: GolemSquadMemberDto[]) => void) | null = null

/**
 * Obtiene el identificador o dirección de wallet del jugador local.
 */
export function getLocalPlayerId(): string {
  const localPlayer = getPlayer()
  if (localPlayer && localPlayer.userId) {
    return localPlayer.userId.toLowerCase()
  }

  // Fallback si getPlayer() aún no cargó
  for (const [entity] of engine.getEntitiesWith(PlayerIdentityData)) {
    const data = PlayerIdentityData.get(entity)
    if (data && data.address) {
      return data.address.toLowerCase()
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
 * Anuncia el escuadrón actual del jugador local a todos los peers en la escena.
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
      rotationSpeed: g.rotationSpeed
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
 * Inicializa los escuchadores de MessageBus para recepción de anuncios y solicitudes.
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
}

