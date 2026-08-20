# 📚 Índice Maestro y Catálogo de Guías Técnicas de Golems World

Bienvenido al directorio de documentación técnica y guías maestras de **Golems World** para **Decentraland SDK7**. Este catálogo consolida todos los manuales de arquitectura, diseño de niveles, sistemas de combate, mecánicas de juego, soporte móvil e internacionalización.

---

## 📑 Catálogo de Guías Disponibles

| # | Guía Técnica | Temas Principales y Alcance | Enlace Directo |
| :-: | :--- | :--- | :--- |
| **01** | **Mapa, Distritos, Zonas y Coordenadas** | Cuadrícula de 25x25 (400m × 400m / 160.000 m²), delimitación de las 9 zonas, cotas métricas, trampolines de vapor y puestos comerciales. | [📖 Leer Guía](guia-mapa-zonas-y-distritos.md) |
| **02** | **NPC de Bienvenida «Silas el Sobreviviente»** | Configuración de `AvatarShape`, micro-campamento de supervivencia en Parcela [0, 0] `(15.8m, 5.9m)`, árbol de diálogos ramificado, mini-golem «Pistón» y modal RPG Mobile-First. | [📖 Leer Guía](guia-npc-bienvenida-silas.md) |
| **03** | **Gran Arena Circular de Torneo Steampunk** | Plataforma monumental de 72m de diámetro en `(200m, 200m)`, Cell Ring, engranajes giratorios, balizas perimetrales y sistema de animación continua. | [📖 Leer Guía](guia-arena-torneo-steampunk.md) |
| **04** | **Fábrica de Golems y Mecánicas (Wreckage Lab)** | Laboratorio de desguace en Parcelas [1, 2] y [2, 2], estaciones de ensamblaje, reactor central de fusión, rampa de salida y forja determinista. | [📖 Leer Guía](guia-fabrica-de-golems-y-mecanicas.md) |
| **05** | **Sistema de Combate y Batallas FFA** | Combate en tiempo real por ticks de delta time, Pentágono de Afinidades, separación Boids, sincronización P2P, números flotantes y progresión. | [📖 Leer Guía](guia-sistema-combate-y-batallas.md) |
| **06** | **Sistema de Seguimiento y Mecánicas de Escuadrón** | Acompañamiento en fila de hasta 3 golems, interpolación Multi-Trail FIFO LERP/SLERP, evasión de obstáculos y transición fluida a combate. | [📖 Leer Guía](guia-sistema-seguimiento-y-mecanicas.md) |
| **07** | **Multijugador P2P y Optimización Mobile-First** | Arquitectura de red P2P (`MessageBus`), gestión de controles táctiles (`TouchScreenControls`), hitboxes amplias y restricciones del cliente móvil. | [📖 Leer Guía](guia-multijugador-mobile.md) |
| **08** | **Soporte Bilingüe e Internacionalización (i18n)** | Motor dinámico `src/i18n`, selector de idioma táctil en HUD, diccionarios canónicos tipados (ES/EN) y suscripciones reactivas en tiempo real. | [📖 Leer Guía](guia-soporte-bilingue-i18n.md) |
| **09** | **Sistema de Cámaras, Cinemáticas y Presentación** | Cámara orbital SDK7 con `VirtualCamera`, `lookAtEntity`, bloqueo de avatar con `InputModifier`, botón de salto Mobile-First y presentación de Silas. | [📖 Leer Guía](guia-cinematicas-y-camaras.md) |
| **10** | **Sistema de Minimapa, Cartografía 2D y Orientación** | Proyección matemática 2D del Grid 25x25 (400m × 400m), cono de visión 360° (Sight Cone), texturas bilingües HD y modal panorámico Mobile-First en 2 columnas. | [📖 Leer Guía](guia-sistema-minimapa-y-cartografia.md) |

---

## 🧭 Resumen Rápido por Guía

### 1. [guia-mapa-zonas-y-distritos.md](guia-mapa-zonas-y-distritos.md)
Documento espacial exhaustivo que detalla la matriz de 25x25 parcelas desde `0,0` hasta `24,24`. Explica los rangos de coordenadas de las 4 esquinas simétricas (140m × 140m cada una: Distrito de la Forja, Desierto de Chatarra, Reserva de Minería y Calderas de Fundición), anillos intermedios, pasillos viales, trampolines propulsores y los 5 puestos de comercio steampunk.

### 2. [guia-npc-bienvenida-silas.md](guia-npc-bienvenida-silas.md)
Manual completo del mentor inicial del juego: **Silas el Sobreviviente**, ubicado en la plataforma de bienvenida `(X: 15.8m, Y: 0.25m, Z: 5.9m)`. Detalla sus wearables, props ambientales (chimenea humeante, cofre de engranajes, barril con farol, mini-golem leal «Pistón»), árbol narrativo ramificado y el sistema de animación reactiva con emotes periódicos.

### 3. [guia-arena-torneo-steampunk.md](guia-arena-torneo-steampunk.md)
Especificación técnica y arquitectónica de la Gran Arena de Torneo circular ubicada en el centro exacto del mundo `(200m, 200m)`. Describe la geometría radial, el suelo de madera y losas metálicas, engranajes planetarios giratorios, balizas luminosas y el sistema `arenaAnimationSystem`.

### 4. [guia-fabrica-de-golems-y-mecanicas.md](guia-fabrica-de-golems-y-mecanicas.md)
Guía de diseño del Wreckage Lab (Laboratorio de Chatarra) situado entre las parcelas `[1, 2]` y `[2, 2]`. Incluye la cadena de ensamblaje completa: tolva de entrada de ingredientes, cámara de fusión con crisol incandescente, tuberías de alimentación de vapor y cápsula/rampa de expulsión de golems recién creados.

### 5. [guia-sistema-combate-y-batallas.md](guia-sistema-combate-y-batallas.md)
Documento de reglas y matemáticas del combate en tiempo real FFA. Incluye la fórmula canónica de daño, el pentágono elemental (*Vapor > Mecánico > Galvánico > Luminoso > Éter > Vapor* con multiplicadores $\times 1.40$ y $\times 0.75$), lógica de anillos perimetrales, inmunidad de aliados y sistema de subida de nivel.

### 6. [guia-sistema-seguimiento-y-mecanicas.md](guia-sistema-seguimiento-y-mecanicas.md)
Arquitectura matemática del seguimiento suave de hasta 3 golems acompañantes por jugador. Detalla el algoritmo Multi-Trail FIFO, amortiguación LERP para traslación y SLERP para rotación, distancias de parada configurables y teleportación de rescate si el avatar viaja a alta velocidad.

### 7. [guia-multijugador-mobile.md](guia-multijugador-mobile.md)
Estándares y restricciones para el desarrollo multijugador P2P y compatibilidad estricta con la app móvil de Decentraland (Godot Explorer). Cubre el manejo de mensajes en `multiplayer.ts`, esquemas táctiles en `TouchScreenControls` y buenas prácticas de rendimiento DOP.

### 8. [guia-soporte-bilingue-i18n.md](guia-soporte-bilingue-i18n.md)
Manual del subsistema de internacionalización (`src/i18n`). Establece la regla de cero textos hardcodeados, la estructura de `TranslationSchema`, funciones auxiliares `t()` y `toggleLanguage()`, y la integración con la interfaz de usuario en React-ECS y rótulos 3D.

### 9. [guia-cinematicas-y-camaras.md](guia-cinematicas-y-camaras.md)
Manual técnico del sistema de cinemáticas y cámaras virtuales. Detalla la orquestación de `VirtualCamera` y `MainCamera`, fórmulas de la trayectoria orbital, bloqueo seguro de avatar con `InputModifier`, superposición UI con botón táctil de salto y repetición desde el diálogo con Silas.

### 10. [guia-sistema-minimapa-y-cartografia.md](guia-sistema-minimapa-y-cartografia.md)
Manual completo del sistema de minimapa HUD y modal panorámico de mapa grande. Detalla las ecuaciones de proyección métrica a porcentaje en el Grid 25x25 (400m × 400m), cálculo del vector director y cono de visión 360° (*Sight Cone*), diseño apaisado en 2 columnas optimizado para la resolución virtual móvil `1600x720` e intercambio dinámico de texturas bilingües (`minimap.jpg` / `minimap_en.jpg`).

