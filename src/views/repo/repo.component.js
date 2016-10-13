(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('repo', {
			templateUrl  : 'views/repo/repo.html',
			controllerAs : 'repo',
			controller   : RepoController,
		});

	function RepoController(api, $stateParams, $state, notFoundHelper) {
		const vm = this;
		const repoPromise = getRepoPromise();

		repoPromise
			.then(repoList => {
				vm.repoList = repoList.data;
				addCommitInfoToView(vm.repoList);
				addFoldersToView(vm.repoList);
				addFilesToView(vm.repoList);
				makeBreadcrumbs($stateParams.path);
			})
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.notFoundOptions = notFoundHelper.getRepoOptions();
				}
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

		function addCommitInfoToView(repoList) {
			if (repoList.head === undefined) return;

			vm.commitHash = repoList.head.commit.hash.substring(0, 7);
			vm.commitTimestamp = new timeago().format(repoList.head.commit.timestamp);
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

		function makeBreadcrumbs(path) {
			if (path === undefined) return;

			const breadcrumbsList = [];
			const pathNameList = path.split('/');

			for (let i = 0; i < pathNameList.length; i++) {
				let pathName = '';

				breadcrumbsList.push({ name: pathNameList[i] });

				for (let j = 0; j < i + 1; j++) {
					pathName = `${pathName}/${pathNameList[j]}`;
				}
				pathName = pathName.substring(1, pathName.length);
				breadcrumbsList[i].path = pathName;
			}

			vm.breadcrumbs = breadcrumbsList;
		}

		function getFilePath(repo) {
			const filePath = vm.isRoot
			? repo = repo.head.tree.entries
			: repo = repo.entries;

			return filePath;
		}
	}
})(angular);
