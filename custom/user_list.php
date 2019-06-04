<?php
/*
*/
include "../server/common.php";

$login = '';
$password = '';
$error = '';
$output = array();
$default_device = 'android';
$allowed_device = array('android' => true, 'tv_samsung' => true, 'browser' => true);

if (@$_SERVER['HTTP_X_FORWARDED_FOR']) {
	$ip = @$_SERVER['HTTP_X_FORWARDED_FOR'];
}
elseif (@$_SERVER['HTTP_X_REAL_IP']){
	$ip = @$_SERVER['HTTP_X_REAL_IP'];
}else {
	$ip = @$_SERVER['REMOTE_ADDR'];
}

// $users = Mysql::getInstance()->from('users')->where(array('ip' => $ip, ))->get()->all();

$users = Mysql::getInstance()->query('select login, password from users where ip = "' . $ip . '" and login != "" and stb_type = "browser"')->all();

// var_dump($users);

foreach ($users as $value) {
	$output[] = array("login" => $value['login'], "passwd" => $value['password']);
}

echo json_encode(array(
		'error' => $error,
		'results' => $output,
	)
);

?>
