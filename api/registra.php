<?php

require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["nome"]) or !isset($_POST["cognome"]) or !isset($_POST["d_n"]) or !isset($_POST["email"]) or !isset($_POST["pass"]) or !isset($_POST["sesso"]) or !isset($_POST["citta"]))
	die();

$nome = $_POST["nome"];
$cognome = $_POST["cognome"];
$data_n = $_POST["d_n"];
$email = $_POST["email"];
$sesso = $_POST["sesso"];
$pass = $_POST["pass"];
$citta = $_POST["citta"];

$nome = $util->escape($nome);
$cognome = $util->escape($cognome);
$data_n = $util->escape($data_n);
$email = $util->escape($email);
$sesso = $util->escape($sesso);
$pass = $util->escape($pass);
$citta = $util->escape($citta);

$pass=md5($pass);

$sql = "insert into my_luigix25.utenti (nome,cognome,email,password,d_nascita,sesso,citta,foto) values('".$nome."','".$cognome."','".$email."','".$pass."','".$data_n."','".$sesso."','".$citta."','0.jpg')";

$ris = $util->queryNoFetch($sql);

$ris = $util->eseguiQuery("select *,DAY(d_nascita)as giorno,MONTH(d_nascita) as mese,YEAR(d_nascita) as anno from my_luigix25.utenti where email='".$email."'");

	$_SESSION["user"] = $ris[0]["id"];
	$_SESSION["nome"] = $ris[0]["nome"];
	$_SESSION["cognome"] = $ris[0]["cognome"];
	$_SESSION["foto"] = $ris[0]["foto"];
	$_SESSION["giorno"] = $ris[0]["giorno"];
	$_SESSION["mese"] = $ris[0]["mese"];
	$_SESSION["anno"] = $ris[0]["anno"];
	$_SESSION["citta"] = $ris[0]["citta"];


?>