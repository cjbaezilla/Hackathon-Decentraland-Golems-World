import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { getHeatRadarState, getIsBigMapOpen } from '../state'
import { COLLECTABLE_ITEMS } from '../config/items'
import { getPlayerMapState } from '../utils/mapUtils'
import { getLanguage, getLocalizedRarity, t } from '../i18n'

/**
 * ============================================================================
 * COMPONENTE DE RADAR DE CALOR / SONAR 2D (REACT-ECS UI - 200x200 PX)
 * ============================================================================
 * Rediseñado como una caja cuadrada de 200px × 200px (idéntica al Minimapa HUD).
 * Ubicado en la esquina superior derecha, inmediatamente a la izquierda del minimapa.
 * 
 * Corrección de Proyección Vectorial:
 * - Centrado exacto en la retícula de 140x140px (Centro = 70, 70).
 * - Proyección vectorial de orientación (Ahead / Right) garantizando alineación
 *   perfecta entre el punto palpitante (blip) y la lectura del medidor de distancia.
 */
export const HeatRadarWidget = () => {
  if (getIsBigMapOpen()) return null

  const radar = getHeatRadarState()
  const dist = radar.distance
  const isDetected = dist <= 30.0

  // Configuración de visualización según cercanía
  let themeColor = Color4.create(0.2, 0.5, 0.8, 1.0) // Azul frío (inactivo)
  let statusBadge = '>30m'
  let itemTitle = t('radar.activeScan')
  let pulseSpeed = 2.0

  if (dist <= 4.0) {
    themeColor = Color4.create(1.0, 0.25, 0.1, 1.0) // Rojo/Dorado emisivo (proximidad inmediata)
    statusBadge = `🔥 ${dist.toFixed(1)}m`
    pulseSpeed = 12.0
  } else if (dist <= 15.0) {
    themeColor = Color4.create(1.0, 0.55, 0.1, 1.0) // Naranja cálido
    statusBadge = `⚡ ${dist.toFixed(1)}m`
    pulseSpeed = 6.0
  } else if (dist <= 30.0) {
    themeColor = Color4.create(0.9, 0.9, 0.2, 1.0) // Amarillo templado
    statusBadge = `📡 ${dist.toFixed(1)}m`
    pulseSpeed = 3.0
  }

  // Nombre y rareza del objeto detectado objetivo
  if (isDetected && radar.itemId) {
    const itemConfig = COLLECTABLE_ITEMS[radar.itemId]
    if (itemConfig) {
      itemTitle = getLanguage() === 'en' ? itemConfig.nameEn : itemConfig.nameEs
    }
  }

  // Animación de barrido de onda de sonar
  const now = Date.now()
  const wave1Percent = (now / 18) % 100
  const wave1Size = (wave1Percent / 100) * 136
  const wave1Alpha = (1 - wave1Percent / 100) * 0.4

  const wave2Percent = (now / 18 + 50) % 100
  const wave2Size = (wave2Percent / 100) * 136
  const wave2Alpha = (1 - wave2Percent / 100) * 0.4

  // Animación de palpitar del blip
  const blipPulse = 0.35 + 0.65 * Math.abs(Math.sin((now / 1000) * pulseSpeed))
  const blipColor = Color4.create(themeColor.r, themeColor.g, themeColor.b, blipPulse)

  // PROYECCIÓN VECTORIAL EXACTA DEL OBJETIVO OBJETIVO
  let blipVisible = isDetected
  let blipLeft = 64
  let blipTop = 64

  if (isDetected && radar.itemX !== 0 && radar.itemZ !== 0) {
    const playerMap = getPlayerMapState()

    // Vector relativo desde el avatar hasta el ítem objetivo
    const dx = radar.itemX - playerMap.x
    const dz = radar.itemZ - playerMap.z
    const realDist = Math.sqrt(dx * dx + dz * dz)

    // Vector de orientación del avatar (forwardX / forwardZ)
    // En mapUtils: dirX = forwardX, dirY = -forwardZ (Norte es +Z en 3D)
    const uFx = playerMap.dirX
    const uFz = -playerMap.dirY
    const lenF = Math.sqrt(uFx * uFx + uFz * uFz) || 1

    const normFx = uFx / lenF
    const normFz = uFz / lenF

    // Proyección escalar en los ejes Adelante/Atrás y Derecha/Izquierda
    const aheadMeters = dx * normFx + dz * normFz
    const rightMeters = dx * normFz - dz * normFx

    // Mapeo preciso al radio del lienzo de 140x140px (Centro = 70, 70, Radio Máximo 30m = 60px)
    const effectiveDist = realDist > 0 ? realDist : dist
    const clampedDistRatio = Math.min(1.0, effectiveDist / 30.0)
    const scaleRatio = effectiveDist > 0 ? (clampedDistRatio * 60.0) / effectiveDist : 0

    const screenX = 70 + rightMeters * scaleRatio
    const screenY = 70 - aheadMeters * scaleRatio

    blipLeft = screenX - 6
    blipTop = screenY - 6
  }

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 80, right: 238 },
        width: 200,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: { top: 6, bottom: 6, left: 6, right: 6 },
        pointerFilter: 'none'
      }}
      uiBackground={{
        color: Color4.create(0.06, 0.08, 0.13, 0.94)
      }}
    >
      {/* 1. Cabecera Táctica del Radar: Título y Lectura de Distancia */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 22,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { left: 4, right: 4 }
        }}
      >
        <UiEntity
          uiTransform={{ height: 18 }}
          uiText={{
            value: t('radar.title'),
            fontSize: 10,
            color: Color4.create(0.85, 0.9, 0.95, 0.9),
            textAlign: 'middle-left'
          }}
        />
        <UiEntity
          uiTransform={{
            padding: { left: 6, right: 6, top: 1, bottom: 1 }
          }}
          uiBackground={{
            color: Color4.create(themeColor.r * 0.3, themeColor.g * 0.3, themeColor.b * 0.3, 0.85)
          }}
          uiText={{
            value: statusBadge,
            fontSize: 10,
            color: themeColor,
            textAlign: 'middle-right'
          }}
        />
      </UiEntity>

      {/* 2. Pantalla Circular del Sonar (Lienzo Táctico 140x140 px) */}
      <UiEntity
        uiTransform={{
          width: 140,
          height: 140,
          positionType: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.03, 0.05, 0.08, 0.95)
        }}
      >
        {/* Anillo Exterior de Rango 30m (Diámetro 120px) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 10, top: 10 },
            width: 120,
            height: 120,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(themeColor.r * 0.25, themeColor.g * 0.25, themeColor.b * 0.25, 0.3)
          }}
        />

        {/* Anillo Intermedio de Rango 20m (Diámetro 80px) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 30, top: 30 },
            width: 80,
            height: 80,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(themeColor.r * 0.3, themeColor.g * 0.3, themeColor.b * 0.3, 0.25)
          }}
        />

        {/* Anillo Interior de Rango 10m (Diámetro 40px) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 50, top: 50 },
            width: 40,
            height: 40,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(themeColor.r * 0.35, themeColor.g * 0.35, themeColor.b * 0.35, 0.3)
          }}
        />

        {/* Zona de Recolección Inmediata 4m (Diámetro 16px) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 62, top: 62 },
            width: 16,
            height: 16,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(themeColor.r, themeColor.g, themeColor.b, 0.4)
          }}
        />

        {/* Eje de Cruz Horizontal */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 0, top: 69.5 },
            width: 140,
            height: 1,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.3, 0.45, 0.6, 0.35)
          }}
        />

        {/* Eje de Cruz Vertical */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 69.5, top: 0 },
            width: 1,
            height: 140,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.3, 0.45, 0.6, 0.35)
          }}
        />

        {/* Indicador Frontal Táctico (FRENTE / VISTA JUGADOR) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 66, top: 2 },
            width: 8,
            height: 4,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.4, 0.9, 1.0, 0.8)
          }}
        />

        {/* Onda expansiva de sonar 1 */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: {
              left: Math.round(70 - wave1Size / 2),
              top: Math.round(70 - wave1Size / 2)
            },
            width: Math.round(wave1Size),
            height: Math.round(wave1Size),
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(themeColor.r, themeColor.g, themeColor.b, wave1Alpha)
          }}
        />

        {/* Onda expansiva de sonar 2 */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: {
              left: Math.round(70 - wave2Size / 2),
              top: Math.round(70 - wave2Size / 2)
            },
            width: Math.round(wave2Size),
            height: Math.round(wave2Size),
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(themeColor.r, themeColor.g, themeColor.b, wave2Alpha)
          }}
        />

        {/* Marcador del Jugador en el Centro (Punto Blanco/Cian Fijo) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { left: 67, top: 67 },
            width: 6,
            height: 6,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(1.0, 1.0, 1.0, 0.95)
          }}
        />

        {/* PUNTO PALPITANTE DEL OBJETIVO OBJETIVO (TARGET BLIP) */}
        {blipVisible && (
          <UiEntity
            uiTransform={{
              positionType: 'absolute',
              position: {
                left: Math.round(blipLeft),
                top: Math.round(blipTop)
              },
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'none'
            }}
            uiBackground={{
              color: blipColor
            }}
          >
            {/* Núcleo Interior Blanco emisivo */}
            <UiEntity
              uiTransform={{
                width: 4,
                height: 4,
                pointerFilter: 'none'
              }}
              uiBackground={{
                color: Color4.create(1.0, 1.0, 1.0, 1.0)
              }}
            />
          </UiEntity>
        )}
      </UiEntity>

      {/* 3. Etiqueta Inferior: Identificación de Material y Rareza */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 22,
          justifyContent: 'center',
          alignItems: 'center',
          padding: { left: 2, right: 2 }
        }}
        uiBackground={{
          color: Color4.create(0.04, 0.06, 0.1, 0.9)
        }}
      >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 18
          }}
          uiText={{
            value: isDetected
              ? `${itemTitle.toUpperCase()} (${getLocalizedRarity(radar.rarity).toUpperCase()})`
              : itemTitle,
            fontSize: 10,
            color: isDetected ? themeColor : Color4.create(0.6, 0.7, 0.8, 0.75),
            textAlign: 'middle-center'
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}
