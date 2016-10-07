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


		vm.folderPath = function(path) {
			const pathName = $stateParams.path
				? `${$stateParams.path}/${path}`
				: path;

			$state.go('repo.detail', { path: pathName });
		};

		vm.filePath = function(path) {
			const pathName = $stateParams.path
				? `${$stateParams.path}/${path}`
				: path;

			$state.go('repo.file', { path: pathName });
		};

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
			const filePath = vm.isRoot
			? repo = repo.head.tree.entries
			: repo = repo.entries;

			return filePath;
		}
	}
})(angular);
