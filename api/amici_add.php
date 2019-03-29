<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["id"]) || !isset($_POST["op"]) || !isset($_SESSION["user"]))
	die();

$utente = $_SESSION["user"];



$idutente = $_POST["id"];
$op = $_POST["op"];

$idutente = $util->escape($idutente);

if($op==1){

	$sql = "insert into my_luigix25.amici (utente1,utente2) values ('".$utente."','".$idutente."')";
} else {

	$sql = "delete from my_luigix25.amici where (utente1=".$utente." and utente2=".$idutente.") or (utente2=".$utente." and utente1=".$idutente.")";


}


$util->queryNoFetch($sql);

?>