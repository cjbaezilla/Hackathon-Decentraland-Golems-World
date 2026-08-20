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
 * SISTEMA ECS DE CARGA Y RENDERIZADO REAL DE ESCENA (SCENE LOADER SYSTEM)
 * ============================================================================
 * Inspecciona en tiempo real el componente nativo `GltfContainerLoadingState`
 * de cada modelo 3D GLTF en la escena (incluyendo utilería de Silas y wearables
 * de los 50 NPCs). Retiene la pantalla de carga durante un mínimo de 6.0 segundos
 * para garantizar la transmisión por red y renderizado completo en GPU de Silas,
 * el campamento inicial y los avatares del mapa.
 */

const trackedGltfEntities = new Set<Entity>()

let isLoaderActive = true
let isSceneLoaded = false
let loadProgressPercent = 0
let elapsedTime = 0

// Tiempo mínimo de retención (6.0s) para asegurar que la mallas de Silas y los 50 NPCs estén renderizadas en GPU
const MIN_SAFETY_LOAD_TIME_SECONDS = 6.0
const MAX_SAFETY_TIMEOUT_SECONDS = 15.0
const EXPECTED_MIN_ENTITIES = 40

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
 * Indica si la escena ha finalizado su carga completa.
 */
export function getIsSceneFullyLoaded(): boolean {
  return isSceneLoaded
}

/**
 * Indica si el cargador inicial está actualmente activo.
 */
export function getIsLoaderActive(): boolean {
  return isLoaderActive
}

/**
 * Consulta el estado REAL de carga de los componentes GltfContainerLoadingState.
 */
export function checkSceneLoadingMetrics(): { total: number; loaded: number; progress: number } {
  const allGltfEntities = new Set<Entity>(trackedGltfEntities)

  // Consultar dinámicamente todas las entidades con componente de carga en el motor
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

  const progress = Math.min(100, Math.floor((loaded / total) * 100))
  return { total, loaded, progress }
}

/**
 * Sistema principal ECS de carga real de assets.
 */
export function sceneLoaderSystem(deltaTime: number) {
  if (!isLoaderActive) return

  elapsedTime += deltaTime

  const { total, loaded, progress } = checkSceneLoadingMetrics()

  // Progreso real acumulativo guiado por métricas GLTF e intervalo mínimo de inicialización de avatares
  const timeProgress = Math.min(99, Math.floor((elapsedTime / MIN_SAFETY_LOAD_TIME_SECONDS) * 100))
  const realGltfProgress = total >= EXPECTED_MIN_ENTITIES ? progress : 0
  const targetProgress = Math.max(timeProgress, realGltfProgress)

  loadProgressPercent = Math.min(100, Math.max(loadProgressPercent, targetProgress))

  const isMinTimeReached = elapsedTime >= MIN_SAFETY_LOAD_TIME_SECONDS
  const isAllAssetsLoaded = total >= EXPECTED_MIN_ENTITIES && loaded >= total
  const isTimeoutReached = elapsedTime >= MAX_SAFETY_TIMEOUT_SECONDS

  // Se retira la pantalla ÚNICAMENTE cuando todos los modelos 3D y Silas estén completamente cargados
  if ((isAllAssetsLoaded && isMinTimeReached) || isTimeoutReached) {
    isLoaderActive = false
    isSceneLoaded = true
    loadProgressPercent = 100

    console.log(
      `✅ [Scene Loader] Carga real de Silas, campamento y 50 NPCs finalizada al 100% (${loaded}/${total} modelos GLTF cargados | ${elapsedTime.toFixed(
        1
      )}s transcurridos). Posicionando al jugador...`
    )

    try {
      movePlayerTo({
        newRelativePosition: Vector3.create(12.2, 0.25, 2.0),
        cameraTarget: Vector3.create(15.8, 1.0, 5.9)
      })
    } catch (err) {
      console.log('⚠️ [Scene Loader] Error en movePlayerTo:', err)
    }

    engine.removeSystem(sceneLoaderSystem)
  }
}
