<?php

use App\Configuration\Env;
use App\Middleware\Clearance;
use App\Models\Auth\UserInvite;

/**
 * Creates an empty admin user with the specified email
 * @param string $admin_email
 * @return void
 */
function createAdmin(string $admin_email): void
{
    echoLine();
    echoLine('Creating admin...');

    Env::Load();

    try {
        $invite = new UserInvite();
        $invite->email = $admin_email;
        $invite->targetClearance = Clearance::OVERLORD;

        $invite->Insert();

        echoLine('Create admin OK');
    } catch (PDOException $e) {
        echoError($e);
        echoLine('Create admin failed');
        exit(1);
    }
}
