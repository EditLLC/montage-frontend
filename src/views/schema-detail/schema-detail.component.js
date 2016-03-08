(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaDetail', {
			templateUrl: 'views/schema-detail/schema-detail.html',
			controllerAs: 'schemaDetail',
			controller: schemaDetailController
		});

	function schemaDetailController(api, $stateParams) {
		var vm = this;

		api.schema.getSchema($stateParams.schemaName)
			.then(schema => vm.fields = schema.fields);

		vm.datatypeGroups = [{
			name: 'Primitives',
			types: ['text', 'numeric', 'boolean']
		}, {
			name: 'Dates & Times',
			types: ['date', 'time', 'datetime']
		}, {
			name: 'Geospatial',
			types: ['point', 'line', 'polygon']
		}];

		// TODO: implement
		vm.update = function(fields) {
			console.log('schemaDetail.update() is not implemented', fields);
		};
	}
})(angular);
