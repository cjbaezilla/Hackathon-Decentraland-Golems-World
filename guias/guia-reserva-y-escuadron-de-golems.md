# 🤖 Guía Maestra: Sistema de Reserva e Inventario de Golems y Gestión de Escuadrón (Desktop & Mobile UI)

## 📋 Información de la Guía

- **Módulo**: `src/ui/golemInventoryComponent.tsx`, `src/state.ts`, `src/config/golems.ts`, `src/ui/actionBarComponent.tsx`, `src/index.ts`
- **Versión**: 2.0.0 (SDK7 / React-ECS 7.26.0+ Grid Redesign)
- **Compatibilidad**: Mobile First (Godot Explorer) y Desktop Client
- **Propósito**: Manual técnico y de arquitectura sobre el subsistema de **Reserva y Squad de Golems**, la cuadrícula de **Celdas Cuadradas al 100% de Ancho**, imágenes PNG reales de Golems (300x300px), **Tarjeta Emergente de Tooltip** e inspección de estadísticas RPG.

---

## 🧭 1. Resumen Ejecutivo y Arquitectura del Sistema

El **Sistema de Reserva e Inventario de Golems** permite al jugador inspeccionar, organizar y gestionar en tiempo real su escuadrón activo de hasta 3 golems acompañantes y su catálogo de autómatas en reserva. Su diseño cumple con las reglas del espacio de trabajo:

1. **Diseño Mobile-First y Controles Nativos**:
   - **En Móviles (`isMobile()`)**: El inventario de golems se activa mediante el botón nativo de la pantalla táctil en `InputAction.IA_PRIMARY` (botón "E" de la botonera táctil), decorado con la textura HD del robot (`assets/images/golem_icon.png`).
   - **En Escritorio (`isDesktop()`)**: El icono del robot se posiciona en la barra de acción (`DesktopActionBarWidget`) justificado a la derecha a `top: 286px, right: 28px`, colocándose a la izquierda de la mochila. Además, presionar la tecla **E** en el teclado abre y cierra la modal inmediatamente.
2. **Rediseño de Cuadrícula al 100% de Ancho**:
   - Se eliminó el panel lateral derecho y la barra inferior de consejo.
   - El cuerpo del modal dedica el 100% del área horizontal a una **retícula/cuadrícula de celdas cuadradas grandes (98px × 98px)**.
3. **Imágenes PNG Reales de Alta Definición**:
   - Cada casillero renderiza la textura PNG oficial de 300×300px cargada desde `assets/models/<afinidad_folder>/<model_name>.png` (optimizada al 83.7% de compresión RGBA).
4. **Tarjeta Emergente de Tooltip (`GolemTooltipCard`)**:
   - Al pulsar o hacer clic en cualquier casillero de golem, se despliega una superposición flotante con estadísticas RPG (Ataque, Defensa, HP actual/máximo, Velocidad y Experiencia), afinidad y nivel.
5. **Manejo Aislado de Eventos (Sin Bucles de Burbujeo)**:
   - Se aplicó `pointerFilter: 'none'` en todos los elementos hijos internos y se eliminó el handler `onMouseDown` del contenedor envolvente raíz, garantizando respuesta inmediata al hacer clic en PC o tocar en móvil.

---

## 💾 2. Estado Global de la Reserva de Golems (`src/state.ts`)

El estado de la ventana modal y del escuadrón activo es gestionado a través de `sceneState`:

```typescript
export interface SceneState {
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

Ubicada en `{ top: 286, right: 28 }`, la barra se ancla inmediatamente debajo del minimapa. El botón del robot aparece a la **IZQUIERDA de la mochila**:

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

## 🖼️ 4. Estructura de la Interfaz del Inventario de Golems (`src/ui/golemInventoryComponent.tsx`)

```typescript
export function getGolemIconPath(golem: GolemConfig): string {
  if (golem.modelSrc && golem.modelSrc.endsWith('.glb')) {
    return golem.modelSrc.replace('.glb', '.png')
  }
  return golem.modelSrc || 'assets/images/golem_icon.png'
}

export const GolemInventoryModal = () => {
  if (!getIsGolemInventoryOpen()) return null
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
        {/* Cabecera con título, escuadrón (3/3) y botón ✖ */}
        {/* Barra de Filtros por Afinidad Elemental [ Todos | Vapor | Galvánico | Mecánico | Luminoso | Éter ] */}
        {/* Cuadrícula continua 100% ancho con celdas de 98px x 98px */}
        {/* Tarjeta de Tooltip emergente (activeTooltipGolem) */}
      </UiEntity>
    </UiEntity>
  )
}
```

### Secciones de la Ventana Modal:
1. **Cabecera**: Título `🤖 RESERVA Y ESCUADRÓN DE GOLEMS`, contador de escuadrón `3/3` y botón `✖` aislado.
2. **Barra de Filtros por Afinidad**: `[ Todos | Vapor ♨️ | Galvánico ⚡ | Mecánico ⚙️ | Luminoso ☀️ | Éter 🔮 ]`.
3. **Rejilla Principal (100% de Ancho)**:
   - Celdas cuadradas `98px × 98px` con barra superior de color por afinidad, previsualización PNG de 300x300px del autómata, nombre e insignias `Nv. X` y `⚔️ SQUAD`.
4. **Tarjeta Emergente de Tooltip**:
   - Superposición lateral en `{ top: 60, right: 28 }` desplegada al presionar sobre un golem.
   - Contiene la imagen PNG en 56x56px, nivel, barra de HP, estadísticas RPG (Ataque, Defensa, Velocidad, Experiencia) y badge de afinidad elemental.

---

## 🧪 5. Protocolo de Verificación

1. **Compilación de Código**:
   - Ejecutar `npx tsc --noEmit` para comprobar cero errores de tipo.
2. **Prueba en Escritorio y Móvil**:
   - Abrir el inventario de golems mediante la tecla **E** o el botón del robot.
   - Comprobar la visualización de la cuadrícula al 100% de ancho y la carga de imágenes PNG de 300x300px desde `assets/models/`.
   - Probar los filtros por afinidad y el despliegue del Tooltip al presionar sobre cualquier autómata.
