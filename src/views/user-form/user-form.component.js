(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userForm', {
			templateUrl: 'views/user-form/user-form.html',
			controllerAs: 'userForm',
			controller: userFormController
		});

	function userFormController($q, $stateParams, api) {
		const vm = this;
		const roleListPromise = api.role.list();
		let databaseRoleList;
		let userPromise;

		if($stateParams.user_id) {
			vm.pageTitle = "Update User";
			userPromise = api.user.get($stateParams.user_id);
		} else {
			vm.pageTitle = "Create User";
			userPromise = $q.when({});
		}

		$q.all([roleListPromise, userPromise])
			.then(([roleList, user]) => {
				vm.user = user;

				vm.roleList = roleList.map((role) => {
					return {
						name           : role.name,
						hasCurrentUser : role.users.indexOf(user.id) > - 1,
					};
				});
				databaseRoleList = angular.copy(vm.roleList);
			});

		vm.saveUser = function(user, roles) {
			vm.isSaving = true;
			updateUser(user, roles);
		};

		function updateUser(user, roles) {
			let save = user.id ? api.user.update : api.user.create;

			save(user)
				.then((user) => {
					let rolePromises = [];
					for(let i = 0; i < roles.length; i++) {
						if (databaseRoleList[i].hasCurrentUser !== roles[i].hasCurrentUser) {
							if(roles[i].hasCurrentUser) {
								// Add user to specified role
								rolePromises.push(api.role.update(roles[i].name, null, [user.id]));
							} else {
								// Remove user from specified role
								rolePromises.push(api.role.update(roles[i].name, null, null, [user.id]));
							}
						}
					}
					return $q.all([rolePromises]);
				})
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
