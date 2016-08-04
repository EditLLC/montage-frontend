(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montageHelper', montageHelper);

	function montageHelper(montage, authService, ngProgressFactory) {

		var progress = ngProgressFactory.createInstance();
		progress.setColor('#01579B');
		var pendingRequestCount = 0;

		var _request = montage.Client.prototype.request;

		montage.Client.prototype.request = function(...args) {
			progress.start();
			pendingRequestCount++;

			return _request.bind(this)(...args).then(response => {
				pendingRequestCount--;


				return response;
			});
		};

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
