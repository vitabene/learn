function makeConnection(button) {

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
		else if (!!byId(lookupValueId)) byId(lookupValueId).removeAttribute("id");
	}

	//putting into lineNodes associative array
	if (isKey(button)) lineNodes["key"] = button;
	else lineNodes["value"] = button;

	//both nodes defined
	if (!!lineNodes["key"] && !!lineNodes["value"]) {
		var pair = pairsInUse[lineNodes["key"].id];
		pair.setValue(lineNodes["value"].innerHTML);
		pair.drawLine(byId("pair-list"), new Line(lineNodes["key"], lineNodes["value"], byId("pair-list")));

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
		message("Please connect all bubbles.", byTag('main')[0]);
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
		message(getScoreMessage(), byTag('main')[0]);
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
