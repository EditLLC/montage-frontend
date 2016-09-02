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
		let originatorEv;

		vm.controllerName = 'roleDetail';

		$q.all([rolePromise, userListPromise])
			.then(([role, userList]) => {
				vm.role = role;
				vm.userListInRole = userList.filter(user =>
					role.users.indexOf(user.id) !== -1);
				vm.userListNotInRole = userList.filter(user =>
					role.users.indexOf(user.id) === -1);
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

		vm.openMenu = function($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

		vm.deleteUser = function(user) {
			modalHelper.confirmDelete('user from this role')
				.then(() => {
					removeUserFromRole($stateParams.roleName, user)
						.then(() => removeUserFromView(vm.userListInRole, user.id))
						.then(() => vm.status = 'success')
						.catch(() => vm.status = 'error')
				});
		};

		function removeUser(users, user) {
			const index = users.indexOf(user);

			if (index !== -1) {
				users.splice(index, 1);
			}
		}

		vm.addUserToRole = function(user) {
			vm.userListInRole.push(user);
			removeUser(vm.userListNotInRole, user);

			return api.role.update($stateParams.roleName, null, [user.id], null);
		}

		function removeUserFromRole(roleName, user) {
			vm.userListNotInRole.push(user);
			removeUser(vm.userListInRole, user);

			return api.role.update(roleName, null, null, [user.id]);
		}

		function removeUserFromView(userList, user) {
			for (let index = 0; index < userList.length; index++) {
				if (userList[index].id === user) {
					userList.splice(index, 1);
					break;
				}
			}
		}
	}
})(angular);
