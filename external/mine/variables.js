var version='1.0.2',
    pages={
        "back":"../../c/index.html",
        //"referrer":""
    },
    modes= {
        "debug":false,
        "emulate":false,
        "show_all_keydowns":false
    },
    keysBlock = false,
    VKBlock = true,
    keys = {
        "POWER" : 2085,
        "MUTE"  : 2192,
        "MIC"   : 2032,
        "NUM1"  : 49,
        "NUM2"  : 50,
        "NUM3"  : 51,
        "NUM4"  : 52,
        "NUM5"  : 53,
        "NUM6"  : 54,
        "NUM7"  : 55,
        "NUM8"  : 56,
        "NUM9"  : 57,
        "NUM0"  : 48,
        "MENU"  : 122,
        "BACK"  : 8,
        "CHANNEL_PREV"  : 1009,
        "CHANNEL_NEXT"  : 9,
        "EXIT"  : 27,
        "REFRESH"  : 116,
        "UP"    : 38,
        "DOWN"  : 40,
        "LEFT"  : 37,
        "RIGHT" : 39,
        "OK"    : 13,
        "PAGE_NEXT" : 34,
        "PAGE_PREV" : 33,
        "VOL_UP"    : 107,
        "VOL_DOWN"  : 109,
        "RED"    : 112,
        "GREEN"  : 113,
        "YELLOW" : 114,
        "BLUE"   : 115,
        "SERVICES"  : 120,
        "TV"    : 121,
        "PHONE" : 119,
        "WEB"   : 123,
        "REW"   : 2066,
        "FFWD"  : 2070,
        "PLAY"  : 2082,
        "PAUSE" : 2082,
        "CONTINUE" : 2082,
        "STOP"  : 2083,
        "REC"   : 2087,
        "INFO"  : 2089,
        "FRAME" : 117,
        "APP"  : 2076,
        "USB_UNMOUNTED" : 2081,
        "USB_MOUNTED"   : 2080
    },
    stb,
    win = {
        "width":720,
        "height":576
    },
    gs = {
        "account":0,
        "layers":{
            "bg":null,
            "context":null,
            "pointer":null
        },
        "actualSize":576,
        "size":{
            "480":{
                "scr":{
                    "w":360,
                    "h":360
                },
                "cll":{
                    "w":40,
                    "h":40
                }
            },
            "576":{
                "scr":{
                    "w":500,
                    "h":500
                },
                "cll":{
                    "w":31,
                    "h":31
                }
            },
            "720":{
                "scr":{
                    "w":495,
                    "h":495
                },
                "cll":{
                    "w":55,
                    "h":55
                }
            },
            "1080":{
                "scr":{
                    "w":765,
                    "h":765
                },
                "cll":{
                    "w":85,
                    "h":85
                }
            }
        },
        "cells": {
            "x":3,
            "y":3
        },
          "complexity":{
            "easy":
            {
              "x":9,
              "y":9
            } ,
            "normal":{
              "x":12,
              "y":12
            },
            "hard":{
                "x":15,
                "y":15
            }
        },
        "position":{
            "old":{
                "x":0,
                "y":0
            },
            "current":{
                "x":0,
                "y":0
            }
        },
        "move":{
            "selected":false,
            "readyToCheck":false,
            "start":{
                "x":-1,
                "y":-1
            },
            "finish":{
                "x":-1,
                "y":-1
            }
        },
        "coeff":1,
        "balls":null,
        "colors":['red','blue','green','orange','violet','black', 'white'],
        "nextBalls":new Array()
    };