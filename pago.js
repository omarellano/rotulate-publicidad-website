/* Páginas de resultado de pago Clip: evento GA4 vía dataLayer (solo con consentimiento).
   La página informa al cliente; NO es prueba de pago. La confirmación real es el panel/correo de Clip. */
(function () {
    'use strict';
    var page = document.querySelector('[data-pago]');
    if (!page) return;
    var result = page.getAttribute('data-pago');
    if (result !== 'aprobado' && result !== 'rechazado') return;
    var lang = (document.documentElement.lang || 'es').slice(0, 2);
    var key = 'rtmx_clip_' + result + '_' + lang;
    var sent = false;

    function alreadySent() {
        try { return sessionStorage.getItem(key) === '1'; } catch (e) { return false; }
    }

    function send() {
        if (sent || alreadySent() || typeof window.rtmxTrack !== 'function') return;
        var consent = null;
        try { consent = localStorage.getItem('rtmx_consent'); } catch (e) { /* sin almacenamiento */ }
        if (consent !== 'granted') return;
        sent = true;
        try { sessionStorage.setItem(key, '1'); } catch (e) { /* recarga podría duplicar */ }
        window.rtmxTrack({
            event: 'clip_pago_' + result,
            payment_provider: 'clip',
            payment_result: result,
            page_language: lang
        });
    }

    // Si el visitante acepta el banner aquí mismo, analytics.js ya concedió el consentimiento
    // en la fase de destino del clic; este listener corre después, en la burbuja.
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#consent-accept')) send();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', send);
    } else {
        send();
    }
})();
