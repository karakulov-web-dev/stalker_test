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

$today = date('Y-m-d H:i:s');

$tetris_ethaddr=$_GET[ethaddr];
$tetris_score=$_GET[score];
$tetris_level=$_GET[level];
$tetris_lines=$_GET[lines];

$result = mysql_query("SELECT MAX(score) AS highscore FROM tetris where ethaddr ='$tetris_ethaddr'");
$row = mysql_fetch_row($result);
$youscore=$row[0]?$row[0]:0;

if ($tetris_score>$youscore)
{
  $result = mysql_query("insert into tetris (time,ethaddr,score,level_l,lines_l) values ('$today','$tetris_ethaddr',$tetris_score,$tetris_level,$tetris_lines)");
  //$result = mysql_query("update tetris SET time='$today',ethaddr='$tetris_ethaddr',score=$tetris_score,level_l=$tetris_level,lines_l=$tetris_lines where ethaddr='$tetris_ethaddr' and name='$tetris_name'");
}

$json_result="{\"OK\":\"OK\"}";

echo $_GET['callback']."($json_result);";

mysql_close($handler);

?>
