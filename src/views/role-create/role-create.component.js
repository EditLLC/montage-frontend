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

		// TODO: implement
		vm.createRole = function(role) {
			console.log('Role creation is not implemented');
		}
	}
})(angular);
