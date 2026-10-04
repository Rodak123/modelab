<?php

namespace App\Models\Auth;

use App\Services\Database\BaseModels\BaseModelId;

/**
 * Invite is checked when a user logs in.
 */
class UserInvite extends BaseModelId
{
    /**
     * @param string $email
     * @return UserInvite|null
     */
    final public static function SelectUserInvite(string $email): ?UserInvite
    {
        $userInvites = static::SelectWhereModels('email = :email', [
            ':email' => $email
        ]);

        if (count($userInvites) == 0) {
            return null;
        }

        return $userInvites[0];
    }

    /**
     * @sql VARCHAR(512) NOT NULL
     * @isUnique
     * @var string
     */
    public $email;

    /**
     * @sql INTEGER NOT NULL
     * @var string
     */
    public $targetClearance;
}
