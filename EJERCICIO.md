# Ejercicio 2 — Endurecimiento del script de release y diseño del rollback

> **Rama:** `tema-24/ejercicio-02` · **Tiempo:** 30 min · **Tipo:** En clase

## Objetivo

Endurecer el `scripts/release.sh` plantado con `set -euo pipefail`, validación de argumentos y al menos 4 validaciones previas reales. **Diseñar `scripts/rollback.sh` desde cero** con confirmación interactiva, verificación de tag existente y smoke test post-rollback. Aprender a separar lo que el script ejecuta de lo que decide el humano.

## Contexto

- Rama base: el estado plantado de esta misma rama (`tema-24/ejercicio-02`). Úsalo como baseline para los diffs.
- El repo usa **GitLab CI** (hay un `.gitlab-ci.yml` en la raíz). Los scripts de `scripts/` son los que el pipeline invoca o los que el equipo lanza a mano para release y rollback.
- Archivos relevantes: `scripts/release.sh` (plantado, hay que endurecerlo), `scripts/rollback.sh` (NO existe — hay que crearlo).
- El `release.sh` plantado tiene olores reales: `set -e` solo (sin `-u` ni `-o pipefail`), sin validar working tree, sin validar rama, sin validar tag inexistente, sin correr tests, hace `git push origin main --tags` automático sin confirmación humana, `$VERSION` sin entrecomillar.
- `scripts/rollback.sh` no existe a propósito: el ejercicio incluye **diseñarlo** con Claude como pair.

## Pasos

1. **Setup.** Desde la raíz del repo:
   ```bash
   git checkout tema-24/ejercicio-02
   npm install
   npm test
   ```
   Las 7 suites deben pasar.

2. **Diagnóstico del `release.sh`.** Abre Claude y pide la auditoría inicial:
   ```
   Lee scripts/release.sh. Lista qué validaciones le faltan a un script
   de release decente y qué riesgos tiene cada omisión. Tabla con
   columnas: validación faltante, riesgo, cómo añadirla.
   ```
   Copia la tabla a `RELEASE-NOTES.md`.

3. **Cambiar el preludio.** Cambia el shebang y el `set` a `-euo pipefail`, valida que se pasa la versión como `$1`:
   ```
   Cambia el shebang y el set inicial a -euo pipefail. Valida que se
   pasa la versión como primer argumento. Diff antes/después.
   ```

4. **Añadir validaciones previas.** Añade al menos 4 validaciones, cada una con su mensaje de error específico y exit code distinto:
   ```
   Añade estas validaciones antes de tocar tags, en este orden:
   working tree limpio, rama actual = main, tag no existe, npm test
   verde. Cada una con un mensaje de error específico y exit code
   distinto. Diff completo.
   ```

5. **Reemplazar el push automático.** Cambia el `git push origin main --tags` por un `echo` con la instrucción exacta que el humano tiene que ejecutar:
   ```
   Reemplaza el git push --tags automático por un echo con el comando
   exacto que el dev tiene que ejecutar manualmente. El script crea el
   tag local; el push lo decide el humano.
   ```

6. **Diseñar `scripts/rollback.sh` desde cero.** Pide a Claude el diseño y revísalo críticamente:
   ```
   Diseña scripts/rollback.sh para volver a una versión anterior.
   Requisitos:
   - set -euo pipefail.
   - Acepta la versión anterior como $1 (ej: 1.3.5).
   - Verifica que el tag v<version> existe.
   - Confirmación interactiva antes de actuar (read -r confirm).
   - Comando de re-deploy como placeholder comentado (no hay
     infra real, dejarlo como comentario con ejemplos para la GitLab
     Container Registry (registry.gitlab.com/...), kubectl y npm).
   - Smoke test post-rollback con curl -fsS contra HEALTH_URL
     (env var con default).
   - Exit code distinto por cada modo de fallo.
   Muéstrame el script completo.
   ```
   Crea el archivo en `scripts/rollback.sh`. Hazlo ejecutable con `chmod +x scripts/rollback.sh`.

7. **Revisión final con shellcheck mental.** Pide a Claude un repaso:
   ```
   Repasa scripts/release.sh y scripts/rollback.sh finales. Hay alguna
   comilla mal puesta, variable sin entrecomillar, comando que podría
   fallar silenciosamente, exit code duplicado entre ambos scripts?
   ```

8. **Rellenar `RELEASE-NOTES.md`** con:
   - Tabla de validaciones aplicadas (qué valida, por qué importa, exit code asignado).
   - Diff completo de `scripts/release.sh`.
   - Contenido completo de `scripts/rollback.sh`.
   - Respuesta razonada a "¿qué decisión no automatizo nunca y por qué?" — **mínimo 2 ejemplos** justificados.

## Criterio de éxito

- [ ] `scripts/release.sh` tiene `set -euo pipefail` activo, valida argumento, valida working tree, rama, tag y tests antes de tagear. El push final es manual (echo con instrucciones).
- [ ] `scripts/rollback.sh` existe, es ejecutable, tiene confirmación interactiva, verifica tag, tiene smoke test con `curl -fsS`, y exit codes distintos por modo de fallo.
- [ ] `RELEASE-NOTES.md` existe con tabla, diff completo de `release.sh`, contenido completo de `rollback.sh`, y mínimo 2 decisiones justificadas que no automatizas.
- [ ] `npm test` sigue verde. **Nota:** el smoke test `ci-fixtures` quedará en rojo en la parte que valida `release.sh` (porque ya no tiene los olores plantados) — es esperable. Documéntalo en el `.md`.

## Preguntas de reflexión

1. ¿Qué pasa si un humano lanza `./scripts/release.sh 1.4.0` desde una rama `feature/x` accidentalmente? ¿En qué paso falla tu script y con qué mensaje?
2. ¿Por qué el `git push` lo dejamos manual? ¿Qué se gana exactamente respecto a hacerlo dentro del script?
3. Tu `rollback.sh` hace `curl -fsS` al `/health` tras desplegar. Si el health responde 200 pero la app tiene un bug funcional, ¿qué cambia? ¿Cómo lo mitigarías?
