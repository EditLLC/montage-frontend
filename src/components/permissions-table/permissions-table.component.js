(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('permissionsTable', {
			templateUrl: 'components/permissions-table/permissions-table.html',
			controllerAs: 'permissionsTable',
			controller: permissionsTableController,
			bindings: {
				permissions: '='
			}
		});

	function permissionsTableController() {

	}
})(angular);
