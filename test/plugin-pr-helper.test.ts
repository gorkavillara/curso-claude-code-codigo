/**
 * Smoke test del plugin pr-helper plantado en .claude/plugins/.
 *
 * Verifica que la estructura mínima del plugin está completa:
 * - .claude-plugin/plugin.json válido con name + version + description.
 * - commands existen como archivos en commands/.
 * - el hook PreToolUse declarado en hooks/hooks.json existe y es script.
 * - skills y agents existen en sus carpetas.
 *
 * No ejecuta los commands ni los hooks: solo valida la "forma".
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

describe('plugin pr-helper', () => {
  const pluginRoot = resolve('.claude/plugins/pr-helper');
  const manifestPath = join(pluginRoot, '.claude-plugin', 'plugin.json');

  it('tiene plugin.json en la ruta esperada', () => {
    assert.ok(existsSync(manifestPath), '.claude/plugins/pr-helper/.claude-plugin/plugin.json no existe');
  });

  it('plugin.json declara name, version y description', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
    assert.equal(manifest.name, 'pr-helper');
    assert.ok(typeof manifest.version === 'string' && manifest.version.length > 0);
    assert.ok(typeof manifest.description === 'string' && manifest.description.length > 0);
  });

  it('cada command existe como archivo en commands/', () => {
    const commands = ['commands/summary.md', 'commands/checklist.md'];
    for (const rel of commands) {
      const abs = join(pluginRoot, rel);
      assert.ok(existsSync(abs), `command esperado pero no existe: ${rel}`);
    }
  });

  it('el hook PreToolUse declarado en hooks/hooks.json existe como archivo', () => {
    const hooksPath = join(pluginRoot, 'hooks', 'hooks.json');
    assert.ok(existsSync(hooksPath), 'el plugin no declara hooks/hooks.json');
    const hooksConfig = JSON.parse(readFileSync(hooksPath, 'utf8')) as {
      hooks?: Record<string, Array<{ hooks?: Array<{ command?: string }> }>>;
    };
    const preToolUse = hooksConfig.hooks?.PreToolUse;
    assert.ok(Array.isArray(preToolUse) && preToolUse.length > 0, 'el plugin no declara hook PreToolUse');
    const command = preToolUse![0].hooks?.[0]?.command;
    assert.ok(typeof command === 'string' && command.length > 0, 'el hook PreToolUse no declara command');
    // El command usa ${CLAUDE_PLUGIN_ROOT} como prefijo; lo resolvemos contra pluginRoot.
    const rel = command!.replace('${CLAUDE_PLUGIN_ROOT}/', '');
    const abs = join(pluginRoot, rel);
    assert.ok(existsSync(abs), `hook declarado pero no existe: ${rel}`);
    const stat = statSync(abs);
    assert.ok(stat.isFile(), 'el hook no es un archivo regular');
  });

  it('cada skill existe con SKILL.md', () => {
    const skills = ['skills/commit-msg-style'];
    for (const rel of skills) {
      const skillFile = join(pluginRoot, rel, 'SKILL.md');
      assert.ok(existsSync(skillFile), `skill ${rel} sin SKILL.md`);
    }
  });

  it('cada agent existe como archivo en agents/', () => {
    const agents = ['agents/pr-reviewer.md'];
    for (const rel of agents) {
      const abs = join(pluginRoot, rel);
      assert.ok(existsSync(abs), `agent esperado pero no existe: ${rel}`);
    }
  });
});
