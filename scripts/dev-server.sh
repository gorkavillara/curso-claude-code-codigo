#!/usr/bin/env bash
# scripts/dev-server.sh — Servidor de eco simple para demos del Tema 22.
#
# Arranca un servidor HTTP minimalista en el puerto 3001 (configurable con
# $DEV_SERVER_PORT) que responde con eco a cualquier petición. Escribe la
# actividad a logs/dev-server.log para que las demos de "comandos en background"
# tengan algo que inspeccionar.
#
# Se diseña para lanzarse desde una sesión de Claude Code en background. No
# requiere instalar nada: usa Node, que ya está en el repo (Node 24+).

set -euo pipefail

PORT="${DEV_SERVER_PORT:-3001}"
LOG_FILE="logs/dev-server.log"

# Garantizar que logs/ existe (en repo está como .gitkeep, pero por si acaso).
mkdir -p logs

# Pista visible en stdout para que la sesión de Claude detecte el arranque.
echo "[dev-server] Arrancando en puerto ${PORT}. Logs en ${LOG_FILE}."

# Lanzar el servidor con node -e: sin archivo extra, autocontenido.
node -e "
const http = require('http');
const fs = require('fs');
const port = ${PORT};
const logFile = '${LOG_FILE}';

function log(line) {
  const ts = new Date().toISOString();
  fs.appendFileSync(logFile, '[' + ts + '] ' + line + '\n');
}

log('server-start port=' + port);

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    log(req.method + ' ' + req.url + ' bytes=' + body.length);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: body || null,
      ts: new Date().toISOString(),
    }, null, 2));
  });
});

server.listen(port, () => {
  console.log('[dev-server] Escuchando en http://localhost:' + port);
});

// Cerrar limpio si recibimos SIGTERM (background kill).
process.on('SIGTERM', () => {
  log('server-stop signal=SIGTERM');
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  log('server-stop signal=SIGINT');
  server.close(() => process.exit(0));
});
"
