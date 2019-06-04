<?php

// var_dump($_REQUEST);

$start_time = microtime(1);

$type = '';
$action = '';

if(isset($_GET['type'])) {
	$type = addslashes($_GET['type']);
}
if(isset($_GET['action'])) {
	$action = addslashes($_GET['action']);
}
// echo date("c\n");
// $_REQUEST['debug_key'] = '0b2faea142a7d9f9c73983376ce9715d';

// no cache
header("Expires: Thu, 01 Jan 1970 00:00:00 GMT");
header("Last-Modified: Thu, 01 Jan 1970 00:00:00 GMT");
header("Pragma: no-cache");
header("Cache-Control: no-store, no-cache, must-revalidate");

require_once "common.php";

set_error_handler(array($debug = Debug::getInstance(), 'parsePHPError'));

$response = new AjaxBackend();
Stb::getInstance();
$loader = new DataLoader($type, $action);
$response->setBody($loader->getResult());

echo "generated in: ".round(microtime(1) - $start_time, 3)."s; query counter: ".Mysql::get_num_queries()."; cache hits: ".Mysql::get_cache_hits()."; cache miss: ".Mysql::get_cache_misses()."; ".$debug->getErrorStr();
$response->send();
?>