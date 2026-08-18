import { engine, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { GolemFollowerComponent } from '../components/follower'
import { FOLLOW_SYSTEM_SETTINGS } from '../config/golems'

/**
 * ============================================================================
 * SISTEMA ECS: SEGUIMIENTO EN FILA DE GOLEMS (BREADCRUMB TRAIL SYSTEM)
 * ============================================================================
 * Registra la trayectoria histórica del avatar del maestro y mueve a los 3 golems
 * en fila india (conga/snake line) con interpolación suave LERP / SLERP.
 */

interface BreadcrumbNode {
  position: Vector3
  rotation: Quaternion
}

/** Cola FIFO de migajas de posición y rotación */
const trail: BreadcrumbNode[] = []
let lastSampledPlayerPos: Vector3 | null = null
let isTrailInitialized = false

/**
 * Reinicializa el historial de migajas alineándolo detrás del jugador.
 */
function resetTrailBehindPlayer(playerPos: Vector3, playerRot: Quaternion) {
  trail.length = 0
  lastSampledPlayerPos = Vector3.clone(playerPos)

  const backwardDir = Vector3.rotate(Vector3.Backward(), playerRot)
  for (let i = 0; i < 25; i++) {
    trail.push({
      position: Vector3.add(playerPos, Vector3.scale(backwardDir, (i + 1) * 0.3)),
      rotation: Quaternion.create(playerRot.x, playerRot.y, playerRot.z, playerRot.w)
    })
  }
}

/**
 * Calcula la posición y dirección tangencial a lo largo de la trayectoria histórica
 * para una distancia específica detrás del avatar.
 */
function getPositionAlongTrail(
  targetDistance: number,
  currentHeadPos: Vector3
): { position: Vector3; forwardDir: Vector3 } {
  if (trail.length === 0) {
    return { position: currentHeadPos, forwardDir: Vector3.Forward() }
  }

  let accumulatedDist = 0
  let prevPos = currentHeadPos

  for (let i = 0; i < trail.length; i++) {
    const nextPos = trail[i].position
    const segVector = Vector3.subtract(nextPos, prevPos)
    const segLength = Vector3.length(segVector)

    if (segLength < 0.001) continue

    if (accumulatedDist + segLength >= targetDistance) {
      const remaining = targetDistance - accumulatedDist
      const t = Math.min(1, Math.max(0, remaining / segLength))
      const targetPos = Vector3.lerp(prevPos, nextPos, t)
      const forwardDir = Vector3.normalize(Vector3.subtract(prevPos, nextPos))
      return { position: targetPos, forwardDir }
    }

    accumulatedDist += segLength
    prevPos = nextPos
  }

  // Si la distancia objetivo sobrepasa la longitud del historial, proyectar hacia atrás
  if (trail.length >= 2) {
    const last = trail[trail.length - 1].position
    const secondLast = trail[trail.length - 2].position
    const dir = Vector3.normalize(Vector3.subtract(last, secondLast))
    const extra = targetDistance - accumulatedDist
    return {
      position: Vector3.add(last, Vector3.scale(dir, extra)),
      forwardDir: Vector3.scale(dir, -1)
    }
  }

  return { position: trail[trail.length - 1].position, forwardDir: Vector3.Forward() }
}

/**
 * Sistema principal de seguimiento que se ejecuta en cada tick del motor.
 */
export function golemFollowerSystem(dt: number) {
  // 1. Validar presencia y lectura segura del Transform del jugador (engine.PlayerEntity)
  if (!Transform.has(engine.PlayerEntity)) {
    return
  }

  const playerTransform = Transform.get(engine.PlayerEntity)
  const playerPos = playerTransform.position
  const playerRot = playerTransform.rotation

  // 2. Inicialización de trayectoria
  if (!isTrailInitialized || lastSampledPlayerPos === null) {
    resetTrailBehindPlayer(playerPos, playerRot)
    isTrailInitialized = true
    return
  }

  // 3. Detección de teletransporte o salto de distancia abrupto
  const distFromLastSample = Vector3.distance(playerPos, lastSampledPlayerPos)
  if (distFromLastSample > FOLLOW_SYSTEM_SETTINGS.TELEPORT_DISTANCE_THRESHOLD) {
    resetTrailBehindPlayer(playerPos, playerRot)
    return
  }

  // 4. Muestreo de trayectoria: registrar nueva migaja si el avatar se desplazó
  if (distFromLastSample >= FOLLOW_SYSTEM_SETTINGS.BREADCRUMB_MIN_DISTANCE) {
    trail.unshift({
      position: Vector3.clone(playerPos),
      rotation: Quaternion.create(playerRot.x, playerRot.y, playerRot.z, playerRot.w)
    })
    lastSampledPlayerPos = Vector3.clone(playerPos)

    if (trail.length > FOLLOW_SYSTEM_SETTINGS.MAX_BREADCRUMBS) {
      trail.pop()
    }
  }

  // 5. Actualizar la posición y rotación de cada Golem seguidor
  for (const [entity] of engine.getEntitiesWith(GolemFollowerComponent, Transform)) {
    const follower = GolemFollowerComponent.get(entity)
    const currentTransform = Transform.get(entity)

    // Calcular posición objetivo en la trayectoria para este golem
    const { position: targetPos } = getPositionAlongTrail(follower.targetDistance, playerPos)

    // Distancia al punto objetivo
    const distToTarget = Vector3.distance(currentTransform.position, targetPos)

    // Zona de reposo (Idle)
    if (distToTarget < FOLLOW_SYSTEM_SETTINGS.IDLE_DISTANCE_THRESHOLD) {
      if (follower.isMoving) {
        GolemFollowerComponent.getMutable(entity).isMoving = false
      }
      continue
    }

    // Movimiento activo con interpolación suave LERP y SLERP
    const mutableTransform = Transform.getMutable(entity)
    const moveStep = Math.min(1.0, dt * follower.moveSpeed)

    mutableTransform.position = Vector3.lerp(currentTransform.position, targetPos, moveStep)

    // Orientación hacia el objetivo
    const moveDelta = Vector3.subtract(targetPos, currentTransform.position)
    moveDelta.y = 0 // Mantener rotación sobre el plano horizontal

    if (Vector3.lengthSquared(moveDelta) > 0.001) {
      const targetRotation = Quaternion.lookRotation(Vector3.normalize(moveDelta))
      const rotStep = Math.min(1.0, dt * follower.rotationSpeed)
      mutableTransform.rotation = Quaternion.slerp(currentTransform.rotation, targetRotation, rotStep)
    }

    if (!follower.isMoving) {
      GolemFollowerComponent.getMutable(entity).isMoving = true
    }
  }
}
