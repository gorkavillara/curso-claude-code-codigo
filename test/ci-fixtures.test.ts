/**
 * Smoke test de los fixtures plantados para el Tema 24.
 *
 * Valida que existen y tienen la forma esperada SIN ejecutar el pipeline:
 * - .github/workflows/ci.yml con los olores plantados (actions sin SHA,
 *   sin cache, sin permissions, sin concurrency, job único).
 * - .github/workflows/release.yml mínimo.
 * - scripts/release.sh plantado sin validaciones (set -e solo, sin -uo pipefail).
 * - logs/pipeline-fail.log con el error real de npm ci por lockfile.
 *
 * El test NO ejecuta workflows. Su objetivo es asegurar que el fixture
 * queda íntegro entre cohortes; la verificación contra un runner real
 * es manual y opcional, documentada en notas.md del curso.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('fixtures del Tema 24', () => {
  it('.github/workflows/ci.yml está plantado con los olores esperados', () => {
    const path = resolve('.github/workflows/ci.yml');
    assert.ok(existsSync(path), '.github/workflows/ci.yml no existe');
    const content = readFileSync(path, 'utf8');

    // Actions sin pin a SHA (usan @vN).
    assert.match(content, /uses:\s*actions\/checkout@v3/, 'checkout debe usar @v3 sin SHA pin');
    assert.match(content, /uses:\s*actions\/setup-node@v3/, 'setup-node debe usar @v3 sin SHA pin');

    // Sin bloque permissions: declarado.
    assert.doesNotMatch(content, /^permissions:/m, 'no debe declarar permissions: (olor plantado)');

    // Sin bloque concurrency: con cancel-in-progress.
    assert.doesNotMatch(content, /^concurrency:/m, 'no debe declarar concurrency: (olor plantado)');

    // Job único 'ci' que mezcla lint + typecheck + test (sin jobs separados con needs:).
    assert.match(content, /^\s+ci:/m, 'debe haber un job único llamado ci');
    assert.doesNotMatch(content, /^\s+lint:/m, 'no debe haber job lint separado (olor plantado)');
    assert.doesNotMatch(content, /^\s+typecheck:/m, 'no debe haber job typecheck separado (olor plantado)');
    assert.doesNotMatch(content, /^\s+test:\s*$/m, 'no debe haber job test separado (olor plantado)');
    assert.doesNotMatch(content, /needs:/, 'no debe usar needs: entre jobs (olor plantado)');

    // runs-on flotante.
    assert.match(content, /runs-on:\s*ubuntu-latest/, 'debe usar ubuntu-latest (versión flotante)');

    // setup-node sin cache:.
    assert.doesNotMatch(content, /cache:\s*['"]?npm['"]?/, 'setup-node NO debe declarar cache (olor plantado)');

    // on: push: branches: '*' permisivo.
    assert.match(content, /branches:\s*\n\s+-\s+['"]?\*['"]?/m, 'on.push.branches debe permitir cualquier rama');
  });

  it('.github/workflows/release.yml está plantado como contexto adicional', () => {
    const path = resolve('.github/workflows/release.yml');
    assert.ok(existsSync(path), '.github/workflows/release.yml no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^name:\s*Release/m, 'debe llamarse Release');
    assert.match(content, /tags:\s*\n\s+-\s+['"]?v\*/m, 'debe activarse con tags vX.Y.Z');
  });

  it('scripts/release.sh está plantado sin validaciones', () => {
    const path = resolve('scripts/release.sh');
    assert.ok(existsSync(path), 'scripts/release.sh no existe');
    const content = readFileSync(path, 'utf8');

    // Set -e solo (sin -u ni -o pipefail) — buscamos como statement, no como comentario.
    assert.match(content, /^set -e\s*$/m, 'debe tener set -e (sin -uo pipefail, olor plantado)');
    assert.doesNotMatch(content, /^set -euo pipefail/m, 'no debe tener set -euo pipefail como statement (olor plantado)');

    // Sin validaciones previas a tocar tags.
    assert.doesNotMatch(content, /git diff --quiet/, 'no debe validar working tree (olor plantado)');
    assert.doesNotMatch(content, /rev-parse --abbrev-ref HEAD/, 'no debe validar rama (olor plantado)');
    assert.doesNotMatch(content, /npm test/, 'no debe correr npm test antes de tagear (olor plantado)');

    // Push automático (sin confirmación humana).
    assert.match(content, /git push origin main --tags/, 'debe hacer push automático (olor plantado)');
  });

  it('logs/pipeline-fail.log está plantado con el error de npm ci por lockfile', () => {
    const path = resolve('logs/pipeline-fail.log');
    assert.ok(existsSync(path), 'logs/pipeline-fail.log no existe');
    const content = readFileSync(path, 'utf8');

    // El log es largo (ruido de setup) — al menos 100 líneas.
    const lines = content.split('\n');
    assert.ok(lines.length >= 100, `el log debe tener >= 100 líneas de ruido + señal (tiene ${lines.length})`);

    // Contiene el error real de EUSAGE por lockfile desactualizado.
    assert.match(content, /npm ERR! code EUSAGE/, 'debe contener el error EUSAGE de npm ci');
    assert.match(content, /Missing: vitest@/, 'debe mencionar Missing: vitest@ (causa raíz)');
    assert.match(content, /package\.json and package-lock\.json or npm-shrinkwrap\.json are in sync/, 'debe explicar el desync de lockfile');
    assert.match(content, /##\[error\]Process completed with exit code 1\./, 'debe terminar con exit code 1');
  });

  it('.github/workflows/ci.yml no usa npm install (usa npm ci, coherente con el log)', () => {
    const content = readFileSync(resolve('.github/workflows/ci.yml'), 'utf8');
    // Verificación de coherencia entre el workflow y el log plantado.
    assert.match(content, /npm ci/, 'el workflow debe ejecutar npm ci (que es el comando que falla en el log)');
  });
});
