# Notebox — repo de prácticas del Tema 23 (Docker, entornos reproducibles y troubleshooting)

> Rama `tema-23/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). Se mantienen los fixtures de temas anteriores (servidor MCP del Tema 20, plugin local `pr-helper` del Tema 21, comandos slash + script de dev-server + `notas-soporte/` del Tema 22). Para el Tema 23 se añaden: un `Dockerfile` plantado con olores reales (sin slim, `COPY . .` antes de instalar deps, `npm install` en lugar de `npm ci`, sin usuario no-root, sin `.dockerignore`), un `docker-compose.yml` con un servicio `app` y un placeholder `db-dummy` comentado **y un mismatch intencional** entre `PORT` (compose) y `SERVER_PORT` (código), y un `.env.example` con las variables del entorno. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript) **más** servidor MCP propio **más** plugin local **más** fixtures de CLI avanzada **más** kit completo para practicar Docker: auditoría de Dockerfile, extensión de `docker-compose` multi-servicio y diagnóstico de fallos plantados.

## Qué hay plantado para el Tema 23

| Pieza | Ruta | Para qué |
|---|---|---|
| Dockerfile con olores reales | `Dockerfile` | Auditarlo en el Ejercicio 1 (sin slim, `npm install`, `COPY . .` antes de install, sin USER) |
| `.dockerignore` **ausente** | (no existe) | El Ejercicio 1 pide crearlo correctamente |
| docker-compose con mismatch plantado | `docker-compose.yml` | Servicio `app` con `PORT=3001` en environment (cuando la app lee `SERVER_PORT`). Placeholder `db-dummy` comentado para el Ejercicio 2 |
| Plantilla de variables de entorno | `.env.example` | Documenta `SERVER_PORT` y las variables de Postgres. Se copia a `.env` (no trackeado) en el Ejercicio 2 |
| Endpoint `/health` | `src/server.ts` (ya existente) | Usado por el healthcheck del compose en el Ejercicio 2 |
| Smoke test de fixtures Docker | `test/docker-fixtures.test.ts` | Valida que el Dockerfile, el compose y `.env.example` siguen con la forma esperada |

## Fixtures heredados de temas anteriores (siguen disponibles)

| Pieza | Ruta | Tema |
|---|---|---|
| Subagentes | `.claude/agents/` | Tema 19 |
| Servidor MCP propio | `mcp-servers/notebox/` + `.mcp.json` | Tema 20 |
| Plugin local `pr-helper` | `.claude/plugins/pr-helper/` | Tema 21 |
| Comando slash del proyecto | `.claude/commands/repo-status.md` | Tema 22 |
| Script de dev-server | `scripts/dev-server.sh` | Tema 22 |
| Tareas de sesión larga | `notas-sesion.md` | Tema 22 |
| Material auxiliar para `--add-dir` | `notas-soporte/` | Tema 22 |

## Estructura del proyecto

```
Dockerfile                # PLANTADO con olores reales (Tema 23)
docker-compose.yml        # PLANTADO con mismatch PORT/SERVER_PORT (Tema 23)
.env.example              # Variables de entorno documentadas (Tema 23)
src/
  server.ts               # Lee process.env.SERVER_PORT (convención del proyecto)
  routes/notes.ts
  services/notes.ts
  storage/memory.ts
  search/index.ts
  models/note.ts
test/
  notes.service.test.ts
  storage.test.ts
  mcp-notebox.test.ts
  plugin-pr-helper.test.ts
  cli-fixtures.test.ts
  docker-fixtures.test.ts # Smoke test del fixture del Tema 23
mcp-servers/notebox/      # Tema 20
.mcp.json
.claude/
  agents/                 # Tema 19
  commands/               # Tema 22
  plugins/pr-helper/      # Tema 21
  settings.json
scripts/dev-server.sh     # Tema 22
logs/                     # Tema 22 (con .gitkeep)
notas-sesion.md           # Tema 22
notas-soporte/            # Tema 22
```

## Arranque

```bash
npm install
npm test        # 6 suites verdes (notes.service, storage, mcp-notebox, plugin-pr-helper, cli-fixtures, docker-fixtures)
```

## Cómo usar los fixtures del Tema 23

### Sin Docker (entrega los `.md` igualmente)

Los tres ejercicios se pueden completar leyendo y editando los archivos:

- **Ejercicio 1:** lee `Dockerfile`, audita con Claude, aplica fixes, crea `.dockerignore`. Entrega `DOCKERFILE-AUDIT.md`.
- **Ejercicio 2:** lee `docker-compose.yml`, extiende con healthcheck + db-dummy + env_file. Entrega `COMPOSE-NOTES.md`.
- **Ejercicio 3:** lee `docker-compose.yml` y `src/server.ts`, identifica el mismatch, aplica el fix. Entrega `TROUBLESHOOTING.md`.

### Con Docker disponible (verificación end-to-end)

Verificación opcional pero recomendable:

```bash
# Ejercicio 1: comprobar que el Dockerfile inicial construye y mide tamaño
docker build -t notebox:before .
docker images notebox
# Después de los fixes:
docker build -t notebox:after .
docker images notebox

# Ejercicio 2: validar y levantar el compose extendido
cp .env.example .env
docker compose config
docker compose up -d
docker compose ps   # verificar healths

# Ejercicio 3: reproducir el mismatch y verificar el fix
docker compose up -d
curl -i http://localhost:3001/health   # falla con el compose inicial
docker compose logs app                # muestra "listening on :3000"
# Aplicar el fix (PORT -> SERVER_PORT en compose) y recrear:
docker compose up -d --force-recreate app
curl -i http://localhost:3001/health   # ahora responde
```

> **Importante:** los smoke tests de `test/docker-fixtures.test.ts` validan estructura, no comportamiento. Si Docker no está disponible, `npm test` sigue pasando — la lectura crítica y la decisión arquitectónica son lo que evaluamos.

## Sobre el mismatch `PORT` ↔ `SERVER_PORT`

El `docker-compose.yml` plantado declara `PORT=3001` en el `environment:` del servicio `app`, pero `src/server.ts` lee `process.env.SERVER_PORT`. Al levantar, la app cae al default (`3000`) y `curl http://localhost:3001/health` falla. Es el escenario del Ejercicio 3.

No arregles el mismatch en `tema-23/inicio`: cada `tema-23/ejercicio-0N` parte de este estado.
