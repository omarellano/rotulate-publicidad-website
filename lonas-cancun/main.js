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
        traslucida: 350,   // Lona Translúcida (Backlight)
        economica: 120     // Lona eco-solvente: cobro mínimo 1 m² por pieza, entrega 2-3 días
    };

    const widthInput = document.getElementById('lona-width');
    const heightInput = document.getElementById('lona-height');
    const typeSelect = document.getElementById('lona-type');
    const grommetsInput = document.getElementById('lona-grommets');
    const designSelect = document.getElementById('lona-design');
    const qtyInput = document.getElementById('lona-qty');
    const nombreInput = document.getElementById('lona-nombre');
    const telefonoInput = document.getElementById('lona-telefono');

    // Última cotización calculada (para registrarla en Supabase al hacer clic en WhatsApp)
    let lastQuote = null;

    function calculateQuote() {
        if (!widthInput || !heightInput || !typeSelect || !grommetsInput || !designSelect || !qtyInput) return;

        const type = typeSelect.value;
        const design = designSelect.value;

        const priceDisplay = document.getElementById('quote-total');
        const breakdownDisplay = document.getElementById('quote-breakdown');
        const waButton = document.getElementById('quote-wa-btn');
        if (!priceDisplay || !breakdownDisplay || !waButton) return;

        // Solo re-renderiza el desglose si cambió: el campo pierde foco al hacer clic en
        // "Ver con HP Latex", dispara 'change' y, si se reconstruyera el botón, el clic se perdería.
        function setBreakdown(html) {
            if (breakdownDisplay.dataset.lastHtml === html) return;
            breakdownDisplay.dataset.lastHtml = html;
            breakdownDisplay.innerHTML = html;
        }

        // Validación explícita: no se calcula ni se envía una cotización con datos inválidos
        // (antes se forzaban a mínimos con Math.max y siempre mostraba un precio).
        const MAX_DIM = 30; // m — por encima de esto es gran formato: va directo a WhatsApp
        const rawWidth = parseFloat(String(widthInput.value).replace(',', '.'));
        const rawHeight = parseFloat(String(heightInput.value).replace(',', '.'));
        const rawGrommets = parseInt(grommetsInput.value, 10);
        const rawQty = parseInt(qtyInput.value, 10);

        const errors = [];
        if (!isFinite(rawWidth) || rawWidth <= 0) errors.push('Escribe el ancho en metros (ej. 2.5).');
        else if (rawWidth > MAX_DIM) errors.push('El ancho supera ' + MAX_DIM + ' m: escríbenos por WhatsApp para gran formato.');
        if (!isFinite(rawHeight) || rawHeight <= 0) errors.push('Escribe la altura en metros (ej. 1.2).');
        else if (rawHeight > MAX_DIM) errors.push('La altura supera ' + MAX_DIM + ' m: escríbenos por WhatsApp para gran formato.');
        if (!Number.isInteger(rawQty) || rawQty < 1) errors.push('La cantidad de piezas debe ser 1 o más.');
        if (!Number.isInteger(rawGrommets) || rawGrommets < 0) errors.push('La cantidad de ojillos no puede ser negativa.');

        if (errors.length) {
            lastQuote = null;
            priceDisplay.textContent = '—';
            setBreakdown('<div class="breakdown-item min-charge-note">' +
                errors.map(function (e) { return '⚠️ ' + e; }).join('<br>') + '</div>');
            waButton.href = 'https://wa.me/529984007987?text=' + encodeURIComponent(
                'Hola Rotulate, quiero cotizar una lona pero necesito ayuda con las medidas.');
            waButton.setAttribute('aria-disabled', 'true');
            waButton.style.opacity = '0.6';
            return;
        }
        waButton.removeAttribute('aria-disabled');
        waButton.style.opacity = '';

        const width = rawWidth;
        const height = rawHeight;
        const grommets = rawGrommets;
        const qty = rawQty;

        // Área real vs Área de cobro mínimo: 1 m² por pieza (HP Latex y económica)
        const rawArea = width * height;
        const isEconomica = type === 'economica';
        const printableArea = Math.max(1.0, rawArea);

        const pricePerM2 = PRICES[type] || PRICES.economica;
        const printingTotal = printableArea * pricePerM2 * qty;

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
        const finalTotal = printingTotal + grommetsCost * qty + designCost;

        // Totales alternativos del mismo pedido (HP Latex vs económica) para sugerir
        // la mejora o el ahorro. Mismos ojillos y diseño en ambos casos.
        const extrasTotal = grommetsCost * qty + designCost;
        const hpTotal = Math.max(1.0, rawArea) * PRICES.estandar * qty + extrasTotal;
        const ecoTotal = Math.max(1.0, rawArea) * PRICES.economica * qty + extrasTotal;

        // Visual labels mapping
        const typeLabels = {
            estandar: 'HP Latex Premium 13 oz (colores intensos, entrega en 24 h)',
            mesh: 'Mesh (la que tiene hoyitos que dejan pasar el viento)',
            traslucida: 'Translúcida (ideal para cajas de luz o anuncios luminosos)',
            economica: 'Económica (para volumen y eventos)'
        };
        const deliveryNote = isEconomica
            ? '🕒 Lona económica: entrega en 2 a 3 días hábiles.'
            : '';

        if (customDesignRequired) {
            priceDisplay.innerHTML = 'Personalizado';
            setBreakdown(`
                <div class="breakdown-item"><strong>Material:</strong> Lona ${typeLabels[type]}</div>
                <div class="breakdown-item"><strong>Medidas:</strong> ${width}m x ${height}m (${rawArea.toFixed(2)}m²)</div>
                <div class="breakdown-item"><strong>Ojillos:</strong> ${grommets} pzas por lona</div>
                <div class="breakdown-item"><strong>Piezas:</strong> ${qty} pza(s)</div>
                <div class="breakdown-item"><strong>Diseño:</strong> Logotipo o idea desde cero</div>
                ${deliveryNote ? '<div class="breakdown-item bulk-note">' + deliveryNote + '</div>' : ''}
                <div class="breakdown-item alert-msg">✨ El costo de la lona se calcula automáticamente, pero tu diseño requiere cotización personalizada. ¡Te daremos precio del diseño por WhatsApp de inmediato!</div>
            `);
        } else {
            priceDisplay.innerHTML = `$${finalTotal.toLocaleString('es-MX')} MXN`;

            let breakdownHTML = `
                <div class="breakdown-item"><strong>Material:</strong> Lona ${typeLabels[type]}${type === 'estandar' ? '' : ' ($' + pricePerM2 + '/m²)'}</div>
                <div class="breakdown-item"><strong>Impresión:</strong> ${qty} pza(s) de ${width}m x ${height}m (${rawArea.toFixed(2)}m²) = $${printingTotal.toLocaleString('es-MX')} MXN</div>
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

            breakdownHTML += `<div class="breakdown-item"><small>El precio incluye impresión, bastilla y 4 ojillos por pieza. Los ojillos extra ($5 c/u) y el diseño se cobran por separado.</small></div>`;

            if (deliveryNote) {
                breakdownHTML += `<div class="breakdown-item bulk-note">${deliveryNote}</div>`;
            }

            if (isEconomica) {
                const delta = hpTotal - finalTotal;
                breakdownHTML += `<div class="breakdown-item bulk-note upsell-note">⬆️ ¿La quieres con mejor acabado y en 24 h? Mejórala a <strong>HP Latex Premium</strong> por <strong>+$${delta.toLocaleString('es-MX')} MXN</strong> en este pedido. <button type="button" class="upsell-btn" data-switch-type="estandar">Ver con HP Latex</button></div>`;
            } else if (type === 'estandar' && ecoTotal < finalTotal) {
                breakdownHTML += `<div class="breakdown-item bulk-note upsell-note">💸 ¿No tienes prisa? Con la <strong>Lona Económica</strong> pagarías <strong>$${(finalTotal - ecoTotal).toLocaleString('es-MX')} MXN menos</strong> (entrega en 2 a 3 días hábiles). <button type="button" class="upsell-btn" data-switch-type="economica">Ver con Económica</button></div>`;
            }

            if (qty >= 5 && rawArea < 1.0) {
                breakdownHTML += `<div class="breakdown-item bulk-note">💡 ¡Tienes un pedido de varias piezas pequeñas! Contáctanos por WhatsApp para un descuento especial agrupado.</div>`;
            }

            setBreakdown(breakdownHTML);
        }

        // WhatsApp message generator
        const nombre = nombreInput ? nombreInput.value.trim().slice(0, 100) : '';
        let waText = nombre
            ? `Hola Rotulate, soy ${nombre}, me gustaría cotizar una lona con las siguientes especificaciones:\n\n`
            : `Hola Rotulate, me gustaría cotizar una lona con las siguientes especificaciones:\n\n`;
        waText += `• Tipo de Lona: Lona ${typeLabels[type]}\n`;
        waText += `• Medidas: ${width}m x ${height}m\n`;
        waText += `• Cantidad: ${qty} pieza(s)\n`;
        if (isEconomica) waText += `• Entrega: 2 a 3 días hábiles (lona económica)\n`;
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

        // Snapshot de la cotización para el registro de leads
        lastQuote = {
            material: `Lona ${typeLabels[type]}`,
            precioM2: pricePerM2,
            medidas: `${width}m x ${height}m (${rawArea.toFixed(2)} m² reales, ${printableArea.toFixed(2)} m² de cobro)`,
            piezas: qty,
            ojillos: grommets,
            diseno: design,
            total: customDesignRequired ? 'Personalizado (diseño por cotizar)' : `$${finalTotal.toLocaleString('es-MX')} MXN`
        };
    }

    // Bind inputs to dynamic recalculations
    const inputs = [widthInput, heightInput, typeSelect, grommetsInput, designSelect, qtyInput, nombreInput];
    inputs.forEach(input => {
        if (input) {
            // Recalculate on both input changes and focus losses
            input.addEventListener('input', calculateQuote);
            input.addEventListener('change', calculateQuote);
        }
    });

    // Cálculo inicial: deja el precio, el desglose y el enlace de WhatsApp
    // coherentes con los valores por defecto del formulario (antes quedaba
    // el precio estático del HTML y lastQuote en null).
    calculateQuote();

    // Botón "Ver con HP Latex / Económica" dentro del desglose: cambia el material
    // y sincroniza el select personalizado.
    const breakdownBox = document.getElementById('quote-breakdown');
    if (breakdownBox) {
        breakdownBox.addEventListener('click', function (e) {
            const btn = e.target.closest ? e.target.closest('[data-switch-type]') : null;
            if (!btn) return;
            const target = btn.getAttribute('data-switch-type');
            const option = document.querySelector('.custom-option[data-value="' + target + '"]');
            if (option) option.click();
        });
    }

    /* ── 4.5 Registro de cotizaciones en Supabase ──────────────
       Cada clic en "Enviar a WhatsApp" guarda la cotización en la
       tabla cotizaciones_web (aunque el visitante sea anónimo) y,
       si dejó contacto, dispara la notificación por EmailJS.
       Nunca bloquea la apertura de WhatsApp: fire-and-forget. */
    const EMAILJS_PUBLIC_KEY = 'Rn8OVcLm0OQq3lrLQ';
    const EMAILJS_SERVICE = 'service_n44qqee';
    const EMAILJS_TEMPLATE = 'template_wxr3rqu';

    let stackPromise = null;

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function ensureLeadStack() {
        if (!stackPromise) {
            stackPromise = (async function () {
                if (!window.supabaseClient) {
                    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
                    await loadScript('../supabase-config.js');
                }
                if (typeof emailjs === 'undefined') {
                    await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
                }
                if (typeof emailjs !== 'undefined' && !window.__emailjsInit) {
                    emailjs.init(EMAILJS_PUBLIC_KEY);
                    window.__emailjsInit = true;
                }
            })().catch(function (err) {
                stackPromise = null; // permitir reintento en el siguiente clic
                throw err;
            });
        }
        return stackPromise;
    }

    // Evitar registros duplicados: misma cotización solo se guarda una vez cada 5 min
    let lastSavedSignature = '';
    let lastSavedAt = 0;

    async function saveQuoteLead() {
        if (!lastQuote) return;

        const nombre = nombreInput ? nombreInput.value.trim().slice(0, 100) : '';
        const telefono = telefonoInput ? telefonoInput.value.trim().slice(0, 20) : '';
        const telefonoValido = telefono && /^[\+]?[\d\s\-\(\)]{7,20}$/.test(telefono);

        const designLabels = {
            ninguno: 'Ya tiene diseño listo',
            basico: 'Básico (+$100)',
            intermedio: 'Intermedio (+$200)',
            avanzado: 'Avanzado / desde cero (por cotizar)'
        };

        const mensaje =
            'Cotización generada en el cotizador de lonas (clic a WhatsApp):\n' +
            '• Material: ' + lastQuote.material + ' ($' + lastQuote.precioM2 + '/m²)\n' +
            '• Medidas: ' + lastQuote.medidas + '\n' +
            '• Piezas: ' + lastQuote.piezas + '\n' +
            '• Ojillos por pieza: ' + lastQuote.ojillos + '\n' +
            '• Diseño: ' + (designLabels[lastQuote.diseno] || lastQuote.diseno) + '\n' +
            '• Total estimado: ' + lastQuote.total;

        const signature = mensaje + '|' + nombre + '|' + telefono;
        const now = Date.now();
        if (signature === lastSavedSignature && now - lastSavedAt < 5 * 60 * 1000) return;

        await ensureLeadStack();
        if (!window.supabaseClient) return;

        const { error } = await window.supabaseClient
            .from('cotizaciones_web')
            .insert([{
                nombre: nombre || 'Visitante del cotizador (anónimo)',
                email: 'No proporcionado',
                telefono: telefonoValido ? telefono : 'No proporcionado',
                servicio: 'cotizador-lonas',
                mensaje: mensaje,
                archivos: []
            }]);

        if (error) {
            console.error('No se pudo registrar la cotización:', error);
            return;
        }

        lastSavedSignature = signature;
        lastSavedAt = now;
        console.log('[Cotizador] Cotización registrada en Supabase.');

        // Notificación por correo solo cuando el visitante dejó contacto real
        if ((nombre || telefonoValido) && typeof emailjs !== 'undefined') {
            try {
                await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
                    from_name: nombre || 'Visitante del cotizador de lonas',
                    from_email: 'No proporcionado',
                    phone: telefonoValido ? telefono : 'No proporcionado',
                    service: 'Cotizador de lonas (lead con contacto)',
                    message_details: mensaje,
                    file_links: 'Sin archivos adjuntos'
                });
            } catch (emailError) {
                console.error('No se pudo enviar la notificación por correo:', emailError);
            }
        }
    }

    (function initQuoteLeadTracking() {
        const waButton = document.getElementById('quote-wa-btn');
        const cotizadorSection = document.getElementById('cotizador');
        if (!waButton) return;

        // Precargar el stack cuando el visitante se acerca al cotizador
        if (cotizadorSection && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                if (entries.some(function (e) { return e.isIntersecting; })) {
                    observer.disconnect();
                    ensureLeadStack().catch(function (err) {
                        console.error('No se pudo precargar el stack de leads:', err);
                    });
                }
            }, { rootMargin: '600px' });
            observer.observe(cotizadorSection);
        }

        // El registro corre en segundo plano; WhatsApp abre en pestaña nueva sin esperar
        waButton.addEventListener('click', function () {
            saveQuoteLead().catch(function (err) {
                console.error('Registro de cotización falló:', err);
            });
        });
    })();

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

    /* ── Lightbox para la mini-galería ─────────────────────
       Reutiliza los estilos #lightbox/.lb-* de ../style.css.
       Las miniaturas son *-thumb.webp; el lightbox abre la
       versión a tamaño completo (sin el sufijo -thumb). */
    function initMiniGaleriaLightbox() {
        var grid = document.querySelector('.mini-galeria-grid');
        if (!grid) return;

        var lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML =
            '<button class="lb-close" aria-label="Cerrar">&times;</button>' +
            '<button class="lb-prev" aria-label="Anterior">&#8249;</button>' +
            '<button class="lb-next" aria-label="Siguiente">&#8250;</button>' +
            '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""><p class="lb-caption"></p></div>';
        document.body.appendChild(lb);

        var lbImg = lb.querySelector('.lb-img');
        var current = 0;

        function items() {
            return Array.prototype.slice.call(grid.querySelectorAll('.galeria-item-card img'));
        }

        function open(index) {
            var imgs = items();
            if (index < 0 || index >= imgs.length) return;
            current = index;
            lbImg.src = imgs[index].src.replace('-thumb.webp', '.webp');
            lbImg.alt = imgs[index].alt;
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            lb.classList.remove('active');
            document.body.style.overflow = '';
            lbImg.src = '';
        }

        function prev() { var n = items().length; if (n) open((current - 1 + n) % n); }
        function next() { var n = items().length; if (n) open((current + 1) % n); }

        grid.addEventListener('click', function (e) {
            var card = e.target.closest('.galeria-item-card');
            if (!card) return;
            var img = card.querySelector('img');
            open(items().indexOf(img));
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
            if (Math.abs(dx) > 50) { if (dx < 0) { next(); } else { prev(); } }
        });
    }

    // Run initializations when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initCustomSelects();
        calculateQuote();
        initMiniGaleriaLightbox();
    });

})();
