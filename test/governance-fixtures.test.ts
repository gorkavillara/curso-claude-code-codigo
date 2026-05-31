/**
 * Smoke test de los fixtures plantados para el Tema 26.
 *
 * Valida que los artefactos de gobernanza del repo siguen con la forma
 * esperada SIN ejecutar nada del código de producción:
 * - CLAUDE.md con sección de equipo y gobierno.
 * - docs/governance/POLITICA-CLAUDE-CODE.md deliberadamente vaga (E1).
 * - docs/governance/MANAGED-SETTINGS-EJEMPLO.json como referencia.
 * - docs/governance/RUBRICA-REVIEW.md con criterios de blast radius.
 * - docs/governance/PLANTILLA-DDR.md con formato canónico.
 * - docs/governance/decisiones/DDR-007 como ejemplo razonable.
 * - .claude/auditoria/decisiones.md con 3 entradas dimensionadas a propósito (E3).
 * - .claude/settings.json con mezcla deliberada técnica + convención (E2).
 *
 * El test NO valida calidad del contenido — eso lo hace el alumno en clase.
 * Valida estructura y presencia entre cohortes.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('fixtures del Tema 26', () => {
  it('CLAUDE.md existe en raíz con sección de equipo y gobierno', () => {
    const path = resolve('CLAUDE.md');
    assert.ok(existsSync(path), 'CLAUDE.md no existe en la raíz');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /Convenciones/i, 'debe tener sección de convenciones');
    assert.match(content, /Equipo y gobierno/i, 'debe tener sección de equipo y gobierno (Tema 26)');
    assert.match(content, /Prompts modelo/i, 'debe documentar prompts modelo del equipo');
  });

  it('docs/governance/POLITICA-CLAUDE-CODE.md está plantada (deliberadamente vaga)', () => {
    const path = resolve('docs/governance/POLITICA-CLAUDE-CODE.md');
    assert.ok(existsSync(path), 'POLITICA-CLAUDE-CODE.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /Política|Politica/i, 'debe tener encabezado de política');
    // Vaguedades plantadas a propósito para el Ejercicio 1
    assert.match(content, /responsable/i, 'la política plantada usa "responsable" (vaguedad para E1)');
    assert.match(content, /cuidado/i, 'la política plantada usa "cuidado" (vaguedad para E1)');
    assert.match(content, /dudas/i, 'la política plantada usa "dudas" (vaguedad para E1)');
  });

  it('docs/governance/MANAGED-SETTINGS-EJEMPLO.json existe y es JSON válido', () => {
    const path = resolve('docs/governance/MANAGED-SETTINGS-EJEMPLO.json');
    assert.ok(existsSync(path), 'MANAGED-SETTINGS-EJEMPLO.json no existe');
    const content = readFileSync(path, 'utf8');
    const parsed = JSON.parse(content);
    assert.ok(parsed.permissions, 'debe declarar permissions');
    assert.ok(Array.isArray(parsed.permissions.deny), 'permissions.deny debe ser array');
    assert.ok(parsed.permissions.deny.includes('Read(./.env)'), 'managed debe denegar lectura de .env');
  });

  it('docs/governance/RUBRICA-REVIEW.md existe con criterios de blast radius', () => {
    const path = resolve('docs/governance/RUBRICA-REVIEW.md');
    assert.ok(existsSync(path), 'RUBRICA-REVIEW.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /Rúbrica|Rubrica/i, 'debe tener encabezado de rúbrica');
    assert.match(content, /blast radius/i, 'debe mencionar blast radius');
    assert.match(content, /bajo/i, 'debe distinguir blast radius bajo');
    assert.match(content, /alto/i, 'debe distinguir blast radius alto');
  });

  it('docs/governance/PLANTILLA-DDR.md existe con formato canónico', () => {
    const path = resolve('docs/governance/PLANTILLA-DDR.md');
    assert.ok(existsSync(path), 'PLANTILLA-DDR.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /DDR/, 'debe mencionar DDR');
    assert.match(content, /Firmante humano/i, 'debe pedir firmante humano en el formato');
    assert.match(content, /Alternativas descartadas/i, 'debe pedir alternativas descartadas');
  });

  it('docs/governance/decisiones/DDR-007 está plantado como ejemplo razonable', () => {
    const path = resolve('docs/governance/decisiones/DDR-007-validacion-en-services.md');
    assert.ok(existsSync(path), 'DDR-007 no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /DDR-007/, 'debe mantener el ID DDR-007');
    assert.match(content, /validación|validacion/i, 'debe ser sobre validación');
  });

  it('.claude/auditoria/decisiones.md tiene las 3 entradas dimensionadas a propósito (E3)', () => {
    const path = resolve('.claude/auditoria/decisiones.md');
    assert.ok(existsSync(path), 'log de auditoría no existe');
    const content = readFileSync(path, 'utf8');
    // Las 3 entradas plantadas para el Ejercicio 3: granular, vaga, razonable
    assert.match(content, /2026-04-12/, 'falta entrada granular plantada (2026-04-12)');
    assert.match(content, /2026-04-20/, 'falta entrada vaga plantada (2026-04-20)');
    assert.match(content, /2026-05-03/, 'falta entrada razonable plantada (2026-05-03)');
  });

  it('.claude/settings.json contiene mezcla deliberada de regla técnica + convención (E2)', () => {
    const path = resolve('.claude/settings.json');
    assert.ok(existsSync(path), '.claude/settings.json no existe');
    const content = readFileSync(path, 'utf8');
    const parsed = JSON.parse(content);
    // Regla técnica imponible (correcta en project)
    assert.ok(parsed.permissions.deny.includes('Read(./.env)'), 'debe denegar Read(./.env)');
    // Convención plantada en settings que debería ir en CLAUDE.md (mal expresada a propósito para E2)
    assert.equal(parsed.language, 'es', 'language está en settings (convención mal ubicada para E2)');
    assert.equal(parsed.responseStyle, 'concise', 'responseStyle está en settings (convención mal ubicada para E2)');
  });

  it('docs/governance/README.md existe como índice', () => {
    const path = resolve('docs/governance/README.md');
    assert.ok(existsSync(path), 'docs/governance/README.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /POLITICA-CLAUDE-CODE/);
    assert.match(content, /RUBRICA-REVIEW/);
    assert.match(content, /PLANTILLA-DDR/);
  });
});
