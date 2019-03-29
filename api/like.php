<?php
require("utilities.php");

$util = new Utilities;
session_start();

if(!isset($_POST["id"]) || !isset($_POST["op"]) || !isset($_SESSION["user"]))
	die();


$user = $_SESSION["user"];
$idpost = $_POST["id"];
$op = $_POST["op"];

$idpost = $util->escape($idpost);


$query = "insert into my_luigix25.like (id_utente,id_post) values (".$user.','.$idpost.')';

$query2 ="delete from my_luigix25.like where id_utente = ".$user." and id_post =".$idpost;

if($op == 1)
	$query = $query2;

$util->queryNoFetch($query);

$query = "select count(*) as n from my_luigix25.like where id_post = ".$idpost;

echo json_encode($util->eseguiQuery($query));

?>