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
			.then(policy => {
				vm.policy = policy;
				vm.policy_id = policy.id;
				delete vm.policy.id;
			})
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.notFoundOptions = notFoundHelper.getPolicyOptions();
				}
			});

		vm.deletePolicy = function(policy) {
			const roles = getRolesInPolicy(vm.policy);

			modalHelper.confirmDelete('policy', roles)
				.then(() => {
					api.policy.remove(policy)
						.then(() => $state.go('policy.list'))
						.then(() => toast.success('Successfully deleted.'))
						.catch(() => vm.status = 'error');
				});
		};

		function getRolesInPolicy(policy) {
			const roles = [];
			const roleStartIndex = 'montage:role:';

			policy.policy.statements.forEach(statement => {
				statement.principal.forEach(principal => {
					if (principal.indexOf(roleStartIndex) === 0) {
						roles.push(principal.substr(roleStartIndex.length));
					}
				});
			});

			return roles;
		}
	}
})(angular);
