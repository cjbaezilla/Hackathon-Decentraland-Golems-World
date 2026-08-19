import { GolemConfig } from './config/golems'
import { t } from './i18n'

/**
 * ============================================================================
 * ESTADO LOCAL Y GLOBAL DE LA ESCENA (MEMORIA VOLÁTIL / SIN PERSISTENCIA)
 * ============================================================================
 * Almacena el estado de sesión del jugador local, incluyendo su escuadrón
 * de 3 golems asignado aleatoriamente para la sesión actual.
 */

export interface CombatLogEntry {
  id: string
  text: string
  color: string
  timestamp: number
}

export type NpcDialogStep = 'intro' | 'lore' | 'golems' | 'zones' | 'tips'

export interface SceneState {
  isInitialized: boolean
  localSquad: GolemConfig[] | null
  isInsideArena: boolean
  playerTotalExp: number
  playerTotalKills: number
  combatLogs: CombatLogEntry[]
  isNpcDialogOpen: boolean
  npcDialogStep: NpcDialogStep
}

export const sceneState: SceneState = {
  isInitialized: true,
  localSquad: null,
  isInsideArena: false,
  playerTotalExp: 0,
  playerTotalKills: 0,
  combatLogs: [],
  isNpcDialogOpen: false,
  npcDialogStep: 'intro'
}

/**
 * Abre la ventana modal de diálogo del NPC.
 */
export function openNpcDialog(step: NpcDialogStep = 'intro') {
  sceneState.isNpcDialogOpen = true
  sceneState.npcDialogStep = step
}

/**
 * Cierra la ventana modal de diálogo del NPC.
 */
export function closeNpcDialog() {
  sceneState.isNpcDialogOpen = false
  sceneState.npcDialogStep = 'intro'
}

/**
 * Consulta si el diálogo del NPC está abierto.
 */
export function getIsNpcDialogOpen(): boolean {
  return sceneState.isNpcDialogOpen
}

/**
 * Obtiene el paso o rama activa de diálogo del NPC.
 */
export function getNpcDialogStep(): NpcDialogStep {
  return sceneState.npcDialogStep
}

/**
 * Cambia la rama o paso activo del diálogo del NPC.
 */
export function setNpcDialogStep(step: NpcDialogStep) {
  sceneState.npcDialogStep = step
}


/**
 * Establece el escuadrón local activo en la sesión actual.
 */
export function setLocalActiveSquad(squad: GolemConfig[]) {
  sceneState.localSquad = squad
}

/**
 * Obtiene el escuadrón local activo de la sesión actual.
 */
export function getLocalActiveSquad(): GolemConfig[] | null {
  return sceneState.localSquad
}

/**
 * Actualiza el estado de presencia del avatar dentro de la arena.
 */
export function setIsInsideArena(inside: boolean) {
  sceneState.isInsideArena = inside
}

/**
 * Verifica si el avatar se encuentra actualmente dentro de la arena.
 */
export function getIsInsideArena(): boolean {
  return sceneState.isInsideArena
}

/**
 * Añade un mensaje al historial de eventos de combate (máximo 4 elementos).
 */
export function addCombatLog(text: string, color: string = '#FFFFFF') {
  const entry: CombatLogEntry = {
    id: `log_${Date.now()}_${Math.random()}`,
    text,
    color,
    timestamp: Date.now()
  }

  sceneState.combatLogs.unshift(entry)
  if (sceneState.combatLogs.length > 4) {
    sceneState.combatLogs.pop()
  }
}

/**
 * Devuelve la lista de mensajes de combate recientes.
 */
export function getCombatLogs(): CombatLogEntry[] {
  return sceneState.combatLogs
}

/**
 * Otorga experiencia acumulada al jugador en la sesión actual.
 */
export function awardPlayerExp(amount: number) {
  sceneState.playerTotalExp += Math.max(0, Math.round(amount))
}

/**
 * Incrementa el contador de golems derrotados por el jugador local.
 */
export function incrementPlayerKills() {
  sceneState.playerTotalKills += 1
}

/**
 * Obtiene las métricas de rendimiento en combate del jugador local.
 */
export function getPlayerBattleStats(): { totalExp: number; totalKills: number } {
  return {
    totalExp: sceneState.playerTotalExp,
    totalKills: sceneState.playerTotalKills
  }
}

/**
 * Actualiza la vida de un golem del escuadrón local en el estado de sesión.
 */
export function updateLocalGolemHp(golemId: string, newHp: number) {
  if (!sceneState.localSquad) return
  const golem = sceneState.localSquad.find((g) => g.id === golemId)
  if (golem) {
    golem.currentHp = Math.max(0, Math.min(golem.maxHp, newHp))
  }
}

/**
 * Agrega experiencia a un golem local específico y calcula si sube de nivel.
 */
export function addLocalGolemExp(golemId: string, exp: number) {
  if (!sceneState.localSquad) return
  const golem = sceneState.localSquad.find((g) => g.id === golemId)
  if (golem) {
    golem.currentExp += Math.max(0, Math.round(exp))
    const expNeeded = golem.level * 100
    if (golem.currentExp >= expNeeded) {
      golem.level += 1
      golem.currentExp -= expNeeded
      golem.maxHp = Math.round(golem.maxHp * 1.15)
      golem.currentHp = golem.maxHp
      golem.attack = Math.round(golem.attack * 1.12)
      golem.defense = Math.round(golem.defense * 1.1)
      addCombatLog(t('combat.levelUp', { name: golem.name, level: golem.level }), '#FFE600')
    }
  }
}

/**
 * Verifica si un golemId pertenece al escuadrón local activo del jugador.
 */
export function isLocalSquadGolem(golemId: string): boolean {
  if (!sceneState.localSquad) return false
  return sceneState.localSquad.some((g) => g.id === golemId)
}


