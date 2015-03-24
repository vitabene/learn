/*var pairDatabase = [["Logen", "Nine-fingers"], ["Thorin", "Oakenshield"], ["Kvothe", "Kote"], ["Master", "Elodin"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Tyrion", "Lannister"], ["Harry", "Dresden"], ["Bilbo", "Baggins"], ["Max", "McDaniels"], ["Dorian", "Grey"], ["Arya", "Stark"], ["Euron", "Greyjoy"], ["Daenarys", "Targaryen"]];*/

var pairDatabase = [["Logen", "Nine-fingers"], ["Thorin", "Oakenshield"], ["Kvothe", "Kote"], ["Master", "Elodin"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Euron", "Greyjoy"], ["Daenarys", "Targaryen"]];
// var pairDatabase = [["Sofoklés", "Král Oidipús"], ["Boccaccio, Giovanni", "Dekameron"], ["Komenský, Jan Amos", "Labyrint světa a ráj srdce"], ["Neruda, Jan", "Balady a romance"], ["Wilde, Oscar", "Jak je důležité míti Filipa"], ["Salinger, Jerome David", "Kdo chytá v žitě"], ["Čapek, Karel", "RUR"], ["Svěrák a Smoljak", "Posel z Liptákova"], ["Vančura, Vladislav", "Rozmarné léto"], ["Bradbury, Ray", "451 ° Fahrenheita"], ["Kafka, Franz", "Proměna"], ["Williams, Tennessee", "Kočka na rozpálené plechové střeše"]];

var minPairsGenerated = 4, pairsInUse = [], indexesUsed = [], lineNodes = [], mistakes = 0, correct = 0;

document.addEventListener("DOMContentLoaded", init);

function init() {
	/*document.onkeydown = function (evt) {
		var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
		if (keyCode == 13) {
			enterKeyAction();
		}
	}*/

	/*window.onbeforeunload = function(e) {
	    return "Sure you want to leave?";
	}*/

	generatePairs();
	byId("pair-list").addEventListener("click", function(e) {
		if (e.target && e.target.nodeName === "LI") {
			makeConnection(e.target);
		}
	});
};function makeVisualConnection(nodeOne, nodeTwo) {
	var rect1 = nodeOne.getBoundingClientRect(), rect2 = nodeTwo.getBoundingClientRect(), outerRect = byId("pair-list").getBoundingClientRect();
	var height1 = rect1.bottom - rect1.top, height2 = rect2.bottom - rect2.top;
	var lineBeginning = {x: rect1.right, y: rect1.top + (height1/2)};
	var lineEnd = { x: rect2.left, y: rect2.top + (height2/2)};
	var Y = lineEnd.y - lineBeginning.y;
	var X = lineEnd.x - lineBeginning.x;
	var lineWidth = Math.sqrt(Math.pow(Y, 2) + Math.pow(X, 2));
	var lineAngle = round(Math.asin(Y/lineWidth) * (180/Math.PI), 1);
	var linePosition = {x: lineBeginning.x + (X/2) - (lineWidth/2) - outerRect.left, y: lineBeginning.y + (Y/2) - outerRect.top + 3	};
	var line = document.createElement("span");

	// if (nodeOne.className === "correct") line.className = "line-correct";

	line.className = "line";
	var keyId = nodeOne.id;
	line.id = "l" + keyId.substring(keyId.length - 1);

	nodeTwo.id = "v" + keyId.substring(keyId.length - 1);

	line.style.width = round(lineWidth, 1) + "px";
	line.style.marginTop = round(linePosition.y, 1) + "px";
	line.style.marginLeft = round(linePosition.x, 1) + "px";
	line.style.webkitTransform 	= "rotate(" + lineAngle + "deg)";
	line.style.MozTransform 	= "rotate(" + lineAngle + "deg)";
	line.style.msTransform 		= "rotate(" + lineAngle + "deg)";
	line.style.OTransform 		= "rotate(" + lineAngle + "deg)";
	line.style.transform 		= "rotate(" + lineAngle + "deg)";

	return line;
}

function displayScore() {
	var scoreMessage = "Your score is " + round((pairDatabase.length - mistakes)/pairDatabase.length * 100, 2) + " % = " + (pairDatabase.length - mistakes) + " / " + pairDatabase.length;
	message(scoreMessage);
};function shuffleArray(a)	{
	for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
		return a;
}

function getChildrenOfId(id) {
	var nodeList = byId(id).childNodes, array = [];
	for (var i = -1, l = nodeList.length; ++i !== l; array[i] = nodeList[i]);
		return array;
}
function round(number, numberOfDigits) {
	return Math.round(number * Math.pow(10, numberOfDigits))/(Math.pow(10, numberOfDigits));
}
function byTag(tag) {
	return document.getElementsByTagName(tag);
}
function byClassName(className) {
	return document.getElementsByClassName(className);
}
function byId(id) {
	return document.getElementById(id);
}
function clearClass(clearClassName) {
	var lis = byClassName(clearClassName);
	if (lis.length === 0) return;
	for (var i = lis.length - 1; i >= 0; i--) {
		lis[i].className = lis[i].className.replace(clearClassName, "");
	}
}

function message(messageText) {
	var message = document.createElement('div');
	message.id = 'message';
	var text = document.createElement('span');
	text.innerHTML = messageText;
	var removeButton = document.createElement('span');
	removeButton.id = 'remove-message';
	removeButton.innerHTML = 'X';
	var parent = byTag('main')[0];
	parent.insertBefore(message, parent.childNodes[0]);

	byId('message').appendChild(text);
	byId('message').appendChild(removeButton);

	byId('remove-message').addEventListener("click", function() {
		byId('remove-message').parentNode.parentNode.removeChild(byId('remove-message').parentNode);
	});
	return true;
}
function removeTagWithClass(className) {
	var paras = document.getElementsByClassName(className);
	while(paras[0]) {
		paras[0].parentNode.removeChild(paras[0]);
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
	leftcol = document.createElement("ul");
	rightcol = document.createElement("ul");
	leftcol.id = "leftcol";
	rightcol.id = "rightcol";
	parent.appendChild(leftcol);
	parent.appendChild(rightcol);
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
		var keyParent = this.keyNode.parentNode;
		keyParent.removeChild(this.keyNode);
		keyParent.insertBefore(this.keyNode, keyParent.childNodes[0]);

		var valueParent = this.valueNode.parentNode;
		valueParent.removeChild(this.valueNode);
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
};function makeConnection(button) {

	//highlighting selected node
	if (button.className !== "selected") button.className = "selected";
	else button.removeAttribute("class");

	//checking if a button in the same column was not clicked already
	if (isKey(button) && !!lineNodes["key"]) lineNodes["key"].removeAttribute("class");
	else if (!isKey(button) && !!lineNodes["value"]) lineNodes["value"].removeAttribute("class");

	//removing line immediately with id l + id of value or key
	if (!!button.id) {
		var number = button.id.substring(button.id.length - 1);
		var lookupLineId = "l" + number, lookupValueId = "v" + number;
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
		pair.drawLine(byId("pair-list"), makeVisualConnection(lineNodes["key"], lineNodes["value"]));

		setTimeout(function() {clearClass("selected")}, 300);
		lineNodes = [];
	}

	//if all buttons are connected enable check button
	/*var lines = byClassName("line"), correct = byClassName("line-correct").length;
	if (lines.length !== (pairsInUse.length - correct)) byId("checkbutton").disabled = true;
	else byId("checkbutton").disabled = false;*/
}

function checkPairs() {
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
			setTimeout(function() {
				removeAllChildren("pair-list");
				generatePairs();
			}, 1000);
		} else {
			setTimeout(function() {
				clearClass("mistake");
			}, 1000);
		}

		removeTagWithClass("line");
	} else {
		message("Please connect all bubbles.");
	}

}

function generatePairs() {
	var numberOfPairs = minPairsGenerated, pairsChosen = [], values = [], diff = pairDatabase.length - indexesUsed.length, startButton = byId("startbutton"), checkButton = byId("checkbutton"), associativePairArray = [];

	startButton.style.display = "none";
	// checkButton.disabled = true;
	pairsInUse = [];

	if (diff < numberOfPairs) {
		numberOfPairs = diff;
	}
	if (!diff) {
		//gui stuff
		displayScore();
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

	/*checkbutton positioning changing
	bad, bad code!!!!!
	fuck it, laters buttony
	var checkButtonMarginTop = byId("leftcol").lastChild.getBoundingClientRect().bottom - 40; // magic
	var checkButtonMarginLeft = byId("leftcol").getBoundingClientRect().right - 178; //magic
	checkbutton.style.marginTop = checkButtonMarginTop + "px";
	checkbutton.style.marginLeft = checkButtonMarginLeft + "px";*/

}

/*function addPair() {
	var inputs = document.getElementsByTagName("input");

	// var pair = new Pair(inputs[0].value, inputs[1].value);
	// pair.save();

	var pair = [];
	pair[inputs[0].value] = inputs[1].value;
	pairArray[pairArray.length] = pair;

	console.log(pair);
	addRow(pair);
}

function showPairs() {
	for (i = 0; i < pairArray.length; i++) {
		console.log(pairArray[i].toString());
	}
}

function deleteRow(button) {
	var row=button.parentNode.parentNode;
	row.parentNode.removeChild(row);
}

function addRow(pair) {
	var table = document.getElementById("pair-table");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);

	for(var index in pair) {
	cell1.innerHTML = index;
	cell2.innerHTML = pair.index;
	cell3.innerHTML = "<button class='del-row-button' onclick='deleteRow(this)'>delete</button>"
	}
}*/
