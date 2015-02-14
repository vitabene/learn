document.addEventListener( "DOMContentLoaded", function() {
	document.onkeydown = function (evt) {
		var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
		if (keyCode == 13) {
			savePair();
		}
	}


});

var pairArray = [];

function Pair(key, value) {
	this.key = key;
	this.value = value;
	this.toString = function() {
		return this.key + " : " + this.value;
	}
}

function savePair() {
	var inputs = document.getElementsByTagName("input");

	var pair = new Pair(inputs[0].value, inputs[1].value);

	pairArray[pairArray.length] = pair;

	localStorage.pairArray += "," + pairArray;

	addToPairList(pair);
}

function showPairs() {
	for (i = 0; i < pairArray.length; i++) {
		console.log(pairArray[i].toString());
	}
}

function addToPairList(pair) {
	var table = document.getElementById("pair-table");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);

	cell1.innerHTML = pair.key;
	cell2.innerHTML = pair.value;
	cell3.innerHTML = "<button class='del-row-button' onclick='deleteRow(this)'>delete</button>"
}

function deleteRow(button) {
	var row=button.parentNode.parentNode;
	row.parentNode.removeChild(row);
}

/*window.onbeforeunload = function(e) {
    return "Sure you want to leave?";
}*/