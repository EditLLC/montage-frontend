(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('dashboard', {
			templateUrl: 'views/dashboard/dashboard.html',
			controllerAs: 'dashboard',
			controller: dashboardController
		});

	function dashboardController() {
		var vm = this;


	}
})(angular);
