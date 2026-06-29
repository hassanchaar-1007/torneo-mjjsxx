# Torneo de Integración 2026 (M.J.J.S.XX.) — contexto del proyecto

> Este archivo lo lee Claude Code automáticamente al abrir una sesión en `C:\JORNADAS\torneo`.
> Trabajar en **español**. Responder directo y práctico.
> Parte del paraguas **`C:\JORNADAS\`** (eventos del movimiento): `torneo/` (esta app) y `campajor/` (evento de campamento, a construir).

## Qué es
**PWA** para gestionar un **torneo deportivo de integración** (fútbol masculino/femenino, vóley, pádel): equipos, fixture, jornadas, llaves/eliminatorias, resultados y planillas.

## Stack
- **Todo en `index.html`** (~97 KB): HTML + CSS + JS **vanilla**, sin framework ni build. Paleta navy/neón.
- **PWA**: `sw.js` (service worker, funciona offline), `manifest.json`, íconos. `200.html` = fallback SPA (convención de **Surge.sh** → está desplegada en Surge). **Plan: migrar a Cloudflare Pages** (consistencia con CHS/Estudio); al migrar, `200.html` → `_redirects`.
- **Datos**: **Firebase Realtime Database** (sync en tiempo real entre dispositivos) + caché en localStorage + **backup/restauración por JSON** (`torneo_backup_*.json`, y backups rotativos en Firebase). El código tiene **protección anti-pérdida** (`saveData`/`fixArrays`: nunca guarda menos equipos que el máximo conocido `fbMaxTeams`). ADMIN_PIN hardcodeado (`1007`). ⚠️ **Revisar las reglas de Firebase** (mismo patrón que Top Lomitos — verificar que no esté abierta a escritura pública).

## Estructura
- `index.html` → la app (lo principal a editar).
- `200.html` → página fallback SPA (Surge.sh).
- `sw.js`, `manifest.json`, íconos → PWA.
- Planillas Excel (`Planillas Futbol/Voley Jornadas`, `FIXTURE FUTBOL`, `RESUMEN - TORNEO`) → material/datos del torneo.

## Cómo correr / probar
Abrir `index.html` en el navegador. Para probar la PWA completa (service worker), servir estático (ej. `python -m http.server`) y abrir en localhost.

## Git / deploy
Repo: `github.com/hassanchaar-1007/torneo-mjjsxx`. Deploy estático en **Surge.sh** (a migrar a Cloudflare Pages). Flujo: `git add -A` → `git commit -m "..."` → `git push`.

## Roadmap / pendientes (acordado jun 2026, hacer en esta sesión)
1. **Historial de campeones** 🏆 → agregar una sección/vista con los campeones por año. **2026 = J48** (campeón de este año). El usuario cargará los campeones de años anteriores. Estructura sugerida: dato `{ año: campeón }`, persistente (localStorage) e incluido en el backup JSON; vista de "Salón de campeones".
2. **Migrar deploy Surge → Cloudflare Pages** (`200.html` → `_redirects` con `/* /index.html 200`; conectar repo o `wrangler pages deploy`).
3. **CAMPAJOR** (carpeta hermana `C:\JORNADAS\campajor`): app del evento de campamento — cronograma sáb/dom, catálogo de 24 yincanas + 5 postas (con materiales/seguridad/video, sembrables desde los PDFs/programa de PF51), patrullas, carga de puntajes, ranking y premiaciones. Materiales fuente: `OneDrive\Desktop\PF51` y `OneDrive\Desktop\varios\PROGRAMA CAMPAJOR Borrador 1.docx`.

## Nota
App de un solo `index.html` con **backend Firebase** (Realtime Database). Mantener el patrón de un solo archivo. Importante: si se toca el manejo de datos, **no romper la protección anti-pérdida ni el backup/restore por JSON** (es el respaldo del torneo). El nuevo dato `campeones[]` ya está integrado en `fixArrays`/`saveData`/backup.
