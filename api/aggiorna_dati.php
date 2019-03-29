<?php
	require('utilities.php');
	$util = new Utilities;
	session_start();


	if(!isset($_SESSION["user"]) or !isset($_POST["nome"]) or !isset($_POST["cognome"]) or !isset($_POST["citta"]) or !isset($_POST["data"]) or !isset($_SESSION["user"]))
		die();

	$user = $_SESSION["user"];
	
	$nome = $_POST["nome"];
	$cognome = $_POST["cognome"];
	$citta = $_POST["citta"];
	$data = $_POST["data"];

	$nome = $util->escape($nome);
	$cognome = $util->escape($cognome);
	$data = $util->escape($data);
	$citta = $util->escape($citta);

	$sql = "update my_luigix25.utenti set nome='".$nome."',cognome='".$cognome."',d_nascita='".$data."',citta='".$citta."' where id =".$user;
	$util->queryNoFetch($sql);
		echo $sql;

	$_SESSION["nome"] = $nome;
	$_SESSION["cognome"] = $cognome;
	$_SESSION["citta"] = $citta;
	$_SESSION["data"] = $data;


	if(isset($_POST["pass"])){
		echo "pass";
		$pass = md5($_POST["pass"]);
		$sql = "update my_luigix25.utenti set nome='".$nome."',cognome='".$cognome."',d_nascita='".$data."',citta='".$citta."',password='".$pass."' where id =".$user;
		$util->queryNoFetch($sql);
	}

	if(count($_FILES)>0){

		echo "file";

		$url = $_SESSION["user"].".jpg";
		$sql = "update my_luigix25.utenti set foto='".$url."' where id =".$user;
		$util->queryNoFetch($sql);

		$path =  "../IMG/profilo/".$_SESSION["user"].".jpg";

		if(move_uploaded_file($_FILES["foto"]["tmp_name"],$path))
			echo "ok";
		else
			echo "errore";

		$_SESSION["foto"] = $_SESSION["user"].".jpg";
	}


?>