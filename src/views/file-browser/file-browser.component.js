(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('fileBrowser', {
			templateUrl: 'views/file-browser/file-browser.html',
			controllerAs: 'fileBrowser',
			controller: fileBrowserController
		});

	function fileBrowserController($scope, api) {
		var vm = this;

		vm.totalCount = vm.pendingCount = vm.doneCount = 0;

		api.file.getFileList()
			.then(fileList => vm.fileList = fileList);

		vm.toggleDropZone = function() {
			vm.isDropZoneVisible = !vm.isDropZoneVisible;
			vm.totalCount = vm.pendingCount = vm.doneCount = 0;
		};

		vm.upload = files => {
			vm.pendingCount += files.length;
			vm.totalCount += files.length;

			files.forEach(file => {
				api.file.uploadFile(file)
					.then(fileInfo => {
						vm.doneCount++;
						vm.pendingCount--;
					});
			});
		};
		
		$scope.$watch(() => vm.pendingFiles, (pendingFiles) => {
			if(pendingFiles) {
				vm.upload(pendingFiles);
			}
		});
	}
})(angular);
