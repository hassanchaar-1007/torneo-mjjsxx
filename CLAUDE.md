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
| 🏕️ **CAMPAJOR 2026** | Campamento | Próximo: **sáb 11 y dom 12 de octubre 2026** | Cronograma, 5 postas, 24 yincanas, patrullas (integrantes + jefe 👑), puntajes, ranking, **inscripción online de patrullas con PIN** |

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
  - 🔴 **BLOQUEADO AL CIERRE DE LA SESIÓN**: falta publicar la regla `campajor_inscripciones`
    en Firebase (ver sección 6). Sin ella, el guardado da `PERMISSION_DENIED`.
    **El código NO se deployó a producción todavía** (deployar sin la regla rompería la UX).
- Inventario de la carpeta **PF51** (CAMPAJOR 2025) — ver sección 12.

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
  - CAMPAJOR: `#page-cj-inicio` (hero + "Qué incluye" + banner CTA inscripción), `#page-cj-inscripcion` (NUEVO: formulario público + tarjeta de éxito con PIN), `#page-cj-cronograma`, `#page-cj-postas`, `#page-cj-yincanas`, `#page-cj-patrullas` (con `#cj-mi-patrulla` y `#cj-inscripciones-admin`), `#page-cj-ranking`.
- **JS** (una sola etiqueta script al final). Funciones clave por área:
  - Init Firebase: config del proyecto, `db`, `dbRef`('torneo'), `publicRef`('publico'), `campajorRef`('campajor'), `inscCjRef`('campajor_inscripciones'), `fbReady`.
  - Registro de eventos: `EVENTOS`, `abrirEvento(id)`, `volverAJornadas()`, `renderJornadasLanding()`, `FRASES_JORNADAS` + `startFrasesJornadas()`.
  - Datos torneo: `loadData()/saveData(d,allowShrink)`, `fixArrays()`, `buildPublic(d)`, `_torneoSnap/_publicoSnap/setupSync()`, `descargarBackup()/restaurarBackup()`.
  - Auth: `openLogin()/doLogin()/doAdminLogin()`, `onAuthStateChanged`, `isFbAdmin()` (email en Firebase Auth), `isAdmin()` (currentUser en la app), `updateUserBadge()`.
  - Torneo: `submitInscripcion()`, `renderEquipos()`, fixture/sorteo (`generateFixture()` etc.), goleadores, campeones.
  - CAMPAJOR base: `CRONO_SAB_CJ/CRONO_DOM_CJ/POSTAS_CJ/JUEGOS_CJ` (contenido hardcodeado), `normCj()/loadCj()/saveCj(d,allowShrink)`, `setupCampajorSync()`, `showCj(name)`, `renderCronoCj/renderPostasCj/renderJuegosCj/renderPatrullasCj/renderRankingCj`, CRUD admin de patrullas/puntajes.
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
{ patrullas: [{nombre, jefe, integrantes:[str]}], puntajes: [{patrulla, juego, puntos}] }
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

🔴 **ESTADO AL CIERRE DE LA ÚLTIMA SESIÓN:** esta regla (`campajor_inscripciones`) estaba
**pendiente de publicar** — la prueba desde el preview dio `PERMISSION_DENIED`. Hasta
publicarla, la inscripción online NO funciona y el código nuevo NO debe deployarse.

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

### 9.7 Restaurar datos si algo se pierde
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
- Estructura: 5 postas de recepción → 24 yincanas con puntaje → gritos de subcampo, apertura,
  fogón con números artísticos, misa, competencia de obstáculos, clausura con premiaciones.
- Todo el catálogo (cronograma sáb/dom, postas, yincanas con materiales/seguridad) está
  hardcodeado en `index.html` (`CRONO_SAB_CJ`, `CRONO_DOM_CJ`, `POSTAS_CJ`, `JUEGOS_CJ`).
- Coordinación edición anterior (2025): Laura Duarte y Hugo Villalba.

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

## 13. Estado actual y pendientes

### ✅ Ex-bloqueante, RESUELTO
- [x] Regla `campajor_inscripciones` publicada por el usuario (julio 2026) y verificada.
- [x] Prueba punta a punta OK: inscripción real de prueba (patrulla "PRUEBA (borrar)",
      PIN 426511) → login por PIN desde cero → edición de integrantes persistida.
      ⚠️ **Queda esa inscripción de prueba en Firebase**: el admin debe eliminarla desde
      la bandeja "📥 Inscripciones online" (pestaña Patrullas) — sirve de paso como
      prueba del botón "× Eliminar".
- [x] **Deploy a producción hecho** (sw v3.3): inscripción online + esencia espiritual
      (virtudes en yincanas, subcampos, copa, cronograma espiritual, premios) EN VIVO
      y verificado en https://jornadas-cop.pages.dev.

### 🟡 Pendientes abiertos
- [ ] Confirmar si `jornadasapp.com` (en Authorized domains) es del usuario; si no, quitarlo.
- [ ] Archivar `C:\JORNADAS\campajor` (app vieja redundante).
- [ ] Cargar campeones de años anteriores en el Salón de Campeones.
- [ ] (Opcional) Backup diario automático a archivo local (tarea programada estilo Top Lomitos).
- [ ] (Idea) Completar el catálogo de yincanas con los juegos de PF51 que faltan (con links de video) y/o sección "Ediciones anteriores".

### ✅ Hecho (para no repetir)
- Reglas RTDB con 6 nodos publicadas (julio 2026) · dominio `jornadas-cop.pages.dev` autorizado ·
  portada motivacional + CTA dentro de CAMPAJOR (deployado) · sistema de inscripción de
  patrullas CODEADO y probado en local (falta regla + deploy) · `.wrangler/` fuera del repo.

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
