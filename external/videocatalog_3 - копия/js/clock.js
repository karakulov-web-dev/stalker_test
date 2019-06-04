        setInterval(displayClock, 1000);
	
	function zeroPad(num) {
		return (num < 10 ? '0' : '') + num;
	}
	
	function displayClock() {
		var dateTime = new Date();
		var hours = zeroPad(dateTime.getHours());
		var minutes = zeroPad(dateTime.getMinutes());
		var textTime = hours + ':' + minutes;
	        byID('textTime').innerHTML = textTime;
	        byID('textTime_p').innerHTML = textTime;
	}