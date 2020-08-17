#!/usr/bin/env node


'use strict';


const request = require('request');
import { api_json_data } from './interfaces';


/**
 * @param {string} api_url - 'https://api.github.com/emojis'
 * @param {Function} resolve_parser - `JSON.parse`
 * @return {Promise<api_json_data>}
 * @example
 * promiseRequest('https://api.github.com/emojis', JSON.parse).then((data) => {
 *   fs.writeFileSync('cache/parsed-data.json', 'utf8', JSON.stringify(data));
 * }).catch((error) => {
 *   console.error(error);
 * });
 */
async function promiseRequest(api_url: string, resolve_parser: Function): Promise<api_json_data> {
  const request_options = {
    url: api_url,
    headers: {
      'User-Agent': 'request'
    }
  };

  return new Promise((resolve, reject) => {
    request(request_options, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        throw error;
      } else if (response.statusCode !== 200) {
        throw new Error(`Response status code was not 200 -> ${response.statusCode}`);
      }

      try {
        resolve(resolve_parser(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}


/* istanbul ignore next */
if (typeof module !== 'undefined') {
  module.exports = { promiseRequest };
}

