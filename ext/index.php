<?php

if (@$_SERVER['HTTP_X_FORWARDED_FOR']) {
	$ip = @$_SERVER['HTTP_X_FORWARDED_FOR'];
}
elseif (@$_SERVER['HTTP_X_REAL_IP']){
	$ip = @$_SERVER['HTTP_X_REAL_IP'];
}
else {
	$ip = @$_SERVER['REMOTE_ADDR'];
}

$found = false;
$msg = "";
// $ip = '109.105.92.202';
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
// samsung nets
	8 => array('start' => 3645098402, 'end' => 3645098402),
	9 => array('start' => 3645098477, 'end' => 3645098477),
	10 => array('start' => 3645098492, 'end' => 3645098492),
	11 => array('start' => 3645098613, 'end' => 3645098613),
	12 => array('start' => 3645098697, 'end' => 3645098697),
	13 => array('start' => 3645098402, 'end' => 3645098402),
	14 => array('start' => 3645103266, 'end' => 3645103266),
	15 => array('start' => 3645103267, 'end' => 3645103267),
	16 => array('start' => 3645103268, 'end' => 3645103268),
	17 => array('start' => 3645103269, 'end' => 3645103269),
	18 => array('start' => 3645103270, 'end' => 3645103270),
	19 => array('start' => 3645103271, 'end' => 3645103271),
	20 => array('start' => 3645098611, 'end' => 3645098611),
	21 => array('start' => 3645098612, 'end' => 3645098612),
	22 => array('start' => 3645098613, 'end' => 3645098613),
	23 => array('start' => 3645098476, 'end' => 3645098476),
	24 => array('start' => 3645098477, 'end' => 3645098477),
	25 => array('start' => 3645103501, 'end' => 3645103501),
	26 => array('start' => 3645103502, 'end' => 3645103502),
	27 => array('start' => 3645103503, 'end' => 3645103503),
	28 => array('start' => 3645103504, 'end' => 3645103504),
	29 => array('start' => 3645098492, 'end' => 3645098492),
	30 => array('start' => 1506871126, 'end' => 1506871126),
// lg nets
	31 => array('start' => 833398273, 'end' => 833398527),
	32 => array('start' => 3068178689, 'end' => 3068178943),
	33 => array('start' => 461042254, 'end' => 461042254),
	34 => array('start' => 1889133057, 'end' => 1889133311),
	35 => array('start' => 3024242432, 'end' => 3024242686),
	36 => array('start' => 461042247, 'end' => 461042247),

	37 => array('start' => 3529386329, 'end' => 3529386329),
	38 => array('start' => 3732248250, 'end' => 3732248250),
	39 => array('start' => 3732248251, 'end' => 3732248251),
	40 => array('start' => 3732248252, 'end' => 3732248252),
	41 => array('start' => 1888008701, 'end' => 1888008701),
	42 => array('start' => 2093114010, 'end' => 2093114010),
	43 => array('start' => 2093114011, 'end' => 2093114011),
	44 => array('start' => 2093114012, 'end' => 2093114012),
	45 => array('start' => 2093114013, 'end' => 2093114013),
	46 => array('start' => 2093114014, 'end' => 2093114014),
);

while ($value = current($rikt_nets) and !$found) {

	if($ip >= $value['start'] and $ip <= $value['end']) {
		$found = true;
		// echo long2ip($ip) . ' IN ' . long2ip($value['start']) . '-' . long2ip($value['end'])  . "\n";
	}
	else {
		// echo long2ip($ip) . ' NOT IN ' . long2ip($value['start']) . '-' . long2ip($value['end'])  . "\n";
		next($rikt_nets);
	}
}

if (!$found) {
	$msg = "Приложение работает только в сети ОАО РИКТ города Междуреченска.";
}

echo json_encode(
	array(
		'friend' => $found,
		'msg' => $msg,
		'ip' => long2ip($ip),
	)
);

?>
