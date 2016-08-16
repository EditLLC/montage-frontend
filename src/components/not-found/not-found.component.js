(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('notFound', {
			templateUrl  : 'components/not-found/not-found.html',
			controllerAs : 'notFound',
			controller   : notFoundController,
			bindings     : {
				paramName  : '=',
				param      : '=',
				returnPage : '=',
				pageName   : '=',
			},
		});

	function notFoundController() {

	}
})(angular);
