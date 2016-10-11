(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('fileDetail', {
			templateUrl  : 'views/file-detail/file-detail.html',
			controllerAs : 'fileDetail',
			controller   : FileDetailController,
		});

	function FileDetailController(api, $stateParams, notFoundHelper) {
		const vm = this;

		api.repo.getFileDetail($stateParams.path)
			.then(file => {
				vm.file = file.data;
				if (!file.data.is_binary) {
					vm.fileContents = atob(file.data.contents);
				}
			})
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.notFoundOptions = notFoundHelper.getUserOptions();
				}
			});

		vm.getFileSize = function(bytes) {
			if(bytes === undefined) return;

			const gigabyte = 1024 * 1024 * 1024;
			const megabyte = 1024 * 1024;
			const kilobyte = 1024;

			if (bytes >= gigabyte) {
				return `${round(bytes / gigabyte)}GB`;
			}

			if (bytes >= megabyte) {
				return `${round(bytes / megabyte)}MB`;
			}

			if (bytes >= kilobyte) {
				return `${round(bytes / kilobyte)}KB`;
			}

			return `${bytes}B`;

			function round(number) {
				return Math.round(number * 100) / 100;
			}
		};
	}
})(angular);
