import ReactEcs, { ReactEcsRenderer, UiEntity, Label } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
import { GolemFollowerComponent } from './components/follower'
import { getConnectedPlayersCount } from './multiplayer'

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
 * Componente raíz de UI con panel HUD de estado multijugador ubicado en zona segura superior.
 */
export const uiComponent = () => {
  const playersCount = getConnectedPlayersCount()
  const golemsCount = getActiveGolemsCount()

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
          width: 480,
          height: 70,
          margin: { top: 20 },
          padding: { top: 8, bottom: 8, left: 16, right: 16 },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.08, 0.1, 0.14, 0.85)
        }}
      >
        <Label
          value="🤖 GOLEMS' WORLD · MULTIJUGADOR P2P"
          fontSize={16}
          color={Color4.create(1.0, 0.75, 0.2, 1.0)}
          uiTransform={{
            height: 22,
            margin: { bottom: 2 }
          }}
        />
        <Label
          value={`👥 Jugadores: ${playersCount}  |  ⚡ Golems en escena: ${golemsCount}`}
          fontSize={14}
          color={Color4.create(0.85, 0.9, 0.95, 1.0)}
          uiTransform={{
            height: 20
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}