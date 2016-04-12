(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('schemaService', schemaService);

	function schemaService(montageHelper) {
		return {
			get,
			list
		};

		////////////

		function get(schemaName) {
			return montageHelper.getClient().schemas.get(schemaName)
				.then(montageHelper.returnData)
				.then(addIdField);
		}

		function list() {
			return montageHelper.getClient().schemas.list()
				.then(montageHelper.returnData)
				.then(schemaList => schemaList.map(addIdField));
		}

		function addIdField(schema) {
			schema.fields.unshift({
				name: "id",
				datatype: "text",
				indexed: true,
				required: true
			});

			return schema;
		}
	}
})(angular);
