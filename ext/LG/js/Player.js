var Player =
{
    played_ch_id: 0,
	
	selected_channel: 0,
	selected_page: 0,
	censored : false,
	chan_array_index: 0,
	plugin : null,
	mwPlugin: null,
    state : -1,
    skipState : -1,
    stopCallback : null,    
    originalSource : null,
    size: 0,
    STOPPED : 0,
    PLAYING : 1,
	PLAYING_ARCHIVE : 2,
	PAUSA_ARCHIVE : 3,
	PLAYING_VOD : 4,
	PAUSA_VOD : 5,
	counter : 0,
	timer : null,
	timer_is_on : 0,
	current_time : 0,
	vod_duration : 0,
	vod_one_percent : 0,
	vod_current_time : 0,
	buffering_timer : null,
	archive_timer : null
}

Player.init = function()
{
    
   //	media.OnBuffering = processBufferingFunction();
  // 	media.onPlayStateChange = 'processPlayStateChangeFunction';
 //   media.BufferingProgress = 'Player.onBufferingProgress';
//    Player.plugin.OnBufferingComplete = 'Player.onBufferingComplete';
//	Player.plugin.OnCurrentPlayTime = 'Player.vodCurrentTime';
	media.onBuffering = processBufferingFunction;
//	media.onPlayStateChange = Player.vodCurrentTime;
    if (debug==1) console.log("Player.init() - done");
}

function processBufferingFunction(isStarted)
{
	if (isStarted==true)
	{
		Display.status("Буферизация...");
		Player.buffering_timer=setTimeout('Display.status("Буферизация...")',4000);		
	
	}
	else
		{
			Display.hidestatus();
			clearTimeout(Player.buffering_timer);
			if (Player.state != Player.PAUSA_ARCHIVE) Display.status("Буферизация завершена");
			if ((Player.state == Player.PLAYING)&&(Main.focus==Main.LivePlayer_ID)) Display.showplayer();
			if (Player.state == Player.STOPPED)
		    {
				media.stop();
		    }
			if (Player.state==Player.PLAYING_ARCHIVE)
			{		
				ArchivePlayer.program_end_time=media.playTime;				
				if (debug==1) console.log('playInfo.duration='+media.playTime);
				Player.vodCurrentTime(media.playPosition);
				Player.archive_timer=setInterval('Player.vodCurrentTime(media.playPosition);',900);
			}
		}
	if (debug==1) console.log('processBufferingFunction() - done');  
}

Player.deinit = function()
{
	if(Player.state)
		Player.stopVideo();
		server.media_info_delete();
	if (debug==1) alert("Player deinit !!! " ); 
	if(Player.mwPlugin != null)
	
	if (Player.plugin)
	{
		Player.plugin.Stop();
	}
}

Player.setVideoURL = function(url)
{
    Player.url = url;
    if (debug==1) console.log("URL = " + Player.url);
}

Player.playVideo = function()
{	
	
	if(Player.state == Player.PLAYING)
		Player.stopVideo();
		//media.stop();
	if (Player.url == null)
    {
        if (debug==1) console.log("No videos to play");
    }
    else
    {
        Player.state = Player.PLAYING;
				
		Player.played_ch_id=server.channels[(12*Main.selected_page)+Main.selected_channel].id;
		
//      Player.plugin.SetInitialBuffer(20*1024*1024);//test

 //       Player.plugin.Play( Player.url );
		media.data=Player.url;
        if (debug==1) console.log("Play-function");
        media.play();
		setTimeout('server.media_info()',1000);
    }

}

Player.stopVideo = function()
{
	
	//Player.stopCount();
	   Player.state = Player.STOPPED;
       media.stop();
		//server.media_info_delete();
       Display.hidestatus();
        
        if (debug==1) console.log("Player.stopVideo()");
    
}

Player.getState = function()
{
    return Player.state;
}


onServerError = function()
{
    Display.status("Server Error!");
}

OnNetworkDisconnected = function()
{
    Display.status("Network Error!");
}

getBandwidth = function(bandwidth) { if (debug==1) alert("getBandwidth " + bandwidth); }

onDecoderReady = function() { if (debug==1) alert("onDecoderReady"); }

onRenderError = function() { if (debug==1) alert("onRenderError"); }

stopPlayer = function()
{
    Player.stopVideo();
}

Player.ShowResolution = function()
{
	var h=Player.plugin.GetVideoHeight();
	var w=Player.plugin.GetVideoWidth();
	var res = "<center>" + w + "X" + h + "</center>";
	widgetAPI.putInnerHTML(document.getElementById("resolution"), res);
			
}			


Player.Counter=function() 
{
	var time_end = parseInt(Server.channels[Main.chan_array_index][5]);
	Player.setOnlineState();
	
	if(time_end)
	{
		Player.current_time = Player.current_time + 10;
        if((Player.current_time-10)>time_end)
		{
			Server.getChannel_list(); 
            if (debug==1) alert("Vypoln. uslovie v Player.Counter");
            
           	Main.updateCurrentChannelEPG();
			Display.showplayer();
		}
	}
	
	Server.servertime = Player.current_time;
	Main.UpdatePlayerStatusbar();

}

Player.startCounter=function() 
{
	if (!Player.timer_is_on)
	{
		Player.timer_is_on=1;

		Player.Counter();
        if (debug==1) alert("Player.startCounter");
	}
}

Player.stopCount=function() 
{
	clearTimeout(Player.timer);
	Player.timer_is_on=0;
	Player.counter=0;
}

Player.setOnlineState=function() 
{

}

Player.MinutesJump = function(minutes) 
{
	var sign = "";
	if(minutes>0)
		var sign = "+";
	Player.statusmessage =sign + minutes + " мин.";
	if (minutes > 0) {
		Player.plugin.JumpForward(minutes*60);    
	} else if (minutes < 0) {
		Player.plugin.JumpBackward(minutes*60*-1);
	}
	Display.status(Player.statusmessage);
}

Player.PercentJump = function(percent) 
{
	Player.statusmessage = percent*10 + "%";
	var jump_time = 0;
	if(percent)
		jump_time = parseInt((Player.vod_current_time + Player.vod_one_percent*percent*10)/1000);
	
	var now_percent = parseInt(Player.vod_current_time/Player.vod_one_percent);
	var jump_to_percent = percent*10 - now_percent;
	var jump_to_minutes = (Player.vod_one_percent*jump_to_percent)/1000;
	
	if (jump_to_minutes > 0) {
		Player.plugin.JumpForward(jump_to_minutes);    
	} else if (jump_to_minutes < 0) {
		Player.plugin.JumpBackward(jump_to_minutes*-1);
	}
	Display.status(Player.statusmessage);
}

Player.resumeVideo = function()
{
	if (Player.state != Player.STOPPED)
	{
		Player.state = Player.PLAYING_VOD;
		Player.plugin.Resume();
		document.getElementById("vod_pause").style.display="";
		document.getElementById("vod_play").style.display="none";
		Display.status('воспроизведение');
	}
}

Player.pauseVideo = function()
{
	if (Player.state != Player.STOPPED)
	{
		Player.state = Player.PAUSA_VOD;
		Player.plugin.Pause();
		document.getElementById("vod_pause").style.display="none";
		document.getElementById("vod_play").style.display="";
		document.getElementById("statusbar").style.display="";
		widgetAPI.putInnerHTML(Display.statusDiv, "ПАУЗА");
	}
}

Player.vodCurrentTime = function(time)
{
	//if (debug==1) console.log('Player.vodCurrentTime - ArchivePlayer.program_end_time=' + ArchivePlayer.program_end_time);
	if (Player.state==Player.PLAYING_ARCHIVE)
	{
		if (media.playState==1)
	{
	ArchivePlayer.current_archive_time=time;
	document.getElementById("timer").innerHTML= ArchivePlayer.timeFormat(time)+" / "+ArchivePlayer.timeFormat(ArchivePlayer.program_end_time);
	ArchivePlayer.timeline((time*100)/ArchivePlayer.program_end_time);
	//ArchivePlayer.count_rewind=0;	
	if (ArchivePlayer.timeFormat(time)!="00:00:00")
	{
	if (ArchivePlayer.timeFormat(time)>=ArchivePlayer.timeFormat(ArchivePlayer.program_end_time))
	{
			setTimeout('Player.stopVideo();	Display.hideplayer(); document.getElementById("psl").style.display="block";	document.getElementById("psl_archive").style.display="none"; KeyHandler.setFocus(Main.EpgMenu_ID); Display.showEPG(); $("#programm").scrollTop(Display.sroll_epg);	ArchivePlayer.timeline(0); clearTimeout(Player.archive_timer)',1000); 
	}
	}
	}
}
}

