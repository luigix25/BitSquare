<?php

require("utilities.php");

$util = new Utilities;

if(!isset($_POST["email"]))
	die();


$email = $_POST["email"];

$email = $util->escape($email);

$sql = "select count(*) as n from my_luigix25.utenti where email = '".$email."'";
$ris = $util->eseguiQuery($sql);

echo ($ris[0]["n"] ==0)?"no":"si";

?>