<?php
require_once 'dbconfig.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid payload']);
    exit;
}

$username = $mysqli->real_escape_string($data['username']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt = $mysqli->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $mysqli->error]);
    exit;
}
$stmt->bind_param('ss', $username, $password);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User registered']);
} else {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $stmt->error]);
}
$stmt->close();
$mysqli->close();
?>
