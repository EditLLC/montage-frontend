(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montageHelper', montageHelper);

	function montageHelper(montageData, authService) {
		return {
			getClient,
			returnData
		};

		////////////

		function getClient() {
			return new montageData.Client(authService.getCurrentUser());
		}

		function returnData(response) {
			return response.data;
		}
	}
})(angular);
