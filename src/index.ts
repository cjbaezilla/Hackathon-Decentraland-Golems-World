import {
  engine,
  Transform,
  InputAction,
  TouchScreenControls
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'
import { GolemConfig, generateRandomSquad } from './config/golems'
import { setLocalActiveSquad } from './state'
import { createFollowerGolem, removePlayerSquad } from './objects/golemFactory'
import { golemFollowerSystem, onRemoteSquadUpdated } from './systems/followerSystem'
import { golemCombatSystem } from './systems/golemCombatSystem'
import { arenaAnimationSystem } from './systems/arenaAnimationSystem'
import { trampolineSystem } from './systems/trampolineSystem'
import { GOLEM_TEAMS } from './components/combat'
import { createForgeDistrict } from './objects/forgeDistrictBuilder'
import { createMiningReserve } from './objects/miningReserveBuilder'
import { createScrapDesert } from './objects/scrapDesertBuilder'
import { createFoundryBoilers } from './objects/foundryBoilersBuilder'
import { createSubstation } from './objects/substationBuilder'
import { createRadioTower } from './objects/radioTowerBuilder'
import { createChatarrales } from './objects/chatarralesBuilder'
import { createAbandonedFactory } from './objects/abandonedFactoryBuilder'
import { createTournamentArena } from './objects/arenaBuilder'
import {
  setupSquadSyncListeners,
  announceLocalSquad,
  requestAllSquads,
  getLocalPlayerId
} from './multiplayer'

/**
 * ============================================================================
 * PUNTO DE ENTRADA PRINCIPAL DE LA ESCENA (SDK7 ECS)
 * ============================================================================
 * Escena base limpia para el desarrollo del juego final:
 * - Interfaz de Usuario React-ECS Mobile-First.
 * - Esquema de controles táctiles para dispositivos móviles.
 * - Infraestructura multijugador P2P (MessageBus).
 * - Arquitectura completa del Mundo de Golems (400x400m / 9 Zonas):
 *   1. Distrito de la Forja (Suroeste: 0..140m X, 0..140m Z).
 *   2. Desierto de Chatarra (Noroeste: 0..140m X, 260..400m Z).
 *   3. Reserva de Minería Segura (Noreste: 260..400m X, 260..400m Z).
 *   4. Calderas de la Fundición (Sureste: 260..400m X, 0..140m Z).
 *   5. Subestación Eléctrica (Norte: 140..260m X, 280..400m Z).
 *   6. Torre de Radio (Este: 280..400m X, 140..260m Z).
 *   7. Los Chatarrales (Oeste: 0..140m X, 140..260m Z).
 *   8. Fábrica Abandonada (Anillo 2: 140..260m X, 140..260m Z).
 *   9. Gran Arena Circular Steampunk (Centro: 200m, 200m - Ø 72m).
 * - Registro de sistemas ECS (animación, seguimiento de acompañantes, combate y trampolines).
 */
export function main() {
  // 1. Inicializar la Interfaz de Usuario 2D (React-ECS)
  setupUi()

  // 2. Configurar controles táctiles Mobile-First
  TouchScreenControls.createOrReplace(engine.RootEntity, {
    hideJoystick: false,
    hideCrosshair: false,
    touchInputs: [
      { inputAction: InputAction.IA_ACTION_3, hide: true },
      { inputAction: InputAction.IA_ACTION_4, hide: true },
      { inputAction: InputAction.IA_ACTION_5, hide: true },
      { inputAction: InputAction.IA_ACTION_6, hide: true }
    ]
  })

  // 3. Configurar infraestructura multijugador P2P (MessageBus)
  setupSquadSyncListeners(onRemoteSquadUpdated)
  requestAllSquads()

  // 4. Instanciar la arquitectura y delimitación de las 9 zonas del mundo completo
  createForgeDistrict()
  createMiningReserve()
  createScrapDesert()
  createFoundryBoilers()
  createSubstation()
  createRadioTower()
  createChatarrales()
  createAbandonedFactory()
  createTournamentArena()

  // 5. Registrar los sistemas de seguimiento, combate y animación en el motor ECS
  engine.addSystem(golemFollowerSystem)
  engine.addSystem(golemCombatSystem)
  engine.addSystem(arenaAnimationSystem)
  engine.addSystem(trampolineSystem)

  console.log('🤖 [Golems World] Escena principal inicializada con el mapa completo de 9 zonas y sistemas activos.')
}

/**
 * Función utilitaria para invocar o reaparecer el escuadrón de golems del jugador bajo demanda
 * (utilizada por la forja, misiones o eventos de juego).
 */
export function spawnLocalPlayerSquad(customSquad?: GolemConfig[]) {
  const localId = getLocalPlayerId()
  removePlayerSquad(localId)
  removePlayerSquad('local')

  const squadToSpawn = customSquad || generateRandomSquad(localId)
  setLocalActiveSquad(squadToSpawn)

  let spawnBase = Vector3.create(16, 0.1, 16)
  if (Transform.has(engine.PlayerEntity)) {
    const pPos = Transform.get(engine.PlayerEntity).position
    spawnBase = Vector3.create(pPos.x, Math.max(0.1, pPos.y), pPos.z)
  }

  squadToSpawn.forEach((config, index) => {
    const spawnPos = Vector3.create(spawnBase.x, spawnBase.y, spawnBase.z - config.followDistance)
    createFollowerGolem(config, index, spawnPos, localId, GOLEM_TEAMS.PLAYER)
  })

  announceLocalSquad(squadToSpawn)
}





