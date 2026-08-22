import {
  engine,
  Transform,
  GltfContainer,
  TextShape,
  Billboard,
  Entity,
  removeEntityWithChildren
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { GolemConfig, GolemAffinity, generateRandomStats, getGolemDisplayName } from '../config/golems'
import { GolemFollowerComponent, GolemSquadMemberDto } from '../components/follower'
import {
  GolemCombatComponent,
  GolemCombatState,
  FloatingDamageComponent,
  GOLEM_TEAMS
} from '../components/combat'
import { ARENA_CONFIG } from '../config/arenaConfig'
import { t, getLocalizedAffinity, onLanguageChange } from '../i18n'


/**
 * ============================================================================
 * FÁBRICA DE GOLEMS MULTIJUGADOR Y COMBATE (GOLEM FACTORY)
 * ============================================================================
 * Instancia las entidades de los golems con sus modelos 3D GLTF, escala,
 * componentes de seguimiento y combate asociados al dueño (local, remoto o sparring)
 * y etiquetas flotantes interactivas con barras de salud en tiempo real.
 */

/**
 * Devuelve el color de texto representativo según la afinidad elemental del golem.
 */
export function getAffinityTextColor(affinity: string): Color4 {
  switch (affinity) {
    case GolemAffinity.STEAM:
    case 'Vapor':
      return Color4.create(1.0, 0.55, 0.1, 1.0) // Naranja fuego / vapor
    case GolemAffinity.GALVANIC:
    case 'Galvánico':
      return Color4.create(0.2, 0.9, 1.0, 1.0) // Cian eléctrico
    case GolemAffinity.MECHANICAL:
    case 'Mecánico':
      return Color4.create(1.0, 0.85, 0.3, 1.0) // Ámbar / Dorado engranaje
    case GolemAffinity.LUMINOUS:
    case 'Luminoso':
      return Color4.create(1.0, 1.0, 0.6, 1.0) // Amarillo brillante
    case GolemAffinity.AETHER:
    case 'Éter':
      return Color4.create(0.8, 0.4, 1.0, 1.0) // Violeta místico
    default:
      return Color4.White()
  }
}

/**
 * Formatea una dirección de wallet para mostrarla abreviada en la etiqueta del golem.
 */
function formatShortAddress(address: string): string {
  if (!address || address === 'local' || address === 'local_player') return ''
  if (address.startsWith('sparring_bot')) return ' [🤖 Sparring]'
  if (address.length > 10) {
    return ` [${address.substring(0, 6)}...]`
  }
  return ` [${address}]`
}

/**
 * Genera una barra de vida ASCII visual para la etiqueta flotante.
 */
export function getHealthBarAscii(currentHp: number, maxHp: number): string {
  const safeMax = Math.max(1, maxHp)
  const ratio = Math.max(0, Math.min(1, currentHp / safeMax))
  const totalBlocks = 10
  const filledBlocks = Math.round(ratio * totalBlocks)
  const emptyBlocks = totalBlocks - filledBlocks
  return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks)
}

/**
 * Limpia el nombre del golem removiendo números de serie (#001, (#001)) y etiquetas de afinidad ([Galvanic]).
 */
export function cleanGolemName(name: string): string {
  if (!name) return ''
  return name
    .replace(/\s*\(\s*#?\d+\s*\)/gi, '')
    .replace(/\s*#\d+/gi, '')
    .replace(/\s*\[.*?\]/gi, '')
    .trim()
}

/**
 * Mapa en memoria de etiquetas flotantes asociadas a cada golem [golemEntity -> labelEntity].
 */
const golemLabelMap = new Map<Entity, Entity>()
const spawnedFollowerGolemConfigMap = new Map<Entity, GolemConfig | GolemSquadMemberDto>()

// Suscripción al cambio global de idioma para actualizar etiquetas 3D en tiempo real
onLanguageChange(() => {
  for (const [golemEntity, labelEntity] of golemLabelMap.entries()) {
    const config = spawnedFollowerGolemConfigMap.get(golemEntity)
    if (config && TextShape.has(labelEntity) && GolemCombatComponent.has(golemEntity)) {
      const combat = GolemCombatComponent.get(golemEntity)
      const ownerTag = formatShortAddress(combat.ownerAddress)
      const hpBar = getHealthBarAscii(combat.currentHp, combat.maxHp)
      const rawName = getGolemDisplayName(config)
      const cleanName = cleanGolemName(rawName)

      TextShape.getMutable(labelEntity).text =
        `Lv.${combat.level} ${cleanName}${ownerTag}\n[${hpBar}] ${Math.round(combat.currentHp)}/${Math.round(combat.maxHp)}`
    }
  }
})


/**
 * Actualiza el texto de la etiqueta flotante de un golem con su vida actual y nivel.
 * Formato:
 * Línea 1: Lv.X Nombre
 * Línea 2: [██████████] HP/MaxHP
 */
export function updateGolemFloatingLabel(
  golemEntity: Entity,
  name: string,
  affinity: string,
  level: number,
  currentHp: number,
  maxHp: number,
  ownerAddress: string
) {
  const labelEntity = golemLabelMap.get(golemEntity)
  if (!labelEntity) return

  if (TextShape.has(labelEntity)) {
    const ownerTag = formatShortAddress(ownerAddress)
    const hpBar = getHealthBarAscii(currentHp, maxHp)
    const hpInt = Math.max(0, Math.round(currentHp))
    const maxHpInt = Math.round(maxHp)
    const cleanName = cleanGolemName(name)

    TextShape.getMutable(labelEntity).text =
      `Lv.${level} ${cleanName}${ownerTag}\n[${hpBar}] ${hpInt}/${maxHpInt}`
  }
}

/**
 * Crea una entidad de golem seguidor y de combate asociada a un jugador (local, remoto o sparring).
 */
export function createFollowerGolem(
  config: GolemConfig | GolemSquadMemberDto,
  orderIndex: number,
  spawnPosition: Vector3,
  ownerAddress: string = 'local',
  teamId: string = GOLEM_TEAMS.PLAYER
): Entity {
  const golemEntity = engine.addEntity()

  // 1. Transform principal del Golem
  Transform.create(golemEntity, {
    position: spawnPosition,
    rotation: Quaternion.Identity(),
    scale: Vector3.create(config.scale, config.scale, config.scale)
  })

  // 2. Modelo 3D GLTF (.glb)
  GltfContainer.create(golemEntity, {
    src: config.modelSrc
  })

  // 3. Componente de seguimiento con asociación de dueño
  GolemFollowerComponent.create(golemEntity, {
    golemId: config.id,
    ownerAddress: ownerAddress.toLowerCase(),
    orderIndex,
    targetDistance: config.followDistance,
    moveSpeed: config.moveSpeed,
    rotationSpeed: config.rotationSpeed,
    isMoving: false
  })

  // 4. Componente de combate con estadísticas completas y asignación de equipo canónico
  const maxHp = config.maxHp || 120
  const currentHp = config.currentHp !== undefined ? config.currentHp : maxHp
  const attack = config.attack || 25
  const defense = config.defense || 12
  const speed = config.speed || 15
  const expReward = config.expReward || 50
  const currentExp = config.currentExp || 0
  const level = config.level || 1

  GolemCombatComponent.create(golemEntity, {
    golemId: config.id,
    teamId,
    ownerAddress: ownerAddress.toLowerCase(),
    affinity: config.affinity,
    maxHp,
    currentHp,
    attack,
    defense,
    speed,
    expReward,
    currentExp,
    level,
    state: GolemCombatState.FOLLOWING,
    targetGolemId: '',
    attackCooldownTimer: 0,
    lastAttackerId: '',
    lastAttackedTimestamp: 0,
    isDefeated: false
  })

  // 5. Etiqueta flotante con barra de salud y nivel (Billboard)
  const labelEntity = engine.addEntity()
  Transform.create(labelEntity, {
    parent: golemEntity,
    position: Vector3.create(0, 1.5, 0)
  })

  const ownerTag = formatShortAddress(ownerAddress)
  const hpBar = getHealthBarAscii(currentHp, maxHp)
  const rawName = getGolemDisplayName(config)
  const cleanName = cleanGolemName(rawName)

  TextShape.create(labelEntity, {
    text: `Lv.${level} ${cleanName}${ownerTag}\n[${hpBar}] ${Math.round(currentHp)}/${Math.round(maxHp)}`,
    fontSize: 2.1,
    textColor: getAffinityTextColor(config.affinity)
  })

  Billboard.create(labelEntity, {})
  golemLabelMap.set(golemEntity, labelEntity)
  spawnedFollowerGolemConfigMap.set(golemEntity, config)

  return golemEntity
}

/**
 * Instancia el escuadrón completo de 3 golems para un jugador específico.
 */
export function spawnPlayerSquad(
  ownerAddress: string,
  squadConfig: (GolemConfig | GolemSquadMemberDto)[],
  basePos: Vector3
): Entity[] {
  const entities: Entity[] = []
  const normAddress = ownerAddress.toLowerCase()
  const teamId =
    normAddress === 'local' || normAddress === 'local_player'
      ? GOLEM_TEAMS.PLAYER
      : `${GOLEM_TEAMS.REMOTE_PREFIX}${normAddress}`

  // Garantizar que ÚNICAMENTE 1 golem acompañe al jugador por el mapa (no 3)
  const activeGolemConfig = squadConfig.slice(0, 1)

  activeGolemConfig.forEach((config, index) => {
    const spawnPos = Vector3.create(basePos.x, Math.max(0.1, basePos.y), basePos.z - (config.followDistance || 2.0))
    const entity = createFollowerGolem(config, index, spawnPos, normAddress, teamId)
    entities.push(entity)
  })

  return entities
}

/**
 * Instancia 1 ÚNICO golem seguidor activo para el jugador local por el mapa.
 */
export function spawnActivePlayerGolem(
  config: GolemConfig | GolemSquadMemberDto,
  ownerAddress: string = 'local'
): Entity {
  removePlayerSquad(ownerAddress)
  removePlayerSquad('local')
  removePlayerSquad('local_player')

  let spawnBase = Vector3.create(16, 0.1, 16)
  if (Transform.has(engine.PlayerEntity)) {
    const pPos = Transform.get(engine.PlayerEntity).position
    spawnBase = Vector3.create(pPos.x, Math.max(0.1, pPos.y), pPos.z)
  }

  const spawnPos = Vector3.create(spawnBase.x, spawnBase.y, spawnBase.z - (config.followDistance || 2.0))
  return createFollowerGolem(config, 0, spawnPos, ownerAddress.toLowerCase(), GOLEM_TEAMS.PLAYER)
}

/**
 * Elimina y libera de memoria de forma limpia todas las entidades de golems pertenecientes a un jugador.
 */
export function removePlayerSquad(ownerAddress: string) {
  const targetOwner = ownerAddress.toLowerCase()
  const entitiesToRemove: Entity[] = []

  for (const [entity] of engine.getEntitiesWith(GolemFollowerComponent)) {
    const follower = GolemFollowerComponent.get(entity)
    if (follower.ownerAddress.toLowerCase() === targetOwner) {
      entitiesToRemove.push(entity)
    }
  }

  for (const entity of entitiesToRemove) {
    golemLabelMap.delete(entity)
    spawnedFollowerGolemConfigMap.delete(entity)
    removeEntityWithChildren(engine, entity)
  }
}

/**
 * Genera un número de daño flotante animado sobre la posición del impacto.
 */
export function spawnFloatingDamage(position: Vector3, amount: number, isAdvantage: boolean = false) {
  const damageEntity = engine.addEntity()

  Transform.create(damageEntity, {
    position: Vector3.create(
      position.x + (Math.random() - 0.5) * 0.4,
      position.y + 1.2,
      position.z + (Math.random() - 0.5) * 0.4
    )
  })

  const textPrefix = isAdvantage ? '⚡ CRÍTICO -' : '-'
  const textColor = isAdvantage
    ? Color4.create(1.0, 0.9, 0.1, 1.0) // Amarillo dorado
    : Color4.create(1.0, 0.25, 0.25, 1.0) // Rojo

  TextShape.create(damageEntity, {
    text: `${textPrefix}${Math.round(amount)}`,
    fontSize: isAdvantage ? 3.0 : 2.4,
    textColor
  })

  Billboard.create(damageEntity, {})

  FloatingDamageComponent.create(damageEntity, {
    lifetime: 1.2,
    initialY: position.y + 1.2,
    riseSpeed: 1.1
  })
}



