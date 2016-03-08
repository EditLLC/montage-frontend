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
				.then(requestHelper.returnData);
		}

		function list() {
			return $q.when(requestHelper.getMontageClient().schemas())
				.then(requestHelper.returnData);
		}
	}
})(angular);
