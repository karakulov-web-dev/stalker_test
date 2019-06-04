(function(){
    
  function kurs_constructor(){
        
   this.layer_name = 'kurs';
   this.dom_obj = this.create_block('layer_bg2');
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';

   document.body.appendChild(this.dom_obj);
        
   this.superclass = BaseLayer.prototype;
 
   this.kurs_date;
   this.USD;
   this.EUR;
   this.KZT;
   this.UAH;
     
   this.tabActive;
   this.tabs;
   this.tabs_data;
   this.current_kurs;
   this.kurs_condition;
     
   this.init = function(){
       var container = create_block_element('kurs', this.dom_obj);
       var pp = '<div id="kurs_condition" align="right"></div>';
           pp += '<div id="tabs"><a href="#tabs-4">Доллар</a><a href="#tabs-5">Евро</a><a href="#tabs-6">Тенге</a><a href="#tabs-7">Гривна</a></div><div id="tabs_data"> <div id="tabs-4"></div><div id="tabs-5"></div><div id="tabs-6"></div><div id="tabs-7"></div></div>';
           pp += '<div id="current_kurs"></div>';
       container.innerHTML = pp;
       this.loaddata(); 
    };
    
   this.tab_click = function(x){
	if(x > -1 && x < tabs.length && x < tabs_data.length){
		tabs[tabActive].setAttribute('class','');
        tabs_data[tabActive].style.display='none';
		tabActive=x;
		tabs[tabActive].setAttribute('class','active');
        tabs_data[tabActive].style.display='block';
	} return false;
      };
 
   this.loaddata = function(){    
      tabActive = 1;
      tabs = document.getElementById('tabs').getElementsByTagName('A');
      tabs_data = document.getElementById('tabs_data').getElementsByTagName('div');
      current_kurs = document.getElementById('current_kurs');
      kurs_condition = document.getElementById('kurs_condition');

      var xmlhttp = new XMLHttpRequest();
      var url = "http://212.77.128.205/stalker_portal/tools/stb_mag_cbr_widget2.php";

      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);     
        kurs_date=myArr[0].date;
        USD=myArr[0].usd;
        EUR=myArr[0].eur;
        KZT=myArr[0].kzt;
        UAH=myArr[0].uah;
       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
   };      
        
   this.show = function(){
         _debug('kurs.show');
         this.loaddata();
         this.superclass.show.call(this);
         this.load(0);
         this.tab_click(0);     
        };
        
   this.hide = function(){
            _debug('kurs.hide');
            this.superclass.hide.call(this);
        };
        
   this.load = function(currency){
      _debug('kurs.load, dir='+currency);

     var pic_c='', value_c='';
     if (currency==0) {pic_c='USD'; value_c=USD;}
     if (currency==1) {pic_c='EUR'; value_c=EUR;}
     if (currency==2) {pic_c='KZT'; value_c=KZT;}
     if (currency==3) {pic_c='UAH'; value_c=UAH;}
     current_kurs.innerHTML='';
     current_kurs.className =pic_c;         
     kurs_condition.innerHTML= '<span class="text28">Курс ЦБР на '+kurs_date+'</span><br>';
     kurs_condition.innerHTML+= '<span class="text36">'+value_c+' руб</span>';
   };
        
   this.press_kurs_select = function(button){
      var direction = null;
       switch(button){
           case "right":
              direction = 1;
           break;
           case "left":
              direction = - 1;
           break;
       }
      if (direction != null) {
  	   this.tab_click(tabActive+direction);
          }
      this.load(tabActive);
   };
        
  this.bind = function(){
            (function(){
                this.hide();
                this.tab_click(0);
                main_menu.show();
            }).bind(key.EXIT, this).bind(key.MENU, this);
            this.press_kurs_select.bind(key.LEFT, this, 'left');
            this.press_kurs_select.bind(key.RIGHT, this, 'right');
        };
    }
    
  kurs_constructor.prototype = new BaseLayer();
    var kurs = new kurs_constructor();
    kurs.init();
    kurs.bind();
    kurs.init_header_path('КУРС ВАЛЮТ');
    kurs.hide();
    module.kurs = kurs;
    
    if (!module.infoportal_sub){
        module.infoportal_sub = [];
    }
    
    module.infoportal_sub.push({
        "title" : 'Курс валют',
        "cmd"   : function(){
            main_menu.hide();
            module.kurs.show();
        }
    })
    
})();

loader.next();
