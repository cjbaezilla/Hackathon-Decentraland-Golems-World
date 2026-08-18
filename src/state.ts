/**
 * ============================================================================
 * ESTADO LOCAL Y GLOBAL DE LA ESCENA
 * ============================================================================
 * Archivo destinado a almacenar variables de estado, componentes ECS y datos
 * reactivos compartidos para la lógica de la experiencia.
 */

export interface SceneState {
  isInitialized: boolean
}

export const sceneState: SceneState = {
  isInitialized: true
}
