(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('accountPassword', {
			templateUrl: 'views/account-password/account-password.html',
			controllerAs: 'accountPassword',
			controller: accountPasswordController
		});

	function accountPasswordController() {
		var vm = this;


	}
})(angular);
