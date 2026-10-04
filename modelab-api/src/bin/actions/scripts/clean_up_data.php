<?php

use App\Configuration\Env;
use App\Models\Asset;
use App\Models\File;
use App\Services\Files\AssetFilesService;

require_once __DIR__ . '/dev_assets/data.php';

/**
 * Removes ghost file DB entries and stray files without an DB entry.
 * @return void
 */
function cleanUpData(): void
{
    echoLine();
    echoLine('Cleaning up data...');

    Env::Load();

    echoLine('Checking assets files...');

    /**
     * @var Asset[]
     */
    $assets = Asset::SelectAllModels();

    $asset_files_service = new AssetFilesService();

    foreach ($assets as $asset) {
        echoLine('Checking asset \'' . $asset->name . '\'...');
        $files = $asset_files_service->SelectAssetFiles($asset);

        /**
         * @var File[]
         */
        $missing_files = [];

        foreach ($files as $file) {
            echoLine('Checking file \'' . $file->path . '\'...');

            if (!is_file($file->path)) {
                echoLine('File \'' . $file->name . '\' is missing, deleting it');
                $missing_files[] = $file;

                $file->Delete();
            }
        }

        if (count($missing_files) == count($files)) {
            echoLine('Asset \'' . $asset->name . '\' has no files left, deleting it');
            $asset_files_service->DeleteAsset($asset);
        }
    }

    echoLine('Deleting stray asset files...');
    $asset_files_service->DeleteStrayAssetFiles();

    echoLine('Data cleanup OK');
}