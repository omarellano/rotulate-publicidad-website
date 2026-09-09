(function () {
    'use strict';

    var PRICE = 1850;
    var PHONE = '529984007987';

    var swatches = Array.from(document.querySelectorAll('.color-swatch'));
    var qtyInput = document.getElementById('qty-input');
    var qtyMinus = document.getElementById('qty-minus');
    var qtyPlus = document.getElementById('qty-plus');
    var totalEl = document.getElementById('placa-total');
    var waLink = document.getElementById('whatsapp-cotizar');

    if (!qtyInput || !waLink) return;

    var selectedColor = swatches.find(function (s) { return s.classList.contains('active'); });
    selectedColor = selectedColor ? selectedColor.getAttribute('data-color') : 'Negro Mate';

    function getQty() {
        var n = parseInt(qtyInput.value, 10);
        if (!n || n < 1) n = 1;
        return n;
    }

    function update() {
        var qty = getQty();
        var total = qty * PRICE;
        totalEl.textContent = '$' + total.toLocaleString('es-MX') + ' MXN';

        var msg = 'Hola Rotúlate, quiero cotizar ' + qty + ' hoja(s) de placa de alucobond color ' + selectedColor + '.';
        waLink.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);
    }

    swatches.forEach(function (btn) {
        btn.addEventListener('click', function () {
            swatches.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            selectedColor = btn.getAttribute('data-color');
            update();
        });
    });

    qtyMinus.addEventListener('click', function () {
        qtyInput.value = Math.max(1, getQty() - 1);
        update();
    });
    qtyPlus.addEventListener('click', function () {
        qtyInput.value = getQty() + 1;
        update();
    });
    qtyInput.addEventListener('input', update);

    update();
})();
