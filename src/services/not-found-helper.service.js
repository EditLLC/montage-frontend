(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('notFoundHelper', notFoundHelper);

	function notFoundHelper($stateParams) {
		const service = {
			checkNotFound,
			buildUserObject,
		};

		return service;

		////////////

		function checkNotFound(error) {
			const errorStatus = error.status === 404;

			return errorStatus;
		}

		function buildUserObject() {
			const params = {
				param_id   : 'user id',
				returnPage : 'user.list',
				pageName   : 'Users',
				isNotFound : true,
			};

			return params;
		}
	}
})(angular);
