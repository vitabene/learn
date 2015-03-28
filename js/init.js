var app;
document.addEventListener("DOMContentLoaded", function(){
	/*document.onkeydown = function (evt) {
		var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
		if (keyCode == 13) {
			enterKeyAction();
		}
	}*/

	//disabled for smooth testing
	/* window.onbeforeunload = function(e) {
	    return "Sure you want to leave?";
	}*/

	app = new App();

	if (byId("checkbutton")) {
		byId("checkbutton").addEventListener("click", function(){app.checkPairs()});
	}
	if (byId("startbutton")){
		byId("startbutton").addEventListener("click", function(){
			app.populateDatabase(byId("startbutton").dataset.set);
			// console.log(app.populateDatabase(byId("startbutton").dataset.set));
			app.generatePairs();
			// console.log(window.app.pairDatabase);
		});
	}
	if (byId("pair-list")){
		byId("pair-list").addEventListener("click", function(e) {
			if (e.target && e.target.nodeName === "LI") {
				app.connect(e.target);
			}
		});
	}

});