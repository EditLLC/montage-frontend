(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyDetail', {
			templateUrl  : 'views/policy-detail/policy-detail.html',
			controllerAs : 'policyDetail',
			controller   : PolicyDetailController,
		});

	function PolicyDetailController($stateParams) {
		const vm = this;
	}
})(angular);
