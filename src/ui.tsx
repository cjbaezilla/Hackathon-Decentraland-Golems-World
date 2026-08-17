import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { localUiState, sceneMessageBus, addUiEvent } from './state'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiMenu, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * HUD React-ECS optimizado para pantallas táctiles y móviles (Mobile First).
 * - Anclado en la esquina superior derecha (positionType: 'absolute', top: 20, right: 20)
 *   para evitar el joystick móvil, la barra de chat de escritorio y los botones de salto.
 * - Dimensiones compactas para pantalla panorámica (landscape) móvil.
 * - Soporte para minimizar/expandir el panel en cualquier momento.
 */
export const uiMenu = () => (
  // 1. Root a pantalla completa requerido para posicionamiento absoluto confiable
  <UiEntity
    uiTransform={{
      width: '100%',
      height: '100%'
    }}
  >
    {/* 2. Tarjeta principal del HUD anclada arriba a la derecha */}
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 20, right: 20 },
        width: localUiState.isHudCollapsed ? 260 : 340,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 12,
        borderRadius: 14
      }}
      uiBackground={{
        color: Color4.create(0.06, 0.08, 0.14, 0.92)
      }}
    >
      {/* Cabecera compacta con Estado de Red y Botón Colapsar */}
      <UiEntity
        uiTransform={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          margin: { bottom: localUiState.isHudCollapsed ? 0 : 8 }
        }}
      >
        <Label
          value={localUiState.isSynced ? '🟢 MULTIJUGADOR P2P' : '🟡 CONECTANDO...'}
          fontSize={13}
          color={localUiState.isSynced ? Color4.create(0.2, 0.9, 0.5, 1) : Color4.create(1, 0.8, 0.2, 1)}
          uiTransform={{ height: 22 }}
        />

        <Button
          value={localUiState.isHudCollapsed ? '➕' : '➖'}
          variant="secondary"
          fontSize={14}
          uiTransform={{ width: 38, height: 30, borderRadius: 6 }}
          onMouseDown={() => {
            localUiState.isHudCollapsed = !localUiState.isHudCollapsed
          }}
        />
      </UiEntity>

      {/* Contenido detallado visible cuando está expandido */}
      {!localUiState.isHudCollapsed && (
        <UiEntity
          uiTransform={{
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {/* Métricas clave en tarjeta interior */}
          <UiEntity
            uiTransform={{
              flexDirection: 'column',
              padding: 8,
              borderRadius: 8,
              margin: { bottom: 8 }
            }}
            uiBackground={{ color: Color4.create(0.12, 0.15, 0.22, 0.9) }}
          >
            <Label
              value={`👥 Jugadores: ${localUiState.activePlayersCount}`}
              fontSize={13}
              color={Color4.White()}
              uiTransform={{ margin: { bottom: 2 } }}
            />
            <Label
              value={`⚡ Contador Global: ${localUiState.beaconCount}`}
              fontSize={14}
              color={Color4.create(0.4, 0.8, 1, 1)}
              uiTransform={{ margin: { bottom: 2 } }}
            />
            <Label
              value={`🎨 Color: ${localUiState.currentColorName}`}
              fontSize={12}
              color={Color4.create(0.9, 0.8, 0.4, 1)}
              uiTransform={{ margin: { bottom: 2 } }}
            />
            <Label
              value={`👤 Último: ${localUiState.lastPlayerName}`}
              fontSize={11}
              color={Color4.create(0.7, 0.75, 0.85, 1)}
            />
          </UiEntity>

          {/* Botón táctil para difundir onda global */}
          <Button
            value="🎉 ENVIAR REACCIÓN"
            variant="primary"
            fontSize={13}
            uiTransform={{
              width: '100%',
              height: 40,
              borderRadius: 8,
              margin: { bottom: 8 }
            }}
            onMouseDown={() => {
              const reactionPayload = {
                sender: 'Móvil ' + Math.floor(Math.random() * 900 + 100),
                emoji: '✨',
                timestamp: Date.now()
              }
              sceneMessageBus.emit('reaction', reactionPayload)
              addUiEvent(`🎉 Enviaste una reacción global`)
            }}
          />

          {/* Registro de Actividad Reciente */}
          <UiEntity
            uiTransform={{
              flexDirection: 'column',
              padding: 6,
              borderRadius: 6
            }}
            uiBackground={{ color: Color4.create(0.04, 0.05, 0.09, 0.85) }}
          >
            <Label
              value="📢 Actividad Reciente:"
              fontSize={11}
              color={Color4.create(0.6, 0.65, 0.75, 1)}
              uiTransform={{ margin: { bottom: 2 } }}
            />
            {localUiState.recentEvents.slice(0, 3).map((evt, idx) => (
              <Label
                key={`evt-${idx}`}
                value={`• ${evt}`}
                fontSize={11}
                color={idx === 0 ? Color4.create(0.3, 1, 0.6, 1) : Color4.create(0.8, 0.85, 0.9, 1)}
                uiTransform={{ margin: { bottom: 1 } }}
              />
            ))}
          </UiEntity>
        </UiEntity>
      )}
    </UiEntity>
  </UiEntity>
)