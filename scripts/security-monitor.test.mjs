import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

test('monitor only passes on a real 200 query and never exposes bodies', () => {
    const workflow = readFileSync(new URL('../.github/workflows/supabase-keepalive.yml', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
    // Primer paso `run`: la consulta. Se corta antes del siguiente paso (el aviso por issue).
    const script = workflow.split('        run: |')[1].split(/\n      - /)[0]
        .split('\n').map(line => line.replace(/^          /, '')).join('\n');
    assert.match(script, /\/rest\/v1\/keepalive\?/);
    assert.doesNotMatch(script, /cotizaciones_web/);
    const bash = process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash';
    for (const [code, curlExit, expected] of [['000', 6, 1], ['000', 28, 1], ['500', 0, 1], ['404', 0, 1], ['429', 0, 1], ['401', 0, 1], ['403', 0, 1], ['200', 0, 0]]) {
        const mock = `curl() { printf '%s' '${code}'; return ${curlExit}; }\n`;
        const result = spawnSync(bash, ['--noprofile', '--norc', '-e', '-s'], { input: mock + script, encoding: 'utf8' });
        assert.ifError(result.error);
        assert.equal(result.status, expected, `${code}/${curlExit}: ${result.stderr}`);
        assert.doesNotMatch(result.stdout, /000000/);
    }
    assert.doesNotMatch(workflow, /cat\s+\/tmp\/body/);
    // El aviso solo corre cuando la consulta falla y necesita permiso para crear issues.
    assert.match(workflow, /if: failure\(\)/);
    assert.match(workflow, /issues: write/);
});
