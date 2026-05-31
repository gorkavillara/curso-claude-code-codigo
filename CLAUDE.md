# Notebox — convenciones del proyecto

Reglas vigentes en este repo. Aplican a cualquier cambio en `src/` y `test/`. Las revisiones de PR las usan como criterios objetivos.

## Arquitectura por capas

- **`src/routes/`** — sólo HTTP: parseo del request, códigos de estado, formato de respuesta. **Nunca** lleva validación de dominio ni efectos sobre el storage.
- **`src/services/`** — toda la lógica de negocio y la validación de dominio. Es la única capa que orquesta el storage.
- **`src/storage/`** — persistencia (hoy in-memory). No conoce HTTP ni reglas de negocio.

> Si una validación necesita saber qué reglas de negocio aplican (longitud máxima de un título, IDs duplicados, transiciones de estado), vive en el servicio. La ruta sólo verifica forma sintáctica (presencia, tipo).

## Errores

- Cada error tiene un **tipo dedicado**: `NoteNotFoundError`, `ValidationError`, etc. (ver `src/models/errors.ts`).
- **Prohibido** `throw new Error('mensaje')` genérico en `src/services/` y `src/storage/`. El handler de Express decide el código HTTP a partir del tipo de error, no del mensaje.

## Observabilidad

- **Sin `console.log` en `src/`.** Para logs estructurados usar el logger del proyecto (cuando exista) o eliminar el log antes de mergear.
- Los logs de depuración añadidos durante el desarrollo no llegan a la rama principal.

## Dependencias

- Añadir una dependencia (`dependencies` o `devDependencies`) requiere **justificación explícita en la descripción del PR**: qué problema resuelve, por qué no se cubre con lo que ya hay, qué alternativa se descartó.
- Las utilidades pequeñas (un map, un debounce ad hoc, un check de array) **no son motivo suficiente** para añadir una dep entera.

## Tests

- **Todo endpoint nuevo o modificado lleva test** antes de mergear: al menos un test de servicio para la rama feliz y un test de error.
- Los tests de regresión (bug → test que reproduce → fix) van en rojo primero; el commit del fix los pone en verde.

## Estilo de commits

- Mensajes en imperativo, en minúsculas: `feat: add archive-bulk endpoint`, no `Added Archive Bulk Endpoint`.
- Un commit por intención. No mezclar refactor + feature + dep nueva en un único commit.
