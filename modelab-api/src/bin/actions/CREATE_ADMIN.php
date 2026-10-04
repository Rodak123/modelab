<?php

/**
 * This is a bash-bat executable script
 * !DO NOT INCLUDE IT ANYWHERE!
 */

/**
 * This action creates an empty admin user.
 */

require_once __DIR__ . '/scripts/index.php';

$adminEmail = $argv[1] ?? null;

if (!$adminEmail) {
    echoLine('Error: Admin email is required as the first argument');
    exit(1);
}

createAdmin($adminEmail);
