import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { isMobile } from '@dcl/sdk/platform'
import { getIsBigMapOpen, getIsInventoryOpen, toggleInventory } from '../state'
import { t } from '../i18n'

/**
 * ============================================================================
 * COMPONENTE DE BARRA DE ACCIÓN (DESKTOP UI)
 * ============================================================================
 * Posicionado directamente debajo del Minimapa HUD en la esquina superior derecha:
 * - Minimapa: top: 80px, right: 28px, height: 200px (termina en top: 280px).
 * - Barra de Botones: top: 286px, right: 28px.
 * - Justificación a la derecha (`flexDirection: 'row'`, `justifyContent: 'flex-end'`).
 * - El icono de mochila es el primer botón (extremo derecho). Próximos iconos
 *   añadidos a la fila se posicionarán automáticamente a la izquierda de la mochila.
 * - En dispositivos móviles (isMobile), esta barra se oculta ya que el usuario utiliza
 *   el botón táctil nativo "F" para abrir el inventario.
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

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 286, right: 28 },
        width: 200,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pointerFilter: 'none'
      }}
    >
      {/* 
        LISTA DE BOTONES DE ACCIÓN:
        Para agregar más iconos a la izquierda en el futuro, simplemente inserta 
        los nuevos componentes <ActionIconButton /> antes del botón de mochila.
      */}

      {/* Primer Icono (Extremo Derecho): Mochila / Inventario */}
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

