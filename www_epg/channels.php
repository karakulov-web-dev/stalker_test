<?php
include("db.php");
connect_db();

if(isset($_GET['category'])) {
  $category=(int)$_GET['category'];
}

if($category==0)
{
 //$query = "SELECT id,name FROM itv WHERE status=1 and xmltv_id<>'' order by id";
 $query = "SELECT a.id,a.name from itv a right join ch_desc c on (a.id=c.ch_id) where a.status=1 and c.show=1 and a.xmltv_id<>'' order by a.id";
} elseif ($category>0)
{
//$query = "SELECT id,name FROM itv WHERE status=1 and xmltv_id<>'' and tv_genre_id='$category' order by id";
$query = "SELECT a.id,a.name from itv a right join ch_desc c on (a.id=c.ch_id) where a.status=1 and c.show=1 and a.xmltv_id<>'' and a.tv_genre_id='$category' order by a.id";
} 
 
 //echo $query;
 
 $series = array();
 $result = mysql_query ($query);
 while($row = mysql_fetch_array ($result))     
  {
    $series['channels'][] = array(
        'id' => $row['id'],
        'name' => str_replace(" test", "", $row['name'])
        //'tv_genre_id' => $row['tv_genre_id']
    );
    //array_push($series, $ch);
  }


echo $_GET['callback'] . '('.json_encode($series).')';
//exit;
/*
if($category==0)
{
  $MyArray = array(
     "channels" => array(
        0 =>array('id'=>'1','name'=>'ОРТ'),
        1 =>array('id'=>'2','name'=>'stt'),
        2 =>array('id'=>'3','name'=>'kva')
        )
     );
}

if($category==1)
{
  $MyArray = array(
     "channels" => array(
        0 =>array('id'=>'1','name'=>'ort'),
        1 =>array('id'=>'2','name'=>'stt'),
        )
     );
}
 
echo $_GET['callback'] . '('.json_encode($MyArray).')';
*/


?>