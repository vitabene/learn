var pairDatabase = [["Logen", "Nine-fingers"], ["Thorin", "Oakenshield"], ["Kvothe", "Kote"], ["Master", "Elodin"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Tyrion", "Lannister"], ["Harry", "Dresden"], ["Bilbo", "Baggins"], ["Max", "McDaniels"], ["Dorian", "Grey"], ["Arya", "Stark"], ["Euron", "Greyjoy"], ["Daenarys", "Targaryen"]];

// var pairDatabase = [["Sofoklés", "Král Oidipús"], ["Boccaccio, Giovanni", "Dekameron"], ["Komenský, Jan Amos", "Labyrint světa a ráj srdce"], ["Neruda, Jan", "Balady a romance"], ["Wilde, Oscar", "Jak je důležité míti Filipa"], ["Salinger, Jerome David", "Kdo chytá v žitě"], ["Čapek, Karel", "RUR"], ["Svěrák a Smoljak", "Posel z Liptákova"], ["Vančura, Vladislav", "Rozmarné léto"], ["Bradbury, Ray", "451 ° Fahrenheita"], ["Kafka, Franz", "Proměna"], ["Williams, Tennessee", "Kočka na rozpálené plechové střeše"]];

var minPairsGenerated = 8, pairsInUse = [], indexesUsed = [], connection = [], lineNodes = [], mistakes = 0;

document.addEventListener("DOMContentLoaded", init);

function init() {
	/*document.onkeydown = function (evt) {
		var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
		if (keyCode == 13) {
			addPair();
		}
	}*/

	/*window.onbeforeunload = function(e) {
	    return "Sure you want to leave?";
	}*/

	byId("pair-list").addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "LI") {
            makeConnection(e.target);
        }
    })
}

function refresh() {
	var parent = byId("pair-list");
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

function makeVisualConnection() {
	var rect1 = lineNodes[0].getBoundingClientRect(), rect2 = lineNodes[1].getBoundingClientRect(), outerRect = byId("pair-list").getBoundingClientRect();
	var height1 = rect1.bottom - rect1.top, height2 = rect2.bottom - rect2.top;
	var lineBeginning = {x: rect1.right, y: rect1.top + (height1/2)};
	var lineEnd = { x: rect2.left, y: rect2.top + (height2/2)};
	var Y = lineEnd.y - lineBeginning.y;
	var X = lineEnd.x - lineBeginning.x;
	var lineWidth = Math.sqrt(Math.pow(Y, 2) + Math.pow(X, 2));
	var lineAngle = round(Math.asin(Y/lineWidth) * (180/Math.PI), 1);
	var linePosition = {x: lineBeginning.x + (X/2) - (lineWidth/2) - outerRect.left, y: lineBeginning.y + (Y/2) - outerRect.top + 3	};
	var line = document.createElement("span");

	line.className = "line";

	line.dataset.a = lineNodes[0].innerHTML;
	line.dataset.b = lineNodes[1].innerHTML;
	line.dataset.keyindex = lineNodes[0].dataset.keyindex;
	line.dataset.valueindex = lineNodes[1].dataset.valueindex;

	line.style.width = round(lineWidth, 1) + "px";
	line.style.marginTop = round(linePosition.y, 1) + "px";
	line.style.marginLeft = round(linePosition.x, 1) + "px";
	line.style.webkitTransform 	= "rotate(" + lineAngle + "deg)";
	line.style.MozTransform 	= "rotate(" + lineAngle + "deg)";
	line.style.msTransform 		= "rotate(" + lineAngle + "deg)";
	line.style.OTransform 		= "rotate(" + lineAngle + "deg)";
	line.style.transform 		= "rotate(" + lineAngle + "deg)";

	byId("pair-list").appendChild(line);
}

function makeConnection(button) {

	if (!!button.dataset.keyindex && !!lineNodes[0]) {
		lineNodes[0].className = "";
	} else if (!!button.dataset.valueindex && !!lineNodes[1]) {
		lineNodes[1].className = "";
	}

	if (button.className.indexOf("connect") === -1 || button.className.indexOf("mistake") !== -1) button.className = "connect";
	else button.className = "";
	var lines = byClassName("line");

	if (lines.length > 0) {
		for (i = 0; i < lines.length; i++) {
			if (lines[i].dataset.keyindex === button.dataset.keyindex) {
				lines[i].parentNode.removeChild(lines[i]);
			} else if (lines[i].dataset.valueindex === button.dataset.valueindex) {
				lines[i].parentNode.removeChild(lines[i]);
			}
		}
	}

	if (!button.dataset.keyindex) {
		connection[1] = button.innerHTML;
		lineNodes[1] = button;
	} else {
		connection[0] = button.innerHTML;
		lineNodes[0] = button;
	}

	if (!!connection[0] && !!connection[1]) {
		makeVisualConnection();

		setTimeout(function() {clearClass("connect")}, 300);

		connection = [];
	}

	var lines = byClassName("line");
	if (lines.length !== pairsInUse.length) byId("checkbutton").disabled = true;
	else byId("checkbutton").disabled = false;
}

function clearClass(clearClassName) {
	var lis = byClassName(clearClassName);
	if (lis.length === 0) return;
	lis[1].className = lis[1].className.replace(clearClassName, "");
	lis[0].className = lis[0].className.replace(clearClassName, "");
}

function checkPairs() {
	var lines = byClassName("line");
	var keys = getChildrenOfId("leftcol");
	var values = getChildrenOfId("rightcol");

	if (lines.length === pairsInUse.length) {
		for (i = 0; i < pairsInUse.length; i++) {
			for (j = 0; j < lines.length; j++) {
				if (pairsInUse[i][0] === lines[j].dataset.a && pairsInUse[i][1] === lines[j].dataset.b) {
					keys[lines[j].dataset.keyindex].className = "correct";
					values[lines[j].dataset.valueindex].className = "correct";
				} else if (pairsInUse[i][0] === lines[j].dataset.a && pairsInUse[i][1] !== lines[j].dataset.b) {
					keys[lines[j].dataset.keyindex].className = "mistake";
					values[lines[j].dataset.valueindex].className = "mistake";
					mistakes++;
				}
			}
		}

		if (byClassName("mistake").length === 0) {
			setTimeout(generatePairs, 1000);
		}

	} else {
		message("Please connect all bubbles.");
	}

}

function displayScore() {
	var scoreMessage = "Your score is " + round((pairDatabase.length - mistakes)/pairDatabase.length * 100, 2) + " % = " + (pairDatabase.length - mistakes) + " / " + pairDatabase.length;
	message(scoreMessage);
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

function generatePairs() {
	refresh();

	byId("startbutton").disabled = true;
	byId("checkbutton").disabled = true;

	// var numberOfPairs = +byTag("input")[name="num-of-pairs"].value, pairsChosen = [], values = [];
	var numberOfPairs = minPairsGenerated, pairsChosen = [], values = [];

	pairsInUse = [];

	var diff = pairDatabase.length - indexesUsed.length;

	if (diff < numberOfPairs) {
		numberOfPairs = diff;
	}
	if (!diff) {
		displayScore();
		message("You can fin more at http://gkolin.cz/index.php?p=28");
		byId("startbutton").disabled = false;
		byId("startbutton").innerHTML = "start over";
		indexesUsed = [];
	}

	while (numberOfPairs !== (pairsChosen.length)) {
		var randomNumber = Math.floor((Math.random() * pairDatabase.length));
		if (pairsChosen.indexOf(randomNumber) === -1 && indexesUsed.indexOf(randomNumber) === -1) {
			pairsChosen.push(randomNumber);
		}
	}

	for (i = 0; i < pairsChosen.length; i++) {
		pairsInUse.push(pairDatabase[pairsChosen[i]]);
		indexesUsed.push(pairsChosen[i]);
	}

	for (i = 0; i < pairsInUse.length; i++)	values[i] = pairsInUse[i][1];

	shuffleArray(values);

	for (i = 0; i < numberOfPairs; i++) {
		var key = document.createElement("li");
		key.innerHTML = pairsInUse[i][0];
		key.setAttribute("data-keyIndex", i);
		byId("leftcol").appendChild(key);

		var value = document.createElement("li");
		value.innerHTML = values[i];
		value.setAttribute("data-valueIndex", i);
		byId("rightcol").appendChild(value);
	}
}

function shuffleArray(a)	{
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
/*
	TRIED IT ANYWAY
	function Pair(key, values) {
	this.key = key;
	this.values = values || [];
	this.position = 0;

	for (i = 0; i < values.length; i++) {
		this.values[i] = values[i];
	}

	this.toString = function() {
		return this.key + " : " + this.values.toString();
	}
	this.save = function() {
		this.position = pairArray.length;
		pairArray[pairArray.length] = this;
		// HIDEOUS !!!!!! localStorage.pairArray += "," + pairArray; BUT WORKS

	}
}*/

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
