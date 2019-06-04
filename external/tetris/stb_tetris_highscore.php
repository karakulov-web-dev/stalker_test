<?php

 $mysql_base = "mportal";
 $mysql_user = "mportal";
 $mysql_password = "mportal";
 $mysql_host = "localhost";
 $db = "";
 $handler=mysql_connect($mysql_host,$mysql_user,$mysql_password);
 $db=mysql_select_db($mysql_base,$handler);
 if (!$db){
	return 1;
	exit;
  }
  
$ethaddr=$_GET[ethaddr];  

$result = mysql_query("SELECT MAX(score) AS highscore FROM tetris");
$row = mysql_fetch_row($result);
$highscore=$row[0];

$result = mysql_query("SELECT MAX(score) AS highscore FROM tetris where ethaddr ='$ethaddr'");
$row = mysql_fetch_row($result);
$youscore=$row[0]?$row[0]:0;

$arr = array('highscore' => $highscore,'youscore' => $youscore);

mysql_close($handler);

echo json_encode($arr);

?>
