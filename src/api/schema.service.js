(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('schemaService', schemaService);

	function schemaService($q, requestHelper) {
		return {
			get,
			list
		};

		////////////

		function get(schemaName) {
			return $q.when(requestHelper.getMontageClient().schema(schemaName))
				.then(requestHelper.returnData)
				.then(addIdField);
		}

		function list() {
			return $q.when(requestHelper.getMontageClient().schemas())
				.then(requestHelper.returnData)
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
