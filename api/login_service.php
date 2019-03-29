<?php
	require("utilities.php");

	session_start();

	if(!isset($_GET["op"]))
		die();


	$op = $_GET["op"];

	if($op == 0){
		$_SESSION = null;
		session_destroy();
		die();
	}

	$util = new Utilities;

	if(!isset($_POST["text"]) || !isset($_POST["password"])){
		echo "No q";
		die();
	}


	$id = $_POST["text"];
	$pass = $_POST["password"];

	$id = $util->escape($id);
	$pass = $util->escape($pass);


	$sql = "select id,password,nome,citta,cognome,foto,DAY(d_nascita)as giorno,MONTH(d_nascita) as mese,YEAR(d_nascita) as anno from my_luigix25.utenti where email ='".$id."'";

	$ris = $util->eseguiQuery($sql);


	if($ris[0]["password"] == md5($pass)){
		$_SESSION["user"] = $ris[0]["id"];
		$_SESSION["nome"] = $ris[0]["nome"];
		$_SESSION["cognome"] = $ris[0]["cognome"];
		$_SESSION["foto"] = $ris[0]["foto"];
		$_SESSION["giorno"] = $ris[0]["giorno"];
		$_SESSION["mese"] = $ris[0]["mese"];
		$_SESSION["anno"] = $ris[0]["anno"];
		$_SESSION["citta"] = $ris[0]["citta"];

		echo "Ok";
	}else {
		$_SESSION = null;
		session_destroy();
		echo "No";
	}

?>