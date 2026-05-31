/**
 * Smoke test de los fixtures plantados para el Tema 22.
 *
 * Valida que existen y tienen la forma mínima esperada:
 * - .claude/commands/repo-status.md con frontmatter description.
 * - scripts/dev-server.sh con shebang bash.
 * - notas-sesion.md con las tres tareas.
 * - notas-soporte/ con sus tres archivos auxiliares.
 * - logs/ con .gitkeep.
 *
 * No ejecuta el dev-server ni invoca el slash command: solo valida estructura.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('fixtures del Tema 22', () => {
  it('comando slash del proyecto /repo-status está plantado', () => {
    const path = resolve('.claude/commands/repo-status.md');
    assert.ok(existsSync(path), '.claude/commands/repo-status.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^---\s*\n[\s\S]*?description:[^\n]+\n[\s\S]*?---/m, 'frontmatter description requerido');
  });

  it('script de dev-server está plantado y es bash', () => {
    const path = resolve('scripts/dev-server.sh');
    assert.ok(existsSync(path), 'scripts/dev-server.sh no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^#!\/usr\/bin\/env bash/, 'shebang bash requerido');
    assert.match(content, /DEV_SERVER_PORT/, 'variable de puerto debe estar parametrizada');
  });

  it('notas-sesion.md tiene las tres tareas para sesión larga', () => {
    const path = resolve('notas-sesion.md');
    assert.ok(existsSync(path), 'notas-sesion.md no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /## Tarea 1/, 'falta Tarea 1');
    assert.match(content, /## Tarea 2/, 'falta Tarea 2');
    assert.match(content, /## Tarea 3/, 'falta Tarea 3');
  });

  it('notas-soporte/ existe con README, ADRs, runbook y convenciones', () => {
    assert.ok(existsSync(resolve('notas-soporte/README.md')), 'notas-soporte/README.md falta');
    assert.ok(existsSync(resolve('notas-soporte/decisiones-arquitectura.md')), 'ADRs faltan');
    assert.ok(existsSync(resolve('notas-soporte/runbook-incidencias.md')), 'runbook falta');
    assert.ok(existsSync(resolve('notas-soporte/convenciones-equipo.md')), 'convenciones faltan');
  });

  it('logs/ existe (con .gitkeep) para el dev-server', () => {
    assert.ok(existsSync(resolve('logs/.gitkeep')), 'logs/.gitkeep falta');
  });

  it('settings.json declara defaultMode y enabledPlugins', () => {
    const path = resolve('.claude/settings.json');
    assert.ok(existsSync(path), '.claude/settings.json no existe');
    const settings = JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>;
    assert.ok(settings.defaultMode, 'defaultMode debe estar declarado');
    assert.ok(Array.isArray(settings.enabledPlugins), 'enabledPlugins debe ser array');
  });
});
