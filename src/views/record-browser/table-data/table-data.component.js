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
				data: '=',
				schemaName: '='
			}
		});

	function tableDataController($scope, modalHelper, api, toast) {
		var vm = this;
		vm.columns = [];
		vm.rows = [];

		$scope.$watch(() => vm.data, formatData);

		vm.isJson = function(value) {
			return value && typeof value === 'object';
		};

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

		// Modal that pops up when clicking on delete row icon
		$scope.showConfirm = function(row) {
			var row_id = row[0];
			modalHelper.confirmDelete('record')
				.then(function() {
					// deletes row from database but not the view
					api.document.remove(vm.schemaName, row_id)
					// deletes row from view but not the database
						.then(function() {
							var row_idIndex = vm.rows.indexOf(row);
							if (row_idIndex > -1) {
								vm.rows.splice(row_idIndex, 1);
							}
							// see src/services/toast.service.js
							toast.simple("Record deleted successfully");
						})
						.catch(function (error) {
							console.error("Error during delete: " + error);
							toast.simple("There was an error deleting the record.");
						});
				}, function() {
					// If user clicks cancel button this happens
					toast.simple("Delete record cancelled.");
				});
		}
	}
})(angular);
