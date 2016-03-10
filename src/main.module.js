(function(angular) {
	'use strict';

	angular
		.module('montage', [
			'jsonFormatter',
			'ngCookies',
			'ngFileUpload',
			'ngMaterial',
			'ngPrettyJson',
			'ui.router'
		])
		.constant('montageData', window.Montage);
})(angular);
