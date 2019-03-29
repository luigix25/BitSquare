<?php

require("utilities.php");
session_start();

$util = new Utilities;

if(!isset($_POST["des"]) || !isset($_POST["tes"]) || !isset($_SESSION["user"]))
	die();


$mit = $_SESSION["user"];
$des = $_POST["des"];
$tes = $_POST["tes"];

$tes = $util->escape($tes);
$des = $util->escape($des);

$util->queryNoFetch("insert into my_luigix25.messaggi (mittente,destinatario,contenuto) values (".$mit.",".$des.",'".$tes."')");

?>