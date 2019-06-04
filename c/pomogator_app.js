(function(){
    
  function pomogator_app_constructor(){
        
   this.layer_name = 'pomogator_app';
   this.dom_obj = this.create_block('layer_bg2');
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;
   this.content_url='http://m-sk.ru';
   this.host_url='http://212.77.128.203/apps/pomogator';
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
        _debug('pomogator_app.init');

       var container = create_block_element('pomogator_app', this.dom_obj);
       var pp = '<div id="pom_pages"><div id="pom_up"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/up.png"'+'></div><div id="pom_categories"><div id="pom_cat0"><div id="pom_cat_img0"><img src="http://m-sk.ru/upload/iblock/05f/05f20c8349f7c165e4d841bd56e85976.jpeg"></div><div id="pom_name0">Акции распродажи</div></div><div id="pom_cat1"><div id="pom_cat_img1"><img src="http://m-sk.ru/upload/iblock/211/211c342336db2a273c4fd7e376792a81.jpeg"></div><div id="pom_name1">Животные, растения</div></div><div id="pom_cat2"><div id="pom_cat_img2"><img src="http://m-sk.ru/upload/iblock/2d8/2d89682a82cc64bc2d4fd10f08bda658.jpeg"></div><div id="pom_name2">Здоровье и красота</div></div><div id="pom_cat3"><div id="pom_cat_img3"><img src="http://m-sk.ru/upload/iblock/4c3/4c322ad30d37b549b453d48c22678de1.jpeg"></div><div id="pom_name3">Мебель, интерьер, обиход</div></div><div id="pom_cat4"><div id="pom_cat_img4"><img src="http://m-sk.ru/upload/iblock/172/1726a4f359b3c2a55ded2ee4f23452c5.jpeg"></div><div id="pom_name4">Недвижимость</div></div><div id="pom_cat5"><div id="pom_cat_img5"><img src="http://m-sk.ru/upload/iblock/19a/19adccdf95cddaadd0899747aa90ed82.jpeg"></div><div id="pom_name5">Одежда, обувь, аксессуары</div></div><div id="pom_cat6"><div id="pom_cat_img6"><img src="http://m-sk.ru/upload/iblock/0fb/0fba588ea6768e2418fbac69f2112cd8.jpeg"></div><div id="pom_name6">Работа, образование</div></div><div id="pom_cat7"><div id="pom_cat_img7"><img src="http://m-sk.ru/upload/iblock/ddd/ddd61ae03e3c3368d1251dc775e7569f.jpeg"></div><div id="pom_name7">Разное</div></div><div id="pom_cat8"><div id="pom_cat_img8"><img src="http://m-sk.ru/upload/iblock/ddd/ddd61ae03e3c3368d1251dc775e7569f.jpeg"></div><div id="pom_name8">Строительство и ремонт</div></div><!--<div id="pom_cat9"><div id="pom_cat_img9"><img src="http://m-sk.ru/upload/iblock/ef5/ef59886d48644d99eeeaa7ed1daa59a3.jpeg"></div><div id="pom_name9">Подарки цветы</div></div><div id="pom_cat10"><div id="pom_cat_img10"><img src="http://m-sk.ru/upload/iblock/886/88636f337b594e899f5b43abc6b0e162.jpeg"></div><div id="pom_name10">Акции распродажи</div></div><div id="pom_cat11"><div id="pom_cat_img11"><img src="http://m-sk.ru/upload/iblock/9b0/9b042bbb78e5586bd860d56a288f0e84.jpeg"></div><div id="pom_name11">Личный кабинет</div></div><div id="pom_cat12"><div id="pom_cat_img12"><img src="http://m-sk.ru/upload/iblock/fe7/fe791b11b653e367da12d8c13378636a.jpeg"></div><div id="pom_name12">Недвижимость</div></div><div id="pom_cat13"><div id="pom_cat_img13"><img src="http://m-sk.ru/upload/iblock/16a/16a710bc9dd5a3cf429475a33dd38e25.jpeg"></div><div id="pom_name13">Благотворительность</div></div><div id="pom_cat14"><div id="pom_cat_img14"><img src="http://m-sk.ru/upload/iblock/909/909d65dd884f0d204a3eda8aa1af11f0.jpeg"></div><div id="pom_name14">Услуги, разное</div></div><div id="pom_cat15"><div id="pom_cat_img15"><img src="http://m-sk.ru/upload/iblock/909/909d65dd884f0d204a3eda8aa1af11f0.jpeg"></div><div id="pom_name15">Такси</div></div> --></div><div id="pom_product"><div id="pom_product_img"><img src="http://m-sk.ru/upload/iblock/05f/05f20c8349f7c165e4d841bd56e85976.jpeg"></div><div id="pom_product_name"><div id="pom_product_title"></div></div><div id="pom_product_description"><div id="pom_product_description_title"></div><div id="pom_scroll"><div id="pom_scroll_runner"><img src="http://212.77.128.177/stalker_portal/c/template/default/i/mb_scroll.png"></div><div id="pom_scroll_background"><img src="http://212.77.128.177/stalker_portal/c/template/default/i/mb_scroll_bg.png"></div><div id="pom_scroll_background1"><img src="http://212.77.128.177/stalker_portal/c/template/default/i/mb_scroll_bg.png"></div></div></div></div><div id="pom_down"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/down.png"'+'></div></div><div id="pom_menu"><div id="pom_menu_key0"><div id="pom_menu_key0_img"></div><div id="pom_menu_key0_title"></div></div><div id="pom_menu_key1"><div id="pom_menu_key1_img"></div><div id="pom_menu_key1_title"></div></div><div id="pom_menu_key2"><div id="pom_menu_key2_img"></div><div id="pom_menu_key2_title"></div></div><div id="pom_menu_key3"><div id="pom_menu_key3_img"></div><div id="pom_menu_key3_title"></div></div></div><div id="pom_exit_message"><div id="pom_exit_message_"><div id="pom_exit_message_title"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/ok.png"'+'><span> ВЫХОД&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/back_sd.png"'+'><span> ОТМЕНА </span></div></div></div><div id="pom_message"><img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/ico_alert.png"'+'><div id="pom_message_title"></div></div><div id="pom_loading" style="display:none;">Загрузка...</div><div id="pom_number_page">стр. 1 из 4</div>';
                        container.innerHTML = pp;
     };
        
    this.show = function(){
         _debug('pomogator_app.show');
          this.superclass.show.call(this);

        };
        
        this.hide = function(){
            _debug('pomogator_app.hide');            
            this.superclass.hide.call(this);
            //window.clearInterval(this.reload_timer);
        };

this.load_category = function(){
  _debug('pomogator.load_category');
    url=pomogator_app.host_url+'/categories.php';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
      pomogator_app.category = JSON.parse(xmlhttp.responseText);
        console.log('category= '+pomogator_app.category.sections[0].name);
      pomogator_app.category_total_page=Math.ceil(pomogator_app.category.sections.length/9);
      pomogator_app.current_layer=pomogator_app.category_layer;
      console.log( 'category_total_page='+pomogator_app.category_total_page);      
      pomogator_app.update_category();
      document.getElementById('pom_pages').style.display = 'block';
      document.getElementById('pom_loading').style.display = 'none';      
      }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
};

this.load_section = function(section){
     _debug('pomogator.load_category');
     console.log('section= '+section);
     console.log('url= '+pomogator_app.host_url+'/section_page.php?url='+pomogator_app.content_url+section);
    url=pomogator_app.host_url+'/section_page.php?url='+pomogator_app.content_url+section;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
      console.log('count responseText= '+xmlhttp.responseText.length);
     // console.log('responseText= '+xmlhttp.responseText);
       if (xmlhttp.responseText.length>2)
       {
       js=JSON.parse(xmlhttp.responseText);       
      if (js.section_count!==undefined)
      {
      pomogator_app.category = JSON.parse(xmlhttp.responseText);
      pomogator_app.category_total_page=Math.ceil(pomogator_app.category.sections.length/9);
      console.log('category_total_page='+pomogator_app.category_total_page);
      pomogator_app.category_page_number = 0;
      pomogator_app.cat_select_x =0;
      pomogator_app.cat_select_y =0;      
     // pomogator_app.current_layer=pomogator_app.section_layer;
      pomogator_app.cat_level=pomogator_app.cat_level+1;
      pomogator_app.update_category();
      }
      else
      {
        console.log('no kategory');
        if (js.product!==undefined)
        {
          console.log('js.product.name= '+js.product[0].name); 
          pomogator_app.product = JSON.parse(xmlhttp.responseText);
          pomogator_app.current_layer=pomogator_app.product_layer;
          pomogator_app.update_product();
        }
      }
    }
    else
    {
      console.log('net dannyh');
      pomogator_app.message("Категория не заполнена!!!");
    }
      }      
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
};

this.update_category = function(){
      _debug('pomogator.update_category');
      for (var i = 0; i<9; i++){      
      if (((pomogator_app.category_page_number*9)+i)<pomogator_app.category.sections.length)
      {
      document.getElementById('pom_cat'+i).style.display = 'block';
      document.getElementById('pom_name'+i).innerHTML =pomogator_app.category.sections[(pomogator_app.category_page_number*9)+i].name;
      document.getElementById('pom_cat_img'+i).innerHTML = '<img src="'+pomogator_app.content_url+pomogator_app.category.sections[(pomogator_app.category_page_number*9)+i].pic_src+'">';
      }
      else        
      {
        document.getElementById('pom_cat'+i).style.display = 'none';
      }
    }
    document.getElementById('pom_number_page').style.display = 'block';
    document.getElementById('pom_number_page').innerHTML = "стр. "+(pomogator_app.category_page_number+1)+" из "+pomogator_app.category_total_page;
    document.getElementById('pom_categories').style.display = 'block';
    pomogator_app.scroll_category_update();
    pomogator_app.category_selected_cat();
    pomogator_app.help_panel_update();
}

this.update_product = function(){
      _debug('pomogator.update_product');
      document.getElementById('pom_product_img').innerHTML = '<img src="'+pomogator_app.content_url+pomogator_app.product.product[0].pic_src+'">';
      document.getElementById('pom_product_title').innerHTML = "<span>"+pomogator_app.product.product[0].name+"</span>";      
      document.getElementById('pom_categories').style.display = 'none';
      document.getElementById('pom_product').style.display = 'block';
      document.getElementById('pom_number_page').style.display = 'none';
      document.getElementById("pom_scroll_runner").style.top="7px";
      text="";
      if ((pomogator_app.product.product[0].layout!==null)&&(pomogator_app.product.product[0].layout!=="")) text=text+"Тип: "+pomogator_app.product.product[0].layout+"<br>";
      if ((pomogator_app.product.product[0].district!==null)&&(pomogator_app.product.product[0].district!=="")) text=text+"Район: "+pomogator_app.product.product[0].district+"<br>";
      if ((pomogator_app.product.product[0].security!==null)&&(pomogator_app.product.product[0].security!=="")) text=text+"Охрана: "+pomogator_app.product.product[0].security+"<br>";
      if ((pomogator_app.product.product[0].floors!==null)&&(pomogator_app.product.product[0].floors!=="")) text=text+"Этаж(ей):"+pomogator_app.product.product[0].floors+"<br>";
      if ((pomogator_app.product.product[0].plot!==null)&&(pomogator_app.product.product[0].plot!=="")) text=text+"Участок земли: "+pomogator_app.product.product[0].plot+"<br>";
      if ((pomogator_app.product.product[0].wall_material!==null)&&(pomogator_app.product.product[0].wall_material!=="")) text=text+"Материал стен: "+pomogator_app.product.product[0].wall_material+"<br>";
      if ((pomogator_app.product.product[0].distance!==null)&&(pomogator_app.product.product[0].distance!=="")) text=text+"Расположение: "+pomogator_app.product.product[0].distance+"<br>";
      if ((pomogator_app.product.product[0].address!==null)&&(pomogator_app.product.product[0].address!=="")) text=text+"Адрес: "+pomogator_app.product.product[0].address+"<br>";
      if ((pomogator_app.product.product[0].area!==null)&&(pomogator_app.product.product[0].area!=="")) text=text+"Площадь: "+pomogator_app.product.product[0].area+"<br>";
      if ((pomogator_app.product.product[0].rooms!==null)&&(pomogator_app.product.product[0].rooms!=="")) text=text+"Количество комнат: "+pomogator_app.product.product[0].rooms+"<br>";
      if ((pomogator_app.product.product[0].object_type!==null)&&(pomogator_app.product.product[0].object_type!=="")) text=text+"Тип жилья: "+pomogator_app.product.product[0].object_type+"<br>";
      if ((pomogator_app.product.product[0].price!=="")&&(pomogator_app.product.product[0].price!=="")) text=text+"Цена: "+pomogator_app.product.product[0].price+"<br>";
      if ((pomogator_app.product.product[0].detail_text!==null)&&(pomogator_app.product.product[0].detail_text!=="")) text=text+pomogator_app.product.product[0].detail_text+"<br>";
      document.getElementById('pom_product_description_title').innerHTML = text;
      pomogator_app.help_panel_update();
}

this.scroll_category_update = function(){
      //if (((pomogator_app.category_page_number+1)==pomogator_app.category_total_page)&&(pomogator_app.category_total_page!=1))
        if ((pomogator_app.category_page_number+1)==pomogator_app.category_total_page)
        {
            document.getElementById('pom_down').style.display = 'none';
        }
        else 
        {
            document.getElementById('pom_down').style.display = 'block';
        }
        if ((pomogator_app.category_page_number+1)>1)
        {
            document.getElementById('pom_up').style.display = 'block';
        }
        else
        {
            document.getElementById('pom_up').style.display = 'none';
        }
}

this.category_selected_cat = function(){
        for (var i = 0; i<9; i++){
            if (loader.template=='default') document.getElementById('pom_cat'+i).style.backgroundColor="";
        }
        if (loader.template=='default') document.getElementById('pom_cat'+pomogator_app.cat_select_sd[pomogator_app.cat_select_x][pomogator_app.cat_select_y]).style.backgroundColor="rgb(34, 101, 145)";
}

this.message = function(text){
      document.getElementById('pom_message_title').innerHTML = text;
      document.getElementById('pom_message').style.display = 'block';
      setTimeout("document.getElementById('pom_message').style.display = 'none';", 2000);
}

this.help_panel_update = function(){
      console.log('help_panel_update,  pomogator_app.current_layer='+pomogator_app.current_layer);
      console.log('help_panel_update,  pomogator_app.cat_level='+pomogator_app.cat_level);      
      switch(pomogator_app.current_layer)
      {
      case 1:
      if (pomogator_app.cat_level>0)
      {
        document.getElementById('pom_menu_key0_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/exit.png">';
      document.getElementById('pom_menu_key1_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/back.png">';
      document.getElementById('pom_menu_key2_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/ok.png">';
      document.getElementById('pom_menu_key3_img').innerHTML = '';
      document.getElementById('pom_menu_key0_title').innerHTML = 'Выйти';
      document.getElementById('pom_menu_key1_title').innerHTML = 'Назад';
      document.getElementById('pom_menu_key2_title').innerHTML = 'Выбор';
      document.getElementById('pom_menu_key3_title').innerHTML = '';
      }
      else
      {
      document.getElementById('pom_menu_key0_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/exit.png">';
      document.getElementById('pom_menu_key1_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/ok.png">';
      document.getElementById('pom_menu_key2_img').innerHTML = '';
      document.getElementById('pom_menu_key3_img').innerHTML = '';
      document.getElementById('pom_menu_key0_title').innerHTML = 'Выйти';
      document.getElementById('pom_menu_key1_title').innerHTML = 'Выбор';
      document.getElementById('pom_menu_key2_title').innerHTML = '';
      document.getElementById('pom_menu_key3_title').innerHTML = '';
      }
      break;
      case 3:
      document.getElementById('pom_menu_key0_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/exit.png">';
      document.getElementById('pom_menu_key1_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/back.png">';
      document.getElementById('pom_menu_key2_img').innerHTML = '<img src="/' + stb.portal_path+'/c/template/'+loader.template+'/pomogator_app/ok.png">';
      document.getElementById('pom_menu_key3_img').innerHTML = '';
      document.getElementById('pom_menu_key0_title').innerHTML = 'Выйти';
      document.getElementById('pom_menu_key1_title').innerHTML = 'Назад';
      document.getElementById('pom_menu_key2_title').innerHTML = 'Фото';
      document.getElementById('pom_menu_key3_title').innerHTML = '';
      break;
    }
    document.getElementById('pom_menu').style.display = 'block';
}
  
this.key_press = function(button){
      //if (pomogator_app.current_layer==pomogator_app.category_layer)
       if ((button=="menu")||(button=="exit")) 
        {
          console.log("soobshenie o vyhode");
          button="";
          if (pomogator_app.current_layer!=10)
          {
           pomogator_app.exit_save_level=pomogator_app.current_layer;
           pomogator_app.current_layer=10;
           document.getElementById('pom_exit_message').style.display = 'block';
         }
              
        }
        switch(pomogator_app.current_layer)
      {
      case 1:
      case 2:  
      switch (button) {
      case "left": 
      if (pomogator_app.cat_select_y>0)
      {
      pomogator_app.cat_select_y=pomogator_app.cat_select_y-1;
      pomogator_app.category_selected_cat();
      }
      break;
      case "right":
      if (pomogator_app.cat_select_y<2)
      {
          if ((((pomogator_app.category_page_number*9)+(pomogator_app.cat_select_x*3)+(pomogator_app.cat_select_y+1))+1)<=pomogator_app.category.section_count)
          {
      pomogator_app.cat_select_y=pomogator_app.cat_select_y+1;
      pomogator_app.category_selected_cat();
        }
      }
      break;
      case "up": 
      if (pomogator_app.cat_select_x>0)
      {          
      pomogator_app.cat_select_x=pomogator_app.cat_select_x-1;
      pomogator_app.category_selected_cat();
      }
      else
      {
        if (pomogator_app.category_page_number!=0)
        {
          pomogator_app.category_page_number=pomogator_app.category_page_number-1;
          pomogator_app.cat_select_x=2;
          pomogator_app.update_category();
        }
      }
      break;
      case "down":
      if (pomogator_app.cat_select_x<2)
      {        
          
          if ((((pomogator_app.category_page_number*9)+(pomogator_app.cat_select_x*3)+(pomogator_app.cat_select_y+1))+3)<=pomogator_app.category.section_count)
          {
          console.log('if= '+((((pomogator_app.category_page_number*9)+(pomogator_app.cat_select_x*3)+(pomogator_app.cat_select_y+1))+3)));
          console.log('x= '+ pomogator_app.cat_select_x);
          console.log('category_page_number= '+ pomogator_app.category_page_number);
          pomogator_app.cat_select_x=pomogator_app.cat_select_x+1;
          pomogator_app.category_selected_cat();          
          }
      }
      else
      {
        if (pomogator_app.category_page_number<pomogator_app.category_total_page)
        {
          pomogator_app.category_page_number=pomogator_app.category_page_number+1;
          pomogator_app.cat_select_x=0;
          if (pomogator_app.cat_select_y>0)
          {
          if ((((pomogator_app.category_page_number*9)+(pomogator_app.cat_select_x*3)+(pomogator_app.cat_select_y+1))+3)>pomogator_app.category.section_count)
          { //////////
            if ((pomogator_app.category.section_count-(pomogator_app.category_page_number*9)-1)<=3) 
            {
            pomogator_app.cat_select_y=pomogator_app.category.section_count-(pomogator_app.category_page_number*9)-1;
            console.log('y= '+ pomogator_app.cat_select_y);
          }
          }
          }
          pomogator_app.update_category();
        }
      }
      break;      
      case "ok":
            console.log('OK= '+ pomogator_app.category.sections[((pomogator_app.category_page_number*9)+pomogator_app.cat_select_sd[pomogator_app.cat_select_x][pomogator_app.cat_select_y])].section_page_url);
           // pomogator_app.save_category=pomogator_app.category;
          //  pomogator_app.cat_select_x_save =pomogator_app.cat_select_x;
          //  pomogator_app.cat_select_y_save =pomogator_app.cat_select_y;
          //  pomogator_app.category_page_number_save=pomogator_app.category_page_number;
            pomogator_app.cat_save_level[pomogator_app.cat_level]=[pomogator_app.cat_select_x, pomogator_app.cat_select_y, pomogator_app.category_page_number, pomogator_app.category];
            //pomogator_app.cat_level=pomogator_app.cat_level+1;
            //document.getElementById('pom_product_img').innerHTML = '<img src="'+pomogator_app.content_url+pomogator_app.category.sections[(pomogator_app.category_page_number*9)+pomogator_app.cat_select_sd[pomogator_app.cat_select_x][pomogator_app.cat_select_y]].pic_src+'">';
            pomogator_app.load_section(pomogator_app.category.sections[((pomogator_app.category_page_number*9)+pomogator_app.cat_select_sd[pomogator_app.cat_select_x][pomogator_app.cat_select_y])].section_page_url);
      break;
      case "back":
                if (pomogator_app.cat_level>0)
                {
                pomogator_app.cat_level=pomogator_app.cat_level-1;
                pomogator_app.category=pomogator_app.cat_save_level[pomogator_app.cat_level][3];
                pomogator_app.category_total_page=Math.ceil(pomogator_app.category.sections.length/9);
               // pomogator_app.current_layer=pomogator_app.category_layer;
                pomogator_app.cat_select_x=pomogator_app.cat_save_level[pomogator_app.cat_level][0];
                pomogator_app.cat_select_y=pomogator_app.cat_save_level[pomogator_app.cat_level][1];
                pomogator_app.category_page_number=pomogator_app.cat_save_level[pomogator_app.cat_level][2];
                pomogator_app.update_category();
                }
      break;
}
break;
            case 3:
            switch (button) {
                  case "back":
                  console.log('back product_layer');
                  //pomogator_app.cat_level=pomogator_app.cat_level-1;
                  pomogator_app.current_layer=pomogator_app.category_layer;
                  document.getElementById('pom_categories').style.display = 'block';
                  document.getElementById('pom_product').style.display = 'none';
                  document.getElementById('pom_number_page').style.display = 'block';
                  pomogator_app.help_panel_update();
                  break;

                  case "down":
                  document.getElementById("pom_product_description_title").scrollTop=document.getElementById("pom_product_description_title").scrollTop+20;             
                  document.getElementById("pom_scroll_runner").style.top=(7+Math.floor(((100*document.getElementById("pom_product_description_title").scrollTop)/(document.getElementById("pom_product_description_title").scrollHeight-286))*2.46))+"px";
                  break;
                  case "up":
                  document.getElementById("pom_product_description_title").scrollTop=document.getElementById("pom_product_description_title").scrollTop-20;
                  document.getElementById("pom_scroll_runner").style.top=(7+Math.floor(((100*document.getElementById("pom_product_description_title").scrollTop)/(document.getElementById("pom_product_description_title").scrollHeight-286))*2.46))+"px";
                  break;
            }
            break;
            case 10:
            switch (button) {
                 case "back":
                           pomogator_app.current_layer=pomogator_app.exit_save_level;
                           document.getElementById('pom_exit_message').style.display = 'none';          
                 break;

                 case "ok": 
                            pomogator_app.hide();
                            main_menu.show();
                            document.getElementById('pom_exit_message').style.display = 'none';
                            document.getElementById('pom_menu').style.display = 'none';
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
    
    pomogator_app_constructor.prototype = new BaseLayer();
    var pomogator_app = new pomogator_app_constructor();
    pomogator_app.init();
    pomogator_app.bind();
    pomogator_app.init_header_path('Помогатор');
    pomogator_app.hide();
    module.pomogator_app = pomogator_app;
    
if (stb.GetDeviceMacAddress() == '00:1a:79:1a:87:fa' || stb.GetDeviceMacAddress() == '00:1a:79:03:0f:bd'  || stb.GetDeviceMacAddress() == '00:1a:79:03:ec:e3' || stb.GetDeviceMacAddress() == '00:1a:79:02:9c:be' || stb.GetDeviceMacAddress() == '00:1a:79:1a:5e:d6' || stb.GetDeviceMacAddress() == '00:1a:79:1e:f7:b0' || stb.GetDeviceMacAddress() == '00:1a:79:02:e7:a0' || stb.GetDeviceMacAddress() == '00:1a:79:1a:5e:d1')
        {

    if (!module.infoportal_sub){
        module.infoportal_sub = [];
    }
    
    module.infoportal_sub.push({
        "title" : 'Помогатор',
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
       document.getElementById('pom_loading').style.display = 'block';
       document.getElementById('pom_pages').style.display = 'none';
       document.getElementById('pom_product').style.display = 'none';
       document.getElementById('pom_up').style.display = 'none';
       document.getElementById('pom_down').style.display = 'none';       
       pomogator_app.cat_save_level[0] =[0,0,0,''];
       pomogator_app.cat_select_x =0;
       pomogator_app.cat_select_y =0;
       pomogator_app.load_category();
       pomogator_app.category_page_number = 0;       
       pomogator_app.current_layer =-1;
       pomogator_app.cat_level = 0;
       pomogator_app.show();
      }
        });
        loader.next();
  }
  else
  { 
  loader.next();
        return;
        }

}) ();
