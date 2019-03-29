<html>
<head>
	<title>
		Login
	</title>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
<script type="text/javascript" src="js/login.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>

</head>
<body>

<img src="img/logo.png" alt="errore" id="logo">

<div id="superblocco">
	<div class="form_login">
		<div class="header">Accedi</div>
		<div class="contenuto_login">
			<form action="javascript:login()">
				<div class="gruppo">
					<input type="text" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="text" required>
					<label onclick="label_click(this)">Email</label>
				</div>
				<div class="gruppo">
					<input type="password" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="password" required>
					<label onclick="label_click(this)">Password</label>
				</div>
				<input type="submit" class="bottone_login" value="Accedi">
			</form>
		</div>
		<img  alt="errore" id="img_home" src="img/persone.jpg">
	</div>

	<div class="form_registrati">
		<div class="header">Registrati</div>
		<div class="contenuto_login">
			<form action="javascript:registrati()" id="id_registrazione" oninput="controlla_param()">
				<div class="gruppo">
					<input type="text" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="nome_reg" required>
					<label onclick="label_click(this)">Nome</label>
				</div>
				<div class="gruppo">
					<input type="text" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="cognome_reg" required>
					<label onclick="label_click(this)">Cognome</label>
				</div>
				<div class="gruppo">
					<input type="text" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="citta" required>
					<label onclick="label_click(this)">Citta</label>
				</div>
				<div class="gruppo">
					<input type="password" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="pass_reg" required>
					<label onclick="label_click(this)">Password</label>
				</div>
				<div class="gruppo">
					<input type="password" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="conferma_pass" required>
					<label onclick="label_click(this)">Conferma Password</label>
				</div>
				<div class="gruppo">
					<input type="text" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="email_reg" required>
					<label onclick="label_click(this)">Email</label>
				</div>
				<div class="gruppo">
					<input type="text" class="mi_2" onfocus="sposta(this,1)" onblur="sposta(this,0)" id="conferma_email" required>
					<label onclick="label_click(this)">Conferma Email</label>
				</div>
				<div id="f_m">
					<input id="m" type="radio" name="sesso" checked="checked"><span>Uomo</span>
					<input id="f" type="radio" name="sesso"><span>Donna</span>
				</div>
				<div id="d_n">
					<span>Data di Nascita</span>
					<input type="text" id="giorno" maxlength="2" name="giorno" class="mi_3" placeholder="gg" onkeyup="controllo_numeri(this)" required>
					<input type="text" id="mese" name="mese" class="mi_3" placeholder="mm" maxlength="2" onkeyup="controllo_numeri(this)" required>
					<input type="text" id="anno" name="anno" class="mi_3" placeholder="aaaa" maxlength="4" onkeyup="controllo_numeri(this)" required>
				</div>
					<input type="submit" class="bottone_reg" value="Registrati">
				</div>
			</form>
		</div>
	</div>
</div>


</body>
</html>