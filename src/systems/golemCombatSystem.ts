import {
  engine,
  Transform,
  Entity,
  removeEntityWithChildren
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { ARENA_CONFIG } from '../config/arenaConfig'
import {
  GolemCombatComponent,
  GolemCombatState,
  FloatingDamageComponent,
  GolemAttackMessageDto,
  GolemDefeatMessageDto,
  GOLEM_TEAMS
} from '../components/combat'
import {
  getVulnerableAffinity,
  getAffinityMultiplier
} from '../config/golems'
import {
  setIsInsideArena,
  getIsInsideArena,
  addCombatLog,
  awardPlayerExp,
  incrementPlayerKills,
  updateLocalGolemHp,
  addLocalGolemExp,
  isLocalSquadGolem
} from '../state'
import {
  getLocalPlayerId,
  broadcastGolemAttack,
  broadcastGolemDefeat,
  setupCombatSyncListeners
} from '../multiplayer'
import {
  updateGolemFloatingLabel,
  spawnFloatingDamage
} from '../objects/golemFactory'

/**
 * ============================================================================
 * SISTEMA ECS: COMBATE EN ARENA "FREE FOR ALL" (FFA COMBAT SYSTEM)
 * ============================================================================
 * Maneja la detección perimetral de la Gran Arena, la IA táctica con prioridad
 * de debilidad elemental y autodefensa reactiva, el sistema de separación física
 * anti-apilamiento (Boids separation), la sincronización en vivo de estados/UI
 * y la validación de equipos canónicos sin fuego amigo.
 */

/**
 * Determina de forma determinante si dos golems son aliados o pertenecen al mismo bando.
 * Desactiva el fuego amigo (Friendly Fire) con 5 barreras independientes de verificación.
 */
export function areGolemsAllies(
  teamA?: string,
  teamB?: string,
  ownerA?: string,
  ownerB?: string,
  golemIdA?: string,
  golemIdB?: string
): boolean {
  // 1. Mismo teamId canónico no vacío (ej. TEAM_PLAYER con TEAM_PLAYER, TEAM_SPARRING con TEAM_SPARRING)
  if (teamA && teamB && teamA === teamB) {
    return true
  }

  // 2. Ambos pertenecen al escuadrón local activo en memoria
  if (golemIdA && isLocalSquadGolem(golemIdA) && golemIdB && isLocalSquadGolem(golemIdB)) {
    return true
  }

  const localId = getLocalPlayerId().toLowerCase()
  const normA = (ownerA || '').toLowerCase()
  const normB = (ownerB || '').toLowerCase()

  // 3. Ambos pertenecen al bando del jugador local
  const isLocalA =
    teamA === GOLEM_TEAMS.PLAYER ||
    normA === 'local' ||
    normA === 'local_player' ||
    normA === localId ||
    (golemIdA !== undefined && isLocalSquadGolem(golemIdA))

  const isLocalB =
    teamB === GOLEM_TEAMS.PLAYER ||
    normB === 'local' ||
    normB === 'local_player' ||
    normB === localId ||
    (golemIdB !== undefined && isLocalSquadGolem(golemIdB))

  if (isLocalA && isLocalB) {
    return true
  }

  // 4. Ambos pertenecen al bando de sparring/entrenamiento
  const isSparringA =
    teamA === GOLEM_TEAMS.SPARRING ||
    normA === 'sparring_bots' ||
    normA.startsWith('sparring_bot')

  const isSparringB =
    teamB === GOLEM_TEAMS.SPARRING ||
    normB === 'sparring_bots' ||
    normB.startsWith('sparring_bot')

  if (isSparringA && isSparringB) {
    return true
  }

  // 5. Mismo dueño idéntico
  if (normA && normB && normA === normB) {
    return true
  }

  return false
}

/** Distancia al centro de la arena para considerar al avatar/golem dentro del combate */
const ARENA_COMBAT_RADIUS = 35.0
/** Rango de ataque cuerpo a cuerpo */
const ATTACK_RANGE = 2.4
/** Distancia de parada en el anillo de combate alrededor del objetivo */
const COMBAT_STOP_DISTANCE = 1.8
/** Radio mínimo de separación entre golems para evitar apilamiento */
const MIN_SEPARATION_DISTANCE = 1.6
/** Velocidad de rotación táctica durante el combate */
const COMBAT_ROTATION_SPEED = 7.0

let isCombatListenersConfigured = false

/**
 * Inicializa los manejadores multijugador para ataques y derrotas remotas.
 */
function initCombatSyncOnce() {
  if (isCombatListenersConfigured) return
  isCombatListenersConfigured = true

  setupCombatSyncListeners(
    (attackDto: GolemAttackMessageDto) => {
      handleRemoteAttackReceived(attackDto)
    },
    (defeatDto: GolemDefeatMessageDto) => {
      handleRemoteDefeatReceived(defeatDto)
    }
  )
}

/**
 * Procesa un ataque recibido desde otro jugador remoto por MessageBus.
 */
function handleRemoteAttackReceived(attack: GolemAttackMessageDto) {
  if (
    areGolemsAllies(
      attack.attackerTeam,
      attack.targetTeam,
      attack.attackerOwner,
      attack.targetOwner,
      attack.attackerId,
      attack.targetId
    )
  ) {
    return
  }

  for (const [entity] of engine.getEntitiesWith(GolemCombatComponent, Transform)) {
    const combat = GolemCombatComponent.get(entity)
    if (combat.golemId === attack.targetId) {
      const transform = Transform.get(entity)
      const mutCombat = GolemCombatComponent.getMutable(entity)
      mutCombat.currentHp = Math.max(0, attack.remainingHp)
      mutCombat.lastAttackerId = attack.attackerId
      mutCombat.lastAttackedTimestamp = Date.now()

      // Sincronizar estado global
      updateLocalGolemHp(combat.golemId, mutCombat.currentHp)

      // Actualizar etiqueta flotante
      updateGolemFloatingLabel(
        entity,
        combat.affinity,
        combat.affinity,
        combat.level,
        mutCombat.currentHp,
        combat.maxHp,
        combat.ownerAddress
      )

      // Mostrar daño flotante
      spawnFloatingDamage(transform.position, attack.damage, attack.isAdvantage)
      break
    }
  }
}

/**
 * Procesa la derrota de un golem reportada por otro cliente.
 */
function handleRemoteDefeatReceived(defeat: GolemDefeatMessageDto) {
  for (const [entity] of engine.getEntitiesWith(GolemCombatComponent)) {
    const combat = GolemCombatComponent.get(entity)
    if (combat.golemId === defeat.defeatedId) {
      updateLocalGolemHp(defeat.defeatedId, 0)
      removeEntityWithChildren(engine, entity)
      addCombatLog(`💥 ¡Un golem ha caído en la arena!`, '#FF6666')
      break
    }
  }
}

/**
 * Evalúa si una posición se encuentra dentro del radio de batalla de la arena.
 */
export function isPositionInsideArena(pos: Vector3): boolean {
  const dx = pos.x - ARENA_CONFIG.center.x
  const dz = pos.z - ARENA_CONFIG.center.z
  return Math.sqrt(dx * dx + dz * dz) <= ARENA_COMBAT_RADIUS
}

/**
 * Determina el teamId canónico de un componente de combate.
 */
function getEffectiveTeamId(combat: { teamId?: string; ownerAddress: string; golemId: string }, localId: string): string {
  if (combat.teamId) return combat.teamId
  if (
    isLocalSquadGolem(combat.golemId) ||
    combat.ownerAddress === localId ||
    combat.ownerAddress === 'local_player' ||
    combat.ownerAddress === 'local'
  ) {
    return GOLEM_TEAMS.PLAYER
  }
  if (combat.ownerAddress === 'sparring_bots' || combat.ownerAddress.startsWith('sparring_bot')) {
    return GOLEM_TEAMS.SPARRING
  }
  return `${GOLEM_TEAMS.REMOTE_PREFIX}${combat.ownerAddress}`
}

/**
 * Sistema principal de combate ejecutado en cada tick del motor ECS.
 */
export function golemCombatSystem(dt: number) {
  initCombatSyncOnce()

  const localId = getLocalPlayerId().toLowerCase()
  let isLocalPlayerInArena = false

  // --------------------------------------------------------------------------
  // 1. EVALUAR SI EL AVATAR LOCAL SE ENCUENTRA DENTRO DE LA ARENA
  // --------------------------------------------------------------------------
  if (Transform.has(engine.PlayerEntity)) {
    const playerPos = Transform.get(engine.PlayerEntity).position
    isLocalPlayerInArena = isPositionInsideArena(playerPos)
    if (isLocalPlayerInArena !== getIsInsideArena()) {
      setIsInsideArena(isLocalPlayerInArena)
      if (isLocalPlayerInArena) {
        addCombatLog('⚔️ ¡Entraste a la Arena! Tus golems inician combate FFA.', '#FFD700')
      } else {
        addCombatLog('🛡️ Saliste de la Arena. Tus golems vuelven a seguirte.', '#00E5FF')
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. RECOPILAR TODOS LOS GOLEMS VIVOS EN LA ARENA
  // --------------------------------------------------------------------------
  interface ArenaGolemCandidate {
    entity: Entity
    golemId: string
    teamId: string
    ownerAddress: string
    affinity: string
    position: Vector3
    currentHp: number
    maxHp: number
    attack: number
    defense: number
    speed: number
    expReward: number
    level: number
  }

  const arenaGolems: ArenaGolemCandidate[] = []

  for (const [entity] of engine.getEntitiesWith(GolemCombatComponent, Transform)) {
    const combat = GolemCombatComponent.get(entity)
    const transform = Transform.get(entity)
    const teamId = getEffectiveTeamId(combat, localId)

    const isInside = isPositionInsideArena(transform.position)
    const isOwnerInside =
      (teamId === GOLEM_TEAMS.PLAYER && isLocalPlayerInArena) ||
      teamId === GOLEM_TEAMS.SPARRING

    // Considerar unidades con vida que estén dentro o cuyo dueño esté en la arena
    if (combat.currentHp > 0 && !combat.isDefeated && (isInside || isOwnerInside)) {
      arenaGolems.push({
        entity,
        golemId: combat.golemId,
        teamId,
        ownerAddress: combat.ownerAddress,
        affinity: combat.affinity,
        position: transform.position,
        currentHp: combat.currentHp,
        maxHp: combat.maxHp,
        attack: combat.attack,
        defense: combat.defense,
        speed: combat.speed,
        expReward: combat.expReward,
        level: combat.level
      })
    }
  }

  // --------------------------------------------------------------------------
  // 3. APLICAR FUERZAS DE SEPARACIÓN FÍSICA ANTI-APILAMIENTO (BOIDS SEPARATION)
  // --------------------------------------------------------------------------
  for (let i = 0; i < arenaGolems.length; i++) {
    for (let j = i + 1; j < arenaGolems.length; j++) {
      const gA = arenaGolems[i]
      const gB = arenaGolems[j]

      const deltaX = gA.position.x - gB.position.x
      const deltaZ = gA.position.z - gB.position.z
      const distSq = deltaX * deltaX + deltaZ * deltaZ

      if (distSq < MIN_SEPARATION_DISTANCE * MIN_SEPARATION_DISTANCE && distSq > 0.0001) {
        const dist = Math.sqrt(distSq)
        const overlap = (MIN_SEPARATION_DISTANCE - dist) * 0.5
        const pushFactor = Math.min(1.0, dt * 6.0)
        const pushX = (deltaX / dist) * overlap * pushFactor
        const pushZ = (deltaZ / dist) * overlap * pushFactor

        if (Transform.has(gA.entity)) {
          const mutT = Transform.getMutable(gA.entity)
          mutT.position.x += pushX
          mutT.position.z += pushZ
          mutT.position.y = ARENA_CONFIG.platformHeight
          gA.position = mutT.position
        }

        if (Transform.has(gB.entity)) {
          const mutT = Transform.getMutable(gB.entity)
          mutT.position.x -= pushX
          mutT.position.z -= pushZ
          mutT.position.y = ARENA_CONFIG.platformHeight
          gB.position = mutT.position
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. IA TÁCTICA Y BUCLE DE COMBATE POR CADA GOLEM EN LA ARENA
  // --------------------------------------------------------------------------
  const now = Date.now()
  const entitiesToDestroy: { entity: Entity; defeatedId: string; defeatedOwner: string }[] = []

  for (const [entity] of engine.getEntitiesWith(GolemCombatComponent, Transform)) {
    const combat = GolemCombatComponent.get(entity)
    const currentTransform = Transform.get(entity)
    const attackerTeamId = getEffectiveTeamId(combat, localId)

    const isInside = isPositionInsideArena(currentTransform.position)
    const isOwnerInside =
      (attackerTeamId === GOLEM_TEAMS.PLAYER && isLocalPlayerInArena) ||
      attackerTeamId === GOLEM_TEAMS.SPARRING

    if (combat.currentHp <= 0 || combat.isDefeated || (!isInside && !isOwnerInside)) {
      continue
    }

    // Filtrar objetivos enemigos válidos (DESACTIVAR FUEGO AMIGO POR EQUIPO)
    const enemyCandidates = arenaGolems.filter(
      (candidate) =>
        !areGolemsAllies(
          candidate.teamId,
          attackerTeamId,
          candidate.ownerAddress,
          combat.ownerAddress,
          candidate.golemId,
          combat.golemId
        ) &&
        candidate.golemId !== combat.golemId &&
        candidate.currentHp > 0
    )

    if (enemyCandidates.length === 0) {
      if (combat.state !== GolemCombatState.ARENA_IDLE) {
        GolemCombatComponent.getMutable(entity).state = GolemCombatState.ARENA_IDLE
      }
      continue
    }

    // --- SELECCIÓN TÁCTICA DE OBJETIVO ---
    let chosenTarget: ArenaGolemCandidate | null = null

    // Prioridad 1: Autodefensa ante un agresor reciente (< 4 segundos)
    if (combat.lastAttackerId && now - combat.lastAttackedTimestamp < 4000) {
      const attackerMatch = enemyCandidates.find((c) => c.golemId === combat.lastAttackerId)
      if (
        attackerMatch &&
        !areGolemsAllies(
          attackerMatch.teamId,
          attackerTeamId,
          attackerMatch.ownerAddress,
          combat.ownerAddress,
          attackerMatch.golemId,
          combat.golemId
        )
      ) {
        chosenTarget = attackerMatch
      }
    }

    // Prioridad 2: Cazar golem vulnerable a su afinidad (Ventaja Pentágono x1.40)
    if (!chosenTarget) {
      const preferredAffinity = getVulnerableAffinity(combat.affinity)
      const vulnerableEnemies = enemyCandidates.filter((c) => c.affinity === preferredAffinity)

      if (vulnerableEnemies.length > 0) {
        let minDistance = Infinity
        for (const vuln of vulnerableEnemies) {
          const dist = Vector3.distance(currentTransform.position, vuln.position)
          if (dist < minDistance) {
            minDistance = dist
            chosenTarget = vuln
          }
        }
      }
    }

    // Prioridad 3: Enemigo más cercano en general
    if (!chosenTarget) {
      let minDistance = Infinity
      for (const enemy of enemyCandidates) {
        const dist = Vector3.distance(currentTransform.position, enemy.position)
        if (dist < minDistance) {
          minDistance = dist
          chosenTarget = enemy
        }
      }
    }

    if (!chosenTarget) continue

    const distToTarget = Vector3.distance(currentTransform.position, chosenTarget.position)
    const mutableCombat = GolemCombatComponent.getMutable(entity)
    const mutableTransform = Transform.getMutable(entity)

    mutableCombat.targetGolemId = chosenTarget.golemId

    // Actualizar orientación horizontal hacia el objetivo
    const dirToTarget = Vector3.subtract(chosenTarget.position, currentTransform.position)
    dirToTarget.y = 0

    if (Vector3.lengthSquared(dirToTarget) > 0.001) {
      const lookRot = Quaternion.lookRotation(Vector3.normalize(dirToTarget))
      mutableTransform.rotation = Quaternion.slerp(
        currentTransform.rotation,
        lookRot,
        Math.min(1.0, dt * COMBAT_ROTATION_SPEED)
      )
    }

    // --- ACCIONES SEGÚN DISTANCIA (ANILLO DE COMBATE) ---
    if (distToTarget > ATTACK_RANGE) {
      // 1. Persecución hacia el anillo perimetral del objetivo (stop at 1.8m, no stacking)
      mutableCombat.state = GolemCombatState.ARENA_CHASING
      const moveStep = Math.min(1.0, dt * (combat.speed * 0.25 + 3.2))

      const normDir = Vector3.normalize(dirToTarget)
      const desiredPos = Vector3.create(
        chosenTarget.position.x - normDir.x * COMBAT_STOP_DISTANCE,
        ARENA_CONFIG.platformHeight,
        chosenTarget.position.z - normDir.z * COMBAT_STOP_DISTANCE
      )

      mutableTransform.position = Vector3.lerp(currentTransform.position, desiredPos, moveStep)
      mutableTransform.position.y = ARENA_CONFIG.platformHeight
    } else {
      // 2. Rango de ataque cuerpo a cuerpo
      mutableCombat.state = GolemCombatState.ARENA_ATTACKING
      mutableTransform.position.y = ARENA_CONFIG.platformHeight

      // Reducir temporizador de recarga de ataque
      mutableCombat.attackCooldownTimer = Math.max(0, combat.attackCooldownTimer - dt)

      const isControlledLocally =
        attackerTeamId === GOLEM_TEAMS.PLAYER ||
        attackerTeamId === GOLEM_TEAMS.SPARRING

      if (mutableCombat.attackCooldownTimer <= 0 && isControlledLocally) {
        // Doble verificación estricta de fuego amigo
        if (
          areGolemsAllies(
            chosenTarget.teamId,
            attackerTeamId,
            chosenTarget.ownerAddress,
            combat.ownerAddress,
            chosenTarget.golemId,
            combat.golemId
          )
        ) {
          continue
        }

        // Reiniciar recarga
        const cooldown = Math.max(0.8, 2.2 / (1 + combat.speed * 0.04))
        mutableCombat.attackCooldownTimer = cooldown

        // Calcular daño con multiplicador del pentágono
        const mult = getAffinityMultiplier(combat.affinity, chosenTarget.affinity)
        const isAdvantage = mult > 1.0
        const rawDamage = combat.attack - chosenTarget.defense * 0.5
        const finalDamage = Math.max(2, Math.round(rawDamage * mult))

        const newTargetHp = Math.max(0, chosenTarget.currentHp - finalDamage)

        // Aplicar daño a la entidad defensora
        if (GolemCombatComponent.has(chosenTarget.entity)) {
          const targetMutCombat = GolemCombatComponent.getMutable(chosenTarget.entity)
          targetMutCombat.currentHp = newTargetHp
          targetMutCombat.lastAttackerId = combat.golemId
          targetMutCombat.lastAttackedTimestamp = Date.now()

          // Sincronizar estado global inmediatamente
          updateLocalGolemHp(chosenTarget.golemId, newTargetHp)

          // Actualizar etiqueta flotante
          updateGolemFloatingLabel(
            chosenTarget.entity,
            chosenTarget.affinity,
            chosenTarget.affinity,
            chosenTarget.level,
            newTargetHp,
            chosenTarget.maxHp,
            chosenTarget.ownerAddress
          )
        }

        // Mostrar efecto de daño flotante
        spawnFloatingDamage(chosenTarget.position, finalDamage, isAdvantage)

        // Registrar en el log de combate
        const advantageText = isAdvantage ? '⚡ [VENTAJA ELEMENTAL]' : ''
        addCombatLog(
          `⚔️ ${combat.affinity} atacó a ${chosenTarget.affinity} (-${finalDamage} HP) ${advantageText}`,
          isAdvantage ? '#FFD700' : '#FF9999'
        )

        // Difundir por MessageBus
        broadcastGolemAttack({
          attackerId: combat.golemId,
          targetId: chosenTarget.golemId,
          attackerOwner: combat.ownerAddress,
          targetOwner: chosenTarget.ownerAddress,
          attackerTeam: attackerTeamId,
          targetTeam: chosenTarget.teamId,
          damage: finalDamage,
          isAdvantage,
          remainingHp: newTargetHp,
          timestamp: Date.now()
        })

        // --- COMPROBAR DERROTA (0 HP) ---
        if (newTargetHp <= 0) {
          const expAwarded = chosenTarget.expReward || 50

          // Recompensa al atacante y al jugador
          addLocalGolemExp(combat.golemId, expAwarded)
          if (attackerTeamId === GOLEM_TEAMS.PLAYER) {
            awardPlayerExp(expAwarded)
            incrementPlayerKills()
          }

          addCombatLog(`🏆 ¡${combat.affinity} destruyó a ${chosenTarget.affinity}! (+${expAwarded} EXP)`, '#00FFAA')

          // Difundir derrota
          broadcastGolemDefeat({
            defeatedId: chosenTarget.golemId,
            defeatedOwner: chosenTarget.ownerAddress,
            killerId: combat.golemId,
            killerOwner: combat.ownerAddress,
            expAwarded,
            timestamp: Date.now()
          })

          entitiesToDestroy.push({
            entity: chosenTarget.entity,
            defeatedId: chosenTarget.golemId,
            defeatedOwner: chosenTarget.ownerAddress
          })
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 5. ELIMINACIÓN LIMPIA DE GOLEMS DESTRUIDOS (0 HP)
  // --------------------------------------------------------------------------
  for (const item of entitiesToDestroy) {
    if (GolemCombatComponent.has(item.entity)) {
      const mutCombat = GolemCombatComponent.getMutable(item.entity)
      mutCombat.isDefeated = true
      mutCombat.currentHp = 0
    }
    updateLocalGolemHp(item.defeatedId, 0)
    removeEntityWithChildren(engine, item.entity)
  }

  // --------------------------------------------------------------------------
  // 6. ANIMACIÓN Y CICLO DE VIDA DE NÚMEROS DE DAÑO FLOTANTES
  // --------------------------------------------------------------------------
  for (const [entity] of engine.getEntitiesWith(FloatingDamageComponent, Transform)) {
    const damageData = FloatingDamageComponent.get(entity)
    const transform = Transform.get(entity)

    if (damageData.lifetime <= 0) {
      removeEntityWithChildren(engine, entity)
      continue
    }

    const mutDamage = FloatingDamageComponent.getMutable(entity)
    const mutTransform = Transform.getMutable(entity)

    mutDamage.lifetime -= dt
    mutTransform.position.y += dt * damageData.riseSpeed
  }
}

