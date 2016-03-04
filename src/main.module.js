(function(angular) {
	'use strict';

	angular
		.module('montage', [
			'ngCookies',
			'ngFileUpload',
			'ngMaterial',
			'ui.router'
		])
		.constant('montageData', window.Montage);
})(angular);
