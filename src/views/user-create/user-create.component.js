(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userCreate', {
			templateUrl: 'views/user-create/user-create.html',
			controllerAs: 'userCreate',
			controller: userCreateController
		});

	function userCreateController() {
		const vm = this;


	}
})(angular);
