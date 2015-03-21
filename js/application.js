function makeConnection(button) {
	//checking if a button in the same column was not clicked already
	if (isKey(button) && !!lineNodes["key"]) {
		lineNodes["key"].className = "";
	} else if (!isKey(button) && !!lineNodes["value"]) {
		lineNodes["value"].className = "";
	}

	//highlighting selected node
	if (button.className !== "selected") button.className = "selected";
	else button.className = "";

	//removing line immediately with id l + id of value or key
	if (!!button.id) {
		var lookupLineId = "l" + button.id.substring(button.id.length - 1);
		if (!!byId(lookupLineId)) byId(lookupLineId).parentNode.removeChild(byId(lookupLineId));
	}

	if (isKey(button)) {
		lineNodes["key"] = button;
	} else {
		lineNodes["value"] = button;
	}

	//both nodes defined
	if (!!lineNodes["key"] && !!lineNodes["value"]) {
		var pair = pairsInUse[lineNodes["key"].id];
		pair.drawLine(byId("pair-list"), makeVisualConnection(lineNodes["key"], lineNodes["value"]));
		setTimeout(function() {clearClass("selected")}, 300);
		lineNodes = [];
	}

	//if all buttons are connected enable check button
	var lines = byClassName("line"), correct = byClassName("line-correct").length;
	if (lines.length !== (pairsInUse.length - correct)) byId("checkbutton").disabled = true;
	else byId("checkbutton").disabled = false;
}

/*function checkPairs() {
	if (true) {

		removeTagWithClass("line");

		var newKeys = getChildrenOfId("leftcol");
		var newValues = getChildrenOfId("rightcol");

		for (var i = 0; i < newKeys.length; i++) {
			if (newKeys[i].className === "correct") {
				makeVisualConnection(newKeys[i], newValues[i]);
			}
		};

		//if mistake
		if (mistakes === 0) {
			setTimeout(function() {
				generatePairs();
				removeAllChildren("pair-list");
			}, 1000);
		} else {
			setTimeout(function() {
				clearClass("mistake");
			}, 1000);

		}
	} else {
		message("Please connect all bubbles.");
	}

}*/

function generatePairs() {
	var numberOfPairs = minPairsGenerated, pairsChosen = [], values = [], diff = pairDatabase.length - indexesUsed.length, startButton = byId("startbutton"), checkButton = byId("checkbutton"), associativePairArray = [];

	startButton.style.display = "none";
	checkButton.disabled = true;

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

	indexesFromDB = randomIndexesFromDB(numberOfPairs, pairDatabase);
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
