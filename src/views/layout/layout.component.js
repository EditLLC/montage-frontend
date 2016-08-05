(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('layout', {
			templateUrl: 'views/layout/layout.html',
			controllerAs: 'layout',
			controller: layoutController
		});

	function layoutController($state, authService) {
		var vm = this;

		vm.currentUser = authService.getCurrentUser();
		vm.logout = authService.logout;

		vm.isStateActive = function (route) {
			return $state.includes(route);
		};
	}
})(angular);
