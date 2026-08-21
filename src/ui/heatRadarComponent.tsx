import ReactEcs, { UiEntity, Label } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { getHeatRadarState, getIsBigMapOpen } from '../state'
import { COLLECTABLE_ITEMS } from '../config/items'

/**
 * ============================================================================
 * COMPONENTE DE RADAR DE CALOR (REACT-ECS UI / HUD MOBILE-FIRST)
 * ============================================================================
 * Muestra el gradiente térmico de proximidad a materiales coleccionables.
 * Ubicado en la esquina superior derecha, inmediatamente a la izquierda del minimapa.
 * - > 30m: Sensor inactivo (Azul frío).
 * - 15m - 30m: Latido medio (Amarillo cálido).
 * - 4m - 15m: Pulso rápido (Naranja / Rojo).
 * - < 4m: Proximidad inmediata (Dorado / Cyan emisivo).
 */
export const HeatRadarWidget = () => {
  if (getIsBigMapOpen()) return null

  const radar = getHeatRadarState()
  const dist = radar.distance

  // Determinar color y estado térmico
  let bgColor = Color4.create(0.05, 0.12, 0.22, 0.92)
  let statusText = 'RADAR TÉRMICO: INACTIVO (>30m)'
  let statusColor = Color4.create(0.4, 0.6, 0.8, 1)
  let pulseDotColor = Color4.create(0.2, 0.5, 1, 1)

  if (dist <= 4.0) {
    const itemConfig = COLLECTABLE_ITEMS[radar.itemId]
    const itemName = itemConfig ? itemConfig.nameEs : 'Material'
    bgColor = Color4.create(0.22, 0.05, 0.0, 0.95)
    statusText = `🔥 ¡OBJETO DETECTADO! ${itemName.toUpperCase()} (${radar.rarity.toUpperCase()})`
    statusColor = Color4.create(1, 0.85, 0.1, 1)
    pulseDotColor = Color4.create(1, 0.2, 0, 1)
  } else if (dist <= 15.0) {
    bgColor = Color4.create(0.25, 0.09, 0.0, 0.93)
    statusText = `⚡ RADAR CÁLIDO: Objeto a ~${Math.round(dist)}m`
    statusColor = Color4.create(1, 0.5, 0.1, 1)
    pulseDotColor = Color4.create(1, 0.4, 0, 1)
  } else if (dist <= 30.0) {
    bgColor = Color4.create(0.20, 0.18, 0.02, 0.92)
    statusText = `📡 RADAR TEMPLADO: Señal a ~${Math.round(dist)}m`
    statusColor = Color4.create(0.9, 0.9, 0.2, 1)
    pulseDotColor = Color4.create(0.9, 0.9, 0, 1)
  }

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 80, right: 240 },
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: { top: 8, bottom: 8, left: 14, right: 16 },
        minWidth: 310,
        height: 48,
        pointerFilter: 'none'
      }}
      uiBackground={{
        color: bgColor
      }}
    >
      {/* Indicador de Pulso Térmico (Punto Emisivo) */}
      <UiEntity
        uiTransform={{
          width: 14,
          height: 14,
          margin: { right: 12 },
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: pulseDotColor
        }}
      />

      {/* Etiqueta del Estado del Radar */}
      <Label
        value={statusText}
        fontSize={14}
        color={statusColor}
        uiTransform={{
          pointerFilter: 'none'
        }}
      />
    </UiEntity>
  )
}
