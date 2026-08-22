# Guía Maestra: Batallas de Campo, Matrices de Niveles/XP, Moneda (Engranajes de Latón) y Algoritmo de Forja

> [!IMPORTANT]
> **ESPECIFICACIÓN TÉCNICA OFICIAL DE FÓRMULAS, RATIOS Y MATRICES**:
> Esta guía constituye el documento normativo canónico para las **Batallas de Campo contra Golems Salvajes del Mapa**, la **Matriz de Progresión de Experiencia del Jugador (Niveles 1 a 50)**, la **Matriz de Escalado por Distancia para Golems Salvajes**, el **Sistema Monetario de Engranajes de Latón (Brass Gears)** y el **Algoritmo Determinista de Forja en Nivel 1 con Varianza Aleatoria (Roll 90%–115%)**.

---

## 📜 1. Arquitectura de Batallas de Campo (Field Battles)

### 1.1 Flujo de Interacción y Reglas de Proximidad
1. **Detección Táctil por Puntero (`pointerEventsSystem`)**: Cada Golem salvaje que patrulla el mapa posee un componente de interacción primaria en el botón de puntero (`InputAction.IA_POINTER`).
2. **Validación de Proximidad (< 6.0 metros)**:
   - Al hacer clic o tocar sobre un Golem salvaje, el sistema evalúa la distancia euclidiana entre el avatar del jugador y la entidad del Golem:
     $$d = \sqrt{(X_{jugador} - X_{golem})^2 + (Z_{jugador} - Z_{golem})^2}$$
   - Si $d > 6.0\text{m}$, se cancela la interacción y se emite la advertencia: `"⚠️ Estás demasiado lejos para atacar (Distancia máxima: 6.0m)"`.
   - Si $d \le 6.0\text{m}$, se abre la ventana modal flotante React-ECS (`FieldBattleModal`).
3. **Modal de Confirmación React-ECS (`FieldBattleModal`)**:
   - Muestra el nombre, nivel, zona, afinidad elemental, rareza, estadísticas base ($HP, Atk, Def$) y recompensas proyectadas ($XP + \text{Engranajes de Latón}$).
   - Ofrece dos acciones táctiles: `[⚔️ ¡ATACAR!]` para iniciar el combate en tiempo real o `[❌ Cancelar]` para retirarse.
4. **Bucle de Combate en Campo (`fieldCombatSystem`)**:
   - Transcurre en tiempo real en la posición exacta del mapa sin pantallas de carga.
   - Enfrenta al **Golem acompañante activo** del jugador contra el **Golem salvaje**.
   - **Tasa de Ataque**: Cada 1.6 segundos los golems intercambian ataques.
   - **Daño y Pentágono de Afinidades**:
     $$\text{DañoFinal} = \text{Math.max}\left(2, \text{Math.round}\left((\text{Atacante}_{Atk} - \text{Defensor}_{Def} \times 0.4) \times \text{MultAfinidad}\right)\right)$$
     - Ventaja Elemental: $\text{MultAfinidad} = 1.40\times$ (Golpe Crítico)
     - Desventaja Elemental: $\text{MultAfinidad} = 0.75\times$
     - Neutral: $\text{MultAfinidad} = 1.00\times$
5. **Condición de Escape**: Si el jugador o su golem se alejan a más de $16.0\text{m}$ durante el combate, la batalla se cancela automáticamente por retirada.

---

## 📈 2. Matriz de Niveles y Experiencia del Jugador (Player Level Matrix)

El nivel del jugador refleja su maestría como Chatarrero e Ingeniero.

### 2.1 Fórmula Matemática de Experiencia Requerida
Para avanzar del Nivel $L$ al Nivel $L+1$:

$$\text{XP}_{req}(L) = \lfloor 100 \times L^{1.45} \rfloor$$

### 2.2 Multiplicador de Experiencia Global
Cada nivel otorga un $+1\%$ acumulativo a todas las fuentes de experiencia:

$$\text{MultExpJugador}(L) = 1.0 + (L - 1) \times 0.01$$

### 2.3 Tabla Explicativa de Niveles (Clave 1 a 50)

| Nivel del Jugador | XP Requerida (Siguiente Nivel) | XP Acumulada Total | Multiplicador XP | Desbloqueos y Beneficios |
| :--- | :--- | :--- | :--- | :--- |
| **Nivel 1** | 100 XP | 0 XP | $1.00\times$ | Inicio de Aventura (Radar Básico) |
| **Nivel 2** | 273 XP | 100 XP | $1.01\times$ | Desbloqueo de Recetas Poco Comunes |
| **Nivel 3** | 492 XP | 373 XP | $1.02\times$ | Acceso a Forja Avanzada |
| **Nivel 5** | 1,038 XP | 1,607 XP | $1.04\times$ | Ranura de Reserva de Golems #1 |
| **Nivel 10** | 2,818 XP | 9,890 XP | $1.09\times$ | Título "Ingeniero Chatarrero" |
| **Nivel 15** | 5,091 XP | 29,200 XP | $1.14\times$ | Bonificador a la Forja (+3% Stats) |
| **Nivel 20** | 7,761 XP | 61,040 XP | $1.19\times$ | Desbloqueo de Recetas Épicas |
| **Nivel 30** | 14,037 XP | 168,500 XP | $1.29\times$ | Ranura de Reserva de Golems #2 |
| **Nivel 40** | 21,435 XP | 344,000 XP | $1.39\times$ | Desbloqueo de Titanes & Legendarios |
| **Nivel 50 (Máx)**| $\infty$ | 610,000 XP | $1.49\times$ | Forja Maestra Titanio (+10% Stats) |

---

## 🗺️ 3. Matriz de Golems Salvajes del Mapa (Map Roaming Golems)

Los 150 Golems salvajes que patrullan el mapa de $400\text{m} \times 400\text{m}$ escalan de forma continua basándose en su **distancia euclidiana $D$** al Distrito de la Forja $(X: 20\text{m}, Z: 20\text{m})$.

### 3.1 Fórmulas Matemáticas de Escalado por Distancia

1. **Distancia Euclidiana**:
   $$D = \sqrt{(X - 20)^2 + (Z - 20)^2}$$
2. **Nivel del Golem Salvaje**:
   - **Ciudad Inicial (Distrito de la Forja, $X \le 140\text{m}, Z \le 140\text{m}$)**: Estrictamente $L = 1$.
   - **Otras Zonas del Mapa**:
     $$L(D, Tier) = \text{clamp}\left(1 + \lfloor \frac{D}{11.5} \rfloor + (Tier - 1) \times 2, \, 1, \, 38\right)$$
3. **Vida Máxima ($HP$)**:
   $$HP(L, Tier) = \lfloor 110 \times 1.11^{L - 1} + Tier \times 15 \rfloor$$
4. **Ataque ($Atk$)**:
   $$Atk(L, Tier) = \lfloor 15 \times 1.09^{L - 1} + Tier \times 3 \rfloor$$
5. **Defensa ($Def$)**:
   $$Def(L, Tier) = \lfloor 9 \times 1.08^{L - 1} + Tier \times 2 \rfloor$$
6. **Velocidad ($Spd$)**:
   $$Spd(L) = \text{clamp}\left(\lfloor 10 + L \times 0.55 \rfloor, \, 10, \, 32\right)$$
7. **Recompensa de Experiencia ($XP$)**:
   $$XP(L) = \lfloor 35 \times 1.12^{L - 1} \rfloor$$

---

## 🪙 4. Matriz de Botín: Moneda "Engranajes de Latón" (Brass Gears)

Al derrotar un Golem salvaje en el mapa, el jugador recibe de forma garantizada una cantidad de la moneda oficial del juego **Engranajes de Latón** ($\text{code: } brass\_gears$).

### 4.1 Fórmulas del Rango de Drop de Moneda
- **Engranajes Mínimos**:
  $$\text{MinGears}(L) = \lfloor 5 \times 1.125^{L - 1} \rfloor$$
- **Engranajes Máximos**:
  $$\text{MaxGears}(L) = \lfloor 12 \times 1.135^{L - 1} \rfloor$$

### 4.2 Tabla Resumen de Escalado por Zonas del Mapa

| Anillo / Zona | Distancia $D$ | Rango Nivel | HP Base | Atk Base | Def Base | XP Otorgada | Drop Engranajes de Latón 🪙 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Zona 1: Forja / Chatarrales** | $0\text{m} - 120\text{m}$ | **Lvl 1 – 5** | $125 - 195$ | $16 - 26$ | $10 - 18$ | **35 – 75 XP** | **5 – 15 🪙** (100% prob) |
| **Zona 2: Fábrica / Periferia** | $120\text{m} - 220\text{m}$ | **Lvl 6 – 12** | $220 - 370$ | $28 - 50$ | $20 - 36$ | **85 – 180 XP** | **20 – 45 🪙** (100% prob) |
| **Zona 3: Subestación / Radio** | $220\text{m} - 320\text{m}$ | **Lvl 13 – 22** | $420 - 720$ | $54 - 90$ | $38 - 65$ | **200 – 480 XP** | **50 – 120 🪙** (100% prob) |
| **Zona 4: Desierto / Fundición** | $320\text{m} - 400\text{m}+$ | **Lvl 23 – 38** | $800 - 1550+$| $96 - 165+$| $70 - 118+$| **520 – 1300 XP** | **150 – 350 🪙** (+10% bono Élite +50 🪙) |

---

## 🛠️ 5. Algoritmo Determinista de Forja en Nivel 1 (Player Golems)

Todos los Golems forjados por los jugadores inician estrictamente en **Nivel 1**. Sus atributos iniciales se determinan por el algoritmo de 4 etapas implementado en [`levelMatrix.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/data/levelMatrix.ts):

### 5.1 Fórmulas del Algoritmo de Forja
1. **Estadísticas Base por Afinidad**:
   - Vapor: $HP=110, Atk=16, Def=10, Spd=9$
   - Galvánico: $HP=85, Atk=20, Def=7, Spd=16$
   - Mecánico: $HP=120, Atk=14, Def=14, Spd=8$
   - Luminoso: $HP=90, Atk=18, Def=8, Spd=15$
   - Éter: $HP=95, Atk=21, Def=7, Spd=11$
2. **Multiplicador por Complejidad de Receta ($Mult_{Comp}$)**:
   - 5 ítems: $1.00\times$
   - 6–7 ítems: $1.20\times$
   - 8–9 ítems: $1.40\times$
   - 10–11 ítems: $1.65\times$
   - 12 ítems (Titan Tier): $1.90\times$
3. **Varianza Aleatoria Individual ($Roll \in [0.90, 1.15]$)**:
   - Se genera una semilla aleatoria independiente por cada stat principal:
     $$Roll_{HP} = 0.90 + \text{random}() \times 0.25$$
     $$Roll_{Atk} = 0.90 + \text{random}() \times 0.25$$
     $$Roll_{Def} = 0.90 + \text{random}() \times 0.25$$
4. **Cálculo Final**:
   $$HP_{Final} = \text{Math.round}\left((HP_{Base} + \sum HP_{Mat}) \times Mult_{Comp} \times Roll_{HP}\right)$$
   $$Atk_{Final} = \text{Math.round}\left((Atk_{Base} + \sum Atk_{Mat}) \times Mult_{Comp} \times Roll_{Atk}\right)$$
   $$Def_{Final} = \text{Math.round}\left((Def_{Base} + \sum Def_{Mat}) \times Mult_{Comp} \times Roll_{Def}\right)$$

### 5.2 Tabla Exhaustiva de Aporte de los 46 Materiales de Chatarra

| Material | Rareza | Aporte HP | Aporte Atk | Aporte Def | Aporte Spd | Afinidad |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `alambre_cobre` | Común | +4 | +1 | 0 | +3 | — |
| `tornillos_pernos` | Común | +5 | 0 | +3 | 0 | — |
| `engranajes_desgastados`| Común | +5 | +1 | +2 | +1 | — |
| `tubos_cobre` | Común | +12 | 0 | +1 | 0 | — |
| `sartenes` | Común | +8 | 0 | +4 | 0 | — |
| `ollas_cocinar` | Común | +10 | 0 | +3 | 0 | — |
| `placas_laton` | Común | +8 | 0 | +4 | 0 | — |
| `clavos_oxidados` | Común | +4 | +2 | +1 | 0 | — |
| `latas_conserva` | Común | +9 | 0 | +2 | 0 | — |
| `cadenas_hierro` | Común | +10 | +1 | +3 | 0 | — |
| `tuercas_gigantes` | Común | +8 | 0 | +3 | 0 | — |
| `tapas_alcantarilla` | Común | +15 | 0 | +5 | -1 | — |
| `cables_deshilachados` | Común | +5 | +1 | 0 | +3 | — |
| `residuos_carbon` | Común | +8 | +2 | +1 | 0 | Vapor |
| `transistores` | Poco común| +8 | +4 | +1 | +2 | — |
| `bombillas_filamento` | Poco común| +14 | +2 | +1 | +2 | Luminoso |
| `resortes_reloj` | Poco común| +8 | +2 | +1 | +5 | — |
| `manometros` | Poco común| +16 | +3 | +2 | 0 | — |
| `valvulas_vapor` | Poco común| +14 | +4 | +2 | +1 | Vapor |
| `lentes_tv_viejo` | Poco común| +8 | +2 | +1 | +4 | — |
| `fusibles_fundidos` | Poco común| +10 | +4 | +1 | +2 | Galvánico |
| `relojes_bolsillo` | Poco común| +8 | +2 | +2 | +4 | — |
| `brujulas_magneticas` | Poco común| +10 | +3 | +2 | +4 | Mecánico |
| `tubos_vacio` | Poco común| +12 | +5 | +1 | +2 | Luminoso |
| `palancas_interruptor` | Poco común| +10 | +3 | +3 | +1 | — |
| `motor_vapor` | Raro | +25 | +8 | +4 | +2 | Vapor |
| `bobinas_tesla` | Raro | +18 | +10 | +2 | +5 | Galvánico |
| `antenas_radio` | Raro | +15 | +6 | +2 | +8 | Luminoso |
| `diodos_led` | Raro | +16 | +7 | +3 | +6 | Luminoso |
| `baterias_alquimicas` | Raro | +35 | +6 | +5 | +2 | Galvánico |
| `engranajes_bronce` | Raro | +25 | +6 | +8 | +2 | Mecánico |
| `dinamo_galvanica` | Raro | +20 | +9 | +3 | +4 | Galvánico |
| `cristal_fuerza` | Raro | +22 | +8 | +4 | +7 | Luminoso |
| `giroscopio_precision`| Raro | +20 | +6 | +7 | +6 | Mecánico |
| `corazon_caldera` | Épico | +45 | +14 | +8 | +3 | Vapor |
| `reactor_eter` | Épico | +40 | +16 | +6 | +5 | Éter |
| `nucleo_mana` | Épico | +50 | +15 | +8 | +4 | Éter |
| `cerebro_automata` | Épico | +35 | +12 | +10 | +8 | Mecánico |
| `matriz_energectica` | Épico | +40 | +15 | +7 | +6 | Galvánico |
| `espejo_espectral` | Épico | +35 | +13 | +8 | +9 | Luminoso |
| `orbe_cronos` | Épico | +38 | +14 | +9 | +10 | Éter |
| `cristal_primordial` | Épico | +42 | +16 | +9 | +6 | Éter |
| `lente_hiperboreal` | Épico | +35 | +14 | +7 | +11 | Luminoso |
| `transformador_singularidad`| Épico | +45 | +18 | +10 | +5 | Galvánico |
| `ojo_dragon` | Legendario| +60 | +22 | +12 | +8 | Éter |
| `corazon_primigenio` | Legendario| +75 | +25 | +15 | +6 | Éter |

---

## 🗂️ 6. Referencia de Archivos e Integración en Código

- **Lógica de Matrices y Fórmulas**: [`src/data/levelMatrix.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/data/levelMatrix.ts)
- **Catálogo y Spawn con Matriz**: [`src/data/mapGolemsCatalog.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/data/mapGolemsCatalog.ts)
- **Generador e Interacción Tactil**: [`src/objects/mapGolemsGenerator.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/mapGolemsGenerator.ts)
- **Sistema ECS de Combate en Campo**: [`src/systems/fieldCombatSystem.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/systems/fieldCombatSystem.ts)
- **Modales y HUD React-ECS**: [`src/ui/fieldBattleComponent.tsx`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/ui/fieldBattleComponent.tsx)
- **Estado Global y Saldo Monetario**: [`src/state.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/state.ts)
