import {
  engine,
  Transform,
  GltfContainer,
  MeshCollider,
  TextShape,
  Billboard,
  pointerEventsSystem,
  InputAction,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { t, onLanguageChange } from '../i18n'
import { setIsTeslaTowerUIOpen } from '../state'

/**
 * ============================================================================
 * CONSTRUCTOR DE LA TORRE TESLA DE RECARGA (DISTRITO DE LA FORJA 52.8m, 34.2m)
 * ============================================================================
 * Genera la Torre Tesla Galvánica utilizando la librería de assets (.glb):
 * - Rótulo Flotante 3D con Trazo (Stroke Color Cian Galvánico) e información de tarifa (1 🪙 / 1 HP).
 * - Colisionadores e interacción enfocados directamente en el cuerpo metálico de la torre (tanques, ejes, engranajes y corona).
 * - Ubicación: Parcela [3, 2] en X: 52.8m | Z: 34.2m.
 */

const TESLA_ASSETS = {
  floorWood2x2: 'assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb',
  tank: 'assets/asset-packs/tank/Tank.glb',
  gearShaft: 'assets/asset-packs/gear_shaft/Gear Shaft.glb',
  gearBig: 'assets/asset-packs/gear_big/Gear Big.glb',
  gear10Teeth: 'assets/asset-packs/gear_10_teeth/Gear 10 Teeth.glb',
  gearAngled10Teeth: 'assets/asset-packs/gear_angled_10_teeth/Gear Angled 10 Teeth.glb',
  chestTube: 'assets/asset-packs/chest_tube/Chest Tube.glb',
  tableLamp: 'assets/asset-packs/table_lamp/Table Lamp.glb',
  lamp: 'assets/asset-packs/lamp/Lamp.glb',
  switch: 'assets/asset-packs/switch/Switch.glb',
  lever: 'assets/asset-packs/lever/Lever.glb',
  barrel: 'assets/asset-packs/barrel/Barrel.glb'
}

/**
 * Instancia la Torre Tesla Galvánica completa en la posición especificada.
 */
export function createTeslaTower(parent?: Entity): Entity {
  const root = engine.addEntity()

  // Posición indicada en el Distrito de la Forja (Parcela [3,2])
  const pos = Vector3.create(52.8, 0.02, 34.2)

  Transform.create(root, {
    parent,
    position: pos,
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Base Adoquinada / Losas de Madera (Elemento visual decorativo sin colisionador raycast para no alterar el contorno verde)
  const floor = engine.addEntity()
  Transform.create(floor, {
    parent: root,
    position: Vector3.create(0, 0, 0)
  })
  GltfContainer.create(floor, {
    src: TESLA_ASSETS.floorWood2x2
  })

  // 2. Tanque / Caldera Base Principal (Cuerpo metálico estructural con colisionador explícito)
  const baseTank = spawnTeslaPart(
    root,
    TESLA_ASSETS.tank,
    Vector3.create(0, 0, 0),
    Quaternion.Identity(),
    Vector3.create(1.6, 1.4, 1.6)
  )

  // 3. Eje Troncal de Transmisión Vertical (Torre Principal de 3 niveles)
  const shaft1 = spawnTeslaPart(
    root,
    TESLA_ASSETS.gearShaft,
    Vector3.create(0, 1.4, 0),
    Quaternion.Identity(),
    Vector3.create(1.8, 2.0, 1.8)
  )

  const shaft2 = spawnTeslaPart(
    root,
    TESLA_ASSETS.gearShaft,
    Vector3.create(0, 3.4, 0),
    Quaternion.Identity(),
    Vector3.create(1.5, 2.0, 1.5)
  )

  const shaft3 = spawnTeslaPart(
    root,
    TESLA_ASSETS.gearShaft,
    Vector3.create(0, 5.4, 0),
    Quaternion.Identity(),
    Vector3.create(1.2, 2.0, 1.2)
  )

  // 4. Anillos de Concentración Galvánica (Engranajes Concéntricos con Colisionador)
  const gear1 = spawnTeslaPart(
    root,
    TESLA_ASSETS.gearBig,
    Vector3.create(0, 2.2, 0),
    Quaternion.fromEulerDegrees(90, 0, 0),
    Vector3.create(2.2, 2.2, 2.2)
  )

  const gear2 = spawnTeslaPart(
    root,
    TESLA_ASSETS.gear10Teeth,
    Vector3.create(0, 4.2, 0),
    Quaternion.fromEulerDegrees(90, 45, 0),
    Vector3.create(1.8, 1.8, 1.8)
  )

  const gear3 = spawnTeslaPart(
    root,
    TESLA_ASSETS.gearAngled10Teeth,
    Vector3.create(0, 6.0, 0),
    Quaternion.fromEulerDegrees(45, 0, 0),
    Vector3.create(1.5, 1.5, 1.5)
  )

  // 5. Cúspide Emisora Galvánica (Corona de la Torre Tesla)
  const crown = spawnTeslaPart(
    root,
    TESLA_ASSETS.tableLamp,
    Vector3.create(0, 7.2, 0),
    Quaternion.fromEulerDegrees(180, 0, 0),
    Vector3.create(2.0, 2.5, 2.0)
  )

  // 6. Condensadores y Controles al pie de la torre
  const tube1 = spawnTeslaPart(root, TESLA_ASSETS.chestTube, Vector3.create(1.5, 0, 0), Quaternion.fromEulerDegrees(0, 90, 0))
  const tube2 = spawnTeslaPart(root, TESLA_ASSETS.chestTube, Vector3.create(-1.5, 0, 0), Quaternion.fromEulerDegrees(0, 270, 0))
  spawnTeslaPart(root, TESLA_ASSETS.switch, Vector3.create(0, 0, 1.4), Quaternion.fromEulerDegrees(0, 0, 0))
  spawnTeslaPart(root, TESLA_ASSETS.lever, Vector3.create(0, 0, -1.4), Quaternion.fromEulerDegrees(0, 180, 0))

  // Farolas de aviso perimetrales
  spawnTeslaPart(root, TESLA_ASSETS.lamp, Vector3.create(2.2, 0, 2.2))
  spawnTeslaPart(root, TESLA_ASSETS.lamp, Vector3.create(-2.2, 0, -2.2))

  // 7. RÓTULO FLOTANTE 3D CON TRAZO DE BORDE (STROKE COLOR) IDENTIFICADOR
  // Utiliza el mismo color galvánico cian brillante (0.2, 0.9, 1.0) y trazo azul oscuro (0.0, 0.25, 0.55) de la fábrica
  const labelEntity = engine.addEntity()
  Transform.create(labelEntity, {
    parent: root,
    position: Vector3.create(0, 8.4, 0)
  })

  TextShape.create(labelEntity, {
    text: `⚡ ${t('tesla.title')} ⚡\n[ 1 🪙 / 1 HP ]`,
    fontSize: 2.8,
    textColor: Color4.create(0.2, 0.9, 1.0, 1.0),
    outlineColor: Color4.create(0.0, 0.25, 0.55, 1.0),
    outlineWidth: 0.25
  })

  Billboard.create(labelEntity, {})

  // 8. Configuración de Interacción de Puntero / Clic Táctil Mobile-First
  // Enfocado en el cuerpo real de la torre (baseTank, ejes, engranajes, corona y tubos)
  const interactiveEntities = [baseTank, shaft1, shaft2, shaft3, gear1, gear2, gear3, crown, tube1, tube2, labelEntity]

  const registerPointerEvents = () => {
    interactiveEntities.forEach((entity) => {
      pointerEventsSystem.onPointerDown(
        {
          entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: t('tesla.hoverText'),
            maxDistance: 12
          }
        },
        () => {
          setIsTeslaTowerUIOpen(true)
        }
      )
    })
  }

  // Registrar listeners iniciales
  registerPointerEvents()

  // Actualizar hoverText y rótulo 3D dinámicamente al cambiar de idioma (i18n)
  onLanguageChange(() => {
    registerPointerEvents()
    if (TextShape.has(labelEntity)) {
      TextShape.getMutable(labelEntity).text = `⚡ ${t('tesla.title')} ⚡\n[ 1 🪙 / 1 HP ]`
    }
  })

  console.log('⚡ [Torre Tesla] Instanciada con éxito enfocado en el cuerpo 3D metálico en Distrito de la Forja (52.8m, 34.2m).')
  return root
}

/**
 * Helper utilitario para instanciar subpartes de la Torre Tesla con colisionador explícito.
 */
function spawnTeslaPart(
  parent: Entity,
  modelSrc: string,
  pos: Vector3,
  rot: Quaternion = Quaternion.Identity(),
  scale: Vector3 = Vector3.One()
): Entity {
  const entity = engine.addEntity()
  Transform.create(entity, {
    parent,
    position: pos,
    rotation: rot,
    scale
  })
  GltfContainer.create(entity, {
    src: modelSrc
  })
  MeshCollider.setBox(entity)
  return entity
}
