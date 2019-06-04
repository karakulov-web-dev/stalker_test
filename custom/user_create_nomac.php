<?php
/*
*/
require_once "../server/common.php";

$login = '';
$password = '';
$error = '';
$default_device = 'browser';
$allowed_device = array('browser' => true);
$user_acc_limit = 50;
$tariff_plan_default = 2;

$api_url = "http://cup.hq.rikt.ru/api/";

function is_friend($ip = 0) {

	$found = false;

	$ip = ip2long($ip);

	$rikt_nets = array(
		0 => array('start' => 168427520, 'end' => 168493055),
		1 => array('start' => 169082880, 'end' => 169148415),
		2 => array('start' => 169738240, 'end' => 169803775),
		3 => array('start' => 3232248320, 'end' => 3232248575),
		4 => array('start' => 1835614208, 'end' => 1835622399),
		5 => array('start' => 3561848832, 'end' => 3561857023),
		6 => array('start' => 3641982976, 'end' => 3641987071),
		7 => array('start' => 629915648, 'end' => 629932031),
	);

	while ($value = current($rikt_nets) and !$found) {

		if($ip > $value['start'] and $ip < $value['end']) {
			$found = true;
		}
		else {
			next($rikt_nets);
		}
	}

	return $found;
}

function curl_preops() {

	global $login, $password;

	if( $curl = curl_init() ) {

		// curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC ) ; 
		// curl_setopt($curl, CURLOPT_USERPWD, "$login:$password");
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		return $curl;
	}
	else {
		return false;
	}
}

function get_user_info($ip) {

	global $api_url;

	if ($curl = curl_preops()) {

		curl_setopt($curl, CURLOPT_URL, $api_url . "users/?ip=" . $ip);

		$out = curl_exec($curl);
		curl_close($curl);
		return $out;
	}
	else {
		return false;
	}
}

function user_iptv_name($input) {
	if($input) {
		if($data = json_decode($input)) {
			if(isset($data->result->iptv_name)) {
				return $data->result->iptv_name;
			}
		}
	}

	return false;
}

if (@$_SERVER['HTTP_X_FORWARDED_FOR']) {
	$ip = @$_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (@$_SERVER['HTTP_X_REAL_IP']) {
	$ip = @$_SERVER['HTTP_X_REAL_IP'];
} else {
	$ip = @$_SERVER['REMOTE_ADDR'];
}

$full_name = (isset($_POST['full_name'])) ? addslashes($_POST('full_name')) : '';

if (!is_friend($ip)) {
	$error = _('Error: could not create account');
}
else {
	$counter = Mysql::getInstance()
		->from('users')
		->count()
		->where(array(
			'ip' => $ip,
		))
		->get()
		->counter();

	if($counter > $user_acc_limit && $ip != '212.77.128.130') {
		$error = _('Error: could not create account');
	}
}

if ($error == '') {

	$device = (isset($_POST['device'])) ? addslashes($_GET['device']) : $default_device;

	if (isset($allowed_device[$device])) {//and $allowed_device[$device]) {

		$password = rand(10000000, 99999999);

		// if ($uid != null){

			$login = $device . ':' . rand(10000000, 99999999);

			$user_id = \User::createAccount(
				array(
					'login' => $login, 
					'password' => $password, 
					// 'stb_mac' => $mac, 
					'full_name' => $full_name,
					'comment' => date("Y-m-d\ H:i")
				)
			);

			if (!$user_id){
				$error = _('Error: could not create account');
			}
			else {

				$user_by_login = \User::getByLogin($login);

				$tariff_plan_id = user_iptv_name(get_user_info($ip));

				if(!$tariff_plan_id) {
					$tariff_plan_id = $tariff_plan_default;
				}

				Mysql::getInstance()->update(
					'users', 
					array(
						'stb_type' => strtoupper($device), 
						'version' => $_SERVER['HTTP_USER_AGENT'], 
						'tariff_plan_id' => $tariff_plan_id,
						'ip' => $ip
					), 
					array('id' => $user_id)
				);
			}
		// }
		// else {

		// 	Mysql::getInstance()->update(
		// 		'users', 
		// 		array(
		// 			'login' => $login, 
		// 			'password' => md5(md5($password) . $uid),
		// 			'stb_type' => strtoupper($device)
		// 		), 
		// 		array(
		// 			'id' => $getLoginId($user_by_mac)['id'],
		// 		)
		// 	);

		// 	$login = $getLoginId($user_by_mac)['login'];
		// }
	}
	else {
		$error = $device . ' is not allowed';
	}
}

echo json_encode(array(
		'error' => $error,
		'login' => $login,
		'password' => $password,
	)
);

// echo '{"error":"","login":"browser:67021949","password":"17656398"}';

?>