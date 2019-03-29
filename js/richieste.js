function polling_richieste(ripeti){

	send_request("POST","api/richieste.php","",function(response){

		var obj = JSON.parse(response);	
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

	});

	if(ripeti == 1)
		setTimeout(polling_richieste,2000,1);
}

function richiesta(id,operazione){
	
	send_request("POST","api/richieste_service.php","id="+id+"&op="+operazione,function(response){
		polling_richieste(0);
	});

}