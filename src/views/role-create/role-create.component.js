(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleCreate', {
			templateUrl: 'views/role-create/role-create.html',
			controllerAs: 'roleCreate',
			controller: roleCreateController
		});

	function roleCreateController() {
		var vm = this;


	}
})(angular);
