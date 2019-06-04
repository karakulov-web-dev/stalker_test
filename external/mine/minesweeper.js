//var H,V,BomN,safeZone,Mines;


var H = gs.complexity[cvDraw.complexity].x;
var V = gs.complexity[cvDraw.complexity].y;
var BomN = Math.ceil(H*V/6.5);//6.5
var safeZone = H*V-BomN;
var Mines = BomN;


function d(id){
	return document.getElementById(id);
}
////////////////////////////////
function r(num){
	var rnd = Math.floor(Math.random()*num);
	return rnd;
}
////////////////////////////////
var spareBom ="";
/*--------------*/
function bomMake(){



H = gs.complexity[cvDraw.complexity].x;
V = gs.complexity[cvDraw.complexity].y;

//alert ("compl="+gs.complexity[cvDraw.complexity].x);


BomN = Math.ceil(H*V/6.5);//6.5
safeZone = H*V-BomN;
Mines = BomN;

writeBtn();

//alert ("bom");
	var counter = 0;
	while(counter <= BomN){
		var tmpBom = r(H)+"-"+r(V);
		if(!bomChecker(tmpBom)){
			if(counter == BomN){
				spareBom = tmpBom;
			} else {
				bomAry[counter] = tmpBom;
			}
			counter++;
		}
	}
 //VKBlock = false;
}
////////////////////////////////
function showBom(c,v){
	for(i in bomAry){
		//d(bomAry[i]).style.backgroundColor = c;
		d(bomAry[i]).style.backgroundImage="url('cell_bom.png')"; 
		d(bomAry[i]).firstChild.nodeValue = v;
	}
}
////////////////////////////////
var bomAry = new Array();
/*--------------*/
function bomChecker(bom){
	var bomCk = false;
	for(i = 0; i < bomAry.length; i++){
		if(bom == bomAry[i]){
		bomCk = i + 1;
		break;
		}
	}
	return bomCk;
}
////////////////////////////////
var FT = true;
var safeText = "";
/*--------------*/
function bang(idH,idV){
//if(keyNum) return false;
var id = idH+"-"+idV;

//alert ("id="+id);

	if(!openChecker(id) && d(id).firstChild.nodeValue != "¶"){
		var bomCk = bomChecker(id);
		if(bomCk){
			if(FT){
				bomAry[bomCk-1] = spareBom;
			} else {
				gameSet("#f66","","Boom!");
				return false;
			}
		}
		aroundCheck(idH,idV);
		if(safeZone == openNum){
			gameSet2("#99f","","Clear");
		}
		if(FT){
			FT = false;
			timers();
		}
	}
}
////////////////////////////////
function gameSet(c,v,m){
	showBom(c,v);
	//alert(m);
	clearInterval(timer);
	cvDraw.showfinish();
}
function gameSet2(c,v,m){
	showBom(c,v);
	//alert(m);
	clearInterval(timer);
	cvDraw.showfinish2();
}

////////////////////////////////
var aroundAry = new Array();
/*--------------*/
function aroundCheck(mh,mv){
	var abc = bomCounter(mh,mv);
	btnFace(abc,mh+"-"+mv);
	if(!abc){
		var tmpA = getAround(mh,mv);
		var wNum = 0;
		while(wNum < tmpA.length){
			if(!openChecker(tmpA[wNum])){
				var sptA = tmpA[wNum].split("-");
				var tmpH = parseInt(sptA[0]);
				var tmpV = parseInt(sptA[1]);
				var b = bomCounter(tmpH,tmpV);
				btnFace(b,tmpA[wNum]);
				if(!b){
					tmpA = tmpA.concat(getAround(tmpH,tmpV));
				}
			}
			wNum++;
		}
	}
}
////////////////////////////////
var openAry = new Array();
var openNum = 0;
/*--------------*/
function btnFace(bn,id){
        //alert (bn);
	d(id).firstChild.nodeValue = (!bn) ? " ":bn;
	//d(id).style.backgroundColor=(bn)?"#999":"#9f9";
	//d(id).style.borderStyle="inset";
	//d(id).style.background = "red";
	d(id).style.backgroundImage=(bn)?"url('cell_open.png')":"url('cell_open2.png')"; 
	
	
	
	openAry[openNum] = id;
	openAry.sort();
	openNum++;
	//d("touchcounter").firstChild.nodeValue = "Last: "+ safeZone + "/" + (safeZone - openNum) +" Mines: "+Mines;
	//d("mine_num").firstChild.nodeValue = Mines;
	
	
}
////////////////////////////////
function openChecker(ckId){
var bol = 0;
	for(i in openAry){
		if(openAry[i] == ckId){
			bol = 1;
			break;
		}
	}
	return bol;
}
////////////////////////////////
function bomCounter(mh,mv){
	var bc = 0;
	var tmpA = new Array();
	tmpA = getAround(mh,mv);
	for(q in tmpA){
		bc += (bomChecker(tmpA[q])) ? 1 : 0;
	}
	return bc;
}
////////////////////////////////
function getAround(mh,mv){
	var uh = (mh - 1 >= 0) ? mh - 1 : "x";
	var dh = (mh + 1 < V) ? mh + 1 : "x";
	var lv = (mv - 1 >= 0) ? mv - 1 : "x";
	var rv = (mv + 1 < H) ? mv + 1 : "x";
	var resultAry = new Array();
	var tmpAry = new Array(	uh+"-"+lv,	uh+"-"+mv,	uh+"-"+rv,
							mh+"-"+lv,				mh+"-"+rv,
							dh+"-"+lv,	dh+"-"+mv,	dh+"-"+rv);
	for(g in tmpAry){
		if(!openChecker(tmpAry[g]) && tmpAry[g].indexOf("x")<0){
			resultAry[resultAry.length] = tmpAry[g];
		}
	}
	return resultAry;
}
////////////////////////////////
var timer = 0;
var timeNum = 0;
/*--------------*/
function timers(){
timer = setInterval("timeView()",1000);
}
function timeView(){
	timeNum++;
	//d("timer").firstChild.nodeValue = "Time: "+ timeNum;
        var mins = Math.floor (timeNum  / 60),
        secs = (timeNum  - mins * 60);
        d("counter_time").getElementsByClassName('cover')[0].innerHTML = (mins<10 ? '0' + mins : mins) + ' ' + (secs<10 ? '0' + secs : secs);
	
	
}
////////////////////////////////
function writeBtn3(){
	var z='';
	for(ih=0; ih < H; ih++){
	//d("gamefield").innerHTML+="<div class='line'>";
	z+="<div class='line'>";
	  for(iv=0; iv < V; iv++){
	                var tmpId = "'"+ ih +"-"+ iv +"'";
			//document.write('<a href="#" class="btn" id='+ tmpId +'>&nbsp;</a>');
			//d("gamefield").innerHTML+='<div class="btn" id='+ tmpId +'>&nbsp;</div>';
			z+='<div class="btn" id='+ tmpId +'></div>';
	  }
	  //d("gamefield").innerHTML+='</div>';
	  z+='</div>';
	}	
      alert ("z="+z);
}

function writeBtn(){
  for(ih=0; ih < H; ih++){
    var js=document.createElement("DIV");
        js.setAttribute("class", "line");
        document.getElementById('gamefield').appendChild(js);
         for(iv=0; iv < V; iv++){
           var tmpId =  ih +"-"+ iv ;
           var jss=document.createElement("DIV");
           jss.setAttribute("class", "btn");
           jss.setAttribute("id", tmpId);
           jss.appendChild(document.createTextNode(''));
           document.getElementsByClassName('line')[ih].appendChild(jss);
       }
   }
}

function writeBtn2(){
	for(ih=0; ih < H; ih++){
			
		document.write("<div class='line'>");
		for(iv=0; iv < V; iv++){
			var tmpId = "'"+ ih +"-"+ iv +"'";
			//document.write('<a href="#" class="btn" id='+ tmpId +'>&nbsp;</a>');
			document.write('<div class="btn" id='+ tmpId +'>&nbsp;</div>');
		}
		document.write("</div>");
	}
	document.write("<style>#gamefield{width:"+Math.floor(H*35)+"px;}</style>");
}

////////////////////////////////
var hoverId=null;
function clickR(e) {
	if(hoverId)
	{
		var myVal = d(hoverId).firstChild.nodeValue;
		if(myVal=="¶"){
			Mines++;
			d(hoverId).style.color = "#fff";
			d(hoverId).firstChild.nodeValue = " ";
		} else if(!myVal.match(/[0-9]/g)){
			Mines--;
			d(hoverId).style.color = "#000";
			d(hoverId).firstChild.nodeValue = "¶";
		}
	}
	return false;
}


function marker(e) {

//alert ("hjj");

y=gs.position.current.y
x=gs.position.current.x
hoverId=y+"-"+x;
//alert ("hoverId="+hoverId);
	//if(hoverId)
	//{
		var myVal = d(hoverId).firstChild.nodeValue;
		if(myVal=="¶"){
			Mines++;
			d(hoverId).style.color = "#000";
			d(hoverId).firstChild.nodeValue = " ";
			d("mine_num").firstChild.nodeValue = Mines;
		} else if(!myVal.match(/[0-9]/g)){
			Mines--;
			d(hoverId).style.color = "#ff0000";
			d(hoverId).firstChild.nodeValue = "¶";
			d("mine_num").firstChild.nodeValue = Mines;
		}
	//}
	//return false;
}


var keyNum = false;
function clickCheck(e)
{
	if(document.all) e = event;
	if(keyNum || e.button==2)
	{
		//clickR();
		return false;
	}
}

//if(document.getElementById){
//	if (window.addEventListener) window.addEventListener("mousedown",clickCheck,true);
//}
//document.oncontextmenu = clickR;



//document.onkeypress = function(e)
//{
//	if(document.all) e=event;
//	keyNum = e.keyCode==102 ? true : false;

//}
//document.onkeyup = function(){keyNum=false;};

