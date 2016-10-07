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
			const treeRoot = montageHelper.getClient().request('repo/')
				.then(what => console.log('what', what));

			return treeRoot;
		}
	}
})(angular);
