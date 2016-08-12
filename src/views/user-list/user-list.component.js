(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl  : 'views/user-list/user-list.html',
			controllerAs : 'userList',
			controller   : UserListController,
		});

	function UserListController($q, api, modalHelper) {
		const vm = this;
		const roleListPromise = api.role.list();
		const userListPromise = api.user.list();
		let roles;

		$q.all([roleListPromise, userListPromise])
			.then(([roleList, userList]) => {
				vm.userList = userList;
				roles = roleList;

				addUsersToRoles(userList, roleList);
				convertRoleArrayToString(userList);
			});

		vm.deleteUser = function(user_id) {
			vm.isSaving = true;

			modalHelper.confirmDelete('user')
				.then(() => removeUserFromRoles(roles, user_id))
				.then(() => api.user.remove(user_id))
				.then(() => removeUserFromView(vm.userList, user_id))
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		};

		function addUsersToRoles(users, roles) {
			const userDictionary = createUserDictionary(users);

			roles.forEach(role => {
				role.users.forEach(user_id => {
					userDictionary[user_id].roles.push(role);
					role.users = [];
				});
			});
		}

		function createUserDictionary(users) {
			const dictionary = {};

			users.forEach(user => {
				dictionary[user.id] = user;
				user.roles = [];
			});

			return dictionary;
		}

		function convertRoleArrayToString(users) {
			users.forEach(user => {
				user.roles = user.roles.map(role => role.name).join(', ');
			});
		}

		function removeUserFromRoles(roles, user_id) {
			roles.forEach((role) => {
				if (role.users.indexOf(user_id) > -1) {
					return api.role.update(role.name, null, null, [user_id]);
				}
			});
		}

		function removeUserFromView(userList, user_id) {
			for (let index = 0; index < userList.length; index++) {
				if (userList[index].id === user_id) {
					userList.splice(index, 1);
					break;
				}
			}
		}
	}
})(angular);
