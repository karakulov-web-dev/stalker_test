<?php
$today=date("d/m/Y");
//$currency=$_GET[currency];
$cont = file_get_contents("http://www.cbr.ru/scripts/XML_daily.asp?date_req=$today");

$pattern = "/<CharCode>(.*?)<\/CharCode>\s*<Nominal>(.*?)<\/Nominal>\s*<Name>(.*?)<\/Name>\s*<Value>(.*?)<\/Value>/im";
$cnt = preg_match_all($pattern,$cont,$matches);

preg_match('/(\d{2}).(\d{2}).(\d{4})/',$cont,$date_parts);
$date=str_replace("/",".",$date_parts[0]);

if($cnt != FALSE)
{
$count_currencies = count($matches[1]);
for($i=0;$i<$count_currencies;$i++)
{
$curr_abbr_today = $matches[1][$i];
//$curr_nominal = $matches[2][$i];
//$curr_name = $matches[3][$i];
$curr_value_today = $matches[4][$i];
if ($curr_abbr_today=='USD'){$curr_abbr_today_2[1]=str_replace(",",".",$curr_value_today);}
if ($curr_abbr_today=='EUR'){$curr_abbr_today_2[2]=str_replace(",",".",$curr_value_today);}
if ($curr_abbr_today=='KZT'){$curr_abbr_today_2[3]=str_replace(",",".",$curr_value_today);}
if ($curr_abbr_today=='UAH'){$curr_abbr_today_2[4]=str_replace(",",".",$curr_value_today);}
} 
}

/*
$data_vcher = date("d/m/Y", time() - 86400);
$cont = file_get_contents("http://www.cbr.ru/scripts/XML_daily.asp?date_req=$data_vcher");
$pattern = "/<CharCode>(.*?)<\/CharCode>\s*<Nominal>(.*)<\/Nominal>\s*<Name>(.*)<\/Name>\s*<Value>(.*)<\/Value>/im";
$cnt = preg_match_all($pattern,$cont,$matches);
if($cnt != FALSE)
{
$count_currencies = count($matches[1]);
for($i=0;$i<$count_currencies;$i++)
{
$curr_abbr_vcher = $matches[1][$i];
//$curr_nominal = $matches[2][$i];
//$curr_name = $matches[3][$i];
$curr_value_vcher = $matches[4][$i];
if ($curr_abbr_vcher=='USD'){$curr_abbr_vcher_2[1]=str_replace(",",".",$curr_value_vcher);}
if ($curr_abbr_vcher=='EUR'){$curr_abbr_vcher_2[2]=str_replace(",",".",$curr_value_vcher);}
if ($curr_abbr_vcher=='JPY'){$curr_abbr_vcher_2[3]=str_replace(",",".",$curr_value_vcher);}
if ($curr_abbr_vcher=='GBP'){$curr_abbr_vcher_2[4]=str_replace(",",".",$curr_value_vcher);}
} 
}

$raznost_USD=round($curr_abbr_today_2[1]-$curr_abbr_vcher_2[1],3);
if ($raznost_USD>0) {$sign_USD="+";} else  {$sign_USD="-";}

$raznost_EUR=round($curr_abbr_today_2[2]-$curr_abbr_vcher_2[2],3);
if ($raznost_EUR>0){$sign_EUR="+";} else {$sign_EUR="-";} 

$raznost_JPY=round($curr_abbr_today_2[3]-$curr_abbr_vcher_2[3],3);
if ($raznost_JPY>0) {$sign_JPY="+";} else  {$sign_JPY="-";}

$raznost_GBP=round($curr_abbr_today_2[4]-$curr_abbr_vcher_2[4],3);
if ($raznost_GBP>0) {$sign_GBP="+";} else  {$sign_GBP="-";}
*/ 
 
$usd=round($curr_abbr_today_2[1],2);
$eur=round($curr_abbr_today_2[2],2);
$kzt=round($curr_abbr_today_2[3],2);
$uah=round($curr_abbr_today_2[4],2);


$json_result="{\"date\":\"$date\",\"usd\":\"$usd\",\"eur\":\"$eur\",\"kzt\":\"$kzt\",\"uah\":\"$uah\"}";

echo "[$json_result]";

//$json_result="{\"date\":\"$date\",\"usd\":\"$usd\",\"eur\":\"$eur\",\"jpy\":\"$jpy\",\"gbp\":\"$gbp\",\"raznost_USD\":\"$raznost_USD\",\"raznost_EUR\":\"$raznost_EUR\",\"raznost_JPY\":\"$raznost_JPY\",\"raznost_GBP\":\"$raznost_GBP\",\"sign_USD\":\"$sign_USD\",\"sign_EUR\":\"$sign_EUR\",\"sign_JPY\":\"$sign_JPY\",\"sign_GBP\":\"$sign_GBP\"}";
 
?>