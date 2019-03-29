var id_chat_aperta;

function polling_notifiche(ripeti,old){

	var url ="api/notifiche.php";

	if(old == 1)
		url+= "?old=1";

	send_request("POST",url,"",function(response){

		var obj = JSON.parse(response);	

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
		}

		if(obj.messaggi.length >0){
			//ding

			if(tmp != null){

				
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
	});

	if(ripeti == 1)
		setTimeout(polling_notifiche,2000,1,0);

}
