function makeVisualConnection(nodeOne, nodeTwo) {
	var rect1 = nodeOne.getBoundingClientRect(), rect2 = nodeTwo.getBoundingClientRect(), outerRect = byId("pair-list").getBoundingClientRect();
	var height1 = rect1.bottom - rect1.top, height2 = rect2.bottom - rect2.top;
	var lineBeginning = {x: rect1.right, y: rect1.top + (height1/2)};
	var lineEnd = { x: rect2.left, y: rect2.top + (height2/2)};
	var Y = lineEnd.y - lineBeginning.y;
	var X = lineEnd.x - lineBeginning.x;
	var lineWidth = Math.sqrt(Math.pow(Y, 2) + Math.pow(X, 2));
	var lineAngle = round(Math.asin(Y/lineWidth) * (180/Math.PI), 1);
	var linePosition = {x: lineBeginning.x + (X/2) - (lineWidth/2) - outerRect.left, y: lineBeginning.y + (Y/2) - outerRect.top + 3	};
	var line = document.createElement("span");

	// if (nodeOne.className === "correct") line.className = "line-correct";

	line.className = "line";
	var keyId = nodeOne.id;
	line.id = "l" + keyId.substring(keyId.length - 1);

	nodeTwo.id = "v" + keyId.substring(keyId.length - 1);

	line.dataset.a = nodeOne.innerHTML;
	line.dataset.b = nodeTwo.innerHTML;
	line.dataset.keyindex = nodeOne.id;
	// line.dataset.valueindex = nodeTwo.dataset.valueindex;

	line.style.width = round(lineWidth, 1) + "px";
	line.style.marginTop = round(linePosition.y, 1) + "px";
	line.style.marginLeft = round(linePosition.x, 1) + "px";
	line.style.webkitTransform 	= "rotate(" + lineAngle + "deg)";
	line.style.MozTransform 	= "rotate(" + lineAngle + "deg)";
	line.style.msTransform 		= "rotate(" + lineAngle + "deg)";
	line.style.OTransform 		= "rotate(" + lineAngle + "deg)";
	line.style.transform 		= "rotate(" + lineAngle + "deg)";

	return line;
}

function displayScore() {
	var scoreMessage = "Your score is " + round((pairDatabase.length - mistakes)/pairDatabase.length * 100, 2) + " % = " + (pairDatabase.length - mistakes) + " / " + pairDatabase.length;
	message(scoreMessage);
}