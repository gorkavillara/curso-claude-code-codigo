# Ejercicio 2 — Compose multi-servicio para entorno local

> **Rama:** `tema-23/ejercicio-02` · **Tiempo:** 30 min · **Tipo:** En clase

## Objetivo

Extender el `docker-compose.yml` plantado para que la app y un servicio `db-dummy` (Postgres pinneado) arranquen como un entorno completo y reproducible: healthcheck real, `depends_on` condicional, credenciales en `env_file`.

## Contexto

- Rama base: `tema-23/inicio`.
- Archivos relevantes: `docker-compose.yml` (plantado con servicio `app` y placeholder `db-dummy` comentado), `.env.example`, `src/server.ts` (endpoint `/health` ya implementado).
- El compose plantado **contiene un mismatch intencional** (`PORT` vs `SERVER_PORT`) que se diagnostica en el Ejercicio 3. En este ejercicio puedes ignorarlo o señalarlo en `COMPOSE-NOTES.md`, pero **no lo arregles** — eso es del Ejercicio 3.
- Verificación con Docker es **opcional**.

## Pasos

1. **Setup.** Desde la raíz del repo:
   ```bash
   git checkout tema-23/ejercicio-02
   npm install
   npm test
   ```
   Las 6 suites deben pasar.

2. **Diagnóstico del compose.** Abre Claude y pide:
   ```
   Lee docker-compose.yml. Lista qué hay declarado y qué faltaría
   para un entorno realista (db, healthcheck, env_file, networks).
   ```
   Copia el inventario a `COMPOSE-NOTES.md`.

3. **Healthcheck del servicio `app`.** Pide:
   ```
   Añade un healthcheck al servicio app que llame a GET /health
   cada 10s con un retry de 3. Muéstrame el diff.
   ```
   El endpoint `/health` ya existe en `src/server.ts`. Usa `wget -qO-` (no `curl`: la imagen slim no lo trae).

4. **Activar `db-dummy`.** Descomenta y completa el servicio:
   ```
   Activa el servicio db-dummy con postgres:16-alpine, healthcheck con
   pg_isready, env_file .env (no environment literal). La app debe esperar
   a que db-dummy esté healthy antes de arrancar.
   ```
   Verifica que:
   - La imagen está pinneada (`postgres:16-alpine`, no `postgres:latest`).
   - El healthcheck usa `pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}`.
   - Los volúmenes son nombrados (`db-data:`) para persistencia.
   - El `depends_on` del servicio `app` usa `condition: service_healthy`.

5. **`.env` local.** Copia el `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Verifica que `.env` está en `.gitignore` (`git status` no debe mostrarlo).

6. **(Opcional) Verificación con Docker.**
   ```bash
   docker compose config            # valida el YAML
   docker compose up -d
   docker compose ps                # ambos servicios deben aparecer healthy
   docker compose down
   ```

7. **`COMPOSE-NOTES.md`.** Documenta:
   - El YAML final, comentado bloque a bloque.
   - Decisión razonada: ¿expones el puerto de Postgres al host (`5432:5432`) o lo dejas solo en la red interna? Justifica.
   - Sección "qué arrancaría distinto en producción": mínimo 3 puntos (imagen, secretos, healthcheck, escala, logging).
   - (Si corriste Docker) Output de `docker compose ps` mostrando los healths.

## Criterio de éxito

- [ ] `docker-compose.yml` final tiene healthcheck en `app`, servicio `db-dummy` activo con Postgres pinneado, `depends_on` condicional, `env_file: .env`.
- [ ] No hay credenciales literales en el YAML (passwords solo en `.env`, que no se commitea).
- [ ] `.env` existe localmente pero **no** aparece en `git status`.
- [ ] `COMPOSE-NOTES.md` existe con el YAML comentado, decisión sobre puertos y diferencias con producción.
- [ ] `npm test` sigue verde.

## Preguntas de reflexión

1. ¿Por qué `depends_on: condition: service_healthy` es distinto de `depends_on: [db-dummy]` a secas? ¿Cuándo importa la diferencia?
2. Si tu equipo tuviera 8 servicios en `docker-compose`, ¿qué pondrías en un `profile` opcional y qué dejarías arrancando por defecto?
3. ¿Qué partes del compose **no** valdrían en producción y cómo las separarías (override file, helm chart, otra herramienta)?
