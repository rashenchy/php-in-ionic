<?php
// dbconfig.php - update these values if needed
define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ionic_auth_db');

// Allow CORS from dev server (adjust origin as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // No body for OPTIONS
    http_response_code(200);
    exit;
}

// Ensure we return JSON
header('Content-Type: application/json');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to connect to database: ' . $mysqli->connect_error]);
    exit;
}
?>
