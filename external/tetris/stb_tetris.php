<?php


 $mysql_base = "mportal";
 $mysql_user = "mportal";
 $mysql_password = "mportal";
 $mysql_host = "localhost";
 $db = "";
 $handler=mysql_connect($mysql_host,$mysql_user,$mysql_password);
 $db=mysql_select_db($mysql_base,$handler);
 //mysql_query ("set character_set_client='cp1251'");
 //mysql_query ("set character_set_results='cp1251'");
 //mysql_query ("set collation_connection='cp1251_general_ci'");	
 if (!$db){
	return 1;
	exit;
  }

$today = date('Y-m-d H:i:s');

$tetris_ethaddr=$_GET[ethaddr];
$tetris_name=$_GET[name];
$tetris_score=$_GET[score];
$tetris_level=$_GET[level];
$tetris_lines=$_GET[lines];

//$tetris_name=mysql_escape_string ($tetris_name);

if ($tetris_name!=''){
$result = mysql_query("select name from tetris where ethaddr='$tetris_ethaddr' and name='$tetris_name'");
$row = mysql_fetch_row($result);

if ($tetris_name!=$row[0])
{
$result = mysql_query("insert into tetris (time,ethaddr,name,score,level_l,lines_l) values ('$today', '$tetris_ethaddr', '$tetris_name',$tetris_score,$tetris_level,$tetris_lines)");
}
else{

$result = mysql_query("select score from tetris where ethaddr='$tetris_ethaddr'");
$row = mysql_fetch_row($result);

if ($tetris_score>$row[0])
{
$result = mysql_query("update tetris SET time='$today',ethaddr='$tetris_ethaddr',name='$tetris_name',score=$tetris_score,level_l=$tetris_level,lines_l=$tetris_lines where ethaddr='$tetris_ethaddr' and name='$tetris_name'");
}


}
}



//Выбираем имя последнего пользователя 
$result = mysql_query("select name from tetris where ethaddr='$tetris_ethaddr' ORDER BY time DESC LIMIT 0,1");
$row = mysql_fetch_row($result);
$name=$row[0];



$name=iconv("windows-1251","UTF-8",$name);

$json_result="{\"name\":\"$name\"}";

echo $_GET['callback']."($json_result);";

mysql_close($handler);

?>
