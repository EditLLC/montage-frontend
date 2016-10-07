(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('repoService', repoService);

	function repoService(montageHelper) {
		const service =  {
			getTreeRoot,
		};

		return service;

		////////////

		function getTreeRoot() {
			return montageHelper.getClient().request('repo/');
		}

		}
	}
})(angular);
