/* NEED TO JQUERYFY !!!!!!!!! */
var OutlineApp = {
	texts: [],
	outlineItems: [],
	textParent: {}
}

OutlineApp.fetchOutline = function(outlineName){
	if (outlineName == "") {
		console.log("no arg passed");
		return;
	} else {
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				OutlineApp.texts = JSON.parse(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET","getoutline.php?id=" + outlineName, true);
		xmlhttp.send();
	}
	return true;
}

OutlineApp.check = function(){
	var lis = $("#sortable li");
	for (var i = 0; i < lis.length; i++) {
		var outlineNode = OutlineApp.outlineItems[i];
		if (lis[i].innerHTML === outlineNode.text) {
			outlineNode.markCorrect();
		} else {
			for (var i = 0; i < OutlineApp.outlineItems.length; i++) {
				OutlineApp.outlineItems[i].highlightMistake();
			}
			setTimeout(function() {
				$(".mistake").removeClass('mistake');
			}, 400);
			break;
		}
	}
	return true;
}
OutlineApp.outputOutline = function(){
	for (var i = 0; i < OutlineApp.texts.length; i++) {
		OutlineApp.outlineItems[i] = new OutlineItem(OutlineApp.texts[i], i);
	}
	var shuffledItems = OutlineApp.outlineItems.slice();
	shuffleArray(shuffledItems);
	for (var i = 0; i < shuffledItems.length; i++) {
		var node = shuffledItems[i].node;
		OutlineApp.textParent.append(node);
	}
	return true;
}

function OutlineItem(itemText, itemParent) {
	this.text = itemText;
	this.parent = itemParent;
	this.node = this.createNode(itemText);
}
OutlineItem.prototype.markCorrect = function(){
	this.node.className += " correct";
}
OutlineItem.prototype.highlightMistake = function(){
	this.node.className += " mistake";
}
OutlineItem.prototype.createNode = function(nodeText) {
	var liNode = document.createElement('li');
	liNode.innerHTML = nodeText;
	liNode.className = 'cell';
	return liNode;
}
function shuffleArray(a)	{
	for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
		return a;
}
$(function() {
	OutlineApp.textParent = $("#sortable");
	OutlineApp.textParent.sortable();
	OutlineApp.textParent.disableSelection();
	OutlineApp.fetchOutline(1);
	$('.check').click(function() {
		OutlineApp.check();
	});
	setTimeout(OutlineApp.outputOutline, 100);
});