(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montageHelper', montageHelper);

	function montageHelper(montageData, authService) {
		return {
			getMontageClient,
			returnData
		};

		////////////

		function getMontageClient() {
			return new montageData.Client(authService.getCurrentUser());
		}

		function returnData(response) {
			return response.data;
		}
	}
})(angular);
