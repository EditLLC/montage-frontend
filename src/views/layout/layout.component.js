(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('layout', {
			templateUrl: 'views/layout/layout.html',
			controllerAs: 'layout',
			controller: layoutController
		});

	function layoutController($state, userService) {
		var vm = this;

		vm.currentUser = userService.getUser();
		vm.logout = userService.logout;

		vm.isStateActive = function (route) {
			return $state.includes(route);
		};
	}
})(angular);
