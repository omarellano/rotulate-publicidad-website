/* ============================================================
   Rotulate Publicidad — Blog Listing Logic
   Renders cards from posts.js, category filters, scroll reveal
   ============================================================ */

(function () {
    'use strict';

    var grid = document.getElementById('blog-grid');
    var filtersContainer = document.getElementById('blog-filters');
    var noResults = document.getElementById('blog-no-results');

    if (!grid || typeof BLOG_POSTS === 'undefined') return;

    /* ── Helpers ──────────────────────────────────────────── */

    function formatDate(isoDate) {
        var months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        var parts = isoDate.split('-');
        var day = parseInt(parts[2], 10);
        var month = months[parseInt(parts[1], 10) - 1];
        var year = parts[0];
        return day + ' ' + month + ' ' + year;
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* ── Render Cards ────────────────────────────────────── */

    function renderCards(posts) {
        grid.innerHTML = '';

        posts.forEach(function (post) {
            var article = document.createElement('article');
            article.className = 'blog-card reveal';
            article.setAttribute('data-category', post.category);

            var link = '/blog/' + encodeURIComponent(post.slug);

            var imgWrap = document.createElement('a');
            imgWrap.href = link;
            imgWrap.className = 'blog-card-img-wrap';

            var img = document.createElement('img');
            img.src = post.image;
            img.alt = post.imageAlt || post.title;
            img.loading = 'lazy';
            img.width = 800;
            img.height = 420;
            imgWrap.appendChild(img);

            var catBadge = document.createElement('span');
            catBadge.className = 'blog-card-cat';
            catBadge.textContent = post.category;
            imgWrap.appendChild(catBadge);

            article.appendChild(imgWrap);

            var body = document.createElement('div');
            body.className = 'blog-card-body';

            var date = document.createElement('time');
            date.className = 'blog-card-date';
            date.setAttribute('datetime', post.date);
            date.textContent = formatDate(post.date);
            body.appendChild(date);

            var h2 = document.createElement('h2');
            h2.className = 'blog-card-title';
            var titleLink = document.createElement('a');
            titleLink.href = link;
            titleLink.textContent = post.title;
            h2.appendChild(titleLink);
            body.appendChild(h2);

            var excerpt = document.createElement('p');
            excerpt.className = 'blog-card-excerpt';
            excerpt.textContent = post.excerpt;
            body.appendChild(excerpt);

            var readMore = document.createElement('a');
            readMore.href = link;
            readMore.className = 'blog-card-link';
            readMore.textContent = 'Leer artículo →';
            body.appendChild(readMore);

            article.appendChild(body);
            grid.appendChild(article);
        });

        // Trigger scroll reveal on new cards
        observeReveals();
    }

    /* ── Category Filters ────────────────────────────────── */

    function buildFilters(posts) {
        if (!filtersContainer) return;

        var categories = [];
        posts.forEach(function (post) {
            if (categories.indexOf(post.category) === -1) {
                categories.push(post.category);
            }
        });

        // "Todos" button
        var allBtn = document.createElement('button');
        allBtn.className = 'blog-filter-btn active';
        allBtn.textContent = 'Todos';
        allBtn.setAttribute('data-filter', 'all');
        filtersContainer.appendChild(allBtn);

        categories.forEach(function (cat) {
            var btn = document.createElement('button');
            btn.className = 'blog-filter-btn';
            btn.textContent = cat;
            btn.setAttribute('data-filter', cat);
            filtersContainer.appendChild(btn);
        });

        filtersContainer.addEventListener('click', function (e) {
            var btn = e.target.closest('.blog-filter-btn');
            if (!btn) return;

            // Update active state
            filtersContainer.querySelectorAll('.blog-filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');
            filterCards(filter);
        });
    }

    function filterCards(category) {
        var cards = grid.querySelectorAll('.blog-card');
        var visibleCount = 0;

        cards.forEach(function (card) {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    }

    /* ── Scroll Reveal ───────────────────────────────────── */

    function observeReveals() {
        var elements = grid.querySelectorAll('.reveal:not(.revealed)');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            elements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            elements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    /* ── Init ────────────────────────────────────────────── */

    fetch('/data/posts.json')
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(function (posts) {
            var published = posts.filter(function (p) { return p.status === 'published'; });
            renderCards(published);
            buildFilters(published);
        })
        .catch(function (err) {
            console.error('Error cargando posts:', err);
            if (grid) {
                grid.innerHTML = '<p style="text-align:center;color:var(--color-gray);padding:4rem">No se pudieron cargar los artículos.</p>';
            }
        });

})();
