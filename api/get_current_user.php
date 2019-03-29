<?php
	
	session_start();
	if(!isset($_SESSION["user"])){
		echo "errore";
		die();
	}

	$array = array();
	$array["nome"] = $_SESSION["nome"];
	$array["cognome"] = $_SESSION["cognome"];
	$array["giorno"] = $_SESSION["giorno"];
	$array["mese"] = $_SESSION["mese"];
	$array["anno"] = $_SESSION["anno"];
	$array["citta"] = $_SESSION["citta"];

	echo(json_encode($array));
	
?>