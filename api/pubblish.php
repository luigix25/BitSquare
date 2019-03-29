<?php
require("utilities.php");

$util = new Utilities;

session_start();

if(!isset($_POST["txt"]) || !isset($_SESSION["user"]))
	die();


$user =  $_SESSION["user"];
$testo = $_POST["txt"];

$testo = $util->escape($testo);

if(isset($_POST["id"])){

	$id = $_POST["id"];
	$id = $util->escape($id);

//	$query="insert into my_luigix25.notifiche (id_utente,id_post,id_destinatario,tipo) values (".$user.','.$id.',"p_bac")';
//	$util->queryNoFetch($query);

	$query = "insert into my_luigix25.notizie (id_utente,id_bacheca,contenuto) values (".$user.','.$id.',"'.$testo.'")';
	if($util->queryNoFetch($query))
		echo "ok";
	
	return;
}

$query = "insert into my_luigix25.notizie (id_utente,contenuto) values (".$user.',"'.$testo.'")';

if($util->queryNoFetch($query))
	echo "ok";


?>