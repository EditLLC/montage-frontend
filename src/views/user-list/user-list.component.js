(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl: 'views/user-list/user-list.html',
			controllerAs: 'userList',
			controller: userListController
		});

	function userListController($q, api, modalHelper) {
		var vm = this;
		const roleListPromise = api.role.list();
		const userListPromise = api.user.list();
		let userMap = {};

		$q.all([roleListPromise, userListPromise])
			.then(([roleList, userList]) => {
				vm.userList = userList;

				// Create user dictionary
				userList.forEach(user => {
					userMap[user.id] = user;
					user.roles = [];
				});

				// Add roles to each user
				roleList.forEach(role => {
					role.users.forEach(user_id => {
						userMap[user_id].roles.push(role);
					});
				});

				// Convert role array to a string
				userList.forEach(user => {
					user.roles = user.roles.map(role => role.name).join(', ');
				});
			});

		vm.deleteUser = function(user_id) {
			vm.isSaving = true;

			modalHelper.confirmDelete('user')
				.then(() => api.user.remove(user_id))
					.then(() => vm.status = 'success')
					.then(() => {

						//TODO - refactor below code

						let index;

						for(let i = 0; i < vm.userList.length; i++) {
							if(vm.userList[i].id === user_id) {
								index = i;
								break;
							}
						}

						// vm.userList.forEach(user_id => {}) {
						//
						// });

						if(index) {
							vm.userList.splice(index, 1);
						}
					})
					.catch(() => vm.status = 'error')
					.finally(() => vm.isSaving = false);
		};
	}
})(angular);
