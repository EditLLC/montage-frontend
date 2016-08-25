(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyDetail', {
			templateUrl  : 'views/policy-detail/policy-detail.html',
			controllerAs : 'policyDetail',
			controller   : PolicyDetailController,
		});

	function PolicyDetailController($stateParams, api, notFoundHelper) {
		const vm = this;

		api.policy.get($stateParams.policy_id)
			.then(policy => vm.policy = policy);
	}
})(angular);
