import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { t, getLanguage } from '../i18n'
import {
  getIsGolemInventoryOpen,
  toggleGolemInventory,
  getLocalActiveSquad
} from '../state'
import { GolemConfig, GolemAffinity, getGolemDisplayName } from '../config/golems'

import { getAffinityIcon } from '../ui'

// Variables de estado local para filtros, selección y tooltip de golem activo
let selectedAffinityFilter: 'all' | GolemAffinity = 'all'
let tooltipGolemId: string | null = null

/**
 * Mapeo de colores principales por afinidad elemental para bordes e insignias.
 */
export const AFFINITY_COLOR_MAP: Record<GolemAffinity, { rgb: [number, number, number]; hex: string }> = {
  [GolemAffinity.STEAM]: { rgb: [0.9, 0.45, 0.2], hex: '#E67333' },
  [GolemAffinity.GALVANIC]: { rgb: [0.95, 0.85, 0.2], hex: '#F2D933' },
  [GolemAffinity.MECHANICAL]: { rgb: [0.3, 0.7, 0.9], hex: '#4CB3E6' },
  [GolemAffinity.LUMINOUS]: { rgb: [0.95, 0.9, 0.4], hex: '#F2E666' },
  [GolemAffinity.AETHER]: { rgb: [0.75, 0.35, 0.9], hex: '#BF59E6' }
}

/**
 * Obtiene la ruta relativa de la textura de imagen PNG 300x300 del golem en assets/models/<afinidad_folder>/<model_name>.png
 */
export function getGolemIconPath(golem: GolemConfig): string {
  if (golem.modelSrc && golem.modelSrc.endsWith('.glb')) {
    return golem.modelSrc.replace('.glb', '.png')
  }
  return golem.modelSrc || 'assets/images/golem_icon.png'
}

/**
 * ============================================================================
 * MODAL DE INVENTARIO Y RESERVA DE GOLEMS (REACT-ECS SDK7 - STEAMPUNK GRID UI)
 * ============================================================================
 * Interfaz de usuario completa con retícula continua al 100% de ancho, casilleros
 * cuadrados (98x98px), renderizado de imágenes PNG reales (assets/models) y
 * tarjeta emergente Tooltip optimizada para pantallas táctiles y PC.
 */
export const GolemInventoryModal = () => {
  if (!getIsGolemInventoryOpen()) return null

  const isEn = getLanguage() === 'en'
  const activeSquad = getLocalActiveSquad() || []

  // Filtrar golems según la afinidad elemental seleccionada
  const filteredGolems = selectedAffinityFilter === 'all'
    ? activeSquad
    : activeSquad.filter((g) => g.affinity === selectedAffinityFilter)

  // Si el golem del tooltip activo ya no está en la lista filtrada, cerrarlo
  if (tooltipGolemId && !filteredGolems.some((g) => g.id === tooltipGolemId)) {
    tooltipGolemId = null
  }

  const activeTooltipGolem = tooltipGolemId
    ? activeSquad.find((g) => g.id === tooltipGolemId) || null
    : null

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'none'
      }}
      uiBackground={{
        color: Color4.create(0.02, 0.03, 0.06, 0.86)
      }}
    >
      {/* Tarjeta Central del Inventario de Golems (920px × 540px Centrada al 100% de Ancho) */}
      <UiEntity
        uiTransform={{
          width: 920,
          height: 540,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: { top: 16, bottom: 16, left: 20, right: 20 },
          pointerFilter: 'block'
        }}
        uiBackground={{
          color: Color4.create(0.06, 0.08, 0.12, 0.96)
        }}
      >
        {/* ---------------------------------------------------------------------- */}
        {/* 1. CABECERA: Título, Contador de Escuadrón y Botón de Cierre           */}
        {/* ---------------------------------------------------------------------- */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 38,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { bottom: 12 },
            pointerFilter: 'none'
          }}
        >
          <UiEntity
            uiTransform={{
              flexDirection: 'row',
              alignItems: 'center',
              pointerFilter: 'none'
            }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('golemInventory.title'),
                fontSize: 19,
                color: Color4.create(1.0, 0.85, 0.35, 1.0),
                textAlign: 'middle-left'
              }}
            />
            {/* Badge de Estado de Escuadrón Activo (3/3) */}
            <UiEntity
              uiTransform={{
                margin: { left: 14 },
                padding: { top: 4, bottom: 4, left: 10, right: 10 },
                pointerFilter: 'none'
              }}
              uiBackground={{
                color: Color4.create(0.12, 0.18, 0.26, 0.9)
              }}
              uiText={{
                value: `${t('golemInventory.activeSquad')}: ${activeSquad.length}/3`,
                fontSize: 12,
                color: Color4.create(0.4, 0.9, 1.0, 0.9),
                textAlign: 'middle-left'
              }}
            />
          </UiEntity>

          {/* Botón Táctil de Cierre (✖) */}
          <UiEntity
            uiTransform={{
              width: 38,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.28, 0.1, 0.1, 0.95)
            }}
            onMouseDown={() => toggleGolemInventory()}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: '✖',
                fontSize: 18,
                color: Color4.create(1.0, 0.4, 0.4, 1.0)
              }}
            />
          </UiEntity>
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 2. BARRA DE FILTROS POR AFINIDAD ELEMENTAL                              */}
        {/* ---------------------------------------------------------------------- */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 36,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: { bottom: 14 },
            pointerFilter: 'none'
          }}
        >
          {/* Botón Todos */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 14, right: 14 },
              margin: { right: 8 },
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: selectedAffinityFilter === 'all'
                ? Color4.create(0.22, 0.30, 0.40, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedAffinityFilter = 'all' }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('golemInventory.filterAll'),
                fontSize: 13,
                color: selectedAffinityFilter === 'all'
                  ? Color4.create(1.0, 0.9, 0.4, 1.0)
                  : Color4.create(0.7, 0.75, 0.8, 0.9)
              }}
            />
          </UiEntity>

          {/* Botón Vapor ♨️ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
              margin: { right: 8 },
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: selectedAffinityFilter === GolemAffinity.STEAM
                ? Color4.create(0.35, 0.20, 0.10, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedAffinityFilter = GolemAffinity.STEAM }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: `♨️ ${t('affinities.steam')}`,
                fontSize: 12.5,
                color: Color4.create(1.0, 0.65, 0.3, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Galvánico ⚡ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
              margin: { right: 8 },
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: selectedAffinityFilter === GolemAffinity.GALVANIC
                ? Color4.create(0.35, 0.32, 0.10, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedAffinityFilter = GolemAffinity.GALVANIC }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: `⚡ ${t('affinities.galvanic')}`,
                fontSize: 12.5,
                color: Color4.create(1.0, 0.9, 0.3, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Mecánico ⚙️ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
              margin: { right: 8 },
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: selectedAffinityFilter === GolemAffinity.MECHANICAL
                ? Color4.create(0.15, 0.25, 0.35, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedAffinityFilter = GolemAffinity.MECHANICAL }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: `⚙️ ${t('affinities.mechanical')}`,
                fontSize: 12.5,
                color: Color4.create(0.4, 0.85, 1.0, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Luminoso ☀️ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
              margin: { right: 8 },
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: selectedAffinityFilter === GolemAffinity.LUMINOUS
                ? Color4.create(0.35, 0.28, 0.10, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedAffinityFilter = GolemAffinity.LUMINOUS }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: `☀️ ${t('affinities.luminous')}`,
                fontSize: 12.5,
                color: Color4.create(1.0, 0.95, 0.5, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Éter 🔮 */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: selectedAffinityFilter === GolemAffinity.AETHER
                ? Color4.create(0.28, 0.14, 0.38, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedAffinityFilter = GolemAffinity.AETHER }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: `🔮 ${t('affinities.aether')}`,
                fontSize: 12.5,
                color: Color4.create(0.85, 0.4, 1.0, 1.0)
              }}
            />
          </UiEntity>
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 3. REJILLA/CUADRÍCULA CONTINUA DE GOLEMS EN CELDAS (98x98px)            */}
        {/* ---------------------------------------------------------------------- */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 420,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: { top: 8, bottom: 8, left: 8, right: 8 },
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.04, 0.05, 0.08, 0.94)
          }}
        >
          {filteredGolems.length === 0 ? (
            /* Estado Vacío / Sin Golems */
            <UiEntity
              uiTransform={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { left: 24, right: 24 },
                pointerFilter: 'none'
              }}
            >
              <UiEntity
                uiTransform={{ pointerFilter: 'none' }}
                uiText={{
                  value: '🤖',
                  fontSize: 48,
                  textAlign: 'middle-center'
                }}
              />
              <UiEntity
                uiTransform={{ margin: { top: 12 }, pointerFilter: 'none' }}
                uiText={{
                  value: t('golemInventory.empty'),
                  fontSize: 14,
                  color: Color4.create(0.7, 0.75, 0.8, 0.9),
                  textAlign: 'middle-center'
                }}
              />
            </UiEntity>
          ) : (
            /* Casilleros Cuadrados en Cuadrícula (98x98px) con Imagen PNG de Golem */
            filteredGolems.map((golem) => {
              const isTooltipActive = tooltipGolemId === golem.id
              const affinityColor = AFFINITY_COLOR_MAP[golem.affinity] || AFFINITY_COLOR_MAP[GolemAffinity.STEAM]

              return (
                <UiEntity
                  key={`golem_cell_${golem.id}`}
                  uiTransform={{
                    width: 98,
                    height: 98,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: { right: 8, bottom: 8 },
                    padding: { top: 4, bottom: 4, left: 4, right: 4 },
                    pointerFilter: 'block'
                  }}
                  uiBackground={{
                    color: isTooltipActive
                      ? Color4.create(0.22, 0.30, 0.44, 0.98)
                      : Color4.create(0.08, 0.10, 0.15, 0.95)
                  }}
                  onMouseDown={() => {
                    tooltipGolemId = isTooltipActive ? null : golem.id
                  }}
                >
                  {/* Barra Superior de Color de Afinidad */}
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      height: 4,
                      margin: { bottom: 2 },
                      pointerFilter: 'none'
                    }}
                    uiBackground={{
                      color: Color4.create(
                        affinityColor.rgb[0],
                        affinityColor.rgb[1],
                        affinityColor.rgb[2],
                        1.0
                      )
                    }}
                  />

                  {/* Imagen PNG del Golem (assets/models/<afinidad>/<golem_id>.png) */}
                  <UiEntity
                    uiTransform={{
                      width: 48,
                      height: 48,
                      margin: { top: 2, bottom: 2 },
                      pointerFilter: 'none'
                    }}
                    uiBackground={{
                      texture: { src: getGolemIconPath(golem) },
                      textureMode: 'stretch'
                    }}
                  />

                  {/* Nombre del Golem (Centrado) */}
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      height: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      pointerFilter: 'none'
                    }}
                    uiText={{
                      value: getGolemDisplayName(golem),
                      fontSize: 9.5,
                      color: isTooltipActive
                        ? Color4.create(1.0, 0.9, 0.4, 1.0)
                        : Color4.create(0.9, 0.92, 0.96, 1.0),
                      textAlign: 'middle-center'
                    }}
                  />

                  {/* Insignia Inferior Nivel y Estado de Escuadrón */}
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      height: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pointerFilter: 'none'
                    }}
                  >
                    <UiEntity
                      uiTransform={{
                        padding: { top: 1, bottom: 1, left: 4, right: 4 },
                        pointerFilter: 'none'
                      }}
                      uiBackground={{
                        color: Color4.create(0.14, 0.20, 0.28, 0.92)
                      }}
                      uiText={{
                        value: `Nv.${golem.level}`,
                        fontSize: 9.5,
                        color: Color4.create(0.4, 0.9, 1.0, 1.0)
                      }}
                    />
                    <UiEntity
                      uiTransform={{
                        padding: { top: 1, bottom: 1, left: 4, right: 4 },
                        pointerFilter: 'none'
                      }}
                      uiBackground={{
                        color: Color4.create(0.1, 0.25, 0.15, 0.92)
                      }}
                      uiText={{
                        value: '⚔️ SQUAD',
                        fontSize: 9,
                        color: Color4.create(0.4, 1.0, 0.5, 1.0)
                      }}
                    />
                  </UiEntity>
                </UiEntity>
              )
            })
          )}
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 4. TARJETA DE TOOLTIP EMERGENTE DE GOLEM (GOLEM TOOLTIP CARD OVERLAY) */}
        {/* ---------------------------------------------------------------------- */}
        {activeTooltipGolem ? (
          <UiEntity
            uiTransform={{
              positionType: 'absolute',
              position: { top: 60, right: 28 },
              width: 340,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              padding: { top: 12, bottom: 12, left: 14, right: 14 },
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.06, 0.09, 0.14, 0.98)
            }}
          >
            {/* Cabecera del Tooltip: Imagen PNG, Nombre, Afinidad y Cierre */}
            <UiEntity
              uiTransform={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: { bottom: 8 },
                pointerFilter: 'none'
              }}
            >
              <UiEntity
                uiTransform={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  pointerFilter: 'none'
                }}
              >
                {/* Imagen PNG en Tooltip */}
                <UiEntity
                  uiTransform={{
                    width: 56,
                    height: 56,
                    margin: { right: 10 },
                    pointerFilter: 'none'
                  }}
                  uiBackground={{
                    texture: { src: getGolemIconPath(activeTooltipGolem) },
                    textureMode: 'stretch'
                  }}
                />

                <UiEntity
                  uiTransform={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    pointerFilter: 'none'
                  }}
                >
                  <UiEntity
                    uiTransform={{ pointerFilter: 'none' }}
                    uiText={{
                      value: getGolemDisplayName(activeTooltipGolem),
                      fontSize: 16,
                      color: Color4.create(1.0, 0.88, 0.35, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{
                      padding: { top: 2, bottom: 2, left: 6, right: 6 },
                      margin: { top: 4 },
                      pointerFilter: 'none'
                    }}
                    uiBackground={{
                      color: Color4.create(
                        AFFINITY_COLOR_MAP[activeTooltipGolem.affinity].rgb[0] * 0.3,
                        AFFINITY_COLOR_MAP[activeTooltipGolem.affinity].rgb[1] * 0.3,
                        AFFINITY_COLOR_MAP[activeTooltipGolem.affinity].rgb[2] * 0.3,
                        0.9
                      )
                    }}
                    uiText={{
                      value: `${getAffinityIcon(activeTooltipGolem.affinity)} ${t(`affinities.${activeTooltipGolem.affinity.toLowerCase()}`).toUpperCase()}`,
                      fontSize: 10.5,
                      color: Color4.create(
                        AFFINITY_COLOR_MAP[activeTooltipGolem.affinity].rgb[0],
                        AFFINITY_COLOR_MAP[activeTooltipGolem.affinity].rgb[1],
                        AFFINITY_COLOR_MAP[activeTooltipGolem.affinity].rgb[2],
                        1.0
                      )
                    }}
                  />
                </UiEntity>
              </UiEntity>

              {/* Botón ✖ de Cierre del Tooltip */}
              <UiEntity
                uiTransform={{
                  width: 26,
                  height: 26,
                  justifyContent: 'center',
                  alignItems: 'center',
                  pointerFilter: 'block'
                }}
                uiBackground={{
                  color: Color4.create(0.24, 0.1, 0.1, 0.9)
                }}
                onMouseDown={() => { tooltipGolemId = null }}
              >
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: '✖',
                    fontSize: 13,
                    color: Color4.create(1.0, 0.4, 0.4, 1.0)
                  }}
                />
              </UiEntity>
            </UiEntity>

            {/* Nivel y Barra de Vida HP */}
            <UiEntity
              uiTransform={{
                width: '100%',
                flexDirection: 'column',
                padding: { top: 6, bottom: 6, left: 8, right: 8 },
                margin: { bottom: 8 },
                pointerFilter: 'none'
              }}
              uiBackground={{
                color: Color4.create(0.10, 0.14, 0.20, 0.9)
              }}
            >
              <UiEntity
                uiTransform={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: { bottom: 4 },
                  pointerFilter: 'none'
                }}
              >
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `🌟 Nivel ${activeTooltipGolem.level}`,
                    fontSize: 12,
                    color: Color4.create(1.0, 0.9, 0.4, 1.0)
                  }}
                />
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `💚 HP: ${activeTooltipGolem.currentHp} / ${activeTooltipGolem.maxHp}`,
                    fontSize: 12,
                    color: Color4.create(0.4, 1.0, 0.5, 1.0)
                  }}
                />
              </UiEntity>

              {/* Barra Proporcional de HP */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 6,
                  pointerFilter: 'none'
                }}
                uiBackground={{
                  color: Color4.create(0.2, 0.08, 0.08, 0.9)
                }}
              >
                <UiEntity
                  uiTransform={{
                    width: `${Math.max(0, Math.min(100, (activeTooltipGolem.currentHp / activeTooltipGolem.maxHp) * 100))}%`,
                    height: '100%',
                    pointerFilter: 'none'
                  }}
                  uiBackground={{
                    color: Color4.create(0.2, 0.9, 0.35, 1.0)
                  }}
                />
              </UiEntity>
            </UiEntity>

            {/* Estadísticas RPG de Combate */}
            <UiEntity
              uiTransform={{
                width: '100%',
                flexDirection: 'column',
                padding: { top: 8, bottom: 8, left: 8, right: 8 },
                pointerFilter: 'none'
              }}
              uiBackground={{
                color: Color4.create(0.12, 0.16, 0.24, 0.95)
              }}
            >
              <UiEntity
                uiTransform={{ margin: { bottom: 4 }, pointerFilter: 'none' }}
                uiText={{
                  value: `📊 ${t('golemInventory.statsHeader')}:`,
                  fontSize: 12,
                  color: Color4.create(1.0, 0.85, 0.4, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ pointerFilter: 'none' }}
                uiText={{
                  value: `• ⚔️ ${t('golemInventory.statAttack')}: ${activeTooltipGolem.attack}`,
                  fontSize: 11.5,
                  color: Color4.create(1.0, 0.4, 0.4, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ pointerFilter: 'none' }}
                uiText={{
                  value: `• 🛡️ ${t('golemInventory.statDefense')}: ${activeTooltipGolem.defense}`,
                  fontSize: 11.5,
                  color: Color4.create(0.4, 0.7, 1.0, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ pointerFilter: 'none' }}
                uiText={{
                  value: `• ⚡ ${t('golemInventory.statSpeed')}: ${activeTooltipGolem.speed}`,
                  fontSize: 11.5,
                  color: Color4.create(1.0, 0.9, 0.3, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ pointerFilter: 'none' }}
                uiText={{
                  value: `• 🌟 ${t('golemInventory.statExp')}: ${activeTooltipGolem.currentExp} / ${activeTooltipGolem.level * 100} EXP`,
                  fontSize: 11.5,
                  color: Color4.create(0.85, 0.5, 1.0, 1.0),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>
          </UiEntity>
        ) : null}
      </UiEntity>
    </UiEntity>
  )
}
