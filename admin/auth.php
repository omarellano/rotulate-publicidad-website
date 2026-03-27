<?php
require_once __DIR__ . '/config.php';

// Solo acepta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /admin/index.php');
    exit;
}

$action = $_POST['action'] ?? '';

if ($action === 'login') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        header('Location: /admin/index.php?error=csrf');
        exit;
    }

    if (!checkRateLimit()) {
        header('Location: /admin/index.php?error=locked');
        exit;
    }

    $password = $_POST['password'] ?? '';

    if (password_verify($password, ADMIN_PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['admin_auth'] = true;
        resetRateLimit();
        header('Location: /admin/dashboard.php');
    } else {
        recordFailedAttempt();
        header('Location: /admin/index.php?error=invalid');
    }
    exit;
}

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    header('Location: /admin/index.php');
    exit;
}

header('Location: /admin/index.php');
exit;
