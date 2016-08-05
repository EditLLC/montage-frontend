(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montageHelper', montageHelper);

	function montageHelper(constants, montage, authService, ngProgressFactory) {

		var pendingRequestCount = 0;
		var progressBar = ngProgressFactory.createInstance();
		progressBar.setColor(constants.primaryColor);

		var _request = montage.Client.prototype.request;

		return {
			init,
			getClient,
			returnData,
		};

		////////////

		function init() {
			montage.Client.prototype.request = function(...args) {
				pendingRequestCount++;
				progressBar.start();

				return _request.bind(this)(...args).then(response => {
					pendingRequestCount--;
					if (!pendingRequestCount) { progressBar.complete(); }

					return response;
				}).catch(err => {
					progressBar.stop();
					progressBar.setColor(colorDanger);
				});
			};
		}

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
