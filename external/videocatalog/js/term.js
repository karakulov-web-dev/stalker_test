displayTemp();
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
        console.log("Temp update");
       }
     }     
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
}

function temp_clock_display_off_on() {
		document.getElementById('Temp').style.display="none";
	}