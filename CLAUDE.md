# Torneo de Integración 2026 (M.J.J.S.XX.) — contexto del proyecto

> Este archivo lo lee Claude Code automáticamente al abrir una sesión en `C:\torneo-de-jornadas`.
> Trabajar en **español**. Responder directo y práctico.

## Qué es
**PWA** para gestionar un **torneo deportivo de integración** (fútbol masculino/femenino, vóley, pádel): equipos, fixture, jornadas, llaves/eliminatorias, resultados y planillas.

## Stack
- **Todo en `index.html`** (~97 KB): HTML + CSS + JS **vanilla**, sin framework ni build. Paleta navy/neón.
- **PWA**: `sw.js` (service worker, funciona offline), `manifest.json`, íconos. `200.html` = fallback SPA (convención de **Surge.sh** → está desplegada en Surge). **Plan: migrar a Cloudflare Pages** (consistencia con CHS/Estudio); al migrar, `200.html` → `_redirects`.
- **Datos**: en el navegador (localStorage) con **backup/restauración por JSON** (archivos `torneo_backup_*.json`). No tiene backend ni base de datos.

## Estructura
- `index.html` → la app (lo principal a editar).
- `200.html` → página fallback (routing offline / Netlify).
- `sw.js`, `manifest.json`, íconos → PWA.
- Planillas Excel (`Planillas Futbol/Voley Jornadas`, `FIXTURE FUTBOL`, `RESUMEN - TORNEO`) → material/datos del torneo.

## Cómo correr / probar
Abrir `index.html` en el navegador. Para probar la PWA completa (service worker), servir estático (ej. `python -m http.server`) y abrir en localhost.

## Git / deploy
Repo: `github.com/hassanchaar-1007/torneo-mjjsxx`. Deploy estático en **Surge.sh** (a migrar a Cloudflare Pages). Flujo: `git add -A` → `git commit -m "..."` → `git push`.

## Nota
App estática autónoma, sin credenciales ni backend. Mantener el patrón de un solo `index.html`. Importante: si se toca el manejo de datos, no romper el backup/restore por JSON (es el respaldo del torneo).
