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

		vm.selectSchema = (schema) => {
			vm.selectedSchema = schema;
		};

		api.schema.list(authService.getCurrentUser())
			.then(schemaList => {
				vm.schemaList = schemaList.sort((a, b) => a.name.localeCompare(b.name));
				vm.selectSchema(schemaList[0]);
			});
	}
})(angular);
