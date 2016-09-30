(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('repo', {
			templateUrl  : 'views/repo/repo.html',
			controllerAs : 'repoBrowser',
			controller   : RepoController,
		});

	function RepoController($q, api, $stateParams) {
		const vm = this;
	}
})(angular);
