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
				.then(policy => $state.go('policy.detail', { policy_id: policy.id }))
				.then(() => toast.success('Successfully saved.'))
				.catch(() => {
					vm.isSaving = false;
					vm.status = 'error';
				});
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

		function validateJSON(policy) {
			let parsedPolicy;

			try {
				parsedPolicy = JSON.parse(policy);
			} catch(error) {
			}

			return handleErrors(parsedPolicy);
		}

		function updatePolicy(policy) {
			let updatedPolicy;

			try {
				updatedPolicy = api.policy.update(policy.id, policy.description, policy.policy);
			} catch(error) {
			}

			return handleErrors(updatedPolicy);
		}

		function handleErrors(policy) {
			if (!policy) {
				vm.isSaving = false;
				vm.status = 'error';
			}

			return policy;
		}
	}
})(angular);
