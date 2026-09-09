(function () {
    'use strict';

    var items = Array.from(document.querySelectorAll('.ab-galeria-item'));
    if (!items.length) return;

    var lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML =
        '<button class="lb-close" aria-label="Cerrar">&times;</button>' +
        '<button class="lb-prev" aria-label="Anterior">&#8249;</button>' +
        '<button class="lb-next" aria-label="Siguiente">&#8250;</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""><p class="lb-caption"></p></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lb-img');
    var lbCaption = lb.querySelector('.lb-caption');
    var current = 0;

    function open(index) {
        if (index < 0 || index >= items.length) return;
        current = index;
        var item = items[index];
        lbImg.src = item.getAttribute('data-full');
        lbImg.alt = item.querySelector('img').alt;
        lbCaption.textContent = item.getAttribute('data-caption') || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        lbImg.src = '';
    }

    function prev() { open((current - 1 + items.length) % items.length); }
    function next() { open((current + 1) % items.length); }

    items.forEach(function (item, idx) {
        item.addEventListener('click', function () { open(idx); });
    });

    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); next(); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-img-wrap')) close(); });

    document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    var startX = 0;
    lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    });
})();
