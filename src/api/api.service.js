(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		fileService,
		roleService,
		schemaService,
		userService
	) {
		return {
			file: fileService,
			role: roleService,
			schema: schemaService,
			user: userService
		};
	}
})(angular);
