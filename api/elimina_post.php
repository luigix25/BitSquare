<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["id"]) || !isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];
$id = $_POST["id"];

$id = $util->escape($id);


$sql = "select * from my_luigix25.notizie where id=".$id;

$ris = $util->eseguiQuery($sql);

if($ris[0]["id_utente"] != $utente){
	echo "no";
	return;
}

$sql = "delete from my_luigix25.notizie where id =".$id;

$util->queryNoFetch($sql);
echo "si";


?>