(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('notFoundHelper', notFoundHelper);

	function notFoundHelper() {
		const service = {
			checkNotFound,
			getUserOptions,
			getRoleOptions,
			getPolicyOptions,
			getSchemaOptions,
			getRepoOptions,
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

		function getRoleOptions() {
			const options = {
				recordType   : 'role',
				redirectLink : 'role.list',
				redirectName : 'Roles',
				isNotFound   : true,
			};

			return options;
		}

		function getSchemaOptions() {
			const options = {
				recordType   : 'schema',
				redirectLink : 'schema.list',
				redirectName : 'Schemas',
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

		function getRepoOptions() {
			const options = {
				recordType   : 'repo page',
				redirectLink : 'repo.browser',
				redirectName : 'Repo',
				isNotFound   : true,
			};

			return options;
		}
	}
})(angular);
