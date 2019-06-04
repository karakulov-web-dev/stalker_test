<?php

include("db.php");
connect_db();

header("Content-type: text/xml");

//$fileName = "epg_xml.xml";		
//$handle = @fopen($fileName, "w");


$xml_output = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"; 
$xml_output .= "<tv>\n"; 


$query = "SELECT id,name FROM itv where status>0 and xmltv_id<>''";
$result = mysql_query("$query");
for($x = 0 ; $x < mysql_num_rows($result) ; $x++){ 
    $row = mysql_fetch_assoc($result); 
        
    $xml_output .= "\t<channel id=\"".$row['id']."\">\n";
    $xml_output .= "\t<display-name lang=\"ru\">".$row['name']."</display-name>\n";
    $xml_output .= "</channel>\n";
}



$query = "SELECT DATE_FORMAT(time,'%Y%m%d%H%i%s') AS start, DATE_FORMAT(time_to,'%Y%m%d%H%i%s') AS stop, name as title, ch_id as channel, DATE_FORMAT(time,'%Y-%m-%d') AS date FROM epg where time"." > DATE_SUB(CURDATE(), INTERVAL (DAYOFWEEK(CURDATE()) -1) DAY) AND time < DATE_ADD(CURDATE(), INTERVAL (9 - DAYOFWEEK(CURDATE())) DAY) ORDER BY ch_id, start ASC";

$result = mysql_query("$query");

for($x = 0 ; $x < mysql_num_rows($result) ; $x++){ 
    $row = mysql_fetch_assoc($result); 
        
    $xml_output .= "\t<programme start=\"".$row['start']."\" stop=\"".$row['stop']."\" channel=\"".$row['channel']."\">\n";
    $title = htmlspecialchars($row['title'], ENT_NOQUOTES);
    $xml_output .= "\t<title lang=\"ru\">".$title."</title>\n";
    $xml_output .= "\t<date>".$row['date']."</date>\n";
    $xml_output .= "</programme>\n";
}

$xml_output .= "</tv>";

//@fwrite($handle,$xml_output);
//@fclose($handle);

//header ("Content-Type: text/xml");
//header ("Content-Disposition: attachment; filename=\"$fileName\"");
//readfile("http://212.77.128.205/stalker_portal/www_epg/$fileName");

print $xml_output;

?>
