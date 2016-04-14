(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('fileBrowser', {
			templateUrl: 'views/file-browser/file-browser.html',
			controllerAs: 'fileBrowser',
			controller: fileBrowserController
		});

	function fileBrowserController($scope, api, modalHelper) {
		var vm = this;

		vm.totalCount = vm.pendingCount = vm.doneCount = 0;

		api.file.getFileList().then(fileList => vm.fileList = fileList);

		vm.toggleDropZone = () => {
			vm.isDropZoneVisible = !vm.isDropZoneVisible;
			vm.totalCount = vm.pendingCount = vm.doneCount = 0;
		};

		vm.upload = files => {
			vm.pendingCount += files.length;
			vm.totalCount += files.length;

			files.forEach(file => {
				api.file.uploadFile(file)
					.then(fileInfoList => {
						vm.doneCount++;
						vm.pendingCount--;

						fileInfoList.forEach(fileInfo => vm.fileList.push(fileInfo));
					});
			});
		};

		vm.delete = file => {
			modalHelper.confirmDelete('file')
				.then(() => api.file.deleteFile(file.id))
				.then(() => {
					var index = vm.fileList.indexOf(file);
					vm.fileList.splice(index, 1);
				});
		};

		$scope.$watch(() => vm.pendingFiles, (pendingFiles) => {
			if(pendingFiles) {
				vm.upload(pendingFiles);
			}
		});
	}
})(angular);
