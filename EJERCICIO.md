# Ejercicio 3 — Revisión OWASP de un endpoint concreto

> **Tiempo estimado:** 15 min · **Rama:** `tema-16/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Aplicar **5 items de OWASP Top 10** al endpoint `POST /notes` traducidos al código concreto del repo (no en abstracto). Entregar una tabla y aplicar los fixes de severidad alta.

---

## Endpoint bajo revisión

`POST /notes` en `src/routes/notes.ts`. Acepta `{ title, body }`.

> OWASP no es un check genérico. Cada item se traduce a vuestro código concreto. Si lo aplicáis en abstracto, no detectáis nada real.

---

## Items OWASP a revisar (los 5 obligatorios)

- **A01 — Broken Access Control.** ¿Alguien puede crear notas en nombre de otro usuario? ¿Hay autorización?
- **A03 — Injection.** ¿Hay construcciones dinámicas con el input (queries SQL/NoSQL, exec, eval, regex construida desde input)?
- **A04 — Insecure Design.** ¿El contrato permite payloads enormes que tumben el proceso? ¿Hay límite global de body en Express?
- **A07 — Identification and Authentication Failures.** ¿Está protegido o es público? Si es público intencionadamente, ¿hay rate limit?
- **A09 — Security Logging and Monitoring Failures.** ¿Se loguea la creación con datos suficientes para auditoría sin exponer contenido sensible?

---

## Parte A — Lanzar el prompt (5 min)

```
[CONTEXTO]
Endpoint POST /notes en src/routes/notes.ts. Acepta { title, body }.

[OBJETIVO]
Aplica una revisión OWASP a este endpoint. Cubre específicamente:
- A01 Broken Access Control: ¿alguien puede crear notas de otro?
- A03 Injection: ¿hay construcción dinámica con el input?
- A04 Insecure Design: ¿el contrato permite payloads enormes?
- A07 Auth: ¿está protegido o es público?
- A09 Logging: ¿se loguea con datos suficientes para auditoría?

[FORMATO]
Por cada OWASP: hallazgo (Sí / No / Parcial), evidencia con archivo:línea,
fix concreto aplicable a este endpoint.
```

## Parte B — Endurecer la tabla (3 min)

Comprueba que para cada OWASP:

1. **El hallazgo se traduce al código real.** "No hay injection en general" no es traducción; "no hay queries dinámicas porque storage es in-memory + JSON in-process" sí lo es.
2. **La evidencia cita archivo:línea o falta de archivo (`no hay middleware de auth en server.ts`).**
3. **Si el hallazgo es "No aplica", está justificado.** "A01 no aplica porque Notebox no tiene multi-tenant; **cuando se introduzca, hay que volver a este endpoint**" es una buena justificación; "no aplica" a secas no lo es.

## Parte C — Aplicar fixes de severidad alta (7 min)

Severidades altas típicas en este endpoint:

- **A04**: añadir validación de longitud máxima en `title` y `body` + `app.use(express.json({ limit: '1mb' }))` en `server.ts`.
- **A07**: si decides que debe tener auth, añadir middleware **placeholder** que documenta el TODO con motivo. Si decides que es público intencionadamente, dejarlo escrito en el código como decisión consciente (`// PÚBLICO POR DISEÑO: ...`).

Aplica los fixes y verifica:

```bash
npm test
```

- [ ] Fixes de severidad alta aplicados.
- [ ] `npm test` verde tras los cambios.
- [ ] El endpoint sigue funcionando con payloads válidos.

---

## Entrega

### Tabla OWASP

| OWASP | Hallazgo | Evidencia (archivo:línea) | Severidad | Fix |
|---|---|---|---|---|
| A01 | Sí / No / Parcial | | Alto/Medio/Bajo | |
| A03 | | | | |
| A04 | | | | |
| A07 | | | | |
| A09 | | | | |

### Fixes aplicados

1. ...
2. ...

---

## Criterio de éxito

- [ ] 5 OWASP **traducidos al contexto del endpoint**, no genéricos.
- [ ] Cada hallazgo cita archivo:línea (o "no existe" donde corresponde).
- [ ] Los fixes de severidad alta están aplicados.
- [ ] El endpoint sigue funcionando con payloads legítimos.
- [ ] Para "No aplica", justificado con la condición que lo cambiaría.

## Preguntas de reflexión

1. ¿Qué OWASP de los 10 (más allá de los 5 revisados) tendrías que añadir si Notebox tuviera multi-tenant? ¿Y si tuviera login de usuarios?
2. ¿Vale `npm audit` limpio como sustituto del OWASP? ¿Qué detecta el OWASP que no detecta `npm audit`?
