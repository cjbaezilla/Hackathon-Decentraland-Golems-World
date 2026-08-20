import {
  engine,
  Transform,
  GltfContainer,
  Animator,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { USER_HIDEOUT_CONFIG } from '../config/userHideoutConfig'

/**
 * ============================================================================
 * CONSTRUCTOR DEL ESCONDITE Y BÓVEDA DEL USUARIO (USER'S HIDEOUT & VAULT)
 * ============================================================================
 * Ubicación: Punto medio exacto entre el Trampolín de Vapor (X: 5.1m, Z: 7.1m)
 * y el Puesto de Mercado #06 (X: 6.4m, Z: 28.3m).
 *
 * Enfoque de diseño:
 * - Centro en Z: 17.70m (distancia simétrica de 7.7m tanto al trampolín como al mercado).
 * - Alineación en X: Alejado del borde del mapa (X: 3.8m a 8.0m), coordinado con la hilera de puestos de mercado.
 * - Pila de chatarra y refugio: Confinados al fondo (X: 3.8m a 5.5m).
 * - Pasillo intermedio abierto: Franja libre de 2 metros (X: 5.5m a 7.6m).
 * - Los 3 Cofres Cerrados: Situados al frente (X: 7.6m a 8.0m), separados de la pila
 *   y separados entre sí por 2.3 metros de distancia en un arco frontal despejado.
 */

const ASSETS = USER_HIDEOUT_CONFIG.assets

/**
 * Función principal que instancia el escondite del usuario vinculado a un nodo raíz.
 */
export function createUserHideout(): Entity {
  const root = engine.addEntity()
  Transform.create(root, {
    position: Vector3.Zero(),
    rotation: Quaternion.Identity(),
    scale: Vector3.One()
  })

  // 1. Plataforma base compacta, suelo de tablones rotos, vallas traseras y tejadillo
  buildShelterAndFlooring(root)

  // 2. Rincón interior de descanso: Silla steampunk, mesa de trabajo y farol de ambiente
  buildUserRestingCorner(root)

  // 3. Bóveda frontal: Los 3 cofres cerrados separados de la pila y separados entre sí
  buildSeparatedClosedChests(root)

  // 4. Chatarra en flancos y fondo: Engranajes monumentales, vagoneta descarrilada y barriles
  buildFlankWreckages(root)

  console.log('🏚️ [User Hideout] Escondite instanciado en el punto medio exacto (Z: 17.7m, X: 3.8m-8.0m) con 3 cofres cerrados.')
  return root
}

/**
 * Helper utilitario para instanciar props estáticos.
 * @param disableAnimation Si es true, desactiva cualquier animación embebida en el GLTF para mantenerlo cerrado y estático.
 */
function spawnProp(
  parent: Entity,
  modelSrc: string,
  pos: Vector3,
  rot: Quaternion = Quaternion.Identity(),
  scale: Vector3 = Vector3.One(),
  disableAnimation: boolean = false
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

  // Desactivar animaciones automáticas para mantener el modelo estático/cerrado
  if (disableAnimation) {
    Animator.createOrReplace(entity, {
      states: []
    })
  }

  return entity
}

/**
 * 1. Estructura de Refugio Compacto, Tarimas de Madera y Tejadillo
 */
function buildShelterAndFlooring(parent: Entity) {
  // A. Tarima de tablones rotos centrada bajo el refugio (X: 3.8m a 5.8m, Z: 15.7m a 19.7m)
  spawnProp(
    parent,
    ASSETS.woodPlanksBroken,
    Vector3.create(4.8, 0.02, 17.7),
    Quaternion.fromEulerDegrees(1.0, 5.0, -0.5),
    Vector3.create(1.0, 1.0, 1.0)
  )

  // B. Tarimas individuales limpias bajo cada uno de los 3 cofres separados al frente
  // Tarima Cofre Izquierdo (Sur)
  spawnProp(
    parent,
    ASSETS.floorWood2x2,
    Vector3.create(7.6, 0.02, 15.4),
    Quaternion.fromEulerDegrees(0, 15.0, 0),
    Vector3.create(0.7, 1.0, 0.7)
  )
  // Tarima Cofre Central
  spawnProp(
    parent,
    ASSETS.floorWood2x2,
    Vector3.create(8.0, 0.02, 17.7),
    Quaternion.Identity(),
    Vector3.create(0.75, 1.0, 0.75)
  )
  // Tarima Cofre Derecho (Norte)
  spawnProp(
    parent,
    ASSETS.floorWood2x2,
    Vector3.create(7.6, 0.02, 20.0),
    Quaternion.fromEulerDegrees(0, -15.0, 0),
    Vector3.create(0.7, 1.0, 0.7)
  )

  // C. Tablones sueltos de detalle en los laterales del refugio
  spawnProp(
    parent,
    ASSETS.woodLoose1,
    Vector3.create(5.7, 0.02, 15.1),
    Quaternion.fromEulerDegrees(0, 35.0, 0)
  )
  spawnProp(
    parent,
    ASSETS.woodLoose2,
    Vector3.create(5.7, 0.02, 20.3),
    Quaternion.fromEulerDegrees(0, -30.0, 0)
  )

  // D. Pared trasera perimetral oeste (X ≈ 3.8m) con vallas mineras rotas
  spawnProp(
    parent,
    ASSETS.brokenMineFence,
    Vector3.create(3.8, 0.02, 16.1),
    Quaternion.fromEulerDegrees(0, 90.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )
  spawnProp(
    parent,
    ASSETS.brokenMineFence,
    Vector3.create(3.8, 0.02, 19.1),
    Quaternion.fromEulerDegrees(0, 90.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )

  // Cierre angular lateral sur y norte
  spawnProp(
    parent,
    ASSETS.treeFence,
    Vector3.create(4.4, 0.02, 14.7),
    Quaternion.fromEulerDegrees(0, 25.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )
  spawnProp(
    parent,
    ASSETS.treeFence,
    Vector3.create(4.4, 0.02, 20.7),
    Quaternion.fromEulerDegrees(0, -25.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )

  // E. Tejadillo inclinado de chapa sobre la zona de la silla y mesa
  spawnProp(
    parent,
    ASSETS.ceilingCanopy,
    Vector3.create(4.8, 2.7, 17.7),
    Quaternion.fromEulerDegrees(14.0, 5.0, -8.0),
    Vector3.create(0.95, 0.95, 0.95)
  )
}

/**
 * 2. Rincón Interior de Descanso: Silla Steampunk, Mesa y Farol
 */
function buildUserRestingCorner(parent: Entity) {
  // A. La Silla Principal del Usuario (Bajo el tejadillo, mirando hacia los cofres y el camino)
  spawnProp(
    parent,
    ASSETS.steampunkChair,
    Vector3.create(4.7, 0.04, 17.7),
    Quaternion.fromEulerDegrees(0, 50.0, 0),
    Vector3.create(1.15, 1.15, 1.15)
  )

  // B. Mesa de trabajo con engranaje
  spawnProp(
    parent,
    ASSETS.gearTable,
    Vector3.create(5.4, 0.02, 16.7),
    Quaternion.fromEulerDegrees(0, 20.0, 0),
    Vector3.create(0.9, 0.9, 0.9)
  )

  // Lámpara de mesa steampunk
  spawnProp(
    parent,
    ASSETS.tableLamp,
    Vector3.create(5.35, 0.82, 16.65),
    Quaternion.fromEulerDegrees(0, 10.0, 0),
    Vector3.create(0.85, 0.85, 0.85)
  )

  // C. Taburete auxiliar de tambor
  spawnProp(
    parent,
    ASSETS.drummChair,
    Vector3.create(5.3, 0.03, 18.8),
    Quaternion.fromEulerDegrees(0, 120.0, 0),
    Vector3.create(0.9, 0.9, 0.9)
  )

  // D. Farol de poste delimitador en el lateral sur
  spawnProp(
    parent,
    ASSETS.lamp,
    Vector3.create(6.4, 0.02, 14.5),
    Quaternion.fromEulerDegrees(0, 45.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )
}

/**
 * 3. Bóveda Frontal: 3 Cofres Cerrados Separados de la Pila y Separados entre Sí
 */
function buildSeparatedClosedChests(parent: Entity) {
  // 1. Cofre Cerrado Izquierdo (Sur): Separado a Z: 15.4m y adelantado a X: 7.6m
  spawnProp(
    parent,
    ASSETS.closedChestLeft,
    Vector3.create(7.6, 0.04, 15.4),
    Quaternion.fromEulerDegrees(0, 15.0, 0),
    Vector3.create(1.15, 1.15, 1.15),
    true
  )

  // 2. Cofre Cerrado Central: Separado a Z: 17.7m (distancia de 2.3m del izquierdo) y adelantado a X: 8.0m
  spawnProp(
    parent,
    ASSETS.closedChestCenter,
    Vector3.create(8.0, 0.04, 17.7),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(1.2, 1.2, 1.2),
    true
  )

  // 3. Cofre Cerrado Derecho (Norte): Separado a Z: 20.0m (distancia de 2.3m del central) y adelantado a X: 7.6m
  spawnProp(
    parent,
    ASSETS.closedChestRight,
    Vector3.create(7.6, 0.04, 20.0),
    Quaternion.fromEulerDegrees(0, -15.0, 0),
    Vector3.create(1.15, 1.15, 1.15),
    true
  )
}

/**
 * 4. Chatarra, Engranajes y Restos (Confinados al Fondo y Laterales X <= 5.5m)
 */
function buildFlankWreckages(parent: Entity) {
  // A. Vagoneta Minera Descarrilada en el flanco norte (X: 4.5m, Z: 19.7m)
  spawnProp(
    parent,
    ASSETS.mineCart,
    Vector3.create(4.5, 0.02, 19.7),
    Quaternion.fromEulerDegrees(16.0, -35.0, 10.0),
    Vector3.create(1.15, 1.15, 1.15)
  )

  // B. Cúmulos de chatarra exclusivamente en el fondo trasero (X <= 4.7m)
  spawnProp(
    parent,
    ASSETS.trashGroup,
    Vector3.create(4.5, 0.02, 15.5),
    Quaternion.fromEulerDegrees(0, 30.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )
  spawnProp(
    parent,
    ASSETS.trashGroup,
    Vector3.create(4.5, 0.02, 19.9),
    Quaternion.fromEulerDegrees(0, -40.0, 0),
    Vector3.create(1.0, 1.0, 1.0)
  )

  // C. Contenedores de basura abollados en el flanco
  spawnProp(
    parent,
    ASSETS.trashCan,
    Vector3.create(5.2, 0.02, 14.9),
    Quaternion.fromEulerDegrees(80.0, 30.0, 0),
    Vector3.create(0.95, 0.95, 0.95)
  )
  spawnProp(
    parent,
    ASSETS.trashCan,
    Vector3.create(4.4, 0.02, 18.9),
    Quaternion.fromEulerDegrees(5.0, -15.0, 0),
    Vector3.create(0.9, 0.9, 0.9)
  )

  // D. Grandes Engranajes Oxidados apoyados en el fondo trasero
  // Engranaje gigante sur
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(4.0, 0.5, 15.5),
    Quaternion.fromEulerDegrees(68.0, 25.0, 10.0),
    Vector3.create(1.4, 1.4, 1.4)
  )
  // Engranaje gigante norte
  spawnProp(
    parent,
    ASSETS.gearBig,
    Vector3.create(3.9, 0.55, 19.8),
    Quaternion.fromEulerDegrees(72.0, -35.0, 10.0),
    Vector3.create(1.5, 1.5, 1.5)
  )
  // Engranajes medianos y pequeños en las esquinas traseras
  spawnProp(
    parent,
    ASSETS.gear10Teeth,
    Vector3.create(4.5, 0.15, 15.0),
    Quaternion.fromEulerDegrees(35.0, 60.0, 0),
    Vector3.create(1.1, 1.1, 1.1)
  )
  spawnProp(
    parent,
    ASSETS.gear8Teeth,
    Vector3.create(4.2, 0.15, 19.1),
    Quaternion.fromEulerDegrees(45.0, 110.0, 0),
    Vector3.create(1.1, 1.1, 1.1)
  )
  spawnProp(
    parent,
    ASSETS.gearAngled10,
    Vector3.create(4.2, 0.22, 16.9),
    Quaternion.fromEulerDegrees(50.0, 15.0, 0),
    Vector3.create(0.95, 0.95, 0.95)
  )
  spawnProp(
    parent,
    ASSETS.gearShaft,
    Vector3.create(4.1, 0.04, 18.4),
    Quaternion.fromEulerDegrees(10.0, 85.0, 15.0),
    Vector3.create(0.85, 0.85, 0.85)
  )

  // Piñones pequeños
  spawnProp(
    parent,
    ASSETS.gearSmall01,
    Vector3.create(5.0, 0.03, 16.1),
    Quaternion.fromEulerDegrees(15.0, 20.0, 0)
  )
  spawnProp(
    parent,
    ASSETS.gearSmall02,
    Vector3.create(5.0, 0.03, 19.2),
    Quaternion.fromEulerDegrees(-10.0, 70.0, 0)
  )

  // E. Barriles industriales en los flancos traseros
  spawnProp(
    parent,
    ASSETS.barrel,
    Vector3.create(4.1, 0.02, 16.2),
    Quaternion.Identity(),
    Vector3.create(0.9, 0.9, 0.9)
  )
  spawnProp(
    parent,
    ASSETS.barrel,
    Vector3.create(4.3, 0.16, 18.7),
    Quaternion.fromEulerDegrees(90.0, 35.0, 0),
    Vector3.create(0.9, 0.9, 0.9)
  )

  // F. Calderín de vapor y boca de hidrante
  spawnProp(
    parent,
    ASSETS.smoker,
    Vector3.create(4.0, 0.02, 17.7),
    Quaternion.fromEulerDegrees(0, 25.0, 0),
    Vector3.create(0.95, 0.95, 0.95)
  )
  spawnProp(
    parent,
    ASSETS.hidrant,
    Vector3.create(6.0, 0.02, 20.5),
    Quaternion.fromEulerDegrees(0, 45.0, 0),
    Vector3.create(0.85, 0.85, 0.85)
  )

  // Llaves e interruptores en las vallas traseras
  spawnProp(
    parent,
    ASSETS.lever,
    Vector3.create(3.85, 0.9, 16.4),
    Quaternion.fromEulerDegrees(0, 90.0, 0),
    Vector3.create(0.8, 0.8, 0.8)
  )
  spawnProp(
    parent,
    ASSETS.switch,
    Vector3.create(3.85, 0.9, 18.7),
    Quaternion.fromEulerDegrees(0, 90.0, 0),
    Vector3.create(0.8, 0.8, 0.8)
  )
}
