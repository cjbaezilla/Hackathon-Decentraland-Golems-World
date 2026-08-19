import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { GolemAffinity } from './config/golems'

/**
 * ============================================================================
 * INTERFAZ DE USUARIO 2D (REACT-ECS) - BASE LIMPIA
 * ============================================================================
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 * El contenedor raíz utiliza `pointerFilter: 'none'` para garantizar que los controles táctiles,
 * joysticks móviles y clics en el mundo 3D funcionen sin interferencias.
 */
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * Devuelve un icono elemental representativo según la afinidad del golem.
 */
export function getAffinityIcon(affinity: string): string {
  switch (affinity) {
    case GolemAffinity.STEAM:
    case 'Vapor':
      return '♨️'
    case GolemAffinity.GALVANIC:
    case 'Galvánico':
      return '⚡'
    case GolemAffinity.MECHANICAL:
    case 'Mecánico':
      return '⚙️'
    case GolemAffinity.LUMINOUS:
    case 'Luminoso':
      return '☀️'
    case GolemAffinity.AETHER:
    case 'Éter':
      return '🔮'
    default:
      return '🤖'
  }
}

/**
 * Componente raíz de UI limpio, listo para albergar los subsistemas del juego final
 * (Radar térmico, Forja de Golems, Inventario de Chatarra, Escuadrón y Misiones).
 */
export const uiComponent = () => {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        pointerFilter: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      {/* Contenedor principal de interfaz limpio */}
    </UiEntity>
  )
}