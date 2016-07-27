(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl: 'views/user-detail/user-detail.html',
			controllerAs: 'userDetail',
			controller: userDetailController
		});

	function userDetailController($stateParams, authService, api) {
		const vm = this;

		api.user.get($stateParams.user_id).then(user => {
			vm.user = user;
			const currentUser = authService.getCurrentUser();

			if (currentUser.id === vm.user.id) {
				vm.user.token = currentUser.token;
			}
		});
	}
})(angular);
