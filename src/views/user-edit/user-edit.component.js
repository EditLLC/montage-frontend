(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userEdit', {
			templateUrl: 'views/user-edit/user-edit.html',
			controllerAs: 'editUser',
			controller: editUserController
		});

	function editUserController($stateParams, api, $state) {
		var vm = this;
		vm.user_id = $stateParams.user_id;
		vm.updateUser = updateUser;

		api.user.get($stateParams.user_id)
			.then((user) => vm.editUser = user);

		function updateUser(id, full_name, email, password) {
			api.user.update(id, full_name, email, password)
				.then(() => $state.go('user.list'));
		}
	}
})(angular)
