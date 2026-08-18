import { engine, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ArenaRotatorComponent } from '../components/arena'

/**
 * ============================================================================
 * SISTEMA ECS: ANIMACIÓN DE ELEMENTOS MECÁNICOS DE LA ARENA
 * ============================================================================
 * Aplica rotación continua a los engranajes del suelo, sigilos centrales
 * y coronas de los pilares perimetrales respetando los principios de
 * Data-Oriented Programming (DOP) de Decentraland SDK7.
 */
export function arenaAnimationSystem(dt: number) {
  for (const [entity, rotator] of engine.getEntitiesWith(ArenaRotatorComponent, Transform)) {
    const currentTransform = Transform.get(entity)

    // Calcular incremento angular en base al delta time
    const angleDeltaDeg = (rotator.speedY * dt * 180) / Math.PI
    const deltaRotation = Quaternion.fromAngleAxis(angleDeltaDeg, Vector3.Up())

    const mutableTransform = Transform.getMutable(entity)
    mutableTransform.rotation = Quaternion.multiply(currentTransform.rotation, deltaRotation)
  }
}
