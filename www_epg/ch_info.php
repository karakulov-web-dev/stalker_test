 <?php

include("db.php");
connect_db();

if(isset($_GET['ch_id'])) {
  $ch_id=(int)$_GET['ch_id'];
}

 $query = "SELECT b.name,a.desc,a.link from ch_desc a left join itv b on (a.ch_id=b.id) where a.ch_id='$ch_id'";

 $series = array();
 $result = mysql_query ($query);
 while($row = mysql_fetch_array ($result))     
  {
    $series['channels'] = array(
        'name' => $row['name'],
        'desc' => $row['desc'],
        'link' => $row['link']
    );
    //array_push($series, $ch);
  }


echo $_GET['callback'] . '('.json_encode($series).')';


?> 