<!DOCTYPE html>
<html>
<head>
	<title>Recognize.im JS sample code</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="/css/style.css"/>
</head>
<body>
<div class="container-fluid text-center">
	<div class="row">
		<div class="col-xs-12">
			<img src="/img/recognizeim-logo.png" class="logo">
		</div>
	</div>
	<hr>
	<div class="row hidden" id="recognition-box">
		<div class="col-xs-12">
			<div class="row">
				<h4>Credentials</h4>
			</div>
			<div class="row">
				<div class="hidden-xs col-sm-2 col-md-3 col-lg-4"></div>
				<div class="form-group col-xs-6 col-sm-4 col-md-3 col-lg-2">
					<label for="clientId">Client ID</label>
					<input name="clientId" class="form-control" id="clientId" value=""/>
				</div>
				<div class="form-group col-xs-6 col-sm-4 col-md-3 col-lg-2">
					<label for="key">API Key</label>
					<input name="key" class="form-control" id="key" value=""/>
				</div>
			</div>
			<div class="row">
				<h4>Settings</h4>
			</div>
			<div class="row">
				<div class="hidden-xs hidden-sm col-md-3"></div>
				<div class="form-group col-xs-6 col-sm-4 col-md-2 col-lg-2">
					<label for="mode">Recognition mode</label>
					<select name="mode" class="form-control" id="mode">
						<option value="single">single</option>
						<option value="multi">multi</option>
						<option value="shelf">shelf</option>
					</select>
				</div>
				<div class="form-group col-xs-6 col-sm-4 col-md-2 col-lg-2">
					<label for="scale">Scale</label>
					<select name="scale" class="form-control" id="scale">
						<option value="240">240p</option>
						<option value="360">360p</option>
						<option value="480" selected="selected">480p</option>
					</select>
				</div>
				<div class="form-group col-xs-6 col-sm-4 col-md-2 col-lg-2">
					<label for="filter">Filter</label>
					<select name="filter" class="form-control" id="filter">
						<option value="all">All results</option>
						<option value="best">Best results</option>
					</select>
				</div>
			</div>
			<canvas id="canvas" class="hidden"></canvas>
		</div>
	</div>
	<div class="row">
		<div class="hidden-xs col-md-2 col-lg-3"></div>
		<div class="col-xs-12 col-md-8 col-lg-6">
			<button id="camera">Activate camera</button>
			<video id="video" class="hidden" autoplay></video>
		</div>
		<div class="hidden-xs col-md-2 col-lg-3"></div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<button id="capture" class="hidden">Take a picture</button>
		</div>
		<div class="col-xs-12">
			<div id="statusBox" class="alert alert-info hidden"></div>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-xs-12">
			<p><a href="https://www.recognize.im/site/documentation" target="_blank">Documentation</a></p>
			<p><a href="https://www.recognize.im/site/terms" target="_blank">Terms of Use</a></p>
		</div>
	</div>
</div>
<script src="/js/md5.min.js"></script>
<script src="/js/RecognizeIm.js"></script>
<script src="/js/script.js"></script>
</body>
</html>

