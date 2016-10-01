(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyList', {
			templateUrl  : 'views/policy-list/policy-list.html',
			controllerAs : 'policyList',
			controller   : PolicyListController,
		});

	function PolicyListController(api) {
		const vm = this;

		api.policy.list()
			.then(policyList => vm.policyList = policyList);
	}
})(angular);
