import {
  engine,
  Transform,
  GltfContainer,
  TextShape,
  Billboard,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { GolemConfig, GolemAffinity } from '../config/golems'
import { GolemFollowerComponent } from '../components/follower'

/**
 * ============================================================================
 * FÁBRICA DE GOLEMS (GOLEM FACTORY)
 * ============================================================================
 * Instancia las entidades de los golems con sus modelos 3D GLTF, escala,
 * componentes de seguimiento y etiquetas flotantes de identificación.
 */

/**
 * Devuelve el color de texto representativo según la afinidad elemental del golem.
 */
function getAffinityTextColor(affinity: GolemAffinity): Color4 {
  switch (affinity) {
    case GolemAffinity.STEAM:
      return Color4.create(1.0, 0.55, 0.1, 1.0) // Naranja fuego / vapor
    case GolemAffinity.GALVANIC:
      return Color4.create(0.2, 0.9, 1.0, 1.0)  // Cian eléctrico
    case GolemAffinity.MECHANICAL:
      return Color4.create(1.0, 0.85, 0.3, 1.0) // Ámbar / Dorado engranaje
    case GolemAffinity.LUMINOUS:
      return Color4.create(1.0, 1.0, 0.6, 1.0)  // Amarillo brillante
    case GolemAffinity.AETHER:
      return Color4.create(0.8, 0.4, 1.0, 1.0)  // Violeta místico
    default:
      return Color4.White()
  }
}

/**
 * Crea una entidad de golem seguidor con su modelo 3D y etiqueta.
 *
 * @param config Configuración del golem (modelo, escala, velocidad, distancia).
 * @param orderIndex Índice en la fila de seguimiento (0, 1, 2).
 * @param spawnPosition Posición inicial de aparición en el mundo.
 */
export function createFollowerGolem(
  config: GolemConfig,
  orderIndex: number,
  spawnPosition: Vector3
): Entity {
  const golemEntity = engine.addEntity()

  // 1. Transform principal del Golem
  Transform.create(golemEntity, {
    position: spawnPosition,
    rotation: Quaternion.Identity(),
    scale: Vector3.create(config.scale, config.scale, config.scale)
  })

  // 2. Modelo 3D GLTF (.glb)
  GltfContainer.create(golemEntity, {
    src: config.modelSrc
  })

  // 3. Componente de seguimiento
  GolemFollowerComponent.create(golemEntity, {
    golemId: config.id,
    orderIndex,
    targetDistance: config.followDistance,
    moveSpeed: config.moveSpeed,
    rotationSpeed: config.rotationSpeed,
    isMoving: false
  })

  // 4. Etiqueta flotante con nombre y afinidad (Billboard)
  const labelEntity = engine.addEntity()
  Transform.create(labelEntity, {
    parent: golemEntity,
    position: Vector3.create(0, 1.45, 0)
  })

  TextShape.create(labelEntity, {
    text: `${config.name}\n[${config.affinity}]`,
    fontSize: 2.2,
    textColor: getAffinityTextColor(config.affinity)
  })

  Billboard.create(labelEntity, {})

  return golemEntity
}
