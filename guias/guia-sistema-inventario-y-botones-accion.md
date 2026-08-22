# 🎒 Guía Maestra: Sistema de Inventario de Chatarra y Botones de Acción (Desktop & Mobile UI)

## 📋 Información de la Guía

- **Módulo**: `src/ui/inventoryComponent.tsx`, `src/ui/actionBarComponent.tsx`, `src/state.ts`, `src/index.ts`
- **Versión**: 2.0.0 (SDK7 / React-ECS 7.26.0+ Grid Redesign)
- **Compatibilidad**: Mobile First (Godot Explorer) y Desktop Client
- **Propósito**: Manual técnico y de arquitectura sobre el subsistema de **Inventario de Chatarra (46 materiales)**, el rediseño de **Cuadrícula de Celdas Cuadradas al 100% de Ancho**, imágenes PNG reales (`assets/items/`), **Tarjeta Emergente de Tooltip** y la integración de **Botones de Acción** dinámicos.

---

## 🧭 1. Resumen Ejecutivo y Arquitectura del Sistema

El sistema de **Inventario de Chatarra** permite al jugador inspeccionar y gestionar en tiempo real todas las piezas de chatarra, mecatrónica y utensilios recolectados en el mapa de 25x25 parcelas (400m × 400m). Su diseño responde a los tres principios rectores de la escena:

1. **Diseño Mobile-First y Zonas Seguras**:
   - **En Móviles (`isMobile()`)**: El inventario se activa mediante el botón nativo de la pantalla táctil (`TouchScreenControls` en `InputAction.IA_SECONDARY`), decorado con la textura de la mochila (`assets/images/backpack_icon.png`).
   - **En Escritorio (`isDesktop()`)**: El icono de la mochila se posiciona en la barra de acción (`DesktopActionBarWidget`) justificado a la derecha a `top: 286px, right: 28px`, inmediatamente debajo del minimapa.
2. **Rediseño de Cuadrícula al 100% de Ancho**:
   - Se eliminó el panel lateral derecho de inspección fija y la barra inferior de consejo.
   - El cuerpo del modal dedica el 100% del área horizontal a una **retícula/cuadrícula de celdas cuadradas grandes (98px × 98px)**.
3. **Imágenes PNG Reales de Alta Definición**:
   - Cada casillero renderiza la textura PNG oficial de 300×300px cargada desde `assets/items/<rareza>/<id_item>.png` (optimizada al 83.2% de compresión RGBA).
4. **Tarjeta Emergente de Tooltip (`ItemTooltipCard`)**:
   - Al pulsar o hacer clic en cualquier casillero, se despliega una superposición flotante con los bonos para la Forja (Ataque, Defensa, Vitalidad, Velocidad, Afinidad Elemental), zona de origen y frecuencia de aparición.
5. **Manejo Aislado de Eventos (Sin Bucles de Burbujeo)**:
   - Se aplicó `pointerFilter: 'none'` en todos los elementos hijos internos (imágenes, textos e insignias) y se eliminó el handler `onMouseDown` del contenedor envolvente raíz, garantizando respuesta inmediata al hacer clic en PC o tocar en móvil.

---

## 💾 2. Estado Global del Inventario (`src/state.ts`)

La memoria de sesión de la interfaz es gestionada en `sceneState`:

```typescript
export interface SceneState {
  isInventoryOpen: boolean
  playerInventory: Record<string, number> // [itemId]: cantidad
}

export function getIsInventoryOpen(): boolean {
  return sceneState.isInventoryOpen
}

export function setIsInventoryOpen(open: boolean) {
  sceneState.isInventoryOpen = open
}

export function toggleInventory() {
  sceneState.isInventoryOpen = !sceneState.isInventoryOpen
}
```

- `playerInventory`: Diccionario de clave-valor que mapea la ID canónica de cada uno de los 46 materiales de `src/config/items.ts` con la cantidad poseída.
- `addMaterialToInventory(itemId: string, count: number)`: Incrementa la cantidad en posesión al recolectar ítems en el mundo 3D de forma síncrona multijugador.

---

## 🎛️ 3. Barra de Acción y Botón de Mochila (`src/ui/actionBarComponent.tsx`)

### 3.1 Arquitectura de la Barra de Acción Desktop (`DesktopActionBarWidget`)

Ubicada en `{ top: 286, right: 28 }`, la barra se ancla exactamente debajo del `MinimapWidget`:

```typescript
export const DesktopActionBarWidget = () => {
  if (getIsBigMapOpen() || isMobile()) return null

  const isInventoryOpen = getIsInventoryOpen()
  const isGolemInventoryOpen = getIsGolemInventoryOpen()

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 286, right: 28 },
        width: 240,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pointerFilter: 'none'
      }}
    >
      <ActionIconButton
        keyId="btn_golem_inventory"
        textureSrc="assets/images/golem_icon.png"
        tooltip={t('golemInventory.robotTooltip')}
        isActive={isGolemInventoryOpen}
        onClick={() => toggleGolemInventory()}
      />
      <ActionIconButton
        keyId="btn_backpack_inventory"
        textureSrc="assets/images/backpack_icon.png"
        tooltip={t('inventory.backpackTooltip')}
        isActive={isInventoryOpen}
        onClick={() => toggleInventory()}
      />
    </UiEntity>
  )
}
```

---

## 🖼️ 4. Estructura del Rediseño de Cuadrícula y Tooltip (`src/ui/inventoryComponent.tsx`)

```typescript
export function getItemIconPath(item: ItemConfig): string {
  return `assets/items/${item.rarity}/${item.id}.png`
}

export const InventoryModal = () => {
  if (!getIsInventoryOpen()) return null
  // ...
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
      uiBackground={{ color: Color4.create(0.02, 0.03, 0.06, 0.86) }}
    >
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
        uiBackground={{ color: Color4.create(0.06, 0.08, 0.12, 0.96) }}
      >
        {/* Cabecera con título, variedades y botón ✖ */}
        {/* Barra de Filtros por Rareza */}
        {/* Cuadrícula continua 100% ancho con celdas de 98px x 98px */}
        {/* Tarjeta de Tooltip emergente (activeTooltipConfig) */}
      </UiEntity>
    </UiEntity>
  )
}
```

### Secciones de la Ventana Modal:
1. **Cabecera**: Título `🎒 INVENTARIO DE CHATARRA`, contador de variedades `X / 46` y botón `✖` aislado.
2. **Barra de Filtros por Rareza**: `[ Todos | Común | Poco Común | Raro | Épico | Legendario ]`.
3. **Rejilla Principal (100% de Ancho)**:
   - Celdas cuadradas `98px × 98px` con borde del color de la rareza, previsualización PNG de 300x300px, nombre del material e insignia `xN` en la esquina inferior derecha.
4. **Tarjeta Emergente de Tooltip**:
   - Superposición lateral en `{ top: 60, right: 28 }` desplegada al presionar sobre un material.
   - Contiene la imagen PNG en 56x56px, zona de origen, cantidad, porcentaje de aparición y el desglose de atributos para la **Forja de Golems** (Ataque, Defensa, Vitalidad, Velocidad, Afinidad).

---

## 🌐 5. Internacionalización i18n (`src/i18n`)

Toda la interfaz está conectada a los diccionarios canónicos `es.ts` y `en.ts` sin textos hardcodeados.

---

## 🧪 6. Protocolo de Verificación

1. **Compilación de Código**:
   - Ejecutar `npx tsc --noEmit` para verificar cero errores de tipo.
2. **Prueba en Escritorio**:
   - Al pulsar la `✖` superior o el botón de mochila, el modal se abre/cierra limpiamente.
   - Al hacer clic sobre cualquier casilla de la cuadrícula, se despliega el Tooltip con la imagen PNG real del objeto.
3. **Prueba en Móviles (Godot Explorer)**:
   - Comprobar que tocar los casilleros en la pantalla táctil abre el Tooltip sin cerrar la ventana.
