(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('requestHelper', requestHelper);

	function requestHelper(montageData, authService) {
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
