(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('notFound', {
			templateUrl  : 'components/not-found/not-found.html',
			controllerAs : 'notFound',
			controller   : notFoundController,
			bindings     : {
				options : '=',
			},
		});

	function notFoundController() {

	}
})(angular);
