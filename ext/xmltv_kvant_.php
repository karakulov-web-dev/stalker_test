<?php
	/* С допущением, что в программе есть передачи, начинающиеся ровно во время заменяемых передач */
	
	$rentv = "RenTV"; 				// ID канала программы передач, которую ищем в списке всех каналов xmltv
	$rentv_kvant = "RenTV_Kvant"; 	// ID канала программы передач с обновленной программой
	$link = null; 					// Ссылка на xmltv искомого канала
	$xmltv_rentv = null; 			// xmltv искомого канала
	$dates = array(); 				// Массив со всеми датами из xmltv искомого канала (на какую неделю программа передач)
	$file = "RenTV_Kvant.xmltv";	// Имя файла измененного xmltv http://10.20.0.105/RenTV_Kvant.xmltv
	// Mon Tue Wed Thu Fri Sat Sun
	$xmltv =  simplexml_load_file('http://xmltv.ru/export/AcTOqEVZ1I/index.xml'); // Список всех каналов xmltv
	//var_dump($xmltv);

	/*
	array(
	'title' => '',
	'wdays' => array('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
	'start' => '000000',
	'stop'  => '000000')
	*/

	$total_dif = array (
		array(
		'title' => '«Нон-стоп» Новости Междуреченска',
		'wdays' => array('Mon', 'Tue', 'Wed', 'Thu', 'Fri'),
		'start' => '060000',
		'stop'  => '063000'),
		array(
		'title' => '«Нон-стоп» Новости Междуреченска',
		'wdays' => array('Mon', 'Tue', 'Wed', 'Thu', 'Fri'),
		'start' => '070000',
		'stop'  => '073000'),
		array(
		'title' => '«Нон-стоп» Новости Междуреченска',
		'wdays' => array('Mon', 'Tue', 'Wed', 'Thu', 'Fri'),
		'start' => '123000',
		'stop'  => '130000'
		),
		array(
		'title' => '«Нон-стоп» Новости Междуреченска',
		'wdays' => array('Mon'),
		'start' => '190000',
		'stop'  => '193000'
		),
		array(
		'title' => '«Нон-стоп» Новости Междуреченска',
		'wdays' => array('Tue','Thu','Fri'),
		'start' => '190000',
		'stop'  => '191500'
		),
		array(
		'title' => '«Нон-стоп» Новости Междуреченска',
		'wdays' => array('Sat'),
		'start' => '123000',
		'stop'  => '130000'
		),
		array(
		'title' => 'Авторская программа',
		'wdays' => array('Mon','Tue','Wed','Thu','Fri'),
		'start' => '063000',
		'stop'  => '070000'
		),
		array(
		'title' => 'Авторская программа',
		'wdays' => array('Wed'),
		'start' => '190000',
		'stop'  => '193000'
		),
		array(
		'title' => 'Авторская программа',
		'wdays' => array('Tue','Thu','Fri'),
		'start' => '191500',
		'stop'  => '193000'
		)
	);

	foreach ($xmltv->File as $key => $value) {
		if ($value->ChannelID == $rentv) $link = $value->Name;
	}
	//var_dump($link);

	$xmltv_rentv = simplexml_load_file($link);
	//var_dump($xmltv_rentv);

	foreach ($xmltv_rentv->programme as $key => $value) {
		// Заполнение массива $dates
		if (!in_array((string)$value->date, $dates, false)) array_push($dates, (string)$value->date);
	}
	//print_r($dates);
	//echo strftime("%a, %d/%m/%Y", strtotime($dates[0]));

	// Изменим существующую программу передач
	foreach ($xmltv_rentv->programme as $programme) {
		$date = (string)strftime("%a", strtotime($programme->date));
		//print_r($date); 

		for ($i=0;$i<count($total_dif);$i++) {
			$tmp = ch_time($programme, $total_dif[$i], $date);
			if ($tmp != null) $programme = $tmp;
		}
	}

	// Добавляем в программу передач НОН-СТОП
	foreach ($dates as $key => $value) {
		$tstmp = str_replace("-", "", $value);
		$dayofweek = (string)strftime("%a", strtotime($value));

		for ($i=0;$i<count($total_dif);$i++) {
			add_programme($xmltv_rentv, $total_dif[$i], $tstmp, $rentv, $dayofweek);
		}
	}
	//var_dump($xmltv_rentv);

	$changed_id = str_replace($rentv, $rentv_kvant, $xmltv_rentv->asXml());
  	//var_dump($changed_id);
  	file_put_contents($file, $changed_id);

	function add_programme($xmltv, $array, $tstmp, $chid, $dayofweek) {
		if (in_array($dayofweek, $array['wdays'])) {
			$programme = $xmltv->addChild('programme');
			$programme->addAttribute('start', $tstmp.$array['start'].' +0700');
			$programme->addAttribute('stop', $tstmp.$array['stop'].' +0700');
			$programme->addAttribute('channel', $chid);
			$title = $programme->addChild('title', $array['title']);
			$title->addAttribute('lang', 'ru');
		}
	}

	function ch_time($programme, $array, $cur_date) {
		if (in_array($cur_date, $array['wdays'])) {
			if (substr($programme['start'], 8, 6) == $array['start']) {
				if (substr($programme['stop'], 8, 6) == $array['stop']) {$programme['start'] = ""; $programme['stop'] = "";} //unset($programme);
				else {
					$newtime = substr($programme['start'], 0, 8) . $array['stop'] . substr($programme['start'], 14, 6);
					$programme['start'] = $newtime;
				}
			}
			return $programme;
		}
		else return null;
	}

?>