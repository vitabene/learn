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
		if (this.valueNode.innerHTML === this.assignedValue) markCorrect();
		else highlightMistake();
	}
	this.drawLine = function(parent, newLine) {
		this.line = newLine;
		parent.appendChild(this.line);
	}
	this.keyNode = this.createLiNode(keyData);
	this.valueNode = this.createLiNode(valueData);
	this.assignedValue;
	this.line;
}

function Connection(liElement) {

}