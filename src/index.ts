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
import { sceneMessageBus, isNetworkSynchronized, getConnectedPlayersCount } from './multiplayer'

/**
 * ============================================================================
 * PUNTO DE ENTRADA PRINCIPAL DE LA ESCENA (SDK7 ECS)
 * ============================================================================
 * Escena reinicializada y limpia para el desarrollo del proyecto de la Hackathon.
 * La arquitectura multijugador y los controles móviles permanecen listos en `src/multiplayer.ts`.
 */
export function main() {
  // 1. Inicializar la Interfaz de Usuario 2D (React-ECS)
  setupUi()

  // 2. Configurar controles táctiles Mobile-First
  // Ocultar botones no utilizados (3, 4, 5, 6) para evitar el menú "+" y dejar una interfaz limpia y espaciosa
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

  // 3. Suelo base limpio (Área 32x32m para Decentraland World)
  setupBaseFloor()

  // 4. (Opcional) Inicializar sistemas del motor ECS7
  // engine.addSystem((dt: number) => { ... })
}

/**
 * Crea el suelo base neutral para la escena de 2x2 parcelas (32x32m).
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
    albedoColor: Color4.create(0.1, 0.12, 0.16, 1),
    roughness: 0.8,
    metallic: 0.1
  })
}
