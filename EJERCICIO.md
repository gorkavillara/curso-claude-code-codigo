# Ejercicio 1 — REPL, flags y comandos slash del proyecto

> **Rama:** `tema-22/ejercicio-01` (partiendo de `tema-22/inicio`)
> **Tiempo estimado:** 30 min
> **Tipo:** En clase

## Objetivo

Diferenciar el REPL interactivo de la ejecución puntual (`-p`), inventariar los comandos slash disponibles (oficiales + del proyecto) y practicar `/add-dir` con el directorio auxiliar plantado.

## Contexto

La rama `tema-22/inicio` ya tiene plantado:

- `.claude/commands/repo-status.md` — comando slash propio del proyecto.
- `notas-soporte/` — directorio auxiliar con ADRs, runbook y convenciones (en un entorno real sería un repo hermano; aquí está como subcarpeta para que el setup sea limpio).
- `.claude/settings.json` con `defaultMode` y `enabledPlugins` configurados.

Verifica el setup antes de empezar:

```bash
npm install
npm test     # las 5 suites deben estar en verde
```

## Pasos

1. **Modo `-p` (puntual).** Desde tu shell, ejecuta:
   ```bash
   claude -p "Resume en 5 lineas que hay en este repo y cual es el entry point."
   ```
   Observa que la respuesta sale por stdout y vuelves al prompt del shell. No hay sesión persistente.

2. **REPL interactivo.** Lanza `claude` y, en orden:
   - `/help` — anota qué comandos slash hay disponibles.
   - `/status` — anota modelo, directorios incluidos, herramientas y plugins activos.
   - `/usage` — anota el tamaño actual de contexto y % de ventana.
   - `/repo-status` — este es el comando propio del proyecto. Observa qué devuelve.

3. **Añadir directorio auxiliar.** Dentro del REPL:
   ```
   /add-dir notas-soporte/
   ```
   Verifica con `/status` que `notas-soporte/` aparece como directorio explícito.

4. **Pedir lectura de la carpeta añadida.** Dentro del REPL:
   ```
   Lista los archivos de notas-soporte/ y dime que patron siguen.
   Cita el ADR-001 de decisiones-arquitectura.md textualmente.
   ```

5. **Documenta en `CLI-INVENTARIO.md`** (créalo en la raíz de la rama):
   - **Comandos slash disponibles:** lista (oficiales + del proyecto). Mínimo 8.
   - **REPL vs `-p`:** al menos 3 diferencias concretas en una tabla.
   - **Dos automatizaciones con `claude -p` en un script:** ejemplos reales (resumen diario, audit de log, release notes, validación en CI, etc.).
   - **`claude -c` vs `claude -r`:** explica la diferencia en una frase cada uno y cuándo usarías cada uno.
   - **(Opcional) Tu propio comando slash:** describe un comando `/<nombre>` que añadirías a `.claude/commands/` para tu trabajo recurrente. No hace falta implementarlo, solo describir qué haría y qué prompt usaría.

## Criterio de éxito

- `npm test` sigue en verde.
- `CLI-INVENTARIO.md` existe y cubre los 4 puntos obligatorios.
- En `/status` aparece `notas-soporte/` como directorio explícito.
- Has ejecutado `/repo-status` y entiendes que es **del proyecto**, no oficial, no de un plugin.

## Preguntas de reflexión

- Si tu equipo tiene 3 prompts que se repiten cada semana, ¿cómo los convertirías en comandos slash del proyecto? ¿Dónde vivirían? ¿Quién los mantiene?
- ¿En qué casos `claude -p` es preferible a abrir el REPL?
- Si una sesión "no encuentra un archivo", ¿qué es lo primero que ejecutarías para diagnosticar?
