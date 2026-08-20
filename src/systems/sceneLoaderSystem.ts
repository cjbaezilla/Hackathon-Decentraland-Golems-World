import {
  engine,
  Entity,
  GltfContainerLoadingState,
  LoadingState
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'

/**
 * Registro global de entidades GLTF monitoreadas para la carga inicial.
 */
const trackedGltfEntities = new Set<Entity>()

let isLoaderActive = true
let isSceneLoaded = false
let loadProgressPercent = 0
let elapsedTime = 0
const MAX_SAFETY_TIMEOUT_SECONDS = 10

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
 * Evalúa las entidades registradas y retorna las métricas de carga.
 */
export function checkSceneLoadingMetrics(): { total: number; loaded: number; progress: number } {
  const total = trackedGltfEntities.size
  if (total === 0) {
    return { total: 0, loaded: 0, progress: 100 }
  }

  let loaded = 0
  trackedGltfEntities.forEach((entity) => {
    const loadingState = GltfContainerLoadingState.getOrNull(entity)
    if (
      loadingState &&
      (loadingState.currentState === LoadingState.FINISHED ||
        loadingState.currentState === LoadingState.FINISHED_WITH_ERROR)
    ) {
      loaded++
    }
  })

  const progress = Math.min(100, Math.floor((loaded / total) * 100))
  return { total, loaded, progress }
}

/**
 * Sistema principal ECS de carga de la escena.
 */
export function sceneLoaderSystem(deltaTime: number) {
  if (!isLoaderActive) return

  elapsedTime += deltaTime
  const { total, loaded, progress } = checkSceneLoadingMetrics()

  // Simular un avance progresivo suave si la respuesta es instantánea para mejor UX
  const targetProgress = total === 0 ? 100 : progress
  loadProgressPercent = Math.max(loadProgressPercent, targetProgress)

  const isTimeoutReached = elapsedTime >= MAX_SAFETY_TIMEOUT_SECONDS
  const isAllLoaded = total > 0 && loaded >= total

  if (isAllLoaded || isTimeoutReached) {
    isLoaderActive = false
    isSceneLoaded = true
    loadProgressPercent = 100

    console.log(
      `✅ [Scene Loader] Escena y NPCs cargados al 100% (${loaded}/${total} entidades renderizadas | ${elapsedTime.toFixed(
        1
      )}s elapsed${isTimeoutReached ? ' - finalizado por tiempo límite' : ''}). Posicionando al jugador...`
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
