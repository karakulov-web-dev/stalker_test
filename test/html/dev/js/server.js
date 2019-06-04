var _0x5693=["\x68\x74\x74\x70\x3A\x2F\x2F\x76\x32\x2E\x61\x70\x69\x2E\x61\x72\x6B\x2E\x72\x69\x6B\x74\x2E\x72\x75","\x68\x74\x74\x70\x3A\x2F\x2F\x32\x31\x32\x2E\x37\x37\x2E\x31\x32\x38\x2E\x32\x30\x35\x2F\x73\x74\x61\x6C\x6B\x65\x72\x5F\x70\x6F\x72\x74\x61\x6C\x2F\x61\x75\x74\x68\x2F\x74\x6F\x6B\x65\x6E\x2E\x70\x68\x70"];

var server = {
	access_token: null,
	expires_in: null,
	user_id: null,
	refresh_token: null,
	//api_url: "http://v2.api.ts.rikt.ru",
	//auth_url: "http://212.77.128.177/stalker_portal/auth/token.php"
	api_url:_0x5693[0],
	auth_url:_0x5693[1]
}

server.rec = function(ch_id) {

	url = server.api_url + "/users/" + server.user_id + "/tv-channels/" + ch_id + "/record";

	var request = server.request_post(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				// layout.get_ch_list(obj.results);
			}
		}
		else {
			debug('server.rec: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_users_list = function() { // DISABLED

	// url = "http://212.77.128.205/stalker_portal/custom/user_list.php";

	// var request = server.request(url);

	// request.onreadystatechange = function () {

	// 	if (check_request_status(request) === true) {

	// 		if (request.readyState == 4 && request.status == 200) {

	// 			var obj = parse_response(request.responseText);
	// 			layout.users_list(obj.results);
	// 		}
	// 	}
	// 	else {
	// 		debug('get_users_list: check_request_status error: ' + request.status);
	// 	}
	// };
	// request.send(null);
}

server.create_account = function(full_name) {

	url = "http://212.77.128.177/stalker_portal/custom/user_create_nomac.php";

	var request = server.request_post(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				storage.set_login(obj.login);
				storage.set_passwd(obj.password);
				application.auth();
			}
		}
		else {
			debug('get_users_list: check_request_status error: ' + request.status);
		}
	};

	if(full_name != undefined)  {
		request.send('full_name=' + full_name);
	} else {
		request.send(null);
	}
		
}

server.media_info_upd = function(media_id, type) {

	if(type == undefined) {
		type = MEDIA_TV;
	}

	url = server.api_url + "/users/" + server.user_id + "/media-info";

	var request = server.request_post(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
			}
		}
		else {
			debug('server.media_info: check_request_status error: ' + request.status);
		}
	};
	request.send('type=' + type + '&media_id=' + media_id);
}

server.media_info_del = function() {

	url = server.api_url + "/users/" + server.user_id + "/media-info";

	var request = server.request_delete(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
			}
		}
		else {
			debug('server.media_info: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.fav_add = function(ch_id) {

	url = server.api_url + "/users/" + server.user_id + "/tv-favorites";

	var request = server.request_post(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
				layout.fav_add(ch_id);
			}
		}
		else {
			debug('server.fav_add: check_request_status error: ' + request.status);
		}
	};
	request.send("ch_id=" + ch_id);
}

server.fav_del = function(ch_id) {

	url = server.api_url + "/users/" + server.user_id + "/tv-favorites/" + ch_id;

	var request = server.request_delete(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
				layout.fav_del(ch_id);
			}
		}
		else {
			debug('server.fav_del: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.censor = function(ch_id) {

	url = server.api_url + "/users/" + server.user_id + "/tv-channels/censor";
	// url = server.api_url + "/users/" + server.user_id + "/tv-channels/last";

	var request = server.request_put(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				// layout.get_ch_list(obj.results);
			}
		}
		else {
			debug('server.rec: check_request_status error: ' + request.status);
		}
	};
	request.send("ch_id=" + ch_id);
}

server.rec_epg = function(ch_id, epg_id) {

	url = server.api_url + "/users/" + server.user_id + "/tv-channels/" + ch_id + "/epg/" + epg_id + "/record";

	var request = server.request_post(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				// layout.get_ch_list(obj.results);
			}
		}
		else {
			debug('server.rec: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.refresh_token = function() {

	$.post(server.auth_url, {grant_type: "refresh_token", refresh_token: storage.get_refresh_token()}, function(data) {

			if(data.error !== undefined)  {
				debug('server.auth: ' + data.error_description);
				layout.login_error(data.error_description);
			}
			else {
				server.access_token = data.access_token;
				server.expires_in = data.expires_in;
				server.refresh_token = data.refresh_token; 
				server.user_id = data.user_id;

				storage.set_credentials(data);
			}
		}
	);
}

server.auth = function(force) {

	if(localStorage.access_token == undefined || localStorage.user_id == undefined || force == true) {
		$.post(server.auth_url, {grant_type: "password", username: storage.get_login(), password: storage.get_passwd()}, function(data) {

				if(data.error !== undefined)  {
					debug('server.auth: ' + data.error_description);
					layout.login_error(data.error_description);
				}
				else {
					server.access_token = data.access_token;
					server.expires_in = data.expires_in;
					server.refresh_token = data.refresh_token; 
					server.user_id = data.user_id;

					storage.set_credentials(data);
					application.init_post.call(application);
				}
				// server.request();
			}
		);
	}
	else {
		server.user_id = storage.get_user_id();
		server.access_token = storage.get_access_token();
		debug('server.auth: обновление автозации не требуется');
		application.init_post.call(application);
	}
}

server.request = function(url) {

	try {
		var request = getXmlHttp();
		request.open('GET', url);
		request.setRequestHeader('Accept', "application/json");
		request.setRequestHeader('Accept-Language', "ru-RU");
		request.setRequestHeader('Authorization', "Bearer " + server.access_token);
		// request.setRequestHeader('UA-resolution', '120');

		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}

		return request;

	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

server.request_post = function(url) {

	try {
		var request = getXmlHttp();
		request.open('POST', url);
		request.setRequestHeader('Accept', "application/json");
		request.setRequestHeader('Accept-Language', "ru-RU");
		request.setRequestHeader('Authorization', "Bearer " + server.access_token);

		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}

		return request;

	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

server.request_put = function(url) {

	try {
		var request = getXmlHttp();
		request.open('PUT', url);
		request.setRequestHeader('Accept', "application/json");
		request.setRequestHeader('Accept-Language', "ru-RU");
		request.setRequestHeader('Authorization', "Bearer " + server.access_token);

		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}

		return request;

	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

server.request_delete = function(url) {

	try {
		var request = getXmlHttp();
		request.open('DELETE', url);
		request.setRequestHeader('Accept', "application/json");
		request.setRequestHeader('Accept-Language', "ru-RU");
		request.setRequestHeader('Authorization', "Bearer " + server.access_token);

		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}

		return request;

	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

server.get_ch_list = function() {

	url = server.api_url + "/users/" + server.user_id + "/tv-channels";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				layout.get_ch_list(obj.results);
				layout.scroll_to_ch(storage.get_ch_id());
				// layout.authcurrent_ch(storage.get_ch_id());
			}
		}
		else {
			debug('get_ch_list: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_user = function() {

	url = server.api_url + "/users/" + server.user_id;

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
			}
		}
		else {
			debug('get_user_settings: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_msg = function() {

	url = server.api_url + "/users/" + server.user_id + '/message';

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
				client.parse_msg(obj.results, request.responseText);
				// layout.msg(obj.results);
			}
		}
		else {
			debug('get_user_settings: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_tv_genres = function() {

	url = server.api_url + "/tv-genres";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
				storage.set_genres(request.responseText);
			}
		}
		else {
			debug('get_ch_list: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_tv_genres_ch = function(genre_id) {

	url = server.api_url + "/tv-genres/" + genre_id  + "/tv-channels"

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);
			}
		}
		else {
			debug('get_ch_list: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}


server.ping =  function() {

	url = server.api_url + "/users/" + server.user_id + "/ping";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (request.readyState == 4) {
			if (check_request_status(request) === true) {
				debug('ping ok');
			}
			else {
				debug('ping: error: ' + request.status);
				// if (request.status == 401) {
				// 	server.auth(true);
				// 	debug('force server.auth()' + request.readyState);
				// }
			}
		}
	};
	request.send(null);
}

server.get_epg =  function(ch_id, shift) {

	shift = parseInt(shift);

	from_time = my_date.midnigth(shift);
	to_time = my_date.midnigth(shift + 1);

	url = server.api_url + "/tv-channels/" + ch_id + "/epg?from=" + from_time + "&to=" + to_time;

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = jQuery.parseJSON(request.responseText);
				storage.set_epg(ch_id, shift, request.responseText);

				layout.epg(obj.results, shift);

				// if(shift == 0) {
				// 	application.cur_epg_name = $('#epg_0 tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).last().children().last().text();
				// 	// layout.current_epg_name();
				// 	// client.osd_text($('#epg_0 tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).last().children().last().text());
				// }
			}
		}
		else {
			debug('get_epg: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_cur_epg =  function(ch_id) {

	debug('server.get_cur_epg');

	url = server.api_url + "/tv-channels/" + ch_id + "/epg?next=1";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = jQuery.parseJSON(request.responseText);

debug('obj.results.length: ' + obj.results.length);

				if(obj.results.length > 0) {
					application.cur_epg_id = obj.results[0].id;
					application.cur_epg_name = obj.results[0].name;
					application.cur_epg_start = obj.results[0].start;
					application.cur_epg_duration = obj.results[0].end - obj.results[0].start;
				}
				else {
					application.cur_epg_id = null;
					debug('application.cur_epg_id ' + application.cur_epg_id);
					application.cur_epg_name = 'нет программы';
					application.cur_epg_start = null;
					application.cur_epg_duration = 0;
				}
			}
		}
		else {
			debug('get_epg_next: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_epg_next =  function(ch_id, next) {

	url = server.api_url + "/tv-channels/" + ch_id + "/epg?next=" + next;

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = jQuery.parseJSON(request.responseText);

				layout.epg_next(obj.results);
			}
		}
		else {
			debug('get_epg_next: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.get_epg_link =  function(program_id) {

	url = server.api_url + "/epg/" + program_id + "/link";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				console.log(obj.results);
				
				projekktor('#player_a').setFile({ 0:{src: obj.results} });

				projekktor('#player_a').setPlay();
			}
		}
		else {
			debug('get_epg_next: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.request2 = function() {	

	url = server.api_url + "/users/" + server.user_id + "/tv-channels";
	// url = server.api_url + "/users/" + server.user_id + "/tv-channels/2/link";

	try {
		var request = getXmlHttp();
		request.open('GET', url, false);
		request.setRequestHeader('Accept', "application/json");
		request.setRequestHeader('Accept-Language', "ru-RU");
		request.setRequestHeader('Authorization', "Bearer " + server.access_token);

		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}
		request.onreadystatechange = function () {

			if(request.status == 401) {
				server.auth(true);
			}

			if (request.readyState == 4 && request.status == 200) {

				var obj = jQuery.parseJSON(request.responseText);

				$.each(obj.results, function() {
					$("#playlist").append('<li channel_id="' + this.id + '"">' + this.name);

					$("#playlist > li").last().click(function () {
						$(this).play_ch();
					});

					// console.log(this.id + ' ' + this.name);
				});

				// $("#link").attr("href", obj.results);
				// $('source').attr('src', obj.results);

				// projekktor('#player_a').setItem({ 0:{src: obj.results, type: 'video/mp4'} });

				// console.log(obj.results);
			}
		};
		request.send(null);
	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

server.ch_link = function(ch_id) {  

	url = server.api_url + "/users/" + server.user_id + "/tv-channels/" + ch_id + "/link2";
	debug('server.ch_link ' + url);

	try {
		// var request = getXmlHttp();
		// request.open('GET', url);
		// request.setRequestHeader('Accept', "application/json");
		// request.setRequestHeader('Accept-Language', "ru-RU");
		// request.setRequestHeader('Authorization', "Bearer " + server.access_token);

		// if (request.overrideMimeType) {
		// 	request.overrideMimeType('text/html');
		// }
		var request = server.request(url);

		request.onreadystatechange = function () {

			if(request.status == 401) {
				server.test(ch_id);
			}

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				// console.log(request.responseText);
				// player.play_link(obj.results);
				application.cur_link = obj.results;
				// application.play();

				// layout.current_ch(ch_id);
				// client.get_epg(ch_id, 0);
			}
		};
		request.send(null);
	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

server.epg_link =  function(program_id) {

	url = server.api_url + "/epg/" + program_id + "/link";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				application.cur_link = obj.results;
			}
		}
		else {
			debug('get_epg_next: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

// server.get_ch_url = function(ch_id) {

// 	if(projekktor('#player_a').getState() == 'PLAYING') {
// 		stop();
// 	}

// 	url = server.api_url + "/users/" + server.user_id + "/tv-channels/" + ch_id + "/link";
// 	console.log(url);

// 	try {
// 		var request = getXmlHttp();
// 		console.log(url);
// 		request.open('GET', url, false);
// 		request.setRequestHeader('Accept', "application/json");
// 		request.setRequestHeader('Accept-Language', "ru-RU");
// 		request.setRequestHeader('Authorization', "Bearer " + server.access_token);

// 		if (request.overrideMimeType) {
// 			request.overrideMimeType('text/html');
// 		}

// 		projekktor('#player_a').setStop();
// 		projekktor('#player_a').setItem(null);

// 		request.onreadystatechange = function () {

// 			console.log('readyState: ' + request.readyState);
// 			console.log('status: ' + request.status);

// 			if (request.readyState == 4 && request.status == 200) {
// 				var obj = jQuery.parseJSON(request.responseText);

// 				// $("#link").attr("href", obj.results);
// 				// $('source').attr('src', obj.results);

// 				projekktor('#player_a').setItem({ 0:{src: obj.results, type: 'video/mp4'} });
// 				projekktor('#player_a').setPlay();

// 				console.log('onreadystatechange: ' + obj.results);
// 			}
// 		};
// 		request.send(null);
// 		request.abort();
// 	} catch (e) {
// 		alert("Ошибка: "+ e);
// 		return;
// 	}
// }
