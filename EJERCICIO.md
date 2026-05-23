# Ejercicio 2 — Política de permisos para el equipo

> **Tiempo estimado:** 40 min  
> **Rama:** `tema-05/ejercicio-02`  
> **Arranque:** `npm install && npm test`

## Objetivo

Diseñar, implementar y probar una política de permisos real en `.claude/settings.json` que proteja archivos sensibles sin bloquear el trabajo cotidiano.

---

## Contexto del escenario

Trabajas en una fintech. Este repo tiene:

| Archivo / carpeta | Sensibilidad |
|---|---|
| `.env` | Claves de Stripe y AWS (crítico) |
| `scripts/deploy.sh` | Sube directamente a producción |
| `db/migrations/` | Un error puede corromper datos de clientes |
| `src/` y `test/` | Trabajo cotidiano, acceso libre |

El `.claude/settings.ejercicio.json` que hay ahora **lo dejó un becario y está mal configurado**. Tu trabajo es corregirlo (puedes renombrarlo a `settings.json` o aplicar los cambios directamente sobre él).

---

## Parte A — Diagnóstico (5 min)

Lee `.claude/settings.ejercicio.json` tal como está.

1. ¿Qué permite que **no** debería permitir?
2. ¿Qué restricciones **faltan** para que sea seguro?

Escríbelo antes de tocar nada.

---

## Parte B — Diseñar la política (15 min)

Reescribe `.claude/settings.ejercicio.json` para cumplir exactamente esta tabla:

| Recurso | Restricción requerida |
|---|---|
| `.env`, `.env.*` | Bloquear **lectura y escritura** completamente |
| `scripts/deploy.sh` | Bloquear **ejecución** — nunca sin confirmación explícita del equipo |
| `db/migrations/**` | Bloquear **escritura** sin aprobación explícita |
| `src/**`, `test/**` | Permitir edits libres |
| Comandos `rm -rf*` | Bloquear siempre |
| Comandos `git push*` | Bloquear siempre (el CI/CD se encarga) |

**Requisito extra**: documenta cada regla con un comentario en el propio JSON que explique **por qué** existe (usa el campo `"description"` si el formato lo soporta, o añade un `README` junto al settings).

---

## Parte C — Test de la política (15 min)

Con tu `.claude/settings.json` aplicado, lanza estos 5 prompts en Claude Code y anota el resultado:

| # | Prompt | Resultado esperado | Resultado real |
|---|---|---|---|
| 1 | `"Muéstrame el contenido de .env"` | Bloqueado | |
| 2 | `"Ejecuta scripts/deploy.sh para subir los cambios"` | Bloqueado | |
| 3 | `"Crea una migración en db/migrations/ para añadir columna email"` | Pide confirmación | |
| 4 | `"Añade validación de email en src/routes/notes.ts"` | Se ejecuta libre | |
| 5 | `"Borra archivos temporales con rm -rf tmp/"` | Bloqueado | |

Si algún resultado no coincide con el esperado, ajusta la política y vuelve a probar.

---

## Parte D — Reflexión (5 min)

¿Qué escenario **no cubre** tu política?

Pista: piensa en este caso — ¿qué pasa si Claude añade `require('fs').readFileSync('.env')` dentro de un archivo `.ts` que sí está permitido editar? ¿Tu política lo detecta?

---

## Pista — formato de `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [],
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Write(db/migrations/**)",
      "Bash(rm -rf*)",
      "Bash(git push*)"
    ]
  }
}
```

Los tipos de acción disponibles son: `Read`, `Write`, `Edit`, `Bash`, `WebFetch`, `WebSearch`.  
Los patrones de ruta siguen glob estándar.
