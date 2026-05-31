# Ejercicio 3 — Diagnóstico de un fallo plantado (mismatch `PORT` ↔ `SERVER_PORT`)

> **Rama:** `tema-23/ejercicio-03` · **Tiempo:** 30 min · **Tipo:** En clase

## Objetivo

Reproducir el fallo plantado, aplicar la disciplina del troubleshooting (log + comando + archivo en el primer prompt), obtener 3 hipótesis ordenadas, verificarlas y aplicar el fix justificando la decisión arquitectónica (¿cambias el compose o el código?).

## Contexto

- Rama base: `tema-23/inicio`.
- Archivos relevantes: `docker-compose.yml`, `src/server.ts`, `.env.example`.
- **Fallo plantado:** el servicio `app` del `docker-compose.yml` declara `PORT=3001` en `environment:`, pero `src/server.ts` lee `process.env.SERVER_PORT`. La app arranca pero cae al puerto por defecto (`3000`), no al mapeado (`3001`). `curl http://localhost:3001/health` falla o da timeout.
- Verificación con Docker es **opcional**. Si no tienes Docker, lee los dos archivos: el mismatch es visible a ojo si los miras a la vez.

## Pasos

1. **Setup.** Desde la raíz del repo:
   ```bash
   git checkout tema-23/ejercicio-03
   npm install
   npm test
   ```
   Las 6 suites deben pasar (incluida `docker-fixtures` que valida que el mismatch sigue plantado).

2. **Reproducir el fallo (opcional, requiere Docker).**
   ```bash
   docker compose up -d
   docker compose ps
   curl -i http://localhost:3001/health         # falla o timeout
   docker compose logs app                      # muestra "listening on :3000"
   ```
   Captura el output literal en `TROUBLESHOOTING.md`. Si no tienes Docker, **escribe**: "no tengo Docker, leo los archivos directamente" y pasa al paso 3.

3. **Diagnóstico con la regla del log.** En el REPL de Claude, prepara un prompt que incluya:
   - El contenido literal de `docker-compose.yml`.
   - El contenido literal de `src/server.ts` (al menos la parte del `listen`).
   - El log (si lo tienes) o la observación de "la app arranca pero `/health` no responde en el puerto mapeado".

   Ejemplo de prompt:
   ```
   Aquí tienes el docker-compose.yml, el Dockerfile y src/server.ts.
   La app arranca pero /health no responde en el puerto mapeado. Dame
   3 hipótesis ordenadas por probabilidad, con cómo verificar cada una.
   ```

4. **Verificar la hipótesis 1.** Pide:
   ```
   Verifica la hipótesis 1 leyendo src/server.ts y el environment del
   docker-compose. ¿Coinciden los nombres de variable?
   ```
   Anota lo que encuentras en `TROUBLESHOOTING.md`.

5. **Aplicar el fix.** Decide **antes** si cambias el compose o el código. Razones a sopesar:
   - El código ya estaba escrito y es la fuente de verdad. Tocarlo implica revisar tests, `.env.example`, documentación.
   - El compose es declarativo y nuevo en este tema.
   - `SERVER_PORT` es más explícito que `PORT` (que choca con otras herramientas).

   Una vez decidido:
   ```
   Renombra PORT a SERVER_PORT en el docker-compose.yml. Diff antes/después.
   ```
   (o el cambio opuesto si optaste por modificar el código).

6. **(Opcional) Verificar el fix con Docker.**
   ```bash
   docker compose up -d --force-recreate app
   curl -i http://localhost:3001/health         # ahora responde con {"ok":true}
   docker compose logs --tail=10 app            # listening on :3001
   ```

7. **`TROUBLESHOOTING.md`.** Documenta:
   - Comando ejecutado (o "no tengo Docker").
   - Logs relevantes (literal) o lectura de archivos.
   - Las 3 hipótesis que pediste, en el orden que dio el agente.
   - Verificación de cada una: ¿qué leíste? ¿qué descartaste?
   - Fix aplicado con diff antes/después.
   - **Decisión razonada:** ¿por qué cambiaste el compose y no el código (o al revés)?
   - (Bonus) Test que añadirías para que el problema no vuelva.

## Criterio de éxito

- [ ] `TROUBLESHOOTING.md` existe con: contexto recogido, 3 hipótesis, verificación, fix con diff, decisión justificada.
- [ ] El fix elimina el mismatch (`docker-compose.yml` y `src/server.ts` usan el **mismo** nombre de variable).
- [ ] `npm test` pasa (el smoke test `docker-fixtures` se queda en rojo si cambiaste el compose, porque valida que el mismatch sigue plantado — **es esperable y forma parte del ejercicio**. Documéntalo).

## Preguntas de reflexión

1. La regla del troubleshooting que aplicaste hoy fue "log + comando + archivo en el primer prompt". ¿Qué otras reglas mentales usas cuando un sistema no arranca?
2. ¿Quién es responsable de detectar este tipo de mismatch en un equipo: el dev que escribe el código, el dev que escribe el compose, el revisor del PR, o un test automático? Justifica.
3. ¿Cómo plantarías un test (unit o integration) que falle si la variable de entorno cambia de nombre en uno de los dos sitios sin actualizar el otro?
