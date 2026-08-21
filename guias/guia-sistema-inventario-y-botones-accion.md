# 🎒 Guía Maestra: Sistema de Inventario de Chatarra y Botones de Acción (Desktop & Mobile UI)

## 📋 Información de la Guía

- **Módulo**: `src/ui/inventoryComponent.tsx`, `src/ui/actionBarComponent.tsx`, `src/state.ts`, `src/index.ts`
- **Versión**: 1.0.0 (SDK7 / React-ECS 7.26.0+)
- **Compatibilidad**: Mobile First (Godot Explorer) y Desktop Client
- **Propósito**: Manual técnico y de arquitectura sobre el subsistema de **Inventario de Chatarra (46 materiales)** y la integración de **Botones de Acción** dinámicos para Desktop (debajo del minimapa) y Mobile (botón nativo de touchpad con textura personalizable).

---

## 🧭 1. Resumen Ejecutivo y Arquitectura del Sistema

El sistema de **Inventario de Chatarra** permite al jugador inspeccionar y gestionar en tiempo real todas las piezas de chatarra, mecatrónica y utensilios recolectados en el mapa de 25x25 parcelas (400m × 400m). Su diseño responde a los tres principios rectores de la escena:

1. **Diseño Mobile-First y Zonas Seguras**:
   - **En Móviles (`isMobile()`)**: El inventario se activa mediante el botón nativo de la pantalla táctil (`TouchScreenControls` en `InputAction.IA_SECONDARY`), decorado con la textura de la mochila (`assets/images/backpack_icon.png`). Se oculta cualquier barra superflua debajo del minimapa para mantener la pantalla libre de obstrucciones.
   - **En Escritorio (`isDesktop()`)**: El icono de la mochila se posiciona en la barra de acción (`DesktopActionBarWidget`) justificado a la derecha a `top: 286px, right: 28px`, inmediatamente debajo del minimapa. La barra utiliza un diseño adaptable `flexDirection: 'row'` + `justifyContent: 'flex-end'`, de modo que nuevos botones añadidos en el futuro se concatenarán automáticamente a la izquierda de la mochila.
2. **Apertura y Cierre Bidireccional (Toggle Táctil)**:
   - Presionar el botón de la mochila en la pantalla táctil o la tecla **F** en el teclado abre y cierra la interfaz inmediatamente, incluso cuando el modal está desplegado.
3. **Centrado Absoluto e Inspección de Atributos**:
   - La ventana modal (920px × 540px) se despliega **vertical y horizontalmente centrada** en pantalla mediante un contenedor wrapper `width: '100%', height: '100%'` con `justifyContent: 'center'` y `alignItems: 'center'`.
   - Incluye filtros por rareza (*Todos, Común, Poco Común, Raro, Épico, Legendario*) y un panel de inspección de los aportes de estadísticas para la **Forja de Golems** (Ataque, Defensa, Vitalidad, Velocidad, Afinidad).

---

## 💾 2. Estado Global del Inventario (`src/state.ts`)

La memoria de sesión de la interfaz es gestionada en `sceneState`:

```typescript
export interface SceneState {
  // ...
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
- `addMaterialToInventory(itemId: string, count: number)`: Incrementa la cantidad en posesión al recolectar ítems en el mundo 3D.

---

## 🎛️ 3. Barra de Acción y Botón de Mochila (`src/ui/actionBarComponent.tsx`)

### 3.1 Arquitectura de la Barra de Acción Desktop (`DesktopActionBarWidget`)

Ubicada en `{ top: 286, right: 28 }`, la barra se ancla exactamente debajo del `MinimapWidget` (cuyo rango vertical abarca de `top: 80px` a `top: 280px`).

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
      {/* Botón de Robot / Reserva de Golems (Aparece a la IZQUIERDA de la mochila) */}
      <ActionIconButton
        keyId="btn_golem_inventory"
        textureSrc="assets/images/golem_icon.png"
        tooltip={t('golemInventory.robotTooltip')}
        isActive={isGolemInventoryOpen}
        onClick={() => toggleGolemInventory()}
      />

      {/* Botón de Mochila / Inventario de Chatarra (Extremo Derecho) */}
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


### 3.2 Botones de Acción Sin Marco Interno (`ActionIconButton`)

Para maximizar el tamaño de los iconos y evitar recuadros blancos obstructivos, `ActionIconButton` utiliza un contenedor único de 48px × 48px con resplandor dorado (`Color4.create(1.0, 0.85, 0.3, 0.95)`) al estar activo:

```typescript
export const ActionIconButton = ({ icon, textureSrc, tooltip, isActive, onClick, keyId }: ActionIconButtonProps) => {
  return (
    <UiEntity
      key={keyId}
      uiTransform={{
        width: 48,
        height: 48,
        margin: { left: 8 },
        justifyContent: 'center',
        alignItems: 'center',
        padding: { top: 2, bottom: 2, left: 2, right: 2 },
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: isActive
          ? Color4.create(1.0, 0.85, 0.3, 0.95) // Resplandor dorado activo
          : Color4.create(0.12, 0.16, 0.22, 0.92)  // Fondo base
      }}
      onMouseDown={() => onClick()}
    >
      {textureSrc ? (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            pointerFilter: 'none'
          }}
          uiBackground={{
            texture: { src: textureSrc },
            textureMode: 'stretch'
          }}
        />
      ) : (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'none'
          }}
          uiText={{
            value: icon || '',
            fontSize: 26,
            textAlign: 'middle-center'
          }}
        />
      )}
    </UiEntity>
  )
}
```

---

## 📱 4. Integración Móvil y TouchScreenControls (`src/index.ts`)

En dispositivos móviles, Decentraland SDK7 permite personalizar el HUD táctil reemplazando el glifo predeterminado de la tecla **F** (`InputAction.IA_SECONDARY`) con una textura de escena mediante la propiedad `icon`:

```typescript
TouchScreenControls.createOrReplace(engine.RootEntity, {
  hideJoystick: false,
  hideCrosshair: false,
  touchInputs: [
    {
      inputAction: InputAction.IA_SECONDARY,
      hide: false,
      icon: { tex: { $case: 'texture', texture: { src: 'assets/images/backpack_icon.png' } } }
    },
    { inputAction: InputAction.IA_ACTION_3, hide: true },
    { inputAction: InputAction.IA_ACTION_4, hide: true },
    { inputAction: InputAction.IA_ACTION_5, hide: true },
    { inputAction: InputAction.IA_ACTION_6, hide: true }
  ]
})
```

### 4.1 Listener de Teclado y Touchpad (`engine.addSystem`)

Tanto para la tecla física **F** en escritorio como para el botón **F** personalizado con la mochila en móviles, se registra un sistema reactivo en `src/index.ts`:

```typescript
engine.addSystem(() => {
  if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
    toggleInventory()
  }
})
```

---

## 🖼️ 5. Especificaciones del Asset `backpack_icon.png`

- **Ruta**: `assets/images/backpack_icon.png`
- **Dimensiones**: 128px × 128px HD
- **Formato**: PNG 32-bit RGBA
- **Criterio de Diseño**:
  - Sin círculo exterior ni marcos envolventes.
  - Ilustración ampliada de la mochila de cuero y latón steampunk (ocupa ~85% del lienzo).
  - Fondo oscuro sólido `#0E121A` acorde con el resto del HUD táctil.

---

## 🖥️ 6. Modal de Inventario (`src/ui/inventoryComponent.tsx`)

### 6.1 Regla de Centrado Absoluto y `pointerFilter`

Para garantizar que el modal esté perfectamente centrado y que el botón de la mochila en el touchpad táctil móvil no quede bloqueado mientras la ventana está abierta, la estructura de React-ECS emplea dos niveles de `UiEntity`:

```typescript
export const InventoryModal = () => {
  if (!getIsInventoryOpen()) return null

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'none' // ¡Permite que los controles táctiles del touchpad reciban toques!
      }}
      uiBackground={{
        color: Color4.create(0.02, 0.03, 0.06, 0.86)
      }}
      onMouseDown={() => toggleInventory()} // Tocar el fondo semitransparente cierra el inventario
    >
      {/* Tarjeta Central del Inventario (920px × 540px Centrada) */}
      <UiEntity
        uiTransform={{
          width: 920,
          height: 540,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { top: 16, bottom: 16, left: 20, right: 20 },
          pointerFilter: 'block' // Absorbe la interacción dentro del modal
        }}
        uiBackground={{
          color: Color4.create(0.06, 0.08, 0.12, 0.96)
        }}
      >
        {/* Cabecera, Filtros por Rareza, Cuerpo en 2 Columnas y Pie de Modal */}
      </UiEntity>
    </UiEntity>
  )
}
```

### 6.2 Secciones de la Ventana Modal

1. **Cabecera**:
   - Título: `🎒 INVENTARIO DE CHATARRA`
   - Badge de Variedades: Muestra la cantidad de tipos de materiales poseídos contra el total del catálogo (`X / 46 Variedades`).
   - Botón de Cierre: `✖` táctil en la esquina superior derecha.
2. **Barra de Filtros por Rareza**:
   - Botones selectores: `[ Todos | Común | Poco Común | Raro | Épico | Legendario ]`.
   - Aplica resaltado cromático activo en base a `RARITY_COLOR_MAP`.
3. **Columna Izquierda (58% de ancho - Lista Rejilla)**:
   - Muestra los materiales poseídos (cantidad > 0) con barra lateral de color según rareza, nombre traducido con `t()` y badge de cantidad `xN`.
   - Estado vacío ("Empty state") con icono `📦` y mensaje explicativo si no hay ítems en la categoría seleccionada.
4. **Columna Derecha (40% de ancho - Panel de Inspección)**:
   - Muestra los detalles del material seleccionado: Nombre, rareza, zona de origen (`zone`), frecuencia de aparición (`spawnWeight`) y la **lista detallada de atributos para la Forja**:
     - ⚔️ Bono de Ataque (`attackBonus`)
     - 🛡️ Bono de Defensa (`defenseBonus`)
     - 💚 Bono de Vitalidad (`hpBonus`)
     - ⚡ Bono de Velocidad (`speedBonus`)
     - 🔮 Afinidad Elemental Dominante (`affinityFocus` con su icono representativo `getAffinityIcon()`).
5. **Pie de Modal**:
   - Consejo táctico: *"💡 Combina de 5 a 12 piezas de chatarra en la Forja para dar vida a un Golem único."*

---

## 🌐 7. Internacionalización i18n (`src/i18n`)

Toda la interfaz del inventario está completamente traducida a través de la sección `inventory` en los diccionarios canónicos `es.ts` y `en.ts`:

```typescript
inventory: {
  title: '🎒 INVENTARIO DE CHATARRA',
  empty: 'Tu inventario está vacío. Explora el mapa con el Radar Térmico para recolectar piezas de chatarra.',
  filterAll: 'Todos',
  totalTypes: 'Variedades',
  itemDetails: 'Detalles del Material',
  statContribution: 'Aporte para la Forja',
  selectItem: 'Selecciona una pieza de chatarra para ver sus propiedades.',
  forgeTip: '💡 Combina de 5 a 12 piezas de chatarra en la Forja para dar vida a un Golem único.',
  backpackTooltip: 'Abrir Inventario (🎒)',
  ownedQuantity: 'Cantidad en Posesión',
  originZone: 'Zona de Origen',
  spawnWeight: 'Frecuencia de Aparición',
  statAttack: 'Bono de Ataque',
  statDefense: 'Bono de Defensa',
  statHp: 'Bono de Vitalidad',
  statSpeed: 'Bono de Velocidad',
  statAffinity: 'Afinidad Elemental'
}
```

---

## 🧪 8. Protocolo de Verificación y Pruebas

1. **Compilación de Código**:
   - Ejecutar `npm run build` para asegurar la resolución correcta de tipos React-ECS y `@dcl/sdk/platform`.
2. **Prueba en Escritorio**:
   - Verificar que la barra de botones aparece justificada a la derecha a `top: 286px, right: 28px` mostrando el icono PNG de la mochila.
   - Verificar que hacer clic en la mochila o presionar la tecla **F** abre/cierra la ventana modal centrada.
3. **Prueba en Móviles (Godot Explorer)**:
   - Verificar que la barra debajo del minimapa NO se renderiza (`isMobile() === true`).
   - Comprobar que en la esquina inferior derecha aparece el botón de acción nativo con la textura de la mochila (`backpack_icon.png`).
   - Comprobar que tocar la mochila en la pantalla táctil abre el inventario y que **volver a tocarla la cierra**.
4. **Prueba de Inspección y Filtros**:
   - Recolectar chatarra del suelo y verificar la actualización en tiempo real de las cantidades `xN`, la variedad `X / 46` y el desglose de estadísticas de forja.
