(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('accountProfile', {
			templateUrl: 'views/account-profile/account-profile.html',
			controllerAs: 'accountProfile',
			controller: accountProfileController
		});

	function accountProfileController() {
		var vm = this;


	}
})(angular);
