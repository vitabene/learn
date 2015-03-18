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
function clearClass(clearClassName) {
	var lis = byClassName(clearClassName);
	if (lis.length === 0) return;
	for (var i = lis.length - 1; i >= 0; i--) {
		lis[i].className = lis[i].className.replace(clearClassName, "");
	};
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
function isValue(button) {
	if (button.id.substring(0, 1) === "v") return true;
	return false;
}
function findKey(array, string) {
	for (var i = 0; i < array.length; i++) {
		if (array[string]) return array[string];
	}
	return false;
}
function randomIndexesFromDB(numberOfFields, databaseArray) {
	var indexesArray = [];
	while (numberOfFields !== indexesArray.length) {
		var randomNumber = Math.floor((Math.random() * databaseArray.length));
		if (indexesArray.indexOf(randomNumber) === -1) indexesArray.push(randomNumber);
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
}