var Display =
{
    channel_timer : null,
	status_timer : null,
	statusDiv : null,
    number_channel : 0
}

Display.init = function()
{
    this.statusDiv = document.getElementById("status");
    if (debug==1) console.log("Display.init() - done");
}

Display.hidemenu = function()
{
   
	document.getElementById("main").style.display="none";
}

Display.showmenu = function()
{
    	document.getElementById("main").style.display="block";
}

Display.hideplayer = function()
{
	document.getElementById("player").style.display="none";
	
	if(Player.state == Player.PLAYING_ARCHIVE)
	{
		document.getElementById("help_navi_archive_player").style.display="none";
		document.getElementById("help_navi_player").style.display="block";
		document.getElementById("help_navi_vod_player").style.display="none";
	}
	if(Player.state == Player.PLAYING_VOD)
	{
		document.getElementById("help_navi_archive_player").style.display="none";
		document.getElementById("help_navi_player").style.display="none";
		document.getElementById("help_navi_vod_player").style.display="block";
	}
}

Display.showplayer = function()
{
    if(Player.state == Player.PLAYING_ARCHIVE)
	{
		document.getElementById("help_navi_archive_player").style.display="block";
		document.getElementById("help_navi_player").style.display="none";
		document.getElementById("help_navi_vod_player").style.display="none";
		Main.MODE = Main.ArchivePlayer_ID;
	}
    if(Player.state == Player.PLAYING_VOD)
	{
		document.getElementById("help_navi_archive_player").style.display="none";
		document.getElementById("help_navi_player").style.display="none";
		document.getElementById("help_navi_vod_player").style.display="block";
	}
    if(Player.state == Player.PLAYING)
	{
		document.getElementById("help_navi_archive_player").style.display="none";
		document.getElementById("help_navi_player").style.display="block";
		document.getElementById("help_navi_vod_player").style.display="none";
		Main.MODE = Main.LivePlayer_ID;		
	}
	
	clearTimeout(this.infobar_timer);
	document.getElementById("player").style.display="block";
	Display.infobarTimer();
}
	
Display.infobarTimer = function()
{
	this.infobar_timer=setTimeout("Display.hideplayer()",6000);
}

Display.password_visible = function(status)
{
	if (status=="show")
	{
		KeyHandler.password='';
		document.getElementById("pass").innerHTML="";
		document.getElementById("password").style.display="block"; 
		  KeyHandler.password_visible="show";
	}
	else
	{
		document.getElementById("password").style.display="none"; 
		KeyHandler.password_visible="hide";
		KeyHandler.password='';
		document.getElementById("pass").innerHTML="";
	}
	if (debug==1) console.log("Display.password_visible status= "+status);
}

Display.status = function(status)
{
	document.getElementById("statusbar").style.display="block";
	document.getElementById("statusbar").innerHTML=status;
	clearTimeout(this.status_timer);
	Display.statusTimer();
}

Display.hidestatus = function()
{
	document.getElementById("statusbar").style.display="none";
}

Display.statusTimer = function()
{
	this.status_timer=setTimeout("Display.hidestatus()",5000);
}

Display.ShowChannelNumber = function(nomer)
{
	
if ((Display.number_channel != 0)&&(Display.number_channel !=""))
{

	if (Display.number_channel.length<3) Display.number_channel = String(Display.number_channel) + String(nomer);
} 
else 
{
Display.number_channel = String(nomer);
}
 document.getElementById("channel").innerHTML = Display.number_channel;
 clearTimeout(Display.channel_timer);
Display.ChannelNumberTimer();
}

Display.HideChannelNumber = function()
{
document.getElementById("channel").innerHTML = "";
if (debug==1) console.log("number_channel=" + Display.number_channel);
 if (Display.number_channel != 0) 
 {
	Main.switch_сhannel(Display.number_channel);
 }
Display.number_channel = 0;
}

Display.ChannelNumberTimer = function()
{
	Display.channel_timer=setTimeout("Display.HideChannelNumber()",1500);
}

Display.showEPG = function()
{
    
	document.getElementById("epg-archiv").style.display="block";
	Main.MODE = Main.EpgMenu_ID;
}

Display.hideEPG = function()
{
   
	this.sroll_epg=$("#programm").scrollTop();
	document.getElementById("epg-archiv").style.display="none";
}

Display.hide_message = function()
{
	document.getElementById("info_block").style.display="none";
}

Display.show_message = function()
{
	if (debug==1) console.log('show message');
	document.getElementById("info_block").style.display="block";
}

Display.show_popup_exit = function()
{
	document.getElementById("popup1").style.display="block";
	$('.overlay').show();
	KeyHandler.setFocus(Main.Popup_exit_ID);
	document.getElementById("button1").style.backgroundColor="white";
	document.getElementById("button1").style.color="#193D67";
	document.getElementById("button2").style.backgroundColor="#193D67";
	document.getElementById("button2").style.color="white";
	KeyHandler.button_focused=1;
}

Display.hide_popup_exit = function()
{
	document.getElementById("popup1").style.display="none";
	$('.overlay').hide();
	KeyHandler.setFocus(Main.MODE);	
	KeyHandler.button_focused=1;
}

Display.show_popup_net = function()
{
	document.getElementById("popup3").style.display="block";
	$('.overlay').show();
	KeyHandler.setFocus(Main.Popup_net_ID);	
}