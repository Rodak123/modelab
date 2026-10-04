#!/bin/bash
source "$(dirname "$0")/utils.sh"

ADMIN_EMAIL="$1"

start

start_output
php bin/actions/CREATE_ADMIN.php "$ADMIN_EMAIL"
runStatus=$?
end_output
if [ $runStatus -ne 0 ]; then
    fail $runStatus
fi

complete