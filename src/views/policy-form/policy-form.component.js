(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('policyForm', {
			templateUrl  : 'views/policy-form/policy-form.html',
			controllerAs : 'policyForm',
			controller   : PolicyFormController,
		});

	function PolicyFormController() {

	}
})(angular);
