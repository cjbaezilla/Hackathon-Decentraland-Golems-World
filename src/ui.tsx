import ReactEcs, { ReactEcsRenderer, UiEntity, Label } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
import { GolemFollowerComponent } from './components/follower'
import { getConnectedPlayersCount } from './multiplayer'
import { getLocalActiveSquad } from './state'
import { GolemAffinity } from './config/golems'

/**
 * Inicialización de la Interfaz de Usuario 2D (React-ECS).
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 */
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * Obtiene el conteo total de golems seguidores activos en el cliente local.
 */
function getActiveGolemsCount(): number {
  let count = 0
  for (const [_entity] of engine.getEntitiesWith(GolemFollowerComponent)) {
    count++
  }
  return count
}

/**
 * Devuelve un icono o prefijo visual según la afinidad del golem.
 */
function getAffinityIcon(affinity: string): string {
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
 * Componente raíz de UI con panel HUD de estado multijugador y escuadrón asignado en zona segura superior.
 */
export const uiComponent = () => {
  const playersCount = getConnectedPlayersCount()
  const golemsCount = getActiveGolemsCount()
  const localSquad = getLocalActiveSquad()

  const squadSummary = localSquad
    ? localSquad.map((g) => `${getAffinityIcon(g.affinity)} ${g.affinity}`).join('  |  ')
    : 'Generando escuadrón...'

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
      {/* HUD Multijugador Superior (Zona Segura Mobile-First) */}
      <UiEntity
        uiTransform={{
          width: 560,
          height: 90,
          margin: { top: 16 },
          padding: { top: 6, bottom: 6, left: 16, right: 16 },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.08, 0.1, 0.14, 0.88)
        }}
      >
        <Label
          value="🤖 GOLEMS' WORLD · MULTIJUGADOR P2P"
          fontSize={15}
          color={Color4.create(1.0, 0.75, 0.2, 1.0)}
          uiTransform={{
            height: 20,
            margin: { bottom: 2 }
          }}
        />
        <Label
          value={`👥 Jugadores: ${playersCount}  |  ⚡ Golems activos: ${golemsCount}`}
          fontSize={13}
          color={Color4.create(0.85, 0.9, 0.95, 1.0)}
          uiTransform={{
            height: 18,
            margin: { bottom: 2 }
          }}
        />
        <Label
          value={`Tu Escuadrón (3 Tipos): ${squadSummary}`}
          fontSize={13}
          color={Color4.create(0.3, 0.9, 0.6, 1.0)}
          uiTransform={{
            height: 18
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}