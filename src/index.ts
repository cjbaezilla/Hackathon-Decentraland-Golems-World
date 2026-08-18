import {
  engine,
  Transform,
  InputAction,
  TouchScreenControls
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'
import { generateRandomSquad } from './config/golems'
import { setLocalActiveSquad } from './state'
import { createFollowerGolem } from './objects/golemFactory'
import { createTournamentArena } from './objects/arenaBuilder'
import { golemFollowerSystem, onRemoteSquadUpdated } from './systems/followerSystem'
import { arenaAnimationSystem } from './systems/arenaAnimationSystem'
import {
  setupSquadSyncListeners,
  announceLocalSquad,
  requestAllSquads,
  getLocalPlayerId
} from './multiplayer'

/**
 * ============================================================================
 * PUNTO DE ENTRADA PRINCIPAL DE LA ESCENA (SDK7 ECS)
 * ============================================================================
 * Inicializa la UI, controles móviles táctiles, escuadrón local de golems,
 * la Gran Arena Circular de Torneo Steampunk (estilo Torneo de Cell),
 * infraestructura multijugador P2P y sistemas ECS de animación y seguimiento.
 */
export function main() {
  // 1. Inicializar la Interfaz de Usuario 2D (React-ECS)
  setupUi()

  // 2. Configurar controles táctiles Mobile-First
  TouchScreenControls.createOrReplace(engine.RootEntity, {
    hideJoystick: false,
    hideCrosshair: false,
    touchInputs: [
      { inputAction: InputAction.IA_ACTION_3, hide: true },
      { inputAction: InputAction.IA_ACTION_4, hide: true },
      { inputAction: InputAction.IA_ACTION_5, hide: true },
      { inputAction: InputAction.IA_ACTION_6, hide: true }
    ]
  })

  // 3. Generar e instanciar los 3 Golems aleatorios (3 tipos distintos) del jugador local
  setupLocalFollowerGolems()

  // 4. Instanciar la Gran Arena Circular de Torneo Steampunk en el centro del mapa (200m, 200m)
  createTournamentArena()

  // 5. Configurar infraestructura multijugador P2P (MessageBus)
  setupSquadSyncListeners(onRemoteSquadUpdated)
  announceLocalSquad()
  requestAllSquads()

  // 6. Registrar los sistemas de animación y seguimiento en el motor ECS
  engine.addSystem(golemFollowerSystem)
  engine.addSystem(arenaAnimationSystem)
}

/**
 * Genera y crea el escuadrón aleatorio de 3 tipos de golems diferentes para el jugador local.
 */
function setupLocalFollowerGolems() {
  const localId = getLocalPlayerId()
  const randomSquad = generateRandomSquad(localId)

  // Guardar en el estado de sesión en memoria
  setLocalActiveSquad(randomSquad)

  randomSquad.forEach((config, index) => {
    const spawnPos = Vector3.create(16, 0.1, 16 - config.followDistance)
    createFollowerGolem(config, index, spawnPos, localId)
  })
}



