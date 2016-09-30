(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('treeDetail', {
			templateUrl  : 'views/tree-detail/tree-detail.html',
			controllerAs : 'treeDetail',
			controller   : TreeDetailController,
		});

	function TreeDetailController(api) {
		const vm = this;
	}
})(angular);
