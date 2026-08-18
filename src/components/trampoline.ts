import { engine, Schemas } from '@dcl/sdk/ecs'

/**
 * ============================================================================
 * COMPONENTE ECS: TRAMPOLÍN DE VAPOR STEAMPUNK (TRAMPOLINE COMPONENT)
 * ============================================================================
 * Almacena los parámetros de impulso físico, temporizadores de enfriamiento
 * y el estado de animación elástica de la plataforma de lanzamiento.
 */
export const TrampolineComponent = engine.defineComponent('golems::TrampolineComponent', {
  /** Componente X del vector de impulso */
  impulseX: Schemas.Float,
  /** Componente Y del vector de impulso (elevación vertical) */
  impulseY: Schemas.Float,
  /** Componente Z del vector de impulso (avance horizontal hacia el norte) */
  impulseZ: Schemas.Float,
  /** Radio de detección horizontal en metros */
  triggerRadius: Schemas.Float,
  /** Temporizador de enfriamiento restante en segundos (evita lanzamientos múltiples repetidos) */
  cooldownTimer: Schemas.Float,
  /** Indica si la lona elástica está ejecutando la animación de rebote */
  isBouncing: Schemas.Boolean,
  /** Tiempo acumulado de la animación de rebote */
  bounceTimer: Schemas.Float,
  /** Entidad hija que representa la lona elástica para deformación visual */
  matEntity: Schemas.Entity
})
