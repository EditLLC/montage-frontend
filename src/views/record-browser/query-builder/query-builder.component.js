(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('queryBuilder', {
			templateUrl: 'views/record-browser/query-builder/query-builder.html',
			controllerAs: 'queryBuilder',
			controller: queryBuilderController,
			bindings: {
				schemaList: '='
			}
		});

	function queryBuilderController() {
		var vm = this;

	}
})(angular);
