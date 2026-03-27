<?php
require_once __DIR__ . '/config.php';
requireAuth();

$posts   = readPosts();
$csrf    = generateCsrfToken();
$saved   = isset($_GET['saved']);
$deleted = isset($_GET['deleted']);
?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard — Admin Rotulate</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/admin/admin.css">
</head>
<body>
    <header class="admin-header">
        <a href="/admin/dashboard.php" class="admin-logo">
            <img src="/assets/logo-rotulate.png" alt="Rotulate Publicidad" height="36">
        </a>
        <nav class="admin-nav">
            <a href="/" target="_blank" rel="noopener">Ver sitio ↗</a>
            <form method="POST" action="/admin/auth.php" style="display:inline">
                <input type="hidden" name="action" value="logout">
                <input type="hidden" name="csrf_token" value="<?= $csrf ?>">
                <button type="submit" class="btn-link">Cerrar sesión</button>
            </form>
        </nav>
    </header>

    <main class="admin-main">
        <div class="admin-toolbar">
            <h1>Artículos del Blog</h1>
            <a href="/admin/editor.php" class="btn btn-primary">+ Nuevo artículo</a>
        </div>

        <?php if ($saved): ?>
            <div class="alert alert-success">✓ Artículo guardado correctamente.</div>
        <?php endif; ?>
        <?php if ($deleted): ?>
            <div class="alert alert-success">✓ Artículo eliminado.</div>
        <?php endif; ?>

        <?php if (empty($posts)): ?>
            <div class="empty-state">
                <p>No hay artículos todavía.</p>
                <a href="/admin/editor.php" class="btn btn-primary">Crear el primer artículo</a>
            </div>
        <?php else: ?>
            <div class="posts-table-wrap">
                <table class="posts-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($posts as $post): ?>
                        <tr>
                            <td class="post-title-cell">
                                <a href="<?= htmlspecialchars(SITE_URL . '/blog/' . $post['slug']) ?>"
                                   target="_blank" rel="noopener">
                                    <?= htmlspecialchars($post['title']) ?>
                                </a>
                            </td>
                            <td><?= htmlspecialchars($post['category']) ?></td>
                            <td><?= htmlspecialchars(formatDateES($post['date'])) ?></td>
                            <td>
                                <span class="badge badge-<?= $post['status'] === 'published' ? 'green' : 'gray' ?>">
                                    <?= $post['status'] === 'published' ? 'Publicado' : 'Borrador' ?>
                                </span>
                            </td>
                            <td class="actions-cell">
                                <a href="/admin/editor.php?id=<?= htmlspecialchars($post['id']) ?>"
                                   class="btn btn-sm">Editar</a>
                                <form method="POST" action="/admin/delete.php"
                                      onsubmit="return confirm('¿Eliminar «<?= htmlspecialchars($post['title'], ENT_QUOTES) ?>»? Esta acción no se puede deshacer.')">
                                    <input type="hidden" name="id" value="<?= htmlspecialchars($post['id']) ?>">
                                    <input type="hidden" name="csrf_token" value="<?= $csrf ?>">
                                    <button type="submit" class="btn btn-sm btn-danger">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </main>
</body>
</html>
