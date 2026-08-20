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

export type NpcDialogStep =
  | 'intro'
  | 'lore'
  | 'golems'
  | 'zones'
  | 'tips'
  | 'firstTimeCheck'
  | 'veteranFarewell'
  | 'uiLanguage'
  | 'uiMinimap'
  | 'mechanicsOverview'
  | 'tourHideout'
  | 'tourMarketWest'
  | 'tourFactory'
  | 'tourMarketSouth'
  | 'tourFinish'

export interface SceneState {
  isInitialized: boolean
  localSquad: GolemConfig[] | null
  isInsideArena: boolean
  playerTotalExp: number
  playerTotalKills: number
  combatLogs: CombatLogEntry[]
  isNpcDialogOpen: boolean
  npcDialogStep: NpcDialogStep
  isCinematicActive: boolean
  hasPlayedSilasIntro: boolean
  isBigMapOpen: boolean
  isSilasTourActive: boolean
  silasTourCurrentWaypoint: number
  silasTourSubtitle: string
  hasTriggeredProximityIntro: boolean
}

export const sceneState: SceneState = {
  isInitialized: true,
  localSquad: null,
  isInsideArena: false,
  playerTotalExp: 0,
  playerTotalKills: 0,
  combatLogs: [],
  isNpcDialogOpen: false,
  npcDialogStep: 'firstTimeCheck',
  isCinematicActive: false,
  hasPlayedSilasIntro: false,
  isBigMapOpen: false,
  isSilasTourActive: false,
  silasTourCurrentWaypoint: 0,
  silasTourSubtitle: '',
  hasTriggeredProximityIntro: false
}

/**
 * Consulta si la ventana modal del mapa grande está abierta.
 */
export function getIsBigMapOpen(): boolean {
  return sceneState.isBigMapOpen
}

/**
 * Establece el estado de apertura del mapa grande.
 */
export function setIsBigMapOpen(open: boolean) {
  sceneState.isBigMapOpen = open
}

/**
 * Alterna el estado de apertura del mapa grande (abrir/cerrar).
 */
export function toggleBigMap() {
  sceneState.isBigMapOpen = !sceneState.isBigMapOpen
}

/**
 * Consulta si la cinemática de cámara está activa.
 */
export function getIsCinematicActive(): boolean {
  return sceneState.isCinematicActive
}

/**
 * Establece el estado activo de la cinemática de cámara.
 */
export function setIsCinematicActive(active: boolean) {
  sceneState.isCinematicActive = active
}


/**
 * Consulta si ya se reprodujo la cinemática inicial de Silas en la sesión.
 */
export function getHasPlayedSilasIntro(): boolean {
  return sceneState.hasPlayedSilasIntro
}

/**
 * Marca si la cinemática inicial de Silas ya fue reproducida.
 */
export function setHasPlayedSilasIntro(played: boolean) {
  sceneState.hasPlayedSilasIntro = played
}

/**
 * Consulta si el tour guiado de Silas está en progreso.
 */
export function getIsSilasTourActive(): boolean {
  return sceneState.isSilasTourActive
}

/**
 * Establece el estado activo del tour guiado de Silas.
 */
export function setIsSilasTourActive(active: boolean) {
  sceneState.isSilasTourActive = active
}

/**
 * Obtiene el índice del waypoint actual del tour.
 */
export function getSilasTourCurrentWaypoint(): number {
  return sceneState.silasTourCurrentWaypoint
}

/**
 * Establece el índice del waypoint actual del tour.
 */
export function setSilasTourCurrentWaypoint(wpIndex: number) {
  sceneState.silasTourCurrentWaypoint = wpIndex
}

/**
 * Obtiene el subtítulo activo que narra Silas durante la marcha.
 */
export function getSilasTourSubtitle(): string {
  return sceneState.silasTourSubtitle
}

/**
 * Establece el subtítulo activo que narra Silas durante la marcha.
 */
export function setSilasTourSubtitle(subtitle: string) {
  sceneState.silasTourSubtitle = subtitle
}

/**
 * Consulta si ya se disparó la introducción proactiva por proximidad.
 */
export function getHasTriggeredProximityIntro(): boolean {
  return sceneState.hasTriggeredProximityIntro
}

/**
 * Marca si ya se disparó la introducción proactiva por proximidad.
 */
export function setHasTriggeredProximityIntro(triggered: boolean) {
  sceneState.hasTriggeredProximityIntro = triggered
}

/**
 * Abre la ventana modal de diálogo del NPC.
 */
export function openNpcDialog(step: NpcDialogStep = 'firstTimeCheck') {
  sceneState.isNpcDialogOpen = true
  sceneState.npcDialogStep = step
}

/**
 * Cierra la ventana modal de diálogo del NPC.
 */
export function closeNpcDialog() {
  sceneState.isNpcDialogOpen = false
  sceneState.npcDialogStep = 'firstTimeCheck'
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


