 

var player_cond = 0,
    player = {
    "obj":new Object(), //current object
    "condition": 1, // play/pause
    "current_step": 30, // step rewind
    "steps": [5,10,20,30,60,300,600,900], // step rewinds
    "interval": new Object(), // timer for everystep
    "interval_text": "setInterval(player.every_sec, 1000);", // text
    "last_step": 10, // in percents
    "where": 0,      //position for set after rewind
    "timer": new Object(),  // timer for rewind
    "timer_cur": 0,         // current residual time for cheking and end timer rewind
    "timer_iv": 1000,
    "timer_iv_len": 1000,   // started timer period
    "timer_iv_step": 100,   // step for rewind timer
    "obj": new Object(),    // playying obj
    "scrolbar_width": 390,  // #scrollbar width
    "n_where": "",          // string for player position after press nums
    "n_where_sec": 0,       // int number of seconds for player position after press nums
    //
    //
    //
    "timer_check_start_player_obj":null,
    "timer_check_start_player_count":0,
    "timer_check_start_player_max_count":5,
    "timer_check_start_player_interval": 7000, //seconds waite for some action 10s    
    "timer_check_start_player_action": function() {
        //log('\ntimer_check_start_player_action\n');
        player.timer_check_start_player_obj = null;
        switch(current.playMode) {
            case "single":
            case "repeat":
                loading.hide();                
                player.timer_check_start_player_count++;
                if(player_cond != 1) {
                loading.show();     
                player.playingPreparation(player.obj);
                }
            break;
            case "random":
                loading.hide();
//                console.log("loading.hide3");
                if(player.timer_check_start_player_count < player.timer_check_start_player_max_count) {
                    if(player_cond != 1) {
                    loading.show();     
                    player.playingPreparation(player.obj);
                   }
                    return;
                }
                player.timer_check_start_player_count = 0;
                if(player_cond != 1) {
                    loading.show();     
                    player.playingPreparation(current.globalObj[random(current.globalObj.length)]);
                   }
            break;
            case "list":
                loading.hide();
  //              console.log("loading.hide4");
                if(player.timer_check_start_player_count < player.timer_check_start_player_max_count) {
                    if(player_cond != 1) {
                    loading.show();     
                    player.playingPreparation(player.obj);
                   }
                    return;
                }
                player.timer_check_start_player_count = 0;
                var metka = false;
                for(var i = 0; i < current.globalObj.length; i++) {
                    if(metka) {
                        if(player_cond != 1) {
                         loading.show();     
                         player.playingPreparation(current.globalObj[i]);
                        }
                        
                        break;
                    }
                    if(current.globalObj[i] == player.obj) {
                        metka = true;
                    }
                    if(metka && i == current.globalObj.length - 1) {
                        if(player_cond != 1) {
                         loading.show();     
                         player.playingPreparation(current.globalObj[0]);
                        }
                    }
                }
            break;
        }
    },
    //
    //
    //
    //
    /**
    * `playingPreparation` is method for set start 
    *
    * @function
    * @name playingPreparation
    * @param {function(value):*}
    * @example
    * player.playingPreparation(obj);
    * @return void
    */
    
    "playingPreparation": function(obj) {
        if(win.width==1920) {
            player.scrolbar_width = 780;
        }
        player.obj = obj;
        var server = player.obj.server;
        var id = player.obj.id;
        var extension = player.obj.extension;
        var server_groups = player.obj.server_groups; 
            
        var ethaddr = stb.RDir('MACAddress');
        
        $.getJSON("http://video.rikt.ru/video3/stb2/stb_films_history2.php?mac="+ethaddr+"&film_id="+id+"&server_id="+server+"&callback=?", function(data){
          //alert(data.result);		   
        });						   
      
       $.getJSON("http://video.rikt.ru/video3/stb2/stb_url_groups.php?server_groups="+server_groups+"&callback=?", function(data){
   
        if (data.url == 0) {
         loading.hide();
         //alert(current.layer); 0 BASE

         error.error_show();
         setTimeout(error.error_hide,3000);

        } else {
          var url = data.url + server +"."+extension;
          player.play_clip(url);
          player.current_step = 30;
          byID('playModeInPlayer').className = current.playMode;
          player.timer_check_start_player_obj = setTimeout("player.timer_check_start_player_action();", player.timer_check_start_player_interval);
        } 

          //player.play_clip(url);
        });
        
    },
    /**
    * `iv_stop` is method for start everyseconds timer
    *
    * @function
    * @name iv_stop
    * @param {function():*}
    * @example
    * player.iv_stop();
    * @return void
    */
    "iv_stop": function() {
        clearInterval(player.interval);
        player.interval = null;

        clearInterval(player.timer);
        player.timer = null;
    },
    /**
    * `iv_start` is method for start everyseconds timer
    *
    * @function
    * @name iv_start
    * @param {function():*}
    * @example
    * player.iv_start();
    * @return void
    */
    "iv_start": function() {
        clearInterval(player.interval);
        player.interval = null;
        player.interval = eval(player.interval_text);
    },
    "play_clip": function(url) {
        byID('shell').style.display = 'none';   // hide
        player.current_step = 30;               // interval step
        player_cond = 1;                        // set player condition in playing mode
        current.layer = layers.PLAYER;          // set manage layer PLAYER
        byID('conditiion').style.marginLeft = '0px';    // set current position of scroll to begin
        byID('filename').innerHTML = player.obj.title.length > 35 ? player.obj.title.substr(0, 34) + "..." : player.obj.title;    // cut move name
        byID('time_act').innerHTML = '00:00:00';    // zerring atual time
        byID('interval_input').innerHTML = lang.intervals[player.current_step]; // set lang interval
        stb.Play('http://ssd0.stbmedia10.mezhdu.net:8080/films/76860.mkv');
        //stb.Play('http://stbmedia7-ch1.mezhdu.net:8081/films/74987.mkv');
        //stb.Play(url);              
        byID('mute').style.display = (this.muteStatus==1) ? 'block' : 'none';   // show/hide mute picture
    },    
    /**
    * `playerEvent` is method for check events from device
    *
    * @function
    * @name playerEvent
    * @param {function(event):*} (int)
    * @example
    * player.playerEvent(event);
    * @return void
    */
    "playerEvent": function(event) {
        //log(" - - - stbEvent: " + event);
        event = parseInt(event);
        switch(event) {
            case 1: // the player has reached the end of the recorded media content or a long gap flux
                switch(current.playMode) { // switch modes
                    case "repeat":
                        stb.Continue();
                    break;
                    case "list":
                        var metka = false;
                        for(var i = 0; i < current.globalObj.length; i++) {
                            if(metka) {
                                player.playingPreparation(current.globalObj[i]);
                                break
                            }
                            if(current.globalObj[i] == player.obj) {
                                metka = true;
                            }
                            if(metka && i == current.globalObj.length - 1) {
                                player.playingPreparation(current.globalObj[0]);
                            }
                        }
                    break;
                    case "random":
                        player.playingPreparation(current.globalObj[random(current.globalObj.length)]);
                    break;
                    case "single":
                    default:
                        player_cond = 0;
                        byID('main').style.display = 'none';
                        byID('mute').style.display = 'none';
                        byID('shell').style.display = 'block';
                        current.layer = layers.BASE;
                        //log('player.iv_stop();');
                        player.iv_stop();
                    break;
                }
            break;
            case 2: // obtained information about audio and video tracks of media content
            
             var first_sub_lang ='none';
             var first_sub_pid = 0;
             var time = stb.GetMediaLen();
               var time_obj = {
                "hours":0,
                "minuts":0,
                "seconds":0
               };
                
               time_obj.hours = Math.floor(time / 3600);   // current move duration in hours
               time_obj.minuts = Math.floor((time - time_obj.hours * 3600) / 60);   // current move duration in minuts
               time_obj.seconds = time - time_obj.hours * 3600 - time_obj.minuts * 60;   // current move duration in seconds
               byID('time_total').innerHTML = '/ ' + ((time_obj.hours<10)? "0" + time_obj.hours : time_obj.hours) + ':' + ((time_obj.minuts<10)? "0" + time_obj.minuts : time_obj.minuts) + ':' + ((time_obj.seconds<10)? "0" + time_obj.seconds : time_obj.seconds);
             
              var sub_pids = stb.GetSubtitlePIDs();
              var array_of_objects = eval('(' + sub_pids + ')'); //[{pid:2, lang:["rus", "ru"]}, {pid:3, lang:["eng", ""]}] 
              if (!empty(array_of_objects)) {
                 first_sub_lang = array_of_objects[0].lang[0]; 
                 first_sub_pid = array_of_objects[0].pid;
                 } //Обычно русские сабы располагаются в первой дороге. 
            
             //Если выбраны русские сабы и найдены русские сабы в файле, показываем            
             if (current.subtitles=='sub_on' && first_sub_lang=='rus') {
                stb.SetSubtitles(1);              
                if (stb.RDir('MACAddress').substring(0,8)!="10:27:BE")
                { 
                    stb.SetSubtitleLangs('rus','');    //для МАГ
                }
                else
                {
                    stb.SetSubtitlePID(first_sub_pid);  //для ТВИП
                }    
                byID('subtitles').innerHTML ='SUB on';                                
              } else if (current.subtitles=='sub_off' && first_sub_lang=='rus') {
               byID('subtitles').innerHTML ='SUB off';
               stb.SetSubtitles(0);               
             } else {
               stb.SetSubtitles(0);
               byID('subtitles').innerHTML ='';               
             }             

            break;
            case 4: // beginning to display videos and / or play sound
                loading.hide();
 //               console.log("loading.hide5");
                player_cond = 1;
                player.iv_start();
                clearTimeout(player.timer_check_start_player_obj);
                player.timer_check_start_player_obj = null;
                if (stb.RDir('MACAddress').substring(0,8)=="10:27:BE") //для ТВИП начальный aspect=0 при загрузке видео
                    {
                     stb.SetAspect(aspects[0].mode);
                     //console.log('\n SetAspect TVIP');
                    }

                //log('\nclearTimeout(player.timer_check_start_player_obj);\n');                
            break;
            case 5: // error opening content: there is no such content on a server or a fault has occurred while connecting to the server            
                player_cond = 0;
                //log('player.iv_stop();');
                byID('shell').style.display = 'block';
                current.layer = layers.BASE;
                player.iv_stop();
            break;
        }
    },
    /**
    * `stop` is method for stop move playing
    *
    * @function
    * @name stop
    * @param {function():*}
    * @example
    * player.stop();
    * @return void
    */
    "stop": function() {
        //log('stb.Stop();');
        player.iv_stop();
        clearTimeout(player.timer_check_start_player_obj);
        player.timer_check_start_player_obj = null;
        stb.Stop();
        byID('main').style.display = 'none';
        byID('shell').style.display = 'block';
        current.layer = layers.BASE;        
        byID('playingStatus').style.display = 'none';
        byID('mute').style.display = 'none';
    },
    /**
    * `stop_pre_play` is method for stop move playing
    *
    * @function
    * @name stop_pre_play
    * @param {function():*}
    * @example
    * player.stop_pre_play();
    * @return void
    */
    "stop_pre_play": function() {
        //log('stb.Stop();');
        player.iv_stop();
        stb.Stop();
        byID('playingStatus').style.display = 'none';
        byID('mute').style.display = 'none';
        loading.show();
    },
    /**
    * `playOrPause` is method for trigging player condition (pause/play)
    *
    * @function
    * @name playOrPause
    * @param {function():*}
    * @example
    * player.playOrPause();
    * @return void
    */
    "playOrPause": function() {
        //log("- - - status pre: " + player_cond);
        if(player_cond==1) {
            byID('main').style.display = 'block';
            player._pause();
        } else {
            byID('main').style.display = 'none';       
            player._continue();
            //Добавил сл. строку чтобы избежать разрыва с видео сервером после паузы
            player.rewind_afterPause(1); 
        }
        //log("- - - status post: " + player_cond);
    },
    /**
    * `_pause` is method for pause move
    *
    * @function
    * @name _pause
    * @param {function():*}
    * @example
    * player._pause();
    * @return void
    **/
    "_pause": function() {
        //log('- - - stb.Pause(); (status: ' + player_cond + ')');
        if(player_cond != 0) {
            stb.Pause();
        }
        player_cond = 0;
        player.iv_stop();
        byID('playingStatus').style.display = 'block';
    },
    /**
    * `_continue` is method for continue move
    *
    * @function
    * @name _continue
    * @param {function():*}
    * @example
    * player._continue();
    * @return void
    **/
    "_continue": function() {
        //log('- - - stb.Continue(); (status: ' + player_cond + ')');
        if(player_cond != 1) {
            stb.Continue();
        }        
        player_cond = 1;
        player.iv_start();

        byID('playingStatus').style.display = 'none';
    },
    /**
    * `toBegin` is method for start move again
    *
    * @function
    * @name toBegin
    * @param {function():*}
    * @example
    * player.toBegin();
    * @return void
    **/
    "toBegin": function() {
        player.iv_stop();
        //log('stb.Stop();');
        //log('stb.Continue();');
        stb.Stop();
        stb.Continue();
        player.iv_start();
        byID('conditiion').style.marginLeft = '0px';
        byID('time_act').innerHTML = '00:00:00';
        byID('main').style.display = 'block';
    },
    /**
    * `changeStep` is method for change rewind interval by circle
    *
    * @function
    * @name changeStep
    * @param {function((string)direction):*}
    * @example
    * player.changeStep('up');
    * @return void
    **/
    "changeStep": function(direction) {
        byID('main').style.display = 'block';
        var i;
        switch(direction) {
            case "up":
                for(i = player.steps.length - 1; i >= 0; i--) {
                    if(player.steps[i]==player.current_step) {
                        //log("down | current " + i);
                        if(i==player.steps.length - 1) {
                            player.current_step = player.steps[0];
                        } else {
                            player.current_step = player.steps[i + 1];
                        }
                        byID('interval_input').innerHTML = lang.intervals[player.current_step];
                        break;
                    }
                }
            break;
            case "down":
                for(i = 0; i < player.steps.length; i++) {
                    if(player.steps[i] == player.current_step) {
                        //log("up | current " + i);
                        if(i == 0) {
                            player.current_step = player.steps[player.steps.length - 1];
                        } else {
                            player.current_step = player.steps[i - 1];
                        }
                        byID('interval_input').innerHTML = lang.intervals[player.current_step];
                        break;
                    }
                }
            break;
        }
    },
    /**
    * `every_sec` is method for every second change visual status move
    *
    * @function
    * @name every_sec
    * @param {function():*}
    * @example
    * player.every_sec();
    * @return void
    **/
    "every_sec": function() {        
        var posTime = stb.GetPosTime();             // get current position in seconds       
        var duration = stb.GetMediaLen();                
        //if(player.obj.duration < posTime) {return;} // sequrity
        if(duration < posTime) {return;} // sequrity
        var t_pers = stb.GetPosPercent() + 1;
        var t_time = posTime>=0 ? posTime: 0;
        var t_time_obj = {"hours":0,"minuts":0,"seconds":0};
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        var marginLeft = Math.floor((t_pers + 1) / 100 * player.scrolbar_width); // count scrolling position
        byID('conditiion').style.marginLeft = marginLeft + 'px';  // set scrolling position
        byID('time_act').innerHTML = ((t_time_obj.hours < 10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts < 10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);
        //log('- - - -\nTime:' + ((t_time_obj.hours < 10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts < 10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds) + 'status: ' + t_pers + '%, : '+ t_time + 's, ' + marginLeft + 'px / ' + player.scrolbar_width + 'px\n - - - -');
    },
    /**
    * `rewind_every_100_ms` is method for check ending timeout and start move from seted position
    *
    * @function
    * @name rewind_every_100_ms
    * @param {function():*}
    * @example
    * player.rewind_every_100_ms();
    * @return void
    **/
   "rewind_every_100_ms": function() {
        //log('player.timer_cur: ' + player.timer_cur);
        if(player.timer_cur < player.timer_iv_step) {
            stb.SetPosTime(player.where);
            player._continue();
            clearInterval(player.timer);
            player.timer = null;
            //log('player.iv_start();');
            player.iv_start();
            player.where = 0;
        }
        player.timer_cur = player.timer_cur - player.timer_iv_step;
    },
    
    /**
    * `rewind_after rewind_afterPause
    *
    * @function
    * @name rewind
    * @param {function():*}
    * @example
    * player.rewind_afterPause((int)to);
    * @return void
    **/
    "rewind_afterPause": function(to) {
        byID('main').style.display = 'block';
        player._pause();
        clearInterval(player.timer);
        player.timer_cur = player.timer_iv_len;
        var len = stb.GetMediaLen();

        if(player.where == 0)
        {
            player.where = stb.GetPosTime();
        }

        if (to > 0) {
            if (player.where > 1) {
                player.where -= 1;
                
            }
            else
            {
                player.where = Math.floor (player.where/10);
            }
        }
      

        var t_time = player.where;
        var t_time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        byID('time_act').innerHTML = ((t_time_obj.hours<10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts<10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);

        byID('conditiion').style.marginLeft = Math.floor(player.where / len * player.scrolbar_width) + 'px';
        player.timer = setInterval(player.rewind_every_100_ms, player.timer_iv_step);
    },
    
    /**
    * `rewind_every_100_ms` is method for check ending timeout and start move from seted position
    *
    * @function
    * @name rewind
    * @param {function():*}
    * @example
    * player.rewind((int)to);
    * @return void
    **/
    "rewind": function(to) {
        byID('main').style.display = 'block';
        player._pause();
        clearInterval(player.timer);
        player.timer_cur = player.timer_iv_len;
        var len = stb.GetMediaLen();

        if(player.where == 0)
        {
            player.where = stb.GetPosTime();
        }

        if (to > 0) {
            var rest = len - player.where;
            if (rest > player.current_step)
            {
                player.where += player.current_step;
            }
            else
            {
                player.where = Math.floor ((((len - player.where)*9)/10) + player.where);
            }
        }
        else
        {
            if (player.where > player.current_step) {
                player.where -= player.current_step;
            }
            else
            {
                player.where = Math.floor (player.where/10);
            }
        }

        var t_time = player.where;
        var t_time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        byID('time_act').innerHTML = ((t_time_obj.hours<10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts<10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);

        byID('conditiion').style.marginLeft = Math.floor(player.where / len * player.scrolbar_width) + 'px';
        player.timer = setInterval(player.rewind_every_100_ms, player.timer_iv_step);
    },
    /**
    * `pressNums` is method for set nums from console
    *
    * @function
    * @name pressNums
    * @param {function(num):*}
    * @example
    * player.pressNums((int)num);
    * @return void
    **/
    "pressNums": function(num) {
        if(byID('main').style.display == 'block') {
            player._pause();
            if(num > -1) {
                if(player.n_where.length < 6) {
                    player.n_where += num.toString();
                }
            } else {
                player.n_where = player.n_where.substr(0, player.n_where.length - 1);
            }
            var sec = 0,
                min = 0,
                hou = 0;

            //log("\n---\nn_where.length:" + player.n_where.length + "\nn_where: " + player.n_where + "\n---");
            switch (player.n_where.length) {
                case 0:
                    byID('time_act').innerHTML = '';
                    player.n_where_sec = 0;
                break;
                case 1:
                    byID('time_act').innerHTML = '00:00:0' + player.n_where;
                    player.n_where_sec = parseInt(player.n_where);
                break;
                case 2:
                    byID('time_act').innerHTML = '00:00:' + player.n_where;
                    sec = parseInt(player.n_where);
                    player.n_where_sec = sec > 60 ? 58 : sec;
                break;
                case 3:
                    byID('time_act').innerHTML = '00:0' + player.n_where.substr(0, 1) + ':' + player.n_where.substr(1, 2);
                    sec = parseInt(player.n_where.substr(1, 2));
                    min = parseInt(player.n_where.substr(0, 1));
                    player.n_where_sec = sec > 60 ? 58 : sec + min * 60;
                break;
                case 4:
                    byID('time_act').innerHTML = '00:' + player.n_where.substr(0, 2) + ':' + player.n_where.substr(2, 2);
                    sec = parseInt(player.n_where.substr(0, 2));
                    min = parseInt(player.n_where.substr(2, 2));
                    player.n_where_sec = sec > 60 ? 58 : sec + (min > 60 ? 58 : min) * 60;
                break;
                case 5:
                    byID('time_act').innerHTML = '0' + player.n_where.substr(0, 1) + ':' + player.n_where.substr(1, 2) + ':' + player.n_where.substr(3, 2);
                    sec = parseInt(player.n_where.substr(3, 2));
                    min = parseInt(player.n_where.substr(1, 2));
                    hou = player.n_where.substr(0, 1);
                    player.n_where_sec = sec > 60 ? 58 : sec + (min > 60 ? 58 : min) * 60 + hou * 60 * 60;
                break;
                case 6:
                    byID('time_act').innerHTML = player.n_where.substr(0, 2) + ':' + player.n_where.substr(2, 2) + ':' + player.n_where.substr(4, 2);
                    sec = parseInt(player.n_where.substr(4, 2));
                    min = parseInt(player.n_where.substr(2, 2));
                    hou = player.n_where.substr(0, 2);
                    player.n_where_sec = sec > 60 ? 58 : sec + (min > 60 ? 58 : min) * 60 + hou * 60 * 60;
                break;
            }
            //log("- - - ");
            //log("- player.n_where: " + player.n_where);
            //log("- player.n_where_sec: " + player.n_where_sec);
            //log("- - - ");
        }
    },
    /**
    * `pressOK` is method for set position after consol numbers enter or show/hide player
    *
    * @function
    * @name pressOK
    * @param {function():*}
    * @example
    * player.pressOK();
    * @return void
    **/
    "pressOK": function() {
        //log('- - - player.pressOK();');
        if(player.n_where.length > 0) {
            stb.SetPosTime(player.n_where_sec);
            player._continue();
            player.n_where = "";
        } else {
            if(byID('main').style.display!='none') {
                byID('main').style.display = 'none';
            } else {
                byID('main').style.display = 'block';
            }
        }
    },
    "volume_timer": null, // timer for change volume level
    "volume_time": 3000,  // current volume timer (ms)
    "volume_time_std": 3000,    // standart time for start timer
    "volume_time_step": 100,    // step volume timer
    /**
    * `volume_every_100_ms` is method for check ending timeout and hide volume level
    *
    * @function
    * @name volume_every_100_ms
    * @param {function():*}
    * @example
    * player.volume_every_100_ms();
    * @return void
    **/
    "volume_every_100_ms": function() {
        if(player.volume_time < player.volume_time_step) {
            clearInterval(player.volume_timer);
            player.volume_timer = null;
            byID('volumeForm').style.display = 'none';
        }
        player.volume_time = player.volume_time - player.volume_time_step;
    },
    /**
    * `pressVolume` is method for change volume level
    *
    * @function
    * @name pressVolume
    * @param {function(direction):*}
    * @example
    * player.pressVolume((int)direction);
    * @return void
    **/
    "pressVolume": function(direction) {
        clearInterval(player.volume_timer);
        player.volume_timer = null;

        if(this.muteStatus==1) {
            player.pressMute();
        }
        
        byID('volumeForm').style.display = 'block';

        player.volume_time = player.volume_time_std;
        player.volume_timer = setInterval(player.volume_every_100_ms, player.volume_time_step);

        var step_px = (win.width == 1920) ? 15 : 10;
        var vol_bar = stb.GetVolume(); // 300, / 20 = 5% : 15px

        //log("level volume: " + vol_bar);

        if(direction > 0) {
            vol_bar = vol_bar + 5;
            if(vol_bar>100) {vol_bar = 100;}
        } else {
            vol_bar = vol_bar - 5;
            if(vol_bar < 5) {vol_bar = 0;}
        }

        //log("level volume: " + vol_bar);

        var vol_bar_len = vol_bar * ((win.width == 1920) ? 3 : 2);
        byID('volume_bar').style.width = vol_bar_len + 'px';
        stb.SetVolume(vol_bar);
        byID('volume_num').innerHTML = vol_bar + '%';
        
    },
    "muteStatus": 0,
    /**
    * `pressMute` is method for change mute condition
    *
    * @function
    * @name pressMute
    * @param {function():*}
    * @example
    * player.pressMute();
    * @return void
    **/
    "pressMute": function() {
        byID('volumeForm').style.display = 'none';
        //log(this.muteStatus);
        this.muteStatus = (this.muteStatus==0) ? 1 : 0;
        //log(this.muteStatus);
        stb.SetMute(this.muteStatus);
        byID('mute').style.display = (this.muteStatus==1) ? 'block' : 'none';
    },
    "dmc_var": null,
    /**
    * `displayModeChange` is method for change display mode change
    *
    * @function
    * @name displayModeChange
    * @param {function():*}
    * @example
    * player.displayModeChange();
    * @return void
    **/
    "displayModeChange": function() {
        if(player.dmc_var) {clearTimeout(player.dmc_var);}
        player.dmc_var = null;
        aspect_current = (aspect_current + 1) % 4;
        stb.SetAspect(aspects[aspect_current].mode);
        byID('screenAspect').style.backgroundImage = 'url(' + aspects[aspect_current].img + ')';
        byID('screenAspect').style.backgroundPosition = '0 -'+(aspect_current*41)+'px';
        byID('screenAspect').style.display = 'block';
        player.dmc_var = setTimeout(function() {byID('screenAspect').style.display = 'none';}, 3000);
    }
},
workWithItems = {
    /*
    * var
    * used in relocation active object
    * */
    "shift":0,
    /**
    * `drawBoxes` is method for draw current boxes with movements
    *
    * @function
    * @name drawBoxes
    * @param {function():*}
    * @example
    * workWithItems.drawBoxes();
    * @return void
    */
   "drawBoxes":function() {

     var show_category = getEnvironmentValue('show_category');
     var show_category_block = "block";

     
    if (show_category!='' && show_category==0) { 
        current.skins = "skin_0";
        show_category_block = "none"; 
     } else {
        current.skins = "skin_1";
        show_category_block = "block"; 
     }
    
     byID("frame").innerHTML = '';   // clean parent bopx
     byID("arrow_left").style.display = ((current.page - 1) < 1) ? "none" : "block"; // set visibility of arrow to up  

     for(var i=(current.page - 1) * items.atPage; i <  current.page * items.atPage; i++) {
          if(isset(current.globalObj[i])) {
               byID("frame").innerHTML += '' +
                    '<div class="box" id="' + i + '" title="' + current.globalObj[i].id + '">' + "\n" +
                    '   <div class="inner">' + "\n" +
                    '       <div class="img_cover">' + "\n" +
                    '           <img src="' + current.globalObj[i].img + '" class="prew" alt="" />' + "\n" +
                    '       </div>' + "\n" +
                    '       <div class="ribbon" style="display:' + show_category_block + '"><div class="category">'+ current.globalObj[i].category + '</div></div>' + "\n" +
                    '       <p class="title">' + current.globalObj[i].title + '</p>' + "\n" +
                    '   </div>' + "\n" +
                    '</div>';
            }
        }
        byID("arrow_right").style.display = (current.page == Math.ceil((request.totalItems+1)/items.atPage)) ? "none" : "block"; // set visibility of arrow to down
        this.focusMovie.apply(this);    // call to function change focus
    },
    /**
    * `focusMovie` is method for change position of active object on @this.shift elements
    *
    * @function
    * @name focusMovie
    * @param {function():*}
    * @example
    * workWithItems.focusMovie();
    * @return void
    */
    "focusMovie":function() {
        var c_o = current.obj;
        var n_o = parseInt(current.obj.toString()) + this.shift;
        var o1 = byID('' + c_o);
        var o2 = byID('' + n_o);
        var n_class = "active";
        if(isset(o2)) {
            if(isset(o1)) {
                o1.className = o1.className.replace( new RegExp('(^|\\s)' + n_class + '(\\s|$)') ,' ');
            }
            current.obj = n_o;
            o2.className += " " + n_class;
           // alert("page: " + current.page + ", obj: " + current.obj);
        } else {
            if(current.page == Math.ceil(request.totalItems/items.atPage)) {
                current.obj = current.globalObj.length - 1;
                o2 = byID('' + current.obj);
                o2.className += " " + n_class;
            }
        }
        loading.hide();
        if (ad==1)
        {
            ad=0;
            timer_videocatalog=setTimeout('document.getElementById("loader").style.display="none";',5000);
 //           console.log("ad off");
        }
//        console.log("loading.hide1");
    }
},
settings = {
    /**
    * `quality_set` is method for change current quality
    *
    * @function
    * @name quality_set
    * @param {function():*}
    * @example
    * settings.quality_set();
    * @return void
    */
    "quality_set": function() {
        switch(current.priority) {
            case "asc":
                current.priority = "desc";
                byID('quality').innerHTML = lang.quality.asc;
            break;
            case "desc":
                current.priority = "asc";
                byID('quality').innerHTML = lang.quality.desc;
            break;
        }
    },
    
    "set_volume": function(value) {
        current.volume = value;
        switch(value) {
            case "vol_20":
              setEnvironmentValue('vc_start_value','20');
              stb.SetVolume(20);
            break;
            case "vol_40":
              setEnvironmentValue('vc_start_value','40');
              stb.SetVolume(40);
            break;  
            case "vol_60":
              setEnvironmentValue('vc_start_value','60');
              stb.SetVolume(60);
            break;
            case "vol_80":
              setEnvironmentValue('vc_start_value','80');
              stb.SetVolume(80);
            break;  
            case "vol_95":
              setEnvironmentValue('vc_start_value','95');
              stb.SetVolume(95);
            break;
     }
    },
    "set_skin": function(value) {
        current.skins = value;
        switch(value) {
            case "skin_0":
              setEnvironmentValue('show_category','0');
              setTimeout('window.location.reload(true)',500);
            break;
            case "skin_1":
              setEnvironmentValue('show_category','1');
              setTimeout('window.location.reload(true)',500);
            break;  
     }
    },       
    
    /**
    * `quality_show` is method for show started quality
    *
    * @function
    * @name quality_show
    * @param {function(value):*}
    * @example
    * settings.quality_show('middle');
    * @return void
    */
    "quality_show": function(value) {
        switch(value) {
            case "desc":
            case "asc":
                current.priority = value;
                //byID('quality').innerHTML = lang.quality[value];

        current.layer = layers.BASE;
        loading.show();
        current.globalObj = new Array();
        request.startIndex = 1;  // set current startIndex
        request.totalItems = 0;  // set current totalItems
        current.obj = 0;
        current.page = 1;
        folder = 0;
        workWithItems.shift = current.obj;
        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj'); 
            break;
            default:
                current.priority = 'desc';
                //byID('quality').innerHTML = lang.quality['desc'];
            break;
        }
    },
    "sort_show": function(value) {
        switch(value) {
            case "name":
            case "year":
            case "agelimit":
            case "add":
            case "RatingKP":
            case "RatingIMDB":
                current.sortMode = value;
                byID('quality').innerHTML = lang.f_sort_mode[value];

        current.layer = layers.BASE;
        loading.show();
        current.globalObj = new Array();
        request.startIndex = 1;  // set current startIndex
        request.totalItems = 0;  // set current totalItems
        current.obj = 0;
        current.page = 1;
        folder = 0;
        workWithItems.shift = current.obj;
        //alert(current.feed);
        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj'); 
            break;
            default:
                current.sortMode = 'add';
                byID('quality').innerHTML = lang.f_sort_mode['add'];
            break;
        }
    },
    
   "exit_show": function() {
        current.layer = layers.EXIT;
        byID('exit').style.display = 'block'; 
    },
    "exit_hide": function() {
        current.layer = layers.BASE;
        byID('exit').style.display = 'none';
    },

    /**
    * `search_show` is method for show search
    *
    * @function
    * @name search_show
    * @param {function():*}
    * @example
    * settings.search_show();
    * @return void
    */
    "search_show": function() {
        current.layer = layers.SEARCH;
        byID('search_val').value = '';
        byID('yt_search_bg').style.display = 'block';
        byID('search_val').focus();
        setTimeout(function() {stb.ShowVirtualKeyboard();}, 150);
        //перезагрузка страницы
        //window.location.reload()
        
    },
    /**
    * `search_hide` is method for hide search
    *
    * @function
    * @name search_hide
    * @param {function():*}
    * @example
    * settings.search_hide();
    * @return void
    */
    "search_hide": function() {
        current.layer = layers.BASE;
        stb.HideVirtualKeyboard();
        byID('yt_search_bg').style.display = 'none';
    },
    /**
    * `search_start` is method for start search
    *
    * @function
    * @name search_start
    * @param {function((string)query):*}
    * @example
    * settings.search_start('some');
    * @return void
    */
    "search_start": function(query) {
        current.layer = layers.BASE;
        byID('cur_cat').innerHTML = lang.cats.search_result;
        stb.HideVirtualKeyboard();
        byID('yt_search_bg').style.display = 'none';
        byID('search_block_inner').style.display = 'block';
        loading.show();
        current.globalObj = new Array();
        current.feed = video.searchUrl + '?search_id=' + query;
        byID('search_query_line').innerHTML = query;
        request.startIndex = 1;  // set current startIndex
        request.totalItems = 0;  // set current totalItems
        current.obj = 0;
        current.page = 1;
        workWithItems.shift = current.obj;
            
        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj');    
            
    },
    /**
    * `cats_show` is method for show cats menu
    *
    * @function
    * @name cats_show
    * @param {function():*}
    * @example
    * settings.cats_show();
    * @return void
    */
    "cats_show": function() {
        current.layer = layers.CATEGORY;
        categoryes.draw();
        byID('category').style.display = "block";
    },
    
    
    /**
    * `cats_start` is method for start query categorias
    *  Выполняет запрос видео для выбранной категории
    *
    * @function
    * @name cats_start
    * @param {function():*}
    * @example
    * settings.cats_start();
    * @return void
    */
    "cats_start": function() {
        current.layer = layers.BASE;
        current.feed = current.cat.url;
        byID('category').style.display = "none";
        byID('search_block_inner').style.display = 'none';                
        byID('cur_cat').innerHTML = byID('cat_5').innerHTML;
        loading.show();
        current.globalObj = new Array();
        request.startIndex = 1;  // set current startIndex
        request.totalItems = 0;  // set current totalItems
        current.obj = 0;
        current.page = 1;
        folder = 0;
        workWithItems.shift = current.obj;
        //getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString(),
          //  'rebuildCurrentGlobalObj');
          
        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj');  
          
    },
    "caption":function(server_id,catalog){
        current.layer = layers.CAPTION;
        byID('caption').style.display = 'block'; 
         
  try {
   //alert(request.itemsPerRequest);

     $.getJSON("http://video.rikt.ru/video3/stb2/stb_mag200_caption_full_4.php?id="+id_f.toString()+"&server="+server_id.toString()+"&callback=?", function(data){
     
     genre=data.genre;
     title=data.title;
     year=data.year;
     produser=data.produser;
     actors=data.actors;
     description=data.description;
     duration=data.duration;
     kp_rating = data.kp_rating;
     imdb_rating = data.imdb_rating;
     agelimit = data.agelimit;
     interpretation = data.interpretation;
     serial_status = data.serial_status_text;
     erotic = data.erotic;
     
     if (erotic=="1") {
           agelimit= '<br><label style="color:#28b6fc">Возраст:</label> 18+ <label style="color:#C4141B">(Наличие сцен эротического характера)</label>'
     } else {
           agelimit = agelimit?'<br><label style="color:#28b6fc">Возраст: </label>'+agelimit:'';
     } 
     
             var time = duration;
               var time_obj = {
                "hours":0,
                "minuts":0,
                "seconds":0
               };
               
             if (catalog==1) {
               kp_rating_txt = kp_rating?'<br><label style="color:#28b6fc">Рейтинг:</label> Кинопоиск '+kp_rating:'';
               imdb_rating_txt = imdb_rating?' / IMDB '+imdb_rating:'';
               
               produser = produser?'<br><label style="color:#28b6fc">Режиссер: </label>'+produser:'';
               actors = actors?'<br><br><label style="color:#28b6fc">В ролях: </label>'+actors:'';
               genre = genre?'<br><label style="color:#28b6fc">Жанр: </label>'+genre:'';
               year = year?'<br><label style="color:#28b6fc">Год: </label>'+year:'';
               title = title?'<label style="color:#28b6fc">Название: </label>'+title:'';
               interpretation = interpretation!=''?'<br><label style="color:#28b6fc">Перевод: </label>'+interpretation:'';
               serial_status = serial_status!=''?'<br><label style="color:#28b6fc">Статус сериала: </label>'+serial_status:'';
               document.getElementById('modalcaption_text').innerHTML = title+year+genre+kp_rating_txt+imdb_rating_txt+interpretation+agelimit+serial_status+actors+produser;
               document.getElementById('modalcaption_descr').innerHTML = description; 
               var scrollHeight = document.getElementById('modalcaption_descr').scrollHeight;
               var clientHeight = document.getElementById('modalcaption_descr').clientHeight;
               byID('modalcaption_arrow').style.display = (scrollHeight>clientHeight) ? 'block' : 'none';              
              } else {
               time_obj.hours = Math.floor(time / 3600);   // current move duration in hours
               time_obj.minuts = Math.floor((time - time_obj.hours * 3600) / 60);   // current move duration in minuts
               time_obj.seconds = time - time_obj.hours * 3600 - time_obj.minuts * 60;   // current move duration in seconds
               dur = ((time_obj.hours<10)? "0" + time_obj.hours : time_obj.hours) + ':' + ((time_obj.minuts<10)? "0" + time_obj.minuts : time_obj.minuts) + ':' + ((time_obj.seconds<10)? "0" + time_obj.seconds : time_obj.seconds);
               dur_txt = (time>0)?'<br><label style="color:#28b6fc">Продолжительность: </label>'+dur:'';
               kp_rating_txt = kp_rating?'<br><label style="color:#28b6fc">Рейтинг:</label> Кинопоиск '+kp_rating:'';
               imdb_rating_txt = imdb_rating?' / IMDB '+imdb_rating:'';
               //agelimit = agelimit?'<br><label style="color:#28b6fc">Возрастное ограничение: </label>'+agelimit:'';
               produser = produser?'<br><label style="color:#28b6fc">Режиссер: </label>'+produser:'';
               actors = actors?'<br><br><label style="color:#28b6fc">В ролях: </label>'+actors:'';
               genre = genre?'<br><label style="color:#28b6fc">Жанр: </label>'+genre:'';
               year = year?'<br><label style="color:#28b6fc">Год: </label>'+year:'';
               title = title?'<label style="color:#28b6fc">Название: </label>'+title:'';
               interpretation = interpretation!=''?'<br><label style="color:#28b6fc">Перевод: </label>'+interpretation:'';
               serial_status = serial_status!=''?'<br><label style="color:#28b6fc">Статус сериала: </label>'+serial_status:'';
               document.getElementById('modalcaption_text').innerHTML = title+year+genre+dur_txt+kp_rating_txt+imdb_rating_txt+interpretation+agelimit+serial_status+actors+produser;
               document.getElementById('modalcaption_descr').innerHTML = description; 
               var scrollHeight = document.getElementById('modalcaption_descr').scrollHeight;
               var clientHeight = document.getElementById('modalcaption_descr').clientHeight;
               byID('modalcaption_arrow').style.display = (scrollHeight>clientHeight) ? 'block' : 'none'; 
           }    
       });
     }
      catch(err) {
      alert ('Error data caption request...');
     }
    },
    "caption_hide": function() {
        current.layer = layers.BASE;
        byID('caption').style.display = "none";
    },    
    /**
    * `cats_hide` is method for hide cats menu
    *
    * @function
    * @name cats_hide
    * @param {function():*}
    * @example
    * settings.cats_hide();
    * @return void
    */
    "cats_hide": function() {
        current.layer = layers.BASE;
        byID('category').style.display = "none";
    },
    /**
    * `changePlayMode` is method for change play mode
    *
    * @function
    * @name changePlayMode
    * @param {function():*}
    * @example
    * settings.changePlayMode();
    * @return void
    */
    "changePlayMode": function() {
        for(var i = 0; i < playModes.length; i++) {
            if(playModes[i].name == current.playMode) {
                if(playModes.length - 1 == i) {
                    current.playMode = playModes[0].name;
                    break;
                } else {
                    current.playMode = playModes[i + 1].name;
                    break;
                }
            }
        }
        //log('current.playMode.new: ' + current.playMode);
        
        byID('playModeInPlayer').className = current.playMode;
        byID('mode').className = current.playMode;
    },
    "options":{
        "menuItems":["PlayModes","Quality","SortModes","Subtitles","Volume","Skins"],
        "subMenuItems":[["single","repeat","list","random"],["desc","asc"],["name","year","add","agelimit","RatingKP","RatingIMDB"],["sub_on","sub_off"],["vol_95","vol_80","vol_60","vol_40","vol_20"],["skin_0","skin_1"]],
        "currentLevel":-1,
        "menuItem":0,
        "subMenuItem":0,
        "show":function(){
            current.layer = layers.SETTINGS;
            byID('footer_menu_settings').style.display = "block";

            settings.options.menuItem = 0;
            settings.options.subMenuItem = 0;
            settings.options.currentLevel = 0;



            for(var i = 0;i<settings.options.menuItems.length;i++) {
                byID("menu" + settings.options.menuItems[i]).className = "";
            }
            byID("menu" + settings.options.menuItems[settings.options.menuItem]).className = "active";
        },
        "hide":function() {
            current.layer = layers.BASE;
            byID('footer_menu_settings').style.display = "none";
        },
        "handler":function(key) {
            switch(key){
                case keys.UP:
                case keys.DOWN:
                    var shift = 0;
                    if(key==keys.UP){
                        shift = -1;
                    } else {
                        shift = 1;
                    }
                    switch(settings.options.currentLevel) {
                    
                        case 0:
                            for(var i = 0;i<settings.options.menuItems.length;i++) {
                                byID("menu" + settings.options.menuItems[i]).className = "";
                            }
                            settings.options.menuItem = Math.abs(settings.options.menuItem + shift) % settings.options.menuItems.length;
                            byID("menu" + settings.options.menuItems[settings.options.menuItem]).className = "active";
                        break;
                        case 1:
                            for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                byID("menuPM" + settings.options.subMenuItems[settings.options.menuItem][i]).className = "";
                            }
                            settings.options.subMenuItem = (settings.options.subMenuItem + shift) % settings.options.subMenuItems[settings.options.menuItem].length;
                            settings.options.subMenuItem = settings.options.subMenuItem >=0 ? settings.options.subMenuItem : settings.options.subMenuItems[settings.options.menuItem].length - 1;
                            byID("menuPM" + settings.options.subMenuItems[settings.options.menuItem][settings.options.subMenuItem]).className = "active";
                        break;
                    }
                break;
                case keys.LEFT:
                    if(settings.options.currentLevel==0) {
                        settings.options.handler(keys.OK);
                    }
                break;
                case keys.RIGHT:
                    if(settings.options.currentLevel==1) {
                        settings.options.handler(keys.BACK);
                    }
                break;
                case keys.OK:
                    switch(settings.options.currentLevel){
                        case 0:
                            byID("subMenu" + settings.options.menuItems[settings.options.menuItem]).style.display = "block";
                            for(var i = 0; i<settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                byID("menuPM" + settings.options.subMenuItems[settings.options.menuItem][i]).className = "";
                            }
                            switch(settings.options.menuItem) {
                                case 0:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.playMode) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    byID("menuPM" + current.playMode).className = "active";
                                break;
                                case 1:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.priority) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    byID("menuPM" + current.priority).className = "active";
                                break;
                                case 2:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.sortMode) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    byID("menuPM" + current.sortMode).className = "active";
                                break;
                                
                                case 3:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.subtitles) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    byID("menuPM" + current.subtitles).className = "active";
                                break;
                                                                
                                case 4:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.volume) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    byID("menuPM" + current.volume).className = "active";
                                break;
                                
                                case 5:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.skins) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    byID("menuPM" + current.skins).className = "active";
                                break;
                            }
                            settings.options.currentLevel = 1;
                        break;
                        case 1:
                            var id = document.getElementById("menu" + settings.options.menuItems[settings.options.menuItem]).getElementsByClassName('active')[0].id;

                            switch(settings.options.menuItem) {
                                case 0:
                                    current.playMode = id.substr(6);
                                    byID('mode').className = current.playMode;
                                    settings.options.hide();                                    
                                break;
                                case 1:
                                    settings.quality_show(id.substr(6));
                                    settings.options.hide();
                                break;
                                case 2:
                                    settings.sort_show(id.substr(6));
                                    settings.options.hide();
                                break;
                                case 3:
                                    current.subtitles = id.substr(6);
                                    settings.options.hide();
                                break;
                                case 4:
                                    settings.set_volume(id.substr(6));
                                    settings.options.hide();
                                break;
                                case 5:
                                    settings.set_skin(id.substr(6));
                                    settings.options.hide();
                                break;
                            }
                            var sm = document.getElementById("footer_menu_settings").getElementsByClassName('submenu');
                            for(var i=0;i<sm.length;i++) {
                                sm[i].style.display = "none";
                            }
                        break;
                    }
                break;
                case keys.BLUE:
                case keys.BACK:
                case keys.EXIT:
                    switch(settings.options.currentLevel){
                        case -1:
                        case 0:
                            settings.options.hide();
                        break;
                        case 1:
                            byID("subMenu" + settings.options.menuItems[settings.options.menuItem]).style.display = "none";
                            settings.options.currentLevel = 0;
                        break;
                    }
                break;
            }
        }
    }
},
loading = {
    "show":function(block){
        if(!block) {
            current.buttonsStatus = false;
        }
        byID('loading').style.display = "block";
        current.loading = true;
    },
    "hide":function() {
        current.buttonsStatus = true;
        byID('loading').style.display = "none";
        current.loading = false;
    }
},
error = {
    "error_show": function() {
        current.layer = layers.ERROR;
        byID('video_url_error').style.display = 'block'; 
    },
    "error_hide": function() {
        current.layer = layers.BASE;
        byID('video_url_error').style.display = 'none';
    },
},
categoryes = {
    "shift":0,
    "draw":function() {
    //alert (this.shift);
        for(var i = 0; i < current.catItems; i++) {
            var index = this.getOne(i + this.shift + current.cat.trying);
            //alert (index);
            byID('cat_' + i).innerHTML = lang.cats[categorias[index].name];
            if(i==5) {
                //alert (categorias[index].url);
                current.cat.url = categorias[index].url;
            }
        }
        //alert(this.shift);
        current.cat.trying += this.shift;
    },
    "getOne":function(cur) {
        return cur % categorias.length >= 0 ? cur % categorias.length : categorias.length + cur % categorias.length;
    }
};
