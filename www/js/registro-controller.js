var registroCo = (function() {
	var ini = ()=>{
		$('#date-registro').bootstrapMaterialDatePicker({format : 'DD/MM/YYYY', weekStart : 0, time: false });
		$(".dtp-btn-ok").click(function() {
			$(".js-date").addClass("is-dirty");
			$(".js-date").removeClass("is-invalid");
		});

		$(".volver").click(function() {
			app.auth();
		});
		
		utils.efectoInputs();

		//listener click del btn-registro llame a procesarRegistro
		$("form[name='registroFormu']").submit(function() {
			procesarRegistro();
			return false;
		});

		$("form[name='registroFormu'] input[name='avatar']").change(function() {
			var image = document.querySelector("form[name='registroFormu'] input[name='avatar']");
			utils.imgToBase64(image);
		});


	};
	var createJSON = (dni, name, email, tlf, date, password)=>{
		var json = {
			"dni":dni,
			"nombre":name,
			"email":email,
			"tlf":tlf,
			"fecha_nacimiento":date
		}
		if(utils.dataOK(json)){
			json.foto_perfil = cookies.getCookie(utils.imageCookieName);
			cookies.deleteCookie(utils.imageCookieName);
			json.fecha_nacimiento = utils.ddMMYYYYtoEpoc(date);
			peticionesAJAX.registro(json, userCo.registro);
		}
	};
	var procesarRegistro = ()=>{
		var dni = $("form[name='registroFormu'] input[name='dni']").val();
		var name = $("form[name='registroFormu'] input[name='name']").val();
		var email = $("form[name='registroFormu'] input[name='email']").val();
		var password = $("form[name='registroFormu'] input[name='password']").val();
		var repassword = $("form[name='registroFormu'] input[name='repassword']").val();
		var tlf = $("form[name='registroFormu'] input[name='tlf']").val();
		var date = $("form[name='registroFormu'] input[name='date']").val();
		
		if (password !== repassword) {
			contenido.feedBack("Contraseña no coincide");
			return;
		}

		createJSON(dni, name, email, tlf, date, password);

	};

	return{
		ini						: 			ini
	}

})();