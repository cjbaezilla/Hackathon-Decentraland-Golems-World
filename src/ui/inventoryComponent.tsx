import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { t, getLanguage } from '../i18n'
import { getIsInventoryOpen, toggleInventory, getPlayerInventory } from '../state'
import { COLLECTABLE_ITEMS, ItemRarity, RARITY_COLOR_MAP, ItemConfig } from '../config/items'
import { getAffinityIcon } from '../ui'

// Variables de estado local para filtros, selección y tooltip activo
let selectedRarityFilter: 'all' | ItemRarity = 'all'
let tooltipItemId: string | null = null

/**
 * Obtiene la ruta relativa de la imagen PNG almacenada en assets/items/<rareza>/<id_item>.png junto a su modelo 3D GLB.
 */
export function getItemIconPath(item: ItemConfig): string {
  return `assets/items/${item.rarity}/${item.id}.png`
}

/**
 * ============================================================================
 * MODAL DE INVENTARIO DE CHATARRA (REACT-ECS SDK7 - STEAMPUNK GRID UI)
 * ============================================================================
 * Interfaz de usuario completa con eventos de puntero directos sin bucles de propagación.
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

  // Filtrar según la rareza activa
  const filteredConfigs = selectedRarityFilter === 'all'
    ? ownedConfigs
    : ownedConfigs.filter((cfg) => cfg.rarity === selectedRarityFilter)

  // Si el tooltip activo ya no está en la lista filtrada, cerrarlo
  if (tooltipItemId && !filteredConfigs.some((cfg) => cfg.id === tooltipItemId)) {
    tooltipItemId = null
  }

  const activeTooltipConfig = tooltipItemId ? COLLECTABLE_ITEMS[tooltipItemId] : null

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
      {/* Tarjeta Central del Inventario (920x540px Centrada al 100% de Ancho) */}
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
        {/* 1. CABECERA: Título, Contador de Variedad y Botón de Cierre            */}
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
                padding: { top: 4, bottom: 4, left: 10, right: 10 },
                pointerFilter: 'none'
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
              width: 38,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.28, 0.1, 0.1, 0.95)
            }}
            onMouseDown={() => {
              toggleInventory()
            }}
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
        {/* 2. BARRA DE FILTROS POR RAREZA                                         */}
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
              color: selectedRarityFilter === 'all'
                ? Color4.create(0.22, 0.30, 0.40, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedRarityFilter = 'all' }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('inventory.filterAll'),
                fontSize: 13,
                color: selectedRarityFilter === 'all'
                  ? Color4.create(1.0, 0.9, 0.4, 1.0)
                  : Color4.create(0.7, 0.75, 0.8, 0.9)
              }}
            />
          </UiEntity>

          {/* Botón Común */}
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
              color: selectedRarityFilter === ItemRarity.COMMON
                ? Color4.create(0.25, 0.25, 0.28, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedRarityFilter = ItemRarity.COMMON }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('rarities.common'),
                fontSize: 12.5,
                color: Color4.create(0.75, 0.75, 0.75, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Poco Común */}
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
              color: selectedRarityFilter === ItemRarity.UNCOMMON
                ? Color4.create(0.1, 0.3, 0.15, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedRarityFilter = ItemRarity.UNCOMMON }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('rarities.uncommon'),
                fontSize: 12.5,
                color: Color4.create(0.2, 1.0, 0.4, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Raro */}
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
              color: selectedRarityFilter === ItemRarity.RARE
                ? Color4.create(0.1, 0.25, 0.35, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedRarityFilter = ItemRarity.RARE }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('rarities.rare'),
                fontSize: 12.5,
                color: Color4.create(0.2, 0.85, 1.0, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Épico */}
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
              color: selectedRarityFilter === ItemRarity.EPIC
                ? Color4.create(0.25, 0.12, 0.35, 0.95)
                : Color4.create(0.10, 0.13, 0.18, 0.85)
            }}
            onMouseDown={() => { selectedRarityFilter = ItemRarity.EPIC }}
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('rarities.epic'),
                fontSize: 12.5,
                color: Color4.create(0.8, 0.35, 1.0, 1.0)
              }}
            />
          </UiEntity>

          {/* Botón Legendario */}
          <UiEntity
            uiTransform={{
              height: 32,
              padding: { left: 12, right: 12 },
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
          >
            <UiEntity
              uiTransform={{ pointerFilter: 'none' }}
              uiText={{
                value: t('rarities.legendary'),
                fontSize: 12.5,
                color: Color4.create(1.0, 0.7, 0.1, 1.0)
              }}
            />
          </UiEntity>
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 3. REJILLA/CUADRÍCULA CONTINUA DE CELDAS CUADRADAS GRANDES (98x98px)   */}
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
          {filteredConfigs.length === 0 ? (
            /* Estado Vacío / Sin Ítems */
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
                  value: '📦',
                  fontSize: 48,
                  textAlign: 'middle-center'
                }}
              />
              <UiEntity
                uiTransform={{ margin: { top: 12 }, pointerFilter: 'none' }}
                uiText={{
                  value: t('inventory.empty'),
                  fontSize: 14,
                  color: Color4.create(0.7, 0.75, 0.8, 0.9),
                  textAlign: 'middle-center'
                }}
              />
            </UiEntity>
          ) : (
            /* Casilleros Cuadrados en Cuadrícula (98x98px) con Imagen PNG de Showcase */
            filteredConfigs.map((item) => {
              const qty = inventory[item.id] || 0
              const isTooltipActive = tooltipItemId === item.id
              const rarityColorInfo = RARITY_COLOR_MAP[item.rarity] || RARITY_COLOR_MAP[ItemRarity.COMMON]

              return (
                <UiEntity
                  key={`grid_cell_${item.id}`}
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
                    tooltipItemId = isTooltipActive ? null : item.id
                  }}
                >
                  {/* Barra Superior de Color de Rareza */}
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      height: 4,
                      margin: { bottom: 2 },
                      pointerFilter: 'none'
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

                  {/* Imagen PNG del Material */}
                  <UiEntity
                    uiTransform={{
                      width: 48,
                      height: 48,
                      margin: { top: 2, bottom: 2 },
                      pointerFilter: 'none'
                    }}
                    uiBackground={{
                      texture: { src: getItemIconPath(item) },
                      textureMode: 'stretch'
                    }}
                  />

                  {/* Nombre del Ítem (Centrado) */}
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      pointerFilter: 'none'
                    }}
                    uiText={{
                      value: isEn ? item.nameEn : item.nameEs,
                      fontSize: 10,
                      color: isTooltipActive
                        ? Color4.create(1.0, 0.9, 0.4, 1.0)
                        : Color4.create(0.9, 0.92, 0.96, 1.0),
                      textAlign: 'middle-center'
                    }}
                  />

                  {/* Insignia Inferior Derecha de Cantidad (xN) */}
                  <UiEntity
                    uiTransform={{
                      width: '100%',
                      height: 16,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      pointerFilter: 'none'
                    }}
                  >
                    <UiEntity
                      uiTransform={{
                        padding: { top: 1, bottom: 1, left: 6, right: 6 },
                        pointerFilter: 'none'
                      }}
                      uiBackground={{
                        color: Color4.create(0.14, 0.20, 0.28, 0.92)
                      }}
                      uiText={{
                        value: `x${qty}`,
                        fontSize: 10.5,
                        color: Color4.create(0.4, 0.9, 1.0, 1.0),
                        textAlign: 'middle-right'
                      }}
                    />
                  </UiEntity>
                </UiEntity>
              )
            })
          )}
        </UiEntity>

        {/* ---------------------------------------------------------------------- */}
        {/* 4. TARJETA DE TOOLTIP EMERGENTE (EMERGENT TOOLTIP CARD OVERLAY)        */}
        {/* ---------------------------------------------------------------------- */}
        {activeTooltipConfig ? (
          <UiEntity
            uiTransform={{
              positionType: 'absolute',
              position: { top: 60, right: 28 },
              width: 330,
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
            {/* Cabecera del Tooltip: Imagen PNG, Nombre, Rareza y Cierre */}
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
                    texture: { src: getItemIconPath(activeTooltipConfig) },
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
                      value: isEn ? activeTooltipConfig.nameEn : activeTooltipConfig.nameEs,
                      fontSize: 15.5,
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
                        RARITY_COLOR_MAP[activeTooltipConfig.rarity].rgb[0] * 0.3,
                        RARITY_COLOR_MAP[activeTooltipConfig.rarity].rgb[1] * 0.3,
                        RARITY_COLOR_MAP[activeTooltipConfig.rarity].rgb[2] * 0.3,
                        0.9
                      )
                    }}
                    uiText={{
                      value: t(`rarities.${activeTooltipConfig.rarity}`).toUpperCase(),
                      fontSize: 10.5,
                      color: Color4.create(
                        RARITY_COLOR_MAP[activeTooltipConfig.rarity].rgb[0],
                        RARITY_COLOR_MAP[activeTooltipConfig.rarity].rgb[1],
                        RARITY_COLOR_MAP[activeTooltipConfig.rarity].rgb[2],
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
                onMouseDown={() => { tooltipItemId = null }}
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

            {/* Metadatos: Zona de Origen y Cantidad */}
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
                uiTransform={{ pointerFilter: 'none' }}
                uiText={{
                  value: `📍 ${t('inventory.originZone')}: ${activeTooltipConfig.zone}`,
                  fontSize: 11.5,
                  color: Color4.create(0.7, 0.8, 0.9, 0.95),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ margin: { top: 3 }, pointerFilter: 'none' }}
                uiText={{
                  value: `📦 ${t('inventory.ownedQuantity')}: ${inventory[activeTooltipConfig.id] || 0}`,
                  fontSize: 12,
                  color: Color4.create(0.4, 0.9, 1.0, 1.0),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                uiTransform={{ margin: { top: 3 }, pointerFilter: 'none' }}
                uiText={{
                  value: `📊 ${t('inventory.spawnWeight')}: ${(activeTooltipConfig.spawnWeight * 100).toFixed(1)}%`,
                  fontSize: 11,
                  color: Color4.create(0.8, 0.85, 0.9, 0.85),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>

            {/* Aporte de Estadísticas para la Forja */}
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
                  value: `🔨 ${t('inventory.statContribution')}:`,
                  fontSize: 12,
                  color: Color4.create(1.0, 0.85, 0.4, 1.0),
                  textAlign: 'middle-left'
                }}
              />

              {activeTooltipConfig.statsContribution.attackBonus ? (
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `• ${t('inventory.statAttack')}: +${activeTooltipConfig.statsContribution.attackBonus}`,
                    fontSize: 11.5,
                    color: Color4.create(1.0, 0.4, 0.4, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
              ) : null}

              {activeTooltipConfig.statsContribution.defenseBonus ? (
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `• ${t('inventory.statDefense')}: +${activeTooltipConfig.statsContribution.defenseBonus}`,
                    fontSize: 11.5,
                    color: Color4.create(0.4, 0.7, 1.0, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
              ) : null}

              {activeTooltipConfig.statsContribution.hpBonus ? (
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `• ${t('inventory.statHp')}: +${activeTooltipConfig.statsContribution.hpBonus}`,
                    fontSize: 11.5,
                    color: Color4.create(0.4, 1.0, 0.5, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
              ) : null}

              {activeTooltipConfig.statsContribution.speedBonus ? (
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `• ${t('inventory.statSpeed')}: +${activeTooltipConfig.statsContribution.speedBonus}`,
                    fontSize: 11.5,
                    color: Color4.create(1.0, 0.9, 0.3, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
              ) : null}

              {activeTooltipConfig.statsContribution.affinityFocus ? (
                <UiEntity
                  uiTransform={{ pointerFilter: 'none' }}
                  uiText={{
                    value: `• ${t('inventory.statAffinity')}: ${getAffinityIcon(activeTooltipConfig.statsContribution.affinityFocus)} ${activeTooltipConfig.statsContribution.affinityFocus}`,
                    fontSize: 11.5,
                    color: Color4.create(0.9, 0.5, 1.0, 1.0),
                    textAlign: 'middle-left'
                  }}
                />
              ) : null}
            </UiEntity>
          </UiEntity>
        ) : null}
      </UiEntity>
    </UiEntity>
  )
}
