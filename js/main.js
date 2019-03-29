function carica(){

	polling_post(0);
	compleanni();
	polling_notifiche(1,1);
	polling_richieste(1);
}

function loadMore(tipo){

	var url = "api/load_more.php";

	if(tipo==1)
		url="api/load_more_bacheca.php"+window.location.search;

	var center = document.getElementById("center");
	var id_ultimo_post = center.children[center.children.length-2].id;

	send_request("POST",url,"ts="+lista_post[id_ultimo_post].timestamp,function(response){

		var obj = JSON.parse(response);
		if(obj.length==0)
			return;

		var precedente = 0;
		if(lista_post != null)
			precedente = lista_post.length;

		lista_post = lista_post.concat(obj);

		creaPost(precedente);
	});

}

function settings(){

	var imp_old = document.getElementById("impo");
	var sfondo_old = document.getElementById("sfondo_impo");
	if(imp_old != null){
		sfondo_old.parentNode.removeChild(sfondo_old);
		imp_old.parentNode.removeChild(imp_old);
		return;
	}

	var sfondo = document.createElement("div");
	sfondo.id = "sfondo_impo";

	var impo = document.createElement("div");
	impo.id="impo";

	var header = document.createElement("div");
	header.className="header";
	header.appendChild(document.createTextNode("Impostazioni"));


	var form = document.createElement("form");
	form.id="form_impo";
	form.action="javascript:aggiorna_dati()";
	form.addEventListener("input",function(){
		controlla();
	});

	var nome = document.createElement("input");
	nome.type="text";
	nome.className="mi_2";
	nome.placeholder="Nome";
	nome.id="nome";
	nome.required = "true";

	var cognome = document.createElement("input");
	cognome.type="text";
	cognome.className="mi_2";
	cognome.placeholder="Cognome";
	cognome.required = "true";
	cognome.id="cognome";

	var password = document.createElement("input");
	password.type="password";
	password.className="mi_2";
	password.placeholder="Password";
	password.id = "password";

	var password_c = document.createElement("input");
	password_c.type="password";
	password_c.className="mi_2";
	password_c.placeholder="Conferma password";
	password_c.id = "password_c";

	var citta = document.createElement("input");
	citta.type="text";
	citta.className="mi_2";
	citta.placeholder="Citta";
	citta.id = "citta";
	citta.required="true";

	var d_n = document.createElement("div");
	d_n.id="d_n";

	var giorno = document.createElement("input");
	giorno.id="giorno";
	giorno.type="text";
	giorno.placeholder="gg";
	giorno.className="mi_3";
	giorno.required="true";
	giorno.maxLength="2";

	giorno.addEventListener("keyup",function(){
		controllo_numeri(giorno);
	});

	var mese = document.createElement("input");
	mese.id="mese";
	mese.type="text";
	mese.placeholder="mm";
	mese.className="mi_3";
	mese.required="true";
	mese.maxLength="2";

	mese.addEventListener("keyup",function(){
		controllo_numeri(mese);
	});


	var anno = document.createElement("input");
	anno.id="anno";
	anno.placeholder="aaaa";
	anno.type="text";
	anno.className="mi_3";
	anno.required="true";
	anno.maxLength="4";

	anno.addEventListener("keyup",function(){
		controllo_numeri(anno);
	});


	var span = document.createElement("span");
	span.appendChild(document.createTextNode("Data di Nascita"));

	d_n.appendChild(span);
	d_n.appendChild(giorno);
	d_n.appendChild(mese);
	d_n.appendChild(anno);


	var foto = document.createElement("input");
	foto.id="foto";
	foto.type="file";
	foto.name="foto";

	var bottone_annulla = document.createElement("button");
	bottone_annulla.className="bottone_reg";
	bottone_annulla.appendChild(document.createTextNode("Annulla"));
	bottone_annulla.addEventListener("click",function(){
		settings();
	});

	var bottone_send = document.createElement("input");
	bottone_send.type="submit";
	bottone_send.className="bottone_login";
	bottone_send.value="Aggiorna";

	form.appendChild(nome);
	form.appendChild(cognome);
	form.appendChild(password);
	form.appendChild(password_c);
	form.appendChild(citta);
	form.appendChild(d_n);
	form.appendChild(foto);
	form.appendChild(bottone_send);
	form.appendChild(bottone_annulla);

	impo.appendChild(header);
	impo.appendChild(form);


	document.body.insertBefore(sfondo,document.body.childNodes[0]);
	document.body.appendChild(impo);
	
	send_request("POST","api/get_current_user.php","",function(response){
		if(response == "errore")
			return;
		var obj = JSON.parse(response);
		nome.value = obj.nome;
		cognome.value= obj.cognome;
		giorno.value=obj.giorno;
		mese.value=obj.mese;
		anno.value=obj.anno;
		citta.value=obj.citta;
	});
}

function controlla(){

	var pass = document.getElementById("password");
	var pass_c = document.getElementById("password_c");

	var nome = document.getElementById("nome");
	var cognome = document.getElementById("cognome");

	var giorno = document.getElementById("giorno");
	var mese = document.getElementById("mese");
	var anno = document.getElementById("anno");

	pass.setCustomValidity('');
	pass_c.setCustomValidity('');
	nome.setCustomValidity('');
	cognome.setCustomValidity('');
	giorno.setCustomValidity('');
	mese.setCustomValidity('');
	anno.setCustomValidity('');


	if(pass.value != "" && pass_c.value != "" && (pass.value != pass_c.value)){
		pass.setCustomValidity("Le password non corrispondono");
		return;
	}

	if(giorno.value != "" && giorno.value>31){
		giorno.setCustomValidity("Giorno non valido");
		return;
	}

	if(mese.value != "" && (parseInt(mese.value)>12 || parseInt(mese.value<1)) ){
		mese.setCustomValidity("Mese non valido");
		return;
	}
	
	var date = new Date();
	var anno_a = date.getFullYear();
	if(anno.value != "" && parseInt(anno.value) >= anno_a){
		anno.setCustomValidity("Anno non valido");
		return;
	}


	if(giorno.value!= null && mese.value != null && anno.value != null){
		var mese_int = parseInt(mese.value);
		var giorno_int = parseInt(giorno.value);
		var anno_int = parseInt(anno.value);

        if(((mese_int == 4) || (mese_int == 6) || (mese_int == 9) || (mese_int == 11)) && (giorno_int > 30)){
        	giorno.setCustomValidity("Giorno non valido");
        	return;
        }
        else if(mese_int == 2 && giorno_int > 29){
        	giorno.setCustomValidity("Giorno non valido");
        	return;
        } else if(mese_int == 2 && giorno_int == 29 && (anno_int % 4) !=0){
			giorno.setCustomValidity("Giorno non valido");
        	return;
        }
	}
}

function aggiorna_dati(){

	var imp = document.getElementById("impo");
	if(imp == null)
		return;


	var pass = document.getElementById("password");
	var nome = document.getElementById("nome");
	var cognome = document.getElementById("cognome");
	var giorno = document.getElementById("giorno");
	var mese = document.getElementById("mese");
	var anno = document.getElementById("anno");
	var foto = document.getElementById("foto");


	var data = new FormData();

	if(pass.value != "")
		data.append("pass",pass.value);
	
	data.append("nome",nome.value);
	data.append("cognome",cognome.value);

	var str_data = anno.value+'-'+mese.value+'-'+giorno.value;
	data.append("data",str_data);

	data.append("citta",citta.value);

	if(foto.files.length >0){
		data.append("foto",foto.files[0]);
	} else
		data.append("foto","no");

	send_request_nh("POST","api/aggiorna_dati.php",data,function(response){
		document.location.href = window.location;//+window.location.search;
	});
	
}