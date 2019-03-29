<?php

require("utilities.php");

$util = new Utilities;

session_start();
if(!isset($_SESSION["user"]))
	die();


$utente = $_SESSION["user"];
//$utente = "1";

$sql = "select * from (select utente1 as id,nome,cognome,d_nascita from my_luigix25.amici a1 inner join my_luigix25.utenti u1 on(a1.utente1 = u1.id) where utente2=".$utente." and a1.accettata is not null union select utente2 as id,nome,cognome,d_nascita from my_luigix25.amici a2 inner join my_luigix25.utenti u2 on(a2.utente2 = u2.id) where a2.accettata is not null and utente1=".$utente.") as d where MONTH(d.d_nascita) = MONTH(current_date()) and DAY(d.d_nascita) = DAY(current_date())";
//echo $sql;
$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>