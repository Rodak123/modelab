<?php

use App\Services\Database\Exceptions\SQLExecutionException;
use App\Configuration\Env;
use App\Services\Files\AssetFilesService;

/**
 * Drops all DB models
 * @return void
 */
function dropModels(): void
{
    echoLine();
    echoLine('Droping Models...');

    Env::Load();

    foreach (DB_ALL_MODELS as $modelClass) {
        echoLine('Dropping Model ' . $modelClass . '...');
        try {
            $modelClass::Drop();
        } catch (SQLExecutionException $e) {
            echoError($e);
            echoLine('Dropping Model ' . $modelClass . ' Failed');
            echoLine('Dropping Models Failed');
            exit(1);
        }
    }

    echoLine('Clearing files...');

    $service = new AssetFilesService();
    $service->DeleteStrayAssetFiles();

    echoLine('Dropping Models OK');
}
