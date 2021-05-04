(function () {
	var converted = false;
	var uenc = {
		encodedField: document.getElementById('text-processed'),
		decodedField: document.getElementById('text-orig'),
		spaceField: document.getElementById('replace-space'),
		charField: document.getElementById('replace-char'),
		messageField: document.getElementById('line-break-message'),
		encode: function () {
			try {
				var replaceChar = (this.spaceField.checked ? this.charField.value : '');
				this.encodedField.value = this.decodedField.value.replace('base', ' ').replace('pms ', '').replace('BASE', ' ').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace('PMS ', '').replace(/\r\n/g, '\n').replace(/\n\r/g, '\n').replace(/\r/g, '\n').replace(/\n/g, replaceChar);		
			} catch (e) {
				this.messageField.innerHTML = e.message;
			}
		}
	}
	document.addEventListener('keydown', function (event) {
		if (event.metaKey && event.key === 'c') {
			uenc.encodedField.value = uenc.encodedField.value.replace(' , ', '');
			uenc.decodedField.value = uenc.encodedField.value
			uenc.decodedField.select();
			document.execCommand("copy");
		}
		if (event.ctrlKey && event.key === 'c') {
			uenc.encodedField.value = uenc.encodedField.value.replace(' , ', '');
			uenc.decodedField.value = uenc.encodedField.value
			uenc.decodedField.select();
			document.execCommand("copy");
		}
		if (event.altKey && event.key === 'c') {
			uenc.encodedField.value = uenc.encodedField.value.replace(' , ', '');
			uenc.decodedField.value = uenc.encodedField.value
			uenc.decodedField.select();
			document.execCommand("copy");
		}
	});

	var replaceWith = window.localStorage.getItem('line-break-removal-replace');
	if (replaceWith === 'true') {
		uenc.spaceField.checked = true;
	}
	var replaceChar = window.localStorage.getItem('line-break-removal-char');
	if (replaceChar) {
		uenc.charField.value = replaceChar;
	}

	function bindEvent(el, eventName, eventHandler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, eventHandler, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + eventName, eventHandler);
		}
	}

	bindEvent(uenc.decodedField, 'paste', function () {
		setTimeout(function () {
			uenc.encode();
		}, 100);
	});

	bindEvent(uenc.decodedField, 'keyup', function () {
		uenc.encode();
	});

	bindEvent(uenc.spaceField, 'click', function () {
		uenc.encode();
		window.localStorage.setItem('line-break-removal-replace', this.checked);
	});

	bindEvent(uenc.charField, 'keyup', function () {
		uenc.spaceField.checked = true;
		uenc.encode();
		window.localStorage.setItem('line-break-removal-char', this.value);
	});

	uenc.encode();

	$('#bookmark').html('Bookmark this tool');

})();