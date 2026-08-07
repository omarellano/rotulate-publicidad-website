/* ============================================================
   Rotulate Publicidad — Analítica del recorrido del usuario
   Consent Mode v2, banner de consentimiento, section_view,
   scroll_depth, cta_click, form_start.
   Las etiquetas de GA4/Clarity viven en GTM (GTM-5623CPQG);
   este archivo solo declara consentimiento y empuja eventos
   al dataLayer para que GTM los use como activadores.
   ============================================================ */

(function () {
    'use strict';

    var CONSENT_KEY = 'rtmx_consent';

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    /* ── 1. Consent Mode v2 — denegado por defecto ─────────── */
    gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
    });

    function updateConsent(state) {
        gtag('consent', 'update', {
            analytics_storage: state,
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
        window.dataLayer.push({ event: state === 'granted' ? 'consent_granted' : 'consent_denied' });
    }

    function getStoredConsent() {
        try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
    }

    function setStoredConsent(state) {
        try { localStorage.setItem(CONSENT_KEY, state); } catch (e) { /* localStorage no disponible */ }
    }

    /* ── 2. Banner de consentimiento ───────────────────────── */
    function showBanner() {
        var banner = document.createElement('div');
        banner.id = 'consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Preferencias de privacidad');
        banner.innerHTML =
            '<div class="consent-banner-inner">' +
            '<p>Usamos analítica y mapas de calor para entender cómo navegas el sitio y mejorar tu experiencia. ' +
            '<a href="/privacidad.html">Más información</a>.</p>' +
            '<div class="consent-banner-actions">' +
            '<button type="button" class="cta-button cta-secondary" id="consent-reject">Rechazar</button>' +
            '<button type="button" class="cta-button" id="consent-accept">Aceptar</button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(banner);

        document.getElementById('consent-accept').addEventListener('click', function () {
            setStoredConsent('granted');
            updateConsent('granted');
            hideBanner();
        });
        document.getElementById('consent-reject').addEventListener('click', function () {
            setStoredConsent('denied');
            updateConsent('denied');
            hideBanner();
        });

        requestAnimationFrame(function () { banner.classList.add('visible'); });
    }

    function hideBanner() {
        var banner = document.getElementById('consent-banner');
        if (!banner) return;
        banner.classList.remove('visible');
        setTimeout(function () { banner.remove(); }, 400);
    }

    var storedConsent = getStoredConsent();
    if (storedConsent === 'granted' || storedConsent === 'denied') {
        updateConsent(storedConsent);
    } else {
        onReady(showBanner);
    }

    /* ── 3. section_view — qué secciones ve el usuario ─────── */
    var TRACKED_SECTIONS = ['inicio', 'proceso', 'servicios', 'proyectos', 'nosotros', 'testimonios', 'faq', 'contacto'];
    var seenSections = {};

    function initSectionTracking() {
        if (!('IntersectionObserver' in window)) return;
        var targets = TRACKED_SECTIONS
            .map(function (id) { return document.getElementById(id); })
            .filter(Boolean);
        if (!targets.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var id = entry.target.id;
                if (entry.isIntersecting && !seenSections[id]) {
                    seenSections[id] = true;
                    window.dataLayer.push({ event: 'section_view', section_name: id });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        targets.forEach(function (el) { observer.observe(el); });
    }

    /* ── 4. scroll_depth ────────────────────────────────────── */
    function throttle(fn, ms) {
        var last = 0;
        return function () {
            var now = Date.now();
            if (now - last >= ms) {
                last = now;
                fn.apply(this, arguments);
            }
        };
    }

    function initScrollDepth() {
        var thresholds = [25, 50, 75, 90];
        var fired = {};

        function onScroll() {
            var doc = document.documentElement;
            var scrollHeight = doc.scrollHeight - doc.clientHeight;
            if (scrollHeight <= 0) return;
            var percent = Math.round(((window.scrollY || doc.scrollTop) / scrollHeight) * 100);

            thresholds.forEach(function (t) {
                if (percent >= t && !fired[t]) {
                    fired[t] = true;
                    window.dataLayer.push({ event: 'scroll_depth', percent: t });
                }
            });

            if (thresholds.every(function (t) { return fired[t]; })) {
                window.removeEventListener('scroll', throttled);
            }
        }

        var throttled = throttle(onScroll, 300);
        window.addEventListener('scroll', throttled, { passive: true });
    }

    /* ── 5. cta_click — WhatsApp, teléfono, correo ─────────── */
    function ctaTypeFor(link) {
        var href = link.getAttribute('href') || '';
        if (href.indexOf('wa.me') !== -1) return 'whatsapp';
        if (href.indexOf('tel:') === 0) return 'phone';
        if (href.indexOf('mailto:') === 0) return 'email';
        return null;
    }

    function ctaLocationFor(link) {
        if (link.classList.contains('whatsapp-float')) return 'floating';
        if (link.closest('#main-header')) return 'header';
        if (link.closest('.footer')) return 'footer';
        var section = link.closest('section[id]');
        if (section) return section.id;
        return 'other';
    }

    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var ctaType = ctaTypeFor(link);
        if (!ctaType) return;
        window.dataLayer.push({
            event: 'cta_click',
            cta_type: ctaType,
            cta_location: ctaLocationFor(link)
        });
    });

    /* ── 6. form_start ──────────────────────────────────────── */
    var formStartSent = false;
    document.addEventListener('focusin', function (e) {
        if (formStartSent) return;
        if (!e.target.closest || !e.target.closest('#cotizar')) return;
        formStartSent = true;
        window.dataLayer.push({ event: 'form_start' });
    });

    /* ── Init ───────────────────────────────────────────────── */
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    onReady(function () {
        initSectionTracking();
        initScrollDepth();
    });
})();
