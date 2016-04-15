(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl: 'views/user-detail/user-detail.html',
			controllerAs: 'userDetail',
			controller: userDetailController
		});

	function userDetailController($stateParams, api, authService) {
		var vm = this;

		api.user.get($stateParams.user_id)
			// .then(() => authService.getCurrentUser())
			.then(user => vm.user = user);
	}
})(angular);
