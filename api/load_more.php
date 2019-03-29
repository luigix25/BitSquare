<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["ts"]) or !isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];
$ts = $_POST["ts"];

$td = $util->escape($ts);


//$sql = "select n.id,n.contenuto,IF(n.id_utente=".$utente.",1,0) as io,timestamp,date_format(n.timestamp,'%H:%i') as timestamp1,(select count(*) from my_luigix25.like l where l.id_post = n.id) as n_like,(select count(*) from my_luigix25.like l2 where l2.id_post = n.id and l2.id_utente = ".$utente.") as liked,d.nome,d.cognome,d.id as id_utente from my_luigix25.notizie n inner join my_luigix25.utenti d on(n.id_utente = d.id) where id_utente IN(select utente1 from my_luigix25.amici where accettata is not null and utente2=".$utente." union select utente2 from my_luigix25.amici where (accettata is not null and utente1=".$utente.") or id_utente=".$utente." ) and timestamp < '".$ts."' order by timestamp desc limit 10 ";
$sql = "select n.id,n.contenuto,IF(n.id_utente=".$utente.",1,0) as io,date_format(n.timestamp,'%H:%i') as timestamp1,timestamp,(select count(*) from my_luigix25.like l where l.id_post = n.id) as n_like,(select count(*) from my_luigix25.like l2 where l2.id_post = n.id and l2.id_utente = ".$utente.") as liked,d.nome,d.cognome,d.id as id_utente from my_luigix25.notizie n inner join my_luigix25.utenti d on(n.id_utente = d.id) where id_bacheca is null and ( id_utente IN(select utente1 from my_luigix25.amici where accettata is not null and utente2=".$utente." union select utente2 from my_luigix25.amici where accettata is not null and utente1=".$utente.") or id_utente=".$utente.") and n.timestamp < '".$ts."' order by n.timestamp desc limit 5 ";

$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>