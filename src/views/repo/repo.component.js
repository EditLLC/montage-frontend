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

		function getRepoPromise() {
			if ($stateParams.path) {
				vm.isRoot = false;

				return api.repo.getTreeDetail($stateParams.path);
			}
			vm.isRoot = true;

			return api.repo.getTreeRoot();
		}

		function addFoldersToView(repoList) {
			const folderList = [];
			const treeList = getFilePath(repoList);

			treeList.forEach(folder => {
				if (folder.type === 'tree') {
					folderList.push(folder.name);
				}
			});
			vm.folderList = folderList;

			return vm.folderList;
		}

		function addFilesToView(repoList) {
			const fileList = [];
			const treeList = getFilePath(repoList);

			treeList.forEach(file => {
				if (file.type === 'blob') {
					fileList.push(file.name);
				}
			});
			vm.fileList = fileList;

			return vm.fileList;
		}

		function getFilePath(repo) {
			if (vm.isRoot) {
				return repo = repo.head.tree.entries;
			}

			return repo = repo.entries;
		}
	}
})(angular);
