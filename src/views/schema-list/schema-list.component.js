(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaList', {
			templateUrl: 'views/schema-list/schema-list.html',
			controllerAs: 'schemaList',
			controller: schemaListController
		});

	function schemaListController(montage, authService) {
		var vm = this;

		montage.getSchemaList(authService.getCurrentUser())
			.then(schemaList => vm.schemaList = schemaList);
	}
})(angular);
