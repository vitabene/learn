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