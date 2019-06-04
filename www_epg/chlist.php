 <?php

include("db.php");
connect_db();

if(isset($_GET['cid'])) {
  $cid=(int)$_GET['cid'];
}

$date=$_GET['dt'];

$time_from = $date.' 00:00:00';
$time_to = $date.' 24:00:00';

$query = "SELECT unix_timestamp(time) as ts,name FROM epg WHERE ch_id=$cid and time > '".$time_from."' and time < '".$time_to."' order by time";

$series['report'] = array();

if (($result = MYSQL_QUERY($query)) && ($sql_result_length = MYSQL_NUMROWS($result)))
{
       while($row = mysql_fetch_array ($result))     
  {
    $ss['list'][] = array(
        'ts' => $row['ts'],
        'progname' => $row['name']
    );
  }
array_push($series['report'], $ss);
}

echo $_GET['callback'] . '('.json_encode($series).')';

/*
if($cid==1)
{
$MyArray = array(
     "report" => array(
        0=>array("id" =>1,"list" => array(
                                          0 =>array('ts'=>'1346692800','progname'=>'"Доброе утро"'),
                                          1 =>array('ts'=>'1347344511','progname'=>'Премьера сезона. Т/с "Без свидетелей", 9 с.'),
                                          2 =>array('ts'=>'1347345462','progname'=>'Премьера сезона. Т/с "Без свидетелей", 9 с.'),
                                          3 =>array('ts'=>'1347345862','progname'=>'Премьера сезона. Т/с "Без свидетелей", 9 с.')
                                         )
      )
    )
  );
}
*/

?> 