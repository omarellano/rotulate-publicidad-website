import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyToHtml, formatRating, originalText, pickReviews } from './update-google-reviews.mjs';

const reviews = [
    { reviewer: { displayName: 'Ana <b>' }, starRating: 'FIVE', comment: 'Excelente "trabajo"', createTime: '2026-11-10T10:00:00Z' },
    { reviewer: { displayName: 'Bajo' }, starRating: 'TWO', comment: 'Malo', createTime: '2026-11-11T10:00:00Z' },
    { reviewer: { displayName: 'Sin texto' }, starRating: 'FIVE', createTime: '2026-11-11T09:00:00Z' },
    { reviewer: { displayName: 'Tom' }, starRating: 'FOUR', comment: 'Great job\n\n(Translated by Google)\nGran trabajo', createTime: '2026-11-01T10:00:00Z' },
    { reviewer: { isAnonymous: true }, starRating: 'FIVE', comment: '(Translated by Google) Good\n\n(Original)\nBueno', createTime: '2026-10-01T10:00:00Z' },
];

test('originalText descarta traducciones automáticas', () => {
    assert.equal(originalText('Great job\n\n(Translated by Google)\nGran trabajo'), 'Great job');
    assert.equal(originalText('(Translated by Google) Good\n\n(Original)\nBueno'), 'Bueno');
    assert.equal(formatRating(4.66), '4.7');
    assert.equal(formatRating(5), '5.0');
});

test('pickReviews filtra, ordena y limita', () => {
    const picked = pickReviews(reviews, 3);
    assert.deepEqual(picked.map(r => r.name), ['Ana <b>', 'Tom', 'Cliente de Google']);
    assert.deepEqual(picked.map(r => r.stars), [5, 4, 5]);
});

test('applyToHtml actualiza números y tarjetas escapando HTML', () => {
    const html = '<p aria-label="Google: 4.7 estrellas con 43 opiniones"><span data-gr="rating">4.7</span> · <span data-gr="count">43</span></p>'
        + '<div>\n<!-- google-reviews:start -->\nviejo\n<!-- google-reviews:end -->\n</div>';
    const out = applyToHtml(html, { rating: '4.8', count: 51, cards: pickReviews(reviews, 2) });
    assert.match(out, /Google: 4\.8 estrellas con 51 opiniones/);
    assert.match(out, /data-gr="rating">4\.8</);
    assert.match(out, /data-gr="count">51</);
    assert.ok(!out.includes('viejo'));
    assert.ok(out.includes('Ana &lt;b&gt;') && out.includes('&quot;trabajo&quot;'));
    assert.ok(out.includes('★★★★☆') && out.includes('nov. 2026'));
    // Sin tarjetas no se borra lo existente
    assert.ok(applyToHtml(html, { rating: '4.8', count: 51, cards: [] }).includes('viejo'));
});

test('los HTML del sitio tienen las marcas que el script necesita', () => {
    const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
    assert.ok(home.indexOf('<!-- google-reviews:start -->') < home.indexOf('<!-- google-reviews:end -->'));
    assert.match(home, /data-gr="rating"/);
    assert.match(home, /data-gr="count"/);
    assert.match(home, /Google: \d\.\d estrellas con \d+ opiniones/);
    assert.match(readFileSync(new URL('../en/index.html', import.meta.url), 'utf8'), /data-gr="count"/);
});
