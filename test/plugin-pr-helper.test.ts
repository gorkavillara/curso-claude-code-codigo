/**
 * Smoke test del plugin pr-helper plantado en .claude/plugins/.
 *
 * Verifica que la estructura mínima del plugin está completa:
 * - plugin.json válido con name + version.
 * - commands declarados existen como archivos.
 * - hooks declarados existen y son scripts.
 * - skills y agents declarados existen.
 *
 * No ejecuta los commands ni los hooks: solo valida la "forma".
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

describe('plugin pr-helper', () => {
  const pluginRoot = resolve('.claude/plugins/pr-helper');
  const manifestPath = join(pluginRoot, 'plugin.json');

  it('tiene plugin.json en la ruta esperada', () => {
    assert.ok(existsSync(manifestPath), '.claude/plugins/pr-helper/plugin.json no existe');
  });

  it('plugin.json declara name, version y description', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
    assert.equal(manifest.name, 'pr-helper');
    assert.ok(typeof manifest.version === 'string' && manifest.version.length > 0);
    assert.ok(typeof manifest.description === 'string' && manifest.description.length > 0);
  });

  it('cada command declarado existe como archivo', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { commands?: string[] };
    assert.ok(Array.isArray(manifest.commands) && manifest.commands.length > 0);
    for (const rel of manifest.commands!) {
      const abs = join(pluginRoot, rel);
      assert.ok(existsSync(abs), `command declarado pero no existe: ${rel}`);
    }
  });

  it('el hook PreToolUse declarado existe como archivo', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      hooks?: Record<string, string>;
    };
    assert.ok(manifest.hooks?.PreToolUse, 'el plugin no declara hook PreToolUse');
    const abs = join(pluginRoot, manifest.hooks!.PreToolUse);
    assert.ok(existsSync(abs), `hook declarado pero no existe: ${manifest.hooks!.PreToolUse}`);
    const stat = statSync(abs);
    assert.ok(stat.isFile(), 'el hook no es un archivo regular');
  });

  it('cada skill declarada existe con SKILL.md', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { skills?: string[] };
    for (const rel of manifest.skills ?? []) {
      const skillFile = join(pluginRoot, rel, 'SKILL.md');
      assert.ok(existsSync(skillFile), `skill ${rel} sin SKILL.md`);
    }
  });

  it('cada agent declarado existe como archivo', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { agents?: string[] };
    for (const rel of manifest.agents ?? []) {
      const abs = join(pluginRoot, rel);
      assert.ok(existsSync(abs), `agent declarado pero no existe: ${rel}`);
    }
  });
});
