(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('documentService', documentService);

	function documentService(montageHelper) {
		return {
			get,
			update,
			remove,
			save,
		};

		////////////

		function get(schema, document_id) {
			return montageHelper
				.getClient()
				.documents.get(schema, document_id)
				.then(montageHelper.returnData);
		}

		function update(schema, document) {
			return montageHelper
				.getClient()
				.documents.update(schema, document)
				.then(montageHelper.returnData);
		}

		function remove(schema, document_id) {
			return montageHelper
				.getClient()
				.documents.remove(schema, document_id);
		}

		function save(schema, documents) {
			return montageHelper
				.getClient()
				.documents.save(schema, documents);
		}
	}
})(angular);
