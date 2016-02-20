(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('fileBrowser', {
			templateUrl: 'views/file-browser/file-browser.html',
			controllerAs: 'fileBrowser',
			controller: fileBrowserController
		});

	function fileBrowserController() {
		var vm = this;


	}
})(angular);
