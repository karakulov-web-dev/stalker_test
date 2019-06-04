<?php

$api_url = "http://cup.hq.rikt.ru/api/";
// $login = "";
// $password = "";

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

$ip = '109.105.92.202';

var_dump(user_iptv_name(get_user_info($ip)));
