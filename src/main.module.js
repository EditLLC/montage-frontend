(function(angular) {
	'use strict';

	angular
		.module('montage', [
			'ngCookies',
			'ngMaterial',
			'ui.router'
		])
		.constant('montageData', window.Montage);
})(angular);
