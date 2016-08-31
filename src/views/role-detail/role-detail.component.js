(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleDetail', {
			templateUrl  : 'views/role-detail/role-detail.html',
			controllerAs : 'roleDetail',
			controller   : RoleDetailController,
		});

	function RoleDetailController($state, $q, $stateParams, api, toast, modalHelper) {
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
						.then(() => $state.go('role.list'))
						.then(() => toast.success('Successfully deleted.'))
						.catch(() => vm.status = 'error')
				});
		};
		vm.deleteUser = function(user) {
			modalHelper.confirmDelete('user from this role')
				.then(() => removeUserFromRole($stateParams.roleName, user.id))
		};

		function removeUserFromRole(roleName, user_id) {
			return api.role.update(roleName, null, null, [user_id]);
		}
	}
})(angular);
