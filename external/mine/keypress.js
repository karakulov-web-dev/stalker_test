var key = {
    "press":function(e) {
        var code = e.keyCode || e.which;
        if (stb && stb.key_lock === true && code != key.FRAME) {return;}
        if (e.shiftKey) {code += 1000;}
        if (e.altKey) {code += 2000;}
        if(VKBlock==true && code!=keys.OK && code!=keys.EXIT && code!=keys.UP  && code!=keys.DOWN) {
            return;
        }
        //ert ("VKBlock="+VKBlock);
        if(VKBlock==true) {
            switch(code) {
                case keys.DOWN:
                    cvDraw.startCursor(-1);
                break;
                case keys.UP:
                    cvDraw.startCursor(1);
                break;
                case keys.OK:
                    //VKBlock = false;
                    byID('begin').style.display = 'none';
                    
                    //bomMake();
                    //cvDraw.item();
                    
                    cvDraw.start();
                break;
                case keys.EXIT:
                        window.location = pages.back;
                break;
            }
            return;
        }
        
        switch(code) {
            case keys.RIGHT:
                gs.position.old.y = gs.position.current.y;
                gs.position.old.x = gs.position.current.x;
                //if(gs.position.current.x + 1 <= gs.cells.x - 1) {
                  if(gs.position.current.x + 1 <= gs.complexity[cvDraw.complexity].x - 1) {
                    gs.position.current.x++;
                } else {
                    //gs.position.current.x = gs.cells.x - 1;
                    gs.position.current.x = gs.complexity[cvDraw.complexity].x - 1;
                }
                cvDraw.item();
            break;
            case keys.LEFT:
                gs.position.old.y = gs.position.current.y;
                gs.position.old.x = gs.position.current.x;
                if(gs.position.current.x - 1 >= 0) {
                    gs.position.current.x--;
                } else {
                    gs.position.current.x = 0;
                }
                cvDraw.item();
            break;
            case keys.DOWN:
                gs.position.old.y = gs.position.current.y;
                gs.position.old.x = gs.position.current.x;
                //if(gs.position.current.y + 1 <= gs.cells.y - 1) {
                if(gs.position.current.y + 1 <= gs.complexity[cvDraw.complexity].y - 1) {
                    gs.position.current.y++;
                } else {
                    //gs.position.current.y = gs.cells.y - 1;
                    gs.position.current.y = gs.complexity[cvDraw.complexity].y - 1;
                }
                cvDraw.item();
            break;
            case keys.UP:
                gs.position.old.y = gs.position.current.y;
                gs.position.old.x = gs.position.current.x;
                if(gs.position.current.y - 1 >=0) {
                    gs.position.current.y--;
                } else {
                    gs.position.current.y = 0;
                }
                cvDraw.item();
            break;
            case keys.OK:
                if(keysBlock==true) {
                    //var new_loc = new String(window.location).substr(0, new String(window.location).indexOf('?'));
                    //window.location =  new_loc +'?referrer='+Base64.encode(pages.referrer);
                    window.location.reload(true);
                    return;
                }
                //alert ("VKBlock="+VKBlock);
                //alert ("code="+code);
                //cvDraw.PressOK();
                //alert (gs.position.current.x);
                bang (gs.position.current.y,gs.position.current.x);
            break;
            case keys.NUM1:
                marker();
                //cvDraw.jumpBallStop();
            break;
            case keys.RED:
                //log(cvDraw.showArr());
                marker();
            break;
            case keys.NUM9:
            case keys.REC:
                //cvDraw.showBall();
            break;
            case keys.BACK:
                window.location.reload(true);
            break;
            case keys.EXIT:
                 window.location = pages.back;
            break;
        }
        
    }
}