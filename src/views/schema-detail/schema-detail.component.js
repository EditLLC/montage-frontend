(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaDetail', {
			templateUrl: 'views/schema-detail/schema-detail.html',
			controllerAs: 'schemaDetail',
			controller: schemaDetailController
		});

	function schemaDetailController() {
		var vm = this;


	}
})(angular);
