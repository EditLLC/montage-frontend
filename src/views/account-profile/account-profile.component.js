(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('accountProfile', {
			templateUrl: 'views/account-profile/account-profile.html',
			controllerAs: 'accountProfile',
			controller: accountProfileController
		});

	function accountProfileController(authService) {
		var vm = this;

		vm.currentUser = authService.getCurrentUser();

		// TODO: implement
		vm.save = function(user) {
			console.log('Saving account profiles is not implemented');
		}
	}
})(angular);
