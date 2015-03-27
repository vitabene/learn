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
});;function round(number, numberOfDigits) { return Math.round(number * Math.pow(10, numberOfDigits))/(Math.pow(10, numberOfDigits));}
function byTag(tag) { return document.getElementsByTagName(tag);}
function byClassName(className) { return document.getElementsByClassName(className);}
function byId(id) {	return document.getElementById(id);}
function shuffleArray(a)	{
	for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
		return a;
}
function getChildrenOfId(id) {
	var nodeList = byId(id).childNodes, array = [];
	for (var i = -1, l = nodeList.length; ++i !== l; array[i] = nodeList[i]);
		return array;
}
function clearClass(clearClassName) {
	var lis = byClassName(clearClassName);
	if (lis.length === 0) return;
	for (var i = lis.length - 1; i >= 0; i--) {
		lis[i].className = lis[i].className.replace(clearClassName, "");
	}
}
function removeNodesWithClass(className) {
	var parameters = document.getElementsByClassName(className);
	while(parameters[0]) {
		parameters[0].parentNode.removeChild(parameters[0]);
	}​
}
function arrayFromCollection(collection) {
	var array = [];
	for (var i = 0; i < collection.length; i++) {
		var pairArray = []
		pairArray.push(collection[i].dataset.a);
		pairArray.push(collection[i].dataset.b);
		array.push(pairArray);
	};
	return array;
}
function removeAllChildren(id) {
	var parent = byId(id);
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
function isKey(button) {
	if (button.id.substring(0, 1) === "k") return true;
	return false;
}
function findKey(array, string) {
	for (var i = 0; i < array.length; i++) {
		if (array[string]) return array[string];
	}
	return false;
}
function randomIndexesFromDB(numberOfFields, databaseArray, indexesUsed) {
	var indexesArray = [];
	while (numberOfFields !== indexesArray.length) {
		var randomNumber = Math.floor((Math.random() * databaseArray.length));
		if (indexesArray.indexOf(randomNumber) === -1 && (indexesUsed.indexOf(randomNumber) === -1)) {
			indexesArray.push(randomNumber);
			indexesUsed.push(randomNumber);
		}
	}
	return indexesArray;
}
function pairArrayFromIndexes(indexesArray, databaseArray) {
	var pairsArray = [];
	for (var i = 0; i < indexesArray.length; i++) {
		var pair = new Pair(databaseArray[indexesArray[i]][0], databaseArray[indexesArray[i]][1]);
		pairsArray.push(pair);
	}
	return pairsArray;
};function Line(keyNode, valueNode, parent) {
	var boundingRects = [keyNode.getBoundingClientRect(), valueNode.getBoundingClientRect(), parent.getBoundingClientRect()],
	nodeHeight = boundingRects[0].bottom - boundingRects[0].top,
	beginning =  {x: boundingRects[0].right, y: boundingRects[0].top + (nodeHeight/2)},
	end = { x: boundingRects[1].left, y: boundingRects[1].top + (nodeHeight/2)},
	rectangle = {x: end.x - beginning.x, y: end.y - beginning.y},
	length = Math.sqrt(Math.pow(rectangle.x, 2) + Math.pow(rectangle.y, 2)),
	angle = Math.asin(rectangle.y/length) * (180/Math.PI),
	position = {x: beginning.x + (rectangle.x - length)/2 - boundingRects[2].left, y: beginning.y + (rectangle.y/2) - boundingRects[2].top};

	this.lineElement = document.createElement("span");
	this.lineElement.className = "line";

	var addStyles = function(line) {
		line.style.width = round(length, 1) + "px";
		line.style.marginTop = round(position.y, 1) + "px";
		line.style.marginLeft = round(position.x, 1) + "px";
		if (angle !== 0) line.style.webkitTransform = line.style.MozTransform = line.style.msTransform = line.style.OTransform = line.style.transform = "rotate(" + round(angle, 1) + "deg)";
	}

	addStyles(this.lineElement);

	var keyId = keyNode.id;
	this.lineElement.id = "l" + keyId.substring(keyId.length - 1);
	valueNode.id = "v" + keyId.substring(keyId.length - 1);

	return this.lineElement;
};function Pair(keyData, valueData) {

	this.createLiNode = function(nodeData) {
		var liNode = document.createElement('li');
		liNode.innerHTML = nodeData;
		return liNode;
	}
	this.setValue = function(valueToAssign){
		this.assignedValue = valueToAssign;
	}
	this.check = function() {
		if (this.valueNode.innerHTML === this.assignedValue) {
			this.markCorrect();
			this.moveUp();
			return true;
		}
		else this.highlightMistake();
		return false;
	}
	this.drawLine = function(parent, newLine) {
		this.line = newLine;
		parent.appendChild(this.line);
	}
	this.removeLine = function() {
		this.line.parentNode.removeChild(this.line);
	}
	this.moveUp = function() {
		var keyParent = this.keyNode.parentNode, valueParent = this.valueNode.parentNode;
		keyParent.removeChild(this.keyNode);
		valueParent.removeChild(this.valueNode);
		keyParent.insertBefore(this.keyNode, keyParent.childNodes[0]);
		valueParent.insertBefore(this.valueNode, valueParent.childNodes[0]);
	}
	this.markCorrect = function(){
		this.keyNode.className = "correct";
		this.valueNode.className = "correct";
	}
	this.highlightMistake = function(){
		this.keyNode.className = "mistake";
		this.valueNode.className = "mistake";
	}
	this.keyNode = this.createLiNode(keyData);
	this.valueNode = this.createLiNode(valueData);
	this.assignedValue;
	this.line;
};function App() {
	//this will be fetched with ajax, not hard coded

	/*var pairDatabase = [["Logen", "Nine-fingers"], ["Thorin", "Oakenshield"], ["Kvothe", "Kote"], ["Master", "Elodin"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Tyrion", "Lannister"], ["Harry", "Dresden"], ["Bilbo", "Baggins"], ["Max", "McDaniels"], ["Dorian", "Grey"], ["Arya", "Stark"], ["Euron", "Greyjoy"], ["Daenarys", "Targaryen"]];
	var pairDatabase = [["Sofoklés", "Král Oidipús"], ["Boccaccio, Giovanni", "Dekameron"], ["Komenský, Jan Amos", "Labyrint světa a ráj srdce"], ["Neruda, Jan", "Balady a romance"], ["Wilde, Oscar", "Jak je důležité míti Filipa"], ["Salinger, Jerome David", "Kdo chytá v žitě"], ["Čapek, Karel", "RUR"], ["Svěrák a Smoljak", "Posel z Liptákova"], ["Vančura, Vladislav", "Rozmarné léto"], ["Bradbury, Ray", "451 ° Fahrenheita"], ["Kafka, Franz", "Proměna"], ["Williams, Tennessee", "Kočka na rozpálené plechové střeše"]];*/

	var minPairsGenerated = 4, pairsInUse = [], indexesUsed = [], lineNodes = [], mistakes = 0, correct = 0, pairDatabase = [["Logen", "Nine-fingers"], ["Thorin", "Oakenshield"], ["Kvothe", "Kote"], ["Master", "Elodin"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Euron", "Greyjoy"], ["Daenarys", "Targaryen"]];

	this.generatePairs = function() {
		var numberOfPairs = minPairsGenerated, pairsChosen = [], values = [], diff = pairDatabase.length - indexesUsed.length, startButton = byId("startbutton"), checkButton = byId("checkbutton"), associativePairArray = [];

		startButton.style.display = "none";
		// checkButton.disabled = true;
		pairsInUse = [];

		removeAllChildren("rightcol");
		removeAllChildren("leftcol");

		if (diff < numberOfPairs) {
			numberOfPairs = diff;
		}
		if (!diff) {
			//gui stuff
			this.notify(this.getScore(), byTag('main')[0]);
			startButton.style.display = "inline-block";
			startButton.innerHTML = "start over";

			indexesUsed = [];
		}

		indexesFromDB = randomIndexesFromDB(numberOfPairs, pairDatabase, indexesUsed);
		pairsInUse = pairArrayFromIndexes(indexesFromDB, pairDatabase);

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