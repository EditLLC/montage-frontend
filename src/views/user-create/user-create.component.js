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
		var vm = this;
		vm.success = false;

		vm.createUser = function (full_name, email, password) {
			api.user.create(full_name, email, password)
				.then(user => vm.newUser = user)
				.then(vm.success = true);
		}
	}
})(angular);
