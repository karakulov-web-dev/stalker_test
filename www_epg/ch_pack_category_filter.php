 <?php

include("db.php");
connect_db();

if(isset($_GET['package_id'])) {
  $package_id=(int)$_GET['package_id'];
}

if ($package_id>0)
{
 $query = "SELECT a.tv_genre_id,c.title from itv a right join service_in_package b on (b.service_id=a.id) left join tv_genre c on (a.tv_genre_id=c.id) where a.status=1 and a.tv_genre_id<>8 and b.package_id='$package_id' group by tv_genre_id";
} 

 $series = array();
 $result = mysql_query ($query);
 while($row = mysql_fetch_array ($result))     
  {
    $series['channels'][] = array(
        'id' => $row['tv_genre_id'],
        'title' => $row['title']
        //'tv_genre_id' => $row['tv_genre_id']
    );
    //array_push($series, $ch);
  }


echo $_GET['callback'] . '('.json_encode($series).')';


?> 