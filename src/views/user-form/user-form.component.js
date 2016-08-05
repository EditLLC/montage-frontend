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
		let userPromise;

		if($stateParams.user_id) {
			vm.pageTitle = "Update User";
			userPromise = api.user.get($stateParams.user_id);
		}
		else {
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
			});

		vm.saveUser = function(user, roles) {
			vm.isSaving = true;

			if(user.id) {
				updateUser(user, roles);
			}
			else {
				createUser(user, roles);
			}
		};

		function createUser(user, roles) {
			api.user.create(user)
				.then((userPromiseResponse) => {
					let rolePromises = [];

					roles.forEach(role => {
						if(role.hasCurrentUser) {
							rolePromises.push(api.role.update(role.name, null, [userPromiseResponse.id]));
						}
					});

					$q.all([rolePromises]);
				})
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}

		function updateUser(user, roles) {
			api.user.update(user)
				.then((userPromiseResponse) => {
					let rolePromises = [];

					roles.forEach(role => {
						if(role.hasCurrentUser) {
							rolePromises.push(api.role.update(role.name, null, [userPromiseResponse.id]));
						}
					});

					$q.all([rolePromises]);
				})
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
