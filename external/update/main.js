//var firmware = 'http://212.77.128.178/stb-upd/215/2.18-r19/250/imageupdate';
//var firmware = 'http://212.77.128.178/stb-upd/215/2.18-r19/254/imageupdate';
//var firmware = 'http://212.77.128.178/stb-upd/215/322/imageupdate';
var firmware = '';
switch (gSTB.GetDeviceModel()) {
                case "MAG250":
                        firmware = 'http://212.77.128.178/stb-upd/215/2.18-r19/250/imageupdate';
                break;

                case "MAG254":
                        firmware = 'http://212.77.128.178/stb-upd/215/2.18-r19/254/imageupdate';
                break;
                case "MAG322":
                        firmware = 'http://212.77.128.178/stb-upd/215/322/imageupdate';
                break;
                default:
                      setTimeout('message("Для вашей приставки<br>отсутствует файл обновления.<br>Переход в КЛИК-ТВ.<br>Пожалуйста, подождите...")',1000);
        }


var sost = {   "0":"Не определено", 
               "1":"Ошибка инициализации крипто библиотеки", //(конечное состояние ошибки)
               "2":"Неправильная модель устройства", //Ошибка
               "3":"Размер NAND слишком мал для размещения", //Ошибка
               "4":"Необходимый раздел NAND не найден", //Ошибка
               "5":"Обновление ядра",
               "6":"Обновление образа",
               "7":"Внутренняя ошибка", // (конечное состояние ошибки)
               "8":"Анализ прошивки",
               "9":"Обновление переменных среды",
               "10":"Обновление bootstrap",
               "11":"Обновление bootstrap",
               "12":"Обновление файловой системы пользователя",
               "13":"Обновление файловой системы пользователя",
               "14":"Обновление второго загрузчика",
               "15":"Обновление логотипа",
               "16":"Обновление завершено",
               "17":"Неправильная сигнатура", // (конечное состояние ошибки)
               "18":"Подготовка NAND для записи",
               "19":"Ошибка записи в NAND", //  (конечное состояние ошибки)
               "20":"Ошибка записи в файл", // (конечное состояние ошибки) 
               "21":" ", //Свободен (конечное состояние нормальное завершение)
               "22":"Неправильный заголовок файла", //Ошибка
               "23":"Анализ версии файла обновления",
               "24":"Проверка файла завершена",
               "25":"Файл не найден", // (конечное состояние ошибки)
               "26":"Подготовка к выполнению операции",
               "27":"Ошибка чтения" //(конечное состояние ошибки)
       };

function onLoad() {
        gSTB.EnableAppButton(false);
        gSTB.EnableServiceButton(false);
        if (firmware!='')
                {
                        document.getElementById("current_version_").innerHTML=gSTB.RDir("ImageVersion");
                        document.getElementById("description_").innerHTML=gSTB.RDir("ImageDescription");
                        document.getElementById("date_").innerHTML=gSTB.RDir("ImageDate");
                        document.getElementById("update_page").style.display='block';
                        setTimeout("timerHandler()", 1000);
                        stbUpdate.startCheck(firmware);
                        setTimeout("upgrade()", 8000);
                }
}

function timerHandler() {
        switch (stbUpdate.getStatus()) {
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 18:
                case 21:
                case 23:
                case 24:
                case 26:
                        document.getElementById("current_version1_").innerHTML=stbUpdate.getImageVersionStr();
                        document.getElementById("description1_").innerHTML=stbUpdate.getImageDescStr();
                        document.getElementById("date1_").innerHTML=stbUpdate.getImageDateStr();
                        document.getElementById("current_version1").style.display='block';
                        document.getElementById("description1").style.display='block';
                        document.getElementById("date1").style.display='block';
                        if ((stbUpdate.getStatus()==21)&&(stbUpdate.getPercents()==100))
                                {
                                       document.getElementById("update_status_").innerHTML='Обновление завершено. Перезагрузка.';         
                                }
                                else
                                {
                                        document.getElementById("update_status_").innerHTML=sost[stbUpdate.getStatus()];                     
                                }
                        document.getElementById("percent_progress").innerHTML=stbUpdate.getPercents() + "%";
                        document.getElementById("progress").value=stbUpdate.getPercents();
                        setTimeout("timerHandler()", 1000);
                break;
                case -1:
                case 1:
                case 2:
                case 3:
                case 4:
                case 7:
                case 17:
                case 19:
                case 20:
                case 22:
                case 25:
                case 27:
                        console.log("Update status "+stbUpdate.getStatus());
                        if ((stbUpdate.getStatus()!=-1)&&(stbUpdate.getStatus()!=''))
                                {
                                                document.getElementById("update_status_").innerHTML=sost[stbUpdate.getStatus()];
                                                //document.getElementById("update_status_").innerHTML=sost[3];       
                                }
                                else
                                {
                        if (stbUpdate.getStatus()==-1)
                                {
                                                document.getElementById("update_status_").innerHTML=sost[0];
                                }
                                }
                        document.getElementById("progress").style.display='none';
                        document.getElementById("percent_progress").style.display='none';
                        setTimeout('message("Обновление завершилось неудачей.<br>Ошибка: "+sost[stbUpdate.getStatus()]+"<br>Переход в КЛИК-ТВ.<br>Пожалуйста, подождите...")', 5000);
                        //setTimeout('message("Обновление завершилось неудачей.<br>Ошибка: "+sost[1]+"<br>Переход в КЛИК-ТВ.<br>Пожалуйста, подождите...")', 4000);
                break;
                }

}

function upgrade() {
        var activeBank = (stbUpdate.getActiveBank()) ? 0 : 1;
        stbUpdate.startUpdate(activeBank, firmware);
        document.getElementById("update_status").style.display='block';
        document.getElementById("update_status_").style.display='block';
        document.getElementById("progress").style.display='block';
        document.getElementById("percent_progress").style.display='block';
        if ((gSTB.GetDeviceModel()=="MAG250")||(gSTB.GetDeviceModel()=="MAG254")) document.getElementById("back_progress").style.display='block';
}

function stalker_loading() {
       window.location = 'http://212.77.128.205/stalker_portal/c/index.html'; 
}

function message(text)
{
        document.getElementById('text').innerHTML = text;        
        document.getElementById('message').style.display = "block";
        document.getElementById("update_page").style.display='none';
        setTimeout("stalker_loading()", 8000);
}
