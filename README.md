# JavaScript-client - Recognize.im sample code

Sample Java Script connector for Recognize.im API.
It allows sending recognition queries (images) using web browsers.
This sample code delivers a working substructure for further developments of Recognize.im API users.

Before you install the code you are invited to test it here:
[Recognize.im JS sample](https://try.recognize.im).
Please refer to 'Running the tests' section for detailed testing instructions.

## Getting Started

Please note that an active Recognize.im account with uploaded reference picutres is required to run the tests.
If you do not have an account yet, please create one and make sure to upload your reference pictures (recognizable objects).
Recognize.im API offers a free trial period for newly registered users so you can test the API before making any purchases.

### Prerequisites

This sample code is intended to work as a server for your end-users equipped with web browsers. Your end-users will have to access device's camera using their browsers to take the pictures, which is only allowed via SSL or TLS.
Thus, you need a web accessible host with a domain secured by SSL or TLS to launch the project.

This sample code uses PHP to provide a basic website that invokes the actual logic implemented in Java Script.
You are free to attach only the JS files to your existing solutions. In that case, you have to ensure that the HTML elements' IDs in your project match the ones in JS the files.

### Installing

Server side (your web-accessible host):
* Download or clone the project into a web-accessible directory in your host.
* Configure the project in your web server. Keep in mind that you have to use a domain name secured by SSL or TLS to meet web browsers' camera accessing restrictions.

### Running the tests

Client side (web browser):
* Access the project using any device equipped with a camera and web browser.
* Fill up your Recognize.im API credentials, verify the settings (defaults should work well).
* Take a picture of your object(s) and check the results (JSON string).

The response is being presented as JSON string for simplicity (raw API response). You are free to implement your own interpreter of the results that meets your requirements and expectations.

## Deployment

Please refer to 'Installing' section.
Keep in mind that JS files are being cached in the browsers. Make sure to force JS re-loading at client's side after making changes or use an assets manager to take care of that for you.

## Caution

Please note that JS files are being served to the end-users' browsers.
Do not hardcode any credentials or any other sensitive data into your JS files, otherwise they will go public.

## Authentication

Recognize.im API credentials are required.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Recognize.im Team**

