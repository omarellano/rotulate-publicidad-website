<?php
require_once __DIR__ . '/config.php';
requireAuth();

$posts = readPosts();
$csrf  = generateCsrfToken();
$post  = null;
$isNew = true;

// Modo edición
if (!empty($_GET['id'])) {
    $editId = $_GET['id'];
    foreach ($posts as $p) {
        if ($p['id'] === $editId) {
            $post  = $p;
            $isNew = false;
            break;
        }
    }
    if (!$post) {
        header('Location: /admin/dashboard.php');
        exit;
    }
}

// Categorías existentes para autocompletar
$categories = array_unique(array_column($posts, 'category'));
sort($categories);

$title      = $post['title']       ?? '';
$slug       = $post['slug']        ?? '';
$category   = $post['category']    ?? '';
$excerpt    = $post['excerpt']     ?? '';
$description= $post['description'] ?? '';
$imageAlt   = $post['imageAlt']    ?? '';
$content    = $post['content']     ?? '';
$status     = $post['status']      ?? 'published';
$date       = $post['date']        ?? date('Y-m-d');
$currentImg = $post['image']       ?? '';
?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $isNew ? 'Nuevo artículo' : 'Editar artículo' ?> — Admin Rotulate</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <!-- Quill.js estilos -->
    <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
    <link rel="stylesheet" href="/admin/admin.css">
</head>
<body>
    <header class="admin-header">
        <a href="/admin/dashboard.php" class="admin-logo">
            <img src="/assets/logo-rotulate.png" alt="Rotulate Publicidad" height="36">
        </a>
        <nav class="admin-nav">
            <a href="/admin/dashboard.php">← Volver al dashboard</a>
        </nav>
    </header>

    <main class="admin-main">
        <h1><?= $isNew ? 'Nuevo artículo' : 'Editar artículo' ?></h1>

        <form id="post-form" method="POST" action="/admin/save.php" enctype="multipart/form-data">
            <input type="hidden" name="csrf_token" value="<?= $csrf ?>">
            <?php if (!$isNew): ?>
                <input type="hidden" name="id" value="<?= htmlspecialchars($post['id']) ?>">
            <?php endif; ?>
            <!-- El contenido del editor Quill se inyecta aquí antes del submit -->
            <input type="hidden" name="content" id="content-input">

            <div class="editor-layout">
                <!-- Columna principal -->
                <div class="editor-main">
                    <div class="form-group">
                        <label for="title">Título *</label>
                        <input type="text" id="title" name="title"
                               value="<?= htmlspecialchars($title) ?>"
                               placeholder="Título del artículo" required>
                    </div>

                    <div class="form-group">
                        <label>Contenido *</label>
                        <div id="quill-editor"></div>
                    </div>

                    <div class="form-group">
                        <label for="excerpt">Extracto (se muestra en la lista del blog) *</label>
                        <textarea id="excerpt" name="excerpt" rows="2"
                                  placeholder="Breve descripción del artículo..." required><?= htmlspecialchars($excerpt) ?></textarea>
                    </div>

                    <div class="form-group">
                        <label for="description">Meta descripción (para Google, 150-160 caracteres) *</label>
                        <textarea id="description" name="description" rows="2"
                                  maxlength="160"
                                  placeholder="Descripción para motores de búsqueda..."><?= htmlspecialchars($description) ?></textarea>
                        <small class="field-hint"><span id="desc-count">0</span>/160 caracteres</small>
                    </div>
                </div>

                <!-- Columna lateral -->
                <aside class="editor-sidebar">
                    <div class="sidebar-card">
                        <h3>Categoría</h3>
                        <div class="form-group">
                            <input type="text" id="category" name="category"
                                   value="<?= htmlspecialchars($category) ?>"
                                   list="categories-list"
                                   placeholder="Ej: Rotulación, PPF, Proyectos" required>
                            <datalist id="categories-list">
                                <?php foreach ($categories as $cat): ?>
                                    <option value="<?= htmlspecialchars($cat) ?>">
                                <?php endforeach; ?>
                            </datalist>
                        </div>
                    </div>

                    <div class="sidebar-card">
                        <h3>Imagen destacada</h3>
                        <?php if ($currentImg): ?>
                            <div class="img-preview-wrap">
                                <img src="/<?= htmlspecialchars($currentImg) ?>" alt="Imagen actual"
                                     class="img-preview" id="img-preview">
                            </div>
                        <?php else: ?>
                            <div class="img-preview-wrap" id="img-preview-wrap" style="display:none">
                                <img src="" alt="Vista previa" class="img-preview" id="img-preview">
                            </div>
                        <?php endif; ?>
                        <div class="form-group">
                            <label for="image" class="file-label">
                                <?= $currentImg ? 'Cambiar imagen' : 'Seleccionar imagen' ?>
                                <input type="file" id="image" name="image"
                                       accept="image/jpeg,image/png,image/webp"
                                       class="file-input">
                            </label>
                            <small class="field-hint">JPG, PNG o WebP. Máx 5MB. Recomendado 1200×630px.</small>
                        </div>
                        <div class="form-group">
                            <label for="imageAlt">Descripción de la imagen (alt)</label>
                            <input type="text" id="imageAlt" name="imageAlt"
                                   value="<?= htmlspecialchars($imageAlt) ?>"
                                   placeholder="Describe brevemente la imagen">
                        </div>
                    </div>

                    <div class="sidebar-card">
                        <h3>Slug (URL)</h3>
                        <div class="form-group">
                            <input type="text" id="slug" name="slug"
                                   value="<?= htmlspecialchars($slug) ?>"
                                   placeholder="mi-articulo"
                                   pattern="[a-z0-9\-]+"
                                   title="Solo letras minúsculas, números y guiones">
                            <small class="field-hint">rotulatepublicidad.com/blog/<strong id="slug-preview"><?= htmlspecialchars($slug ?: 'mi-articulo') ?></strong></small>
                        </div>
                    </div>

                    <div class="sidebar-card">
                        <h3>Publicación</h3>
                        <div class="form-group">
                            <label for="status">Estado</label>
                            <select id="status" name="status">
                                <option value="published" <?= $status === 'published' ? 'selected' : '' ?>>Publicado</option>
                                <option value="draft"     <?= $status === 'draft'     ? 'selected' : '' ?>>Borrador</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="date">Fecha</label>
                            <input type="date" id="date" name="date"
                                   value="<?= htmlspecialchars($date) ?>">
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">
                            <?= $isNew ? 'Publicar artículo' : 'Guardar cambios' ?>
                        </button>
                    </div>
                </aside>
            </div>
        </form>
    </main>

    <!-- Quill.js -->
    <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    <script>
    (function () {
        // ── Quill editor ───────────────────────────────────────
        var quill = new Quill('#quill-editor', {
            theme: 'snow',
            placeholder: 'Escribe aquí el contenido del artículo...',
            modules: {
                toolbar: [
                    [{ header: 2 }, { header: 3 }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'bullet' }, { list: 'ordered' }],
                    ['blockquote', 'link'],
                    ['image'],
                    ['clean']
                ]
            }
        });

        // Load existing content when editing a post
        var existingContent = <?= json_encode($content) ?>;
        if (existingContent) {
            quill.clipboard.dangerouslyPasteHTML(existingContent);
        }

        // Subir imagen inline a través de upload-image.php
        quill.getModule('toolbar').addHandler('image', function () {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg,image/png,image/webp';
            input.click();
            input.onchange = function () {
                var file = input.files[0];
                if (!file) return;
                var fd = new FormData();
                fd.append('image', file);
                fd.append('csrf_token', '<?= $csrf ?>');
                fetch('/admin/upload-image.php', { method: 'POST', body: fd })
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        if (data.url) {
                            var range = quill.getSelection(true);
                            quill.insertEmbed(range.index, 'image', data.url);
                        } else {
                            alert('Error al subir imagen: ' + (data.error || 'desconocido'));
                        }
                    })
                    .catch(function () { alert('Error de red al subir imagen.'); });
            };
        });

        // ── Auto-slug desde título ──────────────────────────────
        var titleInput   = document.getElementById('title');
        var slugInput    = document.getElementById('slug');
        var slugPreview  = document.getElementById('slug-preview');
        var slugEdited   = slugInput.value.length > 0;

        function makeSlug(str) {
            var from = 'áéíóúüñÁÉÍÓÚÜÑ¿¡,.';
            var to   = 'aeiouunAEIOUUN    ';
            var slug = str.toLowerCase();
            for (var i = 0; i < from.length; i++) {
                slug = slug.split(from[i]).join(to[i] || '');
            }
            return slug.replace(/[^a-z0-9\s-]/g, '')
                       .replace(/[\s-]+/g, '-')
                       .replace(/^-+|-+$/g, '')
                       .substring(0, 100);
        }

        titleInput.addEventListener('input', function () {
            if (!slugEdited) {
                var s = makeSlug(this.value);
                slugInput.value = s;
                slugPreview.textContent = s || 'mi-articulo';
            }
        });

        slugInput.addEventListener('input', function () {
            slugEdited = this.value.length > 0;
            slugPreview.textContent = this.value || 'mi-articulo';
        });

        // ── Contador de meta descripción ───────────────────────
        var descField = document.getElementById('description');
        var descCount = document.getElementById('desc-count');
        function updateCount() { descCount.textContent = descField.value.length; }
        descField.addEventListener('input', updateCount);
        updateCount();

        // ── Preview de imagen destacada ────────────────────────
        var imageInput   = document.getElementById('image');
        var imgPreview   = document.getElementById('img-preview');
        var imgPreviewWrap = document.getElementById('img-preview-wrap');
        imageInput.addEventListener('change', function () {
            var file = this.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function (e) {
                imgPreview.src = e.target.result;
                if (imgPreviewWrap) imgPreviewWrap.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });

        // ── Inyectar contenido Quill antes del submit ──────────
        document.getElementById('post-form').addEventListener('submit', function () {
            document.getElementById('content-input').value = quill.root.innerHTML;
        });
    })();
    </script>
</body>
</html>
