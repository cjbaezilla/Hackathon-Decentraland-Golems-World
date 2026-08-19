import { engine, Transform, PlayerIdentityData, Entity } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { getPlayer } from '@dcl/sdk/src/players'
import { GolemFollowerComponent, GolemSquadMemberDto } from '../components/follower'
import { FOLLOW_SYSTEM_SETTINGS, generateRandomSquad } from '../config/golems'
import { ARENA_CONFIG } from '../config/arenaConfig'
import { getLocalPlayerId, getRemoteSquad } from '../multiplayer'
import { spawnPlayerSquad, removePlayerSquad } from '../objects/golemFactory'
import { isPositionInsideArena } from './golemCombatSystem'

/**
 * ============================================================================
 * SISTEMA ECS: SEGUIMIENTO MULTIJUGADOR DE GOLEMS (MULTI-TRAIL SYSTEM)
 * ============================================================================
 * Registra las trayectorias históricas (Breadcrumbs) de todos los avatares
 * presentes en la escena (local y remotos) y actualiza el movimiento suave
 * de sus respectivos escuadrones de golems en fila india.
 */

interface BreadcrumbNode {
  position: Vector3
  rotation: Quaternion
}

interface PlayerTrailState {
  ownerAddress: string
  trail: BreadcrumbNode[]
  lastSampledPos: Vector3 | null
  isInitialized: boolean
}

/** Mapa de colas FIFO de migajas por jugador [ownerAddress -> PlayerTrailState] */
const playerTrails = new Map<string, PlayerTrailState>()

/**
 * Reinicializa el historial de migajas alineándolo detrás de la posición y rotación dada.
 */
function resetTrailBehind(
  trailState: PlayerTrailState,
  playerPos: Vector3,
  playerRot: Quaternion
) {
  trailState.trail.length = 0
  trailState.lastSampledPos = Vector3.clone(playerPos)
  trailState.isInitialized = true

  const backwardDir = Vector3.rotate(Vector3.Backward(), playerRot)
  for (let i = 0; i < 25; i++) {
    trailState.trail.push({
      position: Vector3.add(playerPos, Vector3.scale(backwardDir, (i + 1) * 0.3)),
      rotation: Quaternion.create(playerRot.x, playerRot.y, playerRot.z, playerRot.w)
    })
  }
}

/**
 * Obtiene o crea la estructura de trayectoria para un jugador.
 */
function getOrCreateTrailState(ownerAddress: string): PlayerTrailState {
  const key = ownerAddress.toLowerCase()
  let state = playerTrails.get(key)
  if (!state) {
    state = {
      ownerAddress: key,
      trail: [],
      lastSampledPos: null,
      isInitialized: false
    }
    playerTrails.set(key, state)
  }
  return state
}

/**
 * Calcula la posición a lo largo de una trayectoria específica para una distancia objetivo.
 */
function getPositionAlongTrail(
  trail: BreadcrumbNode[],
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

  // Si sobrepasa la longitud de migajas, proyectar linealmente hacia atrás
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
 * Actualiza el historial de migajas de un jugador dado su Transform actual.
 */
function updatePlayerTrail(trailState: PlayerTrailState, pos: Vector3, rot: Quaternion): Vector3 {
  if (!trailState.isInitialized || trailState.lastSampledPos === null) {
    resetTrailBehind(trailState, pos, rot)
    return pos
  }

  const distFromLast = Vector3.distance(pos, trailState.lastSampledPos)

  // Detección de teletransporte o salto abrupto
  if (distFromLast > FOLLOW_SYSTEM_SETTINGS.TELEPORT_DISTANCE_THRESHOLD) {
    resetTrailBehind(trailState, pos, rot)
    return pos
  }

  // Registrar nueva migaja si el avatar se desplazó
  if (distFromLast >= FOLLOW_SYSTEM_SETTINGS.BREADCRUMB_MIN_DISTANCE) {
    trailState.trail.unshift({
      position: Vector3.clone(pos),
      rotation: Quaternion.create(rot.x, rot.y, rot.z, rot.w)
    })
    trailState.lastSampledPos = Vector3.clone(pos)

    if (trailState.trail.length > FOLLOW_SYSTEM_SETTINGS.MAX_BREADCRUMBS) {
      trailState.trail.pop()
    }
  }

  return pos
}

/**
 * Callback para actualizar dinámicamente los modelos/escuadrón de un jugador remoto
 * cuando llega un anuncio por MessageBus.
 */
export function onRemoteSquadUpdated(ownerAddress: string, squad: GolemSquadMemberDto[]) {
  const normAddress = ownerAddress.toLowerCase()
  const localId = getLocalPlayerId().toLowerCase()
  const localPlayer = getPlayer()
  const localUserId = localPlayer?.userId?.toLowerCase()

  // Ignorar absolutamente anuncios provenientes del cliente local
  if (
    normAddress === localId ||
    normAddress === 'local_player' ||
    normAddress === 'local' ||
    (localUserId && normAddress === localUserId)
  ) {
    return
  }

  const trailState = playerTrails.get(normAddress)
  const basePos = trailState?.lastSampledPos || Vector3.create(16, 0.1, 16)

  // Reemplazar escuadrón visual con la nueva configuración recibida
  removePlayerSquad(normAddress)
  spawnPlayerSquad(normAddress, squad, basePos)
}

/**
 * Sistema principal de seguimiento multijugador ejecutado en cada frame.
 */
export function golemFollowerSystem(dt: number) {
  const localId = getLocalPlayerId().toLowerCase()
  const localPlayer = getPlayer()
  const localUserId = localPlayer?.userId?.toLowerCase()

  const activeOwners = new Set<string>()
  const headPositions = new Map<string, Vector3>()

  // --------------------------------------------------------------------------
  // 1. PROCESAR JUGADOR LOCAL (engine.PlayerEntity)
  // --------------------------------------------------------------------------
  if (Transform.has(engine.PlayerEntity)) {
    const localTransform = Transform.get(engine.PlayerEntity)
    const localTrail = getOrCreateTrailState(localId)
    updatePlayerTrail(localTrail, localTransform.position, localTransform.rotation)
    playerTrails.set('local', localTrail)
    playerTrails.set('local_player', localTrail)
    playerTrails.set(localId, localTrail)
    activeOwners.add(localId)
    activeOwners.add('local')
    activeOwners.add('local_player')
    headPositions.set(localId, localTransform.position)
    headPositions.set('local', localTransform.position)
    headPositions.set('local_player', localTransform.position)
  }

  // --------------------------------------------------------------------------
  // 2. PROCESAR JUGADORES REMOTOS (PlayerIdentityData + Transform)
  // --------------------------------------------------------------------------
  for (const [entity] of engine.getEntitiesWith(PlayerIdentityData, Transform)) {
    // Si la entidad es la entidad del jugador local, ignorarla en el bucle remoto
    if (entity === engine.PlayerEntity) {
      continue
    }

    const identity = PlayerIdentityData.get(entity)
    const playerTransform = Transform.get(entity)

    const rawAddress = identity.address || ''
    const remoteAddress = rawAddress.toLowerCase()

    // Evitar duplicar el procesamiento si la entidad representa al jugador local
    if (
      !remoteAddress ||
      remoteAddress === localId ||
      remoteAddress === 'local' ||
      remoteAddress === 'local_player' ||
      (localUserId && remoteAddress === localUserId)
    ) {
      continue
    }

    activeOwners.add(remoteAddress)
    headPositions.set(remoteAddress, playerTransform.position)

    const trailState = getOrCreateTrailState(remoteAddress)

    // Si es la primera vez que vemos a este jugador remoto, instanciar sus 3 golems
    if (!trailState.isInitialized) {
      resetTrailBehind(trailState, playerTransform.position, playerTransform.rotation)

      // Verificar si ya tenemos su escuadrón registrado o generar uno aleatorio provisional
      const squadConfig = getRemoteSquad(remoteAddress) || generateRandomSquad(remoteAddress)
      spawnPlayerSquad(remoteAddress, squadConfig, playerTransform.position)
    } else {
      updatePlayerTrail(trailState, playerTransform.position, playerTransform.rotation)
    }
  }

  // --------------------------------------------------------------------------
  // 3. LIMPIEZA DE JUGADORES DESCONECTADOS
  // --------------------------------------------------------------------------
  for (const [trackedOwner] of playerTrails) {
    if (!activeOwners.has(trackedOwner)) {
      removePlayerSquad(trackedOwner)
      playerTrails.delete(trackedOwner)
    }
  }

  // --------------------------------------------------------------------------
  // 4. ACTUALIZACIÓN DEL MOVIMIENTO LERP/SLERP DE CADA GOLEM SEGUIDOR
  // --------------------------------------------------------------------------
  for (const [entity] of engine.getEntitiesWith(GolemFollowerComponent, Transform)) {
    const follower = GolemFollowerComponent.get(entity)
    const ownerKey = follower.ownerAddress.toLowerCase()

    const trailState = playerTrails.get(ownerKey)
    const headPos = headPositions.get(ownerKey)

    if (!trailState || !headPos || trailState.trail.length === 0) {
      continue
    }

    const currentTransform = Transform.get(entity)
    const distToArenaCenter = Vector3.distance(
      Vector3.create(currentTransform.position.x, 0, currentTransform.position.z),
      Vector3.create(ARENA_CONFIG.center.x, 0, ARENA_CONFIG.center.z)
    )

    // Si el dueño se encuentra dentro de la arena
    if (isPositionInsideArena(headPos)) {
      // Si el golem aún no ha cruzado al interior de la plataforma (distancia > 30m o Y < 0.55m)
      if (distToArenaCenter > 30.0 || currentTransform.position.y < (ARENA_CONFIG.platformHeight - 0.05)) {
        const mutableTransform = Transform.getMutable(entity)
        // Punto de destino en la plataforma dentro de la arena cerca de su dueño
        const targetEntryPos = Vector3.create(headPos.x, ARENA_CONFIG.platformHeight, headPos.z)
        const moveStep = Math.min(1.0, dt * (follower.moveSpeed * 1.6))
        mutableTransform.position = Vector3.lerp(currentTransform.position, targetEntryPos, moveStep)

        // Orientar hacia el interior de la arena
        const toCenter = Vector3.subtract(ARENA_CONFIG.center, currentTransform.position)
        toCenter.y = 0
        if (Vector3.lengthSquared(toCenter) > 0.001) {
          const targetRotation = Quaternion.lookRotation(Vector3.normalize(toCenter))
          mutableTransform.rotation = Quaternion.slerp(
            currentTransform.rotation,
            targetRotation,
            Math.min(1.0, dt * follower.rotationSpeed * 1.5)
          )
        }
        if (!follower.isMoving) {
          GolemFollowerComponent.getMutable(entity).isMoving = true
        }
        continue
      } else {
        // El golem ya está sobre la plataforma dentro de la arena: ceder control total a golemCombatSystem
        if (follower.isMoving) {
          GolemFollowerComponent.getMutable(entity).isMoving = false
        }
        continue
      }
    }

    // Calcular posición objetivo en la trayectoria de su dueño
    const { position: targetPos } = getPositionAlongTrail(
      trailState.trail,
      follower.targetDistance,
      headPos
    )

    const distToTarget = Vector3.distance(currentTransform.position, targetPos)

    // Zona de reposo (Idle) para evitar jitter
    if (distToTarget < FOLLOW_SYSTEM_SETTINGS.IDLE_DISTANCE_THRESHOLD) {
      if (follower.isMoving) {
        GolemFollowerComponent.getMutable(entity).isMoving = false
      }
      continue
    }

    // Movimiento activo por interpolación
    const mutableTransform = Transform.getMutable(entity)
    const moveStep = Math.min(1.0, dt * follower.moveSpeed)

    mutableTransform.position = Vector3.lerp(currentTransform.position, targetPos, moveStep)

    // Orientación hacia el frente del vector de movimiento
    const moveDelta = Vector3.subtract(targetPos, currentTransform.position)
    moveDelta.y = 0

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

