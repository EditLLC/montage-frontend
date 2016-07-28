(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('userService', userService);

	function userService(montageHelper) {
		return {
			create,
			get,
			list,
			update
		};

		////////////

		function create(user) {
			return montageHelper.getClient().users.create(user.full_name, user.email, user.password)
				.then(montageHelper.returnData);
		}

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
