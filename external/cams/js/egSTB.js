/*
*  object emulation gSTB class
* */
var egSTB = {
    "InitPlayer": function() {
        log("InitPlayer()");
    },
    "Play": function(url) {
        log("Play(" +url + ")");
    },
    "Stop": function() {
        log("Stop()");
    },
    "Continue": function() {
        log("Continue()");
    },
    "Pause": function() {
        log("Pause()");
    },
    "EnableSetCookieFrom": function(domain, state) {
        log("EnableSetCookieFrom('" + domain + "', '" + state.toString() + "')");
    },
    "RDir":function(value) {
        log("RDir('" + value + "')");
    },
    "ShowVirtualKeyboard":function() {
        log("ShowVirtualKeyboard()");
    },
    "HideVirtualKeyboard":function() {
        log("HideVirtualKeyboard()");
    },
    "SetTopWin":function(value){
        log("SetTopWin('" + value + "')");
    },
    "ExecAction":function(value) {
        log("ExecAction('" + value + "')");
    },
    "GetPosTime":function(value) {
        log("GetPosTime('" + value + "')");
    },
    "SetPosTime":function(value) {
        log("SetPosTime('" + value + "')");
    },
    "GetPosTimeEx":function(value) {
        log("GetPosTimeEx('" + value + "')");
    },
    "SetPosTimeEx":function(value) {
        log("SetPosTimeEx('" + value + "')");
    }
}