(function(angular) {
	'use strict';

	angular
		.module('montage', [
			'ngCookies',
			'ngFileUpload',
			'ngMaterial',
			'ngPrettyJson',
			'ui.router'
		])
		.constant('montageData', window.Montage);
})(angular);
