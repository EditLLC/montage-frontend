(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaCreate', {
			templateUrl: 'views/schema-create/schema-create.html',
			controllerAs: 'schemaCreate',
			controller: schemaCreateController
		});

	function schemaCreateController() {
		var vm = this;


	}
})(angular);
