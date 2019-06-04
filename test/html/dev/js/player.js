var player = {
}

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

player.osd_text_show = function(text) {

	if(text == undefined) {
		text = '';
	}
	text = text.replace(/<.*>/i, '');

	vlc.video.marquee.enable();
	vlc.video.marquee.text = text;
}

player.osd_text_hide = function() {
	vlc.video.marquee.disable();
}

player.position_to_time = function(time, position) {

	var position = player.get_position();
	// var position;
	var result;

	if (position === undefined || position <= 0) {
		result = '00:00:00';
	}
	else {
		time *= position;

		var hours = parseInt(time / 3600);
		time -= hours*3600;
		var minutes = parseInt(time / 60)
		time -= minutes*60;
		var seconds = parseInt(time);

		hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
		minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
		seconds = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();

		result = hours + ':' + minutes + ':' + seconds;
	}

	return result;
}

player.play_link2 = function(link) {

	clearTimeout(TIMER_PLAY_DELAY);
	debug('vlc.playlist.stop()');
	vlc.playlist.stop();
	debug('vlc.playlist.items.clear()');
	vlc.playlist.items.clear();
	debug('vlc.playlist.add(link)');
	vlc.playlist.add(link);
	// vlc.playlist.play();
	TIMER_PLAY_DELAY = setTimeout(player.play, PERIOD_PLAY_DELAY);
}

player.play_link = function(link) {

	debug('vlc.playlist.add(link)');
	
	var link_id = null;

	link_id = vlc.playlist.add(link);

	debug('link_id: ' + link_id);
	debug('link: ' + link);

	if(link_id != null) {
		vlc.playlist.playItem(link_id);
	}
	// TIMER_PLAY_DELAY = setTimeout(player.play, PERIOD_PLAY_DELAY);
}

player.play = function(link) {
	debug('vlc.playlist.play()');
	vlc.playlist.play();
}

player.stop = function() {

	vlc.playlist.stop();
	// vlc.playlist.items.clear();
}

player.get_position = function() {
	// debug(vlc.input.position);
	return vlc.input.position;
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

player.fullscreen = function() {
	vlc.video.toggleFullscreen();
}

player.toggleMute = function() {
	vlc.audio.toggleMute();
}

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

player.handle_MediaPlayerTimeChanged	= function() {
	debug('handle_MediaPlayerTimeChanged');
}

player.handle_MediaPlayerPositionChanged = function() {
	debug('handle_MediaPlayerPositionChanged');
}

player.handle_MediaPlayerSeekableChanged = function() {
	debug('handle_MediaPlayerSeekableChanged');
}

player.handle_MediaPlayerPausableChanged	= function() {
	debug('handle_MediaPlayerPausableChanged');
}

player.handle_MediaPlayerMediaChanged = function() {
	debug('handle_MediaPlayerMediaChanged');

	debug("application.stopped_media_position" + application.stopped_media_position);
	application.stopped_media_position && (debug("application.stopped_media_position" + application.stopped_media_position), debug("vlc.input.position = application.stopped_media_position;"), vlc.input.position = application.stopped_media_position, setTimeout(function() {
	application.stopped_media_position = !1
	}, 2E3))
};

player.handle_MediaPlayerTitleChanged = function() {
	debug('handle_MediaPlayerTitleChanged');
}

player.handle_MediaPlayerLengthChanged = function() {
	debug('handle_MediaPlayerLengthChanged');
}

player.handle_MediaPlayerPlaying = function() {
	debug('handle_MediaPlayerPlaying');
}

player.handle_MediaPlayerStopped	= function() {
	debug('handle_MediaPlayerStopped');
}

player.handle_MediaPlayerEndReached = function() {
	debug('handle_MediaPlayerEndReached');
	application.stop();
}

player.handle_MediaPlayerNothingSpecial = function() {
	debug('handle_MediaPlayerNothingSpecial');
}

player.handle_MediaPlayerOpening	= function() {
	debug('handle_MediaPlayerOpening');
}

player.handle_MediaPlayerBuffering = function() {
	debug('handle_MediaPlayerBuffering');
}

player.handle_MediaPlayerPaused = function() {
	debug('handle_MediaPlayerPaused');
	application.stop();
}

player.handle_MediaPlayerForward	= function() {
	debug('handle_MediaPlayerForward');
}

player.handle_MediaPlayerBackward = function() {
	debug('handle_MediaPlayerBackward');
}

player.handle_MediaPlayerEncounteredError = function() {
	debug('handle_MediaPlayerEncounteredError');
	application.stop();
}

var default_position = 0;
var default_volume = 0;

Object.defineProperty(player, 'position', {
	get: function() { return default_position; },
	set: function(newValue) {
		default_position = newValue;
		layout.player_position_test(newValue);
	},
	enumerable: false,
	configurable: true
});

Object.defineProperty(player, 'volume', {
	get: function() { return default_volume; },
	set: function(newValue) {
		default_volume = newValue;
		layout.update_volume_test(newValue);
	},
	enumerable: false,
	configurable: true
});

function Bazinga() {

	var cur_ch_id = null; // id включенного канала 
	var cur_epg_id = null; // id включенной записи отложенного просмотра
	var cur_media_type = null; // тип включнного последний раз источника

	var req_ch_id = null; // тип включнного последний раз источника
	var req_media_type = null; // тип включнного последний раз источника

	var cur_epg_data = null; // 

	var cur_link = null; //

	var cur_ch_name = null; // имя включенного канала 
	var cur_epg_name = null; // имя включенной записи отложенного просмотра
	var cur_ch_logo = null; 

	var cur_epg_start = 0;
	var cur_epg_duration = 0;
	var cur_epg_position = 0;

	var media_status = 5; // коды совпадают с кодами плеера
	var server_error = null;

	var parent_passwd_entered = false;

// 0	 IDLE
// 1	 OPENING
// 2	 BUFFERING
// 3	 PLAYING
// 4	 PAUSED
// 5	 STOPPING
// 6	 ENDED
// 7	 ERROR

	var last_media_id = null; // id включнного последний раз источника
	var last_media_type = null; // тип включнного последний раз источника
	var last_media_position = 0; // позиция источника включнного последний раз 
	
	var stopped_inactive = false;

	var stopped_media_position = 0;

	// var settings = Object.create(null);

	// settings.parent_passwd = "0000";

	// settings.user = null;

	// settings.user.parent_passwd = "0000";

	// var parent_passwd = "0000";

	Object.defineProperty(this, 'settings', {
		value : Object.create(null)
	});

	// this.settings.parent_passwd = "0000";

	// Object.defineProperty(this.settings, 'timers', {
	// 	value : Object.create(null),
	// });

	// this.settings.timers.timer = 0;
	// this.settings.timers.timer_stop = 0;
	// this.settings.timers.timer_timeline = 0;
	// this.settings.timers.timer_epg = 0;
	// this.settings.timers.timer_osd = 0;

	// Object.defineProperty(this, 'parent_passwd', {
	// 	get: function() {
	// 		return this.settings.parent_passwd;
	// 	}
	// });

	Object.defineProperty(this, 'cur_ch_id', {
		get: function() {
			return cur_ch_id;
		},
		set: function(value) {
			// if(this.cur_ch_id != value && this.is_playing) {
			// 	debug('запрошен новый канал: включаем');
			debug('CHANGING cur_ch_id from ' + this.cur_ch_id + ' to ' + value);

			if(value) {

				layout.hide_passwd();

				this.req_ch_id = value;

				var go_fwd = false;

				if(this.is_censored(value) && !NOCENZ) {

					go_fwd = this.check_passwd(this.parent_passwd_entered);
					debug('go_fwd = ' + go_fwd);

					if(!go_fwd) {
						layout.prompt_passwd();	
					} else {
						layout.hide_passwd();
						application.req_media_type = MEDIA_TV;
					}
					// var passwd = prompt("Введите родительский пароль", "");

					// if(passwd != null) {
					// 	if(this.check_passwd(passwd)) {
					// 		go_fwd = true;
					// 	} else {
					// 		alert('Неверный пароль');
					// 	}
					// }
				}

				if(go_fwd || NOCENZ || !this.is_censored(value)) {

					cur_ch_id = value;

					// this.t_stop_egp_layout();
					// this.t_stop_timeline();

					layout.epg_set_not_loaded();
					layout.epg_show_today();

					layout.current_ch(value);

					// if (storage.get_epg(value, 0)) {
						// debug('get epg from storage');
						// var obj = parse_response(storage.get_epg(ch_id, 0))
					// } else {
						server.get_cur_epg(value, 0);
					// }
					client.get_epg(value, 0);

					this.t_start_egp_layout();

					debug('this.req_media_type = ' + this.req_media_type);

					if(this.req_media_type == MEDIA_TV) {
						server.ch_link(value);
						// this.cur_media_type = MEDIA_TV;
			
						this.last_media_id = value;
						this.last_media_type = MEDIA_TV;
					}

					layout.add_history();
				}
			}

			if(value == null) {
				cur_ch_id = value;
				layout.brand();
			}
			// }
			// else {
			// 	debug('перезапрошен канал, ничего не делаем');
			// }
			

			// this.media_status = 3;
			// layout.scroll_to_ch(value);
		}
	});

	Object.defineProperty(this, 'cur_epg_id', {
		get: function() {
			return cur_epg_id;
		},
		set: function(value) {

			if(this.cur_epg_id != value) {
			// if(1) {

				debug('CHANGING cur_epg_id from ' + this.cur_epg_id + ' to ' + value);

				layout.epg_progress(0);

				if(value || value == null) {

					cur_epg_id = value;

					this.cur_epg_name = $('.epg_table table tr[epg_id=' + value + '] td:last').text();
					this.cur_epg_start = parseInt($('.epg_table table tr[epg_id=' + value + ']').attr('start'));
					this.cur_epg_duration = parseInt($('.epg_table table tr[epg_id=' + value + ']').attr('duration'));

					if(this.req_media_type == MEDIA_EPG) {
						server.epg_link(value);
						this.last_media_id = this.cur_epg_id;
						this.last_media_type = MEDIA_EPG;
					}
				}
				if(value == null) {
					this.cur_epg_name = '';
					this.cur_epg_start = 0;
					this.cur_epg_duration = 0;
				}
			}
		}
	});

	Object.defineProperty(this, 'prev_epg_id', {
		get: function() {
			return $('[epg_id=' + application.cur_epg_id + ']').prev().attr('epg_id');
		}
	});

	Object.defineProperty(this, 'next_epg_id', {
		get: function() {
			return $('[epg_id=' + application.cur_epg_id + ']').next().attr('epg_id');
		}
	});

	Object.defineProperty(this, 'cur_link', {
		get: function() {
			return cur_link;
		},
		set: function(value) {
			debug('CHANGING cur_link from ' + this.cur_link + ' to ' + value);
			cur_link = value;
			debug('cur_link value.length ' + value);

			if(/*this.media_status == 3 &&*/ value) {
				debug('cur_link ' + value);
				this.play();
			}
		}
	});

	Object.defineProperty(this, 'cur_media_type', {
		get: function() {
			return cur_media_type;
		},
		set: function(value) {
			debug('CHANGING cur_media_type from ' + this.cur_media_type + ' to ' + value);
			cur_media_type = value;
			layout.progress_color(value);
			switch (value) {
				case MEDIA_EPG:
					this.t_start_timeline();
					// this.t_stop_egp_layout();
					player.controls(0, 0, 1, 1);
					break;
				case MEDIA_TV:
					this.t_start_timeline();
					// this.t_start_egp_layout();
					player.controls(0, 0, 1, 0);
					break;
				default:
					this.t_stop_timeline();
					layout.epg_time();
					player.controls(1, 0, 0, 0);
			}
		}
	});

	Object.defineProperty(this, 'req_media_type', {
		get: function() {
			return req_media_type;
		},
		set: function(value) {
			debug('CHANGING req_media_type from ' + this.req_media_type + ' to ' + value);
			req_media_type = value;
		}
	});

	Object.defineProperty(this, 'req_ch_id', {
		get: function() {
			return req_ch_id;
		},
		set: function(value) {
			debug('CHANGING req_ch_id from ' + this.req_ch_id + ' to ' + value);
			req_ch_id = value;
		}
	});

	// this.update_position = function() {
	// 	debug('update_position');
	// 	this.last_media_position = player.get_position();
	// };

	Object.defineProperty(this, 'update_position', {
		value: function() {
			// debug('update_position');
			// debug(Object.getOwnPropertyNames(this));
			this.last_media_position = player.get_position();
		}
	});

	Object.defineProperty(this, 'epg_progress', {
		value: function() {
			// debug('update_position');
			// debug(Object.getOwnPropertyNames(this));
			this.update_position();
			client.epg_progress_layout();
		}
	});

	Object.defineProperty(this, 'media_status', {
		get: function() {
			return media_status;
		},
		set: function(value) {
			debug('CHANGING media_status from ' + this.media_status + ' to ' + value);
			media_status = value;
		}
	});

	Object.defineProperty(this, 'last_media_position', {
		get: function() {
			return last_media_position;
		},
		set: function(value) {
			// debug('CHANGING last_media_position from ' + this.last_media_position + ' to ' + value);
			last_media_position = value;
			// layout.position(value);
			// layout.epg_progress(value);
		}
	});

    Object.defineProperty(this, "stopped_media_position", {
        get: function() {
            return stopped_media_position
        },
        set: function(value) {
            stopped_media_position = value;
        }
    });

	Object.defineProperty(this, 'server_error', {
		get: function() {
			return server_error;
		},
		set: function(value) {
			debug('CHANGING server_error from ' + this.server_error + ' to ' + value);
			if(this.server_error != 401 && value == 401) {
				layout.auth_progress_show();
				setTimeout(this.auth.bind(this, true), 1000);
			} else {
				layout.auth_progress_hide();
			}
			server_error = value;
			debug('server error: ' + value);
		}
	});

	Object.defineProperty(this, 'stopped_inactive', {
		get: function() {
			return stopped_inactive;
		},
		set: function(value) {
			debug('CHANGING stopped_inactive from ' + this.stopped_inactive + ' to ' + value);
			stopped_inactive = value;
		}
	});

	Object.defineProperty(this, 'last_media_id', {
		get: function() {
			return last_media_id;
		},
		set: function(value) {
			debug('CHANGING last_media_id from ' + this.last_media_id + ' to ' + value);
			last_media_id = value;
		}
	});

	Object.defineProperty(this, 'last_media_type', {
		get: function() {
			return last_media_type;
		},
		set: function(value) {
			debug('CHANGING last_media_type from ' + this.last_media_type + ' to ' + value);
			last_media_type = value;
		}
	});

	// Object.defineProperty(this, 'cur_epg_data', {
	// 	get: function() {
	// 		return cur_epg_data;
	// 	},
	// 	set: function(value) {
	// 		cur_epg_data = value;
	// 		layout.epg(value, 0);
	// 	}
	// });

	Object.defineProperty(this, 'cur_epg_name', {
		get: function() {
			return cur_epg_name;
		},
		set: function(value) {
			// debug('CHANGING cur_epg_name from ' + this.cur_epg_name + ' to ' + value);
			cur_epg_name = value;
			layout.cur_epg_name(value);
		}
	});

	Object.defineProperty(this, 'cur_epg_start', {
		get: function() {
			return cur_epg_start;
		},
		set: function(value) {
			// debug('CHANGING cur_epg_start from ' + this.cur_epg_start + ' to ' + value);
			cur_epg_start = value;
		}
	});

	Object.defineProperty(this, 'cur_epg_duration', {
		get: function() {
			return cur_epg_duration;
		},
		set: function(value) {
			// debug('CHANGING play from ' + this.cur_epg_duration + ' to ' + value);
			cur_epg_duration = value;
			layout.epg_progress(this.cur_epg_position);
			layout.epg_history_item();
		}
	});

	Object.defineProperty(this, 'cur_epg_position', {
		get: function() {
			if(this.cur_epg_id) {
				if(req_media_type != null) {
					if(this.req_media_type == MEDIA_TV) {
						return (my_date.now() - parseInt(this.cur_epg_start) ) / parseInt(this.cur_epg_duration);		
					} else {
						return this.last_media_position;
					}
				} else {
					if(this.cur_media_type == MEDIA_TV) {
						return (my_date.now() - parseInt(this.cur_epg_start) ) / parseInt(this.cur_epg_duration);		
					} else {
						return this.last_media_position;
					}
				}

			} else {
				return false;
			}
		}
		// writable: false,
	});


	Object.defineProperty(this, 'cur_epg_timeframe', {
		get: function() {
			return my_date.toTimeString(this.cur_epg_start) + ' - ' + my_date.toTimeString(this.cur_epg_start + this.cur_epg_duration);
		}
	});

	// Object.defineProperty(this, 'is_censored', {
	// 	get: function() {
	// 		if($('[channel_id=' + this.cur_ch_id + ']').attr('censored') == "1") {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	},
	// });

	Object.defineProperty(this, 'cur_ch_name', {
		get: function() {
			return $('#playlist [channel_id=' + this.cur_ch_id + ']').text();
		}
		// set: function(value) {
		// 	debug('CHANGING cur_ch_name from ' + this.cur_ch_name + ' to ' + value);
		// 	cur_ch_name = value;
		// }
	});

	Object.defineProperty(this, 'cur_ch_logo', {
		get: function() {
			return $('#playlist [channel_id=' + this.cur_ch_id + ']').attr('logo');
		}
	});

	Object.defineProperty(this, 'is_playing', {
		get: function() {
			debug(this.cur_media_type);
			if(this.cur_media_type != null) {
				return true;
			}
			else {
				return false;
			}
		}
	});

	Object.defineProperty(this, 'is_auth', {
		get: function() {
			if(server.user_id !== null && server.access_token !== null) {
				return true;
			}
			else {
				return false;
			}
		}
	});

	Object.defineProperty(this, 'parent_passwd_entered', {
		get: function() {
			return parent_passwd_entered;
		},
		set: function(value) {
			debug('CHANGING parent_passwd_entered from ' + this.parent_passwd_entered + ' to ' + value);
			parent_passwd_entered = value;
		}
	});

	Object.defineProperty(this, 'position_time', {
		get: function() {

			var position;

			switch (this.cur_media_type) {
				case MEDIA_TV:
					position = this.cur_epg_position;
					break;
				case MEDIA_EPG:
					position = this.last_media_position;
					break;
				default:
					position = 0;
			}
		// debug('position ' + position);

		// debug('this.cur_epg_duration * position ' + (this.cur_epg_duration * position));
			return my_date.seс_to_time(this.cur_epg_duration * position);
		}
	});

	// Object.defineProperty(this, 'parent_passwd', {
	// 	get: function() {
	// 		return parent_passwd;
	// 	},
	// 	set: function(value) {
	// 		parent_passwd = value;
	// 	}
	// });

	this.is_censored = function(ch_id) {
		if($('[channel_id=' + ch_id + ']').attr('censored') == "1") {
			return true;
		} else {
			return false;
		}
	};

	this.check_passwd = function(passwd) {
		if(parseInt(1 + passwd) === 1E4) {
			return true;
		} else {
			return false;
		}
	};

	this.get_ch_list = function() {
		server.get_ch_list();
	}

	this.auth = function (force) {
		debug('calling this.auth');
		server.auth(force);
	}

	this.pre_auth = function () {
		debug('calling this.pre_auth');
		if(storage.get_login() == undefined && storage.get_passwd() == undefined) {
			layout.login_error();
			// server.get_users_list();
		}
		else {
			this.auth();
		}
	}

	this.init_post = function () {
		debug('this.init_post ' + this.server_error);

		if(this.is_auth) {
			this.ping();
			this.get_ch_list();
			this.t_start_periodic();
			// client.epg_layout_periodic_start();
		}
		else {
			debug('this.init_post failed');
		}
	}

	this.ping = function() {
		debug('this.ping');
		server.ping();
	};

	this.get_msg = function() {
		debug('this.get_msg');
		server.get_msg();
	}

	this.periodic = function() {

		debug('this.periodic ' +  my_date.now());
		if(this.is_auth) {
			this.ping();
			this.get_msg();
		}
	}

	this.play = function() {
		debug('this.play');
		this.cur_media_type = this.req_media_type;
		this.req_media_type = null;
		this.req_ch_id = null;
		this.stopped_inactive = false;
		// debug(Object.getOwnPropertyNames(this));
		this.media_info_upd();
		player.play_link(this.cur_link);
	};

	// this.stop = function() {

	// 	debug('this.stop');

	// 	this.cur_ch_id = null;
	// 	this.cur_epg_id = null;

	// 	this.cur_media_type = null;
	// 	this.cur_link = null;
	// 	this.cur_epg_name = '';

	// 	layout.position(0);
	// 	layout.epg_progress(0);

	// 	if(player.get_state() == 3) {
	// 		player.stop();

	// 		this.media_info_del();

	// 		// if(inactive_flag) {
	// 		// 	stopped_inactive = true;
	// 		// }
	// 	}
	// };

    this.stop = function() {
        debug("this.stop");

        this.stopped_media_position = this.last_media_position;
        this.cur_link = this.cur_media_type = this.cur_epg_id = this.cur_ch_id = null;
        this.cur_epg_name = "";
        layout.position(0);
        layout.epg_progress(0);

		if(player.get_state() == 3) {
			player.stop();
			this.media_info_del();
		}
    };

	// this.resume_stoped = function() {
	// 	debug('this.resume_stoped ');
	// 	if(this.last_media_id != null && this.last_media_type != null) {

	// 		this.req_media_type = this.last_media_type;

	// 		if(this.last_media_type == MEDIA_TV) {
	// 			this.cur_ch_id = this.last_media_id;
	// 		} else {
	// 			if(this.last_media_type == MEDIA_EPG) {
	// 				this.cur_epg_id = this.last_media_id;
	// 			}
	// 		}
	// 	}
	// }

    this.resume_stoped = function() {
        debug("this.resume_stoped ");
        null != this.last_media_id && null != this.last_media_type && (debug("application.req_media_type = application.last_media_type;"), this.req_media_type = this.last_media_type,
            this.last_media_type == MEDIA_TV ? (debug("application.last_media_type == MEDIA_TV"), this.cur_ch_id = this.last_media_id) : this.last_media_type == MEDIA_EPG && (debug("application.last_media_type == MEDIA_EPG"), this.cur_epg_id = this.last_media_id, debug("application.cur_epg_id " + this.cur_epg_id), debug("application.last_media_id " + this.last_media_id), debug("application.cur_epg_id = application.last_media_id " + (this.cur_epg_id = this.last_media_id))))
    };

	this.stop_inactive = function() {

		debug('this.stop_inactive');
		this.stop();
		this.t_stop_periodic();
		this.stopped_inactive = true;
	};

	this.get_epg = function(ch_id, shift) {
		debug('get_epg ch_id = ' + ch_id + ', shift = ' + shift);
		shift = parseInt(shift);

		if (shift == 0 && storage.get_epg(ch_id, shift)) {
			debug('get epg from storage');
			var obj = parse_response(storage.get_epg(ch_id, shift));
			layout.epg(obj.results, shift);
		}
		else {
			server.get_epg(ch_id, shift);
		}
	};

	this.fullscreen = function() {
		player.fullscreen();
	}

	this.toggleMute = function() {
		player.toggleMute();
	}

	this.t_start_periodic = function() {
		debug('t_start_periodic');
		$('#TIMER_PERIODIC').addClass('btn-danger');
		// this.periodic.call(this);
		clearInterval(TIMER);
		TIMER = setInterval(this.periodic.bind(this), PERIOD_PING);
	}

	this.t_stop_periodic = function() {
		$('#TIMER_PERIODIC').removeClass('btn-danger');
		debug('t_stop_periodic');
		clearInterval(TIMER);
	}

	this.t_stop_inactive = function() {
		debug('t_stop_inactive');
		$('#TIMER_STOP').removeClass('btn-danger');
		TIMER_STOP = setTimeout(this.stop_inactive.bind(this), PERIOD_STOP);
	}

	this.t_start_egp_layout = function() {
		debug('start_egp_layout');
		$('#TIMER_EPG').addClass('btn-danger');
		clearInterval(TIMER_EPG);
		TIMER_EPG = setInterval(client.epg_layout, PERIOD_EPG);
	};

	this.t_stop_egp_layout = function() {
		debug('stop_egp_layout');
		$('#TIMER_EPG').removeClass('btn-danger');
		clearInterval(TIMER_EPG);
	};

	this.t_start_timeline = function() {
		debug('t_start_timeline');
		$('#TIMER_TIMELINE').addClass('btn-danger');
		clearInterval(TIMER_TIMELINE);
		TIMER_TIMELINE = setInterval(this.epg_progress.bind(this), PERIOD_TIMELINE);
	};

	this.t_stop_timeline = function() {
		debug('t_stop_timeline');
		$('#TIMER_TIMELINE').removeClass('btn-danger');
		clearInterval(TIMER_TIMELINE);
	};

	// Object.defineProperty(this, 't_start_timeline', {
	// 	value: function() {
	// 		debug('t_start_timeline');
	// 		TIMER_TIMELINE = setInterval(this.update_position, PERIOD_TIMELINE);
	// 	},
	// });

	this.media_info_upd = function() {
		debug('media_info_upd cur_ch_id = ' + this.cur_ch_id);
		if(!NOSTAT) {
			debug('media_info_upd cur_ch_id = ' + this.cur_ch_id);
			server.media_info_upd(this.cur_ch_id, this.cur_media_type);	
		}
	}

	this.media_info_del = function() {
		debug('media_info_del');
		server.media_info_del();
	}
}
