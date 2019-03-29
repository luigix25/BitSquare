<?php

require("utilities.php");
	session_start();

if(!isset($_SESSION["user"])){
	die();
}

$utente = $_SESSION["user"];

$util = new Utilities;
$op = $_POST["op"];
$id = $_POST["id"];

$id = $util->escape($id);


if($op == 1){
	$sql = "update my_luigix25.amici set accettata = current_timestamp() where utente2=".$utente." and id = ".$id;

	$id_destinatario = $util->eseguiQuery("select utente1 as id from my_luigix25.amici where id=".$id);

	$notifica = "insert into my_luigix25.notifiche (id_utente,id_destinatario,tipo) values(".$utente.",".$id_destinatario[0]["id"].",'amici')";
	$util->queryNoFetch($notifica);

}else if($op == 0)
	$sql = "delete from my_luigix25.amici where utente2=".$utente." and id = ".$id;

echo $sql;
$util->queryNoFetch($sql);


?>