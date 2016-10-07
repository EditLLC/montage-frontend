(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('repo', {
			templateUrl  : 'views/repo/repo.html',
			controllerAs : 'repo',
			controller   : RepoController,
		});

	function RepoController($q, api, $stateParams) {
		const vm = this;
		const repoPromise = getRepoPromise();

		repoPromise
			.then(repoList => {
				vm.repoList = repoList.data;
			});

		function getRepoPromise() {
			if ($stateParams.path) {
				return api.repo.getTreeDetail($stateParams.path);
			}

			return api.repo.getTreeRoot();
		}
	}
})(angular);
