import ReactEcs, { UiEntity, Label, Button } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import {
  getIsFieldBattleModalOpen,
  closeFieldBattleModal,
  getActiveFieldTarget,
  getPlayerBrassGears,
  getPlayerBattleStats
} from '../state'
import { getPlayerLevelFromTotalExp, getPlayerExpForNextLevel } from '../data/levelMatrix'
import { getLocalizedAffinity, getLocalizedRarity, t } from '../i18n'
import { startFieldCombat } from '../systems/fieldCombatSystem'

/**
 * ============================================================================
 * COMPONENTE REACT-ECS: MODAL DE ENCUENTRO Y CONFIRMACIÓN DE BATALLA DE CAMPO
 * ============================================================================
 * Interfaz táctil desplegada al seleccionar un Golem salvaje en el mapa a menos de 6m.
 * Muestra el nivel, estadísticas, afinidad, rareza y botín proyectado en Engranajes de Latón.
 */
export function FieldBattleModal(): ReactEcs.JSX.Element | null {
  if (!getIsFieldBattleModalOpen()) return null

  const target = getActiveFieldTarget()
  if (!target || !target.definition) return null

  const def = target.definition
  const affTag = getLocalizedAffinity(def.affinity)
  const rarityTag = getLocalizedRarity(def.rarity)

  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        positionType: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      uiBackground={{ color: Color4.create(0, 0, 0, 0.65) }}
    >
      <UiEntity
        uiTransform={{
          width: 580,
          height: 480,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 24
        }}
        uiBackground={{ color: Color4.create(0.12, 0.12, 0.16, 0.95) }}
      >
        {/* Encabezado */}
        <UiEntity uiTransform={{ width: '100%', justifyContent: 'center' }}>
          <Label
            value={`⚔️ DESAFÍO EN CAMPO ABIERTO`}
            fontSize={26}
            color={Color4.create(1, 0.85, 0.2, 1)}
          />
        </UiEntity>

        {/* Tarjeta del Golem Salvaje */}
        <UiEntity
          uiTransform={{
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 16,
            margin: { top: 10, bottom: 10 }
          }}
          uiBackground={{ color: Color4.create(0.06, 0.07, 0.09, 0.9) }}
        >
          <Label
            value={`🤖 ${def.name}`}
            fontSize={24}
            color={Color4.create(1, 1, 1, 1)}
          />
          <Label
            value={`Nivel ${def.level} • ${def.zoneName}`}
            fontSize={18}
            color={Color4.create(0.4, 0.8, 1, 1)}
          />
          <Label
            value={`[${affTag}] • ${rarityTag}`}
            fontSize={16}
            color={Color4.create(0.9, 0.9, 0.9, 1)}
          />

          {/* Estadísticas del Golem Salvaje */}
          <UiEntity uiTransform={{ flexDirection: 'row', margin: { top: 12 } }}>
            <Label
              value={`❤️ Vida: ${def.maxHp}   |   ⚔️ Atk: ${def.attack}   |   🛡️ Def: ${def.defense}`}
              fontSize={17}
              color={Color4.create(1, 0.9, 0.5, 1)}
            />
          </UiEntity>

          {/* Recompensas de Botín Proyectadas */}
          <UiEntity
            uiTransform={{
              flexDirection: 'column',
              alignItems: 'center',
              margin: { top: 16 },
              padding: 10,
              width: '90%'
            }}
            uiBackground={{ color: Color4.create(0.18, 0.15, 0.08, 0.8) }}
          >
            <Label
              value={`🎁 RECOMPENSAS PROYECTADAS:`}
              fontSize={15}
              color={Color4.create(1, 0.8, 0, 1)}
            />
            <Label
              value={`⭐ +${def.expReward} XP de Jugador y Golem`}
              fontSize={16}
              color={Color4.create(0.2, 1, 0.6, 1)}
            />
            <Label
              value={`🪙 +${def.minBrassGears} a +${def.maxBrassGears} Engranajes de Latón`}
              fontSize={16}
              color={Color4.create(1, 0.85, 0.3, 1)}
            />
          </UiEntity>
        </UiEntity>

        {/* Botones de Acción */}
        <UiEntity uiTransform={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <Button
            value="❌ Cancelar"
            variant="secondary"
            uiTransform={{ width: 220, height: 50 }}
            fontSize={18}
            onMouseDown={() => {
              closeFieldBattleModal()
            }}
          />

          <Button
            value="⚔️ ¡ATACAR!"
            variant="primary"
            uiTransform={{ width: 280, height: 50 }}
            fontSize={20}
            onMouseDown={() => {
              const started = startFieldCombat(target.entity, def)
              if (started) {
                closeFieldBattleModal()
              }
            }}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

/**
 * ============================================================================
 * COMPONENTE REACT-ECS: OVERLAY HUD DE JUGADOR (NIVEL, XP Y ENGRANAJES DE LATÓN)
 * ============================================================================
 * Muestra permanentemente en la esquina superior derecha del HUD el nivel del jugador,
 * la barra de progreso de XP y el contador acumulado de la moneda "Engranajes de Latón".
 */
export function PlayerStatusHudWidget(): ReactEcs.JSX.Element {
  const stats = getPlayerBattleStats()
  const levelInfo = getPlayerLevelFromTotalExp(stats.totalExp)
  const gears = getPlayerBrassGears()

  const expPct = levelInfo.expForNext !== Infinity
    ? Math.min(100, Math.round((levelInfo.currentLevelExp / levelInfo.expForNext) * 100))
    : 100

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 20, left: 320 },
        flexDirection: 'row',
        alignItems: 'center',
        padding: { top: 8, bottom: 8, left: 14, right: 14 }
      }}
      uiBackground={{ color: Color4.create(0.08, 0.09, 0.12, 0.85) }}
    >
      {/* Nivel de Jugador */}
      <UiEntity uiTransform={{ flexDirection: 'column', margin: { right: 16 } }}>
        <Label
          value={`⭐ Lvl ${levelInfo.level}`}
          fontSize={18}
          color={Color4.create(1, 0.85, 0.2, 1)}
        />
        <Label
          value={`XP: ${levelInfo.currentLevelExp}/${levelInfo.expForNext === Infinity ? 'MAX' : levelInfo.expForNext} (${expPct}%)`}
          fontSize={12}
          color={Color4.create(0.8, 0.9, 1, 1)}
        />
      </UiEntity>

      {/* Saldo de Engranajes de Latón (Moneda) */}
      <UiEntity
        uiTransform={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: { top: 4, bottom: 4, left: 10, right: 10 }
        }}
        uiBackground={{ color: Color4.create(0.2, 0.16, 0.05, 0.9) }}
      >
        <Label
          value={`🪙 ${gears} Engranajes`}
          fontSize={16}
          color={Color4.create(1, 0.85, 0.3, 1)}
        />
      </UiEntity>
    </UiEntity>
  )
}
