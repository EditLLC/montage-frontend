(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleDetail', {
			templateUrl  : 'views/role-detail/role-detail.html',
			controllerAs : 'roleDetail',
			controller   : RoleDetailController,
		});

	function RoleDetailController($state, $q, $stateParams, api, toast, modalHelper, notFoundHelper, roleView) {
		const vm = this;
		const rolePromise = api.role.get($stateParams.roleName);
		const userListPromise = api.user.list();
		let originatorEv;

		vm.controllerName = 'roleDetail';

		$q.all([rolePromise, userListPromise])
			.then(([role, userList]) => {
				vm.role = role;
				vm.userListInRole = userList.filter(user =>
					role.users.indexOf(user.id) !== -1);
				vm.userListNotInRole = userList.filter(user =>
					role.users.indexOf(user.id) === -1);
			})
			.then(() => vm.isFound = true)
			});

		vm.deleteRole = function(role) {
			modalHelper.confirmDelete('role')
				.then(() => {
					api.role.remove(role)
						.then(() => $state.go('role.list'))
						.then(() => toast.success('Successfully deleted.'))
						.catch(() => vm.status = 'error');
				});
		};

		vm.openMenu = function($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

		vm.deleteUser = function(user) {
			modalHelper.confirmDelete('user from this role')
				.then(() => {
					removeUserFromRole($stateParams.roleName, user)
						.then(() => roleView.removeUserFromView(vm.userListInRole, user.id))
						.then(() => vm.status = 'success')
						.catch(() => vm.status = 'error');
				});
		};

		vm.addUserToRole = function(user) {
			roleView.updateView(vm.userListInRole, vm.userListNotInRole, user);

			return api.role.update($stateParams.roleName, null, [user.id], null);
		};

		function removeUserFromRole(roleName, user) {
			roleView.updateView(vm.userListNotInRole, vm.userListInRole, user);

			return api.role.update(roleName, null, null, [user.id]);
		}
	}
})(angular);
