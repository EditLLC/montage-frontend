(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userEdit', {
			templateUrl: 'views/user-edit/user-edit.html',
			controllerAs: 'userEdit',
			controller: userEditController
		});
	function userEditController($stateParams, api, authService) {
		var vm = this;

		vm.editUser = function (user_id, full_name, email, password) {
			api.user.update($stateParams.user_id, full_name, email, password)
				.then(user => vm.updatedUser = user);
		}
	}
})(angular)