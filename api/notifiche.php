<?php

require("utilities.php");
	session_start();

if(!isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];
if(isset($_GET["old"])){
	$old ="";
	$coda = "";
} else{
	$old = "and visualizzato is NULL";
	$coda = "limit 10";
}

$util = new Utilities;

$ris = $util->eseguiQuery("select * from my_luigix25.notifiche n inner join my_luigix25.utenti u on(id_utente = u.id) where id_destinatario = ".$utente." ".$old." order by timestamp asc ".$coda);

$sql = "select nome,cognome,count(*) as numero,u.id as id_utente from my_luigix25.messaggi inner join my_luigix25.utenti u on (mittente = u.id) where visualizzato is NULL and destinatario =".$utente." group by mittente";

$ris2 = $util->eseguiQuery($sql);

$util->queryNoFetch("update my_luigix25.notifiche set visualizzato = current_timestamp() where id_destinatario = ".$utente);

$finale["messaggi"] = $ris2;
$finale["notifiche"] = $ris;

print(json_encode($finale));

?>