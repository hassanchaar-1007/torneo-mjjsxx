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

---

## 3. Cuentas y accesos (CRÍTICO para trabajar desde otra máquina)

| Servicio | Cuenta | Rol / Notas |
|---|---|---|
| **Firebase** (proyecto `torneo-mjjsxx`) | `hassan.chaar@gmail.com` | Único dueño/admin del proyecto Y único email autorizado a escribir por las reglas RTDB. La consola se abre con esa cuenta de Google. |
| **Firebase Auth (login staff en la app)** | `hassan.chaar@gmail.com` + contraseña | Se ingresa con el botón "Entrar" → sección staff de la app. La contraseña la sabe el usuario (nunca guardarla en ningún archivo). |
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
{ patrullas: [{nombre, jefe, integrantes:[str], subcampo:'SANTO TOMÁS'|'SANTIAGO'|'SAN JUAN'|'SAN PEDRO'|''}],
  puntajes: [{patrulla, juego, puntos}],
  premios: [{virtud, patrulla, motivo}] }  // premios "Virtud del Jornadista"
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
    "publico":          { ".read": true, ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "campajor":         { ".read": true, ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "campajor_inscripciones": {
      ".read":  "auth != null && auth.token.email === 'hassan.chaar@gmail.com'",
      ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'",
      "$pin": {
        ".read": true,
        ".write": "newData.exists()"
      }
    },
    "campajor_backups": { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "torneo":           { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "backups":          { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "backup":           { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" }
  }
}
```

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
| **Patrulla (campajor)** | Se autologuea al inscribirse, o botón "Entrar" → PIN de 6 dígitos (busca en `campajor_inscripciones/<pin>`) | Ver/editar SU patrulla en la pestaña Patrullas ("Mi patrulla"): nombre, jefe, celular, correo, integrantes | `localStorage['cj_patrulla_pin']` — se restaura al recargar; logout la borra |

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
- **Sábado 11 y domingo 12 de octubre de 2026**
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
