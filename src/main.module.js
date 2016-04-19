(function(angular) {
	'use strict';

	angular
		.module('montage', [
			'jsonFormatter',
			'ngCookies',
			'ngFileUpload',
			'ngMontage',
			'ngMaterial',
			'ngPrettyJson',
			'ui.router',
			'angular-loading-bar'
			]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
					cfpLoadingBarProvider.includeSpinner = false
				}])
})(angular);
