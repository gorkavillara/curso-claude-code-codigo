/**
 * Smoke test de los fixtures plantados para el Tema 25.
 *
 * Valida que los artefactos arquitectónicos del repo siguen con la forma
 * esperada SIN ejecutar nada del código de producción:
 * - docs/architecture/README.md como índice de ADRs.
 * - ADR-001 (storage in-memory) y ADR-002 (Express) escritos como modelo.
 * - PENDING-001 (persistencia) y PENDING-002 (validación) plantados como
 *   decisiones pendientes que los ejercicios resuelven.
 * - DEUDA-CONOCIDA.md con el inventario de olores y la próxima feature.
 * - Deuda real presente en `src/`: anidamiento profundo, búsqueda case-sensitive.
 *
 * El test NO valida implementación — valida estructura del repo entre cohortes.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('fixtures del Tema 25', () => {
  it('docs/architecture/README.md existe y lista los ADRs vigentes', () => {
    const path = resolve('docs/architecture/README.md');
    assert.ok(existsSync(path), 'docs/architecture/README.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /ADR-001/, 'README debe mencionar ADR-001');
    assert.match(content, /ADR-002/, 'README debe mencionar ADR-002');
    assert.match(content, /PENDING-001/, 'README debe mencionar PENDING-001');
    assert.match(content, /PENDING-002/, 'README debe mencionar PENDING-002');
  });

  it('ADR-001 (storage in-memory) está plantado con el formato canónico', () => {
    const path = resolve('docs/architecture/ADR-001-storage-en-memoria.md');
    assert.ok(existsSync(path), 'ADR-001 no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^# ADR-001/m, 'debe empezar por # ADR-001');
    assert.match(content, /\*\*Contexto:\*\*/, 'debe tener bloque Contexto');
    assert.match(content, /\*\*Decisión:\*\*/, 'debe tener bloque Decisión');
    assert.match(content, /\*\*Consecuencias:\*\*/, 'debe tener bloque Consecuencias');
  });

  it('ADR-002 (Express) está plantado con el formato canónico', () => {
    const path = resolve('docs/architecture/ADR-002-express-framework.md');
    assert.ok(existsSync(path), 'ADR-002 no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^# ADR-002/m, 'debe empezar por # ADR-002');
    assert.match(content, /\*\*Contexto:\*\*/, 'debe tener bloque Contexto');
    assert.match(content, /\*\*Decisión:\*\*/, 'debe tener bloque Decisión');
    assert.match(content, /\*\*Consecuencias:\*\*/, 'debe tener bloque Consecuencias');
  });

  it('PENDING-001 (persistencia) está plantado como decisión pendiente', () => {
    const path = resolve('docs/architecture/PENDING-001-persistencia.md');
    assert.ok(existsSync(path), 'PENDING-001 no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /Pendiente de decisión/, 'debe estar marcado como pendiente');
    assert.match(content, /storage\/memory\.ts/, 'debe citar src/storage/memory.ts');
    assert.match(content, /Ejes de trade-off acordados/, 'debe declarar los ejes');
  });

  it('PENDING-002 (validación) está plantado como decisión pendiente', () => {
    const path = resolve('docs/architecture/PENDING-002-validacion-en-routes-o-services.md');
    assert.ok(existsSync(path), 'PENDING-002 no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /Pendiente de decisión/, 'debe estar marcado como pendiente');
    assert.match(content, /Opción A/, 'debe plantear la Opción A');
    assert.match(content, /Opción B/, 'debe plantear la Opción B');
    assert.match(content, /mcp-servers\/notebox\/server\.js/, 'debe mencionar el servidor MCP como consumidor');
  });

  it('DEUDA-CONOCIDA.md lista los olores y la próxima feature', () => {
    const path = resolve('docs/architecture/DEUDA-CONOCIDA.md');
    assert.ok(existsSync(path), 'DEUDA-CONOCIDA.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /Anidamiento profundo/, 'debe listar el anidamiento de archive/unarchive');
    assert.match(content, /Paginación/, 'debe mencionar la feature de paginación como próxima');
  });

  it('src/services/notes.ts contiene la deuda real (anidamiento profundo)', () => {
    const path = resolve('src/services/notes.ts');
    assert.ok(existsSync(path), 'src/services/notes.ts no existe');
    const content = readFileSync(path, 'utf8');
    // El anidamiento se reconoce por presencia de varios "if (" / "} else {" sin returns tempranos.
    const ifCount = (content.match(/\bif\s*\(/g) ?? []).length;
    const elseCount = (content.match(/\}\s*else\s*\{/g) ?? []).length;
    assert.ok(ifCount >= 6, `archive/unarchive deben tener anidamiento (>=6 ifs, hay ${ifCount})`);
    assert.ok(elseCount >= 4, `archive/unarchive deben tener anidamiento con else (>=4, hay ${elseCount})`);
  });

  it('src/search/index.ts mantiene la búsqueda case-sensitive (deuda plantada)', () => {
    const path = resolve('src/search/index.ts');
    assert.ok(existsSync(path), 'src/search/index.ts no existe');
    const content = readFileSync(path, 'utf8');
    // Si hubiese toLowerCase / normalize, ya no sería case-sensitive.
    assert.doesNotMatch(content, /toLowerCase\(\)/, 'search no debe usar toLowerCase (case-sensitive es la deuda plantada)');
    assert.doesNotMatch(content, /normalize\(/, 'search no debe normalizar (case-sensitive es la deuda plantada)');
    assert.match(content, /\.includes\(/, 'search debe usar String.includes() directo');
  });
});
