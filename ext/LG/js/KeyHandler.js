var KeyHandler = {
    tvKey : null,
    MainMenuAnchor : null,
    LivePlayerAnchor : null,
    EpgMenuAnchor : null,
	ArchivePlayerAnchor : null,
    VideothekMenuAnchor : null, 
	Popup_exitAnchor : null,
	Popup_netAnchor : null,
	NullAnchor : null,
	Selectbox : null,	
	key_enter_down: false,
	password_visible: "hide",
	passsword : '',
	button_focused : 0,
	exit_or_return : 0,
	get_channel_link_timer : null
}

KeyHandler.create = function() {
	//pluginAPI.setOffScreenSaver();
    this.MainMenuAnchor  =  document.getElementById("MainMenu_Anchor");
    this.LivePlayerAnchor  =  document.getElementById("LivePlayer_Anchor");
    this.EpgMenuAnchor =  document.getElementById("EpgMenu_Anchor");
    this.ArchivePlayerAnchor  =  document.getElementById("ArchivePlayer_Anchor");
    this.Popup_exitAnchor = document.getElementById("Popup_exit_Anchor");
    this.Popup_netAnchor = document.getElementById("Popup_net_Anchor");
    if (debug==1) console.log("KeyHandler.create() - done");
  //  this.tvKey = new Common.API.TVKeyValue();	
}

KeyHandler.setFocus = function(menuID) {  
	Main.focus = menuID;
	if (debug==1) console.log("KeyHandler.setFocus Main.focus="+Main.focus);
	switch(menuID)
    {
		case Main.MainMenu_ID:
			this.MainMenuAnchor.focus();
          	break;
		case Main.LivePlayer_ID:
			this.LivePlayerAnchor.focus();
          	break;
		case Main.EpgMenu_ID:
			this.EpgMenuAnchor.focus();
         	break;
		case Main.ArchivePlayer_ID:
			this.ArchivePlayerAnchor.focus();
           	break;
		case Main.VideothekPlayer_ID:
			this.VideothekPlayerAnchor.focus();
            break;			
		case Main.Selectbox_ID:
			this.SelectboxAnchor.focus();
          	break;
		case Main.Null_layer_ID:
			this.NullAnchor.focus();
          	break;	
		case Main.Popup_exit_ID:
			this.Popup_exitAnchor.focus();
          	break;
		case Main.Popup_error_ID:
			this.Popup_errorAnchor.focus();
			break;
		case Main.Popup_net_ID:
			this.Popup_netAnchor.focus();
			break;
    default:
      if (debug==1) console.log("Unhandled key");
         }    
}

KeyHandler.MainMenuKeyDown = function()
{
    var keyCode0 = event.keyCode;
	if (debug==1) console.log("Key pressed: " + keyCode0);
	
	switch(keyCode0)
    {    
		case 34:
		case 40:
		//case this.tvKey.KEY_DOWN:
          Display.password_visible("hide");
		  Main.selected_channel=Main.selected_channel+1;
		  Main.Update_page();
		  this.key_enter_down=false;
		  if (debug==1) console.log('MainMenuKeyDown - KeyDown');

            break;
            
		case 33:
		case 38:
		//case this.tvKey.KEY_UP:
		Display.password_visible("hide");
         Main.selected_channel=Main.selected_channel-1;
		 this.key_enter_down=false;
		  Main.Update_page();
		  if (debug==1) console.log('MainMenuKeyDown - KeyUp');
           break;            

        case 37:
           //case this.tvKey.KEY_LEFT:
			Display.password_visible("hide");
			Main.selected_page=Main.selected_page-1;
			if (Main.selected_page<0)
			{
				Main.selected_page=Main.channels_pages-1;
				if ((Main.selected_channel>((server.channels.length%12)-1))&&((server.channels.length%12)!=0))
					Main.selected_channel=(server.channels.length%12)-1;
				for (var index = 0; index < 12; index++)
					{
						if ( Main.selected_channel != index ) 
						{
							document.getElementById("ch"+index).style.border="none";			
						}	
					}
			}
			this.key_enter_down=false;
			Main.Channels_update();
         if (debug==1) console.log('MainMenuKeyDown - KeyLeft')
            break;
            
		case 39:
         //case this.tvKey.KEY_RIGHT:
			Display.password_visible("hide");
			Main.selected_page=Main.selected_page+1;
			if (Main.selected_page==Main.channels_pages-1)
			{
				if (Main.selected_channel>((server.channels.length%12)-1))
				{				
					if ((server.channels.length%12)!=0) 
					Main.selected_channel=(server.channels.length%12)-1;					
				}
			}
			else
			{
				if (Main.selected_page>Main.channels_pages-1)
				Main.selected_page=0;
				for (var index = 0; index < 12; index++)
					{
						if ( Main.selected_channel != index ) 
						{
							document.getElementById("ch"+index).style.border="none";			
						}	
					}
			}
			this.key_enter_down=false;
			Main.Channels_update();
         if (debug==1) console.log('MainMenuKeyDown - Right')		 
            break;
			
		case 13:
         //case this.tvKey.KEY_ENTER:
			 if (Main.visible_message==true)
			 {
				Display.hide_message();
				Main.visible_message=false;
			 }
			 else
			 {
				if (this.key_enter_down==false)
				{
					if (Player.played_ch_id==server.channels[(12*Main.selected_page)+Main.selected_channel].id)
					{
						Display.showplayer();
						Display.hidemenu();
						KeyHandler.setFocus(Main.LivePlayer_ID);
						this.key_enter_down=false;
						if (debug==1) console.log("metka1");
						if (debug==1) console.log("Player.played_ch_id="+Player.played_ch_id);
						if (debug==1) console.log("server.channels[(12*Main.selected_page)+Main.selected_channel].id="+server.channels[(12*Main.selected_page)+Main.selected_channel].id);
					}
					else
					{
						if (server.channels[(12*Main.selected_page)+Main.selected_channel].censored==0) //проверка на родительский контроль
						{
						this.key_enter_down=true;
						server.get_ch_link();
						Main.Channels_update();
						}
						else
						{
							if (this.password_visible=="hide")
							{
								KeyHandler.password='';
								document.getElementById("pass").innerHTML="";
								Display.password_visible("show");
							}
							else
							{
								if (this.password==server.parent_password)
								{
									Player.censored=false;
									KeyHandler.password='';
									document.getElementById("pass").innerHTML="";
									Display.password_visible("hide");
									server.get_ch_link();
									server.get_epg();
									this.key_enter_down=true;
									Main.Channels_update();
								}
								else
								{
									document.getElementById("pass").innerHTML="";

									KeyHandler.password='';
								}
								if (debug==1) console.log("rod_kontrol=" + KeyHandler.password);
								
							}
						}
					}
				}
				else
				{
				Display.showplayer();
				Display.hidemenu();
				KeyHandler.setFocus(Main.LivePlayer_ID);
				this.key_enter_down=false;
				if (debug==1) console.log("metka2");
				}
			 }
			if (debug==1) console.log('MainMenuKeyDown - Enter(Ok)');
            break;
	    	

       	case 403:
       		setTimeout(function()
					{
       		if (server.channels[(12*Main.selected_page)+Main.selected_channel].censored==0)
			{
					server.get_epg_day(0);
					EPG.week_week_day();
					Display.hidemenu();
					Display.showEPG();
					Player.stopVideo();
					server.media_info_delete();					
			}
			else
			{
			if (Player.played_ch_id==server.channels[(12*Main.selected_page)+Main.selected_channel].id)
					{
			server.get_epg_day(0);
			EPG.week_week_day();
			Display.hidemenu();
			Display.showEPG();
			Player.stopVideo();
			server.media_info_delete();
			}
			else
			{
				Main.message(2,"Нажмите на канале OK, Введите пароль.");
				}
			}
	
			if (debug==1) console.log('MainMenuKeyDown - KEY_RED');
					},200);
            break;	

			
			case 49:
			if (debug==1) console.log("KEY-1");
			if (this.password_visible=="show")
				{
					this.password=this.password+"1";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}	
			break;
            
            case 50:
			if (debug==1) console.log("KEY-2");
            if (this.password_visible=="show")
				{
					this.password=this.password+"2";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 51:
			if (debug==1) console.log("KEY-3");
			if (this.password_visible=="show")
				{
					this.password=this.password+"3";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 52:
			if (debug==1) console.log("KEY-4");
				if (this.password_visible=="show")
				{
					this.password=this.password+"4";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
			
            case 53:
			if (debug==1) console.log("KEY-5");
				if (this.password_visible=="show")
				{
					this.password=this.password+"5";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 54:
			if (debug==1) console.log("KEY-6");
			if (this.password_visible=="show")
				{
					this.password=this.password+"6";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 55:
			if (debug==1) console.log("KEY-7");
				if (this.password_visible=="show")
				{
					this.password=this.password+"7";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 56:
			if (debug==1) console.log("KEY-8");
            if (this.password_visible=="show")
				{
					this.password=this.password+"8";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 57:
			if (debug==1) console.log("KEY-9");
            if (this.password_visible=="show")
				{
					this.password=this.password+"9";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
            
            case 48:
			if (debug==1) console.log("KEY-0");
				if (this.password_visible=="show")
				{
					this.password=this.password+"0";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
			break;
			
		case 461:		
		Display.show_popup_exit();		
        if (debug==1) console.log('MainMenuKeyDown - KEY Back');
        break;		
		
		case 413:
			Player.stopVideo();
			server.media_info_delete();
			if (debug==1) console.log('MainMenuKeyDown - KEY STOP');
	        break;			
			
		case 415:
			if (debug==1) console.log('MainMenuKeyDown - KEY PLAY');
	        break;
		
		case 19:
				//Display.status('test');
				if (debug==1) console.log('MainMenuKeyDown - KEY PAUSE');
	        break;
	        
		case 405:
					//Display.show_popup_net();
			//net.check();
			break;			    
        default:
            if (debug==1) console.log("Unhandled key");
            break;
    }
}

KeyHandler.LivePlayerKeyDown = function()
{
	var keyCode1 = event.keyCode;
	if (debug==1) console.log("LivePlayerKeyDown _Key pressed: " + keyCode1);

	switch(keyCode1)
    {			
		case 147:
            break;
		
       		//case this.tvKey.KEY_INFO:
		case 406:	
		case 457:
				Display.showplayer();
				if (debug==1) console.log('LivePlayerKeyDown - KEY_INFO');
			break;
			
		case 404:
				if (debug==1) console.log('LivePlayerKeyDown - KEY_ASPECT');
				window.NetCastLaunchRATIO();
            break;
            
		case 40:
		case 34:	
		//case this.tvKey.KEY_DOWN:
			Main.selected_channel=Main.selected_channel-1;
			Main.Update_page();
			if (server.channels[(12*Main.selected_page)+Main.selected_channel].censored==0)
			{
				Main.clear_player_epg();
				if (Player.played_ch_id!=server.channels[(12*Main.selected_page)+Main.selected_channel].id)
					{
					clearTimeout(KeyHandler.get_channel_link_timer);
					KeyHandler.get_channel_link_timer=setTimeout("server.get_ch_link();",900);
					}
				Display.password_visible("hide");
				Display.showplayer();
			}
			else
			{
				Display.password_visible("show");
				document.getElementById("player").style.display="block";
				document.getElementById("help_navi_player").style.display="block";
				setTimeout('Player.stopVideo()',1000);
			}

		  if (debug==1) console.log('LivePlayerKeyDown - KEY_DOWN');
            break;
            
       case 38:	 
       case 33:
	   //case this.tvKey.KEY_UP:
		  Main.selected_channel=Main.selected_channel+1;
		  Main.Update_page();
		  if (server.channels[(12*Main.selected_page)+Main.selected_channel].censored==0)
			{
				Main.clear_player_epg();
				if (Player.played_ch_id!=server.channels[(12*Main.selected_page)+Main.selected_channel].id) 
				{
					clearTimeout(KeyHandler.get_channel_link_timer);
					KeyHandler.get_channel_link_timer=setTimeout("server.get_ch_link();",900);
					}
				Display.password_visible("hide");
				Display.showplayer();
			}
			else
			{
				Display.password_visible("show");
				document.getElementById("player").style.display="block";
				document.getElementById("help_navi_player").style.display="block";
				setTimeout('Player.stopVideo()',1000);
			}

		  if (debug==1) console.log('LivePlayerKeyDown - KEY_UP');		  
             break;            

			
	   case 13: 
	   //case this.tvKey.KEY_ENTER:
			if (Main.visible_message==true)
			 {
				Display.hide_message();
				Main.visible_message=false;
			 }
			 else
			 {	
				if (this.password_visible=="hide")
					{				
						Main.Update_page();
						Display.hideplayer();
						Display.showmenu();
						KeyHandler.setFocus(Main.MainMenu_ID);
					}
					else
					{
						if (this.password==server.parent_password)
								{
									Player.censored=false;
									Display.password_visible("hide");
									server.get_ch_link();
									server.get_epg();
									Display.showplayer();
									//Main.Channels_update();
								}
								else
								{
									document.getElementById("pass").innerHTML="";									
									KeyHandler.password='';
								}
			}
			}
			if (debug==1) console.log('LivePlayerKeyDown - KEY_ENTER');
            break;
			
	   case 461 :
		   Main.Update_page();
			Display.hideplayer();
			Display.showmenu();
			KeyHandler.setFocus(Main.MainMenu_ID);
		   if (debug==1) console.log('LivePlayerKeyDown - KEY_BACK');
		   break;
	   
	   case 403:
		   //case this.tvKey.KEY_RED:
		   setTimeout(function()
					{
		   if (server.channels[(12*Main.selected_page)+Main.selected_channel].censored==0)
			{
					server.get_epg_day(0);
					EPG.week_week_day();
					Display.hidemenu();
					Display.showEPG();
					Player.stopVideo();
					server.media_info_delete();
					Display.hideplayer();
			}
			else
			{
			if ((Player.played_ch_id==server.channels[(12*Main.selected_page)+Main.selected_channel].id)&&(KeyHandler.password_visible!="show"))
					{
			server.get_epg_day(0);
			EPG.week_week_day();
			Display.hidemenu();
			Display.showEPG();
			Player.stopVideo();
			server.media_info_delete();
			Display.hideplayer();
			}			
			}
			if (debug==1) console.log("key_red");
					},200);
            break;
           
            case 49:            	
			if (this.password_visible=="show")
				{
					this.password=this.password+"1";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(1);
				}
			if (debug==1) console.log("KEY-1");                        
			break;
            
            case 50:
			if (this.password_visible=="show")
				{
					this.password=this.password+"2";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(2);
				}
			if (debug==1) console.log("KEY-2");
			break;
            
            case 51:
			if (this.password_visible=="show")
				{
					this.password=this.password+"3";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(3);
				}
			if (debug==1) console.log("KEY-3");
			break;
            
            case 52:
			if (this.password_visible=="show")
				{
					this.password=this.password+"4";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(4);
				}
			if (debug==1) console.log("KEY-4");
			break;
			
            case 53:
			if (this.password_visible=="show")
				{
					this.password=this.password+"5";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(5);
				}
			if (debug==1) console.log("KEY-5");
			break;
            
            case 54:
			if (this.password_visible=="show")
				{
					this.password=this.password+"6";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(6);
				}
			if (debug==1) console.log("KEY-6");
			break;
            
            case 55:
			if (this.password_visible=="show")
				{
					this.password=this.password+"7";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(7);
				}
			if (debug==1) console.log("KEY-7");
			break;
            
            case 56:
			if (this.password_visible=="show")
				{
					this.password=this.password+"8";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(8);
				}
			if (debug==1) console.log("KEY-8");
			break;
            
            case 57:
			if (this.password_visible=="show")
				{
					this.password=this.password+"9";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(9);
				}
			if (debug==1) console.log("KEY-9");
			break;
            
            case 48:
			if (this.password_visible=="show")
				{
					this.password=this.password+"0";
					document.getElementById("pass").innerHTML= document.getElementById("pass").innerHTML+"*";
				}
				else
				{
					Display.ShowChannelNumber(0);
				}
			if (debug==1) console.log("KEY-0");
			break;
            
         case 413:
        	 if (debug==1) console.log('LivePlayerKeyDown - KEY STOP');
 	        break;	
            
		default:
            if (debug==1) console.log("Unhandled key");
            break;
	}
}

KeyHandler.EpgMenuKeyDown = function()
{
    var keyCode2 = event.keyCode;
    if (debug==1) console.log("Key pressed: " + keyCode2);

    switch(keyCode2)
    {
    	
    	case 461:
	   	//case this.tvKey.KEY_RETURN:	
		//case this.tvKey.KEY_CHLIST:		
			Display.hideEPG();
			Display.showmenu();
			KeyHandler.setFocus(Main.MainMenu_ID);
			document.getElementById("ch_name").innerHTML = server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].number+'. '+server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].name;
			Player.played_ch_id=server.channels[(12*Main.selected_page)+Main.selected_channel].id;
			server.get_ch_link(Player.played_ch_id);
			EPG.epg_day=0;
			Main.Channels_update();			
			//ArchivePlayer.program_end_time=0;
			break; 	

		case 40: 
		//this.tvKey.KEY_DOWN:;
            EPG.next();
            if (debug==1) console.log("EpgMenuKeyDown - KEY_Down");
            break;
            
		case 38:
            //case this.tvKey.KEY_UP:
            EPG.previous();
            if (debug==1) console.log("EpgMenuKeyDown - KEY_UP");
            break;            

		case 37:
		//case this.tvKey.KEY_LEFT:
            EPG.left();
            if (debug==1) console.log("EpgMenuKeyDown - KEY_LEFT");
            break;
            
		case 39:
		//case this.tvKey.KEY_RIGHT:
            EPG.Right();
            if (debug==1) console.log("EpgMenuKeyDown - KEY_RIGHT");
            break;
			
		case 13:
            //case this.tvKey.KEY_ENTER:
			
			if (Main.visible_message==true)
			 {
				Display.hide_message();
				Main.visible_message=false;
			 }
			 else
			 {
				if ($("#pr"+EPG.selected_li).attr('archive')==1)
				{
				document.getElementById("timer").innerHTML = "00:00:00 / 00:00:00";
				document.getElementById("ch_name").innerHTML = '   '+server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].name+" - "+$("#pr"+EPG.selected_li).attr('name');
				server.get_epg_link($("#pr"+EPG.selected_li).attr('epgid'));				
				document.getElementById("psl").style.display="none";
				document.getElementById("psl_archive").style.display="block";
				}
			 }
            break;					
			
        default:
            if (debug==1) console.log("Unhandled key");
            break;
    }	
}

KeyHandler.ArchivePlayerKeyDown = function()
{
	var keyCode3 = event.keyCode;
	if (debug==1) console.log("Key pressed: " + keyCode3);
			
	switch(keyCode3)
    {
		
		case 406:
		case 457:
		//case this.tvKey.KEY_INFO:
		Display.showplayer();
		break;	
		
		case 404:
			//case this.tvKey.KEY_GREEN:
			if (debug==1) console.log('ArchivePlayerKeyDown - KEY_GREEN');
			window.NetCastLaunchRATIO();
            break;
	 			
		case 40:
        //case this.tvKey.KEY_DOWN:	
			ArchivePlayer.change_interval(-1);
            break;
			
		case 38:
        //case this.tvKey.KEY_UP:
			ArchivePlayer.change_interval(1);
            break;
		case 417:
		case 39:
        //case this.tvKey.KEY_RIGHT:
        //case this.tvKey.KEY_FF:
			//media.seek(300000);
			////media.fastFoward();
			ArchivePlayer.rewind("FF");
            break;
        
		case 412:
		case 37:
            //case this.tvKey.KEY_LEFT:
		//case this.tvKey.KEY_RW:
          
		   ArchivePlayer.rewind("RW");
            break;							
           
		case 413:
		case 461:
            //case this.tvKey.KEY_STOP:
	    //case this.tvKey.KEY_RETURN:			
			Player.stopVideo();
			Display.hideplayer();
			clearTimeout(ArchivePlayer.timer_rewind);
			document.getElementById("psl").style.display="block";
			document.getElementById("psl_archive").style.display="none";
			KeyHandler.setFocus(Main.EpgMenu_ID);
			Display.showEPG();
			$("#programm").scrollTop(Display.sroll_epg);
			ArchivePlayer.timeline(0);
			server.media_info_delete();
			clearTimeout(Player.archive_timer);
			break;
			
		case 13:
		case 19:
	    case 415:
			//case this.tvKey.KEY_PLAY:
	    	if (Main.visible_message==true)
			 {
				Display.hide_message();
				Main.visible_message=false;
			 }
			 else
			 {	
			if(Player.state == Player.PAUSA_ARCHIVE)
				ArchivePlayer.unpauseVideo()
			else	
				{
					if(Player.state == Player.PLAYING_ARCHIVE)
					ArchivePlayer.pauseVideo();	
				}
			 }
            break;
            
	    case 4005:
	    	if (Player.state==Player.PLAYING_ARCHIVE)
			{					
				if (debug==1) console.log('playInfo.duration='+playInfo.duration);
				if (debug==1) console.log('media.playPosition='+ media.playPosition);
				if (debug==1) console.log('media.playTime='+ media.playTime);
				if (debug==1) console.log('media.playState='+media.playState);
				Player.vodCurrentTime(media.playPosition);
			}
	    	break;
		 
		default:
            if (debug==1) console.log("Unhandled key");
            break;
	}
}

KeyHandler.PopupExitControllKeyDown = function()
{
	//alert("работает");
	if (debug==1) console.log("PopupExitControllKeyDown");
	var keyCode10 = event.keyCode;
	if (debug==1) console.log("Key pressed: " + keyCode10);
			
	switch(keyCode10)
    {		
		case 461:
		//widgetAPI.blockNavigation(event);
		Display.hide_popup_exit();
		KeyHandler.exit_or_return=0;
		break;
	
		case 39:
		document.getElementById("button2").style.backgroundColor="white";
	document.getElementById("button2").style.color="#193D67";
	document.getElementById("button1").style.backgroundColor="#193D67";
	document.getElementById("button1").style.color="white";
	KeyHandler.button_focused=2;
		break;
		
		case 37:
		document.getElementById("button1").style.backgroundColor="white";
	document.getElementById("button1").style.color="#193D67";
	document.getElementById("button2").style.backgroundColor="#193D67";
	document.getElementById("button2").style.color="white";
	KeyHandler.button_focused=1;
		break;
		
		case 13:
		if (KeyHandler.button_focused==1)
		{
			document.getElementById("popup1").style.display="none";
			$('.overlay').hide();
			//Player.deinit();
			document.getElementById("main").style.display="none";
			server.media_info_delete();
			setTimeout('window.NetCastBack();',1000);
		}
		else
		{
			Display.hide_popup_exit();
			KeyHandler.exit_or_return=0;
			KeyHandler.setFocus(Main.MainMenu_ID);
		}
		
		break;
		
	}
}

KeyHandler.PopupNetControllKeyDown = function()
{
	//alert("работает");
	if (debug==1) console.log("PopupNetControllKeyDown");
	var keyCode14 = event.keyCode;
	if (debug==1) console.log("Key pressed: " + keyCode14);
			
	switch(keyCode14)
    {		
		case 461:
		case 13:	
		//widgetAPI.blockNavigation(event);
		window.NetCastBack();
		break;		
	}
}