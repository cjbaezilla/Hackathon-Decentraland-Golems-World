import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material,
  TextShape,
  Billboard,
  TriggerArea,
  triggerAreaEventsSystem,
  ColliderLayer,
  pointerEventsSystem,
  InputAction,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color3, Color4 } from '@dcl/sdk/math'
import { TrampolineComponent } from '../components/trampoline'
import { ArenaRotatorComponent } from '../components/arena'
import { launchPlayerWithTrampoline } from '../systems/trampolineSystem'
import { t, onLanguageChange } from '../i18n'

/**
 * ============================================================================
 * CONSTRUCTOR DE TRAMPOLÍN DE VAPOR STEAMPUNK (LAUNCH PAD)
 * ============================================================================
 * Genera una plataforma elástica steampunk con engranajes giratorios, escapes de
 * vapor, balizas luminosas y doble sistema de activación física para lanzar al
 * usuario por los aires con un arco cinemático sobre el mapa.
 */

/**
 * Crea e inicializa un trampolín steampunk en la posición espacial indicada.
 *
 * @param position Posición central del trampolín en metros dentro de la escena.
 * @param customImpulse Vector opcional de fuerza física de lanzamiento.
 * @returns Entidad raíz del trampolín creado.
 */
export function createTrampoline(
  position: Vector3 = Vector3.create(16, 0, 11),
  customImpulse?: Vector3
): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: position,
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Base estructural metálica exterior (anillo de latón y bronce)
  const baseRim = engine.addEntity()
  Transform.create(baseRim, {
    parent: root,
    position: Vector3.create(0, 0.15, 0),
    scale: Vector3.create(3.5, 0.3, 3.5)
  })
  MeshRenderer.setCylinder(baseRim, 1.0, 1.0)
  MeshCollider.setCylinder(baseRim)
  Material.setPbrMaterial(baseRim, {
    albedoColor: Color4.create(0.22, 0.18, 0.14, 1.0),
    metallic: 0.85,
    roughness: 0.35
  })

  // 2. Colchón elástico central (lona de rebote con brillo emisivo ámbar)
  const matEntity = engine.addEntity()
  Transform.create(matEntity, {
    parent: root,
    position: Vector3.create(0, 0.45, 0),
    scale: Vector3.create(2.8, 0.2, 2.8)
  })
  MeshRenderer.setCylinder(matEntity, 1.0, 1.0)
  MeshCollider.setCylinder(matEntity)
  Material.setPbrMaterial(matEntity, {
    albedoColor: Color4.create(0.9, 0.45, 0.1, 1.0),
    emissiveColor: Color3.create(0.9, 0.45, 0.1),
    emissiveIntensity: 1.8,
    metallic: 0.4,
    roughness: 0.3
  })

  // Interacción táctil / clic directa Mobile-First en la lona
  pointerEventsSystem.onPointerDown(
    matEntity,
    () => {
      launchPlayerWithTrampoline(root)
    },
    {
      button: InputAction.IA_POINTER,
      hoverText: t('trampoline.hoverText'),
      maxDistance: 8
    }
  )

  // 3. Zona de activación TriggerArea (CL_MAIN_PLAYER)
  const triggerEntity = engine.addEntity()
  Transform.create(triggerEntity, {
    parent: root,
    position: Vector3.create(0, 0.6, 0),
    scale: Vector3.create(2.8, 1.2, 2.8)
  })
  TriggerArea.setBox(triggerEntity, ColliderLayer.CL_MAIN_PLAYER)
  triggerAreaEventsSystem.onTriggerEnter(triggerEntity, () => {
    launchPlayerWithTrampoline(root)
  })

  // 4. Gran engranaje giratorio steampunk en la base
  const baseGear = engine.addEntity()
  Transform.create(baseGear, {
    parent: root,
    position: Vector3.create(0, 0.05, 0),
    scale: Vector3.create(1.7, 0.4, 1.7)
  })
  GltfContainer.create(baseGear, {
    src: 'assets/asset-packs/gear_big/Gear Big.glb'
  })
  ArenaRotatorComponent.create(baseGear, {
    speedY: 0.7,
    speedX: 0,
    speedZ: 0
  })

  // 5. Chimenea / escape de vapor lateral (Smoker)
  const smokerEntity = engine.addEntity()
  Transform.create(smokerEntity, {
    parent: root,
    position: Vector3.create(1.7, 0, 0),
    scale: Vector3.create(0.65, 0.65, 0.65),
    rotation: Quaternion.fromEulerDegrees(0, 90, 0)
  })
  GltfContainer.create(smokerEntity, {
    src: 'assets/asset-packs/smoker/Smoker.glb'
  })

  // 6. Balizas / faroles esquineros de latón con luz ambiental
  const lampPositions = [
    Vector3.create(-1.6, 0, -1.6),
    Vector3.create(1.6, 0, -1.6),
    Vector3.create(-1.6, 0, 1.6),
    Vector3.create(1.6, 0, 1.6)
  ]

  lampPositions.forEach((pos) => {
    const lamp = engine.addEntity()
    Transform.create(lamp, {
      parent: root,
      position: pos,
      scale: Vector3.create(0.75, 0.75, 0.75)
    })
    GltfContainer.create(lamp, {
      src: 'assets/asset-packs/lamp/Lamp.glb'
    })
  })

  // 7. Cartel / Letrero flotante con Billboard
  const signEntity = engine.addEntity()
  Transform.create(signEntity, {
    parent: root,
    position: Vector3.create(0, 2.7, 0),
    scale: Vector3.create(0.8, 0.8, 0.8)
  })
  const updateSignText = () => {
    if (TextShape.has(signEntity)) {
      TextShape.getMutable(signEntity).text = `${t('trampoline.signTitle')}\n${t('trampoline.signSubtitle')}`
    }
  }

  TextShape.create(signEntity, {
    text: `${t('trampoline.signTitle')}\n${t('trampoline.signSubtitle')}`,
    fontSize: 2.8,
    textColor: Color4.create(1.0, 0.85, 0.25, 1.0)
  })
  Billboard.create(signEntity)

  // Suscribir al cambio de idioma para actualizar en tiempo real
  onLanguageChange(() => {
    updateSignText()
  })

  // 8. Registrar el componente TrampolineComponent en la entidad raíz
  // Impulso (50% del salto extremo): Y=160 (elevación contundente), Z=90 (fuerte avance balístico hacia el norte)
  const impulse = customImpulse ?? Vector3.create(0, 160, 90)
  TrampolineComponent.create(root, {
    impulseX: impulse.x,
    impulseY: impulse.y,
    impulseZ: impulse.z,
    triggerRadius: 1.8,
    cooldownTimer: 0,
    isBouncing: false,
    bounceTimer: 0,
    matEntity: matEntity
  })

  return root
}
