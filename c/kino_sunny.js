(function(){
    
  function kino_kuzbass_constructor(){
        
   this.layer_name = 'kino_kuzbass';
   this.dom_obj = this.create_block('layer_bg2');
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;
   
   this.host_url='http://kuzbass-stb.m-sk.ru';
   this.trailer_url='http://212.77.128.233/trailers/';
   this.today;
   this.today_save;
   this.shedule; 
   this.kino_active;
   this.today_pozition;
   this.current_layer;
   this.today_layer = 1;
   this.schedule_layer = 2;
   this.plan_layer = 3;
   this.future_layer = 4;
   this.detail_visible = 0;
           
   this.init = function(){
        _debug('kino_kuzbass.init');

       var container = create_block_element('kino_kuzbass', this.dom_obj);
       var pp = '<div id="pages"><div id="header">СЕГОДНЯ В КИНО: 5 ФИЛЬМОВ</div><div id="today"><div id="left"></div><div id="kino0"><div id="kino_data0"></div><div id="kino_img0"></div><div id="genre0"></div><div id="name0"></div></div><div id="kino1"><div id="kino_data1"></div><div id="kino_img1"></div><div id="genre1"></div><div id="name1"></div></div><div id="kino2"><div id="kino_data2"></div><div id="kino_img2"></div><div id="genre2"></div><div id="name2"></div></div><div id="right"></div><div id="key_info_today"></div></div><div id="schedule" style="display:none;"><div id="info_blok"></div><div id="scrol"><div id="scrol_now"></div></div></div></div><div id="menu"><div></div><div id="img_red"></div><div id="red"> СЕГОДНЯ В КИНО</div><div id="img_green"></div><div id="green"> РАСПИСАНИЕ / ЦЕНЫ</div><div id="img_yelow"></div><div id="yelow"> ПЛАНЫ ЗАЛОВ</div><div id="img_blue"></div><div id="blue"> СКОРО В КИНО</div></div><div id="ad" style="display:none;"><div id="ad_ad"></div></div><div id="ad1" style="display:none;"><div id="ad_ad1"></div></div><div id="detail" style="display:none;"></div><div id="loading">Загрузка...</div>';
          container.innerHTML = pp;

     };
        
    this.show = function(){
         _debug('kino_kuzbass.show');
          this.superclass.show.call(this);
////       this.load_today(kino_kuzbass.host_url+"/page121_test.php");
////       this.today_active_kino(0);
////       kino_kuzbass.current_layer=kino_kuzbass.today_layer;       
       src="/" + stb.portal_path+"/c/template/"+loader.template+"/i"+resolution_prefix+"/mb_scroll.png";       
       document.getElementById('scrol_now').innerHTML = '<img src="'+src+'">';        
       document.getElementById('detail').style.display = 'none'; 
       kino_kuzbass.detail_visible=0;
     //  kino_kuzbass.reclame_load();
     //  kino_kuzbass.reclame_load1();
        };
        
        this.hide = function(){
            _debug('kino_kuzbass.hide');            
            this.superclass.hide.call(this);
            //window.clearInterval(this.reload_timer);
        };
       
this.today_update = function(pozition){
  _debug('kino_kuzbass.today_update');
     if (pozition==null) pozition=0;
     if (kino_kuzbass.today.length>0)
     { 
     document.getElementById('kino0').style.display = 'block';
     if (resolution_prefix=='_720') 
     {
        //console.log('big_logo[0]= '+kino_kuzbass.today[pozition].big_logo.substr(40, kino_kuzbass.today[pozition].big_logo.length));
        img_url='http://kuzbass.mezhdu.net/datas/users/img.php?img='+kino_kuzbass.today[pozition].big_logo.substr(40, kino_kuzbass.today[pozition].big_logo.length);
        document.getElementById('kino_img0').innerHTML = '<img src="'+img_url+'">';
     }
     else
     {
     document.getElementById('kino_img0').innerHTML = '<img src="'+kino_kuzbass.today[pozition].logo+'">';
      }
     document.getElementById('name0').innerHTML = kino_kuzbass.today[pozition].name;
     document.getElementById('genre0').innerHTML = kino_kuzbass.today[pozition].genre;
     document.getElementById('kino_data0').innerHTML = kino_kuzbass.today[pozition].date;
      }
      else
    {
      document.getElementById('kino0').style.display = 'none';
    }
    
    if (kino_kuzbass.today.length>1)
    {  
     document.getElementById('kino1').style.display = 'block';
     if (resolution_prefix=='_720') 
     {
        img_url1='http://kuzbass.mezhdu.net/datas/users/img.php?img='+kino_kuzbass.today[pozition+1].big_logo.substr(40, kino_kuzbass.today[pozition+1].big_logo.length);
        document.getElementById('kino_img1').innerHTML = '<img src="'+img_url1+'">';
     }
     else
     {
     document.getElementById('kino_img1').innerHTML = '<img src="'+kino_kuzbass.today[pozition+1].logo+'">';
    }
     document.getElementById('name1').innerHTML = kino_kuzbass.today[pozition+1].name;
     document.getElementById('genre1').innerHTML = kino_kuzbass.today[pozition+1].genre;
     document.getElementById('kino_data1').innerHTML = kino_kuzbass.today[pozition+1].date;     
   }
   else
   {
      document.getElementById('kino1').style.display = 'none';
   }

    if (kino_kuzbass.today.length>2)
    {  
     document.getElementById('kino2').style.display = 'block';
     if (resolution_prefix=='_720') 
     {
        img_url2='http://kuzbass.mezhdu.net/datas/users/img.php?img='+kino_kuzbass.today[pozition+2].big_logo.substr(40, kino_kuzbass.today[pozition+2].big_logo.length);
        document.getElementById('kino_img2').innerHTML = '<img src="'+img_url2+'">';
     }
     else
     {
     document.getElementById('kino_img2').innerHTML = '<img src="'+kino_kuzbass.today[pozition+2].logo+'">';
      }
     document.getElementById('name2').innerHTML = kino_kuzbass.today[pozition+2].name;
     document.getElementById('genre2').innerHTML = kino_kuzbass.today[pozition+2].genre;
     document.getElementById('kino_data2').innerHTML = kino_kuzbass.today[pozition+2].date;
     }
     else
     {
        document.getElementById('kino2').style.display = 'none';
     }

   };

this.shedule_update = function(pozition){
  _debug('kino_kuzbass.shedule_update');
  var html_tekst='';
  for (var i = 0; i < kino_kuzbass.shedule.length; i++){
    html_tekst=html_tekst+'<span class="shedule_date"><b>'+kino_kuzbass.shedule[i].date+'</b></span><br><br>';
//    html_tekst='<span style="text-transform:uppercase;">'+html_tekst+kino_kuzbass.shedule[i].date+'</span><br><br>';
    html_tekst=html_tekst+'<u>БОЛЬШОЙ ЗАЛ</u><br>'
    for (var j = 0; j < kino_kuzbass.shedule[i].big_hall.length; j++){
    html_tekst=html_tekst+kino_kuzbass.shedule[i].big_hall[j]+'<br>';
  }    
    html_tekst=html_tekst+'<br><u>МАЛЫЙ ЗАЛ</u><br>'
    for (var k = 0; k < kino_kuzbass.shedule[i].small_hall.length; k++){
    html_tekst=html_tekst+kino_kuzbass.shedule[i].small_hall[k]+'<br>';
  }
  html_tekst=html_tekst+'<br>';
}
document.getElementById('info_blok').innerHTML = html_tekst;
}

this.load_today = function(url){
  _debug('kino_kuzbass.load_today');
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
      kino_kuzbass.today_save = JSON.parse(xmlhttp.responseText);
       // console.log('this.today= '+this.today[0].name);
       //console.log( 'this.name='+this);
       //kino_kuzbass.today_update(0);
       //kino_kuzbass.kino_active=0;
       //console.log("kino_kuzbass.today.length="+kino_kuzbass.today.length);
       kino_kuzbass.current_layer=kino_kuzbass.today_layer;
       kino_kuzbass.choice_of_menus("red");
       document.getElementById('loading').style.display = 'none';
       document.getElementById('pages').style.display = 'block';
       kino_kuzbass.load_shedule(kino_kuzbass.host_url+"/page24.php");
       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
};

this.load_shedule = function(url){
    _debug('kino_kuzbass.load_shedule');
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        kino_kuzbass.shedule = JSON.parse(xmlhttp.responseText);
       // console.log('this.today= '+this.today[0].name);
       //console.log( 'this.name='+this);
       //kino_kuzbass.today_update(0);
       //kino_kuzbass.kino_active=0;
       kino_kuzbass.load_soon(kino_kuzbass.host_url+"/page122.php");
       //console.log("kino_kuzbass.shedule.length="+kino_kuzbass.shedule.length);       
       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
}

this.load_soon = function(url){
    _debug('kino_kuzbass.load_soon');
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        kino_kuzbass.soon = JSON.parse(xmlhttp.responseText);
       // console.log('this.today= '+this.today[0].name);
       //console.log( 'this.name='+this);
       //kino_kuzbass.today_update(0);
       //kino_kuzbass.kino_active=0;              
       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
}

this.today_active_kino = function(pozition){
  _debug('kino_kuzbass.today_active_kino');
      if (pozition==0) 
      {
        //document.getElementById('kino0').style.backgroundColor="rgba(0, 170, 238, 0.3)";
        if (loader.template=='default') document.getElementById('kino0').style.backgroundColor="rgb(34, 101, 145)";
        if (loader.template=='digital') document.getElementById('kino0').style.backgroundColor="rgb(128, 128, 128)";
        if (loader.template=='cappuccino') document.getElementById('kino0').style.backgroundColor="rgb(175, 70, 0)";
        if (loader.template=='emerald') document.getElementById('kino0').style.backgroundColor="rgb(0, 107, 10)";
        if (loader.template=='ocean_blue') document.getElementById('kino0').style.backgroundColor="rgb(0, 140, 205)";
        document.getElementById('kino0').style.zIndex="1";
        document.getElementById('kino1').style.backgroundColor="";
        document.getElementById('kino1').style.zIndex="0";
        document.getElementById('kino2').style.backgroundColor="";
        document.getElementById('kino2').style.zIndex="0";
        if (stb.RDir('gmode')==720)
        {
        document.getElementById('name0').style.width = "152px";
        document.getElementById('name1').style.width = "135px";
        document.getElementById('name2').style.width = "135px";
        document.getElementById('name0').style.left = "2px";
        document.getElementById('name1').style.left = "14px";
        document.getElementById('name2').style.left = "14px";
        }
      }
      if (pozition==1) 
      {
        document.getElementById('kino0').style.backgroundColor="";
        document.getElementById('kino0').style.zIndex="0";
        //document.getElementById('kino1').style.backgroundColor="rgba(0, 170, 238, 0.6)";
        if (loader.template=='default') document.getElementById('kino1').style.backgroundColor="rgb(34, 101, 145)";
        if (loader.template=='digital') document.getElementById('kino1').style.backgroundColor="rgb(128, 128, 128)";
        if (loader.template=='cappuccino') document.getElementById('kino1').style.backgroundColor="rgb(175, 70, 0)";
        if (loader.template=='emerald') document.getElementById('kino1').style.backgroundColor="rgb(0, 107, 10)";
        if (loader.template=='ocean_blue') document.getElementById('kino1').style.backgroundColor="rgb(0, 140, 205)";
        document.getElementById('kino1').style.zIndex="1";
        document.getElementById('kino2').style.backgroundColor='';
        document.getElementById('kino2').style.zIndex="0";
        if (stb.RDir('gmode')==720)
        {
        document.getElementById('name0').style.width = "135px";
        document.getElementById('name1').style.width = "152px";
        document.getElementById('name2').style.width = "135px";
        document.getElementById('name0').style.left = "14px";
        document.getElementById('name1').style.left = "2px";
        document.getElementById('name2').style.left = "14px";
        }
      }
      if (pozition==2) 
      {
        document.getElementById('kino0').style.backgroundColor="";
        document.getElementById('kino0').style.zIndex="0";
        document.getElementById('kino1').style.backgroundColor="";
        document.getElementById('kino1').style.zIndex="0";        
        if (loader.template=='default') document.getElementById('kino2').style.backgroundColor="rgb(34, 101, 145)";
        if (loader.template=='digital') document.getElementById('kino2').style.backgroundColor="rgb(128, 128, 128)";
        if (loader.template=='cappuccino') document.getElementById('kino2').style.backgroundColor="rgb(175, 70, 0)";
        if (loader.template=='emerald') document.getElementById('kino2').style.backgroundColor="rgb(0, 107, 10)";
        if (loader.template=='ocean_blue') document.getElementById('kino2').style.backgroundColor="rgb(0, 140, 205)";
        document.getElementById('kino2').style.zIndex="1";
        if (stb.RDir('gmode')==720)
        {
        document.getElementById('name0').style.width = "135px";
        document.getElementById('name1').style.width = "135px";
        document.getElementById('name2').style.width = "152px";
        document.getElementById('name0').style.left = "14px";
        document.getElementById('name1').style.left = "14px";
        document.getElementById('name2').style.left = "2px";
       }
      }

};

this.choice_of_menus = function(color){
  _debug('kino_kuzbass.choice_of_menus');
  document.getElementById('menu').style.display = 'block';
  document.getElementById('pages').style.display = 'block';
   document.getElementById('detail').style.display = 'none';
   document.getElementById('key_info_today').style.display = 'block';
   document.getElementById('detail').style.top = "20px";
   if (resolution_prefix=='_720') document.getElementById('detail').style.left = '0px';
   //document.getElementById('ad').style.display = 'block';
   kino_kuzbass.reclame_load(); 
        switch (color) {
  case "red":
        //console.log('this.choice_of_menus("red")');
        kino_kuzbass.today=kino_kuzbass.today_save;
        console.log('----------------**************** choice_of_menus 1')
        kino_kuzbass.kino_active=0;
        kino_kuzbass.today_pozition=0;
        kino_kuzbass.today_active_kino(0);
        kino_kuzbass.today_update(0);
        kino_kuzbass.current_layer=kino_kuzbass.today_layer;
        document.getElementById('today').style.display = 'block';
        document.getElementById('schedule').style.display = 'none';
        if (kino_kuzbass.today.length>4) 
        {
          okonchnie=" ФИЛЬМОВ";
        }
        else
          if ((kino_kuzbass.today.length<5)&&(kino_kuzbass.today.length>1))
          {
          okonchnie=" ФИЛЬМА";
          }
          else
          {
            okonchnie=" ФИЛЬМ";
          }
          document.getElementById('header').innerHTML ="СЕГОДНЯ В КИНО:  "+kino_kuzbass.today.length+okonchnie;
            if (kino_kuzbass.today_pozition<(kino_kuzbass.today.length-3))
            {
              document.getElementById('right').style.display = 'block';
            }
            document.getElementById('left').style.display = 'none';
            document.getElementById('red').style.color='white';
            document.getElementById('green').style.color='gray';
            document.getElementById('yelow').style.color='gray';
            document.getElementById('blue').style.color='gray';
            document.getElementById('detail').style.display = 'none';
            document.getElementById('key_info_today').innerHTML = 'OK - трейлер &nbsp;&nbsp;&nbsp;&nbsp; INFO - о фильме';
            kino_kuzbass.detail_visible=0;
    break;
  case "green":
        //console.log('this.choice_of_menus("green")');
        document.getElementById('today').style.display = 'none';
        document.getElementById('schedule').style.display = 'block';
        document.getElementById('info_blok').style.display = 'block';
        document.getElementById('header').innerHTML ="РАСПИСАНИЕ СЕАНСОВ - ЦЕНЫ";
        document.getElementById('red').style.color='gray';
        document.getElementById('green').style.color='white';
        document.getElementById('yelow').style.color='gray';
        document.getElementById('blue').style.color='gray';
        kino_kuzbass.current_layer=kino_kuzbass.schedule_layer;
        document.getElementById("info_blok").scrollTop=0;
        kino_kuzbass.shedule_update();
        document.getElementById("scrol_now").style.top="7px";
        document.getElementById('detail').style.display = 'none';
        kino_kuzbass.detail_visible=0;
    break;
  case "yellow":
        //console.log('this.choice_of_menus("yellow")');
        document.getElementById('key_info_today').innerHTML = 'OK - увеличить';
        kino_kuzbass.current_layer=kino_kuzbass.plan_layer;
        document.getElementById('kino0').style.display = 'block';
     document.getElementById('kino_img0').innerHTML = '<img src="'+kino_kuzbass.host_url+'/img/mini_big_hall'+resolution_prefix+'.gif">';
     if (resolution_prefix=='')
     document.getElementById('name0').innerHTML = "БОЛЬШОЙ ЗАЛ (316 МЕСТ)"
 	else
 		document.getElementById('name0').innerHTML = "&nbsp;&nbsp;&nbsp;БОЛЬШОЙ ЗАЛ (316 МЕСТ)";
     document.getElementById('genre0').innerHTML = "";
     document.getElementById('kino_data0').innerHTML = "";
     document.getElementById('kino1').style.display = 'block';
     document.getElementById('kino_img1').innerHTML = '<img src="'+kino_kuzbass.host_url+'/img/mini_small_hall'+resolution_prefix+'.gif">';
     if (resolution_prefix=='')
     document.getElementById('name1').innerHTML = "МАЛЫЙ ЗАЛ (68 МЕСТ)"
    else
     document.getElementById('name1').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;МАЛЫЙ ЗАЛ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(68 МЕСТ)"; 
     document.getElementById('genre1').innerHTML = "";
     document.getElementById('kino_data1').innerHTML = "";
     document.getElementById('kino2').style.display = 'none';
     document.getElementById('header').innerHTML ="ПЛАНЫ ЗАЛОВ";
     document.getElementById('today').style.display = 'block';
     document.getElementById('schedule').style.display = 'none';
     document.getElementById('right').style.display = 'none';
     kino_kuzbass.kino_active=0;
     kino_kuzbass.today_active_kino(0);
     document.getElementById('left').style.display = 'none';
     document.getElementById('red').style.color='gray';
     document.getElementById('green').style.color='gray';
     document.getElementById('yelow').style.color='white';
     document.getElementById('blue').style.color='gray';
     document.getElementById('detail').style.display = 'none';
     kino_kuzbass.detail_visible=0;
    break;
  case "blue":
        //console.log('this.choice_of_menus("blue")');
        kino_kuzbass.today=kino_kuzbass.soon;
        kino_kuzbass.kino_active=0;
        kino_kuzbass.today_pozition=0;
        kino_kuzbass.today_active_kino(0);
        kino_kuzbass.today_update(0);
        kino_kuzbass.current_layer=kino_kuzbass.today_layer;
        document.getElementById('key_info_today').innerHTML = 'OK - трейлер &nbsp;&nbsp;&nbsp;&nbsp; INFO - о фильме';
        document.getElementById('today').style.display = 'block';
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('header').innerHTML ="СКОРО В КИНО";
            if (kino_kuzbass.today_pozition<(kino_kuzbass.today.length-3))
            {
              document.getElementById('right').style.display = 'block';
            }
            document.getElementById('left').style.display = 'none';
            document.getElementById('red').style.color='gray';
            document.getElementById('green').style.color='gray';
            document.getElementById('yelow').style.color='gray';
            document.getElementById('blue').style.color='white';
            document.getElementById('detail').style.display = 'none';
            kino_kuzbass.detail_visible=0;
    break;
}
}
  this.reclame_load = function(){
  _debug('kino_kuzbass.reclame_load');  

 var xmlhttp_r = new XMLHttpRequest();
      //if (stb.RDir('gmode')==720)
		if (resolution_prefix=='_720')
        {
              //var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbass_inc.php';
		var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbasshd_inc.php';
        }
        else
        {
            //var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbasshd_inc.php';
		var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbass_inc.php';
        }
     
      xmlhttp_r.onreadystatechange = function() {
       if (xmlhttp_r.readyState == 4 && xmlhttp_r.status == 200) {
        if (xmlhttp_r.responseText.indexOf("img")>-1)
        {
        document.getElementById('ad_ad').innerHTML = xmlhttp_r.responseText;
        document.getElementById('ad').style.display = 'block';
      }
        else

      {
        document.getElementById('ad').style.display = 'none';
       }
      }
     }
     xmlhttp_r.open("GET", url_r, true);
     xmlhttp_r.send();


 // }
  };

  this.reclame_load1 = function(){
 //   if (module.reklama_gismeteo)
//{

 var xmlhttp_r = new XMLHttpRequest();
      if (stb.RDir('gmode')==720)
        {
              var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbass_inc.php';
        }
        else
        {
            var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbasshd_inc.php';
        }
     
      xmlhttp_r.onreadystatechange = function() {
       if (xmlhttp_r.readyState == 4 && xmlhttp_r.status == 200) {

        document.getElementById('ad_ad1').innerHTML = xmlhttp_r.responseText;
        document.getElementById('ad').style.top = '20px';
        document.getElementById('ad1').style.top = '260px';
        document.getElementById('ad1').style.display = 'block';
       }
     }
     xmlhttp_r.open("GET", url_r, true);
     xmlhttp_r.send();


 // }
  };
     
this.key_press = function(button){
  ////////////////////////////////////////////////////////////
   if (kino_kuzbass.current_layer==kino_kuzbass.today_layer)
   {
   switch (button) {
   case "left":    
     // console.log('press left');
      if (kino_kuzbass.detail_visible==0)
           {
      if ((kino_kuzbass.today_pozition!=0)&&(kino_kuzbass.kino_active==0))
      {
       kino_kuzbass.today_pozition=kino_kuzbass.today_pozition-1; 
       kino_kuzbass.today_update(kino_kuzbass.today_pozition);
     }
      if (kino_kuzbass.kino_active!=0) kino_kuzbass.kino_active=kino_kuzbass.kino_active-1; 
      kino_kuzbass.today_active_kino(kino_kuzbass.kino_active);      
      if ((kino_kuzbass.kino_active==2)&&(kino_kuzbass.today_pozition==(kino_kuzbass.today.length-3))) 
          {
             document.getElementById('right').style.display = 'none';
          }
          else
          {
            if (kino_kuzbass.today_pozition<(kino_kuzbass.today.length-3))
            {
              document.getElementById('right').style.display = 'block';
            }
            else
            {
              document.getElementById('right').style.display = 'none';
            }
          }
      if (kino_kuzbass.today_pozition>0)
      {
          document.getElementById('left').style.display = 'block';
      }
      else
      {
         document.getElementById('left').style.display = 'none';
      }
    }
    break;
  /////////////////////////////////////////////////////////////
   case "right":
      //console.log('press right');
      if (kino_kuzbass.detail_visible==0)
           {
      if ((kino_kuzbass.kino_active!=2)&&(kino_kuzbass.kino_active<=kino_kuzbass.today.length-1))
        {
          kino_kuzbass.kino_active=kino_kuzbass.kino_active+1;
        }
        else 
        { 
          if (kino_kuzbass.today_pozition==null) 
          {
            kino_kuzbass.today_pozition=0;
          }
          if (kino_kuzbass.kino_active<kino_kuzbass.today.length-1)
          {  
          if (kino_kuzbass.today_pozition!=(kino_kuzbass.today.length-3)) kino_kuzbass.today_pozition=kino_kuzbass.today_pozition+1; 
          //console.log("kino_kuzbass.today_pozition="+kino_kuzbass.today_pozition);
        }
          
          kino_kuzbass.today_update(kino_kuzbass.today_pozition); 
        }
      kino_kuzbass.today_active_kino(kino_kuzbass.kino_active);
    if ((kino_kuzbass.kino_active==2)&&(kino_kuzbass.today_pozition==(kino_kuzbass.today.length-3))) 
          {
             document.getElementById('right').style.display = 'none';
          }
          else
          {
            if (kino_kuzbass.today_pozition<(kino_kuzbass.today.length-3))
            {
              document.getElementById('right').style.display = 'block';
            }
            else
            {
              document.getElementById('right').style.display = 'none';
            }
          }
        if (kino_kuzbass.today_pozition>0)
      {
          document.getElementById('left').style.display = 'block';
      }
      else
      {
         document.getElementById('left').style.display = 'none';
      }
    }
    break;
    case "ok":    
        //console.log('press ok');

           if (kino_kuzbass.detail_visible==0)
           {
            var item = {
                "name" : get_word(kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].name+" - Трейлер"),
                "cmd"  : "ffmpeg " + kino_kuzbass.trailer_url+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].youtube+".mp4"
            };

            stb.set_cur_place('demo');

            //main_menu.hide();
            module.kino_kuzbass.hide();
            stb.player.prev_layer = this;
            stb.player.play(item);
            }
            else
            {
                  document.getElementById('detail').style.display = 'none';
                  kino_kuzbass.detail_visible=0;
                  document.getElementById('detail').style.top = "20px";
                  document.getElementById('pages').style.display = 'block';
                  document.getElementById('ad').style.display = 'block';
            }
            break;
    case "info":    
        //console.log('press info');
        if (kino_kuzbass.detail_visible==0)
                {
                    document.getElementById('detail').innerHTML = "<p><span class='detail_class'><i><font color='yellow'>Название:</i></font> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].name+"</b></span></p><p><span class='detail_class'><i><font color='yellow'>Жанр:</font></i> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].genre+"</b></span></p><p><span class='detail_class'><i><font color='yellow'>Страна:</font></i> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].country+"</b></span></p><p><span class='detail_class'><i><font color='yellow'>Режиссер:</font></i> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].director+"</b></span></p><div class='detail_class' id='detail_starring'><i><font color='yellow'>В главных ролях:</font></i> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].starring+"</b></div><p><span class='detail_class'><i><font color='yellow'>Возрастное ограничение:</font></i> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].age_limit+"</b></span></p><div class='detail_class' id='detail_description'><i><font color='yellow'>О фильме:</font></i> <b>"+kino_kuzbass.today[kino_kuzbass.kino_active+kino_kuzbass.today_pozition].description+"</b></div><br><p class='detail_class' align='center'>OK / INFO - выбор фильма</p>";
                    document.getElementById('detail').style.top = "75px";
                    document.getElementById('pages').style.display = 'none';
                    document.getElementById('ad').style.display = 'none';
                    document.getElementById('detail').style.display = 'block';
                    kino_kuzbass.detail_visible=1;
                }
                else
            {
                  document.getElementById('detail').style.display = 'none';
                  kino_kuzbass.detail_visible=0;
                  document.getElementById('detail').style.top = "20px";
                  document.getElementById('pages').style.display = 'block';
                  document.getElementById('ad').style.display = 'block';
            }
    break;
}
}
if (kino_kuzbass.current_layer==kino_kuzbass.schedule_layer)
   {
      switch (button) {
      case "down":
        document.getElementById("info_blok").scrollTop=document.getElementById("info_blok").scrollTop+60;             
        if (resolution_prefix=='')
        document.getElementById("scrol_now").style.top=(7+Math.floor(((100*document.getElementById("info_blok").scrollTop)/(document.getElementById("info_blok").scrollHeight-400))*3.96))+"px"
      else
        document.getElementById("scrol_now").style.top=(7+Math.floor(((100*document.getElementById("info_blok").scrollTop)/(document.getElementById("info_blok").scrollHeight-525))*4.57))+"px";
        break;
      case "up":
        document.getElementById("info_blok").scrollTop=document.getElementById("info_blok").scrollTop-60;
        if (resolution_prefix=='')
        document.getElementById("scrol_now").style.top=(7+Math.floor(((100*document.getElementById("info_blok").scrollTop)/(document.getElementById("info_blok").scrollHeight-400))*3.96))+"px";
        else
        document.getElementById("scrol_now").style.top=(7+Math.floor(((100*document.getElementById("info_blok").scrollTop)/(document.getElementById("info_blok").scrollHeight-525))*4.57))+"px";  
        break;
      }
   }
if (kino_kuzbass.current_layer==kino_kuzbass.plan_layer)
   {
      switch (button) {
          case "right":
                if (kino_kuzbass.detail_visible==0)
                {
                kino_kuzbass.kino_active=1;
                //kino_kuzbass.today_active_kino(1);
                document.getElementById('kino0').style.backgroundColor="";
                document.getElementById('kino0').style.zIndex="0";
                if (loader.template=='default') document.getElementById('kino1').style.backgroundColor="rgb(34, 101, 145)";
                if (loader.template=='digital') document.getElementById('kino1').style.backgroundColor="rgb(128, 128, 128)";
                if (loader.template=='cappuccino') document.getElementById('kino1').style.backgroundColor="rgb(175, 70, 0)";
                if (loader.template=='emerald') document.getElementById('kino1').style.backgroundColor="rgb(0, 107, 10)";
                if (loader.template=='ocean_blue') document.getElementById('kino1').style.backgroundColor="rgb(0, 140, 205)";
                document.getElementById('kino1').style.zIndex="300";
              }
          break;
          case "left":
                if (kino_kuzbass.detail_visible==0)
                {
                kino_kuzbass.kino_active=0;
                kino_kuzbass.today_active_kino(0);                
              }
          break;
          case "ok":
          case "back":        
                if (kino_kuzbass.detail_visible==0)
                {
                if (kino_kuzbass.kino_active==0) 
                  {
                    if (resolution_prefix=='_720') 
                      {
                        //document.getElementById('detail').style.left = '208px';
                        document.getElementById('detail').innerHTML = '<img src="'+kino_kuzbass.host_url+'/img/big_hall'+resolution_prefix+'.gif"><br><span style="color: white; font-size: 25px; margin-left: 300px;">OK / BACK - выбор зала</span>';
                      }
                      else
                      {  
                    document.getElementById('detail').innerHTML = '<img src="'+kino_kuzbass.host_url+'/img/big_hall'+resolution_prefix+'.gif"><span style="color: white;"><p align="center">OK / BACK - выбор зала</p></span>';
                  }
                  }
                if (kino_kuzbass.kino_active==1)
                  if (resolution_prefix=='_720') 
                      {
                          document.getElementById('detail').innerHTML = '<img src="'+kino_kuzbass.host_url+'/img/small_hall'+resolution_prefix+'.gif"><br><span style="color: white; font-size: 25px; margin-left: 300px;">OK / BACK - выбор зала</span>';
                      }
                      else
                      {
                 document.getElementById('detail').innerHTML = '<img src="'+kino_kuzbass.host_url+'/img/small_hall'+resolution_prefix+'.gif"><span style="color: white;"><p align="center">OK / BACK - выбор зала</p></span>';
                }
                document.getElementById('detail').style.display = 'block';
                document.getElementById('detail').style.top = '0px';
                kino_kuzbass.detail_visible=1;
                document.getElementById('key_info_today').style.display = 'none';
              }
              else
              {
                document.getElementById('detail').innerHTML = '';
                document.getElementById('detail').style.display = 'none';
                kino_kuzbass.detail_visible=0;
                document.getElementById('key_info_today').style.display = 'block';
              }
          break;
      }
   }
if (kino_kuzbass.current_layer==kino_kuzbass.future_layer)
   {

   }
if (kino_kuzbass.current_layer<5)
{
if (button=="red") kino_kuzbass.choice_of_menus("red");
if (button=="green") kino_kuzbass.choice_of_menus("green");
if (button=="yellow") kino_kuzbass.choice_of_menus("yellow");
if (button=="blue") kino_kuzbass.choice_of_menus("blue");
}
}
        
  this.bind = function(){
            (function(){
                this.hide();
            //    this.tab_click(0);
                main_menu.show();
            }).bind(key.EXIT, this).bind(key.MENU, this);
            this.key_press.bind(key.LEFT, this, 'left');
            this.key_press.bind(key.RIGHT, this, 'right');
            this.key_press.bind(key.OK, this, 'ok');
            this.key_press.bind(key.RED, this, 'red');
            this.key_press.bind(key.GREEN, this, 'green');
            this.key_press.bind(key.YELLOW, this, 'yellow');
            this.key_press.bind(key.BLUE, this, 'blue');
            this.key_press.bind(key.DOWN, this, 'down');
            this.key_press.bind(key.UP, this, 'up');
            this.key_press.bind(key.BACK, this, 'back');
            this.key_press.bind(key.INFO, this, 'info');
        };
    }
    
    kino_kuzbass_constructor.prototype = new BaseLayer();
    var kino_kuzbass = new kino_kuzbass_constructor();
    kino_kuzbass.init();
    kino_kuzbass.bind();
    kino_kuzbass.init_header_path('Кинотеатр солнечный');
    kino_kuzbass.hide();
    module.kino_kuzbass = kino_kuzbass;
    
    if (!module.my_city_sub){
        module.my_city_sub = [];
    }
    
    module.my_city_sub.push({
        "title" : 'Кинотеатр "солнечный"',
        "cmd"   : function(){
            main_menu.hide();
            //module.kino_kuzbass.show();
            //document.getElementById('loading').innerHTML = "Загрузка...";
            document.getElementById('ad').style.display = 'none';
            document.getElementById('ad1').style.display = 'none';
            document.getElementById('menu').style.display = 'none';
            document.getElementById('loading').style.display = 'block';
           kino_kuzbass.load_today("http://212.77.128.177/karakulov/sunny/today.php");
       kino_kuzbass.today_active_kino(0);
       kino_kuzbass.today_pozition=0;
       document.getElementById('pages').style.display = 'none';
       //kino_kuzbass.current_layer=kino_kuzbass.today_layer;              
       kino_kuzbass.current_layer=10; //любое число не соответствующее слоям       
           kino_kuzbass.show();
       }
    })
    
})();

loader.next();
