(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleForm', {
			templateUrl  : 'views/role-form/role-form.html',
			controllerAs : 'roleForm',
			controller   : RoleFormController,
		});

	function RoleFormController($q, $stateParams, api) {
		const vm = this;

		vm.formType = getFormType();

		vm.createRole = function(roleName) {
			vm.isSaving = true;

			api.role.create(roleName)
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		};

		function getFormType() {
			if (!$stateParams.roleName) {
				vm.isCreateForm = true;
			}

			return $stateParams.roleName ? 'Update' : 'Create';
		 }
	}
})(angular);
