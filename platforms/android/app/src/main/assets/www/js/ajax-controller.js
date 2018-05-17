var peticionesAJAX = (function() {
	var login = (email, next)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: {email : email},
			url: "http://reservatureserva.ddns.net:8000/api/user/profile",
			async: false
		}).done(function(user) {
			if(user.message){
				contenido.feedBack(user.message);
				return;
			}
			cookies.setJsonInCookie(utils.userCookieName, user);
			return next(user);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var registro = (json, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/user/register",
			async: false
		}).done(function(user) {
			if(user.message){
				contenido.feedBack(user.message);
				return;
			}
			callback(user);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var updateUser = (json, callback)=>{
		$.ajax({
			type: "PUT",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/user/update",
			async: false
		}).done(function(user) {
			if(user.message){
				contenido.feedBack(user.message);
				return;
			}else{
				cookies.setJsonInCookie(utils.userCookieName, user);
				location.reload();
			}
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	}

	var borrarUsuario = (id, callback)=>{
		$.ajax({
			type: "DELETE",
			dataType: "json",
			data: {id: id},
			url: "http://reservatureserva.ddns.net:8000/api/user/delete"
		}).done(function(id) {
			callback(id);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	}

	var busqueda = (query, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: query,
			url: "http://reservatureserva.ddns.net:8000/api/search"
		}).done(function(jsonArray) {
			cookies.setCookie(utils.lastSearch, JSON.stringify(jsonArray));
			return callback(jsonArray);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var reservas = (identificador, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: {id: identificador},
			url: "http://reservatureserva.ddns.net:8000/api/user/booking"
		}).done(function(jsonArray) {
			callback(jsonArray);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var getAvailable = (json, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/user/availability",
			async: false
		}).done(function(oferta) {
			return callback(oferta);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var createBooking = (booking)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: booking,
			url: "http://reservatureserva.ddns.net:8000/api/user/createBooking",
			async: false
		}).done(function(ok) {
			location.reload();
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
			contenido.home();
		});
	};

	/*********** Shared ***********/
	var getCategorias = () => {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "http://reservatureserva.ddns.net:8000/api/categorias"
		}).done(function(jsonArray) { 
			utils.cargarCategorias(jsonArray);
		}).fail(function(error) { 
			contenido.feedBack(JSON.stringify(error)); 
		}); 
	};

	return{
		login			: 		login,
		registro		: 		registro,
		borrarUsuario	:		borrarUsuario,
		busqueda		: 		busqueda,
		reservas		: 		reservas,
		updateUser		: 		updateUser,
		getCategorias 	: 		getCategorias,
		getAvailable	: 		getAvailable,
		createBooking 	: 		createBooking
	};
})();
