#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('request');
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
function promiseRequest(api_url, resolve_parser) {
    return __awaiter(this, void 0, void 0, function* () {
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
                }
                else if (response.statusCode !== 200) {
                    throw new Error(`Response status code was not 200 -> ${response.statusCode}`);
                }
                try {
                    resolve(resolve_parser(body));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
}
/* istanbul ignore next */
if (typeof module !== 'undefined') {
    module.exports = { promiseRequest };
}
