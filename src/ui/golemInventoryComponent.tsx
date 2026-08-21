import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { t, getLanguage } from '../i18n'
import {
  getIsGolemInventoryOpen,
  toggleGolemInventory,
  getLocalActiveSquad
} from '../state'
import { GolemConfig, GolemAffinity } from '../config/golems'
import { getAffinityIcon } from '../ui'

// Variables de estado local para el filtro por afinidad y el golem inspeccionado
let selectedAffinityFilter: 'all' | GolemAffinity = 'all'
let selectedGolemId: string | null = null

/**
 * ============================================================================
 * MODAL DE INVENTARIO Y RESERVA DE GOLEMS (REACT-ECS SDK7 - STEAMPUNK UI)
 * ============================================================================
 * Interfaz de usuario completa para inspeccionar, gestionar y equipar
 * los golems del escuadrón activo y la reserva del jugador.
 * 
 * Estructura:
 * 1. Envoltura full-screen centrada con `pointerFilter: 'none'` y tap en el backdrop para cerrar.
 * 2. Cabecera con Título "🤖 RESERVA Y ESCUADRÓN DE GOLEMS", badge de escuadrón (3/3) y botón ✖.
 * 3. Barra de Filtros por Afinidad Elemental [ Todos | Vapor | Galvánico | Mecánico | Luminoso | Éter ].
 * 4. Cuerpo en 2 Columnas:
 *    - Izquierda (58%): Lista de Golems con badges de nivel, barra de HP y etiqueta de escuadrón/reserva.
 *    - Derecha (40%): Panel de Inspección con estadísticas detalladas (ATK, DEF, HP, SPD, EXP),
 *      ventajas elementales del Pentágono y botones de acción.
 * 5. Pie de Modal con consejo informativo.
 */
export const GolemInventoryModal = () => {
  if (!getIsGolemInventoryOpen()) return null

  const isEn = getLanguage() === 'en'
  const activeSquad = getLocalActiveSquad() || []

  // Filtrar golems según la afinidad elemental seleccionada
  const filteredGolems = selectedAffinityFilter === 'all'
    ? activeSquad
    : activeSquad.filter((g) => g.affinity === selectedAffinityFilter)

  // Seleccionar automáticamente el primer golem si no hay selección válida
  if (selectedGolemId && !filteredGolems.some((g) => g.id === selectedGolemId)) {
    selectedGolemId = filteredGolems.length > 0 ? filteredGolems[0].id : null
  } else if (!selectedGolemId && filteredGolems.length > 0) {
    selectedGolemId = filteredGolems[0].id
  }

  const selectedGolem = selectedGolemId
    ? activeSquad.find((g) => g.id === selectedGolemId) || null
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
      onMouseDown={() => toggleGolemInventory()}
    >
      {/* Tarjeta Central del Inventario de Golems (920px × 540px Centrada) */}
      <UiEntity
        uiTransform={{
          width: 920,
          height: 540,
          flexDirection: 'column',
          justifyContent: 'space-between',
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
            margin: { bottom: 10 }
          }}
        >
          <UiEntity
            uiTransform={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <UiEntity
              uiText={{
                value: t('golemInventory.title'),
                fontSize: 19,
                color: Color4.create(1.0, 0.85, 0.35, 1.0),
                textAlign: 'middle-left'
              }}
            />
            {/* Badge de Estado de Escuadrón (3/3) */}
            <UiEntity
              uiTransform={{
                margin: { left: 14 },
                padding: { top: 3, bottom: 3, left: 8, right: 8 }
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
              width: 36,
              height: 34,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.24, 0.1, 0.1, 0.9)
            }}
            onMouseDown={() => toggleGolemInventory()}
            uiText={{
              value: '✖',
              fontSize: 16,
              color: Color4.create(1.0, 0.4, 0.4, 1.0)
            }}
          />
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
            margin: { bottom: 12 }
          }}
        >
          {/* Botón Todos */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
              margin: { right: 6 },
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
            uiText={{
              value: t('golemInventory.filterAll'),
              fontSize: 13,
              color: selectedAffinityFilter === 'all'
                ? Color4.create(1.0, 0.9, 0.4, 1.0)
                : Color4.create(0.7, 0.75, 0.8, 0.9)
            }}
          />

          {/* Botón Vapor ♨️ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 10, right: 10 },
              margin: { right: 6 },
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
            uiText={{
              value: `♨️ ${t('affinities.steam')}`,
              fontSize: 12,
              color: Color4.create(1.0, 0.65, 0.3, 1.0)
            }}
          />

          {/* Botón Galvánico ⚡ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 10, right: 10 },
              margin: { right: 6 },
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
            uiText={{
              value: `⚡ ${t('affinities.galvanic')}`,
              fontSize: 12,
              color: Color4.create(1.0, 0.9, 0.3, 1.0)
            }}
          />

          {/* Botón Mecánico ⚙️ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 10, right: 10 },
              margin: { right: 6 },
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
            uiText={{
              value: `⚙️ ${t('affinities.mechanical')}`,
              fontSize: 12,
              color: Color4.create(0.4, 0.85, 1.0, 1.0)
            }}
          />

          {/* Botón Luminoso ☀️ */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 10, right: 10 },
              margin: { right: 6 },
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
            uiText={{
              value: `☀️ ${t('affinities.luminous')}`,
              fontSize: 12,
              color: Color4.create(1.0, 0.95, 0.5, 1.0)
            }}
          />

          {/* Botón Éter 🔮 */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 10, right: 10 },
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
            uiText={{
              value: `🔮 ${t('affinities.aether')}`,
              fontSize: 12,
              color: Color4.create(0.85, 0.4, 1.0, 1.0)
            }}
          />
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 3. CUERPO DEL INVENTARIO DE GOLEMS (2 COLUMNAS)                         */}
        {/* ---------------------------------------------------------------------- */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 380,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch'
          }}
        >
          {/* COLUMNA IZQUIERDA: Lista de Golems (58% de ancho) */}
          <UiEntity
            uiTransform={{
              width: '58%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              padding: { top: 8, bottom: 8, left: 8, right: 8 }
            }}
            uiBackground={{
              color: Color4.create(0.04, 0.05, 0.08, 0.92)
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
                  padding: { left: 24, right: 24 }
                }}
              >
                <UiEntity
                  uiText={{
                    value: '🤖',
                    fontSize: 42,
                    textAlign: 'middle-center'
                  }}
                />
                <UiEntity
                  uiTransform={{ margin: { top: 12 } }}
                  uiText={{
                    value: t('golemInventory.empty'),
                    fontSize: 13.5,
                    color: Color4.create(0.7, 0.75, 0.8, 0.9),
                    textAlign: 'middle-center'
                  }}
                />
              </UiEntity>
            ) : (
              /* Lista de Golems */
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch'
                }}
              >
                {filteredGolems.map((golem) => {
                  const isSelected = golem.id === selectedGolemId
                  const hpPercent = Math.max(0, Math.min(100, Math.round((golem.currentHp / golem.maxHp) * 100)))

                  return (
                    <UiEntity
                      key={`golem_item_${golem.id}`}
                      uiTransform={{
                        width: '100%',
                        height: 60,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: { left: 10, right: 10 },
                        margin: { bottom: 6 },
                        pointerFilter: 'block'
                      }}
                      uiBackground={{
                        color: isSelected
                          ? Color4.create(0.18, 0.24, 0.34, 0.95)
                          : Color4.create(0.09, 0.11, 0.16, 0.88)
                      }}
                      onMouseDown={() => { selectedGolemId = golem.id }}
                    >
                      {/* Lado Izquierdo: Icono Afinidad + Nombre + HP Bar */}
                      <UiEntity
                        uiTransform={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start'
                        }}
                      >
                        <UiEntity
                          uiTransform={{
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                        >
                          <UiEntity
                            uiText={{
                              value: `${getAffinityIcon(golem.affinity)} ${golem.name}`,
                              fontSize: 14.5,
                              color: isSelected
                                ? Color4.create(1.0, 0.9, 0.4, 1.0)
                                : Color4.create(0.95, 0.95, 0.95, 1.0),
                              textAlign: 'middle-left'
                            }}
                          />
                          <UiEntity
                            uiTransform={{ margin: { left: 8 } }}
                            uiText={{
                              value: `${t('common.levelShort')} ${golem.level}`,
                              fontSize: 12,
                              color: Color4.create(0.4, 0.9, 1.0, 0.9),
                              textAlign: 'middle-left'
                            }}
                          />
                        </UiEntity>

                        {/* Barra de Salud HP */}
                        <UiEntity
                          uiTransform={{ margin: { top: 4 } }}
                          uiText={{
                            value: `💚 HP: ${golem.currentHp}/${golem.maxHp} (${hpPercent}%)`,
                            fontSize: 11.5,
                            color: Color4.create(0.4, 1.0, 0.5, 0.9),
                            textAlign: 'middle-left'
                          }}
                        />
                      </UiEntity>

                      {/* Lado Derecho: Badge de Escuadrón Activo */}
                      <UiEntity
                        uiTransform={{
                          padding: { top: 3, bottom: 3, left: 8, right: 8 }
                        }}
                        uiBackground={{
                          color: Color4.create(0.24, 0.20, 0.10, 0.95)
                        }}
                        uiText={{
                          value: `🛡️ ${t('golemInventory.activeSquad')}`,
                          fontSize: 11,
                          color: Color4.create(1.0, 0.85, 0.35, 1.0),
                          textAlign: 'middle-right'
                        }}
                      />
                    </UiEntity>
                  )
                })}
              </UiEntity>
            )}
          </UiEntity>

          {/* COLUMNA DERECHA: Panel de Inspección del Golem Seleccionado (40% de ancho) */}
          <UiEntity
            uiTransform={{
              width: '40%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              padding: { top: 12, bottom: 12, left: 14, right: 14 }
            }}
            uiBackground={{
              color: Color4.create(0.08, 0.10, 0.15, 0.94)
            }}
          >
            {selectedGolem ? (
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                {/* Nombre y Afinidad */}
                <UiEntity
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: { bottom: 6 }
                  }}
                >
                  <UiEntity
                    uiTransform={{ width: '100%', height: 26 }}
                    uiText={{
                      value: `${getAffinityIcon(selectedGolem.affinity)} ${selectedGolem.name}`,
                      fontSize: 17,
                      color: Color4.create(1.0, 0.88, 0.35, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{ margin: { top: 2 } }}
                    uiText={{
                      value: `${t('common.level')} ${selectedGolem.level} • Afinidad ${selectedGolem.affinity}`,
                      fontSize: 12,
                      color: Color4.create(0.4, 0.9, 1.0, 0.9)
                    }}
                  />
                </UiEntity>

                {/* Estadísticas de Combate RPG */}
                <UiEntity
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    padding: { top: 8, bottom: 8, left: 10, right: 10 },
                    margin: { bottom: 8 }
                  }}
                  uiBackground={{
                    color: Color4.create(0.12, 0.15, 0.22, 0.88)
                  }}
                >
                  <UiEntity
                    uiText={{
                      value: `⚔️ ${t('golemInventory.statAttack')}: ${selectedGolem.attack}`,
                      fontSize: 12.5,
                      color: Color4.create(1.0, 0.4, 0.4, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{ margin: { top: 2 } }}
                    uiText={{
                      value: `🛡️ ${t('golemInventory.statDefense')}: ${selectedGolem.defense}`,
                      fontSize: 12.5,
                      color: Color4.create(0.4, 0.7, 1.0, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{ margin: { top: 2 } }}
                    uiText={{
                      value: `💚 ${t('golemInventory.statHp')}: ${selectedGolem.currentHp} / ${selectedGolem.maxHp}`,
                      fontSize: 12.5,
                      color: Color4.create(0.4, 1.0, 0.5, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{ margin: { top: 2 } }}
                    uiText={{
                      value: `⚡ ${t('golemInventory.statSpeed')}: ${selectedGolem.speed.toFixed(1)}`,
                      fontSize: 12.5,
                      color: Color4.create(1.0, 0.9, 0.3, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{ margin: { top: 2 } }}
                    uiText={{
                      value: `⭐ ${t('golemInventory.statExp')}: ${selectedGolem.currentExp} / ${selectedGolem.level * 100}`,
                      fontSize: 12,
                      color: Color4.create(0.85, 0.85, 0.9, 0.85),
                      textAlign: 'middle-left'
                    }}
                  />
                </UiEntity>

                {/* Diagrama de Ventaja Elemental */}
                <UiEntity
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    padding: { top: 8, bottom: 8, left: 10, right: 10 },
                    margin: { bottom: 8 }
                  }}
                  uiBackground={{
                    color: Color4.create(0.14, 0.18, 0.26, 0.92)
                  }}
                >
                  <UiEntity
                    uiText={{
                      value: `🔮 ${t('golemInventory.affinityAdvantage')}:`,
                      fontSize: 12,
                      color: Color4.create(0.9, 0.5, 1.0, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    uiTransform={{ margin: { top: 2 } }}
                    uiText={{
                      value: `• Ventaja ×1.40 vs Elementos Vulnerables`,
                      fontSize: 11,
                      color: Color4.create(0.4, 1.0, 0.6, 0.9),
                      textAlign: 'middle-left'
                    }}
                  />
                </UiEntity>

                {/* Botón de Acción / Asignación */}
                <UiEntity
                  uiTransform={{
                    width: '100%',
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerFilter: 'block'
                  }}
                  uiBackground={{
                    color: Color4.create(0.16, 0.32, 0.22, 0.95)
                  }}
                  uiText={{
                    value: `✔ ${t('golemInventory.assignToSquad')}`,
                    fontSize: 13,
                    color: Color4.create(0.4, 1.0, 0.5, 1.0)
                  }}
                />
              </UiEntity>
            ) : (
              /* Mensaje sin Selección */
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <UiEntity
                  uiText={{
                    value: t('golemInventory.selectGolem'),
                    fontSize: 13,
                    color: Color4.create(0.6, 0.65, 0.7, 0.8),
                    textAlign: 'middle-center'
                  }}
                />
              </UiEntity>
            )}
          </UiEntity>
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 4. PIE DE MODAL: Consejo Informativo                                   */}
        {/* ---------------------------------------------------------------------- */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            padding: { left: 12, right: 12 },
            margin: { top: 8 }
          }}
          uiBackground={{
            color: Color4.create(0.12, 0.15, 0.20, 0.9)
          }}
        >
          <UiEntity
            uiText={{
              value: t('golemInventory.golemTip'),
              fontSize: 12,
              color: Color4.create(1.0, 0.88, 0.5, 0.95),
              textAlign: 'middle-center'
            }}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}
