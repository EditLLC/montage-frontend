(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('queryBuilder', {
			templateUrl: 'views/record-browser/query-builder/query-builder.html',
			controllerAs: 'queryBuilder',
			controller: queryBuilderController,
			bindings: {
				onChange: '=',
				schemaList: '='
			}
		});

	function queryBuilderController($scope) {
		var vm = this;

		$scope.$watch(() => vm.query, query => {
			if(query && query.schema) {
				vm.onChange(query);
			}
		}, true);
	}
})(angular);
