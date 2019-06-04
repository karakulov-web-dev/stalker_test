(function(){
    
  function selections_app_constructor(){
        
   this.layer_name = 'selections_app';
   this.dom_obj = this.create_block('layer_bg2');
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;   
   this.url='http://s-test.rikt.ru/stalker_portal/server/load-dev.php';
   this.genres = {}; //массив ключей жанров
   this.genres_value = {};   //массив значений жанров
   this.total_programs = 0;  //к-во программ
   this.programs = {};    //массив программ
   this.selected_program = 0;  //выбранный div программы
   this.selected_genre = 0;  //выбранный div жанра
   this.selected_layer = 0; //выбранный слой
   this.layer_programs = 0;  // слой с программами
   this.layer_genres = 1; //слой с жанрами
   this.layer_description = 2; // слой с описанием
   this.programs_page = 0; //текущая страница программ
   this.programs_total_pages = 0; //к-во страниц программ
   this.genres_total_pages = 0; //к-во страниц жанров
   this.genres_page = 0; //текущая страница жанров
   this.total_genres = 0; //к-во жанров
   this.used_genre_id = 0; //Используемый для запроса жанр   
                 
   this.init = function(){
        _debug('selections_app.init');

       var container = create_block_element('selections_app', this.dom_obj);
       var pp = '<div id="selections"><div id="selections_exit"><div class="ears_left"><div class="ears_arrow_left top_arrow"></div><div id="selections_back"><br>Н<br>А<br>З<br>А<br>Д<br></div><div class="ears_arrow_left bottom_arrow"></div></div></div><div id="selections_genres"><div id="selections_gen0" class="selections_genres_class" active="" select=""></div><div id="selections_gen1" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen2" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen3" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen4" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen5" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen6" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen7" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen8" class="selections_genres_class" active="" select="no_select"></div><div id="selections_gen9" class="selections_genres_class" active="" select="no_select"></div></div><div id="selections_programs"><div id="selections_program0" class="blue_row_bg" active="active"></div><div id="selections_program1" class="blue_row_bg" active=""></div><div id="selections_program2" class="blue_row_bg" active=""></div><div id="selections_program3" class="blue_row_bg" active=""></div><div id="selections_program4" class="blue_row_bg" active=""></div><div id="selections_program5" class="blue_row_bg" active=""></div><div id="selections_program6" class="blue_row_bg" active=""></div><div id="selections_program7" class="blue_row_bg" active=""></div><div id="selections_program8" class="blue_row_bg" active=""></div><div id="selections_program9" class="blue_row_bg" active=""></div></div><div id="selections_description"></div><div id="selections_pagination"></div><div id="selections_buttons"><table><tr><td><div class="btn_red"></div><span class="disable_color_btn_text"></span></td><td><div class="separator"></div><div class="btn_green"></div><span class="disable_color_btn_text"></span></td><td><div class="separator"></div><div class="btn_yellow"></div><span class="disable_color_btn_text"></span></td><td><div class="separator"></div><div class="btn_blue"></div><span>ПОДРОБНЕЕ</span></td></tr></table></div><div id="selections_full_description"><div id="selections_full_description_content"></div><div id="selections_scroll" class="mb_scroll"><div id="selections_scroll_t" class="mb_scroll_t" style="height: 492px;"><div id="selections_runner" class="mb_scroll_c" style="top: 6px;"></div></div><div class="mb_scroll_b"></div></div></div></div>';
          container.innerHTML = pp;

     };
        
    this.show = function(){
         _debug('selections.show');
          this.superclass.show.call(this);

        };
        
    this.hide = function(){
        _debug('selections.hide');            
         this.superclass.hide.call(this);    
        };

    this.genres_loading = function(){
      _debug('selections.genres_loading');
      stb.load(
                        {
                            "type"       : "tvapicks",
                            "action"     : "get_genres"                            
                        },
                        function(result){
                            _debug('tvapicks get_genres result', result);
                            if (result){
                               //console.log("tvapicks get_genres result total_items="+result.total_items);           
                               selections_app.total_genres=result.total_items;
                               key=0;
                               for (var i in result.data) {                                                    
                                                    selections_app.genres[key]=i;
                                                    selections_app.genres_value[key]=result.data[i];
                                                    key++;
                                                    }
                                selections_app.programs_loading();                                
                                selections_app.genres_update();
                                selections_app.genres_total_pages=Math.floor(selections_app.total_genres/10);                                
                                if ((selections_app.total_genres/10-selections_app.genres_total_pages)>0) selections_app.genres_total_pages++;                                
                            }else{
                                console.log("tvapicks get_genres bad");
                            }
                        }
                    );
     
    };

this.genres_update = function(){
    //console.log("genres_page="+this.genres_page);
    for (var i = 0; i<10; i++){
        if (((selections_app.genres_page*10)+i)<selections_app.total_genres){          
         document.getElementById("selections_gen"+i).innerHTML=selections_app.genres[((this.genres_page*10)+i)];
         if (((selections_app.genres_page*10)+i)==selections_app.used_genre_id) {document.getElementById("selections_gen"+i).setAttribute("select", "");} else {document.getElementById("selections_gen"+i).setAttribute("select", "no_select");}
        }
        else
        {
          document.getElementById("selections_gen"+i).innerHTML="";
        }
    }
    selections_app.update_header_path([{"alias" : "tab", "item" : selections_app.genres[this.used_genre_id]}]);
};

this.programs_loading = function(){
    _debug('selections.programs_loading');
    //console.log("programs_page"+selections_app.programs_page);
    //console.log("genres_value"+selections_app.genres_value[selections_app.used_genre_id]);
      stb.load(
                        {
                            "type"       : "tvapicks",
                            "action"     : "get_movies",
                            "year"       : "",
                            "rating"     : "",
                            "shift"      : selections_app.programs_page,
                            "category"   : selections_app.genres_value[selections_app.used_genre_id],
                            "country"    : ""
                        },
                        function(result){
                            _debug('tvapicks get_programs result', result);
                            if (result){
                               //console.log("tvapicks get_programs result total_items="+result.total_items);
                               selections_app.total_programs = result.total_items;
                               selections_app.programs_total_pages = result.total_pages;
                               selections_app.programs = result.data;
                               selections_app.programs_update();
                               selections_app.description_update();
                            }else{
                                console.log("tvapicks get_programs bad");
                            }
                        }
                    );
};

this.programs_update = function(){
    for (var i = 0; i<10; i++){
          if (i<selections_app.programs.length){
         //document.getElementById("selections_program"+i).innerHTML='<div class="t_time_block" style="display: block;">'+selections_app.time(selections_app.programs[i].duration)+'</div><div class="name_block" style="display: block;" >'+selections_app.programs[i].name+'</div>';
         //document.getElementById("selections_program"+i).innerHTML='<div class="t_time_block" style="display: block;">'+selections_app.time(selections_app.programs[i].duration)+'</div><div class="flag" style="display: block;">'+'</div><div class="name_block" style="display: block;" >'+selections_app.programs[i].name+'</div>';
         if (selections_app.programs[i].ch_prop.hd==1)
          {
            quality='<div class="quality"></div>';
          }
          else
          {
            quality='';
          }
          if ((selections_app.programs[i].name.length>54)&&(resolution_prefix=='_720'))
          {
            name=selections_app.programs[i].name.substring(0,45)+"...";
          }
          else
          {
            if ((selections_app.programs[i].name.length>31)&&(resolution_prefix==''))
            {
                name=selections_app.programs[i].name.substring(0,31)+"...";
            }
            else
            {
                name=selections_app.programs[i].name;
            }
          }
         document.getElementById("selections_program"+i).innerHTML='<div class="t_time_block" style="display: block;">'+selections_app.time(selections_app.programs[i].duration)+'</div><div class="flag flag-'+selections_app.programs[i].flag+'" style="display: block;">'+'</div><div class="name_block" style="display: block;" >'+name+'</div>'+quality;
         }
         else
         {
          document.getElementById("selections_program"+i).innerHTML='';
         }
    }
    if (selections_app.programs_total_pages>0){
        var page = selections_app.programs_page+1;
    }
    else
    {
        var page = selections_app.programs_page;
    }
    document.getElementById("selections_pagination").innerHTML="стр. "+page+" из "+selections_app.programs_total_pages;
};

this.description_update = function(){
    if (selections_app.total_programs>0)
    {
      document.getElementById("selections_description").innerHTML=selections_app.programs[this.selected_program].descr;
    }
    else
    {
      document.getElementById("selections_description").innerHTML="";
    }
};

this.time = function(s){
    var h = s/3600 ^ 0 ;
    var m = (s-h*3600)/60 ^ 0 ;
    if (h.toString().length<2) h="0"+h.toString();
    if (m.toString().length<2) m="0"+m.toString();
    return h+":"+m;
};

this.url_loading = function(){
    _debug('selections.programs_loading');
    stb.load(
                        {
                            "type"       : "tv_archive",
                            "action"     : "create_link",
                            "cmd"       : "auto%20/media/"+selections_app.programs[selections_app.selected_program].id+".mpg",
                            "series"     : "",
                            "forced_storage" : "",
                            "disable_ad"  : 0,
                            "download"    : 0                           
                        },
                        function(result){
                            _debug('tv_archive get_url result', result);
                            if (result){
                               //console.log("tv_archive get_url result result total_items="+result.cmd);
                              selections_app.play_url(result.cmd);
                            }else{
                                console.log("tv_archive get_url result bad");
                            }
                        }
                    );
};

this.play_url = function(url){
  var item = {
                                              "name" : selections_app.programs[selections_app.selected_program].name,
                                              "cmd"  : url
                                            };
                                            stb.set_cur_place('demo');
                                            module.selections_app.hide();
                                            //stb.player.prev_layer = selections_app;
                                            stb.player.prev_layer = this;
                                            stb.player.play(item);
};

this.exit_from_full_description = function(){
                                      document.getElementById('selections_genres').style.display = 'block';
                                      document.getElementById('selections_programs').style.display = 'block';
                                      document.getElementById('selections_description').style.display = 'block';
                                      //document.getElementById("selections_pagination").style.display = 'block';
                                      document.getElementById("selections_full_description_content").scrollTop=0;
                                      document.getElementById('selections_full_description').style.display = 'none';
                                      document.getElementById("selections_runner").style.top='6px';
                                      //document.getElementById("selections_full_description_content").innerHTML="";
                                      document.getElementById('selections_pagination').style.display = 'block';                                    
                                      this.selected_layer=this.layer_programs;
};

this.programs_scrolling_down = function(){
      if (this.selected_program<9){
                                                          if (((selections_app.programs_page*10)+selections_app.selected_program)<selections_app.total_programs-1)
                                                          {
                                                            this.selected_program++;                                  
                                                            document.getElementById("selections_program"+this.selected_program).setAttribute("active", "active");
                                                            document.getElementById("selections_program"+(this.selected_program-1)).setAttribute("active", "");
                                                            selections_app.description_update();
                                                          }
                                                          }
                                                          else
                                                          {
                                                            //console.log("programs_page="+selections_app.programs_page);
                                                            //console.log("programs_total_pages="+selections_app.programs_total_pages);
                                                            if (selections_app.programs_page<selections_app.programs_total_pages-1){
                                                            selections_app.programs_page++;
                                                            selections_app.programs_loading();
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                                            selections_app.selected_program = 0;
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");
                                                            selections_app.description_update();
                                                          }
                                                          }
};

this.programs_scrolling_up = function(){
      if (this.selected_program>0){
                                                            this.selected_program--;                                  
                                                            document.getElementById("selections_program"+this.selected_program).setAttribute("active", "active");
                                                            document.getElementById("selections_program"+(this.selected_program+1)).setAttribute("active", "");
                                                            selections_app.description_update();
                                                          }
                                                          else
                                                          {
                                                            if (selections_app.programs_page>0)
                                                            {
                                                              selections_app.programs_page--;
                                                              document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                                              selections_app.programs_loading();
                                                              selections_app.selected_program=9;
                                                              document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");
                                                              selections_app.description_update();
                                                            }
                                                          }
};

this.update_full_description = function(){
        document.getElementById('selections_genres').style.display = 'none';
                                      document.getElementById('selections_programs').style.display = 'none';
                                      document.getElementById('selections_description').style.display = 'none';
                                      //document.getElementById("selections_pagination").style.display = 'none';
                                      document.getElementById('selections_full_description').style.display = 'block';
                                      document.getElementById("selections_full_description_content").scrollTop=0;
                                      document.getElementById("selections_runner").style.top='6px';
                                      if (selections_app.programs[this.selected_program].img!='') 
                                                            {
                                                              var img='<img src="'+selections_app.programs[this.selected_program].img+'">';
                                                            }
                                                            else
                                                            {
                                                               var img='';
                                                            }
                                      document.getElementById("selections_full_description_content").innerHTML=img+'<span class="time">Название: </span>'+selections_app.programs[this.selected_program].name+'<br><span class="time">Жанр: </span>'+selections_app.programs[this.selected_program].category+'<br><span class="time">Страна: </span>'+selections_app.programs[this.selected_program].country+'<br><span class="time">Год: </span>'+selections_app.programs[this.selected_program].year+'<br><span class="time">Канал: </span>'+selections_app.programs[this.selected_program].ch_prop.name+'<br><span class="time">Время записи: </span>'+selections_app.programs[this.selected_program].time+'<br><br><span class="time">О фильме: </span>'+selections_app.programs[this.selected_program].descr;
                                      this.selected_layer=this.layer_description;
};

this.key_press = function(button){
  switch (button) {
                  case "down":
                            if (this.selected_layer==this.layer_programs){
                            if (this.selected_program<9){
                                                          if (((selections_app.programs_page*10)+selections_app.selected_program)<selections_app.total_programs-1)
                                                          {
                                                            this.selected_program++;                                  
                                                            document.getElementById("selections_program"+this.selected_program).setAttribute("active", "active");
                                                            document.getElementById("selections_program"+(this.selected_program-1)).setAttribute("active", "");
                                                            selections_app.description_update();
                                                          }
                                                          }
                                                          else
                                                          {
                                                            //console.log("programs_page="+selections_app.programs_page);
                                                            //console.log("programs_total_pages="+selections_app.programs_total_pages);
                                                            if (selections_app.programs_page<selections_app.programs_total_pages-1){
                                                            selections_app.programs_page++;
                                                            selections_app.programs_loading();
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                                            selections_app.selected_program = 0;
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");
                                                            selections_app.description_update();
                                                          }
                                                          }
                                                                          }
                            if (selections_app.selected_layer==selections_app.layer_genres){
                               if ((selections_app.selected_genre<9)&&(((selections_app.genres_page*10)+selections_app.selected_genre)<selections_app.total_genres-1)){                                                                        
                                                                          selections_app.selected_genre++;
                                                                          document.getElementById("selections_gen"+(selections_app.selected_genre-1)).setAttribute("active", "");
                                                                          document.getElementById("selections_gen"+selections_app.selected_genre).setAttribute("active", "active");
                                                                        }
                                                                        else
                                                                        {
                                                                          //console.log("genres_page="+selections_app.genres_page);
                                                                          //console.log("genres_total_pages="+selections_app.genres_total_pages);
                                                                          if (selections_app.genres_page<(selections_app.genres_total_pages-1)){
                                                                              selections_app.genres_page++;
                                                                              document.getElementById("selections_gen"+selections_app.selected_genre).setAttribute("active", "");
                                                                              selections_app.selected_genre=0;
                                                                              document.getElementById("selections_gen"+selections_app.selected_genre).setAttribute("active", "active");
                                                                              selections_app.genres_update();
                                                                            }
                                                                          }
                                                                        }
                            if (selections_app.selected_layer==selections_app.layer_description){
                                  if (resolution_prefix=='_720')
                                    {
                                      document.getElementById("selections_full_description_content").scrollTop=document.getElementById("selections_full_description_content").scrollTop+20;                                         
                                      document.getElementById("selections_runner").style.top=6+Math.floor((document.getElementById("selections_full_description_content").scrollTop*460)/(document.getElementById("selections_full_description_content").scrollHeight-document.getElementById("selections_full_description_content").offsetHeight))+"px";
                                    }
                                  if (resolution_prefix=='')
                                    {
                                      document.getElementById("selections_full_description_content").scrollTop=document.getElementById("selections_full_description_content").scrollTop+20;                                         
                                      document.getElementById("selections_runner").style.top=Math.floor((document.getElementById("selections_full_description_content").scrollTop*394)/(document.getElementById("selections_full_description_content").scrollHeight-document.getElementById("selections_full_description_content").offsetHeight))+"px";
                                    }
                                  //console.log("top runner="+document.getElementById("selections_runner").style.top);
                            }
                  break;
                  case "up":
                            if (this.selected_layer==this.layer_programs){
                            if (this.selected_program>0){
                                                            this.selected_program--;                                  
                                                            document.getElementById("selections_program"+this.selected_program).setAttribute("active", "active");
                                                            document.getElementById("selections_program"+(this.selected_program+1)).setAttribute("active", "");
                                                            selections_app.description_update();
                                                          }
                                                          else
                                                          {
                                                            if (selections_app.programs_page>0)
                                                            {
                                                              selections_app.programs_page--;
                                                              document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                                              selections_app.programs_loading();
                                                              selections_app.selected_program=9;
                                                              document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");
                                                              selections_app.description_update();
                                                            }
                                                          }
                                                                          }
                            if (this.selected_layer==this.layer_genres){
                                        if (this.selected_genre>0){
                                                                      this.selected_genre--;
                                                                      document.getElementById("selections_gen"+(this.selected_genre+1)).setAttribute("active", "");
                                                                      document.getElementById("selections_gen"+this.selected_genre).setAttribute("active", "active");
                                                                      }
                                                                      else
                                                                      {
                                                                        if (this.genres_page>0){
                                                                            this.genres_page--;
                                                                            document.getElementById("selections_gen"+this.selected_genre).setAttribute("active", "");
                                                                            this.selected_genre=9;
                                                                            document.getElementById("selections_gen"+this.selected_genre).setAttribute("active", "active");
                                                                            selections_app.genres_update();
                                                                        }
                                                                      }
                                                                    }
                            if (selections_app.selected_layer==selections_app.layer_description){
                                  if (resolution_prefix=='_720')
                                    {
                                        document.getElementById("selections_full_description_content").scrollTop=document.getElementById("selections_full_description_content").scrollTop-20;                                         
                                        document.getElementById("selections_runner").style.top=6+Math.floor((document.getElementById("selections_full_description_content").scrollTop*460)/(document.getElementById("selections_full_description_content").scrollHeight-document.getElementById("selections_full_description_content").offsetHeight))+"px";
                                    }
                                  if (resolution_prefix=='')
                                    {
                                      document.getElementById("selections_full_description_content").scrollTop=document.getElementById("selections_full_description_content").scrollTop-20;                                         
                                      document.getElementById("selections_runner").style.top=Math.floor((document.getElementById("selections_full_description_content").scrollTop*394)/(document.getElementById("selections_full_description_content").scrollHeight-document.getElementById("selections_full_description_content").offsetHeight))+"px";
                                    }

                                  //console.log("top runner="+document.getElementById("selections_runner").style.top);
                            }
                  break;
                  case "left":
                             switch (this.selected_layer) {
                                case 1:                                                                            
                                                                            this.exit();
                                break;
                                case 0:
                                                                            document.getElementById("selections_program"+this.selected_program).setAttribute("active", "");
                                                                            document.getElementById("selections_gen"+this.selected_genre).setAttribute("active", "active");
                                                                            this.selected_layer=this.layer_genres;
                                break;
                                case 2:
                                                                            this.exit_from_full_description();                                                                           
                                break;
                              }
                  break;
                  case "right":                            
                            if (this.selected_layer==this.layer_genres){
                                                                            //console.log("selections_app.total_programs="+selections_app.total_programs);
                                                                            if (selections_app.total_programs>0)
                                                                            {
                                                                            document.getElementById("selections_program"+this.selected_program).setAttribute("active", "active");
                                                                            document.getElementById("selections_gen"+this.selected_genre).setAttribute("active", "");
                                                                            this.selected_layer=this.layer_programs;
                                                                            }
                                                                          }
                  break;
                  case "ok":
                            if (this.selected_layer==this.layer_genres){
                                this.used_genre_id = (selections_app.genres_page*10)+selections_app.selected_genre;
                                this.programs_page = 0;                                                               
                                selections_app.genres_update();
                                selections_app.programs_loading();                                
                                document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                selections_app.selected_program = 0;
                                //document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");                                 
                            }
                            if ((this.selected_layer==this.layer_programs)||(this.selected_layer==this.layer_description)){
                                      this.url_loading();
                                }
                  break;
                  case "blue":
                             switch (this.selected_layer) {
                                case this.layer_description:
                                      this.exit_from_full_description();
                                break;
                                case this.layer_programs:
                                      if (resolution_prefix=='')
                                      {
                                        document.getElementById('selections_scroll_t').style.height = "421px";
                                      }
                                      document.getElementById('selections_genres').style.display = 'none';
                                      document.getElementById('selections_programs').style.display = 'none';
                                      document.getElementById('selections_pagination').style.display = 'none';
                                      document.getElementById('selections_description').style.display = 'none';
                                      //document.getElementById("selections_pagination").style.display = 'none';
                                      document.getElementById('selections_full_description').style.display = 'block';
                                      if (selections_app.programs[this.selected_program].img!='') 
                                                            {
                                                              var img='<img src="'+selections_app.programs[this.selected_program].img+'">';
                                                            }
                                                            else
                                                            {
                                                               var img='';
                                                            }
                                      document.getElementById("selections_full_description_content").innerHTML=img+'<span class="time">Название: </span>'+selections_app.programs[this.selected_program].name+'<br><span class="time">Жанр: </span>'+selections_app.programs[this.selected_program].category+'<br><span class="time">Страна: </span>'+selections_app.programs[this.selected_program].country+'<br><span class="time">Год: </span>'+selections_app.programs[this.selected_program].year+'<br><span class="time">Канал: </span>'+selections_app.programs[this.selected_program].ch_prop.name+'<br><span class="time">Время записи: </span>'+selections_app.programs[this.selected_program].time+'<br><br><span class="time">О фильме: </span>'+selections_app.programs[this.selected_program].descr;
                                      this.selected_layer=this.layer_description;
                                break;
                              }
                  break;
                  case "back":
                            switch (this.selected_layer) {
                                case this.layer_description:
                                        this.exit_from_full_description();
                                break;
                                case this.layer_programs:
                                        this.exit();
                                break;
                                case this.layer_genres:
                                        this.exit();
                                break;
                              }
                  break;
                  case "rew":
                  if (this.selected_layer==this.layer_programs){
                      if (selections_app.programs_page>0){
                                                            selections_app.programs_page--;
                                                            selections_app.programs_loading();                                  
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                                            selections_app.selected_program = 0;
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");
                                                            selections_app.description_update();
                                                          }
                  }
                  break;
                  case "ffwd":
                  if (this.selected_layer==this.layer_programs){
                      if (selections_app.programs_page<selections_app.programs_total_pages-1){
                                                            selections_app.programs_page++;
                                                            selections_app.programs_loading();
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "");
                                                            selections_app.selected_program = 0;
                                                            document.getElementById("selections_program"+selections_app.selected_program).setAttribute("active", "active");
                                                            selections_app.description_update();
                                                          }
                  }
                  break;
                  case "ch_up":
                          //console.log("ch_up");
                          if (selections_app.selected_layer==selections_app.layer_description){
                              this.programs_scrolling_down();
                              this.update_full_description();
                          }
                  break;
                  case "ch_down":
                          //console.log("ch_up");
                          if (selections_app.selected_layer==selections_app.layer_description){
                              this.programs_scrolling_up();
                              this.update_full_description();
                          }
                  break;
                }

};

this.exit = function(){
              this.genres = {}; //массив ключей жанров
              this.genres_value = {};   //массив значений жанров
              this.total_programs = 0;  //к-во программ
              this.programs = {};    //массив программ
              document.getElementById("selections_program"+this.selected_program).setAttribute("active", "");
              this.selected_program = 0; //выбранный div программы              
              this.selected_layer = 0; //выбранный слой
              this.layer_programs = 0;  // слой с программами
              this.layer_genres = 1; //слой с жанрами
              this.layer_description = 2; // слой с описанием
              this.programs_page = 0; //текущая страница программ
              this.programs_total_pages = 0; //к-во страниц программ
              this.genres_total_pages = 0; //к-во страниц жанров
              this.genres_page = 0; //текущая страница жанров
              this.total_genres = 0; //к-во жанров
              this.used_genre_id = 0; //Используемый для запроса жанр
              document.getElementById("selections_gen"+this.selected_genre).setAttribute("active", "");
              this.selected_genre = 0;  //выбранный div жанра
              document.getElementById("selections_program"+this.selected_program).setAttribute("active", "active");
              document.getElementById("selections_full_description_content").innerHTML='';
              document.getElementById("selections_description").innerHTML="";
              document.getElementById('selections_genres').style.display = 'block';
                                      document.getElementById('selections_programs').style.display = 'block';
                                      document.getElementById('selections_description').style.display = 'block';
                                      document.getElementById('selections_full_description').style.display = 'none';
              document.getElementById("selections_runner").style.top='6px';
              document.getElementById("selections_full_description_content").scrollTop=0;
              for (var i = 0; i<10; i++){
                document.getElementById("selections_program"+i).innerHTML='';
              }
              this.hide();
              main_menu.show();
}

 this.bind = function(){
            (function(){              
               // this.hide();            
               // main_menu.show();           
               this.exit();
            }).bind(key.EXIT, this).bind(key.MENU, this);
            //this.key_press.bind(key.MENU, this, 'menu');
            //this.key_press.bind(key.EXIT, this, 'exit');
            this.key_press.bind(key.LEFT, this, 'left');
            this.key_press.bind(key.RIGHT, this, 'right');
            this.key_press.bind(key.OK, this, 'ok');
            this.key_press.bind(key.RED, this, 'red');
//            this.key_press.bind(key.GREEN, this, 'green');
//            this.key_press.bind(key.YELLOW, this, 'yellow');
            this.key_press.bind(key.BLUE, this, 'blue');
            this.key_press.bind(key.DOWN, this, 'down');
            this.key_press.bind(key.UP, this, 'up');
            this.key_press.bind(key.BACK, this, 'back');
            this.key_press.bind(key.REW, this, 'rew');
            this.key_press.bind(key.FFWD, this, 'ffwd');
            this.key_press.bind(key.CHANNEL_PREV, this, 'ch_down');
            this.key_press.bind(key.CHANNEL_NEXT, this, 'ch_up');
//            this.key_press.bind(key.INFO, this, 'info');
        };
    }
    
    selections_app_constructor.prototype = new BaseLayer();
    var selections_app = new selections_app_constructor();
    selections_app.init();
    selections_app.bind();
    selections_app.init_header_path('ТВ Гид: Подборки');
    selections_app.hide();
    module.selections_app = selections_app;    

if (!module.videoportal_sub){module.videoportal_sub = [];}

      module.videoportal_sub.push({
        "title" : 'ТВ Гид: Подборки',
        "cmd"   : function(){
            selections_app.genres_loading();
            main_menu.hide();            
            selections_app.update_header_path([{"alias" : "tab", "item" : ""}]);            
            selections_app.show();                                             
     }
    })
    
})();

loader.next();
