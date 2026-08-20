import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  AvatarAttach,
  AvatarAnchorPointType
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { registerEntityForLoading } from '../systems/sceneLoaderSystem'

/**
 * Definición de ítem o accesorio equipable 3D en SDK7.
 */
export interface WearableItemDef {
  id: string
  name: string
  modelSrc: string
  anchorPoint: AvatarAnchorPointType
  offsetPos: Vector3
  offsetRot: Vector3
  scale: Vector3
}

/**
 * Catálogo de accesorios 3D GLB creados en assets/wearables/
 */
export const CUSTOM_WEARABLES: Record<string, WearableItemDef> = {
  goggles_steampunk: {
    id: 'goggles_steampunk',
    name: 'Gafas de Aviador Steampunk',
    modelSrc: 'assets/wearables/goggles_steampunk.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_HEAD,
    offsetPos: Vector3.create(0, 0.08, 0.05),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  welding_mask: {
    id: 'welding_mask',
    name: 'Máscara de Soldadura Mad Max',
    modelSrc: 'assets/wearables/welding_mask.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_HEAD,
    offsetPos: Vector3.create(0, 0.05, 0.02),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  steam_backpack: {
    id: 'steam_backpack',
    name: 'Mochila de Caldera de Vapor',
    modelSrc: 'assets/wearables/steam_backpack.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_SPINE2,
    offsetPos: Vector3.create(0, 0, -0.05),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  tesla_backpack: {
    id: 'tesla_backpack',
    name: 'Generador Galvánico Tesla',
    modelSrc: 'assets/wearables/tesla_backpack.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_SPINE2,
    offsetPos: Vector3.create(0, 0, -0.05),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  wrench_heavy: {
    id: 'wrench_heavy',
    name: 'Llave Mecatrónica Gigante',
    modelSrc: 'assets/wearables/wrench_heavy.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_RIGHT_HAND,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(90, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  flamethrower_pipe: {
    id: 'flamethrower_pipe',
    name: 'Antorcha de Vapor Industrial',
    modelSrc: 'assets/wearables/flamethrower_pipe.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_RIGHT_HAND,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(90, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  shoulder_pad_spiked: {
    id: 'shoulder_pad_spiked',
    name: 'Hombrera con Púas Mad Max',
    modelSrc: 'assets/wearables/shoulder_pad_spiked.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_LEFT_SHOULDER,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  aether_crown: {
    id: 'aether_crown',
    name: 'Corona de Cristal de Éter',
    modelSrc: 'assets/wearables/aether_crown.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_HEAD,
    offsetPos: Vector3.create(0, 0.1, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  monocle_brass: {
    id: 'monocle_brass',
    name: 'Monóculo de Latón',
    modelSrc: 'assets/wearables/monocle_brass.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_HEAD,
    offsetPos: Vector3.create(0, 0.05, 0.04),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  top_hat_steam: {
    id: 'top_hat_steam',
    name: 'Sombrero de Copa a Vapor',
    modelSrc: 'assets/wearables/top_hat_steam.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_HEAD,
    offsetPos: Vector3.create(0, 0.1, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  neck_cog_collar: {
    id: 'neck_cog_collar',
    name: 'Collarín de Engranajes',
    modelSrc: 'assets/wearables/neck_cog_collar.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_NECK,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  chest_armor_plate: {
    id: 'chest_armor_plate',
    name: 'Peto Blindado Remachado',
    modelSrc: 'assets/wearables/chest_armor_plate.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_SPINE1,
    offsetPos: Vector3.create(0, 0.02, 0.02),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  belt_utility_pouch: {
    id: 'belt_utility_pouch',
    name: 'Cinturón de Herramientas',
    modelSrc: 'assets/wearables/belt_utility_pouch.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_HIP,
    offsetPos: Vector3.create(0, -0.02, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  gauntlet_left: {
    id: 'gauntlet_left',
    name: 'Guantelete Blindado Izquierdo',
    modelSrc: 'assets/wearables/gauntlet_left.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_LEFT_FOREARM,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  gauntlet_right: {
    id: 'gauntlet_right',
    name: 'Guantelete Blindado Derecho',
    modelSrc: 'assets/wearables/gauntlet_right.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_RIGHT_FOREARM,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  mechanical_arm_left: {
    id: 'mechanical_arm_left',
    name: 'Brazo Mecánico con Pistón',
    modelSrc: 'assets/wearables/mechanical_arm_left.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_LEFT_ARM,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  shoulder_cannon: {
    id: 'shoulder_cannon',
    name: 'Cañón de Vapor al Hombro',
    modelSrc: 'assets/wearables/shoulder_cannon.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_RIGHT_SHOULDER,
    offsetPos: Vector3.create(0, 0, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  boot_plated_right: {
    id: 'boot_plated_right',
    name: 'Bota Blindada con Grebas',
    modelSrc: 'assets/wearables/boot_plated_right.glb',
    anchorPoint: AvatarAnchorPointType.AAPT_RIGHT_FOOT,
    offsetPos: Vector3.create(0, 0.05, 0),
    offsetRot: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  }
}

/**
 * Equipa un accesorio .glb a un avatar de NPC o Jugador mediante AvatarAttach.
 *
 * @param avatarId ID de cadena del avatar (ej. 'NPC-001' o dirección de wallet del jugador / vacía para jugador local).
 * @param wearableId ID del accesorio en CUSTOM_WEARABLES.
 * @returns La entidad creada del modelo accesorio.
 */
export function equipCustomWearable(
  avatarId: string,
  wearableId: string
): Entity | undefined {
  const itemDef = CUSTOM_WEARABLES[wearableId]
  if (!itemDef) return undefined

  // 1. Entidad contenedora con componente AvatarAttach
  const parentEntity = engine.addEntity()

  AvatarAttach.create(parentEntity, {
    avatarId: avatarId,
    anchorPointId: itemDef.anchorPoint
  })

  // 2. Entidad hija con el modelo GLTF y offsets de posicionamiento
  const modelEntity = engine.addEntity()

  Transform.create(modelEntity, {
    parent: parentEntity,
    position: itemDef.offsetPos,
    rotation: Quaternion.fromEulerDegrees(itemDef.offsetRot.x, itemDef.offsetRot.y, itemDef.offsetRot.z),
    scale: itemDef.scale
  })

  GltfContainer.create(modelEntity, {
    src: itemDef.modelSrc
  })

  // Registrar el accesorio 3D GLB en el monitoreo de carga de la escena
  registerEntityForLoading(modelEntity)

  return modelEntity
}

/**
 * Equipa un accesorio directamente al Jugador Local en Decentraland.
 *
 * @param wearableId ID del accesorio (ej. 'goggles_steampunk', 'steam_backpack', 'wrench_heavy').
 */
export function equipWearableToPlayer(wearableId: string): Entity | undefined {
  return equipCustomWearable('', wearableId)
}
