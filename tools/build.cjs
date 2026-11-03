const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
for (const name of ['main.js', 'supabase-config.js']) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, 'Scripts', name)], { stdio: 'inherit', windowsHide: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
require("./generar-iconos.cjs");
fs.mkdirSync(output, { recursive: true });
for (const name of ['index.html', 'page', 'Scripts', 'style', 'logo', 'productos', 'servicios']) fs.cpSync(path.join(root, name), path.join(output, name), { recursive: true });
console.log('Build estático generado en dist/. No se publica automáticamente.');
