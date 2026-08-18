import {
  engine,
  Transform,
  Physics,
  Entity,
  Material
} from '@dcl/sdk/ecs'
import { Vector3, Color3, Color4 } from '@dcl/sdk/math'
import { TrampolineComponent } from '../components/trampoline'

/**
 * ============================================================================
 * SISTEMA ECS: FÍSICA Y ANIMACIÓN DEL TRAMPOLÍN STEAMPUNK
 * ============================================================================
 * Gestiona el temporizador de enfriamiento, la detección de proximidad del avatar
 * local como respaldo de alta precisión y la deformación elástica de la lona.
 */

const BOUNCE_TOTAL_DURATION = 0.4 // Duración del ciclo completo de rebote visual en segundos
const REST_MAT_HEIGHT = 0.45 // Altura base de la lona elástica en reposo
const REST_MAT_SCALE_XZ = 2.8 // Diámetro base de la lona
const REST_MAT_SCALE_Y = 0.2 // Grosor de la lona

/**
 * Ejecuta el lanzamiento físico del jugador y activa la respuesta visual del trampolín.
 */
export function launchPlayerWithTrampoline(trampolineEntity: Entity) {
  if (!TrampolineComponent.has(trampolineEntity)) {
    return
  }

  const trampoline = TrampolineComponent.get(trampolineEntity)
  if (trampoline.cooldownTimer > 0) {
    return
  }

  // 1. Impulso explosivo instantáneo (50% del salto extremo: Y=160, Z=90)
  const impulseVector = Vector3.create(trampoline.impulseX, trampoline.impulseY, trampoline.impulseZ)
  Physics.applyImpulseToPlayer(impulseVector)

  // 2. Fuerza propulsora sostenida de cohete a vapor durante 0.7 segundos (50% de duración y fuerza: Y=288, Z=162)
  Physics.applyForceToPlayerForDuration(
    trampolineEntity,
    0.7,
    Vector3.create(trampoline.impulseX * 1.5, trampoline.impulseY * 1.8, trampoline.impulseZ * 1.8)
  )

  // 3. Onda de choque y detonación direccional knockback (50% de fuerza: 150)
  const baseTransform = Transform.getOrNull(trampolineEntity)
  if (baseTransform) {
    const explosionCenter = Vector3.create(
      baseTransform.position.x,
      baseTransform.position.y - 1.2,
      baseTransform.position.z - 1.8
    )
    Physics.applyKnockbackToPlayer(explosionCenter, 150)
  }

  // 4. Activar cooldown calibrado y animación de rebote en el componente
  const mutableTrampoline = TrampolineComponent.getMutable(trampolineEntity)
  mutableTrampoline.cooldownTimer = 2.5 // 2.5 segundos de enfriamiento para el arco de vuelo
  mutableTrampoline.isBouncing = true
  mutableTrampoline.bounceTimer = 0

  // 5. Destello de energía emisiva de alta intensidad en la lona elástica
  if (trampoline.matEntity && Material.has(trampoline.matEntity)) {
    Material.setPbrMaterial(trampoline.matEntity, {
      albedoColor: Color4.create(1.0, 0.8, 0.2, 1.0),
      emissiveColor: Color3.create(1.0, 0.85, 0.3),
      emissiveIntensity: 10.0,
      metallic: 0.2,
      roughness: 0.1
    })
  }
}

/**
 * Sistema principal de actualización para trampolines en escena.
 */
export function trampolineSystem(dt: number) {
  const playerTransform = Transform.getOrNull(engine.PlayerEntity)

  for (const [entity, trampoline] of engine.getEntitiesWith(TrampolineComponent, Transform)) {
    const baseTransform = Transform.get(entity)

    // --- 1. GESTIÓN DEL TEMPORIZADOR DE ENFRIAMIENTO (COOLDOWN) ---
    if (trampoline.cooldownTimer > 0) {
      const mutable = TrampolineComponent.getMutable(entity)
      mutable.cooldownTimer = Math.max(0, trampoline.cooldownTimer - dt)
    }

    // --- 2. ANIMACIÓN VISUAL DE REBOTE DE LA LONA (SQUASH & STRETCH) ---
    if (trampoline.isBouncing && trampoline.matEntity && Transform.has(trampoline.matEntity)) {
      const newTimer = trampoline.bounceTimer + dt
      const mutable = TrampolineComponent.getMutable(entity)
      mutable.bounceTimer = newTimer

      const matTransform = Transform.getMutable(trampoline.matEntity)

      if (newTimer < 0.1) {
        // Fase 1: Compresión rápida hacia abajo (0.0s - 0.1s)
        const progress = newTimer / 0.1
        matTransform.position.y = REST_MAT_HEIGHT - 0.25 * Math.sin(progress * (Math.PI / 2))
        matTransform.scale.x = REST_MAT_SCALE_XZ * (1 + 0.15 * progress)
        matTransform.scale.z = REST_MAT_SCALE_XZ * (1 + 0.15 * progress)
        matTransform.scale.y = REST_MAT_SCALE_Y * (1 - 0.3 * progress)
      } else if (newTimer < 0.25) {
        // Fase 2: Expansión elástica hacia arriba (0.1s - 0.25s)
        const progress = (newTimer - 0.1) / 0.15
        matTransform.position.y = (REST_MAT_HEIGHT - 0.25) + 0.45 * Math.sin(progress * (Math.PI / 2))
        matTransform.scale.x = REST_MAT_SCALE_XZ * (1.15 - 0.25 * progress)
        matTransform.scale.z = REST_MAT_SCALE_XZ * (1.15 - 0.25 * progress)
        matTransform.scale.y = REST_MAT_SCALE_Y * (0.7 + 0.6 * progress)
      } else if (newTimer < BOUNCE_TOTAL_DURATION) {
        // Fase 3: Retorno suave al reposo (0.25s - 0.4s)
        const progress = (newTimer - 0.25) / (BOUNCE_TOTAL_DURATION - 0.25)
        matTransform.position.y = (REST_MAT_HEIGHT + 0.2) - 0.2 * progress
        matTransform.scale.x = REST_MAT_SCALE_XZ * (0.9 + 0.1 * progress)
        matTransform.scale.z = REST_MAT_SCALE_XZ * (0.9 + 0.1 * progress)
        matTransform.scale.y = REST_MAT_SCALE_Y * (1.3 - 0.3 * progress)
      } else {
        // Fin de la animación: restaurar valores exactos de reposo
        mutable.isBouncing = false
        matTransform.position.y = REST_MAT_HEIGHT
        matTransform.scale = Vector3.create(REST_MAT_SCALE_XZ, REST_MAT_SCALE_Y, REST_MAT_SCALE_XZ)

        // Restaurar material normal con emisión equilibrada
        if (Material.has(trampoline.matEntity)) {
          Material.setPbrMaterial(trampoline.matEntity, {
            albedoColor: Color4.create(0.9, 0.45, 0.1, 1.0),
            emissiveColor: Color3.create(0.9, 0.45, 0.1),
            emissiveIntensity: 1.8,
            metallic: 0.4,
            roughness: 0.3
          })
        }
      }
    }

    // --- 3. DETECCIÓN POR PROXIMIDAD (RESPALDO AUTOMÁTICO AL PISAR) ---
    if (playerTransform && trampoline.cooldownTimer <= 0 && !trampoline.isBouncing) {
      const dx = playerTransform.position.x - baseTransform.position.x
      const dz = playerTransform.position.z - baseTransform.position.z
      const distSq = dx * dx + dz * dz
      const radius = trampoline.triggerRadius
      const dy = Math.abs(playerTransform.position.y - baseTransform.position.y)

      // Si el jugador está dentro del radio del trampolín y a una altura de pisada válida
      if (distSq <= radius * radius && dy <= 1.5) {
        launchPlayerWithTrampoline(entity)
      }
    }
  }
}
