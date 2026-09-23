// Carga una patrulla (nombre + integrantes + cedulas) directo a Firebase via Admin SDK,
// sin pasar por el login de staff en el navegador. Requiere .secrets/serviceAccountKey.json
// (nunca se sube al repo - ver .gitignore).
//
// Uso: node .tools/campajor-cargar-patrulla.mjs "Nombre de la patrulla" ruta/al/texto.txt
//
// El texto pegado puede venir en 2 formatos (los mismos que entiende la carga masiva del sitio):
//  (A) bloques separadas por linea en blanco: Nombre / Apodo / Jornada / Cedula
//  (B) una linea por persona: "Nombre (Apodo) cedula * J52"
// Lineas de encabezado tipo "Nombre de la patrulla: X" / "Integrantes:" / "Lider: X" se ignoran solas.

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import admin from 'firebase-admin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = join(__dirname, '..', '.secrets', 'serviceAccountKey.json');

if (!existsSync(keyPath)) {
  console.error('❌ No encuentro .secrets/serviceAccountKey.json. Guardá ahí la clave descargada de Firebase (Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada).');
  process.exit(1);
}

const [, , nombrePatrullaArg, archivoTextoArg] = process.argv;
if (!nombrePatrullaArg || !archivoTextoArg) {
  console.error('Uso: node .tools/campajor-cargar-patrulla.mjs "Nombre de la patrulla" ruta/al/texto.txt');
  process.exit(1);
}
if (!existsSync(archivoTextoArg)) {
  console.error('❌ No encuentro el archivo de texto: ' + archivoTextoArg);
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://torneo-mjjsxx-default-rtdb.firebaseio.com',
});

const db = admin.database();

// ── Mismo parser que usa el sitio (index.html), portado a Node ──────────────
function sanitizarClave(s) { return String(s).replace(/[.#$[\]/]/g, '_'); }

function esLineaCabecera(linea) {
  return /^(nombre\s+de\s+la\s+patrulla|patrulla|l[ií]der|responsable|jefe)\s*:.*$/i.test(linea)
    || /^integrantes\s*:?\s*$/i.test(linea);
}

function extraerCedula(linea) {
  const m = linea.replace(/\([^)]*\)/, '').match(/\b(\d[\d.]{4,}\d)\b/);
  return m ? m[1] : '';
}

function pareceLineaDePersona(linea) {
  return /\(([^)]+)\)/.test(linea) || /J\s*\d{1,3}\b/i.test(linea);
}

function formatearEntrada(linea) {
  const apodoMatch = linea.match(/\(([^)]+)\)/);
  const apodo = apodoMatch ? apodoMatch[1].trim() : '';
  const nombre = linea.split('(')[0].replace(/^\d+[.)]\s*/, '').trim();
  const jornadaMatch = linea.match(/J\s*\d{1,3}\b/i);
  const jornada = jornadaMatch ? jornadaMatch[0].toUpperCase().replace(/\s+/, '') : '';
  let texto = nombre;
  if (apodo) texto += ` ("${apodo}")`;
  if (jornada) texto += ` · ${jornada}`;
  return { texto, cedula: extraerCedula(linea) };
}

function parseCargaMasiva(textoOriginal) {
  let texto = textoOriginal.replace(/[*_]/g, '');
  texto = texto.split('\n').filter((l) => !esLineaCabecera(l.trim())).join('\n');
  const bloques = texto.split(/\n\s*\n/);
  const out = [];
  for (const bloque of bloques) {
    const lineas = bloque.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lineas.length) continue;
    const todasSonPersona = lineas.every(pareceLineaDePersona);
    if (todasSonPersona) {
      for (const l of lineas) out.push(formatearEntrada(l));
    } else {
      const nombre = lineas[0].replace(/^\d+[.)]\s*/, '');
      const apodo = lineas[1] || '';
      const jornadaRaw = lineas[2] || '';
      const jornadaMatch = jornadaRaw.match(/J\s*\d{1,3}\b/i);
      const jornada = jornadaMatch ? jornadaMatch[0].toUpperCase().replace(/\s+/, '') : jornadaRaw;
      const cedula = lineas[3] ? (extraerCedula(lineas[3]) || lineas[3].replace(/[^\d.]/g, '')) : '';
      let texto2 = nombre;
      if (apodo) texto2 += ` ("${apodo}")`;
      if (jornada) texto2 += ` · ${jornada}`;
      out.push({ texto: texto2, cedula });
    }
  }
  return out;
}
// ─────────────────────────────────────────────────────────────────────────

const textoRaw = readFileSync(archivoTextoArg, 'utf8');
const parsed = parseCargaMasiva(textoRaw);

if (!parsed.length) {
  console.error('❌ No se detectó ningún integrante en el texto. Revisá el formato.');
  process.exit(1);
}

console.log(`Detecté ${parsed.length} integrantes para "${nombrePatrullaArg}":`);
for (const p of parsed) console.log(`  • ${p.texto}${p.cedula ? ` (C.I. ${p.cedula})` : ''}`);

const patrullasRef = db.ref('campajor/patrullas');
const snap = await patrullasRef.once('value');
const patrullas = snap.val() || [];

let idx = patrullas.findIndex((p) => p && p.nombre === nombrePatrullaArg);
if (idx === -1) {
  patrullas.push({ nombre: nombrePatrullaArg, integrantes: [] });
  idx = patrullas.length - 1;
}
patrullas[idx].integrantes = (patrullas[idx].integrantes || []).concat(parsed.map((p) => p.texto));

await patrullasRef.set(patrullas);
console.log(`✅ Guardado en campajor/patrullas[${idx}] — ahora tiene ${patrullas[idx].integrantes.length} integrantes.`);

const cedulas = parsed.map((p) => p.cedula || '');
if (cedulas.some(Boolean)) {
  const cedulasRef = db.ref(`campajor_privado/${sanitizarClave(nombrePatrullaArg)}/cedulas`);
  const cedSnap = await cedulasRef.once('value');
  const actuales = cedSnap.val() || [];
  await cedulasRef.set(actuales.concat(cedulas));
  console.log(`✅ Cédulas guardadas en campajor_privado (${cedulas.filter(Boolean).length} con cédula).`);
}

console.log('🚩 Listo.');
process.exit(0);
