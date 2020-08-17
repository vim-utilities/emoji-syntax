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
/**
 * @param {string} api_data
 * @return {Promise<parsed_api_data>}
 */
function parseApiData(api_data) {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.entries(api_data).reduce((accumulator, [word, url]) => {
            const hex_list = url.split('/').slice(-1)[0].split('.')[0].split('-');
            accumulator[word] = hex_list.reduce((data, unicode) => {
                let code_point;
                if (unicode.startsWith('0x')) {
                    code_point = Number(Number(unicode).toString(10));
                }
                else {
                    code_point = Number(Number(`0x${unicode}`).toString(10));
                }
                if (isNaN(code_point)) {
                    return data;
                }
                data[unicode] = String.fromCodePoint(code_point);
                return data;
            }, {});
            return accumulator;
        }, {});
    });
}
/* istanbul ignore next */
if (typeof module !== 'undefined') {
    module.exports = parseApiData;
}
