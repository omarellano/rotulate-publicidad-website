/* Consentimiento de analítica compartido por todas las páginas, incluida la 404. */
(function () {
    'use strict';
    const queue = window.dataLayer = window.dataLayer || [];
    function gtag() { queue.push(arguments); }
    window.gtag = window.gtag || gtag;
    const denied = {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
    };
    gtag('consent', 'default', denied);
    let granted = false;
    let loaded = false;

    window.rtmxTrack = function (event) {
        if (granted) queue.push(event);
    };

    window.rtmxSetAnalyticsConsent = function (value) {
        granted = value === 'granted';
        gtag('consent', 'update', { ...denied, analytics_storage: granted ? 'granted' : 'denied' });
        if (!granted || loaded) return;
        loaded = true;
        queue.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        queue.push({ event: 'consent_granted' });
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5623CPQG';
        document.head.appendChild(script);
    };

    try {
        if (localStorage.getItem('rtmx_consent') === 'granted') {
            window.rtmxSetAnalyticsConsent('granted');
        }
    } catch (_) { /* El banner también funciona sin almacenamiento persistente. */ }
})();
