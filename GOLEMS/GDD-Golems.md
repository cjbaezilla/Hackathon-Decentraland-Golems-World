# Golems: Documento de Diseño y Especificación Técnica

![cover](golems_cover.png)

## 1. De qué trata el juego

Golems es una experiencia multijugador para Decentraland donde cada visitante entra a un mundo de chatarra, máquinas de vapor y magia residual con una misión clara: recorrer un mapa enorme, usar un radar de calor para encontrar piezas ocultas y ensamblar criaturas mecánicas únicas. La fantasía y el steampunk se cruzan en cada decisión de diseño, porque aquí no se mina mineral, se rebuscan transistores, ollas, antenas y televisores viejos entre los escombros.

El corazón del juego es el golem. Cada golem nace de una receta concreta y, gracias a un sistema de hash determinista, ninguna combinación produce exactamente el mismo resultado dos veces por accidente, aunque sí se puede reproducir a voluntad si memorizas la receta. Un jugador puede forjar y llevar consigo hasta tres golems que lo siguen por el mundo. Los que no viajan contigo no se quedan de brazos cruzados: los envías a misiones de recolección automatizadas que siguen trabajando mientras tú haces otra cosa.

Alrededor de esa idea central orbitan el combate en tiempo real basado en estadísticas, los personajes no jugadores que patrullan la escena con sus propios golems hostiles, la progresión por niveles y un torneo competitivo estilo escalera que se juega tanto en formato uno contra uno como en formato dos contra dos en una colosal arena de torneo de 72 metros.

La intención es que una persona recién llegada entienda qué hacer en los primeros dos minutos gracias al acompañamiento del NPC tutorial **Silas el Sobreviviente**, y que quien lleva semanas jugando siga encontrando razones para volver, ya sea por una pieza legendaria que no aparece, por un golem que quiere forjar con una receta secreta o por un rival que le está ganando en la tabla.

![de_que_trata](golems_de_que_trata.png)

## 2. El bucle principal de juego

El recorrido típico de una sesión se puede resumir en un flujo circular que se retroalimenta:

1. **Distrito de la Forja (Spawn & Base)**: El jugador aparece en la parcela `[0,0]` `(15.8m, 5.9m)`, interactúa opcionalmente con Silas el Sobreviviente, consulta su Escondite y Bóveda personal `(Z: 17.7m, X: 3.8m-8.0m)` y recibe el Radar de Calor.
2. **Exploración del Mapa (25x25 / 400m × 400m)**: Sale a explorar guiado por las pulsaciones térmicas del radar y el Minimapa 2D superpuesto en el HUD.
3. **Recolección de Chatarra**: Al acercarse a menos de 4m, la pieza emerge visualmente del suelo y se recolecta mediante un toque táctil.
4. **Forja Determinista**: En el Wreckage Lab de la Forja, combina de 5 a 12 componentes para generar golems con atributos y nombres derivados algorítmicamente.
5. **Acompañamiento y Combate**: Asigna hasta 3 golems activos que lo siguen en formación Multi-Trail FIFO LERP y luchan en tiempo real contra NPCs o jugadores en la Gran Arena de 72m.
6. **Misiones de Reserva Automatizadas**: Asigna a los golems en reserva misiones de recolección fuera de línea que generan botín persistente.

Cada jugador decide si se especializa en coleccionar piezas raras, en forjar golems con combinaciones poco comunes, en subir de nivel combatiendo o en trepar en la escalera competitiva.

![bucle_juego](golems_bucle_juego.png)

## 3. El mundo y el mapa (Grid 25x25 - 400m × 400m)

La experiencia se despliega en un Decentraland World de veinticinco por veinticinco parcelas (desde `0,0` hasta `24,24`), lo que equivale a un terreno de cuatrocientos por cuatrocientos metros. Son ciento sesenta mil metros cuadrados de superficie útil, y el terreno usa la configuración de paisaje natural propia de los Worlds (`landscapeTerrain: true`), con colinas suaves y desniveles que dan variedad sin complicar la navegación en móvil.

### 3.1 Distribución Espacial de Zonas y las 4 Esquinas Simétricas (140m × 140m c/u)

| Zona | Ubicación (Coords Metros) | Dimensión | Nivel de Riesgo | Materiales Principales | Descripción |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Distrito de la Forja** | Esquina Suroeste `(0,0)` a `(140,140)` | 140m × 140m (19.600 m²) | 🟢 Zona Segura (No PK) | Ninguno (Taller/Forja) | Spawn `(16, 6)`, **Silas** en `(15.8, 5.9)`, Plaza Mayor `(70, 70)`, 10 Trading Posts, Wreckage Lab `[1,2]`, Trampolín de Vapor y **Escondite/Bóveda del Jugador** en `(Z: 17.7m, X: 3.8m-8.0m)`. |
| **Desierto de Chatarra** | Esquina Noroeste `(0,260)` a `(140,400)` | 140m × 140m (19.600 m²) | 🔴 Zona PK Libre | Legendarios (`ojo_dragon`, `corazon_primigenio`) | Páramo desolado de máxima dificultad, Cráter del Autómata Primigenio `(70, 330)`, Nido del Dragón y portal `(130, 270)`. |
| **Reserva de Minería** | Esquina Noreste `(260,260)` to `(400,400)` | 140m × 140m (19.600 m²) | 🟢 Zona Segura (No PK) | Épicos (`nucleo_mana`, `cerebro_automata`, `engranajes_bronce`) | Cantera protegida de éter `(340, 340)`, taller de relojería, pozo profundo, refugio de exploradores y portal `(270, 270)`. |
| **Calderas de la Fundición** | Esquina Sureste `(260,0)` a `(400,140)` | 140m × 140m (19.600 m²) | 🔴 Zona PK Libre | Épicos (`corazon_caldera`, `reactor_eter`) | Complejo volcánico y térmico, Gran Horno Central `(330, 70)`, Reactor de Éter y portal `(270, 130)`. |
| **Corredor y Gran Vía Sur**| Sector Sur `(140,0)` a `(260,140)` | ~16.800 m² | 🟢 Zona Segura (Tránsito) | Conexión e infraestructura | Puesto de Control Parcela 13,1 `(212, 24)`, Gran Cruce `(200, 70)` y Estación de Vapor `(170, 40)`. |
| **Los Chatarrales** | Sector Oeste `(0,140)` a `(140,260)` | ~16.800 m² | 🟢 Dificultad Baja | Comunes (Alambre, Tornillos, Ollas) | Campamento de Chatarreros `(70, 200)`, Depósito de Latón `(40, 170)` y calzada $X=70$. |
| **Fábrica Abandonada** | Anillo Medio `(140,140)` a `(260,260)` | ~20.000 m² | 🟡 Dificultad Media | Poco Comunes (Transistores, Manómetros) | Estructuras industriales derruidas con materiales de estadísticas avanzadas. |
| **Subestación Eléctrica** | Sector Norte `(140,280)` a `(260,400)` | ~14.400 m² | 🟠 Dificultad Alta | Raros (Bobinas Tesla, Baterías, Motores) | Complejo de alta tensión con componentes de afinidad galvánica y vapor. |
| **Torre de Radio** | Sector Este `(280,140)` a `(400,260)` | ~14.400 m² | 🟠 Dificultad Alta | Raros (Antenas de radio, Diodos LED) | Antiguas antenas de telecomunicación con materiales de afinidad luminosa. |
| **Gran Arena de Torneo** | Centro `(164,164)` a `(236,236)` | ~4.071 m² (Ø 72m) | 🏆 Competitivo | Torneo Escalera 1v1 y 2v2 | Colosal plataforma circular de torneo steampunk en `(200, 200)`. |

### 3.2 Hitos e Infraestructura Destacada del Distrito de la Forja

- **Campamento de Silas el Sobreviviente `(15.8m, 0.25m, 5.9m)`**: Punto de acogida en la parcela `[0,0]`. Silas ofrece un diálogo tutorial dinámico (React-ECS) y un **Tour Guiado a pie** de 11 waypoints con cinemáticas de cámara orbital (`silasTourSystem.ts`) para mostrar el refugio, la fábrica y los mercados.
- **Escondite y Bóveda del Jugador (User's Hideout & Vault) `(Z: 17.7m, X: 3.8m-8.0m)`**: Taller improvisado de supervivencia que incluye una plataforma escenográfica con **3 cofres cerrados** de alta resistencia que representan la custodia del tesoro e inventario del jugador.
- **Trampolín de Vapor Propulsor `(X: 5.2m, Z: 5.6m)`**: Dispositivo mecatrónico impulsado por vapor que eleva verticalmente al avatar al pisar su plataforma, permitiendo cruzar rápidamente los desniveles hacia la plaza principal.
- **10 Puestos de Mercado Steampunk y Wreckage Lab**: Infraestructura de comercio y la nave central de forja `[1,2]` equipada con yunque térmico y reactor de plasma.

![map](golems_map.png)
![map2](golems_map2.png)

## 4. El radar de calor, el minimapa 2D y la recolección

Los materiales no están visibles a simple vista. Están enterrados o camuflados, y se revelan cuando el jugador se acerca lo suficiente utilizando el **Radar de Calor** y el **Minimapa 2D en tiempo real**.

### 4.1 El Radar de Calor (React-ECS)
- **Lejos (> 30m)**: Sensor inactivo con tonalidades frías y pulso apagado.
- **Distancia Media (15m - 30m)**: Pulso rítmico suave en tonos amarillos.
- **Cercanía (< 15m)**: Pulso acelerado en tonos rojos/naranjas brillantes.
- **Proximidad Inmediata (< 4m)**: La pieza emerge visualmente del suelo ($Y = -0.5\text{m} \rightarrow Y = 0.3\text{m}$) con efecto de partículas emisivas.
- **Recolección Táctil**: Hitbox amplia ($\ge 1.2\text{m}$) recolectable con un toque en pantalla móvil.

### 4.2 Sistema de Minimapa 2D y Cartografía
El HUD incluye un widget de **Minimapa 2D** en la interfaz React-ECS que proyecta la posición del avatar en tiempo real dentro del mapa de 25x25 parcelas (400m × 400m). Permite conmutar a vista desplegada a pantalla completa mediante toque táctil, mostrando íconos de recursos detectados, zonas de riesgo y la ubicación de la Gran Arena Central.

![radar](golems_radar.png)

## 5. Los materiales

El catálogo completo se compone de **cuarenta y seis (46) tipos de materiales coleccionables**, distribuidos en 5 niveles de rareza, todos diseñados como piezas de chatarra, mecatrónica y utensilios de un mundo post-industrial. Los porcentajes de aparición están calibrados para sumar exactamente el **100%**:

| Material | Rareza | Peso | Reaparición | Zona | Aporte principal |
|---|---|---|---|---|---|
| Alambre de cobre | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Velocidad +2 |
| Tornillos y pernos | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Defensa +2 |
| Engranajes desgastados | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Velocidad +1, Defensa +1 |
| Tubos de cobre | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Vitalidad +10 |
| Sartenes | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Defensa +3 |
| Ollas de cocinar | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Defensa +2, Vitalidad +5 |
| Placas de latón | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Defensa +3 |
| Clavos oxidados | Común | 3.7% | 1 a 3 minutos | Los Chatarrales | Defensa +1 |
| Latas de conserva | Común | 3.4% | 1 a 3 minutos | Los Chatarrales | Vitalidad +8 |
| Cadenas de hierro | Común | 3.4% | 1 a 3 minutos | Los Chatarrales | Defensa +2 |
| Tuercas gigantes | Común | 3.4% | 1 a 3 minutos | Los Chatarrales | Defensa +2 |
| Tapas de alcantarilla | Común | 3.4% | 1 a 3 minutos | Los Chatarrales | Defensa +3 |
| Cables deshilachados | Común | 3.4% | 1 a 3 minutos | Los Chatarrales | Velocidad +2 |
| Residuos de carbón | Común | 3.4% | 1 a 3 minutos | Los Chatarrales | Vitalidad +6, Afinidad Vapor |
| Transistores | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Ataque +3 |
| Bombillas de filamento | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Vitalidad +12, Afinidad Luminosa |
| Resortes de reloj | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Velocidad +4 |
| Manómetros | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Vitalidad +15 |
| Válvulas de vapor | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Ataque +2, Afinidad Vapor |
| Lentes de televisor viejo | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Velocidad +3 |
| Fusibles fundidos | Poco común | 2.6% | 4 a 7 minutos | Fábrica Abandonada | Ataque +2, Afinidad Galvánica |
| Relojes de bolsillo rotos | Poco común | 2.45% | 4 a 7 minutos | Fábrica Abandonada | Velocidad +3 |
| Brújulas magnéticas | Poco común | 2.45% | 4 a 7 minutos | Fábrica Abandonada | Velocidad +3, Afinidad Mecánica |
| Tubos de vacío | Poco común | 2.45% | 4 a 7 minutos | Fábrica Abandonada | Ataque +3, Afinidad Luminosa |
| Palancas de interruptor | Poco común | 2.45% | 4 a 7 minutos | Fábrica Abandonada | Defensa +2 |
| Motor de vapor | Raro | 1.5% | 10 a 15 minutos | Subestación Eléctrica | Ataque +5, Afinidad Vapor |
| Bobinas de Tesla | Raro | 1.5% | 10 a 15 minutos | Subestación Eléctrica | Ataque +6, Afinidad Galvánica |
| Antenas de radio | Raro | 1.5% | 10 a 15 minutos | Torre de Radio | Velocidad +6 |
| Diodos LED | Raro | 1.5% | 10 a 15 minutos | Torre de Radio | Ataque +4, Afinidad Luminosa |
| Baterías alquímicas | Raro | 1.5% | 10 a 15 minutos | Subestación Eléctrica | Vitalidad +25, Afinidad Galvánica |
| Engranajes de bronce perfectos | Raro | 1.5% | 10 a 15 minutos | Reserva de Minería | Defensa +6, Afinidad Mecánica |
| Dínamo galvánica | Raro | 1.5% | 10 a 15 minutos | Subestación Eléctrica | Ataque +5, Afinidad Galvánica |
| Cristal de cuarzo resonante | Raro | 1.5% | 10 a 15 minutos | Torre de Radio | Velocidad +5, Afinidad Luminosa |
| Giróscopo de precisión | Raro | 1.5% | 10 a 15 minutos | Reserva de Minería | Defensa +5, Afinidad Mecánica |
| Condensador de alta presión | Raro | 1.5% | 10 a 15 minutos | Subestación Eléctrica | Vitalidad +20, Afinidad Vapor |
| Núcleo de maná condensado | Épico | 0.8% | 20 a 30 minutos | Reserva de Minería | Ataque +8, Afinidad Éter |
| Cerebro de autómata | Épico | 0.8% | 20 a 30 minutos | Reserva de Minería | Ataque +8, Afinidad Mecánica |
| Reactor de éter | Épico | 0.8% | 20 a 30 minutos | Calderas de la Fundición (PK) | Ataque +9, Afinidad Éter |
| Corazón de caldera | Épico | 0.8% | 20 a 30 minutos | Calderas de la Fundición (PK) | Defensa +8, Afinidad Vapor |
| Batería de plasma supercargada | Épico | 0.8% | 20 a 30 minutos | Subestación Eléctrica | Ataque +8, Afinidad Galvánica |
| Matriz óptica solar | Épico | 0.8% | 20 a 30 minutos | Torre de Radio | Velocidad +7, Afinidad Luminosa |
| Émbolo de titanio forjado | Épico | 0.8% | 20 a 30 minutos | Calderas de la Fundición (PK) | Defensa +7, Afinidad Vapor |
| Ojo de dragón mecánico | Legendario | 0.35% | 45 a 60 minutos | Desierto de Chatarra (PK) | Ataque +14, Afinidad Éter |
| Corazón de golem primigenio | Legendario | 0.35% | 45 a 60 minutos | Desierto de Chatarra (PK) | Todas las estadísticas |
| Singularidad etérica | Legendario | 0.35% | 45 a 60 minutos | Desierto de Chatarra (PK) | Ataque +12, Velocidad +6, Afinidad Éter |
| Relicario de engranajes astrales | Legendario | 0.35% | 45 a 60 minutos | Desierto de Chatarra (PK) | Defensa +10, Vitalidad +30, Afinidad Éter |

Los materiales épicos y legendarios respetan un límite de **una sola instancia activa a la vez** en todo el mapa.

## 6. La forja y la unicidad de cada golem (Hash Determinista)

1. **Selección**: Entre 5 y 12 materiales del inventario.
2. **Serialización Canónica**: Cadena ordenada alfabéticamente (ej. `antena:2|bobina:1|cobre:3`).
3. **Hash FNV-1a (32-bit)**:
   ```typescript
   function calcularHashReceta(recetaCanonica: string): number {
     let hash = 0x811c9dc5
     for (let i = 0; i < recetaCanonica.length; i++) {
       hash ^= recetaCanonica.charCodeAt(i)
       hash = Math.imul(hash, 0x01000193)
     }
     return hash >>> 0
   }
   ```
4. **Derivación Determinista**:
   - **Stats Base**: Suma ponderada de materiales.
   - **Variación de Perfil**: Ajuste pseudoaleatorio acotado ($\pm 5\%$).
   - **Tinte y Escala**: Matiz emisivo PBR y tamaño ($0.9\text{m}$ a $1.3\text{m}$).
   - **Nombre Procedural**: Generado por tabla de prefijos/sufijos (ej. *«Vaporocrom Titánico»*).

![forja](golems_forja.png)

## 7. Las estadísticas y el combate en tiempo real

Cada golem posee 5 estadísticas fundamentales:
- **Ataque (ATK)**: Daño base por impacto ($20-38$).
- **Defensa (DEF)**: Reducción directa de daño recibido ($10-22$).
- **Vitalidad (HP)**: Puntos totales de salud ($100-160$).
- **Velocidad (SPD)**: Frecuencia de ataque ($T_{\text{cooldown}} = 2.2\text{s} / (1 + \text{SPD}\times 0.04)$) y traslación.
- **Afinidad Elemental (AFF)**: `STEAM`, `MECHANICAL`, `GALVANIC`, `LUMINOUS`, `AETHER`.

### El Pentágono de Afinidades Elementales
- `Vapor` vence a `Mecánico` ($\times 1.40$) | Desventaja ante `Éter` ($\times 0.75$)
- `Mecánico` vence a `Galvánico` ($\times 1.40$) | Desventaja ante `Vapor` ($\times 0.75$)
- `Galvánico` vence a `Luminoso` ($\times 1.40$) | Desventaja ante `Mecánico` ($\times 0.75$)
- `Luminoso` vence a `Éter` ($\times 1.40$) | Desventaja ante `Galvánico` ($\times 0.75$)
- `Éter` vence a `Vapor` ($\times 1.40$) | Desventaja ante `Luminoso` ($\times 0.75$)

Ecuación de daño: $\text{Daño} = \max\left(2, \text{round}\big((\text{ATK} - \text{DEF} \times 0.5) \times \text{Multiplicador}\big)\right)$.

![stats](golems_stats.png)

## 8. Límite de golems, seguimiento Multi-Trail y etiquetas P2P

- **Escuadrón Activo (Máximo 3)**: El jugador lleva hasta 3 golems simultáneos en formación.
- **Asignación Aleatoria por Sesión**: Al ingresar a la escena, el usuario recibe 3 golems aleatorios de afinidades distintas en memoria volátil.
- **Algoritmo Multi-Trail (FIFO LERP/SLERP)**: Procesa trayectorias a 60 FPS desfasando posiciones a $1.8\text{m}$, $3.6\text{m}$ y $5.4\text{m}$ en fila india detrás del avatar local y remotos.
- **Etiquetas Floats `Billboard` & ASCII Health**: Cada golem muestra en tiempo real una etiqueta superior con su nombre, afinidad, barra de salud ASCII `[████████░░]` y dirección de billetera del dueño.
- **Handshake P2P (`MessageBus`)**: Los clientes anuncian y solicitan la composición de escuadrones mediante `golem_squad_announce` y `golem_squad_request`.

![limite_y_misiones](golems_limite_y_misiones.png)

## 9. Misiones de recolección automatizadas

Los golems en reserva pueden enviarse a expediciones fuera de línea desde la interfaz:
- **Destino y Duración**: Desde 15 minutos hasta 12 horas.
- **Eficiencia**: Calculada en base a la velocidad y afinidad del golem.
- **Persistencia Asíncrona**: Computada en la API PHP/MySQL para continuar operando con el jugador desconectado.

## 10. Silas el Sobreviviente y los personajes no jugadores (NPCs)

- **Silas el Sobreviviente**: Mentor tutorial pacifista en el punto de aparición `(15.8m, 5.9m)`.
- **NPCs Hostiles y Guardianes de Zona**: Patrullas mecánicas con rutas de waypoints y radio de agresión que defienden las zonas PK (*Desierto Chatarra* y *Calderas*), custodiando los materiales épicos y legendarios con golems de alto nivel.

## 11. Progresión y niveles

- **Nivel del Jugador**: Desbloquea más ranuras de expedición, capacidad de bóveda en el escondite y mayor alcance del radar.
- **Nivel de Golems**: Incrementa ATK, DEF y HP proporcionalmente a su perfil de forja. El techo de nivel depende de la rareza de los componentes utilizados.

## 12. El torneo escalera y la Gran Arena Circular Steampunk (Colosal 72m - Cell Ring)

![torneo](golems_torneo.png)

### 12.1 Formatos Competitivos (1v1 y 2v2)
- **1v1**: 3 golems vs 3 golems en tiempo real por estadísticas.
- **2v2**: 2 jugadores por bando (12 golems simultáneos en arena).
- **Matchmaking Elo**: Clasificación registrada en MySQL mediante peticiones firmadas `signedFetch`.

### 12.2 Especificación de la Gran Arena Circular de Torneo Steampunk (Ø 72m)
Ubicada en el centro geométrico del mundo `(X: 200m, Z: 200m)`:
- **Plataforma Elevada Radial (72m / $R=36\text{m}$)**: Elevada $+0.6\text{m}$ sobre el terreno con 250+ losas reforzadas y bordillos de adoquín.
- **4 Columnas Monumentales de 12 Metros**: En las 4 esquinas diagonales (NW, NE, SE, SW), integradas por calderas base ampliadas (1.8x), fustes triples de engranajes verticales (`Gear Shaft.glb`), doble anillo giratorio contragiro, farolas dobles y chimeneas superiores humeantes (`Smoker.glb`).
- **Gran Sigilo Planetario Central**: Un engranaje central colosal (`Gear Big.glb` escala 4.8x / ~12m Ø) girando a $+0.20\text{ rad/s}$ sincronizado con 8 engranajes satélites en formación orbital y un altar relicario con espada (`Arthur Sword.glb`).
- **16 Balizas Perimetrales y Rampas Ceremoniales**: Pedestales de barril con números Steampunk (`00` a `08`) y 4 grandes rampas cardinales de acceso (Norte, Sur, Este, Oeste) con doble barandilla de seguridad (`Tree Fence.glb`).

## 13. Arquitectura del servidor y persistencia

Architecture híbrida:
- **Runtime**: Decentraland SDK7 (`@dcl/sdk/ecs`, `@dcl/sdk/react-ecs`, `@dcl/sdk/math`).
- **Multijugador P2P**: `MessageBus` para difusión efímera de ataques, derrotas y escuadrones.
- **Backend Persistente**: API REST PHP 8.x + Base de Datos MySQL con solicitudes autenticadas por firmas Web3 (`signedFetch`).

## 14. Arquitectura de código en el SDK y Motor Bilingüe i18n

### 14.1 Estructura Modular
El código está organizado en carpetas dedicadas dentro de `src/`: `components/`, `config/`, `objects/`, `systems/` e `i18n/`.

### 14.2 Motor de Internacionalización Bilingüe (`src/i18n`)
- **Diccionarios Canónicos Tipados**: `src/i18n/locales/es.ts` y `en.ts` bajo `TranslationSchema`.
- **Selector en HUD**: Botón táctil `🌐 ES | EN` en la esquina superior derecha del HUD React-ECS que alterna dinámicamente el idioma en tiempo real sin recargar la escena.
- **Suscripción Reactiva**: Actualiza instantáneamente modales de diálogo de Silas, textos de HUD, menús de forja y registros de combate.

## 15. Multijugador en vivo
Sincronización P2P distribuida con separación estricta entre datos efímeros de red (ataques, posiciones) y datos persistentes en base de datos MySQL (inventario, recetas, ranking).

## 16. Restricciones para el cliente móvil (Mobile-First)
- 🚫 Sin luces dinámicas (materiales horneados / unlit emisivos).
- 🚫 Sin raycasting de puntero complejo (reemplazado por radar de distancia euclidiana).
- 🚫 Sin 9-slice complejo ni análisis FFT de audio.
- 🚫 Sin dependencia de teclado físico / ratón (controles 100% táctiles con hitboxes amplias $\ge 1.2\text{m}$ respetando zonas seguras de pantalla).

## 17. Cierre y camino a seguir
El ecosistema especificado proporciona un marco de desarrollo probado y completamente integrado en Decentraland SDK7, optimizado para ofrecer una experiencia fluida a 60 FPS tanto en dispositivos móviles como en clientes de escritorio.
