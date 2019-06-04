(function(){
    
  function transport_app_constructor(){
        
   this.layer_name = 'transport_app';
   this.dom_obj = this.create_block('layer_bg2');
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;
   this.content_url='http://m-sk.ru';
   this.host_url='http://212.77.128.203/apps/transport';
   //this.trailer_url='http://212.77.128.233/trailers/';
   this.category;
   this.save_category;
   this.category_page_number = 0;
   this.category_total_page;
   this.cat_select_sd = [[0, 1, 2],
                         [3, 4, 5],
                         [6, 7, 8]]; //расположение элементов для sd-разрешения
   this.cat_select_x =0;
   this.cat_select_y =0;
   this.cat_save_level =[[0,0,0,'']];   //[расположение выделенного элемента по x, расположение выделенного элемента по y, номер текущей странцы, json текущего левела]
   this.cat_level =0;
   this.exit_save_level=0;
  // this.cat_select_x_save =0;
  // this.cat_select_y_save =0;
   this.category_page_number_save;
   this.section;
   this.section_total_page;
   this.current_layer;
   this.category_layer = 1;
   this.section_layer = 2;
   this.product_layer = 3;
   this.future_layer = 4;
   this.detail_visible = 0;
           
   this.init = function(){
        _debug('transport_app.init');

       var container = create_block_element('transport_app', this.dom_obj);
       var pp = '<div id="transport_pages"><div id="transport_up"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/up.png"'+'></div><div id="transport_categories"><div id="transport_cat0"><div id="transport_cat_img0"><img src="http://m-sk.ru/upload/iblock/05f/05f20c8349f7c165e4d841bd56e85976.jpeg"></div><div id="transport_name0">Акции распродажи</div></div><div id="transport_cat1"><div id="transport_cat_img1"><img src="http://m-sk.ru/upload/iblock/211/211c342336db2a273c4fd7e376792a81.jpeg"></div><div id="transport_name1">Животные, растения</div></div><div id="transport_cat2"><div id="transport_cat_img2"><img src="http://m-sk.ru/upload/iblock/2d8/2d89682a82cc64bc2d4fd10f08bda658.jpeg"></div><div id="transport_name2">Здоровье и красота</div></div><div id="transport_cat3"><div id="transport_cat_img3"><img src="http://m-sk.ru/upload/iblock/4c3/4c322ad30d37b549b453d48c22678de1.jpeg"></div><div id="transport_name3">Мебель, интерьер, обиход</div></div><div id="transport_cat4"><div id="transport_cat_img4"><img src="http://m-sk.ru/upload/iblock/172/1726a4f359b3c2a55ded2ee4f23452c5.jpeg"></div><div id="transport_name4">Недвижимость</div></div><div id="transport_cat5"><div id="transport_cat_img5"><img src="http://m-sk.ru/upload/iblock/19a/19adccdf95cddaadd0899747aa90ed82.jpeg"></div><div id="transport_name5">Одежда, обувь, аксессуары</div></div><div id="transport_cat6"><div id="transport_cat_img6"><img src="http://m-sk.ru/upload/iblock/0fb/0fba588ea6768e2418fbac69f2112cd8.jpeg"></div><div id="transport_name6">Работа, образование</div></div><div id="transport_cat7"><div id="transport_cat_img7"><img src="http://m-sk.ru/upload/iblock/ddd/ddd61ae03e3c3368d1251dc775e7569f.jpeg"></div><div id="transport_name7">Разное</div></div><div id="transport_cat8"><div id="transport_cat_img8"><img src="http://m-sk.ru/upload/iblock/ddd/ddd61ae03e3c3368d1251dc775e7569f.jpeg"></div><div id="transport_name8">Строительство и ремонт</div></div><!--<div id="transport_cat9"><div id="transport_cat_img9"><img src="http://m-sk.ru/upload/iblock/ef5/ef59886d48644d99eeeaa7ed1daa59a3.jpeg"></div><div id="transport_name9">Подарки цветы</div></div><div id="transport_cat10"><div id="transport_cat_img10"><img src="http://m-sk.ru/upload/iblock/886/88636f337b594e899f5b43abc6b0e162.jpeg"></div><div id="transport_name10">Акции распродажи</div></div><div id="transport_cat11"><div id="transport_cat_img11"><img src="http://m-sk.ru/upload/iblock/9b0/9b042bbb78e5586bd860d56a288f0e84.jpeg"></div><div id="transport_name11">Личный кабинет</div></div><div id="transport_cat12"><div id="transport_cat_img12"><img src="http://m-sk.ru/upload/iblock/fe7/fe791b11b653e367da12d8c13378636a.jpeg"></div><div id="transport_name12">Недвижимость</div></div><div id="transport_cat13"><div id="transport_cat_img13"><img src="http://m-sk.ru/upload/iblock/16a/16a710bc9dd5a3cf429475a33dd38e25.jpeg"></div><div id="transport_name13">Благотворительность</div></div><div id="transport_cat14"><div id="transport_cat_img14"><img src="http://m-sk.ru/upload/iblock/909/909d65dd884f0d204a3eda8aa1af11f0.jpeg"></div><div id="transport_name14">Услуги, разное</div></div><div id="transport_cat15"><div id="transport_cat_img15"><img src="http://m-sk.ru/upload/iblock/909/909d65dd884f0d204a3eda8aa1af11f0.jpeg"></div><div id="transport_name15">Такси</div></div> --></div><div id="transport_product"><div id="transport_product_img"><img src="http://m-sk.ru/upload/iblock/05f/05f20c8349f7c165e4d841bd56e85976.jpeg"></div><div id="transport_product_name"><div id="transport_product_title"></div></div><div id="transport_product_description"><div id="transport_product_description_title"></div><div id="transport_scroll"><div id="transport_scroll_runner"><img src="/'+ stb.portal_path+'/c/template/'+loader.template+'/i/mb_scroll.png"></div><div id="transport_scroll_background"><img src="/'+ stb.portal_path+'/c/template/'+loader.template+'/i/mb_scroll_bg.png"></div><div id="transport_scroll_background1"><img src="/'+ stb.portal_path+'/c/template/'+loader.template+'/i/mb_scroll_bg.png"></div></div></div></div><div id="transport_down"><img src="/'+stb.portal_path+'/c/template/'+loader.template+'/transport_app/down.png"'+'></div></div><div id="transport_menu"><div id="transport_menu_key0"><div id="transport_menu_key0_img"></div><div id="transport_menu_key0_title"></div></div><div id="transport_menu_key1"><div id="transport_menu_key1_img"></div><div id="transport_menu_key1_title"></div></div><div id="transport_menu_key2"><div id="transport_menu_key2_img"></div><div id="transport_menu_key2_title"></div></div><div id="transport_menu_key3"><div id="transport_menu_key3_img"></div><div id="transport_menu_key3_title"></div></div></div><div id="transport_exit_message"><div id="transport_exit_message_"><div id="transport_exit_message_title"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/ok.png"'+'><span> ВЫХОД&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/back_sd.png"'+'><span> ОТМЕНА </span></div></div></div><div id="transport_message"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/ico_alert.png"'+'><div id="transport_message_title"></div></div><div id="transport_loading" style="display:none;">Загрузка...</div><div id="transport_number_page">стр. 1 из 4</div>';
                        container.innerHTML = pp;
     };
        
    this.show = function(){
         _debug('transport_app.show');
          this.superclass.show.call(this);

        };
        
        this.hide = function(){
            _debug('transport_app.hide');            
            this.superclass.hide.call(this);
            //window.clearInterval(this.reload_timer);
        };

this.load_category = function(){
  _debug('pomogator.load_category');
    url=transport_app.host_url+'/main_menu.php';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
      transport_app.category = JSON.parse(xmlhttp.responseText);
        //console.log('category= '+transport_app.category.menu[0].name);
      transport_app.category_total_page=Math.ceil(transport_app.category.menu.length/9);
      transport_app.current_layer=transport_app.category_layer;
      //console.log( 'category_total_page='+transport_app.category_total_page);      
      transport_app.update_category();
      document.getElementById('transport_pages').style.display = 'block';
      document.getElementById('transport_loading').style.display = 'none';      
      }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
};

this.load_section = function(menu_url){
     _debug('pomogator.load_category');
     //console.log('menu_url= '+menu_url);
     ////console.log('url= '+transport_app.host_url+'/section_page.php?url='+transport_app.content_url+section);
    url=menu_url;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
      //console.log('count responseText= '+xmlhttp.responseText.length);
     // //console.log('responseText= '+xmlhttp.responseText);
       if (xmlhttp.responseText.length>2)
       {
       js=JSON.parse(xmlhttp.responseText);       
      if (js.section_count!==undefined)
      {
      transport_app.category = JSON.parse(xmlhttp.responseText);
      transport_app.category_total_page=Math.ceil(transport_app.category.sections.length/9);
      //console.log('category_total_page='+transport_app.category_total_page);
      transport_app.category_page_number = 0;
      transport_app.cat_select_x =0;
      transport_app.cat_select_y =0;      
     // transport_app.current_layer=transport_app.section_layer;
      transport_app.cat_level=transport_app.cat_level+1;
      transport_app.update_category();
      }
      else
      {
        //console.log('no kategory');
        if (js.product!==undefined)
        {
          //console.log('js.details.name= '+js.details[0].name); 
          transport_app.details = JSON.parse(xmlhttp.responseText);
          transport_app.current_layer=transport_app.product_layer;
          transport_app.update_product();
        }
      }
    }
    else
    {
      //console.log('net dannyh');
      transport_app.message("Категория не заполнена!!!");
    }
      }      
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
};

this.load_menu = function(menu_url){
     _debug('pomogator.load_routes');
     //console.log('menu_url= '+menu_url);
     ////console.log('url= '+transport_app.host_url+'/section_page.php?url='+transport_app.content_url+section);
    url=menu_url;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
      //console.log('count responseText= '+xmlhttp.responseText.length);
     // //console.log('responseText= '+xmlhttp.responseText);
       if (xmlhttp.responseText.length>2)
       {        
       js=JSON.parse(xmlhttp.responseText);       
       //console.log('menu_count= '+js.menu_count);
      if (js.menu_count!==undefined)
      {
      transport_app.category = JSON.parse(xmlhttp.responseText);
      transport_app.category_total_page=Math.ceil(transport_app.category.menu.length/9);
      //console.log('category_total_page='+transport_app.category_total_page);
      transport_app.category_page_number = 0;
      transport_app.cat_select_x =0;
      transport_app.cat_select_y =0;      
     // transport_app.current_layer=transport_app.section_layer;
      transport_app.cat_level=transport_app.cat_level+1;
      transport_app.update_category();
      }
      else
      {
        //console.log('no kategory');
        if (js.details!==undefined)
        {
          //console.log('js.details.name= '+js.details[0].name); 
          transport_app.details = JSON.parse(xmlhttp.responseText);
          transport_app.current_layer=transport_app.product_layer;
          transport_app.update_product();
        }
      }
    }
    else
    {
      //console.log('net dannyh');
      transport_app.message("Категория не заполнена!!!");
    }
      }      
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
};


this.update_category = function(){
      _debug('pomogator.update_category');
      for (var i = 0; i<9; i++){            
      if (((transport_app.category_page_number*9)+i)<transport_app.category.menu.length)
      {
      document.getElementById('transport_cat'+i).style.display = 'block';
      //document.getElementById('transport_name'+i).innerHTML =transport_app.category.menu[(transport_app.category_page_number*9)+i].name;
      if (transport_app.cat_level>0)
        {
          
          document.getElementById('transport_cat_img'+i).innerHTML = '<img src="'+transport_app.category.img_sd+'">';
          if (transport_app.category.menu[(transport_app.category_page_number*9)+i].main_phone)
          {
              document.getElementById('transport_name'+i).innerHTML =transport_app.category.menu[(transport_app.category_page_number*9)+i].name+"<br>"+transport_app.category.menu[(transport_app.category_page_number*9)+i].main_phone;
          }
          else
          {
            document.getElementById('transport_name'+i).innerHTML =transport_app.category.menu[(transport_app.category_page_number*9)+i].name;
          }
          //document.getElementById('transport_cat_img'+i).innerHTML = '<img src="'+transport_app.category.menu[(transport_app.category_page_number*9)+i].img_sd+'">';
        }
        else
        {
          document.getElementById('transport_name'+i).innerHTML =transport_app.category.menu[(transport_app.category_page_number*9)+i].name;
          //document.getElementById('transport_cat_img'+i).innerHTML = '<img src="'+transport_app.category.img_sd+'">';
          document.getElementById('transport_cat_img'+i).innerHTML = '<img src="'+transport_app.category.menu[(transport_app.category_page_number*9)+i].img_sd+'">';
        }
      //document.getElementById('transport_cat_img'+i).innerHTML = '<img src="'+transport_app.category.menu[(transport_app.category_page_number*9)+i].img_sd+'">';
      }
      else        
      {
        document.getElementById('transport_cat'+i).style.display = 'none';
      }
    }
    document.getElementById('transport_number_page').style.display = 'block';
    document.getElementById('transport_number_page').innerHTML = "стр. "+(transport_app.category_page_number+1)+" из "+transport_app.category_total_page;
    document.getElementById('transport_categories').style.display = 'block';    
      
    transport_app.scroll_category_update();
    transport_app.category_selected_cat();
    transport_app.help_panel_update();
}

this.update_product = function(){
      _debug('pomogator.update_product');
      document.getElementById('transport_product_img').innerHTML = '<img src="'+transport_app.details.img_sd+'">';
      document.getElementById('transport_product_title').innerHTML = "<span>"+transport_app.details.details[0].name+"</span>";      
      document.getElementById('transport_categories').style.display = 'none';
      document.getElementById('transport_product').style.display = 'block';
      document.getElementById('transport_number_page').style.display = 'none';
      document.getElementById("transport_scroll_runner").style.top="7px";
      document.getElementById('transport_up').style.display = 'none';
      document.getElementById('transport_down').style.display = 'none';
      text="";
      switch (transport_app.details.id) {
      case 0://Обработка расписания городских автобусов
              date= new Date();
             for (var i = 0; i<transport_app.details.details[0].description.length; i++){
                text=text+"<span style='padding-left:50px;'><b>"+transport_app.details.details[0].description[i]+":</b></span> ";
                for (var j = 0; j<transport_app.details.details[0].schedule[i].length; j++){
                    if (parseInt(transport_app.details.details[0].schedule[i][j].replace(/\-+\d\d/, ''))>parseInt(date.getHours()))
                    {
                      text=text+" <span style='color: yellow;'>"+transport_app.details.details[0].schedule[i][j]+"</span>";                      
                    }
                    else
                    {  
                    
                      if ((parseInt(transport_app.details.details[0].schedule[i][j].replace(/\-+\d\d/, ''))>=parseInt(date.getHours()))&&(parseInt(transport_app.details.details[0].schedule[i][j].replace(/\d+\-/, ''))>parseInt(date.getMinutes())))
                      {
                        text=text+" <span style='color: yellow;'>"+transport_app.details.details[0].schedule[i][j]+"</span>";                        
                      }
                      else
                      {
                        text=text+" "+transport_app.details.details[0].schedule[i][j];                        
                      }
                    }
                    if (j<transport_app.details.details[0].schedule[i].length-1) text=text+",";
                }
                text=text+"<br><br>";
              } 
            text=text+"<span style='padding-left:50px;'></span><b>Маршрут:</b> "+transport_app.details.details[0].path+"<br><br>";
            text=text+"Время местное.<br>Точную информацию узнавайте <br>в диспетчерской службе, тел. 2-73-53."
        //    date= new Date();
        //    time=date.getHours().toString()+":"+date.getMinutes().toString();
        //    text=text+"<br>"+time;
        //    text=text+"<br>"+time.replace(/\d+\:/, '');
        //    text=text+"<br>"+time.replace(/\:+\d\d/, '');
            break;
      case 1://Обработка расписания междугородних автобусов
      if (transport_app.details.details[0].description.length>1)
      {
        if (resolution_prefix=='')
          {                  
            text="<span style='padding-left:80px;'></span>"+transport_app.details.details[0].description[0]+"<span style='padding-left:80px;'></span>"+transport_app.details.details[0].description[1];
          }
          else
          {
            text="<span style='padding-left:150px;'></span>"+transport_app.details.details[0].description[0]+"<span style='padding-left:210px;'></span>"+transport_app.details.details[0].description[1];
          }
      }
      else
      { 
          if (resolution_prefix=='')
          {        
            //text="<span style='padding-left:80px;'></span>"+transport_app.details.details[0].description;
              text="<span style='padding-left:80px;'></span>"+transport_app.details.details[0].description+" - ";
          }
          else
          {
            //text="<span style='padding-left:150px;'></span>"+transport_app.details.details[0].description;
              text="<span style='padding-left:150px;'></span>"+transport_app.details.details[0].description+" - ";
          }
      }
      for (var i = 0; i<transport_app.details.details[0].schedule[0].length; i++){
          if (resolution_prefix=='')
          { 
            //text=text+"<br><span style='padding-left:100px; width:150px'>"+"</span>"+transport_app.details.details[0].schedule[0][i];
            if (transport_app.details.details[0].schedule[1]==undefined)
            {
            text=text+transport_app.details.details[0].schedule[0][i];
            if (i!=transport_app.details.details[0].schedule[0].length-1)
            {
              text=text+", "
            }
            }
            else
            {
            text=text+"<br><span style='padding-left:100px; width:150px'>"+"</span>"+transport_app.details.details[0].schedule[0][i];
          }
          }
          else
          {
            //text=text+"<br><span style='padding-left:190px; width:150px'>"+"</span>"+transport_app.details.details[0].schedule[0][i];
            if (transport_app.details.details[0].schedule[1]==undefined)
            {
            text=text+transport_app.details.details[0].schedule[0][i];
            if (i!=transport_app.details.details[0].schedule[0].length-1)
            {
              text=text+", "
            }
            }
            else
            {
              text=text+"<br><span style='padding-left:190px; width:150px'>"+"</span>"+transport_app.details.details[0].schedule[0][i];
            }
          }
          if (transport_app.details.details[0].schedule[1]!=undefined){
            if (transport_app.details.details[0].schedule[1][i]==undefined)
          {
              if (resolution_prefix=='')
              { 
                text=text+"<span style='right:115px; width:170px; position: absolute; text-align:center;'>"+transport_app.details.details[0].schedule[1][0]+"</span>";
              }
              else
              {
                text=text+"<span style='right:180px; width:170px; position: absolute; text-align:center;'>"+transport_app.details.details[0].schedule[1][0]+"</span>";
              }
          }
          else            
          {
              if (resolution_prefix=='')
              {
                text=text+"<span style='right:115px; width:170px; position: absolute; text-align:center;'>"+transport_app.details.details[0].schedule[1][i]+"</span>";
              }
              else
              {
                text=text+"<span style='right:180px; width:170px; position: absolute; text-align:center;'>"+transport_app.details.details[0].schedule[1][i]+"</span>";
              }
          }
        }
      }
      text=text+"<br><br>Время местное.<br>Точную информацию узнавайте в кассах автовокзала или у диспетчера, тел. диспетчерской автовокзала 2-46-22."
      break;
      case 2: //Обработка информации о такси
      if ((transport_app.details.details[0].main_phone!==undefined)&&(transport_app.details.details[0].main_phone!=="")) text=text+"Номера: "+transport_app.details.details[0].main_phone;
      if (text=="Номера: ")
      {
      if ((transport_app.details.details[0].additional_phone!==undefined)&&(transport_app.details.details[0].additional_phone!=="")) text=text+transport_app.details.details[0].additional_phone;
      }
      else
      {
      if ((transport_app.details.details[0].additional_phone!==undefined)&&(transport_app.details.details[0].additional_phone!=="")) 
        {
           //text=text+", "+transport_app.details.details[0].additional_phone;
           for (var i = 0; i<transport_app.details.details[0].additional_phone.length; i++){
                if (resolution_prefix=='')
                {
                  text=text+"<br><span style='padding-left:76px;'></span>"+transport_app.details.details[0].additional_phone[i];
                }
                else
                {
                  text=text+"<br><span style='padding-left:104px;'></span>"+transport_app.details.details[0].additional_phone[i];
                }
           }
        }
      }      
      break;
      case 3: //Обработка расписания электричек
      if (transport_app.details.details[0].name=="Междуреченск - Новокузнецк")
        {
          if (resolution_prefix=='')
                {
                  text="№ поезда<span style='padding-left:50px;'></span>Отправление (66км/вокзал)<span style='padding-left:50px;'></span>Прибытие<br>";
                }
                else
                {
                  if (loader.template=='default')
                  {
                    text="№ поезда<span style='padding-left:150px;'></span>Отправление (66км/вокзал)<span style='padding-left:150px;'></span>Прибытие<br>";
                  }
                  else
                  {
                    text="№ поезда<span style='padding-left:130px;'></span>Отправление (66км/вокзал)<span style='padding-left:130px;'></span>Прибытие<br>";
                  }
                }
        }
        else
        {
            if (resolution_prefix=='')
                {
                  text="№ поезда<span style='padding-left:80px;'></span>Отправление (вокзал)<span style='padding-left:50px;'></span>Прибытие<br>";
                }
                else
                {
                  if (loader.template=='default')
                  {
                    text="№ поезда<span style='padding-left:200px;'></span>Отправление (вокзал)<span style='padding-left:150px;'></span>Прибытие<br>";
                  }
                  else
                  {
                    text="№ поезда<span style='padding-left:180px;'></span>Отправление (вокзал)<span style='padding-left:130px;'></span>Прибытие<br>";
                  }
                }
        }
      for (var i = 0; i<transport_app.details.details[0].number.length; i++){
          if (resolution_prefix=='')
                {
                  text=text+"<span style='padding-left:15px;'></span>"+transport_app.details.details[0].number[i]+"<span style='width:180px; text-align:center; position: absolute; padding-left:110px;'>"+transport_app.details.details[0].departure[i]+"</span><span style='width:250px; text-align:center; position: absolute; padding-left:270px;'>"+transport_app.details.details[0].arrival[i]+"</span><br>";
                }
                else
                {
                  text=text+"<span style='padding-left:15px;'></span>"+transport_app.details.details[0].number[i]+"<span style='width:250px; text-align:center; position: absolute; padding-left:220px;'>"+transport_app.details.details[0].departure[i]+"</span><span style='width:280px; text-align:center; position: absolute; padding-left:570px;'>"+transport_app.details.details[0].arrival[i]+"</span><br>";
                }  
      }
      text=text+"<br><br>Время местное.<br>Точную информацию узнавайте в кассах вокзала или справочной службе. Справки по тел.: 8-800-77-50000."
      break;
    }
      document.getElementById('transport_product_description_title').innerHTML = text;
      //
      if (document.getElementById('transport_product_description_title').scrollHeight>document.getElementById('transport_product_description_title').clientHeight)
      {
        document.getElementById('transport_scroll').style.display = 'block';
      }
      else
      {
        document.getElementById('transport_scroll').style.display = 'none';
      }
      //
      transport_app.help_panel_update();
}

this.scroll_category_update = function(){
      //if (((transport_app.category_page_number+1)==transport_app.category_total_page)&&(transport_app.category_total_page!=1))
        if ((transport_app.category_page_number+1)==transport_app.category_total_page)
        {
            document.getElementById('transport_down').style.display = 'none';
        }
        else 
        {
            document.getElementById('transport_down').style.display = 'block';
        }
        if ((transport_app.category_page_number+1)>1)
        {
            document.getElementById('transport_up').style.display = 'block';
        }
        else
        {
            document.getElementById('transport_up').style.display = 'none';
        }
}

this.category_selected_cat = function(){
        //console.log('loader.template='+loader.template);
        for (var i = 0; i<9; i++){
            //if (loader.template=='default') document.getElementById('transport_cat'+i).style.backgroundColor="";
            document.getElementById('transport_cat'+i).style.backgroundImage="";
            //console.log('category_selected_cat');
        }
       
        //if (loader.template=='default') document.getElementById('transport_cat'+transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y]).style.backgroundImage = 'url("/'+stb.portal_path+'/c/template/'+loader.template+'/i/25alfa_20.png")';
        document.getElementById('transport_cat'+transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y]).style.backgroundImage = 'url("/'+stb.portal_path+'/c/template/'+loader.template+'/i/25alfa_20.png")';
        //console.log('CSC='+stb.portal_path+'/c/template/'+loader.template+'/i/25alfa_20.png"');
}

this.message = function(text){
      document.getElementById('transport_message_title').innerHTML = text;
      document.getElementById('transport_message').style.display = 'block';
      setTimeout("document.getElementById('transport_message').style.display = 'none';", 2000);
}

this.help_panel_update = function(){
      //console.log('help_panel_update,  transport_app.current_layer='+transport_app.current_layer);
      //console.log('help_panel_update,  transport_app.cat_level='+transport_app.cat_level);      
      switch(transport_app.current_layer)
      {
      case 1:
      if (transport_app.cat_level>0)
      {
        document.getElementById('transport_menu_key0_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/exit.png">';
      document.getElementById('transport_menu_key1_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/back.png">';
      document.getElementById('transport_menu_key2_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/ok.png">';
      document.getElementById('transport_menu_key3_img').innerHTML = '';
      document.getElementById('transport_menu_key0_title').innerHTML = 'Выйти';
      document.getElementById('transport_menu_key1_title').innerHTML = 'Назад';
      document.getElementById('transport_menu_key2_title').innerHTML = 'Выбор';
      document.getElementById('transport_menu_key3_title').innerHTML = '';
      }
      else
      {
      document.getElementById('transport_menu_key0_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/exit.png">';
      document.getElementById('transport_menu_key1_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/ok.png">';
      document.getElementById('transport_menu_key2_img').innerHTML = '';
      document.getElementById('transport_menu_key3_img').innerHTML = '';
      document.getElementById('transport_menu_key0_title').innerHTML = 'Выйти';
      document.getElementById('transport_menu_key1_title').innerHTML = 'Выбор';
      document.getElementById('transport_menu_key2_title').innerHTML = '';
      document.getElementById('transport_menu_key3_title').innerHTML = '';
      }
      break;
      case 3:
      document.getElementById('transport_menu_key0_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/exit.png">';
      document.getElementById('transport_menu_key1_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/transport_app/back.png">';
      document.getElementById('transport_menu_key2_img').innerHTML = '';
      document.getElementById('transport_menu_key3_img').innerHTML = '';
      document.getElementById('transport_menu_key0_title').innerHTML = 'Выйти';
      document.getElementById('transport_menu_key1_title').innerHTML = 'Назад';
      document.getElementById('transport_menu_key2_title').innerHTML = '';
      document.getElementById('transport_menu_key3_title').innerHTML = '';
      break;
    }
    document.getElementById('transport_menu').style.display = 'block';
}
  
this.transport_exit = function(){
      transport_app.update_header_path([{"alias" : "tab", "item" : ""}]);
      transport_app.category="";
      transport_app.save_category="";
      transport_app.category_page_number = 0;
      transport_app.category_total_page="";
      transport_app.category_page_number = 0;
      transport_app.cat_select_x =0;
      transport_app.cat_select_y =0;
      transport_app.cat_save_level =[[0,0,0,'']];
      transport_app.details="";
}

this.key_press = function(button){
      //if (transport_app.current_layer==transport_app.category_layer)
      //console.log("transport_app.current_layer="+transport_app.current_layer);
       if ((button=="menu")||(button=="exit")) 
        {
          //console.log("soobshenie o vyhode");
          button="";
          if (transport_app.current_layer!=10)
          {
           transport_app.exit_save_level=transport_app.current_layer;
           transport_app.current_layer=10;
           document.getElementById('transport_exit_message').style.display = 'block';
         }
              
        }
        switch(transport_app.current_layer)
      {
      case 1:
      case 2:  
      switch (button) {
      case "left": 
      if (transport_app.cat_select_y>0)
      {
      transport_app.cat_select_y=transport_app.cat_select_y-1;
      transport_app.category_selected_cat();
      }
      break;
      case "right":
      if (transport_app.cat_select_y<2)
      {
         if ((((transport_app.category_page_number*9)+(transport_app.cat_select_x*3)+(transport_app.cat_select_y+1))+1)<=transport_app.category.menu_count)
          {
      transport_app.cat_select_y=transport_app.cat_select_y+1;
      transport_app.category_selected_cat();
        }
      }
      //console.log("transport_app.cat_select_y="+transport_app.cat_select_y);
      break;
      case "up": 
      if (transport_app.cat_select_x>0)
      {          
      transport_app.cat_select_x=transport_app.cat_select_x-1;
      transport_app.category_selected_cat();
      }
      else
      {
        if (transport_app.category_page_number!=0)
        {
          transport_app.category_page_number=transport_app.category_page_number-1;
          transport_app.cat_select_x=2;
          transport_app.update_category();
        }
      }
      break;
      case "down":
      if (transport_app.cat_select_x<2)
      {        
          
          if ((((transport_app.category_page_number*9)+(transport_app.cat_select_x*3)+(transport_app.cat_select_y+1))+3)<=transport_app.category.menu_count)
          {
          //console.log('if= '+((((transport_app.category_page_number*9)+(transport_app.cat_select_x*3)+(transport_app.cat_select_y+1))+3)));
          //console.log('x= '+ transport_app.cat_select_x);
          //console.log('category_page_number= '+ transport_app.category_page_number);
          transport_app.cat_select_x=transport_app.cat_select_x+1;
          transport_app.category_selected_cat();          
          }
      }
      else
      {
        //console.log('category_page_number= '+ transport_app.category_page_number);
        //console.log('category_total_page= '+ transport_app.category_total_page);
        if (transport_app.category_page_number<transport_app.category_total_page-1)
        {
          transport_app.category_page_number=transport_app.category_page_number+1;
          transport_app.cat_select_x=0;
          if (transport_app.cat_select_y>0)
          {
          if ((((transport_app.category_page_number*9)+(transport_app.cat_select_x*3)+(transport_app.cat_select_y+1))+3)>transport_app.category.menu_count)
          { //////////
            //if ((transport_app.category.menu_count-(transport_app.category_page_number*9)-(1+transport_app.cat_select_y))<=3) 
              if ((transport_app.category_page_number*9)+transport_app.cat_select_y+1>transport_app.category.menu_count)
            {
            transport_app.cat_select_y=transport_app.category.menu_count-(transport_app.category_page_number*9)-1;
            //console.log('y= '+ transport_app.cat_select_y);
          }
          }
          }
          transport_app.update_category();
        }
      }
      break;      
      case "ok":
            ////console.log('OK= '+ transport_app.category.sections[((transport_app.category_page_number*9)+transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y])].section_page_url);
            //console.log('OK= '+ transport_app.category.menu[((transport_app.category_page_number*9)+transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y])].url);
           // transport_app.save_category=transport_app.category;
          //  transport_app.cat_select_x_save =transport_app.cat_select_x;
          //  transport_app.cat_select_y_save =transport_app.cat_select_y;
          //  transport_app.category_page_number_save=transport_app.category_page_number;
          if (transport_app.cat_level==0)  
      {
        transport_app.update_header_path([{"alias" : "tab", "item" : transport_app.category.menu[transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y]].name}]); 
      }
            transport_app.cat_save_level[transport_app.cat_level]=[transport_app.cat_select_x, transport_app.cat_select_y, transport_app.category_page_number, transport_app.category];
            //transport_app.cat_level=transport_app.cat_level+1;
            //document.getElementById('transport_product_img').innerHTML = '<img src="'+transport_app.content_url+transport_app.category.sections[(transport_app.category_page_number*9)+transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y]].pic_src+'">';
            transport_app.load_menu(transport_app.category.menu[((transport_app.category_page_number*9)+transport_app.cat_select_sd[transport_app.cat_select_x][transport_app.cat_select_y])].url);
      break;
      case "back":
                if (transport_app.cat_level>0)
                {
                  if (transport_app.cat_level==1)  
                {
                    transport_app.update_header_path([{"alias" : "tab", "item" : ""}]); 
                }
                transport_app.cat_level=transport_app.cat_level-1;
                transport_app.category=transport_app.cat_save_level[transport_app.cat_level][3];
                transport_app.category_total_page=Math.ceil(transport_app.category.menu.length/9);
               // transport_app.current_layer=transport_app.category_layer;
                transport_app.cat_select_x=transport_app.cat_save_level[transport_app.cat_level][0];
                transport_app.cat_select_y=transport_app.cat_save_level[transport_app.cat_level][1];
                transport_app.category_page_number=transport_app.cat_save_level[transport_app.cat_level][2];
                
                transport_app.update_category();
                }
      break;
}
break;
            case 3:
            switch (button) {
                  case "back":
                  //console.log('back product_layer');
                  //transport_app.cat_level=transport_app.cat_level-1;
                  transport_app.current_layer=transport_app.category_layer;
                  document.getElementById('transport_categories').style.display = 'block';
                  document.getElementById('transport_product').style.display = 'none';
                  document.getElementById('transport_number_page').style.display = 'block';
                  transport_app.help_panel_update();
                  transport_app.scroll_category_update();
                  break;

                  case "down":
                  //console.log('resolution_prefix'+resolution_prefix);
                  if (resolution_prefix=='')
                  {                  
                  document.getElementById("transport_product_description_title").scrollTop=document.getElementById("transport_product_description_title").scrollTop+20;             
                  document.getElementById("transport_scroll_runner").style.top=(7+Math.floor(((100*document.getElementById("transport_product_description_title").scrollTop)/(document.getElementById("transport_product_description_title").scrollHeight-286))*2.46))+"px";
                  }
                  else
                  {
                  document.getElementById("transport_product_description_title").scrollTop=document.getElementById("transport_product_description_title").scrollTop+20;             
                  document.getElementById("transport_scroll_runner").style.top=(7+Math.floor(((100*document.getElementById("transport_product_description_title").scrollTop)/(document.getElementById("transport_product_description_title").scrollHeight-416))*3.77))+"px"; 
                  }
                  break;                  
                  case "up":
                  if (resolution_prefix=='')
                  {  
                  document.getElementById("transport_product_description_title").scrollTop=document.getElementById("transport_product_description_title").scrollTop-20;
                  document.getElementById("transport_scroll_runner").style.top=(7+Math.floor(((100*document.getElementById("transport_product_description_title").scrollTop)/(document.getElementById("transport_product_description_title").scrollHeight-286))*2.46))+"px";
                  }
                    else
                  {
                    document.getElementById("transport_product_description_title").scrollTop=document.getElementById("transport_product_description_title").scrollTop-20;
                    document.getElementById("transport_scroll_runner").style.top=(7+Math.floor(((100*document.getElementById("transport_product_description_title").scrollTop)/(document.getElementById("transport_product_description_title").scrollHeight-416))*3.77))+"px"; 
                  }
                  break;
            }
            break;
            case 10:
            switch (button) {
                 case "back":
                           transport_app.current_layer=transport_app.exit_save_level;
                           document.getElementById('transport_exit_message').style.display = 'none';          
                 break;

                 case "ok": 
                            transport_app.transport_exit();
                            transport_app.hide();
                            main_menu.show();
                            document.getElementById('transport_exit_message').style.display = 'none';
                            document.getElementById('transport_menu').style.display = 'none';
                 break;
            }
            break;
}
}

  this.bind = function(){
            (function(){
                this.hide();
            //    this.tab_click(0);
                main_menu.show();
           });
           // }).bind(key.EXIT, this).bind(key.MENU, this);
            this.key_press.bind(key.MENU, this, 'menu');
            this.key_press.bind(key.EXIT, this, 'exit');
            this.key_press.bind(key.LEFT, this, 'left');
            this.key_press.bind(key.RIGHT, this, 'right');
            this.key_press.bind(key.OK, this, 'ok');
//            this.key_press.bind(key.RED, this, 'red');
//            this.key_press.bind(key.GREEN, this, 'green');
//            this.key_press.bind(key.YELLOW, this, 'yellow');
//            this.key_press.bind(key.BLUE, this, 'blue');
            this.key_press.bind(key.DOWN, this, 'down');
            this.key_press.bind(key.UP, this, 'up');
            this.key_press.bind(key.BACK, this, 'back');
//            this.key_press.bind(key.INFO, this, 'info');
        };
    }
    
    transport_app_constructor.prototype = new BaseLayer();
    var transport_app = new transport_app_constructor();
    transport_app.init();
    transport_app.bind();
    transport_app.init_header_path('Транспорт');
    transport_app.hide();
    module.transport_app = transport_app;
    
//    if (!module.infoportal_sub){
 //       module.infoportal_sub = [];
 //   }
 //   
 //   module.infoportal_sub.push({
  if (!module.my_city_sub){module.my_city_sub = [];}
        module.my_city_sub.push({
        "title" : 'Транспорт',
        "cmd"   : function(){
            main_menu.hide();
            //module.kino_kuzbass.show();
            //document.getElementById('loading').innerHTML = "Загрузка...";
            //document.getElementById('ad').style.display = 'none';
          //  document.getElementById('ad1').style.display = 'none';
           // document.getElementById('menu').style.display = 'none';
           // document.getElementById('loading').style.display = 'block';
           // kino_kuzbass.load_today(kino_kuzbass.host_url+"/page121.php");
      // kino_kuzbass.today_active_kino(0);
      // kino_kuzbass.today_pozition=0;
       //document.getElementById('pages').style.display = 'none';
       //kino_kuzbass.current_layer=kino_kuzbass.today_layer;              
       //kino_kuzbass.current_layer=10; //любое число не соответствующее слоям
       document.getElementById('transport_loading').style.display = 'block';
       document.getElementById('transport_pages').style.display = 'none';
       document.getElementById('transport_product').style.display = 'none';
       document.getElementById('transport_up').style.display = 'none';
       document.getElementById('transport_down').style.display = 'none';       
       transport_app.cat_save_level[0] =[0,0,0,''];
       transport_app.cat_select_x =0;
       transport_app.cat_select_y =0;
       transport_app.load_category();
       transport_app.category_page_number = 0;       
       transport_app.current_layer =-1;
       transport_app.cat_level = 0;
       transport_app.show();
       }
    })
    
})();

loader.next();
