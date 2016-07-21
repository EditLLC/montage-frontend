(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('documentService', documentService);

	function documentService(montageHelper) {
		return {
			get
		};

		////////////

		function get(schema, document_id) {
			return montageHelper
				.getClient()
				.documents
				.get(schema, document_id)
				.then(montageHelper.returnData);
		}
	}
})(angular);
