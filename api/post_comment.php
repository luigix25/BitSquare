<?php
require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["id"]) || !isset($_POST["txt"]) || !isset($_SESSION["user"]))
	die();


$user = $_SESSION["user"];
$testo = $_POST["txt"];
$idpost = $_POST["id"];

	
$idpost = $util->escape($idpost);
$testo = $util->escape($testo);


$query = "insert into my_luigix25.commenti (id_utente,id_notizia,testo) values (".$user.','.$idpost.',"'.$testo.'")';

if($util->queryNoFetch($query))
	echo "ok";


?>