import {
  engine,
  Transform,
  GltfContainer,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { TRADING_POSTS_CONFIG, TradingPostData } from '../config/tradingPostsConfig'

const ASSETS = TRADING_POSTS_CONFIG.assets

/**
 * ============================================================================
 * CONSTRUCTOR DE PUESTOS DE COMERCIO (TRADING POSTS - ESCENA STEAMPUNK)
 * ============================================================================
 * Genera 5 puestos modulares de intercambio y venta comercial distribuidos
 * de forma equidistante en el bulevar sur del Distrito de la Forja.
 *
 * Cada quiosco incorpora:
 * - Plataforma base de madera con remaches.
 * - 4 Columnas estructurales de ejes mecánicos (gear shafts).
 * - Cubierta superior de techo industrial (ceiling 4x4m).
 * - Identificador numérico 3D oficial steampunk (01 al 05) en el frontis.
 * - Mostrador frontal de intercambio con lámpara y panel de control.
 * - Barriles de mercancía, cofres de almacén y farolas de acceso.
 */

/**
 * Helper utilitario para instanciar elementos estáticos vinculados a una entidad padre.
 */
function spawnProp(
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
  return entity
}

/**
 * Construye un puesto de comercio modular individual a partir de su configuración.
 */
function buildIndividualTradingPost(parent: Entity, data: TradingPostData): Entity {
  // Nodo raíz del puesto con su posición y orientación en el mundo
  const postRoot = engine.addEntity()
  Transform.create(postRoot, {
    parent,
    position: data.position,
    rotation: data.rotation,
    scale: Vector3.One()
  })

  // 1. Plataforma base de madera remachada (3.0m x 3.0m)
  spawnProp(
    postRoot,
    ASSETS.floorWood4x4,
    Vector3.create(0, 0, 0),
    Quaternion.Identity(),
    Vector3.create(0.75, 1.0, 0.75)
  )

  // 2. Cuatro columnas estructurales de soporte (Ejes mecánicos)
  const columnPositions = [
    Vector3.create(-1.2, 0, 1.2),  // Frontal Izquierda
    Vector3.create(1.2, 0, 1.2),   // Frontal Derecha
    Vector3.create(-1.2, 0, -1.2), // Trasera Izquierda
    Vector3.create(1.2, 0, -1.2)   // Trasera Derecha
  ]

  columnPositions.forEach((pos) => {
    spawnProp(
      postRoot,
      ASSETS.gearShaft,
      pos,
      Quaternion.Identity(),
      Vector3.create(0.8, 1.3, 0.8)
    )
  })

  // 3. Techo industrial (Canopy) a 2.7m de altura
  spawnProp(
    postRoot,
    ASSETS.ceiling4x4,
    Vector3.create(0, 2.7, 0),
    Quaternion.Identity(),
    Vector3.create(0.8, 1.0, 0.8)
  )

  // 4. Identificador Numérico Steampunk en el frontis superior
  spawnProp(
    postRoot,
    data.numberAsset,
    Vector3.create(0, 2.85, 1.25),
    Quaternion.Identity(),
    Vector3.create(0.9, 0.9, 0.9)
  )

  // 5. Mostrador frontal de atención e intercambio
  spawnProp(
    postRoot,
    data.counterAsset,
    Vector3.create(0, 0, 0.65),
    Quaternion.fromEulerDegrees(0, 180, 0)
  )

  // Lámpara de mostrador e interruptor de control
  spawnProp(
    postRoot,
    ASSETS.tableLamp,
    Vector3.create(0.8, 0.02, 0.65),
    Quaternion.Identity()
  )
  spawnProp(
    postRoot,
    ASSETS.switch,
    Vector3.create(-0.8, 0.02, 0.65),
    Quaternion.Identity()
  )

  // 6. Almacén trasero, barriles de mercancía y engranajes
  spawnProp(
    postRoot,
    ASSETS.barrel,
    Vector3.create(-1.3, 0, -0.4),
    Quaternion.Identity()
  )
  spawnProp(
    postRoot,
    ASSETS.barrel,
    Vector3.create(-1.1, 0, -0.9),
    Quaternion.fromEulerDegrees(0, 45, 0)
  )
  spawnProp(
    postRoot,
    ASSETS.chestTube,
    Vector3.create(0.3, 0, -0.8),
    Quaternion.Identity()
  )
  spawnProp(
    postRoot,
    ASSETS.gearSmall01,
    Vector3.create(0.9, 0.05, -0.7),
    Quaternion.fromEulerDegrees(90, 25, 0),
    Vector3.create(0.8, 0.8, 0.8)
  )

  // 7. Farola steampunk exterior de iluminación peatonal
  spawnProp(
    postRoot,
    ASSETS.lamp,
    Vector3.create(1.8, 0, 1.2),
    Quaternion.Identity()
  )

  return postRoot
}

/**
 * Función principal constructora que instancia los 5 puestos de comercio en el mundo.
 */
export function createTradingPosts(parent?: Entity): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    parent: parent || undefined,
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  TRADING_POSTS_CONFIG.posts.forEach((postData) => {
    buildIndividualTradingPost(root, postData)
  })

  console.log('🏬 [Puestos de Comercio] 5 quioscos steampunk equidistantes instanciados en el bulevar de la Forja.')
  return root
}
