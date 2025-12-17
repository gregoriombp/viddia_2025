<?php
/**
 * API Endpoint: Send Verification Email
 *
 * This endpoint generates a verification token and sends an email
 * with a verification link to the user.
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

if (!isset($input['email']) || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email is required']);
    exit();
}

$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Generate verification token
$token = bin2hex(random_bytes(32));
$expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

// TODO: Store token in database
// Example:
// $db = new PDO('mysql:host=localhost;dbname=viddia', 'username', 'password');
// $stmt = $db->prepare('INSERT INTO verification_tokens (email, token, expires_at, created_at) VALUES (?, ?, ?, NOW())');
// $stmt->execute([$email, $token, $expiresAt]);

// For now, we'll just log it (in production, remove this and use database)
error_log("Verification token for $email: $token (expires: $expiresAt)");

// Generate verification link
$baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}";
$verificationLink = $baseUrl . "/html/html/verify-email.html?token=" . urlencode($token) . "&email=" . urlencode($email);

// Send email
$subject = "VIDDIA - Verifique seu e-mail";
$message = "
<html>
<head>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2196f3, #1976d2); padding: 40px 30px; text-align: center; }
        .header img { height: 40px; }
        .content { padding: 40px 30px; }
        .content h1 { color: #1a1a1a; font-size: 24px; margin-bottom: 20px; }
        .content p { color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 16px; }
        .button { display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #2196f3, #1976d2); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 20px 0; }
        .footer { padding: 30px; text-align: center; color: #999; font-size: 14px; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='color: white; margin: 0;'>VIDDIA</h2>
        </div>
        <div class='content'>
            <h1>Verifique seu e-mail</h1>
            <p>Olá!</p>
            <p>Obrigado por se cadastrar na VIDDIA. Para completar seu cadastro, clique no botão abaixo para verificar seu e-mail:</p>
            <div style='text-align: center;'>
                <a href='{$verificationLink}' class='button'>Verificar E-mail</a>
            </div>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style='word-break: break-all; color: #2196f3;'>{$verificationLink}</p>
            <p style='margin-top: 30px; color: #999; font-size: 14px;'>Este link expira em 24 horas. Se você não solicitou este cadastro, ignore este e-mail.</p>
        </div>
        <div class='footer'>
            <p>&copy; 2025 VIDDIA. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: VIDDIA <noreply@viddia.com>\r\n";

// Send email
// TODO: In production, use a proper email service like SendGrid, Mailgun, etc.
$emailSent = mail($email, $subject, $message, $headers);

if ($emailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Verification email sent successfully',
        'email' => $email
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send verification email',
        'debug' => 'Check server email configuration'
    ]);
}
?>
