// Sincroniza calificación, número de opiniones y opiniones recientes de Google
// Business Profile con el HTML estático del sitio. Sin dependencias.
//
// Uso (GitHub Actions: .github/workflows/google-reviews.yml):
//   node scripts/update-google-reviews.mjs            -> actualiza los HTML
//   node scripts/update-google-reviews.mjs --discover -> imprime cuentas/ubicaciones
// Variables: GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN,
//            GBP_ACCOUNT_ID, GBP_LOCATION_ID (las dos últimas no para --discover).
// Guía de configuración: docs/google-reviews-setup.md
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MAX_CARDS = 6;
export const MIN_STARS = 4;
const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
const MONTHS = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
const START = '<!-- google-reviews:start -->';
const END = '<!-- google-reviews:end -->';

export function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Google añade traducciones automáticas al comentario; conservar solo el original.
export function originalText(comment = '') {
    let t = String(comment);
    const orig = t.match(/\(Original\)\s*([\s\S]*)$/);
    if (orig) t = orig[1];
    t = t.split(/\n*\(Translated by Google\)/)[0];
    return t.replace(/\s+/g, ' ').trim();
}

export function formatRating(avg) {
    return (Math.round(Number(avg) * 10) / 10).toFixed(1);
}

export function pickReviews(reviews, max = MAX_CARDS, minStars = MIN_STARS) {
    return reviews
        .map(r => ({
            name: r.reviewer?.isAnonymous ? 'Cliente de Google' : (r.reviewer?.displayName || '').trim(),
            stars: STARS[r.starRating] || 0,
            text: originalText(r.comment),
            date: new Date(r.createTime || r.updateTime),
        }))
        .filter(r => r.name && r.text && r.stars >= minStars && !Number.isNaN(r.date.getTime()))
        .sort((a, b) => b.date - a.date)
        .slice(0, max);
}

export function renderCards(cards, indent = '                ') {
    return cards.map(c => {
        const stars = '★'.repeat(c.stars) + '☆'.repeat(5 - c.stars);
        const when = `${MONTHS[c.date.getUTCMonth()]} ${c.date.getUTCFullYear()}`;
        return [
            `${indent}<div class="testimonial-card reveal">`,
            `${indent}    <div class="testimonial-stars" aria-label="${c.stars} de 5 estrellas">${stars}</div>`,
            `${indent}    <p class="testimonial-text">"${escapeHtml(c.text)}"</p>`,
            `${indent}    <div class="testimonial-author">`,
            `${indent}        <span class="testimonial-name">${escapeHtml(c.name)}</span>`,
            `${indent}        <span class="testimonial-meta">Reseña de Google · ${when}</span>`,
            `${indent}    </div>`,
            `${indent}</div>`,
        ].join('\n');
    }).join('\n\n');
}

// Aplica los datos a un documento HTML. Devuelve el texto (igual si no hay marcas).
export function applyToHtml(html, { rating, count, cards }) {
    let out = html
        .replace(/(<span data-gr="rating">)[^<]*(<\/span>)/g, `$1${rating}$2`)
        .replace(/(<span data-gr="count">)[^<]*(<\/span>)/g, `$1${count}$2`)
        .replace(/(Google: )\d\.\d( estrellas con )\d+( opiniones)/g, `$1${rating}$2${count}$3`);
    if (cards && cards.length) {
        const i = out.indexOf(START), j = out.indexOf(END);
        if (i !== -1 && j > i) {
            out = `${out.slice(0, i + START.length)}\n\n${renderCards(cards)}\n\n                ${out.slice(j)}`;
        }
    }
    return out;
}

async function accessToken(env) {
    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: env.GBP_CLIENT_ID,
            client_secret: env.GBP_CLIENT_SECRET,
            refresh_token: env.GBP_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`OAuth ${res.status}: ${body.error} ${body.error_description || ''}`);
    return body.access_token;
}

async function getJson(url, token) {
    const res = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
    const text = await res.text();
    if (!res.ok) throw new Error(`GET ${url.split('?')[0]} -> ${res.status}: ${text.slice(0, 500)}`);
    return JSON.parse(text);
}

async function discover(token) {
    const { accounts = [] } = await getJson('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', token);
    for (const a of accounts) {
        console.log(`Cuenta ${a.name.split('/')[1]}  (${a.accountName || a.type})`);
        const { locations = [] } = await getJson(
            `https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title&pageSize=100`, token);
        for (const l of locations) console.log(`  Ubicación ${l.name.split('/')[1]}  ${l.title}`);
    }
}

async function fetchReviews(env, token) {
    const base = `https://mybusiness.googleapis.com/v4/accounts/${env.GBP_ACCOUNT_ID}/locations/${env.GBP_LOCATION_ID}/reviews`;
    let pageToken = '', first = null;
    const reviews = [];
    do {
        const q = new URLSearchParams({ pageSize: '50', orderBy: 'updateTime desc' });
        if (pageToken) q.set('pageToken', pageToken);
        const page = await getJson(`${base}?${q}`, token);
        first ??= page;
        reviews.push(...(page.reviews || []));
        pageToken = page.nextPageToken || '';
    } while (pageToken && reviews.length < 200);
    return { rating: formatRating(first.averageRating), count: Number(first.totalReviewCount), reviews };
}

async function main() {
    const env = process.env;
    const needed = ['GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN'];
    const discoverMode = process.argv.includes('--discover');
    if (!discoverMode) needed.push('GBP_ACCOUNT_ID', 'GBP_LOCATION_ID');
    const missing = needed.filter(k => !env[k]);
    if (missing.length) {
        console.log(`::notice::Sincronización de opiniones omitida: faltan secrets ${missing.join(', ')}. Ver docs/google-reviews-setup.md`);
        return;
    }
    const token = await accessToken(env);
    if (discoverMode) return discover(token);

    const data = await fetchReviews(env, token);
    if (!data.count || !/^\d\.\d$/.test(data.rating)) throw new Error(`Respuesta inesperada: ${JSON.stringify(data).slice(0, 300)}`);
    const cards = pickReviews(data.reviews);
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const files = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean);
    let changed = 0;
    for (const f of files) {
        const p = path.join(root, f);
        const before = readFileSync(p, 'utf8');
        const after = applyToHtml(before, { rating: data.rating, count: data.count, cards });
        if (after !== before) { writeFileSync(p, after); changed++; console.log(`actualizado ${f}`); }
    }
    console.log(`Google: ${data.rating}★ con ${data.count} opiniones; ${cards.length} tarjetas; ${changed} archivos cambiados.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main().catch(err => { console.error(err.message); process.exit(1); });
}
