#!/usr/bin/env node
'use strict';
const fsPromises = require('fs').promises;
const path = require('path');
const saveApiData = require('./lib/save-api-data');
const parseApiData = require('./lib/parse-api-data');
const overwrite_api_cache = false;
const overwrite_out_file = false;
const api_url = 'https://api.github.com/emojis';
const cache_path = path.join(process.cwd(), 'cache', 'github-api-emoji.json');
const out_path = path.join(process.cwd(), 'configs', 'emoji-syntax.json');
/**
 * Jangle the promise chain
 */
fsPromises.readFile(cache_path).catch((error) => {
    console.warn(`Downloading API data to -> ${cache_path}`);
    return saveApiData(api_url, cache_path);
}).then((file_data) => {
    if (overwrite_api_cache) {
        console.log(`Downloading API data to -> ${cache_path}`);
        return saveApiData(api_url, cache_path);
    }
    return JSON.parse(file_data);
}).then((file_data) => {
    return parseApiData(file_data);
}).then((parsed_data) => {
    return fsPromises.writeFile(out_path, JSON.stringify(parsed_data, null, 2));
}).catch((error) => {
    throw error;
});
