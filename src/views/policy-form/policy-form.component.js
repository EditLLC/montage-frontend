(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyForm', {
			templateUrl  : 'views/policy-form/policy-form.html',
			controllerAs : 'policyForm',
			controller   : PolicyFormController,
		});

	function PolicyFormController($state, $q, $stateParams, api, toast, notFoundHelper) {
		const vm = this;

		vm.formType = getFormType();

		const policyPromise = getPolicyPromise();

		policyPromise
			.then(policy => vm.policy = JSON.stringify(policy, null, '  '))
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildPolicyObject();
				}
			});

		vm.savePolicy = function(policy) {
			policy = JSON.parse(policy);
			vm.isSaving = true;

			const savePromise = policy.id
				? api.policy.update(policy.id, policy.description, policy.policy)
				: api.policy.create(policy.description, policy.policy);

			savePromise
				.then(() => $state.go('policy.list'))
				.then(() => toast.success('Successfully saved.'));
		};

		function getFormType() {
			if (!$stateParams.policy_id) {
				vm.isCreateForm = true;
			}

			return $stateParams.policy_id ? 'Update' : 'Create';
		 }

		function getPolicyPromise() {
			if ($stateParams.policy_id) {
				return api.policy.get($stateParams.policy_id);
			}

			return $q.when({});
		}
	}
})(angular);
