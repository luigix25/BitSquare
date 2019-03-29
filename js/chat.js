var ts_ultimo_mess;

function polling_chat(indice,repeat){

	var pass =lista_amici[indice].id;
	id_chat_aperta = pass;

	var accoda ="";
	if(ts_ultimo_mess != null)
		accoda="&ts="+ts_ultimo_mess;

	
	send_request("POST","api/chat.php","des="+pass+accoda,function(response){

			var obj = JSON.parse(response);

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

	});

	if(repeat==1)
		tm = setTimeout(polling_chat,1000,indice,repeat);
}


function send_message(barra,indice){

	if(barra.value == "")
		return;

	var pass = lista_amici[indice].id;

	send_request("POST","api/messaggio.php","des="+pass+"&tes="+barra.value,function(response){

			polling_chat(indice,0);
			barra.value="";
				//objDiv.scrollTop = objDiv.scrollHeight;
	});
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

function apriChat(){

	var tab = document.getElementById("tabella_chat");
	if(tab != null){
		document.body.removeChild(tab);
		return;
	}

	tab = document.createElement("table");
	tab.id="tabella_chat";

	send_request("GET","api/amici.php","",function(response){

			var obj = JSON.parse(response);
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
	});


}