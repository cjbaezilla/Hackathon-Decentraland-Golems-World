import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { GolemAffinity } from './config/golems'
import { t, toggleLanguage, getLanguage } from './i18n'

/**
 * ============================================================================
 * INTERFAZ DE USUARIO 2D (REACT-ECS) - BASE LIMPIA Y MULTILINGÜE
 * ============================================================================
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 * El contenedor raíz utiliza `pointerFilter: 'none'` para garantizar que los controles táctiles,
 * joysticks móviles y clics en el mundo 3D funcionen sin interferencias.
 * Incluye selector táctil de idioma (ES / EN) en zona segura superior derecha.
 */
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * Devuelve un icono elemental representativo según la afinidad del golem.
 */
export function getAffinityIcon(affinity: string): string {
  switch (affinity.toLowerCase()) {
    case 'vapor':
    case 'steam':
    case GolemAffinity.STEAM.toLowerCase():
      return '♨️'
    case 'galvánico':
    case 'galvanico':
    case 'galvanic':
    case GolemAffinity.GALVANIC.toLowerCase():
      return '⚡'
    case 'mecánico':
    case 'mecanico':
    case 'mechanical':
    case GolemAffinity.MECHANICAL.toLowerCase():
      return '⚙️'
    case 'luminoso':
    case 'luminous':
    case GolemAffinity.LUMINOUS.toLowerCase():
      return '☀️'
    case 'éter':
    case 'eter':
    case 'aether':
    case GolemAffinity.AETHER.toLowerCase():
      return '🔮'
    default:
      return '🤖'
  }
}

/**
 * Componente Selector de Idioma Táctil (Mobile-First / Safe Area)
 */
export const LanguageToggle = () => {
  const currentLang = getLanguage()
  const isEs = currentLang === 'es'

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 24, right: 32 },
        width: 140,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.12, 0.12, 0.16, 0.88)
      }}
      onMouseDown={() => {
        toggleLanguage()
      }}
      uiText={{
        value: isEs ? '🌐 ES | en' : '🌐 es | EN',
        fontSize: 18,
        color: isEs ? Color4.create(1.0, 0.85, 0.3, 1.0) : Color4.create(0.4, 0.9, 1.0, 1.0)
      }}
    />
  )
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
      {/* Selector de Idioma Global */}
      <LanguageToggle />

      {/* Contenedor principal de interfaz limpio */}
    </UiEntity>
  )
}