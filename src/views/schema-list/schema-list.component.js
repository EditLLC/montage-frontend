(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaList', {
			templateUrl: 'views/schema-list/schema-list.html',
			controllerAs: 'schemaList',
			controller: schemaListController
		});

	function schemaListController(montage, userService) {
		var vm = this;

		montage.getSchemaList(userService.getUser())
			.then(schemaList => vm.schemaList = schemaList);
	}
})(angular);
