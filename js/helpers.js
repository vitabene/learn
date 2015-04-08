function round(number, numberOfDigits) { return Math.round(number * Math.pow(10, numberOfDigits))/(Math.pow(10, numberOfDigits));}
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
	while(parameters[0]) parameters[0].parentNode.removeChild(parameters[0]);
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
		var valueNumber = 1, keyWithValues = databaseArray[indexesArray[i]];
		if (keyWithValues.length > 2) {
			valueNumber = Math.floor((Math.random() * (keyWithValues.length - 1))) + 1;
		}
		var pair = new Pair(databaseArray[indexesArray[i]][0], databaseArray[indexesArray[i]][valueNumber]);
		pairsArray.push(pair);
	}
	return pairsArray;
}