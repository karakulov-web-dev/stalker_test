var check = {};

check.vlc = function() {

	if(!vlc.playlist || vlc.playlist==null) {
		return false;
	} else {
		return true;
	}
}

check.storage = function() {

	if(typeof(Storage) == "undefined") {
		return false;
	} else {
		return true;
	}
}

check.vlc_version = function(){

	return parseInt(vlc.VersionInfo.replace(/\./g, '').split(' ')[0]);
};

check.vlc_version_check = function() {

	if(check.vlc_version() < VLC_VER_REQ) {
		return false;
	} else {
		return true;
	}
}

check.main = function() {

	if(!check.vlc()){
		alert("Не установлен vlc плагин!\nОзнакомьтесь с порядком установки в разделе 'Помошь'.")
	} else {
		if(!check.vlc_version_check()) {
			alert("Установлена устаревшая версия vlc!\nОзнакомьтесь с порядком установки в разделе 'Помошь'.")
		}
	}
	if(!check.storage()) {
		alert("Ваш брауезр не поддерживает Локальное хранилище!\nОзнакомьтесь с порядком установки в разделе 'Помошь'.");
	}
}

check.browser_ver = (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/);
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();


