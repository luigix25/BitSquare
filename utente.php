<?php
require("api/utilities.php");
	session_start();

if(!isset($_SESSION["user"])){
		header("location:"."login.php");
		die();
}

$util = new Utilities;

$user = $_SESSION["user"];
$utente = $_GET["id"];
$utente = $util->escape($utente);

$ris = $util->eseguiQuery("select * from my_luigix25.utenti where id = ".$utente);

?>


<html>
<head>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/social.js"></script>
<script type="text/javascript" src="js/notifiche.js"></script>
<script type="text/javascript" src="js/richieste.js"></script>
<script type="text/javascript" src="js/chat.js"></script>
<script type="text/javascript" src="js/cerca.js"></script>
<script type="text/javascript" src="js/login.js"></script>

<title><?php print($ris[0]["nome"]." ".$ris[0]["cognome"])?></title>
</head>

<body onload="carica()">

<div id="top">
	<?php 
		$util->stampaMenu();
	?>


</div>

<div id="left">
		<div class="polling_wrap">
			<div id="profilo_header" class="header"><?php print('<a href="utente.php?id='.$_SESSION["user"].'">'.$_SESSION["nome"]." ".$_SESSION["cognome"]."</a>");?></div>

			<img class="imgprofilo" src=<?php print('"img/profilo/'.$_SESSION["foto"].'"') ?> alt="errore">
			<div class="barra_sx"><a href="index.php">Home</a></div>
			<div class="barra_sx"><a href="messaggi.php">Archivio</a></div>
			<div class="barra_sx"><a href="javascript:settings()">Impostazioni</a></div>
			<div class="barra_sx"><a href="javascript:logout()">Logout</a></div>

		</div>
</div>

<div id="center">

<div class="polling_wrap">
	<div class="header"><?php print($ris[0]["nome"]." ".$ris[0]["cognome"])?></div>
	<div id="nome_utente">
		<img class="imgprofilo_ospite" src=<?php print('img/profilo/'.$ris[0]["foto"]) ?> alt="errore">
			
	<?php
		$amici_comune = $util->amiciComune($utente);

		if($user != $utente) {

			$sql = "select (IF(accettata is NOT NULL,1,0)) as amici from my_luigix25.amici a where ((a.utente1 =".$utente." and a.utente2 = ".$user. ") or (a.utente2 =".$utente." and a.utente1 = ".$user. "))";
			$result = $util->eseguiQuery($sql);
			
			if(empty($result)){
				$str = "Aggiungi agli amici";
			}
			else if($result[0]["amici"] == 1){
				$str ="Rimuovi dagli amici";
//				echo "siamo amici";
			}
			else {
				$str = "In attesa di conferma";
			}
		} 
			?>

			<table id="info_utente">
				<tr>
					<td>Data di Nascita: </td>
					<td><?php print($ris[0]["d_nascita"]);?></td>
					<td><?php 
						$str_tmp = "i";

						if(count($amici_comune)==1)
							$str_tmp = "o";
						if($user != $utente)
							print(count($amici_comune)." amic".$str_tmp." in comune"); 
						?>
				</tr>
				<tr>
					<td>Vive a: </td>
					<td><?php print($ris[0]["citta"]);?></td>
					<td></td>
				</tr>
				<tr>
					<td>Sesso: </td>
					<td><?php echo $ris[0]["sesso"]=="M"?"Uomo":"Donna"; ?></td>
					<td></td>
				</tr>
				<tr>
					<td>Email: </td>
					<td><?php print('<a href="mailto:'.$ris[0]["email"].'">'.$ris[0]["email"]."</a>") ?></td>
					<td><?php if($user != $utente) print("<button id='bottone_amici' class='bottone' onclick='amici(this)'>".$str."</button>");?></td>
				</tr>
			</table>
			<div id="nome_utente_info">

			
		</div>
	</div>
</div>

<?php

if(isset($result) && count($result)>0 && $result[0]["amici"] == 1){

	print("<div id='scrivi'>");
	
	$tmp = "pubblica()";
	if($user != $utente){
		$tmp = "pubblica(".$utente.")";
	}
		print('<form action="javascript:'.$tmp.'">');
		print('<input type="text" class="material_input" id="testo" placeholder="Scrivi Qualcosa">');
		print('<input type="submit" value="Invia" class="bottone">');
		print("</form>");
	print("</div>");
}

	if((!empty($result) and $result[0]["amici"] == 1) or $user == $utente)
		print('<a id="load_more" href="javascript:loadMore(1)">Carica Altri</a>');
	?>
</div>
<div id="destra">
		<div id="compleanni">
		</div>

		<div class="polling_wrap">
			<div class="header">Notifiche</div>
			<div id="notifiche" class="polling"></div>
		</div>

		<div class="polling_wrap">
			<div class="header">Richieste di amicizia</div>
			<div id="richieste" class="polling"></div>
		</div>

	</div>

	<div id="chat" onclick="apriChat()">Chat</div>


</body>
</html>