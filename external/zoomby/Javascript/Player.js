var aspects = [
        {
            "name":"fit",
            "img":null,
            "mode":0x10
        },
        {
            "name":"big",
            "img":null,
            "mode":0x40
        },
        {
            "name":"opt",
            "img":null,
            "mode":0x50
        },
        {
            "name":"exp",
            "img":null,
            "mode":0x00
        }
    ],
var aspect_current = 0,
var player_cond = 0,
var Player =
{
  index: 0,
  current_step: 30,
  steps: [5,10,20,30,60,300,600,900],
  status: '',
  status_timer: null,
  muteStatus: 0,
  volume_timer: null,
  volume_time: 3000,
  volume_time_std: 3000,
  volume_time_step: 100,
  where: 0,
  timer: new Object(),
  timer_cur: 0,         // current residual time for cheking and end timer rewind
  timer_iv: 1000,
  timer_iv_len: 1000,   // started timer period
  timer_iv_step: 1000,
  interval: new Object(),
  interval_text: "setInterval(player.every_sec, 1000);",
  mc_var: null,
  quality_time : 0,
  quality : "HQ",
  intervals:
    {
        "5":  "5 сек",
        "10": "10 сек",
        "20": "20 сек",
        "30": "30 сек",
        "60": "1 мин",
        "300":"5 мин",
        "600":"10 мин",
        "900":"15 мин"
    }
}

Player.Play = function()
{
  //stb.SetBufferSize(40000, 10000); 
 stb.SetAutoFrameRate(2);
 stb.Play(Server.Play_url); //рабочая строка
 //stb.Play("http://212.77.128.205/stalker_portal/video/faq.mp4");
 Player.status="play";
Player.status_timer = setInterval("Player.update_player()", 1000);

}

Player.Stop = function()
{
	stb.Stop();
	
	clearInterval(Player.status_timer);
}


Player.PlayOrPause = function()
{
	if (Player.status=="play")
	{
	stb.Pause();
    Player.pause_time=stb.GetPosTime();
	Player.status="pause";
	clearInterval(Player.status_timer);
	document.getElementById('playingStatus').style.display = 'block';
	document.getElementById("main").style.display = "block";
	}
	else
	{
	stb.Continue();
    /////stb.Stop();
    /////stb.SetPosTime(Player.pause_time);
    /////stb.Play(Server.Play_url);
	Player.status="play";
	Player.status_timer = setInterval("Player.update_player()", 1000);
	document.getElementById('playingStatus').style.display = 'none';
	document.getElementById("main").style.display = "none";
	}
}

Player.update_player = function()
{		
		////console.log("update_player");
		if (((stb.GetVideoInfo()).substring(11,12))!="0") //проверка на наличие потока
		{var time = stb.GetMediaLen();
	 var time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        time_obj.hours = Math.floor(time / 3600);   // current move duration in hours
        time_obj.minuts = Math.floor((time - time_obj.hours * 3600) / 60);   // current move duration in minuts
        time_obj.seconds = time - time_obj.hours * 3600 - time_obj.minuts * 60;   // current move duration in seconds
        document.getElementById('time_total').innerHTML = '/ ' + ((time_obj.hours<10)? "0" + time_obj.hours : time_obj.hours) + ':' + ((time_obj.minuts<10)? "0" + time_obj.minuts : time_obj.minuts) + ':' + ((time_obj.seconds<10)? "0" + time_obj.seconds : time_obj.seconds);

		var posTime = stb.GetPosTime();             // get current position in seconds
        //if(player.obj.duration < posTime) {return;} // sequrity
        var t_pers = stb.GetPosPercent() + 1;
        var t_time = posTime>=0 ? posTime: 0;
        var t_time_obj = {"hours":0,"minuts":0,"seconds":0};
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        var marginLeft = Math.floor((t_pers + 1) / 100 * 390); // count scrolling position
        document.getElementById('conditiion').style.marginLeft = marginLeft + 'px';  // set scrolling position
        document.getElementById('time_act').innerHTML = ((t_time_obj.hours < 10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts < 10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);
        //log('- - - -\nTime:' + ((t_time_obj.hours < 10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts < 10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds) + 'status: ' + t_pers + '%, : '+ t_time + 's, ' + marginLeft + 'px / ' + player.scrolbar_width + 'px\n - - - -');
   		document.getElementById("loading").style.display = "none";
        //Player.status_timer = setTimeout(Player.update_player(), 1000);
        if ((posTime>=time) || (posTime==(time-1)))
        {
        	Player.Stop();
                        document.getElementById("main").style.display = "none";
                    document.getElementById("film_info").style.display = "none";
                    document.getElementById("channelList").style.display = "block";
                    document.getElementById("navi").style.display = "block";
                    document.getElementById("top").style.display = "block";
                    document.getElementById("info").style.display = "block";
                    document.body.style.backgroundColor="black";
                    Player.status="";
                    stb.SetPosTime(0);
                    $('#time_act').html('00:00:00');
                    $('#time_total').html('00:00:00');
                    if (Server.parse_result.content[Main.selected_element].episodes_count>1)
                    {
                        Main.new_layer = "EPIZODES";
                    }
                    else
                    {
                        Main.new_layer = "CATALOG";
                    }
                    Main.layer=Main.new_layer;
                    Player.quality="HQ";
                    $('#quality').html(Player.quality);
                    $('#soobshenie').html("");
        }
         }    
}

Player.pressOK = function()
{
	if(document.getElementById('main').style.display!='none') {
                document.getElementById('main').style.display = 'none';
            } else {
                document.getElementById('main').style.display = 'block';
            }
}

Player.pressMute = function()
{
	    document.getElementById('volumeForm').style.display = 'none';
        //log(this.muteStatus);
        this.muteStatus = (this.muteStatus==0) ? 1 : 0;
        //log(this.muteStatus);
        stb.SetMute(this.muteStatus);
        document.getElementById('mute').style.display = (this.muteStatus==1) ? 'block' : 'none';
    
}

Player.pressVolume = function(direction)
{
        clearInterval(Player.volume_timer);
        Player.volume_timer = null;

        if(this.muteStatus==1) {
            Player.pressMute();
        }
        
        document.getElementById('volumeForm').style.display = 'block';

        Player.volume_time = Player.volume_time_std;
        Player.volume_timer = setInterval(Player.vol_timer, Player.volume_time_step);

        var step_px = 10;
        var vol_bar = stb.GetVolume(); // 300, / 20 = 5% : 15px

        //log("level volume: " + vol_bar);

        if(direction > 0) {
            vol_bar = vol_bar + 5;
            if(vol_bar>100) {vol_bar = 100;}
        } else {
            vol_bar = vol_bar - 5;
            if(vol_bar < 5) {vol_bar = 0;}
        }

        //log("level volume: " + vol_bar);

        var vol_bar_len = vol_bar * 2;
        document.getElementById('volume_bar').style.width = vol_bar_len + 'px';
        stb.SetVolume(vol_bar);
        document.getElementById('volume_num').innerHTML = vol_bar + '%';
        
    }

   Player.vol_timer =function()
    {
        if(Player.volume_time < Player.volume_time_step) {
            clearInterval(Player.volume_timer);
            Player.volume_timer = null;
            document.getElementById('volumeForm').style.display = 'none';
        }
        Player.volume_time = Player.volume_time - Player.volume_time_step;
    }

    Player.displayModeChange = function()
    {
        if(Player.dmc_var) {clearTimeout(Player.dmc_var);}
        Player.dmc_var = null;
        aspect_current = (aspect_current + 1) % 4;
        stb.SetAspect(aspects[aspect_current].mode);
        document.getElementById('screenAspect').style.backgroundImage = 'url(' + aspects[aspect_current].img + ')';
        document.getElementById('screenAspect').style.display = 'block';
        Player.dmc_var = setTimeout(function() {document.getElementById('screenAspect').style.display = 'none';}, 3000);
    }

    Player.changeStep = function(direction) {
        document.getElementById('main').style.display = 'block';
        var i;
        switch(direction) {
            case "up":
                for(i = Player.steps.length - 1; i >= 0; i--) {
                    if(Player.steps[i]==Player.current_step) {
                        //log("down | current " + i);
                        if(i==Player.steps.length - 1) {
                            Player.current_step = Player.steps[0];
                        } else {
                            Player.current_step = Player.steps[i + 1];
                        }
                        document.getElementById('interval_input').innerHTML = Player.intervals[Player.current_step];
                        break;
                    }
                }
            break;
            case "down":
                for(i = 0; i < Player.steps.length; i++) {
                    if(Player.steps[i] == Player.current_step) {
                        //log("up | current " + i);
                        if(i == 0) {
                            Player.current_step = Player.steps[Player.steps.length - 1];
                        } else {
                            Player.current_step = Player.steps[i - 1];
                        }
                        document.getElementById('interval_input').innerHTML = Player.intervals[Player.current_step];
                        break;
                    }
                }
            break;
        }
    }

    Player.FFWD = function()
    {
        //console.log("FFWD");
        document.getElementById('main').style.display = 'block';
        if (Player.status!="pause") 
        	{
        		Player.PlayOrPause();
        	}
        clearTimeout(Player.timer);
        var len = stb.GetMediaLen();

        if(Player.where == 0)
        {
            Player.where = stb.GetPosTime();
        }

        if ((Player.where+Player.current_step)>=len)
        {
        	Player.where = len-10;
        	//console.log("Player.where="+Player.where);
        }
         else
         {
         	Player.where += Player.current_step;
         }
           
        var t_time = Player.where;
        var t_time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        document.getElementById('time_act').innerHTML = ((t_time_obj.hours<10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts<10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);

        document.getElementById('conditiion').style.marginLeft = Math.floor(Player.where / len * 390) + 'px';
        Player.timer = setTimeout(Player.rewind_timer, Player.timer_iv_step);
    }


    Player.rewind_timer = function()
    {
        //log('player.timer_cur: ' + player.timer_cur);
           stb.SetPosTime(Player.where);
           Player.PlayOrPause();
           Player.where = 0;
    }

    Player.REW = function()
    {
        //console.log("REW");
        document.getElementById('main').style.display = 'block';
        if (Player.status!="pause") 
        	{
        		Player.PlayOrPause();
        	}
        clearTimeout(Player.timer);
        var len = stb.GetMediaLen();

        if(Player.where == 0)
        {
            Player.where = stb.GetPosTime();
            //console.log("Player.where="+Player.where);
        }

        if ((Player.where-Player.current_step)<=0)
        {
        	Player.where = 1;
        	//console.log("Player.where="+Player.where);
        }
         else
         {
         	Player.where = Player.where-Player.current_step;
         }
           
        var t_time = Player.where;
        var t_time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        document.getElementById('time_act').innerHTML = ((t_time_obj.hours<10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts<10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);

        document.getElementById('conditiion').style.marginLeft = Math.floor(Player.where / len * 390) + 'px';
        Player.timer = setTimeout(Player.rewind_timer, Player.timer_iv_step);
    }

    Player.Change_quality = function()
{
    if (Player.quality=="HQ")
    {
    stb.Pause();
    Player.quality_time=stb.GetPosTime();
    Player.Stop();
    Server.Play_url=Server.parse_result.content[Main.selected_element].video_sd;
    Player.Play();
    stb.SetPosTime(Player.quality_time-3);
    Player.quality="LQ";
    $('#soobshenie').html("Смена качества видео, ВЫСОКОЕ(HQ) -> НИЗКОЕ(LQ)");

    }
    else
    {
    stb.Pause();
    Player.quality_time=stb.GetPosTime();
    Player.Stop();
    Server.Play_url=Server.parse_result.content[Main.selected_element].video_hd;
    Player.Play();
    stb.SetPosTime(Player.quality_time-3);
    Player.quality="HQ";
    $('#soobshenie').html("Смена качества видео, НИЗКОЕ(LQ) -> ВЫСОКОЕ(HQ)");
    }
    $('#quality').html(Player.quality);
    document.getElementById("loading").style.display = "block"; 
}
Player.loading_disable_visible = function()
{
    document.getElementById("loading").style.display = "none";
}