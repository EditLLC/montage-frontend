(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('accountProfile', {
			templateUrl: 'views/account-profile/account-profile.html',
			controllerAs: 'accountProfile',
			controller: accountProfileController
		});

	function accountProfileController(userService) {
		var vm = this;

		vm.currentUser = userService.getUser();

		// TODO: implement
		vm.save = function(user) {
			console.log('Not implemented');
		}
	}
})(angular);
