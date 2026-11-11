// Inserta en las páginas de servicio: botones y distintivos en el hero, galería
// de trabajos reales (fotos de assets/galeria), pasos del proceso y tarjetas de
// beneficios. Idempotente: los bloques generados van entre marcadores svc-ux y
// se reemplazan al volver a ejecutar.  Uso: node scripts/service-pages-ux.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Dimensiones reales (completa y miniatura) para reservar espacio sin saltos.
const dims = {
    4: [1600, 1200, 500, 375], 5: [1600, 1600, 500, 500], 9: [1600, 900, 500, 281],
    11: [1600, 1200, 500, 375], 13: [1600, 1200, 500, 375], 14: [1600, 898, 500, 281],
    15: [1600, 1200, 500, 375], 27: [1600, 2133, 500, 667], 29: [1600, 1201, 500, 375],
    35: [1600, 2133, 500, 667], 39: [1600, 1201, 500, 375], 41: [1600, 1201, 500, 375],
    47: [1600, 1200, 500, 375], 58: [1600, 1202, 500, 376], 59: [1600, 1200, 500, 375],
    60: [1600, 1200, 500, 375], 63: [1600, 1201, 500, 375], 65: [1600, 1200, 500, 375],
    69: [1600, 1201, 500, 375], 73: [1600, 1201, 500, 375], 74: [1600, 1201, 500, 375],
    75: [1600, 1201, 500, 375], 79: [1600, 1045, 500, 327], 80: [1600, 720, 500, 225],
    82: [1600, 720, 500, 225], 84: [1600, 1492, 500, 466], 86: [1600, 720, 500, 225],
    87: [1600, 720, 500, 225], 92: [1600, 1431, 500, 447], 93: [1600, 1200, 500, 375],
    103: [1600, 883, 500, 276], 104: [1024, 768, 500, 375], 107: [1200, 675, 500, 281],
    108: [675, 1200, 281, 500], 109: [1200, 675, 500, 281], 110: [1200, 900, 500, 375],
    115: [1200, 675, 500, 281], 116: [1200, 675, 500, 281], 118: [1200, 900, 500, 375],
    127: [1200, 675, 500, 281], 128: [737, 1124, 328, 500], 129: [681, 1133, 301, 500],
    130: [1200, 651, 500, 271], 131: [724, 887, 408, 500], 132: [730, 871, 419, 500],
    133: [1200, 1090, 500, 454], 134: [1200, 900, 500, 375], 142: [1200, 900, 500, 375],
    143: [1200, 900, 500, 375], 145: [1200, 900, 500, 375], 147: [1200, 900, 500, 375],
    148: [1200, 900, 500, 375],
};

// Fotos por servicio: [id, título corto ES, título corto EN]. La primera es la destacada.
const photos = {
    'rotulacion-vehicular': [
        [118, 'Forrado integral de flotilla', 'Full fleet wrap'],
        [75, 'Caja de camión de reparto', 'Delivery truck box'],
        [39, 'Combi rotulada con ilustración', 'Illustrated van wrap'],
        [47, 'Camioneta de reparto', 'Delivery pickup'],
        [142, 'Camión revolvedor', 'Concrete mixer truck'],
        [134, 'Rotulación industrial de tanque', 'Industrial tanker graphics'],
        [127, 'Rotulación de embarcación', 'Boat graphics'],
        [74, 'Caja de carga con gráfica', 'Cargo box graphics'],
    ],
    'anuncios-luminosos': [
        [87, 'Letras luminosas de noche', 'Illuminated letters at night'],
        [82, 'Anuncio de fachada iluminado', 'Lit storefront sign'],
        [13, 'Anuncio para restaurante', 'Restaurant sign'],
        [104, 'Logotipo luminoso en tienda', 'Lit in-store logo'],
        [133, 'Letrero luminoso para heladería', 'Ice cream shop sign'],
        [109, 'Letras luminosas para evento', 'Lit event lettering'],
        [15, 'Logotipo retroiluminado', 'Backlit logo'],
        [69, 'Letras monumentales iluminadas', 'Illuminated landmark letters'],
    ],
    'letras-3d': [
        [86, 'Letras 3D en fachada', '3D letters on a facade'],
        [11, 'Letras 3D para comercio', 'Storefront 3D letters'],
        [9, 'Letras metálicas en interior', 'Metal letters indoors'],
        [14, 'Letras 3D en acceso comercial', '3D letters over an entrance'],
        [5, 'Logotipo en relieve', 'Raised logo'],
        [35, 'Letras y logotipo en relieve', 'Raised letters and logo'],
        [4, 'Letras 3D para acceso residencial', '3D letters for a residential entrance'],
        [41, 'Letras monumentales', 'Landmark letters'],
    ],
    'neon-flex': [
        [58, 'Frase en neón flex', 'Custom neon phrase'],
        [79, 'Letreros circulares de neón', 'Round neon signs'],
        [109, 'Logotipo en neón para evento', 'Neon logo for an event'],
        [108, 'Figura de neón LED', 'LED neon figure'],
        [110, 'Escenografía con luz LED', 'LED stage design'],
    ],
    'gran-formato': [
        [84, 'Lonas en fachada', 'Banners on a facade'],
        [147, 'Arco de bienvenida para congreso', 'Conference welcome arch'],
        [29, 'Muro de prensa', 'Step and repeat backdrop'],
        [65, 'Muro corporativo impreso', 'Printed corporate wall'],
        [107, 'Vinil microperforado en vidrio', 'Perforated window vinyl'],
        [145, 'Lonas perimetrales de obra', 'Construction site banners'],
        [73, 'Lona publicitaria', 'Printed banner'],
        [148, 'Muro de patrocinadores', 'Sponsor wall'],
    ],
    'rotulacion-tradicional': [
        [93, 'Cortinas metálicas rotuladas', 'Painted roll-up shutters'],
        [59, 'Cortina con dos marcas', 'Shutter with two brands'],
        [60, 'Cortina con logotipos', 'Shutter with logos'],
        [63, 'Escudo y letras en barda', 'Crest and lettering on a wall'],
        [92, 'Fachada y cortinas rotuladas', 'Painted facade and shutters'],
    ],
    toldos: [
        [103, 'Toldo para acceso comercial', 'Entrance awning'],
        [80, 'Toldo con marca en fachada', 'Branded storefront awning'],
        [116, 'Toldo para papelería', 'Stationery shop awning'],
        [115, 'Toldo para tienda de abarrotes', 'Grocery store awning'],
    ],
    'obra-mantenimiento': [
        [131, 'Estructura de tótem en obra', 'Pylon structure on site'],
        [132, 'Marquesina con revestimiento', 'Clad canopy'],
        [129, 'Montaje de tótem', 'Pylon installation'],
        [130, 'Revestimiento de marquesinas', 'Canopy cladding'],
        [128, 'Estructura para anuncio elevado', 'Raised sign structure'],
    ],
};

const T = {
    es: {
        whatsapp: 'Enviar fotos por WhatsApp',
        chips: ['Cotización gratis en 24 h', 'Diseño, fabricación e instalación', 'Cancún y Riviera Maya'],
        galleryTitle: 'Trabajos <span class="text-accent-lime">reales</span>',
        gallerySub: 'Proyectos hechos por nuestro equipo. Toca una foto para verla completa.',
        galleryCta: 'Quiero algo así →',
        zoom: 'Ampliar foto: ',
        stepsTitle: '¿Cómo <span class="text-accent-lime">trabajamos</span>?',
        steps: [
            ['Envíanos tu idea', 'Fotos del lugar o vehículo, medidas aproximadas y tu logo.'],
            ['Diseño y cotización', 'Te mandamos propuesta y precio en menos de 24 h.'],
            ['Producción', 'Fabricamos con materiales de calidad en nuestro taller.'],
            ['Instalación', 'Montaje profesional en Cancún y la Riviera Maya.'],
        ],
    },
    en: {
        whatsapp: 'Send photos on WhatsApp',
        chips: ['Free quote within 24 h', 'Design, production and installation', 'Cancún and Riviera Maya'],
        galleryTitle: 'Our <span class="text-accent-lime">work</span>',
        gallerySub: 'Projects made by our team. Tap a photo to see it full size.',
        galleryCta: 'I want something like this →',
        zoom: 'Enlarge photo: ',
        stepsTitle: 'How we <span class="text-accent-lime">work</span>',
        steps: [
            ['Send us your idea', 'Photos of the site or vehicle, rough measurements and your logo.'],
            ['Design and quote', 'We send you a proposal and price within 24 hours.'],
            ['Production', 'We build it with quality materials in our workshop.'],
            ['Installation', 'Professional installation in Cancún and the Riviera Maya.'],
        ],
    },
};

// Obra y mantenimiento se coordina con contratistas: pasos y distintivos propios.
const obraEs = {
    gallerySub: 'Proyectos coordinados por nuestro equipo. Toca una foto para verla completa.',
    chips: ['Contratistas por especialidad', 'Un solo contacto para tu obra', 'Cancún y Riviera Maya'],
    steps: [
        ['Cuéntanos qué necesitas', 'Ubicación del negocio, fotos y descripción del trabajo.'],
        ['Revisión y cotización', 'Revisamos el alcance y te enviamos presupuesto.'],
        ['Ejecución', 'El contratista aliado de cada especialidad realiza el trabajo.'],
        ['Supervisión y entrega', 'Damos seguimiento al avance hasta la entrega.'],
    ],
};

const pages = [
    ['rotulacion-vehicular.html', 'rotulacion-vehicular', 'es'],
    ['rotulacion-vehicular-en.html', 'rotulacion-vehicular', 'en'],
    ['anuncios-luminosos.html', 'anuncios-luminosos', 'es'],
    ['anuncios-luminosos-en.html', 'anuncios-luminosos', 'en'],
    ['letras-3d.html', 'letras-3d', 'es'],
    ['letras-3d-en.html', 'letras-3d', 'en'],
    ['neon-flex.html', 'neon-flex', 'es'],
    ['neon-flex-en.html', 'neon-flex', 'en'],
    ['gran-formato.html', 'gran-formato', 'es'],
    ['gran-formato-en.html', 'gran-formato', 'en'],
    ['rotulacion-tradicional.html', 'rotulacion-tradicional', 'es'],
    ['toldos.html', 'toldos', 'es'],
    ['toldos-en.html', 'toldos', 'en'],
    ['obra-mantenimiento.html', 'obra-mantenimiento', 'es'],
];

const relatedImg = {
    'rotulacion-vehicular': 'assets/galeria/thumbs/galeria-118.webp',
    'anuncios-luminosos': 'assets/galeria/thumbs/galeria-087.webp',
    'gran-formato': 'assets/galeria/thumbs/galeria-084.webp',
    toldos: 'assets/galeria/thumbs/galeria-103.webp',
    alucobond: 'assets/galeria/alucobond/thumbs/gac-churubusco-3.webp',
};

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const mark = (name, html) => `<!-- svc-ux:${name} -->${html}<!-- /svc-ux:${name} -->`;
// Quita lo generado antes para que el script sea idempotente.
// El bloque hero-actions envuelve el CTA original: se restaura ese CTA.
const strip = html => html
    .replace(/<!-- svc-ux:hero-actions --><div class="svc-hero-actions">(<a [^>]*class="cta-button">[^<]*<\/a>)[\s\S]*?<!-- \/svc-ux:hero-actions -->/g, '$1')
    .replace(/<!-- svc-ux:([a-z-]+) -->[\s\S]*?<!-- \/svc-ux:\1 -->/g, '');

// Ancho extra de las últimas fotos para que la cuadrícula no deje huecos:
// 4 columnas en escritorio (la destacada ocupa 2x2) y 2 en móvil.
function spanClasses(n, i) {
    const k = n - 1, fromEnd = n - 1 - i, cls = [];
    const r = k > 4 ? (k - 4) % 4 : k;
    if (i > 0 && ((r === 1 && k > 4 && fromEnd === 0) || (r === 2 && fromEnd < 2) || (r === 3 && fromEnd === 0))) {
        cls.push(r === 1 ? 'svc-photo--w4' : 'svc-photo--w2');
    }
    if (i > 0 && k % 2 === 1 && fromEnd === 0) cls.push('svc-photo--m2');
    return cls.map(c => ' ' + c).join('');
}

function gallery(slug, lang, t, contactHref) {
    const n = photos[slug].length;
    const items = photos[slug].map(([id, es, en], i) => {
        const [fw, fh, tw, th] = dims[id];
        const file = 'galeria-' + String(id).padStart(3, '0') + '.webp';
        const title = lang === 'en' ? en : es;
        // La destacada ocupa más espacio en escritorio: se ofrece la versión completa.
        const srcset = i === 0
            ? ` srcset="assets/galeria/thumbs/${file} ${tw}w, assets/galeria/${file} ${fw}w" sizes="(min-width: 900px) 640px, 100vw"`
            : '';
        return `
        <button type="button" class="svc-photo${i === 0 ? ' svc-photo--featured' : ''}${spanClasses(n, i)}" data-full="assets/galeria/${file}" aria-label="${esc(t.zoom + title)}">
          <img src="assets/galeria/thumbs/${file}"${srcset} alt="${esc(title)}" width="${tw}" height="${th}" loading="lazy" decoding="async">
          <span class="svc-photo-label">${esc(title)}</span>
        </button>`;
    }).join('');
    return `
    <section class="svc-gallery" aria-labelledby="svc-gallery-title">
      <h2 class="section-title" id="svc-gallery-title">${t.galleryTitle}</h2>
      <p class="section-subtitle">${t.gallerySub}</p>
      <div class="svc-gallery-grid" data-svc-lightbox>${items}
      </div>
      <div class="svc-gallery-cta">
        <a href="${contactHref}" class="cta-button">${t.galleryCta}</a>
      </div>
    </section>
`;
}

function steps(t) {
    const li = t.steps.map(([h, p], i) => `
        <li class="svc-step"><span class="svc-step-num" aria-hidden="true">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('');
    return `
    <section class="svc-steps" aria-labelledby="svc-steps-title">
      <h2 class="section-title" id="svc-steps-title">${t.stepsTitle}</h2>
      <ol class="svc-steps-list">${li}
      </ol>
    </section>
`;
}

for (const [file, slug, lang] of pages) {
    const full = path.join(root, file);
    let html = strip(readFileSync(full, 'utf8'));
    const t = { ...T[lang], ...(slug === 'obra-mantenimiento' ? obraEs : {}) };

    // Hero de obra: foto real en lugar del fondo espacial genérico.
    if (slug === 'obra-mantenimiento') html = html.replace('<link rel="preload" as="image" href="assets/hero-space-bg-earth.jpg" type="image/jpeg" fetchpriority="high">', '<link rel="preload" as="image" href="assets/galeria/galeria-132.webp" type="image/webp" fetchpriority="high">');
    const heroStart = html.indexOf('<section class="hero service-hero"');
    const heroEnd = html.indexOf('</section>', heroStart) + '</section>'.length;
    if (heroStart < 0) throw new Error(file + ': sin hero');
    let hero = html.slice(heroStart, heroEnd);

    if (slug === 'obra-mantenimiento') hero = hero.replace("url('assets/hero-space-bg-earth.jpg')", "url('assets/galeria/galeria-132.webp')");
    // Velo del hero más ligero para que la foto de fondo se vea.
    hero = hero.replace('<div style="position:absolute;inset:0;background:rgba(0,0,40,0.75);"></div>', '<div class="svc-hero-overlay"></div>');

    const cta = hero.match(/<a href="([^"]+)" class="cta-button">[^<]*<\/a>/);
    if (!cta) throw new Error(file + ': sin CTA en hero');
    const contactHref = cta[1];
    const wa = html.match(/href="(https:\/\/wa\.me\/[^"]+)"/);
    if (!wa) throw new Error(file + ': sin enlace de WhatsApp');
    const chips = t.chips.map(c => `<li>${c}</li>`).join('');
    hero = hero.replace(cta[0], mark('hero-actions', `<div class="svc-hero-actions">${cta[0]}<a href="${wa[1]}" class="cta-button cta-secondary svc-wa" target="_blank" rel="noopener noreferrer">${t.whatsapp}</a></div>`)
        + mark('hero-chips', `\n        <ul class="svc-hero-chips">${chips}</ul>`));
    html = html.slice(0, heroStart) + hero + mark('gallery', gallery(slug, lang, t, contactHref)) + mark('steps', steps(t)) + html.slice(heroEnd);

    // Lista de beneficios como tarjetas (estilos en style.css).
    html = html.replace(/<li style="padding:1rem 1\.25rem;background:rgba\(255,255,255,0\.04\);border-radius:8px;border-left:3px solid #00ff00">/g, '<li class="svc-benefit">');
    html = html.replace(/<ul style="list-style:none;padding:0;display:grid;gap:1rem;[^"]*">(\s*<li class="svc-benefit">)/g, '<ul class="svc-benefits">$1');
    html = html.replace(/(<li class="svc-benefit">(?:(?!<\/li>)[\s\S])*?<\/strong>) [—-] /g, '$1 ');

    // Tarjetas de "También te puede interesar" con foto del servicio.
    html = html.replace(/<a href="([^"]+)" style="display:block;padding:1rem 1\.25rem;[^"]*" onmouseover="[^"]*" onmouseout="[^"]*">/g, (m, href) => {
        const img = relatedImg[href.replace(/\.html$/, '')];
        return `<a href="${href}" class="svc-related-card">` + (img ? `<img src="${img}" alt="" width="500" height="375" loading="lazy" decoding="async">` : '');
    });

    // Script de galería, una sola vez, antes de main.js.
    if (!html.includes('servicio-galeria.js')) {
        html = html.replace(/(\s*)<script src="(\/?)main\.js/, '$1<script src="$2servicio-galeria.js?v=1" defer></script>$1<script src="$2main.js');
    }
    writeFileSync(full, html);
    console.log('ok', file, photos[slug].length, 'fotos');
}
