<?php

class Utilities{

function stampaMenu(){

	print('	<a href="index.php"><img src="IMG/home_icon.png" class="menu_icon" alt="errore"></a>
			<a href="messaggi.php"><img src="IMG/message_icon.png" class="menu_icon" alt="errore"></a>
			<a id="ancora_cerca" href="javascript:apri_cerca()"><img src="IMG/search_icon.png" class="menu_icon" alt="errore"></a>
			'
			);


}


function queryNoFetch($query){

	$mysqli = new mysqli("127.0.0.1","root",null);
	
	if($mysqli->connect_error){
		die($mysqli->connect_errno);
	}

	$result = $mysqli->query($query);

	$mysqli->close();

	return $result;
}

function eseguiQuery($query){

	$mysqli = new mysqli("127.0.0.1","root",null);
	
	if($mysqli->connect_error){
		die($mysqli->connect_errno);
	}

	$result = $mysqli->query($query);

	$risultato = array();

	while($row = $result->fetch_assoc()){
		$risultato[] = $row;
	}

	$mysqli->close();

	return $risultato;

}

function escape($param){

	$mysqli = new mysqli("127.0.0.1","root",null);
	
	if($mysqli->connect_error){
		die($mysqli->connect_errno);
	}

	$escaped = $mysqli->real_escape_string($param);
	$mysqli->close();

	return $escaped;

}

function amiciComune($idAmico){

	$utente = $_SESSION["user"];
	$idAmico = $this->escape($idAmico);

	/*$sql = "select * from my_luigix25.amici where  (select * from my_luigix25.amici where utente1=".$utente." or utente2=".$utente." and accettata is not null) as d 

	(select * from my_luigix25.amici where utente1=".$idAmico." or utente2=".$idAmico." and accettata is not null) as d2 "
*/

	$sql = "select * from (select utente1 as id from my_luigix25.amici a1 where utente2=".$utente." and a1.accettata is not null union select utente2 as id from my_luigix25.amici a2 where a2.accettata is not null and utente1=".$utente.") as d inner join (select utente1 as id from my_luigix25.amici a1 where utente2=".$idAmico." and a1.accettata is not null union select utente2 as id from my_luigix25.amici a2 where a2.accettata is not null and utente1=".$idAmico.") as d2 on (d.id = d2.id) inner join my_luigix25.utenti u on(d.id = u.id)";
	return $this->eseguiQuery($sql);
	
	}

}
?>