# Ejercicio 2 — Mitigar exposición de secretos (.gitignore + redacción + rotación)

> **Tiempo estimado:** 15 min · **Rama:** `tema-16/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Detectar al menos **3 exposiciones de información sensible** en el repo y aplicar el **fix completo**: actualizar `.gitignore`, redactar logs/errores y **rotar la clave** cuando aplique. Verificar con una segunda pasada que el problema ya no se detecta.

---

## Contexto: el repo tiene secretos plantados

Esta rama tiene **plantados** los siguientes problemas reales (los podéis verificar antes de empezar):

- Un archivo `.env` versionado con `API_KEY=demo-secret-12345` (`git ls-tree HEAD .env`).
- Un `console.log("[POST /notes] Request body:", req.body)` en `src/routes/notes.ts` que imprime el body completo en cada petición.

> **El `.env` versionado no se arregla solo con `.gitignore`.** La clave **ya está expuesta** en el historial de git. Hay que **rotarla** en el sistema externo (proveedor, dashboard) además de sacarla del repo. `git rm --cached` no borra del historial — eso requiere `git filter-repo` o equivalente, fuera del scope del ejercicio.

---

## Parte A — Detectar (5 min)

```
[CONTEXTO]
Analiza el repositorio buscando posibles exposiciones de secretos o
información sensible.

[OBJETIVO]
Identifica:
1. Archivos sensibles que pueden estar versionados (.env, credentials, keys).
2. Lugares donde se loguea información que podría incluir secretos
   (body completo, tokens, contraseñas en query strings).
3. Mensajes de error que podrían filtrar información del sistema al cliente
   (stack traces, paths internos).
4. URLs o headers donde se filtran tokens.

[FORMATO]
Por cada hallazgo: archivo:línea, qué se expone, qué hacer.
NO incluyas hallazgos especulativos sin línea concreta.
```

## Parte B — Aplicar el fix completo (8 min)

Para cada hallazgo, **fix completo**, no parcial.

### 1. `.env` versionado

```bash
# (1) Sacar del seguimiento (no del historial todavía).
git rm --cached .env

# (2) Añadir al .gitignore.
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore

# (3) Crear plantilla pública sin valores.
cp .env .env.example
# Vacía los valores manualmente (o con sed): API_KEY=
git add .env.example .gitignore

# (4) ROTAR la clave externa: la expuesta ya no es válida.
#     Aunque sea de demo, deja una nota en EJERCICIO.md indicando
#     "rotated <fecha>, antigua quemada".
```

### 2. `console.log` que imprime el body

```ts
// Mal:
console.log("Request body:", req.body);

// Bien:
const redacted = { ...req.body, password: '[REDACTED]', token: '[REDACTED]' };
console.log("Request body:", redacted);

// Mejor: logger con redacción configurada (pino con redact[], etc.)
```

### 3. Error handler con stack al cliente (si aplica)

```ts
// Devolver al cliente solo el código + mensaje genérico.
// Loguear internamente el stack completo.
res.status(500).json({ error: "Internal Server Error" });
console.error(err.stack);  // solo en logs internos
```

## Parte C — Verificar con segunda pasada (2 min)

Lanza de nuevo el prompt de la Parte A. **No debe detectar los mismos problemas.** Si los detecta, el fix está incompleto.

```bash
npm test    # suite verde tras los fixes
```

---

## Entrega

### Tabla de hallazgos

| # | Archivo:línea | Qué se expone | Fix aplicado | Rotación necesaria |
|---|---|---|---|---|
| 1 | | | | Sí/No |
| 2 | | | | |
| 3 | | | | |

### Confirmación segunda pasada

- [ ] Segunda pasada del prompt: no detecta los mismos hallazgos.

---

## Criterio de éxito

- [ ] Al menos **3 exposiciones** detectadas con archivo:línea.
- [ ] Para el `.env` versionado: aplicaste `.gitignore` **+** redacción **+** mención explícita de rotación.
- [ ] Para los logs sensibles: aplicaste redacción, no borrado.
- [ ] La segunda pasada del prompt **no** detecta los mismos problemas.
- [ ] `npm test` sigue verde.

## Preguntas de reflexión

1. ¿Qué información sigue estando en el historial de git tras aplicar `git rm --cached`? ¿Cuándo merece la pena reescribir el historial con `git-filter-repo`?
2. Si vuestro proceso de CI imprime variables de entorno en los logs para depurar, ¿qué política implementaríais para que no se filtren secretos al output público?
