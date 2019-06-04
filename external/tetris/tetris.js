// Возвращает значение переменной среды окружения по ее имени (читает из BootLoader'a)
function getEnvironmentValue(val){
  var mac;
  mac = stb.RDir('getenv ' + val);
  return mac;
}

function init_stb(){
  initEvents();
  stb.InitPlayer();
  win = {"width":screen.width, "height":screen.height};


var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", 'screen_' + win.height + '.css');    
    document.getElementsByTagName("head")[0].appendChild(fileref);


  window.moveTo(0, 0);
    try {
        stb = gSTB;
        window.resizeTo(win.width, win.height);
    }
    catch(e){}
}

/*
function hide(){
 document.getElementById('msgboxx').style.display = 'none';
}

function continue_game(){
 stb.HideVirtualKeyboard();
 rating(); 		        
 document.getElementById('tetris').style.display = 'none';
 document.getElementById('msgboxx').style.display = 'none';
 document.getElementById('yt_search_bg').style.display = 'none';
 document.getElementById('wrap').style.display = 'block';
}
*/

/*
function rating(){
var b = '<table style="border: 1px solid rgb(204, 204, 204); width: 100%; color: #CCCCCC; font-size: 11px; line-height: 18px;text-align: center; font-family: Verdana, Arial, Helvetica, sans-serif;">';
b +='<tbody><tr style="font-weight: bold;"><td>Место</td><td>Время</td><td>Имя</td><td>Очки</td><td>Линии</td><td>Уровень</td></tr>';

try {
     $.getJSON("http://212.77.128.204/portal/games/tetris/stb_tetris_user.php?callback=?", function(result){

     for (var i=0;i<result.rating.length;i++) {     
if (result.rating[i].data.name!=user) {b +='<tr><td>'+result.rating[i].data.id+'</td><td>'+result.rating[i].data.time+'</td><td><strong>'+result.rating[i].data.name+'</strong></td><td>'+result.rating[i].data.score+'</td><td>'+result.rating[i].data.lines+'</td><td>'+result.rating[i].data.level+'</td></tr>';}
else {
b +='<tr style="background-color: rgb(238, 238, 238); font-weight: bold; color: rgb(34, 69, 111);"><td style="border: 3px solid rgb(204, 204, 204);">'+'Вы'+'</td><td style="border: 3px solid rgb(204, 204, 204);">'+result.rating[i].data.time+'</td><td style="border: 3px solid rgb(204, 204, 204);"><strong>'+result.rating[i].data.name+'</strong></td><td style="border: 3px solid rgb(204, 204, 204);">'+result.rating[i].data.score+'</td><td style="border: 3px solid rgb(204, 204, 204);">'+result.rating[i].data.lines+'</td><td style="border: 3px solid rgb(204, 204, 204);">'+result.rating[i].data.level+'</td></tr>';
}
    }
b +='</tbody></table>';
document.getElementById('articles').innerHTML = b;  
    });
     }
      catch(err) {
      alert ('Error rating get...');
    }
}
*/

var 
 ethaddr, user, user_save, highscore, youscore;
 server_path='http://212.77.128.205/stalker_portal/external';
 
var
	tetris = {
                brickSize:       32,
		brickBorderSize: 0,
		mainWinWidth:    15,
		mainWinHeight:   22,
		levelUpScore:    70,

		level:   1,
		score:   0,
		singles: 0,
		doubles: 0,
		triples: 0,
		quads:   0,
		lines_final:0,

		bricks:       [],
		pile:         [],
		pileAnimLine: [],
		pileAnimDrop: [],
		gameStart:    true,
		gameOver:     false,
		//save_score:   false,
		paused:       false,
		keyPressed:   false,
		shapeCount:   0,

		keyDrop:   13, // OK, Enter
		keyLeft:   37, // Left key
		keyRotate: 38, // Up key
		keyRight:  39, // Right key
		keyDown:   40, // Down key
		keyPause:  192, // Pause key
		keyStop:   82, // Esc key
		keyExit:   27, // Exit key
		keyMenu:   122,
                keyBack:   8,  //Back key
		keyContinue:   112,//Red button continue game

		init: function()
		{

                 init_stb();

             if (win.width==1280){
                 tetris.brickSize       = 32;
                 tetris.mainWinWidth    = 15,
                 tetris.mainWinHeight   = 22
                }
                
               if (win.width==720){
                 tetris.brickSize       = 25;
                 tetris.mainWinWidth    = 12,
                 tetris.mainWinHeight   = 22
                }
 
 		 
                 ethaddr=getEnvironmentValue('ethaddr'); //Получаем МАК 
  
                 //$.getJSON("http://212.77.128.204/portal/games/tetris/stb_tetris.php?ethaddr="+ethaddr+"&callback=?", function(data){
                   //   user=data.name;
                  //});

                  $.ajax({
    	 		url: 'http://kliktv.rikt.ru/stalker_portal/tetris/stb_tetris_highscore.php',
		    	async: false,
                        type: 'GET',
                        data: {ethaddr: ethaddr},
                        dataType: 'json',
		    	success: function(data) {
                         highscore = data.highscore;
                         youscore = data.youscore;
		         document.getElementById('tetris-hightscore').innerHTML = highscore;
		    	}
		    });
                  
                  
                        stb.Stop(); 
                        stb.Play(server_path+'/tetris/sound/bg.mp3');
			tetris.mainWin = document.getElementById('tetris-main');
			tetris.nextWin = document.getElementById('tetris-next-inner');
			tetris.message = document.getElementById('tetris-message');
                        tetris.message_gameover = document.getElementById('tetris-message-gameover');
			tetris.message.innerHTML = '<p>Новая игра <span>Нажмите &darr; для начала игры</span></p><br><p>Рекорд игры<br><score>'+highscore+'</score></p><p>ваш рекорд<br><score>'+youscore+'</score></p>';                 
			document.onkeydown = tetris.keyListener;
		},

               /*
               search_show: function() {
                 document.getElementById('search_val').value = user; 
                 document.getElementById('yt_search_bg').style.display = 'block';
                 document.getElementById('search_val').focus();
                 setTimeout(function() {stb.ShowVirtualKeyboard();}, 150);
                },

                search_hide: function() {
                 stb.HideVirtualKeyboard();
                 document.getElementById('yt_search_bg').style.display = 'none';
                 tetris.save_score=false;
                },
                */

		newGame: function()
		{
			for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
			{
				if ( !tetris.pile[hor] ) tetris.pile[hor] = [];

				tetris.pileAnimLine[hor] = [];
				tetris.pileAnimDrop[hor] = [];

				for ( var ver = 0; ver < tetris.mainWinHeight; ver ++ )
				{
					if ( tetris.pile[hor][ver] )
					{
						tetris.mainWin.removeChild(tetris.pile[hor][ver]);
					}

					tetris.pile[hor][ver] = false;

					tetris.pileAnimLine[hor][ver] = false;
					tetris.pileAnimDrop[hor][ver] = false;
				}
			}

			tetris.level   = 1;
			tetris.score   = 0; 
			tetris.singles = 0; 
			tetris.doubles = 0;
			tetris.triples = 0;
			tetris.quads   = 0;

			tetris.updateScore();

			tetris.newShape();
		},

		newShape: function()
		{
			tetris.shapeCount ++;
			tetris.shapeNum     = typeof(tetris.shapeNumNext) != 'undefined' ? tetris.shapeNumNext : Math.floor(Math.random() * 6);
			tetris.shapeNumNext = Math.floor(Math.random() * 7);
			tetris.shapeRot     = typeof(tetris.shapeRotNext) != 'undefined' ? tetris.shapeRotNext : Math.floor(Math.random() * 4);
			tetris.shapeRotNext = Math.floor(Math.random() * 4);
			tetris.shapePosHor  = Math.floor(Math.random() * ( tetris.mainWinWidth - 6 )) + 3;
			tetris.shapePosVer  = -1;

			tetris.drawShape();

			tetris.drawNext();

			tetris.shapeLanded = false;

			clearInterval(tetris.intval);

			tetris.intval = setInterval('tetris.timeStep()', 2000 / tetris.level);
		},

		newBrick: function(color, colorLight, colorDark)
		{
			var brick = document.createElement('div');

//                        var colorLight='#FC6B3F';

                 //       var colorDark='#AD0303';



			brick.setAttribute('style', 'background-image: url(img/'+win.width+'/'+color+'.png)'+' ;  height: ' + ( tetris.brickSize - tetris.brickBorderSize * 2 ) + 'px; left: 0; top: 0; width: ' + ( tetris.brickSize - tetris.brickBorderSize * 2 ) + '; position: absolute;');




			return brick;
		},

		drawShape: function()
		{
			var
				brickCount = 0,
				move       = true
				;

			tetris.brickPos = [];

			for ( var ver = 0; ver < 4; ver ++ )
			{
				for ( var hor = 0; hor < 4; hor ++ )
				{
					if ( tetris.brickLib[tetris.shapeNum][ver * 4 + hor + tetris.shapeRot * 16] )
					{
						tetris.brickPos[brickCount] = {
							hor: hor + tetris.shapePosHor,
							ver: ver + tetris.shapePosVer
							}

						if ( tetris.collision(tetris.brickPos[brickCount].hor, tetris.brickPos[brickCount].ver) ) move = false;

						brickCount ++;
					}
				}
			}

			if ( move && !tetris.paused && !tetris.gameOver )
			{
				var prevBricks = tetris.bricks ? tetris.bricks.slice(0) : false;

				for ( var i = 0; i < brickCount; i ++ )
				{
					tetris.bricks[i] = tetris.newBrick(
						tetris.brickLib[tetris.shapeNum][64], tetris.brickLib[tetris.shapeNum][65], tetris.brickLib[tetris.shapeNum][66]
						);

					tetris.bricks[i].num = tetris.shapeCount;

					tetris.bricks[i].style.left = tetris.brickPos[i].hor * tetris.brickSize + 'px';
					tetris.bricks[i].style.top  = tetris.brickPos[i].ver * tetris.brickSize + 'px';
				}

				for ( var i = 0; i < brickCount; i ++ ) // Using seperate for-loops to reduce flickering
				{
					// Draw brick in new position
					tetris.mainWin.appendChild(tetris.bricks[i]);
				}

				for ( var i = 0; i < brickCount; i ++ )
				{
					// Remove brick in prev position
					if ( prevBricks[i] && prevBricks[i].num == tetris.shapeCount )
					{
						tetris.mainWin.removeChild(prevBricks[i]);
					}
				}

				tetris.prevShapeRot    = tetris.shapeRot;
				tetris.prevShapePosHor = tetris.shapePosHor;
				tetris.prevShapePosVer = tetris.shapePosVer;
				tetris.prevBrickPos    = tetris.brickPos.slice(0);
			}
			else
			{
				// Collision detected, keep shape in previous position
				tetris.shapeRot    = tetris.prevShapeRot;
				tetris.shapePosHor = tetris.prevShapePosHor;
				tetris.shapePosVer = tetris.prevShapePosVer;
				tetris.brickPos    = tetris.prevBrickPos.slice(0);
			}
		},

		drawNext: function()
		{
			tetris.nextWin.innerHTML = '';
	
			for ( var ver = 0; ver < 4; ver ++ )
			{
				for ( var hor = 0; hor < 4; hor ++ )
				{
					if ( tetris.brickLib[tetris.shapeNumNext][ver * 4 + hor + tetris.shapeRotNext * 16] )
					{
						brick = tetris.newBrick(
							tetris.brickLib[tetris.shapeNumNext][64], tetris.brickLib[tetris.shapeNumNext][65], tetris.brickLib[tetris.shapeNumNext][66]
							);

						brick.style.left = hor * tetris.brickSize + 'px';
						brick.style.top  = ver * tetris.brickSize + 'px';

						tetris.nextWin.appendChild(brick);
					}
				}
			}
		},

		collision: function(hor, ver)
		{			
			// Left wall
			if ( hor < 0 )
			{
				if ( tetris.keyPressed == tetris.keyRotate )
				{
					// No room to rotate, try moving right
					if ( !tetris.collision(hor + 1, ver) )
					{
						tetris.shapePosHor ++;

						tetris.drawShape();

						return true;
					}
					else
					{					
						tetris.shapeRot --;

						return true;
					}
				}

				return true;
			}

			// Right wall
			if ( hor >= tetris.mainWinWidth )
			{
				if ( tetris.keyPressed == tetris.keyRotate )
				{
					// No room to rotate, try moving left
					if ( !tetris.collision(hor - 1, ver) )
					{
						tetris.shapePosHor --;

						tetris.drawShape();

						return true;
					}
					else
					{					
						tetris.shapeRot --;

						return true;
					}
				}

				return true;
			}

			// Floor (при падение на пол)
			if ( ver >= tetris.mainWinHeight )
			{
				if ( tetris.keyPressed != tetris.keyRotate ) tetris.shapePosVer --;

				tetris.shapeLanded = true;
                                //stb.Stop();				
                                //stb.Play(server_path+'/tetris/sound/button-4.mp3');
				return true;
			}

			// Pile (при падение на обьект)
			if ( tetris.pile[hor][ver] )
			{				
				if ( tetris.shapePosVer > tetris.prevShapePosVer ) tetris.shapeLanded = true;
                                //stb.Stop();
                                //stb.Play(server_path+'/tetris/sound/button-4.mp3');
				return true;
			}

			return false;
		},

		timeStep: function()
		{
			tetris.shapePosVer ++;

			tetris.drawShape();

			if ( tetris.shapeLanded )
			{
				for ( var i in tetris.bricks )
				{
					tetris.pile[tetris.brickPos[i].hor][tetris.brickPos[i].ver] = tetris.bricks[i];
				}

				// Check for completed lines
				var lines = 0;

				for ( var ver = 0; ver < tetris.mainWinHeight; ver ++ )
				{
					var line = true;

					for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
					{
						if ( !tetris.pile[hor][ver] ) line = false;
					}

					if ( line )
					{
						lines ++;

						// Remove line
						for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
						{
							if ( tetris.pile[hor][ver] )
							{
								tetris.pileAnimLine[hor][ver] = tetris.pile[hor][ver];

								setTimeout('tetris.mainWin.removeChild(tetris.pileAnimLine[' + hor + '][' + ver + ']);', hor * 50);

								tetris.pile[hor][ver] = false;
							}
						}

						// Drop lines
						for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
						{
							for ( var ver2 = ver; ver2 > 0; ver2 -- ) // From bottom to top
							{
								if ( tetris.pile[hor][ver2] )
								{
									tetris.pileAnimDrop[hor][ver2] = tetris.pile[hor][ver2];

									setTimeout('tetris.pileAnimDrop[' + hor + '][' + ver2 + '].style.top = ( ' + ver2 + ' + 1 ) * tetris.brickSize + \'px\';', tetris.mainWinWidth * 50);

									tetris.pile[hor][ver2 + 1] = tetris.pile[hor][ver2];
									tetris.pile[hor][ver2]     = false;
								}
							}
						}
					}
				}

				tetris.updateScore(lines);

				// Check for game over
				for ( var hor = 0; hor < tetris.mainWinWidth; hor ++ )
				{
					if ( tetris.pile[hor][0] )
					{

      $.getJSON("http://kliktv.rikt.ru/stalker_portal/tetris/save_score.php?ethaddr="+ethaddr+"&score="+tetris.score+"&level="+tetris.level+"&lines="+tetris.lines_final+"&callback=?", function(data){
		   tetris.doGameOver();
      });						
						return;
					}
				}

				tetris.newShape();
			}
		},

		updateScore: function(lines)
		{
			var oldScore = tetris.score;

			if ( lines )
			{
				tetris.score += lines * lines + lines * 10;
			}

			for ( i = oldScore; i < tetris.score; i ++ )
			{
				setTimeout('document.getElementById(\'tetris-score\').innerHTML = \'' + i + '\';', ( i - oldScore ) * 20);
			}

			tetris.level = Math.floor(tetris.score / tetris.levelUpScore) + 1;

			document.getElementById('tetris-level').innerHTML = tetris.level;

			if ( lines == 1 )
			{
				//stb.Stop();
				//stb.Play(server_path+'/tetris/sound/button-2.mp3');
				tetris.flashMessage('<p class="tetris-double">Lines!</p>');
                                 tetris.singles ++;
				//document.getElementById('tetris-singles').innerHTML = tetris.singles;
				
			}

			if ( lines == 2 )
			{
				tetris.flashMessage('<p class="tetris-double">Double!</p>');
                                //stb.Stop();
                                //stb.Play(server_path+'/tetris/sound/button-4.mp3');
				tetris.doubles ++;

				//document.getElementById('tetris-doubles').innerHTML = tetris.doubles;

                               

			}

			if ( lines == 3 )
			{
				tetris.flashMessage('<p class="tetris-double">Triples!</p>');
                                //stb.Stop();
                                //stb.Play(server_path+'/tetris/sound/button-4.mp3');
				tetris.triples ++;

				//document.getElementById('tetris-triples').innerHTML = tetris.triples;
			}

			if ( lines == 4 )
			{
				tetris.flashMessage('<p class="tetris-double">Tetris!</p>');
                                //stb.Stop();
                                //stb.Play(server_path+'/tetris/sound/button-4.mp3');
				tetris.quads ++;

				//document.getElementById('tetris-quads').innerHTML = tetris.quads;
			}
		},

		flashMessage: function(message)
		{
			tetris.message.innerHTML = message;

			setTimeout('tetris.message.innerHTML = \'\';', 1000);
		},

		doGameOver: function()
		{
			clearInterval(tetris.intval);			

                  $.ajax({
    	 		url: 'http://kliktv.rikt.ru/stalker_portal/tetris/stb_tetris_highscore.php',
		    	async: false,
                        type: 'GET',
                        data: {ethaddr: ethaddr},
                        dataType: 'json',
		    	success: function(data) {
                         highscore = data.highscore;
                         youscore = data.youscore;
		         document.getElementById('tetris-hightscore').innerHTML = highscore;
		    	}
		    });

			//tetris.message_gameover = document.getElementById('tetris-message-gameover');			
			tetris.message_gameover.innerHTML = '<p>Конец игры <span>OK - новая игра<br>EXIT - выход</span</p><br><p>счет<br><score>'+tetris.score+'</score></p><p>Рекорд игры<br><score>'+highscore+'</score></p><p>ваш рекорд<br><score>'+youscore+'</score></p>';
                        
                        stb.Stop();
                        stb.Play(server_path+'/tetris/sound/bg.mp3');
                        tetris.lines_final=tetris.singles+tetris.doubles+tetris.triples+tetris.quads;
                        //tetris.search_show();
                        //tetris.save_score= true;
                        
			tetris.gameOver = true;
		},

		keyListener: function(e)
		{
			if( !e ) // IE
			{
				e = window.event;
			}

			tetris.keyPressed = e.keyCode;
                        
                        if ( e.keyCode == tetris.keyExit )
                 	 {
                 	   stb.Stop(); //Останавливаем проигрывание медиа
                 	   window.location = "../../c/index.html";
                   	 }
                         
                          if ( e.keyCode == tetris.keyContinue)
                 	 {
                           document.getElementById('tetris').style.display = 'block';
                 	   document.getElementById('wrap').style.display = 'none';
                 	   //tetris.save_score=false;
                   	 }
                         
                         
                         
                        /* 
                        //Нажимаем ОК или Enter и выполняем запрос н сохранение
                        if (e.keyCode == tetris.keyDrop && tetris.save_score)
                 	 {
                          user=document.getElementById('search_val').value;
                         
                        if (user==''){
                          document.getElementById('msgboxx').style.display = 'block';
                          document.getElementById('msgboxx').innerHTML = 'Имя пустое...';
                          setTimeout(hide,2000);
                          document.getElementById('search_val').focus();
                       }
                         
                      
                        if (user!=''){
                          $.post("http://212.77.128.204/portal/games/tetris/user_availability.php",{ user_name:user,ethaddr:ethaddr } ,function(data)
                            {
                             if(data=='no'){
			        document.getElementById('msgboxx').style.display = 'block';
 			        document.getElementById('msgboxx').innerHTML = 'Имя уже занято...';
                                setTimeout(hide,2000);
                                document.getElementById('search_val').focus();
                               }
		              else
		              {
			        try {  		        
$.getJSON("http://212.77.128.204/portal/games/tetris/stb_tetris.php?ethaddr="+ethaddr+"&name="+user+"&score="+tetris.score+"&level="+tetris.level+"&lines="+tetris.lines_final+"&callback=?", function(data){
                               var user_save=data.name;
                               //alert("save done..user="+user_save);
                               });
                               }
                               catch(err){
                                 alert ('Server error...');
                                }
                               document.getElementById('msgboxx').style.display = 'block';
                               document.getElementById('msgboxx').innerHTML = 'Сохранение...';
                               setTimeout(continue_game,3000);
		              }
                            });
                         }
                         */
                                    
                      //}
                         
                     /*
                     if ( e.keyCode == tetris.keyExit && tetris.save_score)
                 	{
                 	  stb.HideVirtualKeyboard();
                 	  document.getElementById('msgboxx').style.display = 'none';
                          document.getElementById('yt_search_bg').style.display = 'none';
                          tetris.save_score=false;
                          //continue_game();
                 	}
                      */

			if ( tetris.gameStart )
			{
				tetris.gameStart = false;

				tetris.message.innerHTML = '';
                                tetris.message_gameover.innerHTML = '';

				tetris.newGame();
                               
                                stb.Stop();
			}
			else
			{
				if ( tetris.gameOver && e.keyCode == tetris.keyDrop )
				{
					tetris.gameOver = false;                                        

					tetris.message.innerHTML = '';
                                         tetris.message_gameover.innerHTML = '';
                                         
					tetris.newGame();
                                          stb.Stop();
				}
				else if ( !tetris.gameOver )
				{
					if ( e.keyCode == tetris.keyStop || e.keyCode == tetris.keyPause || e.keyCode == tetris.keyMenu )
					{
						tetris.paused = !tetris.paused;

						if ( tetris.paused )
						{
 						  tetris.message.innerHTML = '<p>Пауза <span>Нажмите MENU для продолжения</span</p>';
                                                  stb.Stop();
                                                  stb.Play(server_path+'/tetris/sound/bg.mp3'); 
                                                         
						}
						else
						{
							tetris.message.innerHTML = '';
                                                        tetris.message_gameover.innerHTML = '';
                                                         stb.Stop();   
						}
					}

                                        if ( e.keyCode == tetris.keyBack ) 
                                          {
                                               window.location.reload(true);
                                          } 

					if ( !tetris.paused )
					{
						if ( e.keyCode == tetris.keyDrop )
						{

						clearInterval(tetris.intval);									
					        tetris.intval = setInterval('tetris.timeStep()', 60);
						  
						}

						if ( e.keyCode == tetris.keyLeft )
						{
							tetris.shapePosHor --;

							tetris.drawShape();
						}

						if ( e.keyCode == tetris.keyRotate )
						{
							tetris.shapeRot = ( tetris.shapeRot + 1 ) % 4;

							tetris.drawShape();
						}

						if( e.keyCode == tetris.keyRight )
						{
							tetris.shapePosHor ++;

							tetris.drawShape();
						}

						if ( e.keyCode == tetris.keyDown )
						{
							tetris.shapePosVer ++;
	
							tetris.drawShape();
						}
					}
				}
			}
	
			return true;
		},

		brickLib: {
			0: [
				1, 0, 0, 0,
				1, 0, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,

				1, 1, 1, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 1, 0,
				0, 0, 1, 0,
				0, 0, 1, 0,
				0, 0, 0, 0,

				0, 0, 0, 0,
				0, 0, 1, 0,
				1, 1, 1, 0,
				0, 0, 0, 0,

				'red', '#ffffff', '#F60'
				],
			1: [
				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,

				0, 0, 0, 0,
				1, 1, 1, 1,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,
				0, 1, 0, 0,

				0, 0, 0, 0,
				1, 1, 1, 1,
				0, 0, 0, 0,
				0, 0, 0, 0,

				'green', '#ffffff', '#B00'
				],

			2: [
				1, 1, 0, 0,
				1, 0, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 1, 0,
				0, 0, 1, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 0, 1, 0,
				0, 0, 1, 0,
				0, 1, 1, 0,
				0, 0, 0, 0,

				0, 0, 0, 0,
				1, 0, 0, 0,
				1, 1, 1, 0,
				0, 0, 0, 0,

				'blue', '#ffffff', '#0A0'
				],

			3: [
				1, 0, 0, 0,
				1, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 1, 0,
				0, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 0, 1, 0,
				0, 1, 1, 0,
				0, 0, 1, 0,
				0, 0, 0, 0,

				0, 0, 0, 0,
				0, 1, 0, 0,
				1, 1, 1, 0,
				0, 0, 0, 0,

				'pink', '#ffffff', '#00A'
				],

			4: [
				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				'yellow', '#ffffff', '#40A'
				],

			5: [
				0, 1, 1, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 0, 0, 0,
				1, 1, 0, 0,
				0, 1, 0, 0,
				0, 0, 0, 0,

				0, 1, 1, 0,
				1, 1, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				1, 0, 0, 0,
				1, 1, 0, 0,
				0, 1, 0, 0,
				0, 0, 0, 0,

				'beige', '#ffffff', '#AAA'
				],

			6: [
				1, 1, 0, 0,
				0, 1, 1, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 0, 0,
				1, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				1, 1, 0, 0,
				0, 1, 1, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,

				0, 1, 0, 0,
				1, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 0,

				'orange', '#ffffff', '#AA0'
				]
		},
	}

window.onload = tetris.init;
