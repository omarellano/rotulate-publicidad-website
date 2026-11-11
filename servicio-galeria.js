/* Visor de fotos para la galería de las páginas de servicio
   (bloques [data-svc-lightbox] generados por scripts/service-pages-ux.mjs).
   Reutiliza los estilos #lightbox de style.css. */
(function () {
    'use strict';
    var grids = document.querySelectorAll('[data-svc-lightbox]');
    if (!grids.length || document.getElementById('lightbox')) return;
    var en = document.documentElement.lang.indexOf('en') === 0;

    var lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', en ? 'Enlarged photo' : 'Foto ampliada');
    lb.innerHTML =
        '<button class="lb-close" aria-label="' + (en ? 'Close' : 'Cerrar') + '">&times;</button>' +
        '<button class="lb-prev" aria-label="' + (en ? 'Previous' : 'Anterior') + '">&#8249;</button>' +
        '<button class="lb-next" aria-label="' + (en ? 'Next' : 'Siguiente') + '">&#8250;</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" alt=""><p class="lb-caption"></p></div>';
    document.body.appendChild(lb);

    var caption = lb.querySelector('.lb-caption');
    var img = lb.querySelector('.lb-img');
    var items = [];
    var current = 0;
    var opener = null;

    function show(index) {
        current = (index + items.length) % items.length;
        var item = items[current];
        var thumb = item.querySelector('img');
        // Nodo nuevo: evita ver la foto anterior mientras carga la siguiente.
        var next = document.createElement('img');
        next.className = 'lb-img';
        next.alt = thumb.alt;
        next.src = item.getAttribute('data-full');
        img.replaceWith(next);
        img = next;
        caption.textContent = thumb.alt;
    }

    function open(list, index) {
        items = list;
        opener = document.activeElement;
        show(index);
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
        lb.querySelector('.lb-close').focus();
    }

    function close() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        img.removeAttribute('src');
        if (opener && document.contains(opener)) opener.focus();
        opener = null;
    }

    Array.prototype.forEach.call(grids, function (grid) {
        grid.addEventListener('click', function (e) {
            var item = e.target.closest('.svc-photo');
            if (!item) return;
            var list = Array.prototype.slice.call(grid.querySelectorAll('.svc-photo'));
            open(list, list.indexOf(item));
        });
    });

    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    lb.addEventListener('click', function (e) {
        if (e.target === lb || e.target.classList.contains('lb-img-wrap')) close();
    });

    document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'Tab') {
            var btns = Array.prototype.slice.call(lb.querySelectorAll('button'));
            var idx = btns.indexOf(document.activeElement);
            e.preventDefault();
            btns[(idx + (e.shiftKey ? btns.length - 1 : 1) + btns.length) % btns.length].focus();
        }
    });

    var startX = 0;
    lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    });
})();
