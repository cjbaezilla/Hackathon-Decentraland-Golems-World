import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material,
  pointerEventsSystem,
  InputAction,
  TouchScreenControls,
  PlayerIdentityData,
  Entity
} from '@dcl/sdk/ecs'
import { syncEntity, isStateSyncronized } from '@dcl/sdk/network'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { setupUi } from './ui'
import {
  BeaconState,
  PadState,
  SyncIds,
  PALETTE,
  PALETTE_NAMES,
  sceneMessageBus,
  localUiState,
  addUiEvent,
  ReactionMessage
} from './state'

/**
 * Función principal del ciclo de vida de la escena de Decentraland SDK7.
 */
export function main() {
  // 1. Inicializar la Interfaz de Usuario 2D (React-ECS) optimizada para móviles
  setupUi()

  // 2. Configurar controles táctiles Mobile-First
  // Ocultar botones no utilizados (3, 4, 5, 6) para evitar el menú "+" y dejar una interfaz limpia y espaciosa
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

  // 3. Crear el entorno y la plaza espacial (Área 32x32m para Decentraland World)
  setupEnvironment()

  // 4. Crear el Orbe/Cubo central sincronizado con syncEntity
  const beaconEntity = setupSyncedBeacon()

  // 5. Crear 4 plataformas táctiles interactivas sincronizadas alrededor de la plaza
  setupSyncedPads()

  // 6. Configurar el efecto visual de onda/difusión para eventos del MessageBus
  const waveEntity = setupReactionWave()

  // 7. Configurar receptores de eventos del MessageBus (Eventos efímeros)
  setupMessageBusListeners(waveEntity)

  // 8. Registrar los sistemas de actualización continua (bucle del motor ECS7)
  setupSceneSystems(beaconEntity, waveEntity)
}

/**
 * Construcción del suelo, plaza central y decoración espacial.
 */
function setupEnvironment() {
  // Suelo base de la plaza (32m x 32m)
  const floor = engine.addEntity()
  Transform.create(floor, {
    position: Vector3.create(16, 0, 16),
    scale: Vector3.create(31.8, 0.1, 31.8)
  })
  MeshRenderer.setBox(floor)
  MeshCollider.setBox(floor)
  Material.setPbrMaterial(floor, {
    albedoColor: Color4.create(0.06, 0.08, 0.12, 1),
    roughness: 0.8,
    metallic: 0.2
  })

  // Plataforma circular central
  const centerPlaza = engine.addEntity()
  Transform.create(centerPlaza, {
    position: Vector3.create(16, 0.08, 16),
    scale: Vector3.create(12, 0.12, 12)
  })
  MeshRenderer.setCylinder(centerPlaza)
  MeshCollider.setCylinder(centerPlaza)
  Material.setPbrMaterial(centerPlaza, {
    albedoColor: Color4.create(0.12, 0.16, 0.24, 1),
    emissiveColor: Color4.create(0.05, 0.1, 0.2, 1),
    roughness: 0.4
  })

  // Pedestal del orbe central
  const pedestal = engine.addEntity()
  Transform.create(pedestal, {
    position: Vector3.create(16, 0.6, 16),
    scale: Vector3.create(1.6, 1.2, 1.6)
  })
  MeshRenderer.setCylinder(pedestal)
  MeshCollider.setCylinder(pedestal)
  Material.setPbrMaterial(pedestal, {
    albedoColor: Color4.create(0.18, 0.22, 0.32, 1),
    metallic: 0.8,
    roughness: 0.2
  })
}

/**
 * Crea y sincroniza el orbe/cubo central persistente entre todos los clientes con syncEntity.
 */
function setupSyncedBeacon(): Entity {
  const beacon = engine.addEntity()

  Transform.create(beacon, {
    position: Vector3.create(16, 2.3, 16),
    scale: Vector3.create(1.3, 1.3, 1.3),
    rotation: Quaternion.Identity()
  })

  MeshRenderer.setBox(beacon)
  MeshCollider.setBox(beacon)

  Material.setPbrMaterial(beacon, {
    albedoColor: PALETTE[0],
    emissiveColor: PALETTE[0],
    emissiveIntensity: 2.0,
    roughness: 0.1,
    metallic: 0.9
  })

  // Componente personalizado con esquema definido
  BeaconState.create(beacon, {
    count: 0,
    colorIndex: 0,
    lastPlayer: 'Nadie aún',
    lastUpdated: Date.now()
  })

  // Sincronización CRDT con ID fijo (SyncIds.BEACON)
  syncEntity(
    beacon,
    [Transform.componentId, Material.componentId, BeaconState.componentId],
    SyncIds.BEACON
  )

  // Interacción táctil / puntero optimizada para móviles (maxDistance: 10m para facilitar toques)
  pointerEventsSystem.onPointerDown(
    {
      entity: beacon,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: '¡Tocar para sincronizar color y puntos!',
        maxDistance: 10
      }
    },
    () => {
      const state = BeaconState.getMutable(beacon)
      const nextColorIndex = (state.colorIndex + 1) % PALETTE.length
      state.colorIndex = nextColorIndex
      state.count += 1
      state.lastPlayer = getLocalPlayerName()
      state.lastUpdated = Date.now()

      // Actualizar el material localmente (la sincronización propagará a los demás)
      Material.setPbrMaterial(beacon, {
        albedoColor: PALETTE[nextColorIndex],
        emissiveColor: PALETTE[nextColorIndex],
        emissiveIntensity: 2.5,
        roughness: 0.1,
        metallic: 0.9
      })

      // Actualizar estado de UI
      localUiState.beaconCount = state.count
      localUiState.currentColorName = PALETTE_NAMES[nextColorIndex]
      localUiState.lastPlayerName = state.lastPlayer
      addUiEvent(`✨ Tocaste el orbe (+1 punto, ${PALETTE_NAMES[nextColorIndex]})`)

      // Emitir evento por MessageBus
      sceneMessageBus.emit('reaction', {
        sender: state.lastPlayer,
        emoji: '💎',
        timestamp: Date.now()
      })
    }
  )

  return beacon
}

/**
 * Crea plataformas interactivas en los 4 puntos cardinales con syncEntity.
 */
function setupSyncedPads() {
  const padConfigs = [
    { id: SyncIds.PAD_RED, pos: Vector3.create(10, 0.12, 16), color: PALETTE[1], name: 'Plataforma Magenta' },
    { id: SyncIds.PAD_GREEN, pos: Vector3.create(22, 0.12, 16), color: PALETTE[2], name: 'Plataforma Esmeralda' },
    { id: SyncIds.PAD_BLUE, pos: Vector3.create(16, 0.12, 10), color: PALETTE[0], name: 'Plataforma Cyber' },
    { id: SyncIds.PAD_PURPLE, pos: Vector3.create(16, 0.12, 22), color: PALETTE[4], name: 'Plataforma Violeta' }
  ]

  for (const cfg of padConfigs) {
    const pad = engine.addEntity()

    Transform.create(pad, {
      position: cfg.pos,
      scale: Vector3.create(3, 0.18, 3)
    })

    MeshRenderer.setCylinder(pad)
    MeshCollider.setCylinder(pad)

    Material.setPbrMaterial(pad, {
      albedoColor: cfg.color,
      emissiveColor: cfg.color,
      emissiveIntensity: 1.2,
      roughness: 0.3
    })

    PadState.create(pad, {
      padId: cfg.id,
      count: 0,
      lastPlayer: 'Nadie'
    })

    syncEntity(pad, [PadState.componentId], cfg.id)

    // Interacción táctil en la plataforma
    pointerEventsSystem.onPointerDown(
      {
        entity: pad,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: `Activar ${cfg.name}`,
          maxDistance: 8
        }
      },
      () => {
        const state = PadState.getMutable(pad)
        state.count += 1
        state.lastPlayer = getLocalPlayerName()

        addUiEvent(`🔘 ${cfg.name} activada (${state.count} veces)`)

        // Emitir reacción
        sceneMessageBus.emit('reaction', {
          sender: state.lastPlayer,
          emoji: '⚡',
          timestamp: Date.now()
        })
      }
    )
  }
}

/**
 * Anillo de onda expansiva para retroalimentación visual de difusiones multijugador.
 */
function setupReactionWave(): Entity {
  const wave = engine.addEntity()

  Transform.create(wave, {
    position: Vector3.create(16, 0.2, 16),
    scale: Vector3.create(0.1, 0.05, 0.1)
  })

  MeshRenderer.setCylinder(wave)
  Material.setPbrMaterial(wave, {
    albedoColor: Color4.create(0.3, 0.9, 1, 0.6),
    emissiveColor: Color4.create(0.3, 0.9, 1, 1),
    emissiveIntensity: 3.0
  })

  return wave
}

// Variables para animación de la onda
let waveScale = 0.1
let waveActive = false

/**
 * Escucha difusiones de eventos efímeros del MessageBus.
 */
function setupMessageBusListeners(waveEntity: Entity) {
  sceneMessageBus.on('reaction', (data: ReactionMessage) => {
    waveScale = 0.5
    waveActive = true
    localUiState.lastReaction = `${data.emoji} Reacción de ${data.sender}`
    addUiEvent(`${data.emoji} ${data.sender} difundió una onda`)
  })
}

/**
 * Registra los sistemas por frame del bucle ECS7.
 */
function setupSceneSystems(beaconEntity: Entity, waveEntity: Entity) {
  let timer = 0

  engine.addSystem((dt: number) => {
    timer += dt

    // 1. Verificar estado de sincronización CRDT de la red
    localUiState.isSynced = isStateSyncronized()

    // 2. Actualizar conteo de jugadores presentes
    let count = 0
    for (const [_entity] of engine.getEntitiesWith(PlayerIdentityData)) {
      count++
    }
    localUiState.activePlayersCount = Math.max(1, count)

    // 3. Animación local continua del orbe central (rotación + levitación suave)
    if (Transform.has(beaconEntity)) {
      const transform = Transform.getMutable(beaconEntity)
      const currentRot = Quaternion.toEulerAngles(transform.rotation)
      transform.rotation = Quaternion.fromEulerDegrees(
        currentRot.x + 25 * dt,
        currentRot.y + 40 * dt,
        currentRot.z + 15 * dt
      )
      transform.position.y = 2.3 + Math.sin(timer * 2) * 0.15
    }

    // 4. Sincronizar el material y datos del orbe si otro jugador los modificó
    if (BeaconState.has(beaconEntity)) {
      const state = BeaconState.get(beaconEntity)
      if (state.count !== localUiState.beaconCount) {
        localUiState.beaconCount = state.count
        localUiState.currentColorName = PALETTE_NAMES[state.colorIndex] || 'Color Neón'
        localUiState.lastPlayerName = state.lastPlayer

        // Actualizar material reflectante
        Material.setPbrMaterial(beaconEntity, {
          albedoColor: PALETTE[state.colorIndex] || PALETTE[0],
          emissiveColor: PALETTE[state.colorIndex] || PALETTE[0],
          emissiveIntensity: 2.2,
          roughness: 0.1,
          metallic: 0.9
        })
      }
    }

    // 5. Animación de expansión de la onda visual de reacción
    if (waveActive && Transform.has(waveEntity)) {
      waveScale += dt * 18
      const transform = Transform.getMutable(waveEntity)
      transform.scale = Vector3.create(waveScale, 0.05, waveScale)

      if (waveScale > 24) {
        waveActive = false
        waveScale = 0.1
        transform.scale = Vector3.create(0.1, 0.05, 0.1)
      }
    }
  })
}

/**
 * Obtiene el nombre o identificador del jugador actual.
 */
function getLocalPlayerName(): string {
  for (const [entity] of engine.getEntitiesWith(PlayerIdentityData)) {
    const data = PlayerIdentityData.get(entity)
    if (data.address) {
      return data.address.substring(0, 6) + '...'
    }
  }
  return 'Móvil-' + Math.floor(Math.random() * 900 + 100)
}
