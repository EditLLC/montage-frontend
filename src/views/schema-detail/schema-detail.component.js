(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('schemaDetail', {
			templateUrl: 'views/schema-detail/schema-detail.html',
			controllerAs: 'schemaDetail',
			controller: schemaDetailController
		});

	function schemaDetailController($scope, api, $stateParams, $state, modalHelper) {
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

		$scope.$watch(() => {
			return vm.schema ? vm.schema.fields : null;
		}, () => {
			if(!vm.schema || !vm.schema.fields) { return; }

			var fields = vm.schema.fields;

			// Note: use `angular.copy()` to remove `$$hashKey`
			var lastField = angular.copy(fields[fields.length - 1]);

			if(Object.keys(lastField).length) {
				fields.push({});
			}
		}, true);

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

		vm.save = function({originalName, newName, fields}) {
			vm.isSaving = true;

			// Use `angular.copy()` to remove `$$hashKey`
			fields = angular.copy(fields);

			// Remove the last field if it is empty
			// todo: refactor to account for falsey checkboxes, with empty name & type
			// todo: should we remove empty fields that are not at the end of the list or show validation errors?
			if(!Object.keys(fields[fields.length - 1]).length) {
				fields.pop();
			}

			// Remove the "id" field from the list
			fields = fields.filter(field => field.name !== 'id');

			if(vm.isUpdate) {
				api.schema.update(originalName, newName, fields)
					.then(() => vm.status = 'success')
					.catch(() => vm.status = 'error')
					.finally(() => vm.isSaving = false);
			} else {
				api.schema.create(newName, fields)
					.then(() => $state.go('schema.detail', { schemaName: newName }))
					.catch(() => vm.status = 'error');
			}
		};

		vm.removeField = function(index) {
			vm.schema.fields.splice(index, 1);
		};

		vm.deleteSchema = function(schemaName) {
			modalHelper.confirmDelete('schema')
				.then(() => api.schema.remove(schemaName))
				.then(() => $state.go('schema.list'));
		};
	}
})(angular);
