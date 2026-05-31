# Ejercicio 1 — Auditoría y reescritura del Dockerfile

> **Rama:** `tema-23/ejercicio-01` · **Tiempo:** 30 min · **Tipo:** En clase

## Objetivo

Auditar el `Dockerfile` plantado en la raíz, priorizar los olores detectados y aplicar los 3 fixes más rentables justificando cada decisión. Crear un `.dockerignore` mínimo correcto.

## Contexto

- Rama base: `tema-23/inicio`.
- Archivos relevantes: `Dockerfile` (en la raíz), `package.json`, `package-lock.json`.
- El `Dockerfile` plantado contiene olores reales y plantados a propósito (sin slim, `COPY . .` antes de instalar deps, `npm install` en lugar de `npm ci`, sin usuario no-root, `.dockerignore` ausente).
- Verificación con Docker es **opcional**: si tienes Docker disponible, puedes ejecutar `docker build .` antes y después y comparar tamaño. Si no, el ejercicio se entrega leyendo y editando los archivos.

## Pasos

1. **Setup.** Desde la raíz del repo:
   ```bash
   git checkout tema-23/ejercicio-01
   npm install
   npm test
   ```
   Las 6 suites deben pasar (incluida `docker-fixtures` que valida que el Dockerfile sigue con los olores plantados).

2. **Diagnóstico.** Abre Claude y pide la auditoría inicial:
   ```
   Audita el Dockerfile de este repo. Lista los problemas en una tabla con
   columnas: olor, impacto, severidad (alta/media/baja). Sin reescribir todavía.
   ```
   Copia la tabla resultante a `DOCKERFILE-AUDIT.md`.

3. **Priorización.** Pide los 3 fixes que más rentan:
   ```
   De los problemas detectados, dame los 3 que más rentan arreglar primero
   y por qué. Considera impacto en build time, tamaño de imagen y seguridad.
   ```
   Documenta la priorización en `DOCKERFILE-AUDIT.md`.

4. **Aplicación de fixes.** Aplica los 3 fixes **uno a uno**, viendo el diff antes de aceptar. Para cada uno:
   ```
   Aplica el fix N. Muéstrame el diff. Explica qué cambia en la build.
   ```
   Captura el diff y la explicación en `DOCKERFILE-AUDIT.md`.

5. **`.dockerignore`.** Crea un `.dockerignore` mínimo correcto:
   ```
   Crea un .dockerignore mínimo correcto: ignorar node_modules/, .git/,
   .env*, logs/, coverage/, *.md salvo README.md.
   ```

6. **Decisión sobre multi-stage.** En `DOCKERFILE-AUDIT.md`, escribe una sección de 1 párrafo donde decidas si introduces multi-stage **ahora** o lo dejas para una iteración posterior. Justifica.

7. **(Opcional) Verificación con Docker.** Si tienes Docker disponible:
   ```bash
   # Estado inicial (antes de los fixes):
   git stash    # guarda tus cambios
   docker build -t notebox:before .
   docker images notebox

   # Estado tras los fixes:
   git stash pop
   docker build -t notebox:after .
   docker images notebox
   ```
   Anota los tamaños antes/después en `DOCKERFILE-AUDIT.md`.

## Criterio de éxito

- [ ] `DOCKERFILE-AUDIT.md` existe con: tabla de olores (mínimo 5), 3 fixes priorizados con justificación, 3 diffs aplicados con explicación, decisión razonada sobre multi-stage.
- [ ] El `Dockerfile` final usa imagen slim/alpine, `npm ci`, capas ordenadas para cache, usuario no-root.
- [ ] `.dockerignore` está creado y excluye al menos `node_modules`, `.git`, `.env*`, `logs/`, `coverage/`.
- [ ] `npm test` sigue verde. (Nota: el smoke test `docker-fixtures` quedará en rojo porque valida que el Dockerfile sigue con los olores plantados — es esperable y forma parte del ejercicio. Documéntalo en el `.md`.)

## Preguntas de reflexión

1. ¿Qué fix de los 3 te ahorra más tiempo en el día a día? ¿Cuál te ahorra más en producción?
2. Si tu equipo tuviera que adoptar **una sola** regla de revisión de Dockerfiles, ¿cuál pondrías y por qué?
3. ¿En qué punto del ciclo (commit hook, CI, code review humano) detectarías estos olores en tu equipo? Justifica.
