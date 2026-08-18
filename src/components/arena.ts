import { engine, Schemas } from '@dcl/sdk/ecs'

/**
 * ============================================================================
 * COMPONENTE ECS: ROTADOR DE ELEMENTOS DE LA ARENA (ARENA ROTATOR)
 * ============================================================================
 * Permite que los engranajes y coronas mecánicas giren de forma continua a velocidad
 * angular configurable sin sobrecargar el bus CRDT.
 */
export const ArenaRotatorComponent = engine.defineComponent('golems::ArenaRotatorComponent', {
  /** Velocidad angular en radianes por segundo alrededor del eje Y */
  speedY: Schemas.Float,
  /** Velocidad angular en el eje X (opcional) */
  speedX: Schemas.Float,
  /** Velocidad angular en el eje Z (opcional) */
  speedZ: Schemas.Float
})
