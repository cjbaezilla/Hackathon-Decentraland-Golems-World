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
import { NPC_POSITIONS } from '../data/npcPositions'
import { equipCustomWearable, CUSTOM_WEARABLES } from './npcWearables'
import { NpcPatrolComponent } from '../systems/npcPatrolSystem'

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
 * Instancia 50 NPCs del catálogo (o la cantidad especificada por `limit`) distribuidos proporcionalmente por todo el mapa de 400m x 400m,
 * excluyendo estrictamente la Forja Inicial (0..140m, 0..140m) y el interior de la Gran Arena Central (r < 42m).
 * Cada NPC se ubica en las coordenadas correspondientes a su distrito temático con orientaciones dinámicas.
 */
export function spawnAllCatalogNpcs(limit: number = 50): Entity[] {
  const spawnedEntities: Entity[] = []
  const npcsToSpawn = NPC_CATALOG.slice(0, limit)
  const totalNpcs = npcsToSpawn.length
  const customWearableKeys = Object.keys(CUSTOM_WEARABLES)

  npcsToSpawn.forEach((npcData, index) => {
    const posData = NPC_POSITIONS[npcData.id] || { x: 200, y: 0, z: 154, rot: 180 }
    const spawnPos = Vector3.create(posData.x, posData.y, posData.z)

    const entity = createNpcAvatar(npcData, spawnPos, posData.rot)

    // Componente de patrulla y movimiento orgánico en radio de 2.5m - 3.5m
    NpcPatrolComponent.create(entity, {
      anchorX: posData.x,
      anchorY: posData.y,
      anchorZ: posData.z,
      targetX: posData.x,
      targetY: posData.y,
      targetZ: posData.z,
      state: 'IDLE',
      idleTimer: Math.random() * 5.0, // Desfase aleatorio inicial de reposo
      moveSpeed: 1.1 + Math.random() * 0.3, // Velocidad de caminata suave (1.1 - 1.4 m/s)
      patrolRadius: 2.5 + Math.random() * 1.0 // Radio de patrulla (2.5m - 3.5m)
    })

    // Equipar accesorio 3D GLB temático en el cuerpo del NPC usando AvatarAttach por su ID
    const wearableId = customWearableKeys[index % customWearableKeys.length]
    equipCustomWearable(npcData.id, wearableId)

    spawnedEntities.push(entity)
  })

  console.log(
    `👥 [NPC Generator] ${totalNpcs} NPCs instanciados y distribuidos proporcionalmente por todo el mapa (excluyendo Arena Central e Initial Town).`
  )

  return spawnedEntities
}
