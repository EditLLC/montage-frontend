(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('notFoundHelper', notFoundHelper);

	function notFoundHelper() {
		const service = {
			checkNotFound,
			buildUserObject,
			buildPolicyObject,
		};

		return service;

		////////////

		function checkNotFound(error) {
			const errorStatus = error.status === 404;

			return errorStatus;
		}

		function buildUserObject() {
			const params = {
				param_id     : 'user id',
				redirectLink : 'user.list',
				redirectName : 'Users',
				isNotFound   : true,
			};

			return params;
		}

		function buildPolicyObject() {
			const params = {
				param_id     : 'policy',
				redirectLink : 'policy.list',
				redirectName : 'Policy',
				isNotFound   : true,
			};

			return params;
		}
	}
})(angular);
