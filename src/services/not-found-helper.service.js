(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('notFoundHelper', notFoundHelper);

	function notFoundHelper() {
		const service = {
			checkNotFound,
			buildUserObject,
			buildRoleObject,
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

		function buildRoleObject() {
			const params = {
				param_id     : 'role',
				redirectLink : 'role.list',
				redirectName : 'Roles',
				isNotFound   : true,
			};

			return params;
		}
	}
})(angular);
