document.addEventListener("DOMContentLoaded", function(){
	var addKeyButton = document.getElementById('addKey');

	var attachFields = function(){
		addKeyButton.removeEventListener('click', attachFields);
		var parent = addKeyButton.parentNode.parentNode, setId = addKeyButton.dataset.setId;

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

	addKeyButton.addEventListener('click', attachFields);
});