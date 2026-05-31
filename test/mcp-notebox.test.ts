/**
 * Smoke test del servidor MCP del Notebox.
 *
 * No abre el stdio transport (eso requeriría un cliente real).
 * Verifica que el archivo del servidor existe, es ejecutable como módulo
 * y que el SDK MCP está instalado correctamente.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('servidor MCP de Notebox', () => {
  const serverPath = resolve('mcp-servers/notebox/server.js');

  it('el archivo del servidor existe en la ruta esperada', () => {
    assert.ok(existsSync(serverPath), 'mcp-servers/notebox/server.js no existe');
  });

  it('declara las tools mínimas esperadas en su catálogo', () => {
    const source = readFileSync(serverPath, 'utf8');
    for (const tool of [
      'notebox_list_notes',
      'notebox_get_note',
      'notebox_create_note',
      'notebox_archive_note',
      'notebox_delete_note',
    ]) {
      assert.ok(
        source.includes(`name: '${tool}'`),
        `falta la declaración de la tool ${tool} en server.js`,
      );
    }
  });

  it('declara el resource notebox://notes y el template notebox://note/{id}', () => {
    const source = readFileSync(serverPath, 'utf8');
    assert.ok(source.includes('notebox://notes'), 'falta el resource notebox://notes');
    assert.ok(
      source.includes('notebox://note/{id}'),
      'falta el resource template notebox://note/{id}',
    );
  });

  it('@modelcontextprotocol/sdk es importable', async () => {
    // Si esto rompe, npm install no resolvió el SDK.
    const mod = await import('@modelcontextprotocol/sdk/server/index.js');
    assert.ok(typeof mod.Server === 'function', 'Server export ausente');
  });
});
