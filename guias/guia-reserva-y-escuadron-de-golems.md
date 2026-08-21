# 🤖 Guía Maestra: Sistema de Reserva e Inventario de Golems y Gestión de Escuadrón (Desktop & Mobile UI)

## 📋 Información de la Guía

- **Módulo**: `src/ui/golemInventoryComponent.tsx`, `src/state.ts`, `src/config/golems.ts`, `src/ui/actionBarComponent.tsx`, `src/index.ts`
- **Versión**: 1.0.0 (SDK7 / React-ECS 7.26.0+)
- **Compatibilidad**: Mobile First (Godot Explorer) y Desktop Client
- **Propósito**: Manual técnico y de arquitectura sobre el subsistema de **Reserva y Squad de Golems**, filtrado por afinidades elementales, inspección de atributos RPG y la integración de controles en Desktop y Mobile.

---

## 🧭 1. Resumen Ejecutivo y Arquitectura del Sistema

El **Sistema de Reserva e Inventario de Golems** permite al jugador inspeccionar, organizar y gestionar en tiempo real su escuadrón activo de hasta 3 golems acompañantes y su catálogo de autómatas en reserva. Su diseño cumple con las reglas del espacio de trabajo:

1. **Diseño Mobile-First y Controles Nativos**:
   - **En Móviles (`isMobile()`)**: El inventario de golems se activa mediante el botón nativo de la pantalla táctil en `InputAction.IA_PRIMARY` (botón "E" de la botonera táctil), decorado con la textura HD del robot (`assets/images/golem_icon.png`). Se mantiene libre el resto de la interfaz ocultando los botones numéricos secundarios.
   - **En Escritorio (`isDesktop()`)**: El icono del robot se posiciona en la barra de acción (`DesktopActionBarWidget`) justificado a la derecha a `top: 286px, right: 28px`, colocándose **a la izquierda del icono de la mochila**. Además, presionar la tecla **E** en el teclado abre y cierra la modal inmediatamente.
2. **Modal Apaisado Centrado y Toggle Bidireccional**:
   - La ventana modal (920px × 540px) se despliega **centrada vertical y horizontalmente** en pantalla utilizando un contenedor wrapper de `100% × 100%` con `justifyContent: 'center'` y `alignItems: 'center'`.
   - Utiliza `pointerFilter: 'none'` en el contenedor raíz para garantizar que presionar el botón del robot en el touchpad móvil o hacer clic en el fondo oscuro semitransparente abra **y cierre** la interfaz sin bloqueos de puntero.
3. **Inspección de Atributos RPG y Pentágono Elemental**:
   - Incluye filtros por las 5 Afinidades Elementales (*Vapor ♨️, Galvánico ⚡, Mecánico ⚙️, Luminoso ☀️, Éter 🔮*).
   - Panel de inspección detallado con nivel, barra de experiencia, estadísticas de combate (Ataque, Defensa, HP, Velocidad), y multiplicadores del Pentágono Elemental (`×1.40` ventaja / `×0.75` desventaja).

---

## 💾 2. Estado Global de la Reserva de Golems (`src/state.ts`)

El estado de la ventana modal y del escuadrón activo es gestionado a través de `sceneState`:

```typescript
export interface SceneState {
  // ...
  localSquad: GolemConfig[] | null
  isGolemInventoryOpen: boolean
}

export function getIsGolemInventoryOpen(): boolean {
  return sceneState.isGolemInventoryOpen
}

export function setIsGolemInventoryOpen(open: boolean) {
  sceneState.isGolemInventoryOpen = open
}

export function toggleGolemInventory() {
  sceneState.isGolemInventoryOpen = !sceneState.isGolemInventoryOpen
}

export function getLocalActiveSquad(): GolemConfig[] | null {
  return sceneState.localSquad
}
```

---

## 🎛️ 3. Barra de Acción e Integración en Desktop (`src/ui/actionBarComponent.tsx`)

En la versión de escritorio, `DesktopActionBarWidget` se ancla inmediatamente debajo del minimapa (`top: 286px, right: 28px`). Debido al contenedor `flexDirection: 'row'` y `justifyContent: 'flex-end'`, al insertar el botón del robot antes que el botón de la mochila en el JSX, el icono del robot aparece a la **IZQUIERDA de la mochila**:

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

---

## 📱 4. Integración Móvil y TouchScreenControls (`src/index.ts`)

En móviles, Decentraland SDK7 permite reemplazar la textura de los botones nativos de acción mediante `TouchScreenControls`:

- `InputAction.IA_PRIMARY` (Botón "E"): Decorado con `assets/images/golem_icon.png` (Reserva de Golems).
- `InputAction.IA_SECONDARY` (Botón "F"): Decorado con `assets/images/backpack_icon.png` (Inventario de Chatarra).

```typescript
TouchScreenControls.createOrReplace(engine.RootEntity, {
  hideJoystick: false,
  hideCrosshair: false,
  touchInputs: [
    {
      inputAction: InputAction.IA_PRIMARY,
      hide: false,
      icon: { tex: { $case: 'texture', texture: { src: 'assets/images/golem_icon.png' } } }
    },
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

// System Listener para presionar E o tocar el botón robot
engine.addSystem(() => {
  if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
    toggleGolemInventory()
  }
  if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
    toggleInventory()
  }
})
```

---

## 🖼️ 5. Especificaciones del Asset `golem_icon.png`

- **Ruta**: `assets/images/golem_icon.png`
- **Dimensiones**: 256px × 256px HD
- **Formato**: PNG 32-bit RGBA
- **Diseño**:
  - Sin círculo ni marcos exteriores.
  - Ilustración de la cabeza de un robot/golem steampunk de latón brillante con ojos cian incandescentes (`#00FFFF`), ocupando ~88% del lienzo sobre un fondo oscuro sólido (`#0E121A`).

---

## 🖥️ 6. Modal de Inventario de Golems (`src/ui/golemInventoryComponent.tsx`)

### 6.1 Estructura Centrada e Interactiva

```typescript
export const GolemInventoryModal = () => {
  if (!getIsGolemInventoryOpen()) return null

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
      onMouseDown={() => toggleGolemInventory()}
    >
      {/* Tarjeta Central (920px × 540px Centrada) */}
      <UiEntity
        uiTransform={{
          width: 920,
          height: 540,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { top: 16, bottom: 16, left: 20, right: 20 },
          pointerFilter: 'block'
        }}
        uiBackground={{
          color: Color4.create(0.06, 0.08, 0.12, 0.96)
        }}
      >
        {/* Cabecera, Barra de Filtros, Cuerpo en 2 Columnas y Pie */}
      </UiEntity>
    </UiEntity>
  )
}
```

### 6.2 Componentes de la Ventana

1. **Cabecera**:
   - Título: `🤖 RESERVA Y ESCUADRÓN DE GOLEMS`
   - Badge de Escuadrón: Muestra la ocupación del escuadrón activo (`Escuadrón Activo (3/3)`).
   - Botón de cierre: `✖` táctil en rojo en la esquina superior derecha.
2. **Barra de Filtros por Afinidad**:
   - Botones interactivos con colores emisivos: `[ Todos | ♨️ Vapor | ⚡ Galvánico | ⚙️ Mecánico | ☀️ Luminoso | 🔮 Éter ]`.
3. **Columna Izquierda (58% de ancho - Lista de Golems)**:
   - Tarjetas de golems con nombre traducido, insignia de nivel (`Nv. X`), barra de vida proporcional `💚 HP: X/Y (Z%)` y badge de estado `🛡️ Escuadrón Activo`.
   - Estado vacío ("Empty state") con icono de robot si no hay golems en la categoría filtrada.
4. **Columna Derecha (40% de ancho - Panel de Inspección)**:
   - Desglose completo del golem seleccionado:
     - ⚔️ Ataque Base (`attack`)
     - 🛡️ Defensa Base (`defense`)
     - 💚 Salud / HP Max (`currentHp / maxHp`)
     - ⚡ Velocidad (`speed`)
     - ⭐ Experiencia Acumulada (`currentExp / (level * 100)`)
     - 🔮 Ventaja Elemental del Pentágono (`×1.40` ventaja)
     - Botón de acción `✔ Asignar a Escuadrón`.
5. **Pie de Modal**:
   - Mensaje informativo: *"💡 Puedes mantener hasta 3 Golems en tu escuadrón activo para explorar y combatir."*

---

## 🌐 7. Soporte Bilingüe i18n (`src/i18n`)

Toda la interfaz del inventario de golems está completamente traducida en `golemInventory` dentro de `es.ts` y `en.ts`:

```typescript
golemInventory: {
  title: '🤖 RESERVA Y ESCUADRÓN DE GOLEMS',
  empty: 'No tienes golems en tu reserva. Acude a la Fábrica de Golems para forjar nuevos autómatas.',
  activeSquad: 'Escuadrón Activo (3/3)',
  reserve: 'En Reserva',
  filterAll: 'Todos',
  golemDetails: 'Detalles del Autómata',
  robotTooltip: 'Reserva de Golems (🤖 / E)',
  assignToSquad: 'Asignar a Escuadrón',
  sendExpedition: 'Enviar a Expedición',
  inExpedition: 'En Expedición fuera de línea',
  statAttack: 'Ataque Base',
  statDefense: 'Defensa Base',
  statHp: 'Salud / HP',
  statSpeed: 'Velocidad de Movimiento',
  statExp: 'Experiencia Acumulada',
  affinityAdvantage: 'Ventaja Elemental',
  golemTip: '💡 Puedes mantener hasta 3 Golems en tu escuadrón activo para explorar y combatir.',
  selectGolem: 'Selecciona un golem para inspeccionar sus estadísticas de combate.'
}
```

---

## 🧪 8. Protocolo de Verificación y Pruebas

1. **Compilación**:
   - Ejecutar `npm run build` confirmando `Type checking completed without errors`.
2. **Verificación en Desktop**:
   - Comprobar que en la barra debajo del minimapa aparece el icono del robot a la izquierda del icono de la mochila.
   - Presionar la tecla **E** o hacer clic en el robot para abrir/cerrar la ventana modal centrada.
3. **Verificación en Móviles (Godot Explorer)**:
   - Comprobar que el botón "E" de la pantalla táctil muestra la textura del robot (`golem_icon.png`) y el botón "F" la de la mochila (`backpack_icon.png`).
   - Tocar el icono del robot en la pantalla táctil para abrir **y cerrar** la ventana modal.
4. **Verificación de Filtros y Estadísticas**:
   - Alternar entre las distintas pestañas de afinidad elemental y comprobar la actualización instantánea del panel de inspección.
