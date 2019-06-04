<?php
include("pchart/class/pData.class.php");
include("pchart/class/pDraw.class.php");
include("pchart/class/pImage.class.php");
$myData = new pData();
$currency = ((isset($_GET['currency'])) ? $_GET['currency'] : ((isset($argv[1])) ? $argv[1] : 1));
if ($currency==1) {$VAL_NM_RQ='R01235';  $text='1 Доллара';} //usd
if ($currency==2) {$VAL_NM_RQ='R01239';  $text='1 Евро';} //eur
if ($currency==3) {$VAL_NM_RQ='R01335';  $text='100 Тенге';}  //KZT 100 тенге
if ($currency==4) {$VAL_NM_RQ='R01720';  $text='10 Гривен';}  //UAH 10 гривен
$date_req1= date('d/m/Y', strtotime('-1 week'));
$date_req2= date("d/m/Y");
$cont = file_get_contents("http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=$date_req1&date_req2=$date_req2&VAL_NM_RQ=$VAL_NM_RQ");
$cnt=preg_match_all("#<Record(.*?)</Record>#is", $cont, $matches);
if($cnt != FALSE)
{
 foreach($matches[1] as $data) {
	preg_match("#Date=\"(.*?)\"#", $data, $date);
	preg_match("#<Value>(.*)<\/Value>#", $data, $val);
	$val_c[]=round(str_replace(",",".",$val[1]),2);
	$date_c[]=date("d.m",strtotime($date[1]));
 }
}
$myData->AddPoints($val_c,"val");
$myData->AddPoints($date_c,"Absissa");
$myData->setAbscissa("Absissa");
$myData->setSerieWeight("val",2); 
$serieSettings = array("R"=>242,"G"=>196,"B"=>11);
$myData->setPalette("val",$serieSettings);
$myPicture->Antialias = TRUE; 
$myPicture = new pImage(650,350,$myData,TRUE);
$myPicture->setShadow(TRUE,array("X"=>1,"Y"=>1,"R"=>0,"G"=>0,"B"=>0,"Alpha"=>10)); 
$myPicture->setFontProperties(array("FontName"=>"pchart/fonts/arial.ttf","FontSize"=>16));
$TextSettings = array("Align"=>TEXT_ALIGN_MIDDLEMIDDLE, "R"=>255, "G"=>255, "B"=>255);
$myPicture->drawText(350,25,"Динамика курса $text за неделю",$TextSettings);
$myPicture->setShadow(FALSE);
$myPicture->setGraphArea(60,40,650,315);
$myPicture->setFontProperties(array("R"=>255,"G"=>255,"B"=>255,"FontName"=>"pchart/fonts/verdana.ttf","FontSize"=>14));
$scaleSettings = array("XMargin"=>30,"YMargin"=>15,"Floating"=>TRUE,"GridR"=>200,"GridG"=>200,"GridB"=>200,"CycleBackground"=>TRUE);
$myPicture->drawScale($scaleSettings); 
$myPicture->drawLineChart(array("DisplayValues"=>TRUE,"DisplayR"=>255, "DisplayG"=>255, "DisplayB"=>255)); 
//$myPicture->autoOutput("cbr_img_graph/sd_".$currency.".png");  
$myPicture->Render("cbr_img_graph/sd_".$currency.".png");  
?>