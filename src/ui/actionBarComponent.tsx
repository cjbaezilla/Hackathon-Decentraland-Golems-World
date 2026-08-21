import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { isMobile } from '@dcl/sdk/platform'
import {
  getIsBigMapOpen,
  getIsInventoryOpen,
  toggleInventory,
  getIsGolemInventoryOpen,
  toggleGolemInventory
} from '../state'
import { t } from '../i18n'

/**
 * ============================================================================
 * COMPONENTE DE BARRA DE ACCIÓN (DESKTOP UI)
 * ============================================================================
 * Posicionado directamente debajo del Minimapa HUD en la esquina superior derecha:
 * - Minimapa: top: 80px, right: 28px, height: 200px (termina en top: 280px).
 * - Barra de Botones: top: 286px, right: 28px.
 * - Justificación a la derecha (`flexDirection: 'row'`, `justifyContent: 'flex-end'`).
 * - El icono del robot (golem_icon.png) se coloca a la izquierda de la mochila (backpack_icon.png).
 * - En dispositivos móviles (isMobile), esta barra se oculta ya que el usuario utiliza
 *   los botones táctiles nativos del touchpad (1 y F).
 */

/**
 * Botón individual estilizado de la Barra de Acción Steampunk
 */
export interface ActionIconButtonProps {
  icon?: string
  textureSrc?: string
  tooltip?: string
  isActive: boolean
  onClick: () => void
  keyId: string
}

export const ActionIconButton = ({ icon, textureSrc, tooltip, isActive, onClick, keyId }: ActionIconButtonProps) => {
  return (
    <UiEntity
      key={keyId}
      uiTransform={{
        width: 48,
        height: 48,
        margin: { left: 8 },
        justifyContent: 'center',
        alignItems: 'center',
        padding: { top: 2, bottom: 2, left: 2, right: 2 },
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: isActive
          ? Color4.create(1.0, 0.85, 0.3, 0.95) // Resplandor dorado activo
          : Color4.create(0.12, 0.16, 0.22, 0.92)  // Fondo base
      }}
      onMouseDown={() => onClick()}
    >
      {textureSrc ? (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            pointerFilter: 'none'
          }}
          uiBackground={{
            texture: { src: textureSrc },
            textureMode: 'stretch'
          }}
        />
      ) : (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'none'
          }}
          uiText={{
            value: icon || '',
            fontSize: 26,
            textAlign: 'middle-center'
          }}
        />
      )}
    </UiEntity>
  )
}


/**
 * Widget de Barra de Acción para Desktop (Debajo del Minimapa, justificado a la derecha)
 */
export const DesktopActionBarWidget = () => {
  if (getIsBigMapOpen() || isMobile()) return null

  const isInventoryOpen = getIsInventoryOpen()
  const isGolemInventoryOpen = getIsGolemInventoryOpen()

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 286, right: 28 },
        width: 240,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pointerFilter: 'none'
      }}
    >
      {/* Botón de Robot / Reserva de Golems (Aparece a la IZQUIERDA de la mochila) */}
      <ActionIconButton
        keyId="btn_golem_inventory"
        textureSrc="assets/images/golem_icon.png"
        tooltip={t('golemInventory.robotTooltip')}
        isActive={isGolemInventoryOpen}
        onClick={() => toggleGolemInventory()}
      />

      {/* Botón de Mochila / Inventario de Chatarra (Extremo Derecho) */}
      <ActionIconButton
        keyId="btn_backpack_inventory"
        textureSrc="assets/images/backpack_icon.png"
        tooltip={t('inventory.backpackTooltip')}
        isActive={isInventoryOpen}
        onClick={() => toggleInventory()}
      />
    </UiEntity>
  )
}




