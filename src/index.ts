import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material,
  InputAction,
  TouchScreenControls
} from '@dcl/sdk/ecs'
import { Vector3, Color4 } from '@dcl/sdk/math'
import { setupUi } from './ui'
import { generateRandomSquad } from './config/golems'
import { setLocalActiveSquad } from './state'
import { createFollowerGolem } from './objects/golemFactory'
import { golemFollowerSystem, onRemoteSquadUpdated } from './systems/followerSystem'
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
 * Inicializa la UI, controles móviles táctiles, suelo base, escuadrón local de golems,
 * infraestructura multijugador P2P y el sistema de seguimiento en fila compartido.
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

  // 3. Suelo base limpio (Área 32x32m para pruebas en Decentraland World)
  setupBaseFloor()

  // 4. Generar e instanciar los 3 Golems aleatorios (3 tipos distintos) del jugador local
  setupLocalFollowerGolems()

  // 5. Configurar infraestructura multijugador P2P (MessageBus)
  setupSquadSyncListeners(onRemoteSquadUpdated)
  announceLocalSquad()
  requestAllSquads()

  // 6. Registrar el sistema de seguimiento multijugador en el motor ECS
  engine.addSystem(golemFollowerSystem)
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

/**
 * Crea el suelo base neutral para la escena de prueba.
 */
function setupBaseFloor() {
  const floor = engine.addEntity()

  Transform.create(floor, {
    position: Vector3.create(16, 0, 16),
    scale: Vector3.create(31.8, 0.1, 31.8)
  })

  MeshRenderer.setBox(floor)
  MeshCollider.setBox(floor)

  Material.setPbrMaterial(floor, {
    albedoColor: Color4.create(0.12, 0.14, 0.18, 1),
    roughness: 0.8,
    metallic: 0.1
  })
}


