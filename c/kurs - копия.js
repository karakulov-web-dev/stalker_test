(function(){
    
    function kurs_constructor(){
        
     this.layer_name = 'kurs';
     this.dom_obj = this.create_block('layer_bg2');
     this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
     this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';

     document.body.appendChild(this.dom_obj);
        
     this.superclass = BaseLayer.prototype;
 
     this.kurs_date;
     this.usd;
     this.eur;
     this.jpy;
     this.gbp;
     this.raznost_USD;
     this.raznost_EUR;
     this.raznost_JPY;
     this.raznost_GBP;
     this.sign_USD;
     this.sign_EUR;
     this.sign_JPY;
     this.sign_GBP;
     
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
 
      var data = [
{
"date": "19.09.2015",
"usd": "65.645",
"eur": "66.645",
"jpy": "67.645",
"gbp": "68.645",
"raznost_USD": "1",
"raznost_EUR": "2",
"raznost_JPY": "0",
"raznost_GBP": "0",
"sign_USD": "+",
"sign_EUR": "-",
"sign_JPY": "-",
"sign_GBP": "-"
}
];
     
     kurs_date=data[0].date;
     usd=data[0].usd;
     eur=data[0].eur;
     jpy=data[0].jpy;
     gbp=data[0].gbp;
     raznost_USD=data[0].raznost_USD;
     raznost_EUR=data[0].raznost_EUR;
     raznost_JPY=data[0].raznost_JPY;
     raznost_GBP=data[0].raznost_GBP;
     sign_USD=data[0].sign_USD;
     sign_EUR=data[0].sign_EUR;
     sign_JPY=data[0].sign_JPY;
     sign_GBP=data[0].sign_GBP;

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

      var pic_c='', value_c='', sign_c='', raznost_c='',sign_img='';


      if (currency==0) {pic_c='USD'; value_c=usd;raznost_c=raznost_USD;sign_c=sign_USD;}
      if (currency==1) {pic_c='EUR'; value_c=eur;raznost_c=raznost_EUR;sign_c=sign_EUR}
      if (currency==2) {pic_c='JPY'; value_c=jpy;raznost_c=raznost_JPY;sign_c=sign_JPY}
      if (currency==3) {pic_c='GBP'; value_c=gbp;raznost_c=raznost_GBP;sign_c=sign_GBP}
        
      current_kurs.innerHTML='';
      current_kurs.className =pic_c;         
              
 if (sign_c=='+') 
  {
   sign_img='<span class="uarr"><img src="'+'template/'+loader.template+'/i/uarr.png" height="10"></span>';
  } 
   else{
    sign_img='<span class="darr"><img src="'+'template/'+loader.template+'/i/darr.png" height="10"></span>';
  }

     kurs_condition.innerHTML='';
     /*kurs_condition.className =pic_c;*/
     kurs_condition.innerHTML+= '        <span class="text18">Курс ЦБР на '+kurs_date+'</span><br />';
     kurs_condition.innerHTML+= '        <span class="text24">'+value_c+' руб</span><br />';
     /*kurs_condition.innerHTML+= '        <span class="text20">'+raznost_c+'</span>';
     kurs_condition.innerHTML+=  sign_img;*/
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
