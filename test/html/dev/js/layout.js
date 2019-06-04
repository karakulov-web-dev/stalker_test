var layout = {}

layout.scroll_to_ch = function (ch_id) {
	if($('[channel_id=' + ch_id + ']').length > 0) {
		$('#playlist').parent().scrollTop($('[channel_id=' + ch_id + ']').offset().top - 40*2 + $('#playlist').parent().scrollTop());
	}
}

layout.scroll_to_active_ch = function () {
	layout.scroll_to_ch($('#playlist li.active').attr('channel_id'));
}

layout.login_error = function (text) {
	$('#modal_credentials [role=alert]').text(text);
	$('#modal_credentials').modal('show');
}

layout.get_ch_list =  function(obj_results) {

	$("#playlist").empty();

	$.each(obj_results, function() {
		// $("#playlist").append('<li channel_id="' + this.id + '" favorite="' + this.favorite + '" logo="' + this.logo.replace('/320/','/120/') + '"><a href="#">' + this.name + '<span class="ch_fav_icon"><span class="glyphicon glyphicon-align-right" aria-hidden="true"></span><span></a></li>');
		$("#playlist").append('<li channel_id="' + this.id + '" censored="' + this.censored + '" favorite="' + this.favorite + '" logo="' + this.logo.replace('/320/','/120/') + '"><a href="#"><span class="ch_name">' + this.name + '</span><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span></a></li>');

		if(this.favorite == 1) {
			layout.fav_add(this.id);
		}

		$("#playlist > li:last span.ch_name").click(function () {
		// $("#playlist > li").last().click(function () {
			$(this).play_ch();
			// debug('layout.get_ch_list:' + $(this));
		});
		$("#playlist > li:last span.glyphicon").click(function () {
			$(this).fav_toggle();
		});
	});
}

layout.current_ch = function(ch_id) {
	$('#current_ch_name').text(application.cur_ch_name);
	$('#current_ch_name').prepend('<img border="0" src="' + application.cur_ch_logo + '"> ')
	// $('#current_ch_name').prepend('<span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>');
	$('#playlist [channel_id].active').removeClass('active');
	$('#playlist [channel_id=' + ch_id + ']').addClass('active');
}

layout.fav_switch = function(flag) {

	if(flag == 1) {
		$('#fav_switch').addClass('active');
		$('#playlist').addClass('only_fav');
		// $('#playlist li').not('[favorite=1]').hide();
	}
	else {
		$('#fav_switch').removeClass('active');
		$('#playlist').removeClass('only_fav');
		// $('#playlist li').not('[favorite=1]').show();
	}
}

layout.users_list = function(obj) {
	$.each(obj, function() {
		$('#modal_credentials .list-group').append('<a href="#" class="list-group-item" passwd=' + this.passwd + ' login="' + this.login + '">' + this.login + '</a>');
		$('#modal_credentials .list-group a:last').click(function () {
			$('#user_login').val($(this).attr('login'));
			$('#user_pass').val($(this).attr('passwd'));
		});
	});
}

layout.fav_add = function(ch_id) {
	// $('[channel_id=' + ch_id + '] a').append(' <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>').parent().attr('favorite', 1);
	$('[channel_id=' + ch_id + '] a span.glyphicon').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart').parent().parent().attr('favorite', 1);
}

layout.fav_del = function(ch_id) {
	// $('[channel_id=' + ch_id + '] a').append(' <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>').parent().attr('favorite', 1);
	$('[channel_id=' + ch_id + '] a span.glyphicon').removeClass('glyphicon-heart').addClass('glyphicon-heart-empty').parent().parent().attr('favorite', 0);
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

layout.tv_genres = function (obj_results) {

	$("#tv_genres").empty();

	$.each(obj_results, function() {
		$("#tv_genres").append('<li genre_id="' + this.id + '"><a href="#">' + this.title + '</a></li>');
	});
}

layout.epg = function (epg_obj, shift) {

	// $('#epg_tabs tbody').empty();
	$('#epg_tabs #epg_' + shift + ' tbody').empty();

	$('.epg_tab[epg_shift=' + shift + ']').addClass('epg_loaded');

	$.each(epg_obj, function() {

		// debug('layout.epg result: ' + this.id + ' ' + this.name);

		$('#epg_tabs #epg_' + shift + ' tbody').append('<tr epg_id="' + this.id +  '" duration="' + (this.end - this.start) + '" start="' + this.start + '" end="' + this.end + '" in_archive="' + this.in_archive + '"><td><span class="glyphicon glyphicon-play" aria-hidden="true"></span></td><td>' + my_date.toTimeString(this.start) + '</td><td>' + my_date.toTimeString(this.end) + '</td><td>' + this.name + '</td></tr>');

		$('#epg_tabs #epg_' + shift + ' tbody tr td span').last().click(function () {
			debug('play_epg event');
			$(this).play_epg();
		});
	});
	// // client.osd_text($('#epg_0 table > tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).last().children().last().text());
	layout.epg_recorded();
	layout.epg_scroll_now();
}

layout.epg_set_not_loaded = function () {
	$('.epg_tab').removeClass('epg_loaded');
}

layout.epg_show_today = function() {
	$('.epg_tab[epg_shift=0] a').tab('show');
}

layout.epg_current = function(epg_id) {
	$('[epg_id=' + epg_id + ']').addClass('danger');
}

layout.update_volume = function () {
	$('#player_volume').val(player.get_volume());
	debug('layout.update_volume ' + player.get_volume());
}

layout.update_volume_test = function (value) {
	$('#player_volume').val(value);
	debug('layout.update_volume ' + value);
}

layout.epg_recorded = function() {

	if($('#epg_tabs .active').attr('id') == 'epg_0') {
		$('#epg_tabs .active tbody tr.warning').removeClass('warning');
		$('#epg_tabs .active tbody tr').filter(function() {return  $(this).attr("end") < my_date.now()}).addClass('success').attr('in_archive', 1).last().next().filter(function() {return $(this).attr("end") > my_date.now()}).addClass('warning');
	}
	else {
		$('#epg_tabs .active tbody tr[in_archive=1]').addClass('success').attr('in_archive', 1);
	}

	// if($('#epg_tabs .active tbody tr[in_archive=1]').attr('in_archive') == 1) {
	// 	$('#epg_tabs .active tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).addClass('success');
	// }
}

layout.epg_scroll_now = function() {

	// if ($('#epg_tabs .active tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).addClass('success').last().offset().top != $('#epg_0').offset().top) {
	// if($('.epg_tab.active[epg_shift=0]').length) {
	if($('#epg_0 table tbody tr').length) {
		$('#epg_0').scrollTop(0);
		$('#epg_0').scrollTop($('#epg_tabs .active tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).last().offset().top - $('#epg_0').offset().top);
	}
}

layout.epg_scroll_current = function() {

	if($('#epg_0 table tbody tr').length) {
		$('#epg_0').scrollTop(0);
		$('#epg_0').scrollTop($('#epg_tabs .active tbody tr[epg_id=' + application.cur_epg_id + ']').offset().top - $('#epg_0').offset().top);
	}
}

// layout.position_to_time = function() { // DEPRECATED
// 	$('#position_time').text(player.position_to_time(storage.get_media_length()));
// }

// layout.player_position = function() { // DEPRECATED
// 	$('#player_position').val(player.get_position());
// }

layout.position = function() { // DEPRECATED
	// $('#position_time').text(player.position_to_time(storage.get_media_length()));
	// $('#player_position').val(parseFloat(player.get_position()) * parseInt($('#player_position').attr('max')));
	$('#position_time').text(player.position_to_time($('[epg_id=' + application.cur_epg_id + ']').attr('duration')));
	$('#player_position').val(parseFloat(application.last_media_position) * parseInt($('#player_position').attr('max')));
}

layout.epg_time = function() {
	if(application.position_time != '00:00:00') {
		$('#cur_epg_time').text(application.position_time);
	} else {
		$('#cur_epg_time').text('');
	}
} 

layout.epg_progress = function(val) {
	$('#epg_progress').attr('style', 'width: ' + (val * 100) + '%');
}

layout.player_position = function() {
	$('#player_position').val(parseFloat(application.cur_epg_position) * parseInt($('#player_position').attr('max')));
}

layout.get_epg_name = function(epg_id) {
	if(epg_id !== undefined) {
		return $('[epg_id=' + epg_id + '] td:eq(2)').text();
	}
	else {
		return $('#epg_0.active tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).last().children().last().text();
	}
}

layout.get_tabs_names = function() {
	$.each($('.epg_tab a'), function() {
		$(this).text(my_date.get_day($(this).parent().attr('epg_shift')) + ' ' + my_date.get_date($(this).parent().attr('epg_shift')));
	});
}

layout.cur_epg_name = function(text) {

	$('#cur_epg_name').text(text);

	// if(storage.get_epd_id()) {
	// 	$('#cur_epg_name').text($('[epg_id=' + storage.get_epd_id() + '] td:eq(3)').text());
	// }
	// else {
	// 	$('#cur_epg_name').text($('#epg_0 tbody tr').filter(function() {return  $(this).attr("start") < my_date.now()}).last().children().last().text());
	// }
}

layout.cur_epg_name_clear = function() {
	$('#cur_epg_name').text('');
}

layout.msg_bell = function(num) {
	if(num > 0) {
		$('#msg_bell').attr('msg_num', num).addClass('blink2');
		$('#msg_bell span').removeClass('glyphicon glyphicon-bell').text(num);
	}
	else {
		$('#msg_bell').removeClass('blink2');
		$('#msg_bell span').addClass('glyphicon glyphicon-bell').text('');
	}
}

layout.msg_to_page = function(text, id) {
	$('#msg_container').append(
		'<div class="col-md-12 col-lg-6" id="' + id + '">' +
		'<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
		text +
		'</div></div>').children().children().last().on('closed.bs.alert', function() {storage.del_key(id); $('#' + id).remove(); client.msg_bell();});
}

layout.msg = function (msg_obj) {
	if(msg_obj && msg_obj.type == "send_msg") {
		if(player.get_state() == 3) {
			player.osd_text_show(msg_obj.msg);
		}
		else {
			alert(msg_obj.msg);
		}
	}
}

layout.prompt_passwd = function() {
	$('#passwd_container').slideDown();
}

layout.hide_passwd = function() {
	$('#passwd_container').slideUp();
}

layout.progress_color = function(media) {

	switch (media) {
		case MEDIA_TV:
			$('#epg_progress').addClass('background-tv').removeClass('background-archive');
			break;
		case MEDIA_EPG:
			$('#epg_progress').addClass('background-archive').removeClass('background-tv');
			break;
		default:
			$('#epg_progress').removeClass('background-archive').removeClass('background-tv');
	}
}

layout.brand = function() {
	$('#brand').html('<a id="current_ch_name" class="brand" href="#"><img border="0" src="img/logo.png"> КЛИК-ТВ</a>');
}

layout.auth_progress_show = function() {
    $("#auth_msg_container").show();
}

layout.auth_progress_hide = function() {
    $("#auth_msg_container").hide();
}

layout.add_history = function() {
	if($('#history .list-group li').length > EPG_MAX_HIST) {
		$('#history .list-group li:last').remove();
	}
	$('#history .list-group [channel_id=' + application.cur_ch_id + ']').remove();
	$('#history .list-group').prepend('<li class="list-group-item" channel_id="' + application.cur_ch_id + '"><img src="' + application.cur_ch_logo + '"> ' /*application.cur_ch_name*/  + ' <span class="epg-history-item"><span></a></li>');
	// <a href="#"><span class="ch_name">Радость моя</span><span class="glyphicon glyphicon-heart-remove" aria-hidden="true"></span></a></li>
}

layout.epg_history_item = function() {
	// if(application.cur_media_type == MEDIA_TV) {
		$('#history .list-group li .epg-history-item:first').text(application.cur_epg_timeframe + ' ' + application.cur_epg_name);
	// }
}
