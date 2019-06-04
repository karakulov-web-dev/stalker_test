var ArchivePlayer =
{
	status_timer : null,
	program_start_time : 0,
	program_end_time : 0,
	current_archive_time : 0,
	one_percent : 0,
	statusmessage : null,
	mode : 0,	
	count_ff : 0,
	count_rw : 0,
	rewind_interwal : 3,
	rewind : false,
	intervals : [
    ["5 сек", "10 сек", "20 сек", "30 сек", "1 мин", "5 мин", "10 мин", "15 мин"],
	[5000, 10000, 20000, 30000, 60000, 300000, 600000, 900000]
	]
}

ArchivePlayer.playVideo = function()
{	
	
	KeyHandler.setFocus(Main.ArchivePlayer_ID);
	
	
	if(Player.state == Player.PLAYING_ARCHIVE)
	{
		Player.stopVideo();
	}
	if(Player.state == Player.PAUSA_ARCHIVE)
	{
		Player.stopVideo();
	}
	if(Player.state == Player.PLAYING)
	{
		Player.stopCount();
		Player.stopVideo();
	}
	
	if (Player.archive_url == null)
    {
        if (debug==1) console.log("No videos to play");
    }
    else
    {
        Player.state = Player.PLAYING_ARCHIVE;
//		Player.plugin.SetInitialBuffer(1*1024*1024);
        media.data=Player.archive_url;
        if (debug==1) console.log("Play-function");
        media.play();
   //     Player.plugin.Play( Player.archive_url );
 //       Audio.plugin.SetSystemMute(false); 
    }
	
	
//	Player.plugin.SetDisplayArea(0, 0, 960, 540);	
	Display.hideEPG(); //test
	Display.showplayer();
	setTimeout('server.media_info();',1000);	
}

ArchivePlayer.pauseVideo = function()
{
    //Display.statusDiv.innerHTML="ПАУЗА";
	if (media.playState==1)
		{
	document.getElementById("statusbar").innerHTML="ПАУЗА";
	document.getElementById("statusbar").style.display="block";	
	clearTimeout(ArchivePlayer.status_timer); 
	Player.state = Player.PAUSA_ARCHIVE;
    //Player.plugin.Pause();
	media.play(0);
		}
}

ArchivePlayer.unpauseVideo = function()
{
	if (media.playState==2)
		{
	document.getElementById("statusbar").style.display="none";	
	//Player.plugin.Resume();
	Player.state = Player.PLAYING_ARCHIVE;
	media.play(1);
		}
}



ArchivePlayer.rewind = function(motion)
{
	clearTimeout(Display.infobar_timer);
	clearTimeout(ArchivePlayer.timer_rewind);
	clearTimeout(Player.archive_timer);	
	document.getElementById("player").style.display="block";
	media.play(0);	
	//Player.plugin.Pause();
	if (motion=="FF")
	{
		if ((parseInt(ArchivePlayer.count_ff)+parseInt(ArchivePlayer.current_archive_time)+parseInt(ArchivePlayer.intervals[1][ArchivePlayer.rewind_interwal])-parseInt(ArchivePlayer.count_rw))<parseInt(ArchivePlayer.program_end_time))
			{
				ArchivePlayer.count_ff=parseInt(ArchivePlayer.count_ff)+parseInt(ArchivePlayer.intervals[1][ArchivePlayer.rewind_interwal]);
			}
		else
			{
				ArchivePlayer.count_ff=ArchivePlayer.program_end_time-ArchivePlayer.current_archive_time-1000;
				ArchivePlayer.count_rw=0;
			}
	}
	if (motion=="RW")
	{
		if ((parseInt(ArchivePlayer.current_archive_time)-(parseInt(ArchivePlayer.count_rw)+parseInt(ArchivePlayer.intervals[1][ArchivePlayer.rewind_interwal]))+parseInt(ArchivePlayer.count_ff))<0)
			{
				ArchivePlayer.count_rw=ArchivePlayer.current_archive_time;
				ArchivePlayer.count_ff=0;
			}
		else
			{
				ArchivePlayer.count_rw=parseInt(ArchivePlayer.count_rw)+parseInt(ArchivePlayer.intervals[1][ArchivePlayer.rewind_interwal]);
			}
	}
	
 	ArchivePlayer.timeline(((parseInt(ArchivePlayer.current_archive_time)+parseInt(ArchivePlayer.count_ff)-parseInt(ArchivePlayer.count_rw))*100)/ArchivePlayer.program_end_time);
	if (debug==1) console.log("ArchivePlayer.count_rw="+ArchivePlayer.count_rw);
	if (debug==1) console.log("ArchivePlayer.count_ff="+ArchivePlayer.count_ff);
	document.getElementById("timer").innerHTML= ArchivePlayer.timeFormat(parseInt(ArchivePlayer.current_archive_time)-parseInt(ArchivePlayer.count_rw)+parseInt(ArchivePlayer.count_ff))+" / "+ArchivePlayer.timeFormat(ArchivePlayer.program_end_time);
	ArchivePlayer.timer_rewind=setTimeout(function()
	{
	if (ArchivePlayer.count_ff>ArchivePlayer.count_rw) 
		{
		
		if ((ArchivePlayer.current_archive_time+(ArchivePlayer.count_ff-ArchivePlayer.count_rw))<=ArchivePlayer.program_end_time)
		{	
		media.seek(parseInt(ArchivePlayer.current_archive_time)+parseInt(ArchivePlayer.count_ff)-parseInt(ArchivePlayer.count_rw));		
		}
		else
		{
		media.seek(ArchivePlayer.program_end_time-1000);	
		}	
		
		}
	else
		{
		if ((ArchivePlayer.current_archive_time-(ArchivePlayer.count_rw-ArchivePlayer.count_ff))<=0)
			{
			media.seek(0);
			}
		else
			{
			media.seek(ArchivePlayer.current_archive_time-(ArchivePlayer.count_rw-ArchivePlayer.count_ff));
			}
		}
	
		if (debug==1) console.log("peremotka="+parseInt((parseInt(ArchivePlayer.count_rw)-parseInt(ArchivePlayer.count_ff))/1000));		
	ArchivePlayer.count_rw=0;
	ArchivePlayer.count_ff=0;
	media.play(1);
	Player.archive_timer=setInterval('Player.vodCurrentTime(media.playPosition);',900);
	Display.showplayer();}, 3000);
}

ArchivePlayer.timeline = function(percent)
{
	percent=Math.round(percent);
	position=-1134+Math.round(10.96*percent);
	document.getElementById("line_pos").style.marginLeft=position+"px";
}
 

ArchivePlayer.timeFormat = function (ms)
{
    sec=parseInt(ms/1000);
	h = parseInt((sec / 3600)  % 24);
	m = parseInt((sec / 60) % 60);
    s = sec % 60;    
	if(h<10) h = "0"+h;
    if(m<10) m = "0"+m;
    if(s<10) s = "0"+s;    
    return  h+":"+m+":"+s;
}

ArchivePlayer.change_interval = function(step)
{
	if (step==1) 
	{
		if (ArchivePlayer.rewind_interwal<7)
		ArchivePlayer.rewind_interwal=ArchivePlayer.rewind_interwal+1;
		document.getElementById("step").innerHTML= '<img src="img/buttons/up.png" style="vertical-align:middle;"></img>'+ArchivePlayer.intervals[0][ArchivePlayer.rewind_interwal]+'<img src="img/buttons/down.png" style="vertical-align:middle;"></img>';
		Display.showplayer();
	}
	if (step==-1) 
	{
		if (ArchivePlayer.rewind_interwal>0)
		ArchivePlayer.rewind_interwal=ArchivePlayer.rewind_interwal-1;
		document.getElementById("step").innerHTML= '<img src="img/buttons/up.png" style="vertical-align:middle;"></img>'+ArchivePlayer.intervals[0][ArchivePlayer.rewind_interwal]+'<img src="img/buttons/down.png" style="vertical-align:middle;"></img>';
		Display.showplayer();
	}	
}
