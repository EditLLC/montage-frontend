(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('repoWrapper', {
			templateUrl  : 'views/repo-wrapper/repo-wrapper.html',
			controllerAs : 'repoWrapper',
			controller   : RepoWrapperController,
		});

	function RepoWrapperController(api) {

	}
})(angular);
