@echo off
php bin/actions/LOAD_DEV.php
if %errorlevel% neq 0 (
    echo Error while setuping app.
    exit /b %errorlevel%
)
echo App setup script completed successfully.