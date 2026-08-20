import {
  engine,
  Entity,
  Transform,
  AvatarShape,
  TextShape,
  Billboard
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { NpcDefinition } from '../data/npcCatalog'

/**
 * ============================================================================
 * FÁBRICA Y GENERADOR DE AVATARES DE NPCS (NPC AVATAR GENERATOR)
 * ============================================================================
 * Módulo reutilizable que instancia personajes no jugadores en SDK7 utilizando
 * el componente nativo `AvatarShape`, asignando sus wearables `base-avatars`,
 * paletas de colores de piel/pelo/ojos y rótulos 3D flotantes con Billboard.
 */

/**
 * Mapa de rotuladores en memoria para gestión y actualización dinámica [npcEntity -> labelEntity].
 */
const npcLabelMap = new Map<Entity, Entity>()

/**
 * Instancia un personaje no jugador (NPC) a partir de su definición del catálogo.
 *
 * @param npcData Objeto de configuración `NpcDefinition` del catálogo.
 * @param spawnPosition Posición espacial deseada (por defecto origen 0,0,0).
 * @param rotationAngle Ángulo de rotación sobre el eje Y en grados (0 a 360).
 * @returns La entidad principal creada del NPC.
 */
export function createNpcAvatar(
  npcData: NpcDefinition,
  spawnPosition: Vector3 = Vector3.Zero(),
  rotationAngle: number = 0
): Entity {
  const npcEntity = engine.addEntity()

  // 1. Asignación del Transform con posición y orientación Y
  Transform.create(npcEntity, {
    position: spawnPosition,
    rotation: Quaternion.fromEulerDegrees(0, rotationAngle, 0),
    scale: Vector3.create(1, 1, 1)
  })

  // 2. Creación del componente AvatarShape nativo de Decentraland
  AvatarShape.create(npcEntity, {
    id: npcData.id,
    name: '', // El nombre visible se renderiza con TextShape 3D
    bodyShape: npcData.avatarSpec.bodyShape,
    wearables: npcData.avatarSpec.wearables,
    emotes: [],
    skinColor: npcData.avatarSpec.skinColor,
    hairColor: npcData.avatarSpec.hairColor,
    eyeColor: npcData.avatarSpec.eyeColor,
    expressionTriggerId: 'wave',
    expressionTriggerTimestamp: 0
  })

  // 3. Creación de la etiqueta flotante 3D (TextShape + Billboard)
  const labelEntity = engine.addEntity()

  Transform.create(labelEntity, {
    parent: npcEntity,
    position: Vector3.create(0, 2.25, 0)
  })

  TextShape.create(labelEntity, {
    text: `⚙️ ${npcData.name}\n[ ${npcData.title} ]`,
    fontSize: 2.2,
    textColor: Color4.create(1.0, 0.85, 0.35, 1.0) // Ámbar / Dorado Steampunk
  })

  Billboard.create(labelEntity, {})

  npcLabelMap.set(npcEntity, labelEntity)

  return npcEntity
}

/**
 * Obtiene la entidad del rótulo flotante asociada a un NPC.
 */
export function getNpcLabelEntity(npcEntity: Entity): Entity | undefined {
  return npcLabelMap.get(npcEntity)
}
