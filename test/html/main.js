var server = {
	access_token: null,
	expires_in: null,
	user_id: null,
	refresh_token: null,
	api_url: "http://v2.api.ark.rikt.ru",
	auth_url: "http://212.77.128.205/stalker_portal/auth/token.php"
}

var client = {}

var storage = {}

var layout = {}

var player = {}

layout.scroll_to_ch = function (ch_id) {
	$('#playlist').parent().scrollTop($('[channel_id=' + ch_id + ']').offset().top - 40*2 + $('#playlist').parent().scrollTop())
}

layout.login_error = function (text) {
	$('#modal_credentials [role=alert]').text(text);
	$('#modal_credentials').modal('show');
}

layout.get_ch_list =  function(obj_results) {

	$("#playlist").empty();

	$.each(obj_results, function() {
		$("#playlist").append('<li channel_id="' + this.id + '" ><a href="#">' + this.name + '</a></li>');

		$("#playlist > li").last().click(function () {
			$(this).play_ch();
			// debug('layout.get_ch_list:' + $(this));
		});
	});
}

layout.current_ch = function(ch_id) {
	$('#current_ch_name').text($('[channel_id=' + ch_id + ']').text());
	$('[channel_id].active').removeClass('active');
	$('[channel_id=' + ch_id + ']').addClass('active');
}


layout.epg_next = function (epg_obj) {

	$('.page-header').text(epg_obj[0].name);

	// $.each(epg_obj, function() {

	// 	debug('layout.epg_next result: ' + this.id + ' ' + this.name);

	// 	$('#epg tbody').append('<tr epg_id="' + this.id +  '"><td>' + my_date.toTimeString(this.start) + '</td><td>' + my_date.toTimeString(this.end) + '</td><td>' + this.name + '</td></tr>');

	// 	$("#epg tbody tr").last().click(function () {
	// 		debug('play_epg event');
	// 		$(this).play_epg();
	// 	});
	// });
}

layout.epg = function (epg_obj) {

	$('#epg tbody').empty();

	$.each(epg_obj, function() {

		// debug('layout.epg result: ' + this.id + ' ' + this.name);

		$('#epg_tabs .active .epg_table tbody').append('<tr epg_id="' + this.id +  '"><td>' + my_date.toTimeString(this.start) + '</td><td>' + my_date.toTimeString(this.end) + '</td><td>' + this.name + '</td></tr>');

		$('#epg_tabs .active .epg_table tbody tr').last().click(function () {
			debug('play_epg event');
			$(this).play_epg();
		});
	});
}

layout.update_volume = function () {
	$('#player_volume').val(player.get_volume());
	debug('layout.update_volume ' + player.get_volume());
}

storage.save_login = function(login) {
	localStorage.login = login;
	return true;
}

storage.save_passwd = function(passwd) {
	localStorage.passwd = passwd;
	return true;
}

storage.get_login = function() {
	return localStorage.login;
}

storage.get_passwd = function() {
	return localStorage.passwd;
}

storage.save_ch_id = function (ch_id) {
	sessionStorage.current_channel = ch_id;
}

storage.get_ch_id = function (ch_id) {
	return sessionStorage.current_channel;
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
					save_access_token(data.access_token);
					save_user_id(data.user_id);
					client.init_post();
				}
				// server.request();
			}
		);
	}
	else {
		server.access_token = localStorage.access_token;
		server.user_id = localStorage.user_id;
		client.init_post();
	}
}

server.request = function(url) {

	try {
		var request = getXmlHttp();
		request.open('GET', url);
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

//

player.vlc_ready = function () {
	player.register_event("MediaPlayerPlaying", player.handle_playing);
}

player.handle_playing = function () {
	debug('player.handle_player_playing 1');
	debug('player.get_state: ' + player.get_state());
	layout.update_volume();
	debug('player.handle_player_playing 2');
}

dummy = function () {
	debug('player.handle_player_playing');
}

player.register_event = function (event, handler)
{
	// var vlc = getVLC("vlc");

	if (vlc) {
		debug('player.register_event');
		if (vlc.attachEvent) {
			// Microsoft
			vlc.attachEvent (event, handler);
		} else if (vlc.addEventListener) {
			// Mozilla: DOM level 2
			vlc.addEventListener (event, handler, true);
		} else {
			// DOM level 0
			eval("vlc.on" + event + " = handler");
		}
	}
}

player.unregister_event = function (event, handler)
{
	// var vlc = getVLC("vlc");

	if (vlc) {
		if (vlc.detachEvent) {
			// Microsoft
			vlc.detachEvent (event, handler);
		} else if (vlc.removeEventListener) {
			// Mozilla: DOM level 2
			vlc.removeEventListener (event, handler, true);
		} else {
			// DOM level 0
			eval("vlc.on" + event + " = null");
		}
	}
}

player.get_volume = function () {
	return vlc.audio.volume;
}

player.update_volume = function (val) {
	vlc.audio.volume = parseInt(val);
}

//

client.check_credentials = function() {

	if(localStorage.login == undefined || localStorage.passwd == undefined) {
		return false;
	}
	else {
		return true;
	}
}

client.update_credentials = function () {
	storage.save_login($('#user_login').val());
	storage.save_passwd($('#user_pass').val());
}

client.save_value = function (field, value) {
	localStorage.field = value;
	return true;
}

function getXmlHttp() {
	if (typeof XMLHttpRequest === 'undefined') {
		XMLHttpRequest = function() {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
				catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
				catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP"); }
				catch(e) {}
			try { return new ActiveXObject("Microsoft.XMLHTTP"); }
				catch(e) {}
			throw new Error("This browser does not support XMLHttpRequest.");
		};
	}
	return new XMLHttpRequest();
}

function parse_response(responseText) {

	// console.log('parse_response responseText: ' + responseText.split('osd_title')[0] + '"}');
	debug('parse_response responseText:' + responseText);

	try {

		var json = jQuery.parseJSON(responseText);

		if (json.error !== undefined) {
			console.log('parse_response error: ' + responseText);
			return false;
		}
		else {
			return json;
		}
	}
	catch (e) {
		console.log('parse_response parseJSON error: ' + e);
		return false;
	}
}

function test3 () {
	parse_response($('textarea').val());
}

function check_request_status(request) {

	if (request.status == 200) {
		return true;
	}
	else {
		// server.auth(force);
		$('#response_status').text(request.status);
		return request.status;
	}
}

function debug(text) {
	console.log(text);
	// $('textarea').text(text);
}

function function_name(fun) {
	var ret = fun.toString();
	ret = ret.substr('function '.length);
	ret = ret.substr(0, ret.indexOf('('));
	return ret;
}

function test2() {

	var request = server.request();

	request.onreadystatechange = function () {

		if(request.status == 401) {
			server.auth(true);
		}

		if (request.readyState == 4 && request.status == 200) {

			var obj = parse_response(request.responseText);

			$.each(obj.results, function() {
				$("#playlist").append('<li channel_id="' + this.id + '"">' + this.name);

				$("#playlist > li").last().click(function () {
					$(this).play_ch();
				});
			});
		}
	};
	request.send(null);
}

var my_date = {};

// my_date.midnigth = function (shift) {

// 	if(shift === undefined) {
// 		shift = 0;
// 	}

// 	var unixtime = Math.round(+new Date()/1000);
// 	var d = new Date();

// 	var hours = d.getHours();
// 	var minutes = d.getMinutes();
// 	var seconds = d.getSeconds();

// 	var midnigth = unixtime - (shift * 86400 + hours * 3600 + minutes * 60 + seconds);

// 	return midnigth;
// }

my_date.midnigth = function (shift) {

	if(shift === undefined) {
		shift = 0;
	}

	var d = new Date();

	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();

	var midnigth = Math.round(+new Date(year, month, date + shift)/1000);

	return midnigth;
}

my_date.toTimeString = function (date) {

	var unixtime = new Date(date * 1000);

	var hours = unixtime.getHours();
	var minutes = unixtime.getMinutes();

	hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
	minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();

	var time = hours + ':' + minutes;

	return time;
}

// function todate() {

// 	var unixtime = Math.round(+new Date()/1000);
// 	var d = new Date();

	
// 	var hours = d.getHours();
// 	var minutes = d.getMinutes();
// 	var seconds = d.getSeconds();

// 	console.log(hours);
// 	console.log(minutes);
// 	console.log(seconds);

// 	var midnigth = unixtime - (hours * 3600 + minutes * 60 + seconds);
// 	console.log(midnigth);
// }

client.init = function() {
//	server.auth();
//	client.ping();
}

client.init_post = function() {
	client.get_ch_list();
}

client.get_ch_list =  function() {

	url = server.api_url + "/users/" + server.user_id + "/tv-channels";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				layout.get_ch_list(obj.results);
			}
		}
		else {
			debug('get_ch_list: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

client.ping =  function() {

	url = server.api_url + "/users/" + server.user_id + "/ping";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (request.readyState == 4) {
			if (check_request_status(request) === true) {
				debug('ping ok');
			}
			else {
				debug('ping: error: ' + request.status);
				if (request.status == 401) {
					server.auth(true);
					debug('force server.auth()' + request.readyState);
				}
			}
		}
	};
	request.send(null);
}

client.get_epg_next =  function(ch_id, next) {

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

client.get_epg =  function(ch_id, shift) {

	from_time = my_date.midnigth(shift);
	to_time = my_date.midnigth(shift + 1);

	url = server.api_url + "/tv-channels/" + ch_id + "/epg?from=" + from_time + "&to=" + to_time;

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = jQuery.parseJSON(request.responseText);

				layout.epg(obj.results);
			}
		}
		else {
			debug('get_epg: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}


client.get_epg_link =  function(program_id) {

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

player.play_link = function(link) {

	vlc.playlist.items.clear();
	vlc.playlist.stop();
	vlc.playlist.add(link);
	vlc.playlist.play();
}

player.play = function(link) {

	vlc.playlist.play();
}

player.stop = function(link) {

	vlc.playlist.items.clear();
	vlc.playlist.stop();
}

client.play_ch = function(ch_id) {   

	storage.save_ch_id(ch_id);
	url = server.api_url + "/users/" + server.user_id + "/tv-channels/" + ch_id + "/link";

	try {
		var request = getXmlHttp();
		request.open('GET', url);
		request.setRequestHeader('Accept', "application/json");
		request.setRequestHeader('Accept-Language', "ru-RU");
		request.setRequestHeader('Authorization', "Bearer " + server.access_token);

		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}
		request.onreadystatechange = function () {

			if(request.status == 401) {
				server.test(ch_id);
			}

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				console.log(request.responseText);
				player.play_link(obj.results);
				layout.current_ch(ch_id);
				client.get_epg(ch_id, 0);
			}
		};
		request.send(null);
	} catch (e) {
		alert("Ошибка: "+ e);
		return;
	}
}

client.play_epg =  function(program_id) {

	url = server.api_url + "/epg/" + program_id + "/link";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				console.log(request.responseText);
				player.play_link(obj.results);
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

player.get_state = function () {
// 0	 IDLE
// 1	 OPENING
// 2	 BUFFERING
// 3	 PLAYING
// 4	 PAUSED
// 5	 STOPPING
// 6	 ENDED
// 7	 ERROR
	return vlc.input.state;
}

player.controls = function (play, pause, stop, skip) {
	
	if(play == 1) {
		$('#play_btn').removeClass('disabled');
	}
	else {
		$('#play_btn').addClass('disabled');
	}

	if (pause == 1) {
		$('#pause_btn').removeClass('disabled');
	}
	else {
		$('#pause_btn').addClass('disabled');
	}

	if (stop == 1) {
		$('#stop_btn').removeClass('disabled');
	}
	else {
		$('#stop_btn').addClass('disabled');
	}

	if (skip == 1) {
		$('#player_position').removeAttr('disabled');
	}
	else {
		$('#player_position').attr('disabled', 'disabled');
	}

	return true;
}

$.fn.play_ch = function() {
	client.play_ch($(this).attr('channel_id'));
}

$.fn.play_epg = function() {
	client.play_epg($(this).attr('epg_id'));
}

function save_access_token(token) {
	if(typeof(Storage) !== "undefined") {
		localStorage.access_token = token;
	} else {
		console.log('Sorry! No Web Storage support...');
	}
}

function save_user_id(id) {
	if(typeof(Storage) !== "undefined") {
		localStorage.user_id = id;
	} else {
		console.log('Sorry! No Web Storage support...');
	}
}

function stop() {
	projekktor('#player_a').setStop();
}

var screenListener = function(value) {
	console.log('current_channel: ' + sessionStorage.current_channel);
	// projekktor('#player_a').setStop();
	// server.test(sessionStorage.current_channel);
}

function full () {
	projekktor('#player_a').setStop();
	projekktor('#player_a').setFullscreen();
	server.test(sessionStorage.current_channel);
}

$(document).ready(function() {
	// server.auth();
	// server.request();

	$('#play_btn').click(function(){
		player.play();
	})

	$('#stop_btn').click(function(){
		player.stop();
	})

	// $('#setfullscreen').click(function(){
	// 	projekktor('#player_a').setStop();
	// 	projekktor('#player_a').setFullscreen();
	// 	server.test(sessionStorage.current_channel);
	// 	return false;
	// })

	$('#save_credentials').click(function(){
		client.update_credentials();
		server.auth(true);
	})

	$('#modal_credentials').on('hidden.bs.modal', function (e) {
		debug('modal_credentials is hidden');

		if (!client.check_credentials()) {
			$('#modal_credentials').modal('show');
		}
	})

	if (!client.check_credentials()) {
		$('#modal_credentials').modal('show');
	}

	if(localStorage.debug === undefined) {
		client.init();
	}

	$('#player_position').change(function(){
		debug('player_position' + $('#player_position').val());
		vlc.input.position = parseInt($('#player_position').val())/100;
	})

	$('#player_volume').change(function(){
		debug('player_volume' + $('#player_volume').val());
		player.update_volume($('#player_volume').val());
	})
	

});
