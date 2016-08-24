(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyForm', {
			templateUrl  : 'views/policy-form/policy-form.html',
			controllerAs : 'policyForm',
			controller   : PolicyFormController,
		});

	function PolicyFormController($q, $stateParams) {
		const vm = this;

		vm.formType = getFormType();

		function getFormType() {
			if (!$stateParams.policy_id) {
				vm.isCreateForm = true;
			}

			return $stateParams.policy_id ? 'Update' : 'Create';
		 }
	}
})(angular);
