 <?
 include("db.php");
 connect_db();
 $query = "SELECT * from tv_genre where id<>8";
 $result = mysql_query ($query);
 while($row = mysql_fetch_array ($result))     
  {
    $results[] = array(
        'id' => $row['id'],
        'title' => $row['title']
    );
  }
//$data['genre'] = $results;
//echo json_encode($results);

echo $_GET['callback'] . '('.json_encode($results).')';

?>
