// Build a new, isolated artifact using tracked public files only. No dependencies.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function isPublicPath(file) {
    if (file === '.htaccess') return true;
    if (file.includes('\\') || file.split('/').some(p => !p || p.startsWith('.'))) return false;
    if (/^(?:assets\/(?:ysisi|nuevas_fotos|galeria-raw|imagenes_blog|ideas)\/)/i.test(file)) return false;
    if (/^assets\/hero-space-bg(?:-[23])?\.png$/.test(file)) return false;
    if (!/\.(?:html|css|js|json|xml|txt|png|jpe?g|jfif|webp|svg|ico|pdf|woff2?|ttf|otf|avif|gif|mp4|webm)$/i.test(file)) return false;
    if (!file.includes('/')) {
        return /\.(?:html|css|js|ico|png|svg|webp|jpe?g)$/.test(file) ||
            /^(?:manifest\.json|sitemap\.xml|robots\.txt|llms\.txt|[a-f0-9]{32}\.txt)$/.test(file);
    }
    return /^(?:assets|blog|en|express|lonas-cancun|playa-del-carmen|tulum)\//.test(file);
}

export function build(root) {
    root = realpathSync(root);
    const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(isPublicPath);
    // Fresh directory prevents stale or untracked files from entering a deploy.
    const parent = path.join(root, 'scratch', 'deploy-artifacts');
    mkdirSync(parent, { recursive: true });
    if (realpathSync(parent) !== parent) throw new Error('Artifact parent must not be a symlink');
    const out = mkdtempSync(path.join(parent, 'site-'));
    for (const file of files) {
        const source = path.join(root, file);
        if (!lstatSync(source).isFile() || realpathSync(source) !== source) throw new Error(`Non-regular source: ${file}`);
        const target = path.join(out, file);
        mkdirSync(path.dirname(target), { recursive: true });
        copyFileSync(source, target);
    }
    const missing = new Set();
    for (const file of files.filter(f => /\.(?:html|css)$/.test(f))) {
        const text = readFileSync(path.join(out, file), 'utf8');
        const refs = [...text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g), ...text.matchAll(/url\(\s*["']?([^\s)'"#]+)["']?\s*\)/g)];
        for (const match of refs) {
            const ref = match[1].split(/[?#]/)[0];
            if (!ref || /^(?:[a-z]+:|\/\/)/i.test(ref) || !/\.(?:js|css|png|svg|ico|jpe?g|webp|woff2?|pdf)$/i.test(ref)) continue;
            const target = ref.startsWith('/') ? path.join(out, ref) : path.resolve(out, path.dirname(file), ref);
            if (!target.startsWith(out + path.sep) || !existsSync(target)) missing.add(`${file}: ${ref}`);
        }
    }
    if (missing.size) throw new Error('Missing versioned public resources:\n' + [...missing].join('\n'));
    return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    console.log(build(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')));
}
