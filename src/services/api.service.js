(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(
		roleService,
		userService
	) {
		return {
			role: roleService,
			user: userService
		};
	}
})(angular);
