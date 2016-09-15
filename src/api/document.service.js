(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('documentService', documentService);

	function documentService(montageHelper) {
		return {
			get,
			save,
			remove,
		};

		////////////

		function get(schema, document_id) {
			return montageHelper
				.getClient()
				.documents.get(schema, document_id)
				.then(montageHelper.returnData);
		}

		function save(schema, documents) {
			return montageHelper
				.getClient()
				.documents.save(schema, documents)
				.then(montageHelper.returnData);
		}

		function remove(schema, document_id) {
			return montageHelper
				.getClient()
				.documents.remove(schema, document_id);
		}
	}
})(angular);
