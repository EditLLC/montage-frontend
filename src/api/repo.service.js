(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('repoService', repoService);

	function repoService(montageHelper) {
		let branch = 'master';
		const service =  {
			getTreeRoot,
			getTreeDetail,
			getFileDetail,
		};

		return service;

		////////////

		function getTreeRoot() {
			return montageHelper.getClient().request('repo/');
		}

		function getTreeDetail(path) {
			return montageHelper.getClient().request(`repo/tree/${branch}/${path}`);
		}

		function getFileDetail(path) {
			return montageHelper.getClient().request(`repo/blob/${branch}/${path}`);
		}
	}
})(angular);
