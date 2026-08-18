import {
  engine,
  Transform,
  GltfContainer,
  TextShape,
  Billboard,
  Entity,
  removeEntityWithChildren
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { GolemConfig, GolemAffinity } from '../config/golems'
import { GolemFollowerComponent, GolemSquadMemberDto } from '../components/follower'

/**
 * ============================================================================
 * FÁBRICA DE GOLEMS MULTIJUGADOR (GOLEM FACTORY)
 * ============================================================================
 * Instancia las entidades de los golems con sus modelos 3D GLTF, escala,
 * componentes de seguimiento asociados al dueño (local o remoto) y etiquetas flotantes.
 */

/**
 * Devuelve el color de texto representativo según la afinidad elemental del golem.
 */
function getAffinityTextColor(affinity: string): Color4 {
  switch (affinity) {
    case GolemAffinity.STEAM:
    case 'Vapor':
      return Color4.create(1.0, 0.55, 0.1, 1.0) // Naranja fuego / vapor
    case GolemAffinity.GALVANIC:
    case 'Galvánico':
      return Color4.create(0.2, 0.9, 1.0, 1.0) // Cian eléctrico
    case GolemAffinity.MECHANICAL:
    case 'Mecánico':
      return Color4.create(1.0, 0.85, 0.3, 1.0) // Ámbar / Dorado engranaje
    case GolemAffinity.LUMINOUS:
    case 'Luminoso':
      return Color4.create(1.0, 1.0, 0.6, 1.0) // Amarillo brillante
    case GolemAffinity.AETHER:
    case 'Éter':
      return Color4.create(0.8, 0.4, 1.0, 1.0) // Violeta místico
    default:
      return Color4.White()
  }
}

/**
 * Formatea una dirección de wallet para mostrarla abreviada en la etiqueta del golem.
 */
function formatShortAddress(address: string): string {
  if (!address || address === 'local' || address === 'local_player') return ''
  if (address.length > 10) {
    return ` [${address.substring(0, 6)}...]`
  }
  return ` [${address}]`
}

/**
 * Crea una entidad de golem seguidor asociada a un jugador (local o remoto).
 *
 * @param config Configuración del golem (modelo, escala, velocidad, distancia).
 * @param orderIndex Índice en la fila de seguimiento (0, 1, 2).
 * @param spawnPosition Posición inicial de aparición en el mundo.
 * @param ownerAddress Identificador o dirección de wallet del dueño.
 */
export function createFollowerGolem(
  config: GolemConfig | GolemSquadMemberDto,
  orderIndex: number,
  spawnPosition: Vector3,
  ownerAddress: string = 'local'
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

  // 3. Componente de seguimiento con asociación de dueño
  GolemFollowerComponent.create(golemEntity, {
    golemId: config.id,
    ownerAddress: ownerAddress.toLowerCase(),
    orderIndex,
    targetDistance: config.followDistance,
    moveSpeed: config.moveSpeed,
    rotationSpeed: config.rotationSpeed,
    isMoving: false
  })

  // 4. Etiqueta flotante con nombre, afinidad y dueño (Billboard)
  const labelEntity = engine.addEntity()
  Transform.create(labelEntity, {
    parent: golemEntity,
    position: Vector3.create(0, 1.45, 0)
  })

  const ownerTag = formatShortAddress(ownerAddress)
  TextShape.create(labelEntity, {
    text: `${config.name}${ownerTag}\n[${config.affinity}]`,
    fontSize: 2.2,
    textColor: getAffinityTextColor(config.affinity)
  })

  Billboard.create(labelEntity, {})

  return golemEntity
}

/**
 * Instancia el escuadrón completo de 3 golems para un jugador específico.
 */
export function spawnPlayerSquad(
  ownerAddress: string,
  squadConfig: (GolemConfig | GolemSquadMemberDto)[],
  basePos: Vector3
): Entity[] {
  const entities: Entity[] = []
  const normAddress = ownerAddress.toLowerCase()

  squadConfig.forEach((config, index) => {
    const spawnPos = Vector3.create(basePos.x, Math.max(0.1, basePos.y), basePos.z - config.followDistance)
    const entity = createFollowerGolem(config, index, spawnPos, normAddress)
    entities.push(entity)
  })

  return entities
}

/**
 * Elimina y libera de memoria de forma limpia todas las entidades de golems pertenecientes a un jugador.
 */
export function removePlayerSquad(ownerAddress: string) {
  const targetOwner = ownerAddress.toLowerCase()
  const entitiesToRemove: Entity[] = []

  for (const [entity] of engine.getEntitiesWith(GolemFollowerComponent)) {
    const follower = GolemFollowerComponent.get(entity)
    if (follower.ownerAddress.toLowerCase() === targetOwner) {
      entitiesToRemove.push(entity)
    }
  }

  for (const entity of entitiesToRemove) {
    removeEntityWithChildren(engine, entity)
  }
}

