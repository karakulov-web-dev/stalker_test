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

$tetris_ethaddr=$_POST[ethaddr];
$tetris_name=$_POST['user_name'];
//$tetris_name=mysql_escape_string ($tetris_name);

$tetris_name=iconv("UTF-8","windows-1251",$tetris_name);

if ($tetris_name!=''){
$result = mysql_query("select * from tetris where name='$tetris_name' and ethaddr<>'$tetris_ethaddr'");
//$row = mysql_fetch_row($result);
$count_record = mysql_numrows($result); 

if ($count_record>0)
{
    //юзер недоступен
    echo "no";
}
else
      {
      //доступен
      echo "yes";
      }


}

mysql_close($handler);

?>