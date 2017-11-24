window.RecognizeIm = function(opt) {
	opt = opt || {};
	
	var API_URL = opt.apiUrl || 'https://api.recognize.im/';
	var API_CLIENT_ID = opt.clientId;
	var API_KEY = opt.key;
	var API_MODE = opt.mode || 'single';
	var API_ALL_RESULTS = !!opt.allResults;
	var DEBUG = opt.debug || false;
	var onSuccess = opt.onSuccess || _onSuccess; //arg=resp
	var onError = opt.onError || _onError; //arg=ajax
	var onRecognitionSuccess = opt.onRecognitionSuccess || _onRecognitionSuccess;
	var onRecognitionFailure = opt.onRecognitionFailure || _onRecognitionFailure;
	
	//Validate opttions.
	if (!API_CLIENT_ID) {
		throw 'Missing API_CLIENT_ID';
	}
	if (!API_KEY) {
		throw 'Missing API_KEY';
	}
	if (['single', 'multi', 'shelf'].indexOf(API_MODE) == -1) {
		throw 'Invalid API_MODE';
	}
	
	//Verify whether the md5 hashing function is available.
	if (typeof window.md5 != 'function') {
		throw 'Missing window.md5 function';
	}
	
	function getEndpointUrl() {
		//Prepare the request path.
		var _URL = API_URL + 'v2/recognize/' + API_MODE + '/';
		if (API_ALL_RESULTS) {
			_URL = _URL + 'all/';
		}
		_URL = _URL + API_CLIENT_ID;
		return _URL;
	}
	
	function debug(text) {
		//FIXME handle multiple arguments
		if (DEBUG) {
			return console.debug('[RecognizeIm]', text); 
		}
	}
	
	function recognize(image) {
		//Process image data and prepare the hash.
		var hash = md5(API_KEY.concat(image));
		
		//Build the request.
		var ajax = new XMLHttpRequest();
		ajax.open("POST", getEndpointUrl(), true);
		ajax.setRequestHeader('x-itraff-hash', hash);
		ajax.setRequestHeader('Content-Type', 'image/jpeg');

		//Send the request.
		ajax.onreadystatechange = function() {
			if (ajax.readyState === 4) {
				if (ajax.status >= 200 && ajax.status < 400) {
					var resp = JSON.parse(ajax.responseText);
					onSuccess(resp);
				} else {
					onError(ajax);
				}
			}
		};
		ajax.send(image);
	}
	
	function _onSuccess(resp) {
		if (resp.status == 0 && !!resp.objects) {
			onRecognitionSuccess(resp);
		} else {
			onRecognitionFailure(resp);
		}
	}
	
	function _onRecognitionSuccess(resp) {
		return resp;
	}
	
	function _onRecognitionFailure(resp) {
		return resp;
	}
	
	function _onError(ajax) {
		return ajax;
	}
	
	return {
		recognize: recognize,
	}
}
