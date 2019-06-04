 <?php

include("db.php");
connect_db();

$tv_genre_id=0;

if(isset($_GET['package_id'])) {
  $package_id=(int)$_GET['package_id'];
}
if(isset($_GET['tv_genre_id'])) {
  $tv_genre_id=(int)$_GET['tv_genre_id'];
}


if ($package_id>0 && $tv_genre_id==0)
{
 $query = "SELECT a.id,a.name from itv a right join service_in_package b on (b.service_id=a.id) right join ch_desc c on (b.service_id=c.ch_id) where a.status=1 and c.show=1 and a.tv_genre_id<>8 and b.package_id='$package_id' order by a.id";
 
} 

if ($package_id>0 && $tv_genre_id>0)
{
 $query = "SELECT a.id,a.name from itv a right join service_in_package b on (b.service_id=a.id) right join ch_desc c on (b.service_id=c.ch_id) where a.status=1 and c.show=1 and a.tv_genre_id<>8 and a.tv_genre_id='$tv_genre_id' and b.package_id='$package_id' order by a.id";
} 



 $series = array();
 $result = mysql_query ($query);
 while($row = mysql_fetch_array ($result))     
  {
    $series['channels'][] = array(
        'id' => $row['id'],
        'name' => $row['name']
        //'tv_genre_id' => $row['tv_genre_id']
    );
    //array_push($series, $ch);
  }


echo $_GET['callback'] . '('.json_encode($series).')';


?> 