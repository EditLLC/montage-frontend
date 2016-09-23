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

	function queryBuilderController(montage) {
		const vm = this;

		vm.operatorDictionary = {
			'='                              : 'eq',
			'= (case insensitive)'           : 'ieq',
			'!='                             : 'ne',
			'<'                              : 'lt',
			'<='                             : 'le',
			'>'                              : 'gt',
			'>='                             : 'ge',
			'in'                             : 'inSet',
			'regex'                          : 'regex',
			'starts with'                    : 'starts',
			'starts with (case insensitive)' : 'istarts',
			'ends with'                      : 'ends',
			'ends with (case insensitive)'   : 'iends',
			'intersects (geometry)'          : 'intersects',
			'includes (geometry)'            : 'includes'
		};

		vm.getSchemaDetails = function(schemaName) {
			const schema = vm.schemaList.filter(schema => schema.name === schemaName)[0];

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
			vm.query.filterGroups[field] = vm.query.filterGroups[field].filter((currentFilter => currentFilter !== filter));

			// Remove the filterGroup if it is empty
			if(!vm.query.filterGroups[field].length) {
				delete vm.query.filterGroups[field];
			}
		};

		vm.buildQuery = ({ schema, filterGroups, order_by, ordering, limit, offset }) => {
			if(!schema) return;

			const query = new montage.Query(schema);

			if(filterGroups) {
				let filters = [];

				for(var field in filterGroups) {
					if(filterGroups.hasOwnProperty(field)) {
						filterGroups[field].forEach(({operator, value}) => {
							filters.push(new montage.Field(field)[vm.operatorDictionary[operator]](value));
						});
					}
				}

				query.filter.apply(query, filters);
			}

			if (order_by && ordering) { query.orderBy(order_by, ordering); }
			if(offset) { query.skip(parseInt(offset)); }
			if(limit) { query.limit(parseInt(limit)); }

			return query;
		}
	}
})(angular);
