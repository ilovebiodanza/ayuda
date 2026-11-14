# Música · guion de ayuda

**Versión:** 2.0
**Estado:** audio provisional generado. Animación HTML creada.
**Idioma:** español.
**Duración estimada:** 2 min 05 s.
**Formato:** HTML/CSS con una secuencia de audios cortos.
**Velocidad inicial:** 0.9×.

## Objetivo

Enseñar a usar el módulo **Música** para:

- encontrar rápido una música en la lista compacta;
- escucharla;
- abrir su reseña y sus danzas asociadas;
- crear o editar una música sin perder la relación con el repertorio.

La explicación está pensada para una persona que ya conoce la app, pero que todavía no ha usado este módulo.

## Datos de ejemplo

| Campo | Valor |
|---|---|
| Título | **NEGRUME DA NOITE** |
| Código | **BA26-01** |
| Autor | **AUTOR DESCONOCIDO** |
| Línea de vivencia | **AFECTIVIDAD** |
| Danzas asociadas | 2 |

La lista se muestra en modo compacto: **25 músicas por página**. El usuario puede cambiar ese valor desde el selector de página.

## Reglas de producción

- Voz cálida, clara y cercana; sin dramatización.
- Sin música de fondo.
- Subtítulos siempre visibles.
- Sin autoplay.
- El cursor y el foco deben verse; no usar animaciones rápidas.
- No inventar datos: usar los valores de ejemplo.
- Los botones de edición, privacidad y eliminación se muestran **según permisos**; la narración lo aclara.
- El corazón de Danzas se abre una sola vez y carga la información en ese momento.
- La animación termina en la lista, no en un formulario abierto.

## Mapa de escenas

| # | Escena | Duración | Qué ocurre |
|---|---|---:|---|
| 01 | Introducción | 7 s | Entrada al módulo Música. |
| 02 | Lista compacta | 17 s | Se explica qué muestra cada fila. |
| 03 | Buscar y filtrar | 12 s | Búsqueda por título, código, autor o línea. |
| 04 | Reproducir | 6 s | Se pulsa el botón verde de reproducción. |
| 05 | Descripción | 8 s | Se abre la reseña desde el título. |
| 06 | Danzas asociadas | 11 s | Se despliega el corazón de Danzas. |
| 07 | Menú de acciones | 11 s | Descargar, editar, privacidad y eliminar. |
| 08 | Agregar | 7 s | Se abre el editor editorial. |
| 09 | Identidad | 12 s | Título, código, autor y línea. |
| 10 | Audio | 11 s | MP3, OGG y carga a GitHub. |
| 11 | Reseña | 8 s | Edición de la descripción enriquecida. |
| 12 | Guardar | 7 s | Guardar o cancelar. |
| 13 | Cierre | 8 s | Resumen y regreso a la lista. |

**Total estimado:** 125 segundos.

---

## 01 · Introducción

**Narración:**
Este es el módulo Música. Aquí organizas el repertorio que acompaña tus clases y tus danzas.

**Caption:**
Música organiza el repertorio de tus clases.

**Plano:**
Vista general del módulo con la lista compacta y el botón **Agregar música**.

**Acción:**
El foco aparece sobre el título **Músicas** y luego recorre suavemente la primera fila.

---

## 02 · Lista compacta

**Narración:**
La lista está pensada para ver muchas músicas de un vistazo. Cada fila muestra el título, el código, el autor y la línea de vivencia. A la derecha están las acciones; debajo, el corazón de Danzas.

**Caption:**
Título, código, autor y línea; acciones a la derecha.

**Plano:**
Primera fila de **NEGRUME DA NOITE**.

**Acción:**
Se resaltan el título y la línea de metadatos. Después se señalan los botones de reproducir y el menú de tres puntos. Finalmente se muestra el corazón **Danzas** con su contador.

---

## 03 · Buscar y filtrar

**Narración:**
Usa el buscador para encontrar por título, código, autor o línea. También puedes activar Solo privados para revisar solamente tus músicas privadas.

**Caption:**
Busca por título, código, autor o línea; filtra las privadas.

**Plano:**
Barra de búsqueda y filtro de privacidad.

**Acción:**
Se escribe **NEGRUME** en el buscador y se muestra cómo la lista se reduce. Después se activa **Solo privados** y se vuelve a desactivar.

---

## 04 · Reproducir

**Narración:**
Pulsa el botón verde para escuchar la música antes de usarla en una clase.

**Caption:**
Reproduce la música desde la ficha.

**Plano:**
Botón de reproducción de la primera fila.

**Acción:**
Se pulsa el botón; aparece brevemente el reproductor de la aplicación. La música suena solo en la demostración, no en la animación.

---

## 05 · Descripción

**Narración:**
Pulsa el título para abrir la descripción. Allí encuentras la reseña completa y las danzas asociadas.

**Caption:**
El título abre la descripción.

**Plano:**
Título **NEGRUME DA NOITE**.

**Acción:**
Se pulsa el título y se abre el modal de descripción. El foco va al título del modal y luego a la reseña.

---

## 06 · Danzas asociadas

**Narración:**
El corazón de Danzas muestra las danzas que usan esta música. La información se carga cuando lo abres, para no cargar datos que no necesitas.

**Caption:**
El corazón muestra las danzas asociadas.

**Plano:**
Modal de descripción, zona **Danzas**.

**Acción:**
Se pulsa el corazón; el chevron cambia y aparece la lista de danzas. El cursor permanece sobre el corazón para mostrar que se puede cerrar.

---

## 07 · Menú de acciones

**Narración:**
En el menú de tres puntos puedes descargar la música, editarla, cambiar su visibilidad o eliminarla. Las opciones dependen de tus permisos.

**Caption:**
Descargar, editar, privacidad y eliminar.

**Plano:**
Menú desplegable de la primera fila.

**Acción:**
Se abre el menú y se recorre cada opción con el foco. No se ejecuta ninguna acción destructiva.

---

## 08 · Agregar

**Narración:**
Para registrar una música nueva, pulsa Agregar música. Se abre el editor editorial.

**Caption:**
Agregar música abre el editor.

**Plano:**
Botón **Agregar música**.

**Acción:**
Se pulsa el botón y se abre el modal de alta con la sección **Identidad** visible.

---

## 09 · Identidad

**Narración:**
Escribe el título, el código y el autor. El código se guarda en mayúsculas y admite hasta doce caracteres. Después selecciona la línea de vivencia.

**Caption:**
Título, código, autor y línea de vivencia.

**Plano:**
Sección **Identidad** del editor.

**Acción:**
Se completa el título de ejemplo; el código se escribe en minúsculas y se muestra cómo pasa a mayúsculas al salir del campo. Se selecciona **Afectividad** en la línea.

---

## 10 · Audio

**Narración:**
Agrega los enlaces MP3 u OGG. Si tienes permiso, también puedes subir el archivo a GitHub desde esta misma ficha.

**Caption:**
Enlaces de audio o carga a GitHub.

**Plano:**
Sección **Audio**.

**Acción:**
Se enfocan los campos MP3 y OGG. Si el usuario tiene el permiso, se despliega **Upload file to Github** y se muestran Folder y Audio file.

---

## 11 · Reseña

**Narración:**
En la sección Descripción escribe la reseña de la música. Esa reseña es la que se muestra al abrir su ficha.

**Caption:**
La reseña se edita en Descripción.

**Plano:**
Sección **Descripción** con el editor enriquecido.

**Acción:**
Se escribe una frase breve de ejemplo y se muestran las herramientas del editor sin entrar en detalle en cada una.

---

## 12 · Guardar

**Narración:**
Cuando termines, pulsa Guardar música. Si no quieres conservar los cambios, pulsa Cancelar.

**Caption:**
Guardar música o cancelar sin cambios.

**Plano:**
Pie del editor.

**Acción:**
Se resalta **Guardar música**; luego se muestra **Cancelar** y se cierra el modal sin guardar en la demostración.

---

## 13 · Cierre

**Narración:**
Música te permite mantener el repertorio ordenado, escucharlo y relacionarlo con tus danzas y clases.

**Caption:**
Música lista para tus clases.

**Plano:**
Regreso a la lista compacta.

**Acción:**
Se muestra la lista con varias filas y se cierra la animación.

---

## Indicaciones de voz

- Pronunciar **Biodanza** con claridad y sin pausas internas.
- **CCRE** no aparece en este guion; si se menciona en otra versión, deletrear.
- Decir **NEGRUME DA NOITE** sin traducir.
- Mantener un ritmo de 135–145 palabras por minuto.
- Evitar muletillas y frases como “simplemente” o “muy fácil”.
- Hacer una pausa breve después de cada instrucción.

## Checklist antes de grabar

- [ ] Lista compacta con 25 ítems por página.
- [ ] Primera fila con NEGRUME DA NOITE, BA26-01, AUTOR DESCONOCIDO y AFECTIVIDAD.
- [ ] Corazón de Danzas con 2 danzas.
- [ ] Modal de descripción con reseña y danzas.
- [ ] Editor de alta con secciones Identidad, Audio y Descripción.
- [ ] Código en mayúsculas y límite de 12 caracteres.
- [ ] Permisos de edición y privacidad visibles según el usuario.
- [ ] Sin acciones destructivas durante la grabación.

## Relación con la interfaz actual

- La lista usa el **modo compacto** de `crud-standard.css`.
- Cada fila prioriza título y una línea de metadatos; el detalle queda en el modal.
- El botón de reproducción y el menú de acciones están a la derecha.
- El editor reutiliza el formato editorial de Danzas.
- El corazón de Danzas está tanto en la fila como en el modal de descripción.
- La reseña se edita con Summernote.
