#!/usr/bin/env vim
" Vim syntax file
" Language:     MarkDown file
" Maintainer:   S0AndS0 (https://github.com/S0AndS0)
" Last Change:  2020-08-09
" Note:         Requires that `conceallevel` is `set` to `1` or greater
" License:      AGPL-3.0


source $VIMRUNTIME/syntax/markdown.vim


let s:script_directory = fnamemodify(resolve(expand('<sfile>:p')), ':h')


""
" Replaces instances of hex Unicode with charters
" @note Requires `conceallevel` set to `1` or `2`
function! s:Emoji_Syntax__Register__MarkDown_Unicode()
  let l:plugin_directory = '/' . join(split(s:script_directory, '/')[:-4], '/')
  let l:json_path = l:plugin_directory . '/configs/emoji-syntax.json'
  let l:decoded_data = json_decode(join(readfile(l:json_path), ''))
  for [word, data] in items(l:decoded_data)
    for [unicode, symbol] in items(data)
      execute('syntax match Entity "&#x' . unicode . ';" conceal cchar=' . symbol)
    endfor
  endfor
endfunction


call s:Emoji_Syntax__Register__MarkDown_Unicode()

