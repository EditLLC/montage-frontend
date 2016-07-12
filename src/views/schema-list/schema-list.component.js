(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaList', {
			templateUrl: 'views/schema-list/schema-list.html',
			controllerAs: 'schemaList',
			controller: schemaListController
		});

	function schemaListController($scope, api, authService) {
		var vm = $scope;

		api.schema.list(authService.getCurrentUser())
			.then(schemaList => vm.schemaList = schemaList);
	}
})(angular);
