<?php
function connect_db() {
  @ $db_user = mysql_connect("212.77.128.205:3307", "stalker", "bte3TS3wpPArq8qG");
  mysql_query ("SET NAMES utf8");
  if (!$db_user) {
  	echo "Ошибка подключения к БД!";
  	mysql_close($db_user);
  	exit();  	
  }
  else mysql_select_db("stalker_db", $db_user);
}
?>