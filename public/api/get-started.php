<?php
/**
 * GoxHR "Get Started" form handler.
 *
 * The landing page is a static Next.js export, so it has no server of its own.
 * This small PHP script runs on the same Hostinger hosting and emails each
 * submission from the Get Started popup to the support inbox.
 *
 * Deployed path: /api/get-started.php (copied from public/api/ into out/api/ on build).
 */

// ---- Settings: edit these if anything changes ----
$TO_EMAIL      = 'support@lulisuite.com';
$FROM_EMAIL    = 'no-reply@goxsuite.com';  // an address on the domain that hosts this site
$FROM_NAME     = 'GoxHR website';
$ALLOWED_HOSTS = array('goxsuite.com', 'www.goxsuite.com');
$MAX_PER_HOUR  = 5;                         // submissions allowed per visitor per hour
$TEAM_SIZES    = array('1 to 10', '11 to 50', '51 to 200', '201 to 500', '501 to 1,000', 'More than 1,000');
// --------------------------------------------------

date_default_timezone_set('Africa/Lagos');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond($status, $payload)
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function text_len($v)
{
    return function_exists('mb_strlen') ? mb_strlen($v, 'UTF-8') : strlen($v);
}

// One line of text: control characters (including line breaks) become spaces.
function clean_line($v, $max)
{
    if (!is_string($v)) {
        return '';
    }
    $v = preg_replace('/[\x00-\x1F\x7F]+/', ' ', $v);
    $v = trim(preg_replace('/\s+/u', ' ', (string) $v));
    if (text_len($v) > $max) {
        $v = function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max);
    }
    return $v;
}

// Multi-line text: keeps line breaks, drops other control characters.
function clean_block($v, $max)
{
    if (!is_string($v)) {
        return '';
    }
    $v = str_replace(array("\r\n", "\r"), "\n", $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $v);
    $v = trim((string) $v);
    if (text_len($v) > $max) {
        $v = function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max);
    }
    return $v;
}

// Simple per-visitor limit kept in the server's temp folder.
function rate_limited($key, $max)
{
    $file   = sys_get_temp_dir() . '/goxhr_gs_' . hash('sha256', $key) . '.json';
    $now    = time();
    $window = 3600;
    $fh     = @fopen($file, 'c+');
    if (!$fh) {
        return false;
    }
    flock($fh, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($fh), true);
    if (!is_array($hits)) {
        $hits = array();
    }
    $recent = array();
    foreach ($hits as $t) {
        if (is_int($t) && $t > $now - $window) {
            $recent[] = $t;
        }
    }
    $limited = count($recent) >= $max;
    if (!$limited) {
        $recent[] = $now;
    }
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($recent));
    flock($fh, LOCK_UN);
    fclose($fh);
    return $limited;
}

/**
 * Send one enquiry per email address.
 *
 * A small JSON file in the server's temporary directory is used instead of a
 * database. The file stores SHA-256 email hashes, not the email addresses.
 * The lock prevents two simultaneous requests from using the same email.
 */
function send_once($email, $to, $subject, $body, $headers)
{
    // Keep the file outside the public web folder where possible.
    $private_dir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'goxhr-private-data';
    if (!is_dir($private_dir) && !@mkdir($private_dir, 0700, true) && !is_dir($private_dir)) {
        return 'storage_error';
    }
    $store = $private_dir . DIRECTORY_SEPARATOR . 'get-started-email-hashes.json';
    $lock  = @fopen($store . '.lock', 'c');
    if (!$lock) {
        return 'storage_error';
    }

    if (!flock($lock, LOCK_EX)) {
        fclose($lock);
        return 'storage_error';
    }

    $used = array();
    if (is_file($store)) {
        $saved = json_decode((string) @file_get_contents($store), true);
        if (is_array($saved)) {
            $used = $saved;
        }
    }

    $email_hash = hash('sha256', strtolower(trim($email)));
    if (isset($used[$email_hash])) {
        flock($lock, LOCK_UN);
        fclose($lock);
        return 'duplicate';
    }

    $sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
    if (!$sent) {
        flock($lock, LOCK_UN);
        fclose($lock);
        return 'send_failed';
    }

    $used[$email_hash] = time();
    $saved_ok = @file_put_contents($store, json_encode($used), LOCK_EX);
    if ($saved_ok === false) {
        // The email was sent, but duplicate protection could not be saved.
        error_log('GoxHR Get Started: unable to save the submitted email hash.');
    } else {
        @chmod($store, 0600);
    }

    flock($lock, LOCK_UN);
    fclose($lock);
    return 'sent';
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, array('ok' => false, 'error' => 'method_not_allowed'));
}

// Only accept submissions that come from this site.
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin !== '') {
    $host = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if (!in_array($host, $ALLOWED_HOSTS, true)) {
        respond(403, array('ok' => false, 'error' => 'forbidden'));
    }
}

$raw  = file_get_contents('php://input', false, null, 0, 10000);
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    respond(400, array('ok' => false, 'error' => 'bad_request'));
}

// Hidden trap field: real visitors never fill it in. Pretend it worked.
if (isset($data['hp_url']) && $data['hp_url'] !== '') {
    respond(200, array('ok' => true));
}

$name    = clean_line(isset($data['name']) ? $data['name'] : '', 100);
$email   = clean_line(isset($data['email']) ? $data['email'] : '', 150);
$phone   = clean_line(isset($data['phone']) ? $data['phone'] : '', 30);
$company = clean_line(isset($data['company']) ? $data['company'] : '', 120);
$size    = clean_line(isset($data['size']) ? $data['size'] : '', 30);
$message = clean_block(isset($data['message']) ? $data['message'] : '', 1000);

$errors = array();
if (text_len($name) < 2) {
    $errors['name'] = 'Enter your full name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Enter a valid email address.';
} else {
    $email_parts = explode('@', $email);
    $email_domain = strtolower(array_pop($email_parts));
    // A domain must publish MX records, or an address record for its mail host.
    // This checks the domain's mail setup, not whether the individual mailbox exists.
    $has_mail_route = (function_exists('checkdnsrr') && checkdnsrr($email_domain, 'MX'))
        || (function_exists('checkdnsrr') && (checkdnsrr($email_domain, 'A') || checkdnsrr($email_domain, 'AAAA')));
    if (!$has_mail_route) {
        $errors['email'] = 'This email domain does not appear to accept email. Check the address or use another email.';
    }
}
if ($phone !== '' && !preg_match('/^[0-9+()\-\s]{7,20}$/', $phone)) {
    $errors['phone'] = 'Enter a valid phone number.';
}
if (text_len($company) < 2) {
    $errors['company'] = 'Enter your company name.';
}
if (!in_array($size, $TEAM_SIZES, true)) {
    $errors['size'] = 'Choose your team size.';
}
if ($errors) {
    respond(422, array('ok' => false, 'error' => 'validation', 'errors' => $errors));
}

$ip = isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? $_SERVER['HTTP_CF_CONNECTING_IP']
    : (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown');
if (rate_limited($ip, $MAX_PER_HOUR)) {
    respond(429, array('ok' => false, 'error' => 'rate_limited'));
}

$subject = 'New Get Started request: ' . $company;
$body = "New Get Started request from the GoxHR website\n\n"
    . "Name:       $name\n"
    . "Work email: $email\n"
    . 'Phone:      ' . ($phone !== '' ? $phone : 'Not given') . "\n"
    . "Company:    $company\n"
    . "Team size:  $size\n\n"
    . "Message:\n" . ($message !== '' ? $message : 'None') . "\n\n"
    . 'Sent ' . date('D j M Y, H:i') . " (Lagos time)\n"
    . "Reply to this email to answer $name directly.\n";

$headers = array(
    'From: ' . $FROM_NAME . ' <' . $FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
);

$result = send_once($email, $TO_EMAIL, $subject, $body, implode("\r\n", $headers));

if ($result === 'duplicate') {
    respond(409, array(
        'ok' => false,
        'error' => 'duplicate_email',
        'errors' => array('email' => 'This email has already been used to submit a Get Started request. Please use another email or contact our team.')
    ));
}
if ($result === 'storage_error') {
    respond(500, array('ok' => false, 'error' => 'storage_unavailable'));
}
if ($result !== 'sent') {
    respond(500, array('ok' => false, 'error' => 'send_failed'));
}

respond(200, array('ok' => true));
