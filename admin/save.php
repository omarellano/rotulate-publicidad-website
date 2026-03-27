<?php
require_once __DIR__ . '/config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /admin/dashboard.php');
    exit;
}

if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    die('Error de seguridad. Vuelve atrás e intenta de nuevo.');
}

// ── Recoger y validar campos ──────────────────────────────

$title       = trim($_POST['title']       ?? '');
$slug        = trim($_POST['slug']        ?? '');
$category    = trim($_POST['category']    ?? '');
$excerpt     = trim($_POST['excerpt']     ?? '');
$description = trim($_POST['description'] ?? '');
$imageAlt    = trim($_POST['imageAlt']    ?? '');
$content     = trim($_POST['content']     ?? '');
$status      = in_array($_POST['status'] ?? '', ['published','draft']) ? $_POST['status'] : 'published';
$date        = trim($_POST['date'] ?? date('Y-m-d'));
$editId      = trim($_POST['id']          ?? '');

$errors = [];
if (!$title)       $errors[] = 'El título es obligatorio.';
if (!$category)    $errors[] = 'La categoría es obligatoria.';
if (!$excerpt)     $errors[] = 'El extracto es obligatorio.';
if (!$description) $errors[] = 'La meta descripción es obligatoria.';
if (!$content || $content === '<p><br></p>') $errors[] = 'El contenido no puede estar vacío.';

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    $date = date('Y-m-d');
}

// Auto-generar slug si está vacío
if (!$slug) {
    $slug = generateSlug($title);
}
// Sanitizar slug
$slug = preg_replace('/[^a-z0-9\-]/', '', strtolower($slug));
if (!$slug) $errors[] = 'El slug no puede estar vacío.';

if ($errors) {
    $msg = implode(' ', $errors);
    die('Errores: ' . htmlspecialchars($msg) . ' <a href="javascript:history.back()">Volver</a>');
}

// ── Sanitizar ──────────────────────────────────────────────

$title       = sanitizeText($title);
$category    = sanitizeText($category);
$excerpt     = sanitizeText($excerpt);
$description = sanitizeText($description);
$imageAlt    = sanitizeText($imageAlt);
$content     = sanitizeContent($content);

// ── Imagen destacada ───────────────────────────────────────

$posts      = readPosts();
$imagePath  = '';

// Si estamos editando, mantener imagen actual
if ($editId) {
    foreach ($posts as $p) {
        if ($p['id'] === $editId) {
            $imagePath = $p['image'] ?? '';
            break;
        }
    }
}

if (!empty($_FILES['image']['name'])) {
    $file = $_FILES['image'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        die('Error al subir la imagen. <a href="javascript:history.back()">Volver</a>');
    }

    if ($file['size'] > MAX_IMAGE_SIZE) {
        die('La imagen supera el tamaño máximo de 5MB. <a href="javascript:history.back()">Volver</a>');
    }

    // Verificar MIME real
    $finfo    = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($mimeType, $allowedMimes)) {
        die('Tipo de archivo no permitido. Solo JPG, PNG o WebP. <a href="javascript:history.back()">Volver</a>');
    }

    // Verificar que es imagen real
    if (!@getimagesize($file['tmp_name'])) {
        die('El archivo no es una imagen válida. <a href="javascript:history.back()">Volver</a>');
    }

    $ext      = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'][$mimeType];
    $filename = $slug . '.' . $ext;
    $dest     = UPLOADS_DIR . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        die('No se pudo guardar la imagen. Verifica los permisos del directorio. <a href="javascript:history.back()">Volver</a>');
    }

    $imagePath = 'assets/blog/' . $filename;
}

// ── Verificar slug único (excepto en edición del mismo post) ─

foreach ($posts as $p) {
    if ($p['slug'] === $slug && $p['id'] !== $editId) {
        // Agregar sufijo
        $slug .= '-' . substr(bin2hex(random_bytes(2)), 0, 4);
        break;
    }
}

// ── Crear o actualizar ──────────────────────────────────────

$now = date('c'); // ISO 8601

if ($editId) {
    // Actualizar existente
    foreach ($posts as &$p) {
        if ($p['id'] === $editId) {
            $p['title']       = $title;
            $p['slug']        = $slug;
            $p['category']    = $category;
            $p['excerpt']     = $excerpt;
            $p['description'] = $description;
            $p['imageAlt']    = $imageAlt;
            $p['content']     = $content;
            $p['status']      = $status;
            $p['date']        = $date;
            $p['updatedAt']   = $now;
            if ($imagePath) $p['image'] = $imagePath;
            break;
        }
    }
    unset($p);
} else {
    // Nuevo post — prepend al inicio
    $newPost = [
        'id'          => bin2hex(random_bytes(4)),
        'slug'        => $slug,
        'title'       => $title,
        'description' => $description,
        'date'        => $date,
        'category'    => $category,
        'excerpt'     => $excerpt,
        'image'       => $imagePath,
        'imageAlt'    => $imageAlt,
        'content'     => $content,
        'status'      => $status,
        'createdAt'   => $now,
        'updatedAt'   => $now,
    ];
    array_unshift($posts, $newPost);
}

if (!writePosts($posts)) {
    die('Error al guardar los datos. Verifica los permisos del archivo. <a href="javascript:history.back()">Volver</a>');
}

header('Location: /admin/dashboard.php?saved=1');
exit;
