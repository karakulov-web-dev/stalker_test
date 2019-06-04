var timer_temp_clock = 0;
displayTemp();
setTimeout('temp_clock_visible();', 500);
setInterval('displayTemp()', 300000);
function displayTemp() {
	 var xmlhttp = new XMLHttpRequest();
       var url = "http://meteo.rikt.ru/stb_mag_curweather2.txt";
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {        
            
       	var myArr = JSON.parse(xmlhttp.responseText); 
       	var term=myArr[0].term;
        if (term>0){
      					term='+'+term;
    				}   
        document.getElementById('temp_text').innerHTML=term;
        //console.log("Temp update");
       }
     }     
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
}

function temp_clock_display_off_on() {
		//if ((stb.RDir("getenv videocatalog_temp_clock")=="0")||(stb.RDir("getenv videocatalog_temp_clock")==""))
		if (document.getElementById('Temp').style.display=='none')
		{
		document.getElementById('Temp').style.display="block";
		document.getElementById('clock_time').style.display="block";
		//_switch_="1";
		}
		else
		{
		document.getElementById('Temp').style.display="none";
		document.getElementById('clock_time').style.display="none";
		//_switch_="0";
		}
		//clearTimeout(timer_temp_clock);
		//timer_temp_clock=setTimeout('stb.RDir("setenv videocatalog_temp_clock '+_switch_+'");',2500);
	}

function temp_clock_visible() {
		if (stb.RDir("getenv videocatalog_temp_clock")=="1") {
		 document.getElementById('Temp').style.display="block"; 
		 document.getElementById('clock_time').style.display="block";
		}
}

function temp_clock_save() {
		if (document.getElementById('Temp').style.display=='none') 
		{
			stb.RDir("setenv videocatalog_temp_clock 0");
		}
		else
		{
			stb.RDir("setenv videocatalog_temp_clock 1");
		}
}