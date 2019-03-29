function archivio(){

	send_request("POST","api/last_message.php","",function(response){

		var obj = JSON.parse(response);
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

	});

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

	var click_fuori = document.createElement("div");
	click_fuori.id="click_fuori";

	click_fuori.addEventListener("click",function(){
		chiudi();
	});

	document.body.appendChild(click_fuori);
	document.body.appendChild(archivio_chat);

	send_request("POST","api/chat.php","des="+id+"&limit=1",function(response){

		var obj = JSON.parse(response);

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
	});

}

function chiudi(){

	var archivio_chat = document.getElementById("archivio_chat");
	var sfondo = document.getElementById("click_fuori");
	if(archivio_chat != null && sfondo != null){
		archivio_chat.parentNode.removeChild(archivio_chat);
		sfondo.parentNode.removeChild(sfondo);

	}

}

function carica_archivio(){

	archivio();
	polling_notifiche(1,1);
	polling_richieste(1);

}