 <?php

include("db.php");
connect_db();

 $query = "SELECT z.id,z.name from itv z right join service_in_package b on (b.service_id=z.id) right join ch_desc c on (b.service_id=c.ch_id) where (z.id,z.name) not in (SELECT a.id,a.name from itv a right join service_in_package bb on (bb.service_id=a.id)  where a.status=1 and a.tv_genre_id<>8 and bb.package_id=3) and z.status=1 and z.tv_genre_id<>8 and b.package_id=4 and c.show=1";

 $series = array();
 $result = mysql_query ($query);
 while($row = mysql_fetch_array ($result))     
  {
    $series['channels'][] = array(
 //       'id' => $row['id'],
        'name' => $row['name']
        //'tv_genre_id' => $row['tv_genre_id']
    );
    //array_push($series, $ch);
  }


echo $_GET['callback'] . '('.json_encode($series).')';


?> 