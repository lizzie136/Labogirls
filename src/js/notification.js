 // prueba 
 console.log("todo va bien");
 


let myform = $("form#myform");
myform.submit(function(event){
	event.preventDefault();

  let service_id = "default_service";
  let template_id = "template_FcvJzdSf";

  myform.find("button").text("Enviando...");
  emailjs.sendForm(service_id,template_id,myform[0])
  	.then(function(){ 
    	alert("La notificacion se envio correctamente!");
       myform.find("button").text("Enviado");
    }, function(err) {
       alert("Hubo un error vuelve a intentar!\r\n Response:\n " + JSON.stringify(err));
       myform.find("button").text("Intenta mas tarde.");
    });
  return false;
});

