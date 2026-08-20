import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  TextShape,
  Billboard
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { generateRandomMapGolemsCatalog, MapGolemDefinition } from '../data/mapGolemsCatalog'
import { getAffinityTextColor } from './golemFactory'
import { getLocalizedAffinity } from '../i18n'
import { MapGolemPatrolComponent } from '../systems/mapGolemPatrolSystem'

/**
 * ============================================================================
 * GENERADOR DE GOLEMS AMBIENTALES DEL MAPA (MAP GOLEMS GENERATOR)
 * ============================================================================
 * Instancia 100 golems aleatorios distribuidos proceduralmente en el mapa de 400m x 400m.
 * Muestra el modelo 3D GLTF (.glb), orientación Y aleatoria y etiqueta flotante
 * Billboard con el nombre, afinidad y rareza de cada golem (sin niveles ni estadísticas).
 */

const spawnedMapGolemEntities: Entity[] = []

/**
 * Instancia los 150 golems aleatorios del mapa.
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

    // Etiqueta flotante 3D (Billboard) con nombre, afinidad y rareza
    const labelEntity = engine.addEntity()
    const heightOffset = Math.max(1.6, 1.8 * golemDef.scale)

    Transform.create(labelEntity, {
      parent: golemEntity,
      position: Vector3.create(0, heightOffset, 0)
    })

    const affTag = getLocalizedAffinity(golemDef.affinity)

    TextShape.create(labelEntity, {
      text: `🤖 ${golemDef.name}\n[${affTag}] • ${golemDef.rarity}`,
      fontSize: 2.2,
      textColor: getAffinityTextColor(golemDef.affinity)
    })

    Billboard.create(labelEntity, {})

    spawnedMapGolemEntities.push(golemEntity)
  })

  console.log(
    `🤖 [Map Golems Generator] ${golemsToSpawn.length} Golems ambientales instanciados proceduralmente por todo el mapa con gradientes de rareza y densidad.`
  )

  return spawnedMapGolemEntities
}
