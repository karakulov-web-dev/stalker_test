<?php

require_once "common.php";

$type = 'itv';
$action = 'get_epg_info';
$_REQUEST['debug_key'] = '0b2faea142a7d9f9c73983376ce9715d';

$response = new AjaxBackend();
Stb::getInstance();
$loader = new DataLoader($type, $action);
$response->setBody($loader->getResult());

$response->send();