# Ejercicio 3 — Triage de un fallo de pipeline a partir de su log

> **Rama:** `tema-24/ejercicio-03` · **Tiempo:** 30 min · **Tipo:** En clase

## Objetivo

Diagnosticar el fallo plantado en `logs/pipeline-fail.log` (un job de **GitLab CI**) aplicando la disciplina de **filtrar el log antes de pegarlo al agente**, formular 3 hipótesis ordenadas por probabilidad, verificar la correcta cruzándola con `.gitlab-ci.yml`, `package.json` y `package-lock.json`, y decidir el fix justificado (regenerar lockfile vs ablandar el pipeline vs ambos). Dejar documentado **cómo evitarlo la próxima vez**.

## Contexto

- Rama base: el estado plantado de esta misma rama (`tema-24/ejercicio-03`).
- Archivos relevantes: `logs/pipeline-fail.log` (objetivo del triage, log de un job de GitLab Runner), `.gitlab-ci.yml`, `package.json`, `package-lock.json`.
- El log plantado es un fallo **real**: `npm ci` rompe porque el lockfile está desactualizado (`Missing: vitest@1.6.0 from lock file`). Las primeras ~40 líneas son ruido de setup del runner (preparar el executor, pull de la imagen, `get_sources`, `restore_cache`); el bloque del error vive hacia el final, dentro de la sección `step_script`.
- Verificación con runner real no aplica: el ejercicio se entrega leyendo el log y los archivos.

## Pasos

1. **Setup.** Desde la raíz del repo:
   ```bash
   git checkout tema-24/ejercicio-03
   npm install
   npm test
   ```
   Las 7 suites deben pasar.

2. **Filtrado del log.** **Antes** de pegar nada al agente, filtra el log con `grep` o equivalente para localizar el bloque del error real:
   ```bash
   grep -n -i "npm error\|EUSAGE\|ERROR: Job failed" logs/pipeline-fail.log
   ```
   O en PowerShell:
   ```powershell
   Select-String -Path logs/pipeline-fail.log -Pattern "npm error|EUSAGE|ERROR: Job failed"
   ```
   Anota qué líneas marca el filtro.

3. **Localización del bloque relevante con Claude.** Confirma con Claude:
   ```
   Lee logs/pipeline-fail.log. Identifica las primeras 20 líneas que
   contienen el error real (ignorando el setup del runner). Cítalas
   literalmente.
   ```
   Copia esas líneas a `PIPELINE-TRIAGE.md`.

4. **3 hipótesis ordenadas.**
   ```
   Con esas líneas, dame 3 hipótesis ordenadas por probabilidad sobre
   qué está fallando. Para cada una: cómo verificarla en menos de 5 min.
   ```
   Copia las 3 hipótesis a `PIPELINE-TRIAGE.md`.

5. **Verificación cruzada.** Verifica la hipótesis 1 leyendo el pipeline y los archivos del repo:
   ```
   Verifica la hipótesis 1 leyendo .gitlab-ci.yml,
   package.json y package-lock.json. ¿Coincide el setup con lo que
   falla en el log?
   ```
   Documenta lo que has leído y la conclusión.

6. **Decisión del fix.** Propón el fix mínimo, **sin aplicarlo todavía**:
   ```
   Propón el fix mínimo. No lo apliques todavía — quiero ver el diff y
   decidir si toco el .gitlab-ci.yml o regenero el lockfile.
   ```
   Justifica en `PIPELINE-TRIAGE.md` cuál eliges y por qué.

7. **Documentar el patrón.** Apunta el grep/filtro que más rápido te habría llevado al error y cómo evitar que vuelva:
   ```
   ¿Qué línea del log es la que más rápido habría llevado a la causa?
   ¿Cómo la buscaría yo la próxima vez (grep, filtro, qué keyword)?
   ¿Qué check de pipeline o convención de equipo evitaría que vuelva?
   ```

8. **Rellenar `PIPELINE-TRIAGE.md`** con:
   - Comando(s) de filtro usados sobre el log (qué grep, qué keywords).
   - Bloque del log relevante (citado literal, máximo 30 líneas).
   - Las 3 hipótesis, en orden, con verificación de cada una.
   - Decisión del fix con diff propuesto (`.gitlab-ci.yml` vs lockfile vs ambos), justificada.
   - "Qué grep / filtro me habría llevado más rápido al error" — al menos 2 keywords útiles.
   - "Cómo evito que vuelva" — un check de pipeline, hook pre-commit o convención de equipo accionable.

## Criterio de éxito

- [ ] `PIPELINE-TRIAGE.md` existe con: comandos de filtro, bloque del log (citado, máximo 30 líneas), 3 hipótesis verificadas, fix propuesto con diff y justificación, 2+ keywords útiles, plan accionable para evitar la regresión.
- [ ] La hipótesis 1 identifica desincronización entre `package.json` y `package-lock.json` (o equivalente — lo importante es que cite la pista `Missing: vitest@`, no que adivine).
- [ ] La decisión del fix está justificada (típicamente: regenerar el lockfile con `npm install --package-lock-only` y commitearlo; **no** ablandar el pipeline cambiando `npm ci` por `npm install`).
- [ ] `npm test` sigue verde.

## Preguntas de reflexión

1. Si hubieras pegado el log entero al agente sin filtrar, ¿qué crees que habría pasado? ¿En qué momento habrías perdido más tiempo? (Pista: un log de GitLab real de un job con `restore_cache` y artifacts puede tener miles de líneas.)
2. ¿Por qué `npm ci` es el comando correcto en CI a pesar de que el síntoma "se arregla" cambiando a `npm install`?
3. Tu compañera junior te pregunta "¿por qué este MR no pasa el pipeline si en local funciona?". ¿Qué le respondes en 3 frases?
