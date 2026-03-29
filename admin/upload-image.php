<?php
require_once __DIR__ . '/config.php';
requireAuth();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    echo json_encode(['error' => 'Error de seguridad']);
    exit;
}

if (empty($_FILES['image'])) {
    echo json_encode(['error' => 'No se recibió imagen']);
    exit;
}

$file = $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['error' => 'Error en la subida de archivo']);
    exit;
}

// Máximo 2MB para imágenes inline
if ($file['size'] > 2 * 1024 * 1024) {
    echo json_encode(['error' => 'La imagen no puede superar 2MB']);
    exit;
}

$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
if (!in_array($mimeType, $allowedMimes)) {
    echo json_encode(['error' => 'Tipo de archivo no permitido']);
    exit;
}

if (!@getimagesize($file['tmp_name'])) {
    echo json_encode(['error' => 'El archivo no es una imagen válida']);
    exit;
}

$ext      = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'][$mimeType];
$filename = 'inline-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$dest     = UPLOADS_DIR . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    echo json_encode(['error' => 'No se pudo guardar la imagen']);
    exit;
}

echo json_encode(['url' => '/assets/blog/' . $filename]);
