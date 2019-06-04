window.onload = init;
window.onkeydown = key.press;

function init(){
    VKBlock = true;
    win = { "width":720, "height":576};
    //var graphicres_mode = "720";
    gs.actualSize = 576;
    byID('cursorBox').style.width = gs.size[gs.actualSize].scr.w + 'px';
    byID('cursorBox').style.height = gs.size[gs.actualSize].scr.h + 'px';
    //try {
     //   stb = gSTB;
     //   stb.ExecAction("graphicres " + graphicres_mode);
     //   stb.EnableServiceButton(true);
    //}
    //catch(e){}
   // try {
     //   modes.emulate = false;
     //   stb = gSTB; // if emulate - set a cap for main class management of device
   // }
   // catch(e){
    //    modes.emulate = true;
     //   stb = egSTB;
  //  }

    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", 'css/screen_' + gs.actualSize + '.css');
    document.getElementsByTagName("head")[0].appendChild(fileref);
   // log('CSS file imported: "css/screen_' + gs.actualSize + '.css"');


 //window.moveTo(0, 0);

   // window.moveTo(screen.width/2-360,screen.height/2-288);
//window.moveTo(50, 0);

    try {
        stb = gSTB;
     //   window.resizeTo(720,576);
    }
    catch(e){}

//gs.size[gs.actualSize].cll.w = gs.size[gs.actualSize].cll.w
//gs.size[gs.actualSize].cll.h = gs.size[gs.actualSize].cll.h



   // bomMake();
    //cvDraw.item();
}
var cvDraw = {
    "sizeScr":"",
    "ball":null,
    "bgImg_1":"",
    "bgImg_2":"",
    "stopAddBalls":false,
    "isEndGame":false,
    "complexity":"easy",
    "item":function(){
        byID('cursor').style.marginLeft = gs.position.current.x * gs.size[gs.actualSize].cll.w + 'px';
        byID('cursor').style.marginTop = gs.position.current.y * gs.size[gs.actualSize].cll.h + 'px';
        //alert (gs.position.current.y);
    },
    "showfinish":function(){
        keysBlock = true;
            byID('errorFinish').style.display = 'block';
    },
    "showfinish2":function(){
        keysBlock = true;
            byID('errorFinish2').style.display = 'block';
    },
    "jumpBallTimer":null,
    "jumpBallScale":0.6,
    "jumpBallScaleD":0.1,
    "jumpBall":function(v){
        var self = this;
        if(v==9) {this.jumpBallTimer = setInterval(function(){self.jumpBallStartJumping();}, 60);}
    },
     
    "PressOK":function(){
        //alert ("gs.position.current.y="+gs.position.current.y);
        //bang ();
    },
     "start":function(){
                    bomMake();
                    cvDraw.item();
                    //alert ("oq");
                    VKBlock = false;
                    //alert ("compl="+gs.complexity[this.complexity].x);
    },
    
      
    
    
    "startCursor":function(direction){
        switch(this.complexity) {
            case "easy":
                byID('c_easy').style.backgroundImage='url(img/'+gs.actualSize+'/start/easy0.png)';
                if(direction==1) {
                    this.complexity = "hard";
                    byID('c_hard').style.backgroundImage='url(img/'+gs.actualSize+'/start/hard1.png)';
                } else {
                    this.complexity = "normal";
                    byID('c_normal').style.backgroundImage='url(img/'+gs.actualSize+'/start/normal1.png)';
                }
            break;
            case "normal":
                byID('c_normal').style.backgroundImage='url(img/'+gs.actualSize+'/start/normal0.png)';
                if(direction==1) {
                    this.complexity = "easy";
                    byID('c_easy').style.backgroundImage='url(img/'+gs.actualSize+'/start/easy1.png)';
                } else {
                    this.complexity = "hard";
                    byID('c_hard').style.backgroundImage='url(img/'+gs.actualSize+'/start/hard1.png)';
                }
            break;
            case "hard":
                byID('c_hard').style.backgroundImage='url(img/'+gs.actualSize+'/start/hard0.png)';
                if(direction==1) {
                    this.complexity = "normal";
                    byID('c_normal').style.backgroundImage='url(img/'+gs.actualSize+'/start/normal1.png)';
                } else {
                    this.complexity = "easy";
                    byID('c_easy').style.backgroundImage='url(img/'+gs.actualSize+'/start/easy1.png)';
                }
            break;
        }
    }
}
