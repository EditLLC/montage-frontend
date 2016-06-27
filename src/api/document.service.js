(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('documentService', documentService);

	function documentService($http, authService, montageHelper) {

		var service = {
			list,
			remove
		};

		////////////

		// TODO: reset these on login
		var apiUri = `https://${authService.getCurrentUser().domain}.mntge.com/api/v1/schemas/`;
		var authHeader = { Authorization: 'Token ' + authService.getCurrentUser().token };

		var defaultQuery = {
			filter: {},
			pluck: [],
			without: [],
			limit: null,
			offset: null,
			order_by: null,
			ordering: "asc",
			index: null,
			batch_size: 1000
		};

		function list(schema, query) {
			var documentListUri = apiUri + schema + '/query/';

			var config = {
				headers: authHeader,
				params: {
					query: angular.extend({}, defaultQuery, query)
				}
			};

			return $http.get(documentListUri, config).then(response => response.data.data);
		}

		function remove(schema, id) {
			return montageHelper.getClient().documents.remove(schema, id);
		}

		return service;
	}
})(angular);
