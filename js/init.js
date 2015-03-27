document.addEventListener("DOMContentLoaded", function(){
	/*document.onkeydown = function (evt) {
		var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
		if (keyCode == 13) {
			enterKeyAction();
		}
	}*/

	//disabled for smooth testing

	/*
	window.onbeforeunload = function(e) {
	    return "Sure you want to leave?";
	}*/

	var app = new App();

	byId("checkbutton").addEventListener("click", function(){app.checkPairs()});
	byId("startbutton").addEventListener("click", function(){app.generatePairs()});
	byId("pair-list").addEventListener("click", function(e) {
		if (e.target && e.target.nodeName === "LI") {
			app.connect(e.target);
		}
	});
});