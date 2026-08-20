import {
  engine,
  Transform,
  AvatarShape,
  GltfContainer,
  TextShape,
  Billboard,
  pointerEventsSystem,
  InputAction,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { t } from '../i18n'
import {
  openNpcDialog,
  getHasTriggeredProximityIntro,
  setHasTriggeredProximityIntro,
  getIsSilasTourActive,
  getIsNpcDialogOpen,
  getIsCinematicActive
} from '../state'

/**
 * ============================================================================
 * NPC DE BIENVENIDA: SILAS EL SOBREVIVIENTE (PARCELA [0, 0] / DISTRITO FORJA)
 * ============================================================================
 * Ambientado como un veterano forjador y chatarrero sobreviviente del páramo:
 * 1. Modelo AvatarShape humanoide con indumentaria resistente y desgastada.
 * 2. Rótulo flotante con Billboard y soporte bilingüe.
 * 3. Micro-campamento de supervivencia: fogata/chimenea humeante, cofre de
 *    repuestos, barril con farol y mini-golem de vapor acompañante («Pistón»).
 * 4. Hitbox táctil Mobile-First con interacción táctil / puntero.
 * 5. Sistema reactivo de animación (saludos periódicos al aproximarse el avatar).
 */

export interface WelcomeNpcEntities {
  root: Entity
  silasAvatar: Entity
  floatingLabel: Entity
  companionGolem: Entity
}

let silasNpcEntity: Entity | null = null
let silasLabelEntity: Entity | null = null
let emoteTimer: number = 0
let currentEmoteIndex: number = 0

/**
 * Instancia al NPC Silas y su micro-campamento de supervivencia.
 * @param pos Coordenadas base en el mundo (por defecto X: 15.8m, Y: 0.25m, Z: 5.9m).
 */
export function createWelcomeNpc(pos: Vector3 = Vector3.create(15.8, 0.25, 5.9)): WelcomeNpcEntities {
  // 1. Nodo contenedor raíz del campamento base fijo
  const root = engine.addEntity()
  Transform.create(root, {
    position: pos,
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 2. AvatarShape de Silas el Sobreviviente (Posición en coordenadas de mundo independientes)
  const silasAvatar = engine.addEntity()
  Transform.create(silasAvatar, {
    position: Vector3.create(pos.x, pos.y, pos.z),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.One()
  })

  AvatarShape.create(silasAvatar, {
    id: 'silas-wasteland-survivor',
    name: '', // Rótulo customizado con TextShape
    bodyShape: 'urn:decentraland:off-chain:base-avatars:BaseMale',
    wearables: [
      'urn:decentraland:off-chain:base-avatars:eyebrows_00',
      'urn:decentraland:off-chain:base-avatars:mouth_00',
      'urn:decentraland:off-chain:base-avatars:eyes_00',
      'urn:decentraland:off-chain:base-avatars:beard',
      'urn:decentraland:off-chain:base-avatars:messy_hair',
      'urn:decentraland:off-chain:base-avatars:leather_jacket',
      'urn:decentraland:off-chain:base-avatars:brown_pants',
      'urn:decentraland:off-chain:base-avatars:boots'
    ],
    emotes: [],
    skinColor: { r: 0.82, g: 0.68, b: 0.55 },
    hairColor: { r: 0.42, g: 0.32, b: 0.22 },
    eyeColor: { r: 0.35, g: 0.65, b: 0.85 },
    expressionTriggerId: 'wave',
    expressionTriggerTimestamp: 0
  })

  // Hitbox de interacción táctil con Silas
  pointerEventsSystem.onPointerDown(
    {
      entity: silasAvatar,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: t('npc.hoverText'),
        maxDistance: 8
      }
    },
    () => {
      openNpcDialog('firstTimeCheck')
    }
  )

  // 3. Rótulo flotante de Silas
  const floatingLabel = engine.addEntity()
  Transform.create(floatingLabel, {
    parent: silasAvatar,
    position: Vector3.create(0, 2.25, 0),
    scale: Vector3.create(0.85, 0.85, 0.85)
  })
  TextShape.create(floatingLabel, {
    text: t('npc.floatingLabel'),
    fontSize: 2.8,
    textColor: Color4.create(1.0, 0.85, 0.35, 1.0)
  })
  Billboard.create(floatingLabel)

  // 4. Micro-Campamento de Supervivencia
  // A. Chimenea humeante / caldera de supervivencia
  const smokerProp = engine.addEntity()
  Transform.create(smokerProp, {
    parent: root,
    position: Vector3.create(-1.3, 0, 0.4),
    rotation: Quaternion.fromEulerDegrees(0, 45, 0),
    scale: Vector3.create(0.7, 0.7, 0.7)
  })
  GltfContainer.create(smokerProp, {
    src: 'assets/asset-packs/smoker/Smoker.glb'
  })

  // B. Cofre de herramientas y repuestos mecánicos rescatados
  const chestProp = engine.addEntity()
  Transform.create(chestProp, {
    parent: root,
    position: Vector3.create(1.2, 0, 0.3),
    rotation: Quaternion.fromEulerDegrees(0, 310, 0),
    scale: Vector3.create(0.9, 0.9, 0.9)
  })
  GltfContainer.create(chestProp, {
    src: 'assets/asset-packs/chest_gear/Chest Gear.glb'
  })

  // C. Mesa improvisada de barril
  const barrelTable = engine.addEntity()
  Transform.create(barrelTable, {
    parent: root,
    position: Vector3.create(1.0, 0, -0.9),
    rotation: Quaternion.Identity(),
    scale: Vector3.create(0.85, 0.85, 0.85)
  })
  GltfContainer.create(barrelTable, {
    src: 'assets/asset-packs/barrel/Barrel.glb'
  })

  // D. Farol de aceite/gas sobre el barril
  const lampProp = engine.addEntity()
  Transform.create(lampProp, {
    parent: root,
    position: Vector3.create(1.0, 0.75, -0.9),
    rotation: Quaternion.Identity(),
    scale: Vector3.create(0.9, 0.9, 0.9)
  })
  GltfContainer.create(lampProp, {
    src: 'assets/asset-packs/table_lamp/Table Lamp.glb'
  })

  // E. Mini-Golem Compañero Fiel («Pistón»)
  const companionGolem = engine.addEntity()
  Transform.create(companionGolem, {
    parent: root,
    position: Vector3.create(-0.95, 0, -0.65),
    rotation: Quaternion.fromEulerDegrees(0, 150, 0),
    scale: Vector3.create(0.65, 0.65, 0.65)
  })
  GltfContainer.create(companionGolem, {
    src: 'assets/golems/steam/golem_003.glb'
  })

  // Rótulo del golem compañero
  const golemLabel = engine.addEntity()
  Transform.create(golemLabel, {
    parent: companionGolem,
    position: Vector3.create(0, 1.6, 0),
    scale: Vector3.create(0.7, 0.7, 0.7)
  })
  TextShape.create(golemLabel, {
    text: `♨️ ${t('npc.companionName')}`,
    fontSize: 2.2,
    textColor: Color4.create(1.0, 0.6, 0.2, 1.0)
  })
  Billboard.create(golemLabel)

  // Interacción táctil con el campamento también abre el diálogo
  pointerEventsSystem.onPointerDown(
    {
      entity: companionGolem,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: t('npc.hoverText'),
        maxDistance: 6
      }
    },
    () => {
      openNpcDialog('firstTimeCheck')
    }
  )

  silasNpcEntity = silasAvatar
  silasLabelEntity = floatingLabel

  console.log(`🧭 [NPC Bienvenida] Silas el Sobreviviente instanciado en Parcela [0,0] (${pos.x.toFixed(1)}m, ${pos.z.toFixed(1)}m).`)

  return {
    root,
    silasAvatar,
    floatingLabel,
    companionGolem
  }
}

/**
 * Actualiza el rótulo de Silas en tiempo real al cambiar el idioma de la escena.
 */
export function updateWelcomeNpcLanguage() {
  if (silasLabelEntity && TextShape.has(silasLabelEntity)) {
    const textShape = TextShape.getMutable(silasLabelEntity)
    textShape.text = t('npc.floatingLabel')
  }
}

/**
 * Obtiene la entidad del avatar de Silas para seguimiento de cámara o interacción.
 */
export function getSilasAvatarEntity(): Entity | null {
  return silasNpcEntity
}

/**
 * Obtiene la posición actual en el mundo del avatar de Silas.
 */
export function getSilasPosition(): Vector3 {
  if (silasNpcEntity && Transform.has(silasNpcEntity)) {
    return Transform.get(silasNpcEntity).position
  }
  return Vector3.create(15.8, 0.25, 5.9)
}

/**
 * Obtiene la rotación actual del avatar de Silas.
 */
export function getSilasRotation(): Quaternion {
  if (silasNpcEntity && Transform.has(silasNpcEntity)) {
    return Transform.get(silasNpcEntity).rotation
  }
  return Quaternion.fromEulerDegrees(0, 180, 0)
}

/**
 * Actualiza la posición y orientación de Silas en el mundo (usado por el sistema de tour).
 */
export function setSilasPositionAndRotation(pos: Vector3, rot: Quaternion) {
  if (silasNpcEntity && Transform.has(silasNpcEntity)) {
    const transform = Transform.getMutable(silasNpcEntity)
    transform.position = pos
    transform.rotation = rot
  }
}

/**
 * Establece la animación o emote activo de Silas (bloqueado durante el tour guiado).
 */
export function setSilasEmote(emoteId: string) {
  if (getIsSilasTourActive()) return
  if (silasNpcEntity && AvatarShape.has(silasNpcEntity)) {
    const avatar = AvatarShape.getMutable(silasNpcEntity)
    if (avatar.expressionTriggerId !== emoteId) {
      avatar.expressionTriggerId = emoteId
      avatar.expressionTriggerTimestamp = (avatar.expressionTriggerTimestamp ?? 0) + 1
    }
  }
}

/**
 * Limpia cualquier emote o expresión activa en Silas para permitir la locomoción natural (caminata pura) sin interrupciones.
 */
export function clearSilasEmote() {
  if (silasNpcEntity && AvatarShape.has(silasNpcEntity)) {
    const avatar = AvatarShape.getMutable(silasNpcEntity)
    avatar.expressionTriggerId = undefined
  }
}

/**
 * Dispara inmediatamente el emote de saludo de Silas (usado en cinemáticas y llegadas).
 */
export function triggerSilasWaveEmote() {
  setSilasEmote('wave')
}

/**
 * Sistema ECS para dotar de vida a Silas:
 * 1. Detección proactiva de proximidad (<= 4.5m) para disparar el diálogo inicial a nuevos jugadores.
 * 2. Emotes periódicos de saludo cuando el jugador está en las inmediaciones del campamento en reposo.
 */
export function welcomeNpcAnimationSystem(dt: number) {
  if (!silasNpcEntity || !AvatarShape.has(silasNpcEntity)) return
  if (!Transform.has(engine.PlayerEntity)) return

  const pPos = Transform.get(engine.PlayerEntity).position
  const silasPos = Transform.has(silasNpcEntity) ? Transform.get(silasNpcEntity).position : Vector3.create(15.8, 0.25, 5.9)

  const dx = pPos.x - silasPos.x
  const dz = pPos.z - silasPos.z
  const distSq = dx * dx + dz * dz

  // Detección proactiva: Si el jugador se acerca a <= 4.5m por primera vez y no hay diálogo/cinemática activa
  if (
    !getHasTriggeredProximityIntro() &&
    !getIsSilasTourActive() &&
    !getIsNpcDialogOpen() &&
    !getIsCinematicActive() &&
    distSq <= 20.25 // 4.5m al cuadrado
  ) {
    setHasTriggeredProximityIntro(true)
    openNpcDialog('firstTimeCheck')
    triggerSilasWaveEmote()
    console.log('🧭 [Silas Proximity] Diálogo proactivo de bienvenida iniciado por cercanía del jugador.')
  }

  // Si el tour guiado está activo, el diálogo está abierto o hay una cinemática en curso,
  // no reproducir emotes periódicos que interfieran con la locomoción natural o la escena
  if (getIsSilasTourActive() || getIsNpcDialogOpen() || getIsCinematicActive()) {
    emoteTimer = 0
    return
  }

  emoteTimer += dt

  // Cada 9 segundos, si el jugador está a corta distancia en el campamento, reproduce un saludo
  if (emoteTimer >= 9) {
    emoteTimer = 0

    // Si está a menos de 10 metros, realiza un emote de saludo
    if (distSq <= 100) {
      const avatar = AvatarShape.getMutable(silasNpcEntity)
      currentEmoteIndex = (currentEmoteIndex + 1) % 2
      avatar.expressionTriggerId = currentEmoteIndex === 0 ? 'wave' : 'raiseHand'
      avatar.expressionTriggerTimestamp = (avatar.expressionTriggerTimestamp ?? 0) + 1
    }
  }
}

