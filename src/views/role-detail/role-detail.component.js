(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleDetail', {
			templateUrl  : 'views/role-detail/role-detail.html',
			controllerAs : 'roleDetail',
			controller   : RoleDetailController,
		});

	function RoleDetailController($q, $stateParams, api, modalHelper) {
		const vm = this;

		const rolePromise = api.role.get($stateParams.roleName);
		const userListPromise = api.user.list();

		$q.all([rolePromise, userListPromise])
			.then(([role, userList]) => {
				vm.role = role;
				vm.userList = userList.filter(user => role.users.indexOf(user.id) !== -1);
			});

		vm.deleteRole = function(role) {
			modalHelper.confirmDelete('role')
				.then(() => {
					api.role.remove(role)
				});
		};
	}
})(angular);
