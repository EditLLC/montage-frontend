(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaList', {
			templateUrl: 'views/schema-list/schema-list.html',
			controllerAs: 'schemaList',
			controller: schemaListController
		});

	function schemaListController(api, authService) {
		var vm = this;

		api.schema.list(authService.getCurrentUser())
			.then(schemaList => vm.schemaList = schemaList);
	}
})(angular);
