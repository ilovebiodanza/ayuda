# Clases · editor · guion de la ayuda con audio

**Estado:** guion aprobado con correcciones; pendiente de implementación.
**Formato:** animación con capítulos navegables.
**Voz:** Google Translate TTS provisional.
**Acceso:** botón general de Ayuda.
**Avance:** se detiene al finalizar cada capítulo.

## Capítulos

| # | Capítulo | Duración |
|---|---|---:|
| 1 | Mapa del editor | 24.2 s |
| 2 | Datos básicos | 16.7 s |
| 3 | Agregar una danza | 19.6 s |
| 4 | Detalles de la danza | 22.5 s |
| 5 | Editar y ordenar danzas | 24.4 s |
| 6 | Gráfico de evolución | 14.6 s |
| 7 | Prueba de música | 16.2 s |
| 8 | Ejecución controlada | 22.6 s |
| 9 | Guardar y salir | 11.2 s |

**Total:** 2 min 52 s.
**A 0.9×:** aproximadamente 3 min 11 s.
**Audio:** 33 segmentos agrupados en 9 capítulos.

---

## Capítulo 1 · Mapa del editor

**Pantalla:** editor de una clase existente. Se resaltan las pestañas superiores y los botones Guardar y Salir.

**Narración:**

> Este es el editor de clases.  
> Aquí describes la sesión de una clase con sus vivencias o danzas.  
> Arriba están las pestañas: datos básicos, gráfico, danzas, prueba de música y ejecución controlada.  
> A la derecha tienes los botones para las acciones de guardar y salir de la edición de la clase.

**Caption:**

> El editor describe la sesión de una clase.

---

## Capítulo 2 · Datos básicos

**Pantalla:** pestaña **Datos básicos**.

**Narración:**

> En Datos básicos escribe el título y la clasificación de la clase.  
> La descripción es la presentación general.  
> Guarda con el botón Guardar o con Control S.  
> Guardar no cierra el editor: puedes seguir trabajando.

**Caption:**

> Título, clasificación y descripción general.

---

## Capítulo 3 · Agregar una danza

**Pantalla:** pestaña **Danzas** → botón `+` → modal **Agregar danza**.

**Narración:**

> Para agregar una danza, entra en la pestaña Danzas y pulsa el botón más.  
> Busca la danza por su nombre.  
> Después busca la música.  
> Puedes escuchar una muestra con el botón verde antes de elegirla.  
> El buscador también muestra danzas y músicas sugeridas.

**Caption:**

> Busca la danza, elige la música y escúchala antes de guardar.

---

## Capítulo 4 · Detalles de la danza

**Pantalla:** el mismo modal, con **Slogan**, **Curva evolución** y **Más detalle** desplegado.

**Narración:**

> Añade el slogan que quieres recordar durante la ejecución.  
> La evolución sitúa la danza en la curva de energía de la clase.  
> En Más detalle puedes indicar la línea, la clasificación, el objetivo y quién la presenta.  
> Pulsa Guardar danza.  
> Repite el proceso para cada danza de la clase.

**Caption:**

> Slogan, evolución y detalles de la danza.

---

## Capítulo 5 · Editar y ordenar danzas

**Pantalla:** lista de danzas con sus botones de reproducir, editar y menú `⋯`.

**Narración:**

> Cada danza tiene un botón para escucharla, otro para editarla y un menú para ver su descripción o eliminarla.  
> Para cambiar el orden, arrastra la danza a su nueva posición o haz doble clic en ella y luego en el lugar de destino.  
> Si copiaste una lista desde Música y Danzas, puedes pegarla con el botón de lista.

**Caption:**

> Reproducir, editar, eliminar y reordenar danzas.

---

## Capítulo 6 · Gráfico de evolución

**Pantalla:** pestaña **Gráfico**.

**Narración:**

> En la pestaña Gráfico ves la curva de evolución de la clase.  
> Cada punto representa una danza.  
> Puedes arrastrar los puntos para ajustar la energía.  
> La curva se guarda junto con la clase.

**Caption:**

> La curva muestra la evolución de la energía.

---

## Capítulo 7 · Prueba de música

**Pantalla:** pestaña **Prueba de música**.

**Narración:**

> La prueba de música permite revisar un fragmento de la clase.  
> Elige desde qué danza y hasta cuál quieres probar.  
> Ajusta los segundos de inicio, parte media y final.  
> Pulsa Comenzar prueba para escuchar la transición.

**Caption:**

> Prueba fragmentos y transiciones antes de ejecutar.

---

## Capítulo 8 · Ejecución controlada

**Pantalla:** pestaña **Ejecución controlada** y modal de invitación.

**Narración:**

> La ejecución controlada te guía durante la clase.  
> Elige el rango de danzas y pulsa Comenzar ejecución controlada.  
> En cada danza verás su slogan y sus detalles.  
> Puedes invitar a bailar o mostrar la danza después de unos segundos.  
> También puedes reproducir toda la secuencia con Reproducir todo.

**Caption:**

> Ejecuta la clase danza por danza, con slogan y detalles.

---

## Capítulo 9 · Guardar y salir

**Pantalla:** botones **Guardar** y **Salir**.

**Narración:**

> Pulsa Guardar para conservar los cambios.  
> Si sales sin guardar, el editor te pedirá confirmación.  
> Al terminar, vuelve a la lista de clases.

**Caption:**

> Guarda los cambios o vuelve a la lista.

---

## Decisiones de implementación

- La pestaña **Ayuda** del editor se elimina; la ayuda se abre desde el botón general de Ayuda.
- La animación se detiene al finalizar cada capítulo.
- La voz se mantiene provisional (Google Translate TTS).
- No hay autoplay.
- Subtítulos incluidos.
