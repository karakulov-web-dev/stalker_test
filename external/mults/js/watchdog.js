var watchdog =
{	
	timeout : null,
	ajax_loader : null,
	token : null,
	cur_play_type : 2 // 2-vclub, 1-tv, 3-karaoke...
}
watchdog_init();
//------------------------------------------------------------------------------------------------------
function watchdog_init()
{
		 if (decodeURIComponent(window.location).search(/token\=/) != -1)
		 	{		 
		 watchdog.ajax_loader = parseGetParams("ajax_loader");
		 watchdog.token = parseGetParams("token");
		 watchdog.timeout = parseGetParams("timeout")*1000;		 
		 send_request();
		 setInterval('send_request();', watchdog.timeout);
		}
 }

 function send_request(){
 				request_watchdog({"type":"watchdog","action":"get_events","cur_play_type":watchdog.cur_play_type,"event_active_id":0,"init":0},
                			function (result) {   
                								if(!result)
                										{
                											//Ошибка сохранения
                											console.log('Server error');
                										}
                										else
                										{                												
                    										//console.log("result_request_watchdog="+JSON.stringify(result));
                    										watchdog_parse_result(result.data);
                    									}
                								}
 							)

 }


function request_watchdog(params, callback){
   JsHttpRequest.query(       
       'GET '+watchdog.ajax_loader,

       params,

       function(result, errors){
        // errors - содержит ошибки сервера и debug сообщения
        gSTB.Debug(errors);       

           callback(result);
       },

       true,       
       {"Authorization" : "Bearer "+watchdog.token}
   		);
	}

function parseGetParams(par) {
        var tmp = new Array();      // два вспомагательных   
        var tmp2 = new Array();     // массива   
        var param = new Array();   
        var get = location.search;  // строка GET запроса
        var result="";  //переменная результата   
        if(get != '') {   
            tmp = (get.substr(1)).split('&');   // разделяем переменные   
            for(var i=0; i < tmp.length; i++) {   
                tmp2 = tmp[i].split('=');       // массив param будет содержать   
                param[tmp2[0]] = tmp2[1];       // пары ключ(имя переменной)->значение   
            }   
        }                
        if (typeof param[par]!= 'undefined')        {           
		      	                    
            result = param[par];
        }	
        return result;	
   }

function watchdog_parse_result(data){
			//console.log("watchdog_parse_result");
			//console.log("data="+JSON.stringify(data));
			stb = gSTB; 
				if (typeof(data.id) != 'undefined'){      
        	//console.log("data.event="+data.event);
        switch(data.event){
            case 'diagnostic_page':
            {
                stb.Stop();
		          window.location='http://212.77.128.205/stalker_portal/external/diagnostic_page/index.html';
                break;
            }
        case 'set_variable':
            {
                stb.SetEnv(data.msg);
                stb.Stop();
                stb.ExecAction('reboot');
                break;
            }
        case 'set_volume':
            {
                var e_vol=parseInt(data.msg);
                if (e_vol>100) 
                {
                    e_vol=100;
                }
                if (e_vol<0)
                {
                   e_vol=0; 
                }                
                stb.SetVolume(e_vol);                
                break;
            }
	    case 'reboot':
            {
                stb.Stop();
                stb.ExecAction('reboot');
                break;
            }
        case 'cut_off':
        case 'reload_portal':
            {
                stb.Stop();
                window.location = "http://212.77.128.205";
                break;
            }       
        }
    }
}