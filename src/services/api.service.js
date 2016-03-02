(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('api', apiService);

	function apiService(userService) {
		return {
			user: userService
		};
	}
})(angular);
