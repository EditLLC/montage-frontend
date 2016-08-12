(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleForm', {
			templateUrl: 'views/role-form/role-form.html',
			controllerAs: 'roleForm',
			controller: roleFormController
		});

	function roleFormController(api) {
		var vm = this;

		vm.createRole = function(roleName) {
			vm.isSaving = true;

			api.role.create(roleName)
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		}
	}
})(angular);
