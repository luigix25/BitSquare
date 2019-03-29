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

	send_request("POST","api/elimina_post.php","id="+id_post,function(response){

		if(response != "si")
			return;

		//recupero il nodo da distruggere;
		for(var i=0;i<lista_post.length;i++){
			if(lista_post[i].id == id_post){
				var center = document.getElementById("center");
				center.removeChild(document.getElementById(i));
				break;
			}

		}


	});
}


function elimina_commento(id_commento,id_post){

	send_request("POST","api/elimina_commento.php","id="+id_commento,function(response){
		if(response != "si")
			return;

		var parametro = document.getElementById(id_post);
		comment(parametro.children[parametro.children.length-2]);
	});
}

var lista_post,lista_amici;

function pubblica(id_utente){

	var param = "";

	if(id_utente)
		param="&id="+id_utente;

	var nodo = document.getElementById("testo");
	if(nodo.value=="")
		return;

	send_request("POST","api/pubblish.php","txt="+nodo.value+param,function(obj){
		polling_post(1);
	});

	testo.value="";
}

function like(bottone){

	var father = bottone.parentNode;

	var idpost = lista_post[father.id];
	var id_f = idpost.id;

	var op;
	if(lista_post[father.id].liked == 1)
		op = 1;
	else
		op = 0;

	send_request("POST","api/like.php","id="+id_f+"&op="+op,function(obj){
			var obj = JSON.parse(obj);

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
		});



}

function polling_post(ripeti){

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


	send_request("GET",link,"",function(response){

			var obj = JSON.parse(response);
			
			var prec = 0;
			
			if(lista_post != null)
				prec = lista_post.length;
			lista_post = obj;
			creaPost(prec);
		}
	);

	
	if(ripeti==0)
		setTimeout(polling_post,1000 * 60 * 5,0); // ogni 5 minuti

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

	send_request("POST","api/commenti.php","id="+lista_post[father.id].id,function(response){

			var obj = JSON.parse(response);	

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
		});

}

function post_comment(input){

	if(input.value=="")
		return;

	var idpost = lista_post[input.parentNode.parentNode.parentNode.id].id;
	send_request("POST","api/post_comment.php","txt="+input.value+"&id="+idpost,function(response){
			comment(input.parentNode.parentNode);
	});

	input.value="";


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

	send_request("POST","api/amici_add.php",str+"&"+window.location.search.substring(1),function(response){

		document.location.href = window.location;//+window.location.search;

	});

}


function compleanni(){

	var comp = document.getElementById("compleanni");

	send_request("POST","api/compleanni.php","",function(response){

		var obj = JSON.parse(response);	

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

 	});

}
