#!/usr/bin/env node


'use strict';


const fsPromises = require('fs').promises;
const promiseRequest = require('./promise-request');
import { api_json_data } from './interfaces';


/**
 * @param {string} api_url
 * @param {string} cache_path
 * @return {Promise<api_json_data>}
 */
async function saveApiData(api_url: string, cache_path: string): Promise<api_json_data> {
  return promiseRequest(api_url, JSON.parse).then((api_data) => {
    fsPromises.writeFile(cache_path, JSON.stringify(api_data));
    return api_data;
  });
}


/* istanbul ignore next */
if (typeof module !== 'undefined') {
  module.exports = { saveApiData };
}

