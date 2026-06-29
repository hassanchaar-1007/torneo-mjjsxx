# Torneo de Integración 2026 (M.J.J.S.XX.)

PWA para gestionar un **torneo deportivo de integración** del movimiento (fútbol masculino/femenino, vóley, pádel): equipos, fixture, jornadas, llaves/eliminatorias, resultados y ranking.

## Stack
- **App:** todo en `index.html` (HTML + CSS + JS vanilla, sin framework ni build).
- **PWA:** `sw.js` (offline), `manifest.json`, íconos. `200.html` = fallback de **Surge.sh** (SPA).
- **Datos:** **Firebase Realtime Database** (sync en tiempo real entre dispositivos) + caché localStorage + **backup/restauración por JSON**. Tiene protección anti-pérdida de datos.

## Cómo correr (local)
Abrir `index.html` en el navegador. Para probar la PWA completa (service worker), servir estático:
```powershell
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Deploy
Actualmente estático en **Surge.sh** (`200.html` maneja el ruteo SPA/offline).
**Plan: migrar a Cloudflare Pages** (consistencia con CHS/Estudio + mejor CDN/límites). Al migrar: `200.html` → `_redirects` con `/* /index.html 200`.

## Estructura
| Archivo | Para qué |
|---|---|
| `index.html` | La app (todo) |
| `200.html` | Fallback de ruteo SPA (Surge.sh) |
| `sw.js`, `manifest.json`, íconos | PWA |
| `Planillas *.xls/.xlsx` | Planillas/datos del torneo (fútbol, vóley, fixture, resumen) |

## Datos / respaldo
Los datos viven en **Firebase Realtime Database** (con backups rotativos en Firebase) + caché local. **Exportá un backup JSON** seguido y guardalo aparte (los `*_backup_*.json` están en `.gitignore` por si tienen datos de participantes). ⚠️ Pendiente: revisar las reglas de seguridad de Firebase (que no esté abierta a escritura pública).

## Repo
`github.com/hassanchaar-1007/torneo-mjjsxx`

---
*Ver `CLAUDE.md` para el contexto técnico de desarrollo.*
