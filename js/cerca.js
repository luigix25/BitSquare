function autocompleta(input){

	var tab_auto = document.getElementById("tab_auto");

	if(tab_auto != null)
		tab_auto.parentNode.removeChild(tab_auto);

	if(input.value == "")
		return;


	send_request("POST","api/search.php","s="+input.value,function(response){

		tab_auto = document.createElement("div");
		tab_auto.id = "tab_auto";
		var obj = JSON.parse(response);	

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

	});

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

	form.appendChild(input);
	div_wrap.appendChild(form);
	document.body.appendChild(div_wrap);

}