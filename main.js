/* ============================================================
   Rotulate Publicidad — Main UI Logic
   Scroll effects, mobile menu, scroll reveal, back-to-top
   ============================================================ */

(function () {
    'use strict';
    document.documentElement.classList.add('js');

    /* ── Carga diferida del stack del formulario ──────────────
       Supabase + EmailJS + upload.js (~100 KB) solo se descargan
       cuando el usuario se acerca al formulario de cotización,
       no en la carga inicial de la página. */
    (function () {
        const form = document.getElementById('cotizar');
        if (!form) return;
        let started = false;

        function loadScript(src, integrity) {
            return new Promise(function (resolve, reject) {
                const s = document.createElement('script');
                s.src = src;
                // Versión fija + hash: si el CDN sirviera otro contenido, el navegador lo rechaza.
                if (integrity) {
                    s.integrity = integrity;
                    s.crossOrigin = 'anonymous';
                }
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }

        async function loadFormStack() {
            if (started) return;
            started = true;
            // EmailJS solo sirve para la notificación por correo; upload.js ya tolera
            // su ausencia (typeof emailjs !== 'undefined'). Se carga en paralelo y su
            // fallo NO debe impedir que se cargue el controlador del formulario.
            const emailjsReady = loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js', 'sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS')
                .catch(function (err) {
                    console.warn('EmailJS no se pudo cargar; el formulario funcionará sin notificación por correo.', err);
                });
            try {
                await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.0/dist/umd/supabase.js', 'sha384-uteMfOloLDGt042uDz+xHGF3ym63/WQ6rFq7murQRG8Ih7QrXGEGNtWd8688sb4O');
                await loadScript('supabase-config.js');
                await emailjsReady; // si ya terminó, se inicializa antes de upload.js; si falló, no propaga
                await loadScript('upload.js?v=9');
            } catch (err) {
                started = false;
                document.getElementById('form-error').style.display = 'flex';
                console.error('No se pudo cargar el stack del formulario (Supabase):', err);
            }
        }

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(function (entries) {
                if (entries.some(function (en) { return en.isIntersecting; })) {
                    io.disconnect();
                    loadFormStack();
                }
            }, { rootMargin: '600px' });
            io.observe(form);
        } else {
            loadFormStack();
        }
        // respaldo por si el observer no dispara (p. ej. navegación con ancla)
        form.addEventListener('focusin', loadFormStack);
    })();

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

    // Native details supplies keyboard activation and expanded state.
    const serviceMenu = document.querySelector('.service-menu');
    if (serviceMenu) {
        document.addEventListener('click', function (event) {
            if (!serviceMenu.contains(event.target)) serviceMenu.open = false;
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && serviceMenu.open) {
                event.preventDefault();
                serviceMenu.open = false;
                serviceMenu.querySelector('summary').focus();
            }
        });
        serviceMenu.addEventListener('focusout', function () {
            setTimeout(function () {
                if (!serviceMenu.contains(document.activeElement)) serviceMenu.open = false;
            }, 0);
        });
    }

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
        if (e.key === 'Escape' && !e.defaultPrevented && nav.classList.contains('open')) {
            closeMenu();
            menuToggle.focus();
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

    initHeroParticles();
    initGaleriaAleatoria();

    // Configurar botón de recarga de galería sin recargar la página
    (function () {
        var btn = document.getElementById('btn-reload-galeria');
        if (!btn) return;
        var icon = btn.querySelector('.reload-icon');
        var rotating = false;

        btn.addEventListener('click', function () {
            if (rotating) return;
            rotating = true;

            // Animación del icono (giro de 360 grados)
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
            }

            // Regenerar galería con fotos aleatorias (sin saltos de scroll):
            // se guarda la posición y se restaura tras el repintado, porque
            // los navegadores móviles (iOS Safari) no compensan el cambio de altura.
            var y = window.pageYOffset;
            initGaleriaAleatoria(true);
            window.scrollTo(0, y);
            requestAnimationFrame(function () { window.scrollTo(0, y); });

            // Resetear animación después de completar la rotación
            setTimeout(function () {
                if (icon) {
                    icon.style.transition = 'none';
                    icon.style.transform = 'rotate(0deg)';
                    // Forzar reflow
                    icon.offsetHeight;
                    icon.style.transition = '';
                }
                rotating = false;
            }, 600); // 600ms coincide con la duración de la transición en style.css (0.6s)
        });
    })();

    (function () {
        var filtros = document.querySelectorAll('.galeria-filtro');
        filtros.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filtros.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
                var y = window.pageYOffset;
                initGaleriaAleatoria(true);
                window.scrollTo(0, y);
                requestAnimationFrame(function () { window.scrollTo(0, y); });
            });
        });
    })();

    /* ── Constellation Canvas Animation ──────────────────── */
    function initHeroParticles() {
        var canvas = document.getElementById('hero-particles');
        var hero = document.querySelector('.hero');
        if (!canvas || !hero) return;

        // Skip setup on mobile/tablet to conserve resources
        if (window.innerWidth < 969) return;

        // Respect reduced-motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var ctx = canvas.getContext('2d');
        var particles = [];
        var halloween = canvas.dataset.season === 'halloween';
        var critterIndex = 0;
        var numParticles = 65;
        var mouse = { x: null, y: null, active: false };

        function resizeCanvas() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', throttle(resizeCanvas, 200));

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        hero.addEventListener('mouseleave', function () {
            mouse.active = false;
        });

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 2 + 1;
            this.kind = halloween && critterIndex < 12 ? (critterIndex < 6 ? 'bat' : 'pumpkin') : null;
            critterIndex++;
            this.phase = Math.random() * Math.PI * 2;
            this.scale = 0.65 + Math.random() * 0.25;
            this.color = Math.random() > 0.4 ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        }

        Particle.prototype.update = function () {
            this.phase += 0.025;
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            if (mouse.active && mouse.x !== null && mouse.y !== null) {
                var dx = this.x - mouse.x;
                var dy = this.y - mouse.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    var force = (150 - dist) / 150;
                    var angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                }
            }
        };


        // Tiny Halloween figures share Robbie's simple shapes and purple outlines.
        function drawCritter(p) {
            ctx.save();
            ctx.translate(p.x, p.y + Math.sin(p.phase) * 3);
            ctx.scale(p.scale, p.scale);
            ctx.globalAlpha = 0.75;
            ctx.strokeStyle = '#351b49';
            ctx.fillStyle = p.kind === 'pumpkin' ? '#ff6400' : '#9972b8';
            ctx.lineWidth = 1.7;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            if (p.kind === 'bat') {
                var flap = Math.sin(p.phase * 2) * 3;
                ctx.beginPath();
                ctx.moveTo(-2, -2);
                ctx.quadraticCurveTo(-8, -8 + flap, -15, -6 + flap);
                ctx.lineTo(-11, 2);
                ctx.quadraticCurveTo(-7, -1, -5, 5);
                ctx.lineTo(0, 3); ctx.lineTo(5, 5);
                ctx.quadraticCurveTo(7, -1, 11, 2);
                ctx.lineTo(15, -6 + flap);
                ctx.quadraticCurveTo(8, -8 + flap, 2, -2);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(-3, 3);
                ctx.lineTo(-4, -6); ctx.lineTo(0, -3);
                ctx.lineTo(4, -6); ctx.lineTo(3, 3);
                ctx.closePath(); ctx.fill(); ctx.stroke();
            } else {
                // Compact jack-o-lantern with a slow, independently phased eye glow.
                ctx.beginPath(); ctx.ellipse(0, 1, 9, 7, 0, 0, Math.PI * 2);
                ctx.fill(); ctx.stroke();
                ctx.strokeStyle = '#b83f00'; ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.ellipse(0, 1, 4.5, 7, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = '#9972b8'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(1, -9); ctx.stroke();
                ctx.fillStyle = '#351b49';
                ctx.beginPath(); ctx.moveTo(-5, 3); ctx.lineTo(-2, 4);
                ctx.lineTo(0, 3); ctx.lineTo(2, 4); ctx.lineTo(5, 3);
                ctx.quadraticCurveTo(0, 10, -5, 3); ctx.fill();
                ctx.beginPath();
                ctx.moveTo(-6, 0); ctx.lineTo(-3, -3); ctx.lineTo(-1, 0); ctx.closePath();
                ctx.moveTo(1, 0); ctx.lineTo(3, -3); ctx.lineTo(6, 0); ctx.closePath();
                ctx.fill();
                var glow = Math.max(0, Math.sin(p.phase));
                ctx.globalAlpha = 0.9 * glow;
                ctx.fillStyle = '#fff3a3'; ctx.shadowColor = '#ffcc33';
                ctx.shadowBlur = 5 * glow; ctx.fill();
                ctx.restore();
                return;
            }
            ctx.fillStyle = '#fff1e8';
            ctx.beginPath(); ctx.arc(-1.5, -1, 1, 0, Math.PI * 2);
            ctx.arc(1.5, -1, 1, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }

        Particle.prototype.draw = function () {
            if (this.kind) { drawCritter(this); return; }
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        for (var i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        var animationFrameId = null;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            for (var i = 0; i < particles.length; i++) {
                var p1 = particles[i];
                if (p1.kind) continue;
                if (mouse.active && mouse.x !== null && mouse.y !== null) {
                    var dx = p1.x - mouse.x;
                    var dy = p1.y - mouse.y;
                    var dMouse = Math.sqrt(dx * dx + dy * dy);
                    if (dMouse < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        var alpha = (150 - dMouse) / 150 * 0.15;
                        ctx.strokeStyle = 'rgba(0, 255, 0, ' + alpha + ')';
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }

                for (var j = i + 1; j < particles.length; j++) {
                    var p2 = particles[j];
                    if (p2.kind) continue;
                    var dx = p1.x - p2.x;
                    var dy = p1.y - p2.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        var alpha = (120 - dist) / 120 * 0.12;
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (!animationFrameId) {
                            animate();
                        }
                    } else {
                        if (animationFrameId) {
                            cancelAnimationFrame(animationFrameId);
                            animationFrameId = null;
                        }
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(hero);
        } else {
            animate();
        }
    }

    /* ── 8. Galería aleatoria de trabajos ─────────────────── */
    function initGaleriaAleatoria(isReload) {
        var grid = document.getElementById('galeria-grid');
        if (!grid) return;

        // Al recargar, fijar la altura actual: si el grid se vacía, la página se
        // acorta y el navegador deja el scroll más abajo (la vista "salta").
        if (isReload) {
            grid.style.minHeight = grid.offsetHeight + 'px';
        }

        // Selección curada, clasificada por tipo de trabajo (filtros de la galería)
        var GALERIA = {
            vehicular: { label: 'Rotulación vehicular', nums: [38, 39, 44, 45, 46, 47, 48, 74, 75, 76, 77, 112, 113, 114, 118, 119, 120, 126, 127, 134, 135, 136, 140, 142] },
            anuncios: { label: 'Anuncios, letras, neón y señalética', nums: [4, 5, 6, 8, 9, 11, 13, 14, 15, 17, 18, 19, 20, 32, 33, 34, 35, 36, 40, 41, 56, 58, 61, 62, 66, 68, 69, 72, 78, 79, 81, 82, 86, 87, 91, 95, 96, 97, 98, 99, 100, 102, 104, 108, 109, 110, 111, 128, 129, 131, 133, 137, 138, 143] },
            impresion: { label: 'Lonas, viniles y eventos', nums: [1, 2, 3, 7, 10, 12, 16, 21, 22, 23, 24, 25, 26, 28, 29, 30, 37, 49, 53, 54, 55, 57, 64, 65, 67, 70, 71, 73, 83, 84, 85, 88, 89, 90, 101, 105, 106, 107, 141, 145, 146, 147, 148, 149, 150] },
            fachadas: { label: 'Fachadas, toldos y pintura', nums: [27, 59, 60, 63, 80, 92, 93, 94, 103, 115, 116, 130, 132, 139, 144] }
        };

        var activo = document.querySelector('.galeria-filtro[aria-pressed="true"]');
        var cat = activo ? activo.getAttribute('data-cat') : 'todos';
        var pool = [];
        Object.keys(GALERIA).forEach(function (key) {
            if (cat !== 'todos' && cat !== key) return;
            GALERIA[key].nums.forEach(function (n) { pool.push({ n: n, cat: key }); });
        });

        // Fisher-Yates shuffle
        for (var i = pool.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
        }

        // Pick 12 for display, uniform size
        var selected = pool.slice(0, 12);
        grid.textContent = '';
        selected.forEach(function (it) {
            var label = GALERIA[it.cat].label;
            // <button>: se puede enfocar con Tab y abrir con Enter o Espacio.
            var item = document.createElement('button');
            item.type = 'button';
            item.className = 'galeria-item reveal';
            var img = document.createElement('img');
            img.src = 'assets/galeria/thumbs/galeria-' + ('00' + it.n).slice(-3) + '.webp';
            img.alt = 'Ampliar foto: ' + label + ', trabajo de Rotulate Publicidad';
            img.loading = 'lazy';
            var caption = document.createElement('span');
            caption.className = 'galeria-label';
            caption.setAttribute('aria-hidden', 'true');
            caption.textContent = label;
            item.appendChild(img);
            item.appendChild(caption);
            grid.appendChild(item);
        });

        if (isReload) {
            // Mostrar de inmediato (sin animación de entrada) y liberar la altura
            // fija cuando las miniaturas ya tienen su tamaño real.
            var pending = grid.querySelectorAll('img');
            var release = function () { grid.style.minHeight = ''; };
            var left = pending.length;
            pending.forEach(function (im) {
                var done = function () { if (--left === 0) release(); };
                if (im.complete) { done(); }
                else { im.addEventListener('load', done); im.addEventListener('error', done); }
            });
            setTimeout(release, 3000);
            grid.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

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
        var grid = document.getElementById('galeria-grid');
        if (!grid) return;

        // Build overlay
        var lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.setAttribute('aria-label', 'Foto ampliada');
        lb.innerHTML =
            '<button class="lb-close" aria-label="Cerrar">&times;</button>' +
            '<button class="lb-prev" aria-label="Anterior">&#8249;</button>' +
            '<button class="lb-next" aria-label="Siguiente">&#8250;</button>' +
            '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""><p class="lb-caption"></p></div>';
        document.body.appendChild(lb);

        var lbImg     = lb.querySelector('.lb-img');
        var lbCaption = lb.querySelector('.lb-caption');
        var current   = 0;
        var opener    = null;

        function open(index) {
            var items = Array.from(grid.querySelectorAll('.galeria-item'));
            if (index < 0 || index >= items.length) return;
            current = index;
            var item  = items[index];
            var gridImgSrc = item.querySelector('source') ? item.querySelector('source').srcset : item.querySelector('img').src;
            var src   = gridImgSrc.replace('/thumbs/', '/');
            var alt   = item.querySelector('img').alt;
            var label = item.querySelector('.galeria-label');
            lbImg.src = src;
            lbImg.alt = alt;
            lbCaption.textContent = label ? label.textContent : '';
            if (!lb.classList.contains('active')) {
                // Al abrir: recordar quién abrió y llevar el foco al botón de cerrar.
                opener = document.activeElement;
                lb.classList.add('active');
                lb.querySelector('.lb-close').focus();
            }
            document.body.style.overflow = 'hidden';
        }

        function close() {
            lb.classList.remove('active');
            document.body.style.overflow = '';
            lbImg.src = '';
            if (opener && document.contains(opener)) opener.focus();
            opener = null;
        }

        function prev() {
            var items = Array.from(grid.querySelectorAll('.galeria-item'));
            if (!items.length) return;
            open((current - 1 + items.length) % items.length);
        }
        function next() {
            var items = Array.from(grid.querySelectorAll('.galeria-item'));
            if (!items.length) return;
            open((current + 1) % items.length);
        }

        // Delegación de eventos en el grid
        grid.addEventListener('click', function (e) {
            var item = e.target.closest('.galeria-item');
            if (item && grid.contains(item)) {
                var items = Array.from(grid.querySelectorAll('.galeria-item'));
                var idx = items.indexOf(item);
                if (idx !== -1) {
                    open(idx);
                }
            }
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
            if (e.key === 'Tab') {
                // El foco no sale del visor mientras está abierto.
                var btns = Array.from(lb.querySelectorAll('button'));
                var idx = btns.indexOf(document.activeElement);
                e.preventDefault();
                btns[(idx + (e.shiftKey ? btns.length - 1 : 1) + btns.length) % btns.length].focus();
            }
        });

        // Touch swipe
        var startX = 0;
        lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
        });
    })();

    /* ── 9b. Chuby Rocket: parpadeo + ojos de la calaverita ── */
    (function () {
        var img = document.querySelector('.chuby-muertos');
        if (!img) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var closed = false;
        var lit = false;

        function render() {
            img.classList.toggle('is-blinking', closed);
            img.classList.toggle('is-lit', lit);
        }

        function blink() {
            closed = true; render();
            setTimeout(function () {
                closed = false; render();
                // 30 % de las veces, doble parpadeo
                if (Math.random() < 0.3) {
                    setTimeout(function () {
                        closed = true; render();
                        setTimeout(function () { closed = false; render(); }, 130);
                    }, 180);
                }
            }, 140);
            setTimeout(blink, 2500 + Math.random() * 3000);
        }

        function skull() {
            lit = !lit; render();
            // Luz suave e independiente del parpadeo, sin destellos rápidos.
            var wait = lit ? 1100 + Math.random() * 900 : 600 + Math.random() * 700;
            setTimeout(skull, wait);
        }

        setTimeout(blink, 2000);
        setTimeout(skull, 800);
    })();

    /* ── 10. Astronaut Mouse Flee Behavior (Desktop Only) ───── */
    (function () {
        var astronaut = document.querySelector('.astronaut-mascot');
        if (!astronaut) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        window.addEventListener('mousemove', function (e) {
            if (window.innerWidth < 969) {
                astronaut.style.transform = '';
                return;
            }

            var rect = astronaut.getBoundingClientRect();
            var astroX = rect.left + rect.width / 2;
            var astroY = rect.top + rect.height / 2;

            var deltaX = e.clientX - astroX;
            var deltaY = e.clientY - astroY;
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Active radius of 200px around the astronaut
            var radius = 200;

            if (distance < radius) {
                var strength = (radius - distance) / radius; // 0 to 1
                var fleeDist = strength * 50; // Max 50px flee

                var angle = Math.atan2(deltaY, deltaX);
                // Move in the opposite direction (-cos, -sin)
                var fleeX = -Math.cos(angle) * fleeDist;
                var fleeY = -Math.sin(angle) * fleeDist;

                // Add a small rotation for dynamic look
                var rotZ = -fleeX * 0.15; // up to ~7.5 degrees

                astronaut.style.transform = 'translate(' + fleeX + 'px, ' + fleeY + 'px) rotate(' + rotZ + 'deg) scale(1.05)';
            } else {
                astronaut.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
            }
        });
    })();

})();

