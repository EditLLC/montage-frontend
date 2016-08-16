(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl  : 'views/user-detail/user-detail.html',
			controllerAs : 'userDetail',
			controller   : UserDetailController,
		});

	function UserDetailController($stateParams, authService, api, notFoundHelper) {
		const vm = this;

		api.user.get($stateParams.user_id)
			.then(user => {
				vm.user = user;
				const currentUser = authService.getCurrentUser();

				if (currentUser.id === vm.user.id) {
					vm.user.token = currentUser.token;
				}
			})
			.then(() => vm.isFound = true)
		function checkNotFound(error) {
			if (error.status === 404) {
				vm.params = {
					param_id   : 'user id',
					returnPage : 'user.list',
					pageName   : 'Users',
					isNotFound : true,
				};

				return vm.params;
			}
		}
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildUserObject();
				}
			});
	}
})(angular);
