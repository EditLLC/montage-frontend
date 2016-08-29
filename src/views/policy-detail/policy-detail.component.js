(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyDetail', {
			templateUrl  : 'views/policy-detail/policy-detail.html',
			controllerAs : 'policyDetail',
			controller   : PolicyDetailController,
		});

	function PolicyDetailController($state, $stateParams, api, toast, modalHelper, notFoundHelper) {
		const vm = this;

		api.policy.get($stateParams.policy_id)
			.then(policy => vm.policy = policy)
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildPolicyObject();
				}
			});

		vm.deletePolicy = function(policy) {
			modalHelper.confirmDelete('policy')
				.then(() => {
					api.policy.remove(policy)
						.then(() => $state.go('policy.list'))
						.then(() => toast.success('Successfully deleted.'))
						.catch(() => vm.status = 'error');
				});
		};

		function getRolesInPolicy(policy) {
			const roles = [];

			policy.policy.statements.forEach(statement => {
				statement.principal.forEach(principal => {
					if (principal.indexOf('montage:role:') === 0) {
						roles.push(principal.substr(13));
					}
				});
			});

			if (roles.length === 0) {
				return false;
			}

			return roles;
		}
	}
})(angular);
