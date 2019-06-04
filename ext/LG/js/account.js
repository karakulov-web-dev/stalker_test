var account =
{
}

account.create = function()
{
//	var fileSystemObj = new FileSystem();
//	var oFile=fileSystemObj.openCommonFile("account_setup.dat", "r");
//	if (oFile&&server.reaccount==false)
	if (debug==1) console.log('login='+window.localStorage.getItem('login_klik_tv'));
	if (window.localStorage.getItem('login_klik_tv')!=null)
	{
			server.login=window.localStorage.getItem('login_klik_tv');
			server.password=window.localStorage.getItem('password_klik_tv');
			//server.password=oFile.readLine();
			//fileSystemObj.closeCommonFile(oFile);
			if (debug==1) console.log("file read");
			if (debug==1) console.log('login='+server.login);
			if (debug==1) console.log('password='+server.password);
			server.auth();
	}
	else
	{
			var MAC = device.net_macAddress;
			if (debug==1) console.log('MAC : ' + MAC);
			url = "http://212.77.128.205/stalker_portal/custom/user_create.php?mac="+MAC+"&device=tv_lg";
			if (debug==1) console.log("account.create URL="+url);
			
	var request = server.request(url);

	request.onreadystatechange = function () {

		if (request.readyState == 4) {
			if (check_request_status(request) === true) {
				if (debug==1) console.log('otvet='+request.responseText);
				if (debug==1) console.log('account.create ok');
				//var obn = parse_response(request.responseText);
				var obn = $.parseJSON(request.responseText);
				if (debug==1) console.log('obn.error='+obn.error);
				if (obn.error=='')
				{
					server.login=obn.login;
					server.password=obn.password;
					server.auth();
					if (debug==1) console.log("record account");
					window.localStorage.setItem('login_klik_tv', obn.login);
					window.localStorage.setItem('password_klik_tv', obn.password);					
				}
				else
				{
						Main.message(0, obn.error+'. Для выхода нажмите EXIT.');
						$('#MainMenu_Anchor').remove();
						$('#LivePlayer_Anchor').remove();
						document.getElementById("main").style.display="none";
				}
			}
			else {
				if (debug==1) console.log('account.create error: ' + request.status);
				request_status_swith(request.status);
			}
		}
	};
	request.send(null);
	
	}
}