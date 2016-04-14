(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('accountPassword', {
			templateUrl: 'views/account-password/account-password.html',
			controllerAs: 'accountPassword',
			controller: accountPasswordController
		});

	function accountPasswordController(authService, api) {
		var vm = this;

		// TODO: implement
		vm.changePassword = function() {
			vm.isSaving = true;

			var currentUser = authService.getCurrentUser();

			authService.login(currentUser.email, vm.currentPassword)
				.then(() => api.user.update(currentUser.id, null, null, vm.newPassword))
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => {
					vm.isSaving = false;

					// Reset the form
					vm.currentPassword = vm.newPassword = vm.confirmedPassword = '';
					vm.changePasswordForm.$setPristine();
					vm.changePasswordForm.$setUntouched();
				});
		}
	}
})(angular);
