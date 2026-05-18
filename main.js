/* ============================================================
   Rotulate Publicidad — Main UI Logic
   Scroll effects, mobile menu, scroll reveal, back-to-top
   ============================================================ */

(function () {
    'use strict';

    /* ── Throttle helper ───────────────────────────────────── */
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

    /* ── DOM References ────────────────────────────────────── */
    const header = document.getElementById('main-header');
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section[id]');

    /* ── 1. Header scroll effect (throttled) ───────────────── */
    function onScroll() {
        const scrollY = window.scrollY;

        // Header compact style
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back-to-top visibility
        if (backToTop) {
            if (scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active nav link tracking
        updateActiveNav(scrollY);
    }

    window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });

    /* ── 2. Active nav link tracking ──────────────────────── */
    function updateActiveNav(scrollY) {
        let currentId = '';
        sections.forEach(function (section) {
            var top = section.offsetTop - 120;
            if (scrollY >= top) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }

    /* ── 3. Smooth scroll for nav links ────────────────────── */
    navLinks.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            // Solo interceptar hash internos puros (#id), no /#id ni URLs externas
            if (!targetId || !/^#[\w-]+$/.test(targetId)) return;
            var targetElement = document.getElementById(targetId.substring(1));
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                closeMenu();
            }
        });
    });

    // Also handle CTA buttons that link to sections
    document.querySelectorAll('a.cta-button[href^="#"]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || !/^#[\w-]+$/.test(href)) return;
            var target = document.getElementById(href.substring(1));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                closeMenu();
            }
        });
    });

    /* ── 4. Mobile hamburger menu ─────────────────────────── */
    // Create overlay backdrop
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

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            if (nav.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    overlay.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            closeMenu();
        }
    });

    /* ── 5. Back-to-top button ─────────────────────────────── */
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── 6. Intersection Observer — Scroll Reveal ──────────── */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show all immediately
        revealElements.forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    /* ── 7. Hero Background Slider ────────────────────── */
    function initBgSlider() {
        var slides = document.querySelectorAll('.hero-bg-slide');
        var dots = document.querySelectorAll('.hero-dot');
        if (slides.length <= 1) return;

        var current = 0;
        var timer = null;
        var interval = 5000;

        function goTo(index) {
            slides[current].classList.remove('active');
            if (dots[current]) dots[current].classList.remove('active');
            current = ((index % slides.length) + slides.length) % slides.length;
            slides[current].classList.add('active');
            if (dots[current]) dots[current].classList.add('active');
        }

        function next() { goTo(current + 1); }

        function start() {
            if (timer) clearInterval(timer);
            timer = setInterval(next, interval);
        }

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                goTo(i);
                start();
            });
        });

        // Pause on hover
        var hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
            hero.addEventListener('mouseleave', start);
        }

        start();
    }


    /* ── 7b. Counter Animation ─────────────────────────────── */
    function initCounters() {
        var stats = document.querySelectorAll('.nosotros-stats strong');
        if (!stats.length) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, prefersReduced);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(function (el) { counterObserver.observe(el); });
    }

    function animateCounter(el, skipAnimation) {
        var text = el.textContent.trim();
        var prefix = text.charAt(0) === '+' ? '+' : '';
        var suffix = text.charAt(text.length - 1) === '+' ? '+' : (text.charAt(text.length - 1) === '%' ? '%' : '');
        var num = parseInt(text.replace(/[^0-9]/g, ''), 10);
        if (isNaN(num)) return;

        if (skipAnimation) {
            el.textContent = prefix + num + suffix;
            return;
        }

        var duration = 2000;
        var start = performance.now();
        el.textContent = prefix + '0' + suffix;

        function step(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(num * eased);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    initCounters();

    // Run onScroll once on load to set initial states
    onScroll();
    initBgSlider();
    initGaleriaAleatoria();

    /* ── 8. Galería aleatoria de trabajos ─────────────────── */
    function initGaleriaAleatoria() {
        var grid = document.getElementById('galeria-grid');
        if (!grid) return;

        var allImgs = [
            { f: 'galeria-001.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-002.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-003.webp', l: 'Letras 3D' },
            { f: 'galeria-004.webp', l: 'Gran Formato' },
            { f: 'galeria-005.webp', l: 'Rotulación' },
            { f: 'galeria-006.webp', l: 'Señalización' },
            { f: 'galeria-007.webp', l: 'Gran Formato' },
            { f: 'galeria-008.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-009.webp', l: 'Toldos' },
            { f: 'galeria-010.webp', l: 'Fachada' },
            { f: 'galeria-011.webp', l: 'Rotulación' },
            { f: 'galeria-012.webp', l: 'Letras 3D' },
            { f: 'galeria-013.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-014.webp', l: 'Fachada' },
            { f: 'galeria-015.webp', l: 'Gran Formato' },
            { f: 'galeria-016.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-017.webp', l: 'Letras 3D' },
            { f: 'galeria-018.webp', l: 'Señalización' },
            { f: 'galeria-019.webp', l: 'Rotulación' },
            { f: 'galeria-020.webp', l: 'Gran Formato' },
            { f: 'galeria-021.webp', l: 'Fachada' },
            { f: 'galeria-022.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-023.webp', l: 'Letras 3D' },
            { f: 'galeria-024.webp', l: 'Rotulación' },
            { f: 'galeria-025.webp', l: 'Toldos' },
            { f: 'galeria-026.webp', l: 'Gran Formato' },
            { f: 'galeria-027.webp', l: 'Fachada' },
            { f: 'galeria-028.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-029.webp', l: 'Letras 3D' },
            { f: 'galeria-030.webp', l: 'Señalización' },
            { f: 'galeria-031.webp', l: 'Gran Formato' },
            { f: 'galeria-032.webp', l: 'Rotulación' },
            { f: 'galeria-033.webp', l: 'Fachada' },
            { f: 'galeria-034.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-035.webp', l: 'Letras 3D' },
            { f: 'galeria-036.webp', l: 'Gran Formato' },
            { f: 'galeria-037.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-038.webp', l: 'Toldos' },
            { f: 'galeria-039.webp', l: 'Fachada' },
            { f: 'galeria-040.webp', l: 'Señalización' },
            { f: 'galeria-041.webp', l: 'Rotulación' },
            { f: 'galeria-042.webp', l: 'Gran Formato' },
            { f: 'galeria-043.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-044.webp', l: 'Letras 3D' },
            { f: 'galeria-045.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-046.webp', l: 'Fachada' },
            { f: 'galeria-047.webp', l: 'Gran Formato' },
            { f: 'galeria-048.webp', l: 'Toldos' },
            { f: 'galeria-049.webp', l: 'Rotulación' },
            { f: 'galeria-050.webp', l: 'Señalización' },
            { f: 'galeria-051.webp', l: 'Letras 3D' },
            { f: 'galeria-052.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-053.webp', l: 'Fachada' },
            { f: 'galeria-054.webp', l: 'Gran Formato' },
            { f: 'galeria-055.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-056.webp', l: 'Toldos' },
            { f: 'galeria-057.webp', l: 'Letras 3D' },
            { f: 'galeria-058.webp', l: 'Rotulación' },
            { f: 'galeria-059.webp', l: 'Gran Formato' },
            { f: 'galeria-060.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-061.webp', l: 'Fachada' },
            { f: 'galeria-062.webp', l: 'Señalización' },
            { f: 'galeria-063.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-064.webp', l: 'Letras 3D' },
            { f: 'galeria-065.webp', l: 'Gran Formato' },
            { f: 'galeria-066.webp', l: 'Rotulación' },
            { f: 'galeria-067.webp', l: 'Toldos' },
            { f: 'galeria-068.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-069.webp', l: 'Fachada' },
            { f: 'galeria-070.webp', l: 'Letras 3D' },
            { f: 'galeria-071.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-072.webp', l: 'Gran Formato' },
            { f: 'galeria-073.webp', l: 'Señalización' },
            { f: 'galeria-074.webp', l: 'Rotulación' },
            { f: 'galeria-075.webp', l: 'Toldos' },
            { f: 'galeria-076.webp', l: 'Fachada' },
            { f: 'galeria-077.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-078.webp', l: 'Gran Formato' },
            { f: 'galeria-079.webp', l: 'Letras 3D' },
            { f: 'galeria-080.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-081.webp', l: 'Fachada' },
            { f: 'galeria-082.webp', l: 'Rotulación' },
            { f: 'galeria-083.webp', l: 'Gran Formato' },
            { f: 'galeria-084.webp', l: 'Señalización' },
            { f: 'galeria-085.webp', l: 'Toldos' },
            { f: 'galeria-086.webp', l: 'Letras 3D' },
            { f: 'galeria-087.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-088.webp', l: 'Gran Formato' },
            { f: 'galeria-089.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-090.webp', l: 'Fachada' },
            { f: 'galeria-091.webp', l: 'Anuncio Luminoso' },
            { f: 'galeria-092.webp', l: 'Fachada Comercial' },
            { f: 'galeria-093.webp', l: 'Señalización' },
            { f: 'galeria-094.webp', l: 'Cortina' },
            { f: 'galeria-095.webp', l: 'Rotulación' },
            { f: 'galeria-096.webp', l: 'Señalización' },
            { f: 'galeria-097.webp', l: 'Letras 3D' },
            { f: 'galeria-098.webp', l: 'Letras 3D' },
            { f: 'galeria-099.webp', l: 'Rotulación Vehicular' },
            { f: 'galeria-100.webp', l: 'Fachada Comercial' },
            { f: 'galeria-101.webp', l: 'Letrero' },
            { f: 'galeria-102.webp', l: 'Anuncio' },
            { f: 'galeria-103.webp', l: 'Toldos' }
        ];

        // Fisher-Yates shuffle
        for (var i = allImgs.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = allImgs[i]; allImgs[i] = allImgs[j]; allImgs[j] = tmp;
        }

        // Pick 12 for display, apply masonry pattern
        var selected = allImgs.slice(0, 12);
        var pattern = ['galeria-tall', '', '', 'galeria-wide', '', 'galeria-tall', '', '', 'galeria-wide', '', '', ''];
        var html = '';
        selected.forEach(function (img, i) {
            var cls = pattern[i] ? ' ' + pattern[i] : '';
            html += '<div class="galeria-item' + cls + ' reveal">' +
                '<img src="assets/galeria/' + img.f + '" alt="' + img.l + ' en Cancún" loading="lazy">' +
                '<div class="galeria-label">' + img.l + '</div>' +
                '</div>';
        });
        grid.innerHTML = html;

        // Re-observe reveal elements inside the grid
        if (typeof revealObserver !== 'undefined') {
            grid.querySelectorAll('.reveal').forEach(function (el) {
                revealObserver.observe(el);
            });
        } else {
            grid.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    /* ── 9. Lightbox para Galería de Trabajos ──────────────── */
    (function () {
        var items = Array.from(document.querySelectorAll('.galeria-item'));
        if (!items.length) return;

        // Build overlay
        var lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML =
            '<button class="lb-close" aria-label="Cerrar">&times;</button>' +
            '<button class="lb-prev" aria-label="Anterior">&#8249;</button>' +
            '<button class="lb-next" aria-label="Siguiente">&#8250;</button>' +
            '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""><p class="lb-caption"></p></div>';
        document.body.appendChild(lb);

        var lbImg     = lb.querySelector('.lb-img');
        var lbCaption = lb.querySelector('.lb-caption');
        var current   = 0;

        function open(index) {
            current = index;
            var item  = items[index];
            var src   = item.querySelector('source') ? item.querySelector('source').srcset : item.querySelector('img').src;
            var alt   = item.querySelector('img').alt;
            var label = item.querySelector('.galeria-label');
            lbImg.src = src;
            lbImg.alt = alt;
            lbCaption.textContent = label ? label.textContent : '';
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

        items.forEach(function (item, i) {
            item.style.cursor = 'zoom-in';
            item.addEventListener('click', function () { open(i); });
        });

        lb.querySelector('.lb-close').addEventListener('click', close);
        lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); prev(); });
        lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); next(); });
        lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-img-wrap')) close(); });

        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('active')) return;
            if (e.key === 'Escape')    close();
            if (e.key === 'ArrowLeft')  prev();
            if (e.key === 'ArrowRight') next();
        });

        // Touch swipe
        var startX = 0;
        lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
        });
    })();

})();
