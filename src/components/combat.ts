import { engine, Schemas } from '@dcl/sdk/ecs'

/**
 * ============================================================================
 * COMPONENTES ECS: SISTEMA DE COMBATE DE GOLEMS (FFA & PVP)
 * ============================================================================
 * Almacena el estado táctico, estadísticas en tiempo real, barras de vida,
 * temporizadores de enfriamiento de ataque y referencias de objetivos para
 * la batalla en la arena circular.
 */

export enum GolemCombatState {
  FOLLOWING = 'following',
  ARENA_IDLE = 'arena_idle',
  ARENA_CHASING = 'arena_chasing',
  ARENA_ATTACKING = 'arena_attacking',
  DEFEATED = 'defeated'
}

/**
 * Identificadores de equipo canónicos e inviolables.
 * Evita cualquier posibilidad de fuego amigo entre miembros del mismo equipo.
 */
export const GOLEM_TEAMS = {
  PLAYER: 'TEAM_PLAYER',
  SPARRING: 'TEAM_SPARRING',
  REMOTE_PREFIX: 'TEAM_REMOTE_'
} as const

export const GolemCombatComponent = engine.defineComponent('golems::GolemCombatComponent', {
  /** Identificador único del golem */
  golemId: Schemas.String,
  /** Identificador de equipo canónico (PLAYER, SPARRING, REMOTE_xxx) */
  teamId: Schemas.String,
  /** Identificador o wallet del dueño */
  ownerAddress: Schemas.String,
  /** Afinidad elemental */
  affinity: Schemas.String,
  /** Puntos de salud máximos */
  maxHp: Schemas.Float,
  /** Puntos de salud actuales */
  currentHp: Schemas.Float,
  /** Poder de ataque base */
  attack: Schemas.Float,
  /** Mitigación de defensa base */
  defense: Schemas.Float,
  /** Velocidad de combate y frecuencia de ataque */
  speed: Schemas.Float,
  /** Recompensa de experiencia al ser derrotado */
  expReward: Schemas.Float,
  /** Experiencia acumulada */
  currentExp: Schemas.Float,
  /** Nivel actual del golem */
  level: Schemas.Int,
  /** Estado actual dentro del bucle de combate */
  state: Schemas.String,
  /** ID del golem objetivo actual */
  targetGolemId: Schemas.String,
  /** Temporizador de enfriamiento entre ataques (segundos) */
  attackCooldownTimer: Schemas.Float,
  /** ID del último atacante que le infligió daño (para autodefensa reactiva) */
  lastAttackerId: Schemas.String,
  /** Timestamp del último impacto recibido */
  lastAttackedTimestamp: Schemas.Float,
  /** Indicador de si el golem ha sido derrotado */
  isDefeated: Schemas.Boolean
})

export const FloatingDamageComponent = engine.defineComponent('golems::FloatingDamageComponent', {
  /** Tiempo de vida restante en segundos */
  lifetime: Schemas.Float,
  /** Altura inicial en el eje Y */
  initialY: Schemas.Float,
  /** Velocidad de ascenso vertical */
  riseSpeed: Schemas.Float
})

/**
 * DTO para eventos de ataque emitidos por MessageBus.
 */
export interface GolemAttackMessageDto {
  attackerId: string
  targetId: string
  attackerOwner: string
  targetOwner: string
  attackerTeam?: string
  targetTeam?: string
  damage: number
  isAdvantage: boolean
  remainingHp: number
  timestamp: number
}

/**
 * DTO para eventos de derrota emitidos por MessageBus.
 */
export interface GolemDefeatMessageDto {
  defeatedId: string
  defeatedOwner: string
  killerId: string
  killerOwner: string
  expAwarded: number
  timestamp: number
}
