import ReactEcs, { UiEntity, Label, Button } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import {
  getIsTeslaTowerUIOpen,
  setIsTeslaTowerUIOpen,
  getLocalActiveSquad,
  getGolemReserve,
  getPlayerBrassGears,
  restoreGolemHpTesla,
  restoreAllGolemsHpTesla
} from '../state'
import { t, getLocalizedAffinity } from '../i18n'
import { getGolemDisplayName, GolemConfig, GolemAffinity } from '../config/golems'
import { getGolemIconPath } from './golemInventoryComponent'

/**
 * Mapa de colores RGB representativos por afinidad elemental para la barra estética lateral de los casilleros.
 */
const AFFINITY_COLOR_MAP: Record<string, [number, number, number]> = {
  [GolemAffinity.STEAM]: [1.0, 0.55, 0.1],
  [GolemAffinity.GALVANIC]: [0.2, 0.9, 1.0],
  [GolemAffinity.MECHANICAL]: [1.0, 0.85, 0.3],
  [GolemAffinity.LUMINOUS]: [1.0, 1.0, 0.6],
  [GolemAffinity.AETHER]: [0.8, 0.4, 1.0]
}

/**
 * ============================================================================
 * COMPONENTE REACT-ECS: MODAL DE RECARGA EN TORRE TESLA (STEAMPUNK GRID UI)
 * ============================================================================
 * Interfaz gráfica alineada con la estética oficial del juego (Fábrica e Inventario).
 * Muestra miniaturas de imágenes PNG reales para cada autómata, barra gráfica de vida,
 * indicador bilingüe de tarifa (1 🪙 / HP) y botones de acción táctil.
 */
export function TeslaTowerModal(): ReactEcs.JSX.Element | null {
  if (!getIsTeslaTowerUIOpen()) return null

  const squad = getLocalActiveSquad() || []
  const reserve = getGolemReserve() || []
  const allGolems: GolemConfig[] = [...squad, ...reserve]

  const gearsBalance = getPlayerBrassGears()

  // Calcular daño total acumulado de todos los golems (1 coin per 1 HP)
  let totalMissingHp = 0
  allGolems.forEach((g) => {
    totalMissingHp += Math.max(0, g.maxHp - g.currentHp)
  })
  const totalCost = Math.max(0, Math.ceil(totalMissingHp * 1))

  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        positionType: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      uiBackground={{ color: Color4.create(0, 0, 0, 0.78) }}
    >
      <UiEntity
        uiTransform={{
          width: 760,
          maxHeight: 660,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 22,
          pointerFilter: 'block'
        }}
        uiBackground={{ color: Color4.create(0.06, 0.08, 0.12, 0.96) }}
      >
        {/* 1. ENCABEZADO DE LA MODAL CON ESTILO GALVÁNICO DORADO / CIAN */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 48,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { bottom: 12 }
          }}
        >
          <UiEntity uiTransform={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Label
              value={t('tesla.title')}
              fontSize={22}
              color={Color4.create(1.0, 0.85, 0.35, 1.0)}
            />
            <Label
              value={t('tesla.subtitle')}
              fontSize={13}
              color={Color4.create(0.4, 0.9, 1.0, 0.85)}
            />
          </UiEntity>

          {/* Botón Táctil de Cierre (✖) */}
          <UiEntity
            uiTransform={{
              width: 38,
              height: 38,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{ color: Color4.create(0.24, 0.16, 0.1, 0.95) }}
            onMouseDown={() => setIsTeslaTowerUIOpen(false)}
            uiText={{
              value: '✖',
              fontSize: 18,
              color: Color4.create(1.0, 0.85, 0.4, 1.0),
              textAlign: 'middle-center'
            }}
          />
        </UiEntity>

        {/* 2. SUBBARRA DE SALDO DE MONEDA Y TARIFA OFICIAL (1 🪙 / HP) */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 42,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: { left: 16, right: 16 },
            margin: { bottom: 12 }
          }}
          uiBackground={{ color: Color4.create(0.08, 0.1, 0.15, 0.95) }}
        >
          <Label
            value={`🪙 ${t('tesla.balanceLabel')}: ${gearsBalance} ${t('common.gears')}`}
            fontSize={15}
            color={Color4.create(1.0, 0.85, 0.3, 1.0)}
          />

          <Label
            value={t('tesla.rateInfo')}
            fontSize={13}
            color={Color4.create(0.7, 0.9, 1.0, 0.9)}
          />
        </UiEntity>

        {/* 3. LISTA CONTICUA DE GOLEMS DEL JUGADOR CON MINIATURAS PNG Y BARRAS GRÁFICAS DE HP */}
        <UiEntity
          uiTransform={{
            width: '100%',
            maxHeight: 400,
            flexDirection: 'column',
            alignItems: 'center',
            padding: { right: 4 }
          }}
        >
          {allGolems.length === 0 ? (
            <UiEntity
              uiTransform={{
                width: '100%',
                padding: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Label
                value={t('golemInventory.empty') || 'No posees golems en tu escuadrón o reserva para restaurar.'}
                fontSize={15}
                color={Color4.create(0.7, 0.75, 0.8, 0.9)}
              />
            </UiEntity>
          ) : (
            allGolems.map((golem) => {
              const missingHp = Math.max(0, golem.maxHp - golem.currentHp)
              const cost = Math.max(0, Math.ceil(missingHp * 1))
              const isFull = missingHp <= 0
              const canAfford = gearsBalance >= cost

              const hpRatio = Math.max(0, Math.min(1, golem.currentHp / Math.max(1, golem.maxHp)))
              const hpPct = Math.round(hpRatio * 100)

              // Color dinámico de barra de vida
              let hpBarColor = Color4.create(0.2, 0.85, 0.4, 1.0)
              if (hpRatio < 0.3) {
                hpBarColor = Color4.create(0.9, 0.2, 0.2, 1.0)
              } else if (hpRatio < 0.7) {
                hpBarColor = Color4.create(0.9, 0.65, 0.15, 1.0)
              }

              const affRgb = AFFINITY_COLOR_MAP[golem.affinity] || [0.2, 0.9, 1.0]
              const localizedName = getGolemDisplayName(golem)
              const localizedAffinity = getLocalizedAffinity(golem.affinity)

              return (
                <UiEntity
                  key={`tesla_golem_${golem.id}`}
                  uiTransform={{
                    width: '100%',
                    height: 74,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: { left: 10, right: 12 },
                    margin: { bottom: 8 }
                  }}
                  uiBackground={{ color: Color4.create(0.09, 0.11, 0.16, 0.95) }}
                >
                  {/* Flanco Izquierdo: Tira de Afinidad + Miniatura PNG + Nombre y Estadísticas */}
                  <UiEntity uiTransform={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Barra de Color de Afinidad */}
                    <UiEntity
                      uiTransform={{
                        width: 4,
                        height: 56,
                        margin: { right: 10 }
                      }}
                      uiBackground={{ color: Color4.create(affRgb[0], affRgb[1], affRgb[2], 1.0) }}
                    />

                    {/* Miniatura PNG Real del Golem (assets/models/<folder>/golem_xxx.png) */}
                    <UiEntity
                      uiTransform={{
                        width: 52,
                        height: 52,
                        margin: { right: 12 }
                      }}
                      uiBackground={{
                        texture: { src: getGolemIconPath(golem) },
                        textureMode: 'stretch'
                      }}
                    />

                    {/* Datos de Identificación y Barra Gráfica de HP */}
                    <UiEntity uiTransform={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Label
                        value={localizedName}
                        fontSize={16}
                        color={Color4.create(0.96, 0.96, 0.98, 1.0)}
                      />
                      <Label
                        value={`Lvl ${golem.level} • ${localizedAffinity}`}
                        fontSize={12}
                        color={Color4.create(0.7, 0.75, 0.82, 0.9)}
                        uiTransform={{ margin: { bottom: 4 } }}
                      />

                      {/* Track Contenedor de la Barra de Vida Gráfica */}
                      <UiEntity
                        uiTransform={{
                          width: 210,
                          height: 12,
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 1
                        }}
                        uiBackground={{ color: Color4.create(0.15, 0.18, 0.24, 0.9) }}
                      >
                        {/* Relleno Proporcional de la Vida */}
                        <UiEntity
                          uiTransform={{
                            width: `${hpPct}%`,
                            height: '100%'
                          }}
                          uiBackground={{ color: hpBarColor }}
                        />
                      </UiEntity>

                      {/* Texto de Valor Numerico HP */}
                      <Label
                        value={`${Math.round(golem.currentHp)} / ${Math.round(golem.maxHp)} HP ${missingHp > 0 ? `(-${missingHp} HP)` : ''}`}
                        fontSize={11}
                        color={isFull ? Color4.create(0.4, 0.95, 0.5, 1.0) : Color4.create(1.0, 0.45, 0.45, 1.0)}
                      />
                    </UiEntity>
                  </UiEntity>

                  {/* Flanco Derecho: Botón Táctil de Restauración Individual */}
                  {isFull ? (
                    <UiEntity
                      uiTransform={{
                        padding: { top: 8, bottom: 8, left: 16, right: 16 }
                      }}
                      uiBackground={{ color: Color4.create(0.12, 0.2, 0.14, 0.8) }}
                    >
                      <Label
                        value={`✨ ${t('tesla.fullHp')}`}
                        fontSize={14}
                        color={Color4.create(0.4, 0.95, 0.5, 1.0)}
                      />
                    </UiEntity>
                  ) : (
                    <UiEntity
                      uiTransform={{
                        width: 175,
                        height: 42,
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerFilter: canAfford ? 'block' : 'none'
                      }}
                      uiBackground={{
                        color: canAfford
                          ? Color4.create(0.18, 0.42, 0.22, 0.95)
                          : Color4.create(0.2, 0.2, 0.2, 0.5)
                      }}
                      onMouseDown={() => {
                        if (canAfford) {
                          restoreGolemHpTesla(golem.id)
                        }
                      }}
                      uiText={{
                        value: canAfford
                          ? `⚡ ${t('tesla.restore')} (${cost} 🪙)`
                          : `⚠️ ${t('tesla.notEnoughGears') || 'Engranajes Insuficientes'}`,
                        fontSize: 13,
                        color: canAfford
                          ? Color4.create(1.0, 0.95, 0.4, 1.0)
                          : Color4.create(0.6, 0.6, 0.6, 0.8),
                        textAlign: 'middle-center'
                      }}
                    />
                  )}
                </UiEntity>
              )
            })
          )}
        </UiEntity>

        {/* 4. FOOTER CON BOTÓN MASIVO 'RESTAURAR TODOS LOS GOLEMS' Y BOTÓN DE CIERRE */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { top: 14 }
          }}
        >
          {/* Botón de Cierre */}
          <UiEntity
            uiTransform={{
              width: 150,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{ color: Color4.create(0.24, 0.16, 0.1, 0.95) }}
            onMouseDown={() => setIsTeslaTowerUIOpen(false)}
            uiText={{
              value: `✖ ${t('common.close') || 'CERRAR'}`,
              fontSize: 14,
              color: Color4.create(1.0, 0.85, 0.4, 1.0),
              textAlign: 'middle-center'
            }}
          />

          {/* Botón Principal Masivo 'Restaurar Todos los Golems' */}
          <UiEntity
            uiTransform={{
              width: 480,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: totalCost > 0 && gearsBalance >= totalCost ? 'block' : 'none'
            }}
            uiBackground={{
              color:
                totalCost > 0 && gearsBalance >= totalCost
                  ? Color4.create(0.18, 0.42, 0.22, 0.95)
                  : Color4.create(0.14, 0.16, 0.2, 0.7)
            }}
            onMouseDown={() => {
              if (totalCost > 0 && gearsBalance >= totalCost) {
                restoreAllGolemsHpTesla()
              }
            }}
            uiText={{
              value:
                totalCost > 0
                  ? gearsBalance >= totalCost
                    ? `⚡ ${t('tesla.restoreAll')} (${totalCost} 🪙)`
                    : `⚠️ ${t('tesla.notEnoughGears')} (${totalCost} 🪙)`
                  : `✨ ${t('tesla.noGolemsNeedHp')}`,
              fontSize: 14,
              color:
                totalCost > 0 && gearsBalance >= totalCost
                  ? Color4.create(1.0, 0.95, 0.4, 1.0)
                  : Color4.create(0.65, 0.7, 0.75, 0.8),
              textAlign: 'middle-center'
            }}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}
