<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_GET["id"]) || !isset($_POST["ts"]) || !isset($_SESSION["user"]))
	die();


$utente = $_GET["id"];
$currentuser = $_SESSION["user"];
$ts = $_POST["ts"];

$ts = $util->escape($ts);
$utente = $util->escape($utente);


$sql = "select *,date_format(n.timestamp,'%H:%i') as timestamp1,timestamp,(select count(*) from my_luigix25.like l where l.id_post = n.id) as n_like,(select count(*) from my_luigix25.like l2 where l2.id_post = n.id and l2.id_utente = ".$currentuser.") as liked from my_luigix25.notizie n inner join (select u1.id as id_u,u1.nome,u1.cognome from my_luigix25.utenti u1 )as d on(d.id_u = n.id_utente) left outer join (select u2.id as id_ospite,u2.nome as nome_ospite,u2.cognome as cognome_ospite from my_luigix25.utenti u2 )as d2 on(d2.id_ospite = n.id_bacheca) where (n.id_utente =".$utente." or n.id_bacheca =".$utente.") and n.timestamp < '".$ts."' order by n.timestamp desc";
$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>