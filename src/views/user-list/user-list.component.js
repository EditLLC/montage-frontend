(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl  : 'views/user-list/user-list.html',
			controllerAs : 'userList',
			controller   : userListController,
		});

	function userListController($q, api, modalHelper) {
		const vm = this;
		const roleListPromise = api.role.list();
		const userListPromise = api.user.list();
		let userMap = {};

		$q.all([roleListPromise, userListPromise])
			.then(([roleList, userList]) => {
				vm.userList = userList;

				createUserDictionary(userList);
				addUsersToRoles(roleList);
				convertRoleArrayToString(userList);
			});

		vm.deleteUser = function(user_id) {
			vm.isSaving = true;
			const userRemovePromise = api.user.remove(user_id);

			modalHelper.confirmDelete('user')
				.then(() => $q.all([roleListPromise, userRemovePromise])
					.then(([roleList]) => {
						removeUserFromRoles(roleList, user_id);
					})
					.then(() => {
						removeUserFromView(vm.userList, user_id);
					})
					.then(() => vm.status = 'success')
					.catch(() => vm.status = 'error')
					.finally(() => vm.isSaving = false)
				);
		};

		function createUserDictionary(users) {
			users.forEach(user => {
				userMap[user.id] = user;
				user.roles = [];
			});
		}

		function addUsersToRoles(roles) {
			roles.forEach(role => {
				role.users.forEach(user_id => {
					userMap[user_id].roles.push(role);
					role.users = [];
				});
			});
		}

		function convertRoleArrayToString(users) {
			users.forEach(user => {
				user.roles = user.roles.map(role => role.name).join(', ');
			});
		}

		function removeUserFromRoles(roleList, user_id) {
			roleList.forEach((role) => {
				role.users.some((roleUser) => {
					if(roleUser === user_id) {
						api.role.update(role.name, null, null, [roleUser]);
						return true;
					}
				});
			});
		}

		function removeUserFromView(userList, user_id) {
			let index = 0;

			for(index; index < userList.length; index++) {
				if (userList[index].id === user_id) {
					userList.splice(index, 1);
					break;
				}
			}
		}
	}
})(angular);
