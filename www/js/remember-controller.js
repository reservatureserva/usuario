var rememberCo = (function() {
	var ini = ()=>{
		eventButtons();
	};

	var eventButtons = ()=>{
		$("#btn-rem-send").click(function(){
			userCo.rememberPassword($("#remember-email").val());
		});

		$(".volver").click(function() {
			app.auth();
		});
	};

	return{
		ini		: 		ini
	}

})();