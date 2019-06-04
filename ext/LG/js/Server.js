var server =
{   
	access_token: null,
	expires_in: null,
	user_id: null,
	refresh_token: null,
	api_url: "http://v2.api.ark.rikt.ru",
	auth_url: "http://212.77.128.205/stalker_portal/auth/token.php",
	login: "",
	password: "",
	channels: [ ],
	ch_link: '',
	correction_time: 0,
	media_id: 0,
	reaccount: false,
	deviceTZ : 0,
	needTZ: 4,
	end_time_epg: '',
	timer_update_epg: null,
	parent_password: null
}

server.auth = function() {
		$.post(server.auth_url, {grant_type: "password", username: server.login, password: server.password}, function(data) {
				if(data.error !== undefined)  {
					if (debug==1) console.log('data: '+ data);
					if (debug==1) console.log('server.auth: ' + data.error_description);
					
					if (data.error_description=="Account is disabled")
					{
						
						Main.message(0,"Пожалуйста, оплатите задолженность. Справки по телефону 65 000. Для выхода нажмите EXIT.");
						$('#MainMenu_Anchor').remove();
						$('#LivePlayer_Anchor').remove();
						Player.stopVideo();
						document.getElementById("rightHalf").style.display="none";
						document.getElementById("leftHalf").style.display="none";
						document.getElementById("epg-archiv").style.display="none";
						document.getElementById("main").style.display="block";
					}
					if (data.error_description=="Username or password is incorrect")
					{
											
						server.reaccount=true;
						account.create();
					}
					
				}
				else {
					if (debug==1) console.log("access_token="+data.access_token);
					server.access_token = data.access_token;
					server.expires_in = data.expires_in;
					server.refresh_token = data.refresh_token; 
					server.user_id = data.user_id;
					server.ping();
					server.get_ch_list();
					server.get_settings(); 
					setInterval('server.ping(), server.message()', 120000);
				}
				
			}
		);
}


server.request = function(url) {

	try {
		var request = getXmlHttp();
		request.open('GET', url, false);
		request.setRequestHeader('Accept', 'application/json');
		request.setRequestHeader('Accept-Language', 'ru-RU');
		request.setRequestHeader('Authorization', 'Bearer ' + server.access_token);
//		request.setRequestHeader('UA-resolution', "120");
		
		if (request.overrideMimeType) {
			request.overrideMimeType("text/html");
		}
		
		return request;

	} catch (e) {
		if (debug==1) console.log("Ошибка: "+ e);
		return;
	}
}

function getXmlHttp() {
	if (typeof XMLHttpRequest === undefined) {
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

function check_request_status(request) {

	if (request.status == 200) {
		return true;
	}
	else {
		
		return request.status;
	}
}

server.request_post = function(url) {

	try {
		var request = getXmlHttp();
		request.open('POST', url, false);
		request.setRequestHeader('Authorization', 'Bearer ' + server.access_token);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		request.setRequestHeader('Accept', 'application/json');
	//	request.setRequestHeader('Accept-Language', "ru-RU");
		
		
		if (request.overrideMimeType) {
			request.overrideMimeType('text/html');
		}

		return request;
	}

	catch (e) {
		if (debug==1) console.log("Ошибка: "+ e);
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
			if (debug==1) console.log("Ошибка: "+ e);
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
		if (debug==1) console.log("Ошибка: "+ e);
		return;
	}
}

server.ping =  function() {
		url = server.api_url + "/users/" + server.user_id + "/ping";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (request.readyState == 4) {
			if (check_request_status(request) === true) {
				if (debug==1) console.log('ping otvet='+request.responseText);
				if (debug==1) console.log('ping ok');
				
			}
			else {
				if (debug==1) console.log('ping: error: ' + request.status);
				request_status_swith(request.status);
			}
		}
	};
	request.send(null);
}

function parse_response(responseText) {

	 
	if (debug==1) console.log('parse_response responseText:' + responseText);

	try {

		var json = $.parseJSON(responseText);
		
	
			return json;
		
	}
	catch (e) {
		if (debug==1) console.log('parse_response parseJSON error: ' + e);
		return false;
	}
}

request_status_swith = function(status)
{
	switch(status)
    { 
		case 401:
		server.auth();
		if (debug==1) console.log("request_status_swith 401");
		break;
		case 0:
		Main.message(0,"Произошла внутрення ошибка. Для выхода нажмите EXIT.");
						$('#MainMenu_Anchor').remove();
						$('#LivePlayer_Anchor').remove();
						Player.stopVideo();
						document.getElementById("main").style.display="none";						
		break;
	}
}

server.get_ch_list =  function() {

	url = server.api_url + "/users/" + server.user_id + "/tv-channels";
	
	if (debug==1) console.log('server.get_ch_list url= '+url);

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) { 

				var obj = parse_response(request.responseText);
				server.channels= obj.results;
				if (debug==1) console.log('kolichestvo kanalov='+obj.results.length);
				if (debug==1) console.log('name='+obj.results[0].name);
				if ((obj.results.length%12)==0)
					 Main.channels_pages = obj.results.length/12;
					 else
					 Main.channels_pages = parseInt(obj.results.length/12)+1;
				Main.Channels_update();
				server.get_last_channel();
				if (debug==1) console.log('kolichestvo stranic='+Main.channels_pages);
				}
		}
		else {
			if (debug==1) console.log('get_ch_list: check_request_status error: ' + request.status);
			request_status_swith(request.status);
		}
	};
	request.send(null);
}

server.timezone = function()
{
x = new Date();
currentTimeZoneOffsetInHours = -x.getTimezoneOffset()/60;
this.needTZ = 7 - currentTimeZoneOffsetInHours;
if (debug==1) console.log("this.needTZ="+this.needTZ);
}

server.Time = function()
{
	if (debug==1) console.log("server.Time");
setInterval(function () {
    
	var Unixtime = parseInt(new Date().getTime()/1000)+server.needTZ*3600;
	Unixtime=new Date(Unixtime*1000);
	
	var Min = Unixtime.getMinutes();
	if (Min <10)
		Min= "0" + String(Min);
	var Hou = Unixtime.getHours();
	if (Hou <10)
		Hou= "0" + String(Hou);
	
    if ((Hou=="00")&&(Min=="00")) server.DateMenu();
    document.getElementById('widget_time').innerHTML = Hou + ':' + Min;
	document.getElementById('time').innerHTML = Hou + ':' + Min;
}, 1000);
}

server.DateMenu = function(time)
{
	
	var Unixtime = parseInt(new Date().getTime()/1000)+server.needTZ*3600;
	Unixtime=new Date(Unixtime*1000);
	var days= new Array ("воскресенье", "понедельник", "вторник", "среда", "четверг","пятница", "суббота");
	var monts = new Array ("января", "февраля","марта", "апреля", "мая", "июня","июля", "августа","сентября", "октября","ноября","декабря");
	var WeekDay = days[Unixtime.getDay()];
	var Day = Unixtime.getDate();
	var Month = monts[Unixtime.getMonth()];
	return WeekDay +" "+ Day +" "+ Month;
}

server.get_epg =  function() {
	clearTimeout(server.timer_update_epg);
	if (debug==1) console.log('ch_id='+server.channels[(Main.selected_channel+(12*Main.selected_page))].id);
	url = server.api_url + "/tv-channels/" + server.channels[(Main.selected_channel+(12*Main.selected_page))].id + "/epg?next=5";

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) { 

				var obj = parse_response(request.responseText);
				if (obj.results.length==0)
				{
					document.getElementById("infoList").innerHTML= '<br><center>Программа передач</center><br>';
					document.getElementById("pr1_time").innerHTML= '';
					document.getElementById("pr1_name").innerHTML= '';
					document.getElementById("pr2_time").innerHTML= '';
					document.getElementById("pr2_name").innerHTML= '';
					
				}
				else
				{
					if (Player.censored==false)
					{
					vyvod='<br><center>Программа передач</center><br>'
					for (var index = 0; index < obj.results.length; index++)
					{
							vyvod=vyvod+my_date.toTimeString(obj.results[index].start)+' '+obj.results[index].name+'<br>';
					}
					document.getElementById("infoList").innerHTML=vyvod;					
					document.getElementById("pr1_time").innerHTML= my_date.toTimeString(obj.results[0].start)+'-'+my_date.toTimeString(obj.results[0].end);
					document.getElementById("pr1_name").innerHTML= obj.results[0].name;
					document.getElementById("pr2_time").innerHTML= my_date.toTimeString(obj.results[1].start)+'-'+my_date.toTimeString(obj.results[1].end);
					document.getElementById("pr2_name").innerHTML= obj.results[1].name;
					server.media_id=obj.results[0].id;
					server.end_time_epg=my_date.toTimeString(obj.results[0].end);
					server.timer_update_epg=setInterval('server.update_epg()',30000);
				if (debug==1) console.log('kolichestvo peredach='+obj.results.length);
				if (debug==1) console.log('name='+my_date.toTimeString(obj.results[0].start)+' '+obj.results[0].name);
				}
				else
				{
					if (Player.played_ch_id!=server.channels[(12*Main.selected_page)+Main.selected_channel].id)
						{
					document.getElementById("infoList").innerHTML='<br><center>Программа передач</center><br>';
					document.getElementById("pr1_time").innerHTML= '';
					document.getElementById("pr1_name").innerHTML= '';
					document.getElementById("pr2_time").innerHTML= '';
					document.getElementById("pr2_name").innerHTML= '';
						}
					else
						{
						vyvod='<br><center>Программа передач</center><br>'
							for (var index = 0; index < obj.results.length; index++)
							{
									vyvod=vyvod+my_date.toTimeString(obj.results[index].start)+' '+obj.results[index].name+'<br>';
							}
							document.getElementById("infoList").innerHTML=vyvod;					
							document.getElementById("pr1_time").innerHTML= my_date.toTimeString(obj.results[0].start)+'-'+my_date.toTimeString(obj.results[0].end);
							document.getElementById("pr1_name").innerHTML= obj.results[0].name;
							document.getElementById("pr2_time").innerHTML= my_date.toTimeString(obj.results[1].start)+'-'+my_date.toTimeString(obj.results[1].end);
							document.getElementById("pr2_name").innerHTML= obj.results[1].name;
							server.media_id=obj.results[0].id;
							server.end_time_epg=my_date.toTimeString(obj.results[0].end);
							server.timer_update_epg=setInterval('server.update_epg()',30000);						
						}
				}
				}
				if (server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].logo!='')				
				document.getElementById("ch_epg_img").src="http://212.77.128.205"+server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].logo.replace('/120/','/240/')
				else
				document.getElementById("ch_epg_img").src="img/72-72.png";
				document.getElementById("infoList").style.display="block";
				
			}
		}
		else {
			if (debug==1) console.log('get_ch_list: check_request_status error: ' + request.status);
			request_status_swith(request.status);
		}
	};
	request.send(null);
}
	
	server.update_epg = function()
	{
		
		
		if (server.end_time_epg==document.getElementById('widget_time').innerText) 
		{
		server.get_epg();
		if (debug==1) console.log('update_epg');
		}
	}
	
	var my_date = 
	{

	}

	my_date.toTimeString = function (date) {

		
		var unixtime = new Date((date+(server.needTZ*3600))*1000);
		
		var hours = unixtime.getHours();
		var minutes = unixtime.getMinutes();

		hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
		minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();

		var time = hours + ':' + minutes;

		return time;
	}

	my_date.midnigth = function (shift) {

		if(shift === undefined) {
			shift = 0;
		}

		var d = new Date();

		var year = d.getFullYear();
		var month = d.getMonth();
		var date = d.getDate();

		var midnigth = Math.round(+new Date(year, month, date + shift)/1000)-server.needTZ*3600;
		if (debug==1) console.log("my_date.midnigth midnigth="+midnigth);
		return midnigth;
	}
	
	server.get_last_channel = function()
	{
		url = server.api_url + "/users/" + server.user_id + "/tv-channels/last";
		var request = server.request(url);

		request.onreadystatechange = function () {

			if (check_request_status(request) === true) {

				if (request.readyState == 4 && request.status == 200) {

					var obj = parse_response(request.responseText);
					
					if (obj.results!=0)
					{
						if (debug==1) console.log('results: '+obj.results);
						var proverka=false;
						for (var index = 0; index < server.channels.length; index++)
						{
							if ( server.channels[index].id == obj.results ) 
									{
										Main.selected_page=parseInt(index/12); 
										if (debug==1) console.log('Main.selected_page='+Main.selected_page);
										Main.selected_channel=index%12;
										if (debug==1) console.log('Main.selected_channel='+Main.selected_channel);
										Main.Update_page();										
										server.get_ch_link();
										document.getElementById("rightHalf").style.display="block";
										document.getElementById("leftHalf").style.display="block";
										proverka=true;
									}
			
						}
						if (proverka==false) 
						{
							Main.Channels_update();
							server.get_ch_link();
							document.getElementById("rightHalf").style.display="block";
							document.getElementById("leftHalf").style.display="block";
						}
					}
					else
					{
						Main.Channels_update();
						server.get_ch_link();
						document.getElementById("rightHalf").style.display="block";
						document.getElementById("leftHalf").style.display="block";
					}
					if (debug==1) console.log('get_last_channel ok');
					
					document.getElementById("loading").style.display="none";
					Display.showmenu();
				}
			}
			else {
				if (debug==1) console.log('get_last_channel: check_request_status error: ' + request.status);
				request_status_swith(request.status);
			}
		}; 
		request.send(null);
	}

	server.get_ch_link =  function(id) {

		if(id === undefined) {		
		url = server.api_url + "/users/"+server.user_id+"/tv-channels/" + server.channels[Main.selected_channel+(12*Main.selected_page)].id + "/link";

		var request = server.request(url);

		request.onreadystatechange = function () {

			if (check_request_status(request) === true) {

				if (request.readyState == 4 && request.status == 200) { 

					var obj = parse_response(request.responseText);
					
					if (debug==1) console.log('ch_link='+obj.results);
					server.ch_link=obj.results;
					Player.setVideoURL(obj.results);
					Player.playVideo();
					if (server.channels[Main.selected_channel+(12*Main.selected_page)].censored==0) server.put_last_channel();
					}
			}
			else {
				if (debug==1) console.log('get_ch_list: check_request_status error: ' + request.status);
				request_status_swith(request.status);
			}
		};
		request.send(null);
		}
		else
		{
		url = server.api_url + "/users/"+server.user_id+"/tv-channels/" + id + "/link";

		var request = server.request(url);

		request.onreadystatechange = function () {

			if (check_request_status(request) === true) {

				if (request.readyState == 4 && request.status == 200) { 

					var obj = parse_response(request.responseText);
					if (debug==1) console.log('ch_link='+obj.results);
					Player.setVideoURL(obj.results);
					if (Player.url == null)
					{
					if (debug==1) console.log("No videos to play");
					}
					else
					{
					Player.state = Player.PLAYING;					
					media.data=Player.url;
			        media.play();
			        server.media_info(Player.played_ch_id);
					}
					}
			}
			else {
				if (debug==1) console.log('get_ch_list: check_request_status error: ' + request.status);
				request_status_swith(request.status);
			}
		};
		request.send(null);
			
		}

	}
	
	server.media_info_rab =  function(id) {
		url = server.api_url + "/users/" + server.user_id + "/media-info";
		if (debug==1) console.log('media-ifo begin');
	var request = server.request_post(url);
//	request.onreadystatechange = function () {
		
	//	if (request.readyState == 4 && request.status == 200) {
		if (request.status == 200) {
			if (check_request_status(request) === true) {
				if (debug==1) console.log('otvet='+request.responseText);
				if (debug==1) console.log('media-ifo ok');
				
			}
			else {
				if (debug==1) console.log('media-ifo error request_post : ' + request.status);
				if (debug==1) console.log('otvet='+request.responseText);
				request_status_swith(request.status);
			}
		}
//	};
	if (debug==1) console.log('id= '+id);
if ((Player.state==Player.PLAYING)&&(id=='undefined')) request.send("type=tv-channel&media_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id);
if ((Player.state==Player.PLAYING)&&(id!='undefined')) request.send("type=tv-channel&media_id="+id);
if (Player.state==Player.PLAYING_ARCHIVE)  request.send("type=tv-archive&media_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id);
if (Player.state==Player.STOPPED) console.log("media-ifo ничего не проигрывается");
		
}

server.get_settings = function()
	{
		url = server.api_url + "/users/" + server.user_id + "/settings";
		var request = server.request(url);

		request.onreadystatechange = function () {

			if (check_request_status(request) === true) {

				if (request.readyState == 4 && request.status == 200) {

					var obj = parse_response(request.responseText);
					
					if (obj.results!=0)
					{
						if (debug==1) console.log('results: '+obj.results.parent_password);
						server.parent_password=obj.results.parent_password;
					}
					if (debug==1) console.log('get_settings_channel ok');
					
				}
			}
			else {
				if (debug==1) console.log('get_last_channel: check_request_status error: ' + request.status);
				request_status_swith(request.status);
			}
		}; 
		request.send(null);
}

server.put_last_channel_rab = function()
{
		url = server.api_url + "/users/" + server.user_id + "/tv-channels/last";
		if (debug==1) console.log('put_last_channel begin');
	var request = server.request_put(url);
	
	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {
								
				if (debug==1) console.log('put_last_channel ok');
				
			}
		}
		else {
			if (debug==1) console.log('put_last_channel: check_request_status error: ' + request.status);
			request_status_swith(request.status);
		}
	}; 
	request.send("ch_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id);
}
 

server.put_last_channel = function()
{
	url = server.api_url + "/users/" + server.user_id + "/tv-channels/last";
	var request = getXmlHttp();
	var params ="ch_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id;
	if (debug==1) console.log('put_last_channel begin');
	request.open('PUT', url, false);
	request.setRequestHeader('Authorization', 'Bearer ' + server.access_token);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.setRequestHeader('Accept', 'application/json');
	request.send(params);
    if (request.status == 200) {
        	if (debug==1) console.log('put_last_channel ok');
        	if (debug==1) console.log( request.status + ': ' + request.statusText );
      } else {
    	  if (debug==1) console.log('put_last_channel responseText'+ request.responseText );

      }
		
		
		
}


server.media_info =  function(id) {
	url = server.api_url + "/users/" + server.user_id + "/media-info";
	var request = getXmlHttp();
	if ((Player.state==Player.PLAYING)&&(id==undefined)) var params ="type=tv-channel&media_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id;
	if ((Player.state==Player.PLAYING)&&(id!=undefined)) var params ="type=tv-channel&media_id="+id;
	if (Player.state==Player.PLAYING_ARCHIVE)  var params ="type=tv-archive&media_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id;
	if (Player.state==Player.PLAYING_ARCHIVE)  var params ="type=tv-archive&media_id="+($("#pr"+EPG.selected_li).attr('epgid'));
	if (Player.state==Player.STOPPED) console.log("media-ifo ничего не проигрывается");
	if (debug==1) console.log("media-ifo params="+params);
	//var params = "type=tv-channel&media_id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id;
	request.open('POST', url, false);
  	request.setRequestHeader('Authorization', 'Bearer ' + server.access_token);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('Accept', 'application/json');
    request.send(params);
    if (request.status == 200) {
    	if (debug==1) console.log('media-ifo otvet='+request.responseText);
		if (debug==1) console.log('media-ifo ok');		
    }
    
    else {
		if (debug==1) console.log('media-ifo error request_post : ' + request.status);
		if (debug==1) console.log('media-ifo otvet='+request.responseText);
		request_status_swith(request.status);
	}
	
	
}

server.media_info_delete =  function() {
	url = server.api_url + "/users/" + server.user_id + "/media-info";

var request = server.request_delete(url);

request.onreadystatechange = function () {

	if (request.readyState == 4 && request.status == 200) {
		if (check_request_status(request) === true) {
			if (debug==1) console.log('media-ifo delet otvet='+request.responseText);
			if (debug==1) console.log('media-ifo delete ok');
			
		}
		else {
			if (debug==1) console.log('media-ifo delete error request_post : ' + request.status);
			if (debug==1) console.log('media-ifo delete otvet='+request.responseText);
			request_status_swith(request.status);
		}
	}
};
request.send();
}

server.get_epg_day =  function(shift) {

	shift = parseInt(shift);

	from_time = my_date.midnigth(shift);
	to_time = my_date.midnigth(shift + 1);

	url = server.api_url + "/tv-channels/" + server.channels[(12*Main.selected_page)+Main.selected_channel].id + "/epg?from=" + from_time + "&to=" + to_time;

	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = jQuery.parseJSON(request.responseText);
				if (obj.results.length!=0)
				{
					EPG.show(obj.results, 0);
					setTimeout('$("#programm").scrollTop($("#pr"+EPG.selected_li).offset().top-138)', 400);
				}
				else
				{
					if (debug==1) console.log("Otvet pustoi");					
					$('#programm ul').empty();
					EPG.selected_li=0;
					KeyHandler.setFocus(Main.EpgMenu_ID);
					$("#programm ul").append('<li id="pr0'+'" epgid="'+0+'" archive="'+0+'"name="'+'"><img src='+"img/clock.png"+' style="vertical-align:middle;"></img>'+" Программа передач отсутствует" + '</a></li>');						
				}
				if (debug==1) console.log("obj.legth="+obj.results.length);
			}
		}
		else {
			if (debug==1) console.log('get_epg: check_request_status error: ' + request.status);
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

				if (debug==1) console.log("get_epg_link ="+obj.results);
				Player.archive_url=obj.results;
				ArchivePlayer.playVideo();
			}
		}
		else {
			if (debug==1) console.log('get_epg_next: check_request_status error: ' + request.status);
		}
	};
	request.send(null);
}

server.message = function()
{
	if (Main.visible_message==false)
			 {
	url = server.api_url + "/users/" + server.user_id + "/message";
	var request = server.request(url);

	request.onreadystatechange = function () {

		if (check_request_status(request) === true) {

			if (request.readyState == 4 && request.status == 200) {

				var obj = parse_response(request.responseText);

				if (obj.results!=null)
				{
				if (obj.results.type=="send_msg")
				{
					if (obj.results.msg=="Tariff plan is changed, please restart your STB")
					{
						Main.message(1,'Изменился Ваш тариф КЛИК-ТВ, через 15 секунд приложение будет закрыто. После закрытия приложения откройте его снова.');
						setTimeout('window.NetCastBack()',15000);
						setTimeout('server.media_info_delete()',12000);
					}
					else
					{
					Main.message(1,obj.results.msg);
					}
				}
				if (debug==1) console.log('message: '+obj.results.msg);
				}
				if (debug==1) console.log('message ok');
				
			}
		}
		else {
			if (debug==1) console.log('message: check_request_status error: ' + request.status);
			request_status_swith(request.status);
		}
	}; 
	request.send(null);
	}
}