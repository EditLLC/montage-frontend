(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('schemaService', schemaService);

	function schemaService($q, montageHelper) {
		return {
			get,
			list
		};

		////////////

		function get(schemaName) {
			return $q.when(montageHelper.getMontageClient().schema(schemaName))
				.then(montageHelper.returnData)
				.then(addIdField);
		}

		function list() {
			return $q.when(montageHelper.getMontageClient().schemas())
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
