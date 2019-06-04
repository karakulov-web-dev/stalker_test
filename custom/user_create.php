<?php
/*
*/
include "../server/common.php";

$login = '';
$password = '';
$error = '';
$default_device = 'android';
$allowed_device = array('android' => true, 'tv_samsung' => true, 'tv_lg' => true, 'browser' => true);
$debug = '';

function is_friend($ip = false) {

	$found = false;
	$msg = "";

	if(!$ip) {
		if (@$_SERVER['HTTP_X_FORWARDED_FOR']) {
			$ip = @$_SERVER['HTTP_X_FORWARDED_FOR'];
		}
		elseif (@$_SERVER['HTTP_X_REAL_IP']){
			$ip = @$_SERVER['HTTP_X_REAL_IP'];
		}
		else {
			$ip = @$_SERVER['REMOTE_ADDR'];
		}
	}

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
			// echo long2ip($ip) . ' IN ' . long2ip($value['start']) . '-' . long2ip($value['end'])  . "\n";
		}
		else {
			// echo long2ip($ip) . ' NOT IN ' . long2ip($value['start']) . '-' . long2ip($value['end'])  . "\n";
			next($rikt_nets);
		}
	}

	// if($ip == 3561848962) {
	// 	$found = false;
	// }

	return $found;
}

if (!empty($_GET['mac'])) {

	$mac = Middleware::normalizeMac($_GET['mac']);

	if (!$mac) {
		$error = _('Error: Not valid mac address');
	}
	else {

		$device = (isset($_GET['device'])) ? addslashes($_GET['device']) : $default_device;

		if (isset($allowed_device[$device])) {//and $allowed_device[$device]) {

			$password = rand(10000000, 99999999);

			$user_by_mac = \User::getByMac($mac);

			$login = $device . ':' . preg_replace("/\W/", '', $mac);

			if (empty($user_by_mac)){

				$user_id = \User::createAccount(
					array(
						'login' => $login, 
						'password' => $password, 
						'stb_mac' => $mac, 
						'comment' => date("Y-m-d\ H:i")
					)
				);

				if (!$user_id){
					$error = _('Error: could not create account');
				}
				else {
					$user_by_mac = \User::getByMac($mac);
					Mysql::getInstance()->update('users', array('stb_type' => strtoupper($device)), array('id' => $user_id));

					// для тестов samsung
					// if(!is_friend() && $device == 'tv_samsung') {
					if($device == 'tv_samsung') {
						Mysql::getInstance()->update('users', array('tariff_plan_id' => 14), array('id' => $user_id));
					}
				}
			}
			else {

				$getLoginId = function (User $user_by_mac) {
					return array(
						'login' => $user_by_mac->profile['login'],
						'id' => $user_by_mac->id,
					);
				};

				$getLoginId = Closure::bind($getLoginId, null, $user_by_mac);

				Mysql::getInstance()->update(
					'users', 
					array(
						'login' => $login, 
						'password' => md5(md5($password) . $getLoginId($user_by_mac)['id']),
						'stb_type' => strtoupper($device)
					), 
					array(
						'id' => $getLoginId($user_by_mac)['id'],
					)
				);

				// для тестов samsung
				// if(!is_friend() && $device == 'tv_samsung') {
				if($device == 'tv_samsung') {
					Mysql::getInstance()->update('users', array('tariff_plan_id' => 14), array('id' => $getLoginId($user_by_mac)['id']));
				}

				$login = $getLoginId($user_by_mac)['login'];
			}
		}
		else {
			$error = $device . ' is not allowed';
		}
	}
}

echo json_encode(array(
		'error' => $error,
		'login' => $login,
		'password' => $password,
		'debug' => $debug,
	)
);

?>
