function login(){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/login_service.php?op=1", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			if(xhttp.responseText == "Ok"){
				window.location="index.php";
			}
			else
				alert("Username o Passoword errati!");
		}

};
	
	var username = document.getElementById("text");
	var password = document.getElementById("password");

	xhttp.send("text="+username.value+"&password="+password.value);

}

function logout(){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/login_service.php?op=0", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			
			window.location="index.php";
		
		}

	};


	xhttp.send();

}

function sposta(nodo,funzione){

if(funzione == 0){
		//tiro giu
		var inp = nodo;	
		inp.style.borderBottom = "";	
	
		if(inp.value != "")
			return;

		var lab = nodo.parentNode.children[1];
		lab.style.top="";
		lab.style.fontSize="";
		lab.style.color="";
		lab.style.fontWeight="";

		
	} else {

		var lab = nodo.parentNode.children[1];
		lab.style.top="-17px";
		lab.style.fontSize="15px";
		lab.style.color="black";
		lab.style.opacity="1";
		lab.style.fontWeight="bold";

		var inp = nodo;
		inp.style.borderBottom = "2px solid black";

	}
}

function controllo_numeri(input){

	if(input.value == "")
		return;

	var numero = parseInt(input.value.substring(input.value.length-1));

	if(numero <0 || numero >9 || isNaN(numero))
		input.value = input.value.substring(0,input.value.length-1);

}

function controlla_param(){


	var form = document.getElementById("id_registrazione");
	var pass = document.getElementById("pass_reg");
	var pass_c = document.getElementById("conferma_pass");

	var email = document.getElementById("email_reg");
	var email_c = document.getElementById("conferma_email");

	var giorno = document.getElementById("giorno");
	var mese = document.getElementById("mese");
	var anno = document.getElementById("anno");


	pass.setCustomValidity('');
	pass_c.setCustomValidity('');
	email.setCustomValidity('');
	email_c.setCustomValidity('');
	giorno.setCustomValidity('');
	mese.setCustomValidity('');
	anno.setCustomValidity('');


	if((pass.value != "" && pass_c.value != "") && (pass.value.localeCompare(pass_c.value)!=0)){
		pass.setCustomValidity("Le password non corrispondono");
		return;
	}

	if((email.value != "" && email_c.value != "") && (email.value.localeCompare(email_c.value)!=0)){
		console.log(email.value+" "+email_c.value);
		email.setCustomValidity("Le email non corrispondono");
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

	if(email.value != null && email.value.indexOf('@') == -1){
		email.setCustomValidity("Email non valida");
		return;
	}

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/email_uso.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			if(xhttp.responseText == "si"){
				email.setCustomValidity('Email gia in uso');
				return;
			} else {
				email.setCustomValidity('');
			}
		}
	};

	if(email.value != null)
		xhttp.send("email="+email.value);

}

function registrati(){

	var nome = document.getElementById("nome_reg");
	var cognome = document.getElementById("cognome_reg");

	var pass = document.getElementById("pass_reg");
	var email = document.getElementById("email_reg");

	var giorno = document.getElementById("giorno");
	var mese = document.getElementById("mese");
	var anno = document.getElementById("anno");

	var citta = document.getElementById("citta");

	var m = document.getElementById("m");

	var str_data = anno.value+'-'+mese.value+'-'+giorno.value;
	var m_f='F';
	if(m.checked)
		m_f='M';

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/registra.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			window.location="index.php"

		}


	};


	xhttp.send("nome="+nome.value+"&cognome="+cognome.value+"&d_n="+str_data+"&pass="+pass.value+"&email="+email.value+"&sesso="+m_f+"&citta="+citta.value);



}

function label(){

	var array = document.getElementsByTagName("label");

	for(var i=0;i<array.length;i++){
			array[i].addEventListener("click",function(){
				label_click(i);
			});
	}

}

function label_click(l){

	l.previousSibling.previousSibling.focus();

}