import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { t, getLanguage } from '../i18n'
import { getIsBigMapOpen, toggleBigMap } from '../state'
import { getPlayerLocationInfo } from '../utils/location'
import { getPlayerMapState, getConeOffsets } from '../utils/mapUtils'

/**
 * ============================================================================
 * COMPONENTE DE MINIMAPA Y MAPA COMPLETO (REACT-ECS SDK7)
 * ============================================================================
 * Arquitectura Mobile-First optimizada para resolución virtual de móviles (1600x720)
 * y escritorio (1920x1080):
 * 1. Minimapa HUD compacto en la esquina superior derecha (debajo de TopHeaderBar).
 * 2. Textura dinámica bilingüe (minimap.jpg en ES, minimap_en.jpg en EN).
 * 3. Seguimiento en tiempo real con Glowing Dot y Cono de Visión 360° (Sight Cone).
 * 4. Modal de Mapa Grande en formato apaisado (2 columnas, altura 480px) para
 *    garantizar que jamás se corte ni desborde en pantallas móviles.
 */

export function getMinimapTextureSrc(): string {
  return getLanguage() === 'en' ? 'assets/images/minimap_en.jpg' : 'assets/images/minimap.jpg'
}

/**
 * Rastreador del Jugador en el Minimapa HUD (Glowing Dot + Sight Cone)
 */
export const MinimapPlayerTracker = () => {
  const mapState = getPlayerMapState()
  const conePoints = getConeOffsets(16, mapState.headingAngleRad)

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: {
          left: `${mapState.percentX}%`,
          top: `${mapState.percentY}%`
        },
        width: 1,
        height: 1,
        pointerFilter: 'none'
      }}
    >
      {/* Halo Exterior Resplandeciente */}
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { left: -7, top: -7 },
          width: 14,
          height: 14,
          justifyContent: 'center',
          alignItems: 'center',
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.0, 0.85, 1.0, 0.5)
        }}
      >
        {/* Núcleo Interior Blanco */}
        <UiEntity
          uiTransform={{
            width: 5,
            height: 5,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(1.0, 1.0, 1.0, 1.0)
          }}
        />
      </UiEntity>

      {/* Cono de Visión 360° (Sight Cone) */}
      {conePoints.map((pt, idx) => (
        <UiEntity
          key={`cone_mini_${idx}`}
          uiTransform={{
            positionType: 'absolute',
            position: {
              left: Math.round(pt.offsetX - pt.size / 2),
              top: Math.round(pt.offsetY - pt.size / 2)
            },
            width: pt.size,
            height: pt.size,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.1, 0.95, 1.0, pt.opacity)
          }}
        />
      ))}
    </UiEntity>
  )
}

/**
 * Rastreador del Jugador en el Modal de Mapa Grande (Glowing Dot + Sight Cone + Tooltip)
 */
export const BigMapPlayerTracker = () => {
  const mapState = getPlayerMapState()
  const conePoints = getConeOffsets(22, mapState.headingAngleRad)

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: {
          left: `${mapState.percentX}%`,
          top: `${mapState.percentY}%`
        },
        width: 1,
        height: 1,
        pointerFilter: 'none'
      }}
    >
      {/* Halo Exterior Pulsante */}
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { left: -10, top: -10 },
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.0, 0.9, 1.0, 0.45)
        }}
      >
        {/* Anillo Intermedio Cian */}
        <UiEntity
          uiTransform={{
            width: 10,
            height: 10,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.0, 0.8, 1.0, 0.85)
          }}
        >
          {/* Núcleo Interior Blanco */}
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
      </UiEntity>

      {/* Cono de Visión Radiante */}
      {conePoints.map((pt, idx) => (
        <UiEntity
          key={`cone_big_${idx}`}
          uiTransform={{
            positionType: 'absolute',
            position: {
              left: Math.round(pt.offsetX - pt.size / 2),
              top: Math.round(pt.offsetY - pt.size / 2)
            },
            width: pt.size,
            height: pt.size,
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.2, 0.95, 1.0, pt.opacity)
          }}
        />
      ))}

      {/* Etiqueta Flotante sobre el Avatar */}
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { left: -28, top: -22 },
          width: 56,
          height: 14,
          justifyContent: 'center',
          alignItems: 'center',
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.05, 0.08, 0.12, 0.92)
        }}
      >
        <UiEntity
          uiTransform={{ width: '100%', height: '100%' }}
          uiText={{
            value: `📍 ${t('map.playerTooltip')}`,
            fontSize: 9,
            color: Color4.create(1.0, 0.9, 0.4, 1.0),
            textAlign: 'middle-center'
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}

/**
 * Widget de Minimapa Compacto en la Esquina Superior Derecha (HUD)
 * Posicionado en `{ top: 80, right: 28 }` debajo de TopHeaderBar.
 */
export const MinimapWidget = () => {
  const isBigOpen = getIsBigMapOpen()
  if (isBigOpen) return null

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 80, right: 28 },
        width: 200,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { top: 3, bottom: 3, left: 3, right: 3 },
        pointerFilter: 'none'
      }}
      uiBackground={{
        color: Color4.create(0.08, 0.10, 0.15, 0.95)
      }}
    >
      {/* Contenedor del Mapa con Textura Bilingüe */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          positionType: 'relative',
          pointerFilter: 'none'
        }}
        uiBackground={{
          texture: { src: getMinimapTextureSrc() },
          textureMode: 'stretch'
        }}
      >
        {/* Rastreador del Jugador */}
        <MinimapPlayerTracker />

        {/* Botón Táctil de Ampliación (⛶) */}
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { top: 4, right: 4 },
            width: 34,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.12, 0.18, 0.28, 0.92)
          }}
          onMouseDown={() => {
            toggleBigMap()
          }}
          uiText={{
            value: '⛶',
            fontSize: 16,
            color: Color4.create(1.0, 0.85, 0.35, 1.0)
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}

/**
 * Modal de Mapa Grande Ampliado con Fondo Semitransparente (Mobile-First Landscape / 2 Columnas)
 * Diseñado con altura compacta (480px) para encajar con holgura en pantallas móviles (1600x720)
 * y de escritorio (1920x1080).
 */
export const BigMapModal = () => {
  const isBigOpen = getIsBigMapOpen()
  if (!isBigOpen) return null

  const loc = getPlayerLocationInfo()

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.02, 0.03, 0.06, 0.86) // Opacidad sutil para apreciar el entorno 3D
      }}
    >
      {/* Tarjeta Central del Mapa (Layout Horizontal Panorámico 880x480) */}
      <UiEntity
        uiTransform={{
          width: 880,
          height: 480,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: { top: 10, bottom: 10, left: 14, right: 14 },
          pointerFilter: 'block'
        }}
        uiBackground={{
          color: Color4.create(0.07, 0.09, 0.14, 0.96)
        }}
      >
        {/* 1. Cabecera del Mapa: Título y Botón de Cierre */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { bottom: 6 }
          }}
        >
          <UiEntity
            uiTransform={{ height: 24 }}
            uiText={{
              value: `🗺️ ${t('map.title')} • ${t('map.subtitle')}`,
              fontSize: 15,
              color: Color4.create(1.0, 0.85, 0.35, 1.0),
              textAlign: 'middle-left'
            }}
          />

          {/* Botón Táctil Rápido de Cierre (✖) */}
          <UiEntity
            uiTransform={{
              width: 36,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.24, 0.1, 0.1, 0.95)
            }}
            onMouseDown={() => {
              toggleBigMap()
            }}
            uiText={{
              value: '✖',
              fontSize: 15,
              color: Color4.create(1.0, 0.4, 0.4, 1.0)
            }}
          />
        </UiEntity>

        {/* 2. Cuerpo en 2 Columnas (Mapa 410x410 + Panel Lateral de Información y Leyenda) */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 418,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* Columna Izquierda: Lienzo del Mapa 2D (410px x 410px) */}
          <UiEntity
            uiTransform={{
              width: 410,
              height: 410,
              positionType: 'relative',
              pointerFilter: 'none'
            }}
            uiBackground={{
              texture: { src: getMinimapTextureSrc() },
              textureMode: 'stretch'
            }}
          >
            {/* Rastreador del Jugador */}
            <BigMapPlayerTracker />
          </UiEntity>

          {/* Columna Derecha: Información en Vivo, Leyenda y Controles (420px) */}
          <UiEntity
            uiTransform={{
              width: 424,
              height: 410,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              padding: { left: 12, right: 2, top: 0, bottom: 0 }
            }}
          >
            {/* Tarjeta de Ubicación del Avatar */}
            <UiEntity
              uiTransform={{
                width: '100%',
                height: 76,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: { top: 6, bottom: 6, left: 12, right: 12 }
              }}
              uiBackground={{
                color: Color4.create(0.12, 0.16, 0.22, 0.9)
              }}
            >
              <UiEntity
                uiTransform={{ height: 18 }}
                uiText={{
                  value: `📍 ${t('common.parcel')} [${loc.parcelX}, ${loc.parcelZ}] • X: ${loc.x.toFixed(1)}m | Z: ${loc.z.toFixed(1)}m`,
                  fontSize: 12,
                  color: Color4.create(1.0, 0.85, 0.35, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ height: 18 }}
                uiText={{
                  value: `${loc.zoneIcon} ${loc.zoneName}`,
                  fontSize: 12,
                  color: Color4.create(0.4, 0.9, 1.0, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ height: 14 }}
                uiText={{
                  value: `🧭 ${t('map.playerTooltip')} • ${loc.zoneTag}`,
                  fontSize: 10,
                  color: Color4.create(0.8, 0.85, 0.9, 0.85),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>

            {/* Leyenda de Distritos y Niveles de Riesgo */}
            <UiEntity
              uiTransform={{
                width: '100%',
                minHeight: 250,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'stretch',
                padding: { top: 6, bottom: 6, left: 12, right: 12 }
              }}
              uiBackground={{
                color: Color4.create(0.1, 0.13, 0.18, 0.9)
              }}
            >
              {/* Título de la Leyenda */}
              <UiEntity
                uiTransform={{ height: 16 }}
                uiText={{
                  value: `📋 ${t('map.legendTitle')}`,
                  fontSize: 11,
                  color: Color4.create(0.9, 0.9, 0.95, 1.0),
                  textAlign: 'middle-left'
                }}
              />

              {/* Item 1: Zona Segura */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: { bottom: 2 }
                }}
              >
                <UiEntity
                  uiTransform={{ height: 15 }}
                  uiText={{
                    value: '🟢 ' + t('map.safeZone'),
                    fontSize: 11,
                    color: Color4.create(0.2, 0.9, 0.4, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  uiTransform={{ height: 13 }}
                  uiText={{
                    value: '🔥 Forja (0,0) • 💎 Minería • ⚙️ Chatarrales',
                    fontSize: 9,
                    color: Color4.create(0.75, 0.8, 0.85, 0.85),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>

              {/* Item 2: Gran Arena */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: { bottom: 2 }
                }}
              >
                <UiEntity
                  uiTransform={{ height: 15 }}
                  uiText={{
                    value: '🏆 ' + t('map.arenaZone'),
                    fontSize: 11,
                    color: Color4.create(1.0, 0.85, 0.35, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  uiTransform={{ height: 13 }}
                  uiText={{
                    value: 'Torneo Steampunk • Centro (200m, 200m) FFA',
                    fontSize: 9,
                    color: Color4.create(0.75, 0.8, 0.85, 0.85),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>

              {/* Item 3: Peligro PK Libre */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: { bottom: 2 }
                }}
              >
                <UiEntity
                  uiTransform={{ height: 15 }}
                  uiText={{
                    value: '🔴 ' + t('map.pkZone'),
                    fontSize: 11,
                    color: Color4.create(1.0, 0.35, 0.35, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  uiTransform={{ height: 13 }}
                  uiText={{
                    value: '🏜️ Desierto (Legendarios) • 🌋 Calderas (Épicos)',
                    fontSize: 9,
                    color: Color4.create(0.75, 0.8, 0.85, 0.85),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>

              {/* Item 4: Zonas Abiertas */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <UiEntity
                  uiTransform={{ height: 15 }}
                  uiText={{
                    value: '⚡ Subestación & 📡 Torre de Radio',
                    fontSize: 11,
                    color: Color4.create(1.0, 0.75, 0.25, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  uiTransform={{ height: 13 }}
                  uiText={{
                    value: 'Piezas Galvánicas y Luminosas Raras',
                    fontSize: 9,
                    color: Color4.create(0.75, 0.8, 0.85, 0.85),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
            </UiEntity>

            {/* Botón Táctil de Cerrar Mapa */}
            <UiEntity
              uiTransform={{
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.24, 0.12, 0.14, 0.95)
              }}
              onMouseDown={() => {
                toggleBigMap()
              }}
              uiText={{
                value: `✖ ${t('map.close')}`,
                fontSize: 13,
                color: Color4.create(1.0, 0.5, 0.5, 1.0)
              }}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}
