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
			.then(policy => {
				delete policy.id;
				vm.policy = JSON.stringify(policy, null, '  ');
			})
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.notFoundOptions = notFoundHelper.getPolicyOptions();
				}
			});

		vm.savePolicy = function(policy) {
			policy = JSON.parse(policy);
			const newPolicy = policy;

			vm.isSaving = true;
			if ($stateParams.policy_id) {
				newPolicy.id = $stateParams.policy_id;
			}

			const savePromise = $stateParams.policy_id
				? api.policy.update(newPolicy.id, newPolicy.description, newPolicy.policy)
				: api.policy.create(policy.description, policy.policy);

			savePromise
				.then(() => $state.go('policy.detail', { policy_id: $stateParams.policy_id }))
				.then(() => toast.success('Successfully saved.'));
		};

		vm.cancel = function() {
			if ($stateParams.policy_id) {
				$state.go('policy.detail', { policy_id: $stateParams.policy_id });
			} else {
				$state.go('policy.list');
			}
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
