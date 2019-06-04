var Main = {
	popravka : 0,
	channels_pages: 0,
	selected_channel: 0,
	selected_page: 0,
	chan_array_index: 0,
	ch_id_selected: 0,
	focus : null,
	visible_message : false,
	MODE : -1,
    MainMenu_ID : 0,
    LivePlayer_ID : 1,
    EpgMenu_ID : 2,
	CategoryMenu_ID : 3,
    ArchivePlayer_ID : 4,
    VideothekPlayer_ID : 5,
	VideothekPlayerControll_ID : 6,	
    Selectbox_ID : 8,
	Message_ID:10,
	Null_layer_ID : 11,
	Popup_exit_ID : 12,
	Popup_error_ID : 13,
	Popup_net_ID : 14,
	next_epg : [ ],
	version : "Beta 0.0.2",
	mac_md5 : null,
    cat_id : 0
    	
}

Main.init = function()
{
		//account.create();
		Display.init();
		Player.init();
		KeyHandler.create();
		server.timezone();
       	this.selected_channel = 0;									
		server.Time();		
		this.MODE = this.MainMenu_ID;
		document.getElementById('widget_date').innerHTML = server.DateMenu();
		KeyHandler.setFocus(this.MainMenu_ID);
		net.check();		
}

Main.Channels_update = function ()
{
	if (Main.selected_page>0) Main.popravka = 2*Main.selected_page; else Main.popravka = 0;
	for (var index = 0; index < 12; index++)
	{
		if (index+Main.popravka+(10*Main.selected_page)<=(server.channels.length-1))
		{
		vyvod='';
		document.getElementById("ch"+index).style.display="block";

	document.getElementById("number"+index).style.backgroundColor="#235896";
	document.getElementById("number"+index).style.color="#fff";
	document.getElementById("chan"+index).style.backgroundColor="#235896";
	document.getElementById("title"+index).style.color="#fff";
	document.getElementById("ch_lo"+index).style.backgroundColor="#235896";
	document.getElementById("ch_lo"+index).style.color="#fff";
	
		document.getElementById("number"+index).innerHTML=server.channels[index+(10*Main.selected_page)+Main.popravka].number;
		
		if (server.channels[index+(10*Main.selected_page)+Main.popravka].logo!='')
		document.getElementById("img"+index).src="http://212.77.128.205"+server.channels[index+(10*Main.selected_page)+Main.popravka].logo
		else
		document.getElementById("img"+index).src="img/48-48.png";
		if (server.channels[index+(10*Main.selected_page)+Main.popravka].favorite==1) vyvod=vyvod+'<img src="img/fav.png"></img>';
		if (server.channels[index+(10*Main.selected_page)+Main.popravka].censored==1) vyvod=vyvod+'<img src="img/lock1.png"></img>';
		if (server.channels[index+(10*Main.selected_page)+Main.popravka].archive==1) vyvod=vyvod+'<img src="img/record1.png"></img>';
		if (server.channels[index+(10*Main.selected_page)+Main.popravka].id==Player.played_ch_id) 			//
		{ 																									//
		if (index!=Main.selected_channel) document.getElementById("title"+index).style.color='yellow'; 		//
		}																									//
		else																								//
		{																									//
		document.getElementById("title"+index).style.color='white'; 
		}																									//
		document.getElementById("title"+index).innerHTML= vyvod+server.channels[index+(10*Main.selected_page)+Main.popravka].name;

		}																									//
		else																								//
		{																									//
		document.getElementById("ch"+index).style.display="none";											//
	 }

	}
	
	document.getElementById("number"+Main.selected_channel).style.backgroundColor="#fff";
	document.getElementById("number"+Main.selected_channel).style.color="#235896";
	document.getElementById("chan"+Main.selected_channel).style.backgroundColor="#fff";
	document.getElementById("title"+Main.selected_channel).style.color="#235896";
	document.getElementById("ch_lo"+Main.selected_channel).style.backgroundColor="#fff";
	document.getElementById("ch_lo"+Main.selected_channel).style.color="#235896";
	if (server.channels[Main.selected_channel+(12*Main.selected_page)].censored==0)
	{
	Player.censored=false;
	}
	else
	{
	Player.censored=true;
	}
	this.epg_timer=setTimeout('server.get_epg()', 500);
	document.getElementById("ch_name").innerHTML= server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].number+'. '+server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].name;
	if (server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].logo!='')
	{
	document.getElementById("ch_img").src="http://212.77.128.205"+server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].logo.replace('/120/','/240/');
	document.getElementById("epg_ch_logo_img").src="http://212.77.128.205"+server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].logo.replace('/120/','/320/');
	}
	else
	{
	document.getElementById("ch_img").src="img/72-72.png";
	document.getElementById("epg_ch_logo_img").src="img/72-72.png";
	}
//	if (Main.focus==Main.LivePlayer_ID) Display.showplayer();
	if (debug==1) console.log("Channels_udate done1");
}

Main.Update_page = function()
{
	for (var index = 0; index < 12; index++)
	{
		if ( Main.selected_channel != index ) 
		{
		document.getElementById("ch"+index).style.border="none";			
		}
	}
	if (debug==1) console.log('Main.selected_channel='+Main.selected_channel);
	if ((Main.selected_channel==12)||((Main.selected_channel+(10*Main.selected_page)+Main.popravka)==server.channels.length))
	{
	Main.selected_channel=0;
	if (Main.selected_page<(Main.channels_pages-1))
	{
		Main.selected_page++;
		if (debug==1) console.log('Main.selected_page='+Main.selected_page);

	}
	else
	{
		Main.selected_page=0;
		if (debug==1) console.log('Main.selected_page='+Main.selected_page);

	}
	}
	if (Main.selected_channel==-1)
	{
		if (Main.selected_page==0)
		{
		Main.selected_page=Main.channels_pages-1;
		if ((server.channels.length%12)==0)
		{
		Main.selected_channel=11;

		}
		else
		{
		Main.selected_channel=(server.channels.length%12)-1;
	
		}
		}
		else
		{
		Main.selected_page=Main.selected_page-1;
		Main.selected_channel=11;

		}
		
	}
	clearTimeout(this.epg_timer);
	Main.Channels_update();
	if (debug==1) console.log('Main.Update_page() - done');

}

Main.switch_сhannel = function(ch_number)
{
	if (server.channels[Main.selected_channel+(10*Main.selected_page)+Main.popravka].number!=ch_number)
	{
		for (var index = 0; index < server.channels.length; index++)
	{
		if ( server.channels[index].number == ch_number ) 
		{
				if (server.channels[index].censored==0)
				{
				Main.selected_page=parseInt(index/12); 
				if (debug==1) console.log('Main.selected_page='+Main.selected_page);
				Main.selected_channel=index%12;
				if (debug==1) console.log('Main.selected_channel='+Main.selected_channel);
				server.get_ch_link();
				Main.Update_page();
				document.getElementById("pr1_time").innerHTML = '';
				document.getElementById("pr1_name").innerHTML = '';
				document.getElementById("pr2_time").innerHTML = '';
				document.getElementById("pr2_name").innerHTML = '';
				Display.showplayer();
				}
		}
		
	}
	}	
}

Main.clear_player_epg = function()
{
				document.getElementById("pr1_time").innerHTML = '';
				document.getElementById("pr1_name").innerHTML = '';
				document.getElementById("pr2_time").innerHTML = '';
				document.getElementById("pr2_name").innerHTML = '';
}

Main.message = function(type, content)
{
	if (type==0) 
	{
		document.getElementById("info_block").style.top="297px";
		document.getElementById("info_block").style.left="423px";
		document.getElementById("info_block").style.width="350px";
		document.getElementById("content").style.textAlign="center";
		document.getElementById("content").style.width="270px";
		document.getElementById("content").innerHTML =content;
		Display.show_message();
	}
	if (type==1)
	{
		document.getElementById("info_block").style.top="540px";
		document.getElementById("info_block").style.left="22px";
		document.getElementById("info_block").style.width="1184px";
		document.getElementById("content").style.textAlign="left";
		document.getElementById("content").style.width="1106px";
		document.getElementById("content").innerHTML =content;
		Display.show_message();
		Main.visible_message=true;
	}
	if (type==2) 
	{
		document.getElementById("info_block").style.top="297px";
		document.getElementById("info_block").style.left="423px";
		document.getElementById("info_block").style.width="350px";
		document.getElementById("info_block").style.height="130px";
		document.getElementById("content").style.height="130px";
		document.getElementById("content").style.textAlign="center";
		document.getElementById("content").style.width="270px";
		document.getElementById("content").innerHTML =content;
		Display.show_message();
		Main.visible_message=true;
	}
}