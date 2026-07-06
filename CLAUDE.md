# JORNADAS — Plataforma multi-evento (M.J.J.S.XX.) — contexto del proyecto

> Este archivo lo lee Claude Code automáticamente al abrir una sesión en `C:\JORNADAS\torneo`.
> **Trabajar en español. Responder directo y práctico, guiado paso a paso cuando haya que tocar Firebase/deploy.**
> Este es el chat **exclusivo de JORNADAS**. Todo lo de esta plataforma se trabaja acá.

---

## Qué es
**JORNADAS** es la **plataforma multi-evento** del movimiento **M.J.J.S.XX.** Una sola app: página principal del movimiento y, adentro, **eventos**. Hoy hay dos, y está pensada para **agregar más** sin rehacer nada:

- 🏆 **Torneo de Integración** — torneo deportivo (fútbol M/F, vóley, pádel): equipos, fixture, jornadas, eliminatorias, resultados, goleadores, **Salón de Campeones** (historial por año, 2026 = J48).
- 🏕️ **CAMPAJOR** — campamento: cronograma sáb/dom, 5 postas, 24 yincanas/juegos, **patrullas con integrantes + jefe de patrulla**, carga de puntajes y ranking.

Los eventos viven en el **registro `EVENTOS`** dentro de `index.html`. Para sumar un evento nuevo se agrega una entrada ahí y sus vistas.

## Stack
- **Todo en `index.html`** (~un solo archivo grande): HTML + CSS + JS **vanilla**, sin framework ni build. Paleta navy/neón. **Mantener el patrón de un solo archivo.**
- **PWA**: `sw.js` (offline), `manifest.json`, íconos.
- **Backend: Firebase** (proyecto `torneo-mjjsxx`):
  - **Realtime Database (RTDB)** → sync en tiempo real entre dispositivos (los jugadores lo ven en su celu). URL: `https://torneo-mjjsxx-default-rtdb.firebaseio.com`.
  - **Firebase Auth (email/password)** → login de admin. **Admin = `hassan.chaar@gmail.com`.** Ya **NO se usa PIN** para escribir en la nube (el PIN `1007` quedó solo como resto local).
- **Caché local** en `localStorage` + **backup/restore por JSON**.

## Datos en Firebase — split público / privado (por privacidad)
Los datos se separan para **no exponer PII** (teléfonos, comprobantes, datos de menores):
- `publico` → versión sin PII (fixture, ranking, equipos sin teléfono/comprobante/pin). **Lectura pública.**
- `torneo` → datos completos con PII. **Solo admin** lee/escribe.
- `campajor` → patrullas/puntajes (sin PII). Lectura pública, escritura admin.
- `campajor_backups`, `backups`, `backup` → respaldos, **solo admin**.

`buildPublic(d)` es la función que arma la copia pública quitando `telefono`/`comprobante`/`pin`.

## Confiabilidad (anti-pérdida de datos) — IMPORTANTE, NO ROMPER
El usuario **ya perdió datos antes**; la confiabilidad es prioridad. Hay **3 capas** y no deben romperse al tocar el manejo de datos:
1. **Bloqueo anti-pérdida**: `saveData`/`saveCj` nunca guardan menos ítems que el máximo conocido (`fbMaxTeams` / `fbMaxPatrullasCj`) salvo que se pase `allowShrink=true` (borrado explícito).
2. **Backups automáticos rotativos**: cada guardado hace `push` a `campajor_backups` (se conservan los últimos 10).
3. **Confirmación** antes de borrar (ej. `removePatrullaCj` pide `confirm()` y recién ahí guarda con `allowShrink=true`).

Regla de oro: **si tocás guardado/carga, no rompas estas 3 capas ni el backup/restore por JSON.**

## Reglas de Firebase (RTDB → Reglas)
Escritura solo admin (`hassan.chaar@gmail.com`), lectura pública solo en `publico`/`campajor`:
```json
{
  "rules": {
    "publico":          { ".read": true, ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "campajor":         { ".read": true, ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "campajor_backups": { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "torneo":           { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "backups":          { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" },
    "backup":           { ".read": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'", ".write": "auth != null && auth.token.email === 'hassan.chaar@gmail.com'" }
  }
}
```

## Estructura de archivos
- `index.html` → **la app** (lo principal a editar).
- `200.html` → **copia idéntica de `index.html`** (fallback SPA de Surge, resto histórico). **Cada commit: `Copy-Item index.html 200.html -Force`.**
- `_redirects` → `/*    /index.html   200` (routing SPA en Cloudflare Pages).
- `sw.js`, `manifest.json`, íconos → PWA.
- `dist/` → carpeta de deploy (solo archivos web; se arma copiando `index.html`, `200.html`, `sw.js`, `manifest.json`, `_redirects`, íconos). **Gitignored.**

## Deploy — Cloudflare Pages
Sitio en vivo: **https://jornadas-cop.pages.dev**
Flujo:
```powershell
Copy-Item C:\JORNADAS\torneo\index.html C:\JORNADAS\torneo\200.html -Force
# armar dist\ con los archivos web, luego:
wrangler pages deploy C:\JORNADAS\torneo\dist --project-name jornadas
```
(La primera vez el proyecto se creó con `wrangler pages project create jornadas --production-branch main`.)

## Git
Repo: `github.com/hassanchaar-1007/torneo-mjjsxx`. Flujo: `git add -A` → `git commit -m "..."` → `git push`. **git se usa por PowerShell.**

## Probar en local (preview)
Servidor de preview configurado en `.claude/launch.json` (`torneo` → `python -m http.server 8765`). Verificar cambios con las herramientas de preview, no pedirle al usuario que revise a mano.

---

## Pendientes del usuario (fuera del código)
- [x] **Actualizar las reglas de Firebase** — hecho el 6/7/2026 (publicadas con los nodos `campajor` y `campajor_backups`, que faltaban).
- [x] **Agregar `jornadas-cop.pages.dev`** en Authorized domains — hecho el 6/7/2026. Nota: también figura `jornadasapp.com` (Custom) en la lista; confirmar con el usuario si es suyo (si no, quitarlo).
- [ ] Archivar el app/repo viejo **`C:\JORNADAS\campajor`** (ya es redundante: CAMPAJOR vive dentro de esta plataforma).
- [ ] (Opcional) Backup diario automático a archivo en la PC (tarea programada), como el de Top Lomitos.
- [ ] Cargar campeones de años anteriores en el Salón de Campeones.

## Notas
- **App de un solo `index.html` con backend Firebase.** Mantener ese patrón.
- **Confiabilidad primero**: no romper las 3 capas anti-pérdida ni el backup/restore.
- **Privacidad**: teléfonos, comprobantes y datos de menores **no** van al nodo público.
