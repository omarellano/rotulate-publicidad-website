/* Preserve the requested service across the quote journey. */
(function () {
    'use strict';
    const labels = {
        'anuncios-luminosos': 'illuminated signs',
        'neon-flex': 'LED neon flex',
        'letras-3d': '3D letters',
        'rotulacion-tradicional': 'hand-painted signage',
        'rotulacion-vehicular': 'vehicle wraps',
        'alucobond': 'installed aluminum composite facades',
        'placa-alucobond': 'aluminum composite panel sheets',
        'control-solar': 'solar control film',
        'toldos': 'awnings',
        'lonas-vinilos': 'large format printing, banners and vinyl'
    };
    const values = new URLSearchParams(window.location.search).getAll('servicio');
    if (values.length !== 1 || !Object.prototype.hasOwnProperty.call(labels, values[0])) return;
    const service = values[0];
    const select = document.getElementById('servicio');
    if (select && !select.value && Array.from(select.options).some(option => option.value === service && !option.disabled)) {
        select.value = service;
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (document.documentElement.lang !== 'en') return;
    const contact = document.getElementById('contact');
    if (!contact) return;
    const message = "Hello Rotulate, I'd like a quote for " + labels[service] + '.';
    contact.querySelectorAll('a[href]').forEach(function (link) {
        const url = new URL(link.href);
        if (url.hostname === 'wa.me' && url.pathname === '/529984007987') {
            url.searchParams.set('text', message);
            link.href = url.href;
        } else if (url.protocol === 'mailto:' && url.pathname === 'rotulatemx@gmail.com') {
            url.searchParams.set('subject', 'Quote request: ' + labels[service]);
            url.searchParams.set('body', message);
            link.href = url.href;
        }
    });
})();
