(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		documentService,
		fileService,
		policyService,
		roleService,
		schemaService,
		userService
	) {
		return {
			document: documentService,
			file: fileService,
			policy: policyService,
			role: roleService,
			schema: schemaService,
			user: userService
		};
	}
})(angular);
