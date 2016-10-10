(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		documentService,
		fileService,
		repoService,
		policyService,
		projectService,
		roleService,
		schemaService,
		userService
	) {
		return {
			document : documentService,
			file     : fileService,
			policy   : policyService,
			project  : projectService,
			repo     : repoService,
			role     : roleService,
			schema   : schemaService,
			user     : userService,
		};
	}
})(angular);
