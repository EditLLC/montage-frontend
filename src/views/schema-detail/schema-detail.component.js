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

		if($stateParams.schemaName) {
			vm.isUpdate = true;

			api.schema.get($stateParams.schemaName).then(setSchema);
		} else {
			setSchema({ fields: [{}] });
		}

		function setSchema(schema) {
			vm.schema = {
				originalName : schema.name,
				newName      : schema.name,
				fields       : schema.fields
			};
		}

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
