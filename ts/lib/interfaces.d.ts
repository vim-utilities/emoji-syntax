#!/usr/bin/env node


/**
 * @interface api_json_data
 */
export interface api_json_data {
  [word: string]: string;
}


/**
 * @interface parsed_api_entry
 * @param {string[]} hex_list
 * @param {string[]} symbol_list
 */
interface parsed_api_entry {
  [key: string]: string;
}


/**
 * @interface parsed_api_data
 */
interface parsed_api_data {
  [key: string]: parsed_api_entry;
}


