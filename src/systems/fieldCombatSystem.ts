import {
  engine,
  Transform,
  Entity,
  TextShape
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { MapGolemDefinition, getRandomPositionInZone } from '../data/mapGolemsCatalog'
import { GolemCombatComponent, GolemCombatState } from '../components/combat'
import { GolemFollowerComponent } from '../components/follower'
import { getAffinityMultiplier } from '../config/golems'
import {
  spawnedMapGolemDataMap,
  setFieldGolemLockState,
  isFieldGolemLocked
} from '../objects/mapGolemsGenerator'
import { MapGolemPatrolComponent } from './mapGolemPatrolSystem'
import {
  spawnFloatingDamage,
  getHealthBarAscii,
  getAffinityTextColor,
  cleanGolemName,
  updateGolemFloatingLabel
} from '../objects/golemFactory'
import {
  addCombatLog,
  awardPlayerExp,
  awardPlayerBrassGears,
  addLocalGolemExp,
  updateLocalGolemHp,
  getLocalActiveSquad
} from '../state'
import { getLocalizedAffinity, t } from '../i18n'
import {
  broadcastFieldGolemDefeat,
  broadcastFieldGolemLock,
  broadcastFieldGolemSyncRequest,
  broadcastFieldGolemSyncResponse,
  setupFieldGolemSyncListeners,
  FieldGolemDefeatMessageDto,
  FieldGolemLockMessageDto,
  FieldGolemSyncResponseDto,
  getLocalPlayerId
} from '../multiplayer'

/**
 * ============================================================================
 * SISTEMA ECS: COMBATE EN CAMPO ABIERTO Y SINCRONIZACIÓN MULTIJUGADOR P2P
 * ============================================================================
 * Maneja el combate en tiempo real entre el Golem del jugador y Golems salvajes.
 * Incluye persecución activa del Golem salvaje dentro del rango de territorio (14.0m),
 * bloqueo exclusivo para impedir que otros jugadores ataquen Golems en combate,
 * difusión P2P por MessageBus de la derrota para desaparecer la criatura en todos los clientes,
 * y cola de reaparición (Respawn) temporizada en nuevas coordenadas aleatorias con salud 100%.
 */

export interface ActiveFieldEngagement {
  wildEntity: Entity
  wildDef: MapGolemDefinition
  wildCurrentHp: number
  wildMaxHp: number
  encounterAnchorPos: Vector3
  playerGolemEntity: Entity
  playerGolemId: string
  playerGolemHp: number
  attackTimer: number
  isFinished: boolean

  // --- Estado de Animaciones Procedurales y Persecución ---
  phase: 'APPROACHING' | 'CLASHING' | 'RECOILING' | 'REPOSITIONING'
  motionTimer: number
  attackerEntity: Entity | null
  defenderEntity: Entity | null
  turnToggle: boolean // true: Turno Jugador -> Salvaje | false: Turno Salvaje -> Jugador
}

export interface DefeatedGolemRespawnEntry {
  entity: Entity
  golemDef: MapGolemDefinition
  labelEntity: Entity
  respawnTimestamp: number
}

let activeEngagement: ActiveFieldEngagement | null = null
const defeatedRespawnQueue: DefeatedGolemRespawnEntry[] = []
let isMultiplayerInitialized = false

/**
 * Monitorea y procesa la reaparición (respawn) asíncrona de los golems salvajes derrotados.
 */
function processDefeatedGolemsRespawn() {
  if (defeatedRespawnQueue.length === 0) return

  const now = Date.now()
  for (let i = defeatedRespawnQueue.length - 1; i >= 0; i--) {
    const entry = defeatedRespawnQueue[i]
    if (now >= entry.respawnTimestamp) {
      // 1. Restaurar salud al 100%
      entry.golemDef.currentHp = entry.golemDef.maxHp

      // 2. Generar nueva ubicación procedural aleatoria dentro de su zona (diferente a la posición de derrota)
      const newPos = getRandomPositionInZone(entry.golemDef.zoneName)
      entry.golemDef.position = newPos

      // 3. Actualizar Transform 3D en la superficie (Y = 0)
      if (Transform.has(entry.entity)) {
        const mutTransform = Transform.getMutable(entry.entity)
        mutTransform.position = Vector3.create(newPos.x, 0, newPos.z)
        mutTransform.rotation = Quaternion.fromEulerDegrees(0, Math.random() * 360, 0)
      }

      // 4. Actualizar el componente de patrulla (nuevo ancla de caminata)
      if (MapGolemPatrolComponent.has(entry.entity)) {
        const mutPatrol = MapGolemPatrolComponent.getMutable(entry.entity)
        mutPatrol.anchorX = newPos.x
        mutPatrol.anchorY = 0
        mutPatrol.anchorZ = newPos.z
        mutPatrol.targetX = newPos.x
        mutPatrol.targetY = 0
        mutPatrol.targetZ = newPos.z
        mutPatrol.state = 'IDLE'
        mutPatrol.idleTimer = 2.0
      }

      // 5. Refrescar la etiqueta 3D con la barra de vida 100% llena
      if (TextShape.has(entry.labelEntity)) {
        const hpBar = getHealthBarAscii(entry.golemDef.maxHp, entry.golemDef.maxHp)
        const cleanName = cleanGolemName(entry.golemDef.name)
        TextShape.getMutable(entry.labelEntity).text =
          `Lv.${entry.golemDef.level} ${cleanName}\n[${hpBar}] ${entry.golemDef.maxHp}/${entry.golemDef.maxHp}`
      }

      const cleanName = cleanGolemName(entry.golemDef.name)
      addCombatLog(`✨ ¡Un Golem salvaje Lvl ${entry.golemDef.level} (${cleanName}) ha reaparecido en ${entry.golemDef.zoneName}!`, '#00FFAA')

      // Remover de la cola de respawn
      defeatedRespawnQueue.splice(i, 1)
    }
  }
}

/**
 * Busca en la escena la entidad correspondiente al índice del Golem salvaje.
 */
function findGolemDataByIndex(golemIndex: number): { entity: Entity; golemDef: MapGolemDefinition; labelEntity: Entity } | null {
  for (const [entity, data] of spawnedMapGolemDataMap.entries()) {
    if (data.golemDef.index === golemIndex) {
      return { entity, golemDef: data.golemDef, labelEntity: data.labelEntity }
    }
  }
  return null
}

/**
 * Oculta localmente un Golem salvaje que ha sido derrotado (por nosotros o por otro jugador remoto)
 * y programa su respawn.
 */
function applyWildGolemDefeatLocally(golemIndex: number) {
  const data = findGolemDataByIndex(golemIndex)
  if (!data) return

  // Si ya está oculto y en cola de respawn, ignorar
  if (defeatedRespawnQueue.some((entry) => entry.golemDef.index === golemIndex)) return

  // Ocultar modelo 3D bajo el terreno y detener movimiento de patrulla
  if (Transform.has(data.entity)) {
    Transform.getMutable(data.entity).position.y = -100
  }
  if (MapGolemPatrolComponent.has(data.entity)) {
    MapGolemPatrolComponent.getMutable(data.entity).state = 'DEFEATED'
  }

  // Desbloquear estado de combate
  setFieldGolemLockState(golemIndex, '', false)

  // Registrar en cola de respawn
  const respawnDelayMs = (1 + (data.golemDef.tier || 1)) * 60000
  defeatedRespawnQueue.push({
    entity: data.entity,
    golemDef: data.golemDef,
    labelEntity: data.labelEntity,
    respawnTimestamp: Date.now() + respawnDelayMs
  })
}

/**
 * Inicializa los escuchadores multijugador P2P para sincronización de bloqueos y derrotas de Golems salvajes.
 */
function initFieldGolemMultiplayer() {
  if (isMultiplayerInitialized) return
  isMultiplayerInitialized = true

  setupFieldGolemSyncListeners(
    // 1. Al recibir notificación de derrota remota
    (defeat: FieldGolemDefeatMessageDto) => {
      applyWildGolemDefeatLocally(defeat.golemIndex)
      const data = findGolemDataByIndex(defeat.golemIndex)
      if (data) {
        addCombatLog(`⚡ Un jugador remoto derrotó a ${cleanGolemName(data.golemDef.name)} en ${data.golemDef.zoneName}.`, '#AAAAAA')
      }
    },
    // 2. Al recibir notificación de bloqueo remoto (un jugador inició o terminó combate)
    (lock: FieldGolemLockMessageDto) => {
      setFieldGolemLockState(lock.golemIndex, lock.lockedByAddress, lock.isLocked)
    },
    // 3. Al recibir respuesta de sincronización completa
    (syncRes: FieldGolemSyncResponseDto) => {
      if (Array.isArray(syncRes.defeatedGolemIndices)) {
        for (const item of syncRes.defeatedGolemIndices) {
          applyWildGolemDefeatLocally(item.golemIndex)
        }
      }
      if (Array.isArray(syncRes.lockedGolemIndices)) {
        for (const item of syncRes.lockedGolemIndices) {
          setFieldGolemLockState(item.golemIndex, item.lockedByAddress, true)
        }
      }
    },
    // Provider para responder a solicitudes de sincronización de nuevos jugadores
    () => {
      const now = Date.now()
      const defeated = defeatedRespawnQueue.map((entry) => ({
        golemIndex: entry.golemDef.index,
        remainingMs: Math.max(0, entry.respawnTimestamp - now)
      }))

      const locked: { golemIndex: number; lockedByAddress: string }[] = []
      if (activeEngagement && !activeEngagement.isFinished) {
        locked.push({
          golemIndex: activeEngagement.wildDef.index,
          lockedByAddress: getLocalPlayerId()
        })
      }

      return { defeated, locked }
    }
  )

  // Solicitar sincronización a los jugadores existentes en la escena
  broadcastFieldGolemSyncRequest()
}

/**
 * Inicia una batalla de campo en tiempo real contra un Golem salvaje del mapa.
 */
export function startFieldCombat(wildEntity: Entity, wildDef: MapGolemDefinition): boolean {
  if (activeEngagement && !activeEngagement.isFinished) {
    addCombatLog('⚠️ Ya estás en un combate activo en el mapa.', '#FFCC00')
    return false
  }

  // Verificar si el Golem salvaje está bloqueado por otro jugador
  const lockStatus = isFieldGolemLocked(wildDef.index)
  if (lockStatus.isLocked && lockStatus.lockedBy.toLowerCase() !== getLocalPlayerId().toLowerCase()) {
    addCombatLog('🔒 Este Golem salvaje ya está en combate con otro jugador.', '#FFCC00')
    return false
  }

  // Buscar el Golem acompañante activo del jugador local
  let playerGolemEnt: Entity | null = null
  let playerGolemId = ''
  let playerHp = 100

  for (const [entity] of engine.getEntitiesWith(GolemFollowerComponent, GolemCombatComponent)) {
    const follower = GolemFollowerComponent.get(entity)
    const combat = GolemCombatComponent.get(entity)
    if (follower.ownerAddress === 'local' || follower.ownerAddress === 'local_player') {
      if (combat.currentHp > 0) {
        playerGolemEnt = entity
        playerGolemId = combat.golemId
        playerHp = combat.currentHp
        break
      }
    }
  }

  if (!playerGolemEnt) {
    addCombatLog('❌ Necesitas tener un Golem activo en tu escuadrón para combatir.', '#FF6666')
    return false
  }

  const golemPos = Transform.get(wildEntity).position

  activeEngagement = {
    wildEntity,
    wildDef,
    wildCurrentHp: wildDef.currentHp || wildDef.maxHp,
    wildMaxHp: wildDef.maxHp,
    encounterAnchorPos: Vector3.create(golemPos.x, golemPos.y, golemPos.z),
    playerGolemEntity: playerGolemEnt,
    playerGolemId,
    playerGolemHp: playerHp,
    attackTimer: 0.8, // Primer golpe a los 0.8s
    isFinished: false,
    phase: 'APPROACHING',
    motionTimer: 0,
    attackerEntity: null,
    defenderEntity: null,
    turnToggle: true
  }

  // Bloquear el Golem salvaje y difundir a otros jugadores por MessageBus
  const localId = getLocalPlayerId()
  setFieldGolemLockState(wildDef.index, localId, true)
  broadcastFieldGolemLock(wildDef.index, wildDef.id, true)

  const affName = getLocalizedAffinity(wildDef.affinity)
  addCombatLog(`⚔️ ¡Comenzó la batalla de campo contra ${wildDef.name} [Lvl ${wildDef.level} - ${affName}]!`, '#FFD700')
  return true
}

/**
 * Cancela o finaliza el combate de campo activo.
 * Si el Golem salvaje sobrevive, restaura su vida al 100% y retorna a su zona de patrulla.
 */
export function cancelFieldCombat(reason: string = 'Retirada') {
  if (activeEngagement) {
    const eng = activeEngagement
    const golemIndex = eng.wildDef.index
    const golemId = eng.wildDef.id

    if (eng.wildCurrentHp > 0) {
      // 1. Restablecer salud del Golem salvaje al 100%
      eng.wildDef.currentHp = eng.wildMaxHp
      const dataEntry = spawnedMapGolemDataMap.get(eng.wildEntity)
      if (dataEntry && dataEntry.labelEntity && TextShape.has(dataEntry.labelEntity)) {
        const hpBar = getHealthBarAscii(eng.wildMaxHp, eng.wildMaxHp)
        const cleanName = cleanGolemName(eng.wildDef.name)
        TextShape.getMutable(dataEntry.labelEntity).text =
          `Lv.${eng.wildDef.level} ${cleanName}\n[${hpBar}] ${eng.wildMaxHp}/${eng.wildMaxHp}`
      }

      // 2. Ordenar al Golem salvaje retornar a su punto de patrulla original
      if (MapGolemPatrolComponent.has(eng.wildEntity)) {
        const mutPatrol = MapGolemPatrolComponent.getMutable(eng.wildEntity)
        mutPatrol.targetX = mutPatrol.anchorX
        mutPatrol.targetZ = mutPatrol.anchorZ
        mutPatrol.state = 'WALKING'
        mutPatrol.idleTimer = 0
      }
    }

    // Desbloquear el Golem salvaje local y difundir por MessageBus
    setFieldGolemLockState(golemIndex, '', false)
    broadcastFieldGolemLock(golemIndex, golemId, false)

    eng.isFinished = true
    addCombatLog(`🏃 Batalla de campo finalizada (${reason}).`, '#AAAAAA')
    activeEngagement = null
  }
}

/**
 * Obtiene la batalla de campo activa si existe.
 */
export function getActiveFieldEngagement(): ActiveFieldEngagement | null {
  return activeEngagement
}

/**
 * Genera un número entero aleatorio dentro del rango inclusivo.
 */
function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Sistema ECS principal para procesar el combate de campo en cada tick de frame.
 */
export function fieldCombatSystem(dt: number) {
  // Inicializar infraestructura multijugador P2P en el primer tick
  if (!isMultiplayerInitialized) {
    initFieldGolemMultiplayer()
  }

  // Procesar cola de respawn temporizado de golems salvajes
  processDefeatedGolemsRespawn()

  if (!activeEngagement || activeEngagement.isFinished) return

  const eng = activeEngagement

  // 1. Verificación de existencia y validez de entidades
  if (!Transform.has(eng.wildEntity) || !Transform.has(eng.playerGolemEntity)) {
    cancelFieldCombat('Posición o entidad no válida')
    return
  }

  const wildMutTransform = Transform.getMutable(eng.wildEntity)
  const playerMutTransform = Transform.getMutable(eng.playerGolemEntity)

  const wildPos = wildMutTransform.position
  const playerGolemPos = playerMutTransform.position

  let playerAvatarPos = playerGolemPos
  if (Transform.has(engine.PlayerEntity)) {
    playerAvatarPos = Transform.get(engine.PlayerEntity).position
  }

  // 2. Control de Persecución y Huida por Distancia (Máx 14m del ancla / 12m del Golem)
  const distFromAnchor = Vector3.distance(eng.encounterAnchorPos, playerAvatarPos)
  const distFromWildToPlayer = Vector3.distance(wildPos, playerAvatarPos)

  if (distFromAnchor > 14.0 || distFromWildToPlayer > 12.0) {
    cancelFieldCombat('¡Lograste huir del territorio del Golem salvaje!')
    return
  }

  // 3. Orientación Y mutua (cara a cara)
  const dirWildToPlayer = Vector3.subtract(playerGolemPos, wildPos)
  dirWildToPlayer.y = 0
  if (Vector3.lengthSquared(dirWildToPlayer) > 0.001) {
    const lookRotWild = Quaternion.lookRotation(Vector3.normalize(dirWildToPlayer))
    wildMutTransform.rotation = Quaternion.slerp(wildMutTransform.rotation, lookRotWild, dt * 8.0)
  }

  const dirPlayerToWild = Vector3.subtract(wildPos, playerGolemPos)
  dirPlayerToWild.y = 0
  if (Vector3.lengthSquared(dirPlayerToWild) > 0.001) {
    const lookRotPlayer = Quaternion.lookRotation(Vector3.normalize(dirPlayerToWild))
    playerMutTransform.rotation = Quaternion.slerp(playerMutTransform.rotation, lookRotPlayer, dt * 8.0)
  }

  // 4. Persecución Activa del Golem Salvaje si el jugador se desplaza (2.2m a 12.0m)
  const distBetween = Vector3.distance(wildPos, playerGolemPos)
  if (distBetween > 2.2) {
    const moveSpeed = Math.max(2.2, (eng.wildDef.speed || 12) * 0.16)
    const chaseStep = Math.min(distBetween - 2.0, dt * moveSpeed)
    const normDir = Vector3.normalize(dirWildToPlayer)
    wildMutTransform.position = Vector3.add(wildPos, Vector3.scale(normDir, chaseStep))
  }

  // 5. Temporizador del tick de ataque
  eng.attackTimer -= dt
  if (eng.attackTimer > 0) return

  // Frecuencia de ataque derivada de la estadística Speed del Golem activo
  let playerSpeed = 15
  if (GolemCombatComponent.has(eng.playerGolemEntity)) {
    playerSpeed = GolemCombatComponent.get(eng.playerGolemEntity).speed || 15
  }
  const cooldown = Math.max(0.9, 1.9 - playerSpeed * 0.035)
  eng.attackTimer = cooldown

  // Alternancia de turnos de ataque (Choque alternado)
  if (eng.turnToggle) {
    // --------------------------------------------------------------------------
    // TURNO A: EL GOLEM DEL JUGADOR EMBESTE Y ATACA AL GOLEM SALVAJE
    // --------------------------------------------------------------------------
    if (GolemCombatComponent.has(eng.playerGolemEntity)) {
      const playerCombat = GolemCombatComponent.get(eng.playerGolemEntity)
      const multPlayer = getAffinityMultiplier(playerCombat.affinity, eng.wildDef.affinity)
      const isCritPlayer = multPlayer > 1.0

      const rawDmgPlayer = playerCombat.attack - eng.wildDef.defense * 0.4
      const finalDmgPlayer = Math.max(3, Math.round(rawDmgPlayer * multPlayer))

      eng.wildCurrentHp = Math.max(0, eng.wildCurrentHp - finalDmgPlayer)

      // --- ANIMACIÓN PROCEDURAL DE CHOQUE Y LUNGE ---
      const lungeDist = playerSpeed >= 20 ? 1.3 : 0.85
      const normDir = Vector3.normalize(dirPlayerToWild)

      // Embestida hacia adelante del atacante
      playerMutTransform.position = Vector3.add(playerGolemPos, Vector3.scale(normDir, lungeDist))

      // Recoil del salvaje (retroceso por impacto)
      wildMutTransform.position = Vector3.add(wildPos, Vector3.scale(normDir, 0.6))

      // Mostrar daño flotante sobre el Golem salvaje
      spawnFloatingDamage(wildPos, finalDmgPlayer, isCritPlayer)

      // Refrescar etiqueta 3D del Golem salvaje
      const dataEntry = spawnedMapGolemDataMap.get(eng.wildEntity)
      if (dataEntry && dataEntry.labelEntity && TextShape.has(dataEntry.labelEntity)) {
        const hpBar = getHealthBarAscii(eng.wildCurrentHp, eng.wildMaxHp)
        const cleanName = cleanGolemName(eng.wildDef.name)
        TextShape.getMutable(dataEntry.labelEntity).text =
          `Lv.${eng.wildDef.level} ${cleanName}\n[${hpBar}] ${eng.wildCurrentHp}/${eng.wildMaxHp}`
      }

      const critText = isCritPlayer ? '⚡ CRÍTICO! ' : ''
      addCombatLog(`💥 Tu ${playerCombat.affinity} embistió e infligió ${critText}${finalDmgPlayer} de daño a ${eng.wildDef.name}`, '#FFD700')

      // --- COMPROBAR VICTORIA DEL JUGADOR ---
      if (eng.wildCurrentHp <= 0) {
        const expEarned = eng.wildDef.expReward || 50
        const gearsEarned = randomRange(eng.wildDef.minBrassGears || 5, eng.wildDef.maxBrassGears || 15)

        // Recompensas
        awardPlayerExp(expEarned)
        awardPlayerBrassGears(gearsEarned)
        addLocalGolemExp(eng.playerGolemId, expEarned)

        addCombatLog(
          `🏆 ¡VICTORIA! Derrotaste a ${eng.wildDef.name} (Lvl ${eng.wildDef.level}). +${expEarned} XP | +${gearsEarned} 🪙 Engranajes de Latón`,
          '#00FFAA'
        )

        // Efecto visual de moneda
        spawnFloatingDamage(
          Vector3.create(wildPos.x, wildPos.y + 1.5, wildPos.z),
          gearsEarned,
          true
        )

        // Transmitir evento de derrota y desbloqueo por MessageBus a todos los jugadores
        broadcastFieldGolemDefeat(eng.wildDef.index, eng.wildDef.id)
        broadcastFieldGolemLock(eng.wildDef.index, eng.wildDef.id, false)
        setFieldGolemLockState(eng.wildDef.index, '', false)

        // Aplicar la derrota localmente (ocultar modelo e iniciar cola de respawn)
        applyWildGolemDefeatLocally(eng.wildDef.index)

        eng.isFinished = true
        activeEngagement = null
        return
      }
    }
    eng.turnToggle = false
  } else {
    // --------------------------------------------------------------------------
    // TURNO B: EL GOLEM SALVAJE EMBESTE Y ATACA AL GOLEM DEL JUGADOR
    // --------------------------------------------------------------------------
    if (GolemCombatComponent.has(eng.playerGolemEntity)) {
      const playerCombat = GolemCombatComponent.get(eng.playerGolemEntity)
      const mutPlayerCombat = GolemCombatComponent.getMutable(eng.playerGolemEntity)

      const multWild = getAffinityMultiplier(eng.wildDef.affinity, playerCombat.affinity)
      const isCritWild = multWild > 1.0

      const rawDmgWild = eng.wildDef.attack - playerCombat.defense * 0.4
      const finalDmgWild = Math.max(2, Math.round(rawDmgWild * multWild))

      const newPlayerHp = Math.max(0, mutPlayerCombat.currentHp - finalDmgWild)
      mutPlayerCombat.currentHp = newPlayerHp
      updateLocalGolemHp(eng.playerGolemId, newPlayerHp)

      // --- ANIMACIÓN PROCEDURAL DE CHOQUE Y RECOIL DEL SALVAJE ---
      const lungeDist = eng.wildDef.speed >= 20 ? 1.3 : 0.85
      const normDir = Vector3.normalize(dirWildToPlayer)

      // Embestida hacia adelante del salvaje
      wildMutTransform.position = Vector3.add(wildPos, Vector3.scale(normDir, lungeDist))

      // Recoil del Golem del jugador (retroceso por impacto)
      playerMutTransform.position = Vector3.add(playerGolemPos, Vector3.scale(normDir, 0.6))

      // REFRESCAR ETIQUETA FLOTANTE 3D DEL GOLEM DEL JUGADOR
      updateGolemFloatingLabel(
        eng.playerGolemEntity,
        playerCombat.affinity,
        playerCombat.affinity,
        playerCombat.level,
        newPlayerHp,
        playerCombat.maxHp,
        'local'
      )

      // Mostrar daño flotante sobre el Golem del jugador
      spawnFloatingDamage(playerGolemPos, finalDmgWild, isCritWild)

      addCombatLog(`🛡️ ${eng.wildDef.name} embistió e infligió ${finalDmgWild} de daño a tu Golem`, '#FF6666')

      // --- COMPROBAR DERROTA DEL JUGADOR ---
      if (newPlayerHp <= 0) {
        addCombatLog(`💀 Tu Golem ha sido derrotado en la batalla de campo.`, '#FF3333')

        // Restaurar la salud del Golem salvaje sobreviviente al 100% y ordenar retorno
        cancelFieldCombat('Derrota del jugador')
        return
      }
    }
    eng.turnToggle = true
  }
}
