import { GolemConfig } from './config/golems'
import { t } from './i18n'
import { syncGolem3DEntityHp } from './objects/golemFactory'

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

export type CinematicType = 'silas_intro' | 'market_west' | 'market_south' | 'hideout' | 'factory' | null

export interface SceneState {
  isInitialized: boolean
  localSquad: GolemConfig[] | null
  isInsideArena: boolean
  playerTotalExp: number
  playerTotalKills: number
  playerBrassGears: number
  activeFieldTarget: any | null
  isFieldBattleModalOpen: boolean
  combatLogs: CombatLogEntry[]
  isNpcDialogOpen: boolean
  npcDialogStep: NpcDialogStep
  isCinematicActive: boolean
  activeCinematicType: CinematicType
  hasPlayedSilasIntro: boolean
  isBigMapOpen: boolean
  isSilasTourActive: boolean
  silasTourCurrentWaypoint: number
  silasTourSubtitle: string
  hasTriggeredProximityIntro: boolean
  isInventoryOpen: boolean
  isGolemInventoryOpen: boolean
  isForgeUIOpen: boolean
  isTeslaTowerUIOpen: boolean
  selectedForgeMaterials: Record<string, number>
  golemReserve: GolemConfig[]
  playerInventory: Record<string, number>
  nearestItemDistance: number
  nearestItemRarity: string
  nearestItemId: string
  nearestItemX: number
  nearestItemZ: number
}

export const sceneState: SceneState = {
  isInitialized: true,
  localSquad: null,
  isInsideArena: false,
  playerTotalExp: 0,
  playerTotalKills: 0,
  playerBrassGears: 50, // Moneda inicial de cortesía
  activeFieldTarget: null,
  isFieldBattleModalOpen: false,
  combatLogs: [],
  isNpcDialogOpen: false,
  npcDialogStep: 'firstTimeCheck',
  isCinematicActive: false,
  activeCinematicType: null,
  hasPlayedSilasIntro: false,
  isBigMapOpen: false,
  isInventoryOpen: false,
  isGolemInventoryOpen: false,
  isForgeUIOpen: false,
  isTeslaTowerUIOpen: false,
  selectedForgeMaterials: {},

  golemReserve: [],
  isSilasTourActive: false,
  silasTourCurrentWaypoint: 0,
  silasTourSubtitle: '',
  hasTriggeredProximityIntro: false,
  playerInventory: {},
  nearestItemDistance: 999,
  nearestItemRarity: 'common',
  nearestItemId: '',
  nearestItemX: 0,
  nearestItemZ: 0
}

/**
 * Consulta si la ventana modal del inventario de chatarra está abierta.
 */
export function getIsInventoryOpen(): boolean {
  return sceneState.isInventoryOpen
}

/**
 * Establece el estado de apertura del inventario de chatarra.
 */
export function setIsInventoryOpen(open: boolean) {
  sceneState.isInventoryOpen = open
}

/**
 * Alterna el estado de apertura del inventario de chatarra (abrir/cerrar).
 */
export function toggleInventory() {
  sceneState.isInventoryOpen = !sceneState.isInventoryOpen
}

/**
 * Consulta si la ventana modal del inventario/reserva de golems está abierta.
 */
export function getIsGolemInventoryOpen(): boolean {
  return sceneState.isGolemInventoryOpen
}

/**
 * Establece el estado de apertura del inventario de golems.
 */
export function setIsGolemInventoryOpen(open: boolean) {
  sceneState.isGolemInventoryOpen = open
}

/**
 * Alterna el estado de apertura del inventario de golems (abrir/cerrar).
 */
export function toggleGolemInventory() {
  sceneState.isGolemInventoryOpen = !sceneState.isGolemInventoryOpen
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
 * Consulta el tipo específico de cinemática activa.
 */
export function getActiveCinematicType(): CinematicType {
  return sceneState.activeCinematicType
}

/**
 * Establece el tipo específico de cinemática activa y sincroniza el flag booleano.
 */
export function setActiveCinematicType(type: CinematicType) {
  sceneState.activeCinematicType = type
  sceneState.isCinematicActive = type !== null
}

/**
 * Establece el estado activo de la cinemática de cámara.
 */
export function setIsCinematicActive(active: boolean) {
  sceneState.isCinematicActive = active
  if (!active) {
    sceneState.activeCinematicType = null
  }
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
 * Verifica si el jugador local posee al menos 1 golem activo con HP mayor a 0 en su escuadrón.
 */
export function hasActivePlayerGolem(): boolean {
  if (sceneState.localSquad && sceneState.localSquad.length > 0) {
    return sceneState.localSquad.some((g) => g.currentHp > 0)
  }
  return false
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
    syncGolem3DEntityHp(golemId, golem.currentHp)
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

/**
 * Añade una cantidad de un material de chatarra al inventario del jugador.
 */
export function addMaterialToInventory(itemId: string, count: number = 1) {
  const current = sceneState.playerInventory[itemId] || 0
  sceneState.playerInventory[itemId] = current + count
}

/**
 * Devuelve el inventario completo de materiales del jugador.
 */
export function getPlayerInventory(): Record<string, number> {
  return sceneState.playerInventory
}

/**
 * Actualiza la información de proximidad para el Radar de Calor (React-ECS UI).
 */
export function updateHeatRadarState(
  distance: number,
  rarity: string,
  itemId: string,
  itemX: number = 0,
  itemZ: number = 0
) {
  sceneState.nearestItemDistance = distance
  sceneState.nearestItemRarity = rarity
  sceneState.nearestItemId = itemId
  sceneState.nearestItemX = itemX
  sceneState.nearestItemZ = itemZ
}

/**
 * Obtiene el estado actual del Radar de Calor.
 */
export function getHeatRadarState(): {
  distance: number
  rarity: string
  itemId: string
  itemX: number
  itemZ: number
} {
  return {
    distance: sceneState.nearestItemDistance,
    rarity: sceneState.nearestItemRarity,
    itemId: sceneState.nearestItemId,
    itemX: sceneState.nearestItemX,
    itemZ: sceneState.nearestItemZ
  }
}

/**
 * Consulta si la ventana modal de la forja de golems está abierta.
 */
export function getIsForgeUIOpen(): boolean {
  return sceneState.isForgeUIOpen
}

/**
 * Establece el estado de apertura de la ventana de la forja de golems.
 */
export function setIsForgeUIOpen(open: boolean) {
  sceneState.isForgeUIOpen = open
}

/**
 * Alterna el estado de apertura de la ventana de la forja de golems.
 */
export function toggleForgeUI() {
  sceneState.isForgeUIOpen = !sceneState.isForgeUIOpen
}

/**
 * Obtiene el objeto de materiales actualmente seleccionados en la forja.
 */
export function getSelectedForgeMaterials(): Record<string, number> {
  return sceneState.selectedForgeMaterials
}

/**
 * Incrementa la cantidad seleccionada de un material en la forja (hasta el límite disponible en inventario).
 */
export function addForgeMaterial(itemId: string) {
  const owned = sceneState.playerInventory[itemId] || 0
  const selected = sceneState.selectedForgeMaterials[itemId] || 0

  // Contar el total acumulado en la bahía (máximo 12 ítems totales)
  let currentTotalCount = 0
  for (const count of Object.values(sceneState.selectedForgeMaterials)) {
    currentTotalCount += count
  }

  if (selected < owned && currentTotalCount < 12) {
    sceneState.selectedForgeMaterials = {
      ...sceneState.selectedForgeMaterials,
      [itemId]: selected + 1
    }
  }
}

/**
 * Decrementa la cantidad seleccionada de un material en la forja.
 */
export function removeForgeMaterial(itemId: string) {
  const selected = sceneState.selectedForgeMaterials[itemId] || 0
  if (selected > 1) {
    const next = { ...sceneState.selectedForgeMaterials }
    next[itemId] = selected - 1
    sceneState.selectedForgeMaterials = next
  } else if (selected === 1) {
    const next = { ...sceneState.selectedForgeMaterials }
    delete next[itemId]
    sceneState.selectedForgeMaterials = next
  }
}

/**
 * Limpia la bahía de materiales seleccionados en la forja.
 */
export function clearForgeMaterials() {
  sceneState.selectedForgeMaterials = {}
}

/**
 * Descuenta una cantidad de un material del inventario del jugador.
 */
export function removeMaterialFromInventory(itemId: string, count: number) {
  const current = sceneState.playerInventory[itemId] || 0
  const next = Math.max(0, current - count)
  if (next > 0) {
    sceneState.playerInventory[itemId] = next
  } else {
    delete sceneState.playerInventory[itemId]
  }
}

/**
 * Agrega un golem a la reserva del jugador.
 */
export function addGolemToReserve(golem: GolemConfig) {
  sceneState.golemReserve.push(golem)
}

/**
 * Obtiene la lista de golems en la reserva del jugador.
 */
export function getGolemReserve(): GolemConfig[] {
  return sceneState.golemReserve
}

/**
 * Otorga una cantidad de Engranajes de Latón (moneda del juego) al jugador.
 */
export function awardPlayerBrassGears(amount: number) {
  sceneState.playerBrassGears += Math.max(0, Math.round(amount))
}

/**
 * Obtiene el saldo actual de Engranajes de Latón del jugador.
 */
export function getPlayerBrassGears(): number {
  return sceneState.playerBrassGears
}

/**
 * Abre el modal de confirmación de batalla contra un golem salvaje del mapa.
 */
export function openFieldBattleModal(targetData: any) {
  sceneState.activeFieldTarget = targetData
  sceneState.isFieldBattleModalOpen = true
}

/**
 * Cierra el modal de confirmación de batalla de campo.
 */
export function closeFieldBattleModal() {
  sceneState.activeFieldTarget = null
  sceneState.isFieldBattleModalOpen = false
}

/**
 * Consulta si el modal de confirmación de batalla de campo está abierto.
 */
export function getIsFieldBattleModalOpen(): boolean {
  return sceneState.isFieldBattleModalOpen
}

/**
 * Obtiene los datos del golem salvaje objetivo seleccionado.
 */
export function getActiveFieldTarget(): any | null {
  return sceneState.activeFieldTarget
}

/**
 * Consulta si el modal de la Torre Tesla está abierto.
 */
export function getIsTeslaTowerUIOpen(): boolean {
  return sceneState.isTeslaTowerUIOpen
}

/**
 * Establece el estado de apertura del modal de la Torre Tesla.
 */
export function setIsTeslaTowerUIOpen(open: boolean) {
  sceneState.isTeslaTowerUIOpen = open
}

/**
 * Restaura la vida (HP) de un golem individual utilizando la Torre Tesla.
 * Tarifa: 1 Engranaje de Latón por cada 1 HP recargado.
 */
export function restoreGolemHpTesla(golemId: string): { success: boolean; cost: number; messageKey: string } {
  let golem: GolemConfig | undefined = sceneState.localSquad?.find((g) => g.id === golemId)
  if (!golem) {
    golem = sceneState.golemReserve.find((g) => g.id === golemId)
  }
  if (!golem) {
    return { success: false, cost: 0, messageKey: 'noGolem' }
  }

  const missingHp = Math.max(0, golem.maxHp - golem.currentHp)
  if (missingHp <= 0) {
    return { success: false, cost: 0, messageKey: 'fullHp' }
  }

  const cost = Math.max(1, Math.ceil(missingHp * 1))
  if (sceneState.playerBrassGears < cost) {
    return { success: false, cost, messageKey: 'notEnoughGears' }
  }

  sceneState.playerBrassGears -= cost
  golem.currentHp = golem.maxHp
  syncGolem3DEntityHp(golem.id, golem.maxHp)
  addCombatLog(t('tesla.rechargeSuccess', { name: golem.name, hp: golem.maxHp, cost }), '#00E5FF')
  return { success: true, cost, messageKey: 'success' }
}

/**
 * Restaura la vida (HP) de TODOS los golems del jugador (escuadrón y reserva).
 */
export function restoreAllGolemsHpTesla(): { success: boolean; totalCost: number; restoredCount: number } {
  const allGolems: GolemConfig[] = []
  if (sceneState.localSquad) {
    allGolems.push(...sceneState.localSquad)
  }
  allGolems.push(...sceneState.golemReserve)

  const damagedGolems = allGolems.filter((g) => g.currentHp < g.maxHp)
  if (damagedGolems.length === 0) {
    return { success: false, totalCost: 0, restoredCount: 0 }
  }

  let totalMissingHp = 0
  damagedGolems.forEach((g) => {
    totalMissingHp += (g.maxHp - g.currentHp)
  })

  const totalCost = Math.max(1, Math.ceil(totalMissingHp * 1))
  if (sceneState.playerBrassGears < totalCost) {
    return { success: false, totalCost, restoredCount: 0 }
  }

  sceneState.playerBrassGears -= totalCost
  damagedGolems.forEach((g) => {
    g.currentHp = g.maxHp
    syncGolem3DEntityHp(g.id, g.maxHp)
  })

  addCombatLog(t('tesla.rechargeAllSuccess', { cost: totalCost }), '#00E5FF')
  return { success: true, totalCost, restoredCount: damagedGolems.length }
}








