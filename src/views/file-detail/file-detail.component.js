(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('fileDetail', {
			templateUrl  : 'views/file-detail/file-detail.html',
			controllerAs : 'fileDetail',
			controller   : FileDetailController,
		});

	function FileDetailController(api, $stateParams) {
		const vm = this;

		api.repo.getFileDetail($stateParams.path);
	}
})(angular);
