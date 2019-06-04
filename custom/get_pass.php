<?php
	include "../server/common.php";//Для папки stalker_portal/custom

	$parent_pass='';
	$error='';
	//$_GET['mac'] = '00:1A:79:02:9C:BE';

	if (!empty($_GET['mac'])) {
		$mac = Middleware::normalizeMac($_GET['mac']);
		if (!$mac) {
			$error = 'Not valid mac address';
		}
		else {
			$user_by_mac = \User::getByMac($mac);

			$getPass = function (User $user_by_mac) {
				return array(
					'pass' => $user_by_mac->profile['parent_password'],
				);
			};

			$getPass = Closure::bind($getPass, null, $user_by_mac);

			//var_dump($getPass($user_by_mac)['pass']);
			//$str_get_ppas = "SELECT parent_password FROM stalker_db.users WHERE mac='00:1A:79:02:9C:BE';";
			$parent_pass = $getPass($user_by_mac)['pass'];
		}
	}
	else {
		$error = 'Mac is empty';
	}

	echo json_encode(array(
		'error' => $error,
		'password' => $parent_pass,
	));

?>

