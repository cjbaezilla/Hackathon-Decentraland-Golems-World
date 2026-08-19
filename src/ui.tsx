import ReactEcs, { ReactEcsRenderer, UiEntity, Label, Button } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { engine, Transform } from '@dcl/sdk/ecs'
import { GolemFollowerComponent } from './components/follower'
import { GolemCombatComponent, GOLEM_TEAMS } from './components/combat'
import { getConnectedPlayersCount, getLocalPlayerId, announceLocalSquad } from './multiplayer'
import {
  getLocalActiveSquad,
  setLocalActiveSquad,
  getIsInsideArena,
  getPlayerBattleStats,
  getCombatLogs,
  addCombatLog
} from './state'
import { GolemAffinity, generateRandomSquad } from './config/golems'
import { getHealthBarAscii, createFollowerGolem, removePlayerSquad } from './objects/golemFactory'

/**
 * Inicialización de la Interfaz de Usuario 2D (React-ECS).
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 */
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * Obtiene el conteo total de golems activos en la escena.
 */
function getActiveGolemsCount(): number {
  let count = 0
  for (const [_entity] of engine.getEntitiesWith(GolemCombatComponent)) {
    count++
  }
  return count
}

/**
 * Devuelve un icono elemental representativo según la afinidad del golem.
 */
function getAffinityIcon(affinity: string): string {
  switch (affinity) {
    case GolemAffinity.STEAM:
    case 'Vapor':
      return '♨️'
    case GolemAffinity.GALVANIC:
    case 'Galvánico':
      return '⚡'
    case GolemAffinity.MECHANICAL:
    case 'Mecánico':
      return '⚙️'
    case GolemAffinity.LUMINOUS:
    case 'Luminoso':
      return '☀️'
    case GolemAffinity.AETHER:
    case 'Éter':
      return '🔮'
    default:
      return '🤖'
  }
}

/**
 * Genera un nuevo escuadrón completo si los golems del jugador cayeron en combate.
 */
function respawnLocalSquad() {
  const localId = getLocalPlayerId()
  removePlayerSquad(localId)
  removePlayerSquad('local')

  const newSquad = generateRandomSquad(localId)
  setLocalActiveSquad(newSquad)

  let spawnBase = Vector3.create(16, 0.1, 16)
  if (Transform.has(engine.PlayerEntity)) {
    const pPos = Transform.get(engine.PlayerEntity).position
    spawnBase = Vector3.create(pPos.x, Math.max(0.1, pPos.y), pPos.z)
  }

  newSquad.forEach((config, index) => {
    const spawnPos = Vector3.create(spawnBase.x, spawnBase.y, spawnBase.z - config.followDistance)
    createFollowerGolem(config, index, spawnPos, localId, GOLEM_TEAMS.PLAYER)
  })

  announceLocalSquad(newSquad)
  addCombatLog('✨ ¡Nuevo escuadrón de Golems convocado con éxito!', '#00FFAA')
}

/**
 * Componente raíz de UI con panel HUD de estado multijugador, tarjetas de escuadrón y registro de combate
 * ubicados de forma compacta en la zona superior central para no obstruir el chat ni los controles táctiles.
 */
export const uiComponent = () => {
  const playersCount = getConnectedPlayersCount()
  const golemsCount = getActiveGolemsCount()
  const localSquad = getLocalActiveSquad()
  const isInsideArena = getIsInsideArena()
  const battleStats = getPlayerBattleStats()
  const combatLogs = getCombatLogs()

  // Consultar estado en tiempo real de los golems locales directamente de los componentes ECS
  const liveGolemMap = new Map<
    string,
    {
      currentHp: number
      maxHp: number
      level: number
      currentExp: number
      attack: number
      defense: number
      speed: number
    }
  >()

  for (const [entity] of engine.getEntitiesWith(GolemCombatComponent)) {
    const combat = GolemCombatComponent.get(entity)
    liveGolemMap.set(combat.golemId, {
      currentHp: combat.currentHp,
      maxHp: combat.maxHp,
      level: combat.level,
      currentExp: combat.currentExp,
      attack: combat.attack,
      defense: combat.defense,
      speed: combat.speed
    })
  }

  const liveSquad = localSquad
    ? localSquad.map((g) => {
        const live = liveGolemMap.get(g.id)
        if (live) {
          return {
            ...g,
            currentHp: live.currentHp,
            maxHp: live.maxHp,
            level: live.level,
            currentExp: live.currentExp,
            attack: live.attack,
            defense: live.defense,
            speed: live.speed
          }
        }
        return g
      })
    : null

  // Comprobar si todo el escuadrón local fue derrotado
  const allDead = liveSquad && liveSquad.length > 0 && liveSquad.every((g) => g.currentHp <= 0)

  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        pointerFilter: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: { top: 10 }
      }}
    >
      {/* CONTENEDOR PRINCIPAL SUPERIOR CONSOLIDADO */}
      <UiEntity
        uiTransform={{
          width: 780,
          flexDirection: 'column',
          alignItems: 'center',
          pointerFilter: 'none'
        }}
      >
        {/* 1. CABECERA: TÍTULO, MODO DE JUEGO Y ESTADÍSTICAS */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 74,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { top: 6, bottom: 6, left: 14, right: 14 },
            pointerFilter: 'none'
          }}
          uiBackground={{
            color: Color4.create(0.06, 0.08, 0.12, 0.94)
          }}
        >
          <Label
            value="🏟️ GOLEMS' WORLD · GRAN ARENA STEAMPUNK"
            fontSize={15}
            color={Color4.create(1.0, 0.8, 0.2, 1.0)}
            uiTransform={{ height: 19 }}
          />

          <Label
            value={
              isInsideArena
                ? '⚔️ MODO COMBATE "FREE FOR ALL" ACTIVO (¡TODOS CONTRA TODOS!)'
                : '🛡️ ZONA DE EXPLORACIÓN (MODO SEGUIDOR)'
            }
            fontSize={12}
            color={
              isInsideArena
                ? Color4.create(1.0, 0.35, 0.35, 1.0)
                : Color4.create(0.2, 0.9, 0.9, 1.0)
            }
            uiTransform={{ height: 17 }}
          />

          <Label
            value={`👥 Jugadores: ${playersCount}  |  ⚡ Golems: ${golemsCount}  |  🏆 Derrotas: ${battleStats.totalKills}  |  ⭐ EXP Total: ${battleStats.totalExp}`}
            fontSize={11}
            color={Color4.create(0.85, 0.9, 0.95, 1.0)}
            uiTransform={{ height: 16 }}
          />
        </UiEntity>

        {/* 2. FILA DE TARJETAS DE ESCUADRÓN (DIRECTAMENTE DEBAJO DE LA CABECERA) */}
        {liveSquad && (
          <UiEntity
            uiTransform={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: { top: 6 },
              pointerFilter: 'none'
            }}
          >
            {liveSquad.map((golem, idx) => {
              const hpBar = getHealthBarAscii(golem.currentHp, golem.maxHp)
              const isAlive = golem.currentHp > 0

              return (
                <UiEntity
                  key={golem.id || `golem_${idx}`}
                  uiTransform={{
                    width: 254,
                    height: 88,
                    padding: { top: 5, bottom: 5, left: 8, right: 8 },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    pointerFilter: 'none'
                  }}
                  uiBackground={{
                    color: isAlive
                      ? Color4.create(0.07, 0.10, 0.15, 0.92)
                      : Color4.create(0.18, 0.05, 0.05, 0.92)
                  }}
                >
                  <Label
                    value={`${getAffinityIcon(golem.affinity)} ${golem.name} (Nv.${golem.level})`}
                    fontSize={12}
                    color={
                      isAlive
                        ? Color4.create(1.0, 0.85, 0.3, 1.0)
                        : Color4.create(0.8, 0.3, 0.3, 1.0)
                    }
                    uiTransform={{ height: 16 }}
                  />

                  <Label
                    value={`[${hpBar}] ${Math.round(golem.currentHp)}/${Math.round(golem.maxHp)} HP`}
                    fontSize={11}
                    color={
                      isAlive
                        ? Color4.create(0.3, 0.95, 0.6, 1.0)
                        : Color4.create(0.9, 0.3, 0.3, 1.0)
                    }
                    uiTransform={{ height: 15 }}
                  />

                  <Label
                    value={`⚔️ ATK: ${golem.attack}  🛡️ DEF: ${golem.defense}  ⚡ SPD: ${golem.speed}`}
                    fontSize={10}
                    color={Color4.create(0.8, 0.85, 0.9, 1.0)}
                    uiTransform={{ height: 14 }}
                  />

                  <Label
                    value={`🎁 EXP: +${golem.expReward} | Progreso: ${golem.currentExp}/${golem.level * 100}`}
                    fontSize={9}
                    color={Color4.create(0.7, 0.8, 1.0, 1.0)}
                    uiTransform={{ height: 13 }}
                  />
                </UiEntity>
              )
            })}
          </UiEntity>
        )}

        {/* 3. BLOQUE DE REGISTRO DE COMBATE EN VIVO Y BOTÓN DE CONVOCATORIA */}
        <UiEntity
          uiTransform={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { top: 6 },
            pointerFilter: 'none'
          }}
        >
          {/* Feed de combate reciente (últimos 2 registros para no ocupar espacio) */}
          <UiEntity
            uiTransform={{
              width: allDead ? 530 : '100%',
              height: 48,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: { top: 4, bottom: 4, left: 10, right: 10 },
              pointerFilter: 'none'
            }}
            uiBackground={{
              color: Color4.create(0.04, 0.06, 0.09, 0.88)
            }}
          >
            {combatLogs.length > 0 ? (
              combatLogs.slice(0, 2).map((log) => (
                <Label
                  key={log.id}
                  value={log.text}
                  fontSize={11}
                  color={Color4.create(0.9, 0.95, 1.0, 1.0)}
                  uiTransform={{ height: 18 }}
                />
              ))
            ) : (
              <Label
                value="📜 Acércate a la Gran Arena circular (200, 200) para iniciar el combate."
                fontSize={11}
                color={Color4.create(0.7, 0.75, 0.85, 1.0)}
                uiTransform={{ height: 18 }}
              />
            )}
          </UiEntity>

          {/* Botón de reaparición si el escuadrón cayó o convocatoria rápida */}
          {allDead && (
            <Button
              value="🔄 RECLUTAR ESCUADRÓN"
              fontSize={11}
              uiTransform={{
                width: 236,
                height: 48
              }}
              uiBackground={{
                color: Color4.create(0.85, 0.55, 0.1, 0.95)
              }}
              onMouseDown={() => {
                respawnLocalSquad()
              }}
            />
          )}
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}