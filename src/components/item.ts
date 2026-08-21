import { Schemas, engine } from '@dcl/sdk/ecs'

/**
 * ============================================================================
 * COMPONENTE ECS SDK7: ÍTEM COLECCIONABLE (MATERIAL DE CHATARRA)
 * ============================================================================
 * Almacena los metadatos de instancia para cada pieza de material generada
 * en el mundo (46 ítems posibles).
 */
export const CollectableItemComponent = engine.defineComponent('golems::CollectableItemComponent', {
  itemId: Schemas.String,
  rarity: Schemas.String,
  zone: Schemas.String,
  spawnTimestamp: Schemas.Number,
  isRevealed: Schemas.Boolean,
  isCollected: Schemas.Boolean,
  originalY: Schemas.Number,
  respawnMinMinutes: Schemas.Number,
  respawnMaxMinutes: Schemas.Number
})

