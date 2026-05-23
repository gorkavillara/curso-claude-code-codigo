# Ejercicio 3 — Navegación contextual y debug asistido

> **Tiempo estimado:** 25 min · **Rama:** `tema-06/ejercicio-03`  
> **Requisito:** VS Code con extensión activa. `npm install` hecho.

## Objetivo

Usar Claude desde el IDE para **navegar código sin leer archivos manualmente** y para **asistir en debugging** con información de estado real de la sesión.

---

## Parte A — Navegación sin abrir archivos (10 min)

Sin abrir ningún archivo manualmente, usa el panel lateral para responder estas 4 preguntas. Después verifica las respuestas leyendo los archivos tú mismo.

1. `"¿Dónde se llama a la función search? Lista cada callsite con ruta y línea."`
2. `"¿Qué pasa si paso query=null a la función search? Traza el flujo."`
3. `"¿Cuántos endpoints HTTP tiene este proyecto? Listarlos con método y ruta."`
4. `"¿En qué archivo se define el tipo Note y qué campos tiene?"`

Para cada respuesta: ¿fue correcta? ¿Citó líneas reales?

---

## Parte B — Debug asistido (15 min)

Vamos a simular un debugging con información de estado real.

1. Crea un test temporal en `test/debug-temp.test.ts`:
   ```ts
   import { describe, it } from 'node:test';
   import assert from 'node:assert/strict';
   import { search } from '../src/search/index.ts';

   describe('debug-temp', () => {
     it('encuentra nota con tilde', () => {
       const notes = [{ id: '1', title: 'Mañana es lunes', body: '', archived: false, createdAt: new Date() }];
       assert.equal(search(notes, 'Mañana').length, 1);  // debería pasar
       assert.equal(search(notes, 'MAÑANA').length, 1);  // falla — busca mayúsculas
     });
   });
   ```
2. Ejecuta `npm test`. Observa qué aserción falla y con qué valores.
3. En el panel lateral, **copia los valores exactos del fallo** y escribe:
   ```
   El test falla aquí. expected=1, actual=0. La query es "MAÑANA" y la nota
   tiene title "Mañana es lunes". Mira src/search/index.ts y explícame
   por qué falla con esa query.
   ```
4. Lee la explicación. ¿Propone la causa correcta?
5. Pídele la solución: `"¿Cuál es el cambio mínimo para arreglar esto sin librerías externas?"`
6. Aplica el cambio. Borra el test temporal. `npm test` verde.

---

## Pista

La diferencia entre un "agente que alucina" y uno que no es exactamente esta: darle **estado real** (valores concretos del debugger o del fallo del test) en lugar de una descripción vaga.

"El test falla" → Claude adivina. "expected=1, actual=0 con estos valores concretos" → Claude diagnostica.
