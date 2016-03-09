(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		documentService,
		fileService,
		roleService,
		schemaService,
		userService
	) {
		return {
			document: documentService,
			file: fileService,
			role: roleService,
			schema: schemaService,
			user: userService
		};
	}
})(angular);
