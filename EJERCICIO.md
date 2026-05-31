# Ejercicio 3 — Productividad: background, system prompt y layout

> **Rama:** `tema-22/ejercicio-03` (partiendo de `tema-22/inicio`)
> **Tiempo estimado:** 30 min
> **Tipo:** En clase

## Objetivo

Convertir la CLI en centro operativo del día: arrancar un comando largo en background sin perder el REPL, configurar un `--append-system-prompt` propio y diseñar el layout de multiplexor (tmux/screen/zellij) ideal para tu trabajo.

## Contexto

La rama trae plantado:

- `scripts/dev-server.sh` — servidor de eco en puerto 3001 (configurable con `DEV_SERVER_PORT`). Loguea actividad a `logs/dev-server.log`.
- `.claude/settings.json` con permisos preconfigurados para ejecutar el script.
- `logs/` con `.gitkeep`.

Verifica el setup antes de empezar:

```bash
npm install
npm test     # las 5 suites deben estar en verde
```

> **Requisito:** bash disponible (Git Bash en Windows o WSL). Si estás en PowerShell puro, ejecuta `bash --version` para confirmar. Si no tienes bash, anota la limitación en `PRODUCTIVIDAD.md` y trabaja conceptualmente este ejercicio.

## Pasos

1. **Lanza Claude con un `--append-system-prompt` propio.**

   Diseña primero el append (mínimo 2 reglas, en español):
   - Una de **idioma/tono** (ej. "Responde en español, tono directo, sin fórmulas corporativas").
   - Una de **comportamiento** (ej. "Antes de editar archivos en src/, lanza `npm test` y resume el estado").

   Lanza:
   ```bash
   claude --append-system-prompt "<tu append>"
   ```

2. **Arranca el dev-server en background.** Dentro de la sesión:
   ```
   Lanza scripts/dev-server.sh en background y devuelveme el control.
   Cuando arranque, pideme la primera peticion que quiero probar.
   ```

   Verifica que el control vuelve al REPL **sin bloquear**. Si la sesión se queda esperando, no se lanzó en background — pídelo explícitamente.

3. **Inspecciona el log mientras conversas.** Dentro de la sesión:
   ```
   Lee logs/dev-server.log y dime las ultimas 10 lineas. Resume actividad.
   ```

   Repite la inspección un par de veces mientras el servidor está corriendo. Confirma que la sesión sigue viva y responde sin bloqueo.

4. **Comprueba que el system prompt se respeta.** Pide al agente:
   ```
   Anade un comentario en src/server.ts que explique el entry point.
   ```

   Si tu regla del append decía "antes de editar src/, lanza `npm test`", verifica que **lo hace antes de editar**. Si no lo hace, revisa el append: puede que tenga una regla contradictoria con el system prompt oficial.

5. **Termina el servidor.** Pide al agente que lo pare (o termínalo desde otro shell con `pkill -f dev-server` / equivalente).

6. **Documenta en `PRODUCTIVIDAD.md`** (créalo en la raíz):

   - **Tu `--append-system-prompt`:** el texto exacto que usaste. Justifica las reglas en 1 frase cada una.
   - **Tres aliases del shell** que añadirías a tu `~/.zshrc` / `~/.bashrc` / `$PROFILE` de PowerShell para acelerar trabajo con Claude. Ejemplos:
     ```bash
     alias cstatus='claude -p "Resume en 5 lineas que hay en este repo."'
     alias caudit='git diff HEAD~1 | claude -p "Audita este diff."'
     alias cc='claude -c'
     ```
     Los tuyos deben ser **distintos** entre sí (no variaciones del mismo). Al menos uno debe usar pipe.
   - **Tu layout ideal de multiplexor (tmux/screen/zellij/otro).** En ASCII o lista:
     - Qué hay en cada panel.
     - Por qué.
     - Si no usas multiplexor, justifica qué equivalente usas (paneles del terminal, ventanas, tmuxinator, etc.) y por qué te funciona.
   - **Anti-ejemplo:** una regla que **jamás** pondrías en `--append-system-prompt`. Justifica por qué sería contraproducente.

## Criterio de éxito

- `npm test` sigue en verde.
- Has lanzado el dev-server en background sin bloquear el REPL.
- Has leído `logs/dev-server.log` al menos una vez durante la sesión.
- El `--append-system-prompt` se ha respetado en al menos una edición.
- `PRODUCTIVIDAD.md` cubre los 4 puntos obligatorios.

## Preguntas de reflexión

- Si llevas 2 horas trabajando en un feature y la SSH se desconecta, ¿qué pierdes con tu setup actual? ¿Qué ganarías con tmux/screen?
- ¿En qué casos preferirías meter una regla en `CLAUDE.md` en vez de en `--append-system-prompt`? Da un ejemplo concreto.
- ¿Qué prompts repites cada semana que se beneficiarían de convertirse en aliases del shell o en comandos slash del proyecto?
