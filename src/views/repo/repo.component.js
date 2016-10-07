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
				vm.isRoot = false;

				return api.repo.getTreeDetail($stateParams.path);
			}
			vm.isRoot = true;

			return api.repo.getTreeRoot();
		}

		function getFilePath(repo) {
			if (vm.isRoot) {
				return repo = repo.head.tree.entries;
			}

			return repo = repo.entries;
		}
	}
})(angular);
