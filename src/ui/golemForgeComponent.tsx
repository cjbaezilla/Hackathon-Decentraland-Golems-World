import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { COLLECTABLE_ITEMS, ItemRarity, getRarityColorHex } from '../config/items'
import { getAffinityIcon } from '../ui'
import { getLocalizedAffinity, t, getLanguage } from '../i18n'
import {
  getIsForgeUIOpen,
  setIsForgeUIOpen,
  getPlayerInventory,
  getSelectedForgeMaterials,
  addForgeMaterial,
  removeForgeMaterial,
  clearForgeMaterials,
  removeMaterialFromInventory,
  addGolemToReserve,
  addCombatLog,
  setLocalActiveSquad,
  getLocalActiveSquad
} from '../state'
import { getItemIconPath } from './inventoryComponent'
import { getGolemIconPath } from './golemInventoryComponent'
import { deriveForgedGolem } from '../utils/golemRecipeHash'
import { playFactoryForgingCinematic } from '../cinematics/factoryForgingCinematic'
import { spawnActivePlayerGolem } from '../objects/golemFactory'

/**
 * ============================================================================
 * INTERFAZ MODAL REACT-ECS: FORJA Y MEZCLA DE GOLEMS (MOBILE-FIRST)
 * ============================================================================
 * Permite seleccionar entre 5 y 12 piezas de chatarra del inventario de materiales
 * del jugador, ofreciendo una vista previa determinista en tiempo real de los atributos,
 * afinidad elemental dominante, nombre procedural y tier.
 */

export const GolemForgeModal = () => {
  if (!getIsForgeUIOpen()) return null

  const inventory = getPlayerInventory()
  const selected = getSelectedForgeMaterials()

  // Calcular totales acumulados en la bahía
  let totalSelectedCount = 0
  for (const count of Object.values(selected)) {
    totalSelectedCount += count
  }

  // Derivar resultado proyectado si hay al menos 1 material
  const hasMinItems = totalSelectedCount >= 5 && totalSelectedCount <= 12
  const projectedResult = totalSelectedCount > 0 ? deriveForgedGolem(selected) : null

  const availableMaterialKeys = Object.keys(inventory).filter((id) => inventory[id] > 0)

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
    >
      {/* Fondo Modal Oscuro Transparente */}
      <UiEntity
        uiTransform={{
          width: 1040,
          height: 640,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: { top: 16, bottom: 16, left: 22, right: 22 },
          pointerFilter: 'block'
        }}
        uiBackground={{
          color: Color4.create(0.06, 0.08, 0.12, 0.96)
        }}
      >
        {/* Cabecera de la Modal */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 44,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { bottom: 10 }
          }}
        >
          <UiEntity
            uiTransform={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <UiEntity
              uiText={{
                value: `🏭 ${t('forge.title')}`,
                fontSize: 20,
                color: Color4.create(1.0, 0.85, 0.35, 1.0),
                textAlign: 'middle-left'
              }}
            />
            <UiEntity
              uiText={{
                value: t('forge.subtitle'),
                fontSize: 12,
                color: Color4.create(0.4, 0.9, 1.0, 0.85),
                textAlign: 'middle-left'
              }}
            />
          </UiEntity>

          {/* Botón de Cierre (✖) */}
          <UiEntity
            uiTransform={{
              width: 38,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.24, 0.1, 0.1, 0.9)
            }}
            onMouseDown={() => {
              setIsForgeUIOpen(false)
            }}
            uiText={{
              value: '✖',
              fontSize: 16,
              color: Color4.create(1.0, 0.4, 0.4, 1.0)
            }}
          />
        </UiEntity>

        {/* Cuerpo Principal de 2 Columnas */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 490,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            margin: { bottom: 12 }
          }}
        >
          {/* Columna Izquierda: Selección de Inventario (Ancho 520px) */}
          <UiEntity
            uiTransform={{
              width: 520,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: { top: 12, bottom: 12, left: 14, right: 14 }
            }}
            uiBackground={{
              color: Color4.create(0.1, 0.12, 0.16, 0.9)
            }}
          >
            <UiEntity
              uiTransform={{ height: 22, margin: { bottom: 8 } }}
              uiText={{
                value: `🎒 ${t('forge.inventoryTitle')} (${availableMaterialKeys.length})`,
                fontSize: 14,
                color: Color4.create(0.9, 0.9, 0.9, 1.0),
                textAlign: 'middle-left'
              }}
            />

            {availableMaterialKeys.length === 0 ? (
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 380,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <UiEntity
                  uiText={{
                    value: t('forge.emptyInventoryWarning'),
                    fontSize: 14,
                    color: Color4.create(0.7, 0.7, 0.7, 1.0),
                    textAlign: 'middle-center'
                  }}
                />
              </UiEntity>
            ) : (
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 420,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch'
                }}
              >
                {availableMaterialKeys.slice(0, 7).map((itemId) => {
                  const item = COLLECTABLE_ITEMS[itemId]
                  const owned = inventory[itemId] || 0
                  const inForge = selected[itemId] || 0

                  return (
                    <UiEntity
                      key={itemId}
                      uiTransform={{
                        width: '100%',
                        height: 54,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: { left: 8, right: 8 },
                        margin: { bottom: 6 }
                      }}
                      uiBackground={{
                        color: Color4.create(0.15, 0.18, 0.24, 0.92)
                      }}
                    >
                      {/* Lado Izquierdo: Miniatura PNG de la Pieza + Nombre y Cantidad */}
                      <UiEntity
                        uiTransform={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}
                      >
                        {/* Miniatura PNG del Material */}
                        {item ? (
                          <UiEntity
                            uiTransform={{
                              width: 42,
                              height: 42,
                              margin: { right: 10 },
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                            uiBackground={{
                              color: Color4.create(0.08, 0.1, 0.14, 0.9)
                            }}
                          >
                            <UiEntity
                              uiTransform={{
                                width: 38,
                                height: 38
                              }}
                              uiBackground={{
                                texture: { src: getItemIconPath(item) },
                                textureMode: 'stretch'
                              }}
                            />
                          </UiEntity>
                        ) : null}

                        {/* Nombre y Cantidad Disponible */}
                        <UiEntity
                          uiTransform={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                          }}
                        >
                          <UiEntity
                            uiText={{
                              value: item ? (getLanguage() === 'en' ? item.nameEn : item.nameEs) : itemId,
                              fontSize: 13,
                              color: Color4.create(1.0, 1.0, 1.0, 1.0),
                              textAlign: 'middle-left'
                            }}
                          />
                          <UiEntity
                            uiText={{
                              value: `${t('common.qty')}: ${owned} | ${t('forge.inCrucible')}: ${inForge}`,
                              fontSize: 11,
                              color: Color4.create(0.4, 0.9, 1.0, 0.85),
                              textAlign: 'middle-left'
                            }}
                          />
                        </UiEntity>
                      </UiEntity>

                      {/* Controles Táctiles + / - */}
                      <UiEntity
                        uiTransform={{
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                      >
                        <UiEntity
                          uiTransform={{
                            width: 34,
                            height: 32,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: { right: 6 },
                            pointerFilter: 'block'
                          }}
                          uiBackground={{
                            color: inForge > 0 ? Color4.create(0.35, 0.15, 0.15, 0.9) : Color4.create(0.2, 0.2, 0.2, 0.5)
                          }}
                          onMouseDown={() => {
                            removeForgeMaterial(itemId)
                          }}
                          uiText={{
                            value: '-',
                            fontSize: 18,
                            color: Color4.White()
                          }}
                        />

                        <UiEntity
                          uiTransform={{
                            width: 34,
                            height: 32,
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerFilter: 'block'
                          }}
                          uiBackground={{
                            color: inForge < owned && totalSelectedCount < 12 ? Color4.create(0.15, 0.35, 0.2, 0.9) : Color4.create(0.2, 0.2, 0.2, 0.5)
                          }}
                          onMouseDown={() => {
                            addForgeMaterial(itemId)
                          }}
                          uiText={{
                            value: '+',
                            fontSize: 18,
                            color: Color4.White()
                          }}
                        />
                      </UiEntity>
                    </UiEntity>
                  )
                })}
              </UiEntity>
            )}
          </UiEntity>

          {/* Columna Derecha: Panel de Vista Previa y Mezcla (Ancho 450px) */}
          <UiEntity
            uiTransform={{
              width: 450,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: { top: 14, bottom: 14, left: 16, right: 16 }
            }}
            uiBackground={{
              color: Color4.create(0.1, 0.12, 0.18, 0.95)
            }}
          >
            {/* Cabecera del Crisol */}
            <UiEntity
              uiTransform={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <UiEntity
                uiText={{
                  value: `🧪 ${t('forge.crucibleTitle')}`,
                  fontSize: 15,
                  color: Color4.create(1.0, 0.85, 0.35, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiText={{
                  value: `${t('forge.totalSelected')}: ${totalSelectedCount} / 12 (${t('forge.minRequired')}: 5)`,
                  fontSize: 12,
                  color: hasMinItems ? Color4.create(0.4, 1.0, 0.5, 1.0) : Color4.create(1.0, 0.4, 0.4, 1.0),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>

            {/* Tarjeta de Vista Previa Proyectada */}
            {projectedResult ? (
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 320,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: { top: 10, bottom: 10, left: 14, right: 14 }
                }}
                uiBackground={{
                  color: projectedResult.isValidRecipe
                    ? Color4.create(0.14, 0.17, 0.24, 0.9)
                    : Color4.create(0.22, 0.12, 0.14, 0.9)
                }}
              >
                {/* Icono Elemental y Nombre Procedural / Oficial */}
                <UiEntity
                  uiTransform={{
                    height: 28,
                    margin: { bottom: 2 }
                  }}
                  uiText={{
                    value: `${getAffinityIcon(projectedResult.config.affinity)} ${projectedResult.config.name}`,
                    fontSize: 16,
                    color: projectedResult.isValidRecipe ? Color4.create(1.0, 0.85, 0.3, 1.0) : Color4.create(1.0, 0.4, 0.4, 1.0),
                    textAlign: 'middle-center'
                  }}
                />

                {/* Tier y Afinidad */}
                <UiEntity
                  uiTransform={{
                    height: 20,
                    margin: { bottom: 6 }
                  }}
                  uiText={{
                    value: `${t('common.tier')} ${projectedResult.tier} | ${getLocalizedAffinity(projectedResult.config.affinity)}`,
                    fontSize: 12,
                    color: Color4.create(0.4, 0.9, 1.0, 1.0),
                    textAlign: 'middle-center'
                  }}
                />

                {/* Banner de Validación de Receta */}
                {!projectedResult.isValidRecipe ? (
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      padding: { top: 4, bottom: 4, left: 6, right: 6 },
                      margin: { bottom: 6 },
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    uiBackground={{
                      color: Color4.create(0.45, 0.1, 0.1, 0.95)
                    }}
                  >
                    <UiEntity
                      uiText={{
                        value: t('forge.invalidRecipeWarning'),
                        fontSize: 10,
                        color: Color4.create(1.0, 0.85, 0.85, 1.0),
                        textAlign: 'middle-center'
                      }}
                    />
                  </UiEntity>
                ) : (
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      padding: { top: 3, bottom: 3, left: 6, right: 6 },
                      margin: { bottom: 4 },
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    uiBackground={{
                      color: Color4.create(0.1, 0.35, 0.15, 0.95)
                    }}
                  >
                    <UiEntity
                      uiText={{
                        value: `${t('forge.validRecipeBadge')} (#${projectedResult.officialRecipe?.numberStr})`,
                        fontSize: 10,
                        color: Color4.create(0.6, 1.0, 0.7, 1.0),
                        textAlign: 'middle-center'
                      }}
                    />
                  </UiEntity>
                )}

                {/* Miniatura PNG Render 3D del Golem resultante en la Vista Previa */}
                {projectedResult.isValidRecipe ? (
                  <UiEntity
                    uiTransform={{
                      width: 88,
                      height: 88,
                      margin: { top: 2, bottom: 6 },
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    uiBackground={{
                      color: Color4.create(0.08, 0.1, 0.16, 0.95)
                    }}
                  >
                    <UiEntity
                      uiTransform={{
                        width: 82,
                        height: 82
                      }}
                      uiBackground={{
                        texture: { src: getGolemIconPath(projectedResult.config) },
                        textureMode: 'stretch'
                      }}
                    />
                  </UiEntity>
                ) : null}

                {/* Fila de Miniaturas PNG de Materiales en el Crisol */}
                <UiEntity
                  uiTransform={{
                    width: '100%',
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: { bottom: 8 }
                  }}
                >
                  {Object.keys(selected).map((matId) => {
                    const matItem = COLLECTABLE_ITEMS[matId]
                    const cnt = selected[matId]
                    if (!matItem || cnt <= 0) return null

                    return (
                      <UiEntity
                        key={matId}
                        uiTransform={{
                          width: 34,
                          height: 34,
                          margin: { left: 2, right: 2 },
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        uiBackground={{
                          color: Color4.create(0.08, 0.1, 0.15, 0.95)
                        }}
                      >
                        <UiEntity
                          uiTransform={{
                            width: 30,
                            height: 30
                          }}
                          uiBackground={{
                            texture: { src: getItemIconPath(matItem) },
                            textureMode: 'stretch'
                          }}
                        />
                        {cnt > 1 ? (
                          <UiEntity
                            uiTransform={{
                              positionType: 'absolute',
                              position: { bottom: 0, right: 0 },
                              padding: { left: 2, right: 2 }
                            }}
                            uiBackground={{
                              color: Color4.create(0.9, 0.2, 0.2, 0.95)
                            }}
                            uiText={{
                              value: `${cnt}`,
                              fontSize: 9,
                              color: Color4.White()
                            }}
                          />
                        ) : null}
                      </UiEntity>
                    )
                  })}
                </UiEntity>

                {/* Grilla de Estadísticas Proyectadas */}
                <UiEntity
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch'
                  }}
                >
                  <UiEntity
                    uiTransform={{ height: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <UiEntity uiText={{ value: `❤️ ${t('common.hp')}:`, fontSize: 12, color: Color4.White() }} />
                    <UiEntity uiText={{ value: `${projectedResult.stats.maxHp}`, fontSize: 13, color: Color4.create(0.4, 1.0, 0.5, 1.0) }} />
                  </UiEntity>

                  <UiEntity
                    uiTransform={{ height: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <UiEntity uiText={{ value: `⚔️ ${t('common.attack')}:`, fontSize: 12, color: Color4.White() }} />
                    <UiEntity uiText={{ value: `${projectedResult.stats.attack}`, fontSize: 13, color: Color4.create(1.0, 0.4, 0.4, 1.0) }} />
                  </UiEntity>

                  <UiEntity
                    uiTransform={{ height: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <UiEntity uiText={{ value: `🛡️ ${t('common.defense')}:`, fontSize: 12, color: Color4.White() }} />
                    <UiEntity uiText={{ value: `${projectedResult.stats.defense}`, fontSize: 13, color: Color4.create(0.4, 0.8, 1.0, 1.0) }} />
                  </UiEntity>

                  <UiEntity
                    uiTransform={{ height: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <UiEntity uiText={{ value: `⚡ ${t('common.speed')}:`, fontSize: 12, color: Color4.White() }} />
                    <UiEntity uiText={{ value: `${projectedResult.stats.speed}`, fontSize: 13, color: Color4.create(1.0, 0.9, 0.3, 1.0) }} />
                  </UiEntity>
                </UiEntity>
              </UiEntity>
            ) : (
              <UiEntity
                uiTransform={{
                  width: '100%',
                  height: 320,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <UiEntity
                  uiText={{
                    value: t('forge.selectItemsHint'),
                    fontSize: 13,
                    color: Color4.create(0.6, 0.6, 0.6, 1.0),
                    textAlign: 'middle-center'
                  }}
                />
              </UiEntity>
            )}

            {/* Fila de Botones de Acción */}
            <UiEntity
              uiTransform={{
                width: '100%',
                height: 48,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {/* Botón Limpiar */}
              <UiEntity
                uiTransform={{
                  width: 110,
                  height: 42,
                  justifyContent: 'center',
                  alignItems: 'center',
                  pointerFilter: 'block'
                }}
                uiBackground={{
                  color: Color4.create(0.22, 0.2, 0.24, 0.9)
                }}
                onMouseDown={() => {
                  clearForgeMaterials()
                }}
                uiText={{
                  value: t('forge.clearButton'),
                  fontSize: 13,
                  color: Color4.create(0.85, 0.85, 0.85, 1.0)
                }}
              />

              {/* Botón Accionar Forja (SOLO HABILITADO SI RECETA ES VÁLIDA Y TIENE MIN 5 ITEMS) */}
              {(() => {
                const canCraft = hasMinItems && projectedResult !== null && projectedResult.isValidRecipe

                return (
                  <UiEntity
                    uiTransform={{
                      width: 290,
                      height: 42,
                      justifyContent: 'center',
                      alignItems: 'center',
                      pointerFilter: 'block'
                    }}
                    uiBackground={{
                      color: canCraft ? Color4.create(0.18, 0.42, 0.24, 0.95) : Color4.create(0.2, 0.2, 0.2, 0.5)
                    }}
                    onMouseDown={() => {
                      if (!canCraft || !projectedResult) return

                      // 1. Cerrar UI modal
                      setIsForgeUIOpen(false)

                      // 2. Descontar materiales utilizados del inventario
                      for (const [itemId, count] of Object.entries(selected)) {
                        removeMaterialFromInventory(itemId, count)
                      }

                      const createdConfig = projectedResult.config

                      // 3. Disparar cinemática de forja en 3 perspectivas
                      playFactoryForgingCinematic(createdConfig, () => {
                        // Verificar si el usuario ya posee un golem seguidor activo
                        const currentSquad = getLocalActiveSquad()
                        const hasActiveFollower = currentSquad && currentSquad.length > 0

                        if (!hasActiveFollower) {
                          // El usuario no tenía golem activo: asignarlo como su único seguidor por el mapa
                          setLocalActiveSquad([createdConfig])
                          spawnActivePlayerGolem(createdConfig)
                          addCombatLog(t('forge.golemActiveFollower', { name: createdConfig.name }), '#00FF66')
                        } else {
                          // El usuario ya tiene 1 golem seguidor: guardar en reserva
                          addGolemToReserve(createdConfig)
                          addCombatLog(t('forge.golemSentToVault', { name: createdConfig.name }), '#FFE600')
                        }
                      })

                      // 4. Limpiar selección de la bahía de forja
                      clearForgeMaterials()
                    }}
                    uiText={{
                      value: canCraft
                        ? t('forge.craftButton')
                        : (!hasMinItems
                            ? t('forge.minRequired') + ': 5'
                            : '⚠️ Receta No Válida'),
                      fontSize: 14,
                      color: canCraft ? Color4.White() : Color4.create(0.7, 0.7, 0.7, 1.0)
                    }}
                  />
                )
              })()}
            </UiEntity>
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}
