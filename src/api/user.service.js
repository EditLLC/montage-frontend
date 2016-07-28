(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('userService', userService);

	function userService(montageHelper) {
		return {
			get,
			list,
			update
		};

		////////////

		function get(id) {
			return montageHelper.getClient().users.get(id)
				.then(montageHelper.returnData);
		}

		function list() {
			return montageHelper.getClient().users.list()
				.then(montageHelper.returnData);
		}

		function update(id, full_name, email, password) {
			return montageHelper.getClient().users.update(id, full_name, email, password)
				.then(montageHelper.returnData);
		}
	}
})(angular);
