/* NEED TO JQUERYFY !!!!!!!!! */
var OutlineApp = {
	texts: [],
	outlineItems: [],
	textParent: {},
	tries: 0,
	startTime: 0
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
				console.log(OutlineApp.texts);
				OutlineApp.outputOutline();
			}
		}
		xmlhttp.open("GET","includes/getoutline.php?id=" + outlineName, true);
		xmlhttp.send();
	}
}

OutlineApp.check = function(){
	var lis = $("#sortable li");
	OutlineApp.tries +=1;
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
	if($(".correct").length === lis.length) {
		OutlineApp.startTime = Math.floor((new Date().getTime() - OutlineApp.startTime)/1000);
		OutlineApp.sendDataTo("results.php", 'post');
	}
	return true;
}

OutlineApp.sendDataTo = function(url, method){
	var form = document.createElement('form');
	form.method = method;
	form.action = url;

	//sending number of mistakes, number of pairs, time for set, JSON mistakes, set id
	var inputs = [];
	for (var i = 0; i < 3; i++) {
		inputs[i] = document.createElement('input');
	}

	inputs[0].name = 'num_of_tries';
	inputs[0].value = OutlineApp.tries;

	inputs[1].name = 'time';
	inputs[1].value = OutlineApp.startTime;

	inputs[2].name = 'set_id';
	inputs[2].value = OutlineApp.textParent.data("set");

	inputs[3] = document.createElement('button')
	inputs[3].type = 'submit';

	for (var i = inputs.length - 1; i >= 0; i--) {
		form.appendChild(inputs[i]);
	}
	form.style.display = 'none';
	OutlineApp.textParent.append(form);
	form.submit();
}

OutlineApp.outputOutline = function(){
	console.log('outputtin');
	var itemKeys = Object.keys(OutlineApp.texts);
	console.log(itemKeys);
	console.log(itemKeys.length);
	for (var i = 0; i < itemKeys.length; i++) {
		console.log(itemKeys[i]);
		OutlineApp.outlineItems[i] = new OutlineItem(OutlineApp.texts[itemKeys[i]], itemKeys[i]);
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
	OutlineApp.fetchOutline(OutlineApp.textParent.data("set"));
	$('.check').click(function() {
		OutlineApp.check();
	});
	OutlineApp.startTime = new Date().getTime();
});