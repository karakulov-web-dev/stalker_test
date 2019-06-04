var my_date = {};

my_date.midnigth = function (shift) {

	if(shift === undefined) {
		shift = 0;
	}

	var d = new Date();

	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();

	var midnigth = Math.round(+new Date(year, month, date + shift)/1000);

	return midnigth;
}

my_date.now = function () {

	var d = new Date().getTime();
	return Math.round(d/1000);
}

my_date.curdate = function () {

	return new Date().toLocaleDateString();
}

my_date.get_local_date = function (shift) {

	if(shift === undefined) {
		shift = 0;
	}
	shift = parseInt(shift);

	var d = new Date();

	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();

	return new Date(year, month, date + shift).toLocaleDateString();
}

my_date.get_day = function (shift) {

	if(shift === undefined) {
		shift = 0;
	}
	shift = parseInt(shift);

	if(Math.abs(shift) > 7) {
		shift = shift%7;
		debug(shift);
	}

	var days = {1:"Пн", 2:"Вт", 3:"Ср", 4:"Чт", 5:"Пт", 6:"Сб", 7:"Вс"};
	var day = new Date().getDay();

	if(day + shift < 1) {
		day = 7 + (day + shift);
		return days[day];
	}

	if(day + shift > 7) {
		day = day + shift - 7;
		return days[day];
	}

	return days[day + parseInt(shift)];
}

my_date.get_date = function(shift) {

	if(shift === undefined) {
		shift = 0;
	}
	shift = parseInt(shift);

	var d = new Date();

	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();

	var midnigth = new Date(year, month, date + shift);

	month = midnigth.getMonth();
	date = midnigth.getDate();

	month++;
	month = (month < 10) ? '0' + month.toString() : month.toString();
	date = (date < 10) ? '0' + date.toString() : date.toString();

	return date + '.'  + month;
}

my_date.toTimeString = function (date, seconds) {
	
	if(seconds === undefined) {
		seconds = false;
	}

	var unixtime = new Date(date * 1000);

	var hours = unixtime.getHours();
	var minutes = unixtime.getMinutes();

	hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
	minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();

	if(seconds) {
		var seconds = unixtime.getSeconds();
		seconds = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();
		var time = hours + ':' + minutes + ':' + seconds;
	}
	else {
		var time = hours + ':' + minutes;
	}


	return time;
}

my_date.seс_to_time = function (val) {

	var hours = parseInt(val/3600);
	var minutes = parseInt((val - hours * 3600)/60);
	var seconds = parseInt(val % 60);

	hours = (hours < 10) ? '0' + hours : hours;
	minutes = (minutes < 10) ? '0' + minutes : minutes;
	seconds = (seconds < 10) ? '0' + seconds : seconds;

	return hours  + ':' + minutes + ':' + seconds;
}

// function todate() {

// 	var unixtime = Math.round(+new Date()/1000);
// 	var d = new Date();

	
// 	var hours = d.getHours();
// 	var minutes = d.getMinutes();
// 	var seconds = d.getSeconds();

// 	console.log(hours);
// 	console.log(minutes);
// 	console.log(seconds);

// 	var midnigth = unixtime - (hours * 3600 + minutes * 60 + seconds);
// 	console.log(midnigth);
// }

// my_date.midnigth = function (shift) {

// 	if(shift === undefined) {
// 		shift = 0;
// 	}

// 	var unixtime = Math.round(+new Date()/1000);
// 	var d = new Date();

// 	var hours = d.getHours();
// 	var minutes = d.getMinutes();
// 	var seconds = d.getSeconds();

// 	var midnigth = unixtime - (shift * 86400 + hours * 3600 + minutes * 60 + seconds);

// 	return midnigth;
// }
