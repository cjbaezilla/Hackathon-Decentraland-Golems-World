import {
  engine,
  Transform,
  Entity,
  TextShape
} from '@dcl/sdk/ecs'
import { Vector3, Color4 } from '@dcl/sdk/math'
import { MapGolemDefinition } from '../data/mapGolemsCatalog'
import { GolemCombatComponent, GolemCombatState } from '../components/combat'
import { GolemFollowerComponent } from '../components/follower'
import { getAffinityMultiplier } from '../config/golems'
import { spawnedMapGolemDataMap } from '../objects/mapGolemsGenerator'
import {
  spawnFloatingDamage,
  getHealthBarAscii,
  getAffinityTextColor,
  cleanGolemName
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

/**
 * ============================================================================
 * SISTEMA ECS: COMBATE EN CAMPO ABIERTO CONTRA GOLEMS SALVAJES (FIELD COMBAT)
 * ============================================================================
 * Maneja el bucle de combate en tiempo real entre el Golem acompañante activo
 * del jugador y los Golems salvajes que patrullan por el mapa.
 * Incluye resolución por ticks, ventaja del Pentágono de Afinidades, entrega de XP,
 * concesión de la moneda "Engranajes de Latón" y respawn asíncrono.
 */

export interface ActiveFieldEngagement {
  wildEntity: Entity
  wildDef: MapGolemDefinition
  wildCurrentHp: number
  wildMaxHp: number
  playerGolemEntity: Entity
  playerGolemId: string
  playerGolemHp: number
  attackTimer: number
  isFinished: boolean
}

let activeEngagement: ActiveFieldEngagement | null = null

/**
 * Inicia una batalla de campo en tiempo real contra un Golem salvaje del mapa.
 */
export function startFieldCombat(wildEntity: Entity, wildDef: MapGolemDefinition): boolean {
  if (activeEngagement && !activeEngagement.isFinished) {
    addCombatLog('⚠️ Ya estás en un combate activo en el mapa.', '#FFCC00')
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

  activeEngagement = {
    wildEntity,
    wildDef,
    wildCurrentHp: wildDef.maxHp,
    wildMaxHp: wildDef.maxHp,
    playerGolemEntity: playerGolemEnt,
    playerGolemId,
    playerGolemHp: playerHp,
    attackTimer: 1.0, // Retraso inicial del primer golpe
    isFinished: false
  }

  const affName = getLocalizedAffinity(wildDef.affinity)
  addCombatLog(`⚔️ ¡Comenzó el combate de campo contra ${wildDef.name} [Lvl ${wildDef.level} - ${affName}]!`, '#FFD700')
  return true
}

/**
 * Cancela o finaliza el combate de campo activo.
 */
export function cancelFieldCombat(reason: string = 'Retirada') {
  if (activeEngagement) {
    activeEngagement.isFinished = true
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
  if (!activeEngagement || activeEngagement.isFinished) return

  const eng = activeEngagement

  // 1. Verificación de existencia y validez de entidades
  if (!Transform.has(eng.wildEntity) || !Transform.has(eng.playerGolemEntity)) {
    cancelFieldCombat('Posición o entidad no válida')
    return
  }

  const wildPos = Transform.get(eng.wildEntity).position
  const playerGolemPos = Transform.get(eng.playerGolemEntity).position

  // 2. Control de distancia de escape (máx 16m)
  const distBetween = Vector3.distance(wildPos, playerGolemPos)
  if (distBetween > 16.0) {
    cancelFieldCombat('Te has alejado demasiado')
    return
  }

  // 3. Temporizador de tick de ataque (cada 1.6 segundos)
  eng.attackTimer -= dt
  if (eng.attackTimer > 0) return

  eng.attackTimer = 1.6 // Reiniciar intervalo de golpe

  // --------------------------------------------------------------------------
  // TURNO A: EL GOLEM DEL JUGADOR ATACA AL GOLEM SALVAJE
  // --------------------------------------------------------------------------
  if (GolemCombatComponent.has(eng.playerGolemEntity)) {
    const playerCombat = GolemCombatComponent.get(eng.playerGolemEntity)
    const multPlayer = getAffinityMultiplier(playerCombat.affinity, eng.wildDef.affinity)
    const isCritPlayer = multPlayer > 1.0

    const rawDmgPlayer = playerCombat.attack - eng.wildDef.defense * 0.4
    const finalDmgPlayer = Math.max(3, Math.round(rawDmgPlayer * multPlayer))

    eng.wildCurrentHp = Math.max(0, eng.wildCurrentHp - finalDmgPlayer)

    // Mostrar daño flotante sobre el Golem salvaje
    spawnFloatingDamage(wildPos, finalDmgPlayer, isCritPlayer)

    // Actualizar etiqueta 3D del Golem salvaje
    const dataEntry = spawnedMapGolemDataMap.get(eng.wildEntity)
    if (dataEntry && dataEntry.labelEntity && TextShape.has(dataEntry.labelEntity)) {
      const hpBar = getHealthBarAscii(eng.wildCurrentHp, eng.wildMaxHp)
      const cleanName = cleanGolemName(eng.wildDef.name)
      TextShape.getMutable(dataEntry.labelEntity).text =
        `Lv.${eng.wildDef.level} ${cleanName}\n[${hpBar}] ${eng.wildCurrentHp}/${eng.wildMaxHp}`
    }

    const critText = isCritPlayer ? '⚡ CRÍTICO! ' : ''
    addCombatLog(`💥 Tu ${playerCombat.affinity} infligió ${critText}${finalDmgPlayer} de daño a ${eng.wildDef.name}`, '#FFD700')

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

      // Efecto visual de recompensa de moneda
      spawnFloatingDamage(
        Vector3.create(wildPos.x, wildPos.y + 1.5, wildPos.z),
        gearsEarned,
        true
      )

      // Ocultar temporalmente el Golem salvaje derrotado
      if (Transform.has(eng.wildEntity)) {
        Transform.getMutable(eng.wildEntity).position.y = -100
      }

      eng.isFinished = true
      activeEngagement = null
      return
    }
  }

  // --------------------------------------------------------------------------
  // TURNO B: EL GOLEM SALVAJE ATACA AL GOLEM DEL JUGADOR
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

    // Mostrar daño flotante sobre el Golem del jugador
    spawnFloatingDamage(playerGolemPos, finalDmgWild, isCritWild)

    addCombatLog(`🛡️ ${eng.wildDef.name} te atacó e infligió ${finalDmgWild} de daño`, '#FF6666')

    // --- COMPROBAR DERROTA DEL JUGADOR ---
    if (newPlayerHp <= 0) {
      addCombatLog(`💀 Tu Golem ha sido derrotado en la batalla de campo.`, '#FF3333')
      eng.isFinished = true
      activeEngagement = null
    }
  }
}
