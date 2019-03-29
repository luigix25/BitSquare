var lista_post,lista_amici;

function send_request(metodo,url,param,callback){

	var xhttp = new XMLHttpRequest();
	xhttp.open(metodo, url, true);
//	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			callback(xhttp.responseText);
		} else {
			callback("errore 123");
		}

	};
	
	xhttp.send(param);
}


function pubblica(id_utente){

	var param = "";
	if(id_utente)
		param="&id="+id_utente;

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/pubblish.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			post(1);
		}

	};
	
	var nodo = document.getElementById("testo");
	if(nodo.value=="")
		return;
	xhttp.send("txt="+nodo.value+param);
	testo.value="";


}

function like(bottone){

	var father = bottone.parentNode;

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/like.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);

			if(op==0)
				bottone.firstChild.nodeValue="Non mi piace piu'";
			else if(op==1)
				bottone.firstChild.nodeValue="Mi Piace";

			lista_post[father.id].liked = 1-op;

			var str;
				if(obj[0].n == 1)
					str = "a";
				else
					str = "e";

			for(var i=0;i<father.children.length;i++)
				if(father.children[i].className =="div_like")
					father.children[i].firstChild.nodeValue=	"Piace a "+obj[0].n+" person"+str;
		}

	};
	var idpost = lista_post[father.id];
	var id_f = idpost.id;

	var op;
	if(lista_post[father.id].liked == 1)
		op = 1;
	else
		op = 0;

	xhttp.send("id="+id_f+"&op="+op);


}

function carica(){

	post(0);
	compleanni();
	polling_notifiche(1,1);
	polling_richieste(1);


	var abc = function loCasc(){

	console.log("w alc");

	};
	
	test(abc);
}

function test(funzione){

	//funzione();

}




function carica_archivio(){

	archivio();
	polling_notifiche(1,1);
	polling_richieste(1);

}

function post(ripeti){

	var link = "api/get_post.php";
	var str =  window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);

	if(str.localeCompare("utente.php")==0){

		link = "api/post_bacheca.php"+window.location.search;
		var bottone = document.getElementById("bottone_amici");
		if(bottone != null && bottone.firstChild.nodeValue != "Rimuovi dagli amici")
			return;

	} else if(str.localeCompare("post.php")==0){
		link = "api/get_post.php"+window.location.search;
	}

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);
			
			var prec = 0;
			
			if(lista_post != null)
				prec = lista_post.length;
			lista_post = obj;
			creaPost(prec);
		}
	};

	xhttp.send();

	if(ripeti==0)
		setTimeout(post,1000 * 60 * 5,0); // ogni 5 minuti

}


function comment(bottone){

	var father = bottone.parentNode;

	fc = father.lastChild.firstChild

	if(fc != null){
			while(fc){
				father.lastChild.removeChild(fc);
				fc = father.lastChild.firstChild;
			}
	}
		

	var form = document.createElement("form");
	form.className="form_commenti";
	form.action="javascript:";

	var inp = document.createElement("input");
	inp.type="text";
	inp.className="material_input";
	inp.placeholder ="Scrivi un commento";

	form.addEventListener("submit",function(){
			post_comment(inp);
	});

	form.appendChild(document.createElement("hr"));
	form.appendChild(inp);

	var blocco = father.lastChild;


	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/commenti.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);	

			for(var i=0;i<obj.length;i++){
				var div_commento = document.createElement("div");
				div_commento.className = "commento";

				var commento_nome = document.createElement("div");
				commento_nome.className="div_nome";


				var wrap_img = document.createElement("div");
				wrap_img.className="wrap_img_comm";

				var img = document.createElement("img");
				img.className="img_commento";
				img.src="img/profilo/"+obj[i].foto;
				img.alt="Errore";

				wrap_img.appendChild(img);

				var ancora = document.createElement("a");
				ancora.href="utente.php?id="+obj[i].id_utente;
				ancora.appendChild(document.createTextNode(obj[i].nome+" "+obj[i].cognome));

				var orario = document.createElement("div");
				orario.className="orario";
				orario.appendChild(document.createTextNode(obj[i].timestamp1));

				commento_nome.appendChild(ancora);
				commento_nome.appendChild(orario);

				div_commento.appendChild(wrap_img);

				div_commento.appendChild(commento_nome);

				var div_testo_comm = document.createElement("div");
				div_testo_comm.appendChild(document.createTextNode(obj[i].testo));
				div_testo_comm.className ="testo_commento";

				div_commento.appendChild(div_testo_comm);

				blocco.appendChild(div_commento);
				if(obj[i].io ==1){
					var div_x = document.createElement("div");
					div_x.className = "div_x";

					var ancora_x = document.createElement("a");
					ancora_x.href = "javascript:elimina_commento("+obj[i].idc+","+father.id+")";
					ancora_x.appendChild(document.createTextNode("X"));

					div_x.appendChild(ancora_x);
					div_commento.appendChild(div_x);

				}

			}

			blocco.appendChild(form);
			father.appendChild(blocco);
		}
	};

	xhttp.send("id="+lista_post[father.id].id);


}

function post_comment(input){

	if(input.value=="")
		return;

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/post_comment.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			//alert(input.parentNode.parentNode.className);
			comment(input.parentNode.parentNode);
		}

};
	
	var idpost = lista_post[input.parentNode.parentNode.parentNode.id].id;


	xhttp.send("txt="+input.value+"&id="+idpost);
	input.value="";


}

function apriChat(){

	var tab = document.getElementById("tabella_chat");
	if(tab != null){
		document.body.removeChild(tab);
		return;
	}

	tab = document.createElement("table");
	tab.id="tabella_chat";

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "api/amici.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);
			lista_amici = obj;
			for(var i=0;i<obj.length;i++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");

				var ancora = document.createElement("a");
				ancora.href="javascript:chat("+i+","+obj[i].id+")";

				ancora.appendChild(document.createTextNode(obj[i].nome+" "+obj[i].cognome));
				td.appendChild(ancora);

				tr.appendChild(td);
				tab.appendChild(tr);
			}	
				document.body.appendChild(tab);
		
				polling_notifiche(0,0);
		}
	};

	xhttp.send();

}

var tm;

function chat(indice,id){

	ts_ultimo_mess = null;

	var tab = document.getElementById("tabella_chat");
	if(tab != null){
		document.body.removeChild(tab);
	}

	var chat = document.getElementById("conversazione");
	if(chat != null){
		document.body.removeChild(chat);
	}

	chat = document.createElement("div");
	chat.id="conversazione";

	var cont = document.createElement("div");
	cont.id="contenitore_conv";

	var barra = document.createElement("input");
	barra.type="text";
	barra.className="material_input";
	barra.placeholder="Digita un messaggio...";

	var form = document.createElement("form");
	form.action="javascript:";
	form.id="form_conv";

	form.addEventListener("submit",function(){
			send_message(barra,indice);
	});

	form.appendChild(barra);

	var header = document.createElement("div");
	header.appendChild(document.createTextNode(lista_amici[indice].nome+" "+lista_amici[indice].cognome));
	header.id="header_chat";

	header.addEventListener("click",function(){
			nascondi_chat(header.firstChild.nodeValue,indice,id);
	});

	chat.appendChild(header);


	chat.appendChild(cont);
	chat.appendChild(form);

	document.body.appendChild(chat);

	clearTimeout(tm);
	polling_chat(indice,1);
	polling_notifiche(0,0);

}

var ts_ultimo_mess;

function polling_chat(indice,repeat){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/chat.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);

			if(obj.length>0)
				ts_ultimo_mess = obj[obj.length-1].timestamp;

			var father = document.getElementById("conversazione");
			var nep = document.getElementById("contenitore_conv");

			for(var i=0;i<obj.length;i++){
				var node = document.createElement("div");

				var nomeNodo = "mess_io";
				
				if(obj[i].io == 0)
					nomeNodo = "mess_lui";

				node.className = nomeNodo;

				var txt = document.createTextNode(obj[i].contenuto);
				var div_interno = document.createElement("div");
				div_interno.className="div_interno";
				div_interno.appendChild(txt);

				node.appendChild(div_interno);
				nep.appendChild(node);

			}

		}
	};

	var pass =lista_amici[indice].id;
	id_chat_aperta = pass;

	var accoda ="";
	if(ts_ultimo_mess != null)
		accoda="&ts="+ts_ultimo_mess;

	xhttp.send("des="+pass+accoda);

	if(repeat==1)
		tm = setTimeout(polling_chat,1000,indice,repeat);
}


function send_message(barra,indice){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/messaggio.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
				polling_chat(indice,0);
				barra.value="";
				//objDiv.scrollTop = objDiv.scrollHeight;
			}
	};

	if(barra.value == "")
		return;

	var pass = lista_amici[indice].id;


	xhttp.send("des="+pass+"&tes="+barra.value);


}

function apri_cerca(){

	var tmp = document.getElementById("wrap_cerca");
	if(tmp != null){
		tmp.parentNode.removeChild(tmp);
		return;
	}

	var input = document.createElement("input");
	input.className="material_input";
	input.placeholder="Cerca Qualcosa";
	input.id="input_cerca";
	input.autocomplete="off";

	input.addEventListener("keyup",function(){
			autocompleta(this);
	});

	var div_wrap = document.createElement("div");
	div_wrap.id = "wrap_cerca";

	var form = document.createElement("form");
	form.action="javascript:";

	form.addEventListener("submit",function(){
			autocompleta(this);
	});

//	var div = document.getElementById("ancora_cerca").parentNode;
	form.appendChild(input);

	div_wrap.appendChild(form);

	//var padre = document.getElementById("top");
	document.body.appendChild(div_wrap);

	//div.insertBefore(div_wrap,div.children[3]);

}

function autocompleta(input){

	var tab_auto = document.getElementById("tab_auto");

	if(tab_auto != null)
		tab_auto.parentNode.removeChild(tab_auto);

	if(input.value == "")
		return;

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/search.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){

				tab_auto = document.createElement("div");
				tab_auto.id = "tab_auto";
				var obj = JSON.parse(xhttp.responseText);	

				for(var i=0;i<obj.length;i++){

					var ancora = document.createElement("a");
					ancora.href="utente.php?id="+obj[i].id;
					ancora.appendChild(document.createTextNode(obj[i].nome+" "+obj[i].cognome));

					var tmp = document.createElement("div");
					tmp.className="cerca_elem";
					tab_auto.appendChild(tmp);
					tmp.appendChild(ancora);

				}

				input.parentNode.appendChild(tab_auto);

			}
	};

	xhttp.send("s="+input.value);

}

function amici(bottone){

	var str;

	if(bottone.firstChild.nodeValue == "Aggiungi agli amici"){

		str="op=1";
		bottone.firstChild.nodeValue = "In attesa di conferma";

	} else {

		window.location=window.location;
		bottone.firstChild.nodeValue = "Aggiungi agli amici";
		str="op=2";
	}



var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/amici_add.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			document.location.href = window.location;//+window.location.search;
		 }
	};


	xhttp.send(str+"&"+window.location.search.substring(1));

}

function nascondi_chat(nome_cognome,indice,id){

	var chat_ = document.getElementById("conversazione");
	chat_.parentNode.removeChild(chat_);
	clearTimeout(tm);


	var nodo = document.createElement("div");
	nodo.id="chat_giu";
	nodo.appendChild(document.createTextNode(nome_cognome));


	nodo.addEventListener("click",function(){
			document.body.removeChild(nodo);
			chat(indice,id);
			ts_ultimo_mess = null;
	});


	document.body.appendChild(nodo);

}

function compleanni(){

	var comp = document.getElementById("compleanni");

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/compleanni.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);	

			if(obj.length==0){

				return;
			}

			var lista = document.createElement("div");
			lista.id = "lista_compleanni";
			lista.className="polling_wrap";

			var header = document.createElement("div");
			header.className="header";
			header.appendChild(document.createTextNode("Compleanni"));
			lista.appendChild(header);

			for(var i=0;i<obj.length;i++){
				var li = document.createElement("div");
				li.className="notifica_post";

				var ancora = document.createElement("a");
				ancora.href="utente.php?id="+obj[i].id;
				ancora.appendChild(document.createTextNode(obj[i].nome+" "+obj[i].cognome));

				li.appendChild(ancora);
				lista.appendChild(li);
			}

			comp.appendChild(lista);

		 }
	};

	//alert(str+"&"+window.location.search.substring(1));
	xhttp.send();


}

var id_chat_aperta;

function polling_notifiche(ripeti,old){

	var xhttp = new XMLHttpRequest();
	var url ="api/notifiche.php";

	if(old == 1)
		url+= "?old=1";

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);	

			if(obj.notifiche.length >0){
				var notif = document.getElementById("notifiche");
				if(notif.children.length >= 30){
					for(var i=notif.children.length-1;i>obj.notifiche.length;i--)
						notif.removeChild(notif.children[i]);
				}

				for(var i=0;i<obj.notifiche.length;i++){
					var tmp = document.createElement("div");
					tmp.className="notifica";
					var contenuto;

					var url_ancora;

					if(obj.notifiche[i].tipo == "like"){
						contenuto= obj.notifiche[i].nome+" "+obj.notifiche[i].cognome+" ha messo mi piace ad un tuo post";
						url_ancora="post.php?id="+obj.notifiche[i].id_post;
					}else if(obj.notifiche[i].tipo == "comme"){
						contenuto= obj.notifiche[i].nome+" "+obj.notifiche[i].cognome+" ha commentato un tuo post";
						url_ancora="post.php?id="+obj.notifiche[i].id_post;
					}
					else if(obj.notifiche[i].tipo == "amici"){
						contenuto= obj.notifiche[i].nome+" "+obj.notifiche[i].cognome+" ha accettato la tua richiesta di amicizia";
						url_ancora="utente.php?id="+obj.notifiche[i].id_utente;
					}
					else if(obj.notifiche[i].tipo == "p_bac"){
						contenuto= obj.notifiche[i].nome+" "+obj.notifiche[i].cognome+" ha pubblicato qualcosa sulla tua bacheca";
						url_ancora="post.php?id="+obj.notifiche[i].id_post;
					}

					var ancora = document.createElement("a");
					ancora.href=url_ancora;
					ancora.appendChild(document.createTextNode(contenuto));

					var notif_post = document.createElement("div");
					notif_post.className="notifica_post";
					notif_post.appendChild(ancora);
					notif.insertBefore(notif_post,notif.firstChild);


				}

			}

			var tmp = document.getElementById("chat_giu");

			if(obj.messaggi.length == 0){
				document.getElementById("chat").firstChild.nodeValue = "Chat";
				
				/*if(tmp != null && tmp.firstChild.nodeValue.slice(-1)==")"){
					tmp.firstChild.nodeValue = tmp.firstChild.nodeValue.substring(0,tmp.firstChild.nodeValue.length-3);
				}*/

			}

			if(obj.messaggi.length >0){
				//ding

				if(tmp != null){

					//tmp.firstChild.nodeValue = lista_amici[i].nome +" "+lista_amici[i].cognome+" ("+obj.messaggi[j].numero+")";
					
					for(var j=0;j<obj.messaggi.length;j++)
					{
						if(id_chat_aperta == parseInt(obj.messaggi[j].id_utente)){
							tmp.firstChild.nodeValue = obj.messaggi[j].nome +" "+obj.messaggi[j].cognome+" ("+obj.messaggi[j].numero+")";
						}
					}
				}
				

				var chat = document.getElementById("tabella_chat");
				//if(chat == null){
					var conta = 0;
					for(var i=0;i<obj.messaggi.length;i++)
						conta+= parseInt(obj.messaggi[i].numero);

					document.getElementById("chat").firstChild.nodeValue = "Chat ("+conta+")";
				//}
				 if(chat != null) {

					for(var i=0;i<chat.children.length;i++)
						for(var j=0;j<obj.messaggi.length;j++)
						{
							if(lista_amici[i].id == obj.messaggi[j].id_utente){
								chat.children[i].firstChild.firstChild.firstChild.nodeValue = lista_amici[i].nome +" "+lista_amici[i].cognome+" ("+obj.messaggi[j].numero+")";
							}
						}


				}


			}


		}
	};

	xhttp.send();

	if(ripeti == 1)
		setTimeout(polling_notifiche,2000,1,0);


}

function polling_richieste(ripeti){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/richieste.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);	
			var padre = document.getElementById("richieste");

			var ep = padre.firstChild;
			while(ep){
				padre.removeChild(ep);
				ep = padre.firstChild;
			}

			for(var i=0;i<obj.length;i++){
				var nodo = document.createElement("div");
				nodo.className="notifica_post";
				var span = document.createElement("div");
				span.appendChild(document.createTextNode(obj[i].nome+" "+obj[i].cognome+" ti ha inviato una richiesta di amicizia"))
				nodo.appendChild(span);

				var accetta = document.createElement("a");
				accetta.className="richiesta_button_add";
				accetta.appendChild(document.createTextNode("Aggiungi"));
				accetta.href="javascript:richiesta("+obj[i].id+",1)";

				var rifiuta = document.createElement("a");
				rifiuta.className="richiesta_button_rem"; 
				rifiuta.appendChild(document.createTextNode("Rifiuta"));
				rifiuta.href="javascript:richiesta("+obj[i].id+",0)";


				var div_wrap = document.createElement("div");
				div_wrap.className="contenitore_bottoni";
				div_wrap.appendChild(accetta);
				div_wrap.appendChild(rifiuta);

				nodo.appendChild(div_wrap);
				padre.appendChild(nodo);


			}

		}
	};

	xhttp.send();

	if(ripeti == 1)
		setTimeout(polling_richieste,2000,1);
}

function richiesta(id,operazione){
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/richieste_service.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			polling_richieste(0);
		}
	};

	xhttp.send("id="+id+"&op="+operazione);
}

function loadMore(tipo){

	var url = "api/load_more.php";

	if(tipo==1)
		url="api/load_more_bacheca.php"+window.location.search;

	var center = document.getElementById("center");
	var id_ultimo_post = center.children[center.children.length-2].id;

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);
			if(obj.length==0)
				return;

			var precedente = 0;
			if(lista_post != null)
				precedente = lista_post.length;

			lista_post = lista_post.concat(obj);

			creaPost(precedente);
		}
	};

	xhttp.send("ts="+lista_post[id_ultimo_post].timestamp);

}

function creaPost(length_old){

	var padre = document.getElementById("center");
	
	for(var i=0;i<length_old;i++)
		padre.removeChild(document.getElementById(i));


	for(var i=0;i<lista_post.length;i++){
		var node = document.createElement("div");
		node.id =i;
		node.className="post";

		var div_like = document.createElement("div");
		div_like.className ="div_like";

		var str;
		if(lista_post[i].n_like == 1)
			str = "a";
		else
			str = "e";

		var div_nome = document.createElement("div");
		div_nome.className="div_nome";

		var ancora = document.createElement("a");
		ancora.href = "utente.php?id="+lista_post[i].id_utente;

		ancora.appendChild(document.createTextNode(lista_post[i].nome+" "+lista_post[i].cognome));
		div_nome.appendChild(ancora);

		if(lista_post[i].nome_ospite != null){
			var ancora2 = document.createElement("a");
			ancora2.href = "utente.php?id="+lista_post[i].id_ospite;
			ancora2.appendChild(document.createTextNode(lista_post[i].nome_ospite+" "+lista_post[i].cognome_ospite));
			div_nome.appendChild(document.createTextNode(" > "));
			div_nome.appendChild(ancora2);
		}

		/* Orario */
		var orario = document.createElement("div");
		orario.className="orario";
		
		var ancora_orario = document.createElement("a");
		ancora_orario.href="post.php?id="+lista_post[i].id;
		ancora_orario.className ="ancora_orario";
		ancora_orario.appendChild(document.createTextNode(lista_post[i].timestamp1));
		orario.appendChild(ancora_orario);

		div_nome.appendChild(orario);
		node.appendChild(div_nome);

		var txt = document.createTextNode("Piace a "+lista_post[i].n_like+" person"+str);
		
		var txt2 = document.createTextNode(lista_post[i].contenuto);


		div_like.appendChild(txt);

		var div_testo = document.createElement("div");
		div_testo.className = "div_testo";
		div_testo.appendChild(txt2);

		node.appendChild(div_testo);
		node.appendChild(document.createElement("hr"))
		node.appendChild(div_like);

		var btn = document.createElement("button");
		btn.className="bottone_like";

		btn.addEventListener("click",function(){
			like(this);
		});

		var testo_p = "Mi piace";

		if(lista_post[i].liked == 1)
			testo_p = "Non mi piace piu'";

		btn.appendChild(document.createTextNode(testo_p));
		
		var btn2 = document.createElement("button");
		btn2.appendChild(document.createTextNode("Commenti"));
		btn2.className="bottone_like";

		btn2.addEventListener("click",function(){
			comment(this);
		});


		if(lista_post[i].io ==1){
			var div_x = document.createElement("div");
			div_x.className = "div_x";

			var ancora_x = document.createElement("a");
			ancora_x.href = "javascript:eliminaPost("+lista_post[i].id+")";
			ancora_x.appendChild(document.createTextNode("X"));

			div_x.appendChild(ancora_x);
			node.appendChild(div_x);
		}
		node.appendChild(btn);
		node.appendChild(btn2);


		var blocco_commenti = document.createElement("div");
		blocco_commenti.className = "blocco_commenti";
		node.appendChild(blocco_commenti);


		padre.insertBefore(node,document.getElementById("load_more"));

	}

}

function eliminaPost(id_post){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","api/elimina_post.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			if(xhttp.responseText != "si")
				return;

			//recupero il nodo da distruggere;
			for(var i=0;i<lista_post.length;i++){
				if(lista_post[i].id == id_post){
					var center = document.getElementById("center");
					center.removeChild(document.getElementById(i));
					break;
				}

			}


		}
	};

	xhttp.send("id="+id_post);

}


function elimina_commento(id_commento,id_post){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","api/elimina_commento.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			if(xhttp.responseText != "si")
				return;

			var parametro = document.getElementById(id_post);
			comment(parametro.children[parametro.children.length-2]);


		}
	};

	xhttp.send("id="+id_commento);

}

function settings(){

	var imp_old = document.getElementById("impo");
	if(imp_old != null){
		imp_old.parentNode.removeChild(imp_old);
		return;
	}


	var impo = document.createElement("div");
	impo.id="impo";
	window.getComputedStyle(impo).opacity;
	impo.style.opacity=1;

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


	document.body.appendChild(impo);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","api/get_current_user.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			if(xhttp.responseText == "errore")
				return;
			var obj = JSON.parse(xhttp.responseText);
			nome.value = obj.nome;
			cognome.value= obj.cognome;
			giorno.value=obj.giorno;
			mese.value=obj.mese;
			anno.value=obj.anno;
			citta.value=obj.citta;
		}
	};

	xhttp.send();


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

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/aggiorna_dati.php", true);
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			document.location.href = window.location;//+window.location.search;
		}
	};

	xhttp.send(data);


}

//var lista_id_chat;

function archivio(){

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/last_message.php", true);
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);
			var centro = document.getElementById("center");

			for(var i=0;i<obj.length;i++){
				var chat = document.createElement("a");
				chat.className="post2";
				chat.href="javascript:apriArchivio("+obj[i].id+",'"+obj[i].nome+"','"+obj[i].cognome+"')";


				var w_img = document.createElement("div");
				w_img.className="wrap_img_comm";

				var immagine = document.createElement("img");
				immagine.className = "img_archivio";
				immagine.alt = "errore";
				immagine.src="IMG/profilo/"+obj[i].foto;

				w_img.appendChild(immagine);

				var div_nome = document.createElement("div");
				div_nome.className="div_nome2";

				var span = document.createElement("span");
				span.appendChild(document.createTextNode(obj[i].nome+" "+obj[i].cognome));

				div_nome.appendChild(span);

				var orario = document.createElement("div");
				orario.className="orario";
				orario.appendChild(document.createTextNode(obj[i].ts));

				div_nome.appendChild(orario);

				chat.appendChild(w_img);
				chat.appendChild(div_nome);
				var str = "Io";
				
				if(obj[i].io == 0)
					str = obj[i].nome+" "+obj[i].cognome;

				var span2 = document.createElement("span");
				span2.appendChild(document.createTextNode(str+": "+obj[i].contenuto));

				chat.appendChild(span2);
				centro.appendChild(chat);

			}

		}
	};

	xhttp.send();

}

function apriArchivio(id,nome_a,cognome_a){

	var archivio_chat = document.getElementById("archivio_chat");
	if(archivio_chat != null)
		archivio_chat.parentNode.removeChild(archivio_chat);

	archivio_chat = document.createElement("div");
	archivio_chat.id = "archivio_chat";

	var header = document.createElement("div");
	header.className="header";
	header.appendChild(document.createTextNode(nome_a+" "+cognome_a));

	archivio_chat.appendChild(header);

	var testo_chat = document.createElement("div");
	testo_chat.className="contenitore_archivio";

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api/chat.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			var obj = JSON.parse(xhttp.responseText);

			for(var i=0;i<obj.length;i++){
				var node = document.createElement("div");

				var nomeNodo = "mess_io";
				
				if(obj[i].io == 0)
					nomeNodo = "mess_lui";

				node.className = nomeNodo;

				var txt = document.createTextNode(obj[i].contenuto);
				var div_interno = document.createElement("div");
				div_interno.className="div_interno";
				div_interno.appendChild(txt);

				node.appendChild(div_interno);
				testo_chat.appendChild(node);

			}

			archivio_chat.appendChild(testo_chat);
		}
	};


	xhttp.send("des="+id+"&limit=1");

	var click_fuori = document.createElement("div");
	click_fuori.id="click_fuori";

	click_fuori.addEventListener("click",function(){
		chiudi();
	});

	document.body.appendChild(click_fuori);
	document.body.appendChild(archivio_chat);

}

function chiudi(){

	var archivio_chat = document.getElementById("archivio_chat");
	var sfondo = document.getElementById("click_fuori");
	if(archivio_chat != null && sfondo != null){
		archivio_chat.parentNode.removeChild(archivio_chat);
		sfondo.parentNode.removeChild(sfondo);

	}

}

