function Line(keyNode, valueNode, parent) {
	var boundingRects = [keyNode.getBoundingClientRect(), valueNode.getBoundingClientRect(), parent.getBoundingClientRect()],
	nodeHeight = boundingRects[0].bottom - boundingRects[0].top,
	beginning =  {x: boundingRects[0].right, y: boundingRects[0].top + (nodeHeight/2)},
	end = { x: boundingRects[1].left, y: boundingRects[1].top + (nodeHeight/2)},
	rectangle = {x: end.x - beginning.x, y: end.y - beginning.y},
	length = Math.sqrt(Math.pow(rectangle.x, 2) + Math.pow(rectangle.y, 2)),
	angle = Math.asin(rectangle.y/length) * (180/Math.PI),
	position = {x: beginning.x + (rectangle.x - length)/2 - boundingRects[2].left, y: beginning.y + (rectangle.y/2) - boundingRects[2].top};

	this.lineElement = document.createElement("span");
	this.lineElement.className = "line";

	var addStyles = function(line) {
		line.style.width = round(length, 1) + "px";
		line.style.marginTop = round(position.y, 1) + "px";
		line.style.marginLeft = round(position.x, 1) + "px";
		if (angle !== 0) line.style.webkitTransform = line.style.MozTransform = line.style.msTransform = line.style.OTransform = line.style.transform = "rotate(" + round(angle, 1) + "deg)";
	}

	addStyles(this.lineElement);

	var keyId = keyNode.id;
	this.lineElement.id = "l" + keyId.substring(keyId.length - 1);
	valueNode.id = "v" + keyId.substring(keyId.length - 1);

	return this.lineElement;
}