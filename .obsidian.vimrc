" Yank to system clipboard
" set clipboard=unnamed

" Maps pasteinto to Alt-p
map <A-p> :pasteinto<SPACE>

" Surround Text with surround
" https://github.com/esm7/obsidian-vimrc-support?tab=readme-ov-file#surround-text-with-surround
exmap surround_wiki surround [[ ]]
exmap surround_double_quotes surround " "
exmap surround_single_quotes surround ' '
exmap surround_backticks surround ` `
exmap surround_brackets surround ( )
exmap surround_square_brackets surround [ ]
exmap surround_curly_brackets surround { }
exmap surround_kbd surround <kbd> </kbd>

" NOTE: must use 'map' and not 'nmap'
map [[ :surround_wiki<CR>
nunmap s
vunmap s
map s" :surround_double_quotes<CR>
map s' :surround_single_quotes<CR>
map s` :surround_backticks<CR>
map sb :surround_brackets<CR>
map s( :surround_brackets<CR>
map s) :surround_brackets<CR>
map s[ :surround_square_brackets<CR>
map s] :surround_square_brackets<CR>
map s{ :surround_curly_brackets<CR>
map s} :surround_curly_brackets<CR>
map sk :surround_kbd<CR>

" Can't make :map ds working, so use 'sd' to delete surround
noremap sd" di""_da"p
noremap sd' di'"_da'p
noremap sdb dib"_dabp
noremap sd( di("_da(p
noremap sd[ di["_da[p
noremap sd{ di{"_da{p
