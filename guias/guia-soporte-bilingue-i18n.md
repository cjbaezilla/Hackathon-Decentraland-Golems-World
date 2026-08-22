# Guía Maestra: Sistema de Soporte Bilingüe e Internacionalización (i18n)

> [!IMPORTANT]
> **REGLA DE LOCALIZACIÓN OBLIGATORIA (ZERO HARDCODED TEXTS)**:  
> Queda terminantemente prohibido escribir textos estáticos o cadenas de caracteres directas en español o inglés dentro de componentes visuales, interfaces de usuario (React-ECS), cartelería 3D (`TextShape`), interactores de puntero (`hoverText` en `pointerEventsSystem`) o logs de eventos en tiempo de ejecución.  
> **Todo texto presentado al usuario debe obtenerse exclusivamente a través del módulo central `src/i18n`**.

---

## 📑 1. Resumen y Filosofía de Diseño

Esta escena de Decentraland SDK7 está preparada para ser disfrutada tanto por comunidades hispanohablantes como angloparlantes de manera simultánea y fluida.

El motor de internacionalización (**i18n**) ha sido diseñado bajo los siguientes pilares:
1. **Tipado Estricto (TypeScript First)**: Esquemas de traducción tipados mediante `TranslationSchema` para garantizar paridad 1:1 entre los diccionarios en español (`es.ts`) e inglés (`en.ts`).
2. **Reactividad Instantánea en UI (React-ECS)**: La interfaz de usuario no requiere recargar la escena ni invocar llamadas asíncronas pesadas al conmutar de idioma; el renderizado reacciona al instante al estado reactivo.
3. **Suscripción de Entidades 3D (`onLanguageChange`)**: Las entidades del mundo físico con componentes `TextShape` o `pointerEventsSystem` se suscriben a los cambios de idioma para actualizar sus carteles y textos flotantes en tiempo real.
4. **Diseño Mobile-First & Safe Area**: El botón selector de idioma (`[ 🌐 ES | EN ]`) está ubicado en la esquina superior derecha con un área táctil amplia ($140 \times 46\text{ px}$) que respeta las zonas seguras de la aplicación móvil de Decentraland.
5. **Cero Impacto de Rendimiento**: Los diccionarios residen en memoria como objetos estáticos ligeros (< 50 KB de RAM), sin realizar peticiones de red adicionales en cada lectura.

---

## 🗂️ 2. Estructura del Módulo `src/i18n/`

```text
src/i18n/
├── types.ts           # Definición de tipos: Language y TranslationSchema
├── locales/
│   ├── es.ts          # Diccionario canónico en Español
│   └── en.ts          # Diccionario canónico en Inglés
└── index.ts           # Motor central, funciones t(), helpers y listeners
```

### 2.1 Archivo de Tipos (`src/i18n/types.ts`)
Define las secciones semánticas de la experiencia:
- `common`: Botones genéricos, indicadores de nivel, salud, atributos y etiquetas de control.
- `zones`: Nombres de las 9 zonas y corredores del mapa de 400m × 400m.
- `affinities`: Nombres de las 5 afinidades elementales (*Vapor*, *Galvánico*, *Mecánico*, *Luminoso*, *Éter*).
- `golems`: Listas de nombres arquetípicos para las variantes de cada afinidad.
- `combat`: Mensajes de entrada/salida de la arena, logs de ataque, ventajas elementales, derrotas y subidas de nivel.
- `trampoline`: Textos de activación y carteles flotantes del trampolín de vapor.
- `radar`: Estados térmicos del radar de calor y distancias euclidianas.
- `forge`: Títulos, instrucciones y estados de la forja determinista.
- `golemRecipeHash` & `recipesCatalog`: Nombres bilingües de las 150 recetas oficiales (`nameEs` y `nameEn`) y generador procedural.


---

## ⚙️ 3. API y Métodos Principales

### 3.1 `t(path: string, params?: Record<string, string | number>, lang?: Language): string`
Resuelve una clave de traducción utilizando notación por puntos. Permite interpolación dinámica de variables:

```typescript
import { t } from '../i18n'

// Traducción simple
const interactLabel = t('common.interact') // "Interactuar" o "Interact"

// Traducción con interpolación de variables
const log = t('combat.levelUp', { name: 'Calderón de Vapor', level: 2 })
// ES: "⭐ ¡Calderón de Vapor subió al Nivel 2!"
// EN: "⭐ Calderón de Vapor reached Level 2!"
```

### 3.2 `getLanguage(): Language` y `setLanguage(lang: Language)`
Permiten consultar y establecer el idioma activo (`'es'` o `'en'`).

### 3.3 `toggleLanguage(): Language`
Alterna automáticamente entre español e inglés y dispara los eventos de actualización.

### 3.4 `onLanguageChange(listener: (lang: Language) => void): () => void`
Registra un callback que se ejecuta cuando el idioma cambia. Devuelve una función para desuscribirse:

```typescript
import { onLanguageChange, t } from '../i18n'
import { TextShape } from '@dcl/sdk/ecs'

const signEntity = engine.addEntity()

function updateSign() {
  if (TextShape.has(signEntity)) {
    TextShape.getMutable(signEntity).text = t('trampoline.signTitle')
  }
}

// Suscribirse a cambios en tiempo real
const unsubscribe = onLanguageChange(() => {
  updateSign()
})
```

### 3.5 Helpers de Afinidades y Nombres de Golems
- `getLocalizedAffinity(affinity: string, lang?: Language): string`: Devuelve el nombre de la afinidad traducido al idioma activo o solicitado.
- `getLocalizedGolemName(affinity: string, variantIndex: number, lang?: Language): string`: Devuelve el nombre del golem según su afinidad y variante (0 a 4).
- `translateOfficialRecipeNameEs(nameEn: string): string`: Traduce deterministamente los 150 nombres oficiales en inglés de 2 palabras (*"Electric Bulwark"* $\rightarrow$ *"Baluarte Eléctrico"*, *"Filament Hunter"* $\rightarrow$ *"Cazador de Filamento"*).
- `generateProceduralGolemName(affinity: GolemAffinity, hash: number, lang?: Language): string`: Genera nombres procedurales algorítmicos en español (*"Baluarte Presurizado"*) e inglés (*"Pressurized Bulwark"*).
- `getGolemDisplayName(golem: { name?: string; nameEs?: string; nameEn?: string; affinity: string; variantIndex?: number }, lang?: Language): string`: Resuelve de forma inteligente el nombre a mostrar priorizando `nameEn` en inglés y `nameEs` en español, con fallbacks para variantes y `name`.

### 3.6 Actualización 3D en Tiempo Real de Etiquetas Flotantes (`onLanguageChange`)
Los golems seguidores activos y los golems salvajes del mapa se suscriben al evento `onLanguageChange` en [`src/objects/golemFactory.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/golemFactory.ts) y [`src/objects/mapGolemsGenerator.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/mapGolemsGenerator.ts). Al conmutar de idioma en la UI, sus etiquetas flotantes `TextShape` 3D se actualizan al instante en el mundo sin necesidad de reinstanciar las entidades.


---

## 📱 4. Integración en la Interfaz de Usuario (React-ECS)

El selector táctil de idioma está integrado en [`src/ui.tsx`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/ui.tsx) mediante el componente `LanguageToggle`:

```tsx
export const LanguageToggle = () => {
  const currentLang = getLanguage()
  const isEs = currentLang === 'es'

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 24, right: 32 },
        width: 140,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'auto'
      }}
      uiBackground={{
        color: Color4.create(0.12, 0.12, 0.16, 0.88)
      }}
      onMouseDown={() => {
        toggleLanguage()
      }}
      uiText={{
        value: isEs ? '🌐 ES | en' : '🌐 es | EN',
        fontSize: 18,
        color: isEs ? Color4.create(1.0, 0.85, 0.3, 1.0) : Color4.create(0.4, 0.9, 1.0, 1.0)
      }}
    />
  )
}
```

---

## 🛠️ 5. Guía para Agregar Nuevas Traducciones

Cuando se desarrolle una nueva característica (ej. inventario de piezas, árbol de recetas o misiones fuera de línea):

1. **Declarar las claves en `src/i18n/types.ts`**:
   ```typescript
   export interface TranslationSchema {
     // ...
     inventory: {
       title: string
       empty: string
       slotCount: string
     }
   }
   ```

2. **Añadir los textos en español en `src/i18n/locales/es.ts`**:
   ```typescript
   inventory: {
     title: 'Inventario de Chatarra',
     empty: 'Tu mochila está vacía. ¡Explora el mapa con tu radar!',
     slotCount: 'Espacios: {used}/{max}'
   }
   ```

3. **Añadir los textos en inglés en `src/i18n/locales/en.ts`**:
   ```typescript
   inventory: {
     title: 'Scrap Inventory',
     empty: 'Your backpack is empty. Explore the map using your radar!',
     slotCount: 'Slots: {used}/{max}'
   }
   ```

4. **Consumir en el código mediante `t()`**:
   ```typescript
   const title = t('inventory.title')
   const count = t('inventory.slotCount', { used: 3, max: 20 })
   ```

### 5.1 Texturas e Imágenes de UI Bilingües (Patrón de Cartografía)
Cuando una textura 2D contiene rotulación o tipografía horneada (como el mapa del mundo), se implementa un selector dinámico basado en `getLanguage()`:

```typescript
import { getLanguage } from '../i18n'

export function getMinimapTextureSrc(): string {
  return getLanguage() === 'en' ? 'assets/images/minimap_en.jpg' : 'assets/images/minimap.jpg'
}

// En el componente React-ECS:
<UiEntity
  uiBackground={{
    texture: { src: getMinimapTextureSrc() },
    textureMode: 'stretch'
  }}
/>
```

---

## 🔒 6. Buenas Prácticas y Reglas para Desarrolladores y Agentes

- 🚫 **Nunca hardcodear strings en inglés ni en español** en `pointerEventsSystem`, `TextShape`, `addCombatLog` o componentes UI.
- ✅ **Utilizar siempre claves semánticas y jerárquicas** (`modulo.submodulo.clave`).
- ✅ **Garantizar paridad estritca**: Si se añade una clave a `es.ts`, debe añadirse simultáneamente a `en.ts` y al tipo `TranslationSchema`.
- ✅ **Formatos de números y fechas**: Mantener formatos limpios y comprensibles internacionalmente.
