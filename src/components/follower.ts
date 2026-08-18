import { engine, Schemas } from '@dcl/sdk/ecs'

/**
 * ============================================================================
 * COMPONENTE ECS: SEGUIDOR GOLEM (GOLEM FOLLOWER)
 * ============================================================================
 * Almacena los parámetros individuales de cada golem en la formación en fila,
 * como su índice de orden, distancia objetivo respecto al maestro y estado de locomoción.
 */
export const GolemFollowerComponent = engine.defineComponent('golems::GolemFollowerComponent', {
  /** Identificador único del golem */
  golemId: Schemas.String,
  /** Dirección o identificador del jugador dueño ('local' o dirección de wallet 0x...) */
  ownerAddress: Schemas.String,
  /** Posición en la fila (0: Primero detrás del maestro, 1: Segundo, 2: Tercero) */
  orderIndex: Schemas.Int,
  /** Distancia objetivo a lo largo del historial de trayectoria (en metros) */
  targetDistance: Schemas.Float,
  /** Multiplicador de velocidad de traslación */
  moveSpeed: Schemas.Float,
  /** Multiplicador de velocidad de rotación */
  rotationSpeed: Schemas.Float,
  /** Indicador reactivo de si el golem se encuentra actualmente en movimiento */
  isMoving: Schemas.Boolean
})

/**
 * Datos serializables de un miembro del escuadrón para transmisión por MessageBus.
 */
export interface GolemSquadMemberDto {
  id: string
  name: string
  affinity: string
  modelSrc: string
  scale: number
  followDistance: number
  moveSpeed: number
  rotationSpeed: number
}

/**
 * Anuncio del escuadrón completo de un jugador.
 */
export interface PlayerSquadAnnouncementDto {
  ownerAddress: string
  timestamp: number
  golems: GolemSquadMemberDto[]
}

