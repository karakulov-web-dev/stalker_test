var TIMER_RAND_JUMP = 0;

function debug(text) {
	// console.log(text);
	d = new Date();
	text = d.toUTCString()  + '.' + d.getMilliseconds() + ' ' + text;
	$("#debug textarea").val(text + "\n\n" + $("#debug textarea").val())
}

debug.show_timers = function() {
	debug('TIMER = ' + TIMER);
	debug('TIMER_STOP = ' + TIMER_STOP);
	debug('TIMER_TIMELINE = ' + TIMER_TIMELINE);
	debug('TIMER_EPG = ' + TIMER_EPG);
}

debug.toggle = function() {
    1 == localStorage.debug && $("#debug").show()
}

debug.t_ch_rand_jump = function(interval) {

	if(interval == undefined) {
		interval = 5000;
	} else {
		interval = parseInt(interval) * 1000;

		if(interval < 1) {
			interval = 1000;
		}
	}

	debug.t_ch_rand_jump_stop();
	TIMER_RAND_JUMP = setInterval(function() {application.req_media_type = MEDIA_TV; application.cur_ch_id = $('#playlist li:visible:eq(' + (Math.floor((Math.random() * ($('#playlist li:visible').length + 1)) + 1))  + ')').attr('channel_id'); layout.scroll_to_active_ch()}, interval);
}

debug.t_ch_rand_jump_stop = function() {
	clearInterval(TIMER_RAND_JUMP);
}

debug.select_media = function(ratio) {

	if(ratio === undefined) {
		ratio = 0.3;
	}

	var x = Math.random();
	
	console.log('debug.select_media, x = ' + x + ', ratio = ' + ratio);

	if(x > ratio) {
		return MEDIA_TV;
	}
	else {
		return MEDIA_EPG;
	}
}

debug.t_ch_rand_jump2 = function(interval, ratio) {

	if(interval == undefined) {
		interval = 5000;
	} else {
		interval = parseInt(interval) * 1000;

		if(interval < 1) {
			interval = 1000;
		}
	}

	var req_media_type = null;
	var object = null;

	debug.t_ch_rand_jump_stop();

	TIMER_RAND_JUMP = setInterval(function() {

			req_media_type = debug.select_media(ratio);

			if(req_media_type == MEDIA_TV) {
				object = $('#playlist li:visible:eq(' + (Math.floor((Math.random() * ($('#playlist li:visible').length + 1)) + 1))  + ')').attr('channel_id');
			} else {
				object = $('#epg_0 tr.success:eq(' + (Math.floor((Math.random() * ($('#epg_0 tr.success').length + 1)) + 1))  + ')').attr('epg_id');
			}

			application.req_media_type = req_media_type; 

			$('#media_type').attr('type', req_media_type);
			$('#media_type span').text(vlc.playlist.items.count);

			if (req_media_type == MEDIA_TV) {
				application.cur_ch_id = object; 
				layout.scroll_to_active_ch();
			} else {
				application.cur_epg_id = object;
			}
		}, interval);
}
