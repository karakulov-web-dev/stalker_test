(function() {
	 console.log(stb.RDir('ImageDate'));
    if (stb.GetDeviceModel() == 'MAG254') 
        {
                if ((stb.GetDeviceImageDesc() == '')||(stb.GetDeviceImageDesc() == 'Factory image')) 
                    {
                        window.location = 'http://212.77.128.205/stalker_portal/external/fw_update.html';
                    }
                    else
                    {
                        if ((stb.GetDeviceImageDesc() != '2.18-r12_rikt_release')&&(stb.GetDeviceImageVersion()=='215'))
                            {   
                                window.location = 'http://212.77.128.205/stalker_portal/external/fw_update.html';
                            }        
                    }
        }

	if ((stb.GetDeviceModel() == 'MAG250')||(stb.GetDeviceModel() == 'MAG245')) 
        {
            if ((stb.GetDeviceImageDesc() != '2.18-r12_rikt_release')&&(stb.GetDeviceImageVersion()=='215'))
                    {       		
		                  window.location = '/' + stb.portal_path + '/external/fw_update_mag250.html';
                    }
        }    
   loader.next();
})();

