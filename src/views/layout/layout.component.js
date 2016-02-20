(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('layout', {
			templateUrl: 'views/layout/layout.html',
			controllerAs: 'layout',
			controller: layoutController
		});

	function layoutController() {
		var vm = this;

	}
})(angular);
