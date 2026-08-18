import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

/**
 * Inicialización de la Interfaz de Usuario 2D (React-ECS).
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 */
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * Componente raíz de UI.
 * Actualmente vacío y limpio, listo para construir la interfaz de la experiencia.
 */
export const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: '100%',
      height: '100%',
      pointerFilter: 'none'
    }}
  />
)