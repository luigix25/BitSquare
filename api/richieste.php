<?php

require("utilities.php");
	session_start();

if(!isset($_SESSION["user"])){
	die();
}

$utente = $_SESSION["user"];

$util = new Utilities;

$ris = $util->eseguiQuery("select a.id,nome,cognome,u.id as id_utente from my_luigix25.amici a inner join my_luigix25.utenti u on(utente1 = u.id) where accettata is NULL and utente2 = ".$utente." order by data asc");

//$util->queryNoFetch("update my_luigix25.notifiche set visualizzato = current_timestamp() where id_utente = ".$utente);

print(json_encode($ris));

?>