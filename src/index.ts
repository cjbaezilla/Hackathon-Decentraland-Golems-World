import {
  engine,
  Transform,
  InputAction,
  TouchScreenControls,
  inputSystem,
  PointerEventType,
  timers
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'
import { GolemConfig, generateRandomSquad } from './config/golems'
import { setLocalActiveSquad, toggleInventory } from './state'
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
import { createSouthCorridor } from './objects/southCorridorBuilder'
import { createTrampoline } from './objects/trampoline'
import { createTradingPosts } from './objects/tradingPostsBuilder'
import { createWreckageLab } from './objects/wreckageLabBuilder'
import { createWelcomeNpc, welcomeNpcAnimationSystem } from './objects/welcomeNpc'
import { spawnAllCatalogNpcs } from './objects/npcGenerator'
import { spawnMapGolems } from './objects/mapGolemsGenerator'
import { createUserHideout } from './objects/userHideoutBuilder'
import { initSilasCinematicCamera, scheduleSilasIntroCinematic } from './cinematics/silasCinematic'
import { initTourFollowCamera, initMarketOrbitalCamera } from './cinematics/marketCinematic'
import { silasTourSystem } from './systems/silasTourSystem'
import { sceneLoaderSystem } from './systems/sceneLoaderSystem'
import { npcPatrolSystem } from './systems/npcPatrolSystem'
import { mapGolemPatrolSystem } from './systems/mapGolemPatrolSystem'
import { spawnInitialMapItems } from './objects/itemGenerator'
import { itemSpawnSystem } from './systems/itemSpawnSystem'


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
 * - Arquitectura completa del Mundo de Golems (400x400m / 9 Zonas + Corredores):
 *   1. Distrito de la Forja (Suroeste: 0..140m X, 0..140m Z).
 *   2. Desierto de Chatarra (Noroeste: 0..140m X, 260..400m Z).
 *   3. Reserva de Minería Segura (Noreste: 260..400m X, 260..400m Z).
 *   4. Calderas de la Fundición (Sureste: 260..400m X, 0..140m Z).
 *   5. Subestación Eléctrica (Norte: 140..260m X, 280..400m Z).
 *   6. Torre de Radio (Este: 280..400m X, 140..260m Z).
 *   7. Los Chatarrales (Oeste: 0..140m X, 140..260m Z).
 *   8. Fábrica Abandonada (Anillo 2: 140..260m X, 140..260m Z).
 *   9. Gran Arena Circular Steampunk (Centro: 200m, 200m - Ø 72m).
 *   10. Corredor y Gran Vía del Sur (Parcelas 13,1 en 212, 24 y enlace Forja-Calderas).
 * - Registro de sistemas ECS (animación, seguimiento de acompañantes, combate, trampolines y NPCs).
 */
export function main() {
  // 1. Inicializar la Interfaz de Usuario 2D (React-ECS)
  setupUi()

  // 2. Configurar controles táctiles Mobile-First (Botón de Mochila/Inventario para IA_SECONDARY)
  TouchScreenControls.createOrReplace(engine.RootEntity, {
    hideJoystick: false,
    hideCrosshair: false,
    touchInputs: [
      {
        inputAction: InputAction.IA_SECONDARY,
        hide: false,
        icon: { tex: { $case: 'texture', texture: { src: 'assets/images/backpack_icon.png' } } }
      },
      { inputAction: InputAction.IA_ACTION_3, hide: true },
      { inputAction: InputAction.IA_ACTION_4, hide: true },
      { inputAction: InputAction.IA_ACTION_5, hide: true },
      { inputAction: InputAction.IA_ACTION_6, hide: true }
    ]
  })

  // 2.1. Registrar el sistema de entrada para la tecla "F" (Desktop) y botón "F" táctil (Mobile)
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
      toggleInventory()
    }
  })

  // 3. Configurar infraestructura multijugador P2P (MessageBus)
  setupSquadSyncListeners(onRemoteSquadUpdated)
  requestAllSquads()

  // 4. Instanciar la arquitectura y delimitación de todas las zonas y corredores
  createForgeDistrict()
  createMiningReserve()
  createScrapDesert()
  createFoundryBoilers()
  createSubstation()
  createRadioTower()
  createChatarrales()
  createAbandonedFactory()
  createTournamentArena()
  createSouthCorridor()

  // 5. Instanciar el trampolín de vapor steampunk en Parcela [0, 0] (5.1m, 7.1m)
  createTrampoline(Vector3.create(5.1, 0, 7.1))

  // 6. Instanciar los 5 puestos de comercio steampunk equidistantes en el bulevar de la Forja
  createTradingPosts()

  // 7. Instanciar el Laboratorio Steampunk de Creación de Golems (Wreckage Lab) en Parcelas [1, 2] y [2, 2]
  createWreckageLab()

  // 8. Instanciar al NPC de bienvenida Silas el Sobreviviente en Parcela [0, 0] (15.8m, 5.9m sobre el piso de madera)
  createWelcomeNpc(Vector3.create(15.8, 0.25, 5.9))

  // 9. Instanciar el Escondite y Bóveda de Inventario del Usuario (Parcelas [0, 0] y [0, 1] en X: 2.6m-2.8m, Z: 13.7m-19.8m)
  createUserHideout()

  // 10. Instanciar los 50 NPCs del catálogo distribuidos proporcionalmente por todo el mapa (excluyendo la Arena Central y el poblado inicial de la Forja)
  spawnAllCatalogNpcs(50)

  // 11. Instanciar los 150 golems ambientales distribuidos dinámicamente con mayor presencia en los bordes del mapa
  spawnMapGolems(150)

  // 12. Instanciar exactamente 150 materiales coleccionables distribuidos por las zonas del mapa
  spawnInitialMapItems(150)

  // 13. Inicializar la cámara cinemática de presentación y cámaras de tour/mercado
  initSilasCinematicCamera()
  initTourFollowCamera()
  initMarketOrbitalCamera()

  // 14. Disparo inmediato al primer input del usuario (con temporizador de seguridad de respaldo)
  scheduleSilasIntroCinematic()

  // 15. Registrar los sistemas de carga, seguimiento, combate, animación, trampolín, NPCs, materiales y tour guiado
  engine.addSystem(sceneLoaderSystem)
  engine.addSystem(golemFollowerSystem)
  engine.addSystem(golemCombatSystem)
  engine.addSystem(arenaAnimationSystem)
  engine.addSystem(trampolineSystem)
  engine.addSystem(welcomeNpcAnimationSystem)
  engine.addSystem(silasTourSystem)
  engine.addSystem(npcPatrolSystem)
  engine.addSystem(mapGolemPatrolSystem)
  engine.addSystem(itemSpawnSystem)


  console.log('🤖 [Golems World] Escena principal inicializada con el mapa completo de 9 zonas, Silas el Sobreviviente, cinemática de presentación y sistema de tour guiado activo.')
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





