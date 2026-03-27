<?php
/**
 * Rotulate Publicidad — Admin Config
 *
 * IMPORTANTE: Cambiar la contraseña antes de subir al servidor.
 * Para generar un nuevo hash en terminal:
 *   php -r "echo password_hash('tu_contraseña_aqui', PASSWORD_BCRYPT);"
 */

// Contraseña del panel admin (hash bcrypt)
// Hash de ejemplo para: Rotulate2026! — CAMBIAR ANTES DE USAR EN PRODUCCIÓN
define('ADMIN_PASSWORD_HASH', '$2y$12$placeholder.hash.change.before.deploying.to.server');

// URL del sitio
define('SITE_URL', 'https://rotulatepublicidad.com');

// Rutas de archivos (relativas a este archivo)
define('DATA_DIR',    __DIR__ . '/../data');
define('UPLOADS_DIR', __DIR__ . '/../assets/blog');
define('POSTS_FILE',  DATA_DIR . '/posts.json');

// Tamaño máximo de imagen (bytes)
define('MAX_IMAGE_SIZE', 5 * 1024 * 1024); // 5 MB

// Iniciar sesión con cookies seguras
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.gc_maxlifetime', '7200'); // 2 horas

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/* ── Auth helpers ──────────────────────────────────────── */

function isLoggedIn(): bool {
    return isset($_SESSION['admin_auth']) && $_SESSION['admin_auth'] === true;
}

function requireAuth(): void {
    if (!isLoggedIn()) {
        header('Location: /admin/index.php');
        exit;
    }
}

function generateCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/* ── Rate limiting (login) ─────────────────────────────── */

function checkRateLimit(): bool {
    $maxAttempts = 5;
    $windowSeconds = 900; // 15 min

    if (!isset($_SESSION['login_attempts'])) {
        $_SESSION['login_attempts'] = 0;
        $_SESSION['login_first_attempt'] = time();
    }

    $elapsed = time() - $_SESSION['login_first_attempt'];
    if ($elapsed > $windowSeconds) {
        // Resetear ventana
        $_SESSION['login_attempts'] = 0;
        $_SESSION['login_first_attempt'] = time();
    }

    return $_SESSION['login_attempts'] < $maxAttempts;
}

function recordFailedAttempt(): void {
    $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
}

function resetRateLimit(): void {
    $_SESSION['login_attempts'] = 0;
    $_SESSION['login_first_attempt'] = time();
}

/* ── Posts helpers ─────────────────────────────────────── */

function readPosts(): array {
    if (!file_exists(POSTS_FILE)) {
        return [];
    }
    $json = file_get_contents(POSTS_FILE);
    $data = json_decode($json, true);
    return is_array($data) ? $data : [];
}

function writePosts(array $posts): bool {
    $json = json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) return false;
    // Backup antes de escribir
    if (file_exists(POSTS_FILE)) {
        copy(POSTS_FILE, POSTS_FILE . '.backup');
    }
    return file_put_contents(POSTS_FILE, $json, LOCK_EX) !== false;
}

function generateSlug(string $title): string {
    $slug = mb_strtolower($title, 'UTF-8');
    // Reemplazar acentos y caracteres especiales
    $from = ['á','é','í','ó','ú','ü','ñ','Á','É','Í','Ó','Ú','Ü','Ñ','¿','?','¡','!',',','.'];
    $to   = ['a','e','i','o','u','u','n','a','e','i','o','u','u','n','', '', '', '', '', ''];
    $slug = str_replace($from, $to, $slug);
    // Solo letras, números y guiones
    $slug = preg_replace('/[^a-z0-9\s\-]/', '', $slug);
    $slug = preg_replace('/[\s\-]+/', '-', trim($slug));
    return substr($slug, 0, 100);
}

function sanitizeText(string $value): string {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function sanitizeContent(string $html): string {
    // Permitir solo tags seguros
    $allowed = '<h2><h3><p><ul><ol><li><a><strong><em><blockquote><img><br><u><s>';
    $html = strip_tags($html, $allowed);
    // Eliminar atributos peligrosos en <a> y <img>
    $html = preg_replace('/(<a\s[^>]*?)href\s*=\s*["\'](?!https?:\/\/|\/)[^"\']*["\']([^>]*>)/i', '$1$2', $html);
    $html = preg_replace('/\bon\w+\s*=/i', 'data-removed=', $html);
    return $html;
}

function formatDateES(string $isoDate): string {
    $months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    [$year, $month, $day] = explode('-', substr($isoDate, 0, 10));
    return (int)$day . ' ' . $months[(int)$month - 1] . ' ' . $year;
}
