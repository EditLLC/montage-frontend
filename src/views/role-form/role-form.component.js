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

		const rolePromise = getRolePromise();
		const userListPromise = api.user.list();

		$q.all([rolePromise, userListPromise]);
		vm.saveRole = function(roleName) {
			vm.isSaving = true;

			api.role.create(roleName)
				.then(() => vm.status = 'success')
				.catch(() => vm.status = 'error')
				.finally(() => vm.isSaving = false);
		};

		function getRolePromise() {
			if ($stateParams.roleName) {
				return api.role.get($stateParams.roleName);
			}

			return $q.when({});
		}

		function getFormType() {
			if (!$stateParams.roleName) {
				vm.isCreateForm = true;
			}

			return $stateParams.roleName ? 'Update' : 'Create';
		 }
	}
})(angular);
