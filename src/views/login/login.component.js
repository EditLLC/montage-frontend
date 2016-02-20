(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('login', {
			templateUrl: 'views/login/login.html',
			controllerAs: 'login',
			controller: loginController
		});

	function loginController() {
		var vm = this;

	}
})(angular);
