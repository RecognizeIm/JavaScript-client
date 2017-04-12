<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=0.5" />
	<meta name="viewport" content="width=device-width, initial-scale=0.5">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="/style.css"/>
</head>
<body>
<div class="container-fluid text-center">
	<button id="camera" class="btn btn-primary btn-lg margin-top-medium">Turn camera on</button>
	<div class="videoWrapper">
                <video id="video" class="hidden" autoplay></video>
        </div>
	<div id="recognition-box" class="hidden">
		<div class="row margin-top-small">
                        <div id="statusBox" class="alert alert-info ol-xs-12 hidden"></div>
                </div>
		<div class="row">
			<div class="form-group col-xs-6">
				<label for="clientId">Client ID</label>
				<input name="clientId" class="form-control" id="clientId" value=""/>
			</div>
			<div class="form-group col-xs-6">
				<label for="key">API Key</label>
				<input name="key" class="form-control" id="key" value=""/>
			</div>
		</div>
		<div class="row">
			<div class="form-group col-xs-4">
				<label for="mode">Mode</label>
				<select name="mode" class="form-control" id="mode">
					<option value="single">single</option>
					<option value="multi">multi</option>
					<option value="shelf">shelf</option>
				</select>
			</div>
			<div class="form-group col-xs-4">
				<label for="scale">Scale</label>
				<select name="scale" class="form-control" id="scale">
					<option value="240">240p</option>
					<option value="360">360p</option>
					<option value="480" selected="selected">480p</option>
				</select>
			</div>
			<div class="form-group col-xs-4">
				<label for="filter">Filter</label>
				<select name="filter" class="form-control" id="filter">
					<option value="all">All results</option>
					<option value="best">Best results</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<button id="capture" class="hidden btn btn-primary btn-lg">Capture</button>
			</div>
		</div>
		<canvas id="canvas" class="hidden"></canvas>
	</div>
	<div class="margin-top-large row">
		
		<a class="col-xs-12" target="_blank" href="https://www.recognize.im/site/documentation">Documentation</a>
		<a class="col-xs-12" target="_blank" href="https://www.recognize.im/site/terms">Terms of Use</a>
	</div>
</div>
<script src="/js/md5.min.js"></script>
<script src="/js/RecognizeIm.js"></script>
<script src="/js/script.js"></script>
</body>
</html>


