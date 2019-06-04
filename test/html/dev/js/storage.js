var storage = {}

storage.set_key = function (key, value, strg_type) {

	if(strg_type == undefined) {
		strg_type = 1;
	}

	if(1) { // здесь проверка на поддержку хранилища
		if(strg_type == 0) {
			sessionStorage.setItem(key, value);
		} else {
			localStorage.setItem(key, value);
		}
	} else {
		return false;
	}
}

storage.del_key = function (key, strg_type) {

	if(strg_type == undefined) {
		strg_type = 1;
	}

	if(1) { // здесь проверка на поддержку хранилища
		if(strg_type == 0) {
			sessionStorage.removeItem(key);
		} else {
			localStorage.removeItem(key);
		}
	} else {
		return false;
	}
}

storage.get_key = function (key, strg_type) {

	if(strg_type == undefined) {
		strg_type = 1;
	}

	if(1) { // здесь проверка на поддержку хранилища
		if(strg_type == 0) {
			return sessionStorage.getItem(key);
		} else {
			return localStorage.getItem(key);
		}
	} else {
		return false;
	}
}

storage.msg_num = function () {
	return Object.keys(localStorage).filter(function(element) {return element.substr(0, 4) == "msg_";}).length;
}

storage.clear_epg = function() {

	$.each(sessionStorage, function(index, value) {
		if(index.substr(0, 9) == "epg_data_") {
			storage.del_key(index, 0);
		}
	});
}

storage.save_login = function(login) {
	localStorage.login = login;
	return true;
}

storage.save_passwd = function(passwd) {
	localStorage.passwd = passwd;
	return true;
}

storage.set_login = function(login) {
	localStorage.login = login;
	return true;
}

storage.set_passwd = function(passwd) {
	localStorage.passwd = passwd;
}

storage.get_login = function() {
	return localStorage.login;
}

storage.get_passwd = function() {
	return localStorage.passwd;
}

storage.save_ch_id = function (ch_id) {
	localStorage.last_ch_id = ch_id;
}

storage.get_ch_id = function () {
	return localStorage.last_ch_id;
}

storage.set_epg = function (ch_id, shift, epg_obj) {
	sessionStorage.setItem("epg_data_" + ch_id + '_' + my_date.get_local_date(shift), epg_obj);
}

storage.get_epg = function (ch_id, shift) {
	var epg;
	epg = sessionStorage.getItem("epg_data_" + ch_id + '_' + my_date.get_local_date(shift));
	if(epg !== null) {
		return epg;
	}
	else {
		return false;
	}
}

// var a = 1;
// var name = 'a';

// document.write(eval(name)); // 1

storage.get_epd_id = function () {
	// if(storage.get_playing_media() == MEDIA_TV) {
	// 	return sessionStorage.playing_media_id;
	// }
	if(storage.get_playing_media() == MEDIA_EPG) {
		return sessionStorage.playing_media_id;
	}
	else {
		return false;
	}
	
}

// storage.set_duration = function(duration) {
// 	sessionStorage.duration = duration;
// }

// storage.get_duration = function(duration) {
// 	return sessionStorage.duration;
// }

storage.set_genres = function(text) {

	localStorage.genres = text;
}

storage.get_genres = function() {
	return localStorage.genres;
}

storage.get_refresh_token = function() {
	return localStorage.refresh_token;
}

// function save_access_token(token) {
// 	if(typeof(Storage) !== "undefined") {
// 		localStorage.access_token = token;
// 	} else {
// 		console.log('Sorry! No Web Storage support...');
// 	}
// }

// function save_user_id(id) {
// 	if(typeof(Storage) !== "undefined") {
// 		localStorage.user_id = id;
// 	} else {
// 		console.log('Sorry! No Web Storage support...');
// 	}
// }

storage.set_credentials = function (obj) {
	localStorage.user_id = obj.user_id;
	localStorage.access_token = obj.access_token;
	localStorage.refresh_token = obj.refresh_token;
}

storage.get_user_id = function() {
	return localStorage.user_id;
}

storage.get_access_token = function() {
	return localStorage.access_token;
}

storage.get_refresh_token = function() {
	return localStorage.refresh_token;
}

storage.set_playing_media = function(media_id, media_type, media_length) {

	if(media_type === undefined) {
		media_type = '';
	}
	if(media_id === undefined) {
		media_id = 0;
	}
	if(media_length === undefined) {
		media_length = 0;
	}
	sessionStorage.playing_media_id = media_id;
	sessionStorage.playing_media_type = media_type;
	sessionStorage.playing_media_length = media_length;
}

storage.set_played_media = function(media_id, media_type, media_length) {

	if(media_type === undefined) {
		media_type = '';
	}
	if(media_id === undefined) {
		media_id = 0;
	}
	if(media_length === undefined) {
		media_length = 0;
	}
	localStorage.played_media_id = media_id;
	localStorage.played_media_type = media_type;
	localStorage.played_media_length = media_length;
}

storage.set_stopped_media = function(media_id, media_type, media_position) {

	// if(media_type === undefined) {
	// 	media_type = '';
	// }
	// if(media_id === undefined) {
	// 	media_id = 0;
	// }
	// if(media_position === undefined) {
	// 	media_position = 0;
	// }

	// переделать с использованием функций get_playing_media

	sessionStorage.stopped_media_id = sessionStorage.playing_media_id;
	sessionStorage.stopped_media_type = sessionStorage.playing_media_type;
	sessionStorage.stopped_media_length = player.get_position();
}

storage.init_stopped_media = function() {
	sessionStorage.stopped_media_id = 0;
	sessionStorage.stopped_media_type = '';
	sessionStorage.stopped_media_length = 0;
}

// storage.set_epg_length = function(epg_program_length) {
// 	sessionStorage.epg_program_length = epg_program_length;
// }

storage.get_media_length = function() {
	return sessionStorage.playing_media_length;
}

storage.get_playing_media = function() {
	return sessionStorage.playing_media_type;
}

storage.init_playing_media = function() {
	storage.set_playing_media();
}

storage.set_stop_inactive = function(flag) {
	sessionStorage.stop_inactive = flag;	
}

storage.get_stop_inactive = function() {
	return sessionStorage.stop_inactive;
}
