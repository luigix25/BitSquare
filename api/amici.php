<?php

require("utilities.php");

$util = new Utilities;

session_start();
$utente = $_SESSION["user"];

if(!isset($_SESSION["user"]))
	die();


$sql = "select utente1 as id,nome,cognome from my_luigix25.amici a1 inner join my_luigix25.utenti u1 on(a1.utente1 = u1.id) where utente2=".$utente." and a1.accettata is not null union select utente2 as id,nome,cognome from my_luigix25.amici a2 inner join my_luigix25.utenti u2 on(a2.utente2 = u2.id) where a2.accettata is not null and utente1=".$utente;
//echo $sql;
$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>