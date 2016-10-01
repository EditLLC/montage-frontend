(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userSelect', {
			templateUrl  : 'components/user-select/user-select.html',
			controllerAs : 'userSelect',
			controller   : userSelectController,
			bindings     : {
				users          : '=',
				controllerName : '=',
			},
		});

	function userSelectController() {
	}
})(angular);
