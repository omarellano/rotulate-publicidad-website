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
    /* ── Constellation Canvas Animation ──────────────────── */
    function initHeroParticles() {
        var canvas = document.getElementById('hero-particles');
        var hero = document.querySelector('.hero');
        if (!canvas || !hero) return;

        // Skip setup on mobile/tablet to conserve resources
        if (window.innerWidth < 969) return;

        var ctx = canvas.getContext('2d');
        var particles = [];
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
            this.color = Math.random() > 0.4 ? 'rgba(200, 241, 53, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        }

        Particle.prototype.update = function () {
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

        Particle.prototype.draw = function () {
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
                if (mouse.active && mouse.x !== null && mouse.y !== null) {
                    var dx = p1.x - mouse.x;
                    var dy = p1.y - mouse.y;
                    var dMouse = Math.sqrt(dx * dx + dy * dy);
                    if (dMouse < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        var alpha = (150 - dMouse) / 150 * 0.15;
                        ctx.strokeStyle = 'rgba(200, 241, 53, ' + alpha + ')';
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }

                for (var j = i + 1; j < particles.length; j++) {
                    var p2 = particles[j];
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
    function initGaleriaAleatoria() {
        var grid = document.getElementById('galeria-grid');
        if (!grid) return;

        // Selección curada: fotos instaladas o en proceso con buena composición
        var allImgs = [
            'galeria-001.webp','galeria-002.webp','galeria-003.webp','galeria-004.webp',
            'galeria-005.webp','galeria-007.webp','galeria-009.webp','galeria-010.webp',
            'galeria-011.webp','galeria-012.webp','galeria-013.webp','galeria-014.webp',
            'galeria-015.webp','galeria-016.webp','galeria-017.webp','galeria-018.webp',
            'galeria-019.webp','galeria-020.webp','galeria-021.webp','galeria-022.webp',
            'galeria-023.webp','galeria-024.webp','galeria-025.webp','galeria-026.webp',
            'galeria-027.webp','galeria-028.webp','galeria-029.webp','galeria-030.webp',
            'galeria-032.webp','galeria-033.webp','galeria-034.webp',
            'galeria-035.webp','galeria-036.webp','galeria-037.webp','galeria-038.webp',
            'galeria-039.webp','galeria-040.webp','galeria-041.webp',
            'galeria-044.webp','galeria-045.webp','galeria-046.webp',
            'galeria-047.webp','galeria-048.webp','galeria-049.webp',
            'galeria-053.webp','galeria-054.webp',
            'galeria-055.webp','galeria-056.webp','galeria-057.webp','galeria-058.webp',
            'galeria-059.webp','galeria-060.webp','galeria-061.webp','galeria-062.webp',
            'galeria-063.webp','galeria-064.webp','galeria-065.webp','galeria-066.webp',
            'galeria-067.webp','galeria-068.webp','galeria-069.webp','galeria-070.webp',
            'galeria-071.webp','galeria-072.webp','galeria-073.webp','galeria-074.webp',
            'galeria-075.webp','galeria-076.webp','galeria-077.webp','galeria-078.webp',
            'galeria-079.webp','galeria-080.webp','galeria-081.webp','galeria-082.webp',
            'galeria-083.webp','galeria-084.webp','galeria-085.webp','galeria-086.webp',
            'galeria-087.webp','galeria-088.webp','galeria-089.webp','galeria-090.webp',
            'galeria-091.webp','galeria-092.webp','galeria-093.webp','galeria-094.webp',
            'galeria-095.webp','galeria-096.webp','galeria-097.webp','galeria-098.webp',
            'galeria-099.webp','galeria-100.webp','galeria-101.webp','galeria-102.webp',
            'galeria-103.webp'
        ];

        // Fisher-Yates shuffle
        for (var i = allImgs.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = allImgs[i]; allImgs[i] = allImgs[j]; allImgs[j] = tmp;
        }

        // Pick 12 for display, uniform size
        var selected = allImgs.slice(0, 12);
        grid.textContent = '';
        selected.forEach(function (f) {
            var div = document.createElement('div');
            div.className = 'galeria-item reveal';
            var img = document.createElement('img');
            img.src = 'assets/galeria/' + f;
            img.alt = 'Trabajo Rotulate Publicidad Cancún';
            img.loading = 'lazy';
            div.appendChild(img);
            grid.appendChild(div);
        });

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

    /* ── 10. Astronaut Mouse Flee Behavior (Desktop Only) ───── */
    (function () {
        var astronaut = document.querySelector('.astronaut-mascot');
        if (!astronaut) return;

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

