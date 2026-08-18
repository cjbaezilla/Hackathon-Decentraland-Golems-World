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
import { INITIAL_GOLEMS_CONFIG } from './config/golems'
import { createFollowerGolem } from './objects/golemFactory'
import { golemFollowerSystem } from './systems/followerSystem'

/**
 * ============================================================================
 * PUNTO DE ENTRADA PRINCIPAL DE LA ESCENA (SDK7 ECS)
 * ============================================================================
 * Inicializa la UI, controles móviles táctiles, suelo base, instanciación
 * de los 3 golems acompañantes de prueba y el sistema de seguimiento en fila.
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

  // 3. Suelo base limpio (Área 32x32m para pruebas en Decentraland World)
  setupBaseFloor()

  // 4. Instanciar los 3 Golems seguidores de prueba (Vapor, Galvánico y Mecánico)
  setupFollowerGolems()

  // 5. Registrar el sistema de seguimiento de trayectoria en fila en el motor ECS
  engine.addSystem(golemFollowerSystem)
}

/**
 * Instancia el escuadrón de los 3 golems acompañantes en posiciones iniciales.
 */
function setupFollowerGolems() {
  INITIAL_GOLEMS_CONFIG.forEach((config, index) => {
    // Posición inicial de spawn ligeramente detrás de la posición por defecto
    const spawnPos = Vector3.create(16, 0.1, 16 - config.followDistance)
    createFollowerGolem(config, index, spawnPos)
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

