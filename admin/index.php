<?php
require_once __DIR__ . '/config.php';

if (isLoggedIn()) {
    header('Location: /admin/dashboard.php');
    exit;
}

$error = $_GET['error'] ?? '';
$errorMsg = match($error) {
    'invalid' => 'Contraseña incorrecta.',
    'locked'  => 'Demasiados intentos fallidos. Espera 15 minutos.',
    'csrf'    => 'Error de seguridad. Intenta de nuevo.',
    default   => '',
};

$csrf = generateCsrfToken();
?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin — Rotulate Publicidad</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/admin/admin.css">
</head>
<body class="admin-login-page">
    <div class="login-card">
        <img src="/assets/logo-rotulate.png" alt="Rotulate Publicidad" class="login-logo">
        <h1>Panel de Blog</h1>
        <?php if ($errorMsg): ?>
            <div class="alert alert-error"><?= htmlspecialchars($errorMsg) ?></div>
        <?php endif; ?>
        <form method="POST" action="/admin/auth.php">
            <input type="hidden" name="action" value="login">
            <input type="hidden" name="csrf_token" value="<?= $csrf ?>">
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password"
                       placeholder="••••••••" required autofocus autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn-primary btn-full">Entrar →</button>
        </form>
    </div>
</body>
</html>
