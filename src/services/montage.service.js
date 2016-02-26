(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montage', montage);

	function montage(montageData, $q) {
		return {
			auth,
			getSchemaList
		};

		////////////

		function returnData(response) {
			return response.data;
		}

		function auth(credentials) {
			var client = new montageData.Client(credentials);

			return $q.when(client.auth())
				.then(returnData)
				.then(user => {
					user.domain = credentials.domain;
					return user;
				});
		}

		function getSchemaList(user) {
			var credentials = {
				token: user.token,
				domain: user.domain
			};

			var client = new montageData.Client(credentials);

			return $q.when(client.schemas())
				.then(returnData);
		}
	}
})(angular);
