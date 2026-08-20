import {
  engine,
  Entity,
  Transform,
  Schemas
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

/**
 * ============================================================================
 * COMPONENTE DE PATRULLA Y MOVIMIENTO DE NPCS (NPC PATROL COMPONENT)
 * ============================================================================
 * Almacena las coordenadas de anclaje (spawn), destino actual, velocidad
 * y estado de movimiento para cada NPC en el mapa.
 */
export const NpcPatrolComponent = engine.defineComponent('NpcPatrolComponent', {
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
 * SISTEMA ECS: PATRULLA ORGÁNICA DE NPCS (NPC PATROL SYSTEM)
 * ============================================================================
 * Procesa el movimiento dinámico y sutil de los 50 NPCs distribuidos en la escena:
 * 1. Alterna orgánicamente entre caminata ('WALKING') y descanso ('IDLE').
 * 2. Mantiene a cada NPC dentro de un radio de patrulla seguro alrededor de su origen.
 * 3. Rotación suave encarando el sentido de desplazamiento.
 * 4. Optimización DOP: Mutaciones exclusivas en condicionales estrictas de desplazamiento.
 */
export function npcPatrolSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(NpcPatrolComponent, Transform)) {
    const patrol = NpcPatrolComponent.get(entity)
    const transform = Transform.get(entity)

    if (patrol.state === 'IDLE') {
      const newIdleTimer = patrol.idleTimer - dt
      if (newIdleTimer <= 0) {
        // Seleccionar un nuevo punto de destino dentro del radio de patrulla respecto al anchor
        const angle = Math.random() * Math.PI * 2
        const r = 1.0 + Math.random() * (patrol.patrolRadius - 1.0)
        const targetX = patrol.anchorX + Math.cos(angle) * r
        const targetZ = patrol.anchorZ + Math.sin(angle) * r

        const mutablePatrol = NpcPatrolComponent.getMutable(entity)
        mutablePatrol.targetX = targetX
        mutablePatrol.targetZ = targetZ
        mutablePatrol.state = 'WALKING'
        mutablePatrol.idleTimer = 0
      } else {
        const mutablePatrol = NpcPatrolComponent.getMutable(entity)
        mutablePatrol.idleTimer = newIdleTimer
      }
    } else if (patrol.state === 'WALKING') {
      const dx = patrol.targetX - transform.position.x
      const dz = patrol.targetZ - transform.position.z
      const dist = Math.sqrt(dx * dx + dz * dz)

      if (dist < 0.25) {
        // Destino alcanzado, cambiar a reposo (IDLE) durante 3.0 a 7.0 segundos
        const mutablePatrol = NpcPatrolComponent.getMutable(entity)
        mutablePatrol.state = 'IDLE'
        mutablePatrol.idleTimer = 3.0 + Math.random() * 4.0
      } else {
        const dirX = dx / dist
        const dirZ = dz / dist
        const step = Math.min(dist, patrol.moveSpeed * dt)

        const newX = transform.position.x + dirX * step
        const newZ = transform.position.z + dirZ * step

        // Calcular ángulo de orientación en grados (sobre el eje Y)
        const angleRad = Math.atan2(dirX, dirZ)
        const angleDeg = angleRad * (180 / Math.PI)

        const mutableTransform = Transform.getMutable(entity)
        mutableTransform.position = Vector3.create(newX, patrol.anchorY, newZ)
        mutableTransform.rotation = Quaternion.fromEulerDegrees(0, angleDeg, 0)
      }
    }
  }
}
