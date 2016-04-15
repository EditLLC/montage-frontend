(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userCreate', {
			templateUrl: 'views/user-create/user-create.html',
			controllerAs: 'userCreate',
			controller: userCreateController
		});

		function userCreateController(api, $state) {
			var vm = this;

			vm.createUser = function (user_id, full_name, email, password) {
				api.user.create(user_id, full_name, email, password)
					.then((user) => vm.newUser = user)
					.then((user) => $state.go('user.edit', ({ user_id: user.id })));
				}
			}
	})(angular)
