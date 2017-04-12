(function(){
	var turnOnBtn = document.querySelector('#camera');
	var captureBtn = document.querySelector('#capture');
	var recognitionBox = document.querySelector('#recognition-box');
	var apiClientId = document.querySelector('input[name=clientId]');
	var apiKey = document.querySelector('input[name=key]');
	var apiMode = document.querySelector('select[name=mode]');
	var apiScale = document.querySelector('select[name=scale]');
	var apiIsAll = document.querySelector('select[name=filter]');
	var canvas = document.querySelector('#canvas');
	var video = document.querySelector('#video');
	var statusBox = document.querySelector('#statusBox');
	var videoStatus = false;

	function setStatus(text) {
		statusBox.classList.remove('hidden');
		statusBox.innerHTML = '['+(new Date).toTimeString()+'] ' + text;
	}

	turnOnBtn.addEventListener('click', function(e){
		turnOnBtn.classList.add('hidden');
		recognitionBox.classList.remove('hidden');
		video.classList.remove('hidden');
		captureBtn.classList.remove('hidden');

		var videoElement = document.querySelector('video');

		navigator.getUserMedia = navigator.getUserMedia ||
			navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

		var rearCameraId;

		if (navigator.mediaDevices === undefined ||
			navigator.mediaDevices.enumerateDevices === undefined) {
			alert('This browser does not seem to support MediaStreamTrack.\n\nTry Chrome.');
		} else {
			navigator.mediaDevices.enumerateDevices()
				.then(function(devices) {
					devices.forEach(function(device) {
						if (device.kind == 'videoinput') {
							if (device.label.indexOf('back') > -1) {
								rearCameraId = device.deviceId;
							}
							// alert(device.kind + ": " + device.label + " id = " + device.deviceId);
						}
					});

					var constraints = {
						video: {
							optional: [
								{sourceId: rearCameraId},
								{minWidth: 320},
								{minWidth: 640},
								{minWidth: 800},
								{minWidth: 900},
								{minWidth: 1024},
								{minWidth: 1280},
								{minWidth: 1920},
								{minWidth: 2560}
							]
						}
					};
					navigator.getUserMedia(constraints, successCallback, errorCallback);
				})
				.catch(function(err) {
					alert(err.name + ": " + error.message);
				});
		}

		function successCallback(stream) {
			videoStatus = true;
			window.stream = stream; // make stream available to console
			videoElement.src = window.URL.createObjectURL(stream);
			videoElement.play();
		}

		function errorCallback(error) {
			videoStatus = false;
			alert('navigator.getUserMedia error: ' + error);
		}
	});

	captureBtn.addEventListener('click', function(e){
		if (videoStatus) {
			var imageBase64 = capture(apiScale.value);
		} else {
			alert('Image capturing error.');
			return;
		}

		if (imageBase64 == null) {
			alert("Image data processing error.");
			return;
		} else {
			//Recognize.im API options.
			var apiOpt = {
				clientId: apiClientId.value,
				key: apiKey.value,
				mode: apiMode.options[apiMode.selectedIndex].value,
				allResults: apiIsAll.options[apiIsAll.selectedIndex].value === "all",
				debug: true,
				onRecognitionSuccess: function(resp) {
					setStatus(JSON.stringify(resp));
					memorizeSettings();
				},
				onRecognitionFailure: function(resp) {
					setStatus(JSON.stringify(resp));
				},
				onError: function(ajax) {
					setStatus(JSON.stringify(ajax));
				}
			}
			//Init Recognize.im API object and send request.
			var recognizeIm = new RecognizeIm(apiOpt);
			setStatus('recognizing...');
			recognizeIm.recognize(imageBase64);
		}
	});

	function capture(scale) {
		var width = video.videoWidth;
		var height = video.videoHeight;
		if (scale && height > scale) {
			value = scale / width;
			width = scale;
			height = height * value;
		}
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		var context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, width, height);
		var image = canvas.toDataURL('image/jpeg');
		image = image.replace('data:image/jpeg;base64,', '');
		return image;
	}

	apiMode.addEventListener('change', function(e) {
		handleModeSelect(this.value);
        });

	function handleModeSelect(value) {
		/*
		 * This function suggests some propositions for query image sizes,
		 * which should fit to the requirements described in the documentation:
		 * https://www.recognize.im/site/documentation#Query_pictures
		 * Different sizes can be used as well.
		 * Please note that for the shelf mode, the 'as large as possible' option is selected.
		 */
		switch (value) {
			case 'single':
				handleScaleSelect(['240', '360', '480']);
				break;
			case 'multi':
				handleScaleSelect(['640', '1280', '1920']);
				break;
			case 'shelf':
				handleScaleSelect([]);
				break;
		}
	}

	function handleScaleSelect(options) {
		for (var i = apiScale.length -1; i >=0; --i) {
				apiScale.remove(i);
		}

		if (options.length > 0) {
				apiScale.disabled = false;
				for (var j = 0; j <= options.length - 1; j++) {
					var option = document.createElement('option');
					option.text = options[j] + 'p';
					option.value = options[j];
					apiScale.appendChild(option);
				}
			apiScale.selectedIndex = options.length - 1;
		} else {
			apiScale.disabled = true;
		}
	}

	function memorizeSettings() {
		var expiry = new Date();
		expiry.setFullYear(expiry.getFullYear()+10); //10 years, long enough.
		document.cookie = "clientId=" + apiClientId.value + "; expires=" + expiry.toGMTString();
		document.cookie = "clientKey=" + apiKey.value + "; expires=" + expiry.toGMTString();
		document.cookie = "mode=" + apiMode.value + "; expires=" + expiry.toGMTString();
		document.cookie = "scale=" + apiScale.value + "; expires=" + expiry.toGMTString();
		document.cookie = "isAll=" + apiIsAll.value + "; expires=" + expiry.toGMTString();
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	apiClientId.value = getCookie("clientId");
	apiKey.value = getCookie("clientKey");
	if (getCookie("mode")) {
		apiMode.value = getCookie("mode");
		handleModeSelect(apiMode.value);
	}
	if (getCookie("scale")) {
		apiScale.value = getCookie("scale");
	}
	if (getCookie("isAll")) {
		apiIsAll.value = getCookie("isAll");
	}
})();
