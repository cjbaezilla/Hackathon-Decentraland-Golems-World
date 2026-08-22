import {
  engine,
  Transform,
  Schemas
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

/**
 * ============================================================================
 * COMPONENTE DE PATRULLA Y MOVIMIENTO DE GOLEMS (MAP GOLEM PATROL COMPONENT)
 * ============================================================================
 * Almacena las coordenadas de anclaje (spawn), punto de destino actual, velocidad
 * y estado de movimiento para cada golem en el mapa.
 */
export const MapGolemPatrolComponent = engine.defineComponent('MapGolemPatrolComponent', {
  anchorX: Schemas.Float,
  anchorY: Schemas.Float,
  anchorZ: Schemas.Float,
  targetX: Schemas.Float,
  targetY: Schemas.Float,
  targetZ: Schemas.Float,
  state: Schemas.String, // 'WALKING' | 'IDLE'
  idleTimer: Schemas.Float,
  moveSpeed: Schemas.Float,
  patrolRadius: Schemas.Float
})

/**
 * ============================================================================
 * SISTEMA ECS: PATRULLA AMBIENTAL DE GOLEMS (MAP GOLEM PATROL SYSTEM)
 * ============================================================================
 * Procesa el patrullaje orgánico y pausado de los golems del mapa:
 * 1. Alterna entre caminata ('WALKING') y reposo ('IDLE') con temporizadores aleatorios.
 * 2. Mantiene a cada golem en un radio de patrulla seguro alrededor de su punto de spawn.
 * 3. Orienta de forma suave el modelo 3D GLTF en el sentido de la marcha.
 */
export function mapGolemPatrolSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MapGolemPatrolComponent, Transform)) {
    const patrol = MapGolemPatrolComponent.get(entity)
    const transform = Transform.get(entity)

    if (patrol.state === 'IDLE') {
      const newIdleTimer = patrol.idleTimer - dt
      if (newIdleTimer <= 0) {
        // Seleccionar un nuevo destino aleatorio en el radio de patrulla respecto al anchor
        const angle = Math.random() * Math.PI * 2
        const r = 1.2 + Math.random() * (patrol.patrolRadius - 1.2)
        const targetX = patrol.anchorX + Math.cos(angle) * r
        const targetZ = patrol.anchorZ + Math.sin(angle) * r

        const mutablePatrol = MapGolemPatrolComponent.getMutable(entity)
        mutablePatrol.targetX = targetX
        mutablePatrol.targetZ = targetZ
        mutablePatrol.state = 'WALKING'
        mutablePatrol.idleTimer = 0
      } else {
        const mutablePatrol = MapGolemPatrolComponent.getMutable(entity)
        mutablePatrol.idleTimer = newIdleTimer
      }
    } else if (patrol.state === 'WALKING') {
      const dx = patrol.targetX - transform.position.x
      const dz = patrol.targetZ - transform.position.z
      const dist = Math.sqrt(dx * dx + dz * dz)

      if (dist < 0.28) {
        // Punto alcanzado: pausar en IDLE durante 3 a 8 segundos
        const mutablePatrol = MapGolemPatrolComponent.getMutable(entity)
        mutablePatrol.state = 'IDLE'
        mutablePatrol.idleTimer = 3.0 + Math.random() * 5.0
      } else {
        const dirX = dx / dist
        const dirZ = dz / dist
        const step = Math.min(dist, patrol.moveSpeed * dt)

        const newX = transform.position.x + dirX * step
        const newZ = transform.position.z + dirZ * step

        // Rotación de orientación Y encarando el destino
        const angleRad = Math.atan2(dirX, dirZ)
        const angleDeg = angleRad * (180 / Math.PI)

        const mutableTransform = Transform.getMutable(entity)
        mutableTransform.position = Vector3.create(newX, patrol.anchorY, newZ)
        mutableTransform.rotation = Quaternion.fromEulerDegrees(0, angleDeg, 0)
      }
    }
  }
}
