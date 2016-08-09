(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('montageHelper', montageHelper);

	function montageHelper(colorPrimary, montage, authService, ngProgressFactory) {

		init();

		return {
			getClient,
			returnData,
		};

		////////////

		function init() {
			const progressBar = ngProgressFactory.createInstance();
			const _request = montage.Client.prototype.request;

			let pendingRequestCount = 0;

			progressBar.setColor(colorPrimary);

			montage.Client.prototype.request = function(...args) {
				pendingRequestCount++;
				progressBar.start();

				return _request.bind(this)(...args).finally(response => {
					pendingRequestCount--;
					if (!pendingRequestCount) { progressBar.complete(); }

					return response;
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
