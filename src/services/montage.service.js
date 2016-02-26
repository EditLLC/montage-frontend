(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montage', montage);

	function montage(montageData, $q) {
		return {
			auth
		};

		////////////

		function returnData(response) {
			return response.data;
		}

		function auth(credentials) {
			var client = new montageData.Client(credentials);

			return $q.when(client.auth())
				.then(returnData);
		}
	}
})(angular);
