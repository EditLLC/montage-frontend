(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		fileService,
		roleService,
		userService
	) {
		return {
			file: fileService,
			role: roleService,
			user: userService
		};
	}
})(angular);
