var pairDatabase = [["Lorem", "Ipsum"], ["Dog", "Woof"], ["Cat", "Miau"], ["Bacon", "Fat"], ["Jon", "Snow"], ["Tywin", "Lannister"], ["Tyrion", "Lannister"]];

var minPairsGenerated = 5, pairsInUse = [], connection = [], connections = 0;

document.addEventListener( "DOMContentLoaded", init);

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

	document.getElementById("pair-list").addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "LI") {
            makeConnection();
        }
    })
}

function makeConnection() {

}

function generatePairs() {
	var numberOfPairs = +document.getElementsByTagName("input")[name="num-of-pairs"].value;

	var pairsChosen = [];

	while (numberOfPairs !== (pairsChosen.length)) {
		var randomNumber = Math.floor((Math.random() * pairDatabase.length));
		if (pairsChosen.indexOf(randomNumber) === -1) pairsChosen.push(randomNumber);
	}

	for (i = 0; i < pairsChosen.length; i++) pairsInUse.push(pairDatabase[pairsChosen[i]]);

	var values = [];

	for (i = 0; i < pairsInUse.length; i++)	values[i] = pairsInUse[i][1];

	shuffleArray(values);

	var leftcol = document.getElementsByClassName("leftcol")[0];
	var rightcol = document.getElementsByClassName("rightcol")[0];

	for (i = 0; i < numberOfPairs; i++) {
		var key = document.createElement("li");
		key.innerHTML = pairsInUse[i][0];
		key.setAttribute("data-key", i);
		leftcol.appendChild(key);

		var value = document.createElement("li");
		value.innerHTML = values[i];
		rightcol.appendChild(value);
	}
}

function shuffleArray(a)	{
	for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
	return a;
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
