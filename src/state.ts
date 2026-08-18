import { GolemConfig } from './config/golems'

/**
 * ============================================================================
 * ESTADO LOCAL Y GLOBAL DE LA ESCENA (MEMORIA VOLÁTIL / SIN PERSISTENCIA)
 * ============================================================================
 * Almacena el estado de sesión del jugador local, incluyendo su escuadrón
 * de 3 golems asignado aleatoriamente para la sesión actual.
 */

export interface SceneState {
  isInitialized: boolean
  localSquad: GolemConfig[] | null
}

export const sceneState: SceneState = {
  isInitialized: true,
  localSquad: null
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

