(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('recordBrowser', {
			templateUrl: 'views/record-browser/record-browser.html',
			controllerAs: 'recordBrowser',
			controller: recordBrowserController
		});

	function recordBrowserController() {
		var vm = this;


	}
})(angular);
