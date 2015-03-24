function Pair(keyData, valueData) {

	this.createLiNode = function(nodeData) {
		var liNode = document.createElement('li');
		liNode.innerHTML = nodeData;
		return liNode;
	}
	this.setValue = function(valueToAssign){
		this.assignedValue = valueToAssign;
	}
	this.check = function() {
		if (this.valueNode.innerHTML === this.assignedValue) {
			this.markCorrect();
			this.moveUp();
			return true;
		}
		else this.highlightMistake();
		return false;
	}
	this.drawLine = function(parent, newLine) {
		this.line = newLine;
		parent.appendChild(this.line);
	}
	this.removeLine = function() {
		this.line.parentNode.removeChild(this.line);
	}
	this.moveUp = function() {
		var keyParent = this.keyNode.parentNode;
		keyParent.removeChild(this.keyNode);
		keyParent.insertBefore(this.keyNode, keyParent.childNodes[0]);

		var valueParent = this.valueNode.parentNode;
		valueParent.removeChild(this.valueNode);
		valueParent.insertBefore(this.valueNode, valueParent.childNodes[0]);
	}
	this.markCorrect = function(){
		this.keyNode.className = "correct";
		this.valueNode.className = "correct";
	}
	this.highlightMistake = function(){
		this.keyNode.className = "mistake";
		this.valueNode.className = "mistake";
	}
	this.keyNode = this.createLiNode(keyData);
	this.valueNode = this.createLiNode(valueData);
	this.assignedValue;
	this.line;
}

function Line(keyNode, valueNode, parent) {
	this.boundingRects = [keyNode.getBoundingClientRect(), valueNode.getBoundingClientRect(), parentNode.getBoundingClientRect()];
	this.nodeHeight = boundingRects[0].bottom - boundingRects[0].top;
	this.lineBeginning =  {x: boundingRects[0].right, y: boundingRects[0].top + (nodeHeight/2)};
	this.lineEnd = { x: boundingRects[1].left, y: boundingRects[1].top + (nodeHeight/2)};
	this.lineSpan = {x: this.lineEnd.x - this.lineBeginning.x, y: this.lineEnd.y - this.lineBeginning.y};
	this.lineWidth = Math.sqrt(Math.pow(this.lineSpan.x, 2) + Math.pow(this.lineSpan.y, 2));
	this.lineAngle = round(Math.asin(this.lineSpan.y/lineWidth) * (180/Math.PI), 1);

}