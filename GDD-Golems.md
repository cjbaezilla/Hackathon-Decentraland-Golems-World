# Golems: Documento de Diseño y Especificación Técnica

## 1. De qué trata el juego

Golems es una experiencia multijugador para Decentraland donde cada visitante entra a un mundo de chatarra, máquinas de vapor y magia residual con una misión clara: recorrer un mapa enorme, usar un radar de calor para encontrar piezas ocultas y ensamblar criaturas mecánicas únicas. La fantasía y el steampunk se cruzan en cada decisión de diseño, porque aquí no se mina mineral, se rebuscan transistores, ollas, antenas y televisores viejos entre los escombros.

El corazón del juego es el golem. Cada golem nace de una receta concreta y, gracias a un sistema de hash determinista, ninguna combinación produce exactamente el mismo resultado dos veces por accidente, aunque sí se puede reproducir a voluntad si memorizas la receta. Un jugador puede forjar y llevar consigo hasta tres golems que lo siguen por el mundo. Los que no viajan contigo no se quedan de brazos cruzados: los envías a misiones de recolección automatizadas que siguen trabajando mientras tú haces otra cosa.

Alrededor de esa idea central orbitan el combate en tiempo real basado en estadísticas, los personajes no jugadores que patrullan la escena con sus propios golems hostiles, la progresión por niveles y un torneo competitivo estilo escalera que se juega tanto en formato uno contra uno como en formato dos contra dos.

La intención es que una persona recién llegada entienda qué hacer en los primeros dos minutos, y que quien lleva semanas jugando siga encontrando razones para volver, ya sea por una pieza legendaria que no aparece, por un golem que quiere forjar con una receta secreta o por un rival que le está ganando en la tabla.

## 2. El bucle principal de juego

El recorrido típico de una sesión se puede resumir en un flujo circular que se retroalimenta. Primero el jugador aparece en el Distrito de la Forja, que funciona como plaza central y zona segura. Ahí recibe el radar de calor y una breve explicación de cómo funciona. En segundo lugar sale a explorar, y el radar lo guía hacia piezas enterradas, escondidas entre los restos de maquinaria. Tercero, cuando tiene suficientes materiales, vuelve a la forja y los combina para crear un golem. Cuarto, ese golem lo acompaña a combatir contra los NPC hostiles o a enfrentarse a otros jugadores. Quinto, los golems que no lo siguen se envían a misiones de recolección que generan más materiales. Ese último paso cierra el círculo y devuelve al jugador al primer punto con más recursos de los que tenía.

Lo importante de este bucle es que no tiene un final obligatorio ni una meta única. Cada jugador decide si se especializa en coleccionar piezas raras, en forjar golems con combinaciones poco comunes, en subir de nivel combatiendo o en trepar en la escalera competitiva. Las cuatro actividades se alimentan entre sí, así que una persona que solo quiere recolectar igualmente termina con materiales que puede vender o usar, y alguien que solo quiere pelear necesita recolectar para forjar mejores golems.

## 3. El mundo y el mapa

La experiencia se despliega en un Decentraland World de veinticinco por veinticinco parcelas, lo que equivale a un terreno de cuatrocientos por cuatrocientos metros. Son ciento sesenta mil metros cuadrados de superficie útil, y el terreno usa la configuración de paisaje natural propia de los Worlds, con colinas suaves y desniveles que dan variedad sin complicar la navegación en móvil.

Dentro de ese espacio se distribuyen varias zonas temáticas que ordenan la rareza de los materiales. El Distrito de la Forja ocupa el centro del mapa y es el punto de aparición, además del lugar donde se forjan los golems y se consulta la tabla de clasificación. Al oeste quedan los chatarrales, planos y despejados, donde abundan los materiales comunes. La fábrica abandonada al noroeste concentra piezas poco comunes como transistores y manómetros. La subestación eléctrica al norte guarda bobinas de Tesla y baterías alquímicas, con un nivel de rareza más alto. La torre de radio al noreste es el hogar de las antenas y los diodos LED. Al sureste, las calderas y la fundición esconden piezas épicas como el corazón de caldera y el reactor de éter. Las ruinas arcanas del sur mezclan lo mecánico con lo mágico, y ahí aparecen el núcleo de maná condensado y el cerebro de autómata. Por último, el desierto de chatarra en el extremo suroeste es la zona de mayor riesgo y mayor recompensa, con apariciones legendarias extremadamente escasas.

La separación por zonas cumple dos funciones. La primera es guiar el flujo de jugadores para que no todos se amontonen en el mismo punto. La segunda es crear una curva de dificultad natural: un jugador nuevo que se aventure al desierto de chatarra no morirá por ello, pero probablemente tarde más en encontrar algo útil que si se queda en los chatarrales.

## 4. El radar de calor y la recolección

Los materiales no están visibles a simple vista. Están enterrados o camuflados, y solo se revelan cuando el jugador se acerca lo suficiente usando el radar de calor que aparece en la interfaz. Esta decisión tiene una razón práctica directa con la plataforma: en el cliente móvil no se puede depender del raycasting avanzado, así que en lugar de apuntar con la cámara, el jugador camina y el radar hace el trabajo de interpretar la cercanía.

El radar se dibuja como un elemento de interfaz con React ECS, y muestra una señal que se intensifica en brillo, color y pulso a medida que la distancia al material más cercano se reduce. Lejos de cualquier pieza, el radar está apagado o en tonos fríos y apenas se mueve. A distancias medias empieza a latir con un ritmo perceptible. Cuando el jugador está a pocos metros, el radar se enciende en tonos cálidos y el pulso es rápido, hasta que la pieza emerge del suelo o del escondite y queda lista para recogerse con un toque.

El radar funciona por distancia euclidiana entre la posición del avatar y la lista de materiales activos en ese momento. No necesita rayos, ni apuntar, ni precisión fina, lo que lo hace cómodo de usar con una sola mano en el teléfono. La recolección se resuelve con un toque sobre la pieza una vez revelada, usando una hitbox amplia que cumple con el mínimo recomendado para pantallas táctiles.

Cada material tiene una vida útil desde que aparece hasta que desaparece si nadie lo recoge, y un tiempo de reaparición distinto según su rareza. Los materiales raros y épicos no aparecen todos al mismo tiempo, sino que respetan un límite de instancias simultáneas por zona, lo que mantiene la sensación de búsqueda sin saturar el mapa ni el rendimiento.

## 5. Los materiales

El catálogo completo tiene veinticuatro tipos de material, todos pensados como piezas de chatarra, maquinaria o utensilios que uno podría encontrar en un taller abandonado. No hay minerales en el sentido clásico, porque la identidad del juego está en reutilizar cosas cotidianas que, combinadas con magia residual, se convierten en algo extraordinario.

Cada material tiene una rareza, un peso de aparición que define qué tan probable es que surja al momento de generar un recurso, un tiempo de reaparición, una zona donde vive y un aporte a las estadísticas del golem que lo usa. Las estadísticas del golem son cinco: ataque, defensa, vitalidad, velocidad y afinidad. La afinidad es la naturaleza elemental de la pieza, y define ventajas y desventajas en combate.

| Material | Rareza | Peso | Reaparición | Zona | Aporte principal |
|---|---|---|---|---|---|
| Alambre de cobre | Común | 9% | 1 a 3 minutos | Chatarrales | Velocidad |
| Tornillos y pernos | Común | 9% | 1 a 3 minutos | Chatarrales | Defensa |
| Engranajes desgastados | Común | 8% | 1 a 3 minutos | Chatarrales | Velocidad |
| Tubos de cobre | Común | 8% | 1 a 3 minutos | Chatarrales | Vitalidad |
| Sartenes | Común | 7% | 1 a 3 minutos | Chatarrales | Defensa |
| Ollas de cocinar | Común | 7% | 1 a 3 minutos | Chatarrales | Defensa |
| Placas de latón | Común | 6% | 1 a 3 minutos | Chatarrales | Defensa |
| Transistores | Poco común | 6% | 4 a 7 minutos | Fábrica abandonada | Ataque |
| Bombillas de filamento | Poco común | 6% | 4 a 7 minutos | Fábrica abandonada | Vitalidad |
| Resortes de reloj | Poco común | 5% | 4 a 7 minutos | Fábrica abandonada | Velocidad |
| Manómetros | Poco común | 5% | 4 a 7 minutos | Fábrica abandonada | Vitalidad |
| Válvulas de vapor | Poco común | 5% | 4 a 7 minutos | Fábrica abandonada | Afinidad de vapor |
| Lentes de televisor viejo | Poco común | 4% | 4 a 7 minutos | Fábrica abandonada | Velocidad |
| Motor de vapor | Raro | 4% | 10 a 15 minutos | Subestación | Ataque |
| Bobinas de Tesla | Raro | 3% | 10 a 15 minutos | Subestación | Ataque y afinidad de rayo |
| Antenas de radio | Raro | 3% | 10 a 15 minutos | Torre de radio | Velocidad |
| Diodos LED | Raro | 3% | 10 a 15 minutos | Torre de radio | Afinidad de luz |
| Baterías alquímicas | Raro | 3% | 10 a 15 minutos | Subestación | Vitalidad |
| Engranajes de bronce perfectos | Raro | 2% | 10 a 15 minutos | Fundición | Defensa |
| Núcleo de maná condensado | Épico | 2% | 20 a 30 minutos | Ruinas arcanas | Afinidad arcana |
| Cerebro de autómata | Épico | 2% | 20 a 30 minutos | Ruinas arcanas | Ataque |
| Reactor de éter | Épico | 2% | 20 a 30 minutos | Fundición | Ataque |
| Corazón de caldera | Épico | 1% | 20 a 30 minutos | Fundición | Defensa y afinidad de fuego |
| Ojo de dragón mecánico | Legendario | 0.5% | 45 a 60 minutos | Desierto de chatarra | Ataque y afinidad |
| Corazón de golem primigenio | Legendario | 0.5% | 45 a 60 minutos | Desierto de chatarra | Todas las estadísticas |

La tabla anterior suma veinticuatro materiales, aunque he dejado el ojo de dragón mecánico y el corazón de golem primigenio como dos piezas legendarias separadas para que el desierto de chatarra tenga más de un objetivo de máxima rareza. Los porcentajes son pesos relativos, no probabilidades estrictas, y se pueden ajustar durante el balance sin tocar la lógica central.

Los materiales épicos y legendarios respetan un límite de una sola instancia activa a la vez en todo el mapa. Esto significa que si el reactor de éter ya está enterrado esperando a ser encontrado, no aparecerá otro hasta que el primero sea recogido o expire. Esa regla genera tensión, porque encontrar una pieza épica es un momento que no se repite de inmediato, y crea una especie de carrera silenciosa entre jugadores que buscan lo mismo.

Cada material aporta además un matiz visual al golem. Las ollas y sartenes dan un aspecto de blindaje improvisado, las bobinas de Tesla añaden destellos eléctricos, los diodos LED iluminan el cuerpo en colores fríos, y el corazón de caldera tiñe el interior de un brillo anaranjado. Ese matiz visual es consecuencia directa de la receta, así que dos golems con estadísticas parecidas pueden verse completamente distintos.

## 6. La forja y la unicidad de cada golem

Forjar un golem consiste en elegir una combinación de materiales desde el inventario y confirmarla en la forja. La cantidad mínima razonable para un golem funcional ronda los cinco materiales, y el máximo lo define el número de espacios de la receta, que propongo en ocho. Dentro de esos límites, la libertad es total: puedes repetir un mismo material varias veces o buscar una mezcla equilibrada.

La unicidad se resuelve con un hash determinista. La receta se serializa en un texto canónico que incluye el identificador de cada material y su cantidad, en un orden fijo. Ese texto pasa por una función de hash del estilo FNV-1a o un SHA truncado, y el número resultante se usa como semilla para derivar tres cosas: un factor de perfil que ajusta ligeramente las estadísticas base, un conjunto de rasgos visuales como el tono dominante y el tamaño relativo, y un nombre generado a partir de una tabla de prefijos y sufijos asociados a los materiales dominantes.

La palabra determinista es clave. La misma receta produce siempre el mismo golem, con las mismas estadísticas y el mismo nombre. Esto convierte la forja en algo reproducible y coleccionable, porque un jugador que descubre una receta buena puede compartirla con otros y ambos obtendrán resultados equivalentes. Al mismo tiempo, el espacio de combinaciones es tan grande que la probabilidad de tropezarse dos veces con la misma receta sin querer es prácticamente nula, lo que da la sensación de que cada golem es único.

Las estadísticas base se calculan sumando los aportes de cada material, y el factor de perfil del hash aplica una variación acotada que respeta el peso de la receta sin romperla. Un golem forjado con muchas sartenes y ollas saldrá naturalmente defensivo, y el hash solo matizará cuánto de defensa frente a cuánta vitalidad, manteniendo la identidad que el jugador buscó al elegir la receta.

## 7. Las estadísticas y el combate en tiempo real

Cada golem tiene cinco estadísticas: ataque, que mide el daño por golpe; defensa, que reduce el daño recibido; vitalidad, que define los puntos de vida; velocidad, que determina la frecuencia de ataque y la probabilidad de esquivar; y afinidad, que es la naturaleza elemental del conjunto.

El combate se resuelve en tiempo real por comparación de estadísticas, sin turnos. Cuando dos golems están a distancia de combate, el sistema avanza un ciclo de resolución cada fracción de segundo, usando el delta de tiempo del motor. En cada ciclo, el atacante calcula un daño restando la defensa del rival a su ataque, con un mínimo garantizado para que ningún combate se estanque, y ese daño se descuenta de la vitalidad. La velocidad marca cada cuánto tiempo puede golpear cada golem y añade una probabilidad de esquivar el golpe entrante.

La afinidad introduce un sistema de ventajas de tipo piedra, papel o tijera. El rayo vence al vapor, el vapor vence al fuego, el fuego vence a lo mecánico, lo mecánico vence a lo arcano, y lo arcano vence al rayo. La luz funciona como una afinidad flexible que no tiene ventaja ni desventaja fuerte, pero aporta un pequeño bono de precisión. Cuando un golem con ventaja golpea, el daño se multiplica por un factor favorable, y cuando está en desventaja, el daño se reduce. Esto premia la variedad de recetas y evita que una sola combinación domine la tabla.

El combate contra otros jugadores usa el mismo sistema, con la salvedad de que las posiciones se sincronizan por red y el resultado de cada enfrentamiento se reporta a la API para actualizar la clasificación.

## 8. Límite de golems y comportamiento de seguimiento

Cada jugador puede tener un máximo de tres golems activos que lo siguen por la escena. El seguimiento se resuelve con una distancia de mantenimiento: cada golem persigue la posición del avatar cuando se aleja más de un umbral, se detiene cuando está lo suficientemente cerca y reposiciona suavemente para no amontonarse con los demás. El movimiento usa interpolación, sin física agresiva, para que el conjunto se vea natural y no exija demasiado al dispositivo móvil.

El jugador puede elegir cuál de sus golems viaja con él y cuál se queda disponible para misiones. Los que no lo siguen no desaparecen del mundo, quedan asociados al inventario del jugador en estado de reserva, listos para recibir una orden de misión o para ser convocados de nuevo.

## 9. Misiones de recolección automatizadas

Los golems que no siguen activamente al jugador pueden enviarse a misiones de recolección. El jugador elige un golem, elige una zona y elige una duración, que va desde unos pocos minutos hasta varias horas. El golem parte, y el sistema calcula al término de la misión un botín basado en la rareza de la zona, la duración y una estadística de eficiencia derivada de la velocidad y la afinidad del golem.

La persistencia de estas misiones se apoya en la API de PHP y MySQL, de modo que el progreso no se pierde si el jugador se desconecta. Cuando el tiempo se cumple, el jugador puede reclamar el botín desde la interfaz, y el golem vuelve a estar disponible. Existe un factor de riesgo acotado: una misión puede volver con menos material del esperado, y en casos raros con una pieza mejor de lo previsto, lo que mantiene el interés sin castigar de forma severa.

El número de misiones simultáneas está limitado para que el sistema de recolección automatizado no sustituya por completo a la exploración manual. La idea es que las misiones complementen el bucle principal, no que lo reemplacen, porque recorrer el mapa con el radar es la experiencia que hace especial al juego.

## 10. Los personajes no jugadores y sus golems

Distribuidos por el mapa hay personajes no jugadores que patrullan rutas definidas por puntos de camino. Cada uno tiene un golem propio, o en algunos casos un pequeño grupo, con un nivel acorde a la zona donde vive. Estos NPC no buscan entablar conversación, sino que defienden su territorio. Cuando un jugador entra en su radio de agresión, el NPC y su golem inician un combate en tiempo real contra el golem o golems del jugador.

La resolución del combate contra NPC usa exactamente el mismo sistema de estadísticas descrito antes, lo que garantiza coherencia entre el combate contra la inteligencia artificial y el combate entre jugadores. Al vencer a un NPC, el jugador recibe puntos de experiencia y una probabilidad de obtener materiales, con una chance mayor para los NPC de zonas de rareza alta.

Los NPC se mueven con un comportamiento sencillo de patrulla, sin navegación compleja, para no cargar el rendimiento del cliente móvil. Se apoyan en el kit de NPC del SDK o en la forma de avatar, según convenga al resultado visual y a la simplicidad del sistema de movimiento.

## 11. Progresión y niveles

Tanto el jugador como los golems ganan experiencia y suben de nivel. El jugador gana experiencia al recolectar materiales, forjar golems, completar misiones y vencer en combate. Subir de nivel al jugador desbloquea ventajas de conveniencia, como más ranuras de misión simultánea, la posibilidad de mantener más golems en reserva o un ligero aumento de la distancia del radar.

Los golems ganan experiencia al participar en combates y en misiones. Al subir de nivel, un golem aumenta sus estadísticas de forma proporcional a su perfil de forja, de modo que un golem defensivo seguirá siendo defensivo al crecer, solo que más. El límite de nivel de los golems está ligado a la rareza de los materiales con que fueron forjados, lo que da a las piezas legendarias un valor de largo plazo: un golem forjado con un corazón primigenio puede alcanzar un techo más alto que uno hecho solo con chatarra común.

La curva de experiencia es deliberadamente suave al principio y se empina después, para que el progreso inicial se sienta rápido y motivador, mientras que los niveles altos requieren dedicación y recompensan la constancia.

## 12. El torneo escalera, uno contra uno y dos contra dos

El torneo es el componente competitivo del juego. Funciona como una escalera con puntuación de habilidad, similar a un sistema de Elo, donde cada jugador tiene una calificación que sube o baja según los resultados de sus enfrentamientos.

En el formato uno contra uno, cada jugador entra al combate con sus tres golems activos, y la batalla se resuelve en tiempo real por estadísticas hasta que todos los golems de un bando quedan fuera de combate. En el formato dos contra dos, los dos jugadores de cada equipo entran con sus golems, lo que suma seis golems por bando y doce en total, y la victoria se define por la caída de todos los golems del equipo contrario.

El emparejamiento se hace a través de la API, que busca rivales con calificaciones cercanas para que cada partida sea pareja. El resultado de cada combate se reporta a la API una vez terminado, y la clasificación se actualiza. La tabla se puede consultar desde la forja central, y sirve tanto para presumir posición como para descubrir a los rivales más fuertes de la temporada.

El torneo no exige jugar con la cámara apuntando con precisión ni depende de reflejos de disparo, porque se resuelve por estadísticas. Eso lo hace cómodo en móvil y pone el peso de la estrategia en la composición de la receta, la afinidad elemental y la gestión de los niveles, más que en la destreza manual.

## 13. Arquitectura del servidor y persistencia

La persistencia de jugadores, golems, inventario, misiones y clasificación se apoya en una API escrita en PHP que interactúa con una base de datos MySQL. El juego en vivo, es decir, lo que ocurre dentro de la escena en un momento dado, se resuelve con el multijugador sin servidor propio del SDK, usando la sincronización de entidades y el bus de mensajes. La API entra en juego para todo lo que debe sobrevivir entre sesiones: guardar un golem recién forjado, registrar el avance de una misión, consultar la clasificación o reportar el resultado de un combate.

La comunicación entre la escena y la API se hace con peticiones firmadas. El SDK permite enviar una solicitud con la cadena de autenticación del usuario, y el lado PHP puede verificar esa firma para confirmar que la petición proviene de la dirección de billetera que dice ser. Con eso se evita que un tercero escriba datos a nombre de otro jugador, sin necesidad de manejar contraseñas.

Las tablas principales de la base de datos son: una de jugadores, con su dirección y su nivel; una de golems, con la receta, las estadísticas y el nivel de cada uno; una de inventario, con las cantidades de material por jugador; una de misiones, con el golem asignado, la zona, la duración y el momento de finalización; una de partidas, con los participantes y el resultado; y una de clasificación, con la calificación actual de cada jugador.

Los endpoints de la API se agrupan en: registro y consulta de jugador, guardado de golem, listado de golems, inventario, inicio y reclamación de misiones, búsqueda de rival para el torneo, reporte de resultado y consulta de la clasificación. Cada endpoint devuelve respuestas en formato JSON y valida la firma antes de modificar cualquier dato.

## 14. Arquitectura de código en el SDK

El código de la escena se organiza en módulos dentro de la carpeta de fuentes, siguiendo el patrón de objetos de juego del SDK. El archivo principal se mantiene limpio y solo se encarga de inicializar la interfaz, los controles táctiles, el suelo base y de instanciar los sistemas. Cada responsabilidad vive en su propio archivo.

El módulo de materiales gestiona la generación de recursos, los tiempos de reaparición, la vida útil y los límites de instancias simultáneas por rareza. El módulo de radar calcula la distancia del jugador al material más cercano y alimenta el estado que la interfaz usa para dibujar la señal. El módulo de forja resuelve el hash determinista y produce las estadísticas y rasgos del golem. El módulo de golem se encarga de crear la entidad, el seguimiento del avatar y el estado en combate. El módulo de misiones administra el envío y la reclamación de recolección automatizada. El módulo de NPC patrulla las rutas y dispara el radio de agresión. El módulo de combate contiene la resolución por estadísticas en tiempo real. El módulo de progresión aplica la experiencia y los niveles. El módulo de escalera coordina el emparejamiento y el reporte de resultados. El módulo de backend centraliza las llamadas firmadas a la API de PHP.

La interfaz se construye con React ECS y separa los elementos en componentes reutilizables, con el radar como pieza central y paneles para el inventario, la forja, las misiones y la clasificación.

## 15. Multijugador en vivo

Dentro de la escena, el estado compartido que debe verse en tiempo real se maneja con las herramientas de multijugador del SDK. Las entidades que representan golems visibles se sincronizan para que todos los presentes vean lo mismo. Los eventos efímeros, como el inicio de un combate o el resultado de un golpe, viajan por el bus de mensajes.

El diseño separa con claridad lo que es efímero de lo que es persistente. Un combate en vivo es efímero y usa el bus de mensajes. Un golem recién forjado es persistente y se guarda en la API. Esa separación evita saturar el bus con información que no necesita viajar entre todos los clientes y mantiene la red liviana, algo importante en dispositivos móviles con conexiones variables.

## 16. Restricciones para el cliente móvil

Toda la experiencia se diseña pensando primero en pantallas táctiles, y eso impone una serie de restricciones que se respetan en cada módulo. No se usan luces dinámicas, así que los efectos de emisión del radar, de los diodos LED y de los golems se logran con materiales emisivos o sin iluminación, que sí están soportados. No se depende del raycasting avanzado ni de la dirección del puntero, porque el radar reemplaza esa necesidad. Los fondos de interfaz evitan el estirado de nueve porciones y usan texturas planas o dimensiones fijas. No se usan componentes de análisis de audio ni eventos de audio avanzados. Los videos, si llegan a existir, usan solo flujos directos compatibles, sin enlaces a plataformas que las tiendas de aplicaciones restringen.

Los controles son exclusivamente táctiles, sin depender del estado del ratón ni de atajos de teclado. Las hitboxes de los botones y de las piezas recolectables superan el tamaño mínimo recomendado para tocar con comodidad. La interfaz respeta las zonas seguras del dispositivo, evitando el área donde viven el joystick virtual y los botones nativos. El rendimiento se cuida limitando la cantidad de entidades activas, agrupando la geometría cuando es posible y manteniendo el número de piezas simultáneas dentro de un presupuesto razonable.

## 17. Cierre y camino a seguir

El documento define un sistema coherente y construible dentro de las capacidades del SDK y del cliente móvil. El siguiente paso natural es validar el set de materiales y los números de balance con una primera versión jugable, usando la recolección y la forja como núcleo inicial, para después sumar el combate, las misiones y por último la escalera. Cada pieza se puede probar de forma independiente, y el orden propuesto permite llegar a una experiencia completa sin bloquear el avance por una sola funcionalidad pendiente.
