(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userCreate', {
			templateUrl: 'views/user-create/user-create.html',
			controllerAs: 'userCreate',
			controller: userCreateController
		});

	function userCreateController($q, $stateParams, api) {
		const vm = this;
		const roleListPromise = api.role.list();
		let userPromise;

		if($stateParams.user_id) {
			vm.pageTitle = "Update User"
			userPromise = api.user.get($stateParams.user_id);
		}
		else {
			vm.pageTitle = "Create User"
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
			vm.isSaving = true;

			api.user.create(user)
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
