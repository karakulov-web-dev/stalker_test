function convert(s) //Функция для замены в урле "%3A" на ":" и "%2F" на "/"
{
	s=((s.replace(/%3A/gim, ":")).replace(/%2F/gim, "/"));

	return s;
}
function keydown(e) {
	
	var code = e.keyCode || e.which;
	if (e.shiftKey) {code += 1000;}
	if (e.altKey) {code += 2000;}
		if (Main.layer=="CATEGORY")
	{
	switch(code) {
		case 13: //key-Enter
				Server.page_catalog = 0;
				//Main.new_layer="CATALOG";
				Main.new_layer="NONE";
				Server.selected_genre = Server.parse_result[(Main.selected_page*10)+Main.selected_element].id;
				//console.log("selected_genre="+Server.selected_genre);
				Server.Request_catalog();
				Main.Enter=1;
				//---------------------------------------------------------
				//console.log("Server.undex="+Server.undex);
				Server.step_selected_page_menu[Server.undex]=Main.selected_page;
				Server.step_selected_element[Server.undex]=Main.selected_element;
				
				//console.log("Server.step_selected_page_menu[Server.undex]="+Server.step_selected_page_menu[Server.undex]);
				//console.log("Server.step_selected_element[Server.undex]="+Server.step_selected_element[Server.undex]);
				Server.step[Server.undex] = Server.parse_result;
				Server.undex=Server.undex+1;
				//---------------------------------------------------------
				document.getElementById("info_film").style.display = "block";
				document.getElementById("loading").style.display = "block";
		break;
	case 40: //key-down
					
					if (Main.selected_element == 9) 
					{
						if (Server.chan_pages == 1)
						{
							Main.select_element = 0;
						}
						else
						{
						if (Main.selected_page == Server.chan_pages-1) 
						{
							Main.selected_page = 0;
							Main.updatePage();//test
						} 
						else 
						{
							Main.selected_page=Main.selected_page + 1;
							Main.updatePage();
							//Main.Selected();
						}
						}
						Main.selected_element = 0;
						Main.Selected();
					}
					else
					{	
						if (((Main.selected_page*10+Main.selected_element)) == (Server.parse_result.length-1))
							{
							  Main.selected_page = 0;
							  Main.selected_element = 0; 
							  Main.updatePage(); 
							}
							else
							{
							Main.selected_element = Main.selected_element+1;
							}
					}
					//console.log('Main.selected_element='+Main.selected_element);
					Main.Selected();
					
					//alert('Main.selected_element ='+Main.selected_element);
				break;
				case 38: //key_up
					//console.log("key_up");
					if (Main.selected_element == 0) 
					{
						if (Server.chan_pages==1)
							{
							Main.selected_element = Server.parse_result.length-1;
							//console.log("SRABOTAL if (Server.chan_pages==1)");
							}
						else
						   {
							if (Server.selected_page>0 && Server.selected_page<Server.chan_pages-1)
							{
								//console.log("SRABOTAL if (Server.selected_page>0 && Server.selected_page<Server.chan_pages-1)");
							 Main.selected_element = 9;
							 Main.selected_page=Main.selected_page-1;
							}
							else
							{
								if ((Main.selected_page == 0) && (Server.chan_pages>1)) 
								{
									//console.log("SRABOTAL if, if ((Main.selected_page == 0) && (Server.chan_pages>1))");
									Main.selected_page = Server.chan_pages-1;
									if ((Server.parse_result.length%10) == 0) 
										{ 
											Main.selected_element = 9; 
										} 
									else 
										{
											Main.selected_element = (Server.parse_result.length-1)%10;
										 }
								}
								else
								{
									//console.log("SRABOTAL else");
									Main.selected_element = 9;
									if (Server.chan_pages > 1) Main.selected_page = Main.selected_page - 1;
								} 
							}
							} 
						//Main.selected_page = Server.chan_pages-1;
						Main.updatePage();
					}
					else
					{	
						Main.selected_element = Main.selected_element-1;
					}
					//Main.selected_element = Main.selected_element-1;
					//Main.updatePage();
					Main.Selected();
					//alert('up');
				break;
				case 39: //key_right
				//console.log("key_right");
				if (Main.selected_page==Server.chan_pages-1)
				{
					Main.selected_page = 0;
				}
				else
				{
					Main.selected_page = Main.selected_page +1;
					if ((Main.selected_page==Server.chan_pages-1)  && ((Server.parse_result.length%10)<=Main.selected_element) && ((Server.parse_result.length%10)!=0))
						{
						Main.selected_element = (Server.parse_result.length%10)-1;
						}
				}
				Main.updatePage();
				break;
				case 37: //key_left
				//console.log("key_left");
				if (Main.selected_page==0)
				{
					Main.selected_page = Server.chan_pages-1;
					if ((Main.selected_page==Server.chan_pages-1)  && ((Server.parse_result.length%10)<=Main.selected_element) && ((Server.parse_result.length%10)!=0))
						{
						Main.selected_element = (Server.parse_result.length%10)-1;
						}
				}
				else
				{
					Main.selected_page = Main.selected_page -1;					
				}
				Main.updatePage();
				break;
				case 27: //key_exit
				//console.log("layer:CATEGORY|||key:key_exit");
				Main.new_layer="NONE";
				document.getElementById("loading").style.display = "block";
				Server.Request_menu();
				Server.undex = 0;
				Main.selected_page = 0;
				Main.selected_element = 0;
				Server.page_catalog = 0;
  				//Main.updatePage();		
				//Main.new_layer="MENU";
				break;
				case 114:  //ellow
					document.getElementById('search_val').value = '';
        			document.getElementById('yt_search_bg').style.display = 'block';
        			document.getElementById("search_val").focus();
        			Main.new_layer="SEARCH";
        			setTimeout(function() {stb.ShowVirtualKeyboard();}, 350);
					//stb.ShowVirtualKeyboard();
					document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("widget_time").style.display = "none";
					
				break;
	}
	}
	if (Main.layer=="MENU")
	{
	switch(code) {
				case 13: //key-Enter
				//console.log("Layer=MENU|||key-Enter");
				Server.selected_category = Server.parse_result[(Main.selected_page*10)+Main.selected_element].id;
				//console.log("selected_category="+Server.selected_category);
				  Server.parse_result=Server.parse_result[(Main.selected_page*10)+Main.selected_element].items;
				  
				  //console.log(Server.parse_result[0].name);
				  data = Server.parse_result;
   				//console.log("K-vo obektov="+Server.parse_result.length);
  				if ((data.length % 10)>0)
  				{
				Server.chan_pages = Math.floor(data.length/10) + 1;
				}
	 			else
  				{
  				Server.chan_pages = Math.floor(data.length/10);
  				}
 				//console.log("Server.chan_pages="+Server.chan_pages);

  				Server.undex=1;
  				Main.Enter = 1;
				Main.new_layer="CATEGORY";
  				Main.updatePage();				
				break;
				case 40: //key-down
					
					if (Main.selected_element == 9) 
					{
						if (Server.chan_pages == 1)
						{
							Main.select_element = 0;
						}
						else
						{
						if (Main.selected_page == Server.chan_pages-1) 
						{
							Main.selected_page = 0;
							Main.updatePage();//test
						} 
						else 
						{
							Main.selected_page=Main.selected_page + 1;
							Main.updatePage();
							//Main.Selected();
						}
						}
						Main.selected_element = 0;
						Main.Selected();
					}
					else
					{	
						if (((Main.selected_page*10+Main.selected_element)) == (Server.parse_result.length-1))
							{
							  Main.selected_page = 0;
							  Main.selected_element = 0; 
							  Main.updatePage(); 
							}
							else
							{
							Main.selected_element = Main.selected_element+1;
							}
					}
					//console.log('Main.selected_element='+Main.selected_element);
					Main.Selected();
					
					//alert('Main.selected_element ='+Main.selected_element);
				break;
				case 38: //key_up
					//console.log("key_up");
					if (Main.selected_element == 0) 
					{
						if (Server.chan_pages==1)
							{
							Main.selected_element = Server.parse_result.length-1;
							//console.log("SRABOTAL if (Server.chan_pages==1)");
							}
						else
						   {
							if (Server.selected_page>0 && Server.selected_page<Server.chan_pages-1)
							{
								//console.log("SRABOTAL if (Server.selected_page>0 && Server.selected_page<Server.chan_pages-1)");
							 Main.selected_element = 9;
							 Main.selected_page=Main.selected_page-1;
							}
							else
							{
								if ((Main.selected_page == 0) && (Server.chan_pages>1)) 
								{
									//console.log("SRABOTAL if, if ((Main.selected_page == 0) && (Server.chan_pages>1))");
									Main.selected_page = Server.chan_pages-1;
									if ((Server.parse_result.length%10) == 0) 
										{ 
											Main.selected_element = 9; 
										} 
									else 
										{
											Main.selected_element = (Server.parse_result.length-1)%10;
										 }
								}
								else
								{
									//console.log("SRABOTAL else");
									Main.selected_element = 9;
									if (Server.chan_pages > 1) Main.selected_page = Main.selected_page - 1;
								} 
							}
							} 
						//Main.selected_page = Server.chan_pages-1;
						Main.updatePage();
					}
					else
					{	
						Main.selected_element = Main.selected_element-1;
					}
					//Main.selected_element = Main.selected_element-1;
					//Main.updatePage();
					Main.Selected();
					//alert('up');
				break;
				case 39: //key_right
				//console.log("key_right");
				if (Main.selected_page==Server.chan_pages-1)
				{
					Main.selected_page = 0;
				}
				else
				{
					Main.selected_page = Main.selected_page +1;
					if ((Main.selected_page==Server.chan_pages-1)  && ((Server.parse_result.length%10)<=Main.selected_element) && ((Server.parse_result.length%10)!=0))
						{
						Main.selected_element = (Server.parse_result.length%10)-1;
						}
				}
				Main.updatePage();
				break;
				case 37: //key_left
				//console.log("key_left");
				if (Main.selected_page==0)
				{
					Main.selected_page = Server.chan_pages-1;
					if ((Main.selected_page==Server.chan_pages-1)  && ((Server.parse_result.length%10)<=Main.selected_element) && ((Server.parse_result.length%10)!=0))
						{
						Main.selected_element = (Server.parse_result.length%10)-1;
						}
				}
				else
				{
					Main.selected_page = Main.selected_page -1;					
				}
				Main.updatePage();
				break;
				case 27: //key_exit
				//console.log("layer:Menu|||key:key_exit");
					
						//window.location = "file:///home/web/services.html";
						window.location = "../../c/index.html";
					
				break;
				case 114:  //ellow
					document.getElementById('search_val').value = '';
        			document.getElementById('yt_search_bg').style.display = 'block';
        			document.getElementById("search_val").focus();
        			Main.new_layer="SEARCH";
        			setTimeout(function() {stb.ShowVirtualKeyboard();}, 350);
					//stb.ShowVirtualKeyboard();
					document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("widget_time").style.display = "none";
					
				break;
	 }
	 
	}

	if (Main.layer=="PLAYER")
	{
			switch(code) {
				case 27: //exit
				case 115: // stop
					Player.Stop();
					document.getElementById("main").style.display = "none";
					document.getElementById("film_info").style.display = "none";
					document.getElementById("channelList").style.display = "block";
					document.getElementById("navi").style.display = "block";
					document.getElementById("top").style.display = "block";
					document.getElementById("info").style.display = "block";
					document.body.style.backgroundColor="black";
					document.getElementById('playingStatus').style.display = 'none';
					document.getElementById('mute').style.display = 'none';
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
					Player.quality="HQ";
					$('#quality').html(Player.quality);
					$('#soobshenie').html("");
					document.getElementById("loading").style.display = "none";
				break;
				case 2082: // play/pause
				  //  if(player.condition==0){player.condition=1;} else {player.condition=0;}
				  //  player.playOrPause();
				  Player.PlayOrPause();
				break;
				case 2066: //REW
				case 37:  // move interval -step
					Player.REW();
				break;
				case 39:
				case 2070: // move interval +step
					Player.FFWD();//FF
				break;
				case 38:	// interval enlarge
					Player.changeStep("up");
				break;
				case 40: // interval reduce
					Player.changeStep("down");
				break;				
				case 13:
					//console.log("main-block");
					Player.pressOK();
				break;
				case 109: //VOL_DOWN:
					Player.pressVolume(-1);
				break;
				case 107://VOL_UP
					Player.pressVolume(1);
				break;
				case 2192: //mute
					Player.pressMute();
				break;
				case 114: //yelow
				case 117: //frame
					
					Player.displayModeChange();
				break;
				case 115: //blue
					
					//settings.changePlayMode();
				break;
				case 112: //red
				   //console.log("stb.GetBufferLoad="+stb.GetBufferLoad());
				  
				  // //console.log("stbEvent.event="+(stb.GetVideoInfo()).substring(11,12));

				break;
				case 113: //green
				   Player.Change_quality();
				break;
			}
		
	}
	if (Main.layer=="FILM_INFO")
	{
	switch(code) {
				case 27: //key-Exit
				
						document.getElementById("channelList").style.display = "block";
						document.getElementById("info").style.display = "block";
						document.getElementById("film_info").style.display = "none";
						document.getElementById("widget_time").style.display = "block";
						document.getElementById("navi").style.display = "block";
						document.getElementById("navi_info").style.display = "none";
						document.getElementById("film_info").style.display = "none";
						Main.new_layer=Main.old_layer;



				break;
				case 40: //key-down
						//$("#spravka").scroll
						document.getElementById('spravka').scrollTop = document.getElementById('spravka').scrollTop+250;

				break;
				case 38: //key-down
						//$("#spravka").scroll
						document.getElementById('spravka').scrollTop = document.getElementById('spravka').scrollTop-250;

				break;
				
			}
	}
	if (Main.layer=="CATALOG")
	{
	switch(code) {
		case 13: //key-Enter
				if (Server.parse_result.content[Main.selected_element].episodes_count>1)
				{
				Server.epizode_url = Server.parse_result.content[Main.selected_element].episodes_url;
				//console.log("episodes_url="+Server.epizode_url);
				Server.epizode_page=1; 
				Server.Request_epizodes();
				//Main.new_layer="EPIZODES";
				Main.Enter=1;
				//---------------------------------------------------------
				Server.step_selected_element[Server.undex]=Main.selected_element;
				Server.step_selected_page[Server.undex]=Main.selected_page;
				//Server.step_selected_category=Server.selected_category;
  				//Server.step_selected_genre=Server.selected_genre;
  				//Server.step_selected_page=Server.selected_page;
				Server.undex=Server.undex+1;
				//---------------------------------------------------------
				Main.new_layer="NONE";
				document.getElementById("loading").style.display = "block";
				}
				else
				{
					Server.Play_url = Server.parse_result.content[Main.selected_element].video_hd;
					//console.log(Server.Play_url);
					Player.Play();
					Main.new_layer = "PLAYER";
					document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("navi").style.display = "none";
					document.getElementById("top").style.display = "none";
					document.body.style.backgroundColor="transparent";
					document.getElementById("loading").style.display = "block";
					setTimeout('Player.loading_disable_visible()', 20000);
				}
		break;
		case 40: //key-down
					
					if (Main.selected_element == 9) 
					{
						if (Server.parse_result.page == Server.parse_result.pages)
						{
							Main.selected_element = 0;
							Server.page_catalog = 1;
							Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
							Server.Request_catalog();
							//Main.Selected_catalog();
							//console.log('metka1');
						}
						else
						{
							Main.selected_element = 0;
							Server.page_catalog = parseInt(Server.parse_result.page)+1;
							//console.log('Server.page_catalog='+Server.page_catalog);
							Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
							Server.Request_catalog();
							//console.log('metka2');
						}
					}
					else
					{	
							if ((((Server.page_catalog-1)*10)+(Main.selected_element+1))==Server.parse_result.total)
							{
								Main.selected_element = 0;
								Server.page_catalog =1;
								Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
								Server.Request_catalog();
								//console.log('metka3');
							}
							else
							{
							Main.selected_element = Main.selected_element+1;
							Main.Selected_catalog();
							//console.log('metka4');
							}
					}
	break;
	case 38: //key_up
					//console.log("key_up");
					if (Main.selected_element == 0) 
					{
						if (Server.parse_result.pages==1)
							{
								Main.selected_element = Server.parse_result.total-1;
								Main.updatePage_catalog();
							}
							else
							{
								if (Server.parse_result.page == 1)
								{
									Server.page_catalog = Server.parse_result.pages;
									if ((Server.parse_result.total%10) == 0)
									{
										Main.selected_element = 9;
									}	
									else
									{
										Main.selected_element = (Server.parse_result.total%10)-1;
									}
									
									//console.log("Server.parse_result.total%10="+Server.parse_result.total%10);
									Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
									Server.Request_catalog();
								}
								else
								{
									Server.page_catalog = Server.parse_result.page -1;
									Main.selected_element = 9;
									Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
									Server.Request_catalog();
								}
							}
					}
					else
					{
							Main.selected_element = Main.selected_element - 1;
							Main.updatePage_catalog();
					}
									
				break;
		case 2089: //key-info
			document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("navi").style.display = "none";
					//document.getElementById("top").style.display = "none";
					document.getElementById("navi_info").style.display = "block";
					$("#file_name").html(Server.parse_result.content[Main.selected_element].title);
					$("#spravka").html(Server.parse_result.content[Main.selected_element].description);
					document.getElementById("img_film").src =Server.parse_result.content[Main.selected_element].screenshot;
					document.getElementById("film_info").style.display = "block";
					document.getElementById("widget_time").style.display = "none";
					Main.old_layer="CATALOG";
					Main.new_layer="FILM_INFO";

		break;
		case 27: //key-Exit
				if (Server.search == 0)
				{
				Server.undex=Server.undex-1;
				Main.selected_element=Server.step_selected_element[Server.undex];
				Main.selected_page=Server.step_selected_page_menu[Server.undex];
				Server.parse_result=Server.step[Server.undex];
				//console.log("Main.selected_page="+Main.selected_page);
				data = Server.parse_result;
   				//console.log("K-vo obektov="+Server.parse_result.length);
  				if ((data.length % 10)>0)
  				{
				Server.chan_pages = Math.floor(data.length/10) + 1;
				}
	 			else
  				{
  				Server.chan_pages = Math.floor(data.length/10);
  				}
 				//console.log("Server.chan_pages="+Server.chan_pages);
				Main.new_layer="CATEGORY";
  				Main.updatePage();
  				document.getElementById("img").src =Server.step_save_picture;
				document.getElementById("info_film").style.display = "none";
				$('#rating').html('');
     			$('#Year').html('');
     			$('#country').html('');
     			$('#duration').html('');
                $('#director').html('');
     	        $('#actors').html('');
     	        $('#Adult').html('');
     	        document.getElementById("zvezda").src ='./img/fon.png';
    			}
    			else
    			{
    				Main.new_layer="NONE";
    				document.getElementById("loading").style.display = "block";
    				document.getElementById("info_film").style.display = "none";
    				Server.Request_menu();
					Server.search = 0;
					Main.selected_page = 0;
					Main.selected_element = 0;
					Server.page_catalog = 1;
					Server.undex=0;
    			}
		break;
		case 114:  //ellow
					document.getElementById('search_val').value = '';
        			document.getElementById('yt_search_bg').style.display = 'block';
        			document.getElementById("search_val").focus();
        			Main.new_layer="SEARCH";
        			setTimeout(function() {stb.ShowVirtualKeyboard();}, 350);
					//stb.ShowVirtualKeyboard();
					document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("widget_time").style.display = "none";
					
				break;
	}
	}
	if (Main.layer=="EPIZODES")
	{
	switch(code) {
		case 27: //key-Exit
			Server.undex=Server.undex-1;
			Main.selected_element=Server.step_selected_element[Server.undex];
			Main.selected_page=Server.step_selected_page[Server.undex];
			//Main.new_layer="CATALOG";
			Main.new_layer="NONE";
			document.getElementById("loading").style.display = "block";
			Server.Request_catalog();
			
		break;
		case 13: //key-Enter
				// Server.epizode_url = Server.parse_result.content[Main.selected_element].episodes_url;
				// console.log("episodes_url="+Server.epizode_url);
				// Server.Request_epizodes();
				// Server.epizode_page=1; 
				// Main.Enter=1;
				Server.Play_url = Server.parse_result.content[Main.selected_element].video_hd;
				//console.log(Server.Play_url);
				Player.Play();
					Main.new_layer = "PLAYER";
					document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("navi").style.display = "none";
					document.getElementById("top").style.display = "none";
					document.body.style.backgroundColor="transparent";
					//--------------------------------------------------
					document.getElementById("loading").style.display = "block";
					setTimeout('Player.loading_disable_visible()', 20000);
					//--------------------------------------------------
		break;
		case 40: //key-down
					
					if (Main.selected_element == 9) 
					{
						if (Server.parse_result.page == Server.parse_result.pages)
						{
							Main.selected_element = 0;
							//Server.epizode_page = 1;
							//Main.new_layer="NONE";
							//document.getElementById("loading").style.display = "block";
							//Server.Request_epizodes();
							Main.Selected_catalog();
						}
						else
						{
							Main.selected_element = 0;
							Server.epizode_page = Server.epizode_page+1;
							Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
							Server.Request_epizodes();
						}
					}
					else
					{	
							if ((((Server.epizode_page-1)*10)+(Main.selected_element+1))==Server.parse_result.total)
							{
								if (Server.parse_result.pages==1)
								{
									Main.selected_element = 0;
									Main.Selected_catalog();
								}
								else
								{	
								Main.selected_element = 0;
								Server.epizode_page =1;
								Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
								Server.Request_epizodes();
								}
							}
							else
							{
							Main.selected_element = Main.selected_element+1;
							Main.Selected_catalog();
							}
					}
	break;
	case 38: //key_up
					//console.log("key_up");
					if (Main.selected_element == 0) 
					{
						if (Server.parse_result.pages==1)
							{
								Main.selected_element = Server.parse_result.total-1;
								Main.updatePage_epizodes();
							}
							else
							{
								if (Server.parse_result.page == 1)
								{
									Server.epizode_page = Server.parse_result.pages;
									if ((Server.parse_result.total%10) == 0)
									{
										Main.selected_element = 9;
									}	
									else
									{
										Main.selected_element = (Server.parse_result.total%10)-1;
									}
									
									//console.log("Server.parse_result.total%10="+Server.parse_result.total%10);
									Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
									Server.Request_epizodes();
								}
								else
								{
									Server.epizode_page = Server.parse_result.page -1;
									Main.selected_element = 9;
									Main.new_layer="NONE";
							document.getElementById("loading").style.display = "block";
									Server.Request_epizodes();
								}
							}
					}
					else
					{
							Main.selected_element = Main.selected_element - 1;
							Main.updatePage_epizodes();
					}
									
				break;
				case 2089: //key-info
			document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("navi").style.display = "none";
					//document.getElementById("top").style.display = "none";
					document.getElementById("navi_info").style.display = "block";
					$("#file_name").html(Server.parse_result.content[Main.selected_element].title);
					$("#spravka").html(Server.parse_result.content[Main.selected_element].episode_title+": "+ Server.parse_result.content[Main.selected_element].description);
					document.getElementById("img_film").src =Server.parse_result.content[Main.selected_element].screenshot;
					document.getElementById("film_info").style.display = "block";
					document.getElementById("widget_time").style.display = "none";
					Main.old_layer="EPIZODES";
					Main.new_layer="FILM_INFO";
					break;
					case 114:  //ellow
					document.getElementById('search_val').value = '';
        			document.getElementById('yt_search_bg').style.display = 'block';
        			document.getElementById("search_val").focus();
        			Main.new_layer="SEARCH";
        			setTimeout(function() {stb.ShowVirtualKeyboard();}, 350);
					//stb.ShowVirtualKeyboard();
					document.getElementById("channelList").style.display = "none";
					document.getElementById("info").style.display = "none";
					document.getElementById("widget_time").style.display = "none";
					
				break;
	}

	}
	if (Main.layer=="NONE")
	{
	switch(code) {
		case 27: //key_exit
				//console.log("layer:Menu|||key:key_exit");
					
						//window.location = "http://212.77.128.205";
						 window.location = "../../c/index.html";
					
				break;

	}
	}
	if (Main.layer=="SEARCH")
	{
			switch(code) {
				case 27: //key_exit
				document.getElementById("search_val").value = '';
				document.getElementById("yt_search_bg").style.display = "none";
        		document.getElementById("channelList").style.display = "block";
				document.getElementById("info").style.display = "block";
				document.getElementById("info_film").style.display = "none";
				document.getElementById("widget_time").style.display = "block";
				document.getElementById('search_val').blur();
				document.getElementById('loading').style.display = "block";
				Server.undex = 0;
				Main.selected_element = 0;
				Server.Request_menu();
				Main.new_layer="NONE";
				break;
				case 13: //key_enter
				Server.trimmed= document.getElementById("search_val").value;
				Server.search = 1;
				//console.log("trimmed="+Server.trimmed);
				stb.HideVirtualKeyboard();
				document.getElementById("loading").style.display = "block";
				Main.new_layer="NONE";
				Server.Request_catalog();
				//document.getElementById("search_val").style.display = "none";
				document.getElementById("yt_search_bg").style.display = "none";
        		document.getElementById("channelList").style.display = "block";
				document.getElementById("info").style.display = "block";
				document.getElementById("info_film").style.display = "block";
				document.getElementById("widget_time").style.display = "block";
				////document.getElementById("logozoomby").style.display = "none";
				////$("#top1").html('Результат поиска на Zoomby.ru:');
				//document.getElementById('search_val').blur();
				//Main.new_layer="MENU";
				break;
	}
	}
	if (Main.layer=="NOT FOUND")
	{
			switch(code) {
				case 27: //key_exit
				//document.getElementById("search_val").value = '';
				document.getElementById("not_found").style.display = "none";
				document.getElementById("channelList").style.display = "block";
				document.getElementById("info").style.display = "block";
				document.getElementById("widget_time").style.display = "block";
				document.getElementById("top").style.display = "block";
				document.getElementById("navi").style.display = "block";
				Main.new_layer="MENU";
				break;				
	}
	}
	Main.layer=Main.new_layer;
	//console.log("Main.layer="+Main.layer);
}
