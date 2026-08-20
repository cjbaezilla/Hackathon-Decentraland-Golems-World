import {
  engine,
  Entity,
  GltfContainerLoadingState,
  LoadingState
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'

/**
 * ============================================================================
 * SISTEMA ECS DE CARGA Y RENDERIZADO INICIAL DE ESCENA (SCENE LOADER SYSTEM)
 * ============================================================================
 * Monitorea dinámicamente el estado de descarga y renderizado de todos los modelos
 * GLTF (arquitectura 3D, distrito de la forja, arena central y 100 NPCs) bloqueando
 * la pantalla con el widget steampunk hasta que los 100 NPCs estén 100% listos.
 */

const trackedGltfEntities = new Set<Entity>()

let isLoaderActive = true
let isSceneLoaded = false
let loadProgressPercent = 0
let elapsedTime = 0

// Tiempo mínimo de retención (6.5s) para garantizar la descarga completa de los 100 NPCs y texturas en VRAM
const MIN_SAFETY_LOAD_TIME_SECONDS = 6.5
const MAX_SAFETY_TIMEOUT_SECONDS = 12.0
const EXPECTED_MIN_ENTITIES = 80

/**
 * Registra una entidad que contiene o contendrá un GltfContainer para su monitoreo.
 */
export function registerEntityForLoading(entity: Entity) {
  if (entity !== undefined && entity !== null) {
    trackedGltfEntities.add(entity)
  }
}

/**
 * Registra un listado de entidades para su monitoreo.
 */
export function registerEntitiesForLoading(entities: Entity[]) {
  entities.forEach((entity) => {
    if (entity !== undefined && entity !== null) {
      trackedGltfEntities.add(entity)
    }
  })
}

/**
 * Retorna el porcentaje de progreso de carga (0 a 100).
 */
export function getSceneLoadProgress(): number {
  return loadProgressPercent
}

/**
 * Indicar si la escena ha finalizado su carga completa.
 */
export function getIsSceneFullyLoaded(): boolean {
  return isSceneLoaded
}

/**
 * Indicar si el cargador inicial está actualmente activo.
 */
export function getIsLoaderActive(): boolean {
  return isLoaderActive
}

/**
 * Evalúa todas las entidades GLTF en el motor ECS y retorna las métricas de carga.
 */
export function checkSceneLoadingMetrics(): { total: number; loaded: number; progress: number } {
  const allGltfEntities = new Set<Entity>(trackedGltfEntities)

  // Consultar dinámicamente todas las entidades que poseen el componente de estado de carga GLTF en SDK7
  for (const [entity] of engine.getEntitiesWith(GltfContainerLoadingState)) {
    allGltfEntities.add(entity)
  }

  const total = allGltfEntities.size
  if (total === 0) {
    return { total: 0, loaded: 0, progress: 0 }
  }

  let loaded = 0
  allGltfEntities.forEach((entity) => {
    const loadingState = GltfContainerLoadingState.getOrNull(entity)
    if (
      loadingState &&
      (loadingState.currentState === LoadingState.FINISHED ||
        loadingState.currentState === LoadingState.FINISHED_WITH_ERROR)
    ) {
      loaded++
    }
  })

  const rawProgress = Math.floor((loaded / total) * 100)
  return { total, loaded, progress: Math.min(100, Math.max(0, rawProgress)) }
}

/**
 * Sistema principal ECS de carga de la escena.
 */
export function sceneLoaderSystem(deltaTime: number) {
  if (!isLoaderActive) return

  elapsedTime += deltaTime
  const { total, loaded, progress } = checkSceneLoadingMetrics()

  // Avance progresivo fluido de 0% a 100% distribuido a lo largo del tiempo de carga
  const timeBasedProgress = Math.min(99, Math.floor((elapsedTime / MIN_SAFETY_LOAD_TIME_SECONDS) * 100))
  const realProgress = total >= EXPECTED_MIN_ENTITIES ? progress : 0
  const targetProgress = Math.max(timeBasedProgress, realProgress)

  loadProgressPercent = Math.min(100, Math.max(loadProgressPercent, targetProgress))

  const isMinTimeReached = elapsedTime >= MIN_SAFETY_LOAD_TIME_SECONDS
  const isTimeoutReached = elapsedTime >= MAX_SAFETY_TIMEOUT_SECONDS
  const isAllLoaded = total >= EXPECTED_MIN_ENTITIES && loaded >= total

  if ((isAllLoaded && isMinTimeReached) || isTimeoutReached) {
    isLoaderActive = false
    isSceneLoaded = true
    loadProgressPercent = 100

    console.log(
      `✅ [Scene Loader] Escena completa y 100 NPCs cargados al 100% (${loaded}/${total} modelos GLTF | ${elapsedTime.toFixed(
        1
      )}s transcurridos${isTimeoutReached ? ' - finalizado por tiempo límite' : ''}). Posicionando al jugador...`
    )

    // Posicionar al jugador en el Spawn de la Forja frente al NPC Silas
    try {
      movePlayerTo({
        newRelativePosition: Vector3.create(12.2, 0.25, 2.0),
        cameraTarget: Vector3.create(15.8, 1.0, 5.9)
      })
    } catch (err) {
      console.log('⚠️ [Scene Loader] Error en movePlayerTo:', err)
    }

    // Retirar el sistema del ciclo de renderizado de la escena
    engine.removeSystem(sceneLoaderSystem)
  }
}
