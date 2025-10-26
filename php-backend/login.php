<?php
require_once 'dbconfig.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid payload']);
    exit;
}

$username = $mysqli->real_escape_string($data['username']);
$password = $data['password'];

$stmt = $mysqli->prepare('SELECT id, password_hash FROM users WHERE username = ?');
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $mysqli->error]);
    exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($id, $password_hash);
if ($stmt->fetch()) {
    if (password_verify($password, $password_hash)) {
        echo json_encode(['success' => true, 'message' => 'Login successful', 'userId' => $id]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'User not found']);
}
$stmt->close();
$mysqli->close();
?>
