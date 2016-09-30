(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		documentService,
		fileService,
		repoService,
		roleService,
		schemaService,
		userService
	) {
		return {
			document : documentService,
			file     : fileService,
			repo     : repoService,
			role     : roleService,
			schema   : schemaService,
			user     : userService,
		};
	}
})(angular);
