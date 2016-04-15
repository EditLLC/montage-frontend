(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('schemaService', schemaService);

	function schemaService(montageHelper) {
		return {
			create,
			get,
			list,
			update,
			remove
		};

		////////////

		function create(name, fields) {
			return montageHelper.getClient().schemas.create(name, fields)
				.then(montageHelper.returnData);
		}

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

		function update(schemaName, newName, fields) {
			return montageHelper.getClient().schemas.update(schemaName, newName, fields)
				.then(montageHelper.returnData);
		}

		function remove(schemaName) {
			return montageHelper.getClient().schemas.remove(schemaName);
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
