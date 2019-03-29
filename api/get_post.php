<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];

$sql = "select n.id,n.contenuto,IF(n.id_utente=".$utente.",1,0) as io,date_format(n.timestamp,'%H:%i') as timestamp1,timestamp,(select count(*) from my_luigix25.like l where l.id_post = n.id) as n_like,(select count(*) from my_luigix25.like l2 where l2.id_post = n.id and l2.id_utente = ".$utente.") as liked,d.nome,d.cognome,d.id as id_utente from my_luigix25.notizie n inner join my_luigix25.utenti d on(n.id_utente = d.id) where id_bacheca is null and ( id_utente IN(select utente1 from my_luigix25.amici where accettata is not null and utente2=".$utente." union select utente2 from my_luigix25.amici where accettata is not null and utente1=".$utente.") or id_utente=".$utente.") order by n.timestamp desc limit 5 ";

if(isset($_GET["id"])){

/* Post singolo */
	$id = $_GET["id"];
	$id = $util->escape($id);

	$sql = "select n.id,d2.id_ospite,d2.nome_ospite,d2.cognome_ospite,n.contenuto,IF(n.id_utente=".$utente.",1,0) as io,date_format(n.timestamp,'%H:%i') as timestamp1,timestamp,(select count(*) from my_luigix25.like l where l.id_post = n.id) as n_like,(select count(*) from my_luigix25.like l2 where l2.id_post = n.id and l2.id_utente = ".$utente.") as liked,d.nome,d.cognome,d.id as id_utente from my_luigix25.notizie n inner join my_luigix25.utenti d on(n.id_utente = d.id) left outer join (select u2.id as id_ospite,u2.nome as nome_ospite,u2.cognome as cognome_ospite from my_luigix25.utenti u2 )as d2 on(d2.id_ospite = n.id_bacheca) where n.id =".$id;

}

$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>