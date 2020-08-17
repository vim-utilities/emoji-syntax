#!/usr/bin/env vim


""
" Toggles `conceallevel` between `0` and `1`
" @author S0AndS0
" @license AGPL-3.0
function! Emoji_Syntax__Toggle()
  if &conceallevel == 1
    set conceallevel=0
  else
    set conceallevel=1
  endif
endfunction

