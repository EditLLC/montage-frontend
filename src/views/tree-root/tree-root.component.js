(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('treeRoot', {
			templateUrl  : 'views/tree-root/tree-root.html',
			controllerAs : 'treeRoot',
			controller   : TreeRootController,
		});

	function TreeRootController() {
		const vm = this;
	}
})(angular);
