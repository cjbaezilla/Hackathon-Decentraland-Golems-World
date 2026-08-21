# 📡 Guía Maestra: Sistema de Radar de Calor, Sonar 2D y Recolección Táctica

> **Estado**: Especificación Técnica Oficial v2.0  
> **Ámbito**: Decentraland SDK7 / React-ECS UI / Godot Mobile & Desktop  
> **Módulo Principal**: `src/ui/heatRadarComponent.tsx`  
> **Sistemas Relacionados**: `src/systems/itemSpawnSystem.ts`, `src/state.ts`, `src/utils/mapUtils.ts`

---

## 🧭 1. Visión General y Filosofía de Diseño

En el universo de **Golems World**, la exploración y la recolección de chatarra mecatrónica son los pilares fundamentales para la forja de autómatas. El **Radar de Calor y Sonar 2D** es el dispositivo táctico principal del jugador, diseñado en formato **Mobile-First** con una estética industrial Steampunk de alta tecnología.

El widget se presenta como un contenedor cuadrado de **`200px × 200px`**, coincidiendo exactamente en proporciones y alineación con el **Minimapa HUD** (`top: 80, right: 28` para el minimapa y `top: 80, right: 238` para el radar), manteniendo una retícula visual armoniosa y respetando las zonas seguras móviles (*touch safe area*).

---

## 🎨 2. Especificación Visual y Componentes de la Interfaz

```text
┌──────────────────────────────────────────────────┐ (200px x 200px)
│ 📡 SONAR TÉRMICO                        🔥 12.4m │ Cabecera Táctica (22px)
├──────────────────────────────────────────────────┤
│                                                  │
│                    [ N ]                         │
│             . - - - - - - - .                    │
│           /     . - - - .     \                  │
│          /    /   (10m)   \    \                 │
│         |    |    (4m)     |    |                │
│   [ W ] |----+--  [•]  ----+----| [ E ]          │ Pantalla Circular (140px)
│         |    |   (Target)  |    |                │ Anillos Concéntricos:
│          \    \   (20m)   /    /                 │ 30m, 20m, 10m y 4m
│           \     ' - - - '     /                  │ Onda de Barrido Animada
│             ' - - - - - - - '                    │ Punto Palpitante (Blip)
│                    [ S ]                         │
│                                                  │
├──────────────────────────────────────────────────┤
│           TRANSISTORES (POCO COMÚN)              │ Etiqueta Inferior (22px)
└──────────────────────────────────────────────────┘
```

### 2.1 Capas de la Interfaz (React-ECS Hierarchy)

1. **Marco Táctico Exterior (`200px × 200px`)**:
   - Fondo de cristal blindado semitransparente (`Color4.create(0.06, 0.08, 0.13, 0.94)`).
   - Borde sutil resplandeciente según la temperatura térmica activa.

2. **Cabecera Táctica (Top Bar - `height: 22px`)**:
   - Título del sensor: `📡 SONAR TÉRMICO`.
   - Lectura digital de distancia instantánea en metros (`>30m`, `📡 24.5m`, `⚡ 12.4m`, `🔥 3.1m`).

3. **Lienzo Circular del Sonar (`140px × 140px` - Centro exacto `70, 70`)**:
   - **Fondo de Osciloscopio**: Tonalidad azul/negro industrial (`Color4.create(0.03, 0.05, 0.08, 0.95)`).
   - **Anillos Concéntricos de Rango**:
     - *Anillo Exterior (30m)*: Diámetro `120px` (Radio 60px).
     - *Anillo Intermedio (20m)*: Diámetro `80px` (Radio 40px).
     - *Anillo Interior (10m)*: Diámetro `40px` (Radio 20px).
     - *Zona de Emergencia / Pickup (4m)*: Diámetro `16px` (Radio 8px).
   - **Retícula Axial (Cruz X/Z)**: Líneas ortogonales que dividen los cuatro cuadrantes tácticos.
   - **Indicador Frontal**: Marcador superior cian que indica la orientación del frente del avatar (*Facing Forward*).

4. **Barrido de Onda Expansiva Animada (Sonar Pulse Wave)**:
   - Dos anillos de pulso concéntrico cuya escala se expande dinámicamente de `0px` a `136px` según el tiempo transcurrido (`Date.now()`), reduciendo gradualmente su opacidad para simular un pulso de radar contínuo.

5. **Punto Palpitante de Objetivo (Pulsating Target Blip)**:
   - Marcador resplandeciente de `12px × 12px` con núcleo blanco emisivo de `4px × 4px`.
   - Palpita con frecuencia de parpadeo ($\text{pulseSpeed}$) y gradiente cromático según el nivel de distancia.

6. **Etiqueta Inferior de Identificación (Bottom Bar - `height: 22px`)**:
   - Muestra el nombre canónico y rareza del objeto detectado en el idioma activo mediante `src/i18n` (ej. `TRANSISTORES (POCO COMÚN)`).

---

## 🧮 3. Algoritmo de Proyección Vectorial (Heading-Up Projection)

Para evitar cualquier distorsión o confusión de dirección entre el mundo 3D y la pantalla 2D del sonar, se utiliza un algoritmo de **proyección vectorial escalar** basado en los vectores unitarios de la cámara/avatar.

### 3.1 Matemática de Proyección

Dado el vector relativo del avatar al ítem objetivo en coordenadas del mundo 3D:
$$\Delta X = X_{\text{item}} - X_{\text{jugador}}$$
$$\Delta Z = Z_{\text{item}} - Z_{\text{jugador}}$$
$$d_{\text{real}} = \sqrt{\Delta X^2 + \Delta Z^2}$$

Y los componentes unitarios del vector de visión del jugador obtenidos de `getPlayerMapState()`:
$$\mathbf{uF} = (uF_x, uF_z) \quad \text{(Vector Adelante / Forward)}$$

Calculamos los componentes escalares proyectados:
1. **Distancia Adelante / Atrás (Eje Y del Sonar)**:
   $$\text{aheadMeters} = \Delta X \cdot uF_x + \Delta Z \cdot uF_z$$
2. **Distancia Derecha / Izquierda (Eje X del Sonar)**:
   $$\text{rightMeters} = \Delta X \cdot uF_z - \Delta Z \cdot uF_x$$

### 3.2 Escalado y Posicionamiento en Pantalla (70, 70)

Con el centro del lienzo en $(c_x, c_y) = (70, 70)$ px y un radio máximo $R_{\text{max}} = 60$ px para la escala de $30\text{m}$:

$$\text{escala} = \frac{\min(1.0, d / 30.0) \times 60.0}{d}$$
$$\text{screenX} = 70 + \text{rightMeters} \times \text{escala}$$
$$\text{screenY} = 70 - \text{aheadMeters} \times \text{escala}$$

$$\text{blipLeft} = \text{screenX} - 6 \quad | \quad \text{blipTop} = \text{screenY} - 6$$

---

## 🌡️ 4. Gradientes Térmicos y Estados de Proximidad

| Rango de Distancia ($d$) | Estado del Sensor | Color Tema (RGB) | Frecuencia de Pulso | Comportamiento del Material |
| :--- | :--- | :--- | :--- | :--- |
| **$d > 30.0\text{m}$** | Inactivo / Escaneo | Azul Frío (`#3380CC`) | 2.0 Hz (Lento) | Oculto bajo tierra ($Y = -0.5\text{m}$). Blip fuera de rango. |
| **$15.0\text{m} < d \le 30.0\text{m}$** | Señal Templada | Amarillo (`#E6E633`) | 3.0 Hz (Medio) | Blip visible en el anillo exterior ($20\text{m}-30\text{m}$). |
| **$4.0\text{m} < d \le 15.0\text{m}$** | Señal Cálida | Naranja (`#FF8C1A`) | 6.0 Hz (Rápido) | Blip visible en el anillo intermedio ($4\text{m}-15\text{m}$). |
| **$d \le 4.0\text{m}$** | Proximidad Inmediata | Rojo/Dorado Emisivo (`#FF401A`) | 12.0 Hz (Intenso) | El material **emerge del terreno** ($Y = 0.25\text{m}$) con brillo PBR y hitbox táctil lista para ser recogida. |

---

## 💻 5. Implementación y Código Fuente (`HeatRadarWidget`)

El componente `HeatRadarWidget` en `src/ui/heatRadarComponent.tsx` consulta de forma atómica el estado `getHeatRadarState()` actualizado en cada tick por `itemSpawnSystem.ts`:

```typescript
// Fragmento clave de renderizado de blip en heatRadarComponent.tsx
if (isDetected && radar.itemX !== 0 && radar.itemZ !== 0) {
  const playerMap = getPlayerMapState()
  const dx = radar.itemX - playerMap.x
  const dz = radar.itemZ - playerMap.z
  const realDist = Math.sqrt(dx * dx + dz * dz)

  const uFx = playerMap.dirX
  const uFz = -playerMap.dirY
  const lenF = Math.sqrt(uFx * uFx + uFz * uFz) || 1

  const normFx = uFx / lenF
  const normFz = uFz / lenF

  const aheadMeters = dx * normFx + dz * normFz
  const rightMeters = dx * normFz - dz * normFx

  const effectiveDist = realDist > 0 ? realDist : dist
  const clampedDistRatio = Math.min(1.0, effectiveDist / 30.0)
  const scaleRatio = effectiveDist > 0 ? (clampedDistRatio * 60.0) / effectiveDist : 0

  const screenX = 70 + rightMeters * scaleRatio
  const screenY = 70 - aheadMeters * scaleRatio

  blipLeft = screenX - 6
  blipTop = screenY - 6
}
```

---

## 📱 6. Optimización Mobile-First

- **Resolución Virtual Base**: Proyectado en `1920x1080` (adaptable a `1600x720` en móviles).
- **Filtro de Puntero (`pointerFilter: 'none'`)**: Todo el widget permite que las pulsaciones del usuario atraviesen libremente hacia el mundo 3D y joysticks móviles.
- **Sin Dependencia de Teclado**: Orientado 100% al movimiento libre táctil.
