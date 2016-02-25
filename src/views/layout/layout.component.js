(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('layout', {
			templateUrl: 'views/layout/layout.html',
			controllerAs: 'layout',
			controller: layoutController
		});

	function layoutController($state) {
		var vm = this;

		vm.isStateActive = function (route) {
			return $state.includes(route);
		};
	}
})(angular);
