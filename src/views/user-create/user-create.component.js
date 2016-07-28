(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userCreate', {
			templateUrl: 'views/user-create/user-create.html',
			controllerAs: 'userCreate',
			controller: userCreateController
		});

	function userCreateController(api) {
		const vm = this;

		vm.createUser = function(user) {
			vm.isSaving = true;

			api.user.create(user)
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
