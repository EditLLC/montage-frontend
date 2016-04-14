(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('accountProfile', {
			templateUrl: 'views/account-profile/account-profile.html',
			controllerAs: 'accountProfile',
			controller: accountProfileController
		});

	function accountProfileController(authService, api) {
		var vm = this;

		// NOTE: Use `angular.copy()` to prevent the user's name from changing in the nav bar
		vm.currentUser = angular.copy(authService.getCurrentUser());

		vm.save = function({id, full_name, email}) {
			vm.isSaving = true;

			api.user.update(id, full_name, email)
				.then(user => {
					vm.status = 'success';

					vm.currentUser = user;
					authService.setCurrentUser(user)
				})
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
