function send_request(metodo,url,param,callback){

	var xhttp = new XMLHttpRequest();
	xhttp.open(metodo, url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			callback(xhttp.responseText);
		}		
	};
	
	xhttp.send(param);
}

function send_request_nh(metodo,url,param,callback){

	var xhttp = new XMLHttpRequest();
	xhttp.open(metodo, url, true);

	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4){
			callback(xhttp.responseText);
		}		
	};
	
	xhttp.send(param);
}