import {
  engine,
  Entity,
  Transform,
  AvatarShape,
  TextShape,
  Billboard
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { NpcDefinition, NPC_CATALOG } from '../data/npcCatalog'
import { equipCustomWearable, CUSTOM_WEARABLES } from './npcWearables'

/**
 * ============================================================================
 * FÁBRICA Y GENERADOR DE AVATARES DE NPCS (NPC AVATAR GENERATOR)
 * ============================================================================
 * Módulo reutilizable que instancia personajes no jugadores en SDK7 utilizando
 * el componente nativo `AvatarShape`, asignando sus wearables `base-avatars`,
 * paletas de colores de piel/pelo/ojos, rótulos 3D flotantes y accesorios .glb.
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

  // 2. Creación del componente AvatarShape nativo de Decentraland (IDLE sin animación)
  AvatarShape.create(npcEntity, {
    id: npcData.id,
    name: '', // El nombre visible se renderiza con TextShape 3D
    bodyShape: npcData.avatarSpec.bodyShape,
    wearables: npcData.avatarSpec.wearables,
    emotes: [],
    skinColor: npcData.avatarSpec.skinColor,
    hairColor: npcData.avatarSpec.hairColor,
    eyeColor: npcData.avatarSpec.eyeColor,
    expressionTriggerId: '', // IDLE sin animación
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

/**
 * Instancia los 50 NPCs del catálogo alineados uno al lado del otro
 * afuera de la Gran Arena Central (al sur, Z: 154m, de X: 151m a 249m)
 * con vestimenta base garantizada, accesorios 3D GLB equipados y en estado IDLE.
 *
 * @param centerPos Punto central de la alineación (por defecto afuera de la Arena en X: 200, Z: 154).
 * @param spacing Separación entre cada NPC en metros (por defecto 2.0m).
 * @param facingAngle Ángulo de rotación en grados (por defecto 180° para mirar hacia el Sur).
 */
export function spawnAllCatalogNpcs(
  centerPos: Vector3 = Vector3.create(200, 0, 154),
  spacing: number = 2.0,
  facingAngle: number = 180
): Entity[] {
  const spawnedEntities: Entity[] = []
  const totalNpcs = NPC_CATALOG.length // 50 NPCs
  const startX = centerPos.x - ((totalNpcs - 1) * spacing) / 2
  const customWearableKeys = Object.keys(CUSTOM_WEARABLES)

  NPC_CATALOG.forEach((npcData, index) => {
    const posX = startX + index * spacing
    const spawnPos = Vector3.create(posX, centerPos.y, centerPos.z)

    const entity = createNpcAvatar(npcData, spawnPos, facingAngle)

    // Equipar accesorio 3D GLB temático en el cuerpo del NPC usando AvatarAttach por su ID
    const wearableId = customWearableKeys[index % customWearableKeys.length]
    equipCustomWearable(npcData.id, wearableId)

    spawnedEntities.push(entity)
  })

  console.log(
    `👥 [NPC Generator] ${totalNpcs} NPCs instanciados con vestimenta completa y accesorios 3D GLB equipados afuera de la Arena Central (Z: ${
      centerPos.z
    }m, X: ${startX.toFixed(1)}m a ${(startX + (totalNpcs - 1) * spacing).toFixed(1)}m).`
  )

  return spawnedEntities
}
