var App = {
	pairDatabase: [],
	pairsGenerated: 5,
	pairsInUse: [],
	indexesUsed: [],
	indexesLeft: 0,
	lineNodes: [],
	lineParent: {},
	mistakes: [],
	correct: 0,
	startButton: {},
	checkButton: {},
	message: {},
	time: 0
};

App.populateDatabase = function(setName){
	if (setName == "") {
		console.log("no arg passed");
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
				App.indexesLeft = App.pairDatabase.length;
			}
		}
		xmlhttp.open("GET","./includes/getpairs.php?id=" + setName, true);
		xmlhttp.send();
	}
	return true;
}
App.generatePairs = function() {
	var numberOfPairs = App.pairsGenerated, pairsChosen = [], valueNodes = [], associativePairArray = [];

	if (App.indexesLeft < numberOfPairs) {
		numberOfPairs = App.indexesLeft;
	}
	App.indexesLeft -= numberOfPairs;
	App.refresh();
	App.lineParent.removeChild(App.checkButton);

	//if there is less pairs than is to be generated
	if (App.pairDatabase.length < App.pairsGenerated) App.pairsGenerated = App.pairDatabase.length;

	indexesFromDB = randomIndexesFromDB(numberOfPairs, App.pairDatabase, App.indexesUsed);
	App.pairsInUse = pairArrayFromIndexes(indexesFromDB, App.pairDatabase);

	for (var i = 0; i < App.pairsInUse.length; i++) {
		valueNodes.push(App.pairsInUse[i].valueNode);
	}

	valueNodes = shuffleArray(valueNodes);
	var lastYCoord = 0, firstYCoord = 0;
	for (i = 0; i < numberOfPairs; i++) {
		var key = App.pairsInUse[i].keyNode, value = valueNodes[i];
		key.id = "k" + i;
		associativePairArray[key.id] = App.pairsInUse[i];
		byId("leftcol").appendChild(key);
		byId("rightcol").appendChild(value);
		if (i === 0) firstYCoord = value.getBoundingClientRect().top;
		lastYCoord = value.getBoundingClientRect().bottom;
	}
	App.pairsInUse = associativePairArray;
	App.lineParent.style.height = (20 + lastYCoord) + "px";
	App.checkButton.style.marginTop = (lastYCoord - firstYCoord + 50) + "px";
	App.lineParent.appendChild(App.checkButton);
	return true;
}
App.notify = function(messageText) {
	App.message = document.createElement('div'), text = document.createElement('span'), removeButton = document.createElement('span');

	App.message.id = 'message';
	text.innerHTML = messageText;

	removeButton.id = 'remove-message';
	removeButton.innerHTML = 'X';

	App.message.appendChild(text)
	App.message.appendChild(removeButton);

	App.messageParent.insertBefore(App.message, App.messageParent.firstChild);

	removeButton.addEventListener("click", function() {
		App.messageParent.removeChild(this.parentNode);
		App.message = {};
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
		pair.assignedValue = App.lineNodes["value"].innerHTML;
		App.lineParent.insertBefore(App.createLine(), App.checkButton);

		setTimeout(function() {clearClass("selected")}, 300);
		App.lineNodes = [];
	}
	return true;
}
App.refresh = function() {
	App.lineNodes = [];
	App.pairsInUse = [];
	removeAllChildren("rightcol");
	removeAllChildren("leftcol");
	return true;
}
App.sendDataTo = function(url, method){
	var form = document.createElement('form');
	form.method = method;
	form.action = url;

	//sending number of mistakes, number of pairs, time for set, JSON mistakes, set id
	var inputs = [];
	for (var i = 0; i < 4; i++) {
		inputs[i] = document.createElement('input');
	}

	inputs[0].name = 'num_of_mistakes';
	inputs[0].value = App.mistakes.length;

	inputs[1].name = 'num_of_pairs';
	inputs[1].value = App.pairDatabase.length;

	inputs[2].name = 'time';
	inputs[2].value = App.time;

	//cannot pass Pair object, need to add toString() method returning pre-JSON Object to Pair class
	// inputs[3].name = 'json_mistakes';
	// inputs[3].value = App.getJSONMistakes();

	inputs[3].name = 'set_id';
	inputs[3].value = App.lineParent.dataset.set;

	inputs[4] = document.createElement('button')
	inputs[4].type = 'submit';

	for (var i = inputs.length - 1; i >= 0; i--) {
		form.appendChild(inputs[i]);
	}
	form.style.display = 'none';
	App.lineParent.appendChild(form);
	form.submit();
}
App.createLine = function() {
	var keyNode = App.lineNodes["key"], valueNode = App.lineNodes["value"], boundingRects = [keyNode.getBoundingClientRect(), valueNode.getBoundingClientRect(), App.lineParent.getBoundingClientRect()],
	nodeHeight = boundingRects[0].bottom - boundingRects[0].top,
	beginning =  {x: boundingRects[0].right, y: boundingRects[0].top + (nodeHeight/2)},
	end = { x: boundingRects[1].left, y: boundingRects[1].top + (nodeHeight/2)},
	rectangle = {x: end.x - beginning.x, y: end.y - beginning.y},
	length = Math.sqrt(Math.pow(rectangle.x, 2) + Math.pow(rectangle.y, 2)),
	angle = Math.asin(rectangle.y/length) * (180/Math.PI),
	position = {x: beginning.x + (rectangle.x - length)/2 - boundingRects[2].left, y: beginning.y + (rectangle.y/2) - boundingRects[2].top};

	var lineElement = document.createElement("span");
	lineElement.className = "line";

	var addStyles = function(line) {
		//the -1 and +1 are there just for aesthetic reason
		line.style.width = round(length - 1, 1) + "px";
		line.style.marginTop = round(position.y, 1) + "px";
		line.style.marginLeft = round(position.x + 1, 1) + "px";
		if (angle !== 0) line.style.webkitTransform = line.style.MozTransform = line.style.msTransform = line.style.OTransform = line.style.transform = "rotate(" + round(angle, 1) + "deg)";
	}

	addStyles(lineElement);

	var keyId = keyNode.id;
	lineElement.id = "l" + keyId.substring(keyId.length - 1);
	valueNode.id = "v" + keyId.substring(keyId.length - 1);

	return lineElement;
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

			// TO REFACTOR ASAP
			if (App.mistakes.indexOf(currentMistakes[k]) === -1) {
				App.mistakes.push(currentMistakes[k]);
			}


		});

		//if no mistakes made, generate pairs in 1 second
		if (currentMistakes.length === 0) {
			setTimeout(function() {
				if (App.indexesLeft === 0) {
					App.time = Math.floor((new Date().getTime() - App.time)/1000);
					App.sendDataTo("results.php", 'post');
				}
				App.generatePairs();
			}, 1000);
		} else {
			setTimeout(function() {
				clearClass("mistake");
			}, 1000);
		}
		removeNodesWithClass("line");

	} else {
		if (!App.message.childNodes) App.notify("Please connect all bubbles.");
	}
	return true;
}
App.getScore = function() {
	var pairs = App.pairDatabase.length, mistakes = App.mistakes.length, scoreMessage = "Your score is " + round((pairs - mistakes)/pairs * 100, 2) + " % = " + (pairs - mistakes) + " / " + pairs;
	return scoreMessage;
}
App.getJSONMistakes = function() {
	var mistakesJSONObject = {};
	for (var i = 0; i < App.mistakes.length; i++) {
		var pair = App.mistakes[i], tempArr = [];
		tempArr[0] = pair.keyNode.innerHTML;
		tempArr[1] = pair.valueNode.innerHTML;
		tempArr[2] = pair.assignedValue;
		tempArr = tempArr.join();
		console.log(tempArr);

		//assigned value is correct by rounds, need to address
		mistakesJSONObject[i] = tempArr;
	}
	console.log(JSON.stringify(mistakesJSONObject));
	return JSON.stringify(mistakesJSONObject);
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

	  App.messageParent = byTag('main')[0];
	  App.lineParent = byId("pair-list");
	  App.populateDatabase(App.lineParent.dataset.set);
	  App.startButton = document.createElement("button"), App.checkButton = document.createElement("button");
	  App.startButton.innerHTML = "start";
	  App.startButton.style.marginBottom = '50px';
	  App.checkButton.innerHTML = "check";
	  App.lineParent.appendChild(App.startButton);

	  App.lineParent.addEventListener("click", function(e) {
	  	if (e.target) {
	  		if (e.target.nodeName === "LI") App.connect(e.target);
	  		else if (e.target === App.startButton) {
	  			removeNodesWithClass("heading");
	  			App.startButton.style.display = "none";
	  			App.lineParent.appendChild(App.checkButton);
	  			App.generatePairs();
	  			App.time = new Date().getTime();
	  		} else if (e.target === App.checkButton) {
	  			App.checkPairs();
	  		}
	  	}
	  }, false);
	  return true;
	}
	document.addEventListener("DOMContentLoaded", App.init);