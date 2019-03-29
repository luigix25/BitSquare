<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["id"]) || !isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];
$idpost = $_POST["id"];

$idpost = $util->escape($idpost);

$sql = "select *,c.id as idc,date_format(c.timestamp,'%H:%i') as timestamp1,IF(c.id_utente=".$utente.",1,0) as io from my_luigix25.commenti c inner join my_luigix25.utenti u on (c.id_utente = u.id) where id_notizia = ".$idpost." order by timestamp asc";
$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>