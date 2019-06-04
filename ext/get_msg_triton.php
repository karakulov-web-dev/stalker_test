<?php

	$dbtritonhost = "212.77.128.148";
	$dbname = "alarm";
	$dbtritonuser = "message";
	$dbtritonpass = "cxtPrDTKYXd84qxc";

	$limit_msg = 5;
	$msgs = array("", "", "", "", "");

	// Подключение к БД и получение сообщений
	$query = "	SELECT * FROM
				(SELECT m.start, m.message, u.name
				FROM message m
				INNER JOIN user_log ul ON m.u_id = ul.sess_id
				INNER JOIN users u ON ul.user_id = u.id
				WHERE m.send = 1
				ORDER BY m.m_id DESC
				LIMIT 5
				)AS t ORDER BY start ASC;";

	$mysqli = new mysqli($dbtritonhost, $dbtritonuser, $dbtritonpass, $dbname);

	/* проверка соединения */
	if (mysqli_connect_errno()) {
    	printf("Не удалось подключиться: %s\n", mysqli_connect_error());
    	exit();
	}
	/* изменение набора символов на utf8 */
	if (!$mysqli->set_charset("utf8")) {
    	//printf("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
	} else {
    	//printf("Текущий набор символов: %s\n", $mysqli->character_set_name());
	}
	/* Select запрос */
	if ($result = mysqli_query($mysqli, $query)) {
    	$i=0;
    	while ($row = $result->fetch_row()) {
    		//var_dump($row);

    		$msgs[$i] = $row[0] . " " . $row[2] . ": ". str_replace("\r\n",'',$row[1]);
    		$i++;
    	}

    	echo json_encode(array(
			'count' => mysqli_num_rows($result),
			'msg_0' => $msgs[0],
			'msg_1' => $msgs[1],
			'msg_2' => $msgs[2],
			'msg_3' => $msgs[3],
			'msg_4' => $msgs[4],
		), JSON_UNESCAPED_UNICODE);

    	/* очищаем результирующий набор */
    	mysqli_free_result($result);
	}

	mysqli_close($mysqli);

?>
