# Deuda arquitectónica conocida — Notebox

Inventario abierto de olores arquitectónicos observados durante el trabajo en el repo. No es exhaustivo — es el punto de partida para auditorías de deuda. La columna "Estado" indica si la deuda está reconocida (`Reconocida`), parcheada parcialmente (`Mitigada`) o resuelta (`Cerrada`).

> Material de trabajo del Tema 25, Ejercicio 3. La auditoría con Claude debe cruzar este documento contra el código actual y producir un plan incremental conectado a la próxima feature planificada.

## Olores observados (a fecha de Tema 25)

| # | Olor | Archivos involucrados | Tipo | Estado |
|---|---|---|---|---|
| 1 | Anidamiento profundo (5 niveles) en `archive` y `unarchive` | `src/services/notes.ts` | Lógica anidada / posible duplicación | Reconocida |
| 2 | `services/` importa `storage/memory.ts` directamente, no por interfaz | `src/services/notes.ts`, `src/search/index.ts` | Acoplamiento sin abstracción explícita | Reconocida |
| 3 | Validación inconsistente entre rutas (`POST /notes` no valida, `archive/unarchive` valida solo presencia del recurso) | `src/routes/notes.ts` | Hueco de validación / lógica dispersa | Reconocida (resuelta cuando ADR-003 entre en vigor) |
| 4 | Búsqueda case-sensitive por `String.includes()` sin normalización | `src/search/index.ts` | Decisión arquitectónica no documentada | Reconocida |
| 5 | Errores devueltos como `null` desde `services/` sin tipo explícito | `src/services/notes.ts` | Inconsistencia de contrato | Reconocida |

## Próximas features planificadas

| Feature | Descripción | Sprint estimado |
|---|---|---|
| **Paginación de `/notes`** | `GET /notes?limit=N&offset=M` con respuesta que incluya `total` | Próximo |
| Etiquetas como entidad | `Note.tags: string[]` + endpoint `/tags` | +2 sprints |
| Exportación a JSON | `GET /notes/export` que devuelve array completo | +3 sprints |

## Para el auditor

Las preguntas operativas son:

1. ¿Cuál de los olores anteriores muerde primero al implementar la paginación?
2. ¿Qué se puede mitigar en pasos pequeños sin reescritura masiva?
3. ¿Qué deuda asumimos conscientemente este sprint y por qué?

El plan incremental debe respetar el principio de **un cambio, una verificación** (Tema 12). Refactor masivo no es plan incremental — es deuda nueva con etiqueta de refactor.
