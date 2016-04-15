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
		vm.updateUser = updateUser;

		api.user.get($stateParams.user_id)
			.then(user => vm.editUser = user);
		
		function updateUser(full_name, email, password) {
			debugger
			api.user.update(full_name, email, password)
		}
	}
})(angular)