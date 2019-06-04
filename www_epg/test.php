 <?php

include("db.php");
connect_db();

 $query = "SELECT * from itv";

 $result = mysql_query ($query);

 while($row = mysql_fetch_array ($result))     
  {

        echo $row['id']."<br>";
        echo $row['name']."<br>";
        
    

  }




?> 