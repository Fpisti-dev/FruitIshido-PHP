<?php
	
	header("Access-Control-Allow-Origin: *");
	
	/* Attempt MySQL server connection. Assuming you are running MySQL
	server with default setting (user 'root' with no password) */
	$mysqli = new mysqli("localhost", "xxxxxxxxxxxxx", "xxxxxxxxxxx", "xxxxxxxxxxx");
 
	// Check connection
	if($mysqli === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
 
	// Attempt insert query execution
	$sql = "INSERT INTO top10 (NickName, Score) VALUES ('".$_POST["NickName"]."',".$_POST["Score"].")";

	if(mysqli_query($mysqli, $sql)){
		echo "Records inserted successfully.";
	} 
	else{
		echo "ERROR: Could not able to execute $sql. " . mysqli_error($mysqli);
	}
 
	// Close connection
	mysqli_close($mysqli);
?>