(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleDetail', {
			templateUrl: 'views/role-detail/role-detail.html',
			controllerAs: 'roleDetail',
			controller: roleDetailController
		});

	function roleDetailController($stateParams, api) {
		var vm = this;

		// todo: the userList should come from role api once implemented
		api.user.list().then(userList => vm.userList = userList);

		api.role.get($stateParams.roleName).then(role => vm.role = role);

		// todo: implement
		vm.editRole = function() {
			console.log('editRole() is not implemented')
		};

		// todo: implement
		vm.deleteRole = function() {
			console.log('deleteRole() is not implemented')
		};
	}
})(angular);
