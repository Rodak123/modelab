<?php

/**
 * This is a bash-bat executable script
 * !DO NOT INCLUDE IT ANYWHERE!
 */

/**
 * This action setups the entire backend.
 */

require_once __DIR__ . '/scripts/index.php';

validateEnv();
validateDB();
validateLogging();
validateAssetFiles();
populateDB();
cleanUpData();