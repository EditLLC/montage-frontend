(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl  : 'views/user-detail/user-detail.html',
			controllerAs : 'userDetail',
			controller   : UserDetailController,
		});

	function UserDetailController($q, $stateParams, authService, api, notFoundHelper) {
		const vm = this;

		api.user.get($stateParams.user_id)
			.then(user => checkIfCurrentUser(user))
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildUserObject();
				}
			});

		function checkIfCurrentUser(user) {
			vm.user = user;
			const currentUser = authService.getCurrentUser();

			if (currentUser.id === vm.user.id) {
				vm.user.token = currentUser.token;
			}
		}
	}
})(angular);
