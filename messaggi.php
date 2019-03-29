<html>
<head>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
<title>BitSquare</title>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/social.js"></script>
<script type="text/javascript" src="js/notifiche.js"></script>
<script type="text/javascript" src="js/richieste.js"></script>
<script type="text/javascript" src="js/chat.js"></script>
<script type="text/javascript" src="js/cerca.js"></script>
<script type="text/javascript" src="js/archivio.js"></script>
<script type="text/javascript" src="js/login.js"></script>


</head>
<body onload="carica_archivio()">

<?php

session_start();
if(!isset($_SESSION["user"])){
	header("location:"."login.php");
	die();
}

?>

<div id="top">
	<?php 
		require("api/utilities.php");
		$util = new Utilities; 
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