(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('schemaService', schemaService);

	function schemaService($q, requestHelper) {
		return {
			getSchema,
			getSchemaList
		};

		////////////

		function getSchema(schemaName) {
			return $q.when(requestHelper.getMontageClient().schema(schemaName))
				.then(requestHelper.returnData);
		}

		function getSchemaList() {
			return $q.when(requestHelper.getMontageClient().schemas())
				.then(requestHelper.returnData);
		}
	}
})(angular);
