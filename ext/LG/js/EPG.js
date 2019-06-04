var EPG =
{
	selected_li: 0,
	count:0,
	selected_day: 0,
	epg_day: 0
}

EPG.show = function(obj_results)
{
	KeyHandler.setFocus(Main.EpgMenu_ID);	
	this.count=obj_results.length-1;
	$('#programm ul').empty();
	EPG.selected_li=0;
	$.each(obj_results, function(i) {
	img="";

	if (this.in_archive==0) 
	{
	img="img/clock.png";
		if (i>0)
		{
			if (obj_results[i-1].in_archive==1)
			{
			EPG.selected_li=i;
			
			if (debug==1) console.log('selected_li='+i);
			}			
		}
		$("#programm ul").append('<li id="pr' + i +'" epgid="'+this.id+'" archive="'+this.in_archive+'"name="'+this.name.replace(/\"/g,'&quot')+'"  style="color:#989898;"><img src='+img+' style="vertical-align:middle;"></img>'+my_date.toTimeString(this.start)+' '+ this.name + '</a></li>');
	}
	else
	{
	img="img/clock_rec2.png";
	$("#programm ul").append('<li id="pr' + i +'" epgid="'+this.id+'" archive="'+this.in_archive+'"name="'+this.name.replace(/\"/g,'&quot')+'"><img src='+img+' style="vertical-align:middle;"></img>'+my_date.toTimeString(this.start)+' '+ this.name + '</a></li>');
	}
	

	//$("#programm ul").append('<li id="pr' + i +'" epgid="'+this.id+'" archive="'+this.in_archive+'"name="'+this.name.replace(/\"/g,'&quot')+'"><img src='+img+' style="vertical-align:middle;"></img>'+my_date.toTimeString(this.start)+' '+ this.name + '</a></li>');		
	});
	
	document.getElementById("pr"+this.selected_li).style.color='#235896';
	document.getElementById("pr"+this.selected_li).style.background='#fff';
	//setTimeout('$("#programm").scrollTop($("#pr"+EPG.selected_li).offset().top-138)', 600);
}

EPG.next = function()
{
	if (debug==1) console.log("EPG.next");
	if (this.count>0)
	{
	if (this.selected_li != this.count)
	{
	this.selected_li=this.selected_li+1;
	if ($("#pr"+parseInt(EPG.selected_li-1)).attr('archive')==1)
	{
		document.getElementById("pr"+(this.selected_li-1)).style.color='white';
	}
	else
	{
		document.getElementById("pr"+(this.selected_li-1)).style.color='#989898';
	}
	document.getElementById("pr"+(this.selected_li-1)).style.background='#235896';
	document.getElementById("pr"+this.selected_li).style.color='#235896';
	document.getElementById("pr"+this.selected_li).style.background='#fff';
	var scroll = $("#programm").scrollTop(), ptop = $("#pr"+this.selected_li).offset().top;
	if (debug==1) console.log("scroll="+scroll);
	if (debug==1) console.log("ptop="+ptop);
    if (ptop >= 600) {
  
	if (debug==1) console.log("element viden");
	$("#programm").scrollTop($("#programm").scrollTop()+44);
    }
	}
	}
}

EPG.previous = function()
{
	if (debug==1) console.log("EPG.previous");
	if (this.count>0)
	{
	if (this.selected_li != 0)
	{
	this.selected_li=this.selected_li-1;
	if ($("#pr"+parseInt(EPG.selected_li+1)).attr('archive')==1)
	{
		document.getElementById("pr"+(this.selected_li+1)).style.color='white';		
	}
	else
	{
		document.getElementById("pr"+(this.selected_li+1)).style.color='#989898';		
	}
	document.getElementById("pr"+(this.selected_li+1)).style.background='#235896';
	document.getElementById("pr"+this.selected_li).style.color='#235896';
	document.getElementById("pr"+this.selected_li).style.background='#fff';
	var scroll = $("#programm").scrollTop(), ptop = $("#pr"+this.selected_li).offset().top;
	if (debug==1) console.log("scroll="+scroll);
	if (debug==1) console.log("ptop="+ptop);
    if (ptop <= 106) {
  
	if (debug==1) console.log("element ne viden");
	$("#programm").scrollTop($("#programm").scrollTop()-44);
    }
	}
	}
}

EPG.week_week_day = function(shift)
{
	if(shift === undefined) {
		shift = 0;
	}
	if (debug==1) console.log("EPG.get_day(shift)="+EPG.get_day(shift));
	if (EPG.get_day(shift)=="Понедельник") {i=0; c=6;}
	if (EPG.get_day(shift)=="Вторник") {i=-1; c=5;}
	if (EPG.get_day(shift)=="Среда") {i=-2; c=4;}
	if (EPG.get_day(shift)=="Четверг") {i=-3; c=3;}
	if (EPG.get_day(shift)=="Пятница") {i=-4; c=2;}
	if (EPG.get_day(shift)=="Суббота") {i=-5; c=1;}
	if (EPG.get_day(shift)=="Воскресенье") {i=-6; c=0;}
	var index1=0;
	for (var index = i; index < c+1; index++)
	{
		document.getElementById("day"+index1).innerHTML = EPG.get_day(index)+"<br>"+EPG.get_date(index);
		if (EPG.get_day(shift)!=EPG.get_day(index)) {document.getElementById("day"+index1).style.color='gray'; document.getElementById("day"+index1).style.backgroundColor='#235896';} 
		else {
			document.getElementById("day"+index1).style.color='white';
			document.getElementById("day"+index1).style.backgroundColor='#00427C';
			EPG.selected_day=index1;
			if (debug==1) console.log("EPG.selected_day="+EPG.selected_day);
		}
		index1++;
	}
	
}

EPG.get_day = function (shift) {

	if(shift === undefined) {
		shift = 0;
	}
	shift = parseInt(shift);

	if(Math.abs(shift) > 7) {
		shift = shift%7;
		if (debug==1) console.log(shift);
	}

	var days = {1:"Понедельник", 2:"Вторник", 3:"Среда", 4:"Четверг", 5:"Пятница", 6:"Суббота", 7:"Воскресенье"};
	var day = new Date().getDay();

	if(day + shift < 1) {
		day = 7 + (day + shift);
		return days[day];
	}

	if(day + shift > 7) {
		day = day + shift - 7;
		return days[day];
	}

	if (debug==1) console.log("EPG.get_day day= " + day);
	return days[day + parseInt(shift)];
	
}

EPG.get_date = function(shift) {

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
	
	var monts = new Array ("января", "февраля","марта", "апреля", "мая", "июня","июля", "августа","сентября", "октября","ноября","декабря");

	return date + ' '  + monts[month];
}

EPG.left = function()
{
	if (EPG.epg_day!=-7)
	{
	EPG.selected_day=EPG.selected_day-1;
	EPG.epg_day=EPG.epg_day-1;
	server.get_epg_day(EPG.epg_day);
	if (debug==1) console.log('EPG.epg_day='+EPG.epg_day);
	if (EPG.selected_day>=0)
	{
	document.getElementById("day"+(EPG.selected_day+1)).style.color='gray';
	document.getElementById("day"+(EPG.selected_day+1)).style.backgroundColor='#235896';
	document.getElementById("day"+EPG.selected_day).style.color='white';
	document.getElementById("day"+(EPG.selected_day)).style.backgroundColor='#00427C';
	}
	else
	{
		EPG.selected_day=6;
		document.getElementById("day0").style.color='gray';
		document.getElementById("day0").style.backgroundColor='#235896';
		document.getElementById("day6").style.color='white';
		document.getElementById("day6").style.backgroundColor='#00427C';
		index1=6;
		if (debug==1) console.log("EPG.selected_day<0");
		index=EPG.epg_day
		while (index>EPG.epg_day-7)
		{
			document.getElementById("day"+index1).innerHTML = EPG.get_day(index)+"<br>"+EPG.get_date(index);
			
			index1=index1-1;
			index=index-1;
		}

	}
	}
	if (debug==1) console.log("Epg.left EPG.selected_day= " + EPG.selected_day);
	if (debug==1) console.log("Epg.left EPG.epg_day= " + EPG.epg_day);
}

EPG.Right = function()
{
	if (EPG.epg_day!=6)
	{
	EPG.selected_day=EPG.selected_day+1;
	EPG.epg_day=EPG.epg_day+1;
	server.get_epg_day(EPG.epg_day);
	if (EPG.selected_day<=6)
	{
	document.getElementById("day"+(EPG.selected_day-1)).style.color='gray';
	document.getElementById("day"+(EPG.selected_day-1)).style.backgroundColor='#235896';
	document.getElementById("day"+EPG.selected_day).style.color='white';
	document.getElementById("day"+(EPG.selected_day)).style.backgroundColor='#00427C';
	}
	else
	{
		EPG.selected_day=0;
		document.getElementById("day6").style.color='gray';
		document.getElementById("day6").style.backgroundColor='#235896';
		document.getElementById("day0").style.color='white';
		document.getElementById("day0").style.backgroundColor='#00427C';
		index1=0;
		if (debug==1) console.log("EPG.selected_day<0");
		index=EPG.epg_day;
		while (index<EPG.epg_day+7)
		{
			document.getElementById("day"+index1).innerHTML = EPG.get_day(index)+"<br>"+EPG.get_date(index);
			
			index1=index1+1;
			index=index+1;
		}
	}
	}
	if (debug==1) console.log("Epg.right EPG.selected_day= " + EPG.selected_day);
	if (debug==1) console.log("Epg.right EPG.epg_day= " + EPG.epg_day);
}