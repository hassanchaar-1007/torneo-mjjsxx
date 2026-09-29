# 📖 JORNADAS — LA BIBLIA DEL PROYECTO (M.J.J.S.XX.)

> **Este archivo lo lee Claude Code automáticamente al abrir una sesión en `C:\JORNADAS\torneo`.**
> Es el documento maestro: contiene TODO el contexto desde el día 1 para poder continuar el
> proyecto **desde cualquier máquina, cualquier cuenta y cualquier sesión nueva** sin perder nada.
>
> **Instrucciones permanentes para Claude:**
> - Trabajar **en español**, directo y práctico.
> - Guiar **paso a paso** cuando haya que tocar Firebase, deploy o cuentas.
> - Este es el chat/proyecto **exclusivo de JORNADAS**; todo lo de la plataforma se trabaja acá.
> - Verificar los cambios en el **preview local** con herramientas (no pedirle al usuario que revise a mano).
> - Antes de deployar a producción, **confirmar con el usuario**.

---

## 1. Qué es JORNADAS

**JORNADAS** es la **plataforma multi-evento** del movimiento juvenil católico **M.J.J.S.XX.**
(Movimiento de Jornadas). Es UNA sola app web (PWA): portada del movimiento y, adentro, eventos.
Diseñada para **agregar eventos sin rehacer nada**.

Eventos actuales:

| Evento | Tipo | Estado | Qué tiene |
|---|---|---|---|
| 🏆 **Torneo de Integración 2026** | Deportivo | Ya se jugó (14/06/2026) | Equipos, inscripción con PIN, fixture (grupos + eliminatorias), resultados, goleadores, Salón de Campeones |
| 🏕️ **CAMPAJOR 2026** | Campamento | Próximo: **sáb 11 y dom 12 de octubre 2026** | Lema «En busca del Tesoro», 4 subcampos-apóstoles, esencia espiritual (virtudes + oración), cronograma, 5 postas=tipos de oración, 24 yincanas con virtudes, patrullas (integrantes + jefe 👑), puntajes, ranking + Copa de Subcampos, premios "Virtud del Jornadista", **inscripción online de patrullas con PIN** |

- Sitio en vivo: **https://jornadas-cop.pages.dev**
- Identidad visual: paleta **navy** (#0a0f28) + **verde neón** (#00e676) + **dorado** (#ffc828). Logo: cruz del movimiento (`logo.png`).
- Los eventos viven en el **registro `EVENTOS`** dentro de `index.html`; para sumar uno nuevo se agrega una entrada ahí + sus vistas + su rama en `abrirEvento()`.

---

## 2. Historia completa (día 1 → hoy)

### Etapa 1 — El Torneo (13/06/2026, "día 1")
- `95724cc` **torneo app**: nace la app en un solo `index.html` para el Torneo de Integración
  del 14/06/2026 en Quinta la Soñada. Deploy original en **Surge** (por eso existe `200.html`,
  el fallback SPA de Surge).
- Mismo día, iteración en caliente: `57d87e1` agregar J48 · `f2767c6` sorteo con reglas ·
  `d0fae16` separar fútbol masc/fem + contadores · `cd9285a` grupos + todos vs todos ·
  `72cb713` vóley final top 2 · `efddb3f` final directo 1º vs 1º.
- El torneo se jugó el **domingo 14/06/2026**. Campeón 2026: **J48**.
- En esa época la escritura se protegía con un **PIN admin `1007`** (hoy obsoleto, quedó solo
  como resto local; NO es el mecanismo de seguridad actual).
- ⚠️ En esta etapa **se perdieron datos** por sobreescrituras de Firebase — de ahí nacieron
  las 3 capas anti-pérdida (sección 8). **La confiabilidad es prioridad número 1 del usuario.**

### Etapa 2 — Robustez y migración (29/06/2026)
- `670dd5f` CLAUDE.md inicial · `6096c55` .gitignore + README · `c818c72`/`a91877a` docs y
  ruta nueva `C:\JORNADAS\torneo`.
- `2630ee1` **Salón de Campeones** (historial por año, seed 2026=J48).
- `b1b26c3` `_redirects` para **Cloudflare Pages** (se migró de Surge; proyecto Pages
  `jornadas`, creado con `wrangler pages project create jornadas --production-branch main`).
- `bf19709` **Login de staff via Firebase Auth** (email/password) → escritura autorizada
  multi-dispositivo. Admin = `hassan.chaar@gmail.com`.
- `0ffb338` **Split público/privado por privacidad**: nodo `publico` (sin PII) + `torneo`
  (completo, solo admin). Función `buildPublic(d)` quita `telefono`/`comprobante`/`pin`.

### Etapa 3 — Plataforma multi-evento + CAMPAJOR (03/07/2026)
- `4feb3c6` **Portada JORNADAS** + selector de eventos (registro `EVENTOS`).
- `6f57a72` **CAMPAJOR integrado**: cronograma sáb/dom, 5 postas, 24 yincanas, patrullas, ranking.
- `f0d2b48` Sync Firebase de CAMPAJOR (nodo `campajor`) + branding JORNADAS (título/manifest).
- `070507f` fix refresco al loguear · `71a895c` integrantes por patrulla · `a20fbf8` jefe 👑.
- `1219202` gitignore de `dist/` · `5d4a40a` **anti-pérdida CAMPAJOR** (fbMaxPatrullasCj,
  backups rotativos, confirmación al borrar).

### Etapa 4 — Sesión de julio 2026 (portada motivacional + inscripción de patrullas)
- **Reglas RTDB publicadas** en la consola de Firebase con los 6 nodos (faltaban `campajor` y
  `campajor_backups`; sin eso los backups en la nube fallaban). Hecho vía navegador controlado.
- **`jornadas-cop.pages.dev` agregado a Authorized domains** de Firebase Authentication
  (sin eso el login admin fallaba en el sitio en vivo).
  - ⚠️ En esa lista apareció también **`jornadasapp.com` (Custom)** que nadie recuerda haber
    agregado en la sesión. **Confirmar si es del usuario; si no lo reconoce, QUITARLO.**
- `3be66e5` **Portada motivacional**: frases rotativas con fundido (fe, aventura, integración,
  J48), chips de valores, CTA. `149680e` ignora `.wrangler/`.
- `10b247d` **CTA "¡INSCRIBÍ TU PATRULLA!" movido adentro de CAMPAJOR** (la portada del
  movimiento queda neutral entre eventos — decisión del usuario: "que no quede flotando torneo").
- **Sistema de inscripción online de patrullas** (código completo, ver sección 7):
  formulario público, PIN de 6 dígitos, "Mi patrulla" editable, bandeja admin con aprobación.
- Inventario de la carpeta **PF51** (CAMPAJOR 2025) — ver sección 12.
- Se escribió la **biblia v2** (este documento) para portabilidad total del proyecto.

### Etapa 5 — Sesión del 12/07/2026 en adelante (identidad espiritual completa + todo EN VIVO)
- **La regla `campajor_inscripciones` fue publicada por el usuario** en la consola → prueba
  punta a punta OK (inscribir → PIN → login desde cero → editar → aprobar/eliminar como admin)
  → **deploy a producción**: la inscripción online quedó EN VIVO.
- El admin **recuperó su contraseña de staff**: se agregó el botón "¿Olvidaste la contraseña?"
  en el login (envía el mail de restablecimiento de Firebase Auth). OJO: la contraseña de staff
  es propia de la app (Firebase Auth), NO es la del Gmail.
- **Año centralizado**: el año de cada evento sale del registro `EVENTOS` y se muestra grande
  en la cabecera de cada evento (runbook 9.7).
- **Esencia espiritual del CAMPAJOR** (de la convivencia del 12/07/2026, charla "Virtudes del
  Jornadista" + lema del movimiento "El Tesoro está dentro"): sección de virtudes con citas,
  "La oración: el oxígeno del alma" (5 tipos de oración ↔ 5 postas), frases espirituales
  rotativas, yincanas etiquetadas con las 7 virtudes, cronograma espiritual (Rosario, misa
  "Pedid y se les dará", fogón con frutos Escucha-Silencio-Diálogo), premios "Virtud del
  Jornadista", sección del lema con el camino del Tesoro (5 momentos + oración del plantel).
- **Borrador del plantel** cargado en la app: propuesta de 5 propósitos del "Domingo sabio"
  y 8 pistas de la búsqueda del tesoro (⚠️ sacar las pistas de la página pública cuando sean
  definitivas — spoiler del juego).
- **Evolución del lema y los subcampos** (iteración con el plantel):
  1. Propuesta inicial: "Custodios del Tesoro" → 2. giro a virtudes: "Virtudes del Jornadista"
  → 3. pedido de 4 subcampos (se sumó SABIDURÍA a las 3 teologales) → 4. colores oficiales:
  rojo/blanco/azul/verde + plantel amarillo → 5. el plantel prefirió "el Tesoro y la búsqueda"
  → subcampos-elementos (Perla/Senda/Antorcha/Red) → 6. giro final: **nombres de apóstoles
  buscadores + elementos de la tierra** (ver sección 11). Lema final: **«En busca del Tesoro»**.
- Commits clave: `e667414` esencia · `900df63` lema Tesoro · `57a3bd1` borrador · `3523fad`
  lema+subcampos búsqueda · `3ef0030` apóstoles+elementos · sw llegó a **v3.9**.
- La patrulla de prueba fue eliminada por el admin desde su bandeja (flujo admin verificado).

### Etapa 6 — Sesión del 13/09/2026 (Hassan asume como Líder de Grupo + Reglamento CAMPAJOR)
- **Hassan fue elegido Líder de Grupo del CAMPAJOR** (Jefe de Campo / Responsable de
  Campamento): gestión, puntuación y desarrollo de todas las actividades, con responsabilidad
  civil y de seguridad durante el campamento al aire libre. El plantel está escribiendo por
  primera vez los manuales de rol de cada jefe (antes no existían por escrito); este documento
  es la referencia oficial que se va a ir completando con los demás roles (Jefe de Subcampo,
  Jefe de Patrulla, etc. — pendiente de Richard y el jefe Rolando).
- **Confirmado el lugar del CAMPAJOR 2026**: Reserva Natural Tati Yupi (Itaipu), Hernandarias.
  Reserva previa obligatoria (Centro de Recepción de Visitas / 061 599 8040), cédula al
  ingresar, ingreso sujeto al clima. Normas: cero alcohol, sin armas/explosivos, sin mascotas,
  no basura, no dañar flora/fauna, respetar el silencio, permanecer en los senderos. Base legal:
  Decreto N° 7442/2017 (Plan de Manejo de la reserva) — el usuario compartió el PDF del decreto,
  pero es un escaneo sin capa de texto (sin OCR disponible en esta sesión no se pudo extraer el
  articulado exacto); las normas cargadas salen del resumen que pasó el propio usuario.
- **Nueva pestaña "📜 Reglamento" en CAMPAJOR** (`#page-cj-reglamento`, después de Ranking):
  sede y normas de la reserva, método de Jornadas (Ver·Juzgar·Actuar·Revisar·Celebrar — se
  celebra en la misa), Ley del Jornadista (10 artículos, valores Lealtad/Abnegación/Pureza), y
  el **Manual del Líder de Grupo** (seguridad y bienestar, gestión logística, coordinación
  pedagógica, resolución de conflictos) en tarjeta de borrador (`border-dashed`, mismo patrón
  que "Borrador del plantel") para seguir editando. Contenido público, hardcodeado en
  `index.html` (sin nodo Firebase nuevo). sw subió a **v3.10**.
- Se creó `C:\JORNADAS\torneo\.claude\launch.json` (antes solo existía en `C:\JORNADAS\.claude\`;
  al abrir la sesión directo en `torneo\` el preview lo busca ahí también).
- **Reglamento reescrito con tono espiritual** (a pedido del usuario: nada de sonar estricto/
  administrativo — todo conectado a las virtudes, la búsqueda del Tesoro y el encuentro con
  Jesús). La sede quedó sin la línea de "reserva previa" (el movimiento se encarga de esa
  gestión); solo se pide cédula.
- **Manuales reales de rol cargados** desde `C:\JORNADAS\campajor\FUNCIONES SERVICIOS.docx`
  (documento del plantel, "CAMPAJOR Edic. XVI 2026"): Jefe de Subcampo, Jefe de Espiritualidad,
  Jefe de Fogón (ahí llamado "Jefe Noche del Fogón") y Jefe de Cocina — con sus funciones reales,
  reescritas en el mismo tono espiritual pero sin perder el contenido original. El documento trajo
  además **2 roles nuevos que no estaban contemplados**: **Jefe de Limpieza General** y **Jefe de
  Utilería de Juegos** — ya agregados a la pestaña Reglamento con sus funciones completas.
  El .docx no tenía manual para Líder de Grupo (el de Hassan, que salió de otra conversación/
  audio) ni para "ayudantes" de cocina/espiritualidad/fogón como rol aparte — esos ayudantes
  quedan marcados "a cargar" hasta que el plantel los escriba.
- **Se separó en 2 pestañas** dentro de CAMPAJOR: `#page-cj-reglamento` (📜 Reglamento — sede,
  normas de la reserva, método de Jornadas, Ley del Jornadista) y `#page-cj-funciones`
  (🗂️ Funciones — el manual de roles completo). Antes estaba todo junto en una sola pestaña.

### Etapa 7 — Sesión del 14-15/09/2026 (tono espiritual a fondo + Staff + Organización)
- **Reglamento y Funciones reescritos con foco en virtudes**: cada artículo de la Ley del
  Jornadista tiene ahora un badge de virtud (las 7: Fe/Esperanza/Caridad/Prudencia/Justicia/
  Fortaleza/Templanza, mismos íconos/colores que `VIRTUDES_CJ`) + una glosa tierna ligada al
  Tesoro. Cada función del manual de roles también tiene su virtud (Líder de Grupo=Sabiduría,
  Espiritualidad=Fe, Fogón=Caridad, Cocina=Templanza, Limpieza=Justicia, Utilería=Prudencia,
  Subcampo=las 4 según apóstol).
- **`#page-cj-funciones` renombrada a "🗂️ Staff"** (nav + título) — el usuario prefiere ese
  nombre. El acceso sigue igual: admin, o código de solo-lectura `TESORO26` (ver sección 7).
- **El "Borrador del plantel"** (lema en discusión, 5 propósitos, **8 pistas de la senda —
  spoiler**) se sacó de la portada pública (`page-cj-inicio`) y se movió a Staff, marcado
  "🤫 Solo Staff · spoiler adentro". Antes estaba visible a cualquiera.
- **Layout más ancho en PC**: `.section-page` subió de 600px a 780px de max-width. Reglamento
  (Sede+Método en 2 columnas, Ley abajo a lo ancho, contenedor a 1020px), Staff (grilla de
  roles a 1180px) y Postas/Juegos (grillas de 2-3 columnas, contenedor a 1180px) ya no dejan
  tanto espacio vacío a los costados en pantallas anchas. En mobile todo colapsa a 1 columna
  solo, sin cambios. IDs para CSS: `#reglamentoTopGrid`, `#staffRolesGrid`, `#orgGrid`,
  `#cj-postas-list`, `#cj-yincanas-list` (todos con `margin-bottom:0` en sus `.card` para no
  duplicar el gap del grid).
- **Nueva pestaña "🏗️ Organización" (`#page-cj-organizacion`)**, con el mismo candado que
  Staff (admin o código `TESORO26`; toggle compartido en `updateUserBadge()` vía
  `puedeVerFunciones`, guard en `showCj()` para `'funciones'` y `'organizacion'` juntos). Es
  donde se va volcando lo que se charla en el grupo de WhatsApp del plantel ("Movimiento De
  Jornadas"), organizado y ligado a virtudes/Tesoro/subcampos. Primera carga:
  - **Consigna del año**: «Jornadicemos el Campajor» (que vuelvan las sorpresas, la algarabía,
    los cantos de Jornadas —"Al pecho llevo la Cruz"—, servir como palanca al hermano de la
    cuneta, cuidar la llama).
  - **La llama del Jornadista** (Fortaleza + Caridad/San Juan): "que nunca se apague, y si se
    apagó que se vuelva a prender" — ligado directo al fogón ("Jornadicemos el fogón").
  - **El Cuarto Día** (Fortaleza): concepto central de Jornadas — no es una fecha, es TODA la
    vida después del retiro, viviendo lo aprendido. Se pregunta "¿cómo va tu cuarto día?".
  - Asignación de charlas: **Richard** (don de la palabra) y **Rolando** (don de mando).
  - **Nuevo premio "Mejor Espíritu Jornadista"** (además del ya existente "Mejor Espíritu
    Campajor") — pensado para veteranos, premia la llama que sigue encendida a pesar de los
    años. Todavía **no está wireado al sistema de premios del Ranking** (que hoy solo tiene
    "Virtud del Jornadista" por patrulla) — falta definir con el plantel si es individual o
    por patrulla antes de programarlo.
  - **Qué es Jornadas** (para staff nuevo): retiro espiritual anual, **se hace UNA sola vez en
    la vida** ("una vez jornadista, siempre jornadista"), las ediciones se numeran corridas —
    **esta es la J52**, Hassan es de la **J42** — después cada camada forma patrullas que
    siguen participando juntas cada año sin importar la edición. Patrullas veteranas
    tradicionales: **las Caperucitas** y **los Loros**.
  - **"El Flaco"** confirmado como apodo cariñoso de **Jesús** (no un miembro del plantel) —
    ya se usa así en "El camino del Tesoro" (nueva parada "El altar te espera": pistas llevan
    al Altar Mayor armado por Espiritualidad, cada patrulla escribe una palanca — "¿Cómo
    llegué al Campajor?" / "¿Qué espero encontrar?" — que se ofrenda en la Misa del domingo).
- **Grito de Guerra** cargado en el Inicio de CAMPAJOR (texto del usuario, afinado en rima por
  Claude: "Somos Jornadistas, sin miedo y sin temor... ¡CAM-PA-JOR! ¡CON EL SALVADOR!") +
  mensaje de cierre del Líder de Grupo justo antes del CTA de inscripción.
- **Pendiente sin resolver**: las imágenes "Tarjetas Rojas" (memes graciosos de infracciones
  tipo tarjeta roja — "llegar sin tu Biblia", "dormirte en la prédica") quedaron **solo como
  referencia**, el usuario pidió no subirlas todavía.

### Etapa 8 — Sesión del 16-23/09/2026 (correcciones de lore + carga masiva de patrullas)
- Fixes chicos de contenido: "tribu"→"patrulla" en el mensaje de cierre; **El Cuarto Día es
  después de LA JORNADA** (el retiro de 3 días), NO después del CAMPAJOR — el CAMPAJOR es el
  campamento anual al que cada jornadista se suma ya viviendo su Cuarto Día (corregido en
  Organización); la frase **"¡Viví tu momento!"** es la respuesta clásica para cortar spoilers
  cuando alguien pregunta de más — se ajustó su uso y se sumó también en la tarjeta de Staff
  con las pistas (`page-cj-funciones`).
- **Carga masiva de integrantes** en Patrullas (`#cj-carga-masiva`, admin-only, junto a
  "Agregar patrulla"): el staff pega una lista con formato `Nombre / Apodo / Jornada / (cédula
  opcional)` separando cada persona con línea en blanco — `parseCargaMasivaCj()` arma
  `"Nombre ("Apodo") · JNN"` por integrante. **La cédula se ignora siempre, aunque esté en el
  texto pegado** — el nodo `campajor.patrullas` es de lectura pública (`.read:true`), así que
  ningún dato de identidad va ahí. Preview antes de confirmar (`previewCargaMasivaCj()` →
  `confirmarCargaMasivaCj()`), reusa `saveCj()` (respeta el anti-encogimiento). Si la patrulla
  del nombre ingresado ya existe, hace `concat` a sus integrantes en vez de duplicar.
  - **Por qué no lo cargó Claude directo**: escribir en `campajor` requiere estar autenticado
    como `hassan.chaar@gmail.com` vía Firebase Auth (lo exigen las reglas RTDB) y Claude nunca
    escribe contraseñas — el admin tiene que loguearse él mismo y usar la herramienta.
  - **Usada con éxito**: el usuario cargó la primera patrulla real ("Patrulla Lila (a
    confirmar nombre)", 10 integrantes) con la herramienta — confirmado en producción.
- **Widget "🚩 Patrullas Inscriptas"** en `page-cj-inicio`, justo debajo del hero (antes de la
  tarjeta del Lema): contador total (`renderInscriptosCj()`, lee `dataCj.patrullas` en vivo vía
  `setupCampajorSync`) + carrusel navegable con `‹ ›` (`navInscriptosCj(dir)`, índice global
  `_inscriptosIdx`) que muestra nombre de patrulla + cantidad de integrantes entre paréntesis,
  y la lista completa de integrantes debajo (con 👑 si es el jefe). Público, sin PII (mismos
  datos que ya son públicos en `campajor.patrullas`). Si no hay patrullas, muestra estado vacío
  invitando a inscribirse.

### Etapa 9 — Sesión del 23/09/2026 (layout de Inicio + cédulas + más patrullas)
- **Grito de Guerra reemplazado** por la versión final que armó el plantel en el grupo (formato
  llamada/respuesta líder↔grupo — en la app solo se dejan las líneas del líder, con una nota de
  que el grupo las repite). Cierre: "¡CAMPAJOR! ¡CAMPAJOR!".
- **Layout de `page-cj-inicio` rehecho dos veces** por feedback directo del usuario (mandó un
  mockup dibujado a mano):
  1. Primer intento: layout tipo "muro" (`#cj-inicio-columns`, CSS `columns: 380px` con
     `break-inside:avoid-column`) metiendo TODAS las tarjetas de contenido en columnas fluidas.
  2. El usuario no lo quería así — mostró con su mockup que el widget de Patrullas Inscriptas
     debía ir **compacto, al costado del header** (no una fila más). Layout final: hero y el
     widget en un `display:flex` de 2 columnas arriba de todo (`flex:2 1 420px` el hero,
     `flex:1 1 300px;max-width:380px` el widget); el resto de las tarjetas (Lema, Esencia,
     Subcampos, Oración, Grito, cierre) sigue en `#cj-inicio-columns`. El CTA final queda
     afuera, a todo el ancho. En mobile todo cae a 1 columna igual que siempre.
  - Trade-off conocido: con el widget compacto, nombres largos con apodo pueden volver a cortar
    en 2 líneas (antes se había ensanchado a full-width para evitar justo eso). El usuario lo
    aceptó implícitamente al pedir la versión compacta — si vuelve a molestar, achicar el
    formato del texto (sacar comillas del apodo, por ejemplo) en vez de volver a ensanchar.
- **Parser de carga masiva mejorado** (`parseCargaMasivaCj` en `index.html`): ahora entiende
  bloques multilínea (nombre/apodo/jornada/cédula separados por línea en blanco) **y** líneas
  sueltas por persona ("Nombre (Apodo) cédula · J52", sin separadores) — se detecta solo mirando
  si TODAS las líneas de un bloque "parecen de persona" (tienen paréntesis o patrón `J\d+`). Se
  agregaron `formatearEntradaCj()`, `pareceLineaDePersonaCj()`, `extraerCedulaCj()`.
- ⚠️ **Cambio de rumbo sobre la cédula**: en la Etapa 8 se decidió NO guardarla nunca. El usuario
  pidió explícitamente lo contrario acá — la necesita para el control de entrada a Tati Yupi.
  Ahora SÍ se captura, pero **nunca en el nodo público** `campajor.patrullas`: va a un nodo
  nuevo `campajor_privado/<nombrePatrullaSanitizado>/cedulas` (array, mismo orden que
  `integrantes`), con reglas RTDB admin-only (ver sección 6 — **todavía sin publicar**, pendiente
  de que el usuario las pegue en la consola). `sanitizarClaveCj()` reemplaza `. # $ [ ] /` por
  `_` para que el nombre de patrulla sirva de clave de Firebase. Nuevo visor admin-only en
  Patrullas: `#cj-cedulas-viewer` (selector de patrulla + `verCedulasCj()`, hace zip de
  integrantes↔cédulas por índice) — muestra un aviso claro si las reglas no están publicadas
  todavía (detecta `PERMISSION_DENIED`) en vez de un error crudo.
- ⚠️ **Bug encontrado y arreglado**: el widget de Patrullas Inscriptas usaba ids con prefijo
  `cj-insc-*`, que YA estaba tomado por el formulario público de Inscripción de Patrulla
  (`cj-insc-nombre`, `cj-insc-integrantes`). La colisión hacía que `addIntegranteRowCj()` (del
  formulario de inscripción) inyectara sus filas editables dentro del widget de la portada en
  vez del formulario, y que el formulario quedara sin filas. Se renombró todo el widget a
  `cj-inscriptas-*` (sección de Etapa 9 arriba). **Lección: revisar colisiones de id con
  `grep` antes de reusar un prefijo existente**, sobre todo con nombres parecidos como
  `insc`/`inscriptas`.
- ⚠️⚠️ **Bug GRAVE encontrado y arreglado**: al `<div class="form-group">` del campo "Pegar
  lista" (dentro de `#cj-carga-masiva`) le faltaba el `</div>` de cierre. Por HTML5 error-recovery,
  TODO lo que venía después en el documento (botón Previsualizar, preview, `#cj-cedulas-viewer`,
  **`#cj-patrullas-list` — la lista pública de patrullas —**, y de hecho el resto del `<body>`
  entero) quedaba anidado como descendiente de esa tarjeta. Como `#cj-carga-masiva` tiene
  `display:none` para cualquiera que no sea staff, **la lista de patrullas desaparecía por
  completo para el público** (el usuario reportó "no veo nada"). Estaba así desde que se creó
  la carga masiva (Etapa 9), pasó desapercibido porque como admin la tarjeta contenedora SÍ es
  visible. Diagnóstico: `document.getElementById('page-cj-patrullas').outerHTML.length` daba
  210.740 caracteres (se había tragado ranking/reglamento/staff/organización/el torneo entero)
  — bajó a ~11.000 al arreglarlo. **Lección: ante un elemento con `getBoundingClientRect()` en
  {0,0,0,0} o contenido que "desaparece", sospechar de un tag sin cerrar antes que de CSS —
  revisar con `el.parentElement.id` y `document.createElement('div').innerHTML=seg` para ver
  la estructura real que arma el parser, no confiar en una lectura visual del HTML fuente.**
- **Ícono de remera con el color de la patrulla** al lado del nombre (portada, Patrullas,
  Ranking): `detectarColorPatrullaCj(nombre)` busca palabras de color dentro del nombre
  (diccionario `COLORES_PATRULLA_CJ` — naranja, verde musgo, lila, etc.) y `iconoRemeraCj()`
  arma un SVG de remera con ese color de relleno. Sin color detectado, no muestra nada.
- **LOS MBORE** (naranja, 8 integrantes, venía de tabla con celular+cédula+apodo — reformateado
  a mano al formato de bloques) y **JAGUA TIRIKA** (verde musgo, 10 integrantes, formato de una
  línea por persona) — ambas cargadas en producción (ver Etapa 10, vía Admin SDK).

### Etapa 10 — Sesión del 23/09/2026 (Admin SDK: Claude ya puede escribir directo)
- El usuario preguntó por qué Claude no podía cargar las patrullas él mismo. Se le explicó la
  regla (Claude nunca escribe contraseñas — no es limitación técnica, es una regla de seguridad
  que se respeta a propósito) y se ofreció la alternativa: una **service account** de Firebase
  Admin SDK, que bypasea las reglas RTDB por completo y no depende de ningún login.
- **Setup hecho**: `npm init` + `npm install firebase-admin` (quedaron `package.json` y
  `package-lock.json` commiteados). El usuario generó la clave en
  `Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada` y la guardó
  en `C:\JORNADAS\torneo\.secrets\serviceAccountKey.json` (gitignored, ver sección 9.9 para el
  detalle completo y el comando de uso).
  - ⚠️ Truco de la versión moderna del SDK: `admin.credential` **no existe** en el import por
    defecto (`import admin from 'firebase-admin'` da `admin.credential === undefined`) — hay
    que usar la API modular: `import { initializeApp, cert } from 'firebase-admin/app'` y
    `import { getDatabase } from 'firebase-admin/database'`.
- **Las 2 patrullas pendientes (LOS MBORE, JAGUA TIRIKA) se cargaron así**, sin que el usuario
  tocara el navegador — confirmado en producción (`dataCj.patrullas` con las 3 patrullas).
- De acá en más, para cargar una patrulla nueva: pedir el texto, guardarlo en el scratchpad de
  la sesión (nunca en el repo, aunque esté gitignored), y correr
  `node .tools/campajor-cargar-patrulla.mjs "Nombre" ruta\al\texto.txt`.
- **Admin ahora puede editar** (todo con ✏️, admin-only, en Patrullas):
  `renombrarPatrullaCj(i)` (prompt, migra `puntajes`/`premios` que referencian el nombre viejo
  y hace best-effort de mover la clave en `campajor_privado`); `editarIntegranteCj(i,j)` (edita
  el string en el mismo índice — no desincroniza el array paralelo de cédulas; si el integrante
  editado era el jefe, actualiza `p.jefe` también); `editarCedulaCj(idx)` (desde el visor de
  cédulas, click en el valor — lee/escribe `campajor_privado/<clave>/cedulas[idx]`).

### Etapa 11 — Sesión del 27/09/2026 (reconciliación de datos + color estructurado + escudos + datos privados completos)
- **Bug propio detectado y arreglado**: un script mío de corrección de JAGUA TIRIKA (nombre
  apellido real "Lujan Ramirez", no "Lujan Cardozo" + grupos sanguíneos + jefe) buscó el
  registro por nombre exacto, pero el usuario ya lo había renombrado a MAYÚSCULAS
  (`JAGUA TIRIKA (VERDE MUSGO)`) editando desde la app — el match case-sensitive falló y creó
  una **patrulla duplicada** en vez de corregir la existente. Se fusionó a mano (Admin SDK):
  la integración correcta pasó al registro canónico, se borró el duplicado, y se migraron las
  claves huérfanas de `campajor_privado` (habían quedado con el casing viejo, tanto de esta
  duplicación como de un desajuste previo en LOS MBORE) a las claves reales. **Lección: nunca
  asumir el nombre exacto guardado — siempre leer el estado en vivo antes de un script que
  escribe por nombre, sobre todo si el admin pudo haber renombrado algo entre sesiones.**
- **Reconciliación completa confirmada**: "CENTINELAS (BORDÓ)" = la ex "Patrulla Lila (a
  confirmar nombre)", renombrada por el propio usuario con `renombrarPatrullaCj` — es su
  "J52 bordo". El ZIP de Google Forms en Descargas (`Formulario sin título.csv.zip`) contenía
  exactamente 2 respuestas: la corrección de JAGUA TIRIKA (arriba) y una 2ª patrulla nueva de
  10 personas (Alan Martinez líder) que el usuario pidió dejar como **"Formulario 2 (a
  confirmar nombre)"**, totalmente editable, hasta que la nombre. LOS MBORE quedó con jefe
  **Julian Garay** (confirmado por la planilla que pasó el usuario). Sin contradicciones entre
  la lista de 9 patrullas/colores del usuario y lo cargado; quedan sin integrantes: Los Gatis,
  Los Loritos, Caperucitas, keperseguidos, Panteras, Halcones.
- **Color estructurado por patrulla** (`p.color`/`p.color2`, hex): `PALETA_COLORES_CJ` (20
  colores con nombre bonito) + `selectColorCj()` arma un `<select>`; el admin elige el color
  de la patrulla **desde la propia tarjeta** (junto al selector de Subcampo) sin tener que
  pedírselo a Claude. `iconoRemeraCj(p)` ahora recibe el **objeto patrulla completo** (antes
  recibía solo el nombre y dependía de que la palabra apareciera en el nombre vía
  `detectarColorPatrullaCj`, que se mantiene como fallback de compatibilidad para patrullas
  sin color explícito todavía). Si hay `color2`, dibuja una **remera bicolor a rayas
  verticales** (SVG con `clipPath` + dos `rect`) — para keperseguidos 🖤💛 y Halcones 🖤💚.
  `setColorPatrullaCj(i,campo,valor)` guarda. Se actualizaron los 3 call-sites que antes
  pasaban solo el nombre: `renderPatrullasCj`, `renderRankingCj` (ahí no había ni objeto
  patrulla a mano — se armó un mapa `nombre→patrulla` antes de renderizar la lista) y el
  widget "Patrullas Inscriptas" del inicio.
- **Escudos de patrulla** (`p.escudo`, dataURL JPEG comprimido a máx. 300×300 @ calidad .7,
  mismo patrón que `uploadComprobante` del torneo — no requiere Firebase Storage, vive
  adentro del nodo RTDB de la patrulla): thumbnail de 44×44 al lado del nombre en la tarjeta de
  Patrullas; si sos admin y no hay escudo, un placeholder 🛡️ clickeable abre el selector de
  archivo (`subirEscudoCj(i,input)`); con escudo cargado, click para reemplazar o "quitar"
  (`quitarEscudoCj(i)`, con `confirm()`).
- **Visor "🪪 Datos privados · solo Staff" ampliado** (antes solo mostraba/editaba cédula):
  ahora es una tabla por integrante con **cédula, celular, fecha de nacimiento y alergias**
  (todas editables con click → `prompt()`, función genérica `editarCampoPrivadoCj(idx,campo,
  label)`) más una **casilla de "foto familiar entregada"** (`toggleFotoFamiliarCj(idx)`,
  array paralelo `fotosFamiliares` en `campajor_privado/<clave>`). Todo vive en el mismo nodo
  admin-only de siempre, nada nuevo en las reglas RTDB (sección 6 ya las contemplaba).
- **Grupo sanguíneo público**: ya venía apareciendo en el texto del integrante ("· A+") para
  JAGUA TIRIKA y Formulario 2 desde la reconciliación; falta agregarlo para LOS MBORE y
  CENTINELAS (no se tenía el dato transcripto en esta sesión) y no se automatizó todavía en
  el parser de carga masiva (`parseCargaMasivaCj`) — sigue siendo edición manual por integrante
  vía `editarIntegranteCj`.
- ⚠️ **Pendiente de verificar**: si las reglas de `campajor_privado` (sección 6) ya fueron
  publicadas por el usuario en la consola — probado en este preview (sin sesión de staff) dio
  `PERMISSION_DENIED` con el mensaje gracioso esperado, lo cual es normal SIN estar logueado
  como admin real; falta que el propio admin abra el visor logueado para confirmar que lee bien.
- sw subió a **v3.40**.

### Etapa 12 — Sesión del 28/09/2026 (portal del jornadista: acceso por patrulla, grito de guerra, dashboard de staff)
- **Pedido del usuario**: que los inscriptos (de patrullas ya oficiales, no solo autoinscripciones
  online) tengan un espacio propio para ver la esencia y las demás patrullas, entrar con una
  clave que el staff les va a compartir, cargar el grito de guerra de su patrulla, ver su
  puntaje, y chequear si ya entregaron sus fotos familiares — todo visible también para el
  staff en un dashboard.
- **Nueva pestaña pública "🎒 Qué llevar"** (`#page-cj-quellevar`, entre Cronograma y Postas):
  checklist de qué llevar / qué no llevar al CAMPAJOR, más una tarjeta "¿Qué te vas a encontrar?"
  que abre curiosidad sobre el Tesoro sin spoilear, cerrando con el "¡Viví tu momento!" ya
  establecido como respuesta a quien pregunta de más. Contenido hardcodeado, sin nodo Firebase.
- **Acceso por patrulla para las patrullas OFICIALES** (las que carga el admin directo en
  `campajor.patrullas` — CENTINELAS, LOS MBORE, JAGUA TIRIKA, Formulario 2 — a diferencia de
  las que se autoinscriben online): en vez de inventar un nodo/regla RTDB nueva, se reusa el
  mecanismo YA PUBLICADO de `campajor_inscripciones/$pin` (el PIN es la llave: quien lo conoce
  puede leer/editar ESE registro, nadie puede listar el nodo completo salvo el admin). El admin
  tiene un botón **"🔑 Acceso"** en la tarjeta de cada patrulla (`accesoPatrullaCj(i)`, en
  Patrullas): si la patrulla no tiene clave todavía, sortea un PIN de 6 dígitos y crea un
  registro `campajor_inscripciones/<PIN>` con `esOficial:true` (copia nombre/jefe/integrantes,
  celular/correo vacíos, `estado:'aprobada'`) y se lo muestra en un `prompt()` para copiarlo y
  pasárselo a la patrulla por WhatsApp; si ya existe, vuelve a mostrar el mismo PIN. Login: el
  mismo de siempre (botón Entrar → PIN) — `doLogin()` no necesitó ningún cambio, ya buscaba en
  `campajor_inscripciones/<pin>`.
  - Los registros `esOficial:true` se **excluyen** de la bandeja "📥 Inscripciones online" del
    admin (esa es para revisar autoinscripciones nuevas, no para listar los accesos ya armados).
  - `_persistirMiPatrulla`/`guardarMiPatrulla` tratan a las oficiales distinto: no se marcan
    `estado:'editada'` al guardar (no tiene sentido, no hay revisión pendiente) y jefe/celular
    dejan de ser obligatorios para guardar (una patrulla oficial ya tiene esos datos manejados
    por el staff en su tarjeta — acá solo hace falta el nombre).
- **"Mi patrulla" ampliada** (`renderMiPatrullaCj`): se agregó un textarea **"📣 Grito de
  guerra"** (campo nuevo `grito` en el registro de `campajor_inscripciones/<pin>`, se guarda
  con el mismo botón "Guardar cambios"); una tarjeta de solo lectura **"🏆 Tu puntaje"**
  (`puntajeYPosicionCj(nombre)`, misma cuenta que el Ranking público, busca la patrulla por
  nombre en `dataCj.patrullas`); y una tarjeta de solo lectura **"📸 Fotos familiares"** con un
  ✅/⬜ por integrante de la lista OFICIAL (no de la copia local editable, para no desalinear
  índices si alguien edita "Mi patrulla" sin que el admin vuelva a aprobar).
- **`fotosFamiliares` se movió de `campajor_privado` al objeto PÚBLICO de la patrulla**
  (`campajor.patrullas[i].fotosFamiliares`, array paralelo a `integrantes`): no es un dato
  sensible (solo sí/no de si entregó una foto), así que no hace falta la regla admin-only — y
  así la propia patrulla lo puede leer desde "Mi patrulla" sin pedir ninguna regla nueva. Se
  migraron con un script puntual (Admin SDK, corrido y borrado) los 2 registros que ya lo tenían
  cargado (JAGUA TIRIKA y Formulario 2). El visor admin "🪪 Datos privados" sigue mostrando y
  tildando la casilla igual que antes (`toggleFotoFamiliarCj` ahora escribe en `campajor` vía
  `saveCj`, no en `campajor_privado`); cédula/celular/fecha/alergias siguen en `campajor_privado`
  (esos sí son sensibles, con la regla admin-only vigente).
- **Dashboard de staff** (`#cj-dashboard-staff`, arriba de todo en la pestaña Ranking,
  admin-only): por cada patrulla oficial, de un vistazo — puntaje + puesto, avance de fotos
  familiares (ej. "3/10 — faltan 7"), y el grito de guerra si ya lo cargaron (leído de
  `campajor_inscripciones` filtrando `esOficial:true`, cruzado por nombre).
- **Fix de confiabilidad de paso**: `aprobarInscripcionCj` (cuando el admin aprueba una
  autoinscripción online) antes REEMPLAZABA el registro oficial entero con
  `{nombre,jefe,integrantes,subcampo}`, perdiendo `color`/`color2`/`escudo`/`fotosFamiliares` si
  esa patrulla ya los tenía cargados. Ahora los preserva desde el registro anterior.
- sw subió a **v3.41**.

### Etapa 13 — Sesión del 28/09/2026, más tarde (fecha corregida a 17-18/10, orden del Inicio, grito del plantel editable, 6 patrullas nuevas)
- **Fecha del CAMPAJOR corregida**: el usuario avisó que finalmente es **sábado 17 y domingo
  18 de octubre de 2026** (antes se venía manejando 11-12/10 desde la Etapa 3). Se actualizó el
  chip del Inicio, los títulos del Cronograma (`Sábado 17/10`/`Domingo 18/10`) y esta biblia.
  Verificado: el 17/10/2026 cae sábado. ⚠️ Si vuelve a cambiar, buscar "17/10"/"18/10" en
  `index.html` — solo 2 lugares.
- **"Qué llevar" — se agregó "🚭 Cigarrillos, vapeadores o cualquier elemento de vapeo"** a la
  lista de lo que NO hay que llevar (Etapa 12 había armado la pestaña pero sin este ítem).
- **Reordenamiento del Inicio de CAMPAJOR** (feedback directo: "se ve muuuuchas cosas con letras
  pequeñas y todo mezclado"): `#cj-inicio-columns` pasó de CSS multi-column (masonry, con orden
  de lectura impredecible — llenaba una columna entera antes de pasar a la siguiente, mezclando
  visualmente el contenido) a **CSS grid** de 2 columnas (`repeat(auto-fit, minmax(420px,1fr))`,
  `max-width:900px`) con orden de lectura normal (izquierda-a-derecha, fila por fila). La
  tarjeta "Lema 2026" (la más larga, con "El camino del Tesoro") ahora ocupa **todo el ancho**
  (`grid-column:1/-1`) en vez de competir en una columna angosta. Se reordenaron las tarjetas
  restantes para que las de altura parecida queden emparejadas en la misma fila (Qué incluye +
  Oración entre sí, Esencia + Subcampos entre sí) — con `align-items:stretch` por defecto de
  grid, emparejar alturas distintas dejaba una tarjeta con un montón de espacio vacío abajo.
- **El "Grito de Guerra" (el de todo el plantel/CAMPAJOR, no el de cada patrulla) se sacó de la
  portada pública y se movió a Staff** (`#page-cj-funciones`, arriba de la tarjeta de "Borrador
  del plantel"): el usuario aclaró que ese grito es "de nuestro plantel de integración", o sea
  contenido de organización, no algo que necesite estar en la portada para cualquier visitante.
  De paso pidió que sea **editable** ("que sea editable el grito tambien") — se sacó del HTML
  hardcodeado y pasó a `dataCj.gritoPlantel` (string libre, default = el texto original vía
  `GRITO_PLANTEL_DEFAULT_CJ`, seteado en `normCj`). `renderGritoPlantelCj()` (llamada desde
  `showCj('funciones')`) muestra un `<textarea>` + botón "💾 Guardar grito" si sos admin, o el
  texto ya formateado (con saltos de línea) si sos viewer con el código `TESORO26` sin ser
  admin. **Ojo, esto es DISTINTO del grito por patrulla** de "Mi patrulla" (Etapa 12, campo
  `grito` en `campajor_inscripciones/<pin>`) — dos conceptos separados que conviven: el del
  plantel (uno solo, en Staff) y el de cada patrulla (uno por patrulla, en su propio panel).
- **Se cargaron las 6 patrullas que faltaban de la lista del usuario** (Admin SDK, sin
  integrantes todavía — "todo editable" como pidió, el admin las completa cuando tenga los
  datos), ya con su color de remera estructurado (`color`/`color2`) para que el ícono aparezca
  desde ya en Patrullas/Ranking:
  · Los Gatis — gris `#9aa0a6` · Los Loritos — verde `#00e676` · Caperucitas — rojo `#ff5a5a`
  · keperseguidos — bicolor negro `#3a3a3a` + amarillo `#ffc828`
  · Panteras — morado `#8e44ad` · Halcones — bicolor negro `#3a3a3a` + verde militar `#5a6b3f`
  Total: **10 patrullas** en `campajor.patrullas`.
- sw subió a **v3.42**.

### Etapa 14 — Sesión del 28/09/2026, tarde-noche (camino del Tesoro a Staff, color del plantel a marrón, 4 vasijas, postas/juegos editables con líder+integrantes)
- **"El camino del Tesoro" (los 6 pasos del recorrido espiritual, dentro de la tarjeta Lema) se
  sacó del Inicio público y se movió a Staff** ("eso no deben ver los que no son de staff"),
  tarjeta nueva con borde dorado (no rojo-spoiler, es organizativo no un secreto de juego) justo
  después de la intro de "Nuestro equipo".
- **"El plantel de integración viste el AMARILLO" también se sacó del Inicio** (mismo pedido) y
  **cambió a MARRÓN** — el usuario avisó que el color final del plantel ya no es amarillo. Ahora
  vive como cierre de esa misma tarjeta en Staff. Actualizado también el comentario en el código
  (`SUBCAMPOS_CJ`) para que no quede desactualizado.
- **Layout del Inicio ajustado más**: el widget "Patrullas Inscriptas" se veía desalineado con el
  hero cuando la patrulla mostrada tenía muchos integrantes (quedaba mucho más alto/angosto que
  el hero, "descentrado"). Fix: `align-items:center` en la fila flex del hero+widget (antes
  `flex-start`), el widget ahora usa `align-self:stretch` + `display:flex;flex-direction:column;
  justify-content:center` para centrarse verticalmente, y `#cj-inscriptas-integrantes` tiene
  `max-height:190px;overflow-y:auto` para que una patrulla con muchos integrantes no desborde el
  widget — scroll interno en vez de estirar todo el bloque.
- **"Las 4 vasijas" — acertijos de apertura** (Staff, tarjeta spoiler roja nueva después del
  "Borrador del plantel"): idea del plantel (contexto del usuario: 4 vasijas, una por subcampo,
  cada una con su acertijo — al resolverlo se abre y muestra la palabra de la virtud + reflexión;
  después oración inicial y arranca la fogata; el cofre final es la perla con la Cruz, el
  verdadero Tesoro = encontrarse con el Flaco). 4 acertijos, uno por subcampo/color: Santo
  Tomás·Fe·Blanco y San Pedro·Sabiduría·Azul los pasó el usuario tal cual (WhatsApp, 16/09), el
  de Santiago·Esperanza·Verde también, y el de **San Juan·Caridad·Rojo lo escribió Claude**
  siguiendo el mismo estilo poético (marcado explícitamente como propuesta de Claude para que el
  plantel lo revise).
- **Postas y Juegos dejan de ser hardcodeados-de-solo-lectura y pasan a ser editables por el
  admin**, con un modal de detalle al hacer click en cualquier tarjeta ("Ver más / editar ›"):
  - `POSTAS_CJ`/`JUEGOS_CJ` (los arrays fijos en el código) pasan a ser solo la **semilla**:
    `normCj` copia su contenido a `dataCj.postas`/`dataCj.juegos` la PRIMERA vez que no existen
    todavía (`if(!d.postas){...}`), y de ahí en más esos arrays en `dataCj` son la fuente real —
    viven en Firebase (`campajor.postas`/`campajor.juegos`) igual que patrullas/puntajes.
  - `parseRespCj(resp)` parsea el viejo campo de texto libre `resp` ("Sofía, Teto y Calixto") a
    un array de integrantes, usado solo en el momento de la siembra inicial.
  - Modal `#cjDetalleModal` (nuevo, mismo patrón que los demás modales de la app) +
    `abrirDetalleCj(tipo,n)` / `renderDetalleCj()` / `cerrarDetalleCj()`: admin ve inputs
    editables (nombre, explicación, materiales, y según el tipo: oración/consigna/video para
    postas o seguridad para juegos) más **líder** (texto libre) e **integrantes** (chips
    editables, mismo patrón que "Mi patrulla") del equipo de staff a cargo de ese puesto;
    cualquier otro visitante ve el detalle de solo lectura, incluido el equipo a cargo si ya
    está cargado. `guardarDetalleCj()` guarda todo con `saveCj`.
  - Las tarjetas de la lista (`renderPostasCj`/`renderJuegosCj`) ahora muestran "👑 Líder +N" si
    ya hay equipo asignado, y un "Ver más / editar ›" al pie.
  - **Líderes reales de las 5 postas cargados** (WhatsApp del usuario, 28/09): P1 Palo Borracho →
    Massi + María Gloria · P2 Rondana con asiento → Candonga + Lorenzo · P3 La Lagartija →
    Fabiana + Rodrigo Dure · P4 Pasa agua → Andrés + Selva · P5 Pasa huevo → Leslie + Fabio.
    Cargado directo en Firebase vía Admin SDK (`campajor.postas`/`campajor.juegos` no existían
    todavía ahí — se verificó antes de escribir). **Los juegos (24) quedan sin líder/integrantes
    — "a confirmar" según el usuario**, el admin los va completando desde el modal de cada uno.
  - **Alta y baja de postas/juegos**: pedido de seguimiento del usuario ("que sea editable para
    cargar despues los juegos en postas... y los otros juegos que no son postas") — antes solo
    se podían editar las 5 postas y 24 juegos ya sembrados, no agregar nuevos. Botón
    "+ Agregar posta"/"+ Agregar juego" (admin-only, arriba de la grilla, `cj-postas-admin`/
    `cj-yincanas-admin`) crea un ítem en blanco con el siguiente `n` correlativo y abre directo
    el modal de detalle para completarlo (`agregarPostaCj()`/`agregarJuegoCj()`). El modal de
    detalle suma un botón **"🗑️ Eliminar"** (`eliminarDetalleCj()`, con `confirm()`) para dar de
    baja una posta/juego cargado de más. El título de la pestaña Juegos pasó de "Juegos (24)" a
    "Juegos" a secas, ya que el número ahora puede cambiar.
  - **Cronograma (sábado/domingo) también pasó a editable**, mismo patrón semilla-y-Firebase que
    postas/juegos: `CRONO_SAB_CJ`/`CRONO_DOM_CJ` (arrays fijos `[hora,actividad]`) quedan como
    default, `normCj` los copia a `dataCj.cronoSab`/`dataCj.cronoDom` (objetos `{hora,
    actividad}`) la primera vez. Cada fila tiene ✏️ (`editarCronoCj(dia,i)`, 2 prompts) y ×
    (`quitarCronoCj(dia,i)`, con confirm) para el admin, más un par de inputs + "+ Agregar"
    (`agregarCronoCj(dia)`) al pie de cada día para sumar actividades nuevas.
- sw subió a **v3.43**.

### Etapa 15 — Sesión del 28/09/2026, noche (escudo también en el Inicio + accesos de Staff múltiples)
- **Escudo de patrulla visible en el widget "Patrullas Inscriptas" del Inicio** (antes solo se
  veía en la tarjeta de Patrullas): `<img id="cj-inscriptas-escudo">` nueva arriba del nombre en
  el widget, `renderInscriptosCj()` la muestra/oculta según `p.escudo` exista o no. El usuario ya
  había subido el escudo real de LOS MBORE desde la app (un tigre/león) — se confirmó con
  captura que ahora aparece también ahí.
- **Accesos de Staff múltiples** — pedido del usuario: poder crear, desde la propia app y como
  admin, logins nuevos para otras personas del plantel con los MISMOS permisos que
  `hassan.chaar@gmail.com` (hasta ahora el único email hardcodeado en las reglas RTDB).
  Confirmado con el usuario antes de tocar nada (pregunta explícita, dado que es un cambio de
  seguridad que toca TODA la app): permisos iguales al admin actual, y el mecanismo es que **el
  propio admin elige nombre + contraseña ahí mismo** (no un link de restablecimiento por mail).
  - **Nuevo nodo `admins/<uid>: {nombre, email}`** (uid = Firebase Auth UID, no el email — así
    no hace falta sanitizar el email dentro de las reglas, que solo soportan `.replace()` de UNA
    ocurrencia por llamada, nada práctico para emails con varios puntos). Pertenecer a este nodo
    = tener los mismos permisos que `hassan.chaar@gmail.com` en TODAS las reglas (ver sección 6).
  - **`isFbAdmin()`** ahora es `email===ADMIN_EMAIL || _esStaffExtra` (`_esStaffExtra` es un
    booleano cacheado, seteado una vez por login vía `onAuthStateChanged`: si el email logueado
    NO es el hardcodeado, se consulta `admins/<uid>` una sola vez de forma async y se cachea —
    `isFbAdmin()` en sí sigue siendo síncrona, no puede volverse async sin romper todos sus usos).
    `currentUser` pasa a `{type:'admin', nombreStaff:v.nombre}` para los accesos extra, y el
    badge (`updateUserBadge`) muestra ese nombre en vez de "Admin" genérico.
  - **Crear un acceso** (`crearAccesoStaffCj()`, tarjeta "🔐 Accesos de Staff" arriba de todo en
    Staff, admin-only — invisible para viewers con el código `TESORO26`): usa una **instancia
    SECUNDARIA de Firebase** (`firebase.initializeApp(firebaseConfig, 'staffAlt_'+Date.now())`)
    para `createUserWithEmailAndPassword` — si se hiciera en la instancia principal, crear la
    cuenta nueva **desloguearía al admin actual** (comportamiento estándar del SDK de Firebase
    Auth: crear usuario autentica como ese usuario en la instancia donde se llama). Tras crear,
    escribe `admins/<uid>`, cierra sesión de la instancia secundaria y la borra (`.delete()`) —
    la sesión del admin que está usando la app en ningún momento se ve afectada.
  - **Quitar un acceso** (`quitarAccesoStaffCj(uid)`, con `confirm()`): borra `admins/<uid>`.
    NO borra la cuenta de Firebase Auth en sí (eso requeriría Admin SDK) — alcanza con quitarle
    el permiso: sin figurar en `admins`, las reglas RTDB le niegan cualquier escritura, y
    `isFbAdmin()`/`currentUser` tampoco la tratan como admin en el próximo login.
  - ⚠️ **Reglas de Firebase actualizadas en la sección 6 — TODAVÍA NO PUBLICADAS.** Hasta que el
    usuario las pegue en la consola (runbook 9.4), "Crear acceso" da un aviso claro de
    `PERMISSION_DENIED` en vez de fallar feo (mismo patrón que `campajor_privado`). El admin
    original sigue funcionando exactamente igual mientras tanto — el `||` en las reglas nuevas
    evalúa primero el email hardcodeado, así que no depende de `admins` para nada.
  - **Confirmado con el usuario que "accesos de usuarios normales"** = el acceso por patrulla
    que ya existía (Etapa 12, botón "🔑 Acceso" + "Mi patrulla" con grito/puntaje) — no hacía
    falta nada nuevo ahí, ya cumple "que vean todo lo público + su propia patrulla, agreguen su
    grito y vean su puntaje".
- sw subió a **v3.44**.

### Etapa 16 — Sesión del 28/09/2026, noche (widget/escudo más grandes, pestaña Finanzas)
- **Widget "Patrullas Inscriptas" agrandado dos veces** por feedback directo (primero se ensanchó
  380→520px con escudo a 84px; el usuario pidió más porque los escudos "aún no se ven bien" →
  520→640px de ancho máximo, escudo a **130×130px**). `min-width` del bloque de nombre subió a
  260px para que cada integrante entre en una sola línea sin cortarse.
- **Nueva pestaña "💰 Finanzas"** (`#page-cj-finanzas`, nav `navCjFinanzas`) — **admin-only, ni
  siquiera el código `TESORO26` la ve** (a diferencia de Staff/Organización): son montos de
  plata, no contenido espiritual/organizativo. Confirmado el diseño con el usuario antes de
  programar (3 preguntas): visibilidad solo-admin, categorías de texto libre (sin lista fija),
  y presupuesto comparado **por categoría** contra los egresos reales (no un total único).
  - **Nodo nuevo `campajor_finanzas`** (admin-only, mismo patrón `email hardcodeado || admins`
    que el resto) — **nunca** dentro de `campajor` (que es de lectura pública). Estructura:
    `{ movimientos:[{id,tipo:'ingreso'|'egreso',categoria,descripcion,monto,fecha}],
    presupuesto:[{categoria,monto}] }`. Sin sync en vivo — se lee con `.once('value')` cada vez
    que se entra a la pestaña (mismo patrón que `campajor_privado`/inscripciones online), cache
    local en `_dataFin`.
  - `renderFinanzasCj()` pinta 3 bloques: **resumen** (ingresos/egresos/saldo totales),
    **planificado vs. gastado por categoría** (`_pintarCategoriasFinanzasCj` — junta categorías
    de `presupuesto` y de los egresos de `movimientos`, barra de progreso que se pone roja y
    avisa "Te pasaste por Gs. X" si el gasto superó lo planificado) y **listado de movimientos**
    (ordenado por fecha descendente, ingreso en verde, egreso en rojo).
  - Formularios admin: cargar movimiento (tipo/categoría/descripción/monto/fecha, con
    `<datalist>` de categorías ya usadas para autocompletar) y cargar/actualizar presupuesto por
    categoría (`agregarPresupuestoCj()` — si la categoría ya tenía presupuesto, actualiza el
    monto en vez de duplicar). Eliminar movimiento e eliminar línea de presupuesto, ambos con
    `confirm()`.
  - Igual que `admins` (Etapa 15), la regla de `campajor_finanzas` está en la biblia (sección 6)
    pero **todavía no publicada** — hasta entonces la pestaña muestra el aviso de
    `PERMISSION_DENIED` en vez de romper.
- sw subió a **v3.46**.

### Etapa 17 — Sesión del 28/09/2026, noche (roster "Plantel J52" + carga real de Finanzas desde Excel del usuario)
- El usuario adjuntó **2 archivos de Descargas** con datos reales para cargar "donde corresponda":
  `CARGO CAMPAJOR.xlsx` (roster de personas+cargo del plantel J52) y
  `Caja_Plantel_Integracion.xlsx` (caja real del plantel de integración, con movimientos desde
  el 11/08/2026).
- **Nueva sección "👥 Plantel J52 · quién es quién"** en Staff (`page-cj-funciones`, después de
  la intro "Nuestro equipo"): lista de personas con su cargo, agrupada en "Plantel Integración
  J52" / "Plantel Apoyo J52" (mismos 2 grupos del Excel). Dato nuevo `dataCj.plantel:
  [{nombre,cargo,grupo}]` (array plano, en el nodo público `campajor` — misma sensibilidad que
  el resto del contenido de Staff, gateado igual que toda la pestaña por `isAdmin()` o el
  código `TESORO26`). Admin-only: agregar (`agregarPlantelCj()`), editar con 2 prompts
  (`editarPlantelCj(i)`) y quitar con confirm (`quitarPlantelCj(i)`).
  - **Se cargaron las 34 personas del Excel** (21 en Integración + 13 en Apoyo — coincide con
    la numeración 1-21/1-13 del propio archivo) vía Admin SDK, verificado antes de escribir que
    `campajor.plantel` no tuviera datos ya cargados (para no duplicar si se corre dos veces).
  - **Cruce con las postas ya cargadas (Etapa 14) — confirma que coinciden**: el Excel de cargos
    aclara que "Candonga" (que yo tenía como líder de la Posta 5 desde un WhatsApp previo del
    usuario) no aparece con ese nombre en el roster — la Posta Nº 5 según el Excel es **Pedro
    Perez + Lorenzo Bogado**. Probablemente "Candonga" es el apodo de Pedro Perez, pero **no se
    tocó lo ya cargado en `dataCj.postas` por las dudas** (evitar el error de la Etapa 11: nunca
    asumir sin confirmar) — pendiente que el usuario confirme si son la misma persona.
- **Finanzas reales cargadas** (`campajor_finanzas.movimientos`, 17 registros) desde el Excel de
  caja: el saldo base del 11/08 (Gs. 12.676.550) se cargó como un **ingreso especial** con
  categoría "Saldo Base" (el modelo de la app no tiene un campo de saldo inicial aparte — sumar
  el saldo base como ingreso da el mismo resultado matemático y es la forma más simple de no
  perder precisión). Categorías asignadas (el Excel no traía columna de categoría, se
  categorizó a partir de la descripción de cada movimiento): **Remeras** (ingresos por venta +
  egresos de transferencias por remeras), **Patrullas** (los 6 ingresos por inscripción de
  patrulla: Los Gatis, Lorito Oga, Mbore, J52, Jagua Tirika, Halcones), **Compras** (compras del
  centro), **Materiales** (impresión de imágenes), **Yerberos** (2 transferencias). Verificado
  matemáticamente antes de cargar: ingresos totales 14.796.550 (2.120.000 reales + el saldo
  base) − egresos 7.034.000 = **saldo 7.762.550**, exactamente el "Saldo Actual en Caja" que
  muestra el Excel — cuadra perfecto.
  - **No se cargó** (quedó fuera del modelo actual, son datos de reconciliación manual del
    Excel que no tienen campo equivalente en la app): quién tiene físicamente la plata de cada
    patrulla (Fabi y Moni retuvieron Gs. 900.000 cada una de sus cobros, según una nota aparte
    del Excel), el "pendiente de reponer a la Cordi" de Gs. 198.000, y el "saldo final" ajustado
    de Gs. 5.764.550 que resta esas retenciones — la app solo calcula ingresos−egresos=saldo,
    sin noción de "quién custodia" cada monto. Si el usuario lo necesita, se puede sumar un
    campo `responsable` a los movimientos más adelante.
  - Verificado con una segunda lectura vía Admin SDK (no solo el log del script) que
    `campajor.plantel` (34) y `campajor_finanzas.movimientos` (17) quedaron escritos.
- Los 2 archivos `.xlsx` quedaron en la carpeta Descargas del usuario — no se copiaron al repo
  ni al scratchpad de la sesión (se leyeron directo desde su ubicación original con pandas/
  openpyxl y no se necesitó nada más).
- **Layout del hero de Inicio corregido** (feedback directo con captura: "le quita protagonismo
  [al título] y no queda centrado" el widget de Patrullas Inscriptas al lado): al agrandar el
  widget/escudo en los pasos anteriores de esta misma sesión, el layout de 2 columnas lado a
  lado (hero + widget, decisión original de la Etapa 9) dejó de funcionar — el widget competía
  visualmente con el título CAMPAJOR. Se volvió a **apilar verticalmente**: el hero ocupa todo
  el ancho y queda centrado y protagonista arriba; el widget de Patrullas Inscriptas pasa a ser
  un bloque secundario debajo, centrado, `max-width:520px`, escudo bajado a 110×110px (ya no
  necesita competir por espacio con nada).
- sw subió a **v3.48**.

### Etapa 18 — Sesión del 28/09/2026, noche (bug de overflow horizontal en mobile)
- El usuario avisó: "en celular [no] entre en pantalla, hay secciones que no se ven todo". Se
  probó con `resize_window` (preset mobile, 375px) y se confirmó `document.body.scrollWidth`
  mayor al viewport en el Inicio de CAMPAJOR.
- **Causa raíz**: `#cj-inicio-columns` (la grilla de 2 columnas armada en la Etapa 13) usaba
  `grid-template-columns: repeat(auto-fit, minmax(420px, 1fr))`. Con `auto-fit` y un solo
  bloque restante (como pasa en pantallas angostas), el navegador igual fuerza ese bloque a
  **420px mínimos** — más ancho que cualquier celular — aunque el contenedor mida 375px. El
  arreglo intuitivo `minmax(min(420px, 100%), 1fr)` (documentado como solución estándar para
  este problema) **no funcionó acá**: el `100%` dentro de `min()` no se resolvió contra el
  ancho del contenedor en el contexto de `auto-fit` con repetición automática — quirk conocido
  de la spec (el porcentaje dentro del mínimo de un `minmax()` en un `repeat()` automático
  puede tratarse como indefinido). **Se probó y confirmó** el mismo patrón `minmax(min(Npx,
  100%),1fr)` SÍ funciona bien en grillas con más ítems variables (`cj-postas-list`,
  `cj-yincanas-list`, etc.) — el problema es específico de mezclar `auto-fit` + `min()` + pocos
  ítems/algunos con `grid-column:1/-1` (span completo).
  - **Fix aplicado en `#cj-inicio-columns`**: se abandonó `auto-fit`/`minmax` y se pasó a un
    patrón más simple y confiable — `grid-template-columns: repeat(2, minmax(0, 1fr))` fijo,
    más un `@media (max-width: 820px) { grid-template-columns: 1fr; }` para colapsar a una sola
    columna en mobile/tablet. Verificado en ambos anchos (375px mobile y desktop): en desktop
    sigue viéndose igual que antes (Lema y "Solo recuerda" a todo el ancho vía su propio
    `grid-column:1/-1`, el resto emparejado de a 2), en mobile ya no desborda.
  - **Se aplicó el mismo `minmax(min(Npx,100%),1fr)` de forma preventiva** a las demás grillas
    `auto-fit` del sitio (`cj-postas-list`, `cj-yincanas-list`, `reglamentoTopGrid`,
    `staffRolesGrid`, `orgGrid`) — esas SÍ resuelven bien con ese patrón (confirmado con
    `getComputedStyle` en 375px), se dejaron así en vez de migrarlas también a media queries
    fijas para no tocar de más código que ya andaba bien.
  - Se revisaron TODAS las pestañas de CAMPAJOR y del Torneo en 375px (`document.body.
    scrollWidth` vs `window.innerWidth`) — ninguna otra tenía overflow horizontal.
  - **Lección para la próxima vez que algo "no entra en el celular"**: no asumir por lectura de
    código que un `minmax(min(Npx,100%),1fr)` va a andar — probarlo con `resize_window` preset
    mobile + `getComputedStyle(...).gridTemplateColumns` antes de darlo por solucionado (acá
    hizo falta un segundo intento porque el primer fix "correcto en teoría" no se resolvía
    igual en la práctica con `auto-fit`).
- sw subió a **v3.49**.

### Etapa 19 — Sesión del 29/09/2026 (link de fotos de Google Drive por integrante, solo Staff)
- Pedido del usuario: agregar un link de fotos (Google Drive) por integrante de cada patrulla —
  aclaró de entrada que **solo Staff lo debe ver**, nada público en Inicio ni en la lista
  general de patrullas.
- **Nuevo campo `fotosLink`** en `campajor_privado/<clave>` (array paralelo a `integrantes`,
  mismo patrón que `cedulas`/`celulares`/`fechasNacimiento`/`alergias` — admin-only, nunca en el
  nodo público `campajor`). No hizo falta tocar `editarCampoPrivadoCj` (ya era genérica para
  cualquier campo) — solo se agregó la columna nueva en la tabla de "🪪 Datos privados" de
  Patrullas: si hay link, muestra "📷 Ver fotos" (abre en pestaña nueva) + ✏️ para cambiarlo; si
  no hay, "— agregar link" clickeable (mismo patrón visual que cédula/celular/etc.).
- sw subió a **v3.50**.

### Etapa 20 — Sesión del 29/09/2026 (nombres reales en Manual de Funciones, Plan del día editable, rediseño del panel de datos privados)
- **Manual de Funciones (Staff)**: cada tarjeta de rol mezclaba el título con las etiquetas
  (ayudantes/virtud/subcampos) en la misma línea, lo que cortaba mal el título (screenshot del
  usuario). Se separó: título del cargo en su propia línea, badges en una línea aparte debajo.
- **Se agregaron los nombres reales de quién ocupa cada cargo este año**, cruzando el roster
  "Plantel J52" (Etapa 17) con cada tarjeta — nueva caja "👤 A cargo este año (Plantel J52)" en
  cada una:
  - Jefe de Subcampo: Sto. Tomás → Mónica Fernández + Denis González · Santiago → Karen Aquino +
    Jhonatan Amarilla · San Juan → Mónica Zárate + Enrique Garay · San Pedro → Carlos Britos +
    Alba Perez.
  - Jefe de Espiritualidad: Jadichi Escobar + Nery Miranda (ayudantes: Fabiana Centurión, Andrés
    Flecha, Fabio Rivas, Georgia Ramírez, Rodrigo Duré).
  - Jefe de Fogón: el roster **no marca un jefe único** — solo aparece la etiqueta "NOCHE DEL
    FUEGO" como tarea compartida de Mónica Fernández, Karen Aquino, Carlos Britos, Hassan
    Mustafa, Luis Fernando y Selva Cantero (gente que YA tiene otro rol principal) — se dejó
    documentado tal cual está, sin inventar un jefe que el archivo no especifica.
  - Jefe de Cocina: Arturo López (ayudantes: Javier Coronil, Walter Maidana, Ivan Ramírez,
    Leslie Francou Chaar).
  - Jefe de Limpieza General: Pedro Perez (sector masculino) + Fátima Melgarejo (sector
    femenino), con 8 ayudantes.
  - Jefe de Utilería de Juegos: Lorenzo Bogado (ayudantes: Emilce Acosta, Adrían Massi, Hugo
    Villalba, Luis Fernando).
  - Líder de Grupo · Jefe de Campo: Hassan Mustafa (Líder de Grupo) + Rolando Ledesma (Jefe de
    Campo) + Richard Fernández (Sub Jefe de Campo) + Fátima Ovelar/Gerónimo Rodriguez
    (Coordinación) — el roster trae "Coordinador" como cargo propio, sin tarjeta dedicada
    todavía; se sumó dentro de la de Líder de Grupo por ahora.
- **"📝 Plan del día — borrador"** — nueva tarjeta en Organización: un `<textarea>` libre
  (`dataCj.planDiaBorrador`, admin-only, botón "Guardar borrador") para que el usuario anote el
  cronograma del día como se le vaya ocurriendo (recepción, postas, almuerzo, baño y aseo,
  juegos, etc.) sin preocuparse por prolijidad — cuando termine, pide que se le dé formato. A
  propósito NO se auto-formatea ni se conecta con `cronoSab`/`cronoDom` (Etapa 14) — es un
  scratchpad aparte, más simple, tal como lo pidió el usuario.
- **Panel "🪪 Datos privados" (Patrullas) rediseñado**: pasó de una `<table>` ancha (necesitaba
  scroll horizontal, y el usuario avisó que "aún no vi el campo para link de fotos" — probable
  causa real: el cambio de la Etapa 19 nunca se había deployado todavía) a una **lista vertical,
  un bloque por integrante** — nombre + casilla de foto arriba, cédula/celular/fecha/alergias en
  una fila que se ajusta sola, y el **link de fotos en su propia línea debajo, bien visible**
  ("Ver fotos" en dorado si ya está cargado, o "agregar link de fotos" clickeable) — pedido
  explícito del usuario ("uno debajo de otro y al lado el espacio del link"). Sin `overflow-x`,
  se acomoda solo en mobile por ser flex-wrap en vez de tabla.
- sw subió a **v3.51**.

---

## 3. Cuentas y accesos (CRÍTICO para trabajar desde otra máquina)

| Servicio | Cuenta | Rol / Notas |
|---|---|---|
| **Firebase** (proyecto `torneo-mjjsxx`) | `hassan.chaar@gmail.com` | Único dueño/admin del proyecto Y único email autorizado a escribir por las reglas RTDB. La consola se abre con esa cuenta de Google. |
| **Firebase Auth (login staff en la app)** | `hassan.chaar@gmail.com` + contraseña (dueño del proyecto) **+ otros accesos de staff que el admin cree desde la app** (Etapa 15, pestaña Staff → "🔐 Accesos de Staff") | Se ingresa con el botón "Entrar" → sección staff de la app. Cualquier acceso creado ahí tiene los MISMOS permisos que el admin dueño. Las contraseñas las elige quien crea/usa cada cuenta (nunca guardarlas en ningún archivo). |
| **Cloudflare Pages** (proyecto `jornadas`) | `hassan.chaar@gmail.com` (OAuth) | Account: "Hassan.chaar@gmail.com's Account", ID `86ef61bd99401cf86d8de0d1b0f8020b`. En una máquina nueva: `wrangler login` con esa cuenta. |
| **GitHub** | usuario `hassanchaar-1007` | Repo: `github.com/hassanchaar-1007/torneo-mjjsxx` (rama `main`). |
| **Claude** (para trabajar con Claude Code / extensión Chrome) | `andre.oliveira@acte-sa.com` | Es la cuenta con plan pago. OJO: la cuenta de Claude `hassan.chaar@gmail.com` NO tiene plan para "Claude in Chrome". |

### El "baile de perfiles de Chrome" (aprendido a los golpes)
La PC del usuario tiene varios perfiles de Chrome: **hassan** (Google `hassan.chaar@gmail.com`),
**André (acte-sa.com)** (`andre.oliveira@acte-sa.com`, gestionado por la empresa), Familia,
Hassan (Trabajo), Hassan Mustafa (upe.edu.py), supply (acte-sa.com). Claves:
- Para tocar **Firebase console** hace falta la **cuenta de Google** `hassan.chaar@gmail.com`
  (no importa el perfil de Chrome, importa la sesión de Google). Si el perfil tiene varias
  cuentas de Google, usar el selector de avatar o la URL con `/u/1/` (authuser).
- Para que **Claude controle ese Chrome**, la **extensión Claude in Chrome** debe estar
  instalada en ESE perfil y logueada con la cuenta de Claude **de acte-sa** (la del plan).
  Son dos logins independientes: Google del perfil ≠ cuenta de Claude de la extensión.
- Las cuentas corporativas (`*@acte-sa.com`) NO tienen permiso en el proyecto Firebase.
- Claude **no puede escribir contraseñas** (regla de seguridad): los logins de Google los
  hace el usuario a mano; Claude puede dejar la pantalla lista.

---

## 4. Stack técnico y estructura de archivos

**Filosofía: TODO en un solo `index.html`** (HTML + CSS + JS vanilla ES5, sin framework, sin
build). Mantener ese patrón siempre. Código nuevo en el mismo estilo: `var`, concatenación de
strings, `esc()` para escapar HTML.

```
C:\JORNADAS\
├── .claude\launch.json      → preview local: server "torneo" = python -m http.server 8765 --directory C:\JORNADAS\torneo
├── campajor\                → ⚠️ app VIEJA de campajor, redundante (pendiente archivar)
└── torneo\                  → EL PROYECTO (repo git)
    ├── index.html           → LA APP ENTERA (~2500 líneas). Lo principal a editar.
    ├── 200.html             → copia idéntica de index.html (resto histórico de Surge; se mantiene por compatibilidad). CADA COMMIT: Copy-Item index.html 200.html -Force
    ├── sw.js                → service worker PWA, cache "network first". CACHE_NAME 'torneo-vX.Y' — SUBIR LA VERSIÓN en cada deploy con cambios visibles (fuerza actualización en celulares).
    ├── manifest.json        → PWA "JORNADAS — Movimiento M.J.J.S.XX." (standalone, navy)
    ├── _redirects           → "/*    /index.html   200" (SPA routing en Cloudflare Pages)
    ├── logo.png, icon-192.png, icon-512.png, favicon.ico, apple-touch-icon.png
    ├── dist\                → carpeta de deploy (gitignored). Se arma copiando los archivos web.
    ├── CLAUDE.md            → este documento
    ├── README.md
    ├── .gitignore           → ignora: .env*, *_backup_*.json, node_modules/, dist/, .wrangler/, basura de sistema
    └── *.xls / *.xlsx       → planillas históricas del torneo (fixture fútbol, vóley, resumen). Material de consulta, no código.
```

### Estructura interna de `index.html` (mapa para navegar)
- **CSS** (~líneas 15–190): variables `--navy/--navy2/--navy3/--neon/--neon-dim/--gold/--gold-dim/--white/--w80/--w50/--w30/--teal/--danger`, clases `.hero`, `.card`, `.btn*`, `.cta-inscripcion`, `.nav-tabs`, `.modal*`, `.form-group`, `.sport-chip`, responsive.
- **Header fijo**: logo mini (→ portada), título, badge de usuario (`#userBadge` → `openLogin()`), dos barras de tabs: `#navTabs` (torneo) y `#navTabsCampajor` (campajor).
- **Modales**: `#loginModal` (PIN equipos/patrullas + staff email/pass), `#pwModal` (resto del viejo PIN admin), `#editModal` (editar equipo).
- **Páginas** (divs `.page`, se activan con clase `active`):
  - `#page-jornadas` → portada del movimiento (frases rotativas `#fraseJornadas`, chips de valores, "Elegí un evento" `#eventos-list`).
  - Torneo: `#page-inicio` (hero con precios, sanciones, cantina, transferencias, CTA), `#page-inscripcion`, `#page-equipos`, `#page-fixture`, `#page-goleadores`, `#page-campeones`, `#page-reglamento`.
  - CAMPAJOR: `#page-cj-inicio` (hero con año + lema + frase rotativa `#fraseCampajor` → tarjeta Lema/camino del Tesoro → "Qué incluye" → Esencia/virtudes → Los 4 subcampos → Oración → Borrador del plantel → banner CTA inscripción), `#page-cj-inscripcion` (formulario público + tarjeta de éxito con PIN), `#page-cj-cronograma`, `#page-cj-postas`, `#page-cj-yincanas`, `#page-cj-patrullas` (con `#cj-mi-patrulla` y `#cj-inscripciones-admin`), `#page-cj-ranking` (con `#cj-premio-form`, `#cj-subcampos-copa` y `#cj-premios-list`).
- **JS** (una sola etiqueta script al final). Funciones clave por área:
  - Init Firebase: config del proyecto, `db`, `dbRef`('torneo'), `publicRef`('publico'), `campajorRef`('campajor'), `inscCjRef`('campajor_inscripciones'), `fbReady`.
  - Registro de eventos: `EVENTOS`, `abrirEvento(id)`, `volverAJornadas()`, `renderJornadasLanding()`, `FRASES_JORNADAS` + `startFrasesJornadas()`.
  - Datos torneo: `loadData()/saveData(d,allowShrink)`, `fixArrays()`, `buildPublic(d)`, `_torneoSnap/_publicoSnap/setupSync()`, `descargarBackup()/restaurarBackup()`.
  - Auth: `openLogin()/doLogin()/doAdminLogin()/resetAdminPass()` (mail de restablecimiento), `onAuthStateChanged`, `isFbAdmin()` (email en Firebase Auth), `isAdmin()` (currentUser en la app), `updateUserBadge()`.
  - Torneo: `submitInscripcion()`, `renderEquipos()`, fixture/sorteo (`generateFixture()` etc.), goleadores, campeones.
  - CAMPAJOR base: `CRONO_SAB_CJ/CRONO_DOM_CJ/POSTAS_CJ/JUEGOS_CJ` (contenido hardcodeado; postas con `ora`/`consigna` = tipo de oración, juegos con `vir` = virtud), `normCj()/loadCj()/saveCj(d,allowShrink)`, `setupCampajorSync()`, `showCj(name)`, `renderCronoCj/renderPostasCj/renderJuegosCj/renderPatrullasCj/renderRankingCj`, CRUD admin de patrullas/puntajes.
  - CAMPAJOR identidad: `FRASES_CAMPAJOR` + `startFrasesCampajor()` (frases espirituales), `VIRTUDES_CJ` (7 virtudes con ícono/color, usadas en yincanas y premios), `VIRTUD_X_JUEGO` (mapa juego→virtud), `SUBCAMPOS_CJ` + `subcampoBadgeCj()` (apóstoles con color) + `setSubcampoCj()`, premios: `addPremioCj()/removePremioCj()`; el año: IIFE que llena `#anio-torneo`/`#anio-campajor` desde `EVENTOS`.
  - CAMPAJOR inscripción (NUEVO): `normIntegrantesCj()`, `addIntegranteRowCj()`, `resetInscripcionCjForm()`, `submitInscripcionCj()`, `renderMiPatrullaCj()/_persistirMiPatrulla()/guardarMiPatrulla()/agregarIntegranteMiPatrulla()/quitarIntegranteMiPatrulla()`, `renderInscripcionesAdminCj()/aprobarInscripcionCj()/rechazarInscripcionCj()`, IIFE de restauración de sesión (`localStorage cj_patrulla_pin`).
  - Utils: `esc()`, `toast()`, `renderAll()`.
  - Service worker: registro + aviso de versión nueva.

---

## 5. Arquitectura de datos en Firebase (RTDB)

Proyecto: **`torneo-mjjsxx`** · URL RTDB: `https://torneo-mjjsxx-default-rtdb.firebaseio.com`

| Nodo | Contenido | Lectura | Escritura |
|---|---|---|---|
| `publico` | Torneo SIN PII: teams (sin telefono/comprobante/pin), fixture, goleadores, campeones | 🌍 pública | solo admin |
| `torneo` | Torneo COMPLETO (con PII: teléfonos, comprobantes, PINs, fechas, nextPin) | solo admin | solo admin |
| `campajor` | Patrullas oficiales `{nombre, jefe, integrantes[]}` + puntajes `{patrulla, juego, puntos}` — SIN PII | 🌍 pública | solo admin |
| `campajor_inscripciones` | Inscripciones online: `<PIN>: {pin, nombre, jefe, celular, correo, integrantes[], estado, fecha}` — CON PII | admin (listado) / cada hijo: quien sepa su PIN | crear: cualquiera · editar: quien sepa el PIN · borrar: solo admin |
| `backups` | Rotativos del torneo (últimos 5, push en cada save) | solo admin | solo admin |
| `campajor_backups` | Rotativos de campajor (últimos 10) | solo admin | solo admin |
| `backup` | Backup viejo (legacy, fallback de restore) | solo admin | solo admin |

**Estructuras de datos exactas:**
```js
// data (torneo):
{ teams: [{id, pin, nombre, capitan, telefono, deporte, jugadores:[{nombre,numero}], status, fecha, comprobante}],
  fixture: {...}, goleadores: [...], nextPin: N, campeones: [{anio, campeon}] }
// dataCj (campajor):
{ patrullas: [{nombre, jefe, integrantes:[str], subcampo:'SANTO TOMÁS'|'SANTIAGO'|'SAN JUAN'|'SAN PEDRO'|'',
               color:'#hex', color2:'#hex' (opcional, bicolor), escudo:'data:image/jpeg;base64,...' (opcional),
               fotosFamiliares:[bool] (opcional, paralelo a integrantes - NO es sensible, va publico)}],
  puntajes: [{patrulla, juego, puntos}],
  premios: [{virtud, patrulla, motivo}],
  gritoPlantel: str,
  postas: [{n, nombre, mat, exp, vid, ora, consigna, lider:str, integrantes:[str]}],   // editable (alta/baja incluida), ver Etapa 14
  juegos: [{n, nombre, exp, mat, seg, vir, lider:str, integrantes:[str]}],             // editable (alta/baja incluida), ver Etapa 14
  cronoSab: [{hora, actividad}], cronoDom: [{hora, actividad}],                        // editable, ver Etapa 14
  plantel: [{nombre, cargo, grupo:'Plantel Integración J52'|'Plantel Apoyo J52'}],     // editable, ver Etapa 17
  planDiaBorrador: str }                                                              // texto libre, ver Etapa 20
// postas/juegos/cronoSab/cronoDom se siembran una sola vez desde POSTAS_CJ/JUEGOS_CJ/
// CRONO_SAB_CJ/CRONO_DOM_CJ (normCj) si todavia no existen en dataCj; de ahi en mas viven en
// Firebase como el resto de dataCj (agregar/editar/eliminar items no toca los arrays fijos).
// campajor_privado/<clave>: { cedulas:[str], celulares:[str], fechasNacimiento:[str], alergias:[str], fotosLink:[str] }
// (arrays paralelos al indice de integrantes de esa patrulla; admin-only, ver seccion 6)
// campajor_inscripciones/<PIN> ademas sirve de "acceso" para patrullas OFICIALES (no solo
// autoinscripciones): { ..., esOficial:true, grito:str } - grito POR PATRULLA, distinto del
// gritoPlantel de arriba - ver Etapa 12, seccion 7.
// admins/<uid>: { nombre:str, email:str } - pertenecer aca = mismos permisos que ADMIN_EMAIL
// en TODAS las reglas (uid de Firebase Auth, no el email). Ver Etapa 15, seccion 3.
// campajor_finanzas: { movimientos:[{id,tipo:'ingreso'|'egreso',categoria,descripcion,monto,
// fecha}], presupuesto:[{categoria,monto}] } - admin-only, NUNCA en campajor (publico). Sin
// sync en vivo, se lee con .once() al entrar a la pestana. Ver Etapa 16.
// (normCj tiene alias de compat: subcampos viejos PERLA/SENDA/ANTORCHA/RED/FE/... → apóstoles)
// inscripción campajor (campajor_inscripciones/<pin>):
{ pin, nombre, jefe, celular, correo, integrantes:[str], estado:'pendiente'|'aprobada'|'editada', fecha:ISO }
```

**REGLA DE PRIVACIDAD (inquebrantable):** teléfonos, correos, comprobantes, PINs y datos de
menores **JAMÁS van a un nodo de lectura pública** (`publico`, `campajor`). Los datos de
contacto de las patrullas viven SOLO en `campajor_inscripciones` (no listable públicamente).

---

## 6. Reglas RTDB — el JSON completo y vigente

Publicarlas en: Firebase console → Realtime Database → Reglas →
`https://console.firebase.google.com/project/torneo-mjjsxx/database/torneo-mjjsxx-default-rtdb/rules`

```json
{
  "rules": {
    "publico":          { ".read": true, ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "campajor":         { ".read": true, ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "campajor_inscripciones": {
      ".read":  "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())",
      ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())",
      "$pin": {
        ".read": true,
        ".write": "newData.exists()"
      }
    },
    "campajor_backups": { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "campajor_privado": { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "torneo":           { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "backups":          { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "backup":           { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "admins":           { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" },
    "campajor_finanzas": { ".read": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())", ".write": "auth != null && (auth.token.email === 'hassan.chaar@gmail.com' || root.child('admins').child(auth.uid).exists())" }
  }
}
```

⚠️ **`campajor_privado` es NUEVO (22/09/2026) y todavía NO está publicado** — hace falta pegar
este JSON actualizado en la consola (runbook 9.4) para que el visor de cédulas y el guardado
de cédulas en la carga masiva funcionen. Hasta entonces dan `PERMISSION_DENIED` (la app lo
maneja gracioso, con un aviso, no rompe nada — nombre/apodo/jornada se guardan igual en
`campajor.patrullas`, que sí tiene reglas vigentes).

⚠️ **`admins` y `campajor_finanzas` son NUEVOS (28/09/2026, Etapas 15-16) y TAMPOCO están
publicados todavía** — hace falta pegar este JSON actualizado (con esos 2 nodos nuevos y el
`|| root.child('admins')...` agregado a TODOS los demás) para que "🔐 Accesos de Staff" y
"💰 Finanzas" (ambas en Staff/nav) funcionen. El admin original (`hassan.chaar@gmail.com`)
sigue andando igual que siempre pase lo que pase — el OR lo evalúa primero y ese camino no
depende de `admins` para nada. Hasta que se publique, ambas pestañas dan `PERMISSION_DENIED`
con el aviso explicado en vez de romper (ver Etapas 15 y 16).

**Cómo funciona el modelo del PIN-llave** (`campajor_inscripciones/$pin`):
- El PIN de 6 dígitos ES la clave del registro. Conocer el PIN = poder leer y editar ESA patrulla.
- Nadie anónimo puede LISTAR el nodo (la lectura del padre es solo admin) → los contactos no se filtran.
- `".write": "newData.exists()"` permite crear y editar pero NO borrar (borrar = escribir null). Borrar solo admin.
- Verificación rápida de que la regla está viva (consola del navegador en el sitio):
  `firebase.database().ref('campajor_inscripciones/999999').once('value', s=>console.log('ok', s.exists()), e=>console.log('DENEGADA', e.code))`
  → debe dar `ok false` (no `PERMISSION_DENIED`).

✅ **Estas reglas están PUBLICADAS y verificadas** (el usuario las pegó el 12/07/2026 aprox.;
la prueba de lectura por PIN da `ok false`). La inscripción online funciona en producción.
⚠️ Quirk del SDK v8: `once()` rechaza además la promesa que devuelve aunque le pases el
callback de error — atajar con `var pr=ref.once(...); if(pr&&pr.catch) pr.catch(function(){});`
(ya aplicado en `renderInscripcionesAdminCj`).

---

## 7. Sistema de usuarios (3 niveles)

| Usuario | Cómo entra | Qué puede hacer | Persistencia |
|---|---|---|---|
| **Admin/staff** | Botón "Entrar" → email `hassan.chaar@gmail.com` + contraseña (Firebase Auth) | TODO: editar equipos, fixture, goleadores, patrullas oficiales, puntajes, aprobar/eliminar inscripciones, restaurar backups | Firebase Auth mantiene la sesión; `onAuthStateChanged` la restaura |
| **Equipo (torneo)** | Botón "Entrar" → PIN secuencial (1, 2, 3…, `nextPin`) | Ver su panel de equipo (funcionalidad de la época del torneo; hoy sin uso activo) | No persiste recarga. OJO: en modo público `data.teams` viene sin PINs (buildPublic los quita) — el login de equipo solo matchea con datos locales |
| **Patrulla (campajor)** | Se autologuea al inscribirse, o botón "Entrar" → PIN de 6 dígitos (busca en `campajor_inscripciones/<pin>`) | Ver/editar SU patrulla en la pestaña Patrullas ("Mi patrulla"): nombre, jefe, celular, correo, integrantes, **grito de guerra**; ver de solo lectura su **puntaje/puesto** y el **check de fotos familiares** | `localStorage['cj_patrulla_pin']` — se restaura al recargar; logout la borra |

**Acceso de patrulla OFICIAL (no autoinscripta) — Etapa 12:** las patrullas que carga el admin
directo (bulk-load / Admin SDK) no nacen con PIN. El admin genera uno desde el botón
**"🔑 Acceso"** en la tarjeta de la patrulla (Patrullas): `accesoPatrullaCj(i)` crea un
`campajor_inscripciones/<PIN>` con `esOficial:true` (mismo mecanismo de siempre, PIN=llave) y
lo muestra para copiarlo y pasárselo a la patrulla. Esas patrullas entran por el mismo login de
PIN de toda la vida; no aparecen en la bandeja de "Inscripciones online" (esa es solo para
autoinscripciones nuevas a revisar). Ver Etapa 12 en la sección 2 para el detalle completo.

**Flujo completo de la inscripción de patrulla:**
1. Visitante → CAMPAJOR → pestaña "Inscripción" (o CTA del inicio) → completa nombre patrulla,
   jefe, celular, correo (opcional), integrantes (filas dinámicas).
2. `submitInscripcionCj()`: valida → sortea PIN de 6 dígitos (verifica colisión leyendo esa
   clave, hasta 8 intentos) → `set()` en `campajor_inscripciones/<pin>` con `estado:'pendiente'`.
3. Tarjeta de éxito con el PIN gigante + queda logueado como patrulla (badge 🚩).
4. La patrulla puede volver desde cualquier celular: "Entrar" → PIN → edita su patrulla.
   Si edita después de aprobada, el estado pasa a `'editada'` (el staff lo ve).
5. Admin en pestaña Patrullas ve la bandeja "📥 Inscripciones online" (con celular/correo/PIN)
   → "✔ Aprobar" copia `{nombre, jefe, integrantes}` a la lista oficial (`campajor.patrullas`,
   reemplaza si ya existe una con el mismo nombre) y marca `estado:'aprobada'` → entra al ranking.
   "× Eliminar" borra la inscripción (la patrulla pierde el PIN).

---

## 8. Confiabilidad — 3 capas anti-pérdida (NO ROMPER JAMÁS)

El usuario **ya perdió datos** en la etapa del torneo. Estas capas existen por eso:
1. **Bloqueo anti-encogimiento**: `saveData`/`saveCj` NUNCA guardan menos ítems que el máximo
   conocido (`fbMaxTeams` / `fbMaxPatrullasCj`) salvo `allowShrink=true` (borrado explícito con confirm).
2. **Backups automáticos rotativos**: cada guardado admin hace `push` a `backups` (torneo,
   últimos 5) / `campajor_backups` (últimos 10) con fecha y contador.
3. **Confirmación antes de borrar** (`confirm()`) y recién ahí `allowShrink=true`.

Además: caché en `localStorage` (`torneo_mjjsxx_2026`, `campajor_mjjsxx`), botón de backup a
JSON descargable y `restaurarBackup()` (elige el backup con más equipos entre los últimos 5).
**Si tocás guardado/carga, no rompas nada de esto.**

---

## 9. Runbooks (paso a paso)

### 9.1 Probar en local
```
El preview server está en C:\JORNADAS\.claude\launch.json → nombre "torneo" (python -m http.server 8765).
Claude: usar preview_start {name:"torneo"} y verificar con preview_eval / console logs.
OJO: el preview usa el Firebase REAL — cuidado con escribir datos de prueba.
preview_screenshot a veces da timeout: verificar por DOM (preview_eval) en ese caso.
```

### 9.2 Deploy a producción (Cloudflare Pages)
```powershell
# 1. Sincronizar copias
Copy-Item C:\JORNADAS\torneo\index.html C:\JORNADAS\torneo\200.html -Force
# 2. Armar dist (solo archivos web)
Copy-Item C:\JORNADAS\torneo\index.html C:\JORNADAS\torneo\dist\index.html -Force
Copy-Item C:\JORNADAS\torneo\200.html  C:\JORNADAS\torneo\dist\200.html -Force
Copy-Item C:\JORNADAS\torneo\sw.js     C:\JORNADAS\torneo\dist\sw.js -Force
Copy-Item C:\JORNADAS\torneo\manifest.json C:\JORNADAS\torneo\dist\manifest.json -Force
Copy-Item C:\JORNADAS\torneo\_redirects C:\JORNADAS\torneo\dist\_redirects -Force
# (íconos y logo ya están en dist; copiarlos también si cambiaron)
# 3. Deploy
wrangler pages deploy C:\JORNADAS\torneo\dist --project-name jornadas
```
- Antes del deploy: **subir la versión de `CACHE_NAME` en `sw.js`** (v3.2 → v3.3 → …).
- El deploy imprime una URL de preview tipo `https://<hash>.jornadas-cop.pages.dev`; la
  producción es siempre https://jornadas-cop.pages.dev.
- Requiere `wrangler login` con `hassan.chaar@gmail.com` (una vez por máquina).

### 9.3 Commit y push
```powershell
Set-Location C:\JORNADAS\torneo
git add -A
git commit -m @'
mensaje SIN comillas dobles adentro (PowerShell 5.1 las rompe)

Co-Authored-By: Claude <noreply@anthropic.com>
'@
git push
```

### 9.4 Cambiar reglas de Firebase
1. Chrome con la cuenta Google `hassan.chaar@gmail.com` →
   `https://console.firebase.google.com/project/torneo-mjjsxx/database/torneo-mjjsxx-default-rtdb/rules`
2. Reemplazar el JSON por el de la sección 6 → **Publicar** (el banner "cambios no publicados"
   desaparece cuando se publicó bien).
3. Verificar con el snippet de la sección 6.

### 9.5 Dominios autorizados (Auth)
`https://console.firebase.google.com/project/torneo-mjjsxx/authentication/settings` →
pestaña Dominios autorizados → "Agregar un dominio". Deben estar: `localhost`,
`torneo-mjjsxx.firebaseapp.com`, `torneo-mjjsxx.web.app`, `jornadas-cop.pages.dev`.
(⚠️ revisar `jornadasapp.com`, ver sección 2/etapa 4.)

### 9.6 Setup desde CERO en otra máquina
1. `git clone https://github.com/hassanchaar-1007/torneo-mjjsxx.git C:\JORNADAS\torneo`
2. Instalar Python (para el preview) y Node (para wrangler: `npm i -g wrangler`).
3. `wrangler login` → cuenta `hassan.chaar@gmail.com`.
4. Crear `C:\JORNADAS\.claude\launch.json` con el server "torneo" (sección 9.1).
5. Para que Claude controle el navegador: instalar la extensión "Claude in Chrome" en el
   perfil de Chrome que tenga la sesión de Google de hassan, y loguear la extensión con la
   cuenta de Claude que tenga plan (hoy: la de acte-sa).
6. Este CLAUDE.md viaja en el repo → Claude Code recupera todo el contexto al abrir la carpeta.

### 9.7 Nueva edición / cambiar el año (2027, 2028, …)
El año de cada evento vive en el **registro `EVENTOS`** de `index.html`
(`{ id:'torneo', anio:'2026', ... }`). Cambiar `anio` ahí actualiza automáticamente
la portada del movimiento Y el año grande en la cabecera del evento (ids `anio-torneo`
y `anio-campajor`). Además, por edición hay que revisar a mano: fechas concretas
(chips del inicio de CAMPAJOR, cronograma), precios/alias del torneo, y al cerrar un
torneo cargar el campeón en el Salón de Campeones. Ojo: `STORE_KEY` del torneo es
`torneo_mjjsxx_2026` — evaluar si se archiva/renueva el nodo de datos al arrancar
una edición nueva (backup antes).

### 9.8 Restaurar datos si algo se pierde
- En la app como admin: botón de restaurar (usa `backups` rotativos, elige el de más equipos).
- Backups descargables: `descargarBackup()` genera `torneo_backup_YYYY-MM-DD.json` (gitignored).
- Último recurso: nodo `backup` (legacy) o exportar JSON desde la consola RTDB (pestaña Datos → ⋮ → Exportar).

### 9.9 Cargar patrullas directo a Firebase (Admin SDK, sin login manual)
Claude no puede loguearse como staff (regla: nunca escribe contraseñas), así que para cargar
datos directo a la base (en vez de guiar al usuario por la UI) existe `.tools/campajor-cargar-patrulla.mjs`,
que usa una **service account** (Firebase Admin SDK) — bypassea las reglas RTDB por completo,
así que la clave es sensible y **nunca se commitea** (gitignored: `.secrets/`, `*firebase-adminsdk*.json`).

**Setup (una sola vez, lo hace el usuario):**
1. `https://console.firebase.google.com/project/torneo-mjjsxx/settings/serviceaccounts/adminsdk`
   (con `hassan.chaar@gmail.com`) → "Generar nueva clave privada" → descarga un `.json`.
2. Guardar ese archivo como `C:\JORNADAS\torneo\.secrets\serviceAccountKey.json`.
3. `npm install` ya corrido (hay `package.json` con `firebase-admin`).

**Uso:**
```powershell
node .tools\campajor-cargar-patrulla.mjs "Nombre de la patrulla" ruta\al\texto.txt
```
El script porta el MISMO parser que usa la carga masiva del sitio (`parseCargaMasivaCj` en
`index.html` — si se edita uno, editar el otro): entiende bloques nombre/apodo/jornada/cédula
separados por línea en blanco, líneas sueltas "Nombre (Apodo) cédula · J52", ignora líneas de
encabezado tipo "Nombre de la patrulla:"/"Integrantes:" y formato WhatsApp (`*negrita*`/`_cursiva_`).
Escribe integrantes en `campajor/patrullas` (concatena si la patrulla ya existe) y cédulas en
`campajor_privado/<nombreSanitizado>/cedulas` — funciona aunque las reglas RTDB de
`campajor_privado` (sección 6) todavía no estén publicadas, porque el Admin SDK no las respeta.
Los `.txt` de entrada con datos reales (nombres/cédulas) van en el scratchpad de la sesión, NO
en el repo, aunque estén gitignored — mejor no tentar al destino.

---

## 10. Trampas del entorno (para no volver a tropezar)

- **PowerShell 5.1**: no existe `&&` ni `||`; los mensajes de commit con **comillas dobles
  adentro se rompen** (usar here-string `@'...'@` sin comillas dobles); `Set-Content` default
  ANSI (usar `-Encoding utf8`).
- **Python**: el comando `python` puede ser el alias roto de Microsoft Store → usar **`py`**
  (launcher real: `C:\Users\hassa\AppData\Local\Programs\Python\Python313`). Para PDFs:
  `py -m pip install pypdf`.
- **Preview**: `preview_screenshot` a veces da timeout con esta página; verificar por
  `preview_eval` (DOM) que es 100% confiable.
- **Firebase console**: si dice "el proyecto no existe o no tenés permiso" → estás con la
  cuenta de Google equivocada. Cambiar con el avatar (arriba a la derecha) o URL `/u/1/`.
- **Claude in Chrome**: si la extensión pide plan de pago → está logueada con la cuenta de
  Claude equivocada (usar la de acte-sa). La conexión de Claude a un navegador se puede caer
  entre sesiones: `list_connected_browsers` para ver qué hay, `switch_browser` manda el botón
  "Connect" a todas las extensiones activas.
- **`.wrangler/`** genera caché local — está gitignored (una vez se coló al repo y se limpió).
- **El deploy a producción** puede requerir confirmación explícita del usuario (permisos de
  Claude Code). Pedirla y listo.
- **Relojes/fechas**: verificar fechas con `git log` si algo no cuadra; hubo discrepancias
  menores entre el reloj de la PC y la fecha real.

---

## 11. Contenido de los eventos (datos duros)

### Torneo de Integración 2026 (ya jugado)
- **Domingo 14/06/2026, 08:00**, Quinta la Soñada (maps: https://maps.app.goo.gl/f7CH3Hv7sE7b4Z9i7)
- Modalidades e inscripción: Fútbol Masc Gs. 300.000 · Fútbol Fem Gs. 250.000 · Vóley Mixto
  Gs. 200.000 · Pádel Americano Gs. 50.000 (individual)
- Sanciones: 🟨 Gs. 30.000 · 🟥 Gs. 100.000
- Transferencias: Alias `5145828` (Fabiana Centurión) · Alias `0973729154` (Mónica Zárate)
- Contactos: 0994 196050 · 0973 237460
- **Campeón 2026: J48** (cargado en el Salón de Campeones; faltan años anteriores)

### CAMPAJOR 2026 (próximo)
- **Sábado 17 y domingo 18 de octubre de 2026**
- **Lema (elegido por el plantel: el Tesoro y la búsqueda)**: «En busca del Tesoro» —
  Buscalo, cuidalo, compartilo: el Tesoro está dentro. (Lema del movimiento: "El Tesoro está
  dentro", Mt 13,45-46 + 2 Cor 4,7.)
- **4 subcampos = apóstoles que buscaron el Tesoro**, cada uno con 5 capas
  (santo · elemento de la búsqueda · color oficial · virtud · elemento de la tierra):
  · **SANTO TOMÁS** = La Perla · BLANCO · Fe · 🌬️ aire (Jn 20,28; Jn 3,8)
  · **SANTIAGO** = La Senda · VERDE · Esperanza · 🌱 tierra (el peregrino; Mt 13,44)
  · **SAN JUAN** = La Antorcha · ROJO · Caridad · 🔥 fuego (Jn 20,8; Lc 24,32)
  · **SAN PEDRO** = La Red · AZUL · Sabiduría · 💧 agua (Jn 21,6-7; Jn 4,14)
  · plantel de integración = AMARILLO 💛 (el color del Tesoro).
  (En el código: `SUBCAMPOS_CJ` + `subcampoBadgeCj` + alias de compat en `normCj` para nombres
  viejos; el admin asigna subcampo por patrulla; Copa de Subcampos en el ranking. Las virtudes
  siguen siendo la esencia: charla, yincanas, premios.)
- **Esencia espiritual** (charla "Virtudes del Jornadista", convivencia 12/07/2026): virtudes =
  hábitos buenos para parecernos más a Jesús. En la app: tarjeta de las 4 virtudes con citas
  (Fe Heb 11,1 · Esperanza Rom 8,24 · Caridad 1 Cor 13,13 · Sabiduría 1 Re 3,9), "La oración:
  el oxígeno del alma" con los 5 tipos de oración y los frutos (Escucha·Silencio·Diálogo).
- **Las 5 postas encarnan los 5 tipos de oración** (badge + consigna en cada tarjeta):
  P1 Adoración · P2 Confesión · P3 Acción de Gracias · P4 Intercesión · P5 Petición.
- **Las 24 yincanas trabajan las 7 virtudes** (chip de color por juego, mapa `VIRTUD_X_JUEGO`):
  Fe(3) · Esperanza(4) · Caridad(3) · Prudencia(4) · Justicia(3) · Fortaleza(5) · Templanza(2).
- **El camino del Tesoro** (notas del grupo, 12/07): 1) Buscar a Dios (tesoro escondido, pistas
  y senda en Santa Catalina) 2) La perla preciosa (la fe) 3) La sabiduría de Salomón 4) Domingo
  sabio (5 propósitos) 5) Echar la red (apostolado) + oración del plantel.
- **Cronograma espiritual**: oración inicial en la apertura, Santo Rosario dom 06:00, misa
  "Pedid y se les dará", fogón con frutos, clausura con premios "Virtud del Jornadista".
- **Borrador del plantel en la app** (propuestas de Claude para trabajar): 5 propósitos del
  Domingo sabio (orar cada día / misa y comunidad / la Palabra / servir / echar la red) y
  8 pistas de la senda (cita + acertijo; final: cofre con una perla por jornadista).
  ⚠️ **Cuando las pistas sean definitivas, SACARLAS de la página pública** (spoiler).
- Estructura: 5 postas de recepción → 24 yincanas con puntaje → gritos de subcampo, apertura,
  fogón con números artísticos, misa, competencia de obstáculos, clausura con premiaciones.
- Todo el catálogo (cronograma sáb/dom, postas, yincanas con materiales/seguridad) está
  hardcodeado en `index.html` (`CRONO_SAB_CJ`, `CRONO_DOM_CJ`, `POSTAS_CJ`, `JUEGOS_CJ`).
- Coordinación edición anterior (2025): Laura Duarte y Hugo Villalba.

### Fuentes bíblicas del lema (para explicar "de dónde sacamos")
- **Mateo 13** es la fuente madre: **13,44** tesoro escondido en el campo · **13,45-46** el
  comerciante que BUSCA la perla de gran valor · **13,47-48** la red echada al mar.
- **El Tesoro es Cristo y lo llevamos dentro**: 2 Cor 4,7 (vasijas de barro) · Col 2,3 (en
  Cristo están escondidos todos los tesoros) · Mt 6,21 (donde está tu tesoro, tu corazón).
- **El mandato de buscar**: Mt 7,7 (busquen y encontrarán) · Jer 29,13 · Sal 105,3-4 ·
  Prov 2,4-5 (buscar la sabiduría COMO un tesoro escondido — puente con Salomón).
- **Dato para la apertura**: el Evangelio de Juan abre con "¿Qué buscan?" (Jn 1,38) y tras la
  resurrección pregunta "¿A quién buscás?" (Jn 20,15). Los Reyes Magos (Mt 2) fueron la
  primera búsqueda del tesoro con pistas del NT.

---

## 12. Material histórico de referencia

### Carpeta PF51 (`C:\Users\hassa\OneDrive\Desktop\PF51`) — CAMPAJOR 2025
- `JUEGOS SABADO - CAMPAJOR.pdf` → 23 juegos con responsable, materiales, explicación, tipo y links de video (YouTube/Facebook/TikTok).
- `JUEGOS DOMINGO - CAMPAJOR.pdf` → juegos del domingo en 4 postas (agua/barro, inteligencia, agilidad, destreza) + staff asignado por posta.
- `POSTAS - CAMPAJOR.pdf` → 5 postas de recepción ("posta de cobardía") con materiales.
- `Planilla PF51.xlsx` → calificaciones, asistencia 2025 y **datos personales (CI, celular, correo)**. ⚠️ **PII: JAMÁS subir al repo ni a nodos públicos.**
- ⚠️ `ERROR.jpg`, `IDENTIFICATION.jpg`, `MANUAL.jpg` → NO son del CAMPAJOR (fotos de un láser industrial IPG del trabajo, quedaron mezcladas).
- Varios juegos de PF51 ya están en el catálogo de la app (Palo Borracho, Pasa Agua, etc.).

### Planillas del torneo (en `C:\JORNADAS\torneo\`)
`Planilla Equipos FINAL - FIXTURE FUTBOL.xlsx`, `Planillas de Juegos Jornadas.xls`,
`Planillas Futbol Jornadas ultimo.xls`, `Planillas Voley Jornadas ultimo.xls`,
`RESUMEN - TORNEO.xlsx` — material de la organización del torneo jugado.

### App vieja
`C:\JORNADAS\campajor` → versión anterior standalone de campajor. Redundante. Pendiente archivar.

---

## 13. Estado actual y pendientes (al cierre de la sesión del 12/07/2026)

> ⚠️ Esta sección quedó congelada en el 12/07/2026. Para el estado real y los pendientes
> vigentes, ver las **Etapas 6 a 11** en la sección 2 (roles/reglamento, layout, carga masiva,
> Admin SDK, color estructurado, escudos, datos privados completos). Pendientes concretos de
> la Etapa 11: cargar integrantes de Los Gatis/Los Loritos/Caperucitas/keperseguidos/Panteras/
> Halcones, agregar grupo sanguíneo a LOS MBORE y CENTINELAS, automatizar el grupo sanguíneo en
> `parseCargaMasivaCj`, y confirmar en vivo (logueado como staff) que el visor de datos privados
> lee bien `campajor_privado`.

### ✅ TODO EN VIVO en https://jornadas-cop.pages.dev (sw v3.9)
- [x] Reglas RTDB completas publicadas y verificadas (incluida `campajor_inscripciones`).
- [x] **Inscripción online de patrullas** operativa de punta a punta (probada con inscripción
      real → PIN → login desde otro "dispositivo" → edición → aprobación/eliminación admin).
      La patrulla de prueba ya fue eliminada por el admin.
- [x] **Login de staff operativo** (el admin restableció su contraseña con el botón
      "¿Olvidaste la contraseña?" del login).
- [x] **Identidad completa del CAMPAJOR 2026**: lema «En busca del Tesoro», 4 subcampos-apóstoles
      con 5 capas, esencia (virtudes + oración), postas=tipos de oración, yincanas con virtudes,
      cronograma espiritual, Copa de Subcampos, premios "Virtud del Jornadista", borrador del
      plantel (propósitos + pistas).
- [x] Año centralizado en `EVENTOS` (listo para 2027) · botón reset de contraseña ·
      portada del movimiento neutral con frases motivacionales.

### 🟡 Pendientes abiertos
- [ ] **Manual de roles**: ya cargados Líder de Grupo, Jefe de Subcampo, Espiritualidad, Fogón,
      Cocina, Limpieza General y Utilería de Juegos. Falta cargar los **ayudantes** de cocina/
      espiritualidad/fogón (funciones propias, no solo "acompañan al jefe") y cualquier rol nuevo
      que sume el plantel (ej. Richard, jefe Rolando si tienen roles distintos a los ya escritos).
- [ ] Extraer el articulado exacto del Decreto N° 7442/2017 si hace falta citarlo textual (el
      PDF que pasó el usuario es un escaneo sin texto — se necesitaría OCR o una copia con capa
      de texto).
- [x] **Sacar las 8 pistas de la página pública** — ya se movieron a Staff (13-14/09/2026),
      quedan marcadas "spoiler adentro", solo staff/código `TESORO26` las ve.
- [ ] **Premio "Mejor Espíritu Jornadista"**: falta definir con el plantel si es individual o
      por patrulla, y programarlo en el sistema de premios del Ranking (hoy solo existe
      "Virtud del Jornadista"). Ver Organización → Staff.
- [ ] **Tarjetas Rojas** (memes graciosos de infracciones): el usuario compartió 3 imágenes de
      referencia, pidió no subirlas todavía — retomar si pide armar esa sección.
- [ ] El plantel debe validar/ajustar: lema final (variantes en el borrador), los 5 propósitos,
      las pistas, y los gritos de subcampo.
- [ ] **Músicas de jornadas con virtudes**: el usuario las va a pasar → integrarlas en la esencia.
- [ ] Confirmar si `jornadasapp.com` (en Authorized domains) es del usuario; si no, quitarlo.
- [ ] Archivar `C:\JORNADAS\campajor` (app vieja redundante).
- [ ] Cargar campeones de años anteriores en el Salón de Campeones.
- [ ] (Opcional) Backup diario automático a archivo local (tarea programada estilo Top Lomitos).
- [ ] (Idea) Completar el catálogo de yincanas con los juegos de PF51 que faltan (con links de
      video) y/o sección "Ediciones anteriores".
- [ ] (Idea a futuro) Asignación de subcampo desde la inscripción, panel de patrulla con su
      puntaje propio, y modo "pantalla grande" del ranking para la clausura.

---

## 14. Convenciones de trabajo

- **Idioma**: español (rioplatense/paraguayo, "vos"). Directo, sin vueltas.
- **Commits**: mensaje descriptivo tipo `feat(area): qué` en español sin comillas dobles,
  con `Co-Authored-By: Claude <noreply@anthropic.com>`. Push a `main`.
- **Cada cambio visible**: probar en preview ANTES de deployar; deploy requiere OK del usuario;
  después del deploy verificar en vivo si es posible.
- **Un solo archivo**: resistir la tentación de dividir `index.html`. Es una decisión del
  proyecto (simplicidad de deploy y edición).
- **Estilo de código**: ES5 (`var`), sin dependencias nuevas, `esc()` en todo HTML dinámico,
  emojis en la UI (🚩 patrullas, 🏕️ campajor, 🏆 torneo, 👑 jefe).
- **Seguridad**: Claude nunca maneja contraseñas; los logins los hace el usuario. Nada de
  PII en nodos públicos ni en el repo.
- **Memoria de Claude**: además de este archivo, Claude guarda memoria personal en
  `C:\Users\hassa\.claude\projects\C--JORNADAS\memory\` — pero este CLAUDE.md es la fuente
  de verdad portable (viaja con el repo).
