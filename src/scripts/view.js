document.addEventListener("DOMContentLoaded", function(){

	var attachKeyFields = function(buttonNode){
		removeSurplusFields();

		var parent = buttonNode.parentNode.parentNode.parentNode, setId = buttonNode.parentNode.dataset.setId;

		var keyField = document.createElement('input'), valuesField = document.createElement('input'), submitButton = document.createElement('input'); setIdField = document.createElement('input');
		keyField.type = valuesField.type = 'text';
		setIdField.type = 'hidden';
		submitButton.type = 'submit';

		keyField.name = 'key_name';
		valuesField.name = 'values_for_key';
		setIdField.name = 'set_id';

		setIdField.value = setId;
		submitButton.value = 'add';

		parent.childNodes[1].appendChild(keyField);
		parent.childNodes[3].appendChild(setIdField);
		parent.childNodes[3].appendChild(valuesField);
		parent.childNodes[3].appendChild(submitButton);

		submitButton.addEventListener('click', sendRequest);
	}

	var attachValueFields = function(spanNode){
		removeSurplusFields();
		var parent = spanNode.parentNode, setId = spanNode.dataset.setId, key = spanNode.dataset.key;

		var keyField = document.createElement('input'), valuesField = document.createElement('input'), submitButton = document.createElement('input'); setIdField = document.createElement('input');
		setIdField.type = keyField.type = 'hidden';
		valuesField.type = 'text';
		submitButton.type = 'submit';

		keyField.name = 'key_name';
		valuesField.name = 'values_for_key';
		setIdField.name = 'set_id';

		valuesField.className = "additional-values";

		keyField.value = key;
		setIdField.value = setId;
		submitButton.value = 'add';

		parent.className += " field";
		parent.appendChild(keyField);
		parent.appendChild(setIdField);
		parent.appendChild(valuesField);
		parent.appendChild(submitButton);

		submitButton.addEventListener('click', sendRequest);

	}

	var removeSurplusFields = function(){
		var inputNodeList = document.getElementsByTagName('INPUT');
		if (inputNodeList.length === 0) return;
		while(inputNodeList.length !== 0){
		if (inputNodeList.item(0).parentNode.className === "value-td field") inputNodeList.item(0).parentNode.className = "value-td";
			inputNodeList.item(0).parentNode.removeChild(inputNodeList.item(0));
		}
	}

	var sendRequest = function(){
		var form = document.createElement('form'), inputNodeList = document.getElementsByTagName('INPUT'), inputArray = [];
		form.method = 'post';
		form.action = '';
		for (var i = 0; i < inputNodeList.length; i++) {
			inputArray[i] = inputNodeList.item(i);
		}
		for (var i = 0; i < inputArray.length; i++) {
			form.appendChild(inputArray[i]);
		}
		form.submit();
	}

	document.getElementById('pair-table').addEventListener('click', function(e){
		if (e.target) {
			if (e.target.className === "plus-key") {
				attachKeyFields(e.target);
			} else if(e.target.className === "add-value"){
				attachValueFields(e.target);
			}
		}
	});

});