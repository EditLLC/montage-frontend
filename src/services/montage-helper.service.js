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
			return new montage.Client(MONTAGE_SUBDOMAIN, currentUser.token, MONTAGE_HOST);
		}

		function returnData(response) {
			return response.data;
		}
	}
})(angular);
