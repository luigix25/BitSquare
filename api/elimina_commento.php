<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["id"]) or !isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];
$id = $_POST["id"];

$id = $util->escape($id);
$sql = "select * from my_luigix25.commenti where id=".$id;

$ris = $util->eseguiQuery($sql);

if($ris[0]["id_utente"] != $utente){
	echo "no";
	return;
}

$sql = "delete from my_luigix25.commenti where id =".$id;

$util->queryNoFetch($sql);
echo "si";


?>