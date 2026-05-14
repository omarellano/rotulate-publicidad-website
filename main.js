/* ============================================================
   Rotulate Publicidad — Main UI Logic
   Rediseño Premium 2026
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
    const scrollIndicator = document.querySelector('.scroll-indicator');

    /* ── 1. Scroll Effects ────────────────────────────────── */
    function onScroll() {
        const scrollY = window.scrollY;

        // Header compact style
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide scroll indicator on scroll
        if (scrollIndicator) {
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.6';
                scrollIndicator.style.pointerEvents = 'auto';
            }
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

    /* ── 3. Mobile hamburger menu ─────────────────────────── */
    function initMobileMenu() {
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

        // Close on nav link click
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
        
        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    /* ── 4. Scroll Reveal ────────────────────────────────── */
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        
                        // Handle stats counter if it has the data-target attribute
                        if (entry.target.hasAttribute('data-target')) {
                            animateCounter(entry.target);
                        }
                        
                        // If the element contains stats, reveal children too
                        const stats = entry.target.querySelectorAll('[data-target]');
                        stats.forEach(animateCounter);
                        
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(function (el) {
                revealObserver.observe(el);
            });
        }
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = Math.ceil(count) + (el.innerText.includes('+') ? '+' : (el.innerText.includes('%') ? '%' : ''));
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target + (el.innerText.includes('+') ? '+' : (el.innerText.includes('%') ? '%' : ''));
            }
        };
        updateCount();
    }

    /* ── 5. Hero Carousel ────────────────────────────────── */
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        if (slides.length <= 1) return;

        let currentSlide = 0;
        const slideInterval = 5000;

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

            currentId = ((index % slides.length) + slides.length) % slides.length;
            currentSlide = currentId;

            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        setInterval(nextSlide, slideInterval);

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => goToSlide(idx));
        });
    }

    /* ── Init ────────────────────────────────────────────── */
    onScroll();
    initMobileMenu();
    initScrollReveal();
    initCarousel();

    // Smooth scroll fallback
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

})();
