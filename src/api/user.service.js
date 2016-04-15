(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('userService', userService);

	function userService(montageHelper) {
		return {
			get,
			list,
			create,
			update,
			remove
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

		function create(full_name, email, password) {
			return montageHelper.getClient().users.create(full_name, email, password)
				.then(montageHelper.returnData);
		}

		function update(user_id, full_name, email, password) {
			return montageHelper.getClient().users.update(user_id, full_name, email, password)
				.then(montageHelper.returnData);
		}

		function remove(id) {
			return montageHelper.getClient().users.remove(id)
				// .then(montageHelper.returnData);
		}
	}
})(angular);
