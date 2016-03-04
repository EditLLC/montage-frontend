(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('schemaService', schemaService);

	function schemaService($q, requestHelper) {
		return {
			getSchemaList
		};

		////////////

		function getSchemaList() {
			return $q.when(requestHelper.getMontageClient().schemas())
				.then(requestHelper.returnData);
		}
	}
})(angular);
