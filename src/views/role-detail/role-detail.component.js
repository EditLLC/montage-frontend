(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleDetail', {
			templateUrl: 'views/role-detail/role-detail.html',
			controllerAs: 'roleDetail',
			controller: roleDetailController
		});

	function roleDetailController($q, $stateParams, api) {
		var vm = this;

		var rolePromise = api.role.get($stateParams.roleName);
		var userListPromise = api.user.list();

		$q.all([rolePromise, userListPromise])
			.then(([role, userList]) => {
				vm.role = role;
				vm.userList = userList.filter(user => role.users.indexOf(user.id) !== -1);
			});

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
