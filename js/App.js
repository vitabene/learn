var App = {
	pairDatabase: [],
	pairsGenerated: 5,
	pairsInUse: [],
	indexesUsed: [],
	lineNodes: [],
	mistakes: [],
	correct: 0
};

App.populateDatabase = function(setName){
	if (setName == "") {
		console.log("no ar passed");
		return;
	} else {
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var pairsArray = [];
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var jsonObject = JSON.parse(xmlhttp.responseText);
				Object.keys(jsonObject).map(function(key){
					var keyValueArray = Array(key).concat(jsonObject[key]);
					App.pairDatabase.push(keyValueArray);
				});
			}
		}
		xmlhttp.open("GET","getpairs.php?id=" + setName, true);
		xmlhttp.send();
	}
}

App.generatePairs = function() {
	var numberOfPairs = App.pairsGenerated, pairsChosen = [], values = [], indexesLeft = App.pairDatabase.length - App.indexesUsed.length, startButton = byId("startbutton"), checkButton = byId("checkbutton"), associativePairArray = [];

	App.refresh();

	if (indexesLeft < numberOfPairs) {
		numberOfPairs = indexesLeft;
	}
	if (indexesLeft === 0) {
			//gui stuff
			console.log(App.getScore());
			startButton.style.display = "inline-block";
			startButton.innerHTML = "start over";

			App.indexesUsed = [];
		}

		indexesFromDB = randomIndexesFromDB(numberOfPairs, App.pairDatabase, App.indexesUsed);
		App.pairsInUse = pairArrayFromIndexes(indexesFromDB, App.pairDatabase);

		for (var i = 0; i < App.pairsInUse.length; i++) {
			values.push(App.pairsInUse[i].valueNode);
		}

		values = shuffleArray(values);

		for (i = 0; i < numberOfPairs; i++) {
			var key = App.pairsInUse[i].keyNode, value = values[i];
			key.id = "k" + i;
			associativePairArray[key.id] = App.pairsInUse[i];
			byId("leftcol").appendChild(key);
			byId("rightcol").appendChild(value);
		}
		App.pairsInUse = associativePairArray;
	}

	App.notify = function(messageText, parent) {
		var message = document.createElement('div'), text = document.createElement('span'), removeButton = document.createElement('span');

		message.id = 'message';
		text.innerHTML = messageText;

		removeButton.id = 'remove-message';
		removeButton.innerHTML = 'X';

		message.appendChild(text)
		message.appendChild(removeButton);

		parent.insertBefore(message, parent.firstChild);

		removeButton.addEventListener("click", function() {
			parent.removeChild(this.parentNode);
		});

		return true;
	}
	App.connect = function(button) {

	//highlighting selected node
	if (button.className !== "selected") button.className = "selected";
	else button.removeAttribute("class");

	//checking if a button in the same column was not clicked already
	if (isKey(button) && !!App.lineNodes["key"]) App.lineNodes["key"].removeAttribute("class");
	else if (!isKey(button) && !!App.lineNodes["value"]) App.lineNodes["value"].removeAttribute("class");

	//removing line immediately with id l + id of value or key
	if (!!button.id) {
		var number = button.id.substring(button.id.length - 1), lookupLineId = "l" + number, lookupValueId = "v" + number;
		if (!!byId(lookupLineId)) byId(lookupLineId).parentNode.removeChild(byId(lookupLineId));
		if (!!byId(lookupValueId)) byId(lookupValueId).removeAttribute("id");
	}

	//putting into lineNodes associative array
	if (isKey(button)) App.lineNodes["key"] = button;
	else App.lineNodes["value"] = button;

	//both nodes defined
	if (!!App.lineNodes["key"] && !!App.lineNodes["value"]) {
		var pair = App.pairsInUse[App.lineNodes["key"].id];
		pair.setValue(App.lineNodes["value"].innerHTML);
		byId("pair-list").appendChild(new Line(App.lineNodes["key"], App.lineNodes["value"], byId("pair-list")));

		setTimeout(function() {clearClass("selected")}, 300);
		App.lineNodes = [];
	}
}
App.refresh = function() {
	App.lineNodes = [];
	App.pairsInUse = [];
	removeAllChildren("rightcol");
	removeAllChildren("leftcol");
}
App.checkPairs = function() {
	var lines = byClassName("line");
	if ((lines.length + App.correct) >= App.pairsGenerated) {

		var currentMistakes = [], keys = Object.keys(App.pairsInUse), valueParent = byId("rightcol");
		for(var i = 0; i < keys.length; i++) { // For each index in the array
			var pair = App.pairsInUse[keys[i]];
			if (pair.keyNode.className !== "correct") {
				if (pair.check()) App.correct++;
				else currentMistakes.push(pair);
			}
		}

		//removing ids and classes to enable further checks
		for (var i = 0; i < valueParent.childNodes.length; i++) {
			valueParent.childNodes[i].removeAttribute("id");
		}

		//recording mistakes
		if (App.mistakes.length === 0) App.mistakes = currentMistakes.slice();
		else Object.keys(currentMistakes).map(function(k){
			if (App.mistakes.indexOf(currentMistakes[k]) === -1) App.mistakes.push(currentMistakes[k]);
		});

		//if no mistakes made, generate pairs in 1 second
		if (currentMistakes.length === 0) {
			setTimeout(function() {App.generatePairs()}, 1000);
		} else {
			setTimeout(function() {
				clearClass("mistake");
			}, 1000);
		}
		removeNodesWithClass("line");

	} else {
		App.notify("Please connect all bubbles.", byTag('main')[0]);
	}
}
App.getScore = function() {
	var pairs = App.pairDatabase.length, mistakes = App.mistakes.length, scoreMessage = "Your score is " + round((pairs - mistakes)/pairs * 100, 2) + " % = " + (pairs - mistakes) + " / " + pairs;
	return scoreMessage;
}
App.init = function(){
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

	App.populateDatabase(byId("startbutton").dataset.set);

	byId("startbutton").addEventListener("click", function(){
		App.generatePairs();
		//removing heading, needless to say - to refactor
		this.parentNode.parentNode.removeChild(this.parentNode.parentNode.childNodes[1]);
		//removing startbutton
		this.style.display = "none";
	});

	byId("checkbutton").addEventListener("click", function(){
		App.checkPairs();
	});

	byId("pair-list").addEventListener("click", function(e) {
		if (e.target && e.target.nodeName === "LI") {
			App.connect(e.target);
		}
	});
}


document.addEventListener("DOMContentLoaded", App.init());
