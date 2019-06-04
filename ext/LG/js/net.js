var net =
{

}

net.check = function()
{
		$.ajax({
		  		   url: 'http://212.77.128.205:86',
		  		   success: function(data){
		  			 if (debug==1) console.log("Data net.check Loaded: " + data);
	  			var obj = parse_response(data);
				if (obj.friend==true)
					{
					if (debug==1) console.log('friend=true');
						account.create();					
					}
				else
					{
						document.getElementById("popup3").style.display="block";
						$('.overlay').show();
						KeyHandler.setFocus(Main.Popup_net_ID);
						if (debug==1) console.log('friend=false');
					}
		  		   },
				   error: function(data){
					   if (debug==1) console.log("net.check error: " + data);
				   },
			   type: "GET",
				   dataType: "text"
				});
	  	
}
