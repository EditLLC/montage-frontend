(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montageHelper', montageHelper);

	function montageHelper(montage, authService) {
		return {
			getClient,
			returnData
		};

		////////////

		function getClient() {
			var currentUser = authService.getCurrentUser();
			var client = new montage.Client(MONTAGE_PROJECT, currentUser.token);
			client.protocol = MONTAGE_PROTOCOL;
			client.host = MONTAGE_HOST;

			return client;
		}

		function returnData(response) {
			return response.data;
		}
	}
})(angular);
