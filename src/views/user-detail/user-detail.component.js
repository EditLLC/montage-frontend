(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl  : 'views/user-detail/user-detail.html',
			controllerAs : 'userDetail',
			controller   : UserDetailController,
		});

	function UserDetailController($q, $stateParams, authService, api, notFoundHelper) {
		const vm = this;
		const roleListPromise = api.role.list();
		const userListPromise = api.user.get($stateParams.user_id);
		let roles;

			.then(user => checkIfCurrentUser(user))
		$q.all([roleListPromise, userListPromise])
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildUserObject();
				}
			});

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
			vm.user = user;
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
