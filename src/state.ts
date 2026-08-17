import { engine, Schemas } from '@dcl/sdk/ecs'
import { MessageBus } from '@dcl/sdk/message-bus'
import { Color4 } from '@dcl/sdk/math'

/**
 * Enumeración de IDs únicos de sincronización de red para entidades predefinidas.
 * Usar un enum previene colisiones de IDs entre diferentes objetos compartidos.
 */
export enum SyncIds {
  BEACON = 1,
  PAD_RED = 2,
  PAD_GREEN = 3,
  PAD_BLUE = 4,
  PAD_PURPLE = 5
}

/**
 * Colores predefinidos para los ciclos de interacción.
 */
export const PALETTE: Color4[] = [
  Color4.create(0.12, 0.53, 0.9, 1),   // Azul Cyberpunk
  Color4.create(0.9, 0.2, 0.45, 1),   // Magenta Neón
  Color4.create(0.1, 0.85, 0.55, 1),  // Verde Esmeralda
  Color4.create(1.0, 0.72, 0.1, 1),   // Ámbar Dorado
  Color4.create(0.65, 0.25, 0.95, 1)  // Violeta Cósmico
]

export const PALETTE_NAMES: string[] = [
  'Azul Cyber',
  'Magenta Neón',
  'Verde Esmeralda',
  'Ámbar Dorado',
  'Violeta Cósmico'
]

/**
 * Componente personalizado sincronizado para el orbe/cubo central.
 */
export const BeaconState = engine.defineComponent('buidlhouse::BeaconState', {
  count: Schemas.Int,
  colorIndex: Schemas.Int,
  lastPlayer: Schemas.String,
  lastUpdated: Schemas.Int64
})

/**
 * Componente personalizado sincronizado para las plataformas táctiles de presión.
 */
export const PadState = engine.defineComponent('buidlhouse::PadState', {
  padId: Schemas.Int,
  count: Schemas.Int,
  lastPlayer: Schemas.String
})

/**
 * Instancia de MessageBus para eventos efímeros en tiempo real (reacciones, sonidos, ondas).
 */
export const sceneMessageBus = new MessageBus()

export interface ReactionMessage {
  sender: string
  emoji: string
  timestamp: number
}

/**
 * Estado reactivo local para alimentar la interfaz 2D (React-ECS) en móviles.
 */
export interface LocalUiState {
  isSynced: boolean
  activePlayersCount: number
  beaconCount: number
  currentColorName: string
  lastPlayerName: string
  lastReaction: string
  isHudCollapsed: boolean
  recentEvents: string[]
}

export const localUiState: LocalUiState = {
  isSynced: false,
  activePlayersCount: 1,
  beaconCount: 0,
  currentColorName: PALETTE_NAMES[0],
  lastPlayerName: 'Nadie aún',
  lastReaction: '✨ Toca la pantalla para interactuar',
  isHudCollapsed: false,
  recentEvents: ['Escena multijugador iniciada.']
}

/**
 * Agrega un evento al historial reciente de la UI (máximo 4 elementos).
 */
export function addUiEvent(eventText: string) {
  localUiState.recentEvents.unshift(eventText)
  if (localUiState.recentEvents.length > 4) {
    localUiState.recentEvents.pop()
  }
}
