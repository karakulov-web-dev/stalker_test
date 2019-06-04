/*
" "--Un espacio vac�o
"#"--Una pared
"."--Objetivo
"$"--Tesoro
"*"--Tesoro sobre un objetivo
"@"--Jugador
"+"--Jugador sobre un objetivo
*/

var numNiveles = 135;
var nombreDeNivel = "M�s Microban";
var autorDeNivel = "David Skinner";
var urlDeNivel = "http://users.bentonrea.com/~sasquatch/sokoban/";
var mailDeNivel = "sasquatch@bentonrea.com";

var nivel_1 = 
"####  |" +
"#  #  |" +
"#  #  |" +
"#  ###|" +
"#.$$@#|" +
"#  . #|" +
"#  ###|" +
"####  ";

var nivel_2 = 
" #####|" +
" #   #|" +
"##.# #|" +
"#  @ #|" +
"#  $ #|" +
"# #*##|" +
"#   # |" +
"##### ";

var nivel_3 = 
"   ####|" +
"####  #|" +
"#  #  #|" +
"# . . #|" +
"# @$$ #|" +
"# # ###|" +
"#   #  |" +
"#####  ";

var nivel_4 = 
" #####    |" +
"## @ #### |" +
"#  #  . ##|" +
"# #      #|" +
"# $$ #.  #|" +
"##    ####|" +
" ##   #   |" +
"  #####   ";

var nivel_5 = 
"######  |" +
"#    #  |" +
"# $$ ###|" +
"### @  #|" +
"  #  . #|" +
"  ## .##|" +
"   #### ";

var nivel_6 = 
"   ####  |" +
"####  #  |" +
"#@.*  #  |" +
"#  #  ###|" +
"####  $ #|" +
"   #  # #|" +
"   ##   #|" +
"    #####";

var nivel_7 = 
"  #####|" +
"###   #|" +
"#  $# #|" +
"#  .$ #|" +
"## ##.#|" +
" #   @#|" +
" ######";

var nivel_8 = 
"########|" +
"#   @  #|" +
"#   *  #|" +
"###.$###|" +
"  # * # |" +
"  #   # |" +
"  ##### ";

var nivel_9 = 
"######|" +
"#    #|" +
"# #$@#|" +
"# .*.#|" +
"# #$ #|" +
"#    #|" +
"######";

var nivel_10 = 
"#####  |" +
"#   #  |" +
"#   ###|" +
"#$$$@ #|" +
"#...  #|" +
"#######";

var nivel_11 = 
"######|" +
"#.#  #|" +
"#@$$ #|" +
"#..$ #|" +
"##   #|" +
" #####";

var nivel_12 = 
" #######|" +
" #  #  #|" +
" #  #$ #|" +
"##  .*+#|" +
"#   #$ #|" +
"#   #  #|" +
"##  ####|" +
" #  #|" +
" ####";

var nivel_13 = 
"#####  |" +
"#   ###|" +
"#     #|" +
"#     #|" +
"###.###|" +
"# $*$ #|" +
"#  +  #|" +
"#######";

var nivel_14 = 
" ####  |" +
"##  ###|" +
"# .$  #|" +
"#@.$  #|" +
"# .$ ##|" +
"##  ## |" +
" ####  ";

var nivel_15 = 
"####   |" +
"#  ####|" +
"#  #  #|" +
"#.$**@#|" +
"##    #|" +
" #   ##|" +
" ##### ";

var nivel_16 = 
"    ####|" +
"  ###  #|" +
"  # $$ #|" +
" ## #  #|" +
"## .#$@#|" +
"#      #|" +
"# ..####|" +
"#####   ";

var nivel_17 = 
" #####|" +
" #   #|" +
" #$#@#|" +
"## $ #|" +
"#   ##|" +
"#.*. #|" +
"#    #|" +
"######";

var nivel_18 = 
" ##### |" +
" #   ##|" +
" #$#@ #|" +
" # $  #|" +
"##  ###|" +
"# $.  #|" +
"#. .  #|" +
"#######";

var nivel_19 = 
"#######|" +
"#     #|" +
"# $$$.#|" +
"## #@.#|" +
" # # .#|" +
" #  # #|" +
" ##   #|" +
"  #####";

var nivel_20 = 
" ####  |" +
" #  ###|" +
" #$   #|" +
" # .# #|" +
"##*.  #|" +
"# $ ###|" +
"# @ #  |" +
"#####  ";

var nivel_21 = 
"   #### |" +
"####  # |" +
"#. .  ##|" +
"#  # @ #|" +
"## #   #|" +
"## ##  #|" +
"# $  ###|" +
"#  $ #  |" +
"# # ##  |" +
"#   #   |" +
"#####   ";

var nivel_22 = 
" ######### |" +
" #    #  # |" +
" # $ $   # |" +
" ## ###  # |" +
"### # #@###|" +
"#   ###   #|" +
"# # . .   #|" +
"#   #######|" +
"#####      ";

var nivel_23 = 
" ##### #####|" +
" #   ###   #|" +
" #@$  ##.. #|" +
"###$#      #|" +
"#   ## ##  #|" +
"#       ####|" +
"#   #   #   |" +
"#########   ";

var nivel_24 = 
"     #####  |" +
"######   #  |" +
"#   ## # #  |" +
"# $@$    #  |" +
"### ### ### |" +
"#         ##|" +
"#   ### .. #|" +
"#####    # #|" +
"    # #  # #|" +
"    #  ##  #|" +
"    ##    ##|" +
"     ###### ";

var nivel_25 = 
" ##### |" +
"##   ##|" +
"# .$. #|" +
"# $#$ #|" +
"# .$. #|" +
"#    ##|" +
"## @## |" +
" ####  ";

var nivel_26 = 
"########|" +
"#      #|" +
"# ###$ #|" +
"# #  $ #|" +
"# #.*$@#|" +
"# #.#  #|" +
"#  .#  #|" +
"########";

var nivel_27 = 
"#######|" +
"#  +  #|" +
"# *$* #|" +
"#. # .#|" +
"#  #  #|" +
"#  #  #|" +
"#  #  #|" +
"# $#$ #|" +
"#  #  #|" +
"#######";

var nivel_28 = 
"  #######|" +
"  #     #|" +
"### ### #|" +
"# ..*   #|" +
"#  $$@ ##|" +
"####  ## |" +
"   #  #  |" +
"   ####  ";

var nivel_29 = 
"######  |" +
"#    #  |" +
"# ##$###|" +
"# # $  #|" +
"# @.*. #|" +
"##     #|" +
" #  ####|" +
" ####   ";

var nivel_30 = 
"         #####|" +
"         #   #|" +
"########## # #|" +
"#.     #  $  #|" +
"#.  @  #    ##|" +
"#.# #######  #|" +
"#         $$ #|" +
"##  #####    #|" +
" ####   ######";

var nivel_31 = 
"  ########|" +
"  #  #   #|" +
"  #  $   #|" +
"  #  ##$##|" +
"#### ##  #|" +
"# @...#$ #|" +
"#        #|" +
"######  ##|" +
"     #### ";

var nivel_32 = 
"########|" +
"#      #|" +
"#    # #|" +
"###..$.#|" +
"  # #$##|" +
"  #  @ #|" +
"  ## $ #|" +
"   # # #|" +
"   #   #|" +
"   #####";

var nivel_33 = 
"### #######|" +
"## ####   #|" +
"# ## ...# #|" +
" ###$   # #|" +
"##  $$### #|" +
"## @      #|" +
"###########";

var nivel_34 = 
"#####    |" +
"#   #### |" +
"#  .#  # |" +
"## ..  ##|" +
" # ## @ #|" +
" # #    #|" +
" # $ ####|" +
" # $##   |" +
" # $ #   |" +
" #   #   |" +
" #####   ";

var nivel_35 = 
" ########## |" +
" #  ##    ##|" +
" #     ##  #|" +
" # # $#  # #|" +
" # #  @ $# #|" +
" # #  #$   #|" +
" # ###  ####|" +
"## .   ##   |" +
"#  .####    |" +
"#  .#       |" +
"#####       ";

var nivel_36 = 
"    ###### |" +
"    #    ##|" +
" #### ##  #|" +
"##      # #|" +
"# @$**. # #|" +
"#   # ##  #|" +
"#####    ##|" +
"    ###### ";

var nivel_37 = 
" #####  |" +
" #   #  |" +
"## # ## |" +
"# $   ##|" +
"#  $#. #|" +
"## $ . #|" +
" #  #. #|" +
" #### @#|" +
"    #  #|" +
"    ####";

var nivel_38 = 
"  ######|" +
"  #    #|" +
"### ## #|" +
"# ...  #|" +
"#  $ ###|" +
"# #$##  |" +
"#  $ #  |" +
"#  @ #  |" +
"######  ";

var nivel_39 = 
" ###### |" +
"##    # |" +
"#  ## # |" +
"#@# $ # |" +
"#  *..# |" +
"## #$###|" +
" #     #|" +
" ###   #|" +
"   #####";

var nivel_40 = 
" #####|" +
" #   #|" +
"## . #|" +
"#  * #|" +
"# # ##|" +
"#  $ #|" +
"## * #|" +
" # @ #|" +
" #####";

var nivel_41 = 
"#####   |" +
"#   ####|" +
"# # .  #|" +
"# #$.  #|" +
"# @$*# #|" +
"####   #|" +
"   #####";

var nivel_42 = 
" #######  |" +
" #     ###|" +
"## ###$  #|" +
"#  .. $  #|" +
"#  .##$ ##|" +
"### # @## |" +
"  #   ##  |" +
"  #####   ";

var nivel_43 = 
"     ####  |" +
"     # @## |" +
"###### $ ##|" +
"#  . # $  #|" +
"#      $# #|" +
"## ..#    #|" +
" ##  ######|" +
"  ####     ";

var nivel_44 = 
"    ####   |" +
" ####  ### |" +
" #     $ # |" +
" #  $$ # # |" +
" # # @#  # |" +
"## ####  ##|" +
"#  ...    #|" +
"# ### #   #|" +
"#     #####|" +
"#######    ";

var nivel_45 = 
"   ###  #####|" +
"#### ####   #|" +
"#  ###      #|" +
"# ..  $$$$  #|" +
"# ..  # @#  #|" +
"#############|" +
"      #  #   ";

var nivel_46 = 
"########    |" +
"#  #   #    |" +
"#      #    |" +
"#  ## ###   |" +
"## ##   ####|" +
" # ## $$$@ #|" +
"## ## #    #|" +
"# . . . ####|" +
"#   #####   |" +
"#####       ";

var nivel_47 = 
"######   |" +
"#    ### |" +
"# $ @  # |" +
"#  ### # |" +
"# $$ $ # |" +
"#     ###|" +
"### ##  #|" +
"# ....  #|" +
"#       #|" +
"#  ######|" +
"####     ";

var nivel_48 = 
"     #####|" +
" #####   #|" +
"##  +  # #|" +
"# $$.$$  #|" +
"#  #.# ###|" +
"##  .  #  |" +
" #######  ";

var nivel_49 = 
" ##### |" +
"##   # |" +
"#    # |" +
"# .$.##|" +
"##$#$ #|" +
" #.$. #|" +
" #    #|" +
" # @ ##|" +
" ##### ";

var nivel_50 = 
" ########|" +
" #  #   #|" +
"##  #$  #|" +
"# .*@*. #|" +
"#  $#  ##|" +
"#   #  # |" +
"######## ";

var nivel_51 = 
"########|" +
"#  $.  #|" +
"#  $.  #|" +
"###  ###|" +
"#  $.  #|" +
"#@ $.  #|" +
"########";

var nivel_52 = 
"   #### |" +
"   #  # |" +
"   #$ # |" +
"   #  # |" +
"####@###|" +
"#  $   #|" +
"#  ..* #|" +
"#   #  #|" +
"########";

var nivel_53 = 
" ###### |" +
" #    # |" +
" #. ..##|" +
"###$ @ #|" +
"# $  $ #|" +
"#   ####|" +
"#####   ";

var nivel_54 = 
"     ##### |" +
"    ##   # |" +
"    #  # # |" +
"    #  @ # |" +
"    #    # |" +
"  #####.###|" +
"  #    .  #|" +
"### #$#.  #|" +
"#  $$  ####|" +
"# #    #   |" +
"#   ####   |" +
"#####      ";

var nivel_55 = 
"   ####  |" +
" ###  ## |" +
" # $ $ # |" +
" #   # # |" +
" ##$   # |" +
"  #  # # |" +
"  ## # # |" +
"  #. # # |" +
"  #.## # |" +
"###.## ##|" +
"#       #|" +
"#   @   #|" +
"#########";

var nivel_56 = 
"   #####|" +
"  ##   #|" +
"### .# #|" +
"#  $*$@#|" +
"#   .# #|" +
"### #  #|" +
"  #   ##|" +
"  #####";

var nivel_57 = 
"   #####|" +
" ###   #|" +
"##     #|" +
"# **$ ##|" +
"#  * .# |" +
"### #@# |" +
"  #   # |" +
"  ##### ";

var nivel_58 = 
"    #### |" +
" ####  ##|" +
" #    $ #|" +
" # #  # #|" +
"## #$$$@#|" +
"# ..  ###|" +
"# .. ##  |" +
"###  #   |" +
"  ####   ";

var nivel_59 = 
" ######   |" +
" #    ### |" +
" # $  $ # |" +
" ##$# # # |" +
"### #@# ##|" +
"# . . .  #|" +
"#   ##   #|" +
"##########";

var nivel_60 = 
" #######    #####|" +
" #     ######   #|" +
"##      @ ...   #|" +
"#  ########## ###|" +
"# $  $   $     # |" +
"#  #   #   #   # |" +
"################ ";

var nivel_61 = 
"#####     |" +
"#   #     |" +
"#   ######|" +
"#$$$$ $ @#|" +
"#.....   #|" +
"##########";

var nivel_62 = 
"   ####  |" +
"   #  ###|" +
"   # .  #|" +
"   #$.@ #|" +
"#### .$ #|" +
"#  $$.###|" +
"#     #  |" +
"#######  ";

var nivel_63 = 
"#####       |" +
"#   #####   |" +
"#   $ $ ### |" +
"## $    $ ##|" +
" ###### .. #|" +
"     #. . @#|" +
"     #     #|" +
"     ###  ##|" +
"       #### ";

var nivel_64 = 
"######### |" +
"#  ##   ##|" +
"# $ $$*@ #|" +
"#  # . # #|" +
"## #. .  #|" +
" #   #####|" +
" #####    ";

var nivel_65 = 
"######   |" +
"#    #   |" +
"# ## ##  |" +
"# # * ## |" +
"# #@*  ##|" +
"# # *   #|" +
"# # * $ #|" +
"# ## #.##|" +
"#    ### |" +
"######   ";

var nivel_66 = 
"     #####    |" +
"     #   #    |" +
"     # # #    |" +
"     #   #    |" +
"#######$ #    |" +
"#    $..$#####|" +
"# # $.  .#   #|" +
"#   #.  .$ # #|" +
"#####$..$    #|" +
"    # $#######|" +
"    #   #     |" +
"    # # #     |" +
"    # @ #     |" +
"    #####     ";

var nivel_67 = 
"   ####   |" +
"  ##  ##  |" +
" ## *  ## |" +
"## $ .$ ##|" +
"#  . @ * #|" +
"# *   .  #|" +
"## $. $ ##|" +
" ##  * ## |" +
"  ##  ##  |" +
"   ####   ";

var nivel_68 = 
"     #     |" +
"    #.#    |" +
"   # $ #   |" +
"  #     #  |" +
" #  ***  # |" +
"#.$ *@* $.#|" +
" #  ***  # |" +
"  #     #  |" +
"   # $ #   |" +
"    #.#    |" +
"     #     ";

var nivel_69 = 
"#######|" +
"# . . #|" +
"#.$$$.#|" +
"# $@$ #|" +
"#.$$$.#|" +
"# . . #|" +
"#######";

var nivel_70 = 
"########|" +
"#  #   #|" +
"#  #.. #|" +
"# $$$$$#|" +
"#  #...#|" +
"#  #   #|" +
"#  @   #|" +
"########";

var nivel_71 = 
"########|" +
"#   #  #|" +
"# $.$. #|" +
"##.  $ #|" +
"# $  .##|" +
"# .$.$ #|" +
"#  #  @#|" +
"########";

var nivel_72 = 
"#########|" +
"#       #|" +
"# *$*$* #|" +
"# $...$ #|" +
"# *. .* #|" +
"# $...$ #|" +
"# *$*$* #|" +
"#      @#|" +
"#########";

var nivel_73 = 
"#########|" +
"#       #|" +
"# .$.$. #|" +
"# $.$.$ #|" +
"# .$@$. #|" +
"# $.$.$ #|" +
"# .$.$. #|" +
"#       #|" +
"#########";

var nivel_74 = 
"#########|" +
"#       #|" +
"# $.$.$ #|" +
"# .$.$. #|" +
"##$.@.$##|" +
"# .$.$. #|" +
"# $.$.$ #|" +
"#       #|" +
"#########";

var nivel_75 = 
"#########|" +
"#   #   #|" +
"# .$.$. #|" +
"# $.$.$ #|" +
"##.$@$.##|" +
"# $.$.$ #|" +
"# .$.$. #|" +
"#   #   #|" +
"#########";

var nivel_76 = 
" ######  |" +
" #  . ###|" +
"## $.   #|" +
"#  $*$$ #|" +
"#..*@*..#|" +
"# $$*$  #|" +
"#   .$ ##|" +
"### .  # |" +
"  ###### ";

var nivel_77 = 
"  #####    |" +
"  #   ###  |" +
" ## #   ###|" +
" #  .$#   #|" +
"## #$.$.# #|" +
"#  $.@.$  #|" +
"# #.$.$# ##|" +
"#   #$.  # |" +
"###   # ## |" +
"  ###   #  |" +
"    #####  ";

var nivel_78 = 
" ####### |" +
"##     ##|" +
"#  $.$  #|" +
"# $#.#$ #|" +
"##..@.. #|" +
"# $#.#$ #|" +
"#  $.$  #|" +
"#   #  ##|" +
"######## ";

var nivel_79 = 
"    #### |" +
" ####  # |" +
" #     # |" +
"##.# # ##|" +
"#@$ $#  #|" +
"# .$    #|" +
"##.$##  #|" +
" #. #####|" +
" ####    ";

var nivel_80 = 
" #### #####|" +
"##  ###   #|" +
"#  . #  $ #|" +
"# . .$ $ ##|" +
"###*## # # |" +
"  #  # @ # |" +
"  #  ##### |" +
"  #  #     |" +
"  ####     ";

var nivel_81 = 
" #######    |" +
" #  #  ###  |" +
" #  #  . ###|" +
" #   $ # @ #|" +
" ## # $ $  #|" +
"  # ##..####|" +
"  #  #  #   |" +
"### ### ### |" +
"#     $   # |" +
"#   ###.  # |" +
"##### ##### ";

var nivel_82 = 
" ##########|" +
" #        #|" +
" #.####   #|" +
"##.$ @ $$ #|" +
"# .*.$ #  #|" +
"# ### ## ##|" +
"#        # |" +
"########## ";

var nivel_83 = 
"###### #### |" +
"# .  ###  # |" +
"#      @  ##|" +
"#....# $#  #|" +
"###### $   #|" +
"     ##$ $ #|" +
"      #   ##|" +
"      # $## |" +
"      #  #  |" +
"      ####  ";

var nivel_84 = 
"########|" +
"#  ##  #|" +
"#  ..  #|" +
"# .  . #|" +
"### ####|" +
" #    ##|" +
" # $$@ #|" +
" ### $ #|" +
"###  # #|" +
"#    $ #|" +
"#    ###|" +
"######  ";

var nivel_85 = 
"        #### |" +
"        #  # |" +
"      ###  # |" +
"     ##    # |" +
"     #  #$###|" +
"     # $ $  #|" +
"     ##$    #|" +
"#######  ####|" +
"#     #  ##  |" +
"#  @  ##  #  |" +
"#  #  ....#  |" +
"#    ######  |" +
"######       ";

var nivel_86 = 
"  #####   |" +
" ##   #   |" +
" #  # #   |" +
"##    #   |" +
"#  $ #### |" +
"#  $$#. # |" +
"###$    # |" +
"  #  #  # |" +
"  ####. # |" +
"   #@#. ##|" +
"   #  .  #|" +
"   #     #|" +
"   #######";

var nivel_87 = 
"     ####   |" +
"     #  ### |" +
"    ## .  ##|" +
"    #. .   #|" +
"    #.  #@ #|" +
"    ## ##  #|" +
"   ##  #####|" +
"  ## $ #    |" +
" ## $  #    |" +
"## $  ##    |" +
"# $  ##     |" +
"#   ##      |" +
"#####       ";

var nivel_88 = 
" ###### |" +
" #. . # |" +
" #  *.##|" +
"###$ @ #|" +
"# $  $ #|" +
"#   ####|" +
"#####   ";

var nivel_89 = 
"########|" +
"#      #|" +
"# #.#  #|" +
"#  *   #|" +
"##$*$ ##|" +
"#  *@## |" +
"# #.##  |" +
"#   #   |" +
"#####   ";

var nivel_90 = 
" ##### |" +
" #   # |" +
" #   ##|" +
" #$*$ #|" +
"##. . #|" +
"# .@.##|" +
"# $*$# |" +
"##   # |" +
" #   # |" +
" ##### ";

var nivel_91 = 
"  ####   |" +
"  #  #   |" +
"  #  #   |" +
"  #  ### |" +
"###$ $ ##|" +
"#  $@$  #|" +
"#   #   #|" +
"###### ##|" +
"  ## . .#|" +
"  #  . .#|" +
"  #     #|" +
"  #  ####|" +
"  ####   ";

var nivel_92 = 
" ######    ####|" +
" # @  ######  #|" +
" #  #   $     #|" +
"## ....# $ #  #|" +
"#   ## ## $  ##|" +
"#      ### $ # |" +
"######## ##  # |" +
"          #### ";

var nivel_93 = 
"    ####|" +
"  ###  #|" +
" ## .  #|" +
"##     #|" +
"# .$. ##|" +
"# $ ### |" +
"# .$####|" +
"###    #|" +
" ##$#  #|" +
" #  #  #|" +
" #  @ ##|" +
" ###  # |" +
"   #### ";

var nivel_94 = 
"       ######     |" +
"    ####    ###   |" +
"    #    ##   #   |" +
" #### ###..## ####|" +
" #  #$$     #    #|" +
"##  $ $ #... @ # #|" +
"#  #  $ ##### #  #|" +
"#    ####  #    ##|" +
"##   #     #   ## |" +
" #####     #####  ";

var nivel_95 = 
"#############|" +
"#       #   #|" +
"#    ## #   #|" +
"## ### $ $ ##|" +
"#@...# $$$ # |" +
"#          # |" +
"##..######## |" +
" ####        ";

var nivel_96 = 
"     ####  |" +
"     #  #  |" +
" #####  #  |" +
" #  $ $ #  |" +
" # .#  ### |" +
" # .#$$  ##|" +
"## .#     #|" +
"#  *###@  #|" +
"#        ##|" +
"## .###### |" +
" ####      ";

var nivel_97 = 
"#####    #####|" +
"#   ######   #|" +
"#          # #|" +
"## ####### # #|" +
" # #     # # #|" +
" # #$$ ..... #|" +
"## #   #######|" +
"#  #$#@#      |" +
"# $ $  #      |" +
"#  #  ##      |" +
"####  #       |" +
"   ####       ";

var nivel_98 = 
"#####    |" +
"#   ###  |" +
"# # $ ###|" +
"# # $   #|" +
"# #.$##@#|" +
"# #.$   #|" +
"#  .#####|" +
"## .  #  |" +
" #    #  |" +
" ######  ";

var nivel_99 = 
"  #####     |" +
"  #   #     |" +
"  #   #     |" +
"  #  ###    |" +
"###. # #####|" +
"#  . ###   #|" +
"#  . # $   #|" +
"# #.## $ $ #|" +
"#  . @  $$##|" +
"##  ###   # |" +
" #### ##### ";

var nivel_100 = 
" #######    |" +
" #     ##   |" +
" # ###  ####|" +
" #   ##    #|" +
" #  $ #### #|" +
"####$ .....#|" +
"#  #  #### #|" +
"####$$#    #|" +
" #  $ # ####|" +
" #  @ # #   |" +
" # #### #   |" +
" #      #   |" +
" ########   ";

var nivel_101 = 
"  #####   |" +
"### . #   |" +
"#  . $##  |" +
"#  $$. ###|" +
"### .$$@ #|" +
"  ##$ .  #|" +
"   # . ###|" +
"   #####  ";

var nivel_102 = 
"   ####     |" +
"  ##  #     |" +
"  #   ##### |" +
"  #       # |" +
"  #   #   # |" +
"  ##    .## |" +
"   #####.#  |" +
"  ######.###|" +
"  #     .  #|" +
"###  #$#.  #|" +
"#  $$ $ ####|" +
"#   $ @ #   |" +
"###  ####   |" +
"  ####      ";

var nivel_103 = 
"  ##########  |" +
"  #   #    #  |" +
"### ... .# #  |" +
"#    ## ## #  |" +
"#    ##  # #  |" +
"###  #@  # #  |" +
" ##  ##  # ###|" +
"  ##### $#$  #|" +
"   ## # $    #|" +
"    ### $##  #|" +
"     ##  #####|" +
"      ####    ";

var nivel_104 = 
"   ###### |" +
"####    # |" +
"#    ## ##|" +
"# ##     #|" +
"# #  #   #|" +
"#  $$#$$ #|" +
"###$ $ $##|" +
" ##     ##|" +
" ####@####|" +
" #  . .. #|" +
" # .. .  #|" +
" # .##   #|" +
" #####   #|" +
"     #####";

var nivel_105 = 
" ####   |" +
" #  ### |" +
"##    ##|" +
"#  * . #|" +
"# *$*$ #|" +
"## .$. #|" +
" #@  ###|" +
" #####  ";

var nivel_106 = 
"  #### |" +
"###  # |" +
"#  . ##|" +
"# #*  #|" +
"# $.#@#|" +
"##$.# #|" +
"#  $  #|" +
"#   ###|" +
"#  ##  |" +
"####   ";

var nivel_107 = 
"  ####   |" +
" ##  ####|" +
" #  $$  #|" +
" # #  # #|" +
" # $ $# #|" +
" # #  # #|" +
" #@#  # #|" +
"## #$#  #|" +
"# .....##|" +
"#   #### |" +
"#####    ";

var nivel_108 = 
"   ####    |" +
"   #  #    |" +
"  ## $###  |" +
"  #  .  ###|" +
"### .$.   #|" +
"# $.$@$.$ #|" +
"#   .$. ###|" +
"###  .  #  |" +
"  ###$ ##  |" +
"    #  #   |" +
"    ####   ";

var nivel_109 = 
" #####    |" +
" # . #####|" +
" #$ $$ $ #|" +
" # .. . .#|" +
"##$   .$ #|" +
"# $.   $##|" +
"#. . .. # |" +
"#@$ $$ $# |" +
"##### . # |" +
"    ##### ";

var nivel_110 = 
"  ########|" +
"  #  #   #|" +
"###... . #|" +
"#    # ###|" +
"# @    #  |" +
"###  # ## |" +
"  ### $ # |" +
"  ## $  # |" +
"### $  ## |" +
"#  $  ####|" +
"#    #   #|" +
"#  ##    #|" +
"#       ##|" +
"##  #  ## |" +
" ####  #  |" +
"    ####  ";

var nivel_111 = 
"  ####      |" +
"  #  #      |" +
"###  ##     |" +
"#  $ .# ####|" +
"#  $#.###  #|" +
"#  $ .#    #|" +
"#####.# $  #|" +
"  ###.#$#@ #|" +
"  #  .  $  #|" +
"  #   ###  #|" +
"  ##  # ####|" +
"   ####     ";

var nivel_112 = 
"#########|" +
"#   #   #|" +
"# $...$ #|" +
"# $*@*$ #|" +
"# $...$ #|" +
"#   #   #|" +
"#########";

var nivel_113 = 
"###########|" +
"#         #|" +
"#  * . *  #|" +
"##*$*@*$*##|" +
"#  * . *  #|" +
"#    #    #|" +
"###########";

var nivel_114 = 
"      #####    |" +
"    ###   #    |" +
"    #   # #    |" +
"    # #   #    |" +
"##### $ $##### |" +
"#   ## # #   # |" +
"# # $ ... $# ##|" +
"#    #.@.#    #|" +
"## #$ ... $ # #|" +
" #   # # ##   #|" +
" #####$ $ #####|" +
"    #   # #    |" +
"    # #   #    |" +
"    #   ###    |" +
"    #####      ";

var nivel_115 = 
"      #      |" +
"     # #     |" +
"    #   #    |" +
"   # .$. #   |" +
"  # .$.$. #  |" +
" # .$ $ $. # |" +
"#  $.$@$.$  #|" +
" # .$ $ $. # |" +
"  # .$.$. #  |" +
"   # .$. #   |" +
"    #   #    |" +
"     # #     |" +
"      #      ";

var nivel_116 = 
"########        |" +
"#  #   #        |" +
"#      #        |" +
"#  ## ##########|" +
"## ##  #       #|" +
" # ##  #       #|" +
" # ##  $ $ $ $ #|" +
"## ### #######@#|" +
"#    . . . .   #|" +
"#   ############|" +
"#####           ";

var nivel_117 = 
"       ####|" +
" #######  #|" +
"##   ##   #|" +
"#    #  $ #|" +
"# # ##$  ##|" +
"# #   $ ## |" +
"#@# .#$ ## |" +
"#  ..  ##  |" +
"###. ###   |" +
"  #  #     |" +
"  ####     ";

var nivel_118 = 
"     #####   |" +
"     #   ##  |" +
"######  $ ## |" +
"#    ##  $ ##|" +
"#     ##  $ #|" +
"#...#  ##   #|" +
"#   @  ##$  #|" +
"#...# ## $ ##|" +
"##### # $  # |" +
"    #     ## |" +
"    #  ####  |" +
"    ####     ";

var nivel_119 = 
" #######  |" +
" #     ###|" +
" # ###.  #|" +
" # # . # #|" +
"## #...  #|" +
"#@   .####|" +
"#  #  #   |" +
"## #####  |" +
"# $$   ## |" +
"#  $$   # |" +
"### $$  # |" +
"  #     # |" +
"  ##   ## |" +
"   #####  ";

var nivel_120 = 
"#### ####      |" +
"#  ###  ###### |" +
"#  #         # |" +
"####$  $## # # |" +
" #   #   # $ ##|" +
"###    ## $$  #|" +
"#  ## $   #   #|" +
"# @ #  ########|" +
"#     ##     # |" +
"#......# ######|" +
"#      ###    #|" +
"######## ######";

var nivel_121 = 
"   #######|" +
"  ## .   #|" +
" ##  .   #|" +
" # $*.# ##|" +
" # # .  # |" +
"## # . ## |" +
"#  ### #  |" +
"# #   @## |" +
"# $$$#  # |" +
"#     # # |" +
"###   # # |" +
"  #$##  # |" +
"  #    ## |" +
"  ######  ";

var nivel_122 = 
"   #### |" +
" ###  ##|" +
" #     #|" +
"##*  # #|" +
"# *$*. #|" +
"#  @  ##|" +
"####### ";

var nivel_123 = 
"  #####     |" +
"###   ####  |" +
"#   $  $ #  |" +
"# $##  $ #  |" +
"##     # #  |" +
" ##### # ###|" +
"     # ... #|" +
"     ##.   #|" +
"      ## @##|" +
"       #  # |" +
"       #### ";

var nivel_124 = 
"#########|" +
"#   #   #|" +
"# $ * $ #|" +
"#..# #..#|" +
"# $ # $ #|" +
"# .$@$. #|" +
"# $ # $ #|" +
"#..# #..#|" +
"# $ * $ #|" +
"#   #   #|" +
"#########";

var nivel_125 = 
"     ########## |" +
"     #        ##|" +
" ##### #### $  #|" +
" #.. #     #   #|" +
" #   .  # $  # #|" +
" #.. #### # $  #|" +
" ## ##  # $$#  #|" +
"  # #   ##    ##|" +
"###@###  ###### |" +
"#     #         |" +
"#     #         |" +
"#  #  #         |" +
"####  #         |" +
"   ####         ";

var nivel_126 = 
" #######      |" +
" #     #      |" +
" # $$  #      |" +
" #  $###      |" +
" # #  #       |" +
" # #$ #       |" +
" # #  #       |" +
"## ## ##      |" +
"#    ..#######|" +
"#@###...     #|" +
"#   #.#### $ #|" +
"### #.# $ $$ #|" +
"  #  .    #  #|" +
"  #########  #|" +
"          ####";

var nivel_127 = 
"#####     |" +
"#@  ######|" +
"#  $ #   #|" +
"#.*.*. $ #|" +
"#  $ #####|" +
"##   #    |" +
" #####    ";

var nivel_128 = 
"   ####### |" +
"  ##     ##|" +
"###  ###  #|" +
"#   #   # #|" +
"#@$***. # #|" +
"##      # #|" +
" #### ##  #|" +
"    #    ##|" +
"    ###### ";

var nivel_129 = 
"       ####|" +
"########  #|" +
"#     $   #|" +
"#  ##.##  #|" +
"##$##  . ##|" +
" #  . $# ##|" +
" # ###.#  #|" +
" # ### @  #|" +
" #   $ ####|" +
" #  ####   |" +
" ####      ";

var nivel_130 = 
"            ####  |" +
"           ##  ###|" +
"          ##  @  #|" +
"         ##  *$ .#|" +
"        ##  **  ##|" +
"       ##  **  ## |" +
"      ##  **  ##  |" +
"     ##  **  ##   |" +
"    ##  **  ##    |" +
"   ##  **  ##     |" +
"  ##  **  ##      |" +
" ##  **  ##       |" +
"##  **  ##        |" +
"#  **  ##         |" +
"# **  ##          |" +
"#  ####           |" +
"####              ";

var nivel_131 = 
"            ####  |" +
"          ###  ###|" +
"         ##.$.   #|" +
"        ##.$.$$. #|" +
"       ##.$.$$.$##|" +
"      ##.$.$$.$.# |" +
"     ##.$.$$.$.## |" +
"    ##.$.$$.$.##  |" +
"   ##.$.$$.$.##   |" +
"  ##.$.$$.$.##    |" +
" ##.$.$$.$.##     |" +
"##.$.$$.$.##      |" +
"#.$.$$.$.##       |" +
"## $$.$.##        |" +
" #@  $.##         |" +
" ####.##          |" +
"    ###           ";

var nivel_132 = 
"                  #####    |" +
"            ##### #   #    |" +
"            #   ### # #    |" +
"      ##### # #       #    |" +
"##### #   # #   #### ##    |" +
"#   ### # # ### #  # #     |" +
"# #    @  #   # #  # ###   |" +
"#   ####$###### ####   #   |" +
"### #  # .      #    # #   |" +
"  # #  #  ##  #    #   #   |" +
" ## #####  ##    # #####   |" +
" #         ##  ### #       |" +
" # # ### #  #####  # ##### |" +
" #   # #    # #    # #   # |" +
" ##### #  #####  # ### # # |" +
"       # ###  ##         # |" +
"   ##### #    ##  ##### ## |" +
"   #   #    #  ##  #  # #  |" +
"   # #    #        #  # ###|" +
"   #   #### ###### ####   #|" +
"   ### #  # #   #       # #|" +
"     # #  # ### # # ###   #|" +
"    ## ####   # #   # #####|" +
"    #       # # #####      |" +
"    # # ###   #            |" +
"    #   # #####            |" +
"    #####                  ";

var nivel_133 = 
"     ##### ##################     |" +
"    #     #                  #    |" +
"   #  #  #  ################  #   |" +
"  #  #  #  #                #  #  |" +
" #  #  #  #  ##############  #  # |" +
"#  #  #  #  #              #  #  #|" +
"# #  #  #  #  ############  #  # #|" +
"# # #  #  #  #            #  #   #|" +
"# # # #  #  #  ##########  #  #  #|" +
"# # # # #  #  #          #  #  # #|" +
"# # # # # #  #  ########  #  #  # |" +
"# # # # # # #  #        #  #  #  #|" +
"# # # # # # # #  ######  #  #  # #|" +
"# # # # # # # # #      #  #  # # #|" +
"# # # # # # # # # ####  #  # # # #|" +
"# # # # # # # #       #  # # # # #|" +
"# # # # # # #   ## ##  # # # # # #|" +
"# # # # # #  ## ##   # # # # # # #|" +
"# # # # #  #    @.$# # # # # # # #|" +
"# # # #  #  #### # # # # # # # # #|" +
"# # #  #  #      # # # # # # # # #|" +
"# #  #  #  ######  # # # # # # # #|" +
"#  #  #  #        #  # # # # # # #|" +
" #  #  #  ########  #  # # # # # #|" +
"# #  #  #          #  #  # # # # #|" +
"#  #  #  ##########  #  #  # # # #|" +
"#   #  #            #  #  #  # # #|" +
"# #  #  ############  #  #  #  # #|" +
"#  #  #              #  #  #  #  #|" +
" #  #  ##############  #  #  #  # |" +
"  #  #                #  #  #  #  |" +
"   #  ################  #  #  #   |" +
"    #                  #     #    |" +
"     ################## #####     ";

var nivel_134 = 
"            ##### # #####            |" +
"           ##   ######  ##           |" +
"          # #           # #          |" +
"         ##### #######  ####         |" +
"        ##   #  #   ## ##  ##        |" +
"       # #      # # #      # #       |" +
"      ##### ##  ## ##   #  ####      |" +
"     ##   #  ####   ##### ##  ##     |" +
"    # #      # #     # #      # #    |" +
"   ##### ##  ##  #    ##   #  ####   |" +
"  ##   #  ####   # #   ##### ##  ##  |" +
" # #      # #    # #    # #      # # |" +
"##### ##  ##     # # #   ##   #  ####|" +
"#   #  ####   ## #   #    ##### ##  #|" +
"#      # #         # # #   # #      #|" +
"## ##  ##   ######   # #    ##   #  #|" +
"## #####           # #       ##### ##|" +
" # #  #   ### # ## # # #####  #  # # |" +
"## # #            @            # # ##|" +
" # #  #  ##### # # ## # ###   #  # # |" +
"## #####       # #           ##### ##|" +
"#  #   ##    # #   ######   ##  ## ##|" +
"#      # #   # # #         # #      #|" +
"#  ## #####    #   # ##   ####  #   #|" +
"####  #   ##   # # #     ##  ## #####|" +
" # #      # #    # #    # #      # # |" +
"  ##  ## #####   # #   ####  #   ##  |" +
"   ####  #   ##    #  ##  ## #####   |" +
"    # #      # #     # #      # #    |" +
"     ##  ## #####   ####  #   ##     |" +
"      ####  #   ## ##  ## #####      |" +
"       # #      #   #      # #       |" +
"        ##  ## ## # #  #   ##        |" +
"         ####  ## # ## #####         |" +
"          # #   $ # .   # #          |" +
"           ##  ######   ##           |" +
"            ##### # #####            ";

var nivel_135 = 
"          ####                                 |" +
"          #  #          ####                   |" +
"      #####  #          #  #         ####      |" +
"      #   #  #      #####  #         #  #      |" +
"      #     ####    #   #  #     #####  #      |" +
"      ####     #    #     ####   #   #  #      |" +
"         # #   #   #####     #   #     ####    |" +
"         # #####   #   # #   #  #####     #    |" +
"     ##### ##  #####     #####  #   # #   #    |" +
"     #   # ##  #  #####     #####     #####    |" +
"     #     ##  #  #  ## #   #  #####     ####  |" +
"     ####     ##  #  ## #####  #  ## #   #  #  |" +
"       #  ##     ##  ## #####  #  ## #####  #  |" +
"       #  #  ##     ###       ##  ## #####  #  |" +
"       #  #  #  ##       ###     ###       ####|" +
"       ####  #  #  ##### ##  ##       ###     #|" +
"         #####  #  ##### ##  #  ##### ##  #   #|" +
"         #  #####  #   # ##  #  ##### ##  #####|" +
"     #####  #  #####     #####  #   # ##  #    |" +
"     #   #  #  #  #####     #####     #####    |" +
"    ##     #####  #   # #   #  #####     #     |" +
"    #####     #####     #####  #  #  #   #     |" +
"    #  ## #   #  #####     #####  #  #####     |" +
"#####  ## #####  #  ## #   #  #####  #         |" +
"#   #  ## #####  #  ## #####  #  #####         |" +
"#     ###       ##  ## #####  #  #  ####       |" +
"####       ###     ###       ##  #  #  #       |" +
"  #  ##### ##  ##       ###     ##  #  #       |" +
"  #  ##### ##  #  ##### ##  ##     ##  #       |" +
"  #  #   # ##  #  ##### ##  #  ##     ####     |" +
"  ####     #####  #   # ##  #  #  ##     #     |" +
"    #####     #####     #####  #  ## #   #     |" +
"    #   # #   #  #####     #####  ## #####     |" +
"    #     #####  #   # #   #   ##### #         |" +
"    ####     #   #     #####   #   # #         |" +
"      #  #   #   ####     #    #     ####      |" +
"      #  #####     # $#   #    ####     #      |" +
"      #  #         # .#####      #  #   #      |" +
"      ####         # @#          #  #####      |" +
"                   ####          #  #          |" +
"                                 ####          "; 