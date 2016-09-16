(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('notFoundHelper', notFoundHelper);

	function notFoundHelper() {
		const service = {
			checkNotFound,
			getUserOptions,
			getPolicyOptions,
		};

		return service;

		////////////

		function checkNotFound(error) {
			const errorStatus = error.status === 404;

			return errorStatus;
		}

		function getUserOptions() {
			const options = {
				recordType   : 'user',
				redirectLink : 'user.list',
				redirectName : 'Users',
				isNotFound   : true,
			};

			return options;
		}

		function getPolicyOptions() {
			const options = {
				recordType   : 'policy',
				redirectLink : 'policy.list',
				redirectName : 'Policy',
				isNotFound   : true,
			};

			return options;
		}
	}
})(angular);
