import { engine, Transform, Entity, ComponentType } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { getIsForgeUIOpen } from '../state'

/**
 * ============================================================================
 * SISTEMA ECS: ANIMACIÓN ESTRUCTURAL DE LA FÁBRICA DE GOLEMS (WRECKAGE LAB)
 * ============================================================================
 * Anima continuamente la rotación de los engranajes, la vibración de la caldera
 * y la intensidad de resplandor del laboratorio.
 * Soporta dos estados de velocidad:
 * - IDLE: Rotación fluida constante (modo ambiente).
 * - FORGING: Rotación acelerada a 3.5x con ligera oscilación vertical de la caldera.
 * 
 * OPTIMIZACIÓN MOBILE: Si la UI de la forja está desplegada (getIsForgeUIOpen() === true),
 * este sistema se pausa y no mutará los componentes Transform per-frame, eliminando
 * la sobrecarga del motor 3D mientras el usuario interactúa con la UI.
 */

export interface AnimatedGearData {
  entity: Entity
  axis: 'X' | 'Y' | 'Z'
  speed: number
}

const animatedGears: AnimatedGearData[] = []
let boilerEntity: Entity | null = null
let isForgingActive: boolean = false
let forgingTimer: number = 0
let initialBoilerY: number = 0.05

/**
 * Registra una entidad de engranaje para ser animada dinámicamente.
 */
export function registerFactoryGear(entity: Entity, axis: 'X' | 'Y' | 'Z' = 'Y', speed: number = 45) {
  animatedGears.push({ entity, axis, speed })
}

/**
 * Registra la caldera principal para animar su pulsación durante la forja.
 */
export function registerFactoryBoiler(entity: Entity, initialY: number = 0.05) {
  boilerEntity = entity
  initialBoilerY = initialY
}

/**
 * Limpia el registro de engranajes animados.
 */
export function clearFactoryAnimationRegistry() {
  animatedGears.length = 0
  boilerEntity = null
}

/**
 * Activa o desactiva la aceleración de forja en la maquinaria.
 */
export function setFactoryForgingAnimation(active: boolean) {
  isForgingActive = active
  if (active) {
    forgingTimer = 0
  }
}

/**
 * Consulta si la animación de forja intensiva está activa.
 */
export function getIsFactoryForgingActive(): boolean {
  return isForgingActive
}

/**
 * Sistema ECS ejecutado en cada frame para actualizar la rotación de engranajes.
 */
export function factoryAnimationSystem(dt: number) {
  // Desactivar animaciones per-frame en 3D automáticamente si la UI de Forja está desplegada
  if (getIsForgeUIOpen()) {
    return
  }

  const speedMultiplier = isForgingActive ? 3.5 : 1.0

  // 1. Rotación continua de engranajes
  for (let i = 0; i < animatedGears.length; i++) {
    const gear = animatedGears[i]
    if (!Transform.has(gear.entity)) continue

    const transform = Transform.getMutable(gear.entity)
    const angleDelta = gear.speed * speedMultiplier * dt

    let rotDelta: Quaternion
    if (gear.axis === 'X') {
      rotDelta = Quaternion.fromEulerDegrees(angleDelta, 0, 0)
    } else if (gear.axis === 'Z') {
      rotDelta = Quaternion.fromEulerDegrees(0, 0, angleDelta)
    } else {
      rotDelta = Quaternion.fromEulerDegrees(0, angleDelta, 0)
    }

    transform.rotation = Quaternion.multiply(transform.rotation, rotDelta)
  }

  // 2. Vibración de la caldera durante la forja
  if (isForgingActive && boilerEntity && Transform.has(boilerEntity)) {
    forgingTimer += dt * 15
    const transform = Transform.getMutable(boilerEntity)
    const yOffset = Math.sin(forgingTimer) * 0.04
    transform.position.y = initialBoilerY + yOffset
  } else if (!isForgingActive && boilerEntity && Transform.has(boilerEntity)) {
    const transform = Transform.getMutable(boilerEntity)
    if (Math.abs(transform.position.y - initialBoilerY) > 0.001) {
      transform.position.y = initialBoilerY
    }
  }
}
