<?php

require("utilities.php");

$util = new Utilities;

if(!isset($_POST["s"]))
	$stringa ="";
else
	$stringa = $_POST["s"];

$stringa = $util->escape($stringa);


$sql = "select * from my_luigix25.utenti u where u.nome LIKE '%".$stringa."%' or u.cognome LIKE '%".$stringa."%' or concat(u.nome,' ',u.cognome) LIKE '%".$stringa."%'";
$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>
