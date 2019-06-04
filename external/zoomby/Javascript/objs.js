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
        var url='';    
        var server=player.obj.server;
        
        //alert ('player.obj.id='+player.obj.id);
        //------------------------------------------------------------
       // url = "http://stbmedia3-ch1.mezhdu.net/films/"+server+".avi";
		url = "http://212.77.128.205/stalker_portal/video/faq.mp4";
        //------------------------------------------------------------
        getHtmlByUrl(url,server);
        player.current_step = 30;
        document.getElementById('playModeInPlayer').className = current.playMode;
        player.timer_check_start_player_obj = setTimeout("player.timer_check_start_player_action();", player.timer_check_start_player_interval);
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
    /**
    * `play` is method for start playing move
    *
    * @function
    * @name play
    * @param {function(arr):*} //arr - array arr[(int)format] = (string)'url';
    * @example
    * player.play(arr);
    * @return void
    */
    "play": function(arr) {
        document.getElementById('shell').style.display = 'none';   // hide
        player.current_step = 30;               // interval step
        player_cond = 1;                        // set player condition in playing mode
        current.layer = layers.PLAYER;          // set manage layer PLAYER
        
        var url =  "";
        //log('- - - - player.play(obj) - - - - current quality:' + current.priority + ' - - - -');
        var  isset_qualites = '- - - - ';
        for(var item in arr) {
            isset_qualites += item + ',';
        }
        isset_qualites += ' - - - -';
        //log(isset_qualites);
        for(var i=0; i<prioritets[current.priority].length; i++) {  // check all current priorites
            if(undefined != arr[prioritets[current.priority][i]]) {
                //log('- - - playing result | format:' + prioritets[current.priority][i]);
                //url = arr[prioritets[current.priority][i]]; // set url
				url = "http://212.77.128.205/stalker_portal/video/faq.mp4";
                break;
            }
        }
        document.getElementById('conditiion').style.marginLeft = '0px';    // set current position of scroll to begin
        document.getElementById('filename').innerHTML = player.obj.title.length > 35 ? player.obj.title.substr(0, 34) + "…" : player.obj.title;    // cut move name
        var time = player.obj.duration;

         time=Math.round(time); 

        var time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        time_obj.hours = Math.floor(time / 3600);   // current move duration in hours
        time_obj.minuts = Math.floor((time - time_obj.hours * 3600) / 60);   // current move duration in minuts
        time_obj.seconds = time - time_obj.hours * 3600 - time_obj.minuts * 60;   // current move duration in seconds
        //log(time_obj.hours + ':' + time_obj.minuts + ':' + time_obj.seconds);
        document.getElementById('time_act').innerHTML = '00:00:00';    // zerring atual time
        document.getElementById('time_total').innerHTML = '/ ' + ((time_obj.hours<10)? "0" + time_obj.hours : time_obj.hours) + ':' + ((time_obj.minuts<10)? "0" + time_obj.minuts : time_obj.minuts) + ':' + ((time_obj.seconds<10)? "0" + time_obj.seconds : time_obj.seconds);
        document.getElementById('interval_input').innerHTML = lang.intervals[player.current_step]; // set lang interval
        //stb.Play('ffrt3 '+ url);            // device start
        stb.Play(url);            // device start
        document.getElementById('mute').style.display = (this.muteStatus==1) ? 'block' : 'none';   // show/hide mute picture
    },
    
        "play_clip": function(url) {
        document.getElementById('shell').style.display = 'none';   // hide
        player.current_step = 30;               // interval step
        player_cond = 1;                        // set player condition in playing mode
        current.layer = layers.PLAYER;          // set manage layer PLAYER
        //loading.hide();
        //var url =  "";
        //log('- - - ');
        //log('- player.play(' + arr+ ')');
        //alert('- player.play(' + arr+ ')');
        //alert (arr);
        //log('- - - ');
        //log('- - - Playing quality:' + current.priority);
        //log('- - - ');
        //for(var item in arr) {
          //  log('- - - ' + item);

        //}
        //log('- - - ');
        
       // alert (current.priority);
        
       // for(var i=0; i<prioritets[current.priority].length; i++) {  // check all current priorites
            //if(undefined != arr[prioritets[current.priority][i]]) {
            //    log('- - - playing result | format:' + prioritets[current.priority][i]);
                //urll = arr[prioritets[current.priority][i]]; // set url
                //alert (urll);
                //break;
            //}
        //}
        
        document.getElementById('conditiion').style.marginLeft = '0px';    // set current position of scroll to begin
        document.getElementById('filename').innerHTML = player.obj.title.length > 35 ? player.obj.title.substr(0, 34) + "..." : player.obj.title;    // cut move name
        var time = player.obj.duration;
        time=Math.round(time); //РѕРєСЂСѓРіР»СЏРµРј "duration":102.49
        var time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };
        //alert (urll);
        time_obj.hours = Math.floor(time / 3600);   // current move duration in hours
        time_obj.minuts = Math.floor((time - time_obj.hours * 3600) / 60);   // current move duration in minuts
        time_obj.seconds = time - time_obj.hours * 3600 - time_obj.minuts * 60;   // current move duration in seconds
        //log(time_obj.hours + ':' + time_obj.minuts + ':' + time_obj.seconds);
        document.getElementById('time_act').innerHTML = '00:00:00';    // zerring atual time
        document.getElementById('time_total').innerHTML = '/ ' + ((time_obj.hours<10)? "0" + time_obj.hours : time_obj.hours) + ':' + ((time_obj.minuts<10)? "0" + time_obj.minuts : time_obj.minuts) + ':' + ((time_obj.seconds<10)? "0" + time_obj.seconds : time_obj.seconds);
        document.getElementById('interval_input').innerHTML = lang.intervals[player.current_step]; // set lang interval
        //log('\n - - - - - - - - step: ' + player.current_step + '\n - - - - - - - - lang.step: ' + lang.intervals[player.current_step])
        //setTimeout(player.iv_start, 150);   // set start timer
        //alert (url);
        //stb.Play('ffrt3 '+ url_clip);            // device start
        //stb.Play(url_clip);            // device start
        //stb.Play('ffrt3 '+ 'http://clip.mezhdu.net/mb_flv.php?file=45855');            // device start
        //stb.Play('http://video2.mzk.rikt.ru:8080/mb_stb.php?file=6823');            // device start
        //alert (urll);
        stb.Play(url); 
        
        document.getElementById('mute').style.display = (this.muteStatus==1) ? 'block' : 'none';   // show/hide mute picture
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
                        document.getElementById('main').style.display = 'none';
                        document.getElementById('mute').style.display = 'none';
                        document.getElementById('shell').style.display = 'block';
                        current.layer = layers.BASE;
                        //log('player.iv_stop();');
                        player.iv_stop();
                    break;
                }
            break;
            case 2: // obtained information about audio and video tracks of media content
            break;
            case 4: // beginning to display videos and / or play sound
                loading.hide();
                player_cond = 1;
                player.iv_start();
                clearTimeout(player.timer_check_start_player_obj);
                player.timer_check_start_player_obj = null;
                //log('\nclearTimeout(player.timer_check_start_player_obj);\n');
            break;
            case 5: // error opening content: there is no such content on a server or a fault has occurred while connecting to the server
                player_cond = 0;
                //log('player.iv_stop();');
                document.getElementById('shell').style.display = 'block';
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
        document.getElementById('main').style.display = 'none';
        document.getElementById('shell').style.display = 'block';
        current.layer = layers.BASE;        
        document.getElementById('playingStatus').style.display = 'none';
        document.getElementById('mute').style.display = 'none';
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
        document.getElementById('playingStatus').style.display = 'none';
        document.getElementById('mute').style.display = 'none';
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
            document.getElementById('main').style.display = 'block';
            player._pause();
        } else {
            document.getElementById('main').style.display = 'none';       
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
        document.getElementById('playingStatus').style.display = 'block';
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

        document.getElementById('playingStatus').style.display = 'none';
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
        document.getElementById('conditiion').style.marginLeft = '0px';
        document.getElementById('time_act').innerHTML = '00:00:00';
        document.getElementById('main').style.display = 'block';
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
        document.getElementById('main').style.display = 'block';
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
                        document.getElementById('interval_input').innerHTML = lang.intervals[player.current_step];
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
                        document.getElementById('interval_input').innerHTML = lang.intervals[player.current_step];
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
        if(player.obj.duration < posTime) {return;} // sequrity
        var t_pers = stb.GetPosPercent() + 1;
        var t_time = posTime>=0 ? posTime: 0;
        var t_time_obj = {"hours":0,"minuts":0,"seconds":0};
        t_time_obj.hours = Math.floor(t_time / 3600);
        t_time_obj.minuts = Math.floor((t_time - t_time_obj.hours * 3600) / 60);
        t_time_obj.seconds = t_time - t_time_obj.hours * 3600 - t_time_obj.minuts * 60;
        var marginLeft = Math.floor((t_pers + 1) / 100 * player.scrolbar_width); // count scrolling position
        document.getElementById('conditiion').style.marginLeft = marginLeft + 'px';  // set scrolling position
        document.getElementById('time_act').innerHTML = ((t_time_obj.hours < 10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts < 10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);
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
        document.getElementById('main').style.display = 'block';
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
        document.getElementById('time_act').innerHTML = ((t_time_obj.hours<10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts<10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);

        document.getElementById('conditiion').style.marginLeft = Math.floor(player.where / len * player.scrolbar_width) + 'px';
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
        document.getElementById('main').style.display = 'block';
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
        document.getElementById('time_act').innerHTML = ((t_time_obj.hours<10)? "0" + t_time_obj.hours : t_time_obj.hours) + ':' + ((t_time_obj.minuts<10)? "0" + t_time_obj.minuts : t_time_obj.minuts) + ':' + ((t_time_obj.seconds<10)? "0" + t_time_obj.seconds : t_time_obj.seconds);

        document.getElementById('conditiion').style.marginLeft = Math.floor(player.where / len * player.scrolbar_width) + 'px';
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
        if(document.getElementById('main').style.display == 'block') {
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
                    document.getElementById('time_act').innerHTML = '';
                    player.n_where_sec = 0;
                break;
                case 1:
                    document.getElementById('time_act').innerHTML = '00:00:0' + player.n_where;
                    player.n_where_sec = parseInt(player.n_where);
                break;
                case 2:
                    document.getElementById('time_act').innerHTML = '00:00:' + player.n_where;
                    sec = parseInt(player.n_where);
                    player.n_where_sec = sec > 60 ? 58 : sec;
                break;
                case 3:
                    document.getElementById('time_act').innerHTML = '00:0' + player.n_where.substr(0, 1) + ':' + player.n_where.substr(1, 2);
                    sec = parseInt(player.n_where.substr(1, 2));
                    min = parseInt(player.n_where.substr(0, 1));
                    player.n_where_sec = sec > 60 ? 58 : sec + min * 60;
                break;
                case 4:
                    document.getElementById('time_act').innerHTML = '00:' + player.n_where.substr(0, 2) + ':' + player.n_where.substr(2, 2);
                    sec = parseInt(player.n_where.substr(0, 2));
                    min = parseInt(player.n_where.substr(2, 2));
                    player.n_where_sec = sec > 60 ? 58 : sec + (min > 60 ? 58 : min) * 60;
                break;
                case 5:
                    document.getElementById('time_act').innerHTML = '0' + player.n_where.substr(0, 1) + ':' + player.n_where.substr(1, 2) + ':' + player.n_where.substr(3, 2);
                    sec = parseInt(player.n_where.substr(3, 2));
                    min = parseInt(player.n_where.substr(1, 2));
                    hou = player.n_where.substr(0, 1);
                    player.n_where_sec = sec > 60 ? 58 : sec + (min > 60 ? 58 : min) * 60 + hou * 60 * 60;
                break;
                case 6:
                    document.getElementById('time_act').innerHTML = player.n_where.substr(0, 2) + ':' + player.n_where.substr(2, 2) + ':' + player.n_where.substr(4, 2);
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
            if(document.getElementById('main').style.display!='none') {
                document.getElementById('main').style.display = 'none';
            } else {
                document.getElementById('main').style.display = 'block';
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
            document.getElementById('volumeForm').style.display = 'none';
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
        
        document.getElementById('volumeForm').style.display = 'block';

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
        document.getElementById('volume_bar').style.width = vol_bar_len + 'px';
        stb.SetVolume(vol_bar);
        document.getElementById('volume_num').innerHTML = vol_bar + '%';
        
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
        document.getElementById('volumeForm').style.display = 'none';
        //log(this.muteStatus);
        this.muteStatus = (this.muteStatus==0) ? 1 : 0;
        //log(this.muteStatus);
        stb.SetMute(this.muteStatus);
        document.getElementById('mute').style.display = (this.muteStatus==1) ? 'block' : 'none';
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
        document.getElementById('screenAspect').style.backgroundImage = 'url(' + aspects[aspect_current].img + ')';
        document.getElementById('screenAspect').style.display = 'block';
        player.dmc_var = setTimeout(function() {document.getElementById('screenAspect').style.display = 'none';}, 3000);
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
    
            var time_obj = {
            "hours":0,
            "minuts":0,
            "seconds":0
        };

    
        document.getElementById("frame").innerHTML = '';   // clean parent bopx
        document.getElementById("arrow_left").style.display = ((current.page - 1) < 1) ? "none" : "block"; // set visibility of arrow to up
        for(var i=(current.page - 1) * items.atPage; i <  current.page * items.atPage; i++) {
            if(isset(current.globalObj[i])) {
                var time =  new Date().Difference(current.globalObj[i].uploaded);       // get text value of uploaded time ago
                var viewsCount = separate(current.globalObj[i].viewCount);              // get text value of count views

        var duration = separate(current.globalObj[i].duration);              // get text value of count views
        duration=Math.round(duration);
        //alert (duration);
        time_obj.hours = Math.floor(duration / 3600);   // current move duration in hours
        time_obj.minuts = Math.floor((duration - time_obj.hours * 3600) / 60);   // current move duration in minuts
        time_obj.seconds = duration - time_obj.hours * 3600 - time_obj.minuts * 60;   // current move duration in seconds  
        
        if (current.globalObj[i].id_folder==0){      
        film_time='&nbsp;&nbsp;' + '<img src="http://212.77.128.204/portal/videocatalog/img/icon_time.png" alt="" />' + ((time_obj.hours<10)? "0" + time_obj.hours : time_obj.hours) + ':'+ ((time_obj.minuts<10)? "0" + time_obj.minuts : time_obj.minuts) + ':' + ((time_obj.seconds<10)? "0" + time_obj.seconds : time_obj.seconds);  
             }
             else {
             film_time='';
             }
                  
                document.getElementById("frame").innerHTML += '' +
                    '<div class="box" id="' + i + '" title="' + current.globalObj[i].id + '">' + "\n" +
                    '   <div class="inner">' + "\n" +
                    '       <div class="img_cover">' + "\n" +
                    '           <img src="' + current.globalObj[i].img + '" class="prew" alt="" />' + "\n" +
                    '       </div>' + "\n" +
                    '       <p class="title">' + current.globalObj[i].title + '</p>' +  "\n" +//&hellip;((current.globalObj[i].title.length<=27)? current.globalObj[i].title : current.globalObj[i].title.substr(0, 27) + '…') + '</p>' +  "\n" +//&hellip;
                    '       <p>&nbsp;' + time + '</p>' + "\n" + // + '<br />' + list.data.items[i].uploaded.split("T")[0]
                    '       <p>&nbsp;' + '<img src="http://212.77.128.204/portal/videocatalog/img/views.png" alt="" />' + viewsCount +film_time+'</p>' + "\n" +
                    '       <p>&nbsp;' + current.globalObj[i].category + '</p>' + "\n" +
                    '   </div>' + "\n" +
                    '</div>';
            }
        }
        document.getElementById("arrow_right").style.display = (current.page == Math.ceil(request.totalItems/items.atPage)) ? "none" : "block"; // set visibility of arrow to down
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
        var o1 = document.getElementById('' + c_o);
        var o2 = document.getElementById('' + n_o);
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
                o2 = document.getElementById('' + current.obj);
                o2.className += " " + n_class;
            }
        }
        loading.hide();
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
                document.getElementById('quality').innerHTML = lang.quality.asc;
            break;
            case "desc":
                current.priority = "asc";
                document.getElementById('quality').innerHTML = lang.quality.desc;
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
                document.getElementById('quality').innerHTML = lang.quality[value];
            break;
            default:
                current.priority = 'desc';
                document.getElementById('quality').innerHTML = lang.quality['desc'];
            break;
        }
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
        document.getElementById('search_val').value = '';
        document.getElementById('yt_search_bg').style.display = 'block';
        document.getElementById('search_val').focus();
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
        document.getElementById('yt_search_bg').style.display = 'none';
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
        document.getElementById('cur_cat').innerHTML = lang.cats.search_result;
        stb.HideVirtualKeyboard();
        document.getElementById('yt_search_bg').style.display = 'none';
        document.getElementById('search_block_inner').style.display = 'block';
        loading.show();
        current.globalObj = new Array();
//        current.feed = google.searchFeedUrl + '&q=' + encodeURIComponent(query);
        current.feed = video.searchUrl + '?search_id=' + query;
        document.getElementById('search_query_line').innerHTML = query;
        request.startIndex = 1;  // set current startIndex
        request.totalItems = 0;  // set current totalItems
        current.obj = 0;
        current.page = 1;
        workWithItems.shift = current.obj;

//        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString(),
  //          'rebuildCurrentGlobalObj');
            
        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&sort-order=' + current.priority,
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
        document.getElementById('category').style.display = "block";
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
        document.getElementById('category').style.display = "none";
        document.getElementById('search_block_inner').style.display = 'none';
        document.getElementById('cur_cat').innerHTML = document.getElementById('cat_1').innerHTML;
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
          
        getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj');  
          
    },
    "caption":function(){
        current.layer = layers.CAPTION;
        document.getElementById('caption').style.display = 'block';
  try {
     $.getJSON("http://video.rikt.ru/video3/stb/stb_mag200_caption.php?id="+id_f.toString()+"&callback=?", function(data){
     year=data.year;
     produser=data.produser;
     actors=data.actors;
     description=data.description;
     document.getElementdocument.getElementById('modalcaption_text').innerHTML = description+'<br><br>Год: '+year+'<br>Режисер: '+produser+'<br>Актеры: '+actors ;
    });
     }
      catch(err) {
      alert ('Error data caption request...');
    }

    },
    "caption_hide": function() {
        current.layer = layers.BASE;
        document.getElementById('caption').style.display = "none";
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
        document.getElementById('category').style.display = "none";
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
        
        document.getElementById('playModeInPlayer').className = current.playMode;
        document.getElementById('mode').className = current.playMode;
    },
    "options":{
        "menuItems":["PlayModes","Quality"],
        "subMenuItems":[["single","repeat","list","random"],["desc","asc"]],
        "currentLevel":-1,
        "menuItem":0,
        "subMenuItem":0,
        "show":function(){
            current.layer = layers.SETTINGS;
            document.getElementById('footer_menu_settings').style.display = "block";

            settings.options.menuItem = 0;
            settings.options.subMenuItem = 0;
            settings.options.currentLevel = 0;



            for(var i = 0;i<settings.options.menuItems.length;i++) {
                document.getElementById("menu" + settings.options.menuItems[i]).className = "";
            }
            document.getElementById("menu" + settings.options.menuItems[settings.options.menuItem]).className = "active";
        },
        "hide":function() {
            current.layer = layers.BASE;
            document.getElementById('footer_menu_settings').style.display = "none";
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
                                document.getElementById("menu" + settings.options.menuItems[i]).className = "";
                            }
                            settings.options.menuItem = Math.abs(settings.options.menuItem + shift) % settings.options.menuItems.length;
                            document.getElementById("menu" + settings.options.menuItems[settings.options.menuItem]).className = "active";
                        break;
                        case 1:
                            for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                document.getElementById("menuPM" + settings.options.subMenuItems[settings.options.menuItem][i]).className = "";
                            }
                            settings.options.subMenuItem = (settings.options.subMenuItem + shift) % settings.options.subMenuItems[settings.options.menuItem].length;
                            settings.options.subMenuItem = settings.options.subMenuItem >=0 ? settings.options.subMenuItem : settings.options.subMenuItems[settings.options.menuItem].length - 1;
                            document.getElementById("menuPM" + settings.options.subMenuItems[settings.options.menuItem][settings.options.subMenuItem]).className = "active";
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
                            document.getElementById("subMenu" + settings.options.menuItems[settings.options.menuItem]).style.display = "block";
                            for(var i = 0; i<settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                document.getElementById("menuPM" + settings.options.subMenuItems[settings.options.menuItem][i]).className = "";
                            }
                            switch(settings.options.menuItem) {
                                case 0:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.playMode) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    document.getElementById("menuPM" + current.playMode).className = "active";
                                break;
                                case 1:
                                    for(var i = 0; i < settings.options.subMenuItems[settings.options.menuItem].length; i++) {
                                        if(settings.options.subMenuItems[settings.options.menuItem][i] == current.priority) {
                                           settings.options.subMenuItem = i;
                                        }
                                    }
                                    document.getElementById("menuPM" + current.priority).className = "active";
                                break;
                            }
                            settings.options.currentLevel = 1;
                        break;
                        case 1:
                            var id = document.getElementdocument.getElementById("menu" + settings.options.menuItems[settings.options.menuItem]).getElementsByClassName('active')[0].id;
                            switch(settings.options.menuItem) {
                                case 0:
                                    current.playMode = id.substr(6);
                                    document.getElementById('mode').className = current.playMode;
                                    settings.options.hide();
                                    
                                break;
                                case 1:
                                    settings.quality_show(id.substr(6));
                                    settings.options.hide();
                                break;
                            }
                            var sm = document.getElementdocument.getElementById("footer_menu_settings").getElementsByClassName('submenu');
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
                            document.getElementById("subMenu" + settings.options.menuItems[settings.options.menuItem]).style.display = "none";
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
        document.getElementById('loading').style.display = "block";
        current.loading = true;
    },
    "hide":function() {
        current.buttonsStatus = true;
        document.getElementById('loading').style.display = "none";
        current.loading = false;
    }
},
categoryes = {
    "shift":0,
    "draw":function() {
        for(var i = 0; i < current.catItems; i++) {
            var index = this.getOne(i + this.shift + current.cat.trying);
            document.getElementById('cat_' + i).innerHTML = lang.cats[categorias[index].name];
            if(i==1) {
                current.cat.url = categorias[index].url;
            }
        }
        current.cat.trying += this.shift;
    },
    "getOne":function(cur) {
        return cur % categorias.length >= 0 ? cur % categorias.length : categorias.length + cur % categorias.length;
    }
};