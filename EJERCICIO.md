# Ejercicio 1 — Auditoría y endurecimiento del pipeline de GitLab CI

> **Rama:** `tema-24/ejercicio-01` · **Tiempo:** 30 min · **Tipo:** En clase

## Objetivo

Auditar el `.gitlab-ci.yml` plantado, priorizar los olores detectados y aplicar los 3 fixes más rentables, justificando cada decisión. Pinear la imagen base a un digest inmutable y dejar un pipeline endurecido en seguridad, reproducibilidad y feedback al desarrollador.

## Contexto

- Rama base: el estado plantado de esta misma rama (`tema-24/ejercicio-01`). Úsalo como baseline para los diffs (`git diff` sobre el commit inicial de la rama).
- Archivos relevantes: `.gitlab-ci.yml` (objetivo del ejercicio, incluye el pipeline de CI y un job `release` de contexto), `package.json`.
- El `.gitlab-ci.yml` plantado contiene olores reales:
  - `image: node:latest` — tag flotante, sin pin a versión ni a digest `@sha256`.
  - Un único job `ci` que mezcla `npm ci + lint + typecheck + test + build` (sin stages separados, sin `needs:`): un fallo de lint enmascara los de tipos y tests.
  - Sin `cache:` para `~/.npm`: cada pipeline reinstala las dependencias desde cero.
  - Secreto `NPM_TOKEN` declarado en `variables:` **global**: visible para todos los jobs, lint incluido.
  - Sin `interruptible: true`: un push nuevo no cancela el pipeline anterior en cola.
  - Sin `workflow: rules`: el pipeline corre en cualquier rama y en cualquier evento.
- Verificación con runner real es **opcional**: si tienes un proyecto en GitLab con CI/CD activado puedes pushear y ver el pipeline. Si no, el ejercicio se entrega leyendo y editando los archivos.

## Pasos

1. **Setup.** Desde la raíz del repo:
   ```bash
   git checkout tema-24/ejercicio-01
   npm install
   npm test
   ```
   Las 7 suites deben pasar (incluida `ci-fixtures` que valida que el pipeline sigue con los olores plantados).

2. **Diagnóstico.** Abre Claude y pide la auditoría inicial:
   ```
   Audita .gitlab-ci.yml. Lista los problemas en una tabla con
   columnas: olor, riesgo (reproducibilidad / seguridad / coste / DX),
   severidad (alta/media/baja). Sin reescribir todavía.
   ```
   Copia la tabla resultante a `CI-AUDIT.md`.

3. **Priorización.** Pide los 3 fixes que más rentan:
   ```
   De los problemas detectados, dame los 3 que más rentan arreglar primero
   y por qué. Considera impacto en seguridad, tiempo de pipeline y
   feedback al desarrollador.
   ```
   Documenta la priorización en `CI-AUDIT.md`.

4. **Aplicación de fixes.** Aplica los 3 fixes **uno a uno**, viendo el diff antes de aceptar. Para cada uno:
   ```
   Aplica el fix N. Muéstrame el diff. Explica qué cambia en el feedback del MR.
   ```
   Captura el diff y la explicación en `CI-AUDIT.md`.

   Como mínimo aplica:
   - Separar `lint / typecheck / test` en **stages** (o jobs con `needs:`) independientes.
   - Mover el secreto `NPM_TOKEN` fuera de `variables:` global (a una variable protegida del proyecto, o al job concreto que lo necesita) para que `lint` y `test` no lo vean.
   - Añadir `interruptible: true` a los jobs para que un push nuevo cancele el pipeline anterior.

5. **Pin de la imagen a digest.** Pinea `node:latest` a una versión + digest inmutable (`node:24.x.y@sha256:...`):
   ```
   Resuelve image: node:latest a una versión fija con su digest @sha256
   inmutable y deja el tag legible como comentario al lado. Muéstrame el diff.
   ```
   (Si no tienes acceso a la red para resolver el digest real, deja un placeholder `@sha256:<digest>` y anótalo en `CI-AUDIT.md`.)

6. **Sección "Qué dejo para otra iteración".** En `CI-AUDIT.md`, escribe al menos 2 puntos sobre olores que **no** has tocado en este ejercicio y por qué (típicos: `cache:` de `~/.npm`, `workflow: rules` para limitar ramas, `matrix` de versiones de Node, auditar el job `release`). Justifica cada uno.

7. **(Opcional) Verificación con runner real.** Si tienes un proyecto GitLab con CI/CD:
   ```bash
   git push <tu-remote-gitlab> tema-24/ejercicio-01:tu-rama
   # Abre CI/CD → Pipelines en GitLab y observa el run. El primer pipeline
   # con cache: tarda más; el segundo se beneficia del cache de ~/.npm.
   ```
   Anota en `CI-AUDIT.md` cualquier observación relevante.

## Criterio de éxito

- [ ] `CI-AUDIT.md` existe con: tabla de olores (mínimo 5), 3 fixes priorizados con justificación, 3 diffs aplicados con explicación, sección "Qué dejo para otra iteración" con mínimo 2 puntos justificados.
- [ ] El `.gitlab-ci.yml` final tiene los stages `lint / typecheck / test` separados (o jobs con `needs:`), el secreto fuera de `variables:` global, `interruptible: true` en los jobs, y la imagen pinneada a digest con comentario del tag.
- [ ] `npm test` sigue verde salvo el smoke test `ci-fixtures`. **Nota:** `ci-fixtures` quedará en rojo porque valida que el pipeline sigue con los olores plantados — es esperable y forma parte del ejercicio. Documéntalo en el `.md`.

## Preguntas de reflexión

1. ¿Qué fix de los 3 te ahorra más tiempo en el día a día? ¿Cuál te ahorra más en una incidencia de seguridad?
2. En GitLab, ¿dónde vive realmente la protección de un secreto: en el `.gitlab-ci.yml`, en las *CI/CD Variables* protegidas del proyecto, o en ambos? ¿Qué parte de la mitigación NO se ve en el YAML?
3. ¿En qué punto del ciclo (commit hook, pipeline de MR, code review humano, política de plataforma) detectarías estos olores en tu equipo? Justifica.
