# Ejercicio 2 — Distribuir reglas entre managed, project y CLAUDE.md

> **Rama:** `tema-26/ejercicio-02` (parte de `tema-26/inicio`).
> **Tiempo:** 25 min.
> **Tipo:** En clase.

## Objetivo

Auditar la distribución actual de reglas entre `.claude/settings.json`, `CLAUDE.md` y `docs/governance/MANAGED-SETTINGS-EJEMPLO.json` (referencia del nivel managed). Decidir, con criterio operativo, qué reglas deben **subir a managed** (no negociables a nivel org), cuáles deben **quedarse en project** (contrato del repo) y cuáles deben **bajar a `CLAUDE.md`** (convenciones humanas).

## Contexto

- `.claude/settings.json` contiene mezcla deliberada: reglas técnicas reales (allow/deny, hooks) + entradas que son **convenciones humanas** (`language: es`, `responseStyle: concise`) mal ubicadas a propósito.
- `docs/governance/MANAGED-SETTINGS-EJEMPLO.json` es la referencia de qué tipo de reglas viven en managed (denies transversales, modelo de la org, telemetría).
- `CLAUDE.md` tiene convenciones humanas (idioma de respuesta, prompts modelo, reparto de responsabilidades) y posiblemente alguna restricción técnica que debería estar en settings.

## Jerarquía a respetar

```
managed > local > project > user
settings.json restringe (técnico)
CLAUDE.md orienta (convención)
```

Criterios:

| Pregunta | Si la respuesta es… | El sitio es… |
|---|---|---|
| ¿Aplica a todos los repos de la org? | Sí | **Managed** |
| ¿Aplica solo a este repo, pero a todo el equipo? | Sí | **Project (`.claude/settings.json`)** |
| ¿Es convención humana (idioma, estilo)? | Sí | **`CLAUDE.md`** |
| ¿Es preferencia personal del dev? | Sí | **User (`~/.claude/settings.json`)** |

## Pasos

1. Verifica el setup:
   ```bash
   npm install
   npm test     # 9 suites verdes
   ```
2. Lee los 3 archivos clave:
   ```bash
   cat .claude/settings.json
   cat CLAUDE.md
   cat docs/governance/MANAGED-SETTINGS-EJEMPLO.json
   ```
3. Inventario del estado actual:
   ```
   Lee .claude/settings.json, CLAUDE.md y
   docs/governance/MANAGED-SETTINGS-EJEMPLO.json. Lista todas las reglas
   activas con (a) qué imponen, (b) en qué archivo viven hoy, (c) a quién
   afectan (este repo, toda la org, este dev).
   ```
4. Clasifica por destino correcto:
   ```
   Para cada regla, di si está en el sitio correcto o si debería estar
   en otro nivel. Criterios: managed para reglas no negociables de la
   org, project para contratos del repo, CLAUDE.md para convenciones,
   user para preferencias personales. Justifica cada movimiento.
   ```
5. Detecta reglas mal expresadas:
   ```
   ¿Hay reglas que están escritas como prosa en CLAUDE.md pero podrían
   imponerse técnicamente en settings.json (allow/deny, hook)? Listarlas
   con propuesta de conversión.
   ```
   ```
   ¿Hay reglas que están en settings.json pero deberían ser convención
   (porque settings.json no las puede imponer realmente)? Por ejemplo:
   "el modelo prefiere respuestas cortas" no es una regla, es una
   convención de CLAUDE.md.
   ```
6. Cierra con el plan:
   ```
   Resume el plan en una tabla: regla, sitio actual, sitio propuesto,
   motivo. Máximo 8 filas. Si la tabla tiene más, agrupa por categoría.
   ```

## Entregable

Crea `DISTRIBUCION-REGLAS.md` en la raíz del repo con las siguientes secciones:

1. **Tabla completa de redistribución**: regla, sitio actual, sitio propuesto, motivo (una frase).
2. **Reglas que conviene subir a managed** (mínimo 2): justificación de por qué son no negociables a nivel org.
3. **Reglas que conviene bajar a `CLAUDE.md`** (mínimo 2): justificación de por qué son convención y no restricción técnica.
4. **Reglas mal expresadas** (mínimo 2): prosa de `CLAUDE.md` que debería ser técnica, o setting técnico que debería ser convención.
5. **Justificación operativa** de cada decisión — una frase por regla, no "queda mejor ahí".

## Criterio de éxito

- Cada regla se asigna a **un único nivel** con criterio (no "podría ir en cualquiera").
- Las reglas mal expresadas se detectan (`language: es`, `responseStyle: concise` en settings deberían bajar a `CLAUDE.md`).
- No se sube todo a managed por defecto.
- Las justificaciones son **operativas** (qué evita, qué reduce), no estéticas.

## Preguntas de reflexión

- ¿Por qué `language: es` en settings es señal de adopción inmadura?
- Si una organización no tiene managed settings, ¿qué se hace con las reglas no negociables?
- ¿Qué pasa cuando una convención del `CLAUDE.md` no se cumple? ¿Y cuando se incumple un setting?
