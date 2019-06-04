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

//$today = date('Y-m-d H:i:s');

$sokoban_ethaddr=$_GET[ethaddr];
///$tetris_name=$_GET[name];
$new_game=$_GET[new_g];
$sokoban_level=$_GET[level];
$check_level=$_GET[check_level];


//$tetris_name=mysql_escape_string ($tetris_name);
/*
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

*/


/*
}
}





//Выбираем имя последнего пользователя 
$result = mysql_query("select name from tetris where ethaddr='$tetris_ethaddr' ORDER BY time DESC LIMIT 0,1");
$row = mysql_fetch_row($result);
$name=$row[0];



$name=iconv("windows-1251","UTF-8",$name);

$json_result="{\"name\":\"$name\"}";
*/


if ($check_level==1)
{
//Выбираем уровень
 $result = mysql_query("select level from sokoban where ethaddr='$sokoban_ethaddr'");
 $row = mysql_fetch_row($result);
 $level=$row[0]>0?$row[0]:1;
}


if ($new_game==1)
{
 $result = mysql_query("update sokoban SET level='1' where ethaddr='$sokoban_ethaddr'");
}


if ($sokoban_level>0)
{
 $result = mysql_query("select level from sokoban where ethaddr='$sokoban_ethaddr'");
 $row = mysql_fetch_row($result);
 $level=$row[0];
 
 if ($level>0)
{
 $result = mysql_query("update sokoban SET level='$sokoban_level' where ethaddr='$sokoban_ethaddr'");
}
else 
{
 $result = mysql_query("insert into sokoban (ethaddr,level) values ('$sokoban_ethaddr','$sokoban_level')");
}

}

$json_result="{\"level\":\"$level\"}";

echo $_GET['callback']."($json_result);";

mysql_close($handler);

?>
