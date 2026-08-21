import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { t, getLanguage } from '../i18n'
import { getIsInventoryOpen, toggleInventory, getPlayerInventory } from '../state'
import { COLLECTABLE_ITEMS, ItemRarity, RARITY_COLOR_MAP, ItemConfig } from '../config/items'
import { getAffinityIcon } from '../ui'

// Variable de estado local para el filtro de rareza seleccionado y el ítem inspeccionado
let selectedRarityFilter: 'all' | ItemRarity = 'all'
let selectedItemId: string | null = null

/**
 * ============================================================================
 * MODAL DE INVENTARIO DE CHATARRA (REACT-ECS SDK7 - STEAMPUNK UI)
 * ============================================================================
 * Interfaz de usuario completa para visualizar y gestionar las 46 variedades
 * de materiales recolectados por el jugador en la escena.
 * 
 * Estructura:
 * 1. Cabecera con Título "🎒 INVENTARIO DE CHATARRA", contador de variedad y botón ✖.
 * 2. Barra de Filtros por Rareza [ Todos | Común | Poco Común | Raro | Épico | Legendario ].
 * 3. Cuerpo en 2 Columnas:
 *    - Izquierda (58%): Lista/Rejilla de ítems poseídos con badges de cantidad y bordes de rareza.
 *    - Derecha (40%): Panel de Inspección con detalles, zona de origen y estadísticas para la Forja.
 * 4. Pie de Modal con consejo para acudir al Distrito de la Forja.
 */
export const InventoryModal = () => {
  if (!getIsInventoryOpen()) return null

  const inventory = getPlayerInventory()
  const isEn = getLanguage() === 'en'

  // Obtener la lista de IDs de ítems que el jugador posee (cantidad > 0)
  const ownedItemIds = Object.keys(inventory).filter((id) => (inventory[id] || 0) > 0)
  const totalVarietiesCount = ownedItemIds.length

  // Obtener las configuraciones de los ítems poseídos
  const ownedConfigs: ItemConfig[] = ownedItemIds
    .map((id) => COLLECTABLE_ITEMS[id])
    .filter((cfg): cfg is ItemConfig => cfg !== undefined)

  // Filtrar según el filtro de rareza activo
  const filteredConfigs = selectedRarityFilter === 'all'
    ? ownedConfigs
    : ownedConfigs.filter((cfg) => cfg.rarity === selectedRarityFilter)

  // Si no hay un ítem seleccionado o el seleccionado ya no está en el filtro, seleccionar el primero si existe
  if (selectedItemId && !filteredConfigs.some((cfg) => cfg.id === selectedItemId)) {
    selectedItemId = filteredConfigs.length > 0 ? filteredConfigs[0].id : null
  } else if (!selectedItemId && filteredConfigs.length > 0) {
    selectedItemId = filteredConfigs[0].id
  }

  const selectedItemConfig = selectedItemId ? COLLECTABLE_ITEMS[selectedItemId] : null

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
      onMouseDown={() => toggleInventory()}
    >
      {/* Tarjeta Central del Inventario (920x540px Centrada) */}
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
      {/* 1. CABECERA: Título, Contador y Botón de Cierre                        */}
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
              value: t('inventory.title'),
              fontSize: 19,
              color: Color4.create(1.0, 0.85, 0.35, 1.0),
              textAlign: 'middle-left'
            }}
          />
          {/* Badge de Variedad de Piezas (X / 46) */}
          <UiEntity
            uiTransform={{
              margin: { left: 14 },
              padding: { top: 3, bottom: 3, left: 8, right: 8 }
            }}
            uiBackground={{
              color: Color4.create(0.12, 0.18, 0.26, 0.9)
            }}
            uiText={{
              value: `${totalVarietiesCount} / 46 ${t('inventory.totalTypes')}`,
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
          onMouseDown={() => toggleInventory()}
          uiText={{
            value: '✖',
            fontSize: 16,
            color: Color4.create(1.0, 0.4, 0.4, 1.0)
          }}
        />
      </UiEntity>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. BARRA DE FILTROS POR RAREZA                                         */}
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
            color: selectedRarityFilter === 'all'
              ? Color4.create(0.22, 0.30, 0.40, 0.95)
              : Color4.create(0.10, 0.13, 0.18, 0.85)
          }}
          onMouseDown={() => { selectedRarityFilter = 'all' }}
          uiText={{
            value: t('inventory.filterAll'),
            fontSize: 13,
            color: selectedRarityFilter === 'all'
              ? Color4.create(1.0, 0.9, 0.4, 1.0)
              : Color4.create(0.7, 0.75, 0.8, 0.9)
          }}
        />

        {/* Botón Común */}
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
            color: selectedRarityFilter === ItemRarity.COMMON
              ? Color4.create(0.25, 0.25, 0.28, 0.95)
              : Color4.create(0.10, 0.13, 0.18, 0.85)
          }}
          onMouseDown={() => { selectedRarityFilter = ItemRarity.COMMON }}
          uiText={{
            value: t('rarities.common'),
            fontSize: 12,
            color: Color4.create(0.75, 0.75, 0.75, 1.0)
          }}
        />

        {/* Botón Poco Común */}
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
            color: selectedRarityFilter === ItemRarity.UNCOMMON
              ? Color4.create(0.1, 0.3, 0.15, 0.95)
              : Color4.create(0.10, 0.13, 0.18, 0.85)
          }}
          onMouseDown={() => { selectedRarityFilter = ItemRarity.UNCOMMON }}
          uiText={{
            value: t('rarities.uncommon'),
            fontSize: 12,
            color: Color4.create(0.2, 1.0, 0.4, 1.0)
          }}
        />

        {/* Botón Raro */}
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
            color: selectedRarityFilter === ItemRarity.RARE
              ? Color4.create(0.1, 0.25, 0.35, 0.95)
              : Color4.create(0.10, 0.13, 0.18, 0.85)
          }}
          onMouseDown={() => { selectedRarityFilter = ItemRarity.RARE }}
          uiText={{
            value: t('rarities.rare'),
            fontSize: 12,
            color: Color4.create(0.2, 0.85, 1.0, 1.0)
          }}
        />

        {/* Botón Épico */}
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
            color: selectedRarityFilter === ItemRarity.EPIC
              ? Color4.create(0.25, 0.12, 0.35, 0.95)
              : Color4.create(0.10, 0.13, 0.18, 0.85)
          }}
          onMouseDown={() => { selectedRarityFilter = ItemRarity.EPIC }}
          uiText={{
            value: t('rarities.epic'),
            fontSize: 12,
            color: Color4.create(0.8, 0.35, 1.0, 1.0)
          }}
        />

        {/* Botón Legendario */}
        <UiEntity
          uiTransform={{
            height: 32,
            padding: { left: 10, right: 10 },
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: selectedRarityFilter === ItemRarity.LEGENDARY
              ? Color4.create(0.35, 0.22, 0.08, 0.95)
              : Color4.create(0.10, 0.13, 0.18, 0.85)
          }}
          onMouseDown={() => { selectedRarityFilter = ItemRarity.LEGENDARY }}
          uiText={{
            value: t('rarities.legendary'),
            fontSize: 12,
            color: Color4.create(1.0, 0.7, 0.1, 1.0)
          }}
        />
      </UiEntity>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. CUERPO DEL INVENTARIO (2 COLUMNAS)                                  */}
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
        {/* COLUMNA IZQUIERDA: Lista de Ítems Poseídos (58% de ancho) */}
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
          {filteredConfigs.length === 0 ? (
            /* Estado Vacío / Sin Ítems */
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
                  value: '📦',
                  fontSize: 42,
                  textAlign: 'middle-center'
                }}
              />
              <UiEntity
                uiTransform={{ margin: { top: 12 } }}
                uiText={{
                  value: t('inventory.empty'),
                  fontSize: 13.5,
                  color: Color4.create(0.7, 0.75, 0.8, 0.9),
                  textAlign: 'middle-center'
                }}
              />
            </UiEntity>
          ) : (
            /* Rejilla/Lista de Objetos Poseídos */
            <UiEntity
              uiTransform={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch'
              }}
            >
              {filteredConfigs.slice(0, 7).map((item) => {
                const qty = inventory[item.id] || 0
                const isSelected = item.id === selectedItemId
                const rarityColorInfo = RARITY_COLOR_MAP[item.rarity] || RARITY_COLOR_MAP[ItemRarity.COMMON]

                return (
                  <UiEntity
                    key={`inv_item_${item.id}`}
                    uiTransform={{
                      width: '100%',
                      height: 48,
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
                    onMouseDown={() => { selectedItemId = item.id }}
                  >
                    {/* Lado Izquierdo: Indicador de Rareza + Nombre */}
                    <UiEntity
                      uiTransform={{
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      {/* Punto/Barra de Color de Rareza */}
                      <UiEntity
                        uiTransform={{
                          width: 8,
                          height: 24,
                          margin: { right: 10 }
                        }}
                        uiBackground={{
                          color: Color4.create(
                            rarityColorInfo.rgb[0],
                            rarityColorInfo.rgb[1],
                            rarityColorInfo.rgb[2],
                            1.0
                          )
                        }}
                      />
                      {/* Nombre del Objeto */}
                      <UiEntity
                        uiText={{
                          value: isEn ? item.nameEn : item.nameEs,
                          fontSize: 14,
                          color: isSelected
                            ? Color4.create(1.0, 0.9, 0.4, 1.0)
                            : Color4.create(0.9, 0.92, 0.95, 1.0),
                          textAlign: 'middle-left'
                        }}
                      />
                    </UiEntity>

                    {/* Lado Derecho: Badge de Cantidad (xN) */}
                    <UiEntity
                      uiTransform={{
                        padding: { top: 2, bottom: 2, left: 8, right: 8 }
                      }}
                      uiBackground={{
                        color: Color4.create(0.14, 0.20, 0.28, 0.9)
                      }}
                      uiText={{
                        value: `x${qty}`,
                        fontSize: 13,
                        color: Color4.create(0.4, 0.9, 1.0, 1.0),
                        textAlign: 'middle-right'
                      }}
                    />
                  </UiEntity>
                )
              })}
            </UiEntity>
          )}
        </UiEntity>

        {/* COLUMNA DERECHA: Panel de Detalles del Objeto Seleccionado (40% de ancho) */}
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
          {selectedItemConfig ? (
            <UiEntity
              uiTransform={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              {/* Sección Superior: Nombre y Tag de Rareza */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: { bottom: 8 }
                }}
              >
                {/* Nombre */}
                <UiEntity
                  uiTransform={{ width: '100%', height: 26 }}
                  uiText={{
                    value: isEn ? selectedItemConfig.nameEn : selectedItemConfig.nameEs,
                    fontSize: 17,
                    color: Color4.create(1.0, 0.88, 0.35, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
                {/* Rareza + Zona de Origen */}
                <UiEntity
                  uiTransform={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: { top: 4 }
                  }}
                >
                  <UiEntity
                    uiTransform={{
                      padding: { top: 2, bottom: 2, left: 6, right: 6 },
                      margin: { right: 8 }
                    }}
                    uiBackground={{
                      color: Color4.create(
                        RARITY_COLOR_MAP[selectedItemConfig.rarity].rgb[0] * 0.3,
                        RARITY_COLOR_MAP[selectedItemConfig.rarity].rgb[1] * 0.3,
                        RARITY_COLOR_MAP[selectedItemConfig.rarity].rgb[2] * 0.3,
                        0.9
                      )
                    }}
                    uiText={{
                      value: t(`rarities.${selectedItemConfig.rarity}`),
                      fontSize: 11.5,
                      color: Color4.create(
                        RARITY_COLOR_MAP[selectedItemConfig.rarity].rgb[0],
                        RARITY_COLOR_MAP[selectedItemConfig.rarity].rgb[1],
                        RARITY_COLOR_MAP[selectedItemConfig.rarity].rgb[2],
                        1.0
                      )
                    }}
                  />
                  <UiEntity
                    uiText={{
                      value: `📍 ${selectedItemConfig.zone}`,
                      fontSize: 11.5,
                      color: Color4.create(0.7, 0.8, 0.9, 0.95)
                    }}
                  />
                </UiEntity>
              </UiEntity>

              {/* Sección Media: Metadatos y Cantidad */}
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
                    value: `📦 ${t('inventory.ownedQuantity')}: ${inventory[selectedItemConfig.id] || 0}`,
                    fontSize: 13,
                    color: Color4.create(0.4, 0.9, 1.0, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  uiTransform={{ margin: { top: 4 } }}
                  uiText={{
                    value: `📊 ${t('inventory.spawnWeight')}: ${(selectedItemConfig.spawnWeight * 100).toFixed(1)}%`,
                    fontSize: 12,
                    color: Color4.create(0.8, 0.85, 0.9, 0.85),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>

              {/* Sección Inferior: Atributos que aporta a la Forja */}
              <UiEntity
                uiTransform={{
                  width: '100%',
                  flexDirection: 'column',
                  padding: { top: 10, bottom: 10, left: 10, right: 10 }
                }}
                uiBackground={{
                  color: Color4.create(0.14, 0.18, 0.26, 0.92)
                }}
              >
                <UiEntity
                  uiTransform={{ margin: { bottom: 6 } }}
                  uiText={{
                    value: `🔨 ${t('inventory.statContribution')}:`,
                    fontSize: 13,
                    color: Color4.create(1.0, 0.85, 0.4, 1.0),
                    textAlign: 'middle-left'
                  }}
                />

                {selectedItemConfig.statsContribution.attackBonus ? (
                  <UiEntity
                    uiText={{
                      value: `• ${t('inventory.statAttack')}: +${selectedItemConfig.statsContribution.attackBonus}`,
                      fontSize: 12.5,
                      color: Color4.create(1.0, 0.4, 0.4, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                ) : null}

                {selectedItemConfig.statsContribution.defenseBonus ? (
                  <UiEntity
                    uiText={{
                      value: `• ${t('inventory.statDefense')}: +${selectedItemConfig.statsContribution.defenseBonus}`,
                      fontSize: 12.5,
                      color: Color4.create(0.4, 0.7, 1.0, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                ) : null}

                {selectedItemConfig.statsContribution.hpBonus ? (
                  <UiEntity
                    uiText={{
                      value: `• ${t('inventory.statHp')}: +${selectedItemConfig.statsContribution.hpBonus}`,
                      fontSize: 12.5,
                      color: Color4.create(0.4, 1.0, 0.5, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                ) : null}

                {selectedItemConfig.statsContribution.speedBonus ? (
                  <UiEntity
                    uiText={{
                      value: `• ${t('inventory.statSpeed')}: +${selectedItemConfig.statsContribution.speedBonus}`,
                      fontSize: 12.5,
                      color: Color4.create(1.0, 0.9, 0.3, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                ) : null}

                {selectedItemConfig.statsContribution.affinityFocus ? (
                  <UiEntity
                    uiText={{
                      value: `• ${t('inventory.statAffinity')}: ${getAffinityIcon(selectedItemConfig.statsContribution.affinityFocus)} ${selectedItemConfig.statsContribution.affinityFocus}`,
                      fontSize: 12.5,
                      color: Color4.create(0.9, 0.5, 1.0, 1.0),
                      textAlign: 'middle-left'
                    }}
                  />
                ) : null}
              </UiEntity>
            </UiEntity>
          ) : (
            /* Mensaje cuando no hay selección */
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
                  value: t('inventory.selectItem'),
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
      {/* 4. PIE DE MODAL: Consejo orientativo para la Forja                      */}
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
            value: t('inventory.forgeTip'),
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
