# 🎬 Guía Maestra: Sistema de Cámaras, Cinemáticas y Presentación en Decentraland SDK7

> [!IMPORTANT]
> **COMPATIBILIDAD Y ARQUITECTURA MOBILE-FIRST**:
> Esta guía documenta la arquitectura de cámaras y cinemáticas de **Golems World**, implementada en TypeScript nativo para Decentraland SDK7. El sistema utiliza `VirtualCamera`, `MainCamera`, `lookAtEntity`, `InputModifier` y transiciones suaves (`VirtualCamera.Transition`), garantizando compatibilidad 100% tanto en la app móvil de Decentraland (Godot Explorer) como en clientes de escritorio.

---

## 🧭 1. Resumen y Propósito

Al entrar a la experiencia en la Parcela base `[0, 0]` (`X: 12.2m, Z: 2.0m`), los nuevos jugadores necesitan orientación inmediata sobre su objetivo inicial y sobre la figura de **Silas el Sobreviviente** (`X: 15.8m, Z: 5.9m`), el mentor del páramo.

El subsistema de cinemáticas (`src/cinematics/silasCinematic.ts`) ejecuta una toma orbital panorámica alrededor de Silas y su micro-campamento, congelando temporalmente los controles del jugador, desplegando un banner narrativo con botón táctil de salto (*Skip*) y devolviendo fluidamente la vista al usuario tras 5 segundos.

```text
[Spawn Jugador: (12.2, 2.0)] ──(1.5s retardo)──▶ [Cámara Orbital Panorámica] ──(5.0s)──▶ [Retorno a Cámara Normal]
                                                        │
                                                        ├── Activa VirtualCamera (lookAtEntity: Silas)
                                                        ├── Congela Avatar (InputModifier.disableAll = true)
                                                        ├── Silas ejecuta emote 'wave' a los 0.6s
                                                        ├── Banner UI + Botón táctil 'Saltar ⏭️'
                                                        └── Descongelamiento y retorno seguro
```

---

## 🛠️ 2. Componentes Troncales del SDK7 Empleados

| Componente SDK7 | Entidad Destino | Rol en el Sistema |
| :--- | :--- | :--- |
| `VirtualCamera` | `cinematicCamEntity` | Define los parámetros de la cámara cinemática: `lookAtEntity` apuntando al avatar de Silas, `fov: 50` y `defaultTransition: Transition.Time(1.2)`. |
| `MainCamera` | `engine.CameraEntity` | Asigna la cámara virtual activa mediante `virtualCameraEntity`. Al finalizar o saltar, se restaura a `undefined`. |
| `InputModifier` | `engine.PlayerEntity` | Bloquea la entrada física/táctil (`disableAll: true`) para que el jugador no camine a ciegas mientras la cámara enfoca el campamento. |
| `AvatarShape` | `silasAvatar` | Ejecuta la animación de saludo (`expressionTriggerId: 'wave'`) sincronizada en el segundo 0.6. |
| `React-ECS UI` | `CinematicOverlay` | Franjas negras cinematográficas (*letterbox*), título dorado, subtítulo cian y botón táctil amplio de salto. |

---

## 📐 3. Matemáticas del Arco Orbital (`silasCinematicOrbitSystem`)

Silas está ubicado en `(X: 15.8m, Y: 0.25m, Z: 5.9m)`. Para mostrar tanto a Silas como la chimenea humeante, el cofre de engranajes y al mini-golem *Pistón*, la cámara se desplaza en un arco semicircular frontal:

* **Radio Orbital ($R$)**: `4.2 metros`.
* **Rango Angular ($\theta$)**: De $-0.65\text{ rad}$ ($\approx -37^\circ$, frente-izquierda) a $+0.65\text{ rad}$ ($\approx +37^\circ$, frente-derecha).
* **Fórmula de Posición Instantánea**:
  $$\text{Progreso} = \frac{t}{T_{\text{duración}}}$$
  $$\text{Ease}(p) = \frac{1 - \cos(\pi \cdot p)}{2}$$
  $$\theta(p) = \theta_{\text{inicio}} + (\theta_{\text{fin}} - \theta_{\text{inicio}}) \cdot \text{Ease}(p)$$
  $$X(p) = X_{\text{Silas}} + R \cdot \sin(\theta(p))$$
  $$Z(p) = Z_{\text{Silas}} - R \cdot \cos(\theta(p))$$
  $$Y(p) = Y_{\text{Silas}} + 1.85 + 0.45 \cdot \sin(\pi \cdot p)$$

> [!TIP]
> **Elevación Dinámica**: La componente sinusoidal en $Y$ añade una elevación suave de hasta $+0.45\text{m}$ en el punto medio de la trayectoria, creando un efecto de grúa cinematográfica (*jib/crane shot*) profesional.

---

## 📱 4. Control de Salto y Accesibilidad Mobile-First

1. **Botón Saltar Inmediato**: En cualquier momento de la secuencia, el jugador puede tocar el botón **«Saltar ⏭️»** en la parte inferior de la pantalla.
2. **Función `stopSilasCinematic()`**:
   - Limpia de inmediato los temporizadores `timers.clearTimeout`.
   - Restablece `MainCamera.virtualCameraEntity = undefined`.
   - Restablece `InputModifier.disableAll = false`.
   - Oculta el componente `CinematicOverlay`.
3. **Repetición bajo Demanda**: Si el jugador desea volver a ver la cinemática, puede hablar con Silas y seleccionar la opción **«🎬 Ver presentación del campamento»** en el menú de diálogo.

---

## 🌐 5. Diccionario Bilingüe (i18n)

Los textos de la cinemática se obtienen del módulo `src/i18n`:

| Clave i18n | Español (`es.ts`) | Inglés (`en.ts`) |
| :--- | :--- | :--- |
| `cinematic.title` | ⚙️ SILAS, EL SOBREVIVIENTE | ⚙️ SILAS, THE SURVIVOR |
| `cinematic.subtitle` | Tu guía y mentor en el Distrito de la Forja y los Páramos | Your veteran mentor in the Forge District and Wastelands |
| `cinematic.skipButton` | Saltar ⏭️ | Skip ⏭️ |
| `cinematic.hintPrompt` | 💡 ¡Toca a Silas para iniciar tu aventura de forja! | 💡 Tap on Silas to begin your crafting adventure! |
| `npc.optReplayCinematic` | 🎬 Ver presentación del campamento | 🎬 Replay camp showcase |

---

## 📱 6. Disparo Inmediato por Interacción Reactiva y Limpieza ECS (`scheduleSilasIntroCinematic`)

Para asegurar una experiencia fluida tanto en dispositivos móviles como en escritorio:

1. **Disparo Inmediato al Primer Toque/Pulsación**: En el primer instante exacto en el que el motor detecta una interacción del jugador (`inputSystem.getInputCommand(InputAction.IA_ANY, PointerEventType.PET_DOWN)` como tap táctil, clic, WASD, salto o puntero), la cinemática arranca de inmediato sin retardos artificiales.
2. **Limpieza Automática del Sistema ECS**: Al dispararse la cinemática, el sistema `playerInputDetectionSystem` se desregistra de inmediato mediante `engine.removeSystem()`, evitando ejecuciones innecesarias en cada frame.
3. **Temporizador de Seguridad de Respaldo (Fallback)**: Si el jugador se encuentra inactivo durante la carga inicial (`20s` en móvil / `8s` en escritorio), el temporizador de seguridad inicia la cinemática y limpia los escuchadores para garantizar que nunca se omita.

---

## 🎥 7. Cámaras Orbitales Panorámicas del Tour Guiado de Silas (`src/cinematics/marketCinematic.ts`)

Durante el recorrido por el Distrito de la Forja, el sistema de navegación ECS ejecuta 4 barridos orbitales panorámicos dedicados al alcanzar cada punto de interés clave:

| Punto de Interés | Función de Disparo | Entidad de Enfoque | Trayectoria del Barrido Orbital | Contenido Enfocado |
| :--- | :--- | :--- | :--- | :--- |
| **Parada 1: Escondite** (`9.7m, 15.5m`) | `playHideoutCinematic()` | `(6.0m, 1.6m, 17.7m)` | Eje Z: $12.8\text{m} \rightarrow 22.6\text{m}$ con elevación sinusoidal | Refugio del jugador, mobiliario y los 3 cofres de la bóveda (Sur/Común, Centro/Raro, Norte/Épico-Legendario). |
| **Parada 2: Paseo Oeste** (`10.6m, 29.0m`) | `playMarketWestCinematic()` | `(6.4m, 1.6m, 45.6m)` | Eje Z: $25.0\text{m} \rightarrow 58.0\text{m}$ con arco este-oeste | Quioscos de intercambio y trueque de repuestos mecánicos #06 al #10. |
| **Parada 3: Fábrica de Golems** (`42.4m, 25.8m`) | `playFactoryCinematic()` | `(35.0m, 2.0m, 34.0m)` | Eje X: $44.5\text{m} \rightarrow 26.0\text{m}$ elevado frontal | Crisol central de fusión, chimeneas de vapor, engranajes y podio con el golem prototipo. |
| **Parada 4: Bulevar Sur** (`30.0m, 11.5m`) | `playMarketSouthCinematic()` | `(46.5m, 1.6m, 8.8m)` | Eje X: $26.0\text{m} \rightarrow 65.0\text{m}$ mirando al sur | Puestos de pertrechos, suministros y conexiones #01 al #05 de la Forja. |

Al finalizar cada barrido orbital (o si el jugador finaliza el tour), la cámara restaura automáticamente la `VirtualCamera` de seguimiento en tercera persona (`tourFollowCamera`) centrada en Silas o la vista natural del jugador.



