<html>
<head>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
<title>BitSquare</title>

</head>
<body>


<div id="top">
	<?php 
		require("api/utilities.php");
		$util = new Utilities; 
		$util->stampaMenu();
	?>
</div>


	<div id="info">
		<div class="header">Info</div>
		<div id="info_contenuto">
			<img src="img/logo.png" id="logo" alt="errore">
			<h1>Social Network</h1>
			<p>
				Un social network &egrave un sito web in cui gli utenti possono interagire e comunicare fra di loro, mediante la pubblicazione di pensieri o frasi, detti anche post,
				 e l'utilizzo di una chat live.  

				 I propri post saranno fruibili solamente a coloro che sono legati a noi mediante un rapporto di "amicizia", i quali sono gestite dall'utente mediante un sistema di richieste.
			</p>

			<h1>Come Funziona</h1>
			<p>
				Per poter iniziare a condividere con gli altri utenti i propri post, &egrave necessario registrarsi al sito, inserendo informazioni quali nome, cognome e data di nascita.
				Successivamente sar&agrave inoltre possibile caricare una propria foto, detta immagine del profilo, mediante la quale gli altri utenti potranno riconoscerci.
			</p>
			<p>
				Una volta iscritti, i propri post saranno visibili solamente a coloro che sono amici con noi. Per poter stringere amicizia con un altro utente
				lo si deve cercare, utilizzando la barra che compare facendo click sulla lente di ingradimento, e fare click sul pulsante "Aggiungi agli amici".
			</p>
			<p>
				Oltre a poter mandare richieste di amicizia, potremo anche riceverle. Esse compariranno nella sezione Richieste, la quale si trova nella barra laterale destra.
			</p>
			<h1>Interazione fra Utenti</h1>
			<p>
				Una volta stretta amicizia con un utente, sar&agrave possibile scambiare messaggi in tempo reale, visualizzare tutti i suoi post, commentarli, mettervi "mi piace" e
				 scrivere sulla sua bacheca.
			</p>
			<p>
				Ogniqualvolta un utente accetter&agrave una richiesta di amicizia, commenter&agrave un nostro post, vi metter&agrave "mi piace" o scriver&agrave sulla nostra bacheca, riceveremo una notifica.
				Essa consiste in un messaggio che ci segnala quanto appena avvenuto, con la possibilit&agrave di andare direttamente ad esempio, al post cliccandoci sopra.
				Esse compariranno nella barra laterale destra, nella omonima sezione.
			</p>
			<h1>Mi Piace e Commenti</h1>
			<p>
				I "mi piace" ed i commenti sono due caratteristiche legate ai post, essi possono servire per esprimere la propria opinione, con l'autore, riguardo ci&ograve che ha 
				pubblicato. Essi sono pubblici e possono essere visti da chiunque abbia fra gli amici l'autore o, nel caso in cui sia un post in bacheca, dagli amici del "proprietario" della bacheca. 
			</p>

			<h1>Chat</h1>
			<p>
				La chat &egrave forse il miglior modo per interagire con gli altri utenti, con i quali abbiamo stretto amicizia. Essa permette di mandare, e ricevere messaggi in tempo reale.
			</p>
			<p>
				Tutti i messaggi mandati in chat sono salvati sul sito e sono disponibili per la consultazione nell'archivio, accessibile dalla barra laterale sinistra facendo click sull'omonimo link.
			</p>

			<h1>Profilo Utente</h1>
			<p>
				Ciascun utente possiede un profilo, detto anche bacheca, nel quale vengono mostrati tutti i nostri post, ed inoltre quelli dei nostri amici che sono stati scritti su di esso.
				&Egrave inoltre presente ad inizio pagina, un riepilogo dei dati anagrafici dell'utente con annessa la sua foto profilo.
			</p>
			<p>
				Se l'utente non dovesse essere nostro amico, la pagina moster&agrave solamente l'anagrafica ed un pulsante per mandargli una richiesta di amicizia.
			</p>
			<h1>Impostazioni</h1>
			<p>
				Nelle impostazioni, accessibili dalla barra laterale sinistra, potremo modificare i nostri dati anagrafici e la password, ad eccezione dell'email, la quale non potr&agrave essere modificata.
			</p>
			<p>
			&Egrave inoltre possibile, da questa sezione, cambiare o caricare la propria immagine del profilo. 
			</p>

		</div>
	</div>

		
</body>


</html>