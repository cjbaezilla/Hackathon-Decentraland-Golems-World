# 🤖 Catálogo Maestro y Registro de 50 NPCs: Golems World

> [!IMPORTANT]
> **ESPECIFICACIÓN DE PERSONAJES NO JUGADORES (SDK7 & MOBILE-FIRST)**:  
> Este documento contiene el catálogo oficial de **50 NPCs** listos para ser distribuidos por el mapa de 25x25 (400m × 400m / 160.000 m²) de **Golems World**. Cada NPC está definido con su arquetipo visual (`AvatarShape`), combinación de wearables nativos de Decentraland, tonos de piel, pelo y ojos, rol temático, trasfondo de páramo y frases características bilingües (ES / EN).

---

## 📑 Tabla de Contenidos

1. [Arquitectura y Sistema de Avatares](#1-arquitectura-y-sistema-de-avatares)
2. [Catálogo Maestro de los 50 NPCs](#2-catálogo-maestro-de-los-50-npcs)
3. [Resumen por Zona y Distrito](#3-resumen-por-zona-y-distrito)
4. [Instrucciones para la Generación e Integración](#4-instrucciones-para-la-generación-e-integración)

---

## 1. Arquitectura y Sistema de Avatares

Los NPCs de esta lista utilizan el componente nativo `AvatarShape` de Decentraland SDK7. Esto garantiza:
- **Rendimiento Óptimo en Móvil**: Sin carga de modelos GLB adicionales para los cuerpos humanos, aprovechando los assets preinstalados del cliente Godot Explorer.
- **Rótulos 3D Flotantes**: Cada NPC incorpora una etiqueta flotante elevada a $Y = +2.25\text{m}$ con `TextShape` y `Billboard` para mantener su visibilidad desde cualquier ángulo.
- **Soporte Bilingüe (i18n)**: Cada personaje cuenta con textos traducidos en `src/i18n` para responder dinámicamente al idioma seleccionado por el usuario (`🌐 ES | EN`).

---

## 2. Catálogo Maestro de los 50 NPCs

| ID | Nombre y Título | Distrito / Zona | Rol / Arquetipo | Género | Wearables Principales (`base-avatars`) | Personalidad y Trasfondo | Frase Características (ES) | Frase Características (EN) |
| :-: | :--- | :--- | :--- | :-: | :--- | :--- | :--- | :--- |
| `NPC-001` | **Vance el Forjador** | Distrito Forja | Maestro de Calderas | Masculino | `leather_jacket`, `brown_pants`, `boots`, `messy_hair` | Antiguo supervisor de fundición. Experto en aleaciones de bronce y vapor. | *«Si la chispa no prende en tres golpes, agrega carbón extra.»* | *«If the spark doesn't catch in three hits, add extra coal.»* |
| `NPC-002` | **Kaelen el Galvánico** | Subestación Eléctrica | Técnico Tesla | Masculino | `casual_hair_01`, `turtleneck`, `denim_pants`, `sneakers` | Obsesionado con el flujo galvánico y las descargas de alta tensión. | *«¡Cuidado donde pisas! Las bobinas acumulan carga estática residual.»* | *«Watch your step! The coils build up residual static charge.»* |
| `NPC-003` | **Nora la Recolectora** | Los Chatarrales | Rastreadora | Femenino | `short_hair`, `jacket_01`, `cargo_pants`, `boots` | Recorre las pilas de escombros buscando transistores y manómetros raros. | *«Un ojo entrenado ve oro donde otros solo ven latas oxidadas.»* | *«A trained eye sees gold where others only see rusted cans.»* |
| `NPC-004` | **Gideon el Guardián** | Reserva de Minería | Custodio de Bóveda | Masculino | `beard`, `trench_coat`, `brown_pants`, `shoes_01` | Protege los alijos de cristal de cuarzo y núcleos de maná del sector noreste. | *«Esta reserva está protegida. Ningún asaltante tocará los cristales.»* | *«This reserve is protected. No raider will touch the crystals.»* |
| `NPC-005` | **Sora la Cazadora** | Desierto Chatarra | Mercenaria de Éter | Femenino | `pony_tail`, `leather_jacket`, `tight_pants`, `high_boots` | Sobreviviente intrépida que explora la zona PK en busca de ojos de dragón. | *«En el desierto no hay reglas. Mantén tu arma lista y tu golem cerca.»* | *«In the desert there are no rules. Keep your weapon ready and your golem close.»* |
| `NPC-006` | **Tobias el Comerciante** | Distrito Forja | Mercader Ambulante | Masculino | `top_hat`, `vest`, `formal_pants`, `oxford_shoes` | Vende repuestos de latón y resortes rescatados del mercado sur. | *«¡Tengo los mejores engranajes de bronce de todo el distrito!»* | *«I've got the finest bronze gears in the entire district!»* |
| `NPC-007` | **Lyra la Ingeniera** | Fábrica Abandonada | Mecánica de Precisión | Femenino | `bob_hair`, `overall`, `boots`, `goggles_01` | Diseña esquemas de montaje para autómatas de alta velocidad. | *«El secreto de una buena articulación radica en la viscosidad del aceite.»* | *«The secret of a good joint lies in the viscosity of the oil.»* |
| `NPC-008` | **Barton el Chatarrero** | Los Chatarrales | Desguazador | Masculino | `bald_head`, `tshirt_01`, `torn_jeans`, `work_boots` | Especialista en desmontar tuberías de cobre y sartenes abandonadas. | *«Todo se reutiliza en el páramo. Nada se tira a la basura.»* | *«Everything is reused in the wasteland. Nothing goes to waste.»* |
| `NPC-009` | **Cora la Operadora** | Torre de Radio | Transmisora | Femenino | `pixie_cut`, `sweater`, `skirt_01`, `casual_shoes` | Monitorea las frecuencias de ondas luminosas y señales lejanas. | *«Las antenas captan susurros de otros mundos entre la estática.»* | *«The antennas pick up whispers of other worlds through the static.»* |
| `NPC-010` | **Darius el Gladiador** | Gran Arena | Campeón Veterano | Masculino | `buzz_cut`, `armored_vest`, `combat_pants`, `heavy_boots` | Leyenda de los combates 1v1 en el Cell Ring central. | *«Demuestra tu valor en la arena o regresa a calentar calderas.»* | *«Prove your worth in the arena or go back to warming boilers.»* |
| `NPC-011` | **Eliza la Alquimista** | Subestación Eléctrica | Química de Baterías | Femenino | `long_wavy_hair`, `lab_coat`, `slacks`, `flats` | Sintetiza electrolitos para las baterías alquímicas raras. | *«Una gota mal calculada y la reacción galvánica fundirá el crisol.»* | *«One miscalculated drop and the galvanic reaction will melt the crucible.»* |
| `NPC-012` | **Finn el Aprendiz** | Distrito Forja | Ayudante de Silas | Masculino | `messy_hair`, `tshirt_02`, `shorts`, `sneakers` | Asistente entusiasta que limpia escoria de cobre en la forja. | *«Silas me enseñó que la paciencia forja los mejores autómatas.»* | *«Silas taught me that patience forges the finest automatons.»* |
| `NPC-013` | **Greta la Fogonera** | Calderas Fundición | Operadora de Presión | Femenino | `braid_hair`, `heavy_apron`, `thick_pants`, `safety_boots` | Mantiene el flujo de vapor extremo en la zona PK del sureste. | *«Las válvulas están al límite. ¡El vapor quema si te acercas demasiado!»* | *«The valves are at their limit. Steam burns if you get too close!»* |
| `NPC-014` | **Harlan el Minero** | Reserva de Minería | Explotador de Vetas | Masculino | `beard_full`, `miner_helmet`, `overalls`, `heavy_boots` | Extrae sedimentos de titanio y cuarzo de las vetas profundas. | *«El terreno es duro, pero el mineral de éter paga cada picada.»* | *«The ground is hard, but the aether ore pays for every pickaxe strike.»* |
| `NPC-015` | **Iris la Vigía** | Torre de Radio | Centinela | Femenino | `straight_hair`, `jacket_02`, `camo_pants`, `tactical_boots` | Ocupa los puestos elevados alertando de tormentas galvánicas. | *«El horizonte este luce tranquilo... por ahora.»* | *«The eastern horizon looks clear... for now.»* |
| `NPC-016` | **Jarek el Mercenario** | Calderas Fundición | Escolta Privado | Masculino | `scar_face`, `tactical_vest`, `cargo_pants`, `combat_boots` | Ofrece protección a cambio de transistores y reactor de éter. | *«Si vas a entrar a las calderas, asegúrate de tener cobertura.»* | *«If you're entering the boilers, make sure you have coverage.»* |
| `NPC-017` | **Kira la Chatarrera** | Los Chatarrales | Clasificadora | Femenino | `curly_hair`, `hoodie`, `jeans`, `canvas_shoes` | Separa tuercas gigantes de clavos oxidados en los anillos viales. | *«Tengo tres cajas llenas de pernos si los necesitas para tu receta.»* | *«I've got three boxes full of bolts if you need them for your recipe.»* |
| `NPC-018` | **Leo el Informante** | Corredores Sur | Corredor de Noticias | Masculino | `cap`, `windbreaker`, `track_pants`, `running_shoes` | Corre entre puestos divulgando avistamientos de piezas legendarias. | *«¡Dicen que apareció un corazón primigenio en el desierto norte!»* | *«Word is a primordial heart spawned in the northern desert!»* |
| `NPC-019` | **Mireia la Reparadora** | Fábrica Abandonada | Mantenedora | Femenino | `short_bob`, `work_shirt`, `utility_pants`, `boots` | Ajusta pistones desgastados con llaves inglesas artesanales. | *«Un ajuste a tiempo evita que el autómata pierda presión en combate.»* | *«A timely adjustment prevents the automaton from losing pressure in combat.»* |
| `NPC-020` | **Nesta el Pionero** | Reserva de Minería | Geólogo | Masculino | `glasses`, `safari_jacket`, `khaki_pants`, `walking_shoes` | Estudia los patrones de regeneración de los núcleos de maná. | *«Los depósitos de éter laten a la misma frecuencia que la tierra.»* | *«The aether deposits pulse at the same frequency as the earth.»* |
| `NPC-021` | **Orla la Piromante** | Calderas Fundición | Técnica de Combustión | Femenino | `red_hair`, `leather_vest`, `leather_pants`, `boots` | Domina la mezcla de carbón y vapor de alta temperatura. | *«El fuego del crisol no perdona los errores de cálculo.»* | *«The fire of the crucible does not forgive miscalculations.»* |
| `NPC-022` | **Phaedra la Cronista** | Distrito Forja | Historiadora | Femenino | `bun_hair`, `dress_01`, `flats`, `glasses` | Documenta los eventos históricos posteriores a la Gran Sobrecarga. | *«Cada autómata forjado guarda un fragmento de nuestra historia.»* | *«Every forged automaton holds a piece of our history.»* |
| `NPC-023` | **Quentin el Electricista** | Subestación Eléctrica | Operador de Red | Masculino | `short_hair_02`, `work_coat`, `dark_jeans`, `work_boots` | Repara los tendidos de cables deshilachados entre torres. | *«No toque los aislantes de porcelana sin guantes de goma aislante.»* | *«Don't touch the porcelain insulators without insulated rubber gloves.»* |
| `NPC-024` | **Rhea la Gladiadora** | Gran Arena | Pretendiente al Título | Femenino | `athletic_cut`, `sports_top`, `leggings`, `athletic_shoes` | Entrena diariamente con muñecos de prueba para el próximo torneo. | *«La agilidad es más destructiva que la fuerza bruta.»* | *«Agility is more destructive than brute force.»* |
| `NPC-025` | **Silas Secundario (Sam)** | Distrito Forja | Hermano Chatarrero | Masculino | `beard`, `flannel_shirt`, `jeans`, `work_boots` | Ayuda a Silas a gestionar el inventario de piezas iniciales. | *«Si buscas a mi hermano Silas, está junto al campamento de bienvenida.»* | *«If you're looking for my brother Silas, he's by the welcome camp.»* |
| `NPC-026` | **Tess la Centinela** | Desierto Chatarra | Observadora | Femenino | `ponytail_02`, `camo_jacket`, `tactical_pants`, `combat_boots` | Reporta movimientos de saqueadores hostiles en la frontera PK. | *«No bajes la guardia: los cazadores acechan tras las pilas de escombros.»* | *«Don't drop your guard: hunters lurk behind the rubble piles.»* |
| `NPC-027` | **Urien el Fundidor** | Distrito Forja | Maestro Metalúrgico | Masculino | `bald_beard`, `black_apron`, `work_pants`, `heavy_boots` | Supervisa la temperatura de los hornos de latón y cobre. | *«El metal líquido debe fluir libremente sin burbujas de aire.»* | *«Molten metal must flow freely without air bubbles.»* |
| `NPC-028` | **Vespera la Mística** | Reserva de Minería | Sabia del Éter | Femenino | `silver_hair`, `robe`, `sandals`, `pendant` | Siente las fluctuaciones místicas en los yacimientos de cristal. | *«La energía del vacío resuena con los espíritus de los antiguos golems.»* | *«The energy of the void resonates with the spirits of ancient golems.»* |
| `NPC-029` | **Wade el Rastreador** | Los Chatarrales | Buscador de Piezas | Masculino | `fedora_hat`, `trench_coat_02`, `brown_pants`, `boots` | Especializado en localizar ollas de cocinar y recipientes metálicos. | *«Las mejores piezas de cobre están sepultadas bajo dos metros de grava.»* | *«The best copper parts are buried under two meters of gravel.»* |
| `NPC-030` | **Xander el Telegrafista** | Torre de Radio | Operador Cifrado | Masculino | `neat_hair`, `shirt_and_tie`, `trousers`, `dress_shoes` | Envía códigos Morse para coordinar los envíos de repuestos. | *«Punto, punto, raya... la estación del norte confirma recepción.»* | *«Dot, dot, dash... northern station confirms reception.»* |
| `NPC-031` | **Yara la Soldadora** | Fábrica Abandonada | Especialista en Arco | Femenino | `braided_bun`, `welding_mask_neck`, `overalls`, `boots` | Une placas de hierro con técnicas de soldadura de arco galvánico. | *«Una buena costura de soldadura aguanta la presión de diez atmósferas.»* | *«A solid weld seam holds ten atmospheres of pressure.»* |
| `NPC-032` | **Zane el Asaltante** | Desierto Chatarra | Saqueador del Páramo | Masculino | `mohawk_hair`, `spiked_jacket`, `leather_pants`, `heavy_boots` | Merodea las zonas peligrosas buscando forjadores despistados. | *«Lo que encuentras en el desierto pertenece al más fuerte.»* | *«Whatever you find in the desert belongs to the strongest.»* |
| `NPC-033` | **Amara la Botánica** | Los Chatarrales | Conservadora de Oasis | Femenino | `flower_hair`, `gardener_shirt`, `linen_pants`, `sandals` | Cultiva musgo bioluminoso sobre los cascos de autómatas caídos. | *«Hasta en el metal frío la vida encuentra la forma de florecer.»* | *«Even on cold metal, life finds a way to bloom.»* |
| `NPC-034` | **Bruno el Mecánico** | Distrito Forja | Ajustador de Bielas | Masculino | `cap_02`, `tshirt_black`, `jeans`, `sneakers` | Ofrece consejos sobre la alineación de engranajes desgastados. | *«Si escuchas un chirrido metálico, aplica grasa de engranajes inmediatamente.»* | *«If you hear a metallic squeak, apply gear grease immediately.»* |
| `NPC-035` | **Celeste la Astronomía** | Torre de Radio | Calibradora Óptica | Femenino | `short_wavy`, `cardigan`, `skirt_long`, `flats` | Utiliza lentes de televisores viejos para fabricar telescopios. | *«Las estrellas se ven más nítidas desde la cúspide de la torre.»* | *«The stars look sharper from the top of the tower.»* |
| `NPC-036` | **Dominic el Fogonero** | Calderas Fundición | Custodio del Crisol | Masculino | `shaved_head`, `sleeveless_shirt`, `cargo_pants`, `boots` | Alimenta los quemadores de alto rendimiento de las calderas. | *«El vapor de esta zona podría impulsar a diez titanes simultáneamente.»* | *«The steam in this area could power ten titans simultaneously.»* |
| `NPC-037` | **Evander el Vendedor** | Corredores Sur | Mercader de Tubos | Masculino | `beret_hat`, `vest_leather`, `trousers`, `shoes` | Comercializa tubos de cobre y serpentines de refrigeración. | *«¡Tengo serpentines a prueba de fugas a precios imbatibles!»* | *«I have leak-proof cooling coils at unbeatable prices!»* |
| `NPC-038` | **Freya la Reclutadora** | Gran Arena | Organizadora de Duetos | Femenino | `sleek_hair`, `formal_suit`, `heels`, `clipboard_prop` | Inscribe a los jugadores en las modalidades 1v1 y 2v2 de la escalera. | *«¿Tienes listo tu escuadrón? El próximo combate está por comenzar.»* | *«Is your squad ready? The next match is about to begin.»* |
| `NPC-039` | **Garrick el Minero** | Reserva de Minería | Barrenador | Masculino | `helmet_lamp`, `heavy_coat`, `miner_pants`, `steel_boots` | Opera taladros neumáticos alimentados por vapor a presión. | *«La veta principal de bronce se extiende hacia el noreste.»* | *«The main bronze vein extends toward the northeast.»* |
| `NPC-040` | **Hesper la Electrónica** | Subestación Eléctrica | Reparadora de Diodos | Femenino | `glasses_02`, `polo_shirt`, `slacks`, `casual_shoes` | Reemplaza diodos LED y transistores quemados en las placas. | *«Los diodos regulan el pulso luminoso del circuito central.»* | *«The diodes regulate the luminous pulse of the main circuit.»* |
| `NPC-041` | **Ignatius el Piromante** | Calderas Fundición | Alquimista de Fuego | Masculino | `flame_hair`, `dark_coat`, `leather_pants`, `boots` | Estudia la combustión limpia de los residuos de carbón. | *«El carbón refinado genera el doble de calorías con la mitad de humo.»* | *«Refined coal yields twice the calories with half the smoke.»* |
| `NPC-042` | **Juno la Cazadora** | Desierto Chatarra | Rastreadora de Singularidades| Femenino | `braids_long`, `leather_armor`, `pants_dark`, `boots` | Sigue el rastro de la singularidad etérica en los bordes del desierto. | *«La singularidad no se busca, se presiente en el pulso del terreno.»* | *«The singularity is not sought; it is felt in the terrain's pulse.»* |
| `NPC-043` | **Kael el Chatarrero** | Los Chatarrales | Vendedor de Cadena | Masculino | `messy_beard`, `tshirt_gray`, `torn_shorts`, `sandals` | Colecciona cadenas de hierro y tapas de alcantarilla usadas. | *«Una buena cadena de hierro frena a cualquier autómata desbocado.»* | *«A sturdy iron chain stops any runaway automaton.»* |
| `NPC-044` | **Lora la Guía** | Distrito Forja | Orientadora Comercial | Femenino | `friendly_smile_hair`, `dress_casual`, `flats`, `bag` | Dirige a los recién llegados hacia los 10 quioscos del mercado. | *«Si buscas transistores o bulbos, visita el Paseo Comercial Oeste.»* | *«If you're looking for transistors or bulbs, visit West Market Walk.»* |
| `NPC-045` | **Milo el Ensamblador** | Fábrica Abandonada | Ajustador de Bastidores | Masculino | `bandana`, `work_vest`, `jeans_dark`, `work_boots` | Ensambla bastidores de acorazados mecánicos pesados. | *«Los remaches deben colocarse caliente para asegurar el sellado.»* | *«Rivets must be placed hot to ensure a tight seal.»* |
| `NPC-046` | **Nix la Cazadora** | Desierto Chatarra | Tiradora del Páramo | Femenino | `short_cropped`, `sniper_coat`, `tactical_pants`, `combat_boots` | Vigila las crestas rocosas del extremo noroccidental. | *«Veo todo lo que se mueve entre la arena y la chatarra.»* | *«I see everything that moves between the sand and the scrap.»* |
| `NPC-047` | **Odin el Juez** | Gran Arena | Árbitro de Torneo | Masculino | `white_hair_beard`, `judge_robe`, `formal_shoes`, `gavel_prop` | Certifica la legitimidad de las victorias en la escalera Elo. | *«En esta arena triunfa la estrategia, no la trampa.»* | *«In this arena strategy triumphs, not trickery.»* |
| `NPC-048` | **Piper la Mensajera** | Corredores Sur | Estafeta Vacio | Femenino | `short_hair_red`, `messenger_bag`, `shorts_sport`, `sneakers` | Lleva recados entre la Subestación y el Distrito de la Forja. | *«Tengo cinco entregas pendientes antes de que caiga la noche.»* | *«I have five deliveries pending before nightfall.»* |
| `NPC-049` | **Quinn el Espectador** | Gran Arena | Aficionado Afanoso | Masculino | `curly_brown_hair`, `jacket_sport`, `jeans`, `casual_shoes` | Anima fervientemente las batallas entre golems de éter y vapor. | *«¡Ese contraataque galvánico fue sencillamente espectacular!»* | *«That galvanic counterattack was simply spectacular!»* |
| `NPC-050` | **Ronan el Comerciante** | Reserva de Minería | Mercader de Cristales | Masculino | `glasses_round`, `merchant_coat`, `trousers_dark`, `leather_shoes` | Compra y vende cristales de cuarzo resonante de la reserva. | *«Compro cristales puros al mejor precio del mercado norte.»* | *«I buy pure crystals at the best price in the northern market.»* |

---

## 3. Resumen por Zona y Distrito

Para asegurar una cobertura equilibrada cuando se distribuyan por la escena, los 50 NPCs están asignados conceptualmente a las siguientes áreas:

```text
┌──────────────────────────────────────┬──────────────────────────────────────┐
│ DESIERTO DE CHATARRA (Noroeste - PK) │ RESERVA DE MINERÍA (Noreste - Segura)│
│ 5 NPCs: NPC-005, NPC-026, NPC-032,   │ 6 NPCs: NPC-004, NPC-014, NPC-020,   │
│         NPC-042, NPC-046             │         NPC-028, NPC-039, NPC-050   │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ SUBESTACIÓN ELÉCTRICA (Norte)        │ TORRE DE RADIO (Este)                │
│ 5 NPCs: NPC-002, NPC-011, NPC-023,   │ 5 NPCs: NPC-009, NPC-015, NPC-030,   │
│         NPC-040                      │         NPC-035                      │
├──────────────────────────────────────┴──────────────────────────────────────┤
│ GRAN ARENA STEAMPUNK (Centro 200m, 200m)                                   │
│ 4 NPCs: NPC-010, NPC-024, NPC-038, NPC-047, NPC-049                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ FÁBRICA ABANDONADA / LOS CHATARRALES (Anillos Intermedios)                  │
│ 10 NPCs: NPC-003, NPC-007, NPC-008, NPC-017, NPC-019,                       │
│          NPC-029, NPC-031, NPC-033, NPC-043, NPC-045                        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ DISTRITO DE LA FORJA (Suroeste)      │ CALDERAS DE FUNDICIÓN (Sureste - PK) │
│ 9 NPCs: NPC-001, NPC-006, NPC-012,   │ 5 NPCs: NPC-013, NPC-016, NPC-021,   │
│         NPC-022, NPC-025, NPC-027,   │         NPC-036, NPC-041             │
│         NPC-034, NPC-044             │                                      │
├──────────────────────────────────────┴──────────────────────────────────────┤
│ CORREDORES Y VÍAS SUR (Conexiones)                                         │
│ 3 NPCs: NPC-018, NPC-037, NPC-048                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Instrucciones para la Generación e Integración

1. **Catálogo Ejecutable**: Las 50 entradas están replicadas en la constante TypeScript `NPC_CATALOG` en [`src/data/npcCatalog.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/data/npcCatalog.ts).
2. **Generación a Demanda**: Para instanciar cualquier avatar en el futuro, invoque la función `createNpcAvatar(npcData, spawnPosition, rotation)` definida en [`src/objects/npcGenerator.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcGenerator.ts).
3. **Persistencia e i18n**: Los nombres y frases características se integran con `src/i18n`, asegurando que la UI y los globos de diálogo se muestren en el idioma activo del usuario.
