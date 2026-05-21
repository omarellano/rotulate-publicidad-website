/* ============================================================
   Rotulate Publicidad — Lonas Cancún Landing Page Logic
   Cotizador en tiempo real, WhatsApp link generator, Mobile Nav
   ============================================================ */

(function () {
    'use strict';

    /* ── 1. Helper: Throttle ───────────────────────────────── */
    function throttle(fn, ms) {
        let last = 0;
        return function () {
            const now = Date.now();
            if (now - last >= ms) {
                last = now;
                fn.apply(this, arguments);
            }
        };
    }

    /* ── 2. DOM References & Scroll effects ────────────────── */
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
        const scrollY = window.scrollY;

        // Compact header
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back-to-top button
        if (backToTop) {
            if (scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ── 3. Mobile Navigation ──────────────────────────────── */
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        nav.classList.add('open');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            if (nav.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
            closeMenu();
        }
    });

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    /* ── 4. Cotizador Lonas Cancún ─────────────────────────── */
    const PRICES = {
        estandar: 230,     // Lona 13 oz Latex
        mesh: 260,         // Lona Mesh perforada
        traslucida: 350    // Lona Translúcida (Backlight)
    };

    const widthInput = document.getElementById('lona-width');
    const heightInput = document.getElementById('lona-height');
    const typeSelect = document.getElementById('lona-type');
    const grommetsInput = document.getElementById('lona-grommets');
    const designSelect = document.getElementById('lona-design');
    const qtyInput = document.getElementById('lona-qty');

    function calculateQuote() {
        if (!widthInput || !heightInput || !typeSelect || !grommetsInput || !designSelect || !qtyInput) return;

        const width = Math.max(0.1, parseFloat(widthInput.value) || 0);
        const height = Math.max(0.1, parseFloat(heightInput.value) || 0);
        const type = typeSelect.value;
        const grommets = Math.max(0, parseInt(grommetsInput.value) || 0);
        const design = designSelect.value;
        const qty = Math.max(1, parseInt(qtyInput.value) || 1);

        // Área real vs Área de cobro mínimo (1x1m por pieza)
        const rawArea = width * height;
        const printableArea = Math.max(1.0, rawArea);

        const pricePerM2 = PRICES[type] || 230;
        const basePrintingCost = printableArea * pricePerM2;

        // Ojillos: primer 4 pzas gratis por pieza, adicionales a $5 c/u
        const extraGrommets = Math.max(0, grommets - 4);
        const grommetsCost = extraGrommets * 5;

        // Diseño: costo
        let designCost = 0;
        let customDesignRequired = false;

        if (design === 'basico') {
            designCost = 100;
        } else if (design === 'intermedio') {
            designCost = 200;
        } else if (design === 'avanzado') {
            customDesignRequired = true;
        }

        // Totales
        const totalSinglePiece = basePrintingCost + grommetsCost;
        const totalPrintingAllPieces = totalSinglePiece * qty;
        const finalTotal = totalPrintingAllPieces + designCost;

        // DOM nodes to update
        const priceDisplay = document.getElementById('quote-total');
        const breakdownDisplay = document.getElementById('quote-breakdown');
        const waButton = document.getElementById('quote-wa-btn');

        if (!priceDisplay || !breakdownDisplay || !waButton) return;

        // Visual labels mapping
        const typeLabels = {
            estandar: '13 oz Calidad HP (la confiable para todos tus trabajos de promoción o publicidad)',
            mesh: 'Mesh (la que tiene hoyitos que dejan pasar el viento)',
            traslucida: 'Translúcida (ideal para cajas de luz o anuncios luminosos)'
        };

        if (customDesignRequired) {
            priceDisplay.innerHTML = 'Personalizado';
            breakdownDisplay.innerHTML = `
                <div class="breakdown-item"><strong>Material:</strong> Lona ${typeLabels[type]}</div>
                <div class="breakdown-item"><strong>Medidas:</strong> ${width}m x ${height}m (${rawArea.toFixed(2)}m²)</div>
                <div class="breakdown-item"><strong>Ojillos:</strong> ${grommets} pzas por lona</div>
                <div class="breakdown-item"><strong>Piezas:</strong> ${qty} pza(s)</div>
                <div class="breakdown-item"><strong>Diseño:</strong> Logotipo o idea desde cero</div>
                <div class="breakdown-item alert-msg">✨ El costo de la lona se calcula automáticamente, pero tu diseño requiere cotización personalizada. ¡Te daremos precio del diseño por WhatsApp de inmediato!</div>
            `;
        } else {
            priceDisplay.innerHTML = `$${finalTotal.toLocaleString('es-MX')} MXN`;

            let breakdownHTML = `
                <div class="breakdown-item"><strong>Material:</strong> Lona ${typeLabels[type]} ($${pricePerM2}/m²)</div>
                <div class="breakdown-item"><strong>Impresión:</strong> ${qty} pza(s) de ${width}m x ${height}m (${rawArea.toFixed(2)}m²) = $${(basePrintingCost * qty).toLocaleString('es-MX')} MXN</div>
            `;

            if (rawArea < 1.0) {
                breakdownHTML += `<div class="breakdown-item min-charge-note">⚠️ Se aplica cobro mínimo de 1.0m² ($${pricePerM2} MXN) por pieza.</div>`;
            }

            if (grommetsCost > 0) {
                breakdownHTML += `<div class="breakdown-item"><strong>Ojillos adicionales:</strong> ${extraGrommets * qty} pzas (4 pzas gratis por pieza) = $${(grommetsCost * qty).toLocaleString('es-MX')} MXN</div>`;
            } else {
                breakdownHTML += `<div class="breakdown-item"><strong>Ojillos:</strong> ${grommets} pzas (4 o menos por pieza, gratis)</div>`;
            }

            if (designCost > 0) {
                const designText = design === 'basico' ? 'Básico (Solo texto) (+$100)' : 'Intermedio (Texto + Imagen) (+$200)';
                breakdownHTML += `<div class="breakdown-item"><strong>Diseño:</strong> ${designText} = $${designCost} MXN</div>`;
            } else {
                breakdownHTML += `<div class="breakdown-item"><strong>Diseño:</strong> Ya cuentas con diseño listo ($0)</div>`;
            }

            if (qty >= 5 && rawArea < 1.0) {
                breakdownHTML += `<div class="breakdown-item bulk-note">💡 ¡Tienes un pedido de varias piezas pequeñas! Contáctanos por WhatsApp para un descuento especial agrupado.</div>`;
            }

            breakdownDisplay.innerHTML = breakdownHTML;
        }

        // WhatsApp message generator
        let waText = `Hola Rotúlate, me gustaría cotizar una lona con las siguientes especificaciones:\n\n`;
        waText += `• Tipo de Lona: Lona ${typeLabels[type]}\n`;
        waText += `• Medidas: ${width}m x ${height}m\n`;
        waText += `• Cantidad: ${qty} pieza(s)\n`;
        waText += `• Ojillos: ${grommets} pzas por pieza\n`;

        if (design === 'ninguno') {
            waText += `• Diseño: Ya tengo diseño listo para imprimir\n`;
        } else if (design === 'basico') {
            waText += `• Diseño: Básico (Solo texto)\n`;
        } else if (design === 'intermedio') {
            waText += `• Diseño: Intermedio (Texto + Imagen)\n`;
        } else {
            waText += `• Diseño: Avanzado / Logotipo desde cero (Por cotizar)\n`;
        }

        if (customDesignRequired) {
            waText += `\n¿Me podrían cotizar la impresión y la creación de mi logotipo/diseño?`;
        } else {
            waText += `\nPrecio estimado en cotizador: $${finalTotal.toLocaleString('es-MX')} MXN\n`;
            waText += `¿Me confirman si podemos comenzar con el pedido?`;
        }

        const waEncoded = encodeURIComponent(waText);
        waButton.href = `https://wa.me/529984007987?text=${waEncoded}`;
    }

    // Bind inputs to dynamic recalculations
    const inputs = [widthInput, heightInput, typeSelect, grommetsInput, designSelect, qtyInput];
    inputs.forEach(input => {
        if (input) {
            // Recalculate on both input changes and focus losses
            input.addEventListener('input', calculateQuote);
            input.addEventListener('change', calculateQuote);
        }
    });

    /* ── 5. Custom Select Logic (Mobile & Accessibility Cohesion) ── */
    function initCustomSelects() {
        const customSelects = document.querySelectorAll('.custom-select-container');
        
        customSelects.forEach(container => {
            const trigger = container.querySelector('.custom-select-trigger');
            const list = container.querySelector('.custom-options-list');
            const options = container.querySelectorAll('.custom-option');
            const selectId = container.id === 'lona-type-container' ? 'lona-type' : 'lona-design';
            const select = document.getElementById(selectId);
            
            if (!trigger || !list || !select) return;

            // Toggle dropdown
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = container.classList.contains('open');
                
                // Close all other selects first
                closeAllCustomSelects();
                
                if (!isOpen) {
                    container.classList.add('open');
                    trigger.setAttribute('aria-expanded', 'true');
                    // Focus current selected option
                    const selectedOpt = container.querySelector('.custom-option.selected');
                    if (selectedOpt) {
                        selectedOpt.focus();
                    }
                } else {
                    container.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Option selection
            options.forEach(option => {
                // Make option keyboard-focusable
                option.setAttribute('tabindex', '0');

                function selectOption() {
                    const value = option.getAttribute('data-value');
                    const text = option.textContent;
                    
                    // Update trigger text (keep arrow)
                    const triggerTextSpan = trigger.querySelector('span:first-child');
                    if (triggerTextSpan) triggerTextSpan.textContent = text;
                    
                    // Update active classes
                    options.forEach(opt => {
                        opt.classList.remove('selected');
                        opt.setAttribute('aria-selected', 'false');
                    });
                    option.classList.add('selected');
                    option.setAttribute('aria-selected', 'true');
                    
                    // Update native select
                    select.value = value;
                    
                    // Trigger change event to run recalculation
                    const event = new Event('change', { bubbles: true });
                    select.dispatchEvent(event);
                    
                    // Close list
                    container.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                    trigger.focus();
                }

                option.addEventListener('click', function (e) {
                    e.stopPropagation();
                    selectOption();
                });

                option.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectOption();
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = option.nextElementSibling;
                        if (next && next.classList.contains('custom-option')) {
                            next.focus();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = option.previousElementSibling;
                        if (prev && prev.classList.contains('custom-option')) {
                            prev.focus();
                        }
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        container.classList.remove('open');
                        trigger.setAttribute('aria-expanded', 'false');
                        trigger.focus();
                    }
                });
            });

            // Handle keyboard triggers on the button trigger
            trigger.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!container.classList.contains('open')) {
                        trigger.click();
                    } else {
                        const selectedOpt = container.querySelector('.custom-option.selected') || container.querySelector('.custom-option');
                        if (selectedOpt) selectedOpt.focus();
                    }
                }
            });
        });

        // Close all custom selects when clicking outside
        document.addEventListener('click', function () {
            closeAllCustomSelects();
        });

        function closeAllCustomSelects() {
            customSelects.forEach(container => {
                container.classList.remove('open');
                const trigger = container.querySelector('.custom-select-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
        }
        
        // Close on Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeAllCustomSelects();
            }
        });
    }

    // Run initializations when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initCustomSelects();
        calculateQuote();
    });

})();
