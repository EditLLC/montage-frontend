(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('fileBrowser', {
			templateUrl: 'views/file-browser/file-browser.html',
			controllerAs: 'fileBrowser',
			controller: fileBrowserController
		});

	function fileBrowserController(api) {
		var vm = this;

		api.file.getFileList()
			.then(fileList => vm.fileList = fileList);

		vm.toggleDropZone = function() {
			vm.isDropZoneVisible = !vm.isDropZoneVisible;
		};
	}
})(angular);
