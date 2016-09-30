(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('repoService', repoService);

	function repoService(montageHelper) {
		return {
			getTreeRoot,
			getPath,
		};

		////////////

		function getTreeRoot() {
			const treeRoot = montageHelper.getClient().request('repo/')
				.then(what => console.log('what', what));

			return treeRoot;
		}

		function getPath() {
		}
	}
})(angular);
