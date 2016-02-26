(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('login', {
			templateUrl: 'views/login/login.html',
			controllerAs: 'login',
			controller: loginController
		});

	function loginController($state, userService) {
		var vm = this;

		vm.login = function(credentials) {

			// Blur all inputs
			document.getElementById('domain').blur();
			document.getElementById('email').blur();
			document.getElementById('password').blur();

			userService
				.login(credentials)
				.then(()=> $state.go('dashboard'))
				.catch((error) => {

					// Clear credentials on authentication errors
					vm.credentials = {};

					switch(error.status) {
						case 401:
							return vm.errorMessage = "Invalid credentials. Please try again.";
						case 405:
							return vm.errorMessage = "Invalid domain. Please try again.";
						default:
							return vm.errorMessage = "An error occurred. Please try again.";
					}
				});
		};
	}
})(angular);
