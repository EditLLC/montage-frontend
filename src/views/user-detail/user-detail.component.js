(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl  : 'views/user-detail/user-detail.html',
			controllerAs : 'userDetail',
			controller   : UserDetailController,
		});

	function UserDetailController($state, $q, $stateParams, authService, api, toast, modalHelper, notFoundHelper) {
		const vm = this;
		const roleListPromise = api.role.list();
		const userListPromise = api.user.get($stateParams.user_id);
		let roles;

		$q.all([roleListPromise, userListPromise])
			.then(([roleList, user]) => {
				vm.user = user;
				roles = roleList;

				addUsersToRoles(user, roleList);
			})
			.then(() => checkIfCurrentUser(vm.user))
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildUserObject();
				}
			});

		vm.deleteUser = function(user_id) {
			modalHelper.confirmDelete('user')
				.then(() => {
					removeUserFromRoles(roles, user_id)
						.then(() => api.user.remove(user_id))
						.then(() => $state.go('user.list'))
						.then(() => toast.success('Successfully deleted.'))
						.catch(() => vm.status = 'error');
				});
		};

		function addUsersToRoles(user, roles) {
			user.roles = [];

			roles.forEach(role => {
				role.users.forEach(user_id => {
					if (user_id === user.id) {
						user.roles.push(role);
						role.users = [];
					}
				});
			});
		}

		function checkIfCurrentUser(user) {
			const currentUser = authService.getCurrentUser();

			if (currentUser.id === vm.user.id) {
				vm.user.token = currentUser.token;
			}
		}

		function removeUserFromRoles(roles, user_id) {
			const rolePromises = roles.reduce((promises, role) => {
				if (role.users.indexOf(user_id) > -1) {
					const rolePromise = api.role.update(role.name, null, null, [user_id]);

					promises.push(rolePromise);
				}

				return promises;
			}, []);

			return $q.all(rolePromises);
		}
	}
})(angular);
