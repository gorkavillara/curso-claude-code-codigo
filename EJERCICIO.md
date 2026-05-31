# Ejercicio 2 — Escribir un hook con justificación de gobierno

> **Rama:** `tema-21/ejercicio-02` · **Tiempo:** 25 min · **Tipo:** En clase

## Objetivo

Extender el hook `PreToolUse` plantado por el plugin `pr-helper` para que **bloquee** comandos peligrosos (`rm -rf` y referencias a `.env`) y siga **logueando** el resto. Justificar la decisión `PreToolUse` vs `PostToolUse` y reflexionar sobre el gobierno real cuando un miembro del equipo puede desactivar el hook localmente.

## Contexto

- El hook actual vive en `.claude/plugins/pr-helper/hooks/pre-bash-audit.sh`.
- Por defecto **loguea** cada invocación de Bash a `.claude/audit/bash.log` y **no bloquea nada**.
- El hook está enganchado al evento `PreToolUse` filtrado por `Bash` en `.claude/settings.json` (clave `hooks`).
- Las pruebas de Tema 16 (seguridad) marcan dos riesgos críticos que vamos a reforzar:
  - **`rm -rf`** puede destruir el repo o el FS.
  - **`.env`** contiene secretos y no debe leerse aunque sea por accidente.

## Pasos

1. Arranca el proyecto y verifica el estado base:
   ```bash
   npm install
   npm test
   ```
   Las 4 suites deben estar verdes.

2. Lanza Claude Code y comprueba el comportamiento actual del hook:
   - Ejecuta `node --version` desde Claude (Bash).
   - Abre `.claude/audit/bash.log` y confirma que hay una línea con el comando.
   - Verifica que el hook **NO bloquea nada todavía**: ejecuta `echo "test"` y comprueba que se ejecuta.

3. Modifica `.claude/plugins/pr-helper/hooks/pre-bash-audit.sh` para que:
   - **Detecte** comandos que contengan `rm -rf` (con espaciado variable) o que referencien `.env`.
   - **Bloquee** esos comandos con `exit 2` y un mensaje claro por stderr explicando la política.
   - **Loguee** los comandos bloqueados en `bash.log` con un prefijo `BLOCKED` para auditoría.
   - **Siga logueando** el resto de comandos como hasta ahora.

   > Pista: el código de salida que **bloquea** en Claude Code es `exit 2`, no `exit 1`. Otros códigos se interpretan como error genérico sin garantía de aborto.

4. Verifica desde Claude:
   - `ls -la` → se loguea (sin `BLOCKED`), se ejecuta.
   - `rm -rf /tmp/foo` → se loguea con `BLOCKED`, **NO se ejecuta**, Claude muestra el mensaje del hook.
   - `cat .env` (o `grep TOKEN .env`) → se loguea con `BLOCKED`, **NO se ejecuta**.

5. Crea `GOBIERNO-HOOK.md` en la raíz y responde:

   ```markdown
   # Gobierno del hook PreToolUse

   ## Política técnica reforzada
   - Riesgo 1: ...
   - Riesgo 2: ...

   ## PreToolUse vs PostToolUse
   ¿Por qué PreToolUse y no PostToolUse? ¿Qué se gana, qué se pierde?

   ## Qué pasa si otro miembro del equipo desactiva el hook
   ¿Cómo se entera el equipo? ¿Qué mecanismos de gobierno real hay para que
   el hook NO pueda desactivarse localmente sin aprobación?
   ```

## Criterio de éxito

- [ ] El hook bloquea `rm -rf` con `exit 2` y un mensaje por stderr.
- [ ] El hook bloquea cualquier referencia a `.env` con la misma estrategia.
- [ ] El hook sigue logueando los comandos no bloqueados con timestamp y comando.
- [ ] El log muestra entradas `BLOCKED` cuando hay bloqueo y entradas normales cuando no.
- [ ] `GOBIERNO-HOOK.md` responde las tres preguntas con argumentos, no genéricos.

## Preguntas de reflexión

1. ¿Por qué `exit 2` y no `exit 1`? ¿Qué pasa con `exit 0` si el hook decide bloquear?
2. Si el equipo decide en el futuro auditar también `Write` y `Edit` (no solo `Bash`), ¿qué cambio harías en el `settings.json` del repo? ¿Y en el hook?
3. Tu compañero copia el repo y crea un `.claude/settings.local.json` propio que desactiva el hook. ¿El resto del equipo se entera de algo? ¿Cómo lo detectarías?
