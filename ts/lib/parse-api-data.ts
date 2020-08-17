#!/usr/bin/env node


'use strict';


import { parsed_api_data } from './interfaces';


/**
 * @param {string} api_data
 * @return {Promise<parsed_api_data>}
 */
async function parseApiData(api_data: { [key: string]: string }): Promise<parsed_api_data> {
  return Object.entries(api_data).reduce((accumulator, [word, url]) => {
    const hex_list: string[] = url.split('/').slice(-1)[0].split('.')[0].split('-');

    accumulator[word] = hex_list.reduce((data, unicode) => {
      let code_point;
      if (unicode.startsWith('0x')) {
        code_point = Number(Number(unicode).toString(10));
      } else {
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
}


/* istanbul ignore next */
if (typeof module !== 'undefined') {
  module.exports = parseApiData;
}

