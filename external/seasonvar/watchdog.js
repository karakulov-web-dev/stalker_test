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
		 if (decodeURIComponent(window.location).search(/token/) != -1)
		 	{
		 watchdog.ajax_loader = decodeURIComponent(window.location).substring(decodeURIComponent(window.location).search(/ajax_loader\=.+?\&/), decodeURIComponent(window.location).search(/\&/)).replace(/ajax_loader\=/, '');
		 watchdog.token = decodeURIComponent(window.location).substring(decodeURIComponent(window.location).search(/token\=.+?\&/), decodeURIComponent(window.location).search(/\&timeout/)).replace(/token\=/, '');		 
		 watchdog.timeout = decodeURIComponent(window.location).substring(decodeURIComponent(window.location).search(/timeout\=.*/), decodeURIComponent(window.location).length).replace(/timeout\=/, '')*1000;		 
		 console.log("watchdog.ajax_loader="+watchdog.ajax_loader);
		 console.log("watchdog.token="+watchdog.token);
		 console.log("watchdog.timeout="+watchdog.timeout);
		 //setInterval('console.log("secunda");', 1000);
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
                											console('Server error');
                										}
                										else
                										{                												
                    										console.log("result_request_watchdog="+JSON.stringify(result));
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
        //gSTB.Debug(errors);       

           callback(result);
       },

       true,       
       {"Authorization" : "Bearer "+watchdog.token}
   		);
	}

function watchdog_parse_result(data){
			console.log("watchdog_parse_result");
			console.log("data="+JSON.stringify(data));
			stb = gSTB; 
				if (typeof(data.id) != 'undefined'){      
        	console.log("data.event="+data.event);
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