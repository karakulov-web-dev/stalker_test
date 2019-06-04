/**
 * `keyProcessing` is function for catching keys down events and call functions appropriate each event
 *
 * @function
 * @name keyProcessing
 * @param {function(event):*}
 * @example
 * keyProcessing(some.event);
 * @return void
 */
function keyProcessing(e) {
    
    var code = e.keyCode || e.which;
    if (stb && stb.key_lock === true && code != key.FRAME) {return;}
    if (e.shiftKey) {code += 1000;}
    if (e.altKey) {code += 2000;}
    
    if(!current.buttonsStatus) {
        if(code == keys.EXIT) {
            player.stop();
            loading.hide();
            //console.log("loading.hide8");
        }
        return;
    }
    
    //log(e.keyCode);
    
   switch(current.layer) {
       case layers.BASE:
           switch(code) {
                case keys.EXIT:
                case keys.BACK:
                    if(current.loading == true) 
                     {
                        player.stop();
                        loading.hide();                        
                     }

               if (folder !=1 && app_history !=1 && catalog !=1) 
                     { 
                        settings.exit_show();
                     } 
             
           // Возврат из папки истории по кнопке EXIT
           //getData_h используем для актуального обновления папки
        if(folder == 1 && app_history ==1) {                        
          folder =0;                
          current.globalObj = new Array();
          current.obj = 0;
          current.page = curr_page_folder; //Текущая страница
          workWithItems.shift = parseInt(item_shift_folder); // Текущий элемент
          itemsPerRequest=request.itemsPerRequest*current.page; //max-results
       
          getData_h(current.feed + '&start-index=1&max-results=' + itemsPerRequest.toString() + '&order-by=' + current.sortMode +'&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');
          break;
         }     
        
      if (folder == 1 && catalog ==1) {                        
          folder =0;                
          current.globalObj = new Array();
          current.obj = 0;
          current.page = curr_page_folder; //Текущая страница
          workWithItems.shift = parseInt(item_shift_folder); // Текущий элемент
          itemsPerRequest=request.itemsPerRequest*current.page; //max-results
          getData('http://video.rikt.ru/video3/stb2/stb_mag200_catalog.php?id='+id_catalog.toString()+'&start-index=1&max-results=' + itemsPerRequest.toString() + '&order-by=' + current.sortMode +'&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');
          break;
         }

        // Возврат из папки по кнопке EXIT
      if (folder == 1) {                        
          folder =0;                
          current.globalObj = new Array();
          current.obj = 0;
          current.page = curr_page_folder; //Текущая страница
          workWithItems.shift = parseInt(item_shift_folder); // Текущий элемент
          itemsPerRequest=request.itemsPerRequest*current.page; //max-results
          getData(current.feed + '&start-index=1&max-results=' + itemsPerRequest.toString() + '&order-by=' + current.sortMode +'&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');
          break;
         } 
         
       // Возврат из Каталога по кнопке EXIT
      if (catalog == 1) {                        
          catalog =0;    
          current.globalObj = new Array();
          current.obj = 0;
          current.page = curr_page_catalog; //Текущая страница
          workWithItems.shift = parseInt(item_shift_catalog); // Текущий элемент
          itemsPerRequest=request.itemsPerRequest*current.page; //max-results
          getData(current.feed + '&start-index=1&max-results=' + itemsPerRequest.toString() + '&order-by=' + current.sortMode +'&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');
          break;
        } 
         
         // Возврат из папки истории в стартовое окно по кнопке EXIT
          if (app_history ==1)   {                 
                  byID('cur_cat').innerHTML = lang.cats.all;
                  current.globalObj = new Array();
                  current.feed = video.mainUrl;
                  request.startIndex = 1;  // set current startIndex
                  request.totalItems = 0;  // set current totalItems
                  current.obj = 0;
                  current.page = 1;
                  workWithItems.shift = 0;                  
                  app_history = 0;
                  getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj');                   
         } 
           
           
           
                break;
                
                case keys.POWER:
                    
                    if(standby == false){
                    if(current.loading == true) {
                        player.stop();
                        loading.hide();
                        console.log("loading.hide7");
                    }
                    stb.ExecAction('front_panel caption OFF');
                    standby = true;
		    stb.StandBy(true);
                break;
                }
                
                if(standby == true){
		stb.ExecAction('front_panel caption KKKK');
		stb.StandBy(false);
		standby = false;		
		}          
                break;
                
                
                case keys.LEFT:
                    if(current.obj - (current.page - 1) * items.atPage == 0) {
                        if(current.obj!=0) {
                            current.page--;
                            workWithItems.shift = -1;
                            workWithItems.drawBoxes();
                        }
                    } else {
                        workWithItems.shift = -1;
                        workWithItems.focusMovie();
                    }
                break;
                case keys.UP:
                    if(current.obj - (current.page - 1) * items.atPage >= items.atLine) {
                        workWithItems.shift = -items.atLine;
                        workWithItems.focusMovie();
                    } else {
                        if(current.obj - (current.page - 1) * items.atPage < items.atLine && current.obj>items.atLine) {
                            current.page--;
                            workWithItems.shift = -items.atLine;
                            workWithItems.drawBoxes();
                        }
                    }
                break;
                case keys.RIGHT:           
                  if(current.obj + 1 == current.page * items.atPage) {
                     if(current.obj + 1 == current.globalObj.length && !(request.totalItems == current.globalObj.length - 1)) 
                       {
                            //log("event to upload next");
                            current.page++;
                            workWithItems.shift = 1;
                            
                     if (folder!=1){
                            getData(current.feed +
                                    '&start-index=' + current.globalObj.length.toString() +
                                    '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');
                                    }
                    if (folder==1){
                            getData('http://video.rikt.ru/video3/stb2/stb_mag200_folder_full_2.php?id='+id_f.toString()+
                                    '&start-index=' + current.globalObj.length.toString() +
                                    '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');}
                        } else {
                            current.page++;
                            workWithItems.shift = 1;
                            workWithItems.drawBoxes();
                        }
                    } else {
                        //  доработка смещения фокуса вправо, в случае не полного заполнения страницы
                        //  добавил проверку  if (current.obj + 1 != current.globalObj.length){}
                        if (current.obj + 1 != current.globalObj.length){
                        workWithItems.shift = 1;
                        workWithItems.focusMovie();}
                    }
                break;
                case keys.DOWN:
                //alert ("current.obj="+current.obj +"current.page="+current.page+"-"+"items.atPage="+items.atPage+'<br>'+'items.atLine='+items.atLine);
                  
                    if(current.obj - (current.page - 1) * items.atPage < items.atLine) {
                        //Добавил проверку смещения фокуса вниз в пределах страницы
                        if (current.globalObj.length>current.obj+items.atLine){               
                         workWithItems.shift = items.atLine;
                         workWithItems.focusMovie();
                        }
                    } else {              
                       
                        //При перемещении на другую страницу                        
                        //if(current.globalObj.length >= (current.page + 1) * items.atPage ||
                          // (request.totalItems == current.globalObj.length - 1)) {
                          // alert(request.totalItems);
                          // alert(current.globalObj.length);
                           if(current.globalObj.length > current.page * items.atPage){
                           
                           
                           var tt= current.page*items.atPage-current.obj;
                            current.page++;
                           
                            //workWithItems.shift = items.atLine;
                            workWithItems.shift = tt;
                            workWithItems.drawBoxes();
                        } else {
                            if(request.totalItems == current.globalObj.length - 1) {return;}
                            //log("event to upload next");
                            
                            var tt= current.page*items.atPage-current.obj;
                            current.page++;
                            //workWithItems.shift = items.atLine;
                            workWithItems.shift = tt;                          
                            if (folder!=1){
                            getData(current.feed +
                                    '&start-index=' + current.globalObj.length.toString() +
                                    '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');
                                    }
          if (folder==1){
    getData('http://video.rikt.ru/video3/stb2/stb_mag200_folder_full_2.php?id='+id_f.toString()+'&start-index=' + current.globalObj.length.toString() +'&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');}
                      
                        }
                    }
                break;
                case keys.PAGE_NEXT:
                //alert (request.totalItems);
                    if((current.page + 1)*items.atPage <=current.globalObj.length || (request.totalItems == current.globalObj.length - 1)) {
                        if(current.page == Math.ceil((request.totalItems+1)/items.atPage)) return;
                        var tt= current.page*items.atPage-current.obj;
                        current.page++;
                        //workWithItems.shift = items.atPage;
                        workWithItems.shift = tt;
                        workWithItems.drawBoxes();
                    } else {
                        //log("event to upload next");
                        
                        var tt= current.page*items.atPage-current.obj;
                        
                        current.page++;
                        //workWithItems.shift = items.atPage;
                        workWithItems.shift = tt;
                        
                       if (folder!=1){
                            getData(current.feed +
                                    '&start-index=' + current.globalObj.length.toString() +
                                    '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');}
          if (folder==1){
    getData('http://video.rikt.ru/video3/stb2/stb_mag200_folder_full_2.php?id='+id_f.toString()+'&start-index=' + current.globalObj.length.toString() +'&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');}
                      
                    }
                break;
                case keys.PAGE_PREV:
                    if(current.page>1) {
                        current.page--;
                        workWithItems.shift = -items.atPage;
                        workWithItems.drawBoxes();
                    }
                break;

                case keys.OK:
                    
                    //var id = byID('frame').getElementsByClassName('active')[0].title;
                    //id_f - id фильма - глобальная переменная, используется при навигации курсором
                    var id = id_f = current.globalObj[current.obj].id;
                    var last_view_item = current.globalObj[current.obj].last_view_item;
                    if (id>0) { 
            
                           if (current.globalObj[current.obj].catalog==1) {  
                           id_catalog = current.globalObj[current.obj].id;
                           //alert(id_catalog);
                           catalog=1;
                           curr_page_catalog = current.page; //Запоминаем текущую страницу
                           item_shift_catalog = current.obj;  //Запоминаем текущий элемент
                           current.globalObj = new Array();
                           current.obj = 0;
                           current.page = 1;
                           workWithItems.shift = 0;
             getData('http://video.rikt.ru/video3/stb2/stb_mag200_catalog.php?id='+id.toString()+'&start-index=1&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');                           
                             
                          }
                          
                          else if (current.globalObj[current.obj].id_folder==0)
                             { // Проигрывание в обычном режиме без входа в папку
                               loading.show();
                               player.playingPreparation(current.globalObj[current.obj]); //play move
                               
                             }
                          
                          else {
                          //alert("folder");
                           folder=1;
                           curr_page_folder=current.page; //Запоминаем текущую страницу
                           item_shift_folder=current.obj;  //Запоминаем текущий элемент
                           current.globalObj = new Array();
                           current.obj = 0;

                           if(last_view_item>0) {
                             workWithItems.shift = last_view_item;
                             current.page = Math.ceil((workWithItems.shift+1)/items.atPage);
                             itemsPerRequest=request.itemsPerRequest*current.page; //max-results
                             getData('http://video.rikt.ru/video3/stb2/stb_mag200_folder_full_2.php?id='+id.toString()+'&start-index=1&max-results=' + itemsPerRequest.toString(), 'rebuildCurrentGlobalObj');
                           } else {
                           //alert("getData_folder");
                             current.page = 1;
                             workWithItems.shift = 0;
             getData('http://video.rikt.ru/video3/stb2/stb_mag200_folder_full_2.php?id='+id.toString()+'&start-index=1&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority, 'rebuildCurrentGlobalObj');                           
                           
                           }
                          }
                        }  
                break;
                
                case keys.INFO:
                    window.location.reload(true);
                break;
               case keys.WEB:
                  byID('cur_cat').innerHTML = lang.f_app_btn_full;
                  var ethaddr = getEnvironmentValue('ethaddr');
                  current.globalObj = new Array();
                  current.feed = video.historyUrl + '?mac=' + ethaddr;
                  request.startIndex = 1;  // set current startIndex
                  request.totalItems = 0;  // set current totalItems
                  current.obj = 0;
                  current.page = 1;
                  workWithItems.shift = 0;
                  folder=0;
                  app_history = 1;
                  getData_h(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj');   
                break;
                case keys.RED:
                case keys.NUM1:
                    settings.cats_show();
                break;
                case keys.GREEN:
                case keys.NUM2:
                    id_f= current.globalObj[current.obj].id;
                    server_id=current.globalObj[current.obj].server;
                    settings.caption(server_id,current.globalObj[current.obj].catalog);                    
                break;
                case keys.YELLOW:
                case keys.NUM3:
                    settings.search_show();
                break;
                case keys.NUM4:
                case keys.BLUE:
                    settings.options.show();
                break;
            }
        break;
        
        case layers.PLAYER: // playing layer
            switch(code) {
                case keys.EXIT:
                case keys.STOP: // stop
                    player.stop();
                    byID('shell').style.display = 'block';
                break;
                case keys.PAUSE: // play/pause
                    if(player.condition==0){player.condition=1;} else {player.condition=0;}
                    player.playOrPause();
                break;
                case keys.REW:
                case keys.LEFT:  // move interval -step
                    player.rewind(-1);
                break;
                case keys.FFWD:
                case keys.RIGHT: // move interval +step
                    player.rewind(1);
                break;
                case keys.UP:    // interval enlarge
                    player.changeStep("up");
                break;
                case keys.DOWN: // interval reduce
                    player.changeStep("down");
                break;
                case keys.CHANNEL_NEXT:
                    var id;
                    player.stop_pre_play();
                    if(current.obj + 1 == current.page * items.atPage) {
                        if(current.obj + 1 == current.globalObj.length &&
                           !(request.totalItems == current.globalObj.length - 1)) {
                            //log("event to upload next");
                            current.page = 0;
                            workWithItems.shift = 0;
                            workWithItems.drawBoxes();
                            loading.show(true);

                            id = byID('frame').getElementsByClassName('active')[0].title;
                            for(var i in current.globalObj) {
                                if(current.globalObj[i].id == id) {
                                    //log('Set action id : ' + id);
                                    player.playingPreparation(current.globalObj[i]); //play move
                                    break;
                                }
                            }
                        } else {
                            current.page++;
                            workWithItems.shift = 1;
                            workWithItems.drawBoxes();
                            loading.show(true);

                            setTimeout(
                                function() {
                                    var id = byID('frame').getElementsByClassName('active')[0].title;
                                    for(var i in current.globalObj)
                                    {
                                        if(current.globalObj[i].id == id)
                                        {
                                            //log('Set action id : ' + id);
                                            player.playingPreparation(current.globalObj[i]); //play move
                                            break;
                                        }
                                    }
                                },
                                350
                            );
                        }
                    } else {
                        workWithItems.shift = 1;
                        workWithItems.focusMovie();
                        loading.show(true);

                        id = byID('frame').getElementsByClassName('active')[0].title;
                        for(var i in current.globalObj) {
                            if(current.globalObj[i].id == id) {
                                //log('Set action id : ' + id);
                                player.playingPreparation(current.globalObj[i]); //play move
                                break;
                            }
                        }
                    }
                break;
                case keys.CHANNEL_PREV:
                    var id;
                    player.stop_pre_play();
                    if(current.obj - (current.page - 1) * items.atPage == 0) {
                        if(current.obj!=0) {
                            current.page--;
                            workWithItems.shift = -1;
                            workWithItems.drawBoxes();
                            loading.show(true);

                            setTimeout(
                                function() {
                                    var id = byID('frame').getElementsByClassName('active')[0].title;
                                    for(var i in current.globalObj)
                                    {
                                        if(current.globalObj[i].id == id)
                                        {
                                            //log('Set action id : ' + id);
                                            player.playingPreparation(current.globalObj[i]); //play move
                                            break;
                                        }
                                    }
                                },
                                350
                            );
                        }
                    } else {
                        workWithItems.shift = -1;
                        workWithItems.focusMovie();
                        loading.show(true);

                        id = byID('frame').getElementsByClassName('active')[0].title;
                        for(var i in current.globalObj) {
                            if(current.globalObj[i].id == id) {
                                //log('Set action id : ' + id);
                                player.playingPreparation(current.globalObj[i]); //play move
                                break;
                            }
                        }
                    }
                break;
                /*
                case keys.NUM0:
                case keys.NUM1:
                case keys.NUM2:
                case keys.NUM3:
                case keys.NUM4:
                case keys.NUM5:
                case keys.NUM6:
                case keys.NUM7:
                case keys.NUM8:
                case keys.NUM9:
                case keys.BACK:
                    var num;
                    switch (code) {
                        case keys.NUM0:num = 0;break;
                        case keys.NUM1:num = 1;break;
                        case keys.NUM2:num = 2;break;
                        case keys.NUM3:num = 3;break;
                        case keys.NUM4:num = 4;break;
                        case keys.NUM5:num = 5;break;
                        case keys.NUM6:num = 6;break;
                        case keys.NUM7:num = 7;break;
                        case keys.NUM8:num = 8;break;
                        case keys.NUM9:num = 9;break;
                        case keys.BACK:num = -1;break;
                    }
                    player.pressNums(num);
                break;
                */
                case keys.OK:
                    player.pressOK();
                break;
                case keys.VOL_DOWN:
                    player.pressVolume(-1);
                break;
                case keys.VOL_UP:
                    player.pressVolume(1);
                break;
                case keys.MUTE:
                    player.pressMute();
                break;
                case keys.YELLOW:
                case keys.FRAME:
                    player.displayModeChange();
                break;
                case keys.BLUE:
                    settings.changePlayMode();
                break;
            }
        break;
        case layers.SEARCH: // search layer
            switch(code) {
                case keys.EXIT:
                    settings.search_hide();
                break;
                case 64:
                case keys.OK: // start search
                    //log('search: "' + byID('search_val').value + '"');
                    settings.search_start(byID('search_val').value);
                    app_history=0;
                    catalog=0;
                break;
            }
        break;
        case layers.CATEGORY:
            switch(code) {
                case keys.UP:
                    categoryes.shift = -1;
                    categoryes.draw();
                break;
                case keys.DOWN:
                    categoryes.shift = 1;
                    categoryes.draw();
                break;
                case keys.PAGE_NEXT:
                    categoryes.shift = current.catItems;
                    categoryes.draw();
                break;
                case keys.PAGE_PREV:
                    categoryes.shift = -current.catItems;
                    categoryes.draw();
                break;
                case keys.BACK:
                case keys.EXIT:
                case keys.RED:
                case keys.NUM1:
                    categoryes.shift = 0;
                    settings.cats_hide();
                break;
                case keys.OK: // start search
                    app_history = 0;
                    settings.cats_start();
                    categoryes.shift = 0;
                break;
            }
        break;
        
        case layers.SETTINGS:
            settings.options.handler(code);
        break;
        
        
        case layers.CAPTION:
            switch(code) {
                case keys.BACK:
                case keys.EXIT:
                case keys.GREEN:
                case keys.NUM2:
                settings.caption_hide();
                break;
                case keys.DOWN:
                    document.getElementById("modalcaption_descr").scrollTop = document.getElementById("modalcaption_descr").scrollTop+25;
                break;
                case keys.UP:
                    document.getElementById("modalcaption_descr").scrollTop = document.getElementById("modalcaption_descr").scrollTop-25;
                break;
            }
        break;
        
        case layers.EXIT:
            switch(code) {
                case keys.BACK:
                case keys.EXIT:           
                settings.exit_hide();
                break;
                case keys.OK: // exit
                  window.location = pages.back;
                break; 
            }
        break;
        
    }
    if(current.mode.show_all_keydowns) {
        log("keyPressProcessing | post | " +
                "\"key-code:" + code.toString() + ", " +
                "current-layer:" + current.layer.toString() + ", " +
                "current-obj:" + current.obj.toString() + ", " +
                "current.feed:" + current.feed.toString() + ", " +
                "current.page:" + current.page.toString() + "\"");
    }
}