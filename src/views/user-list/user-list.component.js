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
	}
})(angular);
