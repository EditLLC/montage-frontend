(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('tableData', {
			templateUrl: 'views/record-browser/table-data/table-data.html',
			controllerAs: 'tableData',
			controller: tableDataController,
			bindings: {
				schemaFields: '=',
				data: '='
			}
		});

	function tableDataController($scope) {
		var vm = this;
		vm.columns = [];
		vm.rows = [];

		$scope.$watch(() => vm.data, formatData);

		function formatData() {
			if(vm.data && vm.schemaFields) {
				vm.columns = getColumns(vm.schemaFields, vm.data);
				vm.rows = getRows(vm.columns, vm.data);
			}
		}

		function getColumns(schema, data) {
			var columns = [];
			var index = 0;

			// Add schema columns to the columnDictionary
			var columnDictionary = schema.reduce(function(columnDictionary, currentColumn) {
				if(!columnDictionary[currentColumn.name]) {
					currentColumn.index = index++;
					columnDictionary[currentColumn.name] = currentColumn;
				}

				return columnDictionary;
			}, {});

			// Add non-schema columns to the columnDictionary
			data.forEach(document => {
				Object.keys(document).forEach(key => {
					if(!columnDictionary[key] && key !== '_meta') {
						columnDictionary[key] = {
							index: index++,
							name: key,
							nonSchema: true
						};
					}
				});
			});

			// Convert the columnDictionary into an array
			for(var key in columnDictionary) {
				columns[columnDictionary[key].index] = columnDictionary[key];
			}

			return columns;
		}

		function getRows(columns, data) {

			// Convert document objects into arrays with the same order as `columns`
			return data.map(document => columns.map(column => document[column.name]));
		}

	}
})(angular);
