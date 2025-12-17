<?php
/**
 * API Endpoint: Verify Email Token
 *
 * This endpoint validates the verification token and marks the email as verified.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['token']) || empty($input['token']) ||
    !isset($input['email']) || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Token and email are required']);
    exit();
}

$token = $input['token'];
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// TODO: Validate token against database
// Example:
// $db = new PDO('mysql:host=localhost;dbname=viddia', 'username', 'password');
// $stmt = $db->prepare('SELECT * FROM verification_tokens WHERE email = ? AND token = ? AND expires_at > NOW() AND used_at IS NULL');
// $stmt->execute([$email, $token]);
// $tokenData = $stmt->fetch();
//
// if (!$tokenData) {
//     http_response_code(400);
//     echo json_encode(['error' => 'Invalid or expired token', 'valid' => false]);
//     exit();
// }
//
// Mark token as used
// $stmt = $db->prepare('UPDATE verification_tokens SET used_at = NOW() WHERE id = ?');
// $stmt->execute([$tokenData['id']]);
//
// Mark email as verified
// $stmt = $db->prepare('UPDATE users SET email_verified_at = NOW() WHERE email = ?');
// $stmt->execute([$email]);

// For development/testing, we'll accept any token (REMOVE THIS IN PRODUCTION)
error_log("Verifying token: $token for email: $email");

// Simulate validation
$isValid = true; // In production, this should be based on database lookup

if ($isValid) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'valid' => true,
        'message' => 'Email verified successfully',
        'email' => $email
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => 'Invalid or expired token',
        'valid' => false
    ]);
}
?>
