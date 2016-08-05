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
			});

		vm.saveUser = function(user, roles) {
			vm.isSaving = true;
			updateUser(user, roles);
		};

		function updateUser(user, roles) {
			let save = user.id ? api.user.update : api.user.create;

			save(user)
				.then((userPromiseResponse) => {
					let rolePromises = roles.map(role => {
						if(role.hasCurrentUser) {
							return api.role.update(role.name, null, [userPromiseResponse.id]);
						}

						return api.role.update(role.name, null, null, [userPromiseResponse.id]);
					});

					return $q.all([rolePromises]);
				})
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
