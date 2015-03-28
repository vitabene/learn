function App() {
	//this will be fetched with ajax, not hard coded

	/*var pairDatabase = [["Logen", "Nine-fingers"], ["Thorin", "Oakenshield"], ["Kvothe", "Kote"], ["Master", "Elodin"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Tyrion", "Lannister"], ["Harry", "Dresden"], ["Bilbo", "Baggins"], ["Max", "McDaniels"], ["Dorian", "Grey"], ["Arya", "Stark"], ["Euron", "Greyjoy"], ["Daenarys", "Targaryen"]];
	var pairDatabase = [["Sofoklés", "Král Oidipús"], ["Boccaccio, Giovanni", "Dekameron"], ["Komenský, Jan Amos", "Labyrint světa a ráj srdce"], ["Neruda, Jan", "Balady a romance"], ["Wilde, Oscar", "Jak je důležité míti Filipa"], ["Salinger, Jerome David", "Kdo chytá v žitě"], ["Čapek, Karel", "RUR"], ["Svěrák a Smoljak", "Posel z Liptákova"], ["Vančura, Vladislav", "Rozmarné léto"], ["Bradbury, Ray", "451 ° Fahrenheita"], ["Kafka, Franz", "Proměna"], ["Williams, Tennessee", "Kočka na rozpálené plechové střeše"]];*/

	var minPairsGenerated = 4, pairsInUse = [], indexesUsed = [], lineNodes = [], mistakes = 0, correct = 0, pairDatabase = [];
	this.getPairDatabase = function(){
		return pairDatabase;
	}
	this.setPairDatabase = function(array){
		pairDatabase = array;
		return true;
	}

	this.populateDatabase = function(setName){
		var _this = this;
		if (setName == "") {
			return;
		} else {
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var jsonObject = JSON.parse(xmlhttp.responseText);
				var pairsArray = [];
				Object.keys(jsonObject).map(function(key){
					var keyValueArray = Array(key).concat(jsonObject[key]);
					pairsArray.push(keyValueArray);
				});
				_this.setPairDatabase(pairsArray);
				return;
        	}
        }
        xmlhttp.open("GET","getpairs.php?id="+setName,true);
        xmlhttp.send();
    }

	}

	this.generatePairs = function() {
		console.log("gen");
		var _this = this;
		console.log(window.app.getPairDatabase());
		console.log(this);
		var numberOfPairs = minPairsGenerated, pairsChosen = [], values = [], diff = pairDatabase.length - indexesUsed.length, startButton = byId("startbutton"), checkButton = byId("checkbutton"), associativePairArray = [];

		startButton.style.display = "none";
		// checkButton.disabled = true;
		pairsInUse = [];

		removeAllChildren("rightcol");
		removeAllChildren("leftcol");

		if (diff < numberOfPairs) {
			numberOfPairs = diff;
		}
		if (!diff && !isNaN(this.getScore())) {
			//gui stuff
			this.notify(this.getScore(), byTag('main')[0]);
			startButton.style.display = "inline-block";
			startButton.innerHTML = "start over";

			indexesUsed = [];
		}

		indexesFromDB = randomIndexesFromDB(numberOfPairs, this.getPairDatabase(), indexesUsed);
		pairsInUse = pairArrayFromIndexes(indexesFromDB, this.getPairDatabase());

		indexesUsed.concat(indexesFromDB);

		for (var i = 0; i < pairsInUse.length; i++) {
			values.push(pairsInUse[i].valueNode);
		}

		shuffleArray(values);

		for (i = 0; i < numberOfPairs; i++) {
			var key = pairsInUse[i].keyNode, value = values[i];
			key.id = "k" + i;
			associativePairArray[key.id] = pairsInUse[i];
			byId("leftcol").appendChild(key);
			byId("rightcol").appendChild(value);
		}
		pairsInUse = associativePairArray;
	}
	this.connect = function(button) {

		//highlighting selected node
		if (button.className !== "selected") button.className = "selected";
		else button.removeAttribute("class");

		//checking if a button in the same column was not clicked already
		if (isKey(button) && !!lineNodes["key"]) lineNodes["key"].removeAttribute("class");
		else if (!isKey(button) && !!lineNodes["value"]) lineNodes["value"].removeAttribute("class");

		//removing line immediately with id l + id of value or key
		if (!!button.id) {
			var number = button.id.substring(button.id.length - 1), lookupLineId = "l" + number, lookupValueId = "v" + number;
			if (!!byId(lookupLineId)) byId(lookupLineId).parentNode.removeChild(byId(lookupLineId));
			if (!!byId(lookupValueId)) byId(lookupValueId).removeAttribute("id");
		}

		//putting into lineNodes associative array
		if (isKey(button)) lineNodes["key"] = button;
		else lineNodes["value"] = button;

		//both nodes defined
		if (!!lineNodes["key"] && !!lineNodes["value"]) {
			var pair = pairsInUse[lineNodes["key"].id];
			pair.setValue(lineNodes["value"].innerHTML);
			byId("pair-list").appendChild(new Line(lineNodes["key"], lineNodes["value"], byId("pair-list")));

			setTimeout(function() {clearClass("selected")}, 300);
			lineNodes = [];
		}
	}

	this.notify = function(messageText, parent) {
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

	this.checkPairs = function() {
		var lines = byClassName("line");
		if ((lines.length + correct) >= minPairsGenerated) {

			lineNodes = [];
			var currentMistakes = mistakes;

			//checking
			for (var i = lines.length + (correct % 4) - 1; i >= 0; i--) {
				if (pairsInUse["k" + i].keyNode.className !== "correct") {
					if (pairsInUse["k" + i].check()) correct++;
					else mistakes++;
				}
			}

			//removing ids and classes to enable further checks
			var valueParent = byId("rightcol");
			for (var i = 0; i < valueParent.childNodes.length; i++) {
				valueParent.childNodes[i].removeAttribute("id");
			}

			if (currentMistakes === mistakes) {
				var _this = this;
				setTimeout(function() {_this.generatePairs()}, 1000);
			} else {
				setTimeout(function() {
					clearClass("mistake");
				}, 1000);
			}

			removeNodesWithClass("line");
		} else {
			this.notify("Please connect all bubbles.", byTag('main')[0]);
		}
	}
	this.getScore = function() {
		var scoreMessage = "Your score is " + round((pairDatabase.length - mistakes)/pairDatabase.length * 100, 2) + " % = " + (pairDatabase.length - mistakes) + " / " + pairDatabase.length;
		return scoreMessage;
	}
}