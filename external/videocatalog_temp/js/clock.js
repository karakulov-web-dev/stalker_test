	
setInterval(displayClock, 1000);
	
Date.prototype.getFullDay=function(){
  return this.getDate()<10 ? "0"+this.getDate() : this.getDate();
}
Date.prototype.getFullMonth=function(){
 var m= this.getMonth()+1;
 return m<10 ? "0"+m : m;
}
	
	// add a leading zero to numbers less then 10
	function zeroPad(num) {
		return (num < 10 ? '0' : '') + num;
	}
	
	function displayClock() {
		// grab the current time
		var dateTime = new Date();
		// add text lookups for month and days
		//var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
		//var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
		// parse the separate elements out of the date/time
//		var year = dateTime.getFullYear();
		
		//var yy = dateTime.getFullYear() % 100;
                //var year = yy<10 ? "0"+yy : yy;
		
		
		
		//var month = months[dateTime.getMonth()].toUpperCase();
		//var month = months[dateTime.getMonth()];
		//var month = dateTime.getMonth()+1;
		
		//var month =dateTime.getFullMonth();
		
		
		//var day = dateTime.getDate();
		//var dayOfWeek = days[dateTime.getDay()].toUpperCase();
  	        //var dayOfWeek = days[dateTime.getDay()];
  	       // var date = dateTime.getDate();
  	        //var date = dateTime.getFullDay();
		var hours = zeroPad(dateTime.getHours());
		var minutes = zeroPad(dateTime.getMinutes());
		//var seconds = zeroPad(dateTime.getSeconds());
		var textTime;
		textTime = hours + ':' + minutes ;
	        // var textDate = dayOfWeek + ' ' + month + ' ' + day + ', ' + year;
	        //var textDate = dayOfWeek + ' ' + date + '/' + month + '/' + year;
	        //alert (textTime);
	        document.getElementById('textTime').innerHTML = textTime;
	        document.getElementById('textTime_p').innerHTML = textTime;
	        document.getElementById('clock_time_text').innerHTML = textTime;
	        //document.getElementById('textDate').innerHTML = textDate;
	}
          
