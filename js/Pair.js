function Pair(keyData, valueData) {

	this.keyNode = this.createLiNode(keyData);
	this.valueNode = this.createLiNode(valueData);
	this.assignedValue;
	this.mistakes;
}
Pair.prototype.createLiNode = function(nodeData) {
	var liNode = document.createElement('li');
	liNode.innerHTML = nodeData;
	return liNode;
}
Pair.prototype.check = function() {
	if (this.valueNode.innerHTML === this.assignedValue) {
		this.markCorrect();
		this.moveUp();
		return true;
	}
	else this.highlightMistake();
	return false;
}
Pair.prototype.moveUp = function() {
	var keyParent = this.keyNode.parentNode, valueParent = this.valueNode.parentNode;
	keyParent.removeChild(this.keyNode);
	valueParent.removeChild(this.valueNode);
	keyParent.insertBefore(this.keyNode, keyParent.childNodes[0]);
	valueParent.insertBefore(this.valueNode, valueParent.childNodes[0]);
}
Pair.prototype.markCorrect = function(){
	this.keyNode.className = "correct";
	this.valueNode.className = "correct";
}
Pair.prototype.highlightMistake = function(){
	this.keyNode.className = "mistake";
	this.valueNode.className = "mistake";
}
