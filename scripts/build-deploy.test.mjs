import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { build, isPublicPath } from './build-deploy.mjs';

test('public pages and resources are allowed; internal and executable files are denied', () => {
    for (const file of ['.htaccess', 'index.html', 'favicon.svg', 'apple-touch-icon.png', 'supabase-config.js', 'robots.txt', 'express/en/index.html', 'assets/logo.svg', 'assets/catalogo.pdf']) assert.equal(isPublicPath(file), true, file);
    for (const file of ['agents.md', '.env', '.env.production', '.git/config', '.github/workflows/deploy.yml', 'supabase_setup.sql', 'deploy-local.ps1', 'scripts/check.cjs', 'docs/report.html', 'scratch/test.js', 'assets/shell.php', 'assets/.env', 'assets/../secret.js', 'assets/ideas/private.png', 'backup.zip']) assert.equal(isPublicPath(file), false, file);
});

test('artifact includes tracked public files only, and each build is fresh', () => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'rtmx-deploy-test-'));
    execFileSync('git', ['init', '--quiet', root]);
    mkdirSync(path.join(root, 'assets'));
    for (const file of ['index.html', '.htaccess', 'agents.md', '.env.production', 'assets/logo.svg']) writeFileSync(path.join(root, file), 'fixture');
    execFileSync('git', ['add', '.'], { cwd: root });
    writeFileSync(path.join(root, 'assets/untracked.png'), 'private');
    const first = build(root);
    assert.ok(existsSync(path.join(first, 'index.html')));
    assert.ok(existsSync(path.join(first, '.htaccess')));
    assert.ok(existsSync(path.join(first, 'assets/logo.svg')));
    for (const file of ['agents.md', '.env.production', 'assets/untracked.png']) assert.equal(existsSync(path.join(first, file)), false);
    writeFileSync(path.join(first, 'stale.txt'), 'stale');
    assert.equal(existsSync(path.join(build(root), 'stale.txt')), false);
    writeFileSync(path.join(root, 'index.html'), '<script src="/missing.js"></script>');
    assert.throws(() => build(root), /Missing versioned public resources/);
});
