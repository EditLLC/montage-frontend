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

		vm.operatorDictionary = {
			'='           : '',
			'ieq'         : '__ieq',
			'!='          : '__not',
			'not'         : '__not', // todo: not in field lookups docs
			'contains'    : '__contains',
			'icontains'   : '__icontains',
			'in'          : '__in',
			'notin'       : '__notin',
			'>'           : '__gt',
			'>='          : '__gte',
			'<'           : '__lt',
			'<='          : '__lte',
			'startswith'  : '__startswith',
			'istartswith' : '__istartswith',
			'endswith'    : '__endswith',
			'iendswith'   : '__iendswith',
			'regex'       : '__regex',
			'iregex'      : '__iregex',
			'includes'    : '__includes',
			'intersects'  : '__intersects',
		};

		vm.getSchemaDetails = function(schemaName) {
			var schema = vm.schemaList.filter(schema => schema.name === schemaName)[0];

			vm.schemaDetails = {
				fields: schema.fields
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
				vm.onChange(buildQuery(query));
			}
		}, true);

		function buildQuery(query) {
			var filters = {};

			// TODO: only supports one of each type
			for(var field in query.filterGroups) {
				query.filterGroups[field].forEach(filter => {
					var filterName = field + vm.operatorDictionary[filter.operator];
					filters[filterName] = filter.value;
				});
			}

			return {
				schema: query.schema,
				filter: filters,
				order_by: query.order_by,
				ordering: query.ordering,
				limit: query.limit,
				offset: query.offset,
			};
		}
	}
})(angular);
