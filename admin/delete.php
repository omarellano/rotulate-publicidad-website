<?php
require_once __DIR__ . '/config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /admin/dashboard.php');
    exit;
}

if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    die('Error de seguridad.');
}

$id = trim($_POST['id'] ?? '');
if (!$id) {
    header('Location: /admin/dashboard.php');
    exit;
}

$posts   = readPosts();
$updated = [];

foreach ($posts as $post) {
    if ($post['id'] === $id) {
        continue; // Saltar el post eliminado
    }
    $updated[] = $post;
}

writePosts($updated);

header('Location: /admin/dashboard.php?deleted=1');
exit;
