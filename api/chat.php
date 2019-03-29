<?php

require("utilities.php");

$utilities = new Utilities;
session_start();

if(!isset($_POST["des"]) or !isset($_SESSION["user"]))
	die();

$mit = $_SESSION["user"];
$des = $_POST["des"];
$accoda ="";
if(isset($_POST["ts"])){
	$ts = $_POST["ts"];
	$ts = $utilities->escape($ts);
	$accoda = "and timestamp > '".$ts."'";
}

$des = $utilities->escape($des);

if(isset($_POST["limit"])){

	$sql = "select * from(select *,IF(mittente=".$mit.",1,0) as io from my_luigix25.messaggi where ((mittente = ".$mit." and destinatario = ".$des." ) or (mittente = ".$des." and destinatario = ".$mit.")) ".$accoda." order by timestamp desc) as d order by d.timestamp asc ";
	$ris = $utilities->eseguiQuery($sql);
	print(json_encode(($ris)));
	die();

}

$sql = "select * from(select *,IF(mittente=".$mit.",1,0) as io from my_luigix25.messaggi where ((mittente = ".$mit." and destinatario = ".$des." ) or (mittente = ".$des." and destinatario = ".$mit.")) ".$accoda." order by timestamp desc) as d order by d.timestamp asc limit 100";
$ris = $utilities->eseguiQuery($sql);

$utilities->queryNoFetch("update my_luigix25.messaggi set visualizzato = current_timestamp() where destinatario = ".$mit." and mittente = ".$des);

print(json_encode($ris));
 
?>