import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  TextShape,
  Billboard,
  pointerEventsSystem,
  InputAction,
  MeshCollider
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { generateRandomMapGolemsCatalog, MapGolemDefinition } from '../data/mapGolemsCatalog'
import { getAffinityTextColor, cleanGolemName, getHealthBarAscii } from './golemFactory'
import { getLocalizedAffinity, getLocalizedRarity, getLocalizedGolemName, onLanguageChange, t } from '../i18n'
import { MapGolemPatrolComponent } from '../systems/mapGolemPatrolSystem'
import { openFieldBattleModal, addCombatLog, hasActivePlayerGolem } from '../state'

/**
 * ============================================================================
 * GENERADOR DE GOLEMS AMBIENTALES DEL MAPA (MAP GOLEMS GENERATOR)
 * ============================================================================
 * Instancia golems aleatorios distribuidos proceduralmente en el mapa de 400m x 400m.
 * Muestra el modelo 3D GLTF (.glb), orientación Y aleatoria y etiqueta flotante
 * Billboard con el nombre, afinidad, rareza y nivel traducidos dinámicamente.
 * Habilita la interacción directa táctil por puntero (PointerEvents) para batallas en campo.
 */

const spawnedMapGolemEntities: Entity[] = []
export const spawnedMapGolemDataMap = new Map<Entity, { golemDef: MapGolemDefinition; labelEntity: Entity }>()

const lockedFieldGolemsMap = new Map<number, string>()

export function isFieldGolemLocked(golemIndex: number): { isLocked: boolean; lockedBy: string } {
  const lockedBy = lockedFieldGolemsMap.get(golemIndex)
  return { isLocked: !!lockedBy, lockedBy: lockedBy || '' }
}

export function setFieldGolemLockState(golemIndex: number, lockedBy: string, isLocked: boolean) {
  if (isLocked) {
    lockedFieldGolemsMap.set(golemIndex, lockedBy)
  } else {
    lockedFieldGolemsMap.delete(golemIndex)
  }
}

/**
 * Actualiza las etiquetas flotantes 3D de todos los golems ambientales del mapa al cambiar el idioma.
 * Formato:
 * Línea 1: Lv.X Nombre
 * Línea 2: [██████████] HP/MaxHP
 */
export function updateAllMapGolemLabels() {
  for (const { golemDef, labelEntity } of spawnedMapGolemDataMap.values()) {
    if (labelEntity && TextShape.has(labelEntity)) {
      const variantIdx = (golemDef.recipeNumber - 1) % 5
      const rawName = getLocalizedGolemName(golemDef.affinity, variantIdx)
      const cleanName = cleanGolemName(rawName)
      const hpBar = getHealthBarAscii(golemDef.currentHp, golemDef.maxHp)
      TextShape.getMutable(labelEntity).text =
        `Lv.${golemDef.level} ${cleanName}\n[${hpBar}] ${Math.round(golemDef.currentHp)}/${Math.round(golemDef.maxHp)}`
    }
  }
}

// Suscripción al cambio global de idioma
onLanguageChange(() => {
  updateAllMapGolemLabels()
})

/**
 * Instancia los golems aleatorios del mapa.
 *
 * @param count Número total de golems a instanciar (por defecto 150).
 * @returns Lista de entidades instanciadas.
 */
export function spawnMapGolems(count: number = 150): Entity[] {
  // 1. Limpieza de entidades previas si las hubiera
  for (const entity of spawnedMapGolemEntities) {
    engine.removeEntity(entity)
  }
  spawnedMapGolemEntities.length = 0
  spawnedMapGolemDataMap.clear()

  // 2. Generación procedural del catálogo dinámico de golems
  const catalog = generateRandomMapGolemsCatalog()
  const golemsToSpawn = catalog.slice(0, count)

  // 3. Instanciación en el motor SDK7
  golemsToSpawn.forEach((golemDef: MapGolemDefinition) => {
    const golemEntity = engine.addEntity()

    // Transform principal
    Transform.create(golemEntity, {
      position: golemDef.position,
      rotation: Quaternion.fromEulerDegrees(0, golemDef.rotationY, 0),
      scale: Vector3.create(golemDef.scale, golemDef.scale, golemDef.scale)
    })

    // Carga del modelo GLTF determinista
    GltfContainer.create(golemEntity, {
      src: golemDef.modelSrc
    })

    // Hitbox de colisión explícita para raycast y toques en pantalla (Mobile & PC)
    MeshCollider.setBox(golemEntity)

    // Componente de patrulla y movimiento orgánico en radio de 3.5m - 6.0m
    MapGolemPatrolComponent.create(golemEntity, {
      anchorX: golemDef.position.x,
      anchorY: golemDef.position.y,
      anchorZ: golemDef.position.z,
      targetX: golemDef.position.x,
      targetY: golemDef.position.y,
      targetZ: golemDef.position.z,
      state: 'IDLE',
      idleTimer: Math.random() * 4.0, // Desfase inicial aleatorio
      moveSpeed: 0.9 + Math.random() * 0.5, // Velocidad de caminata suave (0.9 - 1.4 m/s)
      patrolRadius: 3.5 + Math.random() * 2.5 // Radio de patrulla (3.5m - 6.0m)
    })

    // Manejador común de interacción para iniciar combate
    const triggerBattleInteraction = () => {
      // 0. Verificar si el golem salvaje ya está bloqueado en combate por otro jugador
      const lockStatus = isFieldGolemLocked(golemDef.index)
      if (lockStatus.isLocked) {
        addCombatLog(`🔒 Este Golem salvaje ya está en combate con otro jugador.`, '#FFCC00')
        return
      }

      // 1. Verificar si el usuario tiene al menos 1 golem activo en su escuadrón
      if (!hasActivePlayerGolem()) {
        addCombatLog('⚠️ Necesitas tener al menos 1 Golem activo en tu escuadrón para combatir.', '#FFCC00')
        return
      }

      // 2. Verificar proximidad táctil en tiempo real (máx 6.0m)
      let playerPos = Vector3.create(0, 0, 0)
      if (Transform.has(engine.PlayerEntity)) {
        playerPos = Transform.get(engine.PlayerEntity).position
      }

      const golemPos = Transform.get(golemEntity).position
      const dist = Vector3.distance(playerPos, golemPos)

      if (dist > 6.0) {
        addCombatLog(`⚠️ Estás demasiado lejos para atacar (${dist.toFixed(1)}m / máx 6.0m)`, '#FFCC00')
        return
      }

      // Abrir modal de confirmación de batalla de campo
      openFieldBattleModal({
        entity: golemEntity,
        definition: golemDef
      })
    }

    // Interacción táctil / puntero para desafiar en batalla de campo (en el modelo)
    pointerEventsSystem.onPointerDown(
      {
        entity: golemEntity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: `⚔️ Desafiar Golem Lvl ${golemDef.level}`,
          maxDistance: 7.5
        }
      },
      triggerBattleInteraction
    )

    // Etiqueta flotante 3D (Billboard) con nombre, afinidad, nivel y vida
    const labelEntity = engine.addEntity()
    const heightOffset = Math.max(1.6, 1.8 * golemDef.scale)

    Transform.create(labelEntity, {
      parent: golemEntity,
      position: Vector3.create(0, heightOffset, 0)
    })

    MeshCollider.setBox(labelEntity)

    // Interacción táctil / puntero en la etiqueta flotante
    pointerEventsSystem.onPointerDown(
      {
        entity: labelEntity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: `⚔️ Desafiar Golem Lvl ${golemDef.level}`,
          maxDistance: 7.5
        }
      },
      triggerBattleInteraction
    )

    const variantIdx = (golemDef.recipeNumber - 1) % 5
    const rawName = getLocalizedGolemName(golemDef.affinity, variantIdx)
    const cleanName = cleanGolemName(rawName)
    const hpBar = getHealthBarAscii(golemDef.currentHp, golemDef.maxHp)

    TextShape.create(labelEntity, {
      text: `Lv.${golemDef.level} ${cleanName}\n[${hpBar}] ${Math.round(golemDef.currentHp)}/${Math.round(golemDef.maxHp)}`,
      fontSize: 2.2,
      textColor: getAffinityTextColor(golemDef.affinity)
    })

    Billboard.create(labelEntity, {})

    spawnedMapGolemEntities.push(golemEntity)
    spawnedMapGolemDataMap.set(golemEntity, { golemDef, labelEntity })
  })

  console.log(
    `🤖 [Map Golems Generator] ${golemsToSpawn.length} Golems ambientales instanciados proceduralmente por todo el mapa con interacción de combate táctil.`
  )

  return spawnedMapGolemEntities
}

