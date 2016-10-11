(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('repo', {
			templateUrl  : 'views/repo/repo.html',
			controllerAs : 'repo',
			controller   : RepoController,
		});

	function RepoController(api, $stateParams, $state) {
		const vm = this;
		const repoPromise = getRepoPromise();

		repoPromise
			.then(repoList => {
				vm.repoList = repoList.data;
				addFoldersToView(vm.repoList);
				addFilesToView(vm.repoList);
			});



		vm.getPath = function(route, path) {
			const pathName = $stateParams.path
				? `${$stateParams.path}/${path}`
				: path;

			$state.go(route, { path: pathName });
		};

		function getRepoPromise() {
			if ($stateParams.path) {
				return api.repo.getTreeDetail($stateParams.path);
			}
			vm.isRoot = true;

			return api.repo.getTreeRoot();
		}

		function addFoldersToView(repoList) {
			const treeList = getFilePath(repoList);

			vm.folderList = treeList.filter(folder => folder.type === 'tree');

			return;
		}

		function addFilesToView(repoList) {
			const treeList = getFilePath(repoList);

			vm.fileList = treeList.filter(file => file.type === 'blob');

			return;
		}

		function getFilePath(repo) {
			const filePath = vm.isRoot
			? repo = repo.head.tree.entries
			: repo = repo.entries;

			return filePath;
		}
	}
})(angular);
