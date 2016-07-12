(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('queryBuilder', {
			templateUrl: 'views/record-browser/query-builder/query-builder.html',
			controllerAs: 'queryBuilder',
			controller: queryBuilderController,
			bindings: {
				onSubmit: '=',
				schemaList: '='
			}
		});

	function queryBuilderController($scope, montage) {
		var vm = this;

		vm.operatorDictionary = {
			'='                              : 'eq',
			'= (case insensitive)'           : 'ieq',
			'!='                             : 'ne',
			'<'                              : 'lt',
			'<='                             : 'le',
			'>'                              : 'gt',
			'>='                             : 'ge',
			'in'                             : 'inSet',
			'contains'                       : 'contains',
			'regex'                          : 'regex',
			'starts with'                    : 'starts',
			'starts with (case insensitive)' : 'istarts',
			'ends with'                      : 'ends',
			'ends with (case insensitive)'   : 'iends',
			'intersects (geometry)'          : 'intersects',
			'includes (geometry)'            : 'includes'
		};

		vm.getSchemaDetails = function(schemaName) {
			var schema = vm.schemaList.filter(schema => schema.name === schemaName)[0];

			vm.schemaDetails = {
				fields: schema.fields,
				indices: schema.fields.filter(field => field.index)
			};
		};

		vm.showFilterForm = () => vm.isAddingFilter = true;
		vm.cancelFilter = () => vm.isAddingFilter = false;

		vm.applyFilter = function(pendingFilter) {
			if(!vm.query.filterGroups) {
				vm.query.filterGroups = {};
			}

			if(!vm.query.filterGroups[pendingFilter.field]) {
				vm.query.filterGroups[pendingFilter.field] = [];
			}

			vm.query.filterGroups[pendingFilter.field].push({
				operator: pendingFilter.operator,
				value: pendingFilter.value
			});

			vm.isAddingFilter = false;
		};

		vm.removeFilter = function(field, filter) {

			// Remove the filter from the filterGroup
			vm.filterGroups[field] = vm.filterGroups[field].filter((currentFilter => currentFilter !== filter));

			// Remove the filterGroup if it is empty
			if(!vm.filterGroups[field].length) {
				delete vm.filterGroups[field];
			}
		};

		$scope.$watch(() => vm.query, query => {
			if(query && query.schema) {
				vm.onSubmit(buildQuery(query));
			}
		}, true);

		function buildQuery({ schema, filterGroups, order, limit, offset }) {
			if(!schema) return;

			var query = new montage.Query(schema);

			if(filterGroups) {
				let filters = [];

				for(var field in filterGroups) {
					if(filterGroups.hasOwnProperty(field)) {
						filterGroups[field].forEach(({operator, value}) => {
							filters.push(new montage.Field(field)[operator](value));
						});
					}
				}

				query.filter.apply(query, filters);
			}

			if(order) { query.order(order.field, order.direction); }
			if(offset) { query.skip(parseInt(offset)); }
			if(limit) { query.limit(parseInt(limit)); }

			return query;
		}
	}
})(angular);
