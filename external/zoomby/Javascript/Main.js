var stb 
stb =  gSTB; 
stb.InitPlayer();
stb.SetTopWin(0);
    stb.SetAspect(0x10);
    stb.SetPIG (1,0,0,0);
    

var Main = {

	selected_element: 0,
	selected_page: 0,
	chan_array_index: 0,
	ch_id_selected: 0,
	Enter: 1,
	layer: null,
	new_layer:null,
    old_layer:null
}

function loadStyle(file){
	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", file);
	document.getElementsByTagName("head")[0].appendChild(link)
} 

Main.onLoad = function () 
{
	//Server.Request1(); //нужно поменять на Server.Request_data();
	//Server.Request_data();
	//console.log("zapros vypolnen");
	//console.log("...");
	Server.Request_menu();
	Main.layer="NONE";
    Main.new_layer="MENU";
	if (stb.RDir('gmode')=='1280') 
	{
	 window.moveTo(0, 0);
	window.resizeTo(1280, 720);
	loadStyle('./css/1280.css');
	}
	else
	loadStyle('./css/720.css');	

	//Server.Data_Parse();
	//alert("Привет");
	//Main.updatePage();
	//Main.Selected();
	
}

Main.Start = function ()
{
	document.getElementById("channelList").style.display = "block";
    document.getElementById("navi").style.display = "block";
    document.getElementById("top").style.display = "block";
    document.getElementById("info").style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.body.style.backgroundColor="black";
}

Main.Selected = function ()
{
	for (var index = 0; index < 10; index++)
	{
		document.getElementById("chan"+index).style.backgroundColor='#000000';
		document.getElementById("chan"+index).style.color = '#FFFFFF';		
	}
	//console.log("Selected, Main.selected_element="+Main.selected_element);
	document.getElementById("chan"+Main.selected_element).style.backgroundColor='#FFFFFF';
	document.getElementById("chan"+Main.selected_element).style.color = '#000000';
	$('#widget_time').html("Стр. "+(Main.selected_page+1)+" из "+Server.chan_pages);
	if (Server.undex==0)
				{
				document.getElementById("img").src ='./img/'+Main.selected_element+'.jpg';
                Server.step_save_picture = './img/'+Main.selected_element+'.jpg';
				}
}

Main.updatePage = function ()
{
	for (var index = 0; index < 10; index++)
        {
			if (Main.Enter==1)
	{
	Main.selected_page = 0;
    Main.selected_element = 0;	
	Main.Enter = 0;
	}
        	if ((index+Main.selected_page*10) < Server.parse_result.length)
        	{
        			//console.log("index+Main.selected_page*10="+(index+Main.selected_page*10));
        			$('#title'+index).html(Server.parse_result[index+Main.selected_page*10].title);

        		 document.getElementById("chan"+index).style.display = "block ";
        		
        	}
        		    	if ((index+Main.selected_page*10) > (Server.parse_result.length-1))
        	{
        		document.getElementById("chan"+index).style.display = "none";
        		    	}
        }

	Main.layer = Main.new_layer;	
	Main.Selected();
	
		}

Main.updatePage_catalog = function ()
{
	//console.log("----------------------------------");
	//console.log("Main.updatePage_catalog");
	for (var index = 0; index < 10; index++)
        {
			if (Main.Enter==1)
	{
	Main.selected_page = 0;
    Main.selected_element = 0;	
	Main.Enter = 0;
	}
        	if ((index) < Server.parse_result.content.length)
        	{
        			//console.log("index+Main.selected_page*10="+(index+Main.selected_page*10));
        			$('#title'+index).html(Server.parse_result.content[index].title);
        			if (Server.parse_result.content[Main.selected_element].title.length>24)
        			{
        				$("#filename").html(Server.parse_result.content[Main.selected_element].title.substr(0,24)+"... ");
        			}
        			else
        			{

        			$("#filename").html(Server.parse_result.content[index].title);

        			}
        		 document.getElementById("chan"+index).style.display = "block ";
        		
        	}
        		    	if ((index) > (Server.parse_result.content.length-1))
        	{
        		document.getElementById("chan"+index).style.display = "none";
        		    	}
        }

	Main.layer = Main.new_layer;	
	Main.Selected_catalog();
	
		}
Main.Selected_catalog = function ()
{
    for (var index = 0; index < 10; index++)
	{
		document.getElementById("chan"+index).style.backgroundColor='#000000';
		document.getElementById("chan"+index).style.color = '#FFFFFF';		
	}
	//console.log("Selected_catalog, Main.selected_element="+Main.selected_element);
	document.getElementById("chan"+Main.selected_element).style.backgroundColor='#FFFFFF';
	document.getElementById("chan"+Main.selected_element).style.color = '#000000';
	$('#widget_time').html("Стр. "+Server.parse_result.page+" из "+Server.parse_result.pages);
	
	document.getElementById("img").src =Server.parse_result.content[Main.selected_element].screenshot;
	if (Server.parse_result.content[Main.selected_element].title.length>15)
        			{
        				if (Server.parse_result.content[Main.selected_element].episodes_count>1)
        				{
        				$("#filename").html(Server.parse_result.content[Main.selected_element].title.substr(0,15)+"... "+Server.parse_result.content[Main.selected_element].episode_title);        				
        				}
        				else
        				{
        					$("#filename").html(Server.parse_result.content[Main.selected_element].title.substr(0,35)+"... ");
        				}
        			}
        			else
        			{
        				if (Server.parse_result.content[Main.selected_element].episodes_count>1)
        				{
        				$("#filename").html(Server.parse_result.content[Main.selected_element].title+" "+Server.parse_result.content[Main.selected_element].episode_title);        				
        				}
        				else
        				{
        					$("#filename").html(Server.parse_result.content[Main.selected_element].title);
        				}
        			}
    
     if (($("#filename").text()).length>35)
     {
     	filename = $("#filename").text();
     	$("#filename").html(filename.substr(0,35)+"...");
     }
     document.getElementById("zvezda").src ='./img/'+Server.parse_result.content[Main.selected_element].rating+'z.png';
     //document.getElementById("zvezda").src ='./img/5z.png';
     if (Server.parse_result.content[Main.selected_element].adult==1)
        {
            $('#Adult').html('Ограничения: 18+');
        }
        else
        {
            $('#Adult').html('Ограничения: ');
        }
    $('#rating').html('Рейтинг: ');
     $('#Year').html('Год выпуска: '+Server.parse_result.content[Main.selected_element].year);
     $('#country').html('Страна: '+Server.parse_result.content[Main.selected_element].country);
     $('#duration').html('Продолжительность: '+Server.parse_result.content[Main.selected_element].duration);
     if (Server.parse_result.content[Main.selected_element].director == null)
     {
            $('#director').html('Режиссёр:');
     }
     else
     {
         $('#director').html('Режиссёр: '+Server.parse_result.content[Main.selected_element].director);
     }
     if (Server.parse_result.content[Main.selected_element].actors == "")
    {
        $('#actors').html('');
    }
    else
    {
     $('#actors').html('В ролях: '+Server.parse_result.content[Main.selected_element].actors);
    }
}

Main.updatePage_epizodes = function ()
{
	//console.log("----------------------------------");
	//console.log("Main.updatePage_catalog");
	for (var index = 0; index < 10; index++)
        {
			if (Main.Enter==1)
	{
	Main.selected_page = 0;
    Main.selected_element = 0;	
	Main.Enter = 0;
	}
        	if ((index) < Server.parse_result.content.length)
        	{
        			//console.log("index+Main.selected_page*10="+(index+Main.selected_page*10));
        			
        			if (Server.parse_result.content[index].title.length>15)
        			{
        				title=Server.parse_result.content[index].title.substr(0,15)+"... "+Server.parse_result.content[index].episode_title;
        			}
        			else
        			{
        				title=Server.parse_result.content[index].title+" "+Server.parse_result.content[index].episode_title;
        			}

        			$('#title'+index).html(title);

        		 document.getElementById("chan"+index).style.display = "block ";
        		
        	}
        		    	if ((index) > (Server.parse_result.content.length-1))
        	{
        		document.getElementById("chan"+index).style.display = "none";
        		    	}
        }

	Main.layer = Main.new_layer;	
	Main.Selected_catalog();
	
		}
