import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { GolemAffinity } from './config/golems'
import { t, toggleLanguage, getLanguage } from './i18n'
import { getPlayerLocationInfo } from './utils/location'

/**
 * ============================================================================
 * INTERFAZ DE USUARIO 2D (REACT-ECS) - BASE LIMPIA Y MULTILINGÜE
 * ============================================================================
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 * El contenedor raíz utiliza `pointerFilter: 'none'` para garantizar que los controles táctiles,
 * joysticks móviles y clics en el mundo 3D funcionen sin interferencias.
 * Incluye HUD de Tilemap/Ubicación en tiempo real y selector de idioma en zona segura superior derecha.
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
 * Componente Indicador de Ubicación y Tilemap en Tiempo Real (Mobile-First / HUD)
 * Muestra:
 * - Parcela actual del grid 25x25 (de [0,0] a [24,24]).
 * - Coordenadas métricas exactas (X, Z).
 * - Nombre y símbolo del Distrito o Zona actual.
 */
export const LocationIndicator = () => {
  const loc = getPlayerLocationInfo()

  return (
    <UiEntity
      uiTransform={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: { top: 6, bottom: 6, left: 16, right: 16 },
        margin: { right: 12 },
        minWidth: 340,
        height: 52,
        pointerFilter: 'none'
      }}
      uiBackground={{
        color: Color4.create(0.08, 0.10, 0.14, 0.92)
      }}
    >
      {/* Fila 1: Tilemap / Parcela y Coordenadas Métricas */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20
        }}
        uiText={{
          value: `🗺️ ${t('common.parcel')} [${loc.parcelX}, ${loc.parcelZ}] • X: ${loc.x.toFixed(1)}m | Z: ${loc.z.toFixed(1)}m`,
          fontSize: 14,
          color: Color4.create(1.0, 0.85, 0.35, 1.0),
          textAlign: 'middle-left'
        }}
      />
      {/* Fila 2: Distrito / Zona Activa */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20
        }}
        uiText={{
          value: `${loc.zoneIcon} ${loc.zoneName}`,
          fontSize: 13,
          color: Color4.create(0.40, 0.90, 1.0, 1.0),
          textAlign: 'middle-left'
        }}
      />
    </UiEntity>
  )
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
        width: 140,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.12, 0.14, 0.18, 0.92)
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
 * Barra Superior Derecha (Safe Area) que agrupa el HUD de Ubicación y el Selector de Idioma.
 */
export const TopHeaderBar = () => {
  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 20, right: 28 },
        flexDirection: 'row',
        alignItems: 'center',
        pointerFilter: 'none'
      }}
    >
      {/* Indicador de Tilemap / Parcela y Coordenadas */}
      <LocationIndicator />

      {/* Selector de Idioma */}
      <LanguageToggle />
    </UiEntity>
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
      {/* Barra Superior con Indicador de Tilemap y Selector de Idioma */}
      <TopHeaderBar />

      {/* Contenedor principal de interfaz limpio */}
    </UiEntity>
  )
}