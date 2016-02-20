(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('account', {
			templateUrl: 'views/account/account.html',
			controllerAs: 'account',
			controller: accountController
		});

	function accountController() {
		var vm = this;

		
	}
})(angular);
